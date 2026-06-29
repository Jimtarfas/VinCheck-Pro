/**
 * Wave 18a — French hail-damage-check. Same full English layout via the
 * shared HailDamageCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import HailDamageCheckBody, { FAQS_FR } from "@/components/HailDamageCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/hail-damage-check`;
const alt = hreflangAlternatesForLocale("/hail-damage-check", "fr");
const title = "Vérification de dégâtss par grêle par VIN — Detecta dégâtss par tormenta avant de acheter";
const description =
  "Vérifie n’importe quel véhicule par historique de dégâtss par grêle en utilisant le VIN. Trouve enregistrements de dégâtss par tormenta, réclamations de assurances et titrois marques par grêle que peutn afectar le valeur de revente et la integridad estructural.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "vérification dégâtss grêle VIN",
    "historique dégâtss tormenta véhicule",
    "vérification grêle auto VIN",
    "titre marque par grêle",
    "réclamation assurance dégâtss grêle",
    "auto dañado par tormenta",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Vérification de dégâtss par grêle par VIN",
  description:
    "Apprends a vérifier n’importe quel véhicule par historique de dégâtss par grêle en utilisant le VIN, incluant enregistrements de dégâtss par tormenta, réclamations de assurances et marques en le titre par grêle.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-04",
  dateModified: new Date().toISOString().slice(0, 10),
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
    { "@type": "ListItem", position: 2, name: "Vérification de dégâtss par grêle", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HailDamageCheckBody locale="fr" />
    </>
  );
}
