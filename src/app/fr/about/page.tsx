import type { Metadata } from "next";
import AboutPageBody, { ABOUT_COPY } from "@/components/AboutPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/about" as const;
const LOCALE = "fr" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "À propos de — Rapports d’historique de véhicule fiables",
    description:
      "Cononce al equipo derrière CarCheckerVIN. Obavons données de NMVTIS, NICB et fabricavant pour entregar rapports precisos et asequibles en les que les acheteurs confían.",
    keywords: [
      "à propos de CarCheckerVIN",
      "quies somos CarCheckerVIN",
      "empresa VIN check",
      "histoire CarCheckerVIN",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "À propos de CarCheckerVIN — Rapports d’historique de véhicule fiables",
      description:
        "Notre mission, a éventes de données et le equipo derrière les rapports VIN precisos et asequibles de CarCheckerVIN.",
      url: alt.canonical,
      type: "article",
      locale: "fr_US",
      siteName: "CarCheckerVIN",
    },
  };
}

const aboutSchema = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    inLanguage: "fr",
    name: "À propos de CarCheckerVIN",
    url: "https://www.carcheckervin.com/fr/après-de",
    description:
      "À propos de CarCheckerVIN: nontre mission, a éventes de données, estndares editoriales et le equipo derrière nontrois rapports de historique de véhicule.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: ABOUT_COPY.es.faqs.map((f) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AboutPageBody locale="fr" />
    </>
  );
}
