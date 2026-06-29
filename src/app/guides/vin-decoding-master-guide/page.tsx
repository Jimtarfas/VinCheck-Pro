import type { Metadata } from "next";
import GuideVinDecodingMasterBody, { FAQS_EN } from "@/components/GuideVinDecodingMasterBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/guides/vin-decoding-master-guide`;

export const metadata: Metadata = {
  title: "VIN Decoding: All 17 Characters Explained (2026)",
  description:
    "Decode every position of a 17-character VIN: WMI, VDS, check digit, model year codes, plant codes, and serial numbers. The most thorough VIN decoder guide on the web.",
  keywords: [
    "vin decoding guide",
    "decode vin",
    "vin number meaning",
    "what does a vin tell you",
    "17 character vin",
    "vin position meaning",
    "wmi code",
    "vds vin",
    "vin check digit",
    "vin model year code",
    "vin plant code",
    "vin serial number",
  ],
  alternates: hreflangAlternates("/guides/vin-decoding-master-guide"),
  openGraph: {
    title: "VIN Decoding: The Master Guide to All 17 Characters",
    description:
      "Position-by-position breakdown of the 17-character VIN: WMI, VDS, check digit, year codes, plant codes, and more.",
    url: PAGE_URL,
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "en",
  headline: "VIN Decoding: The Master Guide to All 17 Characters",
  description:
    "Comprehensive position-by-position breakdown of the 17-character Vehicle Identification Number, including WMI, VDS, check digit, year codes, and plant codes.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: {
      "@type": "ImageObject",
      url: `${SITE}/logo.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
  },
  datePublished: "2026-04-23",
  dateModified: new Date().toISOString().slice(0, 10),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "en",
  name: "How to Decode a 17-Character VIN",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Identify the WMI",
      text: "The first three characters identify the world manufacturer (country, manufacturer, vehicle type).",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Read the VDS",
      text: "Positions 4 through 8 describe vehicle attributes: model, body, restraint system, engine.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Validate the check digit",
      text: "Position 9 is a math-based validation digit. If it does not check out, the VIN is invalid or transcribed incorrectly.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Identify the model year",
      text: "Position 10 encodes the model year using a 30-year cycling alphabet of letters and digits.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Identify the plant code",
      text: "Position 11 identifies the manufacturing plant where the vehicle was assembled.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Read the serial number",
      text: "Positions 12 through 17 are the unique production serial number for that specific vehicle.",
    },
  ],
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

export default function VinDecodingMasterGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GuideVinDecodingMasterBody locale="en" />
    </>
  );
}
