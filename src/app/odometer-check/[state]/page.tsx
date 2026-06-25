import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OdometerCheckStateBody, { getOdometerState, getAllOdometerStates } from "@/components/OdometerCheckStateBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export function generateStaticParams() {
  return getAllOdometerStates().map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = getOdometerState(state);
  if (!s) return {};

  const title = `${s.name} Odometer Check by VIN — Detect Mileage Rollback (Free)`;
  const description = `Free ${s.name} odometer check by VIN. Compare every reported mileage reading across NMVTIS and ${s.dmvName} title transfers to detect rollback fraud before you buy. Instant, no signup.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${s.name} odometer check`,
      `mileage check VIN ${s.name}`,
      `${s.name} odometer rollback check`,
      `odometer fraud check ${s.name}`,
      `${s.abbr} mileage history`,
      `check mileage by VIN ${s.name}`,
      `${s.name} vehicle mileage history`,
      `rollback detection VIN ${s.name}`,
      `NMVTIS odometer ${s.name}`,
      `free mileage check ${s.name}`,
      `not actual mileage ${s.name}`,
      `true mileage unknown VIN ${s.name}`,
    ],
    alternates: { canonical: `/odometer-check/${s.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/odometer-check/${s.slug}`,
      type: "article",
      siteName: "CarCheckerVIN",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function StateOdometerCheckPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const s = getOdometerState(state);
  if (!s) notFound();
  const pageUrl = `${SITE}/odometer-check/${s.slug}`;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${s.name} Odometer Check by VIN`,
    url: pageUrl,
    applicationCategory: "AutomotiveApplication",
    operatingSystem: "All",
    description: `Check a ${s.name} vehicle's mileage history by its VIN. Assembles every reported odometer reading from NMVTIS, title transfers reported by the ${s.dmvName}, state inspections, and service events into a date-stamped timeline so rollback and odometer fraud stand out.`,
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
    headline: `${s.name} Odometer Check by VIN`,
    description: `How to check a vehicle's mileage history in ${s.name} using its VIN: the NMVTIS database, how the ${s.dmvName} records odometer readings at title transfer, how rollback is exposed, and what to do if you spot a discrepancy.`,
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
        name: `How do I check a car's mileage history in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Enter the 17-character VIN into an odometer lookup that assembles every reported reading from NMVTIS — which the ${s.dmvName} and every other state DMV feed at each title transfer — plus inspection and service records, into a date-stamped timeline. A reading that drops over time is the clearest sign of rollback.`,
        },
      },
      {
        "@type": "Question",
        name: `Is odometer rollback illegal in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Rolling back an odometer to deceive a buyer is a federal crime under the Federal Odometer Act and violates ${s.name} law. Sellers must provide a written odometer disclosure at sale, recorded by the ${s.dmvName} on the title.`,
        },
      },
      {
        "@type": "Question",
        name: `What is a "Not Actual Mileage" brand on a ${s.name} title?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `When a seller cannot certify true mileage, the title is branded "Not Actual Mileage" (sometimes "Exceeds Mechanical Limits" or "TMU"). Once applied, that brand follows the VIN nationwide through NMVTIS and surfaces in a VIN check no matter where the car is re-titled.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Odometer Check", item: `${SITE}/odometer-check` },
      { "@type": "ListItem", position: 3, name: `${s.name} Odometer Check`, item: pageUrl },
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
      <OdometerCheckStateBody stateSlug={state} />
    </>
  );
}
