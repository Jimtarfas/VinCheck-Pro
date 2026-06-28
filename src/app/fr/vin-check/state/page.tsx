/**
 * French state hub — /fr/vin-check/state.
 * Wave 18.19 — slim wrapper delegating to VinCheckStateHubBody with locale="fr"
 * for full visual parity with the EN twin at /vin-check/state.
 */

import type { Metadata } from "next";
import { ORG_AUTHOR } from "@/lib/seo/author";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import VinCheckStateHubBody, { FAQS_FR } from "@/components/VinCheckStateHubBody";

const SITE = "https://www.carcheckervin.com";
const LOCALE = "fr" as const;

const alt = hreflangAlternatesForLocale("/vin-check/state", LOCALE);
const URL = `${SITE}/fr/vin-check/state`;

const title = "Vérification VIN par état — Titre et historique gratuit en les 50 états";
const description =
  "Vérification VIN gratuit pour cada état de EE. UU. Encuentra ta état pour les reglas locales du DMV et marques de titre, luego ejecuta un rapport nacional instantanément avec données de NMVTIS. Sin enregistrement, sans carte de crédito.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "vérification VIN par état",
    "vérification VIN gratuit par état",
    "búsqueda VIN DMV estatal",
    "historique de véhicule par état",
    "décodeur VIN todeux les états",
    "vérification VIN 50 états",
    "vérification marques de titre état",
    "búsqueda VIN EE. UU.",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    type: "article",
    url: URL,
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vérification VIN par état — Los 50 états de EE. UU.",
    description,
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Vérification VIN par état — Historique du véhicule gratuit en les 50 états de EE. UU.",
  description:
    "Guía pour hacer una vérification VIN gratuit en n’importe quel état de EE. UU. Cubre comment funcionan les données nacionales de NMVTIS, par qué les marques de titre difieren de un état a otro et comment leer un rapport de historique de véhicule par état.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": URL },
  datePublished: "2026-06-13",
  dateModified: "2026-06-13",
  image: `${SITE}/opengraph-image`,
  about: {
    "@type": "Country",
    name: "United States",
    sameAs: "https://en.wikipedia.org/wiki/United_States",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment hacer una vérification VIN en n’importe quel état",
  description:
    "Guía paso a paso pour hacer una vérification VIN gratuit pour un véhicule registrado en n’importe quel état de EE. UU.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Encuentra ta état", text: "Utilise le buscador de états en la parte superior de esta página pour abrir la página du état donde le véhicule está titulado et aprender ses reglas locales du DMV et marques de titre." },
    { "@type": "HowToStep", position: 2, name: "Localiza le VIN", text: "Encuentra le VIN de 17 caracteres en le tablero (visible par le parabrisas), le marco de la puerta du lado du conductor ou le documento du titre." },
    { "@type": "HowToStep", position: 3, name: "Ingresa le VIN", text: "Escribe ou pega le VIN en la casilla de búsqueda. La même búsqueda funciona pour un véhicule titulado en n’importe quel état." },
    { "@type": "HowToStep", position: 4, name: "Revisa le rapport nacional", text: "Lee le rapport consolidado que cubre marques de titre de cada état, enregistrements de accidents, lecturas du odomètre et état de rappels." },
    { "@type": "HowToStep", position: 5, name: "Cruza les reglas estatales", text: "Compara n’importe quel marque de titre contra les definiciones du DMV de ta état pour entender exactamente qué significa antes de acheter." },
  ],
};

const serviceRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Vérification VIN par état",
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
    { "@type": "ListItem", position: 2, name: "Vérification VIN", item: `${SITE}/fr/revision-vin` },
    { "@type": "ListItem", position: 3, name: "Par état", item: URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "fr",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: URL,
};

export default function StateIndexPageEs() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <VinCheckStateHubBody locale="fr" />
    </>
  );
}
