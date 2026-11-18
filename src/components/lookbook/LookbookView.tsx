"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale, Product } from "@/types";
import { LOOKBOOK_CAMPAIGNS } from "@/data/lookbook";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatMAD } from "@/lib/utils";
import { t } from "@/lib/translations";
import { ProductCard } from "@/components/shop/ProductCard";
import { Plus, X, ShoppingBag, ArrowRight } from "lucide-react";

interface LookbookViewProps {
  locale: Locale;
}

export function LookbookView({ locale }: LookbookViewProps) {
  const { products } = useStore();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [activeCampaignIdx, setActiveCampaignIdx] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const campaign = LOOKBOOK_CAMPAIGNS[activeCampaignIdx] || LOOKBOOK_CAMPAIGNS[0];

  // Match featured products in this campaign
  const campaignProducts = products.filter((p) =>
    campaign.featuredProductIds.includes(p.id)
  );

  const activeHotspot = campaign.hotspots.find((h) => h.id === activeHotspotId);
  const hotspotProduct = activeHotspot
    ? products.find((p) => p.id === activeHotspot.productId)
    : null;

  const handleQuickAdd = (p: Product) => {
    const size = p.sizes[0] || "Unique";
    const color = p.colors[0]?.name[locale] || p.colors[0]?.name.fr || "Unique";
    addItem(p, size, color, 1);
    showToast(t(locale, "common.addedToCart"), "success");
    setActiveHotspotId(null);
  };

  return (
    <div className="font-sans">
      {/* Lookbook Header */}
      <div className="bg-ink text-white py-16 sm:py-24 border-b border-ink-800 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-camel font-semibold">
            ÉDITION PHOTOGRAPHIQUE & CINÉMATOGRAPHIQUE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory">
            {t(locale, "lookbook.title")}
          </h1>
          <p className="text-xs sm:text-sm text-ivory/80 max-w-lg mx-auto font-light leading-relaxed">
            {t(locale, "lookbook.desc")}
          </p>

          {/* Campaign Selector Tabs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {LOOKBOOK_CAMPAIGNS.map((camp, idx) => (
              <button
                key={camp.id}
                onClick={() => {
                  setActiveCampaignIdx(idx);
                  setActiveHotspotId(null);
                }}
                className={`py-2 px-4 text-xs font-serif uppercase tracking-widest transition-all ${
                  activeCampaignIdx === idx
                    ? "bg-camel text-white font-bold shadow-luxury"
                    : "bg-white/10 text-ivory hover:bg-white/20"
                }`}
              >
                {camp.title[locale] || camp.title.fr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Campaign Stage with Interactive Hotspots */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4 mb-8 text-center sm:text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-camel font-semibold">
            {campaign.season[locale] || campaign.season.fr}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            {campaign.title[locale] || campaign.title.fr}
          </h2>
          <p className="text-xs sm:text-sm text-muted-dark max-w-2xl leading-relaxed">
            {campaign.description[locale] || campaign.description.fr}
          </p>
        </div>

        {/* Hero Interactive Canvas */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-ivory overflow-hidden border border-ivory-dark shadow-luxury-lg">
          <Image
            src={campaign.heroImage}
            alt={campaign.title[locale] || campaign.title.fr}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />

          {/* Hotspot Pins */}
          {campaign.hotspots.map((hs) => {
            const isActive = activeHotspotId === hs.id;
            return (
              <div
                key={hs.id}
                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <button
                  onClick={() => setActiveHotspotId(isActive ? null : hs.id)}
                  aria-label={hs.label[locale] || hs.label.fr}
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg transition-transform ${
                    isActive
                      ? "bg-camel text-white scale-115 rotate-45"
                      : "bg-ink/90 text-white hover:scale-110 hover:bg-camel"
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-camel opacity-30"></span>
                </button>
              </div>
            );
          })}

          {/* Floating Product Popover Card when Hotspot is clicked */}
          {activeHotspot && hotspotProduct && (
            <div
              style={{
                left: `${Math.min(75, Math.max(25, activeHotspot.x))}%`,
                top: `${Math.min(75, Math.max(25, activeHotspot.y))}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 w-72 bg-white border border-ivory-dark shadow-2xl p-4 animate-slide-up"
            >
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-ivory-dark">
                <span className="text-[10px] font-mono uppercase tracking-widest text-camel font-semibold">
                  Shop the Look
                </span>
                <button
                  onClick={() => setActiveHotspotId(null)}
                  className="text-muted hover:text-ink p-0.5"
                  aria-label="Fermer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex gap-3 py-3">
                <div className="relative w-16 h-20 bg-ivory flex-shrink-0 border border-ivory-dark">
                  <Image
                    src={hotspotProduct.images[0] || "/placeholder.jpg"}
                    alt={hotspotProduct.name[locale] || hotspotProduct.name.fr}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-xs font-bold text-ink line-clamp-2">
                      {hotspotProduct.name[locale] || hotspotProduct.name.fr}
                    </h4>
                    <p className="font-mono text-xs font-semibold text-camel-dark mt-1">
                      {formatMAD(hotspotProduct.salePrice ?? hotspotProduct.price, locale)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => handleQuickAdd(hotspotProduct)}
                      className="p-1.5 bg-ink text-white hover:bg-camel transition-colors"
                      title="Ajouter directement au panier"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      href={`/${locale}/product/${hotspotProduct.slug}`}
                      className="text-[11px] underline text-ink hover:text-camel font-medium"
                    >
                      {t(locale, "lookbook.viewPiece")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Featured Pieces in Silhouette */}
        <section className="mt-16 pt-10 border-t border-ivory-dark">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-camel font-semibold">
                SÉLECTION SHOP-THE-LOOK
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                {t(locale, "lookbook.piecesInLook")}
              </h3>
            </div>
            <Link
              href={`/${locale}/shop`}
              className="text-xs text-camel hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>{t(locale, "common.exploreShop")}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {campaignProducts.map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

