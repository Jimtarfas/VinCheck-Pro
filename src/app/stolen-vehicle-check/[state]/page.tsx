import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StolenCheckStateBody, { getStolenState, getAllStolenStates } from "@/components/StolenCheckStateBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export function generateStaticParams() {
  return getAllStolenStates().map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = getStolenState(state);
  if (!s) return {};

  const title = `${s.name} Stolen Vehicle Check by VIN — Is This Car Stolen? (Free)`;
  const description = `Free ${s.name} stolen vehicle check by VIN. Cross-reference NICB theft records and ${s.dmvName} title brands through NMVTIS before you buy a used car. Instant, no signup.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${s.name} stolen vehicle check`,
      `is this car stolen ${s.name}`,
      `${s.name} stolen car VIN check`,
      `check if car is stolen ${s.name}`,
      `${s.name} stolen vehicle lookup`,
      `${s.abbr} stolen car check`,
      `report stolen car ${s.name}`,
      `${s.name} theft recovery title`,
      `NICB stolen vehicle ${s.name}`,
      `free stolen VIN check ${s.name}`,
      `${s.name} salvage title check`,
      `cloned VIN check ${s.name}`,
    ],
    alternates: { canonical: `/stolen-vehicle-check/${s.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/stolen-vehicle-check/${s.slug}`,
      type: "article",
      siteName: "CarCheckerVIN",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function StateStolenCheckPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const s = getStolenState(state);
  if (!s) notFound();
  const pageUrl = `${SITE}/stolen-vehicle-check/${s.slug}`;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${s.name} Stolen Vehicle Check by VIN`,
    url: pageUrl,
    applicationCategory: "AutomotiveApplication",
    operatingSystem: "All",
    description: `Check whether a vehicle titled in ${s.name} is reported stolen by its VIN. Queries the NICB VINCheck theft and salvage records and NMVTIS title brands reported by the ${s.dmvName}, surfacing active theft, theft-recovery, and salvage flags before purchase.`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${s.name} Stolen Vehicle Check by VIN — Is This Car Stolen?`,
    description: `How to check if a vehicle is stolen in ${s.name} using its VIN: the NICB and NMVTIS databases, the title brands the ${s.dmvName} uses, and what to do if a VIN is flagged.`,
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    datePublished: "2026-06-25",
    dateModified: "2026-06-25",
    image: `${SITE}/opengraph-image`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How do I check if a car is stolen in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Enter the 17-character VIN into a stolen-vehicle lookup that queries NICB VINCheck theft and salvage records and the NMVTIS title-brand database. NMVTIS aggregates records from the ${s.dmvName} and every other state DMV, so a stolen, theft-recovery, or salvage record on a ${s.name} vehicle surfaces even if the car was later re-titled in another state.`,
        },
      },
      {
        "@type": "Question",
        name: `What title brands does ${s.name} use for theft-recovery and salvage vehicles?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${s.name} records these brands through the ${s.dmvName}: ${s.titleBrands.join(", ")}. A recovered theft written off as a total loss is typically branded "Salvage", and once applied the brand follows the VIN nationwide through NMVTIS.`,
        },
      },
      {
        "@type": "Question",
        name: `Can a stolen car have a clean ${s.name} title?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. A freshly stolen vehicle, a car with a cloned or altered VIN, or a theft never reported to insurance can still show a clean title and a clean database result. Always confirm the VIN matches across the ${s.name} title, the registration, and the door-jamb plate before you pay.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Stolen Vehicle Check", item: `${SITE}/stolen-vehicle-check` },
      { "@type": "ListItem", position: 3, name: `${s.name} Stolen Vehicle Check`, item: pageUrl },
    ],
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
    url: pageUrl,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <StolenCheckStateBody stateSlug={state} />
    </>
  );
}
