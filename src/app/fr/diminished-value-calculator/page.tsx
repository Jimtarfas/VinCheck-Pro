import type { Metadata } from "next";
import DiminishedValueCalculatorBody, { FAQS_FR } from "@/components/DiminishedValueCalculatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/diminished-value-calculator`;
const alt = hreflangAlternatesForLocale("/diminished-value-calculator", "fr");

const title = "Calculateur de valeur diminuée — Fórmula 17c et perte réel de marché";
const description =
  "Calcula le valeur diminuée de ta auto después de un accident avec la fórmula 17c, luego ve le rango réelista de perte de marché. Gratuit, instantané, sans inscription.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculateur de valeur diminuée",
    "calculateur 17c",
    "fórmula de valeur diminuée",
    "valeur diminuée du auto después de accident",
    "comment calcular le valeur diminuée",
    "calculateur de reclamo de valeur diminuée",
    "valeur diminuée inherente",
    "valeur diminuée de auto después de accident",
    "calculateur automática de valeur diminuée",
    "estimación de valeur diminuée du véhicule",
    "fórmula 17c",
    "fórmula mabry v state farm",
    "tasación de valeur diminuée",
    "calculateur de perte de valeur post accident",
    "valeur de intercambio después de accident",
    "reclamo de valeur diminuée",
    "valeur diminuée de terceros",
    "valeur diminuée georgia",
    "cuánto vale mi auto después de un accident",
    "perte de valeur de auto par accident",
    "reclamo de assurance de valeur diminuée",
    "calcular perte de valeur de auto",
    "valeur diminuée de véhicule",
    "caída de valeur de auto después de accident",
    "calculateur gratuit de valeur diminuée",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Calculateur gratuit de valeur diminuée — Fórmula 17c et perte réel de marché",
    description:
      "Mira le que ta auto perdió en valeur después de un accident. Ejecuta la fórmula 17c de la aseguradora et le rango réelista de marché pour que negocies un reclamo justo de valeur diminuée.",
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
      "Calcula le valeur diminuée de ta auto después de un accident avec la fórmula 17c plus le rango réelista de marché. Gratuit, instantané, sans inscription.",
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
    "Calculateur gratuit de valeur diminuée usando la fórmula 17c de la aseguradora (tope base 10% × multiplicador de dégâts × multiplicador de kilométrage) junto avec un rango réelista de perte de marché. Estima cuánto valeur perdió un véhicule después de un accident pour respaldar un reclamo de valeur diminuée.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Fórmula 17c de valeur diminuée",
    "Multiplicador de gravedad de dégâts",
    "Bandas de multiplicador de kilométrage",
    "Rango réelista de perte de marché",
    "Desglose paso a paso du cálculo",
    "Estimación lista pour negociación",
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
  name: "Comment calcular le valeur diminuée después de un accident",
  description:
    "Estima le valeur diminuée de ta véhicule usando la fórmula 17c et un rango basado en le marché pour respaldar un reclamo de valeur diminuée.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Encuentra ta valeur de marché previo al accident",
      text: "Busca le valeur minorista limpio de ta auto le jour anterior al choque usando KBB ou NADA. Esta es la cifra desde la que arranca la fórmula 17c.",
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
      text: "Reduce le resultado par la banda de kilométrage: 1.00 bajo 20 mil millas, hasta 0.00 a 100 mil+. Mayor kilométrage significa una cifra 17c menor.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Compara contra la perte réel de marché",
      text: "Como la 17c subestima la perte réel, compárala avec le rango de marché (5–25% du valeur par gravedad) et utilise una tasación independiente pour respaldar ta reclamo.",
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
    "Comment la fórmula 17c de la aseguradora calcula le valeur diminuée, par qué subestima la perte réel, un ejemplo numérico trabajado, comment le valeur diminuée difiere de la dépréciation et dónde se permiten les reclamos de premiera parte vs. terceros par état.",
  about: [
    { "@type": "Thing", name: "Valor disminuido" },
    { "@type": "Thing", name: "Fórmula 17c" },
    { "@type": "Thing", name: "Reclamo de assurance de auto" },
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
    "Descuento de revente du mundo réel como porcentaje du valeur previo al accident, par gravedad du dégâts, usado pour vérifier la sensatez de una estimación 17c de valeur diminuée.",
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
