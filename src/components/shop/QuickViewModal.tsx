"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, Locale } from "@/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatMAD } from "@/lib/utils";
import { t } from "@/lib/translations";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export function QuickViewModal({ product, isOpen, onClose, locale }: QuickViewModalProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  // Initialize selected variants if not chosen
  const activeColor = selectedColor || product.colors[0]?.name[locale] || product.colors[0]?.name.fr;
  const activeSize = selectedSize || product.sizes[0];

  // Find variant stock
  const currentVariant = product.variants.find(
    (v) =>
      v.size === activeSize &&
      (v.colorName[locale] === activeColor || v.colorName.fr === activeColor || v.color === activeColor)
  ) || product.variants[0];

  const currentStock = currentVariant?.stock ?? 0;

  const handleAddToCart = () => {
    if (currentStock <= 0) {
      showToast(t(locale, "pdp.outOfStockAlert"), "error");
      return;
    }
    addItem(product, activeSize, activeColor, quantity);
    showToast(t(locale, "common.addedToCart"), "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
      <div className="relative w-full max-w-4xl bg-white border border-ivory-dark shadow-2xl p-6 sm:p-8 animate-slide-up max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-ink p-1 rtl:right-auto rtl:left-4 z-10"
          aria-label="Fermer la vue rapide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Gallery View */}
          <div className="space-y-3">
            <div className="relative aspect-[3/4] w-full bg-ivory overflow-hidden border border-ivory-dark">
              <Image
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name[locale] || product.name.fr}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-16 h-20 flex-shrink-0 border transition-all ${
                      selectedImageIdx === idx ? "border-camel ring-1 ring-camel" : "border-ivory-dark opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="Miniature" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Actions */}
          <div className="space-y-5">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-camel font-semibold">
                {product.collection[locale] || product.collection.fr}
              </span>
              <h2 className="mt-1 font-serif text-xl sm:text-2xl font-bold text-ink">
                {product.name[locale] || product.name.fr}
              </h2>
              <p className="mt-1 text-xs text-muted-dark leading-relaxed">
                {product.shortDescription[locale] || product.shortDescription.fr}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-2 border-t border-ivory-dark font-mono">
              {product.salePrice ? (
                <>
                  <span className="text-xl font-bold text-ink">
                    {formatMAD(product.salePrice, locale)}
                  </span>
                  <span className="text-sm text-muted line-through">
                    {formatMAD(product.price, locale)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-ink">
                  {formatMAD(product.price, locale)}
                </span>
              )}
            </div>

            {/* Color Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-ink">{t(locale, "pdp.selectColor")}</span>
                <span className="text-muted font-mono">{activeColor}</span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map((c, idx) => {
                  const colorTitle = c.name[locale] || c.name.fr;
                  const isSelected = activeColor === colorTitle;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(colorTitle)}
                      className={`w-7 h-7 rounded-full border p-0.5 transition-transform ${
                        isSelected ? "ring-2 ring-camel ring-offset-2 scale-110" : "border-ivory-dark hover:scale-105"
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

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-ink">{t(locale, "pdp.selectSize")}</span>
                <span className="text-muted font-mono">
                  {currentStock > 0 ? (
                    <span className="text-emerald-700 font-medium">
                      {t(locale, "common.inStock")} ({currentStock})
                    </span>
                  ) : (
                    <span className="text-red-600">{t(locale, "common.outOfStock")}</span>
                  )}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => {
                  const isSelected = activeSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-10 px-3 py-2 text-xs font-mono border transition-all ${
                        isSelected
                          ? "bg-ink text-white border-ink font-bold"
                          : "bg-white text-ink border-ivory-dark hover:border-camel"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center border border-ivory-dark bg-ivory">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 hover:bg-ivory-dark text-muted-dark transition-colors"
                  aria-label="Diminuer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-mono font-medium text-ink">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(currentStock || 1, q + 1))}
                  className="p-2.5 hover:bg-ivory-dark text-muted-dark transition-colors"
                  aria-label="Augmenter"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={currentStock <= 0}
                className="flex-1 py-3 px-4 bg-ink text-white text-xs font-sans tracking-widest uppercase font-semibold hover:bg-camel transition-colors flex items-center justify-center gap-2 disabled:bg-muted disabled:cursor-not-allowed shadow-luxury-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {currentStock > 0 ? t(locale, "common.addToCart") : t(locale, "common.outOfStock")}
                </span>
              </button>
            </div>

            {/* Full PDP Link */}
            <div className="pt-3 border-t border-ivory-dark">
              <Link
                href={`/${locale}/product/${product.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs text-camel-dark hover:text-ink font-medium underline"
              >
                <span>{t(locale, "common.viewDetails")}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

