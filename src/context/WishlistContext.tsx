"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { STORAGE_KEYS } from "@/lib/constants";
import { safeGetStorage, safeSetStorage } from "@/lib/storage";

interface WishlistContextType {
  items: string[];
  toggleWishlist: (productId: string) => boolean; // returns true if added, false if removed
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const loaded = safeGetStorage<string[]>(STORAGE_KEYS.WISHLIST, []);
    setItems(loaded);
  }, []);

  const saveWishlist = (newItems: string[]) => {
    setItems(newItems);
    safeSetStorage(STORAGE_KEYS.WISHLIST, newItems);
  };

  const toggleWishlist = (productId: string): boolean => {
    const exists = items.includes(productId);
    let updated: string[];
    let added = false;

    if (exists) {
      updated = items.filter((id) => id !== productId);
    } else {
      updated = [productId, ...items];
      added = true;
    }

    saveWishlist(updated);
    return added;
  };

  const isInWishlist = (productId: string) => items.includes(productId);

  const clearWishlist = () => {
    saveWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        count: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

