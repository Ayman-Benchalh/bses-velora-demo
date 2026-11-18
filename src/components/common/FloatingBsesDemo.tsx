"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Locale } from "@/types";
import { useStore } from "@/context/StoreContext";
import { useToast } from "@/context/ToastContext";
import { t } from "@/lib/translations";
import { BSES_CONTACT_EMAIL, getBsesWhatsAppUrl } from "@/lib/constants";
import {
  Sparkles,
  LayoutDashboard,
  Store,
  RotateCcw,
  MessageCircle,
  Mail,
  X,
  Palette,
  ExternalLink,
} from "lucide-react";

interface FloatingBsesDemoProps {
  locale: Locale;
}

export function FloatingBsesDemo({ locale }: FloatingBsesDemoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { resetDemoData } = useStore();
  const { showToast } = useToast();

  const handleReset = () => {
    resetDemoData();
    showToast(t(locale, "admin.resetSuccess"), "success");
    setIsOpen(false);
  };

  const whatsappUrl = getBsesWhatsAppUrl(t(locale, "bses.whatsappMessage"));

  return (
    <>
      {/* Floating discreet trigger pill */}
      <div className="fixed bottom-5 left-5 z-40 rtl:left-auto rtl:right-5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Contrôles de démonstration BSES"
          className="flex items-center gap-2 px-3.5 py-2 bg-ink/90 backdrop-blur-md text-ivory text-xs tracking-wider uppercase border border-camel/40 shadow-luxury hover:bg-ink hover:border-camel transition-all duration-300 group"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-camel opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-camel"></span>
          </span>
          <span className="font-serif font-medium tracking-widest text-[11px] text-camel">BSES</span>
          <span className="text-muted-light group-hover:text-white transition-colors">DÉMO</span>
        </button>

        {/* Expanded menu card */}
        {isOpen && (
          <div className="absolute bottom-12 left-0 mb-2 w-72 bg-white text-ink border border-ivory-dark shadow-luxury-lg p-4 animate-slide-up rtl:left-auto rtl:right-0">
            <div className="flex items-center justify-between pb-3 border-b border-ivory-dark">
              <div>
                <p className="text-[10px] tracking-widest uppercase font-mono text-camel font-semibold">
                  BENCHALH SOLUTION
                </p>
                <h4 className="text-xs font-serif font-bold tracking-wide text-ink">
                  Système E-commerce Luxe
                </h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-ink p-1"
                aria-label="Fermer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="py-2.5 flex flex-col gap-1 text-xs">
              <Link
                href={`/${locale}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-2.5 py-1.5 text-ink hover:bg-ivory hover:text-camel-dark transition-colors"
              >
                <Store className="w-3.5 h-3.5 text-camel" />
                <span>{t(locale, "common.exploreShop")}</span>
              </Link>

              <Link
                href={`/${locale}/admin-demo`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-2.5 py-1.5 text-ink hover:bg-ivory hover:text-camel-dark transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-camel" />
                <span>{t(locale, "common.testAdmin")}</span>
              </Link>

              <Link
                href={`/${locale}/design-system`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-2.5 py-1.5 text-ink hover:bg-ivory hover:text-camel-dark transition-colors"
              >
                <Palette className="w-3.5 h-3.5 text-camel" />
                <span>{t(locale, "nav.designSystem")}</span>
              </Link>

              <button
                onClick={handleReset}
                className="flex items-center gap-2.5 px-2.5 py-1.5 text-left text-ink hover:bg-ivory hover:text-red-700 transition-colors w-full"
              >
                <RotateCcw className="w-3.5 h-3.5 text-muted" />
                <span>{t(locale, "bses.resetSeed")}</span>
              </button>
            </div>

            <div className="pt-2 border-t border-ivory-dark">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-camel text-white text-[11px] font-sans tracking-wide uppercase font-semibold hover:bg-camel-dark transition-colors shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t(locale, "common.createSimilarShop")}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Commercial Inquiry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative w-full max-w-lg bg-white border border-ivory-dark shadow-2xl p-6 sm:p-8 animate-slide-up">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-muted hover:text-ink p-1 rtl:right-auto rtl:left-5"
              aria-label="Fermer la boîte de dialogue"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-camel font-semibold">
                  BENCHALH SOLUTION E-COMMERCE SYSTEM (BSES)
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-ink font-semibold">
                  {t(locale, "bses.dialogTitle")}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-muted-dark leading-relaxed font-sans">
                {t(locale, "bses.dialogBody")}
              </p>

              <div className="bg-ivory p-4 space-y-2 border border-ivory-dark text-xs sm:text-sm font-sans">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-camel flex-shrink-0" />
                  <span className="font-semibold text-ink">{t(locale, "bses.emailLabel")}</span>
                  <a
                    href={`mailto:${BSES_CONTACT_EMAIL}`}
                    className="text-camel-dark underline hover:text-ink font-mono"
                  >
                    {BSES_CONTACT_EMAIL}
                  </a>
                </div>
                {whatsappUrl && (
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-camel flex-shrink-0" />
                    <span className="font-semibold text-ink">{t(locale, "bses.whatsappLabel")}</span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-camel-dark underline hover:text-ink font-mono flex items-center gap-1"
                    >
                      WhatsApp Démo <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                {whatsappUrl ? (
                  <>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-ink text-white text-xs tracking-wider uppercase font-medium hover:bg-camel transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Échanger sur WhatsApp</span>
                    </a>
                    <a
                      href={`mailto:${BSES_CONTACT_EMAIL}?subject=Demande%20de%20d%C3%A9monstration%20e-commerce%20VELORA%20-%20BSES`}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-ink text-ink text-xs tracking-wider uppercase font-medium hover:bg-ivory transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Envoyer un Email</span>
                    </a>
                  </>
                ) : (
                  <a
                    href={`mailto:${BSES_CONTACT_EMAIL}?subject=Demande%20de%20d%C3%A9monstration%20e-commerce%20VELORA%20-%20BSES`}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-ink text-white text-xs tracking-wider uppercase font-medium hover:bg-camel transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contacter BSES par Email ({BSES_CONTACT_EMAIL})</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

