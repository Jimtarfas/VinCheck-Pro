import type { Metadata } from "next";
import HelpPageBody, { HELP_COPY } from "@/components/HelpPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/help" as const;
const LOCALE = "es" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Ayuda y Soporte — Preguntas frecuentes sobre VIN",
    description:
      "Respuestas a las preguntas más comunes sobre consultas VIN, reportes de historial vehicular, cuentas, facturación y problemas técnicos. Soporte del equipo de CarCheckerVIN.",
    keywords: [
      "ayuda VIN check",
      "FAQ VIN español",
      "soporte CarCheckerVIN",
      "ayuda reporte vehicular",
      "reembolso VIN check",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Ayuda y Soporte — CarCheckerVIN FAQ",
      description:
        "Encuentra respuestas sobre consultas VIN, contenidos del reporte, facturación y problemas técnicos, o contacta a nuestro equipo de soporte.",
      url: alt.canonical,
      type: "article",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
  };
}

const allFaqs = [
  ...HELP_COPY.es.vinLookupFaqs,
  ...HELP_COPY.es.reportFaqs,
  ...HELP_COPY.es.accountFaqs,
  ...HELP_COPY.es.technicalFaqs,
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: allFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HelpPageBody locale="es" />
    </>
  );
}
