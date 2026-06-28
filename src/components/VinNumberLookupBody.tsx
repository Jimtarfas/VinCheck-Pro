/**
 * Body for /vin-number-lookup — English-only hub page targeting the
 * "vin number lookup" keyword cluster (~130K US monthly searches).
 * Mirrors the visual structure of FloodCheckBody but flattens COPY (no locales).
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
  crumb: "VIN Number Lookup",
  badge: "Free VIN Number Lookup   ·   Instant Results   ·   NMVTIS-Sourced",
  h1Lead: "VIN Number Lookup — ",
  h1Accent: "Free, Instant, and Built for Real Car Buyers.",
  intro: "Every vehicle on the road carries a 17-character fingerprint. A VIN number lookup turns that string of letters and digits into a complete picture of a car — its factory specs, its title history, its recalls, and any damage it has carried along the way. Enter a VIN below and we'll run a free VIN lookup against NMVTIS sources, state DMV records, and salvage auctions in seconds. No sign-up, no card, no catch.",
  formHeading: "Free VIN Number Lookup — Search Any 17-Character VIN",
  formSub: "Enter the VIN and we'll surface title brands, recalls, salvage records, and decoded factory specs — instantly.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Database, value: "50-state", label: "NMVTIS sources" },
    { icon: Car, value: "Decoded", label: "factory specs" },
    { icon: Shield, value: "Title brand", label: "& salvage records" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a VIN Number Lookup Works",
  howIntro: "A VIN lookup is simple from your side of the screen. Behind it, the tool reaches into the same national databases insurers and dealers use, then returns the result in plain English. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the VIN", body: "Type or paste the 17-character VIN from the dashboard, the driver-side door jamb sticker, the title, or the insurance card. Our VIN lookup tool validates that it is exactly 17 characters and excludes the disallowed letters I, O, and Q before it runs." },
    { tag: "Step 2", title: "We query the record", body: "Your VIN vehicle lookup hits NMVTIS — the federal aggregator that pulls from all 50 state DMVs, insurers, junk yards, and salvage auctions — plus the manufacturer's recall feed and our own decoded-specs index. The whole car VIN number lookup runs in seconds." },
    { tag: "Step 3", title: "Read the result", body: "You'll see the decoded year, make, model, trim, and engine alongside title brands, open recalls, and any salvage or total-loss flags. Use it to negotiate the price, walk away, or buy with confidence." },
  ],
  h2Title: "What a Free VIN Lookup Actually Shows You",
  titleIntro: "A free auto VIN lookup is more than a parlor trick. It is the same VIN-keyed data the industry uses, presented for a buyer rather than a back-office system. Here is what comes back when you lookup a VIN with us.",
  title1Pre: "First, the decoder reads the VIN itself. The first three characters identify the ",
  title1Bold1: "world manufacturer",
  title1Mid: ", the next six describe the vehicle attributes, the tenth digit encodes the ",
  title1Bold2: "model year",
  title1Mid2: ", and the final eight form the ",
  title1Bold3: "unique serial",
  title1Suffix: ". From those alone we return the year, make, model, body style, engine, transmission, drivetrain, and factory equipment.",
  title2Pre: "Second, your VIN # lookup queries the ",
  title2Bold: "title and brand history",
  title2Suffix: ". That is where flood, salvage, junk, rebuilt, lemon-law, and odometer-rollback brands surface, alongside the chain of states the title has passed through. If a title was washed across state lines, NMVTIS is what keeps the original brand visible.",
  title3: "Third, the lookup checks the open-recall feed published by the manufacturer and NHTSA. Open safety recalls stay attached to the VIN until the work is completed at a dealer — and many used cars carry recalls the previous owner never resolved.",
  pathCardTitle: "What you get from one VIN",
  pathRows: [
    { label: "Decoded specs", value: "Year · Make · Trim" },
    { label: "Title history", value: "Brands · States" },
    { label: "Safety recalls", value: "Open · Resolved" },
  ],
  pathCardNote: "One 17-character VIN, three layers of insight. The whole VIN lookup tool runs in seconds and never asks for an account.",
  h2Signs: "When You Should Run a VIN Lookup",
  signsIntro: "A VIN number lookup is cheap insurance — actually free — for anyone making a decision about a specific car. Six situations where it pays to lookup a car VIN number before you commit.",
  signs: [
    { title: "Before you buy private-party", body: "The seller's word is not the title record. Run a car VIN number lookup before you hand over a deposit, and you'll see brands, salvage flags, and recalls the seller may not even know about." },
    { title: "Shopping a dealer lot", body: "Even franchise lots inherit cars from auctions. A quick VIN vehicle lookup tells you whether the trade-in came with a flood brand, an accident history, or unresolved factory recalls before you sit down to negotiate." },
    { title: "Decoding an unfamiliar trim", body: "Need to know if that used SUV is the base, the mid, or the top trim? The VIN decoder portion of your lookup returns factory-installed equipment so you're comparing apples to apples." },
    { title: "Checking an inherited car", body: "Inheriting or being gifted a vehicle? A free VIN lookup confirms the title status and surfaces open recalls before you put your name on the registration." },
    { title: "Verifying an insurance quote", body: "Insurers price by VIN. Looking up the VIN yourself confirms the year, trim, and safety equipment they used — and catches mistakes that inflate your premium." },
    { title: "Spotting a too-good-to-be-true deal", body: "A clean-looking listing priced well below market is the classic salvage-or-flood tell. A VIN # lookup is the fastest way to confirm or rule it out." },
  ],
  midCtaHeading: "Lookup This Specific VIN Right Now",
  midCtaSub: "You already have a car in mind. Run the VIN against NMVTIS, the recall feed, and our decoder — free, in seconds. No sign-up.",
  h2Chain: "How VIN Records Reach Your Lookup",
  chainIntro: "A VIN number lookup is only as good as the data behind it. Here is how a car's life flows into the VIN-linked record you see when you lookup the VIN today.",
  chain: [
    "Manufacturers stamp the VIN at the factory and register it with NHTSA, seeding the decoded specs and the recall feed.",
    "State DMVs add a record every time the title is issued, transferred, or branded — flood, salvage, rebuilt, lemon, and more.",
    "Insurers report total-loss claims and salvage-pool sales to NMVTIS, the federal aggregator that all 50 states feed.",
    "Salvage auction houses like Copart and IAA register the vehicles they receive, creating a public auction record per VIN.",
  ],
  chainBoldLead: "The system is layered for a reason.",
  chainNoteRest: " No single source catches everything — but when a free car VIN lookup queries NMVTIS, the DMV trail, the insurer reports, and the salvage auctions in parallel, the cumulative picture is hard to fool. That is what separates a real VIN lookup tool from a brochure-grade decoder.",
  h2States: "How to Find the VIN Before You Lookup",
  states1Pre: "Most people get stuck before they even start a VIN lookup because they cannot find the VIN. Good news — every modern car prints it in ",
  states1Bold: "at least four places",
  states1Suffix: ", and any one of them is enough to run a free VIN check.",
  states2: "The fastest spot is the lower corner of the windshield on the driver's side — look through the glass from outside. The driver-side door jamb sticker is the second-easiest and is required by federal law. The title document and the insurance card both print the VIN as well, and the registration usually does too.",
  states3: "If the VIN on the dashboard does not match the VIN on the title, stop. That mismatch is a strong signal that something is wrong with the car's identity — exactly the kind of thing a VIN number lookup is designed to catch.",
  statesCardTitle: "Five places the VIN lives",
  statesList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "Vehicle title document",
    "Insurance ID card",
    "State registration document",
  ],
  statesCardNote: "Found it? Drop it into the form above and run a free car VIN lookup against NMVTIS in seconds.",
  h2Danger: "Why a Free VIN Lookup Beats a Cheap Substitute",
  dangerIntro: "There are plenty of sites that promise a free VIN check and deliver only a partial decode. The difference shows up the moment you ask the data to do real work — like spotting a hidden flood title or a stale safety recall.",
  dangers: [
    { title: "Single-source decoders miss brands", body: "A VIN decoder that only reads the 17 characters can tell you the year, make, and trim — but it cannot tell you the car was branded a flood loss in Texas and re-titled clean in Tennessee. A real VIN lookup hits the title trail too." },
    { title: "Recall feeds need refreshing", body: "Recalls are added and resolved continuously. A free VIN lookup that pulls the live NHTSA feed surfaces issues a six-month-old report would miss — and matters a lot for safety items like airbags and brakes." },
    { title: "Multi-source lookups expose washing", body: "Title washing across state lines is the oldest trick in the used-car book. Our lookup is multi-sourced through NMVTIS specifically so a washed title still shows the original brand from the state that issued it." },
  ],
  dangerNoteBoldLead: "Buying used?",
  dangerNoteMid1: " Pair this VIN number lookup with a focused ",
  dangerNoteLink1: "accident history check",
  dangerNoteMid2: " and a ",
  dangerNoteLink2: "recall check",
  dangerNoteSuffix: " for a complete picture before you put money down.",
  h2Inspect: "Best Practices Before You Trust a VIN Lookup Result",
  inspect1Pre: "A car VIN number lookup is the strongest first step in any used-car purchase, but it works best when you treat the result as a ",
  inspect1Bold: "starting point",
  inspect1Suffix: ", not the final word. A few inspection habits turn a good lookup into an airtight decision.",
  inspect2Pre: "Always pair the lookup with a hands-on inspection, and consider ordering a full ",
  inspect2Link1: "VIN history report",
  inspect2Mid: " for high-stakes purchases. If the lookup shows any title brand, a ",
  inspect2Link2: "salvage title check",
  inspect2Suffix: " can confirm exactly which brand the state applied and when.",
  inspect3: "Finally, double-check the VIN itself. Compare the VIN on the dashboard against the door jamb sticker, the title, and the insurance card. If even one digit is off across those sources, the car may not be what the paperwork says it is.",
  inspectCardTitle: "VIN lookup pre-purchase checklist",
  inspectChecklist: [
    "Confirm the VIN matches across dashboard, door jamb, and title",
    "Run a free VIN lookup for title brands and salvage records",
    "Check the recall feed for any open safety issues",
    "Match the decoded trim to what the seller is advertising",
    "Verify mileage on the lookup against the odometer reading",
    "Order a full history report if the lookup raises any flag",
  ],
  inspectCardCta: "Run the lookup first — paste the VIN here:",
  h2Internal: "Related VIN Checks That Build On Your Lookup",
  internalIntro: "A VIN lookup is the entry point. These focused checks dig into specific records when something looks off — or when you want to be extra thorough.",
  internalLinks: [
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down the 17-character VIN into year, make, model, trim, and factory equipment." },
    { href: "/vin-check", label: "Full VIN Check", desc: "Complete history report including title brands, accidents, odometer, and recalls in one place." },
    { href: "/recall-check", label: "Recall Check", desc: "Look up any open safety recalls attached to a VIN through the NHTSA feed." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether a vehicle was branded flood or water-damaged in any state." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if the VIN carries a salvage, junk, or non-repairable title brand." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims by VIN." },
    { href: "/odometer-check", label: "Odometer Check", desc: "Track mileage history and spot odometer rollbacks across the title chain." },
    { href: "/license-plate-lookup", label: "License Plate Lookup", desc: "Start from a plate when you do not have the VIN yet — we'll find it for you." },
  ],
  h2Faq: "VIN Number Lookup — Frequently Asked Questions",
  faqIntro: "The questions buyers ask most when they want to lookup a VIN number for the first time.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Ready to Lookup a VIN Number?",
  ctaBottomSub: "Enter any 17-character VIN to run a free car VIN lookup against NMVTIS sources, the national recall feed, and our decoder. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "What is a VIN number lookup?", answer: "A VIN number lookup is a search keyed to a vehicle's 17-character Vehicle Identification Number. It returns the car's decoded factory specifications — year, make, model, trim, engine, and equipment — alongside its title history, any brand records like flood or salvage, and any open safety recalls. A free VIN lookup like the one on this page pulls from NMVTIS, state DMV records, manufacturer recall feeds, and salvage auction databases, giving you a comprehensive picture of a specific car in a few seconds." },
  { question: "Is a VIN lookup really free?", answer: "Yes. Our basic VIN number lookup is free, with no sign-up, no credit card, and no hidden charges. You enter the 17-character VIN and we return the decoded specs, the title-brand summary, and any open recalls right away. Free VIN lookups are made possible because NMVTIS data and NHTSA recall data are accessible through approved providers — we surface the consumer-relevant fields without putting a paywall in front of basic safety information. A paid full history report is available if you need every line item and every date, but the free auto VIN lookup is sufficient for most pre-purchase decisions." },
  { question: "How does a VIN lookup work?", answer: "When you enter a VIN, the lookup tool first validates that the string is exactly 17 characters and excludes the disallowed letters I, O, and Q. It then queries the VIN decoder against the manufacturer's known VIN patterns to return the year, make, model, and trim. Simultaneously, it queries NMVTIS — the federal aggregator that pulls from all 50 state DMVs, insurers, and salvage auctions — for any title brands or salvage records, and queries the NHTSA recall feed for any open safety recalls. The combined result is rendered as a single, readable report." },
  { question: "What information does a VIN lookup show?", answer: "A standard VIN number lookup returns three layers of information. First, decoded factory specifications: model year, make, model, trim, body style, engine, transmission, drivetrain, and factory-installed equipment. Second, the title history: the states the title has passed through and any title brands such as flood, salvage, rebuilt, junk, lemon-law buyback, or odometer rollback. Third, the recall status: any open safety recalls published by NHTSA or the manufacturer that have not yet been resolved at a dealer. Some lookups also include mileage history and accident summaries." },
  { question: "Can I look up any VIN?", answer: "You can run a VIN number lookup on any 17-character VIN issued for a model-year 1981 or newer vehicle sold in the United States. Vehicles built before 1981 used shorter, non-standardized VINs and may not return complete results. Heavy commercial trucks, motorcycles, RVs, and trailers issued a 17-character VIN are generally supported, though the depth of the title and recall data can vary. Lookups for vehicles built abroad and never imported to the US may return decoded specs but limited US title history because they were never registered with a US DMV." },
  { question: "What is the difference between a VIN lookup and a VIN decoder?", answer: "A VIN decoder reads the 17 characters of the VIN itself and returns the factory specifications the manufacturer encoded into the string — year, make, model, trim, engine, plant of manufacture, and so on. A VIN lookup is broader: it includes the decoder output but also queries external databases — NMVTIS, state DMVs, the NHTSA recall feed, and salvage auctions — to add the car's lived history. Put simply, the decoder tells you what the car was built to be, and the lookup tells you what has happened to the car since it left the factory." },
  { question: "How accurate is a free VIN lookup?", answer: "A free VIN number lookup that draws from NMVTIS and the live NHTSA recall feed is highly accurate for the data those systems hold — federal law requires states, insurers, and salvage operators to report to NMVTIS, and recall data is published directly by the manufacturers. That said, no lookup catches absolutely everything. A flood car that was never insured or claimed will not show a flood brand because no one ever reported it. An accident repaired out-of-pocket by the previous owner may not appear. That is why a free VIN lookup is a strong first step, but a hands-on inspection by a trusted mechanic remains valuable before any significant used-car purchase." },
];

export default function VinNumberLookupBody() {
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Chain}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.chainIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.chain.map((item, i) => (
              <div key={i} className="flex gap-3 items-start rounded-2xl border border-outline-variant bg-surface p-5">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.chainBoldLead}</strong>
                {c.chainNoteRest}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2States}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.states1Pre}
                <strong className="text-on-surface">{c.states1Bold}</strong>
                {c.states1Suffix}
              </p>
              <p>{c.states2}</p>
              <p>{c.states3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.statesCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.statesList.map((state) => (
                  <li key={state} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{state}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.statesCardNote}</p>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Inspect}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.inspect1Pre}
                <strong className="text-on-surface">{c.inspect1Bold}</strong>
                {c.inspect1Suffix}
              </p>
              <p>
                {c.inspect2Pre}
                <Link href="/vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.inspect2Link1}</Link>
                {c.inspect2Mid}
                <Link href="/salvage-title-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.inspect2Link2}</Link>
                {c.inspect2Suffix}
              </p>
              <p>{c.inspect3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.inspectCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.inspectChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.inspectCardCta}</p>
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

        <RelatedChecks exclude="/vin-number-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
