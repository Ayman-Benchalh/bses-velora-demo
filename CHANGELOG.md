# CHANGELOG — VELORA Luxury Fashion E-commerce Demonstration

All notable changes to the **VELORA** project are documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/) and follows the luxury design and engineering standards established by **BSES — Benchalh Solution E-commerce System**.

---

## [1.3.1] - 2026-11-18 — Critical Mobile Navigation Drawer Fix via React Portal

### Summary
Diagnosed and eliminated the critical mobile navigation drawer defect where opening the hamburger menu rendered a 76px truncated white panel on the left with navigation links hidden. Implemented a React Portal architecture mounting directly onto `document.body` to completely escape ancestor `backdrop-filter` containing blocks. Added full 100dvh viewport height, `w-[min(85vw,360px)]` responsive width, independent scroll with `overscroll-contain`, accessible focus trapping, keyboard `Escape` closing, route change auto-closing, and 13 dedicated multi-viewport Playwright regression tests.

### Key Technical Remediation
- **Root Cause:** In CSS Transforms & Filter Effects Module specifications, `backdrop-filter` creates a new containing block for `position: fixed` elements. Because `<header>` had `backdrop-blur-sm` / `backdrop-blur-md`, the fixed drawer was trapped inside `<header>`'s 76px height, clipping all navigation links.
- **Portal Implementation (`Header.tsx`):** Teleported the drawer and full-screen backdrop directly to `document.body` via `createPortal`, ensuring true viewport coordinates.
- **Viewport Ergonomics:** Drawer height set to `100dvh` (dynamic viewport height) and width bounded to `min(85vw, 360px)`, avoiding address bar clipping on mobile Safari and Android Chrome.
- **Independent Scroll:** Main menu links container is `flex-1 overflow-y-auto overscroll-contain`, enabling smooth thumb scrolling on short screens (320px–568px).
- **RTL Arabic Alignment:** Set `dir={locale === "ar" ? "rtl" : "ltr"}` and `right-0` / `left-0` logic so Arabic users experience natural right-edge slide-in.
- **Accessibility & Focus:** Added `aria-expanded` and `aria-controls` on the hamburger trigger, initial focus to the close button on open, focus restoration on close, and `Escape` key dismissal.
- **Automated Regression Suite (`tests/e2e/mobile_drawer.spec.ts`):** 13 automated tests covering 7 viewports (320px–768px), backdrop clicks, route changes, RTL, and screenshot generation (100% pass rate).

---

## [1.3.0] - 2026-11-18 — Official BSES Integration, Admin KPI Derivation & Multi-Viewport Zero-Overflow Hardening

### Summary
Production-grade hardening across agency attribution, admin metrics, multilingual localization, catalog ergonomics, mobile gestures, and automated verification suites. All 22 Playwright tests and 11 multi-viewport tests pass with 100% success.

### Key Changes & Fixes
- **Official BSES WhatsApp Integration (Issue 1):**
  - Completely purged all traces of the placeholder telephone number `+212600000000` and link `https://wa.me/212600000000`.
  - Configured verified agency WhatsApp number: `+212694991485` (Display: `+212 694-991485`).
  - Implemented immutable URL generation via `getBsesWhatsAppUrl()` with custom prefilled consultation message.
  - Added dedicated WhatsApp consultation CTA button inside the mobile drawer navigation (`Header.tsx`).
  - Verified official contact across `Footer.tsx`, `ContactView.tsx`, `FloatingBsesDemo.tsx`, and `AdminDashboard.tsx`.
- **Admin Dashboard KPI & Sales Chart Mathematical Consistency (Issue 2):**
  - Expanded `src/data/seed-orders.ts` to 7 localized daily seed orders totaling exactly **53,700 MAD**.
  - Dynamically derived `salesByDay` histogram values from `orders.filter(o => o.status !== "cancelled")` grouped by weekday.
  - Synchronized total revenue (53,700 MAD), daily histogram bar sums (53,700 MAD), and AOV (7,671 MAD).
- **English Localization Purity (Issue 3):**
  - Eliminated French leaks (`Découvrir`, `Explorer`, `SÉLECTION EXCLUSIVE`, untranslated PDP accordions) on `/en`.
  - Added full translation parity in `fr.json`, `en.json`, and `ar.json` for all collection, PDP, craft, and sizing labels.
- **Simulated Real-World Claims Disclaimers (Issue 4):**
  - Added explicit `(Simulé)` and `(Démonstration)` disclaimers to delivery schedules, courier SMS notifications, CMI card sandbox, and physical atelier locations.
- **Category-Aware Catalog Size Filtering (Issue 5):**
  - Dynamically scoped `availableSizes` in `ShopCatalog.tsx` to active category products (shoes show only shoe sizes 36–41; apparel shows XS–XL).
  - Implemented automatic pruning of incompatible selected sizes when switching categories.
  - Increased size filter button touch target to `min-w-[36px] min-h-[36px]`.
- **Mobile Navigation Ergonomics & Zero Horizontal Overflow (Issue 6):**
  - Added `document.body.style.overflow = "hidden"` scroll-lock when mobile navigation drawer is active.
  - Added keyboard `Escape` key close listener in `Header.tsx`.
  - Added `min-w-0` to `AnnouncementBar.tsx` flex child and `overflow-x: hidden` in `globals.css` and `AdminDashboard.tsx`.
  - Resolved 5px overflow at 320px ultra-compact mobile viewport; verified zero overflow across 11 viewports (320px–1920px).

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
  - Implemented dynamic `src/app/sitemap.ts` generating multilingual URLs for all 36 luxury products across `/fr`, `/en`, and `/ar` (171+ indexed paths).
  - Implemented dynamic `src/app/robots.ts` serving valid crawler policies.
  - Implemented localized `generateMetadata` with OpenGraph images, Twitter Card tags, and alternate hreflang canonical links.

---

## [1.1.0] - 2026-11-18 — Initial MVP Implementation
- Core Next.js 15 App Router architecture.
- 36 curated luxury fashion products with localized French, English, and Arabic metadata.
- Moroccan checkout simulation with Cash on Delivery and CMI card simulation.
- Initial 8 Playwright test scenarios.
- Multi-language support with next-intl integration.
