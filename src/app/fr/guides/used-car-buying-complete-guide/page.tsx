/**
 * Wave 18 batch 2 — French used-car-buying complete guide. Same full
 * layout in both locales via the shared GuideUsedCarBuyingBody.
 */

import type { Metadata } from "next";
import GuideUsedCarBuyingBody, { FAQS_FR } from "@/components/GuideUsedCarBuyingBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/guides/used-car-buying-complete-guide`;
const alt = hreflangAlternatesForLocale("/guides/used-car-buying-complete-guide", "fr");
const title = "La guide complète pour acheter un voiture d’occasion (Édition 2026)";
const description =
  "Todo le que necesitas pour acheter un voiture d’occasion en 2026: presupuesto, financement, où buscar, inspectiones, négociation, papeleo et étapes posteriores a la compra de expertos de la industria.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "guide compra voiture d’occasion",
    "comment acheter un voiture d’occasion",
    "guide complète voiture d’occasion",
    "consejos compra voiture d’occasion 2026",
    "lista vérification compra voiture d’occasion",
    "négociation voiture d’occasion",
    "guide inspection voiture d’occasion",
    "meilleures voitures d’occasion pour acheter",
    "guide financement voiture d’occasion",
    "lista papeleo voiture d’occasion",
    "que saber avant de acheter un voiture d’occasion",
    "guide acheteur voiture d’occasion 2026",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description: "À partir de le presupuesto hasta le papeleo final: una guide escrita par expertos de plus de 3,000 palabras pour acheter un voiture d’occasion de manétait segura et avec confiance en 2026.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Guide complet étape a étape pour acheter un voiture d’occasion en 2026.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: title,
  description:
    "Una guide complète, étape a étape, pour acheter un voiture d’occasion en 2026 couvrant presupuesto, financement, búsqueda, inspection, négociation et papeleo.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-23",
  dateModified: "2026-04-23",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment acheter une voiture d’occasion en 2026",
  description:
    "Un proceso de sept étapes pour acheter un voiture d’occasion avec sécurité: establece un presupuesto, asegura financement, busca anuncios, décode le VIN, inspectiona, negocia et complète le papeleo.",
  totalTime: "P14D",
  step: [
    { "@type": "HowToStep", position: 1, name: "Establece un presupuesto réelista", text: "Calcule le coût mensuel total (paiement du prêt, assurance, carburant, entretien, enregistrement) et limítalo al 15% du salario neto." },
    { "@type": "HowToStep", position: 2, name: "Obtiens financement pre-apvolé", text: "Asegura una oferta de prêt de una coopétaittiva de crédito ou banco avant de visitar concessionnaires pour que negocies desde la a étérza." },
    { "@type": "HowToStep", position: 3, name: "Busca en les marchés corrects", text: "Utilise una mezcla de concessionnaires franquiciadeux, lotes indépendants, programas certificadeux pre-poseídeux et platafaçons particulares pour trouver le meilleur inventerio." },
    { "@type": "HowToStep", position: 4, name: "Ejecuta una vérification VIN", text: "Décode le VIN et obtiens un rapport de historique de véhicule pour vérifier le état du titre, historique de accidents, lecturas du odomètre et rappels avant de salir." },
    { "@type": "HowToStep", position: 5, name: "Inspectiona et prueba de manejo", text: "Realiza una inspection visuelle estructurada, paye par una inspection avant de la compra indépendant et complète una prueba de manejo de 30 minutes en condiciones mixtas." },
    { "@type": "HowToStep", position: 6, name: "Negocia precio et conditions", text: "Ánclate en le precio total, nonn en le mensuelité, et aléjate si les tarifas du concessionnaire, extras ou tasas de intérêt exceden ta pre-approbation." },
    { "@type": "HowToStep", position: 7, name: "Completa papeleo et enregistrement", text: "Vérifie le titre, factura de vente, divulgation du odomètre et papeleo de garantie; luego registra le véhicule et actualiza ta assurance." },
  ],
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Guías", item: `${SITE}/fr/guides` },
    { "@type": "ListItem", position: 3, name: "Guide complet pour acheter un voiture d’occasion", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GuideUsedCarBuyingBody locale="fr" />
    </>
  );
}
