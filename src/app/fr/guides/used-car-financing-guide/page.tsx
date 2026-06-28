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
const title = "Financiamiento de voiture d’occasion: La guide complète 2026";
const description =
  "Comment financiar un voiture d’occasion en 2026: puntajes de crédito, concessionnaire vs banco vs cooperativa de crédito, preaprobación, APR vs coût total, louer vs acheter, refinanciar et trampas a evitar.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "financement de voiture d’occasion",
    "guide prêt voiture d’occasion",
    "guide prêt de auto",
    "mejor prêt voiture d’occasion",
    "tasas prêt voiture d’occasion 2026",
    "preaprobación prêt auto",
    "prêt auto cooperativa de crédito",
    "refinanciar prêt auto",
    "louer vs acheter voiture d’occasion",
    "calculateur prêt voiture d’occasion",
    "APR vs coût total",
    "pago inicial voiture d’occasion",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description:
      "Puntajes de crédito, prestamistas, preaprobación, APR vs. coût total, louer vs acheter et refinanciar — le manual complet pour financiar un voiture d’occasion en 2026.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Puntajes de crédito, prestamistas, preaprobación, APR vs. coût total, louer vs acheter et refinanciar — le manual complet pour financiar un voiture d’occasion en 2026.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Financiamiento de voiture d’occasion: La guide complète 2026",
  description:
    "Guide complet pour financiar un voiture d’occasion en 2026: crédito, prestamistas, preaprobación, APR, coût total, arrendamiento, refinancement et comment evitar les trampas de la oficina de finances.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-23",
  dateModified: "2026-06-25",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment financiar un voiture d’occasion",
  step: [
    { "@type": "HowToStep", position: 1, name: "Obtén et revisa ta crédito", text: "Obtén tes rapports de crédito gratuit de annualcreditreport.com et disputa n’importe quel error antes de aplicar." },
    { "@type": "HowToStep", position: 2, name: "Calcula un prêt asequible", text: "Aplica la regla 20/4/10: al menos 20% de pago inicial, plazo máximo de 4 années, coût total de transporte par debajo du 10% du ingreso bruto." },
    { "@type": "HowToStep", position: 3, name: "Obtén múltiples preaprobaciones", text: "Compara ofertas de al menos una cooperativa de crédito, un banco et un prestamista en línea dentro de una ventena de 14 jours." },
    { "@type": "HowToStep", position: 4, name: "Utilise le preaprobación como piso de negociación", text: "Deja que le concessionnaire intente vencer ta mejor preaprobación; nunca aceptes una tasa peor seul porque la ofrecen." },
    { "@type": "HowToStep", position: 5, name: "Lee le contrato antes de firmar", text: "Verifica APR, plazo, total de pagos et ausencia de extras no deseadeux antes de firmar le contrato de vente a plazos." },
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
    { "@type": "ListItem", position: 3, name: "Guía de financement de voiture d’occasion", item: PAGE_URL },
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
