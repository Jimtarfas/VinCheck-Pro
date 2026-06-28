import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import RentalCarCheckBody, { FAQS_FR } from "@/components/RentalCarCheckBody";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/locationl-car-check`;
const alt = hreflangAlternatesForLocale("/locationl-car-check", "fr");
const title = "Verificaci\u00f3n de historique de auto de location par VIN — \u00bfFue este auto de location?";
const description =
  "Revisa si un voiture d’occasion a été previamente un veh\u00edculo de location par VIN. Trouve historique de flota, uso de location de haut kilométrage et propriété comercial anterior avant de acheter.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "verificaci\u00f3n historique auto location",
    "a été este auto de location",
    "historique flota VIN",
    "verificaci\u00f3n VIN auto location",
    "veh\u00edculo ex-location",
    "b\u00fasqueda historique location",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article", inLanguage: "fr",
  headline: title, description,
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-04", dateModified: "2026-06-28",
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Verificaci\u00f3n de auto de location", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <RentalCarCheckBody locale="fr" />
    </>
  );
}
