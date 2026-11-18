"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, Locale } from "@/types";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { formatMAD } from "@/lib/utils";
import { t } from "@/lib/translations";
import { Heart, Eye, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
  locale: Locale;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}

export function ProductCard({ product, locale, onQuickView, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images[0] || "/placeholder.jpg";
  const secondaryImage = product.images[1] || primaryImage;

  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    if (added) {
      showToast(t(locale, "common.addedToWishlist"), "success");
    } else {
      showToast(t(locale, "common.removeFromWishlist"), "info");
    }
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div
      className="group flex flex-col relative font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full bg-ivory overflow-hidden border border-ivory-dark transition-all duration-300 group-hover:border-camel/40 group-hover:shadow-luxury">
        <Link href={`/${locale}/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name[locale] || product.name.fr}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Badges: Sale, New, Limited Stock */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none rtl:left-auto rtl:right-3">
          {product.isNewArrival && (
            <span className="px-2 py-0.5 bg-ink text-white text-[10px] uppercase font-mono tracking-widest font-medium">
              {t(locale, "home.newArrivals")}
            </span>
          )}
          {product.salePrice && (
            <span className="px-2 py-0.5 bg-camel text-white text-[10px] uppercase font-mono tracking-widest font-semibold">
              Privilège
            </span>
          )}
          {totalStock > 0 && totalStock <= 3 && (
            <span className="px-2 py-0.5 bg-amber-700 text-white text-[9px] uppercase font-mono tracking-wider">
              {t(locale, "common.lowStock")} ({totalStock})
            </span>
          )}
          {totalStock === 0 && (
            <span className="px-2 py-0.5 bg-zinc-800 text-white text-[9px] uppercase font-mono tracking-wider">
              {t(locale, "common.outOfStock")}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm text-ink hover:text-camel transition-colors z-10 rounded-full shadow-sm rtl:right-auto rtl:left-3"
          aria-label={isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isFavorited ? "fill-camel text-camel" : ""
            }`}
          />
        </button>

        {/* Quick View Floating Action Bar on Hover */}
        {onQuickView && (
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden sm:block">
            <button
              onClick={handleQuickViewClick}
              className="w-full py-2.5 px-3 bg-white/95 backdrop-blur-md text-ink text-xs uppercase font-sans tracking-widest font-semibold hover:bg-ink hover:text-white transition-colors flex items-center justify-center gap-2 border border-ivory-dark shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-camel" />
              <span>{t(locale, "common.quickView")}</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="pt-3.5 pb-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Collection Name & Category */}
          <div className="flex items-center justify-between text-[11px] text-muted uppercase tracking-widest font-mono">
            <span>{product.collection[locale] || product.collection.fr}</span>
            {product.isBestSeller && (
              <span className="text-camel flex items-center gap-0.5 lowercase font-sans">
                <Sparkles className="w-3 h-3" /> bestseller
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="mt-1 font-serif text-sm sm:text-base font-semibold text-ink line-clamp-1 group-hover:text-camel transition-colors">
            <Link href={`/${locale}/product/${product.slug}`}>
              {product.name[locale] || product.name.fr}
            </Link>
          </h3>

          {/* Material Highlight */}
          <p className="mt-0.5 text-xs text-muted line-clamp-1">
            {product.materials[locale] || product.materials.fr}
          </p>
        </div>

        {/* Price & Color Swatches */}
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-ivory-dark">
          {/* Price */}
          <div className="flex items-baseline gap-2 font-mono text-xs sm:text-sm">
            {product.salePrice ? (
              <>
                <span className="font-bold text-ink">
                  {formatMAD(product.salePrice, locale)}
                </span>
                <span className="text-xs text-muted line-through font-normal">
                  {formatMAD(product.price, locale)}
                </span>
              </>
            ) : (
              <span className="font-bold text-ink">
                {formatMAD(product.price, locale)}
              </span>
            )}
          </div>

          {/* Color Swatches */}
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 4).map((c, idx) => (
              <span
                key={idx}
                className="w-3 h-3 rounded-full border border-ivory-dark shadow-xs inline-block"
                style={{ backgroundColor: c.hex }}
                title={c.name[locale] || c.name.fr}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-muted font-mono">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

