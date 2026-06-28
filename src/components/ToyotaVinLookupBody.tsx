/**
 * Body for /toyota-vin-lookup — English-only brand-specific page targeting
 * the "toyota vin lookup" keyword (~6.6K US monthly searches).
 * Mirrors the visual structure of VinNumberLookupBody but flattens COPY (no locales)
 * and pivots every section to Toyota-specific decoding, recalls, and history checks.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, MapPin, Cpu,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Hash, Car, Cpu, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [Cpu, Shield, Gauge] as const;

const COPY = {
  home: "Home",
  crumb: "Toyota VIN Lookup",
  badge: "Free Toyota VIN Lookup   ·   Decoded Specs   ·   NMVTIS-Sourced",
  h1Lead: "Toyota VIN Lookup — ",
  h1Accent: "Decode Any Toyota and Pull Its Recall History Free.",
  intro: "Every Toyota built since 1981 carries a 17-character Vehicle Identification Number that hides the model year, the assembly plant, the engine, the trim, and the equipment package the truck or car left the factory with. A Toyota VIN lookup unscrambles that string and queries NMVTIS, the NHTSA recall feed, and salvage auction records so you see decoded specs, title brands, and open recalls side by side. Enter a Toyota VIN below — Camry, Corolla, RAV4, Tacoma, Tundra, Highlander, 4Runner, Prius, Sienna, Sequoia, or any other model — and we'll run the lookup in seconds. No account, no card, no catch.",
  formHeading: "Free Toyota VIN Lookup — Search Any 17-Character Toyota VIN",
  formSub: "Enter a Toyota VIN and we'll decode the year, model, trim, plant, and engine, then check NMVTIS for title brands and NHTSA for open recalls.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Database, value: "NMVTIS", label: "title history" },
    { icon: Car, value: "Decoded", label: "Toyota specs" },
    { icon: Shield, value: "NHTSA", label: "recall feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Toyota VIN Lookup Works",
  howIntro: "A Toyota VIN lookup is simple from your side of the screen. Behind it, the tool reaches into the same national databases Toyota dealers and insurers use, then returns the result in plain English. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the Toyota VIN", body: "Type or paste the 17-character VIN from the lower windshield, the driver-side door jamb sticker, the Toyota title, or the insurance card. Our Toyota VIN lookup validates that it is exactly 17 characters and excludes the disallowed letters I, O, and Q before it runs." },
    { tag: "Step 2", title: "We query the records", body: "Your Toyota VIN check hits NMVTIS — the federal aggregator that pulls from all 50 state DMVs, insurers, junk yards, and salvage auctions — plus Toyota's recall feed and our decoded-specs index. The full Toyota VIN number lookup runs in seconds." },
    { tag: "Step 3", title: "Read the Toyota report", body: "You'll see the decoded model year, trim, engine, transmission, drivetrain, and assembly plant alongside any title brands, open Toyota recalls (including Takata airbag actions), and salvage or total-loss flags. Use it to negotiate, walk away, or buy with confidence." },
  ],
  h2Title: "What a Toyota VIN Lookup Reveals",
  titleIntro: "A Toyota VIN lookup is more than a decoder. It is the same VIN-keyed data Toyota dealers, insurance carriers, and state DMVs already use, presented for a buyer rather than a back-office system. Here is what comes back when you lookup a Toyota VIN with us.",
  title1Pre: "First, the decoder reads the Toyota VIN itself. The first three characters identify the ",
  title1Bold1: "world manufacturer and country",
  title1Mid: ", the next six describe the vehicle attributes including model line, body style, and restraint system, the tenth digit encodes the ",
  title1Bold2: "model year",
  title1Mid2: ", the eleventh digit identifies the ",
  title1Bold3: "Toyota assembly plant",
  title1Suffix: ", and the final six form the unique production sequence. From those alone we return the year, model, trim, body style, engine, transmission, drivetrain, and factory equipment.",
  title2Pre: "Second, your Toyota VIN # lookup queries the ",
  title2Bold: "title and brand history",
  title2Suffix: ". That is where flood, salvage, junk, rebuilt, lemon-law buyback, and odometer-rollback brands surface, alongside the chain of states the title has passed through. Toyotas hold their value well, which makes title washing tempting — NMVTIS is what keeps the original brand visible across state lines.",
  title3: "Third, the lookup checks the open-recall feed published by Toyota and NHTSA. Open safety recalls — Takata airbag inflators, fuel pump issues on 2018-2020 RAV4 and Camry, brake actuator software on certain hybrids — stay attached to the VIN until the work is completed at a Toyota dealer. Many used Toyotas carry recalls the previous owner never resolved.",
  pathCardTitle: "What you get from one Toyota VIN",
  pathRows: [
    { label: "Decoded Toyota specs", value: "Year · Model · Trim" },
    { label: "Title history", value: "Brands · States" },
    { label: "Toyota recalls", value: "Open · Resolved" },
  ],
  pathCardNote: "One 17-character Toyota VIN, three layers of insight. The whole Toyota VIN lookup runs in seconds and never asks for an account.",
  h2Decode: "Decoding a Toyota VIN — The WMI Patterns That Matter",
  decodeIntro: "The first three characters of any Toyota VIN — the World Manufacturer Identifier or WMI — tell you where the vehicle was built and what broad class it belongs to. Toyota uses different WMIs for different plants and product lines, and once you learn the patterns you can read a Toyota VIN at a glance.",
  decodeRows: [
    { code: "4T1", meaning: "Toyota Motor Manufacturing Kentucky (TMMK) passenger cars — most US-market Camrys and Avalons start here." },
    { code: "4T3", meaning: "TMMK or TMMI multi-purpose vehicles — many US-built Toyota SUVs and crossovers carry this WMI." },
    { code: "5TD", meaning: "Toyota Motor Manufacturing Indiana (TMMI) — historically the Sienna minivan and Sequoia full-size SUV." },
    { code: "5TF", meaning: "TMMI / TMMTX trucks — Tundra full-size pickups and many Tacoma units assembled in North America." },
    { code: "JTD", meaning: "Built in Japan, passenger car — many Priuses, Camrys, and Corollas imported from Toyota's Japanese plants." },
    { code: "JTE", meaning: "Built in Japan, multi-purpose vehicle — used for Japanese-built RAV4, 4Runner, and Land Cruiser shipments." },
    { code: "1NX", meaning: "NUMMI joint-venture plant in Fremont, California (legacy) — older Corollas built before the plant closed in 2010." },
    { code: "2T1", meaning: "Toyota Motor Manufacturing Canada (TMMC) in Cambridge, Ontario — Corolla and historically Matrix production." },
  ],
  decodeTail: "After the WMI, position 10 encodes the model year (for example, N = 2022, P = 2023, R = 2024, S = 2025, T = 2026) and position 11 narrows the exact assembly plant within Toyota's network. If a VIN starts with JTD but the seller swears the car is North-American built, the VIN disagrees — and the VIN is right.",
  h2Signs: "When You Should Run a Toyota VIN Lookup",
  signsIntro: "A Toyota VIN lookup is cheap insurance — actually free — for anyone making a decision about a specific Toyota. Six situations where it pays to lookup a Toyota VIN before you commit.",
  signs: [
    { title: "Before you buy a used Toyota private-party", body: "The seller's word is not the title record. Run a Toyota VIN number lookup before you hand over a deposit, and you'll see brands, salvage flags, and open Toyota recalls the seller may not even know about — including unresolved Takata airbag actions." },
    { title: "Shopping a Toyota or independent dealer lot", body: "Even franchise Toyota lots inherit cars from auctions. A quick Toyota VIN check tells you whether the trade-in came with a flood brand, an accident history, or unresolved recalls before you sit down to negotiate." },
    { title: "Decoding an unfamiliar Toyota trim", body: "Need to know if that used RAV4 is the LE, the XLE, the Adventure, or the TRD Off-Road? The VIN decoder portion of your lookup returns factory-installed equipment so you're comparing apples to apples on Toyota trims." },
    { title: "Checking an inherited or gifted Toyota", body: "Inheriting or being gifted a Toyota? A free Toyota VIN lookup confirms the title status and surfaces any open recalls before you put your name on the registration." },
    { title: "Verifying a Toyota insurance quote", body: "Insurers price by VIN. Looking up the Toyota VIN yourself confirms the year, trim, and safety equipment they used — and catches mistakes that inflate your premium on a Camry, Highlander, or Tacoma." },
    { title: "Spotting a too-good-to-be-true Toyota deal", body: "A clean-looking Tacoma or Tundra listing priced well below market is the classic salvage-or-flood tell. Toyotas don't depreciate fast — if the price is off, a Toyota VIN # lookup is the fastest way to confirm or rule it out." },
  ],
  midCtaHeading: "Lookup This Specific Toyota VIN Right Now",
  midCtaSub: "You already have a Toyota in mind. Run the VIN against NMVTIS, the Toyota recall feed, and our decoder — free, in seconds. No sign-up.",
  h2Where: "Where to Find Your Toyota VIN Before You Lookup",
  where1Pre: "Most people get stuck before they even start a Toyota VIN lookup because they cannot find the VIN. Good news — every modern Toyota prints it in ",
  where1Bold: "at least four places",
  where1Suffix: ", and any one of them is enough to run a free Toyota VIN check.",
  where2: "The fastest spot is the lower corner of the windshield on the driver's side — look through the glass from outside the Toyota. The driver-side door jamb sticker is the second-easiest and is required by federal law on every Toyota sold in the US. The Toyota title document and the insurance ID card both print the VIN as well, and the state registration usually does too. On older trucks like the Tacoma and Tundra you may also find a stamped VIN on the frame rail.",
  where3: "If the VIN on the dashboard does not match the VIN on the Toyota title, stop. That mismatch is a strong signal that something is wrong with the vehicle's identity — a re-titled salvage Toyota, a clone, or worse. Exactly the kind of thing a Toyota VIN lookup is designed to catch.",
  whereCardTitle: "Five places the Toyota VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "Toyota title document",
    "Insurance ID card",
    "State registration document",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free Toyota VIN lookup against NMVTIS in seconds.",
  h2Danger: "Toyota-Specific Recalls and the Takata Airbag Situation",
  dangerIntro: "Toyota has issued some of the largest safety recall campaigns in automotive history, and many open recalls quietly travel with used Toyotas long after the original owner sold them. A Toyota VIN lookup is the single fastest way to surface them.",
  dangers: [
    { title: "Takata airbag inflators", body: "The Takata recall is the largest safety recall in US automotive history and it touched millions of Toyotas — Corolla, Camry, RAV4, Yaris, Matrix, Sienna, and Tundra across many model years. The defective inflator can rupture and propel metal fragments into the cabin. A Toyota VIN lookup tells you immediately if the airbag work is still open." },
    { title: "Fuel pump and engine actions", body: "2018-2020 Toyota and Lexus vehicles with low-pressure fuel pumps have been recalled for stalling risk. The Toyota recall feed also covers brake actuator software on certain hybrids, ABS sensor issues, and historic concerns around floor mat entrapment and unintended acceleration." },
    { title: "Frame and body recalls on trucks", body: "Early-2000s Tacoma and Tundra frame rust campaigns affected hundreds of thousands of trucks. Some are eligible for free frame replacement, others for buyback — but only if the VIN is still attached to an unresolved campaign. A Toyota VIN check surfaces the status." },
  ],
  dangerNoteBoldLead: "Buying a used Toyota?",
  dangerNoteMid1: " Pair this Toyota VIN lookup with a focused ",
  dangerNoteLink1: "accident history check",
  dangerNoteMid2: " and a ",
  dangerNoteLink2: "recall check",
  dangerNoteSuffix: " for a complete picture before you put money down.",
  h2Certified: "Toyota Certified Used Vehicle vs a Free VIN History Check",
  cert1Pre: "Toyota's Certified Used Vehicle (TCUV) program puts pre-owned Toyotas through a 160-point inspection and ships them with a 12-month / 12,000-mile comprehensive warranty plus a 7-year / 100,000-mile powertrain warranty from the original in-service date. It's a strong program — but TCUV cars carry a price premium of $1,500 to $3,000 over equivalent non-certified Toyotas, and the program ",
  cert1Bold: "does not replace a VIN-level history check",
  cert1Suffix: ". TCUV confirms the car's current mechanical condition; a Toyota VIN lookup confirms what has happened to it.",
  cert2Pre: "A free Toyota VIN lookup catches the things the dealer inspection isn't designed to surface: a flood brand from a state that re-titled the car clean, a prior salvage history, an open recall the previous owner ignored, or an odometer rollback. For a TCUV purchase, run the lookup as confirmation. For a non-certified used Toyota, run the lookup ",
  cert2Bold: "first",
  cert2Mid: ", and consider a full ",
  cert2Link1: "VIN history report",
  cert2Mid2: " plus an independent mechanic's inspection. If anything looks off, a ",
  cert2Link2: "salvage title check",
  cert2Suffix: " can confirm exactly which brand the state applied and when.",
  cert3: "Either way, double-check the VIN itself. Compare the VIN on the Toyota dashboard against the door jamb sticker, the title, and the insurance card. If even one digit is off across those sources, the Toyota may not be what the paperwork says it is.",
  certCardTitle: "Toyota pre-purchase VIN checklist",
  certChecklist: [
    "Confirm the VIN matches across dashboard, door jamb, and Toyota title",
    "Run a free Toyota VIN lookup for title brands and salvage records",
    "Check the Toyota recall feed for any open Takata, fuel pump, or frame actions",
    "Match the decoded trim to what the seller is advertising (LE vs XLE, SR5 vs TRD)",
    "Verify mileage on the lookup against the odometer reading",
    "Order a full history report if the lookup raises any flag",
  ],
  certCardCta: "Run the Toyota lookup first — paste the VIN here:",
  h2Internal: "Related Checks That Build On Your Toyota Lookup",
  internalIntro: "A Toyota VIN lookup is the entry point. These focused checks dig into specific records when something looks off — or when you want to be extra thorough before buying any used Toyota.",
  internalLinks: [
    { href: "/vin-check/toyota", label: "Toyota VIN Check", desc: "Full Toyota-specific history report with title brands, accidents, mileage, and recalls in one view." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down any 17-character VIN into year, make, model, trim, plant, and factory equipment." },
    { href: "/recall-check", label: "Recall Check", desc: "Look up any open Toyota safety recalls attached to a VIN through the NHTSA feed." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether a Toyota was branded flood or water-damaged in any state." },
    { href: "/odometer-check", label: "Odometer Check", desc: "Track mileage history and spot odometer rollbacks across the Toyota title chain." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if the Toyota VIN carries a salvage, junk, or non-repairable title brand." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims on the Toyota VIN." },
    { href: "/pricing", label: "Full History Pricing", desc: "Upgrade to a full Toyota history report when the free lookup raises a flag you want to confirm." },
  ],
  h2Faq: "Toyota VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions buyers ask most when they want to lookup a Toyota VIN for the first time.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Ready to Lookup a Toyota VIN?",
  ctaBottomSub: "Enter any 17-character Toyota VIN to run a free Toyota VIN lookup against NMVTIS sources, the NHTSA recall feed, and our decoder. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "How do I look up a Toyota VIN?", answer: "To look up a Toyota VIN, find the 17-character Vehicle Identification Number on the lower driver-side corner of the windshield, the driver-side door jamb sticker, the Toyota title document, or the insurance card. Enter it into the free Toyota VIN lookup form on this page. The tool first validates that the string is exactly 17 characters and excludes the disallowed letters I, O, and Q, then queries the VIN decoder for factory specifications, NMVTIS for title brand and salvage history, and the NHTSA recall feed for any open Toyota safety recalls. The full result returns in seconds with no account, credit card, or sign-up required." },
  { question: "What does a Toyota VIN tell me?", answer: "A Toyota VIN encodes the country and plant of manufacture (positions 1-3), the broad vehicle attributes including model line, body style, and restraint system (positions 4-8), a check digit (position 9), the model year (position 10), the specific Toyota assembly plant (position 11), and the unique production sequence number (positions 12-17). Decoded, that tells you the year, model, trim, body style, engine, transmission, drivetrain, and factory-installed equipment. A full Toyota VIN lookup adds the title brand history from NMVTIS, the state-by-state title trail, any salvage or total-loss records, and any open safety recalls published by Toyota and NHTSA." },
  { question: "Is the Toyota VIN lookup free?", answer: "Yes. Our Toyota VIN lookup is free, with no sign-up, no credit card, and no hidden charges. You enter the 17-character Toyota VIN and we return the decoded factory specs, the title-brand summary, and any open Toyota recalls right away. Free Toyota VIN lookups are possible because NMVTIS data and NHTSA recall data are accessible through approved providers — we surface the consumer-relevant fields without putting a paywall in front of basic safety information. A paid full history report is available if you need every line item and every date, but the free Toyota VIN lookup is enough for most pre-purchase decisions." },
  { question: "Where is the VIN on a Toyota?", answer: "Every Toyota built since 1981 prints the VIN in at least four places. The easiest is the lower corner of the windshield on the driver's side — look through the glass from outside the vehicle. The second is the driver-side door jamb sticker, which is required on every Toyota sold in the US by federal law and also lists the manufacture date and tire pressures. The Toyota title document and the insurance ID card both print the VIN, and the state registration usually does too. On older Tacoma and Tundra pickups, the VIN is also stamped on the frame rail. If any of those sources disagree, do not buy the Toyota until you reconcile the mismatch." },
  { question: "How do I check Toyota recalls?", answer: "Run the Toyota VIN through our free Toyota VIN lookup form on this page and it will surface any open safety recalls attached to the VIN through the live NHTSA recall feed. Recalls remain attached to the VIN until the work is completed at an authorized Toyota dealer, even if the car has been sold one or more times. Common open recalls on used Toyotas include the Takata airbag inflator campaign across Corolla, Camry, RAV4, Yaris, Matrix, Sienna, and Tundra; the 2018-2020 low-pressure fuel pump action across multiple Toyota and Lexus models; brake actuator software on certain hybrids; and the early-2000s Tacoma and Tundra frame rust campaigns. Repairs for open recalls are always free at any authorized Toyota dealer." },
  { question: "Does Toyota offer a free VIN lookup?", answer: "Toyota's own owners.toyota.com portal lets you look up open recalls for a Toyota VIN and view service history if the previous owner serviced the vehicle at a Toyota dealer. However, the Toyota portal does not show NMVTIS-sourced title brand history, salvage records, total-loss claims, or accident records from independent sources. A free Toyota VIN lookup like the one on this page combines the Toyota recall data with NMVTIS title and brand records to give you a more complete picture in a single search. For the most thorough view before buying a used Toyota, use both — Toyota's own portal for service history and ours for title history and cross-source recalls." },
  { question: "How do I check if my Toyota was in an accident?", answer: "A Toyota VIN lookup surfaces accident-related events that were reported to insurers, NMVTIS, or salvage operators. Look specifically for total-loss claims, salvage and junk title brands, and rebuilt brands in the title history — those are strong indicators that the Toyota was in a significant accident. For more granular collision data including police-reported accidents and damage estimates, run a dedicated accident history check on the Toyota VIN. Keep in mind that minor body work paid out of pocket may never appear in any database, which is why a Toyota VIN lookup should always be paired with a hands-on inspection by a trusted mechanic before any significant used-Toyota purchase." },
];

export default function ToyotaVinLookupBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Hash className="w-4 h-4" /> {c.badge}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Title}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.titleIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.title1Pre}
                <strong className="text-on-surface">{c.title1Bold1}</strong>
                {c.title1Mid}
                <strong className="text-on-surface">{c.title1Bold2}</strong>
                {c.title1Mid2}
                <strong className="text-on-surface">{c.title1Bold3}</strong>
                {c.title1Suffix}
              </p>
              <p>
                {c.title2Pre}
                <strong className="text-on-surface">{c.title2Bold}</strong>
                {c.title2Suffix}
              </p>
              <p>{c.title3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.pathCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.pathRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.pathCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Decode}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.decodeIntro}</p>
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
            <ul className="space-y-2.5 text-sm text-on-surface">
              {c.decodeRows.map((r) => (
                <li key={r.code} className="flex items-start gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                  <code className="font-mono font-black text-primary text-base flex-shrink-0 w-12">{r.code}</code>
                  <span className="text-on-surface-variant text-xs sm:text-sm leading-relaxed">{r.meaning}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-3xl">{c.decodeTail}</p>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Signs}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.signsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.signs.map((s, i) => {
              const Icon = SIGN_ICONS[i];
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
                {c.whereList.map((state) => (
                  <li key={state} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{state}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.whereCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Danger}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.dangerIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.dangers.map((item, i) => {
              const Icon = DANGER_ICONS[i];
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
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.dangerNoteBoldLead}</strong>
                {c.dangerNoteMid1}
                <Link href="/accident-history-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink1}</Link>
                {c.dangerNoteMid2}
                <Link href="/recall-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink2}</Link>
                {c.dangerNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Certified}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.cert1Pre}
                <strong className="text-on-surface">{c.cert1Bold}</strong>
                {c.cert1Suffix}
              </p>
              <p>
                {c.cert2Pre}
                <strong className="text-on-surface">{c.cert2Bold}</strong>
                {c.cert2Mid}
                <Link href="/vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.cert2Link1}</Link>
                {c.cert2Mid2}
                <Link href="/salvage-title-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.cert2Link2}</Link>
                {c.cert2Suffix}
              </p>
              <p>{c.cert3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.certCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.certChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.certCardCta}</p>
                <VinSearchForm size="sm" />
              </div>
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

        <RelatedChecks exclude="/toyota-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
