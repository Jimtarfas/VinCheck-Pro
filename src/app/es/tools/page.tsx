import type { Metadata } from "next";
import ToolsPageBody, { TOOLS_COPY } from "@/components/ToolsPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/tools" as const;
const LOCALE = "es" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Herramientas VIN gratis — Decodificador, verificador de odómetro y más",
    description:
      "Un hub gratis de herramientas de investigación vehicular: decodificador VIN, verificación de título de salvamento, búsqueda de vehículo robado, verificación de odómetro y más.",
    keywords: [
      "herramientas VIN gratis",
      "decodificador VIN gratis",
      "revisión VIN gratis",
      "herramientas búsqueda VIN",
      "decodificador VIN para incrustar",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Herramientas VIN gratis — Decodificador, verificador y más",
      description: "Trece herramientas gratis de investigación vehicular, más un decodificador VIN para incrustar en tu sitio.",
      url: alt.canonical,
      type: "website",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
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
      <ToolsPageBody locale="es" />
    </>
  );
}
