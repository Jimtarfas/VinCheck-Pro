import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  Lock,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Car,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import VinSearchForm from "@/components/VinSearchForm";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: {
    absolute: "VIN Check by Vehicle Type — Powersports, Trailers & Boats",
  },
  description:
    "Free VIN check by vehicle type. Verify a used snowmobile, dirt bike, UTV, trailer or boat by VIN (or HIN) — confirm the year and check theft and title records before you buy.",
  keywords: [
    "vin check by vehicle type",
    "powersports vin check",
    "snowmobile vin check",
    "dirt bike vin check",
    "utv vin check",
    "trailer vin check",
    "boat vin check",
  ],
  alternates: { canonical: "/vin-check/type" },
  openGraph: {
    title: "VIN Check by Vehicle Type — Powersports, Trailers & Boats",
    description:
      "Free VIN check by vehicle type. Verify a used snowmobile, dirt bike, UTV, trailer or boat before you buy.",
    url: `${SITE}/vin-check/type`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIN Check by Vehicle Type — Powersports, Trailers & Boats",
    description:
      "Free VIN check by vehicle type — snowmobiles, dirt bikes, UTVs, trailers and boats.",
  },
  robots: { index: true, follow: true },
};

const QUICK_ANSWER =
  "A VIN check by vehicle type verifies a specific class of used vehicle — a snowmobile, dirt bike, UTV/side-by-side, trailer or boat — before you buy it. Off-road and powersports vehicles built since 1981 carry the standard 17-character VIN, which confirms the make and model year and surfaces theft and title records. Boats and personal watercraft are the exception: they use a 12-character Hull Identification Number (HIN), not a VIN. National theft and title coverage of powersports is uneven by state, so verification often also runs through the manufacturer and the state registration agency.";

// Directory — cluster spokes plus existing dedicated check pages, so the hub
// passes link equity to every vehicle-type "vin check" surface without
// duplicating the ones that already have a page (ATV, motorcycle, RV, etc.).
const DIRECTORY: {
  heading: string;
  links: { href: string; label: string }[];
}[] = [
  {
    heading: "Powersports",
    links: [
      { href: "/vin-check/type/snowmobile", label: "Snowmobile VIN Check" },
      { href: "/vin-check/type/dirt-bike", label: "Dirt Bike VIN Check" },
      { href: "/vin-check/type/utv", label: "UTV & Side-by-Side VIN Check" },
      { href: "/atv-vin-check", label: "ATV VIN Check" },
      { href: "/motorcycle-vin-check", label: "Motorcycle VIN Check" },
      { href: "/harley-davidson-vin-check", label: "Harley-Davidson VIN Check" },
    ],
  },
  {
    heading: "Towable & RV",
    links: [
      { href: "/vin-check/type/trailer", label: "Trailer VIN Check" },
      { href: "/rv-vin-check", label: "RV VIN Check" },
      { href: "/semi-truck-vin-lookup", label: "Semi Truck VIN Lookup" },
      { href: "/golf-cart-vin-lookup", label: "Golf Cart VIN Lookup" },
    ],
  },
  {
    heading: "Marine & specialty",
    links: [
      { href: "/vin-check/type/boat", label: "Boat VIN Check (HIN)" },
      { href: "/hin-lookup", label: "Boat HIN Lookup" },
      { href: "/classic-car-vin", label: "Classic Car VIN Check" },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
    ],
  },
];

export default function VinCheckTypeHubPage() {
  const pageUrl = `${SITE}/vin-check/type`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "VIN Check", item: `${SITE}/vin-check` },
      { "@type": "ListItem", position: 3, name: "By Vehicle Type", item: pageUrl },
    ],
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    name: "VIN Check by Vehicle Type",
    description: metadata.description as string,
    url: pageUrl,
    applicationCategory: "AutomotiveApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: ORG_AUTHOR,
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "VIN check tools by vehicle type",
    itemListElement: DIRECTORY.flatMap((g) => g.links).map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: l.label,
      url: `${SITE}${l.href}`,
    })),
  };

  const faqs = [
    {
      q: "Do off-road vehicles have a VIN I can check?",
      a: "Yes. Snowmobiles, dirt bikes and UTVs built since 1981 carry the standard 17-character VIN, so a VIN check confirms the make and model year and validates the number. Theft and title database coverage of powersports is thinner than for cars and varies by state.",
    },
    {
      q: "Can I check a boat by VIN?",
      a: "No — boats use a 12-character Hull Identification Number (HIN) under U.S. Coast Guard rules, not a VIN. The HIN does the same identity job. If the boat is on a trailer, the trailer has its own separate 17-character VIN to check.",
    },
    {
      q: "How do I check a powersports vehicle for theft?",
      a: "Run the VIN to surface reported theft records, then confirm the stamped VIN matches the title and paperwork. Because national databases cover powersports unevenly, also verify with the manufacturer and the state agency that registers the vehicle.",
    },
    {
      q: "Is the vehicle-type VIN check free?",
      a: "Yes. Decoding the VIN to confirm the make, model year and number validity is free here, with no signup. You can then pull a fuller title and history report.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageUrl,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".speakable-intro", ".speakable-answer", "h1"],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <article className="pb-16 bg-surface">
        {/* Hero — lead with the VIN search */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "VIN Check", href: "/vin-check" },
                { label: "By Vehicle Type" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Search className="w-4 h-4" /> VIN Check by Vehicle Type
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              VIN Check by Vehicle Type —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Powersports, Trailers &amp; Boats
              </span>
            </h1>

            <p className="speakable-intro page-description text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Buying a used snowmobile, dirt bike, UTV, trailer or boat? Check it
              first. Enter a 17-character VIN or U.S. license plate to confirm the
              year and check theft and title records — instantly and free.
            </p>

            <VinSearchForm size="lg" onDark withPlateToggle />
            <p className="mt-4 text-[11px] text-white/60 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Free · instant · no signup · NMVTIS &
              NHTSA data
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Quick answer */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Quick answer
              </div>
              <p className="speakable-answer text-base sm:text-lg text-on-surface leading-relaxed">
                {QUICK_ANSWER}
              </p>
            </div>
          </section>

          {/* Directory */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Check a VIN by vehicle type
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Pick the vehicle you&apos;re checking. Every one runs on the same
              VIN you enter above — boats use a HIN instead.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {DIRECTORY.map((group) => (
                <div key={group.heading}>
                  <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-on-surface-variant mb-3">
                    <Car className="w-4 h-4 text-primary" /> {group.heading}
                  </h3>
                  <ul className="space-y-1.5">
                    {group.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline group"
                        >
                          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-primary/50 group-hover:translate-x-0.5 transition-transform" />
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="text-base sm:text-lg font-bold text-on-surface mb-1.5">
                    {f.q}
                  </h3>
                  <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Upsell full report */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Search className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Get your full vehicle history report
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                A quick check confirms the basics. A full report adds accidents,
                title brands, odometer fraud, theft records and open recalls —
                sourced from NMVTIS and every state DMV.
              </p>
              <Link
                href="/vin-check"
                className="inline-flex items-center gap-2 bg-white text-primary font-bold rounded-xl px-6 py-3 text-sm hover:bg-white/90 transition"
              >
                Get Your Free Report
                <ChevronRight className="w-4 h-4" />
              </Link>
              <p className="mt-4 text-[11px] text-white/60 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3 h-3" /> NMVTIS-sourced · DPPA
                compliant
              </p>
            </div>
          </section>

          <section className="py-10">
            <VinCheckBanner />
          </section>

          <RelatedChecks exclude="/vin-check" />
        </div>
      </article>
    </>
  );
}
