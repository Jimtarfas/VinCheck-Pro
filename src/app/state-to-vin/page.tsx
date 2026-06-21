import type { Metadata } from "next";
import StateToVinBody, { STATE_TO_VIN_FAQS_EN } from "@/components/StateToVinBody";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: { absolute: "State to VIN — Find a VIN by State and License Plate, Free" },
  description:
    "State to VIN: pick the issuing state, enter the license plate, and get the VIN, year, make, model, and full history. Free for all 50 states + D.C.",
  keywords: [
    "state to VIN",
    "VIN by state",
    "find VIN by state and plate",
    "state license plate to VIN",
    "DMV plate to VIN by state",
    "state plate lookup VIN",
    "VIN lookup by state",
    "plate to VIN by state",
  ],
  alternates: { canonical: "/state-to-vin" },
  openGraph: {
    title: "State to VIN — Find a VIN by State and License Plate, Free",
    description:
      "Pick the issuing state, enter the plate, and get the VIN, year, make, model, and full history. Free for all 50 states + D.C.",
    url: `${SITE}/state-to-vin`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "State to VIN — Find a VIN by State and License Plate, Free",
    description:
      "Pick the issuing state, enter the plate, and get the VIN, year, make, model, and full history. Free for all 50 states + D.C.",
  },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "State to VIN",
  description: "Free state-to-VIN tool. Choose the issuing state, enter the license plate, and instantly retrieve the VIN, decoded vehicle details, and a full history report.",
  url: `${SITE}/state-to-vin`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Look up a VIN by state and plate",
    "All 50 US states + D.C.",
    "Instant year, make, model decode",
    "Links to full vehicle history report",
    "DPPA-compliant data access",
  ],
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: STATE_TO_VIN_FAQS_EN.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "State to VIN", item: `${SITE}/state-to-vin` },
  ],
};

export default function StateToVinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <StateToVinBody locale="en" />
    </>
  );
}
