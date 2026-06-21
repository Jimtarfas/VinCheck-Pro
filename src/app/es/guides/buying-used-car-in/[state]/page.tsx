/**
 * Wave 17e — Spanish wrapper for /es/guides/buying-used-car-in/[state].
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
    "es"
  );
  const title = `Cómo comprar un auto usado en ${name} — Guía completa 2026`;
  const description = `Guía paso a paso para comprar un auto usado en ${name}. Transferencia de título del ${dmvName}, impuesto sobre las ventas, ley lemon de ${name} y requisitos de inspección explicados.`;

  return {
    title: { absolute: `${title} | CarCheckerVIN` },
    description,
    keywords: [
      `comprar auto usado ${name}`,
      `${name} DMV auto usado`,
      `${name} transferencia de título`,
      `${name} impuesto sobre las ventas auto usado`,
      `inspección auto usado ${name}`,
      `${name} ley lemon`,
      `${name} verificación VIN`,
      `cómo comprar auto usado en ${name}`,
      `guía auto usado ${name} ${state.abbr}`,
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

export default async function Page({ params }: Props) {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();
  const stateEs = statesEs.find((s) => s.slug === slug);
  const name = stateEs?.nameEs ?? state.name;

  const pageUrl = `${SITE}/es/guides/buying-used-car-in/${state.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guías",
        item: `${SITE}/es/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Comprar auto usado",
        item: `${SITE}/es/guides/buying-used-car-in`,
      },
      { "@type": "ListItem", position: 4, name, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BuyingUsedCarInStateBody stateSlug={slug} locale="es" />
    </>
  );
}
