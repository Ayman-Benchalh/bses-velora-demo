import React from "react";
import { notFound } from "next/navigation";
import { Locale } from "@/types";
import { INITIAL_PRODUCTS } from "@/data/products";
import { ProductDetailView } from "@/components/pdp/ProductDetailView";

export function generateStaticParams() {
  const locales: Locale[] = ["fr", "en", "ar"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const prod of INITIAL_PRODUCTS) {
      params.push({ locale, slug: prod.slug });
    }
  }

  return params;
}

interface ProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolved = await params;
  const locale: Locale = resolved.locale === "ar" ? "ar" : resolved.locale === "en" ? "en" : "fr";
  const slug = resolved.slug;

  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  const related = INITIAL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return <ProductDetailView product={product} relatedProducts={related} locale={locale} />;
}

