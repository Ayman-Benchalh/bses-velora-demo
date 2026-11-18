import React from "react";
import { Locale } from "@/types";
import { OrderConfirmationView } from "@/components/checkout/OrderConfirmationView";

interface OrderConfirmationPageProps {
  params: Promise<{ locale: string; orderId: string }>;
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const resolved = await params;
  const locale: Locale = resolved.locale === "ar" ? "ar" : resolved.locale === "en" ? "en" : "fr";
  const orderNumber = resolved.orderId;

  return <OrderConfirmationView orderNumber={orderNumber} locale={locale} />;
}

