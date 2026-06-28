/**
 * Wave 18 batch 2 — Spanish twin of /guides/used-car-financing-guide.
 * Full English layout mirrored in Spanish via the shared body.
 */

import type { Metadata } from "next";
import GuideUsedCarFinancingBody, { FAQS_ES } from "@/components/GuideUsedCarFinancingBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/guides/used-car-financing-guide`;
const alt = hreflangAlternatesForLocale("/guides/used-car-financing-guide", "es");
const title = "Financiamiento de auto usado: La guía completa 2026";
const description =
  "Cómo financiar un auto usado en 2026: puntajes de crédito, concesionario vs banco vs cooperativa de crédito, preaprobación, APR vs costo total, arrendar vs comprar, refinanciar y trampas a evitar.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "financiamiento de auto usado",
    "guía préstamo auto usado",
    "guía préstamo de auto",
    "mejor préstamo auto usado",
    "tasas préstamo auto usado 2026",
    "preaprobación préstamo auto",
    "préstamo auto cooperativa de crédito",
    "refinanciar préstamo auto",
    "arrendar vs comprar auto usado",
    "calculadora préstamo auto usado",
    "APR vs costo total",
    "pago inicial auto usado",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description:
      "Puntajes de crédito, prestamistas, preaprobación, APR vs. costo total, arrendar vs comprar y refinanciar — el manual completo para financiar un auto usado en 2026.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Puntajes de crédito, prestamistas, preaprobación, APR vs. costo total, arrendar vs comprar y refinanciar — el manual completo para financiar un auto usado en 2026.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Financiamiento de auto usado: La guía completa 2026",
  description:
    "Guía completa para financiar un auto usado en 2026: crédito, prestamistas, preaprobación, APR, costo total, arrendamiento, refinanciamiento y cómo evitar las trampas de la oficina de finanzas.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-23",
  dateModified: "2026-06-25",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "es",
  name: "Cómo financiar un auto usado",
  step: [
    { "@type": "HowToStep", position: 1, name: "Obtén y revisa tu crédito", text: "Obtén tus reportes de crédito gratis de annualcreditreport.com y disputa cualquier error antes de aplicar." },
    { "@type": "HowToStep", position: 2, name: "Calcula un préstamo asequible", text: "Aplica la regla 20/4/10: al menos 20% de pago inicial, plazo máximo de 4 años, costo total de transporte por debajo del 10% del ingreso bruto." },
    { "@type": "HowToStep", position: 3, name: "Obtén múltiples preaprobaciones", text: "Compara ofertas de al menos una cooperativa de crédito, un banco y un prestamista en línea dentro de una ventana de 14 días." },
    { "@type": "HowToStep", position: 4, name: "Usa la preaprobación como piso de negociación", text: "Deja que el concesionario intente vencer tu mejor preaprobación; nunca aceptes una tasa peor solo porque la ofrecen." },
    { "@type": "HowToStep", position: 5, name: "Lee el contrato antes de firmar", text: "Verifica APR, plazo, total de pagos y ausencia de extras no deseados antes de firmar el contrato de venta a plazos." },
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
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Guías", item: `${SITE}/es/guides` },
    { "@type": "ListItem", position: 3, name: "Guía de financiamiento de auto usado", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GuideUsedCarFinancingBody locale="es" />
    </>
  );
}
