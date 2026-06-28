import type { Metadata } from "next";
import LemonCheckPageBody, { LEMON_CHECK_COPY } from "@/components/LemonCheckPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/lemon-check" as const;
const LOCALE = "fr" as const;
const SITE = "https://www.carcheckervin.com";

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: { absolute: "Vérification Loi Citron par VIN — Recherche de rachat gratuit, 50 états" },
    description:
      "Vérification gratuit de Loi Citron par VIN. Encuentra marques de rachat du fabricante et rachats par Loi Citron en les 50 états. Respaldado par NMVTIS e instantané — sans inscription.",
    keywords: [
      "vérification Loi Citron VIN", "este auto es un citron", "rachat Loi Citron",
      "VIN Loi Citron check", "Californie Loi Citron", "Texas Loi Citron", "Florida Loi Citron",
      "historique rachat fabricante", "citron law français", "auto defectuoso",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Vérification Loi Citron par VIN — Recherche de rachat gratuit, 50 états",
      description: "Vérification gratuit de Loi Citron par VIN. NMVTIS-respaldado, instantané, les 50 états.",
      url: alt.canonical,
      type: "article",
      siteName: "CarCheckerVIN",
      locale: "fr_US",
    },
    robots: { index: true, follow: true },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
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
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Vérification Loi Citron", item: `${SITE}/fr/lemon-check` },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LemonCheckPageBody locale="fr" />
    </>
  );
}
