"use client";

import React from "react";
import { FilterState, Locale } from "@/types";
import { t } from "@/lib/translations";
import { formatMAD } from "@/lib/utils";
import { RotateCcw } from "lucide-react";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  locale: Locale;
  availableSizes: string[];
  availableColors: { name: string; hex: string }[];
  maxPrice: number;
  onReset: () => void;
}

export function FilterSidebar({
  filters,
  onChange,
  locale,
  availableSizes,
  availableColors,
  maxPrice,
  onReset,
}: FilterSidebarProps) {
  const categories = [
    { slug: "all", label: t(locale, "common.all") },
    { slug: "women", label: t(locale, "nav.women") },
    { slug: "men", label: t(locale, "nav.men") },
    { slug: "shoes", label: t(locale, "nav.shoes") },
    { slug: "bags", label: t(locale, "nav.bags") },
    { slug: "accessories", label: t(locale, "nav.accessories") },
  ];

  const handleCategoryChange = (slug: string) => {
    onChange({ ...filters, category: slug });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    onChange({ ...filters, priceRange: [filters.priceRange[0], val] });
  };

  const toggleSize = (size: string) => {
    const current = filters.sizes;
    const next = current.includes(size) ? current.filter((s) => s !== size) : [...current, size];
    onChange({ ...filters, sizes: next });
  };

  const toggleColor = (color: string) => {
    const current = filters.colors;
    const next = current.includes(color) ? current.filter((c) => c !== color) : [...current, color];
    onChange({ ...filters, colors: next });
  };

  const toggleInStock = () => {
    onChange({ ...filters, inStockOnly: !filters.inStockOnly });
  };

  return (
    <div className="space-y-7 font-sans text-xs">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-ivory-dark">
        <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-ink">
          {t(locale, "shop.filterTitle")}
        </h4>
        <button
          onClick={onReset}
          className="text-muted hover:text-camel flex items-center gap-1 transition-colors text-[11px]"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{t(locale, "common.clearAll")}</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-2.5">
        <label className="font-serif font-bold uppercase tracking-wider text-ink block">
          {t(locale, "shop.category")}
        </label>
        <div className="flex flex-col gap-1.5">
          {categories.map((cat) => {
            const isSelected = filters.category === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`text-left rtl:text-right py-1 px-2 transition-colors flex items-center justify-between ${
                  isSelected
                    ? "bg-ivory text-camel font-bold border-l-2 rtl:border-l-0 rtl:border-r-2 border-camel"
                    : "text-muted-dark hover:text-ink"
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2.5 pt-4 border-t border-ivory-dark">
        <div className="flex justify-between items-baseline">
          <label className="font-serif font-bold uppercase tracking-wider text-ink">
            {t(locale, "shop.price")}
          </label>
          <span className="font-mono text-camel font-bold text-[11px]">
            {formatMAD(filters.priceRange[1], locale)}
          </span>
        </div>
        <input
          type="range"
          min="800"
          max={maxPrice || 10000}
          step="200"
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
          className="w-full accent-camel bg-ivory-dark h-1.5 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-muted font-mono">
          <span>{formatMAD(800, locale)}</span>
          <span>{formatMAD(maxPrice || 10000, locale)}</span>
        </div>
      </div>

      {/* Size Pills */}
      <div className="space-y-2.5 pt-4 border-t border-ivory-dark">
        <label className="font-serif font-bold uppercase tracking-wider text-ink block">
          {t(locale, "shop.size")}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {availableSizes.map((sz) => {
            const isSelected = filters.sizes.includes(sz);
            return (
              <button
                key={sz}
                onClick={() => toggleSize(sz)}
                className={`min-w-8 px-2 py-1.5 text-[11px] font-mono border transition-colors ${
                  isSelected
                    ? "bg-ink text-white border-ink font-bold"
                    : "bg-white text-muted-dark border-ivory-dark hover:border-camel hover:text-ink"
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Swatches */}
      <div className="space-y-2.5 pt-4 border-t border-ivory-dark">
        <label className="font-serif font-bold uppercase tracking-wider text-ink block">
          {t(locale, "shop.color")}
        </label>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((col, idx) => {
            const isSelected = filters.colors.includes(col.name);
            return (
              <button
                key={idx}
                onClick={() => toggleColor(col.name)}
                className={`w-6 h-6 rounded-full border transition-all ${
                  isSelected ? "ring-2 ring-camel ring-offset-2 scale-110" : "border-ivory-dark hover:scale-105"
                }`}
                title={col.name}
              >
                <span
                  className="w-full h-full rounded-full block border border-black/10"
                  style={{ backgroundColor: col.hex }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* In Stock Only Checkbox */}
      <div className="pt-4 border-t border-ivory-dark">
        <label className="flex items-center gap-2.5 cursor-pointer text-muted-dark hover:text-ink">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={toggleInStock}
            className="w-4 h-4 accent-camel rounded-xs border-ivory-dark"
          />
          <span className="font-medium text-ink">{t(locale, "shop.inStockOnly")}</span>
        </label>
      </div>
    </div>
  );
}

