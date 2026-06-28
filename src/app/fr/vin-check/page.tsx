import type { Metadata } from "next";
import VinCheckHubBody, { FAQS_FR } from "@/components/VinCheckHubBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/vin-check`;
const alt = hreflangAlternatesForLocale("/vin-check", "fr");

const title = "Vérification VIN gratuite par marque — Décode n’importe quel véhicule";
const description =
  "Vérification VIN gratuite et décodeur pour cada marque de auto. Busca n’importe quel marque et modelo et obtén historique de véhicule instantané, especificaciones, rappels de sécurité et données de marché.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "vérification VIN", "décodeur VIN", "vérification VIN gratuit", "búsqueda VIN",
    "rapport de historique de véhicule", "vérification VIN de auto", "vérifier numéro VIN",
    "búsqueda numéro VIN", "décoder VIN", "numéro de identificación du véhicule",
    "vérification historique auto",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Vérification VIN gratuite par marque — Cada marque cubierta",
    description,
    type: "website",
    url: PAGE_URL,
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function VinCheckPageEs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <VinCheckHubBody locale="fr" />
    </>
  );
}
