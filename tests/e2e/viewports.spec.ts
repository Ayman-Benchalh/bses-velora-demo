import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "320x568 (iPhone SE / Small)", width: 320, height: 568 },
  { name: "360x800 (Android Common)", width: 360, height: 800 },
  { name: "375x667 (iPhone 8)", width: 375, height: 667 },
  { name: "390x844 (iPhone 13/14)", width: 390, height: 844 },
  { name: "414x896 (iPhone XR/11)", width: 414, height: 896 },
  { name: "430x932 (iPhone 15 Pro Max)", width: 430, height: 932 },
  { name: "768x1024 (iPad Portrait)", width: 768, height: 1024 },
  { name: "1024x768 (iPad Landscape)", width: 1024, height: 768 },
  { name: "1280x800 (Small Laptop)", width: 1280, height: 800 },
  { name: "1440x900 (MacBook)", width: 1440, height: 900 },
  { name: "1920x1080 (FHD Desktop)", width: 1920, height: 1080 },
];

const ROUTES = [
  "/fr",
  "/fr/shop",
  "/fr/cart",
  "/fr/checkout",
  "/fr/admin-demo",
  "/ar",
  "/en",
];

test.describe("Multi-Viewport Responsiveness & Zero Horizontal Overflow Audit", () => {
  for (const vp of VIEWPORTS) {
    test(`Zero horizontal overflow at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      for (const route of ROUTES) {
        await page.goto(route);
        await page.waitForLoadState("domcontentloaded");

        const overflow = await page.evaluate(() => {
          const badElements: any[] = [];
          document.querySelectorAll('*').forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.right > window.innerWidth + 1) {
              badElements.push({
                tag: el.tagName,
                class: typeof el.className === "string" ? el.className.slice(0, 80) : "",
                right: rect.right,
                text: (el as HTMLElement).innerText ? (el as HTMLElement).innerText.slice(0, 30) : ""
              });
            }
          });
          return {
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            innerWidth: window.innerWidth,
            badElements: badElements.slice(0, 5),
          };
        });

        // Ensure scrollWidth is not strictly greater than clientWidth / innerWidth
        expect(
          overflow.scrollWidth,
          `Horizontal overflow detected on ${route} at ${vp.name}: scrollWidth=${overflow.scrollWidth} > innerWidth=${overflow.innerWidth}. Offending elements: ${JSON.stringify(overflow.badElements)}`
        ).toBeLessThanOrEqual(overflow.innerWidth + 1); // 1px tolerance for subpixel rounding
      }
    });
  }
});
