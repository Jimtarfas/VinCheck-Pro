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
  title: { absolute: "VIN Lookup — Free VIN Number Lookup & Vehicle Search" },
  description:
    "Free VIN lookup for any vehicle. Enter a 17-character VIN or U.S. license plate to look up specs, title brands, accidents, recalls and history. Cars, trucks, trailers, classics and more.",
  keywords: [
    "vin lookup",
    "vin number lookup",
    "lookup vehicle by vin",
    "vin info lookup",
    "vehicle by vin number lookup",
    "lookup my vin number",
    "vin no lookup",
    "vin number information lookup",
  ],
  alternates: { canonical: "/vin-lookup" },
  openGraph: {
    title: "VIN Lookup — Free VIN Number Lookup & Vehicle Search",
    description:
      "Free VIN lookup for any vehicle. Enter a VIN or U.S. plate to look up specs, title brands, accidents, recalls and history.",
    url: `${SITE}/vin-lookup`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIN Lookup — Free VIN Number Lookup & Vehicle Search",
    description:
      "Free VIN lookup for any vehicle — specs, title brands, accidents, recalls and history.",
  },
  robots: { index: true, follow: true },
};

const QUICK_ANSWER =
  "A VIN lookup uses a vehicle's 17-character Vehicle Identification Number to retrieve its details and history. Entering the VIN returns the year, make, model, engine and trim, plus title status and brands, reported accidents, odometer history and open recalls — drawing on NMVTIS title data and NHTSA recall records. A U.S. license plate can also be used to find the VIN first.";

// Curated directory — cluster spokes plus the existing fuller lookups, so the
// hub passes link equity to every "vin lookup" surface without duplicating it.
const DIRECTORY: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "By vehicle type",
    links: [
      { href: "/vin-lookup/truck", label: "Truck VIN Lookup" },
      { href: "/vin-lookup/trailer", label: "Trailer VIN Lookup" },
      { href: "/vin-lookup/antique", label: "Antique & Vintage VIN Lookup" },
      { href: "/vin-lookup/snowmobile", label: "Snowmobile VIN Lookup" },
      { href: "/vin-lookup/mobile-home", label: "Mobile Home VIN Lookup" },
      { href: "/motorcycle-vin-check", label: "Motorcycle VIN Check" },
      { href: "/rv-vin-check", label: "RV VIN Check" },
      { href: "/atv-vin-check", label: "ATV VIN Check" },
      { href: "/semi-truck-vin-lookup", label: "Semi Truck VIN Lookup" },
      { href: "/hin-lookup", label: "Boat HIN Lookup" },
      { href: "/classic-car-vin", label: "Classic Car VIN Check" },
    ],
  },
  {
    heading: "By detail",
    links: [
      { href: "/vin-lookup/parts", label: "VIN Parts Lookup" },
      { href: "/vin-lookup/title", label: "Title Lookup by VIN" },
      { href: "/vin-lookup/engine", label: "Engine Lookup by VIN" },
      { href: "/vin-lookup/specs", label: "VIN Specs & Trim Lookup" },
      { href: "/vin-lookup/options", label: "Factory Options by VIN" },
      { href: "/vin-lookup/year", label: "Model Year by VIN" },
      { href: "/vin-lookup/color", label: "Factory Color by VIN" },
      { href: "/vin-lookup/tire-size", label: "Tire Size by VIN" },
      { href: "/vin-lookup/gvwr", label: "GVWR Lookup by VIN" },
      { href: "/vin-lookup/tsb", label: "TSB Lookup by VIN" },
      { href: "/vin-lookup/digits", label: "11, 13 & 17-Digit VINs" },
      { href: "/vin-lookup/partial", label: "Partial VIN Lookup" },
      { href: "/vin-lookup/registration", label: "Registration Lookup by VIN" },
      { href: "/vin-lookup/owner", label: "Owner Lookup by VIN" },
      { href: "/vin-lookup/insurance", label: "Insurance Lookup by VIN" },
      { href: "/vin-lookup/auction", label: "Salvage-Auction History by VIN" },
      { href: "/vin-lookup/canada", label: "VIN Lookup Canada" },
      { href: "/vin-decoder", label: "Full VIN Decoder (specs)" },
      { href: "/window-sticker", label: "Window Sticker Lookup" },
      { href: "/build-sheet", label: "Build Sheet by VIN" },
      { href: "/paint-code-finder", label: "Paint Code Finder" },
    ],
  },
  {
    heading: "By plate, state & history",
    links: [
      { href: "/license-plate-lookup", label: "License Plate Lookup" },
      { href: "/look-up-car-plates-free", label: "Free Plate Lookup" },
      { href: "/vin-lookup/reverse", label: "Reverse VIN Lookup" },
      { href: "/vin-lookup/dmv", label: "DMV VIN Lookup" },
      { href: "/vin-lookup/nmvtis", label: "NMVTIS VIN Lookup" },
      { href: "/vin-check/state", label: "VIN Check by State" },
      { href: "/vehicle-history-report", label: "Full Vehicle History Report" },
      { href: "/salvage-title-check", label: "Salvage Title Check" },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
    ],
  },
];

export default function VinLookupHubPage() {
  const pageUrl = `${SITE}/vin-lookup`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "VIN Lookup", item: pageUrl },
    ],
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    name: "VIN Lookup",
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
    name: "VIN lookup tools",
    itemListElement: DIRECTORY.flatMap((g) => g.links).map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: l.label,
      url: `${SITE}${l.href}`,
    })),
  };

  const faqs = [
    {
      q: "What is a VIN lookup?",
      a: "A VIN lookup uses a vehicle's 17-character VIN to retrieve its specifications and history — year, make, model, engine and trim, plus title status, accidents, odometer history and open recalls, drawing on NMVTIS and NHTSA records.",
    },
    {
      q: "How do I look up a vehicle by VIN for free?",
      a: "Enter the 17-character VIN in the search box above. It returns the decoded vehicle details instantly and lets you pull a full history report — free, with no signup.",
    },
    {
      q: "Where do I find my VIN?",
      a: "On the lower-left corner of the windshield, the driver-side door-jamb sticker, and your title and registration. On many trucks and trailers it's also stamped on the frame.",
    },
    {
      q: "Can I look up a VIN from a license plate?",
      a: "Yes. Switch the search to 'By U.S. License Plate', enter the plate and issuing state, and it resolves the VIN first, then runs the same lookup.",
    },
    {
      q: "What can a VIN lookup tell me?",
      a: "The decoded build (year, make, model, engine, transmission, trim, plant), title status and brands (salvage, rebuilt, flood, junk, lemon), reported accidents, odometer history, theft records and open recalls.",
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
              items={[{ label: "Home", href: "/" }, { label: "VIN Lookup" }]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Search className="w-4 h-4" /> Free VIN Lookup
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              VIN Lookup —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Look Up Any Vehicle by VIN
              </span>
            </h1>

            <p className="speakable-intro page-description text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Enter a 17-character VIN or U.S. license plate to look up a
              vehicle&apos;s specs, title status and full history — instantly and
              free. Works for cars, trucks, trailers, classics and specialty
              vehicles.
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
              Every VIN lookup, in one place
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Pick the lookup that fits your vehicle or what you need to check.
              Every one runs on the same VIN you enter above.
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
                A lookup confirms the basics. A full report adds accidents, title
                brands, odometer fraud, theft records and open recalls — sourced
                from NMVTIS and every state DMV.
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

          <RelatedChecks exclude="/vin-lookup" />
        </div>
      </article>
    </>
  );
}
