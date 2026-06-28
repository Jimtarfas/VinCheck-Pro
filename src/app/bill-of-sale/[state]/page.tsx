import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BillOfSaleStateBody, {
  getBillOfSaleState,
  getAllBillOfSaleStates,
} from "@/components/BillOfSaleStateBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export function generateStaticParams() {
  return getAllBillOfSaleStates().map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = getBillOfSaleState(state);
  if (!s) return {};

  const title = `${s.name} Vehicle Bill of Sale — What It Needs, Transfer Documents & Free Guide`;
  const description = `How to complete a vehicle bill of sale in ${s.name}: what information goes on it, which transfer documents change hands, and how it flows to the ${s.dmvName}. Run a free VIN check first to confirm a clean title and honest odometer reading.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${s.name} bill of sale`,
      `${s.name} vehicle bill of sale`,
      `${s.name} car bill of sale`,
      `bill of sale ${s.name}`,
      `${s.abbr} bill of sale`,
      `${s.name} auto bill of sale`,
      `${s.name} vehicle transfer documents`,
      `${s.name} used car paperwork`,
      `how to fill out a bill of sale in ${s.name}`,
      `${s.name} DMV bill of sale`,
      `${s.name} title transfer documents`,
      `does a bill of sale need to be notarized in ${s.name}`,
    ],
    alternates: { canonical: `/bill-of-sale/${s.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/bill-of-sale/${s.slug}`,
      type: "article",
      siteName: "CarCheckerVIN",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function StateBillOfSalePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const s = getBillOfSaleState(state);
  if (!s) notFound();
  const pageUrl = `${SITE}/bill-of-sale/${s.slug}`;

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Complete a Vehicle Bill of Sale in ${s.name}`,
    description: `Step-by-step guide to completing a bill of sale and transferring a vehicle in ${s.name} through the ${s.dmvName}, including the documents required and how a VIN check fits in.`,
    totalTime: "PT30M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Complete the bill of sale",
        text: `Fill in the buyer and seller details, sale price, date, odometer reading, and the full VIN. If ${s.name} provides an official form through the ${s.dmvName}, use it, and have both parties sign.`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Sign over the title",
        text: `The seller signs the existing ${s.name} title over to the buyer in the assignment section, recording the same sale price, date, and odometer reading as the bill of sale.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "File with the DMV",
        text: `The buyer brings the bill of sale, signed title, odometer disclosure, and proof of identity to the ${s.dmvName} to transfer the title, pay any tax due, and register the vehicle.`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${s.name} Vehicle Bill of Sale Guide`,
    description: `What goes on a vehicle bill of sale in ${s.name}, which transfer documents change hands, how it flows to the ${s.dmvName}, and why to run a VIN check first.`,
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    datePublished: "2026-06-28",
    dateModified: "2026-06-28",
    image: `${SITE}/opengraph-image`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What goes on a bill of sale in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${s.name} bill of sale records the full names and addresses of the buyer and seller, the sale date, the purchase price, the vehicle's year, make, model, and body style, the exact odometer reading, and the 17-character VIN. Both parties sign it. Confirm the VIN on the bill of sale matches the title and the dashboard before signing.`,
        },
      },
      {
        "@type": "Question",
        name: `Do I need a bill of sale to transfer a car in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `In ${s.name}, the signed-over title is the primary ownership document, and the bill of sale is the proof-of-purchase record the ${s.dmvName} uses to confirm the sale and calculate any tax. Requirements vary, so confirm the exact rule with the ${s.dmvName} — but keeping a signed bill of sale protects both buyer and seller.`,
        },
      },
      {
        "@type": "Question",
        name: `Does a ${s.name} bill of sale need to be notarized?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Whether a bill of sale must be notarized depends on the state and can change, so check the current rule with the ${s.dmvName} before you sign. When in doubt, having both parties sign in front of a notary removes any later dispute about whether the signatures are genuine.`,
        },
      },
      {
        "@type": "Question",
        name: `Why check the VIN before signing a bill of sale in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The bill of sale records what the seller claims; a VIN check shows what actually happened to the car. Running the 17-character VIN before you sign confirms the title is clean, the odometer reading is consistent with the car's history, and there's no open lien that would block the transfer. It's free and takes seconds.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Bill of Sale", item: `${SITE}/bill-of-sale` },
      { "@type": "ListItem", position: 3, name: `${s.name} Bill of Sale`, item: pageUrl },
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
      <BillOfSaleStateBody stateSlug={state} />
    </>
  );
}
