import type { Metadata } from "next";
import OBD2CodesPageBody, { OBD2_COPY } from "@/components/OBD2CodesPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/obd2-codes" as const;
const LOCALE = "es" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Búsqueda de códigos OBD-II gratis — Decodifica cualquier código de Check Engine",
    description:
      "Decodifica al instante cualquier código de problema OBD-II / DTC. Ve significado, síntomas, causas probables, severidad, estimaciones de costo de reparación y dificultad DIY para cientos de códigos.",
    keywords: ["códigos OBD2 español", "códigos OBD II", "diagnóstico vehicular", "luz check engine", "código P0420", "código P0300"],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Búsqueda de códigos OBD-II gratis",
      description: "Decodifica cualquier código de problema OBD-II. Síntomas, causas, severidad y costo de reparación — todo gratis.",
      url: alt.canonical,
      type: "website",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: OBD2_COPY.es.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <OBD2CodesPageBody locale="es" />
    </>
  );
}
