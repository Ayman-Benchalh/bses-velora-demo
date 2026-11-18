"use client";

import React from "react";
import Link from "next/link";
import { Locale } from "@/types";
import { useWishlist } from "@/context/WishlistContext";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { t } from "@/lib/translations";
import { ProductCard } from "@/components/shop/ProductCard";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

interface WishlistViewProps {
  locale: Locale;
}

export function WishlistView({ locale }: WishlistViewProps) {
  const { items, clearWishlist } = useWishlist();
  const { products } = useStore();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const wishlistedProducts = products.filter((p) => items.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistedProducts.forEach((p) => {
      const size = p.sizes[0] || "Unique";
      const color = p.colors[0]?.name[locale] || p.colors[0]?.name.fr || "Unique";
      addItem(p, size, color, 1);
    });
    showToast("Tous les articles ont été ajoutés à votre panier.", "success");
    clearWishlist();
  };

  return (
    <div className="font-sans min-h-[70vh]">
      {/* Header */}
      <div className="border-b border-ivory-dark bg-ivory/40 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <span className="text-xs uppercase font-mono tracking-widest text-camel font-semibold">
            GARDE-ROBE IDÉALE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
            {t(locale, "nav.wishlist")} ({items.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted-dark max-w-md mx-auto">
            Retrouvez les silhouettes que vous avez soigneusement sélectionnées.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-20 px-4 bg-white border border-ivory-dark space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-ivory flex items-center justify-center text-camel">
              <Heart className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-ink">
                Votre liste de favoris est vide
              </h3>
              <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">
                Explorez notre collection et enregistrez vos coups de cœur d&apos;un simple clic sur le cœur.
              </p>
            </div>
            <Link
              href={`/${locale}/shop`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white text-xs uppercase tracking-wider font-semibold hover:bg-camel transition-colors shadow-sm"
            >
              <span>{t(locale, "common.exploreShop")}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Action Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-ivory-dark text-xs">
              <span className="text-muted font-mono">
                {wishlistedProducts.length} pièces sauvegardées
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleMoveAllToCart}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-ink text-white hover:bg-camel transition-colors font-medium uppercase tracking-wider text-[11px]"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Tout transférer au panier</span>
                </button>
                <button
                  onClick={clearWishlist}
                  className="flex items-center gap-1.5 text-muted hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t(locale, "common.clearAll")}</span>
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {wishlistedProducts.map((p) => (
                <ProductCard key={p.id} product={p} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

