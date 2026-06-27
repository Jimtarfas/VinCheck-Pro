import type { Metadata } from "next";
import CarDepreciationCalculatorBody from "@/components/CarDepreciationCalculatorBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Free Car Depreciation Calculator — How Much Will My Car Be Worth?",
  description:
    "Calculate exactly how much your car will lose each year. See 1, 3, 5, 7, and 10-year projected values with brand-specific depreciation curves for 30+ makes.",
  keywords: [
    "car depreciation calculator",
    "vehicle depreciation calculator",
    "car value depreciation",
    "how much will my car depreciate",
    "car depreciation rate",
    "auto depreciation calculator",
    "vehicle value depreciation",
    "car depreciation by year",
    "car depreciation chart",
    "5 year car depreciation",
    "10 year car depreciation",
    "luxury car depreciation",
    "truck depreciation calculator",
    "suv depreciation calculator",
    "ev depreciation calculator",
    "tesla depreciation",
    "what cars hold their value",
    "best resale value",
    "car depreciation curve",
    "first year depreciation",
    "new car depreciation",
    "used car depreciation",
    "depreciation by make",
    "car residual value calculator",
    "future car value calculator",
    "car worth in 5 years",
    "vehicle depreciation by mileage",
    "depreciation calculator with mileage",
    "car aging calculator",
    "auto resale calculator",
  ],
  alternates: hreflangAlternates("/car-depreciation-calculator"),
  openGraph: {
    title: "Car Depreciation Calculator — How Much Will My Car Be Worth?",
    description:
      "See your car's projected value at 1, 3, 5, 7, and 10 years. Brand-specific depreciation curves for 30+ makes including Toyota, Honda, Tesla, BMW, and more.",
    url: `${SITE}/car-depreciation-calculator`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Depreciation Calculator — Project Your Car's Value 10 Years Out",
    description:
      "Free calculator with brand-specific depreciation curves. See how much your car loses each year and which brands hold value best.",
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
  inLanguage: "en",
  name: "Car Depreciation Calculator",
  description:
    "Free car depreciation calculator. Project your vehicle's resale value 1, 3, 5, 7, and 10 years out using brand-specific retention multipliers, vehicle type adjustments, and mileage curves.",
  url: `${SITE}/car-depreciation-calculator`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "10-year projected value table",
    "Year-over-year value loss chart",
    "30+ brand-specific retention multipliers",
    "Vehicle type adjustments (Sedan, SUV, Truck, EV, Luxury, Sports, Minivan)",
    "Mileage-based depreciation adjustment",
    "Condition assumption modeling",
    "Worst depreciation year identification",
    "Comparison to market average",
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
  inLanguage: "en",
  name: "How to Calculate Your Car's Depreciation",
  description:
    "Use CarCheckerVIN's free car depreciation calculator to project your vehicle's value 1, 3, 5, 7, and 10 years from now.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Select your vehicle make",
      text: "Choose from 30 popular makes. Each brand has a historical retention multiplier — Toyota and Lexus retain more value, while luxury European brands and domestic minivans depreciate faster than average.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter purchase year and price",
      text: "Type the calendar year you bought (or plan to buy) the vehicle and the price you paid in USD. The calculator anchors all future projections on this baseline.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Add mileage and vehicle type",
      text: "Enter expected annual mileage (12,000 is the industry average) and select body style — Sedan, SUV, Truck, EV, Luxury, Sports, or Minivan. Each adjusts the depreciation curve.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Review the 10-year projection",
      text: "Click 'Calculate Depreciation' to see year-by-year projected values, total dollar loss, the worst single-year drop, and how your vehicle compares to the market average.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a new car depreciate in the first year?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A typical new car loses about 20% of its value in the first 12 months — roughly half of that drop happens the moment you drive it off the lot. After year one, the depreciation curve flattens, with the average vehicle losing about 10% per year through year five and 5–7% per year after that.",
      },
    },
    {
      "@type": "Question",
      name: "Which car brands hold their value best?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lexus, Toyota, Honda, Porsche, Subaru, and Tesla consistently rank highest for value retention. Toyota and Honda benefit from reliability reputations and strong used-car demand. Porsche holds value due to limited production and enthusiast demand. Lexus combines Toyota reliability with luxury features.",
      },
    },
    {
      "@type": "Question",
      name: "Which cars depreciate the fastest?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Land Rover, Jaguar, Maserati, BMW 7 Series, Mercedes-Benz S-Class, Cadillac, Lincoln, and Chrysler typically depreciate fastest. Luxury European sedans, large American luxury cars, and brands with reliability concerns tend to lose 50–60% of value in the first three years.",
      },
    },
    {
      "@type": "Question",
      name: "Do electric vehicles (EVs) depreciate faster than gas cars?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most EVs historically depreciate faster than comparable gas vehicles due to rapid technology improvements, federal tax credit dynamics, and battery degradation concerns. Tesla is an exception and holds value relatively well. The gap is narrowing as EV technology matures and used EV demand grows.",
      },
    },
    {
      "@type": "Question",
      name: "How does mileage affect car depreciation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The industry baseline is 12,000 miles per year. Each 1,000 miles above that average per year reduces value by approximately 0.5% per year of ownership. Low-mileage vehicles command a premium — the same model at 60,000 miles can be worth 8–12% more than one at 100,000 miles after five years.",
      },
    },
    {
      "@type": "Question",
      name: "Is it better to buy a new or used car to avoid depreciation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Buying a 2–3 year old used vehicle lets the original owner absorb the steepest depreciation hit (the first-year ~20% drop). A 3-year-old certified pre-owned car typically costs 35–40% less than new, with most of the warranty period still intact. This is the financial sweet spot for most buyers.",
      },
    },
    {
      "@type": "Question",
      name: "Do trucks and SUVs hold their value better than sedans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, slightly. Full-size trucks (Toyota Tacoma, Ford F-150, Chevy Silverado) and mid-size SUVs typically retain 5–10% more value over five years compared to sedans, driven by strong used-truck demand, work/utility usage, and outdoor lifestyle appeal. Compact sedans depreciate the fastest.",
      },
    },
    {
      "@type": "Question",
      name: "How can I reduce depreciation on my car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keep mileage near 12,000/year, follow the manufacturer's service schedule with documented receipts, avoid accidents and aftermarket modifications, store the vehicle in a garage to protect paint and interior, and choose neutral colors (white, silver, black, gray) which appeal to the broadest used-car buyer pool.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    {
      "@type": "ListItem",
      position: 2,
      name: "Car Depreciation Calculator",
      item: `${SITE}/car-depreciation-calculator`,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "en",
  name: "Car Depreciation Calculator",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#what-is", "#why-cars", "#faq"],
  },
  url: `${SITE}/car-depreciation-calculator`,
};

export default function CarDepreciationCalculatorPage() {
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
      <CarDepreciationCalculatorBody locale="en" />
    </>
  );
}
