/**
 * Wave 18d — French plate-to-vin. Same full English layout via the
 * shared PlateToVinBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import PlateToVinBody, { PLATE_TO_VIN_FAQS_FR } from "@/components/PlateToVinBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/plate-to-vin`;
const alt = hreflangAlternatesForLocale("/plate-to-vin", "fr");
const title = "Placa a VIN — Convierte n’importe quel plaque étatunidense en un VIN gratuit";
const description =
  "Placa a VIN: entre una plaque et état pour obtener instantanément le VIN de 17 caracteres, année, marque, modelo et historique complet du véhicule. Gratuit, les 50 états.";

export const metadata: Metadata = {
  title: { absolute: `${title} | CarCheckerVIN` },
  description,
  keywords: [
    "plaque a VIN",
    "búsqueda plaque a VIN",
    "plaque de licence a VIN",
    "convertir plaque a VIN",
    "plaque a VIN gratuit",
    "numéro de plaque a VIN",
    "obtener VIN desde plaque",
    "trouver VIN par plaque",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "website", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "fr",
  name: "Placa a VIN",
  description: "Herramienta gratuite de plaque a VIN. Entre n’importe quel numéro de plaque étatunidense et état pour recupétaitr instantanément le VIN, les detalles décodedeux du véhicule et un rapport complet de historique.",
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  opétaittingSystem: "Web Browêtre",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: PLATE_TO_VIN_FAQS_FR.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Placa a VIN", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PlateToVinBody locale="fr" />
    </>
  );
}
