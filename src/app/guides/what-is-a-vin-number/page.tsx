import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import GuideWhatIsAVinNumberBody, { FAQS_EN } from "@/components/GuideWhatIsAVinNumberBody";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "What is a VIN Number? Complete Guide to Vehicle Identification Numbers",
  description:
    "Learn what a VIN number is, why it matters, and where to find it on any vehicle. Comprehensive guide to Vehicle Identification Numbers with history, structure, and practical uses.",
  keywords: [
    "what is a VIN number",
    "VIN meaning",
    "vehicle identification number",
    "VIN number explained",
    "what does VIN stand for",
    "VIN definition",
    "where to find VIN",
    "VIN number location",
  ],
  alternates: hreflangAlternates("/guides/what-is-a-vin-number"),
  openGraph: {
    title: "What is a VIN Number? Complete Guide to Vehicle Identification Numbers",
    description:
      "Learn what a VIN number is, why it matters, and where to find it. Everything you need to know about Vehicle Identification Numbers.",
    url: `${SITE}/guides/what-is-a-vin-number`,
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "en",
  headline: "What is a VIN Number? Complete Guide to Vehicle Identification Numbers",
  description: "Learn what a VIN number is, why it matters, and where to find it on any vehicle.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/guides/what-is-a-vin-number`,
  },
  datePublished: "2026-04-16",
  dateModified: new Date().toISOString().slice(0, 10),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en",
  mainEntity: FAQS_EN.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GuideWhatIsAVinNumberBody locale="en" />
    </>
  );
}
