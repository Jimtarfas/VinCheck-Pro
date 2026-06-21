/**
 * Wave 17b — Spanish dynamic template for /es/lemon-check/brand/[make].
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

  const alt = hreflangAlternatesForLocale(`/lemon-check/brand/${b.slug}`, "es");
  const title = `Verificación Ley Limón ${b.name} por VIN — Búsqueda gratis de recompra`;
  const description = `Verificación gratis de Ley Limón ${b.name} por VIN. Ve si un ${b.name} fue recompra del fabricante o recompra Ley Limón. Garantía ${b.basicWarranty}. Respaldado por NMVTIS, instantáneo, sin registro.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `Ley Limón ${b.name}`,
      `${b.name} lemon check español`,
      `verificación recompra ${b.name}`,
      `${b.name} buyback VIN`,
      `${b.name} garantía recompra`,
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
  params: Promise<{ make: string }>;
}) {
  const { make } = await params;
  const b = findLemonBrand(make);
  if (!b) notFound();
  const pageUrl = `${SITE}/es/lemon-check/brand/${b.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
      { "@type": "ListItem", position: 2, name: "Verificación Ley Limón", item: `${SITE}/es/lemon-check` },
      { "@type": "ListItem", position: 3, name: "Por marca", item: `${SITE}/es/lemon-check/brand` },
      { "@type": "ListItem", position: 4, name: `Verificación Ley Limón ${b.name}`, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LemonCheckBrandBody makeSlug={make} locale="es" />
    </>
  );
}
