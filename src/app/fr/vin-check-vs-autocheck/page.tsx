/**
 * Wave 18b — French vin-check-vs-autocheck. Same full English layout via the
 * shared VinCheckVsAutoCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import VinCheckVsAutoCheckBody, { FAQS_FR, SINGLE, AC_SINGLE } from "@/components/VinCheckVsAutoCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/vin-check-vs-autocheck`;
const alt = hreflangAlternatesForLocale("/vin-check-vs-autocheck", "fr");
const title = "CarCheckerVIN vs AutoCheck: Comparaison 2026";
const description = `CarCheckerVIN vs AutoCheck (de Experian) comparadeux en prix, a éventes de données et profondeur du rapport. ${SINGLE} par rapport verses les ${AC_SINGLE} de AutoCheck — sans le paywall de la Score AutoCheck.`;

export const metadata: Metadata = {
  title, description,
  keywords: ["alternative carfax", "autocheck vs", "experian autocheck", "coût autocheck", "es autocheck bon", "alternative autocheck", "autocheck vs carfax", "meilleur vérification vin 2026", "score autocheck explicada", "rapports ilimitadeux autocheck", "plus bon marché que autocheck", "prix autocheck"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: `${SINGLE} par rapport verses les ${AC_SINGLE} de AutoCheck. Mismos données clave de NMVTIS, plus photos réels et valeur de marché.` },
  robots: { index: true, follow: true },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: title, description: "Una comparaison côte à côte de CarCheckerVIN et Experian AutoCheck couvrant tarifs, a éventes de données, la Score AutoCheck et le cas de uso adecuado pour chaque unon.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-26", dateModified: new Date().toISOString().slice(0, 10) };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "CarCheckerVIN vs AutoCheck", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <VinCheckVsAutoCheckBody locale="fr" />
    </>
  );
}
