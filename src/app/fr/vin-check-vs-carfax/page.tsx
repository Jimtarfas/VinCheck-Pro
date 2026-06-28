/**
 * Wave 18b — French vin-check-vs-carfax. Same full English layout via the
 * shared VinCheckVsCarfaxBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import VinCheckVsCarfaxBody, { FAQS_FR } from "@/components/VinCheckVsCarfaxBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/vin-check-vs-carfax`;
const alt = hreflangAlternatesForLocale("/vin-check-vs-carfax", "fr");
const title = "CarCheckerVIN vs Carfax — Alternative moins chère et plus rapide à la vérification VIN";
const description = "CarCheckerVIN vs Carfax comparadeux côte à côte. Mira tarifs ($14.99 vs $44.99), fuentes de données, rapports incluideux et par qué les conductores están cambiando a una alternative plus inteligente a Carfax.";

export const metadata: Metadata = {
  title, description,
  keywords: ["alternative carfax", "plus barato que carfax", "vérification vin vs carfax", "mejor service vérification vin", "carfax vs autocheck alternative", "rapport historique de véhicule económico", "mejor alternative carfax 2026", "comparaison rapport vin"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "CarCheckerVIN vs Carfax: Cuál es mejor?", description: "Una comparaison côte à côte de CarCheckerVIN et Carfax cubriendo tarifs, fuentes de données, contenideux du rapport et le caso de uso adecuado pour cada uno.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: "2026-04-16" };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "CarCheckerVIN vs Carfax", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <VinCheckVsCarfaxBody locale="fr" />
    </>
  );
}
