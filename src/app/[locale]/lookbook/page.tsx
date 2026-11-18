import React from "react";
import { Locale } from "@/types";
import { LookbookView } from "@/components/lookbook/LookbookView";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }, { locale: "ar" }];
}

interface LookbookPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LookbookPage({ params }: LookbookPageProps) {
  const resolved = await params;
  const locale: Locale = resolved.locale === "ar" ? "ar" : resolved.locale === "en" ? "en" : "fr";

  return <LookbookView locale={locale} />;
}

