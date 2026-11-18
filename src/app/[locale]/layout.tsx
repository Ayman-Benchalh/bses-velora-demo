import React from "react";
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

