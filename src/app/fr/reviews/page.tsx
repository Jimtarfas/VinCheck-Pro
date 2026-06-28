import type { Metadata } from "next";
import ReviewsPageBody, { REVIEWS_COPY } from "@/components/ReviewsPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/reviews" as const;
const LOCALE = "fr" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Avis CarCheckerVIN 2026 — 4.9★ de acheteurs, vendeurs et concessionnaires",
    description:
      "Lis avis réels de CarCheckerVIN de acheteurs, vendeurs et concessionnaires. Calificado 4.9/5 en plus de 50,000 revisiones VIN gratuit et rapports de historique de véhicule.",
    keywords: [
      "avis CarCheckerVIN",
      "calificaciones CarCheckerVIN",
      "CarCheckerVIN es legítimo",
      "opiniones CarCheckerVIN",
      "avis VIN check",
      "avis décodeur VIN",
      "avis rapport du véhicule",
      "meilleur êtrevice VIN check",
      "alternative Carfax avis",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Avis CarCheckerVIN — 4.9★ de acheteurs, vendeurs et concessionnaires",
      description:
        "Lis avis réels de CarCheckerVIN — 4.9/5 en plus de 50,000 revisiones VIN gratuit. Descouvre par que les acheteurs confían en CarCheckerVIN.",
      url: alt.canonical,
      type: "website",
      locale: "fr_US",
      siteName: "CarCheckerVIN",
    },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
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
      <ReviewsPageBody locale="fr" />
    </>
  );
}
