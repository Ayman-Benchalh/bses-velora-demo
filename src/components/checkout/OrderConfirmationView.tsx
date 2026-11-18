"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale, OrderStatus } from "@/types";
import { useStore } from "@/context/StoreContext";
import { formatMAD } from "@/lib/utils";
import { t } from "@/lib/translations";
import {
  CheckCircle2,
  PackageCheck,
  Truck,
  Home,
  Clock,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";

interface OrderConfirmationViewProps {
  orderNumber: string;
  locale: Locale;
}

export function OrderConfirmationView({ orderNumber, locale }: OrderConfirmationViewProps) {
  const { orders, updateOrderStatus } = useStore();

  // Find order by orderNumber or fallback to latest order
  const order = orders.find((o) => o.orderNumber === orderNumber) || orders[0];

  const [activeStatus, setActiveStatus] = useState<OrderStatus>(order?.status || "pending");

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-sans">
        <h2 className="font-serif text-2xl font-bold text-ink">Commande introuvable</h2>
        <Link
          href={`/${locale}/shop`}
          className="mt-4 inline-block px-6 py-3 bg-ink text-white text-xs uppercase tracking-wider font-semibold"
        >
          {t(locale, "common.exploreShop")}
        </Link>
      </div>
    );
  }

  const handleSimulateStatusAdvance = (newStatus: OrderStatus) => {
    setActiveStatus(newStatus);
    updateOrderStatus(order.id, newStatus);
  };

  const steps: { status: OrderStatus; icon: React.ComponentType<{ className?: string }>; title: string; desc: string }[] = [
    {
      status: "pending",
      icon: Clock,
      title: t(locale, "orderConfirmation.statusPending"),
      desc: "Vérification des disponibilités en atelier",
    },
    {
      status: "processing",
      icon: PackageCheck,
      title: t(locale, "orderConfirmation.statusProcessing"),
      desc: "Mise sous écrin velours & parfumage signature",
    },
    {
      status: "shipped",
      icon: Truck,
      title: t(locale, "orderConfirmation.statusShipped"),
      desc: `Numéro de suivi (Simulé) : AM-${order.orderNumber.replace("VEL-", "")}MA`,
    },
    {
      status: "in_delivery",
      icon: Truck,
      title: t(locale, "orderConfirmation.statusInDelivery"),
      desc: `Tournée en cours à ${order.customer.city}`,
    },
    {
      status: "delivered",
      icon: Home,
      title: t(locale, "orderConfirmation.statusDelivered"),
      desc: "Remise au destinataire avec signature",
    },
  ];

  const getStatusIndex = (st: OrderStatus) => {
    const orderList: OrderStatus[] = ["pending", "processing", "shipped", "in_delivery", "delivered"];
    return orderList.indexOf(st);
  };

  const currentStepIdx = getStatusIndex(activeStatus);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans space-y-10">
      {/* Success banner */}
      <div className="text-center space-y-3 bg-white p-8 border border-ivory-dark shadow-luxury-sm">
        <div className="w-16 h-16 mx-auto rounded-full bg-camel/10 text-camel flex items-center justify-center animate-pulse-subtle">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase font-mono tracking-widest text-camel font-semibold block">
          COMMANDE ENREGISTRÉE AVEC SUCCÈS
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
          {t(locale, "orderConfirmation.title")}
        </h1>
        <p className="text-xs sm:text-sm text-muted-dark max-w-md mx-auto">
          {t(locale, "orderConfirmation.subtitle")}
        </p>

        <div className="pt-2 inline-flex items-center gap-2 px-4 py-2 bg-ivory border border-ivory-dark text-xs font-mono">
          <span className="text-muted">{t(locale, "orderConfirmation.orderRef")} :</span>
          <strong className="text-ink font-bold text-sm">{order.orderNumber}</strong>
        </div>
      </div>

      {/* Real-Time Stepper & Interactive Demo Status Switcher */}
      <div className="bg-white p-6 sm:p-8 border border-ivory-dark shadow-luxury-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-ivory-dark">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-camel font-semibold">
              LOGISTIQUE MAROC & EXPÉDITION
            </span>
            <h3 className="font-serif text-xl font-bold text-ink">
              {t(locale, "orderConfirmation.trackingTitle")}
            </h3>
          </div>

          {/* Interactive Simulation Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-ivory border border-ivory-dark text-xs font-mono">
            <span className="text-muted px-1 hidden sm:inline text-[10px]">Simuler l&apos;avancement:</span>
            {(["pending", "processing", "shipped", "in_delivery", "delivered"] as OrderStatus[]).map((st) => (
              <button
                key={st}
                onClick={() => handleSimulateStatusAdvance(st)}
                className={`px-2 py-1 uppercase text-[10px] transition-colors ${
                  activeStatus === st ? "bg-ink text-white font-bold" : "text-muted hover:text-ink"
                }`}
              >
                {st === "pending" ? "1" : st === "processing" ? "2" : st === "shipped" ? "3" : st === "in_delivery" ? "4" : "5"}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Stepper */}
        <div className="relative pt-4 pb-2">
          <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-5 sm:gap-4 relative">
            {steps.map((step, idx) => {
              const isPast = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;
              const isDone = isPast || isCurrent;
              const Icon = step.icon;

              return (
                <div key={step.status} className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                      isCurrent
                        ? "bg-camel border-camel text-white ring-4 ring-camel/20 shadow-md"
                        : isPast
                        ? "bg-ink border-ink text-white"
                        : "bg-white border-ivory-dark text-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="space-y-0.5">
                    <h4
                      className={`text-xs font-serif font-bold ${
                        isDone ? "text-ink" : "text-muted"
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-[10px] text-muted leading-tight font-sans">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Order Details & Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Destination & Payment */}
        <div className="bg-white p-6 border border-ivory-dark shadow-luxury-sm space-y-4">
          <h4 className="font-serif text-base font-bold text-ink uppercase tracking-wider pb-2 border-b border-ivory-dark">
            Informations de Réception
          </h4>
          <div className="space-y-2 text-xs text-muted-dark">
            <p>
              <strong>Client :</strong> {order.customer.fullName}
            </p>
            <p>
              <strong>Téléphone :</strong> <span className="font-mono">{order.customer.phone}</span>
            </p>
            {order.customer.email && (
              <p>
                <strong>Email :</strong> {order.customer.email}
              </p>
            )}
            <p>
              <strong>Adresse au Maroc :</strong> {order.customer.address}, {order.customer.city}
            </p>
            {order.customer.deliveryNotes && (
              <p className="italic text-muted">
                &ldquo;{order.customer.deliveryNotes}&rdquo;
              </p>
            )}
            <p className="pt-2 border-t border-ivory-dark">
              <strong>Mode de règlement :</strong>{" "}
              {order.paymentMethod === "cod"
                ? "Espèces à la livraison (Cash on Delivery)"
                : "Carte Bancaire CMI (Simulation)"}
            </p>
          </div>
        </div>

        {/* Purchased Pieces Summary */}
        <div className="bg-white p-6 border border-ivory-dark shadow-luxury-sm space-y-4">
          <h4 className="font-serif text-base font-bold text-ink uppercase tracking-wider pb-2 border-b border-ivory-dark">
            {t(locale, "orderConfirmation.summaryTitle")}
          </h4>
          <div className="divide-y divide-ivory-dark max-h-56 overflow-y-auto pr-1">
            {order.items.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-12 bg-ivory flex-shrink-0 border border-ivory-dark">
                    <Image
                      src={item.product.images[0] || "/placeholder.jpg"}
                      alt={item.product.name[locale] || item.product.name.fr}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-ink line-clamp-1">
                      {item.product.name[locale] || item.product.name.fr}
                    </h5>
                    <p className="text-[10px] text-muted">
                      Qté: {item.quantity} · {item.selectedSize} · {item.selectedColor}
                    </p>
                  </div>
                </div>
                <span className="font-mono font-semibold text-ink">
                  {formatMAD(item.price * item.quantity, locale)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-ivory-dark space-y-1.5 text-xs text-muted-dark">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span className="font-mono text-ink">{formatMAD(order.subtotal, locale)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-camel font-medium">
                <span>Remise</span>
                <span className="font-mono">-{formatMAD(order.discount, locale)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Livraison</span>
              <span className="font-mono text-ink">
                {order.shipping === 0 ? "Offerte" : formatMAD(order.shipping, locale)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-ink pt-2 border-t border-ivory-dark font-serif">
              <span>Total TTC</span>
              <span className="font-mono text-base">{formatMAD(order.total, locale)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Action Links */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href={`/${locale}/admin-demo`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-camel text-white text-xs uppercase tracking-widest font-semibold hover:bg-camel-dark transition-colors shadow-sm"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>{t(locale, "orderConfirmation.viewInAdmin")}</span>
        </Link>
        <Link
          href={`/${locale}/shop`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-ink text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors"
        >
          <span>{t(locale, "orderConfirmation.returnToShop")}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}
