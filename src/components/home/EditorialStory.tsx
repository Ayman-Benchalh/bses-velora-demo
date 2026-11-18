"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/types";
import { t } from "@/lib/translations";
import { ArrowRight } from "lucide-react";

interface EditorialStoryProps {
  locale: Locale;
}

export function EditorialStory({ locale }: EditorialStoryProps) {
  return (
    <section className="py-20 sm:py-28 bg-ivory font-sans border-b border-ivory-dark relative overflow-hidden">
      {/* Decorative watermark */}
      <span className="absolute -bottom-10 right-0 font-serif text-[140px] text-ivory-dark/40 font-bold select-none pointer-events-none tracking-tighter leading-none hidden md:block">
        VELORA
      </span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Imagery Grid (Asymmetric) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-ivory-dark shadow-luxury-sm">
                <Image
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop"
                  alt="Atelier de confection"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="300px"
                />
              </div>
              <div className="p-4 bg-white border border-ivory-dark">
                <span className="text-[10px] uppercase font-mono tracking-widest text-camel block">
                  ATELIERS DE FÈS & CASABLANCA
                </span>
                <p className="text-xs text-ink font-serif font-semibold mt-1">
                  Maîtrise du point invisible & broderie main
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 bg-ink text-white">
                <span className="font-serif text-2xl font-bold text-camel block">100%</span>
                <p className="text-[11px] text-ivory/80 mt-0.5">
                  Matières naturelles nobles certifiées
                </p>
              </div>
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-ivory-dark shadow-luxury-sm">
                <Image
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
                  alt="Détail de tissu noble"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="300px"
                />
              </div>
            </div>
          </div>

          {/* Right Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-camel font-semibold">
                {t(locale, "home.editorialSubtitle")}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight leading-tight">
                {t(locale, "home.editorialTitle")}
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-muted-dark leading-relaxed font-sans">
              <p>{t(locale, "home.editorialParagraph1")}</p>
              <p>{t(locale, "home.editorialParagraph2")}</p>
            </div>

            {/* Key Craft Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-ivory-dark">
              <div>
                <h4 className="font-serif text-sm font-bold text-ink">
                  {t(locale, "home.craftHighlight1")}
                </h4>
                <p className="text-xs text-muted mt-1">
                  {t(locale, "home.craftDesc1")}
                </p>
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-ink">
                  {t(locale, "home.craftHighlight2")}
                </h4>
                <p className="text-xs text-muted mt-1">
                  {t(locale, "home.craftDesc2")}
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-white text-xs uppercase tracking-widest font-semibold hover:bg-camel transition-colors shadow-sm"
              >
                <span>{t(locale, "home.discoverHistory")}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

