import React from "react";
import { Locale } from "@/types";
import { CartPageView } from "@/components/cart/CartPageView";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }, { locale: "ar" }];
}

interface CartPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CartPage({ params }: CartPageProps) {
  const resolved = await params;
  const locale: Locale = resolved.locale === "ar" ? "ar" : resolved.locale === "en" ? "en" : "fr";

  return <CartPageView locale={locale} />;
}

