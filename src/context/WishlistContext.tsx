"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface WishlistContextType {
  items: string[];
  toggleWishlist: (productId: string) => boolean; // returns true if added, false if removed
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  count: number;
}

const WISHLIST_STORAGE_KEY = "velora_demo_wishlist";

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not load wishlist from storage", e);
    }
  }, []);

  const saveWishlist = (newItems: string[]) => {
    setItems(newItems);
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newItems));
    } catch (e) {
      console.error(e);
    }
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

