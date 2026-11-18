import React from "react";
import { Locale } from "@/types";
import { CheckoutView } from "@/components/checkout/CheckoutView";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }, { locale: "ar" }];
}

interface CheckoutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const resolved = await params;
  const locale: Locale = resolved.locale === "ar" ? "ar" : resolved.locale === "en" ? "en" : "fr";

  return <CheckoutView locale={locale} />;
}

