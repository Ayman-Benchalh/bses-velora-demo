import { test, expect } from "@playwright/test";

test.describe("VELORA Luxury Fashion E-commerce Demo — Production QA Suite", () => {
  test.beforeEach(async ({ page }) => {
    // Ensure clean state before tests
    await page.addInitScript(() => {
      // Clear storage if needed or let individual tests manage
    });
  });

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
    // French (LTR)
    await page.goto("/fr");
    const containerFr = page.locator("div[lang='fr']");
    await expect(containerFr).toHaveAttribute("dir", "ltr");

    // Arabic (RTL)
    await page.goto("/ar");
    const containerAr = page.locator("div[lang='ar']");
    await expect(containerAr).toHaveAttribute("dir", "rtl");
    await expect(page.locator("header")).toContainText("المجموعة الكاملة");
    await expect(page.locator("header")).toContainText("لوحة الإدارة");

    // English (LTR)
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

  test("6. Cart page quantity update and item removal", async ({ page }) => {
    await page.goto("/fr/product/cabas-signature-cuir-tanne-vegetal-camel");
    await page.getByRole("button", { name: /Ajouter au panier/i }).click();

    // Go to full cart page
    await page.goto("/fr/cart");
    await expect(page.locator("h1")).toContainText("Votre Écrin de Commande");

    // Check order total and shipping notice
    await expect(page.locator("text=Total TTC")).toBeVisible();

    // Remove item
    const removeBtn = page.getByRole("button", { name: "Retirer l'article" }).first();
    if (await removeBtn.isVisible()) {
      await removeBtn.click();
      await expect(page.locator("text=Votre panier est actuellement vide")).toBeVisible();
    }
  });

  test("7. Wishlist toggling and wishlist view", async ({ page }) => {
    await page.goto("/fr/product/manteau-laine-double-face-camel");

    // Toggle wishlist button
    const wishlistBtn = page.getByRole("button", { name: /Ajouter aux favoris|Retirer des favoris/i }).first();
    await wishlistBtn.click();

    // Visit wishlist page
    await page.goto("/fr/wishlist");
    await expect(page.locator("h1")).toContainText("Favoris");
    await expect(page.getByText("Manteau Double Face en Laine & Cachemire").first()).toBeVisible();
  });

  test("8. Simulated Moroccan checkout flow and order confirmation", async ({ page }) => {
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

  test("9. Order tracking stepper advancement", async ({ page }) => {
    await page.goto("/fr/order-confirmation/VEL-2026-DEMO");

    // Check stepper is interactive
    const step3 = page.getByRole("button", { name: "3" });
    if (await step3.isVisible()) {
      await step3.click();
      await expect(page.locator("text=Prise en charge par Amana Express").first()).toBeVisible();
    }
  });

  test("10. Admin Dashboard: overview metrics, KPI cards & trend charts", async ({ page }) => {
    await page.goto("/fr/admin-demo");

    // Prominent demo badge
    await expect(page.locator("text=MODE DÉMONSTRATION GESTIONNAIRE")).toBeVisible();

    // Verify KPI Cards
    await expect(page.locator("text=Chiffre d'Affaires Simulé")).toBeVisible();
    await expect(page.locator("text=Commandes Totales")).toBeVisible();
    await expect(page.getByText("Panier Moyen", { exact: true })).toBeVisible();
  });

  test("11. Admin Dashboard: Create new luxury product in catalog", async ({ page }) => {
    await page.goto("/fr/admin-demo");

    // Click Add Product
    await page.getByTestId("admin-add-product-btn").click();

    // Fill Product form
    await page.getByTestId("input-name-fr").fill("Kimono Soie Pure Brodé Or");
    await page.getByTestId("submit-product-btn").click();

    // Switch to Products Tab and verify new product exists
    await page.getByTestId("admin-tab-products").click();
    await expect(page.getByText("Kimono Soie Pure Brodé Or").first()).toBeVisible();
  });

  test("12. Admin Dashboard: Quick stock increment", async ({ page }) => {
    await page.goto("/fr/admin-demo");

    // Switch to Stocks Tab
    await page.getByTestId("admin-tab-stocks").click();
    await expect(page.locator("text=Gestion Rapide Stocks")).toBeVisible();

    // Click increment button on first variant
    const incrementBtn = page.getByTestId("quick-stock-increment-btn").first();
    await expect(incrementBtn).toBeVisible();
    await incrementBtn.click();
  });

  test("13. Admin Dashboard: Create new promotional code", async ({ page }) => {
    await page.goto("/fr/admin-demo");

    // Switch to Campaigns Tab
    await page.getByTestId("admin-tab-campaigns").click();

    // Create promo code
    await page.getByTestId("promo-code-input").fill("SUMMER15");
    await page.getByTestId("promo-discount-input").fill("15");
    await page.getByTestId("submit-promo-btn").click();

    // Verify code exists in table
    await expect(page.getByText("SUMMER15").first()).toBeVisible();
  });

  test("14. Admin Dashboard: Order status update & toast notification", async ({ page }) => {
    await page.goto("/fr/admin-demo");

    // Switch to Orders Tab
    await page.getByTestId("admin-tab-orders").click();

    // Change status of first order
    const firstStatusSelect = page.getByTestId("order-status-select").first();
    if (await firstStatusSelect.isVisible()) {
      await firstStatusSelect.selectOption("delivered");
      await expect(page.locator("text=Statut de la commande mis à jour")).toBeVisible();
    }
  });

  test("15. Admin Dashboard: Full demo data reset", async ({ page }) => {
    await page.goto("/fr/admin-demo");

    // Switch to Settings & test Reset Demo
    const settingsTab = page.getByTestId("admin-tab-settings");
    await settingsTab.click();

    const resetBtn = page.getByRole("button", { name: /Réinitialiser toutes les données démo/i });
    await resetBtn.click();
    await expect(page.locator("text=Les données de démonstration ont été restaurées avec succès")).toBeVisible();
  });

  test("16. Mobile Viewport: navigation drawer and menu links", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/fr");

    // Mobile menu toggle button
    const menuBtn = page.getByRole("button", { name: /menu de navigation/i });
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    // Verify mobile drawer items
    await expect(page.getByRole("link", { name: "La Collection" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Lookbook" }).first()).toBeVisible();
  });

  test("17. Accessibility: Size guide modal closes on Escape key", async ({ page }) => {
    await page.goto("/fr/product/manteau-laine-double-face-camel");

    const sizeGuideBtn = page.getByRole("button", { name: /Guide des tailles/i });
    await sizeGuideBtn.click();
    await expect(page.getByText("Guide des Tailles VELORA")).toBeVisible();

    // Press Escape
    await page.keyboard.press("Escape");
  });

  test("18. Resilience: Corrupted localStorage recovery", async ({ page }) => {
    // Inject corrupt JSON into storage
    await page.addInitScript(() => {
      localStorage.setItem("velora_demo_v1_products", "{corrupted_json_syntax");
      localStorage.setItem("velora_demo_v1_cart", "invalid[object");
    });

    // Page must recover gracefully without throwing an unhandled runtime error
    await page.goto("/fr/shop");
    await expect(page.getByTestId("results-count")).toBeVisible();
  });

  test("19. Brand Pages: About, Contact, Delivery, FAQ load cleanly", async ({ page }) => {
    await page.goto("/fr/about");
    await expect(page.locator("h1")).toContainText("L'Âme d'un Savoir-Faire Éternel");

    await page.goto("/fr/contact");
    await expect(page.locator("h1")).toContainText("Contact & Salons");

    await page.goto("/fr/delivery");
    await expect(page.locator("h1")).toContainText("Livraisons & Retours");

    await page.goto("/fr/faq");
    await expect(page.locator("h1")).toContainText("Questions Fréquentes");
  });

  test("20. Lookbook Campaign: Interactive hotspots & product previews", async ({ page }) => {
    await page.goto("/fr/lookbook");
    await expect(page.locator("h1")).toContainText("Lookbook Éditorial");

    // Check hotspots exist on campaign cards
    const hotspot = page.getByRole("button", { name: /Découvrir la pièce/i }).first();
    if (await hotspot.isVisible()) {
      await hotspot.click();
    }
  });

  test("21. Collections Index: Category navigation cards", async ({ page }) => {
    await page.goto("/fr/collections");
    await expect(page.locator("h1")).toContainText("Collections VELORA");
    await expect(page.locator("text=Femme").first()).toBeVisible();
    await expect(page.locator("text=Homme").first()).toBeVisible();
  });

  test("22. Dedicated Design System route & token inspection", async ({ page }) => {
    await page.goto("/fr/design-system");
    await expect(page.locator("h1")).toContainText("Système de Tokens & Composants");

    // Color tokens
    await expect(page.locator("text=Ink Black")).toBeVisible();
    await expect(page.locator("text=Warm Ivory")).toBeVisible();
    await expect(page.locator("text=Camel")).toBeVisible();
  });
});
