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
const title = "Vérification gratuit de privilège du véhicule — Encuentra prêts, gravámenes et recuperaciones ocultos par VIN";
const description = "Verifica n’importe quel véhicule en busca de gravámenes ocultos, prêts pendientes, enregistrements de récupération et historique de vente antes de acheter — gratuit. Recherche de privilège basada en VIN que te protege de heredar la deuda de otra persona.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification privilège du véhicule", "vérification privilège auto", "vérification privilège gratuit", "vérifier auto par privilège", "búsqueda privilège du véhicule", "vérification privilège VIN", "vérification privilège prêt auto", "vérifier véhicule par gravámenes", "búsqueda gratuit privilège auto", "vérification privilège par VIN", "búsqueda privilège gratuit", "vérification prêt pendiente auto", "búsqueda titular privilège", "vérification privilège DMV", "historique récupération auto", "vérification récupération véhicule", "vérification privilège titre", "titular privilège par VIN", "hay privilège en mi auto", "vérifier privilège antes de acheter", "trouver privilège véhicule", "búsqueda gratuit privilège véhicule", "vérification liberación titular privilège", "vérification financement auto", "búsqueda gratuit financement auto"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Recherche gratuite de privilège basada en VIN. Encuentra prêts, gravámenes et enregistrements de récupération ocultos antes de acheter." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Vérification de privilège du véhicule", url: PAGE_URL, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", description: "Vérification gratuit de privilège du véhicule basada en VIN. Muestra gravámenes de prêts pour auto, gravámenes mecánicos, gravámenes de almacenamiento, gravámenes fiscales, gravámenes de sentencia et historique de récupération.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Vérification gratuit de privilège du véhicule par VIN", description: "Comment vérifier un véhicule en busca de gravámenes ocultos par VIN, les six tipos de privilège que bloquean una transferencia de titre, banderas rojas de un privilège no divulgado et comment cerrar de forma segura si encuentras uno.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-09" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "fr", name: "Comment vérifier un véhicule par privilège", description: "Ejecuta una vérification gratuit de privilège basada en VIN en quatre pasos: ingresa le VIN, consultationtiontiontiontiontion les enregistrements de DMV estatal et de prestamistas, revisa le titular et état du privilège, et sigue un plan de protección.", totalTime: "PT2M", estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" }, step: [{ "@type": "HowToStep", position: 1, name: "Ingresa le VIN de 17 caracteres", text: "Localiza le Número de Identificación du Vehículo de 17 caracteres en le tablero, marco de la puerta du conductor ou documento du titre, luego ingrésalo en le cuadro de búsqueda en la parte superior de la página." }, { "@type": "HowToStep", position: 2, name: "Consultamos enregistrements de DMV estatal et prestamistas", text: "Cruzamos le VIN contra enregistrements de marque de titre de DMV estatales, NMVTIS, presentaciones UCC-1 et enregistrements reportadeux de prestamistas pour mostrar n’importe quel privilège activo ou histórico." }, { "@type": "HowToStep", position: 3, name: "Revisa le titular du privilège et le état actual", text: "El rapport muestra le nombre du titular du privilège, le tipo de privilège, cuándo se presentó et si está actualmente activo ou ha sido liberado. Los gravámenes activos requieren liquidación antes de que le titre pueda transferirse a ti." }, { "@type": "HowToStep", position: 4, name: "Sigue ta plan de protección", text: "Si un privilège está activo, solicita una carta de pago final du privilège, utilise un service de depósito en garantie ou cierra le trato directamente en la oficina du prestamista. Si le vendeur no puede ou no quiere cooperar, aléjate." }] };
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
