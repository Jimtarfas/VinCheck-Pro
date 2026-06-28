/**
 * Wave 18b — French vin-check-vs-vinaudit. Same full English layout via the
 * shared VinCheckVsVinAuditBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import VinCheckVsVinAuditBody, { FAQS_FR } from "@/components/VinCheckVsVinAuditBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/vin-check-vs-vinaudit`;
const alt = hreflangAlternatesForLocale("/vin-check-vs-vinaudit", "fr");
const title = "CarCheckerVIN vs VinAudit: Quel décodeur VIN gana?";
const description = "CarCheckerVIN vs VinAudit comparado en precio, profondeur de données NMVTIS, vitesse du rapport et presentación. Un desglose justo côte à côte pour acheteurs que buscan un décodeur VIN.";

export const metadata: Metadata = {
  title, description,
  keywords: ["alternative vinaudit", "coût vinaudit", "vinaudit vs", "es vinaudit confiable", "avis vinaudit", "alternative rapport nmvtis", "meilleur décodeur vin 2026", "vérification vin bon marché"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: title,
  description: "Una comparaison côte à côte de CarCheckerVIN et VinAudit couvrant tarifs, autorisation NMVTIS, contenideux du rapport et le cas de uso adecuado pour cada unonn.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-26",
  dateModified: "2026-04-26",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "CarCheckerVIN vs VinAudit", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <VinCheckVsVinAuditBody locale="fr" />
    </>
  );
}
