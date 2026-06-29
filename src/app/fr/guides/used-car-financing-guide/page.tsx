/**
 * Wave 18 batch 2 — French twin of /guides/used-car-financing-guide.
 * Full English layout mirrored in French via the shared body.
 */

import type { Metadata } from "next";
import GuideUsedCarFinancingBody, { FAQS_FR } from "@/components/GuideUsedCarFinancingBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/guides/used-car-financing-guide`;
const alt = hreflangAlternatesForLocale("/guides/used-car-financing-guide", "fr");
const title = "Financement de voiture d’occasion: La guide complète 2026";
const description =
  "Comment financiar un voiture d’occasion en 2026: puntajes de crédit, concessionnaire vs banco vs coopérative de crédit, preapprobation, APR vs coût total, louer vs acheter, refinanciar et trampas a evitar.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "financement de voiture d’occasion",
    "guide prêt voiture d’occasion",
    "guide prêt de auto",
    "meilleur prêt voiture d’occasion",
    "tasas prêt voiture d’occasion 2026",
    "preapprobation prêt auto",
    "prêt auto coopérative de crédit",
    "refinanciar prêt auto",
    "louer vs acheter voiture d’occasion",
    "calculateur prêt voiture d’occasion",
    "APR vs coût total",
    "paiement inicial voiture d’occasion",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description:
      "Puntajes de crédit, prestamistas, preapprobation, APR vs. coût total, louer vs acheter et refinanciar — le manual complet pour financiar un voiture d’occasion en 2026.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Puntajes de crédit, prestamistas, preapprobation, APR vs. coût total, louer vs acheter et refinanciar — le manual complet pour financiar un voiture d’occasion en 2026.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Financement de voiture d’occasion: La guide complète 2026",
  description:
    "Guide complet pour financiar un voiture d’occasion en 2026: crédit, prestamistas, preapprobation, APR, coût total, location, refinancement et comment evitar les trampas de la oficina de finances.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-23",
  dateModified: new Date().toISOString().slice(0, 10),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment financiar un voiture d’occasion",
  step: [
    { "@type": "HowToStep", position: 1, name: "Obtiens et revisa ta crédit", text: "Obtiens tes rapports de crédit gratuit de annualcreditreport.com et disputa n’importe quel error avant de aplicar." },
    { "@type": "HowToStep", position: 2, name: "Calcule un prêt asequible", text: "Aplica la regla 20/4/10: al menons 20% de paiement inicial, plazo maximum de 4 années, coût total de transporte par desous du 10% du ingreso bruto." },
    { "@type": "HowToStep", position: 3, name: "Obtiens multiples preaprobaciones", text: "Compare ofertas de al menons una coopérative de crédit, un banco et un prestamista en ligne à l’intérieur de una ventena de 14 jours." },
    { "@type": "HowToStep", position: 4, name: "Utilise le preapprobation como piso de négociation", text: "Deja que le concessionnaire intente vencer ta meilleur preapprobation; jamais aceptes una tasa pire seul parce que la ofrecen." },
    { "@type": "HowToStep", position: 5, name: "Lis le contrato avant de firmar", text: "Vérifie APR, plazo, total de paiements et ausencia de extras non deseadeux avant de firmar le contrato de vente a plazos." },
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
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE}/fr/guides` },
    { "@type": "ListItem", position: 3, name: "Guide de financement de voiture d’occasion", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GuideUsedCarFinancingBody locale="fr" />
    </>
  );
}
