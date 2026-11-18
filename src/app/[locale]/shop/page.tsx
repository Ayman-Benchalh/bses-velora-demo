import React, { Suspense } from "react";
import { Locale } from "@/types";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

interface ShopPageProps {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ category?: string; search?: string }>;
}

export default async function ShopPage({ params, searchParams }: ShopPageProps) {
  const resolvedParams = await params;
  const resolvedSearch = searchParams ? await searchParams : {};
  const locale: Locale = resolvedParams.locale === "ar" ? "ar" : resolvedParams.locale === "en" ? "en" : "fr";
  const initialCategory = resolvedSearch.category || "all";

  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-xs font-mono text-muted">
          Chargement de la collection VELORA...
        </div>
      }
    >
      <ShopCatalog locale={locale} initialCategory={initialCategory} />
    </Suspense>
  );
}

