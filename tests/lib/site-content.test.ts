import { describe, expect, it } from "vitest";
import { galleryFrames, navItems, services, testimonialNotes, trustPoints } from "@/lib/site-content";

describe("site content", () => {
  it("keeps the service list focused on the approved scope", () => {
    expect(services).toHaveLength(5);
    expect(services[0].title).toBe("Residential Cleaning");
  });

  it("keeps the trust points aligned with the mockup copy", () => {
    expect(trustPoints.map((item) => item.title)).toContain("Eco-Friendly Products");
  });

  it("keeps the navigation and supporting sections present", () => {
    expect(navItems.map((item) => item.label)).toContain("Services");
    expect(galleryFrames.map((item) => item.label)).toEqual(["Before", "After"]);
    expect(testimonialNotes).toHaveLength(2);
  });
});

