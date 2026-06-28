/**
 * Wave 17d — French dynamic template for /fr/build-sheet/[brand].
 * Renders the SAME full English brand-page layout via the shared
 * BuildSheetBrandBody component. Replaces the Wave 15 SpecialtyToolPage
 * shell with true visual parity.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BuildSheetBrandBody from "@/components/BuildSheetBrandBody";
import { BUILD_SHEET_BRANDS, findBuildSheetBrand } from "@/lib/build-sheets";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";

export function generateStaticParams() {
  return BUILD_SHEET_BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand: slug } = await params;
  const b = findBuildSheetBrand(slug);
  if (!b) return {};

  const alt = hreflangAlternatesForLocale(`/build-sheet/${b.slug}`, "fr");
  const title = `Hoja de fábrica ${b.name} par VIN — Décodeur gratuit`;
  const description = `Busca una hoja de fábrica ${b.name} par VIN, gratuit. Décode la ${b.docName}: opciones de fábrica, codes de peinture e interior, moteur, transmission et planta de ensamble du enregistrement original.`;

  return {
    title: { absolute: `${title} | CarCheckerVIN` },
    description,
    keywords: [
      `hoja de fábrica ${b.name}`,
      `${b.name} ${b.docName} VIN`,
      `${b.name} build sheet français`,
      `${b.name} codes de opciones`,
      `${b.name} configuration original`,
      `${b.name} hoja de fábrica par VIN`,
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
  params: Promise<{ brand: string }>;
}) {
  const { brand: slug } = await params;
  const b = findBuildSheetBrand(slug);
  if (!b) notFound();

  const pageUrl = `${SITE}/fr/build-sheet/${b.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hoja de fábrica",
        item: `${SITE}/fr/hoja-fabrica`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Hoja de fábrica ${b.name}`,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BuildSheetBrandBody brandSlug={slug} locale="fr" />
    </>
  );
}
