"use client";

import React from "react";
import { FilterState, Locale } from "@/types";
import { t } from "@/lib/translations";
import { formatMAD } from "@/lib/utils";
import { X } from "lucide-react";

interface ActiveFilterChipsProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  locale: Locale;
  defaultMaxPrice: number;
}

export function ActiveFilterChips({ filters, onChange, locale, defaultMaxPrice }: ActiveFilterChipsProps) {
  const hasCategory = filters.category && filters.category !== "all";
  const hasPrice = filters.priceRange[1] < defaultMaxPrice;
  const hasSizes = filters.sizes.length > 0;
  const hasColors = filters.colors.length > 0;
  const hasInStock = filters.inStockOnly;
  const hasSearch = Boolean(filters.searchQuery);

  const hasAnyFilter = hasCategory || hasPrice || hasSizes || hasColors || hasInStock || hasSearch;

  if (!hasAnyFilter) return null;

  const removeCategory = () => onChange({ ...filters, category: "all" });
  const removePrice = () => onChange({ ...filters, priceRange: [filters.priceRange[0], defaultMaxPrice] });
  const removeSize = (sz: string) => onChange({ ...filters, sizes: filters.sizes.filter((s) => s !== sz) });
  const removeColor = (col: string) => onChange({ ...filters, colors: filters.colors.filter((c) => c !== col) });
  const removeInStock = () => onChange({ ...filters, inStockOnly: false });
  const removeSearch = () => onChange({ ...filters, searchQuery: "" });

  const clearAll = () => {
    onChange({
      category: "all",
      priceRange: [0, defaultMaxPrice],
      sizes: [],
      colors: [],
      inStockOnly: false,
      sortBy: "featured",
      searchQuery: "",
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-3 font-sans text-xs animate-fade-in">
      <span className="text-muted uppercase tracking-wider text-[11px] font-mono me-1">
        {t(locale, "shop.activeFilters")}:
      </span>

      {hasSearch && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ivory border border-ivory-dark text-ink font-medium">
          <span>&ldquo;{filters.searchQuery}&rdquo;</span>
          <button onClick={removeSearch} className="hover:text-red-700">
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {hasCategory && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ivory border border-ivory-dark text-ink font-medium">
          <span>{t(locale, `nav.${filters.category}`)}</span>
          <button onClick={removeCategory} className="hover:text-red-700">
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {hasPrice && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ivory border border-ivory-dark text-ink font-mono">
          <span>&le; {formatMAD(filters.priceRange[1], locale)}</span>
          <button onClick={removePrice} className="hover:text-red-700">
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {filters.sizes.map((sz) => (
        <span key={sz} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ivory border border-ivory-dark text-ink font-mono">
          <span>{sz}</span>
          <button onClick={() => removeSize(sz)} className="hover:text-red-700">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {filters.colors.map((col) => (
        <span key={col} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ivory border border-ivory-dark text-ink">
          <span>{col}</span>
          <button onClick={() => removeColor(col)} className="hover:text-red-700">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {hasInStock && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ivory border border-ivory-dark text-ink">
          <span>{t(locale, "shop.inStockOnly")}</span>
          <button onClick={removeInStock} className="hover:text-red-700">
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      <button
        onClick={clearAll}
        className="text-[11px] text-camel hover:underline ms-2 font-medium"
      >
        {t(locale, "common.clearAll")}
      </button>
    </div>
  );
}

