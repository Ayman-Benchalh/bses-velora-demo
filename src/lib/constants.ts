/**
 * VELORA Luxury Fashion E-commerce Demo — System Constants & Configuration
 * Developed by BSES — Benchalh Solution E-commerce System
 */

export const BSES_AGENCY_NAME = "BSES — Benchalh Solution E-commerce System";
export const BSES_CONTACT_EMAIL = "Bses47113@gmail.com";
export const BSES_OFFICIAL_PHONE = "+212694991485";
export const BSES_OFFICIAL_PHONE_DISPLAY = "+212 694-991485";
export const BSES_OFFICIAL_WHATSAPP_BASE = "https://wa.me/212694991485";
export const BSES_DEFAULT_WHATSAPP_MESSAGE =
  "Bonjour BSES, je viens de découvrir votre démonstration VELORA et je souhaite discuter de la création d'une boutique e-commerce similaire.";

/**
 * Returns the official BSES agency WhatsApp URL with a prefilled message.
 * Never falls back to any placeholder or invalid phone number.
 */
export function getBsesWhatsAppUrl(customMessage?: string): string {
  const envUrl = process.env.NEXT_PUBLIC_BSES_WHATSAPP_URL || process.env.NEXT_PUBLIC_AGENCY_WHATSAPP;
  
  // Guard against any obsolete placeholder strings
  const baseUrl = (!envUrl || envUrl.includes("212600000000") || envUrl.includes("00000000"))
    ? BSES_OFFICIAL_WHATSAPP_BASE
    : envUrl.trim();

  const message = customMessage || BSES_DEFAULT_WHATSAPP_MESSAGE;

  try {
    const url = new URL(baseUrl);
    url.searchParams.set("text", message);
    return url.toString();
  } catch {
    return `${BSES_OFFICIAL_WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
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
