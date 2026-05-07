import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import VinDecoder from "./VinDecoder";

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

/* ─── JSON-LD Schemas ─────────────────────────────────────── */

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
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter your 17-character VIN",
      text: "Locate the VIN on the driver-side doorjamb sticker, the lower-left corner of the windshield, or your vehicle's title and registration. Type or paste the full 17-character VIN into the decoder field. The tool accepts VINs for cars, trucks, motorcycles, and RVs.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "See the position breakdown instantly",
      text: "As soon as you enter 17 characters the decoder shows you the full position breakdown: positions 1–3 (WMI — manufacturer and country), 4–8 (VDS — model, body, engine), position 9 (check digit), position 10 (model year), position 11 (assembly plant), and positions 12–17 (production sequence).",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Review check digit validation",
      text: "The decoder automatically runs the NHTSA check-digit algorithm on your VIN. A green indicator means the check digit is mathematically valid; an amber warning means there may be a typo or the VIN has been altered.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Get full manufacturer data",
      text: "Click 'Decode VIN' to fetch full manufacturer specs: year, make, model, trim, body style, engine, transmission, drivetrain, fuel type, horsepower, and more. Results appear in seconds.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A VIN (Vehicle Identification Number) is a unique 17-character alphanumeric code assigned to every motor vehicle at the point of manufacture. It serves as the vehicle's permanent fingerprint — no two vehicles share the same VIN. The VIN encodes the country of manufacture, the manufacturer, the vehicle type and attributes, a check digit for validation, the model year, the assembly plant, and the sequential production number.",
      },
    },
    {
      "@type": "Question",
      name: "How do I decode a VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 17-character VIN is structured as follows: Positions 1–3 are the World Manufacturer Identifier (WMI) identifying the country and manufacturer. Positions 4–8 are the Vehicle Descriptor Section (VDS) encoding model, body style, restraint system, and engine type. Position 9 is a mathematically calculated check digit used to validate the VIN. Position 10 encodes the model year. Position 11 identifies the assembly plant. Positions 12–17 are the sequential production number unique to that plant and model year.",
      },
    },
    {
      "@type": "Question",
      name: "Is this VIN decoder free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The CarCheckerVIN VIN decoder is completely free to use with no signup, no subscription, and no credit card required. The position breakdown and check-digit validation are always free. Decoding full manufacturer specs (year, make, model, engine, trim, etc.) is also free.",
      },
    },
    {
      "@type": "Question",
      name: "What does each position in a VIN mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Position 1: Country of manufacture (e.g., 1 or 4 = USA, J = Japan, W = Germany). Positions 2–3: Manufacturer and vehicle type (e.g., GM, Ford, Toyota). Positions 4–8: Vehicle attributes — model line, body style, restraint system, engine code, and check character. Position 9: Check digit (mathematical validation). Position 10: Model year (A=1980, B=1981… Y=2000, 1=2001… A=2010 again). Position 11: Assembly plant code (manufacturer-specific). Positions 12–17: Sequential production number assigned at the plant.",
      },
    },
    {
      "@type": "Question",
      name: "Can I decode a motorcycle VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The VIN decoder supports motorcycles, scooters, ATVs, and other powersports vehicles that use a standard 17-character VIN. The WMI and model-year decode work the same way as for cars and trucks. Manufacturer-specific VDS positions vary by brand, so the exact meaning of positions 4–8 will differ from automotive VINs.",
      },
    },
    {
      "@type": "Question",
      name: "What information can I get from a VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "From the VIN itself you can determine the country of manufacture, manufacturer, model year, assembly plant, and sequential production number. By running a full VIN decode through our tool you also get: year, make, model, trim level, body style, drivetrain, engine type, cylinder count, displacement, horsepower, torque, fuel type, transmission, available colors, and base MSRP. A full vehicle history report adds accident records, title brands, odometer history, theft records, open recalls, and more.",
      },
    },
  ],
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
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".page-description"],
  },
};

export default function VinDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "VIN Decoder" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Free VIN Decoder
          </h1>
          <p className="page-description mt-4 text-lg text-slate-700 leading-relaxed">
            Decode any 17-character VIN instantly. See the full position breakdown — WMI,
            VDS, check digit, model year, plant code, and production sequence — plus full
            manufacturer specs for any car, truck, motorcycle, or RV. Always free, no signup required.
          </p>

          {/* ── Decoder ── */}
          <div className="mt-8">
            <VinDecoder />
          </div>

          {/* ── VIN Check CTA ── */}
          <div className="mt-10">
            <VinCheckBanner />
          </div>

          {/* ── VIN Structure Reference ── */}
          <section id="vin-structure" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              VIN Structure — What Each Position Means
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              Every modern VIN (1981 and newer) follows the ISO 3779 standard. The 17
              characters are divided into three sections, each encoding a different layer
              of vehicle identity.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Position(s)</th>
                    <th className="text-left px-4 py-3 font-medium">Section</th>
                    <th className="text-left px-4 py-3 font-medium">What It Encodes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ["1–3", "WMI", "World Manufacturer Identifier — country of assembly and manufacturer"],
                    ["4–8", "VDS", "Vehicle Descriptor Section — model, body style, restraint system, engine"],
                    ["9", "Check Digit", "Mathematical validity check (weighted sum mod 11)"],
                    ["10", "Model Year", "Year of manufacture (A=1980/2010, B=1981/2011, etc.)"],
                    ["11", "Plant Code", "Assembly plant — manufacturer-specific"],
                    ["12–17", "Sequence", "Sequential production number at that plant"],
                  ].map(([pos, section, desc]) => (
                    <tr key={pos} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-bold text-primary-700">{pos}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">{section}</td>
                      <td className="px-4 py-3 text-slate-600">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Country Codes ── */}
          <section id="country-codes" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Common WMI Country Codes (Position 1)
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              The first character of the WMI identifies the country or world region where
              the vehicle was assembled. This is not necessarily the brand&rsquo;s home country —
              many manufacturers assemble vehicles in multiple countries.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Character(s)</th>
                    <th className="text-left px-4 py-3 font-medium">Country / Region</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ["1, 4, 5", "United States"],
                    ["2", "Canada"],
                    ["3", "Mexico"],
                    ["6", "Australia"],
                    ["9", "Brazil"],
                    ["J", "Japan"],
                    ["K", "South Korea"],
                    ["L", "China"],
                    ["S", "United Kingdom"],
                    ["V", "France / Spain / Netherlands"],
                    ["W", "Germany"],
                    ["X", "Russia"],
                    ["Y", "Sweden / Finland"],
                    ["Z", "Italy"],
                  ].map(([char, country]) => (
                    <tr key={char} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-bold text-primary-700">{char}</td>
                      <td className="px-4 py-3 text-slate-700">{country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Cross-links ── */}
          <div className="mt-10 grid sm:grid-cols-3 gap-3">
            {[
              { href: "/motorcycle-vin-search", label: "Motorcycle VIN Decoder", sub: "Decode bike VINs by brand" },
              { href: "/window-sticker", label: "Window Sticker Maker", sub: "Build a Monroney label" },
              { href: "/license-plate-lookup", label: "Plate to VIN Lookup", sub: "Find VIN from plate number" },
            ].map(({ href, label, sub }) => (
              <Link key={href} href={href} className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{label}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{sub}</p>
                </div>
                <span className="text-slate-500 font-bold text-xs flex-shrink-0">→</span>
              </Link>
            ))}
          </div>

          {/* ── FAQ ── */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {[
                {
                  q: "What is a VIN?",
                  a: "A VIN (Vehicle Identification Number) is a unique 17-character code assigned to every motor vehicle at the factory. It encodes the country of manufacture, manufacturer, vehicle attributes, model year, assembly plant, and a sequential production number. No two vehicles ever share the same VIN.",
                },
                {
                  q: "Where do I find my VIN?",
                  a: "The most reliable locations are the driver-side doorjamb sticker (most visible), the lower-left corner of the windshield (visible from outside the vehicle), on the engine block, and on your title, registration, and insurance documents.",
                },
                {
                  q: "Why is my VIN's check digit showing as invalid?",
                  a: "An invalid check digit usually means a transcription error — the most common mistakes are confusing the letter O with zero, or the letter I with the number 1. Note that I, O, and Q are never valid VIN characters. Double-check your VIN against the doorjamb sticker. A VIN from a post-2000 vehicle that still shows invalid after careful re-entry should be treated as potentially altered.",
                },
                {
                  q: "What is the difference between a VIN decode and a VIN history report?",
                  a: "A VIN decode (what this tool provides) reads the vehicle's specifications directly from the VIN itself: year, make, model, engine, trim, assembly plant, and so on. A VIN history report (our paid product) goes further — it pulls NMVTIS title records, accident and damage reports, odometer history, theft records, open recall notices, and more from third-party databases that are not encoded in the VIN.",
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Related ── */}
          <div className="mt-14">
            <RelatedChecks exclude="/vin-decoder" />
          </div>
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Want the Full Story Behind This VIN?
          </h2>
          <p className="text-slate-600 mb-6">
            A VIN decode shows you the specs. A history report shows you accidents, title
            brands, odometer fraud, theft records, and open recalls — everything that
            affects the vehicle&rsquo;s real-world value and safety.
          </p>
          <Link
            href="/vin-check"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            Run a Free VIN Check
          </Link>
        </div>
      </section>
    </>
  );
}
