import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VehicleRegistrationStateBody, {
  getRegistrationState,
  getAllRegistrationStates,
} from "@/components/VehicleRegistrationStateBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export function generateStaticParams() {
  return getAllRegistrationStates().map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = getRegistrationState(state);
  if (!s) return {};

  const title = `${s.name} Vehicle Registration — DMV Title, Renewal & Fees Guide`;
  const description = `How to register a vehicle in ${s.name}: the documents you need for the ${s.dmvName}, title transfer, fees and taxes, and renewal. Run a free VIN check first to confirm a clean, lien-free title.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${s.name} vehicle registration`,
      `register car in ${s.name}`,
      `${s.name} DMV registration`,
      `${s.name} car registration cost`,
      `${s.name} title transfer`,
      `${s.name} registration renewal`,
      `how to register a car in ${s.name}`,
      `${s.abbr} vehicle registration`,
      `${s.name} registration fees`,
      `${s.name} DMV title and registration`,
      `register used car ${s.name}`,
      `${s.name} license plate registration`,
    ],
    alternates: { canonical: `/vehicle-registration/${s.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/vehicle-registration/${s.slug}`,
      type: "article",
      siteName: "CarCheckerVIN",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function StateVehicleRegistrationPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const s = getRegistrationState(state);
  if (!s) notFound();
  const pageUrl = `${SITE}/vehicle-registration/${s.slug}`;

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Register a Vehicle in ${s.name}`,
    description: `Step-by-step guide to titling and registering a vehicle with the ${s.dmvName}, including the documents required and how a VIN check fits in.`,
    totalTime: "PT1H",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Gather your title and documents",
        text: `Collect the signed-over title (or manufacturer's certificate of origin for a new car), proof of identity, proof of ${s.name} insurance, an odometer disclosure, and a bill of sale. Confirm the VIN matches across the title, dashboard, and door jamb.`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Complete inspections and VIN verification",
        text: `Depending on the vehicle and county, ${s.name} may require an emissions test, safety inspection, or VIN verification before registration. A salvage or rebuilt title triggers an additional inspection.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Pay fees and receive your plate",
        text: `Submit the paperwork to the ${s.dmvName}, pay the registration fee and any applicable tax, and receive your ${s.name} license plate, registration card, and renewal sticker.`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${s.name} Vehicle Registration Guide`,
    description: `How to title, register, and renew a vehicle in ${s.name} through the ${s.dmvName}: required documents, fees and taxes, inspections, and why to run a VIN check first.`,
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
        name: `How do I register a car in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Bring the signed title (or certificate of origin for a new car), proof of ${s.name} insurance, a completed title-and-registration application, an odometer disclosure, and your ID to the ${s.dmvName}, then pay the registration fee and any applicable tax. Used or out-of-state vehicles may also require a VIN verification and/or inspection. Run the VIN through a free history check first to confirm the title is clean and lien-free.`,
        },
      },
      {
        "@type": "Question",
        name: `How much does it cost to register a vehicle in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Registration costs in ${s.name} vary by the vehicle's weight, value, age, and county, plus any title fee and one-time taxes, so there is no single flat price. Some states charge a flat fee, others base it on weight, and several calculate an annual tax from the vehicle's value. Use the official ${s.dmvName} fee estimator for an exact quote.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I register a salvage or rebuilt vehicle in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, but only after a previously salvaged vehicle passes the ${s.name} rebuilt-title inspection and is re-titled as rebuilt or reconstructed. A vehicle still branded salvage usually cannot be registered for road use until that inspection is complete. The brand is tied to the VIN in NMVTIS, so a VIN check reveals it before you buy.`,
        },
      },
      {
        "@type": "Question",
        name: `Do I need a VIN check before registering a car in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `It is not legally required, but it is the smartest step before you pay. A free VIN check surfaces salvage, flood, or junk title brands, odometer rollbacks, open recalls, and reported liens — any of which can block or complicate ${s.name} registration.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Vehicle Registration", item: `${SITE}/vehicle-registration` },
      { "@type": "ListItem", position: 3, name: `${s.name} Vehicle Registration`, item: pageUrl },
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
      <VehicleRegistrationStateBody stateSlug={state} />
    </>
  );
}
