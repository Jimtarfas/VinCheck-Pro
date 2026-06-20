import type { Metadata } from "next";
import ReviewsPageBody, { REVIEWS_COPY } from "@/components/ReviewsPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/reviews" as const;
const LOCALE = "es" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Reseñas CarCheckerVIN 2026 — 4.9★ de compradores, vendedores y concesionarios",
    description:
      "Lee reseñas reales de CarCheckerVIN de compradores, vendedores y concesionarios. Calificado 4.9/5 en más de 50,000 revisiones VIN gratis y reportes de historial vehicular.",
    keywords: [
      "reseñas CarCheckerVIN",
      "calificaciones CarCheckerVIN",
      "CarCheckerVIN es legítimo",
      "opiniones CarCheckerVIN",
      "reseñas VIN check",
      "reseñas decodificador VIN",
      "reseñas reporte vehicular",
      "mejor servicio VIN check",
      "alternativa Carfax reseñas",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Reseñas CarCheckerVIN — 4.9★ de compradores, vendedores y concesionarios",
      description:
        "Lee reseñas reales de CarCheckerVIN — 4.9/5 en más de 50,000 revisiones VIN gratis. Descubre por qué los compradores confían en CarCheckerVIN.",
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
  mainEntity: REVIEWS_COPY.es.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ReviewsPageBody locale="es" />
    </>
  );
}
