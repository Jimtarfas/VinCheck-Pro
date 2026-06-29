/**
 * Wave 18d — French dealer-check. Same full English layout via the
 * shared DealerCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import DealerCheckBody, { FAQS_FR } from "@/components/DealerCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/dealer-check`;
const alt = hreflangAlternatesForLocale("/dealer-check", "fr");
const title = "Vérification de historique de concessionnaire par VIN — Este auto a été demo ou de corteouia?";
const description = "Vérifie si un véhicule a été usado como demo de concessionnaire, auto de corteouia ou auto de flota de presse par VIN. Trouve enregistrements de propriété du concessionnaire, accumulation de kilométrage avant de vente et uso comercial.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification demo concessionnaire VIN", "historique auto de corteouia", "historique auto concessionnaire", "véhicule demo VIN", "vérification flota de presse", "historique propriété concessionnaire"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Vérification de historique de concessionnaire par VIN", description: "Apprends a vérifier si un véhicule a été usado como demo de concessionnaire, auto de corteouia ou auto de flota de presse par VIN.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10) };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Vérification de concessionnaire", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <DealerCheckBody locale="fr" />
    </>
  );
}
