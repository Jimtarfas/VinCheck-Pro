/**
 * Wave 17b — French dynamic template for /fr/lemon-check/brand/[make].
 * Renders the SAME full English brand-page layout via the shared
 * LemonCheckBrandBody component (Wave 17 pattern). Replaces the
 * Wave 15 SpecialtyToolPage shell with true visual parity.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LemonCheckBrandBody from "@/components/LemonCheckBrandBody";
import { LEMON_BRANDS, findLemonBrand } from "@/lib/lemon-brands";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

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

  const alt = hreflangAlternatesForLocale(`/lemon-check/brand/${b.slug}`, "fr");
  const title = `Vérification Loi Citron ${b.name} par VIN — Recherche gratuite de rachat`;
  const description = `Vérification gratuit de Loi Citron ${b.name} par VIN. Ve si un ${b.name} a été rachat du fabricante ou rachat Loi Citron. Garantía ${b.basicWarranty}. Respaldado par NMVTIS, instantané, sans inscription.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `Loi Citron ${b.name}`,
      `${b.name} citron check français`,
      `vérification rachat ${b.name}`,
      `${b.name} buyback VIN`,
      `${b.name} garantie rachat`,
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title,
      description,
      url: alt.canonical,
      type: "article",
      siteName: "CarCheckerVIN",
      locale: "fr_US",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ make: string }>;
}) {
  const { make } = await params;
  const b = findLemonBrand(make);
  if (!b) notFound();
  const pageUrl = `${SITE}/fr/lemon-check/brand/${b.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
      { "@type": "ListItem", position: 2, name: "Vérification Loi Citron", item: `${SITE}/fr/lemon-check` },
      { "@type": "ListItem", position: 3, name: "Par marque", item: `${SITE}/fr/lemon-check/brand` },
      { "@type": "ListItem", position: 4, name: `Vérification Loi Citron ${b.name}`, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LemonCheckBrandBody makeSlug={make} locale="fr" />
    </>
  );
}
