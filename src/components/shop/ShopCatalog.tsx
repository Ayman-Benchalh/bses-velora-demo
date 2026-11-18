"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Product, Locale, FilterState } from "@/types";
import { useStore } from "@/context/StoreContext";
import { t } from "@/lib/translations";
import { ProductCard } from "./ProductCard";
import { FilterSidebar } from "./FilterSidebar";
import { ActiveFilterChips } from "./ActiveFilterChips";
import { QuickViewModal } from "./QuickViewModal";
import {
  SlidersHorizontal,
  LayoutGrid,
  Columns,
  X,
  Search,
} from "lucide-react";

interface ShopCatalogProps {
  locale: Locale;
  initialCategory?: string;
}

export function ShopCatalog({ locale, initialCategory = "all" }: ShopCatalogProps) {
  const { products } = useStore();
  const searchParams = useSearchParams();

  const querySearch = searchParams?.get("search") || "";
  const queryCategory = searchParams?.get("category") || initialCategory;

  const maxPrice = useMemo(() => {
    return products.reduce((max, p) => Math.max(max, p.price), 10000);
  }, [products]);

  const [filters, setFilters] = useState<FilterState>({
    category: queryCategory,
    priceRange: [0, maxPrice],
    sizes: [],
    colors: [],
    inStockOnly: false,
    sortBy: "featured",
    searchQuery: querySearch,
  });

  const [viewMode, setViewMode] = useState<"classic" | "editorial">("classic");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const prevQueryCategoryRef = useRef(queryCategory);
  const prevQuerySearchRef = useRef(querySearch);

  // Sync with searchParams only when query params actually change
  useEffect(() => {
    if (queryCategory !== prevQueryCategoryRef.current) {
      prevQueryCategoryRef.current = queryCategory;
      setFilters((prev) => ({ ...prev, category: queryCategory }));
    }
    if (querySearch !== prevQuerySearchRef.current) {
      prevQuerySearchRef.current = querySearch;
      setFilters((prev) => ({ ...prev, searchQuery: querySearch }));
    }
  }, [queryCategory, querySearch]);

  // Extract all available sizes & colors from current products
  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [products]);

  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      p.colors.forEach((c) => {
        const name = c.name[locale] || c.name.fr;
        if (!map.has(name)) map.set(name, c.hex);
      });
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products, locale]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (filters.category && filters.category !== "all" && p.category !== filters.category) {
          return false;
        }

        // Search filter
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          const matchName = (p.name[locale] || p.name.fr).toLowerCase().includes(query);
          const matchDesc = (p.description[locale] || p.description.fr).toLowerCase().includes(query);
          const matchMat = (p.materials[locale] || p.materials.fr).toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchMat) return false;
        }

        // Price range
        const effectivePrice = p.salePrice ?? p.price;
        if (effectivePrice > filters.priceRange[1]) return false;

        // Size filter
        if (filters.sizes.length > 0) {
          const hasSelectedSize = p.sizes.some((sz) => filters.sizes.includes(sz));
          if (!hasSelectedSize) return false;
        }

        // Color filter
        if (filters.colors.length > 0) {
          const hasSelectedColor = p.colors.some((col) => {
            const name = col.name[locale] || col.name.fr;
            return filters.colors.includes(name);
          });
          if (!hasSelectedColor) return false;
        }

        // In stock only
        if (filters.inStockOnly) {
          const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0);
          if (totalStock <= 0) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;

        if (filters.sortBy === "price-asc") return priceA - priceB;
        if (filters.sortBy === "price-desc") return priceB - priceA;
        if (filters.sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (filters.sortBy === "rating") return b.rating - a.rating;

        // "featured" default
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, filters, locale]);

  const handleResetFilters = () => {
    setFilters({
      category: "all",
      priceRange: [0, maxPrice],
      sizes: [],
      colors: [],
      inStockOnly: false,
      sortBy: "featured",
      searchQuery: "",
    });
  };

  return (
    <div className="font-sans">
      {/* Catalog Header Banner */}
      <div className="border-b border-ivory-dark bg-ivory/50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-camel font-semibold">
            VELORA • MAISON DE HAUTE CONFECTION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            {filters.category && filters.category !== "all"
              ? t(locale, `nav.${filters.category}`)
              : t(locale, "shop.title")}
          </h1>
          <p className="text-xs sm:text-sm text-muted-dark max-w-xl mx-auto font-sans leading-relaxed">
            {t(locale, "shop.subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Controls Toolbar: Filter toggle, Results count, View mode, Sort select */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-ivory-dark text-xs">
          {/* Mobile Filter Drawer Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 py-2 px-3.5 bg-ivory border border-ivory-dark text-ink font-medium hover:bg-white transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-camel" />
              <span>{t(locale, "shop.filterTitle")}</span>
            </button>

            <span className="text-muted font-mono" data-testid="results-count">
              <strong className="text-ink">{filteredProducts.length}</strong> {t(locale, "shop.showingResults")}
            </span>
          </div>

          {/* Right: View Mode switcher & Sort Dropdown */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center border border-ivory-dark p-0.5 bg-ivory">
              <button
                onClick={() => setViewMode("classic")}
                className={`p-1.5 transition-colors ${
                  viewMode === "classic" ? "bg-white text-ink shadow-xs" : "text-muted hover:text-ink"
                }`}
                title={t(locale, "shop.gridClassic")}
                aria-label={t(locale, "shop.gridClassic")}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("editorial")}
                className={`p-1.5 transition-colors ${
                  viewMode === "editorial" ? "bg-white text-ink shadow-xs" : "text-muted hover:text-ink"
                }`}
                title={t(locale, "shop.gridEditorial")}
                aria-label={t(locale, "shop.gridEditorial")}
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-muted hidden sm:inline">{t(locale, "common.sort")}:</span>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value as FilterState["sortBy"] })
                }
                className="py-1.5 px-3 bg-white border border-ivory-dark text-ink text-xs focus:outline-none focus:border-camel font-sans"
              >
                <option value="featured">{t(locale, "shop.sortBy.featured")}</option>
                <option value="price-asc">{t(locale, "shop.sortBy.priceAsc")}</option>
                <option value="price-desc">{t(locale, "shop.sortBy.priceDesc")}</option>
                <option value="newest">{t(locale, "shop.sortBy.newest")}</option>
                <option value="rating">{t(locale, "shop.sortBy.rating")}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        <ActiveFilterChips
          filters={filters}
          onChange={setFilters}
          locale={locale}
          defaultMaxPrice={maxPrice}
        />

        {/* Catalog Main Layout: Sidebar + Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-28 bg-white p-5 border border-ivory-dark">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              locale={locale}
              availableSizes={availableSizes}
              availableColors={availableColors}
              maxPrice={maxPrice}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 px-4 bg-ivory/40 border border-ivory-dark space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-ivory flex items-center justify-center text-camel">
                  <Search className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-ink">
                    {t(locale, "shop.noProductsFound")}
                  </h3>
                  <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">
                    Essayez de modifier ou de réinitialiser vos critères de recherche.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-ink text-white text-xs uppercase tracking-wider font-medium hover:bg-camel transition-colors"
                >
                  {t(locale, "shop.resetFilters")}
                </button>
              </div>
            ) : viewMode === "classic" ? (
              /* Classic 3-Col / 4-Col Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    priority={idx < 4}
                  />
                ))}
              </div>
            ) : (
              /* Editorial Asymmetric Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                {filteredProducts.map((product, idx) => {
                  const isSpanned = idx % 5 === 0;
                  return (
                    <div
                      key={product.id}
                      className={isSpanned ? "sm:col-span-2 sm:max-w-xl sm:mx-auto w-full" : ""}
                    >
                      <ProductCard
                        product={product}
                        locale={locale}
                        onQuickView={(p) => setQuickViewProduct(p)}
                        priority={idx < 3}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Slide Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 overflow-y-auto z-10 rtl:right-auto rtl:left-0">
            <div className="flex items-center justify-between pb-4 border-b border-ivory-dark mb-5">
              <h3 className="font-serif text-base font-bold uppercase tracking-wider text-ink">
                {t(locale, "shop.filterTitle")}
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-muted hover:text-ink"
                aria-label="Fermer les filtres"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              locale={locale}
              availableSizes={availableSizes}
              availableColors={availableColors}
              maxPrice={maxPrice}
              onReset={handleResetFilters}
            />
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        locale={locale}
      />
    </div>
  );
}
