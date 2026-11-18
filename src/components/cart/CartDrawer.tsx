"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/types";
import { useCart } from "@/context/CartContext";
import { t } from "@/lib/translations";
import { formatMAD } from "@/lib/utils";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check } from "lucide-react";

interface CartDrawerProps {
  locale: Locale;
}

export function CartDrawer({ locale }: CartDrawerProps) {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    promoCode,
    discountPercentage,
    applyPromoCode,
    removePromoCode,
    freeShippingRemaining,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  if (!isDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const result = applyPromoCode(promoInput.trim());
    if (result.success) {
      setPromoError("");
      setPromoInput("");
    } else {
      setPromoError(result.message || "Code invalide");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={closeDrawer}
      />

      {/* Drawer Panel */}
      <aside
        data-testid="cart-drawer"
        aria-label={t(locale, "cart.title")}
        className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col z-10 animate-slide-up rtl:right-auto rtl:left-0 font-sans"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ivory-dark bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-camel" />
            <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-ink">
              {t(locale, "cart.title")}
            </h3>
            <span className="text-xs text-muted font-mono">({items.length})</span>
          </div>
          <button
            onClick={closeDrawer}
            className="p-1.5 text-muted hover:text-ink transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div className="bg-ivory px-6 py-3 border-b border-ivory-dark text-xs">
          {freeShippingRemaining > 0 ? (
            <div>
              <p className="text-muted-dark font-medium">
                {t(locale, "cart.shippingFreeNotice", {
                  amount: formatMAD(freeShippingRemaining, locale),
                })}
              </p>
              <div className="w-full bg-ivory-dark h-1.5 mt-2 rounded-full overflow-hidden">
                <div
                  className="bg-camel h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, ((1000 - freeShippingRemaining) / 1000) * 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <p className="text-camel-dark font-medium flex items-center gap-1.5">
              <Check className="w-4 h-4 text-camel" />
              <span>{t(locale, "cart.shippingFreeSuccess")}</span>
            </p>
          )}
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-ivory-dark">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-ivory flex items-center justify-center text-camel">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg text-ink font-semibold">
                  {t(locale, "cart.emptyTitle")}
                </h4>
                <p className="text-xs text-muted max-w-xs leading-relaxed">
                  {t(locale, "cart.emptySubtitle")}
                </p>
              </div>
              <Link
                href={`/${locale}/shop`}
                onClick={closeDrawer}
                className="px-6 py-3 bg-ink text-white text-xs uppercase tracking-wider font-medium hover:bg-camel transition-colors"
              >
                {t(locale, "cart.discoverPieces")}
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex gap-4">
                <div className="relative w-20 h-24 bg-ivory flex-shrink-0 overflow-hidden border border-ivory-dark">
                  <Image
                    src={item.product.images[0] || "/placeholder.jpg"}
                    alt={item.product.name[locale] || item.product.name.fr}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/${locale}/product/${item.product.slug}`}
                        onClick={closeDrawer}
                        className="text-xs font-serif font-bold text-ink hover:text-camel transition-colors line-clamp-1"
                      >
                        {item.product.name[locale] || item.product.name.fr}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted hover:text-red-700 p-1 transition-colors"
                        aria-label="Retirer l'article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-1 flex items-center gap-3 text-[11px] text-muted">
                      <span>
                        {t(locale, "cart.size")}: <strong>{item.selectedSize}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        {t(locale, "cart.color")}: <strong>{item.selectedColor}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity stepper */}
                    <div className="flex items-center border border-ivory-dark bg-ivory">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-ivory-dark text-muted-dark transition-colors"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-mono font-medium text-ink">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-ivory-dark text-muted-dark transition-colors"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-mono font-bold text-ink">
                      {formatMAD(item.price * item.quantity, locale)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with calculation & checkout CTA */}
        {items.length > 0 && (
          <div className="p-6 border-t border-ivory-dark bg-white space-y-4">
            {/* Promo Code Simulator */}
            <div>
              {promoCode ? (
                <div className="flex items-center justify-between py-1.5 px-3 bg-ivory border border-camel/30 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-camel" />
                    <span className="font-mono font-semibold text-ink">{promoCode}</span>
                    <span className="text-camel font-medium">(-{discountPercentage}%)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-muted hover:text-ink text-[11px] underline"
                  >
                    {t(locale, "common.delete")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder={t(locale, "cart.promoPlaceholder")}
                    className="flex-1 px-3 py-2 bg-ivory border border-ivory-dark text-xs focus:outline-none focus:border-camel uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-ink text-white text-xs uppercase tracking-wider font-medium hover:bg-camel transition-colors"
                  >
                    {t(locale, "cart.applyPromo")}
                  </button>
                </form>
              )}
              {promoError && <p className="text-[11px] text-red-600 mt-1">{promoError}</p>}
            </div>

            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-muted-dark border-t border-ivory-dark pt-3">
              <div className="flex justify-between">
                <span>{t(locale, "cart.subtotal")}</span>
                <span className="font-mono text-ink">{formatMAD(subtotal, locale)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-camel font-medium">
                  <span>Remise ({discountPercentage}%)</span>
                  <span className="font-mono">-{formatMAD(discount, locale)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t(locale, "cart.shipping")}</span>
                <span className="font-mono text-ink">
                  {shipping === 0 ? t(locale, "common.free") : formatMAD(shipping, locale)}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-ink pt-2 border-t border-ivory-dark font-serif">
                <span>{t(locale, "cart.total")}</span>
                <span className="font-mono text-base">{formatMAD(total, locale)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <Link
                href={`/${locale}/checkout`}
                onClick={closeDrawer}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-ink text-white text-xs font-sans tracking-widest uppercase font-semibold hover:bg-camel transition-colors shadow-luxury-sm"
              >
                <span>{t(locale, "cart.proceedToCheckout")}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>

              <Link
                href={`/${locale}/cart`}
                onClick={closeDrawer}
                className="w-full block text-center py-2 text-xs text-muted-dark hover:text-ink transition-colors underline"
              >
                {t(locale, "common.viewCart")}
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

