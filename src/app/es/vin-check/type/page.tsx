import type { Metadata } from "next";
import VinCheckTypeHubBody, { FAQS_ES } from "@/components/VinCheckTypeHubBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/vin-check/type`;
const alt = hreflangAlternatesForLocale("/vin-check/type", "es");
const title =
  "Verificación VIN por tipo de vehículo — Deportivos, remolques y botes";
const description =
  "Verificación VIN gratis por tipo de vehículo. Verifica una motonieve, moto cross, UTV, remolque o bote usado por VIN (o HIN) — confirma el año y revisa los registros de robo y título antes de comprar.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "verificación VIN por tipo de vehículo",
    "verificación VIN deportiva",
    "verificación VIN motonieve",
    "verificación VIN moto cross",
    "verificación VIN UTV",
    "verificación VIN remolque",
    "verificación VIN bote",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Verificación VIN gratis por tipo de vehículo — motonieves, motos cross, UTV, remolques y botes.",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  inLanguage: "es",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Verificación VIN", item: `${SITE}/es/vin-check` },
    { "@type": "ListItem", position: 3, name: "Por tipo de vehículo", item: PAGE_URL },
  ],
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "es",
  name: "Verificación VIN por tipo de vehículo",
  description,
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: ORG_AUTHOR,
};

const DIRECTORY_ITEMS = [
  { href: "/es/vin-check/type/snowmobile", label: "Verificación VIN de motonieve" },
  { href: "/es/vin-check/type/dirt-bike", label: "Verificación VIN de moto cross" },
  { href: "/es/vin-check/type/utv", label: "Verificación VIN de UTV y Side-by-Side" },
  { href: "/es/atv-vin-check", label: "Verificación VIN de ATV" },
  { href: "/es/motorcycle-vin-check", label: "Verificación VIN de motocicleta" },
  { href: "/es/harley-davidson-vin-check", label: "Verificación VIN de Harley-Davidson" },
  { href: "/es/vin-check/type/trailer", label: "Verificación VIN de remolque" },
  { href: "/es/rv-vin-check", label: "Verificación VIN de RV" },
  { href: "/es/semi-truck-vin-lookup", label: "Búsqueda VIN de camión semi" },
  { href: "/es/golf-cart-vin-lookup", label: "Búsqueda VIN de carrito de golf" },
  { href: "/es/vin-check/type/boat", label: "Verificación VIN de bote (HIN)" },
  { href: "/es/hin-lookup", label: "Búsqueda HIN de bote" },
  { href: "/es/classic-car-vin", label: "Verificación VIN de auto clásico" },
  { href: "/es/stolen-vehicle-check", label: "Verificación de vehículo robado" },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  inLanguage: "es",
  name: "Herramientas de verificación VIN por tipo de vehículo",
  itemListElement: DIRECTORY_ITEMS.map((l, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: l.label,
    url: `${SITE}${l.href}`,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": PAGE_URL,
  inLanguage: "es",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".speakable-intro", ".speakable-answer", "h1"],
  },
};

export default function VinCheckTypeHubPageEs() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <VinCheckTypeHubBody locale="es" />
    </>
  );
}
