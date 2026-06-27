import type { Metadata } from "next";
import CarAffordabilityCalculatorBody, { FAQS_EN } from "@/components/CarAffordabilityCalculatorBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/car-affordability-calculator`;

export const metadata: Metadata = {
  title: "Car Affordability Calculator — How Much Car Can I Afford? (Free)",
  description:
    "Free car affordability calculator. Enter your income, monthly debts, and expenses to find the maximum car price you can afford. Uses the 20/4/10 rule, 15% rule, or custom budget. Includes debt-to-income ratio check.",
  keywords: [
    "car affordability calculator",
    "how much car can I afford",
    "car budget calculator",
    "auto loan affordability",
    "car payment affordability",
    "vehicle affordability calculator",
    "how much should I spend on a car",
    "car buying budget calculator",
    "20 4 10 rule car",
    "car affordability by income",
    "max car price calculator",
    "car loan income calculator",
    "debt to income ratio car loan",
    "how much car can I afford calculator",
    "car affordability income",
    "auto affordability calculator",
    "monthly car payment by salary",
    "car budget by income",
    "car payment percentage of income",
    "how much to spend on a used car",
    "car affordability rule",
    "vehicle budget calculator",
    "car loan debt to income",
    "car buying calculator",
    "how much car for my salary",
    "car payment calculator income",
    "affordable car payment",
    "car loan qualification calculator",
  ],
  alternates: hreflangAlternates("/car-affordability-calculator"),
  openGraph: {
    title: "Car Affordability Calculator — How Much Car Can I Afford?",
    description:
      "Enter your income, debts, and expenses to instantly see the maximum car price you can afford. Uses 20/4/10, 15% rule, or a custom budget. Free, instant, no sign-up.",
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Affordability Calculator — How Much Car Can I Afford?",
    description:
      "Find out the maximum car price you can comfortably afford based on your income, existing debts, and expenses. Free and instant.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "en",
  name: "Car Affordability Calculator",
  description:
    "Free car affordability calculator. Enter income, monthly debts, and vehicle expenses to find the maximum car price you can afford — with a debt-to-income check and full monthly budget breakdown.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Max car price from income",
    "20/4/10 rule calculation",
    "15% income rule",
    "Custom budget percentage",
    "Debt-to-income ratio check",
    "Monthly budget breakdown chart",
    "Linked loan calculator",
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
  name: "How to Calculate How Much Car You Can Afford",
  description:
    "Use CarCheckerVIN's free car affordability calculator to find your maximum vehicle budget in four steps.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Enter your gross income", text: "Type your annual or monthly gross (pre-tax) income. This is the baseline lenders use to evaluate your ability to repay." },
    { "@type": "HowToStep", position: 2, name: "Add your existing monthly debts", text: "Enter your monthly rent or mortgage, credit card minimums, student loan payments, and any other recurring debt obligations. These reduce your available budget for a car payment." },
    { "@type": "HowToStep", position: 3, name: "Set loan parameters and vehicle costs", text: "Enter your expected APR, loan term, down payment, trade-in value, and estimated monthly insurance and fuel costs. The calculator subtracts running costs from your payment budget to avoid overestimating what you can borrow." },
    { "@type": "HowToStep", position: 4, name: "Choose a budget rule and calculate", text: "Select the 20/4/10 rule (total vehicle costs ≤10% of gross income), the 15% rule, or a custom percentage. Click Calculate to see your maximum car price, monthly payment, debt-to-income ratio, and full monthly budget breakdown." },
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Car Affordability Calculator", item: PAGE_URL },
  ],
};

export default function CarAffordabilityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CarAffordabilityCalculatorBody locale="en" />
    </>
  );
}
