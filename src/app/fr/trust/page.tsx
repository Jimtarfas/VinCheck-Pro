import type { Metadata } from "next";
import TrustPageBody, { TRUST_COPY } from "@/components/TrustPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/trust" as const;
const LOCALE = "fr" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Confiance et Sécurité — Comment nonnus protégeons tes données",
    description:
      "Apprends comment CarCheckerVIN oba données sur les véhicules de NMVTIS, NICB et APIs OEM, encripta cada transaction et protege ta confidentialité sous GDPR et CCPA.",
    keywords: [
      "confiance CarCheckerVIN",
      "sécurité VIN check",
      "confidentialité données NMVTIS",
      "a éténtes données historique de véhicule",
      "CCPA GDPR VIN check",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Confiance et Sécurité en CarCheckerVIN",
      description:
        "Sources de données autoritativas, chiffrement de extremo a extremo, prácticas transparentes de confidentialité et garantie de remboursement du argent al 100%.",
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
