import { Locale } from "@/types";
import fr from "@/translations/fr.json";
import en from "@/translations/en.json";
import ar from "@/translations/ar.json";

export type Translations = typeof fr;

const dictionaries: Record<Locale, Translations> = {
  fr,
  en,
  ar,
};

export function getTranslations(locale: Locale): Translations {
  return dictionaries[locale] || dictionaries.fr;
}

/**
 * Access nested dictionary path with fallback
 */
export function t(locale: Locale, path: string, params?: Record<string, string | number>): string {
  const dict = getTranslations(locale);
  const keys = path.split(".");
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = dict;
  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = current[k];
    } else {
      // Fallback to French
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let fallbackCurrent: any = dictionaries.fr;
      for (const fk of keys) {
        if (fallbackCurrent && typeof fallbackCurrent === "object" && fk in fallbackCurrent) {
          fallbackCurrent = fallbackCurrent[fk];
        } else {
          return path;
        }
      }
      current = fallbackCurrent;
      break;
    }
  }

  if (typeof current !== "string") {
    return path;
  }

  let result = current;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      result = result.replace(new RegExp(`\\{${key}\\}`, "g"), String(value));
    }
  }

  return result;
}

