/**
 * Wave 17e — English wrapper for /guides/buying-used-car-in/[state].
 * Renders BuyingUsedCarInStateBody with locale="en" and emits the full
 * English JSON-LD chain. Body content lives in
 * src/components/BuyingUsedCarInStateBody.tsx (shared with the ES wrapper).
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BuyingUsedCarInStateBody from "@/components/BuyingUsedCarInStateBody";
import { states, getStateBySlug } from "@/lib/states";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return { title: "Buying a Used Car — State Guides" };

  const title = `Buying a Used Car in ${state.name} — Complete 2026 Guide`;
  const description = `Step-by-step guide to buying a used car in ${state.name}. ${state.dmvName} title transfer, sales tax, ${state.name} lemon law, and inspection requirements explained.`;

  return {
    title,
    description,
    keywords: [
      `buying used car ${state.name}`,
      `${state.name} dmv used car`,
      `${state.name} title transfer`,
      `${state.name} sales tax used car`,
      `used car inspection ${state.name}`,
      `${state.name} lemon law`,
      `${state.name} vin check`,
      `how to buy used car in ${state.name}`,
      `${state.name} ${state.abbr} used car guide`,
    ],
    alternates: { canonical: `/guides/buying-used-car-in/${state.slug}` },
    openGraph: {
      title: `Buying a Used Car in ${state.name} — Complete 2026 Guide`,
      description,
      type: "article",
      url: `${SITE}/guides/buying-used-car-in/${state.slug}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function GuidePage({ params }: Props) {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  const pageUrl = `${SITE}/guides/buying-used-car-in/${state.slug}`;

  // FAQs — must remain byte-equivalent to the EN copy.faqs in
  // BuyingUsedCarInStateBody so schema and on-page content can't drift.
  const faqs = [
    {
      q: `How do I buy a used car in ${state.name}?`,
      a: `To buy a used car in ${state.name}, find a vehicle, run its 17-character VIN to check the history, inspect it in person or with a mechanic, agree on a price, then complete the title transfer and registration with the ${state.dmvName}. Bring the signed title, a bill of sale, your ID, proof of insurance, and any required tax payment to finish the deal.`,
    },
    {
      q: `How do I transfer a title in ${state.name}?`,
      a: `In ${state.name}, the seller signs the certificate of title over to you and you submit it to the ${state.dmvName} along with a bill of sale, your photo ID, and proof of insurance. The state issues a new title in your name. Time limits and fees vary, so check the ${state.dmvName} for the exact deadline that applies to your purchase.`,
    },
    {
      q: `Do I pay sales tax on a used car in ${state.name}?`,
      a: `Most states, including ${state.name}, charge sales or use tax on used-car purchases, and it is usually collected by the ${state.dmvName} at the time of title and registration. The rate and any local additions vary, so confirm ${state.name}'s current rate with its DMV or revenue department. Trade-in credits, gifts, and family transfers may reduce or eliminate the tax owed.`,
    },
    {
      q: `Does ${state.name} require a safety or emissions inspection?`,
      a: `Inspection and emissions requirements vary by state and sometimes by county, so verify whether ${state.name} requires one before you register. Where required, the check is typically tied to titling or registration through the ${state.dmvName}. A separate VIN inspection is also common when a vehicle comes from out of state or carries a salvage or rebuilt history.`,
    },
    {
      q: `How do I check a car's history before buying in ${state.name}?`,
      a: `Enter the vehicle's 17-character VIN into a vehicle history report before you put down any money. For a ${state.name} purchase this surfaces title brands, reported accidents, salvage or flood damage, odometer discrepancies, and open recalls recorded in national databases — including out-of-state records the seller or local DMV may not show. Always match the VIN on the dashboard, door jamb, and title.`,
    },
    {
      q: `Do I need a bill of sale in ${state.name}?`,
      a: `A bill of sale documents the purchase price, date, and both parties for a used-car sale, and ${state.name} generally expects one as part of the title-transfer paperwork submitted to the ${state.dmvName}. Even where it is not strictly required, keep a signed copy: it supports the sales-tax calculation and protects both buyer and seller if a dispute arises later.`,
    },
  ];

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `VIN Check for ${state.name} Used-Car Buyers`,
    url: pageUrl,
    applicationCategory: "AutomotiveApplication",
    operatingSystem: "All",
    description: `Free VIN-based vehicle history lookup for ${state.name} used-car buyers. Surfaces ${state.name} title brands, accidents, salvage and flood damage, odometer discrepancies, and open recalls before you complete a ${state.dmvName} title transfer.`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Buying a Used Car in ${state.name} — Complete 2026 Guide`,
    description: `Step-by-step guide to buying a used car in ${state.name}. ${state.dmvName} title transfer, sales tax, ${state.name} lemon law, and inspection requirements explained.`,
    datePublished: "2026-04-26",
    dateModified: "2026-06-09",
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Buy a Used Car in ${state.name}`,
    description: `Six steps to safely buy a used car in ${state.name}, from finding a vehicle through title and registration with the ${state.dmvName}.`,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Find a vehicle",
        text: `Search ${state.name} private listings, dealer inventory, and online marketplaces to identify candidate vehicles that match your needs and budget.`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Run a VIN check",
        text: `Enter the 17-character VIN into a vehicle history report to surface ${state.name} title brands, accident records, salvage history, odometer issues, and open recalls.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Inspect in person",
        text: `Inspect the vehicle in daylight, drive it under varied conditions, and have an independent ${state.name} mechanic perform a pre-purchase inspection.`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Negotiate price",
        text: `Use KBB and Edmunds private-party values, condition, and any history report findings to negotiate a fair ${state.name} market price.`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Complete paperwork",
        text: `Sign the title, complete a bill of sale, transfer license plates if applicable, and confirm odometer disclosure as required by the ${state.dmvName}.`,
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Title and register",
        text: `Submit the signed title, bill of sale, ID, proof of insurance, and applicable sales tax to the ${state.dmvName} to complete the title transfer and registration.`,
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE}/guides` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Buying Used Car",
        item: `${SITE}/guides`,
      },
      { "@type": "ListItem", position: 4, name: state.name, item: pageUrl },
    ],
  };

  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".speakable-intro"],
    },
    url: pageUrl,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />

      <BuyingUsedCarInStateBody stateSlug={slug} locale="en" />
    </>
  );
}
