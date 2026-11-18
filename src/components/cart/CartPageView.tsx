"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatMAD } from "@/lib/utils";
import { t } from "@/lib/translations";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  Check,
} from "lucide-react";

interface CartPageViewProps {
  locale: Locale;
}

export function CartPageView({ locale }: CartPageViewProps) {
  const {
    items,
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
    clearCart,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const res = applyPromoCode(promoInput.trim());
    if (res.success) {
      setPromoError("");
      setPromoInput("");
    } else {
      setPromoError(res.message || "Code invalide");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center font-sans">
        <div className="max-w-md mx-auto space-y-4 p-8 bg-white border border-ivory-dark shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-ivory flex items-center justify-center text-camel">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h1 className="font-serif text-2xl font-bold text-ink">
              {t(locale, "cart.emptyTitle")}
            </h1>
            <p className="text-xs text-muted leading-relaxed">
              {t(locale, "cart.emptySubtitle")}
            </p>
          </div>
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-white text-xs uppercase tracking-widest font-semibold hover:bg-camel transition-colors shadow-sm"
          >
            <span>{t(locale, "cart.discoverPieces")}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      <div className="space-y-1 mb-8">
        <span className="text-xs uppercase font-mono tracking-widest text-camel font-semibold">
          PANIER PRIVILÈGE
        </span>
        <h1 className="font-serif text-3xl font-bold text-ink">
          {t(locale, "cart.title")}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Items list table */}
        <div className="lg:col-span-8 space-y-6">
          {/* Free Shipping Progress Alert */}
          <div className="bg-ivory border border-ivory-dark p-4 text-xs">
            {freeShippingRemaining > 0 ? (
              <div className="space-y-2">
                <p className="text-muted-dark font-medium">
                  {t(locale, "cart.shippingFreeNotice", {
                    amount: formatMAD(freeShippingRemaining, locale),
                  })}
                </p>
                <div className="w-full bg-ivory-dark h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-camel h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, ((1000 - freeShippingRemaining) / 1000) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-camel-dark font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-camel" />
                <span>{t(locale, "cart.shippingFreeSuccess")}</span>
              </p>
            )}
          </div>

          {/* Items Table */}
          <div className="border border-ivory-dark divide-y divide-ivory-dark bg-white">
            {items.map((item) => (
              <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="relative w-20 h-24 sm:w-24 sm:h-32 bg-ivory flex-shrink-0 border border-ivory-dark">
                    <Image
                      src={item.product.images[0] || "/placeholder.jpg"}
                      alt={item.product.name[locale] || item.product.name.fr}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-camel">
                      {item.product.collection[locale] || item.product.collection.fr}
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-ink hover:text-camel transition-colors">
                      <Link href={`/${locale}/product/${item.product.slug}`}>
                        {item.product.name[locale] || item.product.name.fr}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span>
                        Taille : <strong>{item.selectedSize}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Teinte : <strong>{item.selectedColor}</strong>
                      </span>
                    </div>
                    <p className="font-mono text-xs font-semibold text-ink sm:hidden pt-1">
                      {formatMAD(item.price, locale)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-ivory-dark">
                  {/* Stepper */}
                  <div className="flex items-center border border-ivory-dark bg-ivory">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-ivory-dark text-muted-dark transition-colors"
                      aria-label="Diminuer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-mono font-medium text-ink">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-ivory-dark text-muted-dark transition-colors"
                      aria-label="Augmenter"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <span className="font-mono text-sm font-bold text-ink min-w-20 text-right">
                    {formatMAD(item.price * item.quantity, locale)}
                  </span>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted hover:text-red-700 p-1.5 transition-colors"
                    aria-label="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs">
            <Link
              href={`/${locale}/shop`}
              className="text-camel hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>← {t(locale, "cart.continueShopping")}</span>
            </Link>
            <button
              onClick={clearCart}
              className="text-muted hover:text-red-700 underline"
            >
              {t(locale, "common.clearAll")}
            </button>
          </div>
        </div>

        {/* Right: Order Summary box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-ivory-dark p-6 shadow-luxury-sm space-y-5">
            <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-ink pb-3 border-b border-ivory-dark">
              Récapitulatif
            </h3>

            {/* Promo Code Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-ink block">
                {t(locale, "cart.promoCode")}
              </label>
              {promoCode ? (
                <div className="flex items-center justify-between p-2.5 bg-ivory border border-camel/30 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-camel" />
                    <span className="font-mono font-bold text-ink">{promoCode}</span>
                    <span className="text-camel font-medium">(-{discountPercentage}%)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-muted hover:text-ink text-xs underline"
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
                    className="flex-1 px-3 py-2 bg-ivory border border-ivory-dark text-xs uppercase font-mono focus:outline-none focus:border-camel"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-ink text-white text-xs uppercase tracking-wider font-semibold hover:bg-camel transition-colors"
                  >
                    {t(locale, "cart.applyPromo")}
                  </button>
                </form>
              )}
              {promoError && <p className="text-[11px] text-red-600">{promoError}</p>}
            </div>

            {/* Breakdown */}
            <div className="space-y-2 text-xs text-muted-dark border-t border-ivory-dark pt-4">
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

              <div className="flex justify-between text-base font-bold text-ink pt-3 border-t border-ivory-dark font-serif">
                <span>{t(locale, "cart.total")}</span>
                <span className="font-mono text-lg">{formatMAD(total, locale)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href={`/${locale}/checkout`}
              className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-ink text-white text-xs font-sans tracking-widest uppercase font-semibold hover:bg-camel transition-colors shadow-luxury-sm"
            >
              <span>{t(locale, "cart.proceedToCheckout")}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>

            <div className="pt-2 space-y-2 text-[11px] text-muted border-t border-ivory-dark">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-camel flex-shrink-0" />
                <span>Livraison express simulée sous 24-48h</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-camel flex-shrink-0" />
                <span>Paiement à la livraison simulé (Démonstration)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

