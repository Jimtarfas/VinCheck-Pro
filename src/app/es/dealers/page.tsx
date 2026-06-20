import type { Metadata } from "next";
import DealersPageBody, { DEALERS_COPY } from "@/components/DealersPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/dealers" as const;
const LOCALE = "es" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "API VIN para concesionarios y reportes mayoristas — Desde $1",
    description:
      "Precios mayoristas de revisión VIN desde $1/reporte. API REST, búsquedas masivas y reportes de historial vehicular white-label para concesionarios, subastas y lotes BHPH.",
    keywords: [
      "VIN check concesionario", "reportes VIN mayoristas", "API VIN check",
      "reportes VIN masivos", "alternativa Carfax concesionario", "subastas VIN lookup",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "API VIN para concesionarios y reportes mayoristas — Desde $1",
      description: "Ahorra $20,000+/año en reportes de historial vehicular. Precios VIN mayoristas, API REST, cargas masivas y reportes white-label.",
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
  mainEntity: DEALERS_COPY.es.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DealersPageBody locale="es" />
    </>
  );
}
