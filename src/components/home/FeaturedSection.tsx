"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, Locale } from "@/types";
import { t } from "@/lib/translations";
import { ProductCard } from "@/components/shop/ProductCard";
import { QuickViewModal } from "@/components/shop/QuickViewModal";
import { ArrowRight } from "lucide-react";

interface FeaturedSectionProps {
  products: Product[];
  locale: Locale;
}

export function FeaturedSection({ products, locale }: FeaturedSectionProps) {
  const [activeTab, setActiveTab] = useState<"featured" | "new" | "bestseller">("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const displayedProducts = products
    .filter((p) => {
      if (activeTab === "new") return p.isNewArrival;
      if (activeTab === "bestseller") return p.isBestSeller;
      return p.isFeatured;
    })
    .slice(0, 8);

  return (
    <section className="py-20 sm:py-28 bg-white font-sans border-b border-ivory-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 sm:mb-16">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-camel font-semibold">
              SÉLECTION EXCLUSIVE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
              {t(locale, "home.featuredTitle")}
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-2 border border-ivory-dark p-1 bg-ivory text-xs font-mono">
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-3 py-1.5 transition-colors uppercase ${
                activeTab === "featured"
                  ? "bg-ink text-white font-bold shadow-xs"
                  : "text-muted hover:text-ink"
              }`}
            >
              Signature
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-3 py-1.5 transition-colors uppercase ${
                activeTab === "new"
                  ? "bg-ink text-white font-bold shadow-xs"
                  : "text-muted hover:text-ink"
              }`}
            >
              {t(locale, "home.newArrivals")}
            </button>
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-3 py-1.5 transition-colors uppercase ${
                activeTab === "bestseller"
                  ? "bg-ink text-white font-bold shadow-xs"
                  : "text-muted hover:text-ink"
              }`}
            >
              {t(locale, "home.bestSellers")}
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* View full collection button */}
        <div className="mt-14 text-center">
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-white text-xs font-sans uppercase tracking-widest font-semibold hover:bg-camel transition-colors shadow-sm"
          >
            <span>{t(locale, "home.heroCta")}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        locale={locale}
      />
    </section>
  );
}

