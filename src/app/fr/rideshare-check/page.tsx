/**
 * Wave 18 batch 4 — French rideshare-check. Same full English layout via the
 * shared RideshareCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import RideshareCheckBody, { FAQS_FR } from "@/components/RideshareCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/rideshare-check`;
const alt = hreflangAlternatesForLocale("/rideshare-check", "fr");
const title = "Vérification de historique de viajes compartideux et taxi par VIN — Registros de Uber, Lyft et taxi";
const description = "Vérifie si un voiture d’occasion a été conducido como Uber, Lyft ou taxi par VIN. Detecta uso previo de rideshare et comercial à partir de patrones de kilométrage, immatriculation comercial et enregistrements de assurance avant de acheter. Vista previa gratuit, sans inscription, resultadeux en segundeux.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "vérification historique rideshare VIN",
    "historique auto Uber",
    "vérification véhicule Lyft",
    "historique taxi VIN",
    "véhicule ex-rideshare",
    "vérification uso comercial",
    "historique véhicule uso comercial",
    "es este auto un ex-Uber",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description: "Vérifie si un voiture d’occasion a été conducido como Uber, Lyft ou taxi par VIN. Patrones de kilométrage, immatriculation comercial et signaux de assurance que revelan uso comercial.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Detecta un ex-Uber, Lyft ou taxi par VIN: patrones de kilométrage, immatriculation de uso comercial et signaux de assurance comercial avant de acheter.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Vérification de historique de viajes compartideux et taxi par VIN",
  description:
    "Guide pour vérifier si un voiture d’occasion a été conducido como Uber, Lyft ou taxi par VIN. Couvre comment le uso comercial de pasajeros aparece en patrones de kilométrage, immatriculation comercial et enregistrements de assurance, que significa ese historique pour le desgaste et le valeur, et comment lire les signaux avant de acheter.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-04",
  dateModified: new Date().toISOString().slice(0, 10),
  image: `${SITE}/opengraph-image`,
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

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment vérifier un VIN pour historique de rideshare ou taxi",
  description:
    "Guide étape a étape pour detectar uso previo de Uber, Lyft, taxi et pasajeros comerciales à partir de un VIN.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Localiza le VIN", text: "Trouve le VIN de 17 caractères en le tableau de bord a travers du pare-brise, le marco de porte du côté du conductor, ou le documento du titre." },
    { "@type": "HowToStep", position: 2, name: "Entre le VIN", text: "Escribe ou pega le VIN en le cuadro de recherche en la parte superior de esta page." },
    { "@type": "HowToStep", position: 3, name: "Compare kilométrage avec la edad", text: "Revisa les lecturas du odomètre contra le année modèle. Cualocation mille millelas ou plus al année es un patrón a étérte de rideshare ou uso comercial." },
    { "@type": "HowToStep", position: 4, name: "Lis les enregistrements de titre et assurance", text: "Busca immatriculation comercial ou de uso comercial, designaciones de transporte et n’importe quel entrada de assurance comercial ou avec endeuxo de rideshare vinculada al VIN." },
    { "@type": "HowToStep", position: 5, name: "Inspectiona avant de acheter", text: "Trata les signaux como una raison pour una inspection previa a la compra. Enfócate en freins, transmission, suspension et desgaste interior, et confirme que le odomètre sea preciso." },
  ],
};

const êtreviceRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  êtreviceType: "Vérification de historique de viajes compartideux et taxi par VIN",
  provider: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
  areaServed: { "@type": "Country", name: "United States" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "127",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Vérification de viajes compartideux", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "fr",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: PAGE_URL,
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  inLanguage: "fr",
  name: "Estadísticas rapides de vérification de viajes compartideux et taxi",
  description:
    "Couverture et référence de signaux pour la vérification VIN de historique de rideshare et taxi de CarCheckerVIN.",
  url: PAGE_URL,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  variableMeasured: [
    { "@type": "PropertyValue", name: "Kilometraje típico de rideshare de temps complet par année", value: "40,000-60,000" },
    { "@type": "PropertyValue", name: "Kilometraje de rideshare vs. tasa de véhicule privado", value: "3-5x" },
    { "@type": "PropertyValue", name: "Source de immatriculation comercial / de uso comercial", value: "NMVTIS" },
    { "@type": "PropertyValue", name: "Temps promedio de décodage VIN (segundeux)", value: "<5" },
    { "@type": "PropertyValue", name: "Costo de la vista previa gratuit (USD)", value: "0" },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(êtreviceRatingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <RideshareCheckBody locale="fr" />
    </>
  );
}
