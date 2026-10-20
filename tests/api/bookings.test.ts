import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

/**
 * Regression tests for POST /api/bookings.
 *
 * Why these exist: the booking endpoint returned HTTP 500 on production
 * (Vercel) because `fs.writeFileSync(process.cwd()/bookings.json)` threw EROFS
 * on the read-only serverless filesystem BEFORE the Google Apps Script proxy
 * was ever reached. Every customer submission failed silently. The existing
 * suite had no coverage of this route at all.
 *
 * These tests pin the two invariants:
 *   1. A read-only filesystem must NEVER block the Apps Script capture path.
 *   2. If nothing can be persisted, the API must fail honestly (5xx) rather
 *      than reporting a false success.
 */

const writeFileSync = vi.fn();
const readFileSync = vi.fn();
const existsSync = vi.fn();

vi.mock("fs", () => ({
  default: { writeFileSync, readFileSync, existsSync },
  writeFileSync,
  readFileSync,
  existsSync,
}));
vi.mock("path", () => ({
  default: { join: (...parts: string[]) => parts.join("/") },
  join: (...parts: string[]) => parts.join("/"),
}));

async function loadRoute() {
  vi.resetModules();
  return await import("@/app/api/bookings/route");
}

function post(body: Record<string, unknown>) {
  return new Request("http://localhost/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const booking = {
  name: "Test Customer",
  phone: "08000000000",
  preferredDate: "2026-10-10",
  preferredTime: "10:00",
};

describe("POST /api/bookings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.GOOGLE_APPS_SCRIPT_URL;
    delete process.env.VERCEL;
    existsSync.mockReturnValue(true);
    readFileSync.mockReturnValue("[]");
    // Default to a writable filesystem; individual tests override this.
    writeFileSync.mockImplementation(() => undefined);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.GOOGLE_APPS_SCRIPT_URL;
    delete process.env.VERCEL;
  });

  it("persists to the local backup when the filesystem is writable", async () => {
    const { POST } = await loadRoute();
    const res = await POST(post(booking));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ success: true, note: "Saved locally" });
    expect(writeFileSync).toHaveBeenCalledOnce();
  });

  it("CRITICAL: still reaches Google Apps Script when the filesystem is read-only", async () => {
    process.env.GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/FAKE/exec";
    // Simulate EROFS - the exact condition that broke production.
    writeFileSync.mockImplementation(() => {
      const err: NodeJS.ErrnoException = new Error("EROFS: read-only file system");
      err.code = "EROFS";
      throw err;
    });

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true, booking: { row: 42 } }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { POST } = await loadRoute();
    const res = await POST(post(booking));

    // Must be a real success delivered by the proxy, not a 500.
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ success: true, booking: { row: 42 } });
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0][0]).toBe("https://script.google.com/macros/s/FAKE/exec");
  });

  it("fails honestly when nothing can be persisted", async () => {
    writeFileSync.mockImplementation(() => {
      const err: NodeJS.ErrnoException = new Error("EROFS: read-only file system");
      err.code = "EROFS";
      throw err;
    });

    const { POST } = await loadRoute();
    const res = await POST(post(booking));

    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.success).toBe(false);
    // Must give the customer a working fallback channel, not a dead end.
    expect(body.error).toMatch(/0802 135 2593/);
  });

  it("treats a non-OK Apps Script response as failure and falls back", async () => {
    process.env.GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/FAKE/exec";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) })
    );

    const { POST } = await loadRoute();
    const res = await POST(post(booking));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ success: true, note: "Saved locally" });
  });

  it("CRITICAL: on serverless, never reports a false success when the sheet is unreachable", async () => {
    // /tmp on Vercel is ephemeral and per-instance. A write there is not a
    // durable booking record, so returning 200 would tell the customer they
    // were booked while the request silently vanished.
    process.env.VERCEL = "1";
    process.env.GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/FAKE/exec";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 503, json: async () => ({}) })
    );

    const { POST } = await loadRoute();
    const res = await POST(post(booking));

    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toMatch(/0802 135 2593/);
  });

  it("on serverless, a working sheet is still a real success", async () => {
    process.env.VERCEL = "1";
    process.env.GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/FAKE/exec";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ success: true, bookingId: "SW-123" }),
      })
    );

    const { POST } = await loadRoute();
    const res = await POST(post(booking));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ success: true, bookingId: "SW-123" });
  });

  it("gives the Apps Script enough time to answer (it takes 8-40s in production)", async () => {
    const { maxDuration } = await loadRoute();
    expect(maxDuration).toBeGreaterThanOrEqual(60);
  });
});