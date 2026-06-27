import type { Metadata } from "next";
import DiminishedValueCalculatorBody, { FAQS_ES } from "@/components/DiminishedValueCalculatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/diminished-value-calculator`;
const alt = hreflangAlternatesForLocale("/diminished-value-calculator", "es");

const title = "Calculadora de valor disminuido — Fórmula 17c y pérdida real de mercado";
const description =
  "Calcula el valor disminuido de tu auto después de un accidente con la fórmula 17c, luego ve el rango realista de pérdida de mercado. Gratis, instantáneo, sin registro.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculadora de valor disminuido",
    "calculadora 17c",
    "fórmula de valor disminuido",
    "valor disminuido del auto después de accidente",
    "cómo calcular el valor disminuido",
    "calculadora de reclamo de valor disminuido",
    "valor disminuido inherente",
    "valor disminuido de auto después de accidente",
    "calculadora automática de valor disminuido",
    "estimación de valor disminuido del vehículo",
    "fórmula 17c",
    "fórmula mabry v state farm",
    "tasación de valor disminuido",
    "calculadora de pérdida de valor post accidente",
    "valor de intercambio después de accidente",
    "reclamo de valor disminuido",
    "valor disminuido de terceros",
    "valor disminuido georgia",
    "cuánto vale mi auto después de un accidente",
    "pérdida de valor de auto por accidente",
    "reclamo de seguro de valor disminuido",
    "calcular pérdida de valor de auto",
    "valor disminuido de vehículo",
    "caída de valor de auto después de accidente",
    "calculadora gratis de valor disminuido",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Calculadora gratis de valor disminuido — Fórmula 17c y pérdida real de mercado",
    description:
      "Mira lo que tu auto perdió en valor después de un accidente. Ejecuta la fórmula 17c de la aseguradora y el rango realista de mercado para que negocies un reclamo justo de valor disminuido.",
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "es_US",
    images: [
      {
        url: `${SITE}/diminished-value-calculator/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Calculadora de valor disminuido — fórmula 17c y pérdida real de mercado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de valor disminuido — Fórmula 17c y pérdida real de mercado",
    description:
      "Calcula el valor disminuido de tu auto después de un accidente con la fórmula 17c más el rango realista de mercado. Gratis, instantáneo, sin registro.",
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
  inLanguage: "es",
  name: "Calculadora de valor disminuido",
  description:
    "Calculadora gratis de valor disminuido usando la fórmula 17c de la aseguradora (tope base 10% × multiplicador de daño × multiplicador de kilometraje) junto con un rango realista de pérdida de mercado. Estima cuánto valor perdió un vehículo después de un accidente para respaldar un reclamo de valor disminuido.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Fórmula 17c de valor disminuido",
    "Multiplicador de gravedad de daño",
    "Bandas de multiplicador de kilometraje",
    "Rango realista de pérdida de mercado",
    "Desglose paso a paso del cálculo",
    "Estimación lista para negociación",
    "Sin registro requerido",
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
  inLanguage: "es",
  name: "Cómo calcular el valor disminuido después de un accidente",
  description:
    "Estima el valor disminuido de tu vehículo usando la fórmula 17c y un rango basado en el mercado para respaldar un reclamo de valor disminuido.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Encuentra tu valor de mercado previo al accidente",
      text: "Busca el valor minorista limpio de tu auto el día anterior al choque usando KBB o NADA. Esta es la cifra desde la que arranca la fórmula 17c.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Aplica el tope base del 10%",
      text: "La fórmula 17c limita la pérdida base máxima al 10% del valor previo al accidente. Multiplica tu valor por 0.10 para obtener la base.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Aplica el multiplicador de daño",
      text: "Elige una gravedad de daño desde estructural severo (1.00) hasta sin daño estructural (0.00) y multiplica la base por él.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Aplica el multiplicador de kilometraje",
      text: "Reduce el resultado por la banda de kilometraje: 1.00 bajo 20 mil millas, hasta 0.00 a 100 mil+. Mayor kilometraje significa una cifra 17c menor.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Compara contra la pérdida real de mercado",
      text: "Como la 17c subestima la pérdida real, compárala con el rango de mercado (5–25% del valor por gravedad) y usa una tasación independiente para respaldar tu reclamo.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  inLanguage: "es",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculadora de valor disminuido",
      item: PAGE_URL,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "es",
  name: "Calculadora de valor disminuido",
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
  inLanguage: "es",
  headline: "Calculadora de valor disminuido: la fórmula 17c y tu pérdida real de mercado",
  description:
    "Cómo la fórmula 17c de la aseguradora calcula el valor disminuido, por qué subestima la pérdida real, un ejemplo numérico trabajado, cómo el valor disminuido difiere de la depreciación y dónde se permiten los reclamos de primera parte vs. terceros por estado.",
  about: [
    { "@type": "Thing", name: "Valor disminuido" },
    { "@type": "Thing", name: "Fórmula 17c" },
    { "@type": "Thing", name: "Reclamo de seguro de auto" },
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
  inLanguage: "es",
  name: "Pérdida típica de mercado del vehículo por gravedad del daño",
  description:
    "Descuento de reventa del mundo real como porcentaje del valor previo al accidente, por gravedad del daño, usado para verificar la sensatez de una estimación 17c de valor disminuido.",
  url: `${PAGE_URL}#loss-by-severity`,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  variableMeasured: [
    "Gravedad del daño",
    "Valor de mercado perdido (% del valor previo al accidente)",
  ],
  measurementTechnique:
    "Comparación de precios de reventa post-reparación contra comparables de historial limpio por categoría de daño",
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
      <DiminishedValueCalculatorBody locale="es" />
    </>
  );
}
