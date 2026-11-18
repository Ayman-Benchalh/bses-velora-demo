import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Locale } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats currency in Moroccan Dirhams (MAD) tailored to the active locale
 */
export function formatMAD(amount: number, locale: Locale = "fr"): string {
  const rounded = Math.round(amount);
  
  if (locale === "ar") {
    const formatted = new Intl.NumberFormat("ar-MA").format(rounded);
    return `${formatted} د.م.`;
  }
  
  if (locale === "en") {
    const formatted = new Intl.NumberFormat("en-US").format(rounded);
    return `MAD ${formatted}`;
  }
  
  // Default French format
  const formatted = new Intl.NumberFormat("fr-FR").format(rounded);
  return `${formatted} MAD`;
}

/**
 * Formats date into localized human-readable string
 */
export function formatDate(dateString: string, locale: Locale = "fr"): string {
  try {
    const date = new Date(dateString);
    const localeCode = locale === "ar" ? "ar-MA" : locale === "en" ? "en-US" : "fr-FR";
    return new Intl.DateTimeFormat(localeCode, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Generates an authentic luxury order reference (e.g., VEL-2026-4892)
 */
export function generateOrderNumber(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `VEL-${year}-${randomNum}`;
}

/**
 * Estimated delivery timeframe for Moroccan cities
 */
export function getDeliveryEstimate(city: string, locale: Locale = "fr"): string {
  const casablancaCities = ["casablanca", "dar bouazza", "bouskoura", "mohammedia"];
  const majorCities = ["rabat", "marrakech", "tanger", "agadir", "fes", "meknes", "kenitra"];
  
  const lowerCity = city.trim().toLowerCase();
  
  if (casablancaCities.includes(lowerCity)) {
    if (locale === "ar") return "توصيل خلال 24 ساعة (نفس اليوم)";
    if (locale === "en") return "24 hours (Same-day delivery)";
    return "Livraison sous 24h (Même jour possible)";
  }
  
  if (majorCities.includes(lowerCity)) {
    if (locale === "ar") return "توصيل خلال 24 إلى 48 ساعة";
    if (locale === "en") return "24 to 48 hours delivery";
    return "Livraison express 24-48h";
  }
  
  if (locale === "ar") return "توصيل خلال 48 إلى 72 ساعة في جميع أنحاء المغرب";
  if (locale === "en") return "48 to 72 hours across Morocco";
  return "Livraison 48-72h partout au Maroc";
}

/**
 * Moroccan cities list for fast checkout completion
 */
export const MOROCCAN_CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Tanger",
  "Agadir",
  "Fès",
  "Meknès",
  "Tétouan",
  "Oujda",
  "Kénitra",
  "El Jadida",
  "Nador",
  "Béni Mellal",
  "Safi",
  "Mohammedia",
  "Essaouira",
  "Dakhla",
  "Laâyoune",
  "Ifrane",
  "Ouarzazate",
];

