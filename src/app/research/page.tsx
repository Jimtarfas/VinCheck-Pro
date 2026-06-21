import type { Metadata } from "next";
import ResearchBody, { RESEARCH_FAQS_EN, STUDIES } from "@/components/ResearchBody";

export const metadata: Metadata = {
  title: "Vehicle History Research & Data Studies",
  description:
    "Original research from CarCheckerVIN: theft rankings, salvage migration patterns, EV battery degradation studies, hurricane vehicle tracking, and used-car price analysis.",
  keywords: [
    "vehicle history research",
    "carcheckervin research",
    "most stolen vehicles 2026",
    "salvage title research",
    "used car price study",
    "ev battery degradation study",
    "hurricane damaged vehicles",
    "lemon buyback statistics",
    "automotive data study",
    "nicb theft data",
  ],
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Vehicle History Research & Data Studies",
    description:
      "Original research from our analysis of 50,000+ VIN lookups, NICB theft data, and NMVTIS title records — free for journalists and analysts to cite.",
    url: "https://www.carcheckervin.com/research",
    type: "article",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: RESEARCH_FAQS_EN.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const researchSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "CarCheckerVIN Research & Data",
    url: "https://www.carcheckervin.com/research",
    description: "Original automotive research from CarCheckerVIN, citable by journalists, analysts, and educators.",
  },
  faqSchema,
  ...STUDIES.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: s.title,
    description: s.summary,
    creator: { "@type": "Organization", name: "CarCheckerVIN Editorial Team", url: "https://www.carcheckervin.com" },
    publisher: { "@type": "Organization", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" },
    license: "https://creativecommons.org/licenses/by/4.0/",
    url: `https://www.carcheckervin.com${s.href}`,
    keywords: s.tag,
    datePublished: "2026-04-01",
  })),
];

export default function ResearchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(researchSchema) }} />
      <ResearchBody locale="en" />
    </>
  );
}
