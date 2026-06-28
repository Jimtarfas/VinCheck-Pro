import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { makes, getMakeBySlug } from "@/lib/makes";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import VinCheckMakeBody, { getMakeFaqsEn } from "@/components/VinCheckMakeBody";

interface Props {
  params: Promise<{ make: string }>;
}

export async function generateStaticParams() {
  return makes.map((m) => ({ make: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { make: slug } = await params;
  const make = getMakeBySlug(slug);
  if (!make) return { title: "VIN Check" };

  const title = `Free ${make.name} VIN Check — Decoder & History`;
  const description = `Free ${make.name} VIN check and decoder. Decode any ${make.name} VIN for specs, photos, market value, recalls & full vehicle history — no signup, no card.`;

  return {
    title,
    description,
    keywords: [
      `${make.name} VIN check`,
      `${make.name} VIN decoder`,
      `${make.name} VIN lookup`,
      `free ${make.name} VIN check`,
      `${make.name} vehicle history report`,
      `${make.name} recall lookup`,
    ],
    alternates: hreflangAlternates(`/vin-check/${make.slug}`),
    openGraph: {
      title: `Free ${make.name} VIN Check — Decoder & History`,
      description,
      type: "website",
    },
  };
}

export default async function MakePage({ params }: Props) {
  const { make: slug } = await params;
  const make = getMakeBySlug(slug);
  if (!make) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${make.name} VIN Check & Decoder`,
    description: `Free ${make.name} VIN check. Decode any ${make.name} VIN for full vehicle history, specs, and market values.`,
    url: `https://www.carcheckervin.com/vin-check/${make.slug}`,
    isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" },
  };

  const serviceRatingLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${make.name} VIN Check`,
    provider: { "@type": "Organization", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" },
    areaServed: { "@type": "Country", name: "United States" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "89",
    },
  };

  const faqs = getMakeFaqsEn(make.name, make.popular[0]);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingLd) }} />
      <VinCheckMakeBody make={make.slug} locale="en" />
    </>
  );
}
