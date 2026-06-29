import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LemonCheckStateBody, { getStateBundle, getAllStateBundles } from "@/components/LemonCheckStateBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export function generateStaticParams() {
  return getAllStateBundles().map((b) => ({ state: b.s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const b = getStateBundle(state);
  if (!b) return {};
  const { s, law } = b;

  const title = `${s.name} Lemon Law Check by VIN — Free Buyback Lookup`;
  const description = `Free ${s.name} lemon check by VIN. See if a car was a manufacturer buyback under ${s.name}'s lemon law (${law.coveragePeriod}). NMVTIS-backed, instant, no signup.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${s.name} lemon law check`,
      `${s.name} lemon law`,
      `is this car a lemon in ${s.name}`,
      `${s.name} lemon law buyback`,
      `${s.name} manufacturer buyback VIN`,
      `${s.name} buyback title check`,
      `lemon check by VIN ${s.name}`,
      `${s.name} ${law.brandTerm} title`,
      `${s.name} used car lemon`,
      `${s.name} lemon law used car`,
      `how many repair attempts lemon ${s.name}`,
      `${s.name} lemon law statute`,
      `${s.abbr} lemon law check`,
      `free lemon check ${s.name}`,
    ],
    alternates: { canonical: `/lemon-check/${s.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/lemon-check/${s.slug}`,
      type: "article",
      siteName: "CarCheckerVIN",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function StateLemonCheckPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const b = getStateBundle(state);
  if (!b) notFound();
  const { s, law } = b;
  const pageUrl = `${SITE}/lemon-check/${s.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${s.name} Lemon Law Check by VIN — Buyback Lookup`,
    description: `How to run a free ${s.name} lemon check by VIN, what ${s.name}'s lemon law covers (${law.coveragePeriod}, ${law.repairAttempts}), and how manufacturer buybacks are branded and disclosed in ${s.name}.`,
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    datePublished: "2026-06-16",
    dateModified: new Date().toISOString().slice(0, 10),
    image: `${SITE}/opengraph-image`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Lemon Check", item: `${SITE}/lemon-check` },
      { "@type": "ListItem", position: 3, name: `${s.name} Lemon Law`, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LemonCheckStateBody stateSlug={state} locale="en" />
    </>
  );
}
