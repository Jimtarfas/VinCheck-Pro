import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { marketplaces } from "@/lib/marketplaces";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Marketplace VIN Check — Verify Before You Buy",
  description:
    "Run a VIN check before buying from any online marketplace. Verify vehicles listed on Facebook Marketplace, Craigslist, eBay Motors, Copart, and more with a full vehicle history report.",
  keywords: [
    "marketplace VIN check",
    "Facebook Marketplace VIN check",
    "Craigslist VIN check",
    "eBay Motors VIN check",
    "Copart VIN check",
    "online marketplace vehicle history",
    "used car VIN check",
    "private seller VIN check",
    "auction VIN check",
  ],
  alternates: { canonical: "/marketplace-vin-check" },
  openGraph: {
    title: "Marketplace VIN Check — Verify Before You Buy",
    description:
      "Check any vehicle listed on Facebook Marketplace, Craigslist, eBay Motors, Copart, and 6 more platforms. Get a full history report before you buy.",
    type: "website",
  },
};

const riskBadge: Record<"low" | "medium" | "high", { label: string; className: string }> = {
  low: { label: "Low Risk", className: "bg-green-100 text-green-800" },
  medium: { label: "Medium Risk", className: "bg-yellow-100 text-yellow-800" },
  high: { label: "High Risk", className: "bg-red-100 text-red-800" },
};

// Single source of truth for the index-page FAQ. The same object is injected as
// FAQPage JSON-LD and mapped into the visible <details> accordion below, so the
// structured data can never drift from the on-page content. These are general
// (platform-neutral) questions about VIN-checking before buying from any online
// marketplace — the per-marketplace child pages carry their own parameterized FAQ.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why should I run a VIN check before buying from an online marketplace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Online marketplace listings are written by the seller, and most private-party sales are 'as-is' with no dealer disclosure or warranty — so the buyer carries all of the risk. A VIN check gives you an independent record of the vehicle's past, including title brands, reported accidents, odometer readings, and theft records, so you can confirm the car matches the ad before you spend money or time meeting up.",
      },
    },
    {
      "@type": "Question",
      name: "Is a marketplace VIN check free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Enter the 17-character VIN from any listing into the search box above to decode the vehicle and pull available history — no account or payment required to start. Because marketplace ads aren't verified by any third party, an independent VIN check is the most reliable way to confirm a vehicle is what the seller claims.",
      },
    },
    {
      "@type": "Question",
      name: "What scams are common in private and online car sales?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common frauds are curbstoning (an unlicensed dealer posing as a private owner to flip cars, often with hidden problems), title washing (re-titling a branded vehicle in another state to erase a salvage, flood, or lemon brand), odometer rollback (winding back the mileage to inflate value), and VIN cloning (putting a legitimate vehicle's VIN on a stolen or branded one). A VIN history report and an in-person inspection help surface all four before you pay.",
      },
    },
    {
      "@type": "Question",
      name: "Can a seller fake or swap a VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It happens — it's called VIN cloning, where a thief copies a valid VIN from a similar legitimate vehicle and attaches it to a stolen or branded car. To protect yourself, confirm the VIN in the listing matches the VIN on the driver-side dashboard, the door-jamb sticker, and the paper title, and check that none of those plates look tampered with. A VIN that differs across the car or the paperwork is a major red flag.",
      },
    },
    {
      "@type": "Question",
      name: "What should I look for in a marketplace listing before reaching out?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Be cautious of prices well below market value, a seller who refuses to share the full 17-character VIN, vague or copied descriptions, pressure to pay a deposit before you've seen the car, and 'private' sellers who seem to have many vehicles. Run the VIN first, confirm the seller's name matches the title, and treat any listing where the story or paperwork doesn't add up as a reason to walk away.",
      },
    },
    {
      "@type": "Question",
      name: "Can I check if a marketplace car is stolen, salvage, or flood damaged?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Entering the VIN above runs an NMVTIS-backed check that surfaces reported salvage, rebuilt, flood, and total-loss title brands, theft records, and odometer discrepancies where they appear in national databases. These are exactly the issues a private seller may not disclose, so verifying the VIN protects you from inheriting a branded or stolen vehicle you may not be able to legally register.",
      },
    },
    {
      "@type": "Question",
      name: "How do I pay safely when buying a car from an online marketplace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Never wire money, send gift cards, or pay a deposit before you've inspected the vehicle in person and confirmed the VIN and title. Meet in a public place during the day, verify the seller's identity matches the title, and prefer traceable payment methods. If a seller pushes you to pay quickly or off-platform before you can verify the car, treat it as a warning sign.",
      },
    },
    {
      "@type": "Question",
      name: "Does a VIN check replace an in-person inspection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — they work together. A VIN history report tells you the documented past (title brands, accidents, mileage, theft), but it can't reveal hidden mechanical issues or confirm the car on the lot is the one in the report. Use the VIN check to screen the listing, then inspect the vehicle in person or get an independent pre-purchase inspection, and match the VIN on the car to the report and the title.",
      },
    },
  ],
};

const FAQS = faqSchema.mainEntity.map((q) => ({
  q: q.name,
  a: q.acceptedAnswer.text,
}));

export default function MarketplaceVinCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Marketplace VIN Check" },
              ]}
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Marketplace VIN Check — Verify Before You Buy
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">
            Buying a vehicle from an online marketplace? Run a VIN check first. Select your
            platform below or enter a VIN directly to get a full vehicle history report.
          </p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" onDark />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            VIN Check by Marketplace
          </h2>
          <p className="text-slate-700 mb-10">
            Select the platform where you found the vehicle to learn about its specific risks
            and run a VIN check
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {marketplaces.map((m) => {
              const badge = riskBadge[m.riskLevel];
              return (
                <Link
                  key={m.slug}
                  href={`/marketplace-vin-check/${m.slug}`}
                  className="flex flex-col p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{m.icon}</span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-primary-700 transition-colors mb-1">
                    {m.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    {m.description}
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-primary-600 text-sm font-medium">
                    VIN Check <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-700 mb-8">
            What to know before buying a vehicle from any online marketplace or private seller
          </p>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0 pr-2">
                    {f.q}
                  </h3>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-2xl font-light group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Check Any Marketplace VIN Now</h2>
          <p className="text-primary-100 mb-6">
            Works with vehicles from any platform — private sellers, dealers, or auctions
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
