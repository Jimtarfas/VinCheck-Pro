import type { Metadata } from "next";
import CarLoanCalculatorBody, { FAQS_EN } from "@/components/CarLoanCalculatorBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Car Loan Calculator — Monthly Payment, Total Interest & Amortization (Free)",
  description:
    "Free car loan calculator. Enter vehicle price, down payment, trade-in, APR, and loan term to instantly calculate your monthly payment, total interest, and full amortization schedule. Works for all 50 US states.",
  keywords: [
    "car loan calculator",
    "auto loan calculator",
    "car payment calculator",
    "monthly car payment calculator",
    "auto payment calculator",
    "vehicle loan calculator",
    "car finance calculator",
    "car loan monthly payment",
    "auto loan monthly payment",
    "car loan interest calculator",
    "auto loan interest calculator",
    "car loan amortization",
    "auto loan amortization schedule",
    "car loan with trade in",
    "car loan down payment calculator",
    "used car loan calculator",
    "new car loan calculator",
    "car loan APR calculator",
    "vehicle finance calculator",
    "how much car can I afford",
    "car payment estimator",
    "auto financing calculator",
    "car loan total interest",
    "car loan payoff calculator",
    "auto loan payoff calculator",
    "best car loan rate",
    "car loan term calculator",
    "72 month car loan calculator",
    "60 month car loan calculator",
    "84 month car loan calculator",
    "car loan with taxes and fees",
  ],
  alternates: hreflangAlternates("/car-loan-calculator"),
  openGraph: {
    title: "Car Loan Calculator — Monthly Payment & Amortization (Free)",
    description:
      "Calculate your exact monthly car payment, total interest, and full amortization schedule. Includes down payment, trade-in, state sales tax, and dealer fees.",
    url: `${SITE}/car-loan-calculator`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Car Loan Calculator — Monthly Payment & Amortization",
    description:
      "Enter vehicle price, APR, and term to instantly see your monthly payment, total interest, and full amortization schedule.",
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
  name: "Car Loan Calculator",
  description:
    "Free car loan calculator. Calculate monthly payments, total interest, and a full amortization schedule for any auto loan. Supports down payment, trade-in, state sales tax, and dealer fees.",
  url: `${SITE}/car-loan-calculator`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Monthly payment calculation",
    "Full amortization schedule",
    "Trade-in value support",
    "State sales tax for all 50 states",
    "Dealer and doc fee support",
    "Loan terms from 12 to 84 months",
    "Interest vs principal breakdown",
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
  name: "How to Calculate Your Monthly Car Payment",
  description:
    "Use CarCheckerVIN's free car loan calculator to find your exact monthly payment, total interest, and amortization schedule in seconds.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter the vehicle price and down payment",
      text: "Type the total vehicle purchase price and the amount you plan to pay upfront as a down payment. If you have a trade-in, enter its estimated value to reduce the loan principal.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Set the APR and loan term",
      text: "Enter your annual interest rate (APR) from your bank, credit union, or dealer pre-approval. Select the loan term — 36, 48, 60, 72, or 84 months. Shorter terms mean higher monthly payments but less total interest.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Add state sales tax and fees",
      text: "Select your state for automatic sales tax, then enter estimated dealer and documentation fees. These are added to the loan principal if not paid upfront.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "View your results",
      text: "Click 'Calculate Monthly Payment' to instantly see your monthly payment amount, total interest paid, total cost, and the full amortization schedule showing each payment's principal and interest breakdown.",
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
    { "@type": "ListItem", position: 2, name: "Car Loan Calculator", item: `${SITE}/car-loan-calculator` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Car Loan Calculator",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#how-it-works", "#faq"],
  },
  url: `${SITE}/car-loan-calculator`,
};

export default function CarLoanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <CarLoanCalculatorBody locale="en" />
    </>
  );
}
