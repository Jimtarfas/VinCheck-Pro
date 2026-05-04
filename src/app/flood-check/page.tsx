import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";

export const metadata: Metadata = {
  title: "Flood Damage Check by VIN — Detect Water-Damaged Vehicles",
  description:
    "Check any vehicle for flood damage history by VIN. Detect water damage, flood title brands, and hurricane salvage records before buying a used car.",
  keywords: [
    "flood damage check VIN",
    "flood car history",
    "water damage VIN check",
    "flood title check",
    "hurricane damage vehicle",
    "flood salvage title",
  ],
  alternates: { canonical: "/flood-check" },
  openGraph: {
    title: "Flood Damage Check by VIN — Detect Water-Damaged Vehicles",
    description:
      "Check any vehicle for flood damage history by VIN. Detect water damage, flood title brands, and hurricane salvage records.",
    url: "https://www.carcheckervin.com/flood-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Flood Damage Check by VIN",
  description:
    "Learn how to check any vehicle for flood damage history, water damage records, and flood title brands using a VIN lookup.",
  author: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
  },
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.carcheckervin.com/flood-check",
  },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
};

export default function FloodCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Flood Check" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Flood Damage Check by VIN
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Flood-damaged vehicles are one of the most dangerous pitfalls in the used car market. After major hurricanes and flooding events, thousands of water-damaged cars are dried out, cleaned up, and shipped to other states where buyers have no knowledge of the vehicle&rsquo;s history. A VIN flood check reveals flood title brands, water damage insurance claims, and salvage records from NMVTIS before you risk buying a vehicle that will fail unpredictably for years.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Check for Flood Damage History
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How Flood Damage Gets Into the Title System
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            When a vehicle is submerged in a flood event, insurance companies typically declare it a total loss if the water reached the floorboards or higher. The insurance company takes ownership of the vehicle, pays the policyholder the actual cash value, and brands the title as &ldquo;flood&rdquo; or &ldquo;salvage.&rdquo; This branded title is then reported to NMVTIS and should follow the vehicle for its lifetime.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The problem is title washing. Unscrupulous operators buy flood vehicles at salvage auctions, dry them out, and re-register them in states with weaker title brand transfer laws. Some states do not recognize flood brands from other states, allowing a new clean title to be issued. The NMVTIS database captures these records, but older events from before NMVTIS was fully implemented may not appear.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            After major weather events like Hurricane Katrina (2005), Harvey (2017), and Ian (2022), investigators tracked thousands of flood vehicles that ended up retitled in Northern states and sold to unsuspecting buyers within months of the disaster. A VIN flood check is your primary defense against this type of fraud.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Signs of Hidden Flood Damage
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Even if a VIN check returns clean results, a physical inspection for flood damage signs is always recommended when buying a used vehicle from a flood-prone region or state. Sophisticated flood car preparation can make a vehicle appear clean until the electrical problems emerge weeks or months later.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Musty or mildew odor</strong> &mdash; especially under carpet, in the trunk, and behind interior panels, even after heavy cleaning attempts.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Water stain lines</strong> &mdash; tide marks visible inside door panels, under seats, in the engine bay, or in the spare tire well.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Corrosion on electrical connectors</strong> &mdash; greenish-white oxidation on wiring harness connectors, fuse boxes, and ground points.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Rust in unusual places</strong> &mdash; premature rust on seat bolt tracks, floor pan fasteners, or brake lines indicates water intrusion.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>New carpet or interior materials</strong> &mdash; a vehicle with recently replaced carpets, seats, or headliner may have been refurbished after flooding.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Electronic glitches</strong> &mdash; intermittent warning lights, malfunctioning electronics, and HVAC issues are common after water damage.</span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What a VIN Flood Check Reveals
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A comprehensive VIN flood check queries multiple data sources that capture flood and water damage records. NMVTIS contains title brand information reported by state motor vehicle agencies. Insurance databases contain total loss records from insurers who filed flood claims. Auction records from Copart and IAA — the two largest salvage auction companies — capture flood vehicles that were sold through their channels.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The check returns any flood-specific title brands (&ldquo;Flood,&rdquo; &ldquo;Water Damage,&rdquo; &ldquo;Storm Damage&rdquo;), general salvage brands that may have originated from a flood total loss, and insurance total loss records. It also shows the states where the vehicle was registered, which can reveal a pattern consistent with post-disaster vehicle migration.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Combine the flood check with a{" "}
            <Link href="/salvage-title-check" className="text-primary-600 hover:underline font-medium">
              salvage title check
            </Link>{" "}
            and a full{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              VIN history report
            </Link>{" "}
            for the most complete picture of any vehicle&rsquo;s damage history.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            States Most Affected by Flood Vehicles
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Flood vehicle concentrations follow the geography of major weather events. Gulf Coast states — Texas, Louisiana, Florida, and Mississippi — have the highest rates of flood-branded vehicles due to repeated hurricane activity. However, flood vehicles don&rsquo;t stay in the states where they were damaged. They migrate to used car markets across the country, often appearing in dealer lots hundreds of miles from the original disaster zone.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            After Hurricane Harvey in 2017, investigators documented flood vehicles appearing in used car markets from California to Massachusetts within 90 days of the storm. States in the upper Midwest and Northeast with low flood vehicle awareness among buyers became common destinations for damaged vehicles from Texas.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Why Flood Cars Are Dangerous Long-Term
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The danger of flood vehicles is not always immediately apparent. Modern vehicles use electronics to control nearly every system — engine management, transmission shifting, ABS, airbags, traction control, and more. Saltwater intrusion into wiring harnesses and control modules creates corrosion that develops over months and years, causing intermittent failures that are extremely difficult and expensive to diagnose.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Airbag systems are particularly vulnerable. Water-damaged airbag control modules and SRS components may fail to deploy in a crash or may deploy unexpectedly. Combined with potentially compromised structural integrity from rust, a flood vehicle can be genuinely dangerous to drive even when it appears to run normally.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Always run a flood check alongside an{" "}
            <Link href="/accident-history-check" className="text-primary-600 hover:underline font-medium">
              accident history check
            </Link>{" "}
            and a{" "}
            <Link href="/stolen-vehicle-check" className="text-primary-600 hover:underline font-medium">
              stolen vehicle check
            </Link>{" "}
            before purchasing any used vehicle.
          </p>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/flood-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Check for Flood and Water Damage History
          </h2>
          <p className="text-slate-700 mb-6">
            Enter a 17-character VIN to detect flood title brands, water damage records, and hurricane salvage history.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
