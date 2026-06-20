import type { Metadata } from "next";
import GlossaryPageBody, { GLOSSARY_COPY } from "@/components/GlossaryPageBody";

export const metadata: Metadata = {
  title: "VIN & Vehicle History Glossary — 60+ Terms Defined",
  description:
    "The complete VIN and vehicle history glossary. 60+ car-buying, title brand, and automotive terms defined in plain English to help you shop smarter.",
  keywords: [
    "vin glossary",
    "vehicle history terms",
    "car buying terminology",
    "title brand definitions",
    "automotive glossary",
  ],
  alternates: { canonical: "/glossary" },
  openGraph: {
    title: "VIN & Vehicle History Glossary — 60+ Terms Defined",
    description:
      "Plain-English definitions for VIN structure, title brands, inspection, valuation, and vehicle history terminology.",
    url: "https://www.carcheckervin.com/glossary",
    type: "article",
  },
};

const definedTermSetSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "VIN & Vehicle History Glossary",
  url: "https://www.carcheckervin.com/glossary",
  hasDefinedTerm: GLOSSARY_COPY.en.terms.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.definition,
    inDefinedTermSet: "https://www.carcheckervin.com/glossary",
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GLOSSARY_COPY.en.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function GlossaryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <GlossaryPageBody locale="en" />
    </>
  );
}
