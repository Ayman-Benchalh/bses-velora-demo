"use client";

import React, { useState } from "react";
import { Locale } from "@/types";
import {
  Palette,
  Type,
  Box,
  Layers,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

interface DesignSystemViewProps {
  locale: Locale;
}

export function DesignSystemView({ locale: _locale }: DesignSystemViewProps) {
  const [activeTab, setActiveTab] = useState<"colors" | "typography" | "components" | "tokens">("colors");

  const colors = [
    { name: "Ink Black", hex: "#171717", role: "Primary Dark / Brand Ink", textColor: "text-white", bg: "bg-ink" },
    { name: "Warm Ivory", hex: "#F3EEE6", role: "Paper Canvas / Warm Background", textColor: "text-ink", bg: "bg-ivory" },
    { name: "Camel", hex: "#B78D6C", role: "Luxury Brand Accent / Leather Gold", textColor: "text-white", bg: "bg-camel" },
    { name: "Pure White", hex: "#FFFFFF", role: "Surface & Cards / Light Cards", textColor: "text-ink", bg: "bg-white", border: true },
    { name: "Muted Grey", hex: "#888580", role: "Secondary Typography / Borders", textColor: "text-white", bg: "bg-muted" },
    { name: "Emerald 700", hex: "#047857", role: "In Stock & Success Semantic", textColor: "text-white", bg: "bg-emerald-700" },
    { name: "Amber 700", hex: "#B45309", role: "Low Stock Warning Semantic", textColor: "text-white", bg: "bg-amber-700" },
    { name: "Red 700", hex: "#B91C1C", role: "Out of Stock & Error Semantic", textColor: "text-white", bg: "bg-red-700" },
  ];

  return (
    <div className="font-sans py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="space-y-3 pb-8 border-b border-ivory-dark">
        <div className="flex items-center gap-2 text-camel font-mono text-xs uppercase tracking-widest font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>VELORA DESIGN SYSTEM & ARCHITECTURE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ink tracking-tight">
          Système de Tokens & Composants
        </h1>
        <p className="text-xs sm:text-sm text-muted-dark max-w-2xl leading-relaxed">
          Spécifications de la direction artistique VELORA développée par BSES : palette haute couture européenne, finitions artisanales marocaines, typographies bilingues et accessibilité stricte.
        </p>

        {/* Navigation Tabs */}
        <div className="pt-4 flex flex-wrap gap-2 text-xs font-mono uppercase tracking-wider">
          {[
            { id: "colors", label: "Couleurs & Nuancier", icon: Palette },
            { id: "typography", label: "Typographie & Échelle", icon: Type },
            { id: "components", label: "Composants d'Interface", icon: Box },
            { id: "tokens", label: "Échelle de Tokens", icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-2 px-4 border transition-all ${
                  isActive
                    ? "bg-ink text-white border-ink font-bold shadow-xs"
                    : "bg-white text-muted-dark border-ivory-dark hover:border-camel hover:text-ink"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-camel" : "text-muted"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===================== TAB: COLORS ===================== */}
      {activeTab === "colors" && (
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-ink">
              Palette Chromatique Haute Confection
            </h2>
            <p className="text-xs text-muted-dark">
              Harmonie de teintes naturelles inspirées des matières nobles : encres de calligraphie, papiers d&apos;art et cuirs d&apos;Atlas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {colors.map((c, idx) => (
              <div
                key={idx}
                className="bg-white border border-ivory-dark shadow-luxury-sm overflow-hidden"
              >
                <div
                  className={`h-28 w-full p-4 flex items-end justify-between ${c.bg} ${c.textColor} ${
                    c.border ? "border-b border-ivory-dark" : ""
                  }`}
                >
                  <span className="font-mono text-xs font-bold tracking-wider">{c.hex}</span>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="font-serif text-sm font-bold text-ink">{c.name}</h3>
                  <p className="text-[11px] text-muted-dark font-sans leading-tight">{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===================== TAB: TYPOGRAPHY ===================== */}
      {activeTab === "typography" && (
        <section className="space-y-8">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-ink">
              Échelle Typographique & Compatibilité Bilingue
            </h2>
            <p className="text-xs text-muted-dark">
              Combinaison d&apos;une serif éditoriale à fort contraste pour les titres et d&apos;une sans-serif ergonomique pour les données produits et l&apos;arabe RTL.
            </p>
          </div>

          <div className="bg-white border border-ivory-dark shadow-luxury-sm p-6 sm:p-8 divide-y divide-ivory-dark space-y-6">
            {/* Display Hero */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-mono text-camel font-semibold block mb-1">
                Display Title (font-serif, 56px)
              </span>
              <p className="font-serif text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                L&apos;Élégance Contemporaine
              </p>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-ink mt-2" dir="rtl">
                الأناقة المعاصرة.. مصوغة بإتقان لا يضاهى
              </p>
            </div>

            {/* H1 Headline */}
            <div className="pt-6">
              <span className="text-[10px] uppercase font-mono text-camel font-semibold block mb-1">
                Headline 1 (font-serif, 36px)
              </span>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-ink">
                Manteau Double Face en Laine & Cachemire
              </p>
            </div>

            {/* H2 Title */}
            <div className="pt-6">
              <span className="text-[10px] uppercase font-mono text-camel font-semibold block mb-1">
                Headline 2 (font-serif, 24px)
              </span>
              <p className="font-serif text-xl sm:text-2xl font-semibold text-ink">
                L&apos;Atelier & La Matière de Haute Confection
              </p>
            </div>

            {/* Body Text */}
            <div className="pt-6">
              <span className="text-[10px] uppercase font-mono text-camel font-semibold block mb-1">
                Body Paragraph (font-sans, 14px / 16px)
              </span>
              <p className="text-sm text-muted-dark leading-relaxed max-w-2xl font-sans">
                Chaque pièce VELORA naît d&apos;une recherche minutieuse : cuirs tannés végétalement, soies sauvages ouvragées à la main, laines mérinos et alpaga sélectionnées auprès des filatures les plus prestigieuses.
              </p>
            </div>

            {/* Monospace Price & Codes */}
            <div className="pt-6">
              <span className="text-[10px] uppercase font-mono text-camel font-semibold block mb-1">
                Monospace & Meta (font-mono, 12px)
              </span>
              <p className="font-mono text-base font-bold text-ink">
                5 900 MAD · REF: VEL-W01-CAM-38 · 100% SOIE
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ===================== TAB: COMPONENTS ===================== */}
      {activeTab === "components" && (
        <section className="space-y-8">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-ink">
              Composants Primitifs & Contrôles
            </h2>
            <p className="text-xs text-muted-dark">
              Boutons, badges d&apos;état, sélecteurs et cartes conformes aux critères d&apos;accessibilité WCAG AA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buttons Showcase */}
            <div className="bg-white p-6 border border-ivory-dark shadow-luxury-sm space-y-4">
              <h3 className="font-serif text-base font-bold text-ink uppercase tracking-wider pb-2 border-b border-ivory-dark">
                Boutons & Actions
              </h3>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <button className="py-3 px-6 bg-ink text-white text-xs uppercase tracking-widest font-semibold hover:bg-camel transition-colors shadow-sm">
                    Bouton Primaire
                  </button>
                  <button className="py-3 px-6 bg-camel text-white text-xs uppercase tracking-widest font-semibold hover:bg-camel-dark transition-colors shadow-sm">
                    Bouton Accent
                  </button>
                  <button className="py-3 px-6 border border-ink text-ink text-xs uppercase tracking-widest font-semibold hover:bg-ivory transition-colors">
                    Bouton Contour
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button disabled className="py-3 px-6 bg-muted text-white text-xs uppercase tracking-widest font-semibold cursor-not-allowed">
                    Désactivé
                  </button>
                  <button className="py-3 px-6 bg-ink text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                    <ShoppingBag className="w-3.5 h-3.5 text-camel" />
                    <span>Avec Icône</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Badges & Status Indicators */}
            <div className="bg-white p-6 border border-ivory-dark shadow-luxury-sm space-y-4">
              <h3 className="font-serif text-base font-bold text-ink uppercase tracking-wider pb-2 border-b border-ivory-dark">
                Badges & Statuts Logistiques
              </h3>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 bg-ink text-white uppercase text-[10px] tracking-wider font-semibold">
                  Nouveauté SS26
                </span>
                <span className="px-2.5 py-1 bg-camel text-white uppercase text-[10px] tracking-wider font-semibold">
                  Remise Privilège
                </span>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 uppercase text-[10px] tracking-wider font-semibold">
                  En Stock (8)
                </span>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-800 uppercase text-[10px] tracking-wider font-semibold">
                  Pièces Limitées (2)
                </span>
                <span className="px-2.5 py-1 bg-red-100 text-red-800 uppercase text-[10px] tracking-wider font-semibold">
                  Rupture Temporaire
                </span>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 uppercase text-[10px] tracking-wider font-semibold">
                  Expédiée (Amana)
                </span>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="bg-white p-6 border border-ivory-dark shadow-luxury-sm space-y-4">
              <h3 className="font-serif text-base font-bold text-ink uppercase tracking-wider pb-2 border-b border-ivory-dark">
                Champs de Formulaire
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-ink block mb-1">Champ Texte Standard</label>
                  <input
                    type="text"
                    defaultValue="Kenza El Amrani"
                    className="w-full px-3.5 py-2.5 bg-ivory border border-ivory-dark text-xs focus:outline-none focus:border-camel text-ink"
                  />
                </div>
                <div>
                  <label className="font-semibold text-ink block mb-1">Sélecteur de Ville Maroc</label>
                  <select className="w-full px-3.5 py-2.5 bg-ivory border border-ivory-dark text-xs focus:outline-none focus:border-camel text-ink">
                    <option>Casablanca (Livraison sous 24h)</option>
                    <option>Rabat (Livraison 24-48h)</option>
                    <option>Marrakech (Livraison 24-48h)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Visual Paper Texture & Elevation */}
            <div className="bg-white p-6 border border-ivory-dark shadow-luxury-sm space-y-4">
              <h3 className="font-serif text-base font-bold text-ink uppercase tracking-wider pb-2 border-b border-ivory-dark">
                Élévation & Ombres Subtiles
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono text-center">
                <div className="p-4 bg-ivory border border-ivory-dark shadow-luxury-sm">
                  <span>shadow-luxury-sm</span>
                </div>
                <div className="p-4 bg-white border border-ivory-dark shadow-luxury">
                  <span>shadow-luxury</span>
                </div>
                <div className="p-4 bg-white border border-ivory-dark shadow-luxury-lg col-span-2">
                  <span>shadow-luxury-lg (Tiroirs & Tiroir Panier)</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================== TAB: TOKENS ===================== */}
      {activeTab === "tokens" && (
        <section className="bg-white border border-ivory-dark shadow-luxury-sm p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-ink">
            Dictionnaire des Tokens & Breakpoints
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left rtl:text-right font-mono">
              <thead className="bg-ivory border-b border-ivory-dark text-ink uppercase">
                <tr>
                  <th className="p-3">Catégorie Token</th>
                  <th className="p-3">Valeur / Variable</th>
                  <th className="p-3">Usage Recommandé</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-dark">
                <tr>
                  <td className="p-3 font-bold text-camel">Color: ink</td>
                  <td className="p-3">#171717</td>
                  <td className="p-3 text-muted-dark">Couleur primaire de marque, textes, en-têtes et bordures fortes</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-camel">Color: ivory</td>
                  <td className="p-3">#F3EEE6</td>
                  <td className="p-3 text-muted-dark">Arrière-plan texturé chaud, cartes éditoriales, inputs</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-camel">Color: camel</td>
                  <td className="p-3">#B78D6C</td>
                  <td className="p-3 text-muted-dark">Accent maroquinerie, boutons d&apos;appel, indicateurs d&apos;attention</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-camel">Breakpoint: sm</td>
                  <td className="p-3">640px</td>
                  <td className="p-3 text-muted-dark">Grilles 2 colonnes sur tablette verticale</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-camel">Breakpoint: lg</td>
                  <td className="p-3">1024px</td>
                  <td className="p-3 text-muted-dark">Navigation desktop, grilles 4 colonnes, sidebar filtres</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-camel">Transition Duration</td>
                  <td className="p-3">300ms cubic-bezier</td>
                  <td className="p-3 text-muted-dark">Animations de tiroirs, apparitions de modals et survol d&apos;images</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
