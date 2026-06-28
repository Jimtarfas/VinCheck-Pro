import type { Metadata } from "next";
import DealersPageBody, { DEALERS_COPY } from "@/components/DealersPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/dealers" as const;
const LOCALE = "fr" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "API VIN pour concessionnaires et rapports en gros — À partir de $1",
    description:
      "Tarifs en gros de vérification VIN desde $1/rapport. API REST, búsquedas masivas et rapports de historique de véhicule white-label pour concessionnaires, enchères et lotes BHPH.",
    keywords: [
      "VIN check concessionnaire", "rapports VIN en gros", "API VIN check",
      "rapports VIN masivos", "alternative Carfax concessionnaire", "enchères VIN lookup",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "API VIN pour concessionnaires et rapports en gros — À partir de $1",
      description: "Ahorra $20,000+/année en rapports de historique de véhicule. Tarifs VIN en gros, API REST, cargas masivas et rapports white-label.",
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
      <DealersPageBody locale="fr" />
    </>
  );
}
