/**
 * Wave 18b — French vin-check-vs-bumper. Same full English layout via the
 * shared VinCheckVsBumperBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import VinCheckVsBumperBody, { FAQS_FR } from "@/components/VinCheckVsBumperBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/vin-check-vs-bumper`;
const alt = hreflangAlternatesForLocale("/vin-check-vs-bumper", "fr");
const title = "CarCheckerVIN vs Bumper: tarifs et características comparadeux";
const description = "CarCheckerVIN vs Bumper comparadeux en prix, modèle de description, monitoreo et profondeur du rapport. Mira par que le paiement par uso supétait la description de $19.99/mois de Bumper.";

export const metadata: Metadata = {
  title, description,
  keywords: ["alternative bumper.com", "historique de véhicule bumper", "coût description bumper", "bumper vs", "vale la pena bumper", "avis bumper", "vérification vin sans description", "rapport vin paiement par uso", "cancelar description bumper"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: title, description: "Una comparaison côte à côte de CarCheckerVIN et Bumper couvrant tarifs, modèle de description, monitoreo continuo, contenideux du rapport et le cas de uso adecuado pour chaque unon.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-26", dateModified: "2026-04-26" };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "CarCheckerVIN vs Bumper", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <VinCheckVsBumperBody locale="fr" />
    </>
  );
}
