import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import GasMileageCalculatorBody from "@/components/GasMileageCalculatorBody";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Gas Mileage Cost Calculator — Fuel Cost Per Mile, Month & Year (Free)",
  description:
    "Free gas mileage cost calculator. Enter your MPG, miles driven, and local gas price to instantly see your daily, monthly, and annual fuel cost. Includes road trip calculator and vehicle comparison with break-even analysis. All 50 US state gas prices included.",
  keywords: [
    "gas mileage cost calculator",
    "fuel cost calculator",
    "gas cost calculator",
    "mpg cost calculator",
    "fuel cost per mile calculator",
    "annual gas cost calculator",
    "monthly gas cost calculator",
    "road trip gas cost calculator",
    "gas mileage calculator",
    "fuel economy calculator",
    "cost per mile calculator",
    "gas cost per mile",
    "how much does gas cost per month",
    "annual fuel cost by mpg",
    "car gas cost calculator",
    "vehicle fuel cost calculator",
    "gas money calculator",
    "driving cost calculator",
    "fuel savings calculator",
    "mpg fuel cost comparison",
    "gas price calculator by state",
    "how much gas will my trip cost",
    "road trip fuel calculator",
    "fuel cost comparison two cars",
    "gas mileage savings calculator",
    "hybrid vs gas cost calculator",
    "electric vs gas cost calculator",
    "fuel efficiency calculator",
    "gas budget calculator",
    "cost of driving calculator",
  ],
  alternates: hreflangAlternates("/gas-mileage-calculator"),
  openGraph: {
    title: "Gas Mileage Cost Calculator — Fuel Cost Per Mile, Month & Year",
    description:
      "Calculate your exact fuel costs by day, month, and year. Includes road trip mode, all 50 state gas prices, and a vehicle comparison with break-even analysis.",
    url: `${SITE}/gas-mileage-calculator`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gas Mileage Cost Calculator — Fuel Cost Per Mile, Month & Year",
    description:
      "Enter MPG, miles driven, and local gas price to see your daily, monthly, and annual fuel costs. Road trip mode and vehicle comparison included.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

/* JSON-LD Schemas */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "en",
  name: "Gas Mileage Cost Calculator",
  description:
    "Free gas mileage cost calculator. Enter MPG, driving distance, and gas price to instantly calculate daily, monthly, and annual fuel costs. Includes road trip mode, all 50 US state gas price averages, and vehicle comparison with break-even analysis.",
  url: `${SITE}/gas-mileage-calculator`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Daily driving fuel cost",
    "Monthly and annual fuel cost",
    "Cost per mile calculation",
    "Road trip fuel cost mode",
    "All 50 US state gas price averages",
    "Custom gas price input",
    "Two-vehicle comparison",
    "Break-even analysis for fuel-efficient upgrade",
    "Annual CO₂ emissions estimate",
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
  name: "How to Calculate Your Gas Mileage Cost",
  description:
    "Use CarCheckerVIN's free gas mileage calculator to find your daily, monthly, and annual fuel costs in seconds.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Choose daily driving or road trip mode",
      text: "Select 'Daily Driving Cost' to calculate weekly and annual fuel spending, or 'Road Trip Cost' to estimate fuel for a specific journey.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your vehicle's MPG",
      text: "Type your car's fuel economy in miles per gallon. Find this on the window sticker, in your owner's manual, or at fueleconomy.gov. Use the combined EPA rating for the most accurate annual estimate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Set your gas price",
      text: "Select your state for an auto-filled average gas price, or enter the exact price at your local station. Prices are updated to 2025 averages for all 50 states.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Optionally compare two vehicles",
      text: "Expand the comparison section to enter a second vehicle's MPG and price difference. The calculator shows annual savings and the break-even point in months.",
    },
  ],
};

const FAQS_EN = [
  {
    question: "How do I calculate my gas cost per mile?",
    answer: "Gas cost per mile = gas price per gallon ÷ MPG. At $3.50/gallon and 28 MPG, your fuel cost is $0.125 per mile, or 12.5 cents. Multiply by your annual mileage to get the yearly fuel bill. Our calculator does this automatically and also shows monthly and daily costs.",
  },
  {
    question: "How much does gas cost per month for the average American?",
    answer: "The average American drives about 13,500 miles per year in a vehicle getting 28 MPG, spending roughly $1,660–$1,800 per year on gas at $3.45/gallon — about $138–$150/month. Higher-mileage drivers or those with less fuel-efficient vehicles can spend $200–$400/month.",
  },
  {
    question: "Is it worth buying a more fuel-efficient car to save on gas?",
    answer: "It depends on the price premium and your annual mileage. Use the comparison mode: enter your current MPG and the new vehicle's MPG, plus the price difference. The calculator shows annual savings and the break-even point in months. At average US mileage, a $5,000 premium for a vehicle getting 15 more MPG typically breaks even in 4–7 years at current gas prices.",
  },
  {
    question: "How do I calculate fuel cost for a road trip?",
    answer: "Switch to Road Trip mode, enter the total trip distance in miles, your vehicle's MPG, and the gas price. The calculator returns total gallons needed and total fuel cost. For a round trip, double the one-way distance. Remember that highway driving often achieves 10–20% better fuel economy than the combined EPA rating.",
  },
  {
    question: "What MPG should I expect from a used car?",
    answer: "Real-world MPG typically runs 5–15% below the EPA label due to driving habits, terrain, weather, and vehicle age. Older vehicles with worn spark plugs, dirty air filters, or underinflated tires can run 10–20% below their rated efficiency. Always check the vehicle's actual fuel economy history — a VIN history report can reveal prior maintenance patterns that affect efficiency.",
  },
];

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
    { "@type": "ListItem", position: 2, name: "Gas Mileage Cost Calculator", item: `${SITE}/gas-mileage-calculator` },
  ],
};

export { FAQS_EN };

export default function GasMileagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GasMileageCalculatorBody locale="en" />
    </>
  );
}
