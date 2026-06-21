import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LemonCheckBrandBody from "@/components/LemonCheckBrandBody";
import { LEMON_BRANDS, findLemonBrand } from "@/lib/lemon-brands";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export function generateStaticParams() {
  return LEMON_BRANDS.map((b) => ({ make: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ make: string }>;
}): Promise<Metadata> {
  const { make } = await params;
  const b = findLemonBrand(make);
  if (!b) return {};

  const title = `${b.name} Lemon Check by VIN — Free Buyback Lookup`;
  const description = `Free ${b.name} lemon check by VIN. See if a ${b.name} was a manufacturer buyback or lemon-law repurchase. Warranty ${b.basicWarranty}. NMVTIS-backed, instant, no signup.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${b.name} lemon check`,
      `${b.name} lemon law`,
      `is my ${b.name} a lemon`,
      `${b.name} lemon law buyback`,
      `${b.name} buyback VIN`,
      `${b.name} manufacturer buyback check`,
      `lemon check ${b.name} by VIN`,
      `${b.name} warranty repurchase`,
      `free ${b.name} lemon check`,
    ],
    alternates: { canonical: `/lemon-check/brand/${b.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/lemon-check/brand/${b.slug}`,
      type: "article",
      siteName: "CarCheckerVIN",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function BrandLemonCheckPage({
  params,
}: {
  params: Promise<{ make: string }>;
}) {
  const { make } = await params;
  const b = findLemonBrand(make);
  if (!b) notFound();

  const pageUrl = `${SITE}/lemon-check/brand/${b.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${b.name} Lemon Check by VIN — Buyback Lookup`,
    description: `How to run a free ${b.name} lemon check by VIN, what ${b.name}'s warranty (${b.basicWarranty}) means for lemon-law eligibility, and how manufacturer buybacks are branded on the title.`,
    author: ORG_AUTHOR,
    publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    datePublished: "2026-06-19",
    dateModified: "2026-06-19",
    image: `${SITE}/opengraph-image`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Lemon Check", item: `${SITE}/lemon-check` },
      { "@type": "ListItem", position: 3, name: "By Brand", item: `${SITE}/lemon-check/brand` },
      { "@type": "ListItem", position: 4, name: `${b.name} Lemon Check`, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LemonCheckBrandBody makeSlug={make} locale="en" />
    </>
  );
}
