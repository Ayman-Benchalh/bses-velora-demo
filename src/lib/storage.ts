/**
 * Safe local storage utilities with corruption recovery and SSR protection.
 */

export function safeGetStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed === null || parsed === undefined) return fallback;
    return parsed as T;
  } catch (error) {
    console.warn(`[VELORA Demo] Corrupted data detected in localStorage key "${key}". Resetting to fallback.`, error);
    try {
      window.localStorage.removeItem(key);
    } catch {}
    return fallback;
  }
}

export function safeSetStorage<T>(key: string, value: T): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`[VELORA Demo] Failed to save key "${key}" to localStorage:`, error);
    return false;
  }
}

export function safeRemoveStorage(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[VELORA Demo] Failed to remove key "${key}" from localStorage:`, error);
  }
}

