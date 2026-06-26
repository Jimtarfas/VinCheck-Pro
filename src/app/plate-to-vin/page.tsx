import type { Metadata } from "next";
import PlateToVinBody, { PLATE_TO_VIN_FAQS_EN } from "@/components/PlateToVinBody";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: { absolute: "Plate to VIN — Convert Any License Plate to a VIN Free" },
  description:
    "Plate to VIN: enter a license plate and state to instantly get the 17-character VIN, year, make, model, and full vehicle history. Free, all 50 states.",
  keywords: [
    "plate to VIN",
    "plate to VIN lookup",
    "license plate to VIN",
    "convert plate to VIN",
    "plate to VIN free",
    "plate number to VIN",
    "get VIN from plate",
    "find VIN by plate",
    "license plate VIN decoder",
    "lookup vin by license plate",
    "lookup vin from license plate",
    "vin lookup by plate",
    "vin lookup with license plate",
    "vin lookup by license plate",
    "license plate to vin number lookup",
    "vin number lookup by license plate",
    "lookup vin number by license plate",
    "vehicle vin lookup by license plate",
    "car vin lookup by license plate",
    "lookup vin with license plate",
    "vin by plate lookup",
    "vin lookup using license plate",
    "vin lookup with plate",
    "vin lookup plate",
    "vin lookup by plate number",
    "lookup vin based on license plate",
    "lookup vin by plate",
  ],
  alternates: { canonical: "/plate-to-vin" },
  openGraph: {
    title: "Plate to VIN — Convert Any License Plate to a VIN Free",
    description:
      "Enter a license plate and state to instantly get the VIN, year, make, model, and full vehicle history. Free, all 50 states.",
    url: `${SITE}/plate-to-vin`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plate to VIN — Convert Any License Plate to a VIN Free",
    description:
      "Enter a license plate and state to instantly get the VIN, year, make, model, and full vehicle history. Free, all 50 states.",
  },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "Plate to VIN",
  description: "Free plate-to-VIN tool. Enter any US license plate number and state to instantly retrieve the VIN, decoded vehicle details, and a full history report.",
  url: `${SITE}/plate-to-vin`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Convert a license plate to a VIN",
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
  mainEntity: PLATE_TO_VIN_FAQS_EN.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Plate to VIN", item: `${SITE}/plate-to-vin` },
  ],
};

export default function PlateToVinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PlateToVinBody locale="en" />
    </>
  );
}
