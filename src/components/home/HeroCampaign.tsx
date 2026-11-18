"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/types";
import { t } from "@/lib/translations";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroCampaignProps {
  locale: Locale;
}

export function HeroCampaign({ locale }: HeroCampaignProps) {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center bg-ink overflow-hidden font-sans">
      {/* Background Campaign Imagery */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"
          alt="Campagne VELORA 2026"
          fill
          priority
          className="object-cover object-top opacity-55 scale-105 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        {/* Subtle Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-white">
        <div className="max-w-2xl space-y-6">
          {/* Season Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-[0.25em] text-camel-light">
            <Sparkles className="w-3.5 h-3.5 text-camel" />
            <span>COLLECTION PRINTEMPS-ÉTÉ 2026</span>
          </div>

          {/* High-Contrast Editorial Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-ivory">
            {t(locale, "home.heroTitle")}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-ivory/80 leading-relaxed font-sans max-w-lg">
            {t(locale, "home.heroSubtitle")}
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3.5 sm:gap-4">
            <Link
              href={`/${locale}/shop`}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-camel text-white text-xs font-sans uppercase tracking-widest font-semibold hover:bg-camel-dark transition-all duration-300 shadow-luxury group"
            >
              <span>{t(locale, "home.heroCta")}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>

            <Link
              href={`/${locale}/lookbook`}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 backdrop-blur-md border border-ivory/30 text-ivory text-xs font-sans uppercase tracking-widest font-semibold hover:bg-white/20 transition-all duration-300"
            >
              <span>{t(locale, "home.heroLookbookCta")}</span>
            </Link>
          </div>

          {/* Discreet Demo tag */}
          <div className="pt-6 border-t border-white/10 flex items-center gap-3 text-[11px] font-mono text-muted-light">
            <span className="w-1.5 h-1.5 rounded-full bg-camel animate-pulse"></span>
            <span>Démonstration E-commerce de Haute Couture développée par BSES Maroc</span>
          </div>
        </div>
      </div>
    </section>
  );
}

