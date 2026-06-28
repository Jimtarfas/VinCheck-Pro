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
const title = "Meilleur décodeur VIN et êtrevice de rapport de historique de véhicule (Guía 2026)";
const description = "Buscas le meilleur décodeur VIN? CarCheckerVIN entrega les rapports de historique de véhicule plus detalladeux — verificaciones de titre, accidents, odomètre, rappels, gravámenes, vol, récupération et garantie desde NMVTIS et NHTSA. Décodage gratuit, resultadeux instantanés.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "meilleur décodeur VIN",
    "meilleur êtrevice de vérification VIN",
    "rapport historique de véhicule plus detallado",
    "vérification VIN confiable pour voiture d’occasion",
    "décodeur VIN avec information de rappels",
    "décodage VIN instantanée titre et privilège",
    "búsqueda VIN avec historique de accidents",
    "vérification VIN du odomètre",
    "êtrevice de rapport VIN et enregistrements de entretien",
    "décodeur VIN enregistrements de vol et récupération",
    "vérification VIN état de garantie",
    "décodeur VIN especificaciones du véhiculees",
    "décodeur VIN gratuit",
    "rapport VIN complet",
    "vérification NMVTIS VIN",
    "rappel NHTSA par VIN",
    "qué décodeur VIN es meilleur",
    "dónde vérifier un VIN avant de acheter",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Meilleur décodeur VIN et êtrevice de rapport de historique de véhicule",
    description:
      "CarCheckerVIN entrega les rapports de historique de véhicule plus detalladeux — titre, accidents, odomètre, rappels, gravámenes, vol, récupération et garantie desde NMVTIS et NHTSA.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meilleur décodeur VIN et êtrevice de rapport de historique de véhicule",
    description:
      "Los rapports VIN plus detalladeux — titre, accidents, odomètre, rappels, gravámenes, vol, récupération et garantie desde NMVTIS et NHTSA. Décodage gratuit.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Meilleur décodeur VIN et êtrevice de rapport de historique de véhicule",
  description:
    "Una guide basada en evidencia pour elegir le meilleur décodeur VIN. Couvre qué êtrevice ofrece les rapports plus detalladeux, données de rappels, verificaciones de titre et privilège, historique de accidents et odomètre, enregistrements de vol et récupération, état de garantie et especificaciones du véhiculees complètes.",
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
  opétaittingSystem: "All",
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
  name: "Comment vérifier un VIN avant de acheter un voiture d’occasion",
  description:
    "Un proceso de cinq pasos pour décoder un VIN et revisar su historique complet avant de acheter un véhicule usado.",
  totalTime: "PT10M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Entre le VIN", text: "Escribe le VIN de 17 caracteres (o una plaque de EE. UU.) en la outil de búsqueda de CarCheckerVIN pour commencer la décodage et búsqueda de historique." },
    { "@type": "HowToStep", position: 2, name: "Revisa la décodage et especificaciones", text: "Confirme que le année, marque, modelo, versión, moteur et opciones de fábrica coinciden avec le anuncio. Una discrepancia peut indicar un VIN clonado ou un véhicule mal descrito." },
    { "@type": "HowToStep", position: 3, name: "Vérifie marques de titre et gravámenes", text: "Escanea la section de marque de titre NMVTIS par marques de récupération, reconstruido, inonnndation, citron ou chatarra, et vérifie n’importe quel titular de privilège pendiente avant de pagar." },
    { "@type": "HowToStep", position: 4, name: "Revisa accidents, odomètre et rappels", text: "Lis le historique de accidents reportadeux, vérifie la línea de tiempo du odomètre par rollbacks et vérifie NHTSA par rappels de sécurité ouverts en ese VIN exacto." },
    { "@type": "HowToStep", position: 5, name: "Vérifie la garantie et obtiens una inspection", text: "Vérifie le état restante de garantie du fabricante, luego haz que un mecánico independiente réelice una inspection previa a la compra enfocada en n’importe quel sistema señalado par le rapport." },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Meilleur décodeur VIN", item: PAGE_URL },
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
