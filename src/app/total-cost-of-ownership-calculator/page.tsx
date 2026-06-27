import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import TotalCostOfOwnershipBody, { FAQS_EN } from "@/components/TotalCostOfOwnershipBody";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/total-cost-of-ownership-calculator`;

export const metadata: Metadata = {
  title: "Free Total Cost of Ownership Calculator — True 5-Year Car Cost",
  description:
    "Calculate the real 5-year cost of any vehicle including depreciation, financing, fuel, insurance, maintenance, repairs, taxes, and registration. Compare two vehicles side-by-side and find the true cost to own.",
  keywords: [
    "total cost of ownership calculator",
    "true cost to own",
    "5 year cost calculator",
    "car cost calculator",
    "true car cost",
    "vehicle ownership cost",
    "tco calculator car",
    "true cost to own car",
    "cost of owning a car calculator",
    "car ownership expenses calculator",
    "annual cost of car",
    "car running costs calculator",
    "5 year car cost",
    "vehicle tco",
    "fuel insurance maintenance calculator",
    "car total cost calculator",
    "auto ownership cost calculator",
    "tco vehicle comparison",
    "compare car costs",
    "kelley blue book true cost to own alternative",
    "edmunds tco alternative",
    "car expense calculator",
    "monthly car cost calculator",
    "depreciation fuel insurance calculator",
    "real cost of car ownership",
    "lifetime car cost",
    "what does it cost to own a car",
    "all-in car cost",
    "complete car cost calculator",
    "car cost over time",
  ],
  alternates: hreflangAlternates("/total-cost-of-ownership-calculator"),
  openGraph: {
    title: "Free Total Cost of Ownership Calculator — True 5-Year Car Cost",
    description:
      "See the real 5-year cost of any car. Includes depreciation, financing, fuel, insurance, maintenance, repairs, taxes, and registration. Side-by-side vehicle comparison with break-even analysis.",
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Total Cost of Ownership Calculator — True 5-Year Car Cost",
    description:
      "Calculate the real all-in cost of owning a car: depreciation, financing, fuel, insurance, maintenance, repairs, taxes. Compare two vehicles side-by-side.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

/* ─── JSON-LD Schemas ─────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "Total Cost of Ownership Calculator",
  description:
    "Free total cost of ownership (TCO) calculator. Combines depreciation, financing interest, fuel, insurance, maintenance, repairs, sales tax, and registration into a single 5-year cost number per vehicle. Side-by-side vehicle comparison with break-even analysis.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "5-year total cost of ownership",
    "Depreciation curve modeling by vehicle type",
    "Loan amortization & financing interest",
    "Fuel cost with all 50 state gas prices",
    "Insurance with annual inflation",
    "Age-adjusted maintenance & repair forecasts",
    "Sales tax by state",
    "Side-by-side vehicle comparison",
    "Break-even analysis between two vehicles",
    "Cost per mile, day, month, year",
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
  name: "How to Calculate the True Cost of Owning a Car",
  description:
    "Use CarCheckerVIN's free Total Cost of Ownership calculator to find the real 5-year cost of any vehicle in under two minutes.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Set your analysis window",
      text: "Choose 3, 5, 7, or 10 years. Five years is the industry standard for TCO comparisons because it captures the worst of depreciation while keeping repair forecasts reasonable.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter Vehicle A",
      text: "Add the make/model, vehicle type, purchase price, down payment, APR, and loan term. The calculator pulls your state's gas price and sales tax automatically.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Add insurance, MPG, and maintenance level",
      text: "Use a real insurance quote when possible. Set MPG from the EPA window sticker. Pick Low/Average/High maintenance based on the vehicle's reliability reputation.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Optionally add Vehicle B for comparison",
      text: "Toggle on the comparison panel to see two vehicles side-by-side. The calculator shows a break-even analysis if one vehicle costs more upfront but has lower running costs.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Read the breakdown",
      text: "Review the stacked cost bar, year-by-year table, and per-mile / per-day / per-month figures. The biggest cost is typically depreciation — knowing this helps you negotiate.",
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
      name: "Total Cost of Ownership Calculator",
      item: PAGE_URL,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Total Cost of Ownership Calculator",
  url: PAGE_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#what-is-tco", "#why-sticker-lies", "#tco-by-type", "#faq"],
  },
};

export default function TotalCostOfOwnershipPage() {
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
      <TotalCostOfOwnershipBody locale="en" />
    </>
  );
}
