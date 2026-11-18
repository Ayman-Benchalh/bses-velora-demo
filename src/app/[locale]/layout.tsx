import React from "react";
import type { Metadata } from "next";
import { Locale } from "@/types";
import { StoreProvider } from "@/context/StoreContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import { AnnouncementBar } from "@/components/common/AnnouncementBar";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingBsesDemo } from "@/components/common/FloatingBsesDemo";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }, { locale: "ar" }];
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawLocale = resolvedParams.locale;
  const locale: Locale = rawLocale === "ar" ? "ar" : rawLocale === "en" ? "en" : "fr";

  const titles = {
    fr: "VELORA | Haute Confection & Mode Contemporaine",
    en: "VELORA | Contemporary Luxury Fashion & Tailoring",
    ar: "فيلورا | أزياء راقية وأناقة مغربية معاصرة",
  };
  const descriptions = {
    fr: "Maison de haute confection contemporaine au Maroc. L'alliance de l'élégance sartoriale européenne et du raffinement artisanal marocain. Démonstration e-commerce par BSES.",
    en: "Contemporary luxury fashion house in Morocco. Blending European sartorial elegance with Moroccan craft refinement. E-commerce demo by BSES.",
    ar: "دار الأزياء الراقية المعاصرة بالمغرب. مزيج من الخياطة الراقية الأوروبية والأصالة المغربية. تجربة تجارة إلكترونية متكاملة من تطوير BSES.",
  };

  return {
    title: {
      default: titles[locale],
      template: "%s | VELORA Luxury",
    },
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      locale: locale === "ar" ? "ar_MA" : locale === "en" ? "en_US" : "fr_MA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
        ar: "/ar",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const resolvedParams = await params;
  const rawLocale = resolvedParams.locale;
  const locale: Locale = rawLocale === "ar" ? "ar" : rawLocale === "en" ? "en" : "fr";
  const isRtl = locale === "ar";

  return (
    <div lang={locale} dir={isRtl ? "rtl" : "ltr"} className="min-h-screen flex flex-col justify-between">
      <StoreProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              {/* Header Suite */}
              <AnnouncementBar locale={locale} />
              <Header locale={locale} />

              {/* Main Content */}
              <div className="flex-1">{children}</div>

              {/* Shopping Bag Sliding Drawer */}
              <CartDrawer locale={locale} />

              {/* Floating BSES Demo Suite & Consultation */}
              <FloatingBsesDemo locale={locale} />

              {/* Luxury Footer */}
              <Footer locale={locale} />
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </StoreProvider>
    </div>
  );
}

