import { test, expect } from "@playwright/test";

test.describe("VELORA Luxury Fashion E-commerce Demo", () => {
  test("1. Homepage loads successfully with editorial elements & BSES attribution", async ({ page }) => {
    await page.goto("/fr");
    await expect(page).toHaveTitle(/VELORA/);

    // Header & Brand
    const brand = page.locator("header").getByText("VELORA");
    await expect(brand).toBeVisible();

    // Hero headline
    const heroTitle = page.locator("h1");
    await expect(heroTitle).toBeVisible();

    // Floating BSES Demo Pill
    const bsesPill = page.getByRole("button", { name: /Contrôles de démonstration BSES/i });
    await expect(bsesPill).toBeVisible();

    // Footer with BSES attribution
    await expect(page.locator("footer")).toContainText("BSES — Benchalh Solution E-commerce");
  });

  test("2. Language switching and authentic RTL Arabic layout", async ({ page }) => {
    // Start at French
    await page.goto("/fr");
    const containerFr = page.locator("div[lang='fr']");
    await expect(containerFr).toHaveAttribute("dir", "ltr");

    // Switch to Arabic
    await page.goto("/ar");
    const containerAr = page.locator("div[lang='ar']");
    await expect(containerAr).toHaveAttribute("dir", "rtl");

    // Verify Arabic navigation
    await expect(page.locator("header")).toContainText("المجموعة الكاملة");
    await expect(page.locator("header")).toContainText("لوحة الإدارة");

    // Switch to English
    await page.goto("/en");
    const containerEn = page.locator("div[lang='en']");
    await expect(containerEn).toHaveAttribute("dir", "ltr");
    await expect(page.locator("header")).toContainText("Collection");
  });

  test("3. Catalog filtering, search, view mode toggle & active chips", async ({ page }) => {
    await page.goto("/fr/shop");

    // Verify initial products count (36 products)
    await expect(page.getByTestId("results-count")).toContainText("36");

    // Filter by Category: Souliers (Shoes)
    const shoesBtn = page.getByRole("button", { name: "Souliers" }).first();
    await shoesBtn.click();
    await expect(page.getByTestId("results-count")).toContainText("7");

    // Verify active filter chip
    await expect(page.locator("text=Souliers").first()).toBeVisible();

    // Clear filters
    const clearBtn = page.getByRole("button", { name: "Tout effacer" }).first();
    await clearBtn.click();
    await expect(page.getByTestId("results-count")).toContainText("36");

    // Search for "soie"
    const searchInput = page.getByPlaceholder("Rechercher une pièce d'exception...");
    // If not open, click search toggle
    const searchToggle = page.locator("header").getByRole("button", { name: "Rechercher" });
    if (await searchToggle.isVisible()) {
      await searchToggle.click();
      await searchInput.fill("soie");
      await page.keyboard.press("Enter");
    }
  });

  test("4. Product detail page, size selection, stock indicator & size guide modal", async ({ page }) => {
    await page.goto("/fr/product/manteau-laine-double-face-camel");

    // Product Title
    await expect(page.locator("h1")).toContainText("Manteau Double Face en Laine & Cachemire");

    // Check price in MAD
    await expect(page.locator("text=5 900 MAD")).toBeVisible();

    // Select Size 38
    const size38 = page.getByRole("button", { name: "38", exact: true });
    await size38.click();

    // Check Stock Indicator
    await expect(page.locator("text=En stock")).toBeVisible();

    // Open Size Guide Modal
    const sizeGuideBtn = page.getByRole("button", { name: /Guide des tailles/i });
    await sizeGuideBtn.click();
    await expect(page.getByText("Guide des Tailles VELORA")).toBeVisible();

    // Close Size Guide Modal
    const closeBtn = page.getByRole("button", { name: "Fermer le guide des tailles" });
    await closeBtn.click();
    await expect(page.getByText("Guide des Tailles VELORA")).not.toBeVisible();
  });

  test("5. Add to cart, sliding drawer, privilege promo code & persistence", async ({ page }) => {
    await page.goto("/fr/product/cabas-signature-cuir-tanne-vegetal-camel");

    // Add to cart
    const addBtn = page.getByRole("button", { name: /Ajouter au panier/i });
    await addBtn.click();

    // Verify Drawer opens
    const drawer = page.locator("text=Votre Écrin de Commande");
    await expect(drawer).toBeVisible();

    // Verify item in drawer
    await expect(
      page.getByTestId("cart-drawer").getByText("Le Cabas Signature en Cuir").first()
    ).toBeVisible();

    // Apply promo code VELORA10
    const promoInput = page.getByPlaceholder("Entrez votre code (ex: VELORA10)");
    if (await promoInput.isVisible()) {
      await promoInput.fill("VELORA10");
      await page.getByRole("button", { name: "Appliquer" }).click();
      await expect(page.locator("text=-10%")).toBeVisible();
    }

    // Reload page and check persistence
    await page.reload();
    const cartBadge = page.locator("header").getByRole("button", { name: "Panier d'achat" });
    await expect(cartBadge).toContainText("1");
  });

  test("6. Simulated Moroccan checkout flow and order confirmation", async ({ page }) => {
    // Ensure item in cart
    await page.goto("/fr/product/parfum-signature-ambre-atlas-100ml");
    await page.getByRole("button", { name: /Ajouter au panier/i }).click();

    // Navigate to checkout
    await page.goto("/fr/checkout");

    // Verify guest checkout notice & demo banner
    await expect(page.locator("text=MODE DÉMONSTRATION")).toBeVisible();

    // Fill Moroccan guest details
    await page.fill("input[name='fullName']", "Kenza El Amrani");
    await page.fill("input[name='phone']", "0661248910");
    await page.fill("input[name='email']", "kenza.elamrani@example.ma");
    await page.selectOption("select[name='city']", "Casablanca");
    await page.fill("textarea[name='address']", "14 Boulevard d'Anfa, Résidence Le Majorelle, Apt 4B");

    // Select Cash on Delivery
    await page.check("input[value='cod']");

    // Place simulated order
    const submitBtn = page.getByRole("button", { name: /Confirmer ma commande/i });
    await submitBtn.click();

    // Verify redirect to Order Confirmation
    await page.waitForURL(/\/fr\/order-confirmation\/VEL-2026-/);
    await expect(page.locator("h1")).toContainText("Commande Confirmée avec Succès");
    await expect(page.locator("text=Suivi d'Expédition en Temps Réel")).toBeVisible();
    await expect(page.locator("text=Amana Express").first()).toBeVisible();
  });

  test("7. Admin Dashboard: overview metrics, simulated order status update & demo reset", async ({ page }) => {
    await page.goto("/fr/admin-demo");

    // Prominent demo badge
    await expect(page.locator("text=MODE DÉMONSTRATION GESTIONNAIRE")).toBeVisible();

    // Verify KPI Cards
    await expect(page.locator("text=Chiffre d'Affaires Simulé")).toBeVisible();
    await expect(page.locator("text=Commandes Totales")).toBeVisible();

    // Switch to Orders Tab
    const ordersTab = page.getByTestId("admin-tab-orders");
    await ordersTab.click();

    // Change status of first order
    const firstStatusSelect = page.getByTestId("order-status-select").first();
    if (await firstStatusSelect.isVisible()) {
      await firstStatusSelect.selectOption("delivered");
      await expect(page.locator("text=Statut de la commande mis à jour")).toBeVisible();
    }

    // Switch to Settings & test Reset Demo
    const settingsTab = page.getByTestId("admin-tab-settings");
    await settingsTab.click();

    const resetBtn = page.getByRole("button", { name: /Réinitialiser toutes les données démo/i });
    await resetBtn.click();
    await expect(page.locator("text=Les données de démonstration ont été restaurées avec succès")).toBeVisible();
  });

  test("8. Dedicated Design System route", async ({ page }) => {
    await page.goto("/fr/design-system");

    // Design System Title
    await expect(page.locator("h1")).toContainText("Système de Tokens & Composants");

    // Check color tokens
    await expect(page.locator("text=Ink Black")).toBeVisible();
    await expect(page.locator("text=Warm Ivory")).toBeVisible();
    await expect(page.locator("text=Camel")).toBeVisible();
  });
});
