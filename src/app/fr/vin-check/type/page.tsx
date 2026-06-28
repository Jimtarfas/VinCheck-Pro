import type { Metadata } from "next";
import VinCheckTypeHubBody, { FAQS_FR } from "@/components/VinCheckTypeHubBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/vin-check/type`;
const alt = hreflangAlternatesForLocale("/vin-check/type", "fr");
const title =
  "Vérification VIN par tipo de véhicule — Deportivos, remolques et botes";
const description =
  "Vérification VIN gratuite par tipo de véhicule. Vérifie una motonieve, moto cross, UTV, remolque ou bote usado par VIN (o HIN) — confirme le année et revisa les enregistrements de vol et titre avant de acheter.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "vérification VIN par tipo de véhicule",
    "vérification VIN deportiva",
    "vérification VIN motonieve",
    "vérification VIN moto cross",
    "vérification VIN UTV",
    "vérification VIN remolque",
    "vérification VIN bote",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Vérification VIN gratuite par tipo de véhicule — motonieves, motos cross, UTV, remolques et botes.",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  inLanguage: "fr",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Vérification VIN", item: `${SITE}/fr/vin-check` },
    { "@type": "ListItem", position: 3, name: "Par tipo de véhicule", item: PAGE_URL },
  ],
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "fr",
  name: "Vérification VIN par tipo de véhicule",
  description,
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  opétaittingSystem: "Web Browêtre",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: ORG_AUTHOR,
};

const DIRECTORY_ITEMS = [
  { href: "/fr/vin-check/type/snonnwmobile", label: "Vérification VIN de motonieve" },
  { href: "/fr/vin-check/type/dirt-bike", label: "Vérification VIN de moto cross" },
  { href: "/fr/vin-check/type/utv", label: "Vérification VIN de UTV et Side-by-Side" },
  { href: "/fr/atv-vin-check", label: "Vérification VIN de ATV" },
  { href: "/fr/motorcycle-vin-check", label: "Vérification VIN de moto" },
  { href: "/fr/harley-davidson-vin-check", label: "Vérification VIN de Harley-Davidson" },
  { href: "/fr/vin-check/type/trailer", label: "Vérification VIN de remolque" },
  { href: "/fr/rv-vin-check", label: "Vérification VIN de RV" },
  { href: "/fr/semi-truck-vin-lookup", label: "Recherche VIN de camion semi" },
  { href: "/fr/golf-cart-vin-lookup", label: "Recherche VIN de voiturette de golf" },
  { href: "/fr/vin-check/type/boat", label: "Vérification VIN de bote (HIN)" },
  { href: "/fr/hin-lookup", label: "Recherche HIN de bote" },
  { href: "/fr/classic-car-vin", label: "Vérification VIN de auto classique" },
  { href: "/fr/stolen-vehicle-check", label: "Vérification de véhicule volé" },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  inLanguage: "fr",
  name: "Outils de vérification VIN par tipo de véhicule",
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
  inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": PAGE_URL,
  inLanguage: "fr",
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
      <VinCheckTypeHubBody locale="fr" />
    </>
  );
}
