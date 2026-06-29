import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import DiminishedValueCalculatorBody, { FAQS_EN } from "@/components/DiminishedValueCalculatorBody";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Diminished Value Calculator — 17c Formula",
  description:
    "Calculate your car's diminished value after an accident with the 17c formula, then see the realistic market loss range. Free, instant, no sign-up.",
  keywords: [
    "diminished value calculator",
    "17c diminished value calculator",
    "diminished value formula",
    "car diminished value after accident",
    "how to calculate diminished value",
    "diminished value claim calculator",
    "inherent diminished value",
    "diminished value of car after accident",
    "auto diminished value calculator",
    "vehicle diminished value estimate",
    "17c formula",
    "mabry v state farm formula",
    "diminished value appraisal",
    "post accident value loss calculator",
    "trade in value after accident",
    "diminished value claim",
    "third party diminished value",
    "diminished value georgia",
    "what is my car worth after an accident",
    "accident car value loss",
    "diminished value insurance claim",
    "calculate loss of value car",
    "diminished value of vehicle",
    "car value drop after accident",
    "free diminished value calculator",
  ],
  alternates: hreflangAlternates("/diminished-value-calculator"),
  openGraph: {
    title: "Free Diminished Value Calculator — 17c Formula & Real Market Loss",
    description:
      "See what your car lost in value after an accident. Runs the insurer's 17c formula and the realistic market range so you can negotiate a fair diminished value claim.",
    url: `${SITE}/diminished-value-calculator`,
    type: "website",
    siteName: "CarCheckerVIN",
    images: [
      {
        url: `${SITE}/diminished-value-calculator/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Diminished Value Calculator — 17c formula and real market loss",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diminished Value Calculator — 17c Formula & Real Market Loss",
    description:
      "Calculate your car's diminished value after an accident with the 17c formula plus the realistic market range. Free, instant, no sign-up.",
    images: [`${SITE}/diminished-value-calculator/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

/* ─── JSON-LD ─────────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "Diminished Value Calculator",
  description:
    "Free diminished value calculator using the insurer 17c formula (base 10% cap × damage multiplier × mileage multiplier) alongside a realistic market-loss range. Estimates how much value a vehicle lost after an accident to support a diminished value claim.",
  url: `${SITE}/diminished-value-calculator`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "17c diminished value formula",
    "Damage severity multiplier",
    "Mileage multiplier bands",
    "Realistic market-loss range",
    "Step-by-step calculation breakdown",
    "Negotiation-ready estimate",
    "No sign-up required",
  ],
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Diminished Value After an Accident",
  description:
    "Estimate your vehicle's diminished value using the 17c formula and a market-based range to support a diminished value claim.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Find your pre-accident market value",
      text: "Look up the clean retail value of your car the day before the crash using KBB or NADA. This is the figure the 17c formula starts from.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Apply the 10% base cap",
      text: "The 17c formula caps the maximum base loss at 10% of the pre-accident value. Multiply your value by 0.10 to get the base.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Apply the damage multiplier",
      text: "Pick a damage severity from severe structural (1.00) down to no structural damage (0.00) and multiply the base by it.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Apply the mileage multiplier",
      text: "Reduce the result by the mileage band: 1.00 under 20k miles, down to 0.00 at 100k+. Higher mileage means a lower 17c figure.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Compare against the real market loss",
      text: "Because 17c under-states real loss, compare it to the market range (5–25% of value by severity) and use an independent appraisal to support your claim.",
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    {
      "@type": "ListItem",
      position: 2,
      name: "Diminished Value Calculator",
      item: `${SITE}/diminished-value-calculator`,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Diminished Value Calculator",
  url: `${SITE}/diminished-value-calculator`,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [
      "h1",
      "#what-is-dv",
      "#how-17c-works",
      "#worked-example",
      "#dv-vs-depreciation",
      "#by-state",
      "#faq",
    ],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Diminished Value Calculator: The 17c Formula and Your Real Market Loss",
  description:
    "How the insurer 17c formula calculates diminished value, why it understates real loss, a worked numeric example, how diminished value differs from depreciation, and where first- vs third-party claims are allowed by state.",
  about: [
    { "@type": "Thing", name: "Diminished value" },
    { "@type": "Thing", name: "17c formula" },
    { "@type": "Thing", name: "Auto insurance claim" },
  ],
  author: ORG_AUTHOR,
  publisher: ORG_AUTHOR,
  datePublished: "2025-09-01",
  dateModified: new Date().toISOString().slice(0, 10),
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/diminished-value-calculator`,
  },
  image: `${SITE}/diminished-value-calculator/opengraph-image`,
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Typical Vehicle Market Loss by Damage Severity",
  description:
    "Real-world resale discount as a percentage of pre-accident value, by damage severity, used to sanity-check a 17c diminished value estimate.",
  url: `${SITE}/diminished-value-calculator#loss-by-severity`,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  variableMeasured: [
    "Damage severity",
    "Market value lost (% of pre-accident value)",
  ],
  measurementTechnique:
    "Comparison of post-repair resale prices against clean-history comparables by damage category",
};

export default function DiminishedValueCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <DiminishedValueCalculatorBody locale="en" />
    </>
  );
}
