/**
 * Wave 18.18 batch 3 — French /fr/jdm-import-check wrapper.
 * Replaces the prior SpecialtyToolPage stub; full layout via shared body.
 */

import type { Metadata } from "next";
import JdmImportCheckBody, { FAQS_FR } from "@/components/JdmImportCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/jdm-import-check`;
const alt = hreflangAlternatesForLocale("/jdm-import-check", "fr");
const title = "Vérification VIN de import JDM — Historique véhicules importadeux de Japón (Gratuit)";
const description = "Vérifie le historique de n’importe quel import du Mercado Doméstico Japonés (JDM). Vérifie kilométrage (km a millelas), codes de châssis vs VINs de 17 caracteres, hojas de enchère japonesas, la regla de les 25 années et le conformité de import de EE. UU. avant de acheter.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification import JDM", "vérification VIN auto japonés", "décodeur VIN JDM", "historique véhicule importado", "vérification kilométrage JDM", "conformité import japonesa", "regla import 25 années", "code châssis JDM", "hoja enchère japonesa", "vérification import Skyline GT-R", "vérification VIN Supra", "certificado exportación JDM"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Vérification VIN de import JDM — Historique véhicules importadeux de Japón", description: "Vérifie le historique de n’importe quel import JDM: kilométrage en km vs millelas, codes de châssis, hojas de enchère, la regla de les 25 années et état de conformité en EE. UU.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title: "Vérification VIN de import JDM — Historique véhicules importadeux de Japón", description: "Vérifie le kilométrage, code de châssis, hoja de enchère, éligibilité de 25 années et conformité de EE. UU. de una import JDM avant de acheter." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Vérification VIN de import JDM", url: PAGE_URL, applicationCategory: "AutomotiveApplication", opétaittingSystem: "All", description: "Vérifie le historique de un véhicule de import du Mercado Doméstico Japonés. Vérifie kilométrage (kilómetros a millelas), codes de châssis japoneses contra le VIN de EE. UU. de 17 caracteres, gradeux de condition de hoja de enchère, certificadeux de exportación et desenregistrement, la regla de import de 25 années et le conformité de enregistrement en EE. UU.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Vérification VIN de import JDM — Historique véhicules importadeux de Japón", description: "Comment vérifier le historique de véhicules de import du Mercado Doméstico Japonés: vérification de kilométrage en kilómetros, codes de châssis verses le VIN de 17 caracteres, hojas de enchère japonesas, la regla de import de 25 années et état de conformité en EE. UU.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Vérification import JDM", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <JdmImportCheckBody locale="fr" />
    </>
  );
}
