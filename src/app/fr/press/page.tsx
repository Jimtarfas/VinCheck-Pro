import type { Metadata } from "next";
import PressPageBody, { PRESS_COPY } from "@/components/PressPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/press" as const;
const LOCALE = "fr" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Kit de presse et ressources pour les médias",
    description:
      "Kit de presse de CarCheckerVIN: données de la empresa, ressources de marque, voceros, anuncios récents et contact directo pour consultatioptiontioptiontioptions de médias.",
    keywords: ["kit presse CarCheckerVIN", "médias CarCheckerVIN", "logo CarCheckerVIN", "voceros CarCheckerVIN"],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Kit de presse et ressources pour les médias",
      description: "Datos rapides, ressources de marque, voceros et contact de presse pour CarCheckerVIN.",
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
      <PressPageBody locale="fr" />
    </>
  );
}
