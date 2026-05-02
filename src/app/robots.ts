import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://carcheckervin.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/admin", "/auth/", "/dashboard", "/dashboard/", "/report/", "/studio", "/studio/", "/embed/"],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/news-sitemap.xml`,
      `${baseUrl}/image-sitemap.xml`,
      `${baseUrl}/sitemap-index.xml`,
    ],
  };
}
