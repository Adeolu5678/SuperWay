import { expect, test } from "@playwright/test";

test("homepage loads with the booking CTA", async ({ page }) => {
  await page.goto("/");
  const heroBookingButton = page.locator("#home").getByRole("button", { name: "Book a Service" });
  await expect(heroBookingButton).toBeVisible();
  await heroBookingButton.click();
  await expect(page.getByText(/tell us what you need and we'll get back to you quickly/i)).toBeVisible();
});
