/**
 * Wave 18a — French rappel-check. Same full English layout via the
 * shared RecallCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import RecallCheckBody, { FAQS_FR } from "@/components/RecallCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/rappel-check`;
const alt = hreflangAlternatesForLocale("/rappel-check", "fr");
const title = "Vérification VIN de rappels — Recherche de rappels de sécurité NHTSA ouverts";
const description = "Vérifie n’importe quel VIN par rappels de sécurité NHTSA ouverts. Mira le componente afectado, numéro de campaña, resumen du defecto, riesgo de sécurité et la réparation gratuite du concessionnaire avant de acheter. Vista previa gratuite, sans inscription, resultadeux en segundeux.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification VIN rappel", "búsqueda rappel NHTSA", "rappel ouvert par VIN", "vérification rappel sécurité", "búsqueda rappel véhicule", "rappel auto VIN", "vérification rappel bolsa aire Takata", "mi auto a rappel"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Mira rappels de sécurité NHTSA ouverts pour n’importe quel VIN: componente afectado, numéro de campaña, defecto, riesgo et la réparation gratuite du concessionnaire." },
  robots: { index: true, follow: true },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: title, description: "Guía pour vérifier un véhicule par rappels de sécurité NHTSA ouverts par VIN. Couvre comment funciona la coincidencia de rappels a nivel VIN, rappels ouverts verses complètedeux, la campaña Takata, la réparation gratuite du concessionnaire et comment leer un rapport de rappels avant de acheter.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-14" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Vérification de rappels", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <RecallCheckBody locale="fr" />
    </>
  );
}
