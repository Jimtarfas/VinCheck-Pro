import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import VinCheckVsAutoCheckBody, { FAQS_EN, SINGLE, AC_SINGLE, B3, B5, B10, AC_BUNDLE } from "@/components/VinCheckVsAutoCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "CarCheckerVIN vs AutoCheck: 2026 Comparison",
  description: `CarCheckerVIN vs AutoCheck (by Experian) compared on price, data sources, and report depth. ${SINGLE} per report versus AutoCheck's ${AC_SINGLE} — without the AutoCheck Score paywall.`,
  keywords: ["carfax alternative", "autocheck vs", "experian autocheck", "autocheck cost", "is autocheck good", "autocheck alternative", "autocheck vs carfax", "best vin check 2026", "autocheck score explained", "autocheck unlimited reports", "cheaper than autocheck", "autocheck price"],
  alternates: hreflangAlternates("/vin-check-vs-autocheck"),
  openGraph: { title: "CarCheckerVIN vs AutoCheck: 2026 Comparison", description: "Compare CarCheckerVIN with Experian AutoCheck on pricing, data, and the AutoCheck Score. A fair side-by-side breakdown for used-car buyers.", url: `${SITE}/vin-check-vs-autocheck`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "CarCheckerVIN vs AutoCheck: 2026 Comparison", description: `${SINGLE} per report versus AutoCheck's ${AC_SINGLE}. Same core NMVTIS data, plus real photos and a market value.` },
  robots: { index: true, follow: true },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "CarCheckerVIN vs AutoCheck: 2026 Comparison", description: "A side-by-side comparison of CarCheckerVIN and Experian AutoCheck covering pricing, data sources, the AutoCheck Score, and the right use case for each.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/vin-check-vs-autocheck` }, datePublished: "2026-04-26", dateModified: new Date().toISOString().slice(0, 10), image: `${SITE}/opengraph-image` };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "CarCheckerVIN vs AutoCheck", item: `${SITE}/vin-check-vs-autocheck` }] };

const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/vin-check-vs-autocheck` };

// Reference B5/AC_BUNDLE to silence unused warnings (kept exported for ES wrapper).
void B5; void AC_BUNDLE;

export default function VinCheckVsAutoCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <VinCheckVsAutoCheckBody locale="en" />
    </>
  );
}
