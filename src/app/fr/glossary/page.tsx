import type { Metadata } from "next";
import GlossaryPageBody, { GLOSSARY_COPY } from "@/components/GlossaryPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/glossary" as const;
const LOCALE = "fr" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Glossaire VIN et historique de véhicule — 60+ termois définis",
    description:
      "Glossaire complet de VIN et historique de véhicule. Más de 60 conditions de compra de auto, marques de titre et automotrices definideux en français claro pour acheter plus inteligentemente.",
    keywords: ["glossaire VIN", "conditions historique de véhicule", "terminología compra auto", "definiciones marques titre"],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Glossaire VIN et historique de véhicule",
      description: "Definiciones en français claro pour estructura VIN, marques de titre, inspección, valeuración et terminología de historique de véhicule.",
      url: alt.canonical,
      type: "article",
      locale: "fr_US",
      siteName: "CarCheckerVIN",
    },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
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
      <GlossaryPageBody locale="fr" />
    </>
  );
}
