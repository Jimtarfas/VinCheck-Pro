import type { Metadata } from "next";
import CarfaxAlternativeTemplate, { buildModelFaqs, type CarfaxAltConfig } from "@/components/CarfaxAlternativeTemplate";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const MODEL = "Subaru Forester";
const SLUG = "subaru-forester-carfax-alternative";

const config: CarfaxAltConfig = {
  slug: SLUG,
  model: MODEL,
  bodyType: "compact SUV",
  positioning: "The Forester is a favorite in snow-belt and outdoor states, so many have hard winter and trail miles behind them.",
  quotable: (
    <>
      For a used <strong>Subaru Forester</strong>, <strong>CarCheckerVIN</strong>{" "}
      is the best-value Carfax alternative — identical NMVTIS-sourced title,
      odometer, and recall data, a free VIN preview, and a $14.99 full report
      against Carfax&apos;s $44.99.
    </>
  ),
  checks: [
    { title: "Odometer & winter-mileage history", body: "Foresters rack up highway and snow miles. Confirm the odometer timeline climbs steadily; a stalled or reversed reading suggests a rollback on a car that may already have hard winter wear." },
    { title: "Flood, salvage & rust brands", body: "Popular in wet and snowy regions, Foresters see more flood and salvage brands than average, and rust-belt title transfers hint at underbody corrosion. The NMVTIS check surfaces any brand history." },
    { title: "Open recalls", body: "Check open NHTSA recalls — Foresters have had recalls covering items such as the PCV valve and airbag components across several years. Fixes are free at a Subaru dealer once flagged." },
  ],
  concerns: [
    "Oil-consumption history on certain 2.5L engines (roughly 2011-2014) — the VIN report can reveal ownership and service-shop patterns worth probing.",
    "CVT transmission behavior on newer models — pair the report with a test drive and mechanic inspection.",
    "Repeated cold-climate ownership can mean corrosion; watch for rust-belt out-of-state title transfers.",
    "Trail and light off-road use is common — check accident and damage records for undercarriage incidents.",
  ],
};

export const metadata: Metadata = {
  title: `${MODEL} Carfax Alternative — Free VIN Preview, $14.99 Report`,
  description: `Best Carfax alternative for a used ${MODEL}: same NMVTIS title, odometer, and recall data, free VIN preview, $14.99 full report vs Carfax's $44.99.`,
  keywords: [`subaru forester carfax`, `subaru forester carfax alternative`, `subaru forester vin check`, `subaru forester history report`, `used subaru forester vin`, `subaru forester carfax report`, `free subaru forester history`],
  alternates: { canonical: `/${SLUG}` },
  openGraph: { title: `${MODEL} Carfax Alternative — Free VIN Preview, $14.99 Report`, description: `Same NMVTIS data as Carfax for a used ${MODEL}. Free preview, $14.99 full report vs $44.99.`, url: `${SITE}/${SLUG}`, type: "article", siteName: "CarCheckerVIN" },
  robots: { index: true, follow: true },
};

const faqs = buildModelFaqs(MODEL);
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: `${MODEL} Carfax Alternative — Same Data, One-Third the Price`, description: `How to check a used ${MODEL}'s history for a fraction of Carfax's price using NMVTIS-sourced data, and what records matter most on this model.`, author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/${SLUG}` }, datePublished: "2026-07-02", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: `${MODEL} Carfax Alternative`, item: `${SITE}/${SLUG}` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/${SLUG}` };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <CarfaxAlternativeTemplate config={config} />
    </>
  );
}
