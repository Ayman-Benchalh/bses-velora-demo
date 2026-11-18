"use client";

import React, { useState } from "react";
import { Locale } from "@/types";
import { t } from "@/lib/translations";
import { ChevronDown } from "lucide-react";

interface FaqViewProps {
  locale: Locale;
}

interface FaqItem {
  q: string;
  a: string;
}

export function FaqView({ locale }: FaqViewProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: "Quels sont les délais de livraison à Casablanca, Rabat et dans les autres villes du Maroc ?",
      a: "Pour le Grand Casablanca, la livraison est effectuée en moins de 24 heures (souvent le jour même pour toute commande passée avant 13h00). Pour Rabat, Marrakech, Tanger, Fès, Agadir et les autres grandes villes, le délai d'acheminement est de 24h à 48h ouvrées par Amana Express.",
    },
    {
      q: "Comment fonctionne le paiement à la livraison (Cash on Delivery) ?",
      a: "Vous pouvez commander sans régler immédiatement en ligne. Vous réglez directement le montant exact en espèces auprès du transporteur au moment où celui-ci vous remet votre colis scellé en main propre.",
    },
    {
      q: "Comment choisir la taille idéale pour les pièces sartoriales et les caftans ?",
      a: "Toutes nos silhouettes respectent les standards de la confection européenne et marocaine. Un guide des tailles complet (en centimètres et en pouces) est accessible sur chaque fiche produit. En cas de doute, notre équipe vous conseille en direct par WhatsApp.",
    },
    {
      q: "Puis-je échanger ou retourner un article si la taille ne convient pas ?",
      a: "Oui, vous disposez d'un délai de 14 jours après la livraison pour effectuer un échange ou demander un remboursement complet. Un coursier peut récupérer votre colis à l'adresse de votre choix.",
    },
    {
      q: "Où sont sourcées et confectionnées les créations VELORA ?",
      a: "Les tissus nobles sont tissés en Italie et en France, tandis que le travail des soies sauvages, la maroquinerie d'art et les finitions à la main (sfifa, âakads, ciselure) sont réalisés dans nos ateliers de Fès, Marrakech et Casablanca.",
    },
    {
      q: "Qu'est-ce que le système de démonstration BSES ?",
      a: "VELORA est une démonstration interactive développée par BSES (Benchalh Solution E-commerce System) à l'intention des marques de mode, créateurs et détaillants haut de gamme marocains. Le système intègre un panneau d'administration en temps réel, un panier avec gestion des remises et une expérience multilingue français/anglais/arabe avec support RTL complet.",
    },
  ];

  return (
    <div className="font-sans py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-camel font-semibold">
          AIDE & INFORMATIONS
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
          {t(locale, "nav.faq")}
        </h1>
        <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">
          Réponses aux questions les plus fréquentes sur nos pièces, la livraison au Maroc et le système démo.
        </p>
      </div>

      <div className="bg-white border border-ivory-dark divide-y divide-ivory-dark shadow-luxury-sm">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="p-5 sm:p-6 transition-colors">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left rtl:text-right gap-4 focus:outline-none"
                aria-expanded={isOpen}
              >
                <h3 className="font-serif text-sm sm:text-base font-bold text-ink hover:text-camel transition-colors">
                  {faq.q}
                </h3>
                <ChevronDown
                  className={`w-4 h-4 text-camel flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-3 text-xs sm:text-sm text-muted-dark leading-relaxed font-sans animate-slide-down">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

