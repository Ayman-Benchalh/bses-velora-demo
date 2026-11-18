/**
 * VELORA Luxury Fashion E-commerce Demo — System Constants & Configuration
 * Developed by BSES — Benchalh Solution E-commerce System
 */

export const BSES_AGENCY_NAME = "BSES — Benchalh Solution E-commerce System";
export const BSES_CONTACT_EMAIL = "Bses47113@gmail.com";

/**
 * Returns a configured agency WhatsApp URL only when a verified, approved URL is provided in the environment.
 * Rejects placeholder or non-configured numbers to uphold demonstration honesty.
 */
export function getBsesWhatsAppUrl(message?: string): string | null {
  const envUrl = process.env.NEXT_PUBLIC_BSES_WHATSAPP_URL || process.env.NEXT_PUBLIC_AGENCY_WHATSAPP;
  if (!envUrl || envUrl.trim() === "" || envUrl.includes("212600000000") || envUrl.includes("00000000")) {
    return null;
  }

  try {
    const url = new URL(envUrl);
    if (message) {
      url.searchParams.set("text", message);
    }
    return url.toString();
  } catch {
    return envUrl;
  }
}

/**
 * Versioned localStorage keys ensuring clean state isolation and resilience
 */
export const STORAGE_KEYS = {
  PRODUCTS: "velora_demo_v1_products",
  ORDERS: "velora_demo_v1_orders",
  CUSTOMERS: "velora_demo_v1_customers",
  CAMPAIGNS: "velora_demo_v1_campaigns",
  CART: "velora_demo_v1_cart",
  PROMO: "velora_demo_v1_promo",
  WISHLIST: "velora_demo_v1_wishlist",
} as const;

/**
 * Material Design 3 measurement & touch target standards
 */
export const M3_MEASUREMENTS = {
  minTouchTargetPx: 48,
  baselineGridPx: 4,
  layoutRhythmPx: 8,
  containerMaxWidthPx: 1280,
  gutters: {
    compact: 16, // mobile (< 600px)
    medium: 24,  // tablet (600 - 840px)
    expanded: 32 // desktop (> 840px)
  },
  durations: {
    quick: 150,
    standard: 300,
    complex: 500,
  },
} as const;

