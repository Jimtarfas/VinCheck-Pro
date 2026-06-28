import type { Metadata } from "next";
import TrustPageBody, { TRUST_COPY } from "@/components/TrustPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/trust" as const;
const LOCALE = "fr" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Confiance et Sécurité — Comment nous protégeons tes données",
    description:
      "Aprende comment CarCheckerVIN obtiene données sur les véhicules de NMVTIS, NICB et APIs OEM, encripta cada transacción et protege ta confidentialité bajo GDPR et CCPA.",
    keywords: [
      "confiance CarCheckerVIN",
      "sécurité VIN check",
      "confidentialité données NMVTIS",
      "fuentes données historique de véhicule",
      "CCPA GDPR VIN check",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Confiance et Sécurité en CarCheckerVIN",
      description:
        "Fuentes de données autoritativas, encriptación de extremo a extremo, prácticas transparentes de confidentialité et garantie de devolución du dinero al 100%.",
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
  mainEntity: TRUST_COPY.es.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <TrustPageBody locale="fr" />
    </>
  );
}
