/**
 * Wave 17e — French wrapper for /fr/guides/buying-used-car-in/[state].
 * Replaces the Wave 15 SpecialtyToolPage stub with the full bilingual
 * BuyingUsedCarInStateBody at visual parity with the English page.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BuyingUsedCarInStateBody from "@/components/BuyingUsedCarInStateBody";
import { states, getStateBySlug } from "@/lib/states";
import { statesEs } from "@/lib/states-es";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";

interface Props {
  params: Promise<{ state: string }>;
}

export function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return {};
  const stateEs = statesEs.find((s) => s.slug === slug);
  const name = stateEs?.nameEs ?? state.name;
  const dmvName = stateEs?.dmvNameEs ?? state.dmvName;

  const alt = hreflangAlternatesForLocale(
    `/guides/buying-used-car-in/${state.slug}`,
    "fr"
  );
  const title = `Comment acheter une voiture d’occasion en ${name} — Guide complet 2026`;
  const description = `Guide pas à pas pour acheter une voiture d’occasion en ${name}. Transfert de titre du ${dmvName}, taxe de vente, loi citron de ${name} et exigences d’inspection expliquées.`;

  return {
    title: { absolute: `${title} | CarCheckerVIN` },
    description,
    keywords: [
      `acheter voiture d’occasion ${name}`,
      `${name} DMV voiture d’occasion`,
      `${name} transferencia de titre`,
      `${name} taxe de vente voiture d’occasion`,
      `inspección voiture d’occasion ${name}`,
      `${name} loi citron`,
      `${name} vérification VIN`,
      `comment acheter voiture d’occasion en ${name}`,
      `guide voiture d’occasion ${name} ${state.abbr}`,
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

export default async function Page({ params }: Props) {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();
  const stateEs = statesEs.find((s) => s.slug === slug);
  const name = stateEs?.nameEs ?? state.name;

  const pageUrl = `${SITE}/fr/guides/buying-used-car-in/${state.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guías",
        item: `${SITE}/fr/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Comprar voiture d’occasion",
        item: `${SITE}/fr/guides/buying-used-car-in`,
      },
      { "@type": "ListItem", position: 4, name, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BuyingUsedCarInStateBody stateSlug={slug} locale="fr" />
    </>
  );
}
