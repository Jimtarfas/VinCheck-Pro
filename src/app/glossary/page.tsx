import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";

export const metadata: Metadata = {
  title: "VIN & Vehicle History Glossary — 60+ Terms Defined",
  description:
    "The complete VIN and vehicle history glossary. 60+ car-buying, title brand, and automotive terms defined in plain English to help you shop smarter.",
  keywords: [
    "vin glossary",
    "vehicle history terms",
    "car buying terminology",
    "title brand definitions",
    "automotive glossary",
  ],
  alternates: { canonical: "/glossary" },
  openGraph: {
    title: "VIN & Vehicle History Glossary — 60+ Terms Defined",
    description:
      "Plain-English definitions for VIN structure, title brands, inspection, valuation, and vehicle history terminology.",
    url: "https://carcheckervin.com/glossary",
    type: "article",
  },
};

type Term = {
  term: string;
  definition: string;
  href?: string;
};

const terms: Term[] = [
  {
    term: "ACV (Actual Cash Value)",
    definition:
      "The fair market value of a vehicle immediately before a loss, used by insurers to settle total-loss claims. ACV factors in age, mileage, condition, and local demand. It is typically lower than retail replacement cost.",
  },
  {
    term: "Airbag history",
    definition:
      "A record showing whether a vehicle's airbags have ever deployed and whether replacements were properly installed. Missing or improperly reset airbags are a major safety red flag. Airbag history sometimes appears on vehicle history reports and inspection records.",
    href: "/accident-history-check",
  },
  {
    term: "As-is sale",
    definition:
      "A used-car sale in which the buyer accepts the vehicle in its current condition with no implied warranty. Once you sign, repairs are your responsibility unless fraud is proven. Always run a VIN check and pre-purchase inspection before agreeing to as-is terms.",
    href: "/vin-check",
  },
  {
    term: "Assembly plant",
    definition:
      "The factory where a vehicle was built, encoded in the 11th character of the VIN. Knowing the plant can help diagnose recall scope or production-run issues. Manufacturers may use multiple plants for the same model.",
  },
  {
    term: "Auction record",
    definition:
      "A historical entry showing a vehicle was sold or offered at a wholesale, salvage, or insurance auction. Frequent auction appearances often signal damage, total loss, or lemon buyback history. Auction photos can reveal damage hidden by later cosmetic repairs.",
  },
  {
    term: "AutoCheck",
    definition:
      "A vehicle history report service owned by Experian, often used by dealers and at auctions. It scores vehicles on a numeric scale based on title, accident, and ownership history. AutoCheck and Carfax sometimes show different records, so cross-checking is wise.",
  },
  {
    term: "Bill of sale",
    definition:
      "A written document recording the transfer of a vehicle from seller to buyer, including price, VIN, and parties' details. Many states require a notarized bill of sale to register the vehicle. Keep your copy for tax and warranty purposes.",
  },
  {
    term: "Bonded title",
    definition:
      "A title issued when ownership documentation is missing, backed by a surety bond that protects future claimants. The bond typically remains in force for three to five years. Bonded titles can usually be converted to standard titles after the bond period expires without claims.",
  },
  {
    term: "Branded title",
    definition:
      "Any title carrying a permanent designation such as salvage, rebuilt, flood, junk, or lemon. Branded vehicles are worth substantially less and may be harder to insure or finance. The brand follows the VIN across state lines for the life of the vehicle.",
    href: "/salvage-title-check",
  },
  {
    term: "Bumper-to-bumper warranty",
    definition:
      "A comprehensive manufacturer warranty covering most vehicle components except wear items and routine maintenance. Coverage typically lasts three years or 36,000 miles, whichever comes first. It usually transfers with the VIN to subsequent owners until expiration.",
  },
  {
    term: "Carfax",
    definition:
      "A widely recognized vehicle history report provider that aggregates title, accident, service, and ownership records. Reports include a Buyback Guarantee on covered title issues. Carfax pricing is significantly higher than alternatives like CarCheckerVIN.",
    href: "/vin-check-vs-carfax",
  },
  {
    term: "Certificate of title",
    definition:
      "The official state-issued legal document proving ownership of a vehicle. It lists the VIN, owner, lienholders, and any title brands. You generally cannot transfer or register a vehicle without it.",
  },
  {
    term: "Certified pre-owned (CPO)",
    definition:
      "A used vehicle that has passed a manufacturer-backed inspection and qualifies for an extended warranty. CPO programs vary widely between brands, so always read the contract. Expect to pay a premium versus a non-certified equivalent.",
  },
  {
    term: "Check digit",
    definition:
      "The 9th character of the VIN, calculated from the other 16 characters using a weighted formula. It allows software to detect typos and counterfeit VINs. A failing check digit is a strong indicator of fraud or VIN cloning.",
  },
  {
    term: "Chop shop",
    definition:
      "An illegal operation that disassembles stolen vehicles to sell parts on the black market. Parts from chop shops sometimes appear on legitimate marketplaces with mismatched VINs. Buying chop-shop parts can lead to seizure and criminal exposure.",
    href: "/stolen-vehicle-check",
  },
  {
    term: "Clean title",
    definition:
      "A title with no damage, salvage, flood, or other adverse brands recorded against the VIN. Clean does not necessarily mean the vehicle has never been damaged, only that no brand was reported. Always pair a clean title with an independent inspection.",
  },
  {
    term: "Clear title",
    definition:
      "A title that is free of liens or other ownership encumbrances, ready for transfer. Clear refers to ownership status, while clean refers to damage history. A title can be clean and still not clear if a lender holds a lien.",
  },
  {
    term: "Cloned VIN",
    definition:
      "A VIN copied from a legitimate vehicle and applied to a stolen or salvaged one to disguise its identity. Cloned VINs often pair with forged titles and altered registration documents. A physical VIN inspection can reveal mismatches between stamped and visible plates.",
    href: "/stolen-vehicle-check",
  },
  {
    term: "Dealer markup",
    definition:
      "An amount added above the manufacturer's suggested retail price, common for in-demand models. Markups are negotiable in soft markets but rigid during shortages. Always compare the out-the-door price across multiple dealers.",
  },
  {
    term: "Depreciation",
    definition:
      "The decline in a vehicle's value over time due to age, mileage, and wear. Most cars lose 20 to 30 percent of value in the first year and roughly 60 percent over five years. Buying lightly used can sidestep the steepest depreciation curve.",
  },
  {
    term: "DMV",
    definition:
      "The Department of Motor Vehicles, the state agency that issues titles, registrations, and driver licenses. Some states use alternate names such as DOT, MVD, or BMV. The DMV is the authoritative source for state-level title and registration data.",
  },
  {
    term: "Documentation fee",
    definition:
      "A dealer charge for preparing and filing the paperwork associated with a vehicle sale. Doc fees vary widely by state and are sometimes capped by law. They are negotiable in some markets but rarely waived entirely.",
  },
  {
    term: "Duplicate title",
    definition:
      "A replacement certificate of title issued when the original is lost, stolen, or damaged. Most states require an affidavit and a small fee. Duplicate titles may be marked as such on their face.",
  },
  {
    term: "Edmunds TMV",
    definition:
      "Edmunds True Market Value, an estimated transaction price based on recent sales in your area. TMV adjusts for trim, mileage, options, and regional demand. Use it alongside Kelley Blue Book to triangulate fair pricing.",
  },
  {
    term: "Emissions inspection",
    definition:
      "A state-mandated test that measures a vehicle's exhaust pollutants. Many urban counties require passing emissions before registration renewal. Failing vehicles must be repaired or, in limited cases, granted a waiver.",
  },
  {
    term: "Encumbered title",
    definition:
      "A title showing one or more active liens, meaning a lender has a financial interest in the vehicle. Encumbered vehicles cannot be transferred free and clear until the lien is satisfied. Always confirm lien release before paying a private seller.",
  },
  {
    term: "Extended warranty",
    definition:
      "An optional service contract that prolongs coverage beyond the original manufacturer warranty. Costs, exclusions, and claim processes vary widely between providers. Read the fine print on pre-existing condition and modification clauses.",
  },
  {
    term: "Fleet vehicle",
    definition:
      "A vehicle previously owned and operated by a company, government agency, or rental fleet. Fleet vehicles often have higher mileage but stricter maintenance schedules. Fleet history may affect resale value and warranty eligibility.",
  },
  {
    term: "Flood title",
    definition:
      "A title brand applied when a vehicle has sustained damage from being submerged in water above sensitive components. Flood vehicles can suffer corrosion and electrical failures for years after the loss. Some states mark these as Flood, others fold them into the salvage brand.",
    href: "/salvage-title-check",
  },
  {
    term: "Frame damage",
    definition:
      "Bending, cracking, or compromise of a vehicle's structural frame or unibody. Even after professional repair, frame damage can affect crash performance and resale value. Many lenders and CPO programs reject vehicles with documented frame damage.",
    href: "/accident-history-check",
  },
  {
    term: "GAP coverage",
    definition:
      "Guaranteed Asset Protection insurance that pays the difference between a vehicle's ACV and the remaining loan balance after a total loss. GAP is most valuable on long-term loans with low down payments. It usually does not cover deductibles, late fees, or extended warranties.",
  },
  {
    term: "Hail damage",
    definition:
      "Cosmetic or structural denting caused by large hailstones striking the vehicle. Severe hail damage can lead to a salvage or hail-specific title brand. Many hail-damaged cars are sold at insurance auctions and resold without proper disclosure.",
  },
  {
    term: "Junk title",
    definition:
      "A title indicating a vehicle is fit only for parts or scrap and cannot legally be re-titled or driven. Junk-titled vehicles occasionally resurface through fraud and title washing. Always cross-check a VIN against NMVTIS for junk records.",
    href: "/salvage-title-check",
  },
  {
    term: "Kelley Blue Book",
    definition:
      "A long-standing automotive valuation source publishing trade-in, private-party, and retail values. KBB pricing is widely accepted by dealers, lenders, and insurers. Use the same condition tier across providers when comparing estimates.",
  },
  {
    term: "Lemon buyback",
    definition:
      "A vehicle repurchased by the manufacturer under a state lemon law because it could not be repaired. Lemon buybacks must be disclosed and typically carry a permanent title brand. They sometimes return to market after repairs at a steep discount.",
    href: "/lemon-check",
  },
  {
    term: "Lemon law",
    definition:
      "State and federal statutes that protect buyers of new and sometimes used vehicles with chronic defects. Qualifying vehicles may be eligible for replacement, refund, or cash settlement. Lemon law thresholds vary, so consult your state attorney general's office for specifics.",
    href: "/lemon-check",
  },
  {
    term: "Lien",
    definition:
      "A legal claim against a vehicle securing payment of a debt, most often a car loan. The lienholder is listed on the title until the debt is satisfied and the lien is released. You cannot transfer clear ownership while a lien remains active.",
  },
  {
    term: "Lienholder",
    definition:
      "The party, usually a bank or credit union, that holds a lien on the vehicle. The lienholder physically holds or electronically controls the title in many states. Always verify a lien release letter before paying off a private seller.",
  },
  {
    term: "Manufacturer buyback",
    definition:
      "A broader category that includes lemon buybacks plus voluntary repurchases by automakers for goodwill or recall reasons. Most carry a permanent title brand. Disclosure requirements vary by state and circumstance.",
    href: "/lemon-check",
  },
  {
    term: "Model year digit",
    definition:
      "The 10th character of the VIN, encoding the model year of the vehicle. The character cycles through letters and numbers on a 30-year rotation. Pairing it with the assembly plant character helps confirm authenticity.",
  },
  {
    term: "NICB",
    definition:
      "The National Insurance Crime Bureau, a non-profit that maintains databases of stolen and salvage vehicles reported by member insurers. Its free VINCheck tool flags stolen and total-loss records. Coverage is limited to participating insurers, so it should not be your only check.",
    href: "/stolen-vehicle-check",
  },
  {
    term: "NMVTIS",
    definition:
      "The National Motor Vehicle Title Information System, a federally mandated database tracking titles, brands, junk, and salvage records across U.S. jurisdictions. NMVTIS is the most authoritative source for cross-state title brand history. Most reputable VIN check services pull from NMVTIS.",
    href: "/vin-check",
  },
  {
    term: "Non-repairable title",
    definition:
      "A title brand indicating a vehicle is so severely damaged it can only be dismantled for parts or sold for scrap. Non-repairable vehicles cannot be re-titled for road use. The brand permanently follows the VIN.",
    href: "/salvage-title-check",
  },
  {
    term: "Odometer fraud",
    definition:
      "Illegally tampering with a vehicle's odometer to misrepresent its true mileage. Federal law requires odometer disclosure on title transfers and bans rollback. Suspicious mileage gaps in service or registration records often expose fraud.",
    href: "/odometer-check",
  },
  {
    term: "Odometer rollback",
    definition:
      "A specific form of odometer fraud where the displayed mileage is reduced. Modern digital clusters can be rolled back via service tools, leaving few visible signs. Always compare the displayed mileage to the most recent state inspection or oil-change records.",
    href: "/odometer-check",
  },
  {
    term: "Open title",
    definition:
      "A title signed by the previous owner but not yet transferred into a new owner's name. Open titles are illegal in most states and frequently associated with curbstoning and title skipping. Avoid any deal involving an open title.",
  },
  {
    term: "Parts-only title",
    definition:
      "A title designation similar to junk or non-repairable, indicating the vehicle may be sold only for components. Parts-only vehicles cannot be returned to road use. Some states use parts-only and non-repairable interchangeably.",
  },
  {
    term: "Phantom vehicle",
    definition:
      "A fictitious vehicle created in registration or insurance records, often using a fake or cloned VIN. Phantom vehicles surface in fraud schemes targeting financing or insurance payouts. A failed VIN decode is a classic warning sign.",
    href: "/stolen-vehicle-check",
  },
  {
    term: "Powertrain warranty",
    definition:
      "Coverage focused on the engine, transmission, and drivetrain components. Powertrain warranties usually last longer than bumper-to-bumper coverage, often five to ten years. They typically transfer to subsequent owners with restrictions.",
  },
  {
    term: "Pre-purchase inspection (PPI)",
    definition:
      "An independent inspection performed by a qualified mechanic before you buy a used vehicle. A good PPI uncovers hidden damage, deferred maintenance, and red flags missed on a test drive. Expect to pay 100 to 250 dollars, well worth the peace of mind.",
  },
  {
    term: "Private-party sale",
    definition:
      "A vehicle sale directly between two individuals, with no dealer in the middle. Private-party prices are typically lower than dealer retail but offer no warranty protection. A VIN check is essential before transferring any money.",
    href: "/vin-check",
  },
  {
    term: "Private-party value",
    definition:
      "An estimated price reflecting what a private buyer would reasonably pay a private seller. It generally falls between trade-in and retail values. Use it to anchor negotiations on Craigslist, Facebook Marketplace, and similar platforms.",
  },
  {
    term: "Rebuilt title",
    definition:
      "A title issued to a previously salvaged vehicle that has been repaired and passed a state safety inspection. Rebuilt vehicles are road-legal but worth 20 to 40 percent less than clean equivalents. Insurance and financing options are limited.",
    href: "/salvage-title-check",
  },
  {
    term: "Recall",
    definition:
      "A manufacturer or NHTSA-mandated repair program addressing safety defects. Recall repairs are free regardless of vehicle age or ownership. Always check open recalls by VIN before purchase and have them completed at an authorized dealer.",
  },
  {
    term: "Reconstructed",
    definition:
      "A title brand used in some states for vehicles substantially rebuilt from major component assemblies. Reconstructed vehicles must usually pass a structural and safety inspection. The brand follows the VIN and affects resale value.",
  },
  {
    term: "Registration",
    definition:
      "The state-issued credential allowing a titled vehicle to be operated on public roads. Registration must be renewed periodically and may require emissions or safety inspections. Registration is separate from the title and must be updated when ownership changes.",
  },
  {
    term: "Retail value",
    definition:
      "The price a dealer typically asks on the lot, reflecting reconditioning, marketing, warranty coverage, and overhead. Retail value is the highest of the standard valuations. Negotiate from documented private-party value when possible.",
  },
  {
    term: "Safety inspection",
    definition:
      "A periodic state inspection verifying brakes, lights, tires, and other safety systems meet minimum standards. Required intervals and scope vary by state. Failed vehicles must be repaired before they can be re-registered.",
  },
  {
    term: "Salvage title",
    definition:
      "A title brand applied when an insurer declares a vehicle a total loss, usually after damage exceeds 70 to 90 percent of its value. Salvage vehicles cannot legally be driven until rebuilt and re-titled. Always avoid salvage vehicles unless you are an experienced rebuilder.",
    href: "/salvage-title-check",
  },
  {
    term: "Structural damage",
    definition:
      "Damage affecting load-bearing components such as the frame, unibody, or pillars. Structural damage compromises crash performance even after professional repair. It is one of the strongest signals to walk away from a deal.",
    href: "/accident-history-check",
  },
  {
    term: "Title brand",
    definition:
      "A permanent notation on a vehicle title indicating significant damage, theft recovery, or other adverse history. Brands follow the VIN across state lines for the life of the vehicle. Common brands include salvage, rebuilt, flood, junk, and lemon.",
    href: "/salvage-title-check",
  },
  {
    term: "Title transfer",
    definition:
      "The legal process of moving ownership from seller to buyer through the state DMV. Most states impose strict deadlines, often 10 to 30 days from sale. Failing to transfer on time can trigger penalties and registration issues.",
  },
  {
    term: "Title washing",
    definition:
      "The fraudulent practice of moving a branded vehicle through multiple states to remove or hide adverse title brands. NMVTIS makes title washing harder but it still occurs. Always run a multi-source VIN history check before buying.",
    href: "/vin-check",
  },
  {
    term: "Total loss",
    definition:
      "An insurance designation for a vehicle whose repair cost exceeds a state-defined percentage of its pre-loss value. Total losses usually receive a salvage or junk title brand. Even repaired total-loss vehicles can carry hidden long-term issues.",
  },
  {
    term: "Trade-in value",
    definition:
      "The amount a dealer offers to credit you for your current vehicle when buying another. Trade-in value is typically the lowest of the standard valuations because dealers must recondition and resell. In many states, the trade-in reduces sales tax on the new vehicle.",
  },
  {
    term: "TSB (Technical Service Bulletin)",
    definition:
      "A manufacturer-issued advisory describing a known issue and recommended fix. Unlike recalls, TSB repairs are usually performed at the owner's expense. Searching TSBs by VIN can reveal common problems before purchase.",
  },
  {
    term: "VDS (Vehicle Descriptor Section)",
    definition:
      "Characters 4 through 9 of the VIN, describing the vehicle's model, body, engine, and restraint system. The VDS structure is defined by each manufacturer within ISO standards. Decoding the VDS reveals trim and powertrain details.",
    href: "/vin-check",
  },
  {
    term: "VIN",
    definition:
      "The Vehicle Identification Number, a 17-character alphanumeric code that uniquely identifies every modern vehicle. The VIN encodes manufacturer, model, year, plant, and serial information. It appears on the dash, doorjamb, title, and registration.",
    href: "/vin-check",
  },
  {
    term: "VIS (Vehicle Identifier Section)",
    definition:
      "Characters 10 through 17 of the VIN, including model year, assembly plant, and a unique production sequence number. The VIS makes each vehicle individually identifiable. It is what makes VIN-based history reporting possible.",
    href: "/vin-check",
  },
  {
    term: "WMI (World Manufacturer Identifier)",
    definition:
      "The first three characters of the VIN, identifying the country, manufacturer, and vehicle type. Codes are assigned globally by SAE International. The WMI is your first clue to where and by whom a vehicle was built.",
  },
];

const sortedTerms = [...terms].sort((a, b) =>
  a.term.localeCompare(b.term, "en", { sensitivity: "base" })
);

const grouped = sortedTerms.reduce<Record<string, Term[]>>((acc, t) => {
  const letter = t.term[0]?.toUpperCase() ?? "#";
  const key = /[A-Z]/.test(letter) ? letter : "#";
  acc[key] ||= [];
  acc[key].push(t);
  return acc;
}, {});

const letters = Object.keys(grouped).sort();
const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const definedTermSetSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "VIN & Vehicle History Glossary",
  url: "https://carcheckervin.com/glossary",
  hasDefinedTerm: sortedTerms.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.definition,
    inDefinedTermSet: "https://carcheckervin.com/glossary",
    ...(t.href ? { url: `https://carcheckervin.com${t.href}` } : {}),
  })),
};

const quickTools = [
  { href: "/vin-check", label: "Free VIN Check" },
  { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
  { href: "/salvage-title-check", label: "Salvage Title Check" },
  { href: "/accident-history-check", label: "Accident History Check" },
  { href: "/odometer-check", label: "Odometer Check" },
  { href: "/lemon-check", label: "Lemon Check" },
];

export default function GlossaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />
      <section className="pt-28 pb-10 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs onDark items={[{ label: "Home", href: "/" }, { label: "Glossary" }]} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">VIN & Vehicle History Glossary</h1>
          <p className="mt-5 text-lg text-primary-100 leading-relaxed max-w-3xl">
            Buying a used car involves a lot of paperwork, acronyms, and title-brand jargon. This
            glossary defines more than 60 of the most important VIN, title, valuation, and vehicle
            history terms you will encounter, so you can shop with confidence and spot trouble before
            it costs you.
          </p>
        </div>
      </section>

      <section className="py-10 border-b border-slate-200 bg-white sticky top-16 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Glossary letters" className="flex flex-wrap gap-2 justify-center">
            {allLetters.map((l) => {
              const enabled = letters.includes(l);
              return enabled ? (
                <a
                  key={l}
                  href={`#letter-${l}`}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white font-semibold text-sm transition-colors"
                >
                  {l}
                </a>
              ) : (
                <span
                  key={l}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-50 text-slate-300 font-semibold text-sm"
                  aria-hidden
                >
                  {l}
                </span>
              );
            })}
          </nav>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {letters.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="mb-12 scroll-mt-32">
              <h2 className="text-3xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">
                {letter}
              </h2>
              <dl className="space-y-6">
                {grouped[letter].map((t) => (
                  <div key={t.term} className="bg-white">
                    <dt className="text-lg font-semibold text-slate-900">
                      {t.href ? (
                        <Link
                          href={t.href}
                          className="hover:text-primary-600 transition-colors"
                        >
                          {t.term}
                        </Link>
                      ) : (
                        t.term
                      )}
                    </dt>
                    <dd className="mt-1.5 text-slate-600 leading-relaxed">{t.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">Quick Tools</h2>
          <p className="mt-3 text-slate-700 text-center max-w-2xl mx-auto">
            Put what you just learned to work. Run a free VIN check or jump straight to a focused
            history lookup.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block p-5 bg-white rounded-2xl border border-slate-200 hover:border-primary-500 hover:shadow-md transition-all text-slate-900 font-semibold"
              >
                {tool.label}
                <span className="block mt-1 text-sm text-slate-700 font-normal">
                  Run a focused {tool.label.toLowerCase()} by VIN.
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Ready to Decode a VIN?
          </h2>
          <p className="text-slate-700 mb-8">
            Enter any 17-character VIN to see specs, title brands, and history in seconds.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
