"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/types";
import { ArrowRight, Compass, Scissors, Gem } from "lucide-react";

interface AboutViewProps {
  locale: Locale;
}

export function AboutView({ locale }: AboutViewProps) {
  return (
    <div className="font-sans">
      {/* Editorial Hero */}
      <div className="relative py-24 sm:py-32 bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000&auto=format&fit=crop"
            alt="L'Atelier VELORA"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-camel font-semibold">
            LA MAISON DE HAUTE CONFECTION
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ivory">
            L&apos;Âme d&apos;un Savoir-Faire Éternel
          </h1>
          <p className="text-xs sm:text-sm text-ivory/80 max-w-xl mx-auto font-light leading-relaxed">
            Quand la précision du patronage européen rencontre l&apos;opulence subtile et les métiers d&apos;art marocains.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-camel font-semibold">
              01 • ORIGINES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
              L&apos;Exigence Sartoriale entre Paris, Fès et Casablanca
            </h2>
            <p className="text-xs sm:text-sm text-muted-dark leading-relaxed">
              Fondée sur la conviction qu&apos;un vêtement de luxe doit transcender les tendances éphémères, VELORA incarne une vision contemporaine de l&apos;élégance marocaine.
            </p>
            <p className="text-xs sm:text-sm text-muted-dark leading-relaxed">
              Nos patrons sont calibrés avec rigueur selon les standards de la haute confection, avant d&apos;être confiés aux doigts experts de maîtres artisans qui perpétuent les techniques de broderie main sfifa et âakads.
            </p>
          </div>
          <div className="relative aspect-[4/5] bg-ivory border border-ivory-dark shadow-luxury">
            <Image
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop"
              alt="Artisanat"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-ivory-dark">
          <div className="space-y-3">
            <Compass className="w-6 h-6 text-camel" />
            <h3 className="font-serif text-base font-bold text-ink">
              Coupes Architecturales
            </h3>
            <p className="text-xs text-muted-dark leading-relaxed">
              Des lignes épurées et structurées qui épousent le corps avec grâce et liberté de mouvement.
            </p>
          </div>

          <div className="space-y-3">
            <Scissors className="w-6 h-6 text-camel" />
            <h3 className="font-serif text-base font-bold text-ink">
              Matières de Premier Ordre
            </h3>
            <p className="text-xs text-muted-dark leading-relaxed">
              Laines vierges de Biella, soies sauvages de Fès, cotons Giza et cuirs pleine fleur tannés végétalement.
            </p>
          </div>

          <div className="space-y-3">
            <Gem className="w-6 h-6 text-camel" />
            <h3 className="font-serif text-base font-bold text-ink">
              Finitions Joaillières
            </h3>
            <p className="text-xs text-muted-dark leading-relaxed">
              Boutons de nacre australienne, laiton ciselé à la main, fermoirs équestres dorés et coutures sellier.
            </p>
          </div>
        </div>

        {/* Commercial Agency Attribution */}
        <div className="p-8 bg-ivory border border-ivory-dark space-y-4 text-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-camel font-semibold block">
            SYSTÈME E-COMMERCE HAUTE PERFORMANCE
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
            Une Solution Signée BSES
          </h3>
          <p className="text-xs sm:text-sm text-muted-dark max-w-xl mx-auto leading-relaxed">
            Ce site de démonstration illustre la capacité de l&apos;agence BSES (Benchalh Solution E-commerce System) à concevoir des expériences d&apos;achat d&apos;exception adaptées aux spécificités du marché marocain et aux marques haut de gamme.
          </p>
          <div className="pt-2">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 py-3 px-6 bg-ink text-white text-xs uppercase tracking-widest font-semibold hover:bg-camel transition-colors shadow-sm"
            >
              <span>Contacter nos ingénieurs e-commerce</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
