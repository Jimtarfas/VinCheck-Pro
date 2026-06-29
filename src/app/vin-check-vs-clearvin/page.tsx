import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import VinCheckVsClearVinBody, { FAQS_EN } from "@/components/VinCheckVsClearVinBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

export const metadata: Metadata = {
  title: "CarCheckerVIN vs ClearVin: Side-by-Side (2026)",
  description: "CarCheckerVIN vs ClearVin compared on price, title brand depth, photos, and report quality. A fair 2026 side-by-side breakdown for used-car buyers.",
  keywords: ["clearvin alternative", "clearvin cost", "clearvin reliable", "clearvin vs vincheckpro", "clearvin review", "best title check service", "vin check with photos", "cheap vehicle history report", "clearvin unlimited"],
  alternates: hreflangAlternates("/vin-check-vs-clearvin"),
  openGraph: { title: "CarCheckerVIN vs ClearVin: Side-by-Side (2026)", description: "Compare CarCheckerVIN with ClearVin on pricing, title brand checks, photos, and market value. See which is the better fit for your purchase.", url: "https://www.carcheckervin.com/vin-check-vs-clearvin", type: "article" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "CarCheckerVIN vs ClearVin: Side-by-Side (2026)", description: "A side-by-side comparison of CarCheckerVIN and ClearVin covering pricing, title brand coverage, photos, market value, and the right use case for each.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" }, mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.carcheckervin.com/vin-check-vs-clearvin" }, datePublished: "2026-04-26", dateModified: new Date().toISOString().slice(0, 10) };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

export default function VinCheckVsClearVinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <VinCheckVsClearVinBody locale="en" />
    </>
  );
}
