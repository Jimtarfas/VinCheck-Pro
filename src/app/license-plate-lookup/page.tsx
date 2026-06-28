import type { Metadata } from "next";
import LicensePlateLookupBody from "@/components/LicensePlateLookupBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: { absolute: "License Plate to VIN Lookup — Free, All 50 States" },
  description:
    "Free license plate to VIN lookup for all 50 US states. Enter a plate to get the VIN, year, make, model, and full vehicle history report.",
  keywords: [
    "license plate to VIN", "license plate lookup", "free license plate lookup",
    "plate to VIN lookup", "find car by plate number", "DMV plate lookup",
    "license plate VIN decoder", "reverse license plate lookup", "DPPA plate lookup",
    "license plate lookup by vin", "vin number lookup license plate",
    "vin license plate lookup", "lookup tag number by vin", "vin to license plate lookup",
    "license plate lookup vin", "plate lookup by vin", "license plate number lookup from vin",
    "vin number plate lookup", "plate vin lookup", "license plate vin number lookup",
    "lookup plate number by vin", "vin and license plate lookup", "vin or license plate lookup",
    "license plate lookup using vin", "vin number lookup with license plate",
    "plate number lookup by vin", "vin lookup by tag", "vin to license plate lookup free",
  ],
  alternates: hreflangAlternates("/license-plate-lookup"),
  openGraph: {
    title: "License Plate to VIN Lookup — Free, All 50 States",
    description:
      "Free license plate to VIN lookup for all 50 US states. Enter a plate to get the VIN, year, make, model, and full vehicle history report.",
    url: `${SITE}/license-plate-lookup`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "License Plate to VIN Lookup — Free, All 50 States",
    description:
      "Free license plate to VIN lookup for all 50 US states. Enter a plate to get the VIN, year, make, model, and full history.",
  },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "License Plate to VIN Lookup",
  description:
    "Free license plate to VIN lookup tool. Enter any US license plate number and state to instantly retrieve the VIN, vehicle details, and full history report.",
  url: `${SITE}/license-plate-lookup`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "All 50 US states supported",
    "VIN retrieval from plate number",
    "Instant vehicle year, make, model decode",
    "Links to full vehicle history report",
    "DPPA-compliant data access",
  ],
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Look Up a VIN by License Plate",
  description:
    "Use CarCheckerVIN's free tool to convert any US license plate number to a VIN in three steps.",
  totalTime: "PT1M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Enter the license plate number", text: "Type the alphanumeric plate number into the search field exactly as it appears on the plate, without spaces or special characters." },
    { "@type": "HowToStep", position: 2, name: "Select the issuing state", text: "Choose the US state that issued the plate from the dropdown. The same plate characters can exist in multiple states, so selecting the correct state is essential for an accurate match." },
    { "@type": "HowToStep", position: 3, name: "View the VIN and vehicle details", text: "Click 'Look Up VIN by Plate'. The tool returns the 17-character VIN along with year, make, model, and a direct link to the full vehicle history report." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Can I find a VIN from a license plate number for free?", acceptedAnswer: { "@type": "Answer", text: "Yes. CarCheckerVIN's license plate to VIN lookup is free for personal pre-purchase vehicle research. Create a free account, enter the plate number and issuing state, and the tool returns the associated 17-character VIN along with decoded vehicle details." } },
    { "@type": "Question", name: "Which US states are supported for plate-to-VIN lookup?", acceptedAnswer: { "@type": "Answer", text: "All 50 US states plus the District of Columbia are supported. Each state's motor vehicle database is queried separately, which is why you must select the issuing state — the same plate number can exist in multiple states simultaneously." } },
    { "@type": "Question", name: "Is it legal to look up a license plate to get the VIN?", acceptedAnswer: { "@type": "Answer", text: "Yes, for permissible purposes under the Driver's Privacy Protection Act (DPPA). Vehicle research before a private-party purchase is a clearly permissible use. Our lookup returns vehicle information (VIN, make, model, title status) but not personal owner data like name or home address, which the DPPA restricts." } },
    { "@type": "Question", name: "What information can I get from a license plate lookup?", acceptedAnswer: { "@type": "Answer", text: "A license plate lookup first returns the VIN. Once you have the VIN you can access the full vehicle history: year, make, model, title brands (salvage, flood, lemon law buyback), accident records, odometer readings across title transfers, number of previous owners, theft records, and open safety recalls." } },
    { "@type": "Question", name: "What if the plate lookup returns no results?", acceptedAnswer: { "@type": "Answer", text: "No results usually means the plate is expired, out of state, a temporary dealer tag, or a personalized vanity plate not yet indexed. In these cases, ask the seller for the 17-character VIN directly and run a VIN check on CarCheckerVIN for the most accurate history report." } },
    { "@type": "Question", name: "Why do I need to select a state for the plate lookup?", acceptedAnswer: { "@type": "Answer", text: "License plates are issued by individual states, not federally. The same alphanumeric sequence (e.g., 'ABC1234') can be active in California, Texas, and New York simultaneously. You must specify the issuing state so the lookup queries the correct state DMV database and returns the right vehicle record." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "License Plate to VIN Lookup", item: `${SITE}/license-plate-lookup` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "License Plate to VIN Lookup",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#what-you-get", "#how-it-works"] },
  url: `${SITE}/license-plate-lookup`,
};

const serviceRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "License Plate to VIN Lookup",
  provider: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  areaServed: { "@type": "Country", name: "United States" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", bestRating: "5", worstRating: "1", ratingCount: "104" },
};

export default function LicensePlateLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingSchema) }} />
      <LicensePlateLookupBody locale="en" />
    </>
  );
}
