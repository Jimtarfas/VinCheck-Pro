/**
 * Wave 17c — French dynamic template for /fr/paint-code-lookup/[brand].
 * Renders the SAME full English brand-page layout via the shared
 * PaintCodeBrandBody component. Replaces the Wave 15 SpecialtyToolPage
 * shell with true visual parity.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PaintCodeBrandBody from "@/components/PaintCodeBrandBody";
import { PAINT_CODE_BRANDS, findBrand } from "@/lib/paint-codes";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";

export function generateStaticParams() {
  return PAINT_CODE_BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand: slug } = await params;
  const b = findBrand(slug);
  if (!b) return {};

  const alt = hreflangAlternatesForLocale(`/paint-code-lookup/${b.slug}`, "fr");
  const title = `Código de peinture ${b.name} — Emplacement + gráfico OEM`;
  const description = `Trouve le code de peinture ${b.name} rapide. Emplacement exacta de la calcomanía (${b.primaryLocation.split("—")[0].trim()}), le que dice la etiqueta, formato du code et ejemplos réeles de codes de color ${b.name}. O búscalo gratuit par VIN.`;

  return {
    title: { absolute: `${title} | CarCheckerVIN` },
    description,
    keywords: [
      `code peinture ${b.name}`,
      `${b.name} paint code français`,
      `color OEM ${b.name}`,
      `dónde est code peinture ${b.name}`,
      `${b.name} code peinture par VIN`,
      `retoque peinture ${b.name}`,
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
  const b = findBrand(slug);
  if (!b) notFound();

  const pageUrl = `${SITE}/fr/paint-code-lookup/${b.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Buscador de code de peinture",
        item: `${SITE}/fr/codigo-de-peinture`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Código de peinture ${b.name}`,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PaintCodeBrandBody brandSlug={slug} locale="fr" />
    </>
  );
}
