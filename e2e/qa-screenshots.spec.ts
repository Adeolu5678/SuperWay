import { test } from '@playwright/test';

const viewports = [
  { width: 1366, height: 768, name: '1366x768' },
  { width: 1440, height: 900, name: '1440x900' },
  { width: 1920, height: 1080, name: '1920x1080' },
];

test('Capture screenshots for QA', async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto('http://localhost:3000');
    
    // Wait for images and animations
    await page.waitForTimeout(2000);

    // Screenshot 1: Top of page (Viewport 1)
    await page.screenshot({ path: `output/playwright/rebuild-${viewport.name}-viewport1.png` });

    // Screenshot 2: Scroll down exactly one viewport (Viewport 2)
    await page.evaluate((height) => window.scrollTo(0, height), viewport.height);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `output/playwright/rebuild-${viewport.name}-viewport2.png` });

    // Screenshot 3: Booking Modal
    await page.goto('http://localhost:3000');
    await page.click('button:has-text("Book a Service")');
    await page.waitForSelector('.sw-modal');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `output/playwright/rebuild-${viewport.name}-modal.png` });
  }
});
