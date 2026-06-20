/**
 * Wave 17 — Spanish dynamic template for /es/lemon-check/[state].
 * Renders the SAME full English layout via the shared
 * LemonCheckStateBody component (Wave 17 pattern), differing only by
 * locale="es" and Spanish metadata + JSON-LD.
 *
 * Replaces the Wave 15 SpecialtyToolPage shell.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LemonCheckStateBody, { getStateBundle, getAllStateBundles } from "@/components/LemonCheckStateBody";
import { statesEs } from "@/lib/states-es";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";

export function generateStaticParams() {
  return getAllStateBundles().map((b) => ({ state: b.s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const b = getStateBundle(state);
  if (!b) return {};
  const { s, law } = b;
  const stateEs = statesEs.find((e) => e.slug === state);
  const name = stateEs?.nameEs ?? s.name;

  const alt = hreflangAlternatesForLocale(`/lemon-check/${s.slug}`, "es");
  const title = `Verificación Ley Limón ${name} por VIN — Búsqueda gratis de recompra`;
  const description = `Verificación gratis de Ley Limón en ${name} por VIN. Ve si un auto fue recompra del fabricante bajo la Ley Limón de ${name} (${law.coveragePeriod}). Respaldado por NMVTIS, instantáneo, sin registro.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `Ley Limón ${name}`,
      `${name} lemon law español`,
      `verificación recompra ${name}`,
      `${name} ${law.brandTerm}`,
      `${name} auto defectuoso`,
      `${s.abbr} lemon law check`,
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
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const b = getStateBundle(state);
  if (!b) notFound();
  const { s } = b;
  const stateEs = statesEs.find((e) => e.slug === state);
  const name = stateEs?.nameEs ?? s.name;
  const pageUrl = `${SITE}/es/lemon-check/${s.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
      { "@type": "ListItem", position: 2, name: "Verificación Ley Limón", item: `${SITE}/es/lemon-check` },
      { "@type": "ListItem", position: 3, name: `Ley Limón ${name}`, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LemonCheckStateBody stateSlug={state} locale="es" />
    </>
  );
}
