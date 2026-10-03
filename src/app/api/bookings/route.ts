import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Local disk persistence is a BACKUP / local-dev aid only. On serverless
// hosts (e.g. Vercel) the project filesystem is read-only (EROFS), so every
// write here must be best-effort and must never block the primary capture path.
const IS_SERVERLESS = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
const LOCAL_DB_PATH = IS_SERVERLESS
  ? path.join("/tmp", "bookings.json")
  : path.join(process.cwd(), "bookings.json");

/**
 * Append a booking to the local JSON backup.
 * Returns true if persisted, false if the host filesystem rejected the write.
 * Never throws.
 */
function saveLocal(booking: Record<string, unknown>): boolean {
  try {
    let bookings: unknown[] = [];
    if (fs.existsSync(LOCAL_DB_PATH)) {
      try {
        bookings = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, "utf-8"));
        if (!Array.isArray(bookings)) bookings = [];
      } catch {
        console.error("Error parsing bookings.json, resetting");
      }
    }
    bookings.push(booking);
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(bookings, null, 2), "utf-8");
    return true;
  } catch (e) {
    console.error("Local booking backup unavailable (read-only fs?):", e);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newBooking = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...data,
    };

    // 1. PRIMARY capture path: Google Apps Script web app (system of record).
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (scriptUrl) {
      try {
        const response = await fetch(scriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const result = await response.json();
          saveLocal(newBooking); // best-effort backup only
          return NextResponse.json(result);
        }
        console.error(`Google Apps Script returned HTTP ${response.status}`);
      } catch (scriptErr) {
        console.error("Google Apps Script proxy error:", scriptErr);
      }
      // Script failed -> fall through and try the local backup below.
    }

    // 2. FALLBACK: local backup store.
    const savedLocally = saveLocal(newBooking);
    if (savedLocally) {
      return NextResponse.json({ success: true, booking: newBooking, note: "Saved locally" });
    }

    // 3. Nothing persisted. Be honest with the caller and point them at a
    //    channel that does not depend on this server.
    console.error("Booking could not be persisted by any channel");
    return NextResponse.json(
      {
        success: false,
        error:
          "We could not save your booking online. Please call or WhatsApp 0802 135 2593 and we will confirm your slot.",
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Failed to save booking:", error);
    return NextResponse.json({ success: false, error: "Failed to save booking" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date"); // Expecting YYYY-MM-DD

    if (!dateParam) {
      return NextResponse.json({ success: false, error: "Missing date parameter" }, { status: 400 });
    }

    // 1. If Google Apps Script is configured, query it for real-time calendar availability
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (scriptUrl) {
      try {
        const response = await fetch(`${scriptUrl}?date=${dateParam}`);
        const result = await response.json();
        return NextResponse.json(result);
      } catch (scriptErr) {
        console.error("Google Apps Script availability fetch failed:", scriptErr);
        // Fall back to querying local bookings.json
      }
    }

    // 2. Local fallback: Query bookings.json for existing appointments on the chosen date
    const busySlots: { start: string; end: string }[] = [];
    if (fs.existsSync(LOCAL_DB_PATH)) {
      try {
        const fileData = fs.readFileSync(LOCAL_DB_PATH, "utf-8");
        const bookings = JSON.parse(fileData);
        // Filter bookings by date
        const matchingBookings = bookings.filter((b: { preferredDate?: string; preferredTime?: string }) => b.preferredDate === dateParam);
        
        for (const b of matchingBookings) {
          if (b.preferredTime) {
            // Assume 2-hour duration for the booking
            const [hours, minutes] = b.preferredTime.split(":").map(Number);
            const startMin = hours * 60 + minutes;
            const endMin = startMin + 120;
            
            const startHours = String(Math.floor(startMin / 60)).padStart(2, "0");
            const startMinutes = String(startMin % 60).padStart(2, "0");
            const endHours = String(Math.floor(endMin / 60)).padStart(2, "0");
            const endMinutes = String(endMin % 60).padStart(2, "0");
            
            busySlots.push({
              start: `${startHours}:${startMinutes}`,
              end: `${endHours}:${endMinutes}`,
            });
          }
        }
      } catch (e) {
        console.error("Failed to parse local bookings.json during GET", e);
      }
    }

    return NextResponse.json({ success: true, busy: busySlots });
  } catch (error) {
    console.error("Availability check failed:", error);
    return NextResponse.json({ success: false, error: "Availability check failed" }, { status: 500 });
  }
}
