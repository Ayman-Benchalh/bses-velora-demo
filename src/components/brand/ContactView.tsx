"use client";

import React, { useState } from "react";
import { Locale } from "@/types";
import { t } from "@/lib/translations";
import { useToast } from "@/context/ToastContext";
import { Mail, MapPin, Send, MessageCircle } from "lucide-react";

interface ContactViewProps {
  locale: Locale;
}

export function ContactView({ locale }: ContactViewProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Sur-mesure & Salons Privés",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Veuillez renseigner les champs obligatoires.", "error");
      return;
    }
    showToast("Votre message a été transmis à la conciergerie VELORA & BSES.", "success");
    setFormData({ name: "", email: "", phone: "", subject: "Sur-mesure & Salons Privés", message: "" });
  };

  const whatsappUrl = `https://wa.me/212600000000?text=${encodeURIComponent(
    t(locale, "bses.whatsappMessage")
  )}`;

  return (
    <div className="font-sans py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-2 mb-14">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-camel font-semibold">
          CONCIERGERIE & ATELIERS
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
          {t(locale, "nav.contact")}
        </h1>
        <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">
          Nos conseillers et maîtres tailleurs sont à votre entière disposition.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact info & Showrooms: 5 Columns */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-6 border border-ivory-dark shadow-luxury-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-ink uppercase tracking-wider pb-2 border-b border-ivory-dark">
              Nos Salons Privés au Maroc
            </h3>

            <div className="space-y-4 text-xs text-muted-dark">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-camel flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink block">Atelier Casablanca</strong>
                  <span>Boulevard d&apos;Anfa, Triangle d&apos;Or, Casablanca</span>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-camel flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink block">Salon Marrakech</strong>
                  <span>Rue de la Liberté, Guéliz, Marrakech</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="w-4 h-4 text-camel flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink block">Email Agence & Partenariats</strong>
                  <a href="mailto:Bses47113@gmail.com" className="hover:text-camel underline font-mono">
                    Bses47113@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <MessageCircle className="w-4 h-4 text-camel flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink block">WhatsApp Démonstration</strong>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-camel underline font-mono">
                    Ligne directe consultation
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-ivory p-6 border border-ivory-dark space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-camel font-semibold block">
              AGENCE TECHNIQUE BSES
            </span>
            <p className="text-xs text-muted-dark leading-relaxed">
              Vous êtes une marque de prêt-à-porter, un créateur ou un détaillant marocain ? BSES déploie votre boutique clé en main avec gestion des commandes, paiements à la livraison et logistique intégrée.
            </p>
          </div>
        </div>

        {/* Form: 7 Columns */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-ivory-dark shadow-luxury-sm">
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-ink block">Nom & Prénom *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Votre nom complet..."
                required
                className="w-full px-3.5 py-2.5 bg-ivory border border-ivory-dark text-xs focus:outline-none focus:border-camel text-ink"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-ink block">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="votre.email@domaine.ma"
                  required
                  className="w-full px-3.5 py-2.5 bg-ivory border border-ivory-dark text-xs focus:outline-none focus:border-camel text-ink"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-ink block">Téléphone Maroc</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="06 XX XX XX XX"
                  className="w-full px-3.5 py-2.5 bg-ivory border border-ivory-dark text-xs font-mono focus:outline-none focus:border-camel text-ink"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-ink block">Objet de la demande</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-ivory border border-ivory-dark text-xs text-ink focus:outline-none focus:border-camel font-sans"
              >
                <option>Sur-mesure & Salons Privés</option>
                <option>Suivi d&apos;une commande au Maroc</option>
                <option>Projet E-commerce avec l&apos;agence BSES</option>
                <option>Autre renseignement</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-ink block">Message *</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                placeholder="Votre message détaillé..."
                required
                className="w-full px-3.5 py-2.5 bg-ivory border border-ivory-dark text-xs focus:outline-none focus:border-camel text-ink resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-ink text-white text-xs uppercase tracking-widest font-semibold hover:bg-camel transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Transmettre ma demande</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
