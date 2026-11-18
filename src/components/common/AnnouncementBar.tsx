"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/types";
import { t } from "@/lib/translations";
import { Globe, Truck } from "lucide-react";

interface AnnouncementBarProps {
  locale: Locale;
}

export function AnnouncementBar({ locale }: AnnouncementBarProps) {
  const pathname = usePathname();

  const getLocalizedPath = (targetLocale: Locale) => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    return segments.join("/");
  };

  return (
    <div className="bg-ink text-ivory text-[11px] sm:text-xs font-sans tracking-wide border-b border-ink-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
        {/* Left: Moroccan Delivery guarantee */}
        <div className="hidden md:flex items-center gap-1.5 text-camel-light font-medium">
          <Truck className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{t(locale, "common.moroccoNotice")}</span>
        </div>

        {/* Center: Seasonal Announcement */}
        <div className="flex-1 min-w-0 text-center truncate">
          <span className="text-ivory-light font-light truncate">
            {t(locale, "announcement.text")}
          </span>
          <Link
            href={`/${locale}/shop`}
            className="ms-2 underline hover:text-camel text-camel transition-colors font-medium hidden sm:inline"
          >
            {t(locale, "announcement.cta")}
          </Link>
        </div>

        {/* Right: Language Switcher & Currency */}
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="text-muted hidden sm:inline font-sans">MAD</span>
          <span className="text-ink-700 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-muted" />
            <Link
              href={getLocalizedPath("fr")}
              className={`hover:text-camel transition-colors ${
                locale === "fr" ? "text-camel font-bold underline" : "text-muted"
              }`}
            >
              FR
            </Link>
            <span className="text-ink-700">·</span>
            <Link
              href={getLocalizedPath("en")}
              className={`hover:text-camel transition-colors ${
                locale === "en" ? "text-camel font-bold underline" : "text-muted"
              }`}
            >
              EN
            </Link>
            <span className="text-ink-700">·</span>
            <Link
              href={getLocalizedPath("ar")}
              className={`hover:text-camel transition-colors ${
                locale === "ar" ? "text-camel font-bold underline" : "text-muted"
              }`}
            >
              العربية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

