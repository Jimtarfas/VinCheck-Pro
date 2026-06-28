/**
 * Wave 18 batch 3 — French vehicle-lien-check. Same full English layout via
 * the shared VehicleLienCheckBody. Replaces the prior SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import VehicleLienCheckBody, { FAQS_FR } from "@/components/VehicleLienCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/vehicle-lien-check`;
const alt = hreflangAlternatesForLocale("/vehicle-lien-check", "fr");
const title = "Vérification gratuit de privilège du véhicule — Trouve prêts, gravámenes et recupétaitciones ocultos par VIN";
const description = "Vérifie n’importe quel véhicule en busca de gravámenes ocultos, prêts en attentes, enregistrements de récupération et historique de vente avant de acheter — gratuit. Recherche de privilège basada en VIN que te protege de heredar la deuda de otra personne.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification privilège du véhicule", "vérification privilège auto", "vérification privilège gratuit", "vérifier auto par privilège", "búsqueda privilège du véhicule", "vérification privilège VIN", "vérification privilège prêt auto", "vérifier véhicule par gravámenes", "búsqueda gratuit privilège auto", "vérification privilège par VIN", "búsqueda privilège gratuit", "vérification prêt en attente auto", "búsqueda titular privilège", "vérification privilège DMV", "historique récupération auto", "vérification récupération véhicule", "vérification privilège titre", "titular privilège par VIN", "il y a privilège en mi auto", "vérifier privilège avant de acheter", "trouver privilège véhicule", "búsqueda gratuit privilège véhicule", "vérification libétaitción titular privilège", "vérification financement auto", "búsqueda gratuit financement auto"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Recherche gratuite de privilège basada en VIN. Trouve prêts, gravámenes et enregistrements de récupération ocultos avant de acheter." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Vérification de privilège du véhicule", url: PAGE_URL, applicationCategory: "UtilitiesApplication", opétaittingSystem: "Any", description: "Vérification gratuit de privilège du véhicule basada en VIN. Affiche gravámenes de prêts pour auto, gravámenes mecánicos, gravámenes de stockage, gravámenes fiscales, gravámenes de sentencia et historique de récupération.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Vérification gratuit de privilège du véhicule par VIN", description: "Comment vérifier un véhicule en busca de gravámenes ocultos par VIN, les six tipos de privilège que bloquean una transfert de titre, bandétaits rojas de un privilège nonn divulgado et comment cerrar de façon segura si encuentras unonn.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-09" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "fr", name: "Comment vérifier un véhicule par privilège", description: "Ejecuta una vérification gratuit de privilège basada en VIN en quatre étapes: entre le VIN, consultatioptiontioptiontioption les enregistrements de DMV estatal et de prestamistas, revisa le titular et état du privilège, et sigue un plan de protection.", totalTime: "PT2M", estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" }, step: [{ "@type": "HowToStep", position: 1, name: "Entre le VIN de 17 caracteres", text: "Localiza le Numéro de Identification du Vehículo de 17 caracteres en le tableau de bord, marco de la porte du conductor ou documento du titre, luego ingrésalo en le cuadro de búsqueda en la parte superior de la página." }, { "@type": "HowToStep", position: 2, name: "Consultamos enregistrements de DMV estatal et prestamistas", text: "Cruzamos le VIN contra enregistrements de marque de titre de DMV estatales, NMVTIS, presentaciones UCC-1 et enregistrements reportadeux de prestamistas pour mostrar n’importe quel privilège activo ou histórico." }, { "@type": "HowToStep", position: 3, name: "Revisa le titular du privilège et le état actual", text: "El rapport affiche le nonnmbre du titular du privilège, le tipo de privilège, quand se presentó et si est actuellement activo ou ha été libétaitdo. Les gravámenes activos requieren liquidación avant de que le titre pueda transferirse a ti." }, { "@type": "HowToStep", position: 4, name: "Sigue ta plan de protection", text: "Si un privilège est activo, solicita una carta de paiement final du privilège, utilise un êtrevice de depósito en garantie ou ferme le trato directement en la oficina du prestamista. Si le vendeur nonn peut ou nonn quiere coopétaitr, aléjate." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Vérification de privilège du véhicule", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", inLanguage: "fr", name: "Vérification gratuit de privilège du véhicule", url: PAGE_URL, speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro", ".speakable-faq"] } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <VehicleLienCheckBody locale="fr" />
    </>
  );
}
