import type { Metadata } from "next";
import ToolsPageBody, { TOOLS_COPY } from "@/components/ToolsPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/tools" as const;
const LOCALE = "fr" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Outils VIN gratuits — Décodeur, vérificateur de odomètre et plus",
    description:
      "Un hub gratuit de outils de recherche du véhicule: décodeur VIN, vérification de titre de récupération, recherche de véhicule volé, vérification de odomètre et plus.",
    keywords: [
      "outils VIN gratuit",
      "décodeur VIN gratuit",
      "vérification VIN gratuit",
      "outils recherche VIN",
      "décodeur VIN pour incrustar",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Outils VIN gratuits — Décodeur, vérificateur et plus",
      description: "Trece outils gratuit de recherche du véhicule, plus un décodeur VIN pour incrustar en ta sitio.",
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
  mainEntity: TOOLS_COPY.es.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolsPageBody locale="fr" />
    </>
  );
}
