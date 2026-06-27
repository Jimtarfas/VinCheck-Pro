/**
 * Wave 18.19 — Spanish lease-vs-buy-calculator. Same full English layout via
 * the shared LeaseVsBuyCalculatorBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import LeaseVsBuyCalculatorBody, { FAQS_ES } from "@/components/LeaseVsBuyCalculatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/lease-vs-buy-calculator`;
const alt = hreflangAlternatesForLocale("/lease-vs-buy-calculator", "es");

const title = "Calculadora arrendar vs comprar — ¿Debo arrendar o comprar un auto? (Gratis)";
const description =
  "Comparación lado a lado de arrendar (lease) vs financiar el mismo auto. Mira costo total, pagos mensuales, plusvalía y ventaja neta en 3-7 años. Gratis, instantáneo, sin registro.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculadora arrendar vs comprar",
    "lease vs comprar auto",
    "calculadora lease auto",
    "factor de dinero calculadora",
    "valor residual lease",
    "pago mensual lease calculadora",
    "arrendar o financiar",
    "costo total lease",
    "calculadora pago lease",
    "lease vs préstamo auto",
    "comparación lease comprar",
    "calculadora arrendamiento auto",
    "debo arrendar mi auto",
    "calculadora compra de lease",
    "exceso kilometraje lease",
    "cargo adquisición lease",
    "cargo disposición lease",
    "plusvalía auto lease",
    "lease luxury auto",
    "ventajas y desventajas lease",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Calculadora arrendar vs comprar — ¿Debo arrendar o comprar un auto?",
    description:
      "Compara el costo total real de arrendar vs financiar el mismo auto. Mira pagos mensuales, gasto total, plusvalía al final del plazo y la ventaja neta. Gratis e instantáneo.",
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora arrendar vs comprar — ¿Debo arrendar o comprar un auto?",
    description:
      "Comparación lado a lado de lease y financiamiento con matemática del factor de dinero, valores residuales, plusvalía y un veredicto claro de ventaja neta.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

/* ─── JSON-LD Schemas ─────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "es",
  name: "Calculadora arrendar vs comprar",
  description:
    "Comparación gratis lado a lado de arrendar vs financiar el mismo vehículo. Calcula pago mensual, gasto total de bolsillo, plusvalía al final del plazo, cargo de financiamiento con factor de dinero y la ventaja neta de costo.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Pago de lease con factor de dinero",
    "Calculadora de valor residual",
    "Amortización del préstamo para el lado de compra",
    "Veredicto de ventaja neta (lease vs comprar)",
    "Tabla de costo acumulado año por año",
    "Estimador de exceso de kilometraje",
    "Manejo de cargos de adquisición / disposición",
    "Soporte de impuesto sobre mensualidad y sobre inicial",
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
  name: "Cómo comparar arrendar vs comprar un auto",
  description:
    "Usa la calculadora gratis de arrendar vs comprar de CarCheckerVIN para encontrar la opción más barata en cinco pasos.",
  totalTime: "PT3M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Ingresa el MSRP del vehículo y el precio negociado",
      text: "El MSRP define el residual del lease; el precio negociado define tanto el costo capitalizado del lease como el principal del préstamo. Ingresa ambos — a menudo son diferentes.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Configura tu pago inicial, auto a cambio y tasa de impuesto",
      text: "Estos insumos compartidos aplican a ambos lados. Agrega tu tasa combinada de impuesto sobre la venta estatal y local para que la calculadora pueda gravar correctamente cada pago mensual del lease y el principal del lado de compra.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Ingresa los términos del lease (factor de dinero, residual, cargos)",
      text: "El factor de dinero es el equivalente del APR en el lease — multiplica por 2400 para obtener el APR. El % residual lo fija el banco; 55% es típico para 36 meses. Los cargos de adquisición y disposición son cargos bancarios al inicio y al final.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Ingresa los términos de compra (APR y plazo del préstamo)",
      text: "Usa un APR real de una pre-aprobación de cooperativa o banco. El plazo del préstamo puede ser más largo que la ventana de comparación — la calculadora maneja la amortización de ventana parcial.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Haz clic en Comparar y lee el veredicto",
      text: "La calculadora devuelve tarjetas lado a lado, una tabla acumulada año por año y una sola píldora de veredicto de ventaja neta: 'Comprar te ahorra $X' o 'Arrendar te ahorra $X' basado en costo neto (gasto de bolsillo menos plusvalía al final del plazo).",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculadora arrendar vs comprar",
      item: PAGE_URL,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "SpeakableSpecification",
  cssSelector: ["h1", "#quick-comparison", "#when-lease", "#when-buy", "#faq"],
  url: PAGE_URL,
};

/* ─── Page ────────────────────────────────────────────────── */

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <LeaseVsBuyCalculatorBody locale="es" />
    </>
  );
}
