import React from "react";
import { Locale } from "@/types";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }, { locale: "ar" }];
}

interface AdminDemoPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminDemoPage({ params }: AdminDemoPageProps) {
  const resolved = await params;
  const locale: Locale = resolved.locale === "ar" ? "ar" : resolved.locale === "en" ? "en" : "fr";

  return <AdminDashboard locale={locale} />;
}

