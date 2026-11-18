import React from "react";
import { Locale } from "@/types";
import { DesignSystemView } from "@/components/brand/DesignSystemView";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }, { locale: "ar" }];
}

interface DesignSystemPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DesignSystemPage({ params }: DesignSystemPageProps) {
  const resolved = await params;
  const locale: Locale = resolved.locale === "ar" ? "ar" : resolved.locale === "en" ? "en" : "fr";

  return <DesignSystemView locale={locale} />;
}

