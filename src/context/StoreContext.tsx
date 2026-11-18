"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Order, Customer, PromoCampaign, OrderStatus } from "@/types";
import { INITIAL_PRODUCTS } from "@/data/products";
import { INITIAL_ORDERS, INITIAL_CUSTOMERS, INITIAL_PROMO_CAMPAIGNS } from "@/data/seed-orders";
import { STORAGE_KEYS } from "@/lib/constants";
import { safeGetStorage, safeSetStorage } from "@/lib/storage";

interface StoreContextType {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  campaigns: PromoCampaign[];
  isLoaded: boolean;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateVariantStock: (productId: string, variantId: string, newStock: number) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addCampaign: (campaign: PromoCampaign) => void;
  toggleCampaign: (campaignId: string) => void;
  deleteCampaign: (campaignId: string) => void;
  resetDemoData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [campaigns, setCampaigns] = useState<PromoCampaign[]>(INITIAL_PROMO_CAMPAIGNS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from localStorage on mount with corruption recovery
  useEffect(() => {
    const loadedProducts = safeGetStorage<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const loadedOrders = safeGetStorage<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    const loadedCustomers = safeGetStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
    const loadedCampaigns = safeGetStorage<PromoCampaign[]>(STORAGE_KEYS.CAMPAIGNS, INITIAL_PROMO_CAMPAIGNS);

    setProducts(loadedProducts);
    setOrders(loadedOrders);
    setCustomers(loadedCustomers);
    setCampaigns(loadedCampaigns);

    // Ensure storage is seeded if empty
    safeSetStorage(STORAGE_KEYS.PRODUCTS, loadedProducts);
    safeSetStorage(STORAGE_KEYS.ORDERS, loadedOrders);
    safeSetStorage(STORAGE_KEYS.CUSTOMERS, loadedCustomers);
    safeSetStorage(STORAGE_KEYS.CAMPAIGNS, loadedCampaigns);

    setIsLoaded(true);
  }, []);

  // Listen for storage events across tabs or windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.PRODUCTS && e.newValue) {
        try { setProducts(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === STORAGE_KEYS.ORDERS && e.newValue) {
        try { setOrders(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === STORAGE_KEYS.CUSTOMERS && e.newValue) {
        try { setCustomers(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === STORAGE_KEYS.CAMPAIGNS && e.newValue) {
        try { setCampaigns(JSON.parse(e.newValue)); } catch {}
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    safeSetStorage(STORAGE_KEYS.PRODUCTS, updated);
  };

  const saveOrders = (updated: Order[]) => {
    setOrders(updated);
    safeSetStorage(STORAGE_KEYS.ORDERS, updated);
  };

  const saveCampaigns = (updated: PromoCampaign[]) => {
    setCampaigns(updated);
    safeSetStorage(STORAGE_KEYS.CAMPAIGNS, updated);
  };

  const addProduct = (product: Product) => {
    const updated = [product, ...products];
    saveProducts(updated);
  };

  const updateProduct = (product: Product) => {
    const updated = products.map((p) => (p.id === product.id ? product : p));
    saveProducts(updated);
  };

  const deleteProduct = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId);
    saveProducts(updated);
  };

  const updateVariantStock = (productId: string, variantId: string, newStock: number) => {
    const updated = products.map((p) => {
      if (p.id !== productId) return p;
      return {
        ...p,
        variants: p.variants.map((v) => (v.id === variantId ? { ...v, stock: Math.max(0, newStock) } : v)),
      };
    });
    saveProducts(updated);
  };

  const addOrder = (order: Order) => {
    const updatedOrders = [order, ...orders];
    saveOrders(updatedOrders);

    // Update customer stats
    const existingCust = customers.find((c) => c.phone === order.customer.phone || c.email === order.customer.email);
    let updatedCustomers: Customer[];

    if (existingCust) {
      updatedCustomers = customers.map((c) =>
        c.id === existingCust.id
          ? {
              ...c,
              totalOrders: c.totalOrders + 1,
              totalSpent: c.totalSpent + order.total,
              lastOrderDate: new Date().toISOString().split("T")[0],
              status: c.totalSpent + order.total > 15000 ? "vip" : "active",
            }
          : c
      );
    } else {
      const newCust: Customer = {
        id: `cust-${Date.now()}`,
        fullName: order.customer.fullName,
        email: order.customer.email,
        phone: order.customer.phone,
        city: order.customer.city,
        totalOrders: 1,
        totalSpent: order.total,
        lastOrderDate: new Date().toISOString().split("T")[0],
        status: order.total > 15000 ? "vip" : "regular",
      };
      updatedCustomers = [newCust, ...customers];
    }

    setCustomers(updatedCustomers);
    safeSetStorage(STORAGE_KEYS.CUSTOMERS, updatedCustomers);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map((ord) => {
      if (ord.id !== orderId) return ord;
      
      const updatedTimeline = ord.timeline.map((step) => {
        if (step.status === newStatus) {
          return {
            ...step,
            completed: true,
            timestamp: step.timestamp || new Date().toLocaleString(),
          };
        }
        return step;
      });

      return {
        ...ord,
        status: newStatus,
        paymentStatus: newStatus === "delivered" && ord.paymentMethod === "cod" ? ("paid" as const) : ord.paymentStatus,
        timeline: updatedTimeline,
      };
    });

    saveOrders(updatedOrders);
  };

  const addCampaign = (campaign: PromoCampaign) => {
    const updated = [...campaigns, campaign];
    saveCampaigns(updated);
  };

  const toggleCampaign = (campaignId: string) => {
    const updated = campaigns.map((c) => (c.id === campaignId ? { ...c, isActive: !c.isActive } : c));
    saveCampaigns(updated);
  };

  const deleteCampaign = (campaignId: string) => {
    const updated = campaigns.filter((c) => c.id !== campaignId);
    saveCampaigns(updated);
  };

  const resetDemoData = () => {
    safeSetStorage(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    safeSetStorage(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    safeSetStorage(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
    safeSetStorage(STORAGE_KEYS.CAMPAIGNS, INITIAL_PROMO_CAMPAIGNS);

    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setCampaigns(INITIAL_PROMO_CAMPAIGNS);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        customers,
        campaigns,
        isLoaded,
        addProduct,
        updateProduct,
        deleteProduct,
        updateVariantStock,
        addOrder,
        updateOrderStatus,
        addCampaign,
        toggleCampaign,
        deleteCampaign,
        resetDemoData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
