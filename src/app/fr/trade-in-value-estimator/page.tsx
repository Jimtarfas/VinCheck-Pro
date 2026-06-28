/**
 * Wave 18.19 — French reprise-value-estimator. Same full English layout via
 * the shared TradeInValueEstimatorBody. Replaces the previous SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import TradeInValueEstimatorBody, { FAQS_FR } from "@/components/TradeInValueEstimatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/reprise-value-estimator`;
const alt = hreflangAlternatesForLocale("/reprise-value-estimator", "fr");
const title = "Estimador de valeur de intercambio — Combien vale mi auto? (Gratuit)";
const description =
  "Estimador gratuit de valeur de intercambio. Entre année, marque, modèle, kilométrage, condition et historique de ta véhicule pour estimar instantanément le valeur de vente particular, intercambio en concessionnaire, oferta de effectif instantanée et valeur de enchère.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "estimateur valeur de intercambio",
    "valeur intercambio auto",
    "combien vale mi auto",
    "calculateur intercambio auto",
    "valeur de intercambio véhicule",
    "estimateur valeur auto",
    "calculateur valeur intercambio auto",
    "que vale mi auto",
    "valeur intercambio par année marque modèle",
    "KBB valeur intercambio",
    "valeur intercambio concessionnaire",
    "oferta de effectif instantanée auto",
    "valeur auto par kilométrage",
    "valeur intercambio avec titre récupération",
    "valeur de vente particular",
    "valeur de mayoreo auto",
    "valeur de enchère auto",
    "calculateur de estimation voiture d’occasion",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Calculateur gratuit de valeur de intercambio. Ve les valeures de vente particular, intercambio en concessionnaire, oferta de effectif instantanée et enchère basadeux en année, marque, kilométrage, condition e historique.",
  },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "fr",
  name: "Estimador de valeur de intercambio",
  description:
    "Estimador gratuit de valeur de intercambio. Entre année, marque, modèle, kilométrage, condition, état de titre et historique de accidents pour obtener estimaciones de vente particular, intercambio en concessionnaire, oferta de effectif instantanée et valeur de enchère.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browêtre",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Estimation de vente particular",
    "Estimation de intercambio en concessionnaire",
    "Estimation de oferta de effectif instantanée",
    "Valor de enchère / mayoreo",
    "30 marques avec tasas de rétention spécifiques",
    "Multiplicadores de condition (Excelente a Pobre)",
    "Deducciones par marque de titre (Récupération, Inondation, Reconstruido)",
    "Ajustes par historique de accidents et propriétaires",
    "Desglose de valeur étape a étape",
  ],
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment estimar le valeur de intercambio de ta auto",
  description:
    "Utilise le estimateur gratuit de valeur de intercambio de CarCheckerVIN pour obtener estimaciones de vente particular, concessionnaire et oferta de effectif instantanée en minutes.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Entre les detalles du véhicule",
      text: "Sélectionne le année, marque, modèle, tipo de carrosêtreie et MSRP original. Le prix de étiquette original ancla le cálculo de dépréciation.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Entre le kilométrage et la condition",
      text: "Escribe la lectura actual du odomètre et sélectionne la nonte de condition de Excelente a Pobre. La condition es la variable plus grand en la évaluation de voitures d’occasion.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Agrega le historique du véhicule",
      text: "Sélectionne le état du titre (limpio, récupération, reconstruido, inondation, etc.), numéro de accidents reportadeux et numéro de propriétaires anteriores. Chaque unon reduce le valeur en un porcentaje spécifique.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Obtiens ta estimation",
      text: "Haz clic en 'Estimar valeur de intercambio' pour ver les valeures de vente particular, intercambio en concessionnaire, oferta de effectif instantanée et enchère — adeplus de un desglose étape a étape de chaque ajuste.",
    },
  ],
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

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Estimador de valeur de intercambio",
  description:
    "Apprends comment se calculan les valeures de intercambio, les 4 façons de vender ta auto, comment afecta la dépréciation al valeur et que reduce le valeur de ta véhicule.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-16",
  dateModified: "2026-06-25",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Estimador de valeur de intercambio", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <TradeInValueEstimatorBody locale="fr" />
    </>
  );
}
