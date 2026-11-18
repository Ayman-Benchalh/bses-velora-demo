"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { useStore } from "./StoreContext";

interface CartContextType {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  promoCode: string | null;
  discountPercentage: number;
  applyPromoCode: (code: string) => { success: boolean; message?: string; discount?: number };
  removePromoCode: () => void;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
  freeShippingRemaining: number;
}

const CART_STORAGE_KEY = "velora_demo_cart";
const PROMO_STORAGE_KEY = "velora_demo_promo";
const FREE_SHIPPING_THRESHOLD = 1000;
const STANDARD_SHIPPING_FEE = 40;

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const { campaigns } = useStore();

  // Load cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedPromo = localStorage.getItem(PROMO_STORAGE_KEY);
      if (storedPromo) {
        const parsed = JSON.parse(storedPromo);
        setPromoCode(parsed.code);
        setDiscountPercentage(parsed.percentage);
      }
    } catch (e) {
      console.warn("Could not load cart from localStorage", e);
    }
  }, []);

  const saveCart = (newItems: CartItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
    } catch (e) {
      console.error(e);
    }
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const addItem = (product: Product, size: string, color: string, quantity = 1) => {
    const effectivePrice = product.salePrice ?? product.price;
    const itemId = `${product.id}-${size}-${color}`;

    const existingIndex = items.findIndex((i) => i.id === itemId);

    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = [...items];
      updated[existingIndex].quantity += quantity;
    } else {
      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity,
        price: effectivePrice,
      };
      updated = [newItem, ...items];
    }

    saveCart(updated);
    openDrawer();
  };

  const removeItem = (itemId: string) => {
    const updated = items.filter((i) => i.id !== itemId);
    saveCart(updated);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    const updated = items.map((i) => (i.id === itemId ? { ...i, quantity } : i));
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
    setPromoCode(null);
    setDiscountPercentage(0);
    try {
      localStorage.removeItem(PROMO_STORAGE_KEY);
    } catch {}
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const active = campaigns.find((c) => c.code.toUpperCase() === cleanCode && c.isActive);

    if (active) {
      setPromoCode(active.code);
      setDiscountPercentage(active.discountPercentage);
      try {
        localStorage.setItem(
          PROMO_STORAGE_KEY,
          JSON.stringify({ code: active.code, percentage: active.discountPercentage })
        );
      } catch {}
      return { success: true, discount: active.discountPercentage };
    }

    // Default fallback check if code is VELORA10
    if (cleanCode === "VELORA10") {
      setPromoCode("VELORA10");
      setDiscountPercentage(10);
      try {
        localStorage.setItem(
          PROMO_STORAGE_KEY,
          JSON.stringify({ code: "VELORA10", percentage: 10 })
        );
      } catch {}
      return { success: true, discount: 10 };
    }

    return { success: false, message: "Code promotionnel invalide ou expiré." };
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setDiscountPercentage(0);
    try {
      localStorage.removeItem(PROMO_STORAGE_KEY);
    } catch {}
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round((subtotal * discountPercentage) / 100);
  const shipping = items.length === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = Math.max(0, subtotal - discount + shipping);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        promoCode,
        discountPercentage,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discount,
        shipping,
        total,
        itemCount,
        freeShippingRemaining,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

