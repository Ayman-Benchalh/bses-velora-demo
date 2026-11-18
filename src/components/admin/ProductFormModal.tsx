"use client";

import React, { useState } from "react";
import { Product, ProductCategory, Locale } from "@/types";
import { X, Save } from "lucide-react";

interface ProductFormModalProps {
  product: Product | null; // null means Add new
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  locale: Locale;
}

export function ProductFormModal({ product, isOpen, onClose, onSave, locale: _locale }: ProductFormModalProps) {
  const isEditing = Boolean(product);

  const [nameFr, setNameFr] = useState(product?.name.fr || "");
  const [nameEn, setNameEn] = useState(product?.name.en || "");
  const [nameAr, setNameAr] = useState(product?.name.ar || "");
  const [price, setPrice] = useState(product?.price?.toString() || "3500");
  const [salePrice, setSalePrice] = useState(product?.salePrice?.toString() || "");
  const [category, setCategory] = useState<ProductCategory>(product?.category || "women");
  const [materialsFr, setMaterialsFr] = useState(product?.materials.fr || "100% Laine Vierge peignée");
  const [imageUrls, setImageUrls] = useState(
    product?.images.join("\n") ||
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop"
  );
  const [sizesInput, setSizesInput] = useState(product?.sizes.join(", ") || "36, 38, 40, 42");
  const [stockInput, setStockInput] = useState(
    product ? product.variants.reduce((s, v) => s + v.stock, 0).toString() : "12"
  );
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nameFr.trim()) {
      setError("Le nom en français est obligatoire.");
      return;
    }

    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setError("Le prix doit être un nombre positif en MAD.");
      return;
    }

    const images = imageUrls
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    if (images.length === 0) {
      setError("Veuillez fournir au moins une URL d'image.");
      return;
    }

    const parsedSizes = sizesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const initialStockPerSize = Math.max(1, Math.floor(Number(stockInput || "12") / (parsedSizes.length || 1)));

    const slug = (nameFr || "piece")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newProduct: Product = {
      id: product?.id || `prod-${Date.now()}`,
      slug: product?.slug || slug,
      name: {
        fr: nameFr.trim(),
        en: nameEn.trim() || nameFr.trim(),
        ar: nameAr.trim() || nameFr.trim(),
      },
      shortDescription: product?.shortDescription || {
        fr: "Création d'exception façonnée dans nos ateliers.",
        en: "Exceptional creation tailored in our ateliers.",
        ar: "تصميم فاخر مصوغ في مشاغلنا الراقية.",
      },
      description: product?.description || {
        fr: "Une silhouette emblématique alliant modernisme et savoir-faire traditionnel.",
        en: "An iconic silhouette uniting modernism and traditional craftsmanship.",
        ar: "قصة أيقونية تجمع بين الحداثة والحرفية الأصيلة.",
      },
      price: numPrice,
      salePrice: salePrice ? Number(salePrice) : undefined,
      category,
      collection: product?.collection || {
        fr: "Collection Signature",
        en: "Signature Collection",
        ar: "المجموعة التوقيعية",
      },
      images,
      materials: {
        fr: materialsFr,
        en: product?.materials.en || materialsFr,
        ar: product?.materials.ar || materialsFr,
      },
      care: product?.care || {
        fr: "Nettoyage à sec spécialisé uniquement.",
        en: "Specialist dry clean only.",
        ar: "تنظيف جاف متخصص فقط.",
      },
      origin: product?.origin || {
        fr: "Ateliers VELORA Casablanca.",
        en: "VELORA Ateliers Casablanca.",
        ar: "مشاغل فيلورا بالدار البيضاء.",
      },
      details: product?.details || [
        { fr: "Finitions cousues main", en: "Hand-stitched details", ar: "تفاصيل مخيطة يدوياً" },
      ],
      sizes: parsedSizes.length > 0 ? parsedSizes : ["Unique"],
      colors: product?.colors || [
        { name: { fr: "Noir d'Encre", en: "Ink Black", ar: "أسود داكن" }, hex: "#171717" },
        { name: { fr: "Camel Doré", en: "Golden Camel", ar: "جملي ذهبي" }, hex: "#B78D6C" },
      ],
      variants: parsedSizes.map((sz, i) => ({
        id: `v-${Date.now()}-${i}`,
        size: sz,
        color: "Noir d'Encre",
        colorHex: "#171717",
        colorName: { fr: "Noir d'Encre", en: "Ink Black", ar: "أسود داكن" },
        sku: `VEL-${category.toUpperCase().slice(0, 3)}-${sz}`,
        stock: initialStockPerSize,
      })),
      isFeatured: product?.isFeatured ?? true,
      isNewArrival: product?.isNewArrival ?? true,
      isBestSeller: product?.isBestSeller ?? false,
      rating: product?.rating || 5.0,
      reviewCount: product?.reviewCount || 1,
      createdAt: product?.createdAt || new Date().toISOString(),
    };

    onSave(newProduct);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
      <div className="relative w-full max-w-2xl bg-white border border-ivory-dark shadow-2xl p-6 sm:p-8 animate-slide-up max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-muted hover:text-ink p-1 rtl:right-auto rtl:left-5"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="pb-3 border-b border-ivory-dark">
            <span className="text-[10px] font-mono uppercase tracking-widest text-camel font-semibold">
              CATALOGUE GESTIONNAIRE
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              {isEditing ? "Modifier la Pièce de Haute Confection" : "Ajouter une Nouvelle Pièce au Catalogue"}
            </h3>
          </div>

          {error && <div className="p-3 bg-red-50 text-red-700 text-xs border border-red-200">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Title FR */}
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-ink block">Nom de la pièce (Français) *</label>
              <input
                type="text"
                value={nameFr}
                onChange={(e) => setNameFr(e.target.value)}
                placeholder="ex: Manteau Double Face en Laine & Cachemire"
                required
                className="w-full px-3 py-2 bg-ivory border border-ivory-dark focus:outline-none focus:border-camel text-ink"
              />
            </div>

            {/* Title EN */}
            <div className="space-y-1">
              <label className="font-semibold text-ink block">Nom en Anglais</label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="ex: Double-Faced Wool Coat"
                className="w-full px-3 py-2 bg-ivory border border-ivory-dark focus:outline-none focus:border-camel text-ink"
              />
            </div>

            {/* Title AR */}
            <div className="space-y-1">
              <label className="font-semibold text-ink block">الاسم بالعربية</label>
              <input
                type="text"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="مثال: معطف صوف وكشمير فاخر"
                dir="rtl"
                className="w-full px-3 py-2 bg-ivory border border-ivory-dark focus:outline-none focus:border-camel text-ink"
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="font-semibold text-ink block">Catégorie *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2 bg-ivory border border-ivory-dark focus:outline-none focus:border-camel text-ink"
              >
                <option value="women">Femme (Women)</option>
                <option value="men">Homme (Men)</option>
                <option value="shoes">Souliers (Shoes)</option>
                <option value="bags">Maroquinerie (Bags)</option>
                <option value="accessories">Accessoires (Accessories)</option>
              </select>
            </div>

            {/* Price MAD */}
            <div className="space-y-1">
              <label className="font-semibold text-ink block">Prix normal (MAD) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full px-3 py-2 bg-ivory border border-ivory-dark font-mono focus:outline-none focus:border-camel text-ink"
              />
            </div>

            {/* Sale Price MAD */}
            <div className="space-y-1">
              <label className="font-semibold text-ink block">Prix promotionnel Privilège (MAD, optionnel)</label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="Laisser vide si aucun rabais"
                className="w-full px-3 py-2 bg-ivory border border-ivory-dark font-mono focus:outline-none focus:border-camel text-ink"
              />
            </div>

            {/* Initial Total Stock */}
            <div className="space-y-1">
              <label className="font-semibold text-ink block">Stock initial total *</label>
              <input
                type="number"
                value={stockInput}
                onChange={(e) => setStockInput(e.target.value)}
                required
                className="w-full px-3 py-2 bg-ivory border border-ivory-dark font-mono focus:outline-none focus:border-camel text-ink"
              />
            </div>

            {/* Sizes */}
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-ink block">Tailles disponibles (séparées par des virgules)</label>
              <input
                type="text"
                value={sizesInput}
                onChange={(e) => setSizesInput(e.target.value)}
                placeholder="36, 38, 40, 42 ou S, M, L ou 40, 41, 42"
                className="w-full px-3 py-2 bg-ivory border border-ivory-dark font-mono focus:outline-none focus:border-camel text-ink"
              />
            </div>

            {/* Materials */}
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-ink block">Matières & Tissage</label>
              <input
                type="text"
                value={materialsFr}
                onChange={(e) => setMaterialsFr(e.target.value)}
                placeholder="ex: 100% Soie Sauvage naturelle de Fès"
                className="w-full px-3 py-2 bg-ivory border border-ivory-dark focus:outline-none focus:border-camel text-ink"
              />
            </div>

            {/* Image URLs */}
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-ink block">URLs des photographies (une par ligne)</label>
              <textarea
                value={imageUrls}
                onChange={(e) => setImageUrls(e.target.value)}
                rows={3}
                placeholder="https://images.unsplash.com/..."
                required
                className="w-full px-3 py-2 bg-ivory border border-ivory-dark text-xs font-mono focus:outline-none focus:border-camel text-ink resize-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-ivory-dark flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 border border-ivory-dark text-muted-dark hover:text-ink text-xs uppercase tracking-wider font-medium transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 bg-ink text-white hover:bg-camel text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Enregistrer la pièce</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
