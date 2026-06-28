/**
 * Wave 17 — French dynamic template for /fr/lemon-check/[state].
 * Renders the SAME full English layout via the shared
 * LemonCheckStateBody component (Wave 17 pattern), differing only by
 * locale="fr" and French metadata + JSON-LD.
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

  const alt = hreflangAlternatesForLocale(`/lemon-check/${s.slug}`, "fr");
  const title = `Vérification Loi Citron ${name} par VIN — Recherche gratuite de rachat`;
  const description = `Vérification gratuit de Loi Citron en ${name} par VIN. Ve si un auto a été rachat du fabricante sous la Loi Citron de ${name} (${law.coveragePeriod}). Respaldado par NMVTIS, instantané, sans inscription.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `Loi Citron ${name}`,
      `${name} citron law français`,
      `vérification rachat ${name}`,
      `${name} ${law.brandTerm}`,
      `${name} auto defectuoso`,
      `${s.abbr} citron law check`,
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
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const b = getStateBundle(state);
  if (!b) notFound();
  const { s } = b;
  const stateEs = statesEs.find((e) => e.slug === state);
  const name = stateEs?.nameEs ?? s.name;
  const pageUrl = `${SITE}/fr/lemon-check/${s.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
      { "@type": "ListItem", position: 2, name: "Vérification Loi Citron", item: `${SITE}/fr/lemon-check` },
      { "@type": "ListItem", position: 3, name: `Loi Citron ${name}`, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LemonCheckStateBody stateSlug={state} locale="fr" />
    </>
  );
}
