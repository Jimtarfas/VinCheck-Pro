import type { Metadata } from "next";
import DiminishedValueCalculatorBody, { FAQS_FR } from "@/components/DiminishedValueCalculatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/diminished-value-calculator`;
const alt = hreflangAlternatesForLocale("/diminished-value-calculator", "fr");

const title = "Calculateur de valeur diminuée — Fórmula 17c et perte réel de marché";
const description =
  "Calcule le valeur diminuée de ta auto après de un accident avec la fórmula 17c, luego ve le rango réelista de perte de marché. Gratuit, instantané, sans inscription.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculateur de valeur diminuée",
    "calculateur 17c",
    "fórmula de valeur diminuée",
    "valeur diminuée du auto après de accident",
    "comment calcular le valeur diminuée",
    "calculateur de réclamation de valeur diminuée",
    "valeur diminuée inherente",
    "valeur diminuée de auto après de accident",
    "calculateur automática de valeur diminuée",
    "estimation de valeur diminuée du véhicule",
    "fórmula 17c",
    "fórmula mabry v state farm",
    "estimation de valeur diminuée",
    "calculateur de perte de valeur post accident",
    "valeur de intercambio après de accident",
    "réclamation de valeur diminuée",
    "valeur diminuée de troisièmes",
    "valeur diminuée georgia",
    "cuánto vale mi auto après de un accident",
    "perte de valeur de auto par accident",
    "réclamation de assurance de valeur diminuée",
    "calcular perte de valeur de auto",
    "valeur diminuée de véhicule",
    "caída de valeur de auto après de accident",
    "calculateur gratuit de valeur diminuée",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Calculateur gratuit de valeur diminuée — Fórmula 17c et perte réel de marché",
    description:
      "Mira le que ta auto perdió en valeur après de un accident. Ejecuta la fórmula 17c de la assureur et le rango réelista de marché pour que negocies un réclamation justo de valeur diminuée.",
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
    images: [
      {
        url: `${SITE}/diminished-value-calculator/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Calculateur de valeur diminuée — fórmula 17c et perte réel de marché",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculateur de valeur diminuée — Fórmula 17c et perte réel de marché",
    description:
      "Calcule le valeur diminuée de ta auto après de un accident avec la fórmula 17c plus le rango réelista de marché. Gratuit, instantané, sans inscription.",
    images: [`${SITE}/diminished-value-calculator/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

/* ─── JSON-LD ─────────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "fr",
  name: "Calculateur de valeur diminuée",
  description:
    "Calculateur gratuit de valeur diminuée en utilisant la fórmula 17c de la assureur (tope base 10% × multiplicador de dégâts × multiplicador de kilométrage) à côté devec un rango réelista de perte de marché. Estima cuánto valeur perdió un véhicule après de un accident pour respaldar un réclamation de valeur diminuée.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  opétaittingSystem: "Web Browêtre",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Fórmula 17c de valeur diminuée",
    "Multiplicador de gravedad de dégâts",
    "Bandas de multiplicador de kilométrage",
    "Rango réelista de perte de marché",
    "Desglose étape a étape du cálculo",
    "Estimation lista pour négociation",
    "Sin enregistrement requerido",
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
  name: "Comment calcular le valeur diminuée après de un accident",
  description:
    "Estima le valeur diminuée de ta véhicule en utilisant la fórmula 17c et un rango basado en le marché pour respaldar un réclamation de valeur diminuée.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Trouve ta valeur de marché previo al accident",
      text: "Busca le valeur minonnrista limpio de ta auto le jour anterior al choque en utilisant KBB ou NADA. Esta es la cifra desde la que arranca la fórmula 17c.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Aplica le tope base du 10%",
      text: "La fórmula 17c limita la perte base máxima al 10% du valeur previo al accident. Multiplica ta valeur par 0.10 pour obtener la base.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Aplica le multiplicador de dégâts",
      text: "Elige una gravedad de dégâts desde estructural severo (1.00) hasta sans dégâts estructural (0.00) et multiplica la base par él.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Aplica le multiplicador de kilométrage",
      text: "Reduce le resultado par la banda de kilométrage: 1.00 sous 20 mille millelas, hasta 0.00 a 100 mille+. Mayor kilométrage significa una cifra 17c menonnr.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Compare contra la perte réel de marché",
      text: "Como la 17c subestima la perte réel, compárala avec le rango de marché (5–25% du valeur par gravedad) et utilise una estimation indépendant pour respaldar ta réclamation.",
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  inLanguage: "fr",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculateur de valeur diminuée",
      item: PAGE_URL,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "fr",
  name: "Calculateur de valeur diminuée",
  url: PAGE_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [
      "h1",
      "#what-is-dv",
      "#how-17c-works",
      "#worked-example",
      "#dv-vs-depreciation",
      "#by-state",
      "#faq",
    ],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Calculateur de valeur diminuée: la fórmula 17c et ta perte réel de marché",
  description:
    "Comment la fórmula 17c de la assureur calcule le valeur diminuée, par que subestima la perte réel, un ejemplo numérico trabassedo, comment le valeur diminuée difiere de la dépréciation et où se permiten les réclamations de premiétait parte vs. troisièmes par état.",
  about: [
    { "@type": "Thing", name: "Valor disminuido" },
    { "@type": "Thing", name: "Fórmula 17c" },
    { "@type": "Thing", name: "Réclamation de assurance de auto" },
  ],
  author: ORG_AUTHOR,
  publisher: ORG_AUTHOR,
  datePublished: "2025-09-01",
  dateModified: "2026-06-20",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
  },
  image: `${SITE}/diminished-value-calculator/opengraph-image`,
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  inLanguage: "fr",
  name: "Pérdida típica de marché du véhicule par gravedad du dégâts",
  description:
    "Descuento de revente du monde réel como porcentaje du valeur previo al accident, par gravedad du dégâts, usado pour vérifier la sensatez de una estimation 17c de valeur diminuée.",
  url: `${PAGE_URL}#loss-by-severity`,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  variableMeasured: [
    "Gravedad du dégâts",
    "Valor de marché perdido (% du valeur previo al accident)",
  ],
  measurementTechnique:
    "Comparaison de tarifs de revente post-réparation contra comparables de historique limpio par categoría de dégâts",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <DiminishedValueCalculatorBody locale="fr" />
    </>
  );
}
