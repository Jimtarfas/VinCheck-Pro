import type { Metadata } from "next";
import LeaseVsBuyCalculatorBody, { FAQS_EN } from "@/components/LeaseVsBuyCalculatorBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/lease-vs-buy-calculator`;

export const metadata: Metadata = {
  title: "Free Lease vs Buy Calculator — Should I Lease or Buy a Car?",
  description:
    "Side-by-side comparison of leasing vs financing the same car. See total cost, monthly payments, equity, and net advantage over 3-7 years. Free, instant, no sign-up.",
  keywords: [
    "lease vs buy calculator",
    "should i lease or buy",
    "lease or finance calculator",
    "lease vs buy car",
    "is leasing better than buying",
    "auto lease calculator",
    "car lease calculator",
    "car lease vs purchase",
    "lease versus loan",
    "lease vs buy comparison",
    "lease residual value calculator",
    "money factor calculator",
    "lease payment calculator",
    "buy out lease calculator",
    "total cost of leasing",
    "total cost of ownership lease",
    "leasing pros and cons calculator",
    "car finance comparison",
    "lease deal calculator",
    "monthly lease payment calculator",
    "lease end value",
    "lease equity calculator",
    "lease early termination",
    "lease mileage calculator",
    "lease vs buy spreadsheet",
    "lease tax calculator",
    "auto lease payment",
    "lease cost calculator",
    "car payment comparison",
    "should i finance or lease",
  ],
  alternates: hreflangAlternates("/lease-vs-buy-calculator"),
  openGraph: {
    title: "Lease vs Buy Calculator — Should I Lease or Buy a Car?",
    description:
      "Compare the true total cost of leasing vs financing the same car. See monthly payments, total spend, end-of-term equity, and the net advantage. Free and instant.",
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lease vs Buy Calculator — Should I Lease or Buy a Car?",
    description:
      "Side-by-side lease and finance comparison with money-factor math, residual values, equity, and a clear net-advantage verdict.",
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
  name: "Lease vs Buy Calculator",
  description:
    "Free side-by-side comparison of leasing vs financing the same vehicle. Computes monthly payment, total out-of-pocket, end-of-term equity, money-factor finance charge, and the net cost advantage.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Lease payment with money factor",
    "Residual value calculator",
    "Loan amortization for buy side",
    "Net advantage verdict (lease vs buy)",
    "Year-by-year cumulative cost table",
    "Mileage overage estimator",
    "Acquisition / disposition fee handling",
    "Tax-on-monthly and tax-on-down support",
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
  name: "How to Compare Leasing vs Buying a Car",
  description:
    "Use CarCheckerVIN's free lease vs buy calculator to find the cheaper option in five steps.",
  totalTime: "PT3M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter the vehicle MSRP and negotiated price",
      text: "MSRP drives the lease residual; negotiated price drives both the lease cap cost and the loan principal. Enter both — they're often different.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Set your down payment, trade-in, and tax rate",
      text: "These shared inputs apply to both sides. Add your combined state and local sales tax rate so the calculator can correctly tax each monthly lease payment and the buy-side principal.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Enter lease terms (money factor, residual, fees)",
      text: "Money factor is the lease equivalent of APR — multiply by 2400 to get APR. Residual % is set by the bank; 55% is typical for 36 months. Acquisition and disposition fees are bank charges at start and end.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Enter buy terms (APR and loan term)",
      text: "Use a real APR from a credit union or bank pre-approval. The loan term can be longer than the comparison window — the calculator handles partial-window amortization.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Click Compare and read the verdict",
      text: "The calculator returns side-by-side cards, a year-by-year cumulative table, and a single net-advantage verdict pill: 'Buying saves you $X' or 'Leasing saves you $X' based on net cost (out-of-pocket minus end-of-term equity).",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS_EN.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
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
      name: "Lease vs Buy Calculator",
      item: PAGE_URL,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "SpeakableSpecification",
  cssSelector: ["h1", "#quick-comparison", "#when-lease", "#when-buy", "#faq"],
  url: PAGE_URL,
};

/* ─── Page ────────────────────────────────────────────────── */

export default function LeaseVsBuyCalculatorPage() {
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
      <LeaseVsBuyCalculatorBody locale="en" />
    </>
  );
}
