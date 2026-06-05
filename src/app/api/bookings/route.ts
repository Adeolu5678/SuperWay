import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LOCAL_DB_PATH = path.join(process.cwd(), "bookings.json");

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. Log locally to bookings.json as a backup/local dev DB
    let bookings = [];
    if (fs.existsSync(LOCAL_DB_PATH)) {
      try {
        const fileData = fs.readFileSync(LOCAL_DB_PATH, "utf-8");
        bookings = JSON.parse(fileData);
      } catch (e) {
        console.error("Error parsing bookings.json, resetting", e);
      }
    }

    const newBooking = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...data,
    };
    bookings.push(newBooking);
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(bookings, null, 2), "utf-8");

    // 2. Proxy to Google Apps Script Web App if URL is configured
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (scriptUrl) {
      try {
        const response = await fetch(scriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        return NextResponse.json(result);
      } catch (scriptErr) {
        console.error("Google Apps Script proxy error:", scriptErr);
        // Fallback to local success if script failed
      }
    }

    return NextResponse.json({ success: true, booking: newBooking, note: "Saved locally" });
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
