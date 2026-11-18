"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale, Product, OrderStatus, PromoCampaign } from "@/types";
import { useStore } from "@/context/StoreContext";
import { useToast } from "@/context/ToastContext";
import { formatMAD, formatDate } from "@/lib/utils";
import { t } from "@/lib/translations";
import { ProductFormModal } from "./ProductFormModal";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  Settings,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Search,
  ArrowUpRight,
  Store,
} from "lucide-react";

interface AdminDashboardProps {
  locale: Locale;
}

export function AdminDashboard({ locale }: AdminDashboardProps) {
  const {
    products,
    orders,
    customers,
    campaigns,
    addProduct,
    updateProduct,
    deleteProduct,
    updateVariantStock,
    updateOrderStatus,
    addCampaign,
    toggleCampaign,
    deleteCampaign,
    resetDemoData,
  } = useStore();

  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "stocks" | "orders" | "customers" | "campaigns" | "settings"
  >("overview");

  // Modals state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Filters & search within admin tables
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("all");

  // Campaign form state
  const [newPromoCode, setNewPromoCode] = useState("");
  const [newPromoPercent, setNewPromoPercent] = useState("15");

  // Computed metrics
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, ord) => sum + ord.total, 0);
  }, [orders]);

  const averageOrderValue = useMemo(() => {
    return orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  }, [totalRevenue, orders]);

  const lowStockProducts = useMemo(() => {
    return products.filter((p) => {
      const stock = p.variants.reduce((s, v) => s + v.stock, 0);
      return stock <= 3;
    });
  }, [products]);

  // Handlers
  const handleSaveProduct = (prod: Product) => {
    if (editingProduct) {
      updateProduct(prod);
      showToast(t(locale, "admin.productSaved"), "success");
    } else {
      addProduct(prod);
      showToast(t(locale, "admin.productSaved"), "success");
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      showToast(t(locale, "admin.productDeleted"), "info");
      setProductToDelete(null);
    }
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    showToast(t(locale, "admin.orderStatusUpdated"), "success");
  };

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;

    const newCamp: PromoCampaign = {
      id: `camp-${Date.now()}`,
      code: newPromoCode.trim().toUpperCase(),
      discountPercentage: Number(newPromoPercent) || 10,
      description: {
        fr: `Remise privilège ${newPromoPercent}%`,
        en: `Privilege discount ${newPromoPercent}%`,
        ar: `خصم امتياز ${newPromoPercent}%`,
      },
      isActive: true,
    };

    addCampaign(newCamp);
    setNewPromoCode("");
    showToast("Campagne promotionnelle activée.", "success");
  };

  const handleResetData = () => {
    resetDemoData();
    showToast(t(locale, "admin.resetSuccess"), "success");
  };

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    if (productCategoryFilter !== "all" && p.category !== productCategoryFilter) return false;
    if (productSearch) {
      const q = productSearch.toLowerCase();
      const matchName = (p.name[locale] || p.name.fr).toLowerCase().includes(q);
      const matchSku = p.variants.some((v) => v.sku.toLowerCase().includes(q));
      if (!matchName && !matchSku) return false;
    }
    return true;
  });

  // Filtered orders list
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== "all" && o.status !== orderStatusFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-ivory/30 font-sans pb-20">
      {/* Prominent Demo Mode Top Banner */}
      <div className="bg-ink text-white py-3 px-4 border-b border-ink-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-camel-light">
            <span className="w-2 h-2 rounded-full bg-camel animate-ping" />
            <strong className="tracking-wider uppercase font-mono">
              {t(locale, "admin.demoBadge")}
            </strong>
            <span className="text-white/60 hidden sm:inline">— BSES E-commerce Studio</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <Link
              href={`/${locale}`}
              className="hover:text-camel flex items-center gap-1 text-ivory underline"
            >
              <Store className="w-3.5 h-3.5" />
              <span>{t(locale, "common.exploreShop")}</span>
            </Link>
            <span>|</span>
            <button
              onClick={handleResetData}
              className="text-camel hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t(locale, "bses.resetSeed")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Subheader with Tabs */}
      <div className="bg-white border-b border-ivory-dark sticky top-0 z-20 shadow-luxury-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-camel font-semibold">
                BENCHALH SOLUTION GESTIONNAIRE
              </span>
              <h1 className="font-serif text-2xl font-bold text-ink tracking-tight">
                {t(locale, "admin.title")}
              </h1>
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setIsProductModalOpen(true);
              }}
              data-testid="admin-add-product-btn"
              className="inline-flex items-center gap-1.5 py-2 px-3.5 bg-ink text-white text-xs uppercase tracking-wider font-semibold hover:bg-camel transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 text-camel" />
              <span className="hidden sm:inline">{t(locale, "admin.addProduct")}</span>
              <span className="sm:hidden">Ajouter</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto text-xs font-serif uppercase tracking-wider pb-1 scrollbar-none rtl:space-x-reverse">
            {[
              { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
              { id: "products", label: "Catalogue & Inventaire", icon: Package },
              { id: "stocks", label: "Gestion Rapide Stocks", icon: AlertTriangle },
              { id: "orders", label: `Commandes (${orders.length})`, icon: ShoppingBag },
              { id: "customers", label: `Clients VIP (${customers.length})`, icon: Users },
              { id: "campaigns", label: `Codes & Promos (${campaigns.length})`, icon: Tag },
              { id: "settings", label: "Réinitialisation", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-testid={`admin-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 font-bold whitespace-nowrap transition-colors ${
                    isActive
                      ? "border-camel text-ink"
                      : "border-transparent text-muted hover:text-ink hover:border-ivory-dark"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-camel" : "text-muted"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Admin Workspace Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Cards Row (Always visible or on Overview) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Revenue */}
          <div className="bg-white p-5 border border-ivory-dark shadow-luxury-sm space-y-2">
            <div className="flex items-center justify-between text-muted text-xs font-mono">
              <span>{t(locale, "admin.metricsRevenue")}</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-ink">
              {formatMAD(totalRevenue, locale)}
            </p>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs font-mono">
              +18.4% ce mois (Simulé)
            </span>
          </div>

          {/* Orders */}
          <div className="bg-white p-5 border border-ivory-dark shadow-luxury-sm space-y-2">
            <div className="flex items-center justify-between text-muted text-xs font-mono">
              <span>{t(locale, "admin.metricsOrders")}</span>
              <ShoppingBag className="w-4 h-4 text-camel" />
            </div>
            <p className="font-serif text-2xl font-bold text-ink">
              {orders.length}
            </p>
            <span className="text-[10px] text-muted font-mono">
              Toutes sauvegardées localement
            </span>
          </div>

          {/* AOV */}
          <div className="bg-white p-5 border border-ivory-dark shadow-luxury-sm space-y-2">
            <div className="flex items-center justify-between text-muted text-xs font-mono">
              <span>{t(locale, "admin.metricsAOV")}</span>
              <ArrowUpRight className="w-4 h-4 text-camel" />
            </div>
            <p className="font-serif text-2xl font-bold text-ink">
              {formatMAD(averageOrderValue, locale)}
            </p>
            <span className="text-[10px] text-muted font-mono">
              Panier moyen haute couture
            </span>
          </div>

          {/* Stock Alerts */}
          <div className="bg-white p-5 border border-ivory-dark shadow-luxury-sm space-y-2">
            <div className="flex items-center justify-between text-muted text-xs font-mono">
              <span>{t(locale, "admin.metricsStockAlerts")}</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-ink">
              {lowStockProducts.length}
            </p>
            <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-xs font-mono">
              Pièces avec &le; 3 unités
            </span>
          </div>
        </div>

        {/* ===================== TAB 1: OVERVIEW ===================== */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Sales Chart SVG & Order Performance */}
            <div className="bg-white p-6 border border-ivory-dark shadow-luxury-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-ivory-dark">
                <div>
                  <h3 className="font-serif text-lg font-bold text-ink">
                    {t(locale, "admin.salesChartTitle")}
                  </h3>
                  <p className="text-xs text-muted">
                    Ventes hebdomadaires simulées sur le marché marocain (MAD)
                  </p>
                </div>
                <span className="text-xs font-mono text-camel font-semibold">
                  Total : {formatMAD(totalRevenue, locale)}
                </span>
              </div>

              {/* Responsive SVG Histogram Chart */}
              <div className="pt-4 pb-2">
                <div className="h-44 w-full flex items-end justify-between gap-3 sm:gap-6 px-2">
                  {[
                    { day: "Lun", amount: 4800, height: "45%" },
                    { day: "Mar", amount: 6200, height: "58%" },
                    { day: "Mer", amount: 3900, height: "35%" },
                    { day: "Jeu", amount: 8400, height: "78%" },
                    { day: "Ven", amount: 10500, height: "92%" },
                    { day: "Sam", amount: 12300, height: "100%" },
                    { day: "Dim", amount: 7600, height: "68%" },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-bold text-camel">
                        {bar.amount}
                      </span>
                      <div className="w-full bg-ivory-dark rounded-xs h-32 flex items-end overflow-hidden">
                        <div
                          style={{ height: bar.height }}
                          className="w-full bg-ink group-hover:bg-camel transition-all duration-500"
                        />
                      </div>
                      <span className="text-[11px] font-mono text-muted uppercase">
                        {bar.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white border border-ivory-dark shadow-luxury-sm p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-ivory-dark">
                <h3 className="font-serif text-lg font-bold text-ink">
                  {t(locale, "admin.recentOrdersTitle")}
                </h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs text-camel hover:underline font-semibold"
                >
                  Voir toutes les commandes ({orders.length}) →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left rtl:text-right font-sans">
                  <thead className="bg-ivory border-b border-ivory-dark text-muted font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Référence</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Ville</th>
                      <th className="p-3">Articles</th>
                      <th className="p-3">Total (MAD)</th>
                      <th className="p-3">Paiement</th>
                      <th className="p-3">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ivory-dark font-mono">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-ivory/40 transition-colors">
                        <td className="p-3 font-bold text-ink">{ord.orderNumber}</td>
                        <td className="p-3 text-ink font-sans font-medium">{ord.customer.fullName}</td>
                        <td className="p-3 text-muted-dark font-sans">{ord.customer.city}</td>
                        <td className="p-3 text-muted-dark">{ord.items.length} article(s)</td>
                        <td className="p-3 font-bold text-ink">{formatMAD(ord.total, locale)}</td>
                        <td className="p-3 text-[11px] font-sans">
                          {ord.paymentMethod === "cod" ? "Espèces (COD)" : "Carte CMI"}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 text-[10px] uppercase font-semibold rounded-xs ${
                              ord.status === "delivered"
                                ? "bg-emerald-100 text-emerald-800"
                                : ord.status === "shipped" || ord.status === "in_delivery"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {t(locale, `admin.status.${ord.status}`)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: PRODUCTS TABLE ===================== */}
        {activeTab === "products" && (
          <div className="bg-white border border-ivory-dark shadow-luxury-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Search & Category Filter */}
              <div className="flex flex-1 items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-muted rtl:left-auto rtl:right-3" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Rechercher par nom ou référence..."
                    className="w-full pl-9 pr-3 py-2 bg-ivory border border-ivory-dark text-xs focus:outline-none focus:border-camel rtl:pl-3 rtl:pr-9"
                  />
                </div>

                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="py-2 px-3 bg-ivory border border-ivory-dark text-xs text-ink focus:outline-none focus:border-camel"
                >
                  <option value="all">Toutes les catégories</option>
                  <option value="women">Femme</option>
                  <option value="men">Homme</option>
                  <option value="shoes">Souliers</option>
                  <option value="bags">Maroquinerie</option>
                  <option value="accessories">Accessoires</option>
                </select>
              </div>

              <span className="text-xs text-muted font-mono self-center">
                {filteredProducts.length} pièces au total
              </span>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto border border-ivory-dark">
              <table className="w-full text-xs text-left rtl:text-right">
                <thead className="bg-ivory border-b border-ivory-dark text-muted font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Pièce</th>
                    <th className="p-3">Catégorie</th>
                    <th className="p-3">Prix</th>
                    <th className="p-3">Stock Global</th>
                    <th className="p-3">Statut</th>
                    <th className="p-3 text-right rtl:text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ivory-dark font-sans">
                  {filteredProducts.map((p) => {
                    const totalStock = p.variants.reduce((s, v) => s + v.stock, 0);
                    return (
                      <tr key={p.id} className="hover:bg-ivory/30 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-12 bg-ivory flex-shrink-0 border border-ivory-dark">
                              <Image
                                src={p.images[0] || "/placeholder.jpg"}
                                alt={p.name[locale] || p.name.fr}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                            <div>
                              <h4 className="font-serif font-bold text-ink line-clamp-1">
                                {p.name[locale] || p.name.fr}
                              </h4>
                              <p className="text-[10px] text-muted font-mono">
                                {p.variants[0]?.sku || p.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 capitalize text-muted-dark">{p.category}</td>
                        <td className="p-3 font-mono font-semibold text-ink">
                          {p.salePrice ? (
                            <div>
                              <span>{formatMAD(p.salePrice, locale)}</span>
                              <span className="text-[10px] text-muted line-through block">
                                {formatMAD(p.price, locale)}
                              </span>
                            </div>
                          ) : (
                            formatMAD(p.price, locale)
                          )}
                        </td>
                        <td className="p-3 font-mono font-bold">
                          <span
                            className={
                              totalStock <= 2
                                ? "text-red-700"
                                : totalStock <= 5
                                ? "text-amber-700"
                                : "text-emerald-700"
                            }
                          >
                            {totalStock} unités
                          </span>
                        </td>
                        <td className="p-3">
                          {p.isFeatured && (
                            <span className="px-1.5 py-0.5 bg-camel/15 text-camel-dark text-[10px] uppercase font-mono font-bold mr-1">
                              Featured
                            </span>
                          )}
                          {p.isNewArrival && (
                            <span className="px-1.5 py-0.5 bg-ink/10 text-ink text-[10px] uppercase font-mono font-bold">
                              Nouveau
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right rtl:text-left">
                          <div className="flex items-center justify-end rtl:justify-start gap-2">
                            <button
                              data-testid="edit-product-btn"
                              onClick={() => {
                                setEditingProduct(p);
                                setIsProductModalOpen(true);
                              }}
                              className="p-1.5 text-muted hover:text-ink transition-colors"
                              title="Modifier"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              data-testid="delete-product-btn"
                              onClick={() => setProductToDelete(p)}
                              className="p-1.5 text-muted hover:text-red-700 transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== TAB 3: QUICK STOCKS MANAGER ===================== */}
        {activeTab === "stocks" && (
          <div className="bg-white border border-ivory-dark shadow-luxury-sm p-6 space-y-6">
            <div className="pb-3 border-b border-ivory-dark">
              <h3 className="font-serif text-lg font-bold text-ink">
                {t(locale, "admin.stockManager")}
              </h3>
              <p className="text-xs text-muted">
                Ajustez en temps réel les quantités en stock par taille et variante. Toute mise à jour est immédiatement reflétée sur la boutique.
              </p>
            </div>

            <div className="space-y-4">
              {products.map((p) => (
                <div key={p.id} className="p-4 border border-ivory-dark bg-ivory/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-14 bg-ivory flex-shrink-0 border border-ivory-dark">
                      <Image
                        src={p.images[0] || "/placeholder.jpg"}
                        alt={p.name[locale] || p.name.fr}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-ink">
                        {p.name[locale] || p.name.fr}
                      </h4>
                      <p className="text-xs text-muted font-mono">{p.variants.length} déclinaisons</p>
                    </div>
                  </div>

                  {/* Variants stock controllers */}
                  <div className="flex flex-wrap items-center gap-2">
                    {p.variants.map((v) => (
                      <div
                        key={v.id}
                        className="flex items-center border border-ivory-dark bg-white px-2 py-1 text-xs font-mono shadow-xs"
                      >
                        <span className="font-bold text-ink mr-2">{v.size}:</span>
                        <button
                          onClick={() => updateVariantStock(p.id, v.id, v.stock - 1)}
                          className="px-1.5 py-0.5 bg-ivory hover:bg-ivory-dark text-ink font-bold"
                          title="Diminuer"
                        >
                          -
                        </button>
                        <span className="px-2 font-bold text-camel-dark">{v.stock}</span>
                        <button
                          data-testid="quick-stock-increment-btn"
                          onClick={() => updateVariantStock(p.id, v.id, v.stock + 1)}
                          className="px-1.5 py-0.5 bg-ivory hover:bg-ivory-dark text-ink font-bold"
                          title="Augmenter"
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 4: ORDERS ===================== */}
        {activeTab === "orders" && (
          <div className="bg-white border border-ivory-dark shadow-luxury-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-ivory-dark">
              <div>
                <h3 className="font-serif text-lg font-bold text-ink">
                  {t(locale, "admin.ordersTitle")}
                </h3>
                <p className="text-xs text-muted">
                  Commandes simulées avec traçabilité logistique au Maroc
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-muted">Statut :</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="py-1 px-3 bg-ivory border border-ivory-dark text-xs focus:outline-none"
                >
                  <option value="all">Toutes les commandes</option>
                  <option value="pending">En attente</option>
                  <option value="processing">En préparation</option>
                  <option value="shipped">Expédiée</option>
                  <option value="in_delivery">En livraison</option>
                  <option value="delivered">Livrée</option>
                  <option value="cancelled">Annulée</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto border border-ivory-dark">
              <table className="w-full text-xs text-left rtl:text-right">
                <thead className="bg-ivory border-b border-ivory-dark text-muted font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Référence</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Client & Téléphone</th>
                    <th className="p-3">Ville</th>
                    <th className="p-3">Montant</th>
                    <th className="p-3">Paiement</th>
                    <th className="p-3">Changer le Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ivory-dark font-sans">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-ivory/30 transition-colors">
                      <td className="p-3 font-mono font-bold text-ink">
                        <Link
                          href={`/${locale}/order-confirmation/${ord.orderNumber}`}
                          className="hover:text-camel underline"
                        >
                          {ord.orderNumber}
                        </Link>
                      </td>
                      <td className="p-3 font-mono text-muted text-[11px]">
                        {formatDate(ord.createdAt, locale)}
                      </td>
                      <td className="p-3">
                        <p className="font-bold text-ink">{ord.customer.fullName}</p>
                        <p className="text-[11px] text-muted font-mono">{ord.customer.phone}</p>
                      </td>
                      <td className="p-3 text-muted-dark">{ord.customer.city}</td>
                      <td className="p-3 font-mono font-bold text-ink">
                        {formatMAD(ord.total, locale)}
                      </td>
                      <td className="p-3">
                        <span className="text-[11px] font-mono">
                          {ord.paymentMethod === "cod" ? "Espèces (COD)" : "Carte CMI"}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          data-testid="order-status-select"
                          value={ord.status}
                          onChange={(e) =>
                            handleStatusChange(ord.id, e.target.value as OrderStatus)
                          }
                          className="py-1 px-2.5 bg-ivory border border-ivory-dark text-xs font-mono font-medium focus:outline-none focus:border-camel cursor-pointer"
                        >
                          <option value="pending">En attente (1)</option>
                          <option value="processing">En préparation (2)</option>
                          <option value="shipped">Expédiée (3)</option>
                          <option value="in_delivery">En livraison (4)</option>
                          <option value="delivered">Livrée (5)</option>
                          <option value="cancelled">Annulée</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== TAB 5: CUSTOMERS ===================== */}
        {activeTab === "customers" && (
          <div className="bg-white border border-ivory-dark shadow-luxury-sm p-6 space-y-6">
            <div className="pb-3 border-b border-ivory-dark">
              <h3 className="font-serif text-lg font-bold text-ink">
                {t(locale, "admin.customersTitle")}
              </h3>
              <p className="text-xs text-muted">
                Répertoire de clients fictifs et données de fidélisation simulées
              </p>
            </div>

            <div className="overflow-x-auto border border-ivory-dark">
              <table className="w-full text-xs text-left rtl:text-right">
                <thead className="bg-ivory border-b border-ivory-dark text-muted font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Client</th>
                    <th className="p-3">Téléphone</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Ville</th>
                    <th className="p-3">Commandes</th>
                    <th className="p-3">Total Dépensé (MAD)</th>
                    <th className="p-3">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ivory-dark font-sans">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-ivory/30 transition-colors">
                      <td className="p-3 font-bold text-ink">{c.fullName}</td>
                      <td className="p-3 font-mono text-muted-dark">{c.phone}</td>
                      <td className="p-3 text-muted-dark font-mono text-[11px]">{c.email}</td>
                      <td className="p-3 text-ink">{c.city}</td>
                      <td className="p-3 font-mono text-center">{c.totalOrders}</td>
                      <td className="p-3 font-mono font-bold text-ink">
                        {formatMAD(c.totalSpent, locale)}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 text-[10px] uppercase font-mono font-bold rounded-xs ${
                            c.status === "vip"
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-ivory text-ink"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== TAB 6: CAMPAIGNS ===================== */}
        {activeTab === "campaigns" && (
          <div className="bg-white border border-ivory-dark shadow-luxury-sm p-6 space-y-6">
            <div className="pb-3 border-b border-ivory-dark">
              <h3 className="font-serif text-lg font-bold text-ink">
                {t(locale, "admin.campaignsTitle")}
              </h3>
              <p className="text-xs text-muted">
                Créez et activez des codes promotionnels utilisables immédiatement dans le panier.
              </p>
            </div>

            {/* Create Promo Code Form */}
            <form onSubmit={handleAddCampaign} className="p-4 bg-ivory border border-ivory-dark flex flex-col sm:flex-row items-end gap-3">
              <div className="flex-1 space-y-1 w-full">
                <label className="text-xs font-semibold text-ink block">Code Privilège</label>
                <input
                  type="text"
                  data-testid="promo-code-input"
                  value={newPromoCode}
                  onChange={(e) => setNewPromoCode(e.target.value)}
                  placeholder="ex: PRINTEMPS20"
                  required
                  className="w-full px-3 py-2 bg-white border border-ivory-dark text-xs uppercase font-mono focus:outline-none focus:border-camel text-ink"
                />
              </div>

              <div className="w-full sm:w-36 space-y-1">
                <label className="text-xs font-semibold text-ink block">Remise (%)</label>
                <input
                  type="number"
                  data-testid="promo-discount-input"
                  min="5"
                  max="50"
                  value={newPromoPercent}
                  onChange={(e) => setNewPromoPercent(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-white border border-ivory-dark text-xs font-mono focus:outline-none focus:border-camel text-ink"
                />
              </div>

              <button
                type="submit"
                data-testid="submit-promo-btn"
                className="py-2 px-5 bg-ink text-white text-xs uppercase tracking-wider font-semibold hover:bg-camel transition-colors w-full sm:w-auto"
              >
                Créer le code
              </button>
            </form>

            {/* Campaigns Table */}
            <div className="overflow-x-auto border border-ivory-dark">
              <table className="w-full text-xs text-left rtl:text-right">
                <thead className="bg-ivory border-b border-ivory-dark text-muted font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Code</th>
                    <th className="p-3">Remise</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Statut</th>
                    <th className="p-3 text-right rtl:text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ivory-dark font-sans">
                  {campaigns.map((camp) => (
                    <tr key={camp.id} className="hover:bg-ivory/30 transition-colors">
                      <td className="p-3 font-mono font-bold text-ink text-sm">{camp.code}</td>
                      <td className="p-3 font-mono font-bold text-camel">-{camp.discountPercentage}%</td>
                      <td className="p-3 text-muted-dark">{camp.description[locale] || camp.description.fr}</td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleCampaign(camp.id)}
                          className={`px-2 py-1 text-[10px] font-mono uppercase font-bold transition-colors ${
                            camp.isActive
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-zinc-200 text-zinc-600"
                          }`}
                        >
                          {camp.isActive ? "Actif" : "Désactivé"}
                        </button>
                      </td>
                      <td className="p-3 text-right rtl:text-left">
                        <button
                          onClick={() => deleteCampaign(camp.id)}
                          className="text-muted hover:text-red-700 p-1"
                          title="Supprimer la campagne"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== TAB 7: SETTINGS & RESET ===================== */}
        {activeTab === "settings" && (
          <div className="bg-white border border-ivory-dark shadow-luxury-sm p-6 sm:p-8 space-y-6 max-w-2xl">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-camel font-semibold">
                PARAMÈTRES DÉMO BSES
              </span>
              <h3 className="font-serif text-xl font-bold text-ink mt-1">
                {t(locale, "admin.settingsTitle")}
              </h3>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
              <p className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Restauration des données initiales</span>
              </p>
              <p className="leading-relaxed">
                {t(locale, "admin.resetWarning")}
              </p>
            </div>

            <button
              onClick={handleResetData}
              className="py-3 px-6 bg-red-700 text-white text-xs uppercase tracking-widest font-semibold hover:bg-red-800 transition-colors flex items-center gap-2 shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t(locale, "admin.resetData")}</span>
            </button>
          </div>
        )}
      </main>

      {/* Edit/Add Product Modal */}
      <ProductFormModal
        product={editingProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        locale={locale}
      />

      {/* Delete Confirmation Dialog */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
          <div className="bg-white border border-ivory-dark shadow-2xl p-6 max-w-md w-full space-y-4 animate-slide-up">
            <h4 className="font-serif text-lg font-bold text-ink">
              {t(locale, "admin.deleteProduct")}
            </h4>
            <p className="text-xs text-muted-dark leading-relaxed">
              {t(locale, "admin.confirmDelete")}
            </p>
            <div className="p-3 bg-ivory border border-ivory-dark text-xs font-mono font-bold text-ink">
              {productToDelete.name[locale] || productToDelete.name.fr}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="py-2 px-4 border border-ivory-dark text-xs text-muted-dark hover:text-ink font-medium"
              >
                {t(locale, "common.cancel")}
              </button>
              <button
                data-testid="confirm-delete-product-btn"
                onClick={handleConfirmDelete}
                className="py-2 px-4 bg-red-700 text-white text-xs uppercase tracking-wider font-semibold hover:bg-red-800"
              >
                {t(locale, "common.delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
