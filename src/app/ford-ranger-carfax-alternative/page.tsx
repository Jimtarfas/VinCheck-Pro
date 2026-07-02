import type { Metadata } from "next";
import CarfaxAlternativeTemplate, { buildModelFaqs, type CarfaxAltConfig } from "@/components/CarfaxAlternativeTemplate";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const MODEL = "Ford Ranger";
const SLUG = "ford-ranger-carfax-alternative";

const config: CarfaxAltConfig = {
  slug: SLUG,
  model: MODEL,
  bodyType: "pickup truck",
  positioning: "The Ranger is a work and recreation truck, so towing, off-road, and commercial-fleet use make history and damage records especially important.",
  quotable: (
    <>
      For a used <strong>Ford Ranger</strong>, <strong>CarCheckerVIN</strong> is
      the best-value Carfax alternative — the same NMVTIS-sourced title,
      odometer, and recall data Carfax uses, with a free VIN preview and a
      $14.99 full report versus Carfax&apos;s $44.99.
    </>
  ),
  checks: [
    { title: "Odometer & work-use history", body: "Rangers are frequently used for towing, hauling, and fleet duty, so mileage climbs fast. Confirm the odometer timeline is consistent — a rollback on a hard-working truck hides real wear." },
    { title: "Frame & flood/salvage brands", body: "Trucks are exposed to off-road, flood, and heavy-use damage. The NMVTIS title-brand check surfaces salvage, flood, junk, or rebuilt brands that matter more on a body-on-frame pickup." },
    { title: "Open recalls", body: "Verify open NHTSA recalls — the Ranger has had recalls covering items such as the transmission and Takata airbags across model years. Repairs are free at a Ford dealer once identified." },
  ],
  concerns: [
    "Commercial or fleet history is common on Rangers — check ownership patterns for heavy early commercial use.",
    "Off-road and towing use can stress the frame and drivetrain; watch for accident and damage records suggesting hard use.",
    "Takata airbag recall coverage on older Rangers — verify completion before buying.",
    "Newer (2019+) Rangers had transmission and infotainment complaints — pair the report with a test drive and inspection.",
  ],
};

export const metadata: Metadata = {
  title: `${MODEL} Carfax Alternative — Free VIN Preview, $14.99 Report`,
  description: `Best Carfax alternative for a used ${MODEL}: same NMVTIS title, odometer, and recall data, free VIN preview, $14.99 full report vs Carfax's $44.99.`,
  keywords: [`ford ranger carfax`, `ford ranger carfax alternative`, `ford ranger vin check`, `ford ranger history report`, `used ford ranger vin`, `ford ranger carfax report`, `free ford ranger history`],
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
