import type { Metadata } from "next";
import GuideHowToReadAVinBody, { FAQS_EN } from "@/components/GuideHowToReadAVinBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";

export const metadata: Metadata = {
  title: "How to Read a VIN — Complete VIN Breakdown",
  description:
    "Learn how to read a VIN number with our step-by-step guide. Understand all 17 VIN digits, including the WMI, VDS, and VIS sections, and what each position means.",
  keywords: [
    "how to read a VIN",
    "VIN number breakdown",
    "VIN digits meaning",
    "VIN decoder guide",
    "17 digit VIN explained",
    "WMI VDS VIS",
    "VIN position meaning",
    "read vehicle identification number",
    "VIN year chart",
    "VIN model year code",
    "10th digit VIN year",
    "VIN year code chart",
  ],
  alternates: hreflangAlternates("/guides/how-to-read-a-vin"),
  openGraph: {
    title: "How to Read a VIN Number — Complete VIN Breakdown Guide",
    description:
      "Learn how to read a VIN number with our step-by-step guide. Understand all 17 VIN digits and what each position means.",
    url: "https://www.carcheckervin.com/guides/how-to-read-a-vin",
    type: "article",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Read a VIN Number",
  description:
    "A step-by-step guide to reading and understanding all 17 characters of a Vehicle Identification Number (VIN).",
  step: [
    {
      "@type": "HowToStep",
      name: "Identify the World Manufacturer Identifier (positions 1-3)",
      text: "The first three characters form the WMI. Position 1 indicates the country of manufacture, position 2 identifies the manufacturer, and position 3 denotes the vehicle type or manufacturing division.",
    },
    {
      "@type": "HowToStep",
      name: "Read the Vehicle Descriptor Section (positions 4-8)",
      text: "Positions 4 through 8 form the VDS. These digits encode vehicle attributes such as body style, engine type, model, and series. The exact meaning varies by manufacturer.",
    },
    {
      "@type": "HowToStep",
      name: "Check the check digit (position 9)",
      text: "Position 9 is the check digit, a calculated value used to verify the VIN is legitimate. It is derived using a weighted mathematical formula applied to all other characters.",
    },
    {
      "@type": "HowToStep",
      name: "Determine the model year (position 10)",
      text: "Position 10 represents the model year using a standardized letter or number code. For example, R represents 2024, S represents 2025, and T represents 2026.",
    },
    {
      "@type": "HowToStep",
      name: "Find the assembly plant (position 11)",
      text: "Position 11 is a code assigned by the manufacturer to identify the specific assembly plant where the vehicle was built.",
    },
    {
      "@type": "HowToStep",
      name: "Read the production sequence number (positions 12-17)",
      text: "The final six characters are the sequential production number assigned to the vehicle as it rolls off the assembly line. This gives each vehicle its unique identifier.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS_EN.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function HowToReadAVinPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GuideHowToReadAVinBody locale="en" />
    </>
  );
}
