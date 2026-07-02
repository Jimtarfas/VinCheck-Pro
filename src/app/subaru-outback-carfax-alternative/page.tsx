import type { Metadata } from "next";
import CarfaxAlternativeTemplate, { buildModelFaqs, type CarfaxAltConfig } from "@/components/CarfaxAlternativeTemplate";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const MODEL = "Subaru Outback";
const SLUG = "subaru-outback-carfax-alternative";

const config: CarfaxAltConfig = {
  slug: SLUG,
  model: MODEL,
  bodyType: "wagon-crossover",
  positioning: "The Outback's all-wheel-drive appeal means many are driven hard in snow, off-road, and towing duty, so history matters.",
  quotable: (
    <>
      For a used <strong>Subaru Outback</strong>, <strong>CarCheckerVIN</strong>{" "}
      is the best-value Carfax alternative — the same NMVTIS-sourced title,
      odometer, and recall data Carfax uses, with a free VIN preview and a
      $14.99 full report versus Carfax&apos;s $44.99.
    </>
  ),
  checks: [
    { title: "Odometer & AWD wear history", body: "Outbacks are often high-mileage highway and snow-belt cars. Check the odometer timeline for a consistent upward trend — a stall or rollback is a red flag, especially on an AWD wagon that may have been driven hard." },
    { title: "Flood & salvage brands", body: "Outbacks sell well in wet, snowy regions, so flood and water-damage brands appear more than average. The NMVTIS title-brand check surfaces any salvage, flood, or junk brand before you commit." },
    { title: "Open recalls", body: "Verify open NHTSA recalls — Outbacks have had recalls affecting items like the fuel pump and brake components across several model years. Recall repairs are free at a Subaru dealer once identified." },
  ],
  concerns: [
    "Head-gasket history on older 2.5L boxer engines — a VIN report won't show the repair, but ownership and title patterns can hint at a troubled car.",
    "CVT transmission service on 2010-and-newer models — pair the report with a mechanic's inspection of transmission behavior.",
    "Frequent snow-region ownership can mean underbody corrosion; watch for out-of-state title transfers from the rust belt.",
    "Towing and roof-load use is common on Outbacks — check for accident records that could indicate a loaded-vehicle incident.",
  ],
};

export const metadata: Metadata = {
  title: `${MODEL} Carfax Alternative — Free VIN Preview, $14.99 Report`,
  description: `Best Carfax alternative for a used ${MODEL}: same NMVTIS title, odometer, and recall data, free VIN preview, $14.99 full report vs Carfax's $44.99.`,
  keywords: [`subaru outback carfax`, `subaru outback carfax alternative`, `subaru outback vin check`, `subaru outback history report`, `used subaru outback vin`, `subaru outback carfax report`, `free subaru outback history`],
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
