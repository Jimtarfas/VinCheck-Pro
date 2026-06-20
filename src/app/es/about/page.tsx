import type { Metadata } from "next";
import AboutPageBody, { ABOUT_COPY } from "@/components/AboutPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/about" as const;
const LOCALE = "es" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Acerca de — Reportes confiables de historial vehicular",
    description:
      "Conoce al equipo detrás de CarCheckerVIN. Obtenemos datos de NMVTIS, NICB y fabricantes para entregar reportes precisos y asequibles en los que los compradores confían.",
    keywords: [
      "acerca de CarCheckerVIN",
      "quiénes somos CarCheckerVIN",
      "empresa VIN check",
      "historia CarCheckerVIN",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Acerca de CarCheckerVIN — Reportes confiables de historial vehicular",
      description:
        "Nuestra misión, fuentes de datos y el equipo detrás de los reportes VIN precisos y asequibles de CarCheckerVIN.",
      url: alt.canonical,
      type: "article",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
  };
}

const aboutSchema = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    inLanguage: "es",
    name: "Acerca de CarCheckerVIN",
    url: "https://www.carcheckervin.com/es/acerca-de",
    description:
      "Acerca de CarCheckerVIN: nuestra misión, fuentes de datos, estándares editoriales y el equipo detrás de nuestros reportes de historial vehicular.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
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
      <AboutPageBody locale="es" />
    </>
  );
}
