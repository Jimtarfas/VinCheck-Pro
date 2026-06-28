/**
 * Wave 18d — French research page. Same full English layout via the
 * shared ResearchBody. Replaces the Wave 14 InfoPage stub.
 */

import type { Metadata } from "next";
import ResearchBody, { RESEARCH_FAQS_FR, STUDIES } from "@/components/ResearchBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/research`;
const alt = hreflangAlternatesForLocale("/research", "fr");
const title = "Recherche et études de données sur les véhicules";
const description =
  "Recherche original de CarCheckerVIN: rankings de vols, patrones de migración de récupération, études de dégradation de batteries de véhicules eléctricos, rastreo de véhicules par huracanes et analyse de tarifs de voitures d’occasion.";

export const metadata: Metadata = {
  title, description,
  keywords: [
    "recherche historique de véhicule",
    "recherche carcheckervin",
    "véhicules plus volés 2026",
    "recherche titre récupération",
    "étude tarifs voiture d’occasion",
    "étude dégradation batterie ev",
    "véhicules dañadeux par huracán",
    "estadísticas rachat limones",
    "étude données automotriz",
    "données vol nicb",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: RESEARCH_FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Recherche", item: PAGE_URL },
  ],
};

const datasetSchemas = STUDIES.map((s) => ({
  "@context": "https://schema.org",
  "@type": "Dataset",
  inLanguage: "fr",
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
      <ResearchBody locale="fr" />
    </>
  );
}
