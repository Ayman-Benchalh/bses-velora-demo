# CHANGELOG — VELORA Luxury Fashion E-commerce Demonstration

All notable changes to the **VELORA** project are documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/) and follows the luxury design and engineering standards established by **BSES — Benchalh Solution E-commerce System**.

---

## [1.2.0] - 2026-11-18 — Production Refinement, M3 Measurement Alignment & Multi-Platform QA

### Summary
Comprehensive production refinement and hardening of the VELORA e-commerce demonstration. Preserved 100% of the approved luxury editorial identity (Ink Black, Warm Ivory, Camel, serif typography, asymmetric layouts) while standardizing measurements to Material Design 3 guidelines (4px/8px rhythm, 48px touch targets), eliminating placeholder contact credentials, hardening data storage resilience, injecting production security headers, and expanding Playwright end-to-end tests from 8 to 22 scenarios (100% pass rate).

---

### Architectural & Security Enhancements
- **Security Headers (`next.config.ts`):**
  - Added `X-Frame-Options: SAMEORIGIN` to mitigate clickjacking.
  - Added `X-Content-Type-Options: nosniff` to prevent MIME-type confusion attacks.
  - Configured `Referrer-Policy: strict-origin-when-cross-origin`.
  - Added strict `Permissions-Policy` disabling unauthorized camera, microphone, and geolocation access.
- **Dynamic SEO & Metadata (`sitemap.ts`, `robots.ts`, `layout.tsx`):**
  - Implemented dynamic `src/app/sitemap.ts` generating multilingual URLs for all 36 luxury products across `/fr`, `/en`, and `/ar` (117+ indexed paths).
  - Implemented dynamic `src/app/robots.ts` serving valid crawler policies.
  - Implemented localized `generateMetadata` with OpenGraph images, Twitter Card tags, and alternate hreflang canonical links.
- **Client Agency Attribution & Sanitization:**
  - Removed all instances of the placeholder phone number `+212600000000`.
  - Centralized contact constants in `src/lib/constants.ts`: direct executive email set to `Bses47113@gmail.com`.
  - Implemented `getBsesWhatsAppUrl()` with strict validation that rejects placeholder digits and cleanly omits the WhatsApp CTA when unconfigured or non-functional.
  - Updated `FloatingBsesDemo.tsx`, `ContactView.tsx`, and `.env.example`.

---

### Data Resilience & Safe Storage Architecture
- **Safe Storage Helper (`src/lib/storage.ts`):**
  - Added `safeGetStorage`, `safeSetStorage`, `safeRemoveStorage` with JSON serialization error trapping, SSR protection, and QuotaExceeded recovery.
- **Versioned Storage Keys (`src/lib/constants.ts`):**
  - Migrated storage keys to versioned namespaces: `velora_products_v1`, `velora_cart_v1`, `velora_wishlist_v1`, `velora_orders_v1`, `velora_promo_v1`, `velora_theme_v1`.
- **Context Hardening (`StoreContext.tsx`, `CartContext.tsx`, `WishlistContext.tsx`):**
  - Hardened state synchronization across browser tabs via `storage` event listeners.
  - Enforced variant stock boundary checks: `Math.min(quantity, variantStock)`.
  - Prevented data corruption on malformed JSON payload injections.

---

### Material Design 3 Measurement & Usability Alignment
- **Design Tokens (`src/styles/tokens.ts`):**
  - Created centralized token definitions reflecting M3 layout foundations:
    - 4px baseline grid / 8px spatial rhythm (`SPACING`).
    - Minimum 48x48 CSS pixel touch targets for all primary mobile interactions (`TOUCH_TARGETS.MIN_TARGET = 48`).
    - Responsive gutters: Compact (16px), Medium (24px), Expanded (32px).
    - Standardized typography scale with luxury high-contrast serif and clean sans-serif pairing.
- **Modal Keyboard Accessibility:**
  - Added `Escape` key listeners and focus retention across `SizeGuideModal`, `QuickViewModal`, and `ProductFormModal`.

---

### QA & Testing Suite Expansion
- **Playwright E2E Suite (`tests/e2e/velora.spec.ts`):**
  - Expanded test coverage from 8 to **22 comprehensive scenarios**:
    1. Homepage Brand & Navigation Check
    2. Multi-language and True RTL Layout Switch (`/fr`, `/en`, `/ar`)
    3. Category and Faceted Catalog Filtering (`/shop`)
    4. Price Filter Boundary Interactions
    5. Search Input Filtering & Active Filter Badges
    6. Complete Product Detail Page (PDP) & Size Guide Modal
    7. Add to Cart, Quantity Management & Drawer Flow
    8. Promotional Code Validation (`VELORA10`)
    9. Wishlist Add, Remove, and Empty State Interactions
    10. Moroccan Guest Checkout Form Validation (Phone, City, COD)
    11. Simulated Card Gateway Checkout with Disclaimer
    12. Order Confirmation Code Generation & Live Stepper Simulation
    13. Admin Dashboard KPIs, Chart Rendering & Order Status Update
    14. Admin Product Creation, Editing, and Real-time Catalog Sync
    15. Admin Demo Reset to Seed Data
    16. Lookbook Editorial Silhouettes & Shop-the-Look Hotspots
    17. Design System Token Showcase Verification (`/design-system`)
    18. BSES Floating Demo Widget & Contact Modal
    19. Static Institutional Pages (About, Delivery, Returns, FAQ)
    20. Mobile Viewport Layout and Navigation Drawer (375x667)
    21. Keyboard Accessibility: Modal Close on Escape Key
    22. LocalStorage Corruption Resilience & Safe Recovery
  - **Results:** 22 passed in 1.4 minutes on Chromium.

---

### Deployment & Containerization
- **Multi-Stage Docker Container (`compose.yaml`, `Dockerfile`):**
  - Node.js 20 Alpine multi-stage build producing standalone Next.js image.
  - Verified container startup on host port **3101** mapping to container port 3000.
  - Verified HTTP 200 responses with valid headers on `/fr`, `/en`, `/ar`, `/fr/shop`, `/fr/admin-demo`, `/sitemap.xml`, and `/robots.txt`.

---

## [1.1.0] - 2026-11-18 — Initial MVP Implementation
- Core Next.js 15 App Router architecture.
- 36 curated luxury fashion products with localized French, English, and Arabic metadata.
- Moroccan checkout simulation with Cash on Delivery and CMI card simulation.
- Initial 8 Playwright test scenarios.
- Multi-language support with next-intl integration.
