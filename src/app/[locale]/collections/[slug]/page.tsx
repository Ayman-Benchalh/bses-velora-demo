import React, { Suspense } from "react";
import { Locale } from "@/types";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

export function generateStaticParams() {
  const locales = ["fr", "en", "ar"];
  const slugs = ["women", "men", "shoes", "bags", "accessories", "new-arrivals"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

interface CollectionCategoryPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function CollectionCategoryPage({ params }: CollectionCategoryPageProps) {
  const resolved = await params;
  const locale: Locale = resolved.locale === "ar" ? "ar" : resolved.locale === "en" ? "en" : "fr";
  const slug = resolved.slug;
  const initialCategory = slug === "new-arrivals" ? "all" : slug;

  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-xs font-mono text-muted">
          Chargement de la collection...
        </div>
      }
    >
      <ShopCatalog locale={locale} initialCategory={initialCategory} />
    </Suspense>
  );
}

