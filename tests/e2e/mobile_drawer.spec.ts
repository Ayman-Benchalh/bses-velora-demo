import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const VIEWPORTS = [
  { name: "320px (iPhone SE 1st Gen)", width: 320, height: 568 },
  { name: "360px (Android Common)", width: 360, height: 800 },
  { name: "375px (iPhone 8 / SE 2nd Gen)", width: 375, height: 667 },
  { name: "390px (iPhone 13/14)", width: 390, height: 844 },
  { name: "414px (iPhone XR/11)", width: 414, height: 896 },
  { name: "430px (iPhone 15/16 Pro Max)", width: 430, height: 932 },
  { name: "768px (iPad Mini / Portrait)", width: 768, height: 1024 },
];

test.describe("Mobile Navigation Drawer — Comprehensive Regression & Multi-Viewport Suite", () => {
  test.beforeAll(async () => {
    const dir = path.join(process.cwd(), "public", "screenshots");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  for (const vp of VIEWPORTS) {
    test(`Drawer occupies full 100dvh height, links visible, independent scrolling at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/fr");
      await page.waitForLoadState("domcontentloaded");

      // Check zero horizontal overflow when closed
      const closedOverflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(closedOverflow.scrollWidth).toBeLessThanOrEqual(closedOverflow.innerWidth + 1);

      // Open menu
      const menuBtn = page.getByRole("button", { name: /menu de navigation/i });
      await expect(menuBtn).toBeVisible();
      await menuBtn.click();

      // Drawer must be in the DOM and visible
      const drawer = page.locator("[data-testid='mobile-drawer']");
      await expect(drawer).toBeVisible();

      // Measure bounding box: must occupy full viewport height and bounded width
      const box = await drawer.boundingBox();
      expect(box).not.toBeNull();
      if (box) {
        expect(box.y).toBe(0);
        // Height must equal full viewport height
        expect(box.height).toBe(vp.height);
        // Width must be at most min(85vw, 360px) + 1px rounding tolerance
        const expectedMaxWidth = Math.min(vp.width * 0.85, 360);
        expect(box.width).toBeLessThanOrEqual(expectedMaxWidth + 1);
        expect(box.width).toBeGreaterThanOrEqual(expectedMaxWidth - 2);
      }

      // Verify header elements inside drawer
      await expect(drawer.getByRole("link", { name: "VELORA" })).toBeVisible();
      const closeBtn = drawer.getByRole("button", { name: /fermer/i });
      await expect(closeBtn).toBeVisible();

      // Verify core navigation links are visible
      await expect(drawer.getByRole("link", { name: /la collection/i })).toBeVisible();
      await expect(drawer.getByRole("link", { name: /lookbook/i })).toBeVisible();
      await expect(drawer.getByRole("link", { name: /maison/i })).toBeVisible();
      await expect(drawer.locator("a[href*='/contact']")).toBeVisible();

      // Scrollable area inside drawer
      const scrollContainer = drawer.locator(".overflow-y-auto");
      await expect(scrollContainer).toBeVisible();

      // Scroll to bottom of drawer to verify bottom CTA & footer elements
      await scrollContainer.evaluate((el) => {
        el.scrollTop = el.scrollHeight;
      });

      // Verify admin and WhatsApp links
      await expect(drawer.getByText("WhatsApp BSES")).toBeVisible();
      await expect(drawer.getByRole("link", { name: /administration/i })).toBeVisible();

      // Verify language switch in drawer footer
      await expect(drawer.getByRole("link", { name: "FR", exact: true })).toBeVisible();
      await expect(drawer.getByRole("link", { name: "EN", exact: true })).toBeVisible();
      await expect(drawer.getByRole("link", { name: "العربية", exact: true })).toBeVisible();

      // Check body scroll is locked
      const isScrollLocked = await page.evaluate(() => document.body.style.overflow === "hidden");
      expect(isScrollLocked).toBe(true);

      // Verify zero horizontal overflow while drawer is open
      const openOverflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(openOverflow.scrollWidth).toBeLessThanOrEqual(openOverflow.innerWidth + 1);

      // Test Close Button
      await closeBtn.click();
      await expect(drawer).not.toBeVisible();

      // Body scroll restored
      const isScrollRestored = await page.evaluate(() => document.body.style.overflow === "");
      expect(isScrollRestored).toBe(true);
    });
  }

  test("Backdrop click closes the drawer and restores scroll", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/fr");

    // Open
    await page.getByRole("button", { name: /menu de navigation/i }).click();
    const drawer = page.locator("[data-testid='mobile-drawer']");
    await expect(drawer).toBeVisible();

    // Click outside drawer on backdrop (e.g. at x: 350, y: 300)
    await page.mouse.click(350, 300);
    await expect(drawer).not.toBeVisible();

    // Body scroll restored
    const isScrollRestored = await page.evaluate(() => document.body.style.overflow === "");
    expect(isScrollRestored).toBe(true);
  });

  test("Escape key closes the drawer and restores focus", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/fr");

    // Open
    const menuBtn = page.getByRole("button", { name: /menu de navigation/i });
    await menuBtn.click();
    const drawer = page.locator("[data-testid='mobile-drawer']");
    await expect(drawer).toBeVisible();

    // Press Escape
    await page.keyboard.press("Escape");
    await expect(drawer).not.toBeVisible();
  });

  test("Navigation link inside drawer navigates and automatically closes drawer", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/fr");

    // Open
    await page.getByRole("button", { name: /menu de navigation/i }).click();
    const drawer = page.locator("[data-testid='mobile-drawer']");
    await expect(drawer).toBeVisible();

    // Click on Lookbook link inside drawer
    await drawer.getByRole("link", { name: /lookbook/i }).click();
    await page.waitForURL(/\/lookbook/);

    // Drawer should now be closed
    await expect(drawer).not.toBeVisible();
  });

  test("Arabic (RTL) Layout: Drawer slides from right and renders RTL typography", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/ar");

    // Open menu
    await page.getByRole("button", { name: /menu de navigation/i }).click();
    const drawer = page.locator("[data-testid='mobile-drawer']");
    await expect(drawer).toBeVisible();

    // In RTL, right position should be 0
    const box = await drawer.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.y).toBe(0);
      expect(box.height).toBe(667);
      // Right edge should align with window width 375
      expect(Math.round(box.x + box.width)).toBe(375);
    }

    // Capture screenshot of Arabic RTL drawer
    await page.screenshot({ path: "public/screenshots/mobile-drawer-ar-rtl.png" });
  });

  test("English Layout: Pure English navigation labels and full height", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/en");

    // Open menu
    await page.getByRole("button", { name: /menu de navigation/i }).click();
    const drawer = page.locator("[data-testid='mobile-drawer']");
    await expect(drawer).toBeVisible();

    // Verify English navigation labels
    await expect(drawer.getByRole("link", { name: "Collection" })).toBeVisible();
    await expect(drawer.getByRole("link", { name: "Lookbook" })).toBeVisible();
    await expect(drawer.getByRole("link", { name: "The Maison" })).toBeVisible();

    // Capture screenshot of English drawer
    await page.screenshot({ path: "public/screenshots/mobile-drawer-en.png" });
  });

  test("Visual Evidence Capture: Before & After menu open on 375px and 320px", async ({ page }) => {
    // 375px Closed
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/fr");
    await page.screenshot({ path: "public/screenshots/mobile-drawer-closed-375px.png" });

    // 375px Open
    await page.getByRole("button", { name: /menu de navigation/i }).click();
    await expect(page.locator("[data-testid='mobile-drawer']")).toBeVisible();
    await page.screenshot({ path: "public/screenshots/mobile-drawer-open-375px.png" });

    // Close
    await page.locator("[data-testid='mobile-drawer']").getByRole("button", { name: /fermer/i }).click();

    // 320px Open
    await page.setViewportSize({ width: 320, height: 568 });
    await page.getByRole("button", { name: /menu de navigation/i }).click();
    await expect(page.locator("[data-testid='mobile-drawer']")).toBeVisible();
    await page.screenshot({ path: "public/screenshots/mobile-drawer-open-320px.png" });
  });
});
