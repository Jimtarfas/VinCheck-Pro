import type { Metadata } from "next";
import PressPageBody, { PRESS_COPY } from "@/components/PressPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/press" as const;
const LOCALE = "es" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Kit de prensa y recursos para medios",
    description:
      "Kit de prensa de CarCheckerVIN: datos de la empresa, recursos de marca, voceros, anuncios recientes y contacto directo para consultas de medios.",
    keywords: ["kit prensa CarCheckerVIN", "medios CarCheckerVIN", "logo CarCheckerVIN", "voceros CarCheckerVIN"],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Kit de prensa y recursos para medios",
      description: "Datos rápidos, recursos de marca, voceros y contacto de prensa para CarCheckerVIN.",
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
  mainEntity: PRESS_COPY.es.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PressPageBody locale="es" />
    </>
  );
}
