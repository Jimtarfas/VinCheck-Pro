import type { Metadata } from "next";
import GlossaryPageBody, { GLOSSARY_COPY } from "@/components/GlossaryPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/glossary" as const;
const LOCALE = "es" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Glosario de VIN e historial vehicular — 60+ términos definidos",
    description:
      "Glosario completo de VIN e historial vehicular. Más de 60 términos de compra de auto, marcas de título y automotrices definidos en español claro para comprar más inteligentemente.",
    keywords: ["glosario VIN", "términos historial vehicular", "terminología compra auto", "definiciones marcas título"],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Glosario de VIN e historial vehicular",
      description: "Definiciones en español claro para estructura VIN, marcas de título, inspección, valoración y terminología de historial vehicular.",
      url: alt.canonical,
      type: "article",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: GLOSSARY_COPY.es.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <GlossaryPageBody locale="es" />
    </>
  );
}
