"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Locale, ShippingAddress, PaymentMethod, Order } from "@/types";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { formatMAD, generateOrderNumber, MOROCCAN_CITIES, getDeliveryEstimate } from "@/lib/utils";
import { t } from "@/lib/translations";
import {
  CreditCard,
  Banknote,
  Info,
  Lock,
} from "lucide-react";

interface CheckoutViewProps {
  locale: Locale;
}

export function CheckoutView({ locale }: CheckoutViewProps) {
  const router = useRouter();
  const { items, subtotal, discount, shipping, total, discountPercentage, clearCart } = useCart();
  const { addOrder } = useStore();

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    email: "",
    city: "Casablanca",
    address: "",
    deliveryNotes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateMoroccanPhone = (phone: string): boolean => {
    // Accepts formats: 06XXXXXXXX, 07XXXXXXXX, +2126XXXXXXXX, +2127XXXXXXXX with or without spaces
    const clean = phone.replace(/[\s\-\.]/g, "");
    const regex = /^(?:\+212|0)[67]\d{8}$/;
    return regex.test(clean);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim()) {
      setErrorMessage("Veuillez renseigner votre Nom et Prénom.");
      return;
    }

    if (!validateMoroccanPhone(formData.phone)) {
      setErrorMessage("Veuillez renseigner un numéro de téléphone mobile marocain valide (ex: 06 12 34 56 78).");
      return;
    }

    if (!formData.address.trim()) {
      setErrorMessage("Veuillez renseigner votre adresse de livraison complète.");
      return;
    }

    setIsSubmitting(true);

    const orderNumber = generateOrderNumber();
    const orderId = `ord-${Date.now()}`;
    const timestamp = new Date().toISOString();

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      customer: formData,
      items: [...items],
      subtotal,
      shipping,
      discount,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === "cmi_card" ? "paid" : "pending_cod",
      status: "pending",
      timeline: [
        {
          status: "pending",
          title: {
            fr: "Commande reçue & vérifiée",
            en: "Order received & verified",
            ar: "تم استلام الطلب وتأكيده",
          },
          description: {
            fr: "Votre commande est enregistrée dans nos systèmes",
            en: "Your order is confirmed in our systems",
            ar: "تم تسجيل طلبكم بنجاح في نظامنا",
          },
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          completed: true,
        },
        {
          status: "processing",
          title: {
            fr: "En préparation à l'atelier",
            en: "Atelier preparation",
            ar: "قيد التجهيز في الورشة",
          },
          description: {
            fr: "Mise sous écrin et contrôle des finitions",
            en: "Boxing and quality inspection",
            ar: "التغليف الفاخر وفحص الجودة النهائي",
          },
          timestamp: "",
          completed: false,
        },
        {
          status: "shipped",
          title: {
            fr: "Prise en charge transporteur (Simulé)",
            en: "Carrier dispatch (Simulated)",
            ar: "تم التسليم للناقل السريع (محاكاة)",
          },
          description: {
            fr: `En route pour ${formData.city}`,
            en: `In transit to ${formData.city}`,
            ar: `في الطريق إلى ${formData.city}`,
          },
          timestamp: "",
          completed: false,
        },
        {
          status: "in_delivery",
          title: {
            fr: "En cours de livraison",
            en: "Out for delivery",
            ar: "في مسار التوصيل",
          },
          description: {
            fr: "Le livreur vous contactera par téléphone",
            en: "Courier will contact you by phone",
            ar: "سيتصل بكم المندوب هاتفياً",
          },
          timestamp: "",
          completed: false,
        },
        {
          status: "delivered",
          title: {
            fr: "Livrée en mains propres",
            en: "Delivered",
            ar: "تم التسليم بنجاح",
          },
          description: {
            fr: "Remise du colis scellé",
            en: "Parcel delivered into customer hands",
            ar: "تسليم الطرد المختوم باليد",
          },
          timestamp: "",
          completed: false,
        },
      ],
      createdAt: timestamp,
    };

    // Save order into StoreContext
    addOrder(newOrder);

    // Simulated short delay for realism
    setTimeout(() => {
      clearCart();
      router.push(`/${locale}/order-confirmation/${orderNumber}`);
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-sans">
        <h2 className="font-serif text-2xl font-bold text-ink mb-3">
          Votre panier est vide
        </h2>
        <Link
          href={`/${locale}/shop`}
          className="inline-block px-6 py-3 bg-ink text-white text-xs uppercase tracking-wider font-semibold hover:bg-camel transition-colors"
        >
          {t(locale, "common.exploreShop")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* Client Demo Notice Alert Banner */}
      <div className="mb-8 p-4 bg-amber-50/90 border border-amber-300 text-amber-900 text-xs flex items-start gap-3 shadow-sm">
        <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold uppercase tracking-wider text-[11px] text-amber-800">
            {t(locale, "common.demoModeBanner")}
          </p>
          <p className="leading-relaxed">
            {t(locale, "common.demoNoticeCheckout")}
          </p>
        </div>
      </div>

      <div className="space-y-1 mb-8">
        <span className="text-xs uppercase font-mono tracking-widest text-camel font-semibold">
          COMMANDE SÉCURISÉE
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
          {t(locale, "checkout.title")}
        </h1>
        <p className="text-xs text-muted-dark">
          {t(locale, "checkout.subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form: 7 Columns */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Customer Contact & Shipping Details */}
            <div className="bg-white border border-ivory-dark p-6 shadow-luxury-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-ivory-dark">
                <h3 className="font-serif text-base font-bold text-ink uppercase tracking-wider">
                  {t(locale, "checkout.stepContact")}
                </h3>
                <span className="text-[11px] font-mono text-camel font-semibold">Étape 1 / 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-ink block">
                    {t(locale, "checkout.fullName")} *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="ex: Kenza El Amrani"
                    required
                    className="w-full px-3.5 py-2.5 bg-ivory border border-ivory-dark text-xs focus:outline-none focus:border-camel text-ink"
                  />
                </div>

                {/* Moroccan Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink block">
                    {t(locale, "checkout.phone")} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="06 XX XX XX XX ou +212..."
                    required
                    className="w-full px-3.5 py-2.5 bg-ivory border border-ivory-dark text-xs font-mono focus:outline-none focus:border-camel text-ink"
                  />
                  <span className="text-[10px] text-muted block">
                    Utilisé par le livreur pour vous contacter
                  </span>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink block">
                    {t(locale, "checkout.email")} (optionnel)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre.email@exemple.ma"
                    className="w-full px-3.5 py-2.5 bg-ivory border border-ivory-dark text-xs focus:outline-none focus:border-camel text-ink"
                  />
                </div>

                {/* Moroccan City Selector */}
                <div className="sm:col-span-2 space-y-1">
                  <div className="flex justify-between items-baseline">
                    <label className="text-xs font-semibold text-ink block">
                      {t(locale, "checkout.city")} *
                    </label>
                    <span className="text-[11px] font-mono text-camel">
                      {getDeliveryEstimate(formData.city, locale)}
                    </span>
                  </div>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-ivory border border-ivory-dark text-xs text-ink focus:outline-none focus:border-camel font-sans"
                  >
                    {MOROCCAN_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Full Address */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-ink block">
                    {t(locale, "checkout.address")} *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Boulevard, Quartier, N° de rue, Résidence..."
                    required
                    className="w-full px-3.5 py-2 bg-ivory border border-ivory-dark text-xs focus:outline-none focus:border-camel text-ink resize-none"
                  />
                </div>

                {/* Delivery Notes */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-ink block">
                    {t(locale, "checkout.deliveryNotes")}
                  </label>
                  <input
                    type="text"
                    name="deliveryNotes"
                    value={formData.deliveryNotes}
                    onChange={handleChange}
                    placeholder="Instructions particulières pour le transporteur..."
                    className="w-full px-3.5 py-2 bg-ivory border border-ivory-dark text-xs focus:outline-none focus:border-camel text-ink"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white border border-ivory-dark p-6 shadow-luxury-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-ivory-dark">
                <h3 className="font-serif text-base font-bold text-ink uppercase tracking-wider">
                  {t(locale, "checkout.stepPayment")}
                </h3>
                <span className="text-[11px] font-mono text-camel font-semibold">Étape 2 / 3</span>
              </div>

              {/* Cash on delivery (COD) */}
              <label
                className={`flex items-start gap-3.5 p-4 border cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "bg-ivory border-camel ring-1 ring-camel"
                    : "bg-white border-ivory-dark hover:border-camel/40"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mt-1 accent-camel"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-camel" />
                    <span className="text-xs font-bold text-ink">
                      {t(locale, "checkout.paymentCod")}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-mono font-bold">
                      Recommandé Maroc
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-dark leading-relaxed">
                    {t(locale, "checkout.paymentCodDesc")}
                  </p>
                </div>
              </label>

              {/* Online Card (Simulated) */}
              <label
                className={`flex items-start gap-3.5 p-4 border cursor-pointer transition-all ${
                  paymentMethod === "cmi_card"
                    ? "bg-ivory border-camel ring-1 ring-camel"
                    : "bg-white border-ivory-dark hover:border-camel/40"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cmi_card"
                  checked={paymentMethod === "cmi_card"}
                  onChange={() => setPaymentMethod("cmi_card")}
                  className="mt-1 accent-camel"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-camel" />
                    <span className="text-xs font-bold text-ink">
                      {t(locale, "checkout.paymentCard")}
                    </span>
                    <span className="px-2 py-0.5 bg-ivory-dark text-muted-dark text-[10px] uppercase font-mono">
                      Simulation Démo
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-dark leading-relaxed">
                    {t(locale, "checkout.paymentCardDesc")}
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Right Order Summary & Confirm: 5 Columns */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white border border-ivory-dark p-6 shadow-luxury-sm space-y-5">
              <h3 className="font-serif text-base font-bold text-ink uppercase tracking-wider pb-3 border-b border-ivory-dark">
                {t(locale, "checkout.orderSummary")}
              </h3>

              {/* Items summary */}
              <div className="divide-y divide-ivory-dark max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 bg-ivory flex-shrink-0 border border-ivory-dark">
                        <Image
                          src={item.product.images[0] || "/placeholder.jpg"}
                          alt={item.product.name[locale] || item.product.name.fr}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-ink text-white text-[9px] rounded-full flex items-center justify-center font-mono">
                          {item.quantity}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-ink line-clamp-1">
                          {item.product.name[locale] || item.product.name.fr}
                        </h4>
                        <p className="text-[11px] text-muted">
                          {item.selectedSize} · {item.selectedColor}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-ink">
                      {formatMAD(item.price * item.quantity, locale)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
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

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-ink text-white text-xs font-sans tracking-widest uppercase font-semibold hover:bg-camel transition-colors shadow-luxury disabled:bg-muted"
              >
                <Lock className="w-3.5 h-3.5 text-camel" />
                <span>
                  {isSubmitting
                    ? t(locale, "checkout.processing")
                    : t(locale, "checkout.placeOrder", { total: formatMAD(total, locale) })}
                </span>
              </button>

              <p className="text-[10px] text-muted text-center leading-normal">
                {t(locale, "checkout.termsAgree")}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
