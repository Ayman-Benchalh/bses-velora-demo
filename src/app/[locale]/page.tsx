import React from "react";
import { Locale } from "@/types";
import { INITIAL_PRODUCTS } from "@/data/products";
import { HeroCampaign } from "@/components/home/HeroCampaign";
import { CategoryBanners } from "@/components/home/CategoryBanners";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { EditorialStory } from "@/components/home/EditorialStory";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const resolved = await params;
  const locale: Locale = resolved.locale === "ar" ? "ar" : resolved.locale === "en" ? "en" : "fr";

  return (
    <main>
      {/* Campaign Hero */}
      <HeroCampaign locale={locale} />

      {/* Universes of the Maison */}
      <CategoryBanners locale={locale} />

      {/* Featured Signatures & New Arrivals */}
      <FeaturedSection products={INITIAL_PRODUCTS} locale={locale} />

      {/* Editorial Storytelling: L'Atelier & La Matière */}
      <EditorialStory locale={locale} />
    </main>
  );
}

