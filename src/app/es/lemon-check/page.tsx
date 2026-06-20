import type { Metadata } from "next";
import LemonCheckPageBody, { LEMON_CHECK_COPY } from "@/components/LemonCheckPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/lemon-check" as const;
const LOCALE = "es" as const;
const SITE = "https://www.carcheckervin.com";

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: { absolute: "Verificación Ley Limón por VIN — Búsqueda de recompra gratis, 50 estados" },
    description:
      "Verificación gratis de Ley Limón por VIN. Encuentra marcas de recompra del fabricante y recompras por Ley Limón en los 50 estados. Respaldado por NMVTIS e instantáneo — sin registro.",
    keywords: [
      "verificación Ley Limón VIN", "este auto es un limón", "recompra Ley Limón",
      "VIN Ley Limón check", "California Ley Limón", "Texas Ley Limón", "Florida Ley Limón",
      "historial recompra fabricante", "lemon law español", "auto defectuoso",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Verificación Ley Limón por VIN — Búsqueda de recompra gratis, 50 estados",
      description: "Verificación gratis de Ley Limón por VIN. NMVTIS-respaldado, instantáneo, los 50 estados.",
      url: alt.canonical,
      type: "article",
      siteName: "CarCheckerVIN",
      locale: "es_US",
    },
    robots: { index: true, follow: true },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: LEMON_CHECK_COPY.es.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Verificación Ley Limón", item: `${SITE}/es/lemon-check` },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LemonCheckPageBody locale="es" />
    </>
  );
}
