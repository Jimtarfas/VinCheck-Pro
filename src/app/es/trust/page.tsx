import type { Metadata } from "next";
import TrustPageBody, { TRUST_COPY } from "@/components/TrustPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/trust" as const;
const LOCALE = "es" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Confianza y Seguridad — Cómo protegemos tus datos",
    description:
      "Aprende cómo CarCheckerVIN obtiene datos vehiculares de NMVTIS, NICB y APIs OEM, encripta cada transacción y protege tu privacidad bajo GDPR y CCPA.",
    keywords: [
      "confianza CarCheckerVIN",
      "seguridad VIN check",
      "privacidad datos NMVTIS",
      "fuentes datos historial vehicular",
      "CCPA GDPR VIN check",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Confianza y Seguridad en CarCheckerVIN",
      description:
        "Fuentes de datos autoritativas, encriptación de extremo a extremo, prácticas transparentes de privacidad y garantía de devolución del dinero al 100%.",
      url: alt.canonical,
      type: "article",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
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
      <TrustPageBody locale="es" />
    </>
  );
}
