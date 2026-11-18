"use client";

import React, { useState, useEffect } from "react";
import { Locale } from "@/types";
import { t } from "@/lib/translations";
import { X, Ruler } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  category?: string;
}

export function SizeGuideModal({ isOpen, onClose, locale, category = "women" }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<"cm" | "inch">("cm");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const womenApparelSizes = [
    { size: "36 / XS", bust: unit === "cm" ? "82-85" : "32-33.5", waist: unit === "cm" ? "64-67" : "25-26.5", hips: unit === "cm" ? "90-93" : "35.5-36.5" },
    { size: "38 / S", bust: unit === "cm" ? "86-89" : "34-35", waist: unit === "cm" ? "68-71" : "27-28", hips: unit === "cm" ? "94-97" : "37-38" },
    { size: "40 / M", bust: unit === "cm" ? "90-93" : "35.5-36.5", waist: unit === "cm" ? "72-75" : "28.5-29.5", hips: unit === "cm" ? "98-101" : "38.5-40" },
    { size: "42 / L", bust: unit === "cm" ? "94-98" : "37-38.5", waist: unit === "cm" ? "76-80" : "30-31.5", hips: unit === "cm" ? "102-106" : "40-42" },
  ];

  const shoesSizes = [
    { eu: "36", uk: "3.5", us: "6", cm: "23.0" },
    { eu: "37", uk: "4", us: "6.5", cm: "23.7" },
    { eu: "38", uk: "5", us: "7.5", cm: "24.3" },
    { eu: "39", uk: "6", us: "8.5", cm: "25.0" },
    { eu: "40", uk: "6.5", us: "9", cm: "25.7" },
    { eu: "41", uk: "7.5", us: "10", cm: "26.3" },
    { eu: "42", uk: "8", us: "10.5", cm: "27.0" },
    { eu: "43", uk: "9", us: "11.5", cm: "27.7" },
    { eu: "44", uk: "9.5", us: "12", cm: "28.3" },
  ];

  const isFootwear = category === "shoes";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
      <div className="relative w-full max-w-2xl bg-white border border-ivory-dark shadow-2xl p-6 sm:p-8 animate-slide-up max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-muted hover:text-ink p-1 rtl:right-auto rtl:left-5"
          aria-label="Fermer le guide des tailles"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-camel">
            <Ruler className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest font-semibold">
              Atelier Haute Confection
            </span>
          </div>

          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-ink font-semibold">
              {t(locale, "pdp.sizeGuideTitle")}
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1">
              {t(locale, "pdp.sizeGuideDescription")}
            </p>
          </div>

          {/* Unit Toggle */}
          <div className="flex justify-end">
            <div className="inline-flex border border-ivory-dark p-0.5 bg-ivory text-xs font-mono">
              <button
                onClick={() => setUnit("cm")}
                className={`px-3 py-1 transition-colors ${
                  unit === "cm" ? "bg-ink text-white font-bold" : "text-muted hover:text-ink"
                }`}
              >
                Centimètres (cm)
              </button>
              <button
                onClick={() => setUnit("inch")}
                className={`px-3 py-1 transition-colors ${
                  unit === "inch" ? "bg-ink text-white font-bold" : "text-muted hover:text-ink"
                }`}
              >
                Pouces (in)
              </button>
            </div>
          </div>

          {/* Sizing Table */}
          <div className="overflow-x-auto border border-ivory-dark">
            {isFootwear ? (
              <table className="w-full text-xs text-left rtl:text-right">
                <thead className="bg-ivory border-b border-ivory-dark text-ink font-serif uppercase tracking-wider">
                  <tr>
                    <th className="p-3">EU</th>
                    <th className="p-3">UK</th>
                    <th className="p-3">US</th>
                    <th className="p-3">Longueur Pied ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ivory-dark font-mono">
                  {shoesSizes.map((row, idx) => (
                    <tr key={idx} className="hover:bg-ivory/50">
                      <td className="p-3 font-bold text-ink">{row.eu}</td>
                      <td className="p-3 text-muted-dark">{row.uk}</td>
                      <td className="p-3 text-muted-dark">{row.us}</td>
                      <td className="p-3 text-camel font-semibold">{row.cm} {unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-xs text-left rtl:text-right">
                <thead className="bg-ivory border-b border-ivory-dark text-ink font-serif uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Taille / Size</th>
                    <th className="p-3">Tour de Poitrine</th>
                    <th className="p-3">Tour de Taille</th>
                    <th className="p-3">Tour de Bassin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ivory-dark font-mono">
                  {womenApparelSizes.map((row, idx) => (
                    <tr key={idx} className="hover:bg-ivory/50">
                      <td className="p-3 font-bold text-ink">{row.size}</td>
                      <td className="p-3 text-muted-dark">{row.bust} {unit}</td>
                      <td className="p-3 text-muted-dark">{row.waist} {unit}</td>
                      <td className="p-3 text-muted-dark">{row.hips} {unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Advice notes */}
          <div className="bg-ivory p-4 border border-ivory-dark text-xs text-muted-dark space-y-1">
            <p>
              <strong>Conseil de notre Studio :</strong> Si vous hésitez entre deux tailles, nous vous conseillons de sélectionner votre taille habituelle pour une coupe cintrée ou la taille supérieure pour un tombé plus décontracté.
            </p>
            <p className="text-[11px] text-muted">
              Nos conseillers clientèle au Maroc se tiennent à votre disposition sur WhatsApp pour vous guider dans votre choix.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

