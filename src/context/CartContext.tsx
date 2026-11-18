"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { useStore } from "./StoreContext";
import { STORAGE_KEYS } from "@/lib/constants";
import { safeGetStorage, safeSetStorage, safeRemoveStorage } from "@/lib/storage";

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

const FREE_SHIPPING_THRESHOLD = 1000;
const STANDARD_SHIPPING_FEE = 40;

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const { campaigns } = useStore();

  // Load cart from localStorage with corruption protection
  useEffect(() => {
    const loadedItems = safeGetStorage<CartItem[]>(STORAGE_KEYS.CART, []);
    setItems(loadedItems);

    const loadedPromo = safeGetStorage<{ code: string; percentage: number } | null>(STORAGE_KEYS.PROMO, null);
    if (loadedPromo) {
      setPromoCode(loadedPromo.code);
      setDiscountPercentage(loadedPromo.percentage);
    }
  }, []);

  const saveCart = (newItems: CartItem[]) => {
    setItems(newItems);
    safeSetStorage(STORAGE_KEYS.CART, newItems);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const addItem = (product: Product, size: string, color: string, quantity = 1) => {
    const effectivePrice = product.salePrice ?? product.price;
    const itemId = `${product.id}-${size}-${color}`;

    const existingIndex = items.findIndex((i) => i.id === itemId);
    const matchingVariant = product.variants.find(
      (v) =>
        v.size === size &&
        (v.color === color ||
          v.colorHex === color ||
          v.colorName.fr === color ||
          v.colorName.en === color ||
          v.colorName.ar === color)
    );
    const maxStock = matchingVariant ? matchingVariant.stock : 99;

    let updated: CartItem[];
    if (existingIndex > -1) {
      const currentQty = items[existingIndex].quantity;
      const targetQty = Math.min(currentQty + quantity, maxStock);
      updated = [...items];
      updated[existingIndex].quantity = Math.max(1, targetQty);
    } else {
      const initialQty = Math.min(Math.max(1, quantity), maxStock);
      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity: initialQty,
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
    const targetItem = items.find((i) => i.id === itemId);
    const matchingVariant = targetItem?.product.variants.find(
      (v) =>
        v.size === targetItem.selectedSize &&
        (v.color === targetItem.selectedColor ||
          v.colorHex === targetItem.selectedColor ||
          v.colorName.fr === targetItem.selectedColor ||
          v.colorName.en === targetItem.selectedColor ||
          v.colorName.ar === targetItem.selectedColor)
    );
    const maxStock = matchingVariant ? matchingVariant.stock : 99;
    const boundedQty = Math.min(quantity, maxStock);

    const updated = items.map((i) => (i.id === itemId ? { ...i, quantity: boundedQty } : i));
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
    setPromoCode(null);
    setDiscountPercentage(0);
    safeRemoveStorage(STORAGE_KEYS.PROMO);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const active = campaigns.find((c) => c.code.toUpperCase() === cleanCode && c.isActive);

    if (active) {
      setPromoCode(active.code);
      setDiscountPercentage(active.discountPercentage);
      safeSetStorage(STORAGE_KEYS.PROMO, { code: active.code, percentage: active.discountPercentage });
      return { success: true, discount: active.discountPercentage };
    }

    // Default fallback check if code is VELORA10
    if (cleanCode === "VELORA10") {
      setPromoCode("VELORA10");
      setDiscountPercentage(10);
      safeSetStorage(STORAGE_KEYS.PROMO, { code: "VELORA10", percentage: 10 });
      return { success: true, discount: 10 };
    }

    return { success: false, message: "Code promotionnel invalide ou expiré." };
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setDiscountPercentage(0);
    safeRemoveStorage(STORAGE_KEYS.PROMO);
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

