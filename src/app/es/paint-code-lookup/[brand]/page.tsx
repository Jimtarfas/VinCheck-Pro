/**
 * Wave 17c — Spanish dynamic template for /es/paint-code-lookup/[brand].
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

  const alt = hreflangAlternatesForLocale(`/paint-code-lookup/${b.slug}`, "es");
  const title = `Código de pintura ${b.name} — Ubicación + gráfico OEM`;
  const description = `Encuentra el código de pintura ${b.name} rápido. Ubicación exacta de la calcomanía (${b.primaryLocation.split("—")[0].trim()}), lo que dice la etiqueta, formato del código y ejemplos reales de códigos de color ${b.name}. O búscalo gratis por VIN.`;

  return {
    title: { absolute: `${title} | CarCheckerVIN` },
    description,
    keywords: [
      `código pintura ${b.name}`,
      `${b.name} paint code español`,
      `color OEM ${b.name}`,
      `dónde está código pintura ${b.name}`,
      `${b.name} código pintura por VIN`,
      `retoque pintura ${b.name}`,
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title,
      description,
      url: alt.canonical,
      type: "article",
      siteName: "CarCheckerVIN",
      locale: "es_US",
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

  const pageUrl = `${SITE}/es/paint-code-lookup/${b.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Buscador de código de pintura",
        item: `${SITE}/es/codigo-de-pintura`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Código de pintura ${b.name}`,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PaintCodeBrandBody brandSlug={slug} locale="es" />
    </>
  );
}
