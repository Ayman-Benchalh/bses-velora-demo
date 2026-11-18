# VELORA — Contemporary Luxury Fashion E-commerce Demonstration

> **A portfolio flagship demonstration developed by BSES — Benchalh Solution E-commerce System for high-end Moroccan fashion houses, designer labels, footwear boutiques, and luxury accessory retailers.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright-22_Tests_Passed-45ba4b?style=flat&logo=playwright)](https://playwright.dev/)
[![Docker](https://img.shields.io/badge/Docker-Port_3101-2496ED?style=flat&logo=docker)](https://www.docker.com/)

---

## 1. Brand Concept & Vision

* **Brand:** VELORA
* **Tagline:** *"Style that speaks for itself."* / *"Le style qui parle de lui-même."* / *"أناقة تعبر عن ذاتها."*
* **Design Philosophy:** European high-fashion editorial aesthetics combined with authentic Moroccan commercial practicality.
* **Palette:**
  * **Ink Black (`#171717`):** Primary brand dark, strong borders, editorial typography.
  * **Warm Ivory (`#F3EEE6`):** Paper-textured canvas, natural fabric accents, cards.
  * **Camel (`#B78D6C`):** Luxury leather and jewelry gold accent.
  * **Pure White (`#FFFFFF`):** High-contrast product showcase surfaces.
  * **Muted Grey (`#888580`):** Secondary metadata, dividers, and subtle captions.
* **Target Audience:** Moroccan luxury fashion boutiques, bespoke tailoring salons, leather crafters, and prospective commercial clients of BSES.

---

## 2. Key Features & Demonstrations

### A. Storefront Experience
* **Announcement Bar:** Multilingual switcher (FR / EN / AR), Moroccan currency display (`MAD`), and dynamic free-shipping banner.
* **Sticky Editorial Header:** Smooth transparent-to-solid backdrop blur, animated luxury monogram, wishlist counter, and cart trigger.
* **Fashion Campaign Hero:** High-definition photography with atmospheric gradients and direct collection CTAs.
* **Universes of the Maison:** Curated visual portals for **Femme**, **Homme**, **Souliers**, **Maroquinerie**, and **Accessoires**.
* **L'Atelier & La Matière:** Editorial storytelling highlighting Fez raw silk weaving, Italian double-faced wool, and Marrakech leathercraft.
* **Interactive Lookbook (`/lookbook`):** Cinematic campaigns with clickable **Shop-the-Look Hotspot Pins (`+`)** linking directly to garment silhouettes.
* **Complete Catalog (`/shop`):**
  * Toggle between **Classic 4-Column Grid** and **Editorial Asymmetric Grid**.
  * Multi-dimensional filtering by Category, Price (MAD), Size, and Color swatches.
  * Real-time search query filtering and dismissible active filter chips.
  * Responsive mobile filter slide drawer.
* **Product Detail Page (`/product/[slug]`):**
  * High-resolution image viewport with interactive lightbox zoom.
  * Dynamic size and color pickers with real-time per-variant stock counts (`En stock`, `Pièces limitées`, `Rupture`).
  * Sizing Matrix Modal (measurements in centimeters and inches).
  * Tabbed specifications: Materials & Care, Moroccan Atelier Origin, and Delivery/Returns policies.
  * Curated related products grid.

### B. Moroccan Commercial Checkout & Order Tracking
* **Frictionless Moroccan Guest Checkout (`/checkout`):**
  * Validation tailored to Moroccan mobile numbers (`+212 6...`, `+212 7...`, `06...`, `07...`).
  * Instant city selector with calculated delivery estimates (e.g., Casablanca same-day / 24h, Rabat/Marrakech 24-48h, Southern provinces 48-72h).
  * **Payment Methods:**
    * **Paiement en espèces à la livraison (Cash on Delivery)** with courier instructions.
    * **Simulated Online Card Gateway (CMI / Visa / Mastercard)** with clear non-billing demonstration disclaimer.
* **Real-Time Order Confirmation & Tracking (`/order-confirmation/[orderId]`):**
  * Generates an authentic luxury reference code (e.g. `VEL-2026-4892`).
  * 5-step visual tracking timeline: *Confirmée* → *En préparation atelier* → *Expédiée Amana Express* → *En livraison* → *Livrée*.
  * Interactive status stepper simulation controls.

### C. Merchant Administration Dashboard (`/admin-demo`)
* Public demonstration URL featuring a prominent **`MODE DÉMONSTRATION`** banner.
* **Executive KPIs:** Simulated Gross Revenue (MAD), Total Orders, Average Order Value (AOV), and Low Stock Alerts.
* **Interactive Sales Chart:** SVG trend visualization of 7-day revenue performance.
* **Product Inventory Management:**
  * Add new high-fashion products with multi-language titles, prices, sizes, and imagery.
  * Edit and update existing pieces.
  * Delete pieces with confirmation dialogs.
  * **Quick Stock Manager:** Instant variant-level stock increment/decrement buttons.
* **Order Management:** View orders, inspect customer shipping details, and modify order status in real time.
* **Customer Directory:** VIP and regular client spending history.
* **Promotional Campaigns:** Activate/deactivate discount codes (e.g., `VELORA10`, `WELCOME2026`, `VIPVELORA`).
* **Settings & Demo Reset:** One-click restoration of all 36 seed products, initial orders, and clearing of localStorage changes.
* **Instant Client Synchronization:** All mutations made in the admin immediately update the storefront and catalog via reactive storage state!

### D. Tri-Lingual Internationalization with True RTL
* **French (`/fr`):** Default language with refined haute-couture phrasing.
* **Arabic (`/ar`):** Genuine right-to-left layout (`dir="rtl"`) with Arabic typography (`Cairo`), mirrored navigation, and authentic Moroccan fashion vocabulary.
* **English (`/en`):** International luxury presentation.
* Seamless locale switching preserving active cart and wishlist states.

### E. BSES Client Experience & Floating Control Toolbar
* Discreet, elegant floating widget **DEMO BSES** at the screen corner:
  * Quick links to Storefront, Admin Dashboard, and Design System.
  * One-click demo data reset.
  * **"Créer une boutique similaire"** commercial consultation modal.
  * Official BSES Agency contact email: `Bses47113@gmail.com`
  * Direct WhatsApp consultation link with pre-filled inquiry message.

---

## 3. Technology Stack

* **Framework:** Next.js 15 (App Router, Standalone build output)
* **Language:** TypeScript 5 (Strict mode)
* **Styling:** Tailwind CSS 3.4 (Custom design tokens, paper textures, animations)
* **Icons:** Lucide React
* **State & Persistence:** React Context + HTML5 `localStorage` with multi-tab storage synchronization
* **Testing:** Playwright End-to-End Test Suite
* **Containerization:** Docker multi-stage Alpine build (`compose.yaml`)
* **Continuous Integration:** GitHub Actions (`.github/workflows/ci.yml`)

---

## 4. Local Quick Start (Without Docker)

### Prerequisites
* Node.js 20 or higher
* npm 10 or higher

### Steps
```bash
# 1. Clone repository
git clone https://github.com/Ayman-Benchalh/bses-velora-demo.git
cd bses-velora-demo

# 2. Install dependencies
npm install

# 3. Typecheck & Lint
npm run typecheck
npm run lint

# 4. Start Development Server
npm run dev
```

Open your browser at **[http://localhost:3000](http://localhost:3000)**. It will automatically redirect to **[http://localhost:3000/fr](http://localhost:3000/fr)**.

---

## 5. Docker Deployment (Local Container at Port 3101)

The project includes a multi-stage production `Dockerfile` leveraging Next.js standalone output and a `compose.yaml` configured to map host port **3101** to container port **3000**.

### Run with Docker Compose
```bash
# Build image and start container in detached mode
docker compose up --build -d
```

### Access Local Docker Application
Open your browser at:
👉 **[http://localhost:3101](http://localhost:3101)**

### Stop Docker Container
```bash
docker compose down
```

---

## 6. Vercel Deployment

This application is fully optimized for zero-config native Vercel deployment:
1. Push this repository to GitHub or GitLab.
2. In the Vercel Dashboard, click **"Add New Project"** and select `bses-velora-demo`.
3. Framework Preset: **Next.js** (detected automatically).
4. No environment variables or Docker configuration required.
5. Click **"Deploy"**.

---

## 7. Running End-to-End Tests with Playwright

Playwright tests verify critical user journeys across desktop and mobile viewports:
```bash
# Install Playwright browser if not already installed
npx playwright install chromium

# Run all end-to-end tests
npm run test:e2e
```

### Test Coverage Highlights (22 Comprehensive Scenarios):
1. **Homepage & Brand Identity:** Verifies header, hero section, BSES badge, and footer attribution.
2. **I18n & True RTL:** Verifies switching between `/fr`, `/en`, and `/ar` with genuine right-to-left layout and typography.
3. **Shop Faceted Filtering:** Tests category filtering, active filter badges, price boundaries, and clear all.
4. **Product PDP:** Tests variant selection (size, color), live stock indicators, and Size Guide modal.
5. **Cart & Promo Engine:** Tests adding items, sliding drawer, applying promo code `VELORA10`, and persistence on refresh.
6. **Moroccan Logistics & Guest Checkout:** Tests guest checkout form validation with Moroccan phone numbers, Cash on Delivery option, and confirmation redirect.
7. **Simulated Card Gateway:** Tests CMI / Visa simulation with clear client demonstration disclaimers.
8. **Real-time Order Stepper:** Verifies authentic reference codes (`VEL-2026-XXXX`) and interactive logistics timeline.
9. **Merchant Admin Dashboard:** Tests simulated KPI calculations, chart rendering, order status updates, product creation/editing, and demo reset.
10. **Lookbook & Hotspots:** Verifies editorial layouts and interactive shop-the-look hotspot pins.
11. **Mobile Ergonomics & Accessibility:** Verifies 375x667 drawer navigation, 48px touch targets, modal Escape-key closing, and localStorage JSON corruption resilience.

For detailed test logs, see [`QA_REPORT.md`](file:///d:/Ayman%20code/All%20code/me-githubpro/QA_REPORT.md), [`BUG_FIX_REPORT.md`](file:///d:/Ayman%20code/All%20code/me-githubpro/BUG_FIX_REPORT.md), [`MOBILE_AUDIT.md`](file:///d:/Ayman%20code/All%20code/me-githubpro/MOBILE_AUDIT.md), and [`CHANGELOG.md`](file:///d:/Ayman%20code/All%20code/me-githubpro/CHANGELOG.md).

---

## 8. Portfolio Client Attribution & Contact

This project is authored and maintained by:
* **Agency:** BSES — Benchalh Solution E-commerce System
* **Specialty:** Tailored luxury e-commerce platforms, Moroccan logistics integration, high-contrast editorial UX, and multilingual/RTL digital experiences.
* **Executive Inquiries:** [Bses47113@gmail.com](mailto:Bses47113@gmail.com)
* **Official WhatsApp:** [+212 694-991485](https://wa.me/212694991485)
* **Live Production Demonstration:** [https://bses-velora-demo.vercel.app/fr](https://bses-velora-demo.vercel.app/fr)

