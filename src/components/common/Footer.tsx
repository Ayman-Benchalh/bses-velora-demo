"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Locale } from "@/types";
import { t } from "@/lib/translations";
import { useToast } from "@/context/ToastContext";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Mail,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast(t(locale, "home.newsletterSuccess"), "success");
      setEmail("");
    }
  };

  const whatsappUrl = `https://wa.me/212600000000?text=${encodeURIComponent(
    t(locale, "bses.whatsappMessage")
  )}`;

  return (
    <footer className="bg-ink text-ivory border-t border-ink-800 transition-colors">
      {/* Upper Guarantees Bar */}
      <div className="border-b border-ink-800 py-8 bg-ink-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <Truck className="w-6 h-6 text-camel flex-shrink-0" />
            <div>
              <h5 className="text-xs font-serif font-bold tracking-wider uppercase text-ivory">
                Livraison Privilège Maroc
              </h5>
              <p className="text-[11px] text-muted-light mt-0.5">
                Sous 24h à 48h dans tout le Royaume. Gratuite dès 1 000 MAD.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-camel flex-shrink-0" />
            <div>
              <h5 className="text-xs font-serif font-bold tracking-wider uppercase text-ivory">
                Paiement à la Livraison
              </h5>
              <p className="text-[11px] text-muted-light mt-0.5">
                Réglez en espèces à réception ou par carte bancaire sécurisée.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <RotateCcw className="w-6 h-6 text-camel flex-shrink-0" />
            <div>
              <h5 className="text-xs font-serif font-bold tracking-wider uppercase text-ivory">
                Retours Offerts 14 Jours
              </h5>
              <p className="text-[11px] text-muted-light mt-0.5">
                Essayez vos pièces chez vous avec un échange simplifié.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <Sparkles className="w-6 h-6 text-camel flex-shrink-0" />
            <div>
              <h5 className="text-xs font-serif font-bold tracking-wider uppercase text-ivory">
                Packaging Écrin Luxe
              </h5>
              <p className="text-[11px] text-muted-light mt-0.5">
                Chaque commande est scellée dans un coffret de présentation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand & Manifesto Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link
            href={`/${locale}`}
            className="font-serif text-2xl tracking-[0.25em] font-bold text-ivory hover:text-camel transition-colors uppercase inline-block"
          >
            VELORA
          </Link>
          <p className="text-xs text-muted-light font-sans leading-relaxed max-w-sm">
            Maison de haute confection marocaine contemporaine. L&apos;alliance entre la précision sartoriale européenne et le savoir-faire ancestral des ateliers de Fès, Marrakech et Casablanca.
          </p>

          <div className="pt-2">
            <div className="bg-ink-900 border border-ink-800 p-3 max-w-sm">
              <span className="text-[10px] uppercase font-mono tracking-widest text-camel block">
                Portfolio Professionnel BSES
              </span>
              <p className="text-[11px] text-muted-light mt-0.5">
                Développé par{" "}
                <strong className="text-ivory">
                  BSES — Benchalh Solution E-commerce System
                </strong>{" "}
                pour valoriser l&apos;excellence du commerce digital au Maroc.
              </p>
            </div>
          </div>
        </div>

        {/* Collections Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-serif font-bold uppercase tracking-widest text-camel">
            {t(locale, "nav.shop")}
          </h4>
          <ul className="space-y-2 text-xs font-sans text-muted-light">
            <li>
              <Link href={`/${locale}/shop?category=women`} className="hover:text-white transition-colors">
                {t(locale, "nav.women")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/shop?category=men`} className="hover:text-white transition-colors">
                {t(locale, "nav.men")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/shop?category=shoes`} className="hover:text-white transition-colors">
                {t(locale, "nav.shoes")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/shop?category=bags`} className="hover:text-white transition-colors">
                {t(locale, "nav.bags")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/shop?category=accessories`} className="hover:text-white transition-colors">
                {t(locale, "nav.accessories")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/lookbook`} className="hover:text-white transition-colors">
                {t(locale, "nav.lookbook")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Maison & Services Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-serif font-bold uppercase tracking-widest text-camel">
            La Maison & Services
          </h4>
          <ul className="space-y-2 text-xs font-sans text-muted-light">
            <li>
              <Link href={`/${locale}/about`} className="hover:text-white transition-colors">
                {t(locale, "nav.about")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/contact`} className="hover:text-white transition-colors">
                {t(locale, "nav.contact")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/delivery`} className="hover:text-white transition-colors">
                {t(locale, "nav.delivery")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/faq`} className="hover:text-white transition-colors">
                {t(locale, "nav.faq")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/design-system`} className="hover:text-white transition-colors">
                {t(locale, "nav.designSystem")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/admin-demo`} className="hover:text-camel transition-colors font-medium text-camel-light">
                {t(locale, "nav.adminDemo")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Contact Agency */}
        <div className="space-y-3">
          <h4 className="text-xs font-serif font-bold uppercase tracking-widest text-camel">
            Cercle Privé
          </h4>
          <p className="text-[11px] text-muted-light font-sans">
            Inscrivez-vous pour recevoir nos invitations exclusives.
          </p>

          <form onSubmit={handleNewsletter} className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email..."
              className="w-full bg-ink-900 border border-ink-800 text-xs px-3 py-2 text-ivory placeholder:text-muted focus:outline-none focus:border-camel font-sans"
              required
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-2.5 bg-camel text-white text-xs hover:bg-camel-dark transition-colors flex items-center rtl:right-auto rtl:left-1"
              aria-label="S'inscrire"
            >
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </form>

          <div className="pt-2 space-y-1 text-[11px] text-muted-light">
            <p className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-camel" />
              <a href="mailto:Bses47113@gmail.com" className="hover:text-camel underline">
                Bses47113@gmail.com
              </a>
            </p>
            <p className="flex items-center gap-1.5">
              <MessageCircle className="w-3 h-3 text-camel" />
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-camel underline">
                WhatsApp BSES Démo
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-ink-800 py-6 text-center text-xs text-muted font-sans">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} VELORA Haute Confection. Tous droits réservés.</p>
          <p className="text-[11px] text-muted-light font-mono">
            Système E-commerce conçu & développé par{" "}
            <span className="text-camel font-semibold">BSES</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}

