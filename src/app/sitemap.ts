import { MetadataRoute } from "next";
import { INITIAL_PRODUCTS } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3101";
  const locales = ["fr", "ar", "en"];
  const staticRoutes = [
    "",
    "/shop",
    "/collections",
    "/lookbook",
    "/about",
    "/contact",
    "/delivery",
    "/faq",
    "/design-system",
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static localized routes
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }
  }

  // Localized product routes
  for (const product of INITIAL_PRODUCTS) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/product/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  return entries;
}

