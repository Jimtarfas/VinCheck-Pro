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
const alt = hreflangAlternatesForLocale(`/vin-check/state/${SLUG}`, "es");
const title = `Revisión VIN ${stateNameEs} gratis — Historial ${state.abbr}`;
const description = `${es.descriptionHookEs} Reporte gratis al instante — sin registro, sin tarjeta.`;

export const metadata: Metadata = {
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
  openGraph: { title, description, url: alt.canonical, type: "website", locale: "es_US", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export default function Page() {
  const url = alt.canonical;
  const brandDescEs = getBrandDescriptionEs(state.titleBrands[0], stateNameEs)
    || getBrandDescription(state.titleBrands[0], state.name);

  const webPageJsonLd = {
    "@context": "https://schema.org", "@type": "WebPage", inLanguage: "es",
    name: `Revisión VIN de ${stateNameEs}`,
    description: `Revisión VIN gratis y reporte de historial vehicular en ${stateNameEs}. Marcas de título del ${dmvNameEs} y datos de la Lemon Law.`,
    url,
    isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: SITE },
    about: { "@type": "Place", name: stateNameEs, address: { "@type": "PostalAddress", addressRegion: state.abbr, addressCountry: "US" } },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
      { "@type": "ListItem", position: 2, name: "Revisión VIN", item: `${SITE}/es/revision-vin` },
      { "@type": "ListItem", position: 3, name: stateNameEs, item: url },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es",
    mainEntity: [
      { "@type": "Question", name: `¿Qué marcas de título usa ${stateNameEs}?`, acceptedAnswer: { "@type": "Answer", text: `El ${dmvNameEs} señala vehículos con marcas como ${state.titleBrands.join(", ")}. ${brandDescEs}` } },
      { "@type": "Question", name: `¿Tiene ${stateNameEs} una Lemon Law?`, acceptedAnswer: { "@type": "Answer", text: `Sí. ${es.lemonLawNotesEs}` } },
      { "@type": "Question", name: `¿Qué tiene de único revisar un VIN en ${stateNameEs}?`, acceptedAnswer: { "@type": "Answer", text: es.specialFactEs } },
      { "@type": "Question", name: `¿La revisión VIN es gratis para vehículos de ${stateNameEs}?`, acceptedAnswer: { "@type": "Answer", text: `Sí. Puedes ejecutar una revisión VIN gratis a cualquier vehículo registrado en ${stateNameEs} para ver marcas de título, registros de salvamento e inundación, historial del odómetro y recalls abiertos antes de comprar — sin registro ni tarjeta.` } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <VinCheckStateBody stateSlug={SLUG} locale="es" />
    </>
  );
}
