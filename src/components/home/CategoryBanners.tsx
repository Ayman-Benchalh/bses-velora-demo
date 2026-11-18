"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/types";
import { CATEGORIES } from "@/data/categories";
import { t } from "@/lib/translations";
import { ArrowRight } from "lucide-react";

interface CategoryBannersProps {
  locale: Locale;
}

export function CategoryBanners({ locale }: CategoryBannersProps) {
  return (
    <section className="py-16 sm:py-24 bg-white font-sans border-b border-ivory-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12 sm:mb-16">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-camel font-semibold">
            UNIVERS DE LA MAISON
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
            {t(locale, "home.categoriesTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-muted-dark max-w-md mx-auto">
            {t(locale, "home.categoriesSubtitle")}
          </p>
        </div>

        {/* Categories Grid (2 featured large + 3 regular) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {/* Category 1: Women (col-span-3) */}
          <div className="lg:col-span-3 relative aspect-[4/5] overflow-hidden group border border-ivory-dark bg-ivory">
            <Image
              src={CATEGORIES[0].heroImage}
              alt={CATEGORIES[0].name[locale] || CATEGORIES[0].name.fr}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-widest text-camel-light">
                {CATEGORIES[0].itemCount} Silhouettes
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                {CATEGORIES[0].name[locale] || CATEGORIES[0].name.fr}
              </h3>
              <p className="text-xs text-ivory/80 line-clamp-2 max-w-sm font-light">
                {CATEGORIES[0].description[locale] || CATEGORIES[0].description.fr}
              </p>
              <Link
                href={`/${locale}/shop?category=${CATEGORIES[0].slug}`}
                className="pt-2 inline-flex items-center gap-1.5 text-xs text-camel uppercase tracking-widest font-semibold hover:text-white transition-colors"
              >
                <span>Découvrir</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          {/* Category 2: Men (col-span-3) */}
          <div className="lg:col-span-3 relative aspect-[4/5] overflow-hidden group border border-ivory-dark bg-ivory">
            <Image
              src={CATEGORIES[1].heroImage}
              alt={CATEGORIES[1].name[locale] || CATEGORIES[1].name.fr}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-widest text-camel-light">
                {CATEGORIES[1].itemCount} Silhouettes
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                {CATEGORIES[1].name[locale] || CATEGORIES[1].name.fr}
              </h3>
              <p className="text-xs text-ivory/80 line-clamp-2 max-w-sm font-light">
                {CATEGORIES[1].description[locale] || CATEGORIES[1].description.fr}
              </p>
              <Link
                href={`/${locale}/shop?category=${CATEGORIES[1].slug}`}
                className="pt-2 inline-flex items-center gap-1.5 text-xs text-camel uppercase tracking-widest font-semibold hover:text-white transition-colors"
              >
                <span>Découvrir</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          {/* Categories 3, 4, 5 (col-span-2 each) */}
          {CATEGORIES.slice(2).map((cat) => (
            <div
              key={cat.slug}
              className="lg:col-span-2 relative aspect-[3/4] overflow-hidden group border border-ivory-dark bg-ivory"
            >
              <Image
                src={cat.heroImage}
                alt={cat.name[locale] || cat.name.fr}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 text-white space-y-1">
                <span className="text-[9px] uppercase font-mono tracking-widest text-camel-light">
                  {cat.itemCount} Modèles
                </span>
                <h4 className="font-serif text-xl font-bold">
                  {cat.name[locale] || cat.name.fr}
                </h4>
                <Link
                  href={`/${locale}/shop?category=${cat.slug}`}
                  className="inline-flex items-center gap-1 text-[11px] text-camel uppercase tracking-wider font-semibold hover:text-white transition-colors"
                >
                  <span>Explorer</span>
                  <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

