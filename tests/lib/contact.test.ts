import { describe, expect, it } from "vitest";
import {
  business,
  getBookingMailtoHref,
  getBusinessHoursLabel,
  getEmailHref,
  getPhoneHref,
  getPrimaryWhatsAppHref,
  getWhatsAppBookingHref,
} from "@/lib/contact";

describe("contact helpers", () => {
  it("formats the WhatsApp deep link from the configured number", () => {
    expect(getPrimaryWhatsAppHref("08021352593")).toBe("https://wa.me/2348021352593");
  });

  it("renders the approved business hours label", () => {
    expect(getBusinessHoursLabel()).toBe("8:00 AM to 8:00 PM, Monday to Saturday");
  });

  it("keeps the primary contact links consistent", () => {
    expect(getPhoneHref()).toBe("tel:08021352593");
    expect(getEmailHref()).toBe("mailto:superwaycleaningservice@gmail.com");
    expect(getBookingMailtoHref()).toBe("mailto:superwaycleaningservice@gmail.com?subject=New%20Booking%20Request");
    expect(getWhatsAppBookingHref()).toBe("https://wa.me/2348021352593?text=Hello%20SuperWay%2C%20I%20need%20a%20cleaning%20service.");
    expect(business.phoneDisplay).toBe("0802 135 2593");
  });
});
