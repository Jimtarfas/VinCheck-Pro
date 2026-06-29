/**
 * Wave 18b — French vin-check-vs-clearvin. Same full English layout via the
 * shared VinCheckVsClearVinBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import VinCheckVsClearVinBody, { FAQS_FR } from "@/components/VinCheckVsClearVinBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/vin-check-vs-clearvin`;
const alt = hreflangAlternatesForLocale("/vin-check-vs-clearvin", "fr");
const title = "CarCheckerVIN vs ClearVin: côte à côte (2026)";
const description = "CarCheckerVIN vs ClearVin comparadeux en prix, profondeur de marques de titre, photos et qualité du rapport. Un desglose justo 2026 côte à côte pour acheteurs de voitures d’occasion.";

export const metadata: Metadata = {
  title, description,
  keywords: ["alternative clearvin", "coût clearvin", "clearvin confiable", "clearvin vs vincheckpro", "avis clearvin", "meilleur êtrevice vérification titre", "vérification vin avec fotos", "rapport historique de véhicule bon marché", "clearvin ilimitado"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: title, description: "Una comparaison côte à côte de CarCheckerVIN et ClearVin couvrant tarifs, couverture de marques de titre, fotos, valeur de marché et le cas de uso adecuado pour chaque unon.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-26", dateModified: new Date().toISOString().slice(0, 10) };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "CarCheckerVIN vs ClearVin", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <VinCheckVsClearVinBody locale="fr" />
    </>
  );
}
