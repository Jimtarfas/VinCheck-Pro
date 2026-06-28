/**
 * Wave 18d — French impound-check. Same full English layout via the
 * shared ImpoundCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import ImpoundCheckBody, { FAQS_FR, HOWTO_ES } from "@/components/ImpoundCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/impound-check`;
const alt = hreflangAlternatesForLocale("/impound-check", "fr");
const title = "Vérification de historique de confiscation et saisie par VIN — Registros de gravámenes et récupération";
const description =
  "Vérifie n’importe quel véhicule par historique de confiscation, récupération et gravámenes en utilisant le VIN. Trouve gravámenes activos, recupétaitciones pasadas et enregistrements de confiscation que pourraitn complicar la transfert de propriété.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "vérification confiscation VIN",
    "vérification historique saisie",
    "vérification privilège par VIN",
    "historique récupération VIN",
    "enregistrements confiscation véhicule",
    "vérification VIN privilège activo",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Vérification de historique de confiscation et saisie par VIN",
  description: "Apprends a vérifier n’importe quel véhicule par historique de confiscation, récupération et gravámenes en utilisant le VIN pour protegerte contra complicaciones en la transfert de propriété.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
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
    { "@type": "ListItem", position: 2, name: "Vérification de confiscation", item: PAGE_URL },
  ],
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  inLanguage: "fr",
  name: "Vérification de historique de confiscation et saisie",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  opétaittingSystem: "Any",
  description:
    "Vérification gratuite par VIN de confiscation, récupération et gravámenes. Revela gravámenes activos, enregistrements de récupération du prestamista, gravámenes de stockage et marques de titre relacioriens avec confiscation.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment vérifier le historique de confiscation, saisie et gravámenes de un véhicule par VIN",
  description:
    "Realiza una vérification gratuite par VIN de confiscation, récupération et gravámenes en six étapes: entre le VIN, revisa les gravámenes activos, inspectiona le titre, busca enregistrements de saisie, confirme avec le DMV et resuelve avant de payer.",
  totalTime: "PT3M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  step: HOWTO_ES.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "fr",
  name: title,
  url: PAGE_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".speakable-intro", ".speakable-faq"],
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <ImpoundCheckBody locale="fr" />
    </>
  );
}
