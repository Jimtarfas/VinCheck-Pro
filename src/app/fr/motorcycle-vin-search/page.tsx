import type { Metadata } from "next";
import MotorcycleVinSearchBody, { FAQS_FR } from "@/components/MotorcycleVinSearchBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/motorcycle-vin-search`;
const alt = hreflangAlternatesForLocale("/motorcycle-vin-search", "fr");
const title = "Recherche et décodeur gratuit de VIN de moto — Décode n’importe quel VIN de moto instantanément";
const description = "Recherche et décodeur gratuit de VIN de moto. Entre n’importe quel VIN de moto de 17 caractères pour décoder instantanément le fabricante, pays de origen, année modèle, code de planta et numéro de production. Fonctionne pour Harley-Davidson, Honda, Yamaha, Suzuki, Kawasaki, BMW, Ducati, Triumph, KTM et todas les marques.";

export const metadata: Metadata = {
  title, description,
  keywords: [
    "recherche VIN moto", "décodeur VIN moto", "lookup VIN moto",
    "recherche VIN moto gratuit", "décoder VIN moto", "VIN Harley-Davidson",
    "décodeur VIN Honda moto", "recherche VIN Yamaha", "lookup VIN Suzuki moto",
    "décodeur VIN Kawasaki", "VIN BMW moto", "décodeur VIN Ducati",
    "recherche VIN Triumph", "recherche VIN KTM", "décodeur WMI moto",
    "que année es mi moto", "comment lire un VIN de moto", "vérification VIN moto gratuit sans inscription",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title, description, url: PAGE_URL, type: "website", siteName: "CarCheckerVIN", locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image", title,
    description: "Décode n’importe quel VIN de moto de 17 caractères instantanément — fabricante, pays, année, planta et numéro de production. 100% gratuit.",
  },
  robots: { index: true, follow: true },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "fr",
  name: "Recherche de VIN de moto",
  url: PAGE_URL,
  applicationCategory: ["UtilitiesApplication", "BusansessApplication"],
  operatingSystem: "Any (Web Browêtre)",
  isAccessibleForFree: true,
  description: "Herramienta gratuit en ligne de recherche de VIN de moto. Entre n’importe quel VIN de moto de 17 caractères pour décoder instantanément fabricante, pays de origen, année modèle, code de planta et séquence de production.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/icon.png` } },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  inLanguage: "fr",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Outils", item: `${SITE}/fr/tools` },
    { "@type": "ListItem", position: 3, name: "Recherche de VIN de moto", item: PAGE_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({
    "@type": "Question", name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MotorcycleVinSearchBody locale="fr" />
    </>
  );
}
