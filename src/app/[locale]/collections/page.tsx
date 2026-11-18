import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/types";
import { t } from "@/lib/translations";
import { CATEGORIES } from "@/data/categories";
import { ArrowRight, Sparkles } from "lucide-react";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }, { locale: "ar" }];
}

interface CollectionsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CollectionsPage({ params }: CollectionsPageProps) {
  const resolved = await params;
  const locale: Locale = resolved.locale === "ar" ? "ar" : resolved.locale === "en" ? "en" : "fr";

  return (
    <div className="font-sans py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-camel font-semibold">
          LES UNIVERS SARTORIAUX
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ink">
          Collections VELORA
        </h1>
        <p className="text-xs sm:text-sm text-muted-dark max-w-lg mx-auto">
          Explorez nos lignes signatures conçues selon la haute tradition de confection européenne et marocaine.
        </p>
      </div>

      {/* Featured New Arrivals Banner Card */}
      <div className="relative aspect-[21/9] w-full bg-ink text-white overflow-hidden border border-ivory-dark shadow-luxury">
        <Image
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop"
          alt="Nouveautés"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
        <div className="absolute inset-x-8 bottom-8 sm:bottom-12 max-w-md space-y-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-camel text-white text-[10px] uppercase font-mono font-semibold">
            <Sparkles className="w-3 h-3" /> {t(locale, "collections.springSummer2026")}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold">
            {t(locale, "collections.newArrivalsTitle")}
          </h2>
          <p className="text-xs text-ivory/80 leading-relaxed font-light">
            {t(locale, "collections.newArrivalsDesc")}
          </p>
          <Link
            href={`/${locale}/shop?category=all`}
            className="inline-flex items-center gap-2 pt-1 text-xs text-camel uppercase tracking-widest font-semibold hover:text-white transition-colors"
          >
            <span>{t(locale, "collections.discoverCapsule")}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.slug}
            className="group relative aspect-[3/4] bg-ivory border border-ivory-dark overflow-hidden shadow-luxury-sm"
          >
            <Image
              src={cat.heroImage}
              alt={cat.name[locale] || cat.name.fr}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-camel-light">
                {cat.itemCount} {t(locale, "collections.creationsCount")}
              </span>
              <h3 className="font-serif text-2xl font-bold">
                {cat.name[locale] || cat.name.fr}
              </h3>
              <p className="text-xs text-ivory/80 line-clamp-2 font-light">
                {cat.description[locale] || cat.description.fr}
              </p>
              <Link
                href={`/${locale}/shop?category=${cat.slug}`}
                className="pt-2 inline-flex items-center gap-1.5 text-xs text-camel uppercase tracking-widest font-semibold hover:text-white transition-colors"
              >
                <span>{t(locale, "collections.exploreLine")}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
