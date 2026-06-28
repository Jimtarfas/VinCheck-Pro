import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import RentalCarCheckBody, { FAQS_ES } from "@/components/RentalCarCheckBody";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/rental-car-check`;
const alt = hreflangAlternatesForLocale("/rental-car-check", "es");
const title = "Verificaci\u00f3n de historial de auto de renta por VIN — \u00bfFue este auto de renta?";
const description =
  "Revisa si un auto usado fue previamente un veh\u00edculo de renta por VIN. Encuentra historial de flota, uso de renta de alto kilometraje y propiedad comercial anterior antes de comprar.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "verificaci\u00f3n historial auto renta",
    "fue este auto de renta",
    "historial flota VIN",
    "verificaci\u00f3n VIN auto renta",
    "veh\u00edculo ex-renta",
    "b\u00fasqueda historial renta",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article", inLanguage: "es",
  headline: title, description,
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-04", dateModified: "2026-06-28",
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Verificaci\u00f3n de auto de renta", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <RentalCarCheckBody locale="es" />
    </>
  );
}
