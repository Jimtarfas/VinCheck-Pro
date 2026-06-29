import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VehicleTitleStateBody, {
  getTitleState,
  getAllTitleStates,
} from "@/components/VehicleTitleStateBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export function generateStaticParams() {
  return getAllTitleStates().map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = getTitleState(state);
  if (!s) return {};

  const title = `${s.name} Vehicle Title — Transfer, Brands, Duplicate & Lien Release`;
  const description = `How to transfer, replace, and clear a vehicle title in ${s.name} through the ${s.dmvName}: title brands, duplicate titles, bonded titles, and lien release. Run a free VIN check first to confirm a clean, lien-free title.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${s.name} vehicle title`,
      `${s.name} title transfer`,
      `transfer car title in ${s.name}`,
      `${s.name} car title`,
      `${s.name} duplicate title`,
      `${s.name} title replacement`,
      `${s.name} bonded title`,
      `${s.abbr} title transfer`,
      `${s.name} title brands`,
      `${s.name} DMV title`,
      `${s.name} rebuilt title`,
      `how to title a car in ${s.name}`,
    ],
    alternates: { canonical: `/vehicle-title/${s.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/vehicle-title/${s.slug}`,
      type: "article",
      siteName: "CarCheckerVIN",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function StateVehicleTitlePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const s = getTitleState(state);
  if (!s) notFound();
  const pageUrl = `${SITE}/vehicle-title/${s.slug}`;

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Transfer a Vehicle Title in ${s.name}`,
    description: `Step-by-step guide to transferring a vehicle title with the ${s.dmvName}, including the documents required and how a VIN check fits in.`,
    totalTime: "PT1H",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Get the title signed over",
        text: `For a used car, the seller signs the existing ${s.name} title over to you with the sale date, price, and odometer reading. For a new car, the dealer provides the manufacturer's certificate of origin instead.`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Complete the application and verification",
        text: `Submit a title application to the ${s.dmvName} with proof of identity, a bill of sale, and an odometer disclosure. ${s.name} may require a VIN verification and an NMVTIS check before issuing the title.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Receive your new title",
        text: `Once fees are paid and the paperwork clears, the ${s.dmvName} issues a new ${s.name} title in your name. Any existing brand on the VIN carries forward onto the new title.`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${s.name} Vehicle Title Guide`,
    description: `How to transfer, replace, and clear a vehicle title in ${s.name} through the ${s.dmvName}: title brands, duplicate titles, bonded titles, lien release, and why to run a VIN check first.`,
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    datePublished: "2026-06-28",
    dateModified: new Date().toISOString().slice(0, 10),
    image: `${SITE}/opengraph-image`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How do I transfer a car title in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `To transfer a title in ${s.name}, the seller signs the existing title over to you — including the sale price, date, and odometer reading — then you submit a title application, bill of sale, proof of ID, and payment to the ${s.dmvName}. ${s.name} may require a VIN verification and an NMVTIS check before issuing the new title. Run the VIN through a free history check first to confirm the title is clean and lien-free.`,
        },
      },
      {
        "@type": "Question",
        name: `What title brands does ${s.name} use?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${s.name} brands titles to warn future buyers about a vehicle's history. The brands recorded in ${s.name} include ${s.titleBrands.join(", ")}. Because a title brand is tied to the VIN in NMVTIS, it follows the vehicle nationwide even if the paper title is later washed by moving the car to another state.`,
        },
      },
      {
        "@type": "Question",
        name: `How do I get a duplicate or replacement title in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `If your ${s.name} title is lost, stolen, or damaged, apply for a duplicate through the ${s.dmvName} with proof of identity and the vehicle details, and pay a replacement fee. If there is still a lien on record, the lienholder may need to request it.`,
        },
      },
      {
        "@type": "Question",
        name: `What does a clean title mean in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A clean title means the ${s.dmvName} has no brand on record for that VIN — no salvage, flood, junk, rebuilt, or lemon designation. It does not guarantee the car has never been in an accident; it only means no event crossed the threshold that triggers a brand. A free VIN check goes further, surfacing reported accidents, odometer issues, and out-of-state brands that title washing tries to erase.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Vehicle Title", item: `${SITE}/vehicle-title` },
      { "@type": "ListItem", position: 3, name: `${s.name} Vehicle Title`, item: pageUrl },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <VehicleTitleStateBody stateSlug={state} />
    </>
  );
}
