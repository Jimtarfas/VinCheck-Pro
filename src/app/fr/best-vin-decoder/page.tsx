/**
 * Wave 18 batch 4 — French best-vin-decoder. Same full English layout in
 * both locales via the shared BestVinDecoderBody. Replaces the Wave 15
 * SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import BestVinDecoderBody, { FAQS_FR } from "@/components/BestVinDecoderBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/best-vin-decoder`;
const alt = hreflangAlternatesForLocale("/best-vin-decoder", "fr");
const title = "Mejor décodeur VIN et service de rapport de historique de véhicule (Guía 2026)";
const description = "Buscas le mejor décodeur VIN? CarCheckerVIN entrega les rapports de historique de véhicule plus detalladeux — verificaciones de titre, accidents, odomètre, rappels, gravámenes, vol, récupération et garantie desde NMVTIS et NHTSA. Décodeción gratuit, resultadeux instantanés.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "mejor décodeur VIN",
    "mejor service de vérification VIN",
    "rapport historique de véhicule plus detallado",
    "vérification VIN confiable pour voiture d’occasion",
    "décodeur VIN avec información de rappels",
    "décodeción VIN instantanée titre et privilège",
    "búsqueda VIN avec historique de accidents",
    "vérification VIN du odomètre",
    "service de rapport VIN et enregistrements de entretien",
    "décodeur VIN enregistrements de vol et récupération",
    "vérification VIN état de garantie",
    "décodeur VIN especificaciones du véhiculees",
    "décodeur VIN gratuit",
    "rapport VIN complet",
    "vérification NMVTIS VIN",
    "rappel NHTSA par VIN",
    "qué décodeur VIN es mejor",
    "dónde vérifier un VIN antes de acheter",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Mejor décodeur VIN et service de rapport de historique de véhicule",
    description:
      "CarCheckerVIN entrega les rapports de historique de véhicule plus detalladeux — titre, accidents, odomètre, rappels, gravámenes, vol, récupération et garantie desde NMVTIS et NHTSA.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mejor décodeur VIN et service de rapport de historique de véhicule",
    description:
      "Los rapports VIN plus detalladeux — titre, accidents, odomètre, rappels, gravámenes, vol, récupération et garantie desde NMVTIS et NHTSA. Décodeción gratuit.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Mejor décodeur VIN et service de rapport de historique de véhicule",
  description:
    "Una guide basada en evidencia pour elegir le mejor décodeur VIN. Cubre qué service ofrece les rapports plus detalladeux, données de rappels, verificaciones de titre et privilège, historique de accidents et odomètre, enregistrements de vol et récupération, état de garantie et especificaciones du véhiculees complètes.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-06-16",
  dateModified: "2026-06-16",
  image: `${SITE}/opengraph-image`,
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  inLanguage: "fr",
  name: "CarCheckerVIN — Décodeur VIN et rapports de historique de véhicule",
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Décode n’importe quel VIN de 17 caracteres et extrae un rapport complet de historique de véhicule — marques de titre, accidents, odomètre, rappels, vol, récupération, privilège, garantie et plus de 40 especificaciones. Datos provenientes de NMVTIS et NHTSA.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment vérifier un VIN antes de acheter un voiture d’occasion",
  description:
    "Un proceso de cinq pasos pour décoder un VIN et revisar su historique complet antes de acheter un véhicule usado.",
  totalTime: "PT10M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Ingresa le VIN", text: "Escribe le VIN de 17 caracteres (o una plaque de EE. UU.) en la outil de búsqueda de CarCheckerVIN pour comenzar la décodeción et búsqueda de historique." },
    { "@type": "HowToStep", position: 2, name: "Revisa la décodeción et especificaciones", text: "Confirma que le année, marque, modelo, versión, motor et opciones de fábrica coinciden avec le anuncio. Una discrepancia puede indicar un VIN clonado ou un véhicule mal descrito." },
    { "@type": "HowToStep", position: 3, name: "Verifica marques de titre et gravámenes", text: "Escanea la sección de marque de titre NMVTIS par marques de récupération, reconstruido, inundación, citron ou chatarra, et verifica n’importe quel titular de privilège pendiente antes de pagar." },
    { "@type": "HowToStep", position: 4, name: "Revisa accidents, odomètre et rappels", text: "Lee le historique de accidents reportadeux, verifica la línea de tiempo du odomètre par rollbacks et verifica NHTSA par rappels de sécurité ouverts en ese VIN exacto." },
    { "@type": "HowToStep", position: 5, name: "Verifica la garantie et obtén una inspección", text: "Verifica le état restante de garantie du fabricante, luego haz que un mecánico independiente réelice una inspección previa a la compra enfocada en n’importe quel sistema señalado par le rapport." },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Mejor décodeur VIN", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: PAGE_URL,
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <BestVinDecoderBody locale="fr" />
    </>
  );
}
