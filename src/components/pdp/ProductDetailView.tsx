"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, Locale } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { formatMAD } from "@/lib/utils";
import { t } from "@/lib/translations";
import { ProductCard } from "@/components/shop/ProductCard";
import { SizeGuideModal } from "@/components/shop/SizeGuideModal";
import {
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  Ruler,
  Truck,
  ShieldCheck,
  ChevronRight,
  ZoomIn,
} from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
  locale: Locale;
}

export function ProductDetailView({ product, relatedProducts, locale }: ProductDetailViewProps) {
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name[locale] || product.colors[0]?.name.fr || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "materials" | "delivery">("details");

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFavorited = isInWishlist(product.id);

  // Variant matching
  const currentVariant = product.variants.find(
    (v) =>
      v.size === selectedSize &&
      (v.colorName[locale] === selectedColor ||
        v.colorName.fr === selectedColor ||
        v.color === selectedColor)
  ) || product.variants[0];

  const currentStock = currentVariant?.stock ?? 0;

  const handleAddToCart = () => {
    if (currentStock <= 0) {
      showToast(t(locale, "pdp.outOfStockAlert"), "error");
      return;
    }
    addItem(product, selectedSize, selectedColor, quantity);
    showToast(t(locale, "common.addedToCart"), "success");
  };

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product.id);
    if (added) {
      showToast(t(locale, "common.addedToWishlist"), "success");
    } else {
      showToast(t(locale, "common.removeFromWishlist"), "info");
    }
  };

  return (
    <div className="font-sans">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-muted font-sans" aria-label="Fil d'Ariane">
          <Link href={`/${locale}`} className="hover:text-ink transition-colors">
            {t(locale, "nav.home")}
          </Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180" />
          <Link href={`/${locale}/shop`} className="hover:text-ink transition-colors">
            {t(locale, "nav.shop")}
          </Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180" />
          <Link
            href={`/${locale}/shop?category=${product.category}`}
            className="hover:text-ink transition-colors capitalize"
          >
            {t(locale, `nav.${product.category}`)}
          </Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180" />
          <span className="text-ink font-medium truncate max-w-[200px]">
            {product.name[locale] || product.name.fr}
          </span>
        </nav>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Gallery: 7 Columns */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Interactive Image Viewport */}
            <div
              className={`relative aspect-[3/4] w-full bg-ivory overflow-hidden border border-ivory-dark cursor-zoom-in transition-all ${
                isZoomed ? "scale-105" : ""
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={product.images[selectedImgIdx] || product.images[0]}
                alt={product.name[locale] || product.name.fr}
                fill
                priority
                className={`object-cover transition-transform duration-500 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 text-ink rounded-full shadow-sm pointer-events-none rtl:right-auto rtl:left-3">
                <ZoomIn className="w-4 h-4 text-camel" />
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImgIdx(idx);
                      setIsZoomed(false);
                    }}
                    className={`relative aspect-[3/4] border transition-all ${
                      selectedImgIdx === idx
                        ? "border-camel ring-1 ring-camel"
                        : "border-ivory-dark opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Vue ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Buy Box: 5 Columns */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-muted uppercase tracking-widest">
                <span>{product.collection[locale] || product.collection.fr}</span>
                <span>
                  {t(locale, "pdp.sku")}: {currentVariant?.sku || product.id}
                </span>
              </div>

              <h1 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                {product.name[locale] || product.name.fr}
              </h1>

              <p className="mt-2 text-xs sm:text-sm text-muted-dark leading-relaxed font-sans">
                {product.shortDescription[locale] || product.shortDescription.fr}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="py-3 border-y border-ivory-dark flex items-baseline gap-4 font-mono">
              {product.salePrice ? (
                <>
                  <span className="text-2xl font-bold text-ink">
                    {formatMAD(product.salePrice, locale)}
                  </span>
                  <span className="text-base text-muted line-through">
                    {formatMAD(product.price, locale)}
                  </span>
                  <span className="px-2 py-0.5 bg-camel text-white text-xs uppercase tracking-wider font-semibold">
                    Privilège
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-ink">
                  {formatMAD(product.price, locale)}
                </span>
              )}
            </div>

            {/* Color Swatch Picker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-ink">{t(locale, "pdp.selectColor")}</span>
                <span className="text-muted font-mono">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c, idx) => {
                  const colorTitle = c.name[locale] || c.name.fr;
                  const isSelected = selectedColor === colorTitle;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(colorTitle)}
                      className={`w-8 h-8 rounded-full border p-0.5 transition-transform ${
                        isSelected
                          ? "ring-2 ring-camel ring-offset-2 scale-110"
                          : "border-ivory-dark hover:scale-105"
                      }`}
                      title={colorTitle}
                    >
                      <span
                        className="w-full h-full rounded-full block border border-black/10"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector with Size Guide Trigger */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-ink">{t(locale, "pdp.selectSize")}</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-camel hover:underline"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{t(locale, "pdp.sizeGuide")}</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2.5 px-3 text-xs font-mono border transition-all text-center ${
                        isSelected
                          ? "bg-ink text-white border-ink font-bold shadow-xs"
                          : "bg-white text-ink border-ivory-dark hover:border-camel"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>

              {/* Live stock indicator */}
              <div className="pt-1 text-xs">
                {currentStock > 3 ? (
                  <span className="text-emerald-700 font-medium">
                    ✓ {t(locale, "common.inStock")} ({currentStock} {t(locale, "common.itemsLeft")})
                  </span>
                ) : currentStock > 0 ? (
                  <span className="text-amber-700 font-semibold">
                    ⚠ {t(locale, "pdp.lowStockWarning", { count: currentStock })}
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">
                    ✕ {t(locale, "pdp.outOfStockAlert")}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Stepper & Add to Bag / Wishlist */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-ivory-dark bg-ivory">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-ivory-dark text-muted-dark transition-colors"
                    aria-label="Diminuer la quantité"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-xs font-mono font-medium text-ink">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(currentStock || 1, q + 1))}
                    className="p-3 hover:bg-ivory-dark text-muted-dark transition-colors"
                    aria-label="Augmenter la quantité"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  onClick={handleAddToCart}
                  disabled={currentStock <= 0}
                  className="flex-1 py-3.5 px-6 bg-ink text-white text-xs font-sans tracking-widest uppercase font-semibold hover:bg-camel transition-colors flex items-center justify-center gap-2.5 disabled:bg-muted disabled:cursor-not-allowed shadow-luxury"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {currentStock > 0 ? t(locale, "common.addToCart") : t(locale, "common.outOfStock")}
                  </span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={handleWishlistToggle}
                  className={`p-3.5 border transition-colors ${
                    isFavorited
                      ? "border-camel bg-camel/10 text-camel"
                      : "border-ivory-dark bg-white text-ink hover:text-camel hover:border-camel"
                  }`}
                  aria-label="Ajouter aux favoris"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? "fill-camel text-camel" : ""}`} />
                </button>
              </div>

              {/* Express delivery pill notice */}
              <div className="bg-ivory/60 border border-ivory-dark p-3.5 text-xs text-muted-dark space-y-2">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-camel flex-shrink-0" />
                  <span>{t(locale, "pdp.deliveryDetails")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-camel flex-shrink-0" />
                  <span>{t(locale, "pdp.paymentDetails")}</span>
                </div>
              </div>
            </div>

            {/* Accordion Tabs for Product Details */}
            <div className="pt-4 border-t border-ivory-dark">
              <div className="flex border-b border-ivory-dark text-xs font-serif uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`py-2 px-3 border-b-2 font-bold transition-colors ${
                    activeTab === "details"
                      ? "border-camel text-ink"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {t(locale, "pdp.materialsAndCare")}
                </button>
                <button
                  onClick={() => setActiveTab("materials")}
                  className={`py-2 px-3 border-b-2 font-bold transition-colors ${
                    activeTab === "materials"
                      ? "border-camel text-ink"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {t(locale, "pdp.originAndCraft")}
                </button>
                <button
                  onClick={() => setActiveTab("delivery")}
                  className={`py-2 px-3 border-b-2 font-bold transition-colors ${
                    activeTab === "delivery"
                      ? "border-camel text-ink"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {t(locale, "pdp.deliveryAndReturns")}
                </button>
              </div>

              <div className="py-4 text-xs text-muted-dark leading-relaxed font-sans space-y-2">
                {activeTab === "details" && (
                  <div className="space-y-2">
                    <p>
                      <strong>Composition :</strong> {product.materials[locale] || product.materials.fr}
                    </p>
                    <p>
                      <strong>Entretien :</strong> {product.care[locale] || product.care.fr}
                    </p>
                    <ul className="list-disc pl-4 space-y-1 pt-1 rtl:pl-0 rtl:pr-4">
                      {product.details.map((d, i) => (
                        <li key={i}>{d[locale] || d.fr}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "materials" && (
                  <div className="space-y-2">
                    <p>
                      <strong>Atelier & Façon :</strong> {product.origin[locale] || product.origin.fr}
                    </p>
                    <p>
                      Chaque pièce est supervisée par notre maître tailleur à Casablanca et respecte les traditions de confection les plus exigeantes.
                    </p>
                  </div>
                )}

                {activeTab === "delivery" && (
                  <div className="space-y-2">
                    <p>
                      <strong>Transporteur express :</strong> Amana Express avec numéro de suivi sms.
                    </p>
                    <p>
                      <strong>Délai :</strong> 24h à Casablanca et Rabat, 48h dans les autres villes du Maroc.
                    </p>
                    <p>
                      <strong>Retours :</strong> 14 jours pour essayer et retourner gratuitement vos pièces.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-ivory-dark">
            <div className="text-center space-y-2 mb-10">
              <span className="text-xs uppercase font-mono tracking-widest text-camel font-semibold">
                STYLISME & SILHOUETTES
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
                {t(locale, "pdp.relatedTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-muted">
                {t(locale, "pdp.relatedSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} locale={locale} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sizing Matrix Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        locale={locale}
        category={product.category}
      />
    </div>
  );
}
