/**
 * French dynamic state landing page — /fr/vin-check/state/<state>.
 * Wave 18 batch 4 — renders the shared VinCheckStateBody with locale="fr"
 * for full visual parity with the EN twin.
 */

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import VinCheckStateBody from "@/components/VinCheckStateBody";
import { states, getStateBySlug, getBrandDescription } from "@/lib/states";
import { getStateEsBySlug, getBrandDescriptionEs } from "@/lib/states-es";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const LOCALE = "fr" as const;
const SITE = "https://www.carcheckervin.com";

interface Props {
  params: Promise<{ state: string }>;
}

// Big-5 + Florida have dedicated static pages elsewhere; the Big-5 also
// live as hardcoded /fr/vin-check/state/<state> routes that override this
// dynamic file at request time. Excluding them from generateStaticParams
// avoids prerender collisions on Vercel.
const STATES_WITH_DEDICATED_ES_PAGE = new Set([
  "california",
  "texas",
  "new-york",
  "illinois",
  "pennsylvania",
  "florida",
]);

export async function generateStaticParams() {
  return states
    .filter((s) => !STATES_WITH_DEDICATED_ES_PAGE.has(s.slug))
    .map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return { title: "Vérification VIN" };
  const es = getStateEsBySlug(slug);
  const stateNameEs = es?.nameEs ?? state.name;

  const title = `Vérification VIN ${stateNameEs} gratuit — Historique ${state.abbr}`;
  const hook = es?.descriptionHookEs ?? `Detecta marques salvage, rebuilt e inundación en ${stateNameEs}.`;
  const description = `${hook} Rapport gratuit instantanément — sans inscription, sans carte.`;
  const englishPath = `/vin-check/state/${state.slug}`;
  const alt = hreflangAlternatesForLocale(englishPath, LOCALE);

  return {
    title: { absolute: title },
    description,
    keywords: [
      `vérification VIN ${stateNameEs}`,
      `VIN check ${stateNameEs} français`,
      `historique de véhicule ${stateNameEs}`,
      `récupération ${stateNameEs}`,
      `DMV ${stateNameEs} VIN`,
      `vérifier VIN ${state.abbr}`,
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title,
      description,
      url: alt.canonical,
      type: "website",
      locale: "fr_US",
      siteName: "CarCheckerVIN",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function StatePageEs({ params }: Props) {
  const { state: slug } = await params;

  if (slug === "florida") {
    redirect("/fr/florida-revision-vin");
  }

  const state = getStateBySlug(slug);
  if (!state) notFound();
  const es = getStateEsBySlug(slug);
  const stateNameEs = es?.nameEs ?? state.name;
  const dmvNameEs = es?.dmvNameEs ?? state.dmvName;
  const lemonLawNotes = es?.lemonLawNotesEs ?? state.lemonLawNotes;
  const specialFact = es?.specialFactEs ?? state.specialFact;
  const brandDescEs = getBrandDescriptionEs(state.titleBrands[0], stateNameEs)
    || getBrandDescription(state.titleBrands[0], state.name);

  const url = `${SITE}/fr/vin-check/state/${state.slug}`;

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "fr",
    name: `Vérification VIN de ${stateNameEs}`,
    description: `Vérification VIN gratuit et rapport de historique de véhicule en ${stateNameEs}. Marcas de titre du ${dmvNameEs} et données de la Lemon Law.`,
    url,
    isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: SITE },
    about: {
      "@type": "Place",
      name: stateNameEs,
      address: {
        "@type": "PostalAddress",
        addressRegion: state.abbr,
        addressCountry: "US",
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
      { "@type": "ListItem", position: 2, name: "Vérification VIN", item: `${SITE}/fr/revision-vin` },
      { "@type": "ListItem", position: 3, name: stateNameEs, item: url },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "fr",
    mainEntity: [
      {
        "@type": "Question",
        name: `Qué marques de titre utilise ${stateNameEs}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `El ${dmvNameEs} señala véhicules avec marques como ${state.titleBrands.join(", ")}. ${brandDescEs}`,
        },
      },
      {
        "@type": "Question",
        name: `Tiene ${stateNameEs} una Lemon Law?`,
        acceptedAnswer: { "@type": "Answer", text: `Sí. ${lemonLawNotes}` },
      },
      {
        "@type": "Question",
        name: `Qué tiene de unique revisar un VIN en ${stateNameEs}?`,
        acceptedAnswer: { "@type": "Answer", text: specialFact },
      },
      {
        "@type": "Question",
        name: `La vérification VIN es gratuit pour véhicules de ${stateNameEs}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Sí. Puedes ejecutar una vérification VIN gratuit a n’importe quel véhicule registrado en ${stateNameEs} pour ver marques de titre, enregistrements de récupération e inundación, historique du odomètre et rappels ouverts antes de acheter — sans inscription ni carte.`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <VinCheckStateBody stateSlug={state.slug} locale="fr" />
    </>
  );
}
