/**
 * Body for /trailer-vin-lookup — English-only hub page targeting the
 * "trailer vin lookup" keyword cluster (~3.6K US monthly searches).
 * Mirrors the visual structure of VinNumberLookupBody but flattens COPY (no locales).
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Truck,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, MapPin, Anchor,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const HOW_ICONS = [Search, Database, FileText] as const;
const REVEAL_ICONS = [Truck, Gauge, Wrench, Shield, AlertTriangle, Hash, Anchor, FileText] as const;
const BRAND_ICONS = [Truck, Anchor, Wrench] as const;

const COPY = {
  home: "Home",
  crumb: "Trailer VIN Lookup",
  badge: "Free Trailer VIN Lookup   ·   Stolen-Trailer Check   ·   NMVTIS-Sourced",
  h1Lead: "Trailer VIN Lookup — ",
  h1Accent: "Free Stolen-Trailer Check, GVWR Verification, and Specs.",
  intro: "A trailer VIN lookup is the single fastest way to confirm that a trailer is not stolen, that its GVWR and axle configuration actually match what the seller is claiming, and that its title is clean. Trailer theft is a $200-million-per-year problem in the United States, and unlike a car, a trailer can be repainted, re-decaled, and resold in days. Drop the VIN below to run a free trailer VIN check against NMVTIS sources, state DMV records, and the NCIC stolen-vehicle index in seconds — no sign-up, no card.",
  formHeading: "Free Trailer VIN Lookup — Search Any Trailer VIN",
  formSub: "Enter the trailer VIN and we'll surface title brands, NCIC stolen-trailer flags, GVWR, axle config, and decoded factory specs — instantly.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Database, value: "50-state", label: "NMVTIS sources" },
    { icon: Shield, value: "Stolen", label: "trailer flags" },
    { icon: Gauge, value: "GVWR &", label: "axle specs" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Trailer VIN Lookup Works",
  howIntro: "From your side it is three keystrokes and a click. Behind the scenes the tool reaches into the same federal and state databases that insurers, repo agents, and law enforcement use to track trailers — then returns the answer in plain English.",
  howSteps: [
    { tag: "Step 1", title: "Enter the trailer VIN", body: "Type or paste the trailer VIN from the coupler stamp, the tongue plate, the manufacturer's certification label inside the fender, or the title. Our tool validates standard 17-character VINs and accepts shorter pre-1998 serial numbers from light utility trailers." },
    { tag: "Step 2", title: "We query the record", body: "Your trailer VIN lookup hits NMVTIS — the federal aggregator that pulls from all 50 state DMVs and the NICB stolen-vehicle feed — plus the manufacturer's spec data for GVWR, axle count, brake type, and factory equipment. The whole trailer VIN check runs in seconds." },
    { tag: "Step 3", title: "Read the result", body: "You'll see decoded year, make, model, GVWR, axle configuration, and brake type alongside any title brands, stolen-trailer flags, and the title state chain. Use it to walk away from a hot trailer or buy with confidence." },
  ],
  h2Reveal: "What a Trailer VIN Lookup Actually Reveals",
  revealIntro: "A trailer VIN lookup is not just a decoder. It surfaces the data points that matter when you are about to spend several thousand dollars on a piece of equipment that has no engine to inspect but a hundred ways to be fraudulent.",
  reveals: [
    { title: "Manufacturer & build year", body: "The first 3 characters of a 17-char trailer VIN identify the world manufacturer code, and the 10th character encodes the model year. That tells you immediately whether the trailer was actually built in the year the seller is claiming." },
    { title: "GVWR (gross vehicle weight rating)", body: "The single most-falsified spec in trailer listings. The VIN's tied factory data confirms whether you're looking at a 3,500-lb single-axle utility or a 14,000-lb tandem-axle gooseneck — non-negotiable for your tow vehicle's safety." },
    { title: "Axle configuration", body: "Single-axle, tandem-axle, tri-axle, or torsion. The lookup pulls the factory build sheet so you can confirm the axle count and rating match the trailer in front of you." },
    { title: "Brake type & rating", body: "Electric, hydraulic surge, or none. Critical because federal and state law require brakes on trailers above specific GVWR thresholds — and a trailer that should have brakes but doesn't is a liability." },
    { title: "Title brand history", body: "Salvage, rebuilt, junk, flood, and stolen-recovered brands stay attached to the trailer VIN through NMVTIS even if the title is laundered across state lines." },
    { title: "Stolen-trailer flag", body: "The lookup checks the NCIC and NICB stolen-vehicle indices. If the trailer was ever reported stolen and never recovered into the registered owner's name, the flag shows here before you hand over a deposit." },
    { title: "Factory specs", body: "Length, deck width, ramp configuration, coupler size (2-inch ball, 2-5/16 ball, gooseneck, pintle), and tire size as built. Lets you spot post-purchase modifications and DOT-noncompliant tire swaps." },
    { title: "Title state chain", body: "The list of US states the trailer's title has passed through. Multiple recent transfers across state lines is the classic title-washing pattern for stolen trailers." },
  ],
  h2Decode: "Decoding a Trailer VIN — The 17-Character Standard and Its Exceptions",
  decode1Pre: "Trailers do not all use the same VIN format. The standard depends on the trailer's GVWR and the year it was built. Get this right and you'll know whether your trailer is supposed to have a ",
  decode1Bold: "17-character NHTSA VIN",
  decode1Suffix: " or a manufacturer's shorter serial number — and what to do if the number stamped on the coupler doesn't match what you expected.",
  decode2: "NHTSA required full 17-character VINs on all trailers with a GVWR of 10,000 pounds or higher beginning in model-year 2008. Most consumer trailers below that threshold — boat trailers, camper RVs registered as motor vehicles, and utility trailers above roughly 3,000 lbs GVWR — have carried a 17-character VIN since 1998, when most states began requiring titling for any trailer registered as a motor vehicle. That is the format the lookup decodes into year, manufacturer, GVWR, axle config, and serial.",
  decode3: "Light utility trailers built before 1998, and many small homemade or kit-built trailers under 3,000 lbs GVWR, often carry a non-standardized 12-to-17-character serial number stamped on the tongue or coupler instead of an NHTSA VIN. These trailers may or may not be titled depending on the state — Texas, Florida, and California title them; some New England states do not.",
  decode4Pre: "If your trailer has a non-standard serial number, the lookup will still query the NMVTIS database (which accepts variable-length identifiers) and the NCIC stolen-trailer index. You may get less factory-spec data — because no NHTSA VIN exists to decode — but the ",
  decode4Bold: "stolen-trailer check still runs",
  decode4Suffix: ", and that is the most important data point for a low-cost utility trailer purchase anyway.",
  decodeCardTitle: "Trailer VIN format quick reference",
  decodeRows: [
    { label: "≥10K lb GVWR, 2008+", value: "17-char NHTSA VIN" },
    { label: "Titled trailer, 1998+", value: "17-char VIN typical" },
    { label: "<3K lb utility, pre-1998", value: "12-17 char serial" },
    { label: "Homemade / kit trailer", value: "State-issued VIN" },
  ],
  decodeCardNote: "If the number on the coupler doesn't fit any of these patterns, the trailer may have been re-stamped — a major red flag for stolen equipment.",
  h2Where: "Where to Find Your Trailer VIN",
  where1Pre: "Trailers do not have a windshield to hide the VIN behind, which is both good news and bad news. The VIN is usually right there in the open, but it is often partly painted over, scratched, or — on cheap utility trailers — stamped so faintly that you need a flashlight to read it. There are typically ",
  where1Bold: "three or four locations",
  where1Suffix: " stamped or applied at the factory, and you need at least one of them to run a free trailer VIN lookup.",
  where2: "The most common location is the trailer coupler itself — the A-frame casting where the ball mount or gooseneck pin attaches to the trailer tongue. The VIN is usually die-stamped directly into the metal here. If you can't see it on the coupler, check the front of the trailer frame, the tongue tube near the coupler, or the manufacturer's certification label, which on most trailers is a foil sticker on the inside of the driver-side fender or the front bulkhead of an enclosed trailer.",
  where3: "If the VIN on the coupler does not match the VIN on the certification label, or if either one looks freshly painted, ground down, or re-stamped, stop. That mismatch is one of the strongest indicators of a stolen trailer that has been re-VIN'd — exactly what a stolen-trailer check is designed to catch.",
  whereCardTitle: "Four places the trailer VIN lives",
  whereList: [
    "Trailer coupler (die-stamped into the A-frame casting)",
    "Trailer frame near the front, just behind the coupler",
    "Tongue plate or tongue tube (often a metal placard)",
    "Manufacturer's certification label inside the fender or front bulkhead",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free trailer VIN check against NMVTIS and NCIC in seconds.",
  midCtaHeading: "Lookup This Specific Trailer VIN Right Now",
  midCtaSub: "You already have a trailer in mind. Run the VIN against NMVTIS, the NCIC stolen-trailer index, and our decoder — free, in seconds. No sign-up.",
  h2Stolen: "Stolen-Trailer Check — Why This Matters More Than Any Other Step",
  stolenIntro: "Trailer theft is the single most rampant property crime in the towing world, and a VIN lookup against the stolen-vehicle databases is your only realistic defense as a buyer.",
  stolen1Pre: "The National Insurance Crime Bureau estimates that stolen trailers cost American owners ",
  stolen1Bold: "more than $200 million per year",
  stolen1Suffix: ", and the recovery rate is brutal. While roughly 60% of stolen cars are recovered, the recovery rate for stolen trailers sits closer to 25% — because trailers have no engine to fingerprint, can be re-decaled in an afternoon, and are routinely hauled across state lines within hours of being taken.",
  stolen2: "Trailers are also disproportionately targeted because they sit unattended in driveways, jobsite lots, and rural pastures, often with low-grade hitch locks that take 30 seconds to defeat with a battery-powered angle grinder. Construction trailers loaded with tools, enclosed cargo trailers, and tandem-axle utility trailers in the $4K-$12K range are the most-stolen categories.",
  stolen3Pre: "What this means for you as a buyer: the trailer in the Craigslist photo may have been stolen last week from a contractor 400 miles away. Without a VIN check against the NCIC stolen-vehicle file (which is what the NMVTIS feed integrates), you have no way to know. A clean VIN lookup is your title insurance — if you buy a stolen trailer in good faith and law enforcement recovers it later, ",
  stolen3Bold: "the trailer goes back to the original owner and you are out the money",
  stolen3Suffix: ".",
  stolenCardTitle: "Stolen-trailer red flags",
  stolenChecklist: [
    "Title is freshly issued in the seller's name within the last 30 days",
    "Title state and trailer's current location are not the same",
    "Seller insists on cash and refuses a bill of sale with VIN",
    "VIN plate on coupler looks freshly painted, ground, or peened over",
    "VIN on coupler doesn't match VIN on the manufacturer's label",
    "Seller cannot or will not produce the original purchase receipt",
  ],
  stolenCardCta: "Run the stolen-trailer check first — paste the VIN here:",
  h2Brands: "Common Trailer Brands and Their VIN Quirks",
  brandsIntro: "The major US trailer manufacturers all use the standard 17-character NHTSA VIN format on trailers built from roughly 2010 onward, but the quality of decoded data varies by manufacturer's reporting practices.",
  brands: [
    { title: "Big Tex, PJ Trailers & Load Trail", body: "The three biggest open-deck and dump-trailer manufacturers in the US. All three use the 17-char NHTSA VIN stamped on the coupler and a matching foil certification label on the frame. NMVTIS data is generally strong, including GVWR, axle ratings, and brake configuration." },
    { title: "Sundowner & Featherlite (horse / livestock)", body: "Premium aluminum trailer builders. 17-char VINs since the late 1990s and detailed decoded specs — interior dimensions, weight ratings, and divider configurations often surface in the lookup because both manufacturers register full build-sheet data with NMVTIS." },
    { title: "Carry-On & Diamond C (utility / cargo)", body: "Volume builders of small utility and enclosed cargo trailers. Standard 17-char VINs, but on the very lightest single-axle Carry-On models built before 2008, you may encounter a manufacturer's serial shorter than 17 characters — still queryable but with less decoded factory data." },
  ],
  h2Boat: "Boat Trailers, RV Campers, and Why They're Different",
  boat1Pre: "Not every towed vehicle is a flatbed utility. Boat trailers and RV campers each have their own VIN quirks that matter when you run a lookup, and getting them confused is one of the most common buyer mistakes. The short version: a recreational trailer has ",
  boat1Bold: "one VIN that legally identifies it",
  boat1Suffix: ", but the manufacturer often stamps several other serial numbers on it for tracking purposes — and only one of them is the VIN your lookup will recognize.",
  boat2: "Boat trailers built for boats below a certain weight class are titled separately from the boat itself in most states — the trailer gets its own 17-character VIN and its own title, while the boat carries a separate hull-identification number (HIN). Older boat trailers (pre-1998) sometimes share a VIN with the boat package and get titled together, especially in Florida and the Gulf states. If the trailer has its own VIN stamped on the coupler, that is what to look up.",
  boat3: "Travel-trailer RV campers are even more confusing. A typical fifth-wheel or bumper-pull camper has both a chassis VIN — stamped on the frame near the coupler — and an interior coachwork serial number that the manufacturer uses for warranty tracking on the cabinetry, slide-outs, and appliances. The chassis VIN is what goes on the title and what your trailer VIN lookup decodes. The coachwork serial is internal to the manufacturer and won't return any meaningful data in a public lookup.",
  h2GVWR: "Verifying GVWR and Axle Specs Match the Seller's Claim",
  gvwrIntro: "This is the single most common honest mistake — and dishonest scam — in trailer listings. The trailer's actual GVWR and axle rating are baked into the VIN's factory record. The seller's description on Craigslist is just words.",
  gvwr1Pre: "Sellers list a single-axle 3,500-lb GVWR utility trailer as a ",
  gvwr1Bold: "\"tandem-axle 7K\"",
  gvwr1Suffix: " because they want the higher price, even when the trailer obviously has one axle. They might describe a 10,000-lb GVWR car hauler as a \"14K equipment trailer\" because the latter sounds more capable. The VIN lookup is the only definitive way to verify the manufacturer's actual build spec before you tow the trailer home and discover that your tow rating doesn't match what you bought.",
  gvwr2: "The factory build data also tells you the brake configuration the trailer left the assembly line with. Trailers above 3,000 lbs GVWR are required to have brakes in most US states. If the VIN says the trailer was built with electric brakes and the trailer in front of you doesn't have a brake controller plug or visible brake wires running to the wheels, someone has removed safety equipment that is legally required — another reason to walk away.",
  gvwr3: "Match the VIN's stamped GVWR against the manufacturer's certification label, against the trailer's actual physical configuration (axle count, wheel size, fender shape), and against the seller's verbal description. All four should agree. When they don't, the VIN is the source of truth — paper and paint can be changed, but the manufacturer's record cannot.",
  h2Internal: "Related VIN Checks That Build On Your Trailer Lookup",
  internalIntro: "A trailer VIN lookup is the entry point. These focused checks dig into specific records when something looks off — or when you want to be extra thorough before signing a bill of sale.",
  internalLinks: [
    { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check", desc: "Dedicated NCIC and NICB stolen-vehicle database query — the single most important check for any used trailer purchase." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down the 17-character VIN into year, manufacturer, GVWR, axle config, and factory equipment." },
    { href: "/vin-check", label: "Full VIN Check", desc: "Complete history report including title brands, accidents, brand chain, and recalls in one place." },
    { href: "/rv-vin-check", label: "RV VIN Check", desc: "Specialized check for travel trailers, fifth-wheels, and motorhomes — pulls coachwork data when available." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if the trailer VIN carries a salvage, junk, or non-repairable title brand from any state." },
    { href: "/vehicle-lien-check", label: "Vehicle Lien Check", desc: "Confirm no bank or finance company holds a lien on the trailer before you buy it from a private seller." },
    { href: "/motorcycle-vin-search", label: "Motorcycle VIN Search", desc: "Specialized 17-character VIN search for street and off-road motorcycles." },
    { href: "/pricing", label: "Pricing & Full Reports", desc: "Upgrade your free trailer VIN lookup to a full premium report when you need every detail." },
  ],
  h2Faq: "Trailer VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions buyers ask most when they're about to wire money for a used trailer.",
  bottomBadge: "Free · Instant · NMVTIS & NCIC Source",
  ctaBottomHeading: "Ready to Lookup a Trailer VIN?",
  ctaBottomSub: "Enter the trailer VIN to run a free check against NMVTIS, the NCIC stolen-trailer index, and our decoder. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "How do I look up a trailer VIN?", answer: "To look up a trailer VIN, locate the 17-character (or shorter pre-1998) VIN stamped on the trailer coupler, the front of the trailer frame, the tongue plate, or the manufacturer's certification label inside the fender. Enter that VIN into the free trailer VIN lookup form on this page. The tool will validate the format, query NMVTIS for any title brands and the state chain, check the NCIC stolen-vehicle index for any stolen-trailer flags, and pull the factory-build data for GVWR, axle configuration, brake type, and decoded year and manufacturer. The entire lookup runs in seconds and returns a single readable report you can use to decide whether to proceed with the purchase." },
  { question: "Is the trailer VIN lookup free?", answer: "Yes. Our basic trailer VIN lookup is free, with no sign-up, no credit card, and no hidden charges. You enter the trailer VIN and we return the decoded specs, the title-brand summary, the stolen-trailer status, and the title state chain right away. Free trailer VIN lookups are made possible because NMVTIS data and the NCIC stolen-vehicle feed are accessible through approved providers — we surface the consumer-relevant fields without putting a paywall in front of basic safety and theft information. A paid full history report is available if you want every line item and every transfer date, but the free trailer VIN check is sufficient for most pre-purchase decisions." },
  { question: "Where is the VIN on a trailer?", answer: "The trailer VIN is most often die-stamped into the metal of the trailer coupler — the A-frame casting at the very front of the trailer where the ball mount or gooseneck pin attaches. If you cannot see it on the coupler, check the trailer frame just behind the coupler, the tongue plate (often a riveted metal placard), or the manufacturer's certification label, which is typically a foil sticker mounted inside the driver-side fender on an open utility trailer or on the front bulkhead inside an enclosed cargo trailer. If the VIN on the coupler does not match the VIN on the certification label, the trailer may have been re-VIN'd and could be stolen — stop the transaction and run a stolen-trailer check immediately." },
  { question: "Do small utility trailers have VINs?", answer: "It depends on the trailer's age and GVWR. NHTSA required full 17-character VINs on trailers with a GVWR of 10,000 pounds or higher starting in model-year 2008, and most consumer trailers built since 1998 carry a 17-character VIN because most states require it for titling. Light utility trailers built before 1998 — and many small homemade or kit-built trailers under 3,000 pounds GVWR — often carry a non-standardized 12-to-17-character serial number stamped on the tongue or coupler instead of an NHTSA VIN. Some states (Texas, Florida, California) title these trailers; others (several New England states) do not require titling for trailers below a weight threshold. Our lookup tool accepts both standard VINs and non-standard serial numbers and queries the available databases for whichever you have." },
  { question: "How do I check if a trailer is stolen?", answer: "To check whether a trailer is stolen, run its VIN through a database that integrates the NCIC (National Crime Information Center) stolen-vehicle file and the NICB (National Insurance Crime Bureau) loss-history feed. Our free trailer VIN lookup performs this check automatically as part of every search — if the trailer has ever been reported stolen and was never recovered into the registered owner's name, the lookup returns a stolen-trailer flag. This single check is the most important step you can take before buying a used trailer. The NICB estimates trailer theft costs American owners over $200 million per year, and if you unknowingly buy a stolen trailer, law enforcement can recover it from you with no obligation to refund your money — the title remains with the original lawful owner." },
  { question: "What's the difference between a trailer VIN and a trailer serial number?", answer: "A trailer VIN is a federally standardized 17-character Vehicle Identification Number issued under NHTSA rules. It encodes the world manufacturer code, vehicle attributes, model year, plant of manufacture, and a unique serial in a fixed format. A trailer serial number, by contrast, is a non-standardized identifier of variable length (typically 12 to 17 characters) assigned by the manufacturer for internal tracking. Pre-1998 utility trailers and many homemade or kit-built trailers under 3,000 pounds GVWR carry only a serial number, not a true VIN. In practice, both numbers can be queried against NMVTIS and the stolen-vehicle databases, but only a true 17-character VIN can be decoded into full factory specs like GVWR, axle configuration, and brake type." },
  { question: "Does a VIN lookup show trailer GVWR?", answer: "Yes — for any trailer with a standard 17-character NHTSA VIN, the lookup returns the factory-rated GVWR (gross vehicle weight rating) along with axle count, axle rating, brake type, deck dimensions, and coupler configuration. This data comes from the manufacturer's build-sheet record submitted to NHTSA at the time the trailer was assembled. Verifying the GVWR via the VIN is essential because it is the single most-falsified spec in used-trailer listings: sellers commonly describe a 3,500-lb single-axle as a \"7K tandem\" or a 10K car hauler as a \"14K equipment trailer\" to inflate the price. Trailers with non-standard pre-1998 serial numbers may not return a decoded GVWR because no NHTSA build record exists; in those cases, the GVWR on the trailer's certification label is the authoritative source." },
];

export default function TrailerVinLookupBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Truck className="w-4 h-4" /> {c.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>
          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">{c.intro}</p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">{c.formHeading}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{c.formSub}</p>
            <VinSearchForm size="lg" />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {c.formNote}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {c.trustStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                  <div className="text-xl sm:text-2xl font-headline font-black text-white">{s.value}</div>
                  <div className="text-[11px] text-white/65 leading-tight mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2How}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.howIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.howSteps.map((m, i) => {
              const Icon = HOW_ICONS[i];
              return (
                <div key={m.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">{m.tag}</div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{m.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Reveal}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.revealIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.reveals.map((s, i) => {
              const Icon = REVEAL_ICONS[i];
              return (
                <div key={s.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Decode}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.decode1Pre}
                <strong className="text-on-surface">{c.decode1Bold}</strong>
                {c.decode1Suffix}
              </p>
              <p>{c.decode2}</p>
              <p>{c.decode3}</p>
              <p>
                {c.decode4Pre}
                <strong className="text-on-surface">{c.decode4Bold}</strong>
                {c.decode4Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.decodeCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.decodeRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary text-xs">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.decodeCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Where}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.where1Pre}
                <strong className="text-on-surface">{c.where1Bold}</strong>
                {c.where1Suffix}
              </p>
              <p>{c.where2}</p>
              <p>{c.where3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.whereCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.whereList.map((spot) => (
                  <li key={spot} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{spot}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.whereCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Stolen}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.stolenIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.stolen1Pre}
                <strong className="text-on-surface">{c.stolen1Bold}</strong>
                {c.stolen1Suffix}
              </p>
              <p>{c.stolen2}</p>
              <p>
                {c.stolen3Pre}
                <strong className="text-on-surface">{c.stolen3Bold}</strong>
                {c.stolen3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.stolenCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.stolenChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.stolenCardCta}</p>
                <VinSearchForm size="sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Brands}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.brandsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.brands.map((item, i) => {
              const Icon = BRAND_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Boat}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.boat1Pre}
                <strong className="text-on-surface">{c.boat1Bold}</strong>
                {c.boat1Suffix}
              </p>
              <p>{c.boat2}</p>
              <p>{c.boat3}</p>
            </div>
            <div className="rounded-2xl bg-secondary-container/40 border border-outline-variant p-6">
              <div className="flex items-center gap-2 mb-3">
                <Anchor className="w-5 h-5 text-on-secondary-container" />
                <h3 className="font-headline font-extrabold text-on-surface">Two-VIN trap</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                On RV campers, only the chassis VIN goes on the title and decodes in a public lookup. The interior coachwork serial is for warranty tracking only — don't confuse the two when you're verifying a listing. For motorhomes, see our{" "}
                <Link href="/rv-vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">RV VIN check</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2GVWR}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.gvwrIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.gvwr1Pre}
                <strong className="text-on-surface">{c.gvwr1Bold}</strong>
                {c.gvwr1Suffix}
              </p>
              <p>{c.gvwr2}</p>
              <p>{c.gvwr3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">GVWR verification checklist</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {[
                  "VIN-decoded GVWR matches the manufacturer's certification label",
                  "Axle count on the trailer matches the VIN's build record",
                  "Brake configuration matches the VIN (electric, surge, or none)",
                  "Coupler type matches what the VIN says was installed at the factory",
                  "Your tow vehicle's rating exceeds the VIN-decoded loaded GVWR",
                  "If anything doesn't match, the VIN is the source of truth",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Internal}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">{c.internalIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {c.internalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">{l.label}</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{l.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-10">
          <VinCheckBanner />
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Faq}</h2>
          <p className="text-sm text-on-surface-variant mb-8">{c.faqIntro}</p>
          <div className="space-y-3">
            {FAQS_EN.map((f) => (
              <details key={f.question} className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">{f.question}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> {c.bottomBadge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">{c.ctaBottomHeading}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">{c.ctaBottomSub}</p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            {c.ctaBottomNote}
          </div>
        </section>

        <RelatedChecks exclude="/trailer-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
