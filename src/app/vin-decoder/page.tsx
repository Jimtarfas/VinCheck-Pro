import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import VinDecoderBody, { VIN_DECODER_FAQS_EN } from "@/components/VinDecoderBody";
import { VIN_DECODER_PAGES } from "@/lib/vin-decoder-pages";

const SITE = "https://www.carcheckervin.com";

const DECODER_GROUPS: { heading: string; category: string }[] = [
  { heading: "Decode by brand", category: "brand" },
  { heading: "Decode by vehicle type", category: "type" },
  { heading: "Decode by VIN format", category: "format" },
  { heading: "APIs & comparisons", category: "api" },
];

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

const directorySchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "VIN Decoders by Brand, Type & Format",
  itemListElement: VIN_DECODER_PAGES.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.badge,
    url: `${SITE}/vin-decoder/${p.slug}`,
  })),
};

export default function VinDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }} />
      <VinDecoderBody locale="en" />

      {/* Brand / type / format decoder directory — internal links to the
          /vin-decoder/[slug] hub-and-spoke cluster. */}
      <section className="bg-surface border-t border-outline-variant">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Decode a Specific Brand or VIN Type
          </h2>
          <p className="text-slate-700 mb-8 max-w-3xl">
            Jump to a decoder tuned to your make or VIN format — each one
            explains the manufacturer&apos;s WMI prefixes, what each position
            encodes, and how to verify the vehicle before you buy.
          </p>
          <div className="space-y-8">
            {DECODER_GROUPS.map((group) => {
              const items = VIN_DECODER_PAGES.filter((p) =>
                group.category === "api"
                  ? p.category === "api" || p.category === "compare"
                  : p.category === group.category
              );
              if (items.length === 0) return null;
              return (
                <div key={group.category}>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                    {group.heading}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/vin-decoder/${p.slug}`}
                        className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:border-primary-300 hover:bg-primary-50/40 transition p-3.5"
                      >
                        <span className="text-sm font-semibold text-slate-900 group-hover:text-primary-700">
                          {p.badge}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-primary-500 group-hover:translate-x-0.5 transition" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
