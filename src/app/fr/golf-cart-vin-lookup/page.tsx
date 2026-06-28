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
const title = "Recherche VIN de voiturette de golf — Décodeur de serial gratuit (Club Car, EZGO, Yamaha)";
const description = "Los carritos de golf usan un numéro de serie, no un VIN de 17 caracteres. Décode un serial Club Car pour le année modelo, avec guides E-Z-GO et Yamaha. Gratuit.";

export const metadata: Metadata = {
  title, description,
  keywords: ["búsqueda VIN voiturette de golf", "búsqueda VIN carrito Yamaha", "búsqueda numéro serie Club Car", "búsqueda numéro serie ezgo", "búsqueda numéro serie voiturette de golf", "année voiturette de golf par numéro de serie", "búsqueda année Club Car", "année carrito Yamaha par numéro de serie", "búsqueda année carrito ezgo", "décodeur VIN voiturette de golf", "comment saber qué année es un voiturette de golf", "búsqueda année modelo voiturette de golf"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US", images: [{ url: `${SITE}/golf-cart-vin-lookup/opengraph-image`, width: 1200, height: 630, alt: "Recherche VIN de voiturette de golf — décodeur gratuit de numéro de serie" }] },
  twitter: { card: "summary_large_image", title, description: "Los carritos de golf usan un numéro de serie, no un VIN vial. Decodifícalo pour trouver le année modelo. Gratuit, instantané, sans inscription.", images: [`${SITE}/golf-cart-vin-lookup/opengraph-image`] },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Recherche VIN / numéro de serie de voiturette de golf", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Herramienta gratuit pour trouver et décoder un numéro de serie de voiturette de golf — Club Car, E-Z-GO ou Yamaha — pour determinar le année modelo. Los carritos de golf usan un numéro de serie du fabricante en lugar de un VIN vial de 17 caracteres.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "fr", name: "Comment buscar le année de un voiturette de golf par numéro de serie", description: "Guía paso a paso pour trouver et décoder un numéro de serie de voiturette de golf pour determinar le année modelo en un carrito Club Car, E-Z-GO ou Yamaha.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Identifica la marque", text: "Confirma si le carrito es Club Car, E-Z-GO ou Yamaha — cada uno codifica le année de manera diferente. La marque usualmente está en la carrocería, la columna de dirección ou le asiento." }, { "@type": "HowToStep", position: 2, name: "Localiza le numéro de serie", text: "Encuentra le serial en le châssis et la etiqueta: Club Car debajo de la guantera ou asiento du conductor, E-Z-GO debajo du asiento ou cerca du controlador, Yamaha estampado en le châssis debajo du asiento." }, { "@type": "HowToStep", position: 3, name: "Lee ou décode le année", text: "Para un Club Car, ingresa le serial al décodeur pour leer le année modelo et semana. Para Yamaha ou E-Z-GO, coincide le prefijo de modelo avec la tabla de années de esa marque." }, { "@type": "HowToStep", position: 4, name: "Verifica contra le carrito", text: "Coincide le année et modelo décodedeux avec les características du carrito et la afirmación du vendeur. Una discrepancia entre le serial et le année anunciado es una bandera roja." }, { "@type": "HowToStep", position: 5, name: "Utilise le année pour ordenar partes ou valuar le carrito", text: "Una vez que conoces le année modelo exacto, ordena baterías, controladores et accèsrios específicos du année, ou úsalo pour ponerle precio al carrito pour vente ou compra." }] };
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
