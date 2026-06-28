import type { Metadata } from "next";
import VinCheckStateBody from "@/components/VinCheckStateBody";
import { getStateBySlug, getBrandDescription } from "@/lib/states";
import { getStateEsBySlug, getBrandDescriptionEs } from "@/lib/states-es";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SLUG = "texas";
const SITE = "https://www.carcheckervin.com";
const state = getStateBySlug(SLUG)!;
const es = getStateEsBySlug(SLUG)!;
const stateNameEs = es.nameEs;
const dmvNameEs = es.dmvNameEs;
const alt = hreflangAlternatesForLocale(`/vin-check/state/${SLUG}`, "fr");
const title = `Vérification VIN ${stateNameEs} gratuit — Historique ${state.abbr}`;
const description = `${es.descriptionHookEs} Rapport gratuit instantanément — sans inscription, sans carte.`;

export const metadata: Metadata = {
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
  openGraph: { title, description, url: alt.canonical, type: "website", locale: "fr_US", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export default function Page() {
  const url = alt.canonical;
  const brandDescEs = getBrandDescriptionEs(state.titleBrands[0], stateNameEs)
    || getBrandDescription(state.titleBrands[0], state.name);

  const webPageJsonLd = {
    "@context": "https://schema.org", "@type": "WebPage", inLanguage: "fr",
    name: `Vérification VIN de ${stateNameEs}`,
    description: `Vérification VIN gratuit et rapport de historique de véhicule en ${stateNameEs}. Marcas de titre du ${dmvNameEs} et données de la Lemon Law.`,
    url,
    isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: SITE },
    about: { "@type": "Place", name: stateNameEs, address: { "@type": "PostalAddress", addressRegion: state.abbr, addressCountry: "US" } },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
      { "@type": "ListItem", position: 2, name: "Vérification VIN", item: `${SITE}/fr/revision-vin` },
      { "@type": "ListItem", position: 3, name: stateNameEs, item: url },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr",
    mainEntity: [
      { "@type": "Question", name: `Qué marques de titre utilise ${stateNameEs}?`, acceptedAnswer: { "@type": "Answer", text: `El ${dmvNameEs} señala véhicules avec marques como ${state.titleBrands.join(", ")}. ${brandDescEs}` } },
      { "@type": "Question", name: `Tiene ${stateNameEs} una Lemon Law?`, acceptedAnswer: { "@type": "Answer", text: `Sí. ${es.lemonLawNotesEs}` } },
      { "@type": "Question", name: `Qué tiene de unique revisar un VIN en ${stateNameEs}?`, acceptedAnswer: { "@type": "Answer", text: es.specialFactEs } },
      { "@type": "Question", name: `La vérification VIN es gratuit pour véhicules de ${stateNameEs}?`, acceptedAnswer: { "@type": "Answer", text: `Sí. Puedes ejecutar una vérification VIN gratuit a n’importe quel véhicule registrado en ${stateNameEs} pour ver marques de titre, enregistrements de récupération e inundación, historique du odomètre et rappels ouverts antes de acheter — sans inscription ni carte.` } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <VinCheckStateBody stateSlug={SLUG} locale="fr" />
    </>
  );
}
