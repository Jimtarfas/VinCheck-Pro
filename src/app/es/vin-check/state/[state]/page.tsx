/**
 * Spanish dynamic state landing page — /es/vin-check/state/<state>.
 * Wave 18 batch 4 — renders the shared VinCheckStateBody with locale="es"
 * for full visual parity with the EN twin.
 */

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import VinCheckStateBody from "@/components/VinCheckStateBody";
import { states, getStateBySlug, getBrandDescription } from "@/lib/states";
import { getStateEsBySlug, getBrandDescriptionEs } from "@/lib/states-es";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const LOCALE = "es" as const;
const SITE = "https://www.carcheckervin.com";

interface Props {
  params: Promise<{ state: string }>;
}

// Big-5 + Florida have dedicated static pages elsewhere; the Big-5 also
// live as hardcoded /es/vin-check/state/<state> routes that override this
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
  if (!state) return { title: "Revisión VIN" };
  const es = getStateEsBySlug(slug);
  const stateNameEs = es?.nameEs ?? state.name;

  const title = `Revisión VIN ${stateNameEs} gratis — Historial ${state.abbr}`;
  const hook = es?.descriptionHookEs ?? `Detecta marcas salvage, rebuilt e inundación en ${stateNameEs}.`;
  const description = `${hook} Reporte gratis al instante — sin registro, sin tarjeta.`;
  const englishPath = `/vin-check/state/${state.slug}`;
  const alt = hreflangAlternatesForLocale(englishPath, LOCALE);

  return {
    title: { absolute: title },
    description,
    keywords: [
      `revisión VIN ${stateNameEs}`,
      `VIN check ${stateNameEs} español`,
      `historial vehicular ${stateNameEs}`,
      `salvamento ${stateNameEs}`,
      `DMV ${stateNameEs} VIN`,
      `verificar VIN ${state.abbr}`,
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title,
      description,
      url: alt.canonical,
      type: "website",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function StatePageEs({ params }: Props) {
  const { state: slug } = await params;

  if (slug === "florida") {
    redirect("/es/florida-revision-vin");
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

  const url = `${SITE}/es/vin-check/state/${state.slug}`;

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "es",
    name: `Revisión VIN de ${stateNameEs}`,
    description: `Revisión VIN gratis y reporte de historial vehicular en ${stateNameEs}. Marcas de título del ${dmvNameEs} y datos de la Lemon Law.`,
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
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
      { "@type": "ListItem", position: 2, name: "Revisión VIN", item: `${SITE}/es/revision-vin` },
      { "@type": "ListItem", position: 3, name: stateNameEs, item: url },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "es",
    mainEntity: [
      {
        "@type": "Question",
        name: `¿Qué marcas de título usa ${stateNameEs}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `El ${dmvNameEs} señala vehículos con marcas como ${state.titleBrands.join(", ")}. ${brandDescEs}`,
        },
      },
      {
        "@type": "Question",
        name: `¿Tiene ${stateNameEs} una Lemon Law?`,
        acceptedAnswer: { "@type": "Answer", text: `Sí. ${lemonLawNotes}` },
      },
      {
        "@type": "Question",
        name: `¿Qué tiene de único revisar un VIN en ${stateNameEs}?`,
        acceptedAnswer: { "@type": "Answer", text: specialFact },
      },
      {
        "@type": "Question",
        name: `¿La revisión VIN es gratis para vehículos de ${stateNameEs}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Sí. Puedes ejecutar una revisión VIN gratis a cualquier vehículo registrado en ${stateNameEs} para ver marcas de título, registros de salvamento e inundación, historial del odómetro y recalls abiertos antes de comprar — sin registro ni tarjeta.`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <VinCheckStateBody stateSlug={state.slug} locale="es" />
    </>
  );
}
