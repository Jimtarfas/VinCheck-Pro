import type { Metadata } from "next";
import VinDecoderBody, { VIN_DECODER_FAQS_EN } from "@/components/VinDecoderBody";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Free VIN Decoder — Decode Any VIN Number Instantly",
  description:
    "Free VIN decoder tool. Enter any 17-character VIN to instantly see the full breakdown: WMI, VDS, check digit, model year, plant code, and production sequence. Decode cars, trucks, motorcycles, and RVs in seconds.",
  keywords: [
    "vin decoder",
    "free vin decoder",
    "vin number decoder",
    "decode vin",
    "vin lookup free",
    "vin check free",
    "vehicle identification number decoder",
    "vin decoder tool",
    "online vin decoder",
    "free vin check",
    "decode vin number",
    "vin decoder online",
    "17 digit vin decoder",
    "car vin decoder",
    "auto vin decoder",
    "motorcycle vin decoder",
    "truck vin decoder",
    "vin decoder no charge",
    "vin meaning",
    "what does vin stand for",
    "vin number lookup",
    "vin decoder carfax alternative",
    "vin decoder 2024",
    "instant vin decoder",
  ],
  alternates: { canonical: "/vin-decoder" },
  openGraph: {
    title: "Free VIN Decoder — Decode Any VIN Number Instantly",
    description:
      "Enter any 17-character VIN to instantly see WMI, VDS, check digit, model year, plant code, and production sequence. Free online VIN decoder for cars, trucks, motorcycles, and RVs.",
    url: `${SITE}/vin-decoder`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free VIN Decoder — Decode Any VIN Number Instantly",
    description:
      "Decode any 17-character VIN instantly. See WMI, VDS, check digit, model year, plant code, and production sequence — free, no signup required.",
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
  name: "Free VIN Decoder",
  description:
    "Free online VIN decoder. Enter any 17-character Vehicle Identification Number to instantly see WMI, VDS, check digit, model year, plant code, and production sequence. Decode cars, trucks, motorcycles, and RVs.",
  url: `${SITE}/vin-decoder`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "17-character VIN position breakdown",
    "World Manufacturer Identifier (WMI) decode",
    "Vehicle Descriptor Section (VDS) decode",
    "Check digit validation",
    "Model year decode",
    "Assembly plant code",
    "Production sequence number",
    "Live VIN character visualizer",
    "Cars, trucks, motorcycles, and RV support",
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
  name: "How to Decode a VIN Number",
  description:
    "Use CarCheckerVIN's free VIN decoder to instantly break down any 17-character VIN into its component parts.",
  totalTime: "PT1M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Enter your 17-character VIN", text: "Locate the VIN on the driver-side doorjamb sticker, the lower-left corner of the windshield, or your vehicle's title and registration. Type or paste the full 17-character VIN into the decoder field. The tool accepts VINs for cars, trucks, motorcycles, and RVs." },
    { "@type": "HowToStep", position: 2, name: "See the position breakdown instantly", text: "As soon as you enter 17 characters the decoder shows you the full position breakdown: positions 1–3 (WMI — manufacturer and country), 4–8 (VDS — model, body, engine), position 9 (check digit), position 10 (model year), position 11 (assembly plant), and positions 12–17 (production sequence)." },
    { "@type": "HowToStep", position: 3, name: "Review check digit validation", text: "The decoder automatically runs the NHTSA check-digit algorithm on your VIN. A green indicator means the check digit is mathematically valid; an amber warning means there may be a typo or the VIN has been altered." },
    { "@type": "HowToStep", position: 4, name: "Get full manufacturer data", text: "Click 'Decode VIN' to fetch full manufacturer specs: year, make, model, trim, body style, engine, transmission, drivetrain, fuel type, horsepower, and more. Results appear in seconds." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: VIN_DECODER_FAQS_EN.map((f) => ({
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
    { "@type": "ListItem", position: 2, name: "VIN Decoder", item: `${SITE}/vin-decoder` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Free VIN Decoder — Decode Any VIN Number Instantly",
  description:
    "Free VIN decoder tool. Enter any 17-character VIN to instantly see the full breakdown: WMI, VDS, check digit, model year, plant code, and production sequence.",
  url: `${SITE}/vin-decoder`,
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".page-description"] },
};

export default function VinDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <VinDecoderBody locale="en" />
    </>
  );
}
