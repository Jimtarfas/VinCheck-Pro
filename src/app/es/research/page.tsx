/**
 * Wave 18d — Spanish research page. Same full English layout via the
 * shared ResearchBody. Replaces the Wave 14 InfoPage stub.
 */

import type { Metadata } from "next";
import ResearchBody, { RESEARCH_FAQS_ES, STUDIES } from "@/components/ResearchBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/research`;
const alt = hreflangAlternatesForLocale("/research", "es");
const title = "Investigación y estudios de datos vehiculares";
const description =
  "Investigación original de CarCheckerVIN: rankings de robos, patrones de migración de salvamento, estudios de degradación de baterías de vehículos eléctricos, rastreo de vehículos por huracanes y análisis de precios de autos usados.";

export const metadata: Metadata = {
  title, description,
  keywords: [
    "investigación historial vehicular",
    "investigación carcheckervin",
    "vehículos más robados 2026",
    "investigación título salvamento",
    "estudio precios auto usado",
    "estudio degradación batería ev",
    "vehículos dañados por huracán",
    "estadísticas recompra limones",
    "estudio datos automotriz",
    "datos robo nicb",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: RESEARCH_FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Investigación", item: PAGE_URL },
  ],
};

const datasetSchemas = STUDIES.map((s) => ({
  "@context": "https://schema.org",
  "@type": "Dataset",
  inLanguage: "es",
  name: s.title,
  description: s.summary,
  creator: { "@type": "Organization", name: "CarCheckerVIN Editorial Team", url: SITE },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  license: "https://creativecommons.org/licenses/by/4.0/",
  url: `${SITE}/es${s.href}`,
  keywords: s.tag,
  datePublished: "2026-04-01",
}));

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {datasetSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <ResearchBody locale="es" />
    </>
  );
}
