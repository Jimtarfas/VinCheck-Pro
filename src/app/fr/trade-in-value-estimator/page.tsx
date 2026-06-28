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
const title = "Estimador de valeur de intercambio — Cuánto vale mi auto? (Gratuit)";
const description =
  "Estimador gratuit de valeur de intercambio. Ingresa année, marque, modelo, kilométrage, condición et historique de ta véhicule pour estimar instantanément le valeur de vente particular, intercambio en concessionnaire, oferta de efectivo instantanée et valeur de enchère.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "estimateur valeur de intercambio",
    "valeur intercambio auto",
    "cuánto vale mi auto",
    "calculateur intercambio auto",
    "valeur de intercambio véhicule",
    "estimateur valeur auto",
    "calculateur valeur intercambio auto",
    "qué vale mi auto",
    "valeur intercambio par année marque modelo",
    "KBB valeur intercambio",
    "valeur intercambio concessionnaire",
    "oferta de efectivo instantanée auto",
    "valeur auto par kilométrage",
    "valeur intercambio avec titre récupération",
    "valeur de vente particular",
    "valeur de mayoreo auto",
    "valeur de enchère auto",
    "calculateur de tasación voiture d’occasion",
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
      "Calculateur gratuit de valeur de intercambio. Ve les valeures de vente particular, intercambio en concessionnaire, oferta de efectivo instantanée et enchère basadeux en année, marque, kilométrage, condición e historique.",
  },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "fr",
  name: "Estimador de valeur de intercambio",
  description:
    "Estimador gratuit de valeur de intercambio. Ingresa année, marque, modelo, kilométrage, condición, état de titre et historique de accidents pour obtener estimaciones de vente particular, intercambio en concessionnaire, oferta de efectivo instantanée et valeur de enchère.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Estimación de vente particular",
    "Estimación de intercambio en concessionnaire",
    "Estimación de oferta de efectivo instantanée",
    "Valor de enchère / mayoreo",
    "30 marques avec tasas de retención específicas",
    "Multiplicadores de condición (Excelente a Pobre)",
    "Deducciones par marque de titre (Récupération, Inundación, Reconstruido)",
    "Ajustes par historique de accidents et propriétaires",
    "Desglose de valeur paso a paso",
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
    "Utilise le estimateur gratuit de valeur de intercambio de CarCheckerVIN pour obtener estimaciones de vente particular, concessionnaire et oferta de efectivo instantanée en minutes.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Ingresa les detalles du véhicule",
      text: "Selecciona le année, marque, modelo, tipo de carrocería et MSRP original. Le precio de etiqueta original ancla le cálculo de dépréciation.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Ingresa le kilométrage et la condición",
      text: "Escribe la lectura actual du odomètre et selecciona la calificación de condición de Excelente a Pobre. La condición es la variable plus grande en la valeuración de voitures d’occasion.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Agrega le historique du véhicule",
      text: "Selecciona le état du titre (limpio, récupération, reconstruido, inundación, etc.), numéro de accidents reportadeux et numéro de propriétaires anteriores. Cada uno reduce le valeur en un porcentaje específico.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Obtén ta estimación",
      text: "Haz clic en 'Estimar valeur de intercambio' pour ver les valeures de vente particular, intercambio en concessionnaire, oferta de efectivo instantanée et enchère — adeplus de un desglose paso a paso de cada ajuste.",
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
    "Aprende comment se calculan les valeures de intercambio, les 4 formas de vender ta auto, comment afecta la dépréciation al valeur et qué reduce le valeur de ta véhicule.",
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
