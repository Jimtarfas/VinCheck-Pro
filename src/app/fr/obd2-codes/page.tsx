import type { Metadata } from "next";
import OBD2CodesPageBody, { OBD2_COPY } from "@/components/OBD2CodesPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/obd2-codes" as const;
const LOCALE = "fr" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Recherche de codes OBD-II gratuit — Décode n’importe quel code de Check Engine",
    description:
      "Décode instantanément n’importe quel code de problema OBD-II / DTC. Ve significado, síntomas, causas probables, severidad, estimaciones de coût de réparation et dificultad DIY pour cientos de codes.",
    keywords: ["codes OBD2 français", "codes OBD II", "diagnóstico du véhicule", "luz check engine", "code P0420", "code P0300"],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Recherche de codes OBD-II gratuit",
      description: "Décode n’importe quel code de problema OBD-II. Síntomas, causas, severidad et coût de réparation — todo gratuit.",
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
  mainEntity: OBD2_COPY.es.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <OBD2CodesPageBody locale="fr" />
    </>
  );
}
