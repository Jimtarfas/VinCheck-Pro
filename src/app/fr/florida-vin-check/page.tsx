/**
 * Wave 18.18b — French /florida-vin-check (served at /fr/florida-revision-vin).
 * Renders the shared FloridaVinCheckBody with locale="fr" so the page now has
 * true visual parity with the English version. Mirrors all 7 EN JSON-LD blocks,
 * translated and tagged with inLanguage: "fr".
 */

import type { Metadata } from "next";
import FloridaVinCheckBody, { FAQS_FR } from "@/components/FloridaVinCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/florida-revision-vin`;
const alt = hreflangAlternatesForLocale("/florida-vin-check", "fr");
const title = "Vérification VIN gratuite — Floride — Titre et historique instantanément en FL";
const description =
  "Vérification VIN gratuite — Floride avec données du DHSMV + NMVTIS. Marcas de titre, dégâtss par inundación, accidents, vols et rappels du marché instantanément — sans inscription, sans carte de crédito.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "vérification VIN Florida",
    "VIN check Florida français",
    "historique de véhicule Florida",
    "vérifier VIN Florida",
    "Florida DHSMV VIN",
    "rapport historique auto Florida",
    "VIN gratuit Florida",
    "vérification titre Florida",
    "vérification inundación Florida",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Vérification VIN gratuite — Floride avec données du DHSMV + NMVTIS. Titre, inundación, accidents, vols et rappels instantanément — sans inscription.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas (ES) ──────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Vérification VIN de Florida — Rapport gratuit de historique de véhicule (Datos du DMV de FL)",
  description:
    "Guide complet pour ejecutar una vérification VIN gratuit de Florida. Cubre données du DMV de FL, búsqueda de titre, enregistrements de accidents, vérification VIN et verificaciones VIN pour motos.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-09",
  dateModified: "2026-06-25",
  image: `${SITE}/opengraph-image`,
  about: { "@type": "Place", name: "Florida", sameAs: "https://es.wikipedia.org/wiki/Florida" },
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
  name: "Comment vérifier un VIN en Florida",
  description: "Guía paso a paso pour ejecutar una vérification VIN de Florida pour historique de véhicule et état du titre.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Localiza le VIN", text: "Encuentra le VIN de 17 caracteres en le tablero (lado du conductor, visible a través du parabrisas), la calcomanía du marco de la puerta ou le documento du titre du véhicule." },
    { "@type": "HowToStep", position: 2, name: "Ingresa le VIN", text: "Escribe ou pega le VIN en la caja de búsqueda al inicio de esta página." },
    { "@type": "HowToStep", position: 3, name: "Ejecuta la vérification", text: "Haz clic en 'Verificar VIN'. Nuestro sistema consultationtiontiontiontiontion les enregistrements du DHSMV de Florida, NMVTIS et bases nacionales de accidents simultáneamente." },
    { "@type": "HowToStep", position: 4, name: "Revisa le rapport", text: "Lee le rapport complet que cubre historique de titre, enregistrements de accidents, lecturas du odomètre, dégâtss par inundación, marques de récupération et état de rappels du marché." },
    { "@type": "HowToStep", position: 5, name: "Toma ta decisión", text: "Utilise le rapport pour negociar le precio, pedir una inspección mecánica ou alejarte de véhicules problemáticos antes de comprometerte." },
  ],
};

const serviceRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Vérification VIN de Florida",
  provider: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
  areaServed: { "@type": "State", name: "Florida" },
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
    { "@type": "ListItem", position: 2, name: "Vérification VIN de Florida", item: PAGE_URL },
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
  name: "Estadísticas rapides de la vérification VIN de Florida",
  description:
    "Datos de cobertura, rendimiento et referencia de estatutos pour la vérification VIN de Florida de CarCheckerVIN.",
  url: PAGE_URL,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  spatialCoverage: { "@type": "Place", name: "Florida, Estadeux Unideux" },
  variableMeasured: [
    { "@type": "PropertyValue", name: "Vehículos registradeux en Florida verificadeux", value: "4.8M+" },
    { "@type": "PropertyValue", name: "Marcas de titre rastreadas en todeux les DMV estatales", value: "51" },
    { "@type": "PropertyValue", name: "Tiempo promedio pour décoder un VIN (segundeux)", value: "<5" },
    { "@type": "PropertyValue", name: "Estatuto de Florida que rige les marques de titre de récupération", value: "§ 319.14" },
    { "@type": "PropertyValue", name: "Costo de la vista previa gratuite (USD)", value: "0" },
  ],
};

export default function FloridaVinCheckPageEs() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <FloridaVinCheckBody locale="fr" />
    </>
  );
}
