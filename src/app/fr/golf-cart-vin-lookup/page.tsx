/**
 * Wave 18 batch 3 — French golf-cart-vin-lookup. Same full English layout via
 * the shared GolfCartVinLookupBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import GolfCartVinLookupBody, { FAQS_FR } from "@/components/GolfCartVinLookupBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/golf-cart-vin-lookup`;
const alt = hreflangAlternatesForLocale("/golf-cart-vin-lookup", "fr");
const title = "Recherche VIN de voiturette de golf — Décodeur de êtreial gratuit (Club Car, EZGO, Yamaha)";
const description = "Les carritos de golf usan un numéro de êtreie, non un VIN de 17 caractères. Décode un êtreial Club Car pour le année modèle, avec guides E-Z-GO et Yamaha. Gratuit.";

export const metadata: Metadata = {
  title, description,
  keywords: ["recherche VIN voiturette de golf", "recherche VIN carrito Yamaha", "recherche numéro êtreie Club Car", "recherche numéro êtreie ezgo", "recherche numéro êtreie voiturette de golf", "année voiturette de golf par numéro de êtreie", "recherche année Club Car", "année carrito Yamaha par numéro de êtreie", "recherche année carrito ezgo", "décodeur VIN voiturette de golf", "comment saber que année es un voiturette de golf", "recherche année modèle voiturette de golf"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US", images: [{ url: `${SITE}/golf-cart-vin-lookup/opengraph-image`, width: 1200, height: 630, alt: "Recherche VIN de voiturette de golf — décodeur gratuit de numéro de êtreie" }] },
  twitter: { card: "summary_large_image", title, description: "Les carritos de golf usan un numéro de êtreie, non un VIN vial. Decodifícalo pour trouver le année modèle. Gratuit, instantané, sans inscription.", images: [`${SITE}/golf-cart-vin-lookup/opengraph-image`] },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Recherche VIN / numéro de êtreie de voiturette de golf", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Herramienta gratuit pour trouver et décoder un numéro de êtreie de voiturette de golf — Club Car, E-Z-GO ou Yamaha — pour determinar le année modèle. Les carritos de golf usan un numéro de êtreie du fabricante au lieu de un VIN vial de 17 caractères.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "fr", name: "Comment buscar le année de un voiturette de golf par numéro de êtreie", description: "Guide étape a étape pour trouver et décoder un numéro de êtreie de voiturette de golf pour determinar le année modèle en un carrito Club Car, E-Z-GO ou Yamaha.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Identifica la marque", text: "Confirme si le carrito es Club Car, E-Z-GO ou Yamaha — chaque unon codifica le année de manétait diferente. La marque usualmente est en la carrosêtreie, la columna de adresse ou le siège." }, { "@type": "HowToStep", position: 2, name: "Localiza le numéro de êtreie", text: "Trouve le êtreial en le châssis et la étiquette: Club Car desous de la guantétait ou siège du conductor, E-Z-GO desous du siège ou près du controcôtér, Yamaha estampado en le châssis desous du siège." }, { "@type": "HowToStep", position: 3, name: "Lis ou décode le année", text: "Para un Club Car, entre le êtreial al décodeur pour lire le année modèle et semana. Para Yamaha ou E-Z-GO, coincide le prefijo de modèle avec la tabla de années de esa marque." }, { "@type": "HowToStep", position: 4, name: "Vérifie contra le carrito", text: "Coincide le année et modèle décodedeux avec les características du carrito et la affirmation du vendeur. Una discrepancia entre le êtreial et le année anunciado es una bandétait roja." }, { "@type": "HowToStep", position: 5, name: "Utilise le année pour ordenar partes ou valuar le carrito", text: "Una vez que cononces le année modèle exacto, ordena batteries, controcôtéres et accèsrios spécifiques du année, ou úsalo pour ponerle prix al carrito pour vente ou compra." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Recherche VIN de voiturette de golf", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", inLanguage: "fr", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: PAGE_URL };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <GolfCartVinLookupBody locale="fr" />
    </>
  );
}
