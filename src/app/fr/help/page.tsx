import type { Metadata } from "next";
import HelpPageBody, { HELP_COPY } from "@/components/HelpPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/help" as const;
const LOCALE = "fr" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Aide et Support — Questions fréquentes sur VIN",
    description:
      "Réponses a les questions plus comunes sur consultatioptiontioptiontioptions VIN, rapports de historique de véhicule, cuentas, facturation et problemas técnicos. Support du equipo de CarCheckerVIN.",
    keywords: [
      "aide VIN check",
      "FAQ VIN français",
      "soporte CarCheckerVIN",
      "aide rapport du véhicule",
      "reembolso VIN check",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Aide et Support — CarCheckerVIN FAQ",
      description:
        "Trouve réponses sur consultatioptiontioptiontioptions VIN, contenideux du rapport, facturation et problemas técnicos, ou contacte a nonntre équipe de soporte.",
      url: alt.canonical,
      type: "article",
      locale: "fr_US",
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
  inLanguage: "fr",
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
      <HelpPageBody locale="fr" />
    </>
  );
}
