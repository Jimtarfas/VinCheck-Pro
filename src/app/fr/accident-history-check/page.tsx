/**
 * Wave 18a — French accident-history-check.
 * Renders the SAME full English layout via the shared
 * AccidentHistoryCheckBody component. Replaces the Wave 15
 * SpecialtyToolPage stub with true visual parity.
 */

import type { Metadata } from "next";
import AccidentHistoryCheckBody, { FAQS_FR } from "@/components/AccidentHistoryCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/accident-history-check`;

const alt = hreflangAlternatesForLocale("/accident-history-check", "fr");
const title = "Vérification du historique de accidents par VIN — Rapports de choques";
const description =
  "Vérifie le historique de accidents de un véhicule par VIN: choques reportadeux, réclamations de assurances et enregistrements de dégâtss. Detecta dégâtss ocultos par collision avant de acheter.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "historique de accidents par VIN",
    "vérification de accidents véhicule",
    "rapport accident auto VIN",
    "vérification historique choques",
    "consultatioptiontioptiontioption accident VIN",
    "vérifier auto par accidents VIN",
    "historique de dégâtss véhicule",
    "rapport de colisiones",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Vérification du historique de accidents du véhicule",
  description:
    "Apprends comment se reporta le historique de accidents, que aparece en un rapport de choques basado en VIN et comment identificar dégâtss ocultos en un voiture d’occasion.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-16",
  dateModified: new Date().toISOString().slice(0, 10),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Vérification de historique de accidents",
      item: PAGE_URL,
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AccidentHistoryCheckBody locale="fr" />
    </>
  );
}
