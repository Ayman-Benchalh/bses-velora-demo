"use client";

import React from "react";
import { Locale } from "@/types";
import { t } from "@/lib/translations";
import { Truck, RotateCcw, ShieldCheck, Box } from "lucide-react";

interface DeliveryViewProps {
  locale: Locale;
}

export function DeliveryView({ locale }: DeliveryViewProps) {
  return (
    <div className="font-sans py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-camel font-semibold">
          EXPÉDITIONS & RETOURS AU MAROC
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
          {t(locale, "nav.delivery")}
        </h1>
        <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">
          Une logistique sur-mesure pour vous livrer dans les plus brefs délais partout dans le Royaume.
        </p>
      </div>

      {/* Grid of 4 Key Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 border border-ivory-dark shadow-luxury-sm space-y-3">
          <Truck className="w-6 h-6 text-camel" />
          <h3 className="font-serif text-lg font-bold text-ink">
            Délais d&apos;Expédition par Ville
          </h3>
          <ul className="text-xs text-muted-dark space-y-2 font-sans">
            <li className="flex justify-between border-b border-ivory-dark pb-1">
              <strong>Grand Casablanca & Mohammedia :</strong>
              <span className="font-mono text-camel font-semibold">Sous 24h (Même jour si &lt; 13h)</span>
            </li>
            <li className="flex justify-between border-b border-ivory-dark pb-1">
              <strong>Rabat, Marrakech, Tanger, Fès :</strong>
              <span className="font-mono text-camel font-semibold">24h à 48h ouvrées</span>
            </li>
            <li className="flex justify-between border-b border-ivory-dark pb-1">
              <strong>Agadir, Oujda, Tétouan, Meknès :</strong>
              <span className="font-mono text-camel font-semibold">24h à 48h ouvrées</span>
            </li>
            <li className="flex justify-between">
              <strong>Provinces du Sud (Laâyoune, Dakhla) :</strong>
              <span className="font-mono text-camel font-semibold">48h à 72h ouvrées</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 border border-ivory-dark shadow-luxury-sm space-y-3">
          <Box className="w-6 h-6 text-camel" />
          <h3 className="font-serif text-lg font-bold text-ink">
            Tarifs & Gratuité
          </h3>
          <div className="text-xs text-muted-dark space-y-2.5">
            <p>
              <strong>Livraison Offerte :</strong> Gratuite pour toute commande d&apos;un montant supérieur ou égal à <strong>1 000 MAD</strong>.
            </p>
            <p>
              <strong>Frais Standards :</strong> Un forfait unique de <strong>40 MAD</strong> s&apos;applique pour les commandes inférieures à 1 000 MAD partout au Maroc.
            </p>
            <p>
              Chaque pièce est emballée sous housse de protection zippée et scellée dans un coffret de présentation rigide VELORA.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 border border-ivory-dark shadow-luxury-sm space-y-3">
          <RotateCcw className="w-6 h-6 text-camel" />
          <h3 className="font-serif text-lg font-bold text-ink">
            Retours & Échanges sous 14 Jours
          </h3>
          <div className="text-xs text-muted-dark space-y-2.5">
            <p>
              Vous disposez de <strong>14 jours calendaires</strong> à compter de la réception de votre colis pour demander un échange de taille ou un remboursement.
            </p>
            <p>
              Les articles doivent être retournés non portés, non lavés, avec leurs étiquettes d&apos;origine intactes et dans leur coffret.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 border border-ivory-dark shadow-luxury-sm space-y-3">
          <ShieldCheck className="w-6 h-6 text-camel" />
          <h3 className="font-serif text-lg font-bold text-ink">
            Paiement à la Livraison en Espèces
          </h3>
          <div className="text-xs text-muted-dark space-y-2.5">
            <p>
              Pour votre sérénité totale, réglez votre commande directement auprès du transporteur à la livraison de votre colis scellé.
            </p>
            <p>
              Un SMS avec le numéro de suivi Amana Express vous est envoyé dès que votre commande quitte nos ateliers de confection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
