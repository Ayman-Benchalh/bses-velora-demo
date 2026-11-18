import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3101";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/*/admin-demo"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

