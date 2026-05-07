import { describe, expect, it } from "vitest";
import { business, getBusinessHoursLabel, getEmailHref, getPhoneHref, getPrimaryWhatsAppHref } from "@/lib/contact";

describe("contact helpers", () => {
  it("formats the WhatsApp deep link from the configured number", () => {
    expect(getPrimaryWhatsAppHref("08021352593")).toBe("https://wa.me/2348021352593");
  });

  it("renders the approved business hours label", () => {
    expect(getBusinessHoursLabel()).toBe("7:00 AM to 7:00 PM, Monday to Saturday");
  });

  it("keeps the primary contact links consistent", () => {
    expect(getPhoneHref()).toBe("tel:07038296178");
    expect(getEmailHref()).toBe("mailto:adawa366@gmail.com");
    expect(business.phoneDisplay).toBe("0703 829 6178");
  });
});
