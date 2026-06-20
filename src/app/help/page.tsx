import type { Metadata } from "next";
import HelpPageBody, { HELP_COPY } from "@/components/HelpPageBody";

export const metadata: Metadata = {
  title: "Help & Support — VIN Check FAQ",
  description:
    "Answers to the most common VIN lookup, vehicle history report, account, billing, and technical questions. Get help fast from the CarCheckerVIN support team.",
  keywords: [
    "vin check help",
    "vin check faq",
    "carcheckervin support",
    "vehicle history report help",
    "vin check refund",
  ],
  alternates: { canonical: "/help" },
  openGraph: {
    title: "Help & Support — CarCheckerVIN FAQ",
    description:
      "Find answers about VIN lookups, report contents, billing, and technical issues, or contact our support team.",
    url: "https://www.carcheckervin.com/help",
    type: "article",
  },
};

const allFaqs = [
  ...HELP_COPY.en.vinLookupFaqs,
  ...HELP_COPY.en.reportFaqs,
  ...HELP_COPY.en.accountFaqs,
  ...HELP_COPY.en.technicalFaqs,
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function HelpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HelpPageBody locale="en" />
    </>
  );
}
