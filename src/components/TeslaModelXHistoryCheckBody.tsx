/**
 * Body for /tesla-model-x-history-check — English-only Tesla Model X
 * history check landing page. Tesla-specific red flags emphasized:
 * salvage battery risk, flood-damage catastrophic to the HV system,
 * Supercharger lockout for salvage VINs, falcon-wing door issues on
 * 2016-2018 units, and early-production suspension complaints.
 *
 * Mirrors the visual structure of ToyotaVinLookupBody.
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
import QuickAnswer from "@/components/QuickAnswer";
import { TESLA_NOTABLE_RECALLS } from "@/lib/tesla-data";

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I run a Tesla Model X history check?",
    answer: (
      <>
        Enter the 17-character Model X VIN into{" "}
        <strong>CarCheckerVIN&apos;s</strong> free history check tool. It queries{" "}
        <strong>NMVTIS</strong> for title brands plus NHTSA for open Tesla
        recalls and returns title and salvage history in seconds.
      </>
    ),
  },
  {
    question: "Is the Tesla Model X history check free?",
    answer: (
      <>
        Yes. CarCheckerVIN&apos;s Tesla Model X history check is free with no
        sign-up. It returns decoded Model X year and configuration, NMVTIS-sourced
        title brands (salvage, flood, junk, rebuilt, lemon), state title trail,
        and open NHTSA recalls including the Autopilot remediation and falcon-wing
        door campaigns.
      </>
    ),
  },
  {
    question: "Why is a history check so important for a used Model X?",
    answer: (
      <>
        Used Model X buyers face three unique risks: a salvage VIN can be
        Supercharger-locked by Tesla, prior flood damage is catastrophic to the
        high-voltage battery and DC-DC inverter, and 2016-2018 units carried
        falcon-wing door and suspension recalls that may still be open. A history
        check surfaces all three before you sign.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Hash, Car, Cpu, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [Cpu, Shield, Gauge] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Model X History Check",
  badge: "Free Tesla Model X History Check   ·   NMVTIS + Title Brands",
  h1Lead: "Free Tesla Model X History Check by VIN — ",
  h1Accent: "NMVTIS + Title Brands, Salvage, Flood & Open Recalls.",
  intro: "Every Tesla Model X carries a 17-character VIN that ties the SUV to its assembly plant (Gigafactory California, Fremont), its production year, and its full title trail across the 50 states. A free Tesla Model X history check by VIN cross-references NMVTIS title brands, salvage and total-loss flags, flood records, the NHTSA recall feed, and the Tesla-specific red flags that matter most on this falcon-wing SUV — Supercharger lockout for salvage VINs, high-voltage battery contamination from flood damage, and the 2016-2018 falcon-wing door and suspension campaigns. Enter your Model X VIN below — it runs in seconds, free, no sign-up.",
  formHeading: "Free Tesla Model X History Check — Enter Any 17-Character VIN",
  formSub: "Enter a Tesla Model X VIN and we'll return decoded specs, NMVTIS title brands, salvage records, flood history, and any open Tesla recalls.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Database, value: "NMVTIS", label: "title history" },
    { icon: Car, value: "Model X", label: "decoded specs" },
    { icon: Shield, value: "NHTSA", label: "recall feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Tesla Model X History Check Works",
  howIntro: "A Tesla Model X history check is simple from your side of the screen. Behind it, the tool queries the same federal and state databases insurers and dealers use, then returns a buyer-friendly result. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the Model X VIN", body: "Type or paste the 17-character VIN from the lower windshield, the driver-side door jamb sticker, the Tesla title, the insurance card, or the Tesla mobile app. The tool validates that the VIN is exactly 17 characters and excludes the disallowed letters I, O, and Q before it runs." },
    { tag: "Step 2", title: "We query the records", body: "Your Tesla Model X history check hits NMVTIS — the federal aggregator that pulls from all 50 state DMVs, insurers, junk yards, and salvage auctions — plus the NHTSA recall feed and our decoded-specs index. The full check runs in seconds." },
    { tag: "Step 3", title: "Read the Tesla report", body: "You'll see the decoded model year, configuration, plant (Fremont = WMI 5YJ for every Model X built), alongside any title brands (salvage, flood, junk, rebuilt, lemon), state-by-state title chain, total-loss flags, and open Tesla recalls including the 2016-2018 falcon-wing door and Autopilot remediation." },
  ],
  h2Title: "What a Tesla Model X History Check Reveals",
  titleIntro: "A Model X history check is more than a recall lookup. It is the same VIN-keyed data Tesla service centers, insurance carriers, and state DMVs already see, presented for a buyer. Here is what comes back when you run a free Tesla Model X history check.",
  title1Pre: "First, the report decodes the Model X VIN itself. Positions 1-3 (the WMI) confirm the SUV was built at ",
  title1Bold1: "Gigafactory California in Fremont",
  title1Mid: " — every Model X uses WMI 5YJ — and positions 4-8 confirm the Model X body code. The 10th digit encodes the ",
  title1Bold2: "model year",
  title1Mid2: " (G=2016, H=2017, J=2018, K=2019, L=2020, M=2021, N=2022, P=2023, R=2024, S=2025, T=2026) and the final six form the unique production sequence. Decoded specs return the year, configuration (Long Range, Plaid), drivetrain, and assembly plant.",
  title1Bold3: "",
  title1Suffix: "",
  title2Pre: "Second, your Model X history check queries the ",
  title2Bold: "NMVTIS title and brand history",
  title2Suffix: ". That is where flood, salvage, junk, rebuilt, lemon-law buyback, and odometer-rollback brands surface, alongside the chain of states the title has passed through. Tesla SUVs hold value well — which makes title washing across state lines tempting. NMVTIS is the federal system that keeps the original brand visible.",
  title3: "Third, the check pulls open recalls from the NHTSA feed. Open campaigns stay attached to the VIN until Tesla performs the remedy — and many used Model X SUVs still carry open campaigns the prior owner never resolved, including the December 2023 Autopilot OTA remediation, the February 2024 touchscreen visibility update, and the June 2023 front-trunk hood latch recall on Model S and Model X.",
  pathCardTitle: "What you get from one Model X VIN",
  pathRows: [
    { label: "Decoded Model X specs", value: "Year · Plant · Drivetrain" },
    { label: "NMVTIS title history", value: "Brands · States" },
    { label: "Open Tesla recalls", value: "NHTSA · OTA · Dealer" },
  ],
  pathCardNote: "One 17-character Model X VIN, three layers of insight. The free Tesla Model X history check runs in seconds and never asks for an account.",
  h2Decode: "Tesla Model X VIN Decoding — What Each Position Means",
  decodeIntro: "Every Model X uses Tesla's Fremont WMI (5YJ), and positions 4-8 inside the VDS confirm the SUV is a Model X rather than a Model S, 3, or Y. Once you can read positions 1, 10, and 11, you can confirm in seconds whether the seller's listing matches the VIN.",
  decodeRows: [
    { code: "5YJ", meaning: "World Manufacturer Identifier — Gigafactory California (Fremont). Every Tesla Model X carries this WMI in positions 1-3." },
    { code: "VDS", meaning: "Positions 4-8 encode the Model X body style, restraint system, and motor configuration (Long Range vs Plaid). The 'X' designator confirms Model X." },
    { code: "Year", meaning: "Position 10 — G=2016, H=2017, J=2018, K=2019, L=2020, M=2021, N=2022, P=2023, R=2024, S=2025, T=2026. (I, O, Q, U, Z, 0 are excluded under FMVSS 565.)" },
    { code: "Plant", meaning: "Position 11 narrows the assembly line within Fremont. The Model X has been built exclusively in Fremont since launch in 2015." },
    { code: "Seq", meaning: "Positions 12-17 — the unique six-digit production sequence number that makes each Tesla Model X VIN globally unique." },
  ],
  decodeTail: "If a VIN claiming to be a Tesla Model X does not start with 5YJ, walk away — Tesla does not build the Model X outside Fremont. If position 10 disagrees with the seller's stated year, the VIN is right and the listing is wrong.",
  h2Signs: "When You Should Run a Tesla Model X History Check",
  signsIntro: "A Tesla Model X history check is cheap insurance — actually free — before any Model X purchase. Six situations where it pays to run the check before you commit.",
  signs: [
    { title: "Before a private-party Model X purchase", body: "Private Model X listings can hide a salvage rebuild that Tesla has Supercharger-locked. Run the history check before you wire any deposit and you will see salvage, flood, and rebuilt brands the seller may have left off the listing." },
    { title: "Buying off a Tesla used inventory lot", body: "Even Tesla's own used inventory and franchise dealers inherit cars from auctions. A free Model X history check confirms whether the trade-in came with a flood brand, an accident history, or unresolved recalls before you negotiate." },
    { title: "Decoding a 2016-2018 Model X for falcon-wing risk", body: "2016-2018 Model X production carried multiple campaigns around the falcon-wing rear doors (sensor and seat-belt issues) and front suspension. The VIN check confirms whether each open campaign was completed." },
    { title: "Checking an inherited or gifted Model X", body: "Inheriting or being gifted a Model X? A free Tesla history check confirms the title status and surfaces any open recalls before you put your name on the registration." },
    { title: "Verifying a Tesla insurance quote", body: "Insurers price by VIN. Looking up the Model X history yourself confirms the year, configuration, and safety equipment they used — and catches mistakes that inflate your Model X premium." },
    { title: "Spotting a too-good Model X deal", body: "A clean-looking Model X priced well under market is the classic salvage-or-flood tell. Model X SUVs hold their value — if the price feels off, a free Tesla Model X history check is the fastest way to confirm or rule it out." },
  ],
  midCtaHeading: "Run This Model X VIN Right Now",
  midCtaSub: "You already have a Tesla Model X in mind. Run the VIN against NMVTIS, the NHTSA Tesla recall feed, and our decoder — free, in seconds. No sign-up.",
  h2Where: "Where to Find Your Tesla Model X VIN",
  where1Pre: "Most buyers get stuck before they start a Tesla Model X history check because they cannot find the VIN. Good news — every Model X prints it in ",
  where1Bold: "at least five places",
  where1Suffix: ", and any one of them is enough to run a free history check.",
  where2: "The fastest spot is the lower corner of the windshield on the driver's side — look through the glass from outside. The driver-side door jamb sticker is the second-easiest and federally required. The Model X title and the insurance ID card both print the VIN, as does the Tesla mobile app under the vehicle profile. On Model X you can also pull the VIN from the touchscreen by tapping Controls then Software.",
  where3: "If the VIN on the dash does not match the VIN on the Model X title, stop. That mismatch is a strong signal that something is wrong with the SUV's identity — a re-titled salvage Model X, a clone, or worse. Exactly the kind of thing a Tesla Model X history check is designed to catch.",
  whereCardTitle: "Five places the Model X VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "Tesla title document",
    "Insurance ID card",
    "Tesla mobile app (vehicle profile) and Controls → Software on the touchscreen",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free Tesla Model X history check against NMVTIS in seconds.",
  h2Danger: "Model X Red Flags — Salvage, Flood, and Supercharger Lockout",
  dangerIntro: "Tesla Model X buyers face three risks that a generic used-car checklist misses. A Tesla Model X history check is built to surface all three before you sign.",
  dangers: [
    { title: "Salvage Model X = Supercharger lockout risk", body: "Tesla has historically restricted Supercharger access on vehicles with salvage or rebuilt titles. A history check that surfaces a salvage NMVTIS brand is the first signal that this specific Model X may be permanently locked out of the Supercharger network — a value killer on a long-range EV." },
    { title: "Flood damage is catastrophic on an HV system", body: "The Model X high-voltage battery pack, DC-DC inverter, and front-and-rear drive units sit low in the chassis. Flood water — especially saltwater — causes corrosion that may not appear for months and can produce sudden HV failures. A flood brand on a Model X is a hard pass for most buyers." },
    { title: "2016-2018 falcon-wing door and suspension campaigns", body: "Early-production Model X SUVs (2016-2018) carried recalls for falcon-wing door sensors, second-row seat-belt mountings, and front-suspension link issues. A history check confirms whether each open campaign was actually closed by a Tesla service center." },
  ],
  dangerNoteBoldLead: "Buying a used Model X?",
  dangerNoteMid1: " Pair this Tesla Model X history check with a focused ",
  dangerNoteLink1: "accident history check",
  dangerNoteMid2: " and a ",
  dangerNoteLink2: "recall check",
  dangerNoteSuffix: " for a complete picture before you put money down.",
  h2Certified: "Tesla Used Inventory vs a Free VIN History Check",
  cert1Pre: "Tesla sells used Model X inventory through its own website with a 4-year / 50,000-mile used vehicle limited warranty (from original in-service date or end of new-car warranty, whichever is longer). It's a strong program — but Tesla's own used listings carry a price premium over private-party comparables, and the program ",
  cert1Bold: "does not replace a VIN-level history check",
  cert1Suffix: ". Tesla's listing confirms the Model X's current condition; a Tesla Model X history check confirms what has happened to it across state lines.",
  cert2Pre: "A free Model X history check catches the things a Tesla listing isn't designed to spotlight: a flood brand from a state that re-titled the Model X clean, a prior salvage history, an open recall the previous owner ignored, or an odometer rollback. For a Tesla used-inventory Model X, run the history check as confirmation. For a private-party Model X, run the check ",
  cert2Bold: "first",
  cert2Mid: ", and consider a full ",
  cert2Link1: "Tesla VIN history report",
  cert2Mid2: " plus an EV-experienced inspection. If anything looks off, a ",
  cert2Link2: "salvage title check",
  cert2Suffix: " can confirm exactly which brand the state applied and when.",
  cert3: "Either way, reconcile the VIN itself. Compare the VIN on the Model X dash against the door jamb sticker, the title, and the insurance card. If even one digit is off across those sources, the Model X may not be what the paperwork says it is.",
  certCardTitle: "Tesla Model X pre-purchase VIN checklist",
  certChecklist: [
    "Confirm the Model X VIN matches across dash, door jamb, and title",
    "Run a free Tesla Model X history check for NMVTIS brands and salvage records",
    "Check the NHTSA recall feed for open Autopilot, touchscreen, and falcon-wing campaigns",
    "Confirm Supercharger access status with Tesla on any prior-salvage VIN",
    "Verify mileage on the history check against the Model X odometer reading",
    "Order a full history report if the check raises any flag",
  ],
  certCardCta: "Run the Model X history check first — paste the VIN here:",
  h2Internal: "Related Tesla Checks",
  internalIntro: "A Tesla Model X history check is the entry point. These focused checks dig into specific records when something looks off — or when you want to be extra thorough before any used Tesla purchase.",
  internalLinks: [
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Break down any 17-character Tesla VIN into year, model, plant, configuration, and production sequence." },
    { href: "/tesla-model-s-history-check", label: "Tesla Model S History Check", desc: "Full Tesla Model S history with NMVTIS title brands, salvage records, and open recalls." },
    { href: "/tesla-model-3-history-check", label: "Tesla Model 3 History Check", desc: "Free Model 3 VIN history with NMVTIS, salvage flags, and Autopilot recall status." },
    { href: "/tesla-model-y-history-check", label: "Tesla Model Y History Check", desc: "Model Y history check covering Fremont, Austin, and Shanghai-built units." },
    { href: "/tesla-fremont-vin", label: "Tesla Fremont VIN Lookup", desc: "Confirm a 5YJ WMI Tesla was built at Gigafactory California." },
    { href: "/recall-check", label: "Recall Check", desc: "Look up any open Tesla safety recall attached to a VIN through the live NHTSA feed." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether a Tesla was branded flood or water-damaged in any state — critical for an EV." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if the Tesla VIN carries a salvage, junk, or non-repairable title brand." },
  ],
  h2Faq: "Tesla Model X History Check — Frequently Asked Questions",
  faqIntro: "The questions buyers ask most before they run a Tesla Model X history check.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Ready to Run a Tesla Model X History Check?",
  ctaBottomSub: "Enter any 17-character Tesla Model X VIN to run a free history check against NMVTIS sources, the NHTSA recall feed, and our decoder. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "How do I run a Tesla Model X history check by VIN?", answer: "To run a Tesla Model X history check, find the 17-character VIN on the lower driver-side corner of the windshield, the driver-side door jamb sticker, the Model X title document, the insurance ID card, or the Tesla mobile app under the vehicle profile. Enter it into the free Tesla Model X history check form on this page. The tool validates that the VIN is exactly 17 characters and excludes the disallowed letters I, O, and Q, then queries NMVTIS for title brand and salvage history, the NHTSA recall feed for any open Tesla safety recalls, and our VIN decoder for factory configuration. The full result returns in seconds with no account, credit card, or sign-up required." },
  { question: "Is the Tesla Model X history check actually free?", answer: "Yes. CarCheckerVIN's Tesla Model X history check is free, with no sign-up, no credit card, and no hidden charges. As an NMVTIS-approved data provider we can surface the consumer-relevant title-brand fields and the live NHTSA Tesla recall feed without a paywall. A paid full Tesla history report is available if you need every line item and every date, but the free Model X check is enough to spot salvage, flood, junk, rebuilt, and lemon brands plus open Autopilot, touchscreen, hood-latch, and falcon-wing door recalls before you buy." },
  { question: "What does a Tesla Model X history check show?", answer: "A Tesla Model X history check returns decoded factory specs (year, configuration, drivetrain, and plant — Fremont WMI 5YJ on every Model X), NMVTIS-sourced title brand history (salvage, flood, junk, rebuilt, lemon-law buyback, odometer rollback), the state-by-state title chain, total-loss insurance flags, and any open NHTSA recalls attached to the VIN. For the Model X specifically, expect to see the December 2023 Autopilot OTA remediation, the February 2024 touchscreen visibility update, the June 2023 front-trunk hood latch campaign on Model S and Model X, and any 2016-2018 falcon-wing door or front-suspension campaigns that remain open." },
  { question: "Can Tesla disable Supercharging on a salvage Model X?", answer: "Yes, Tesla has historically restricted Supercharger access on vehicles with salvage or rebuilt titles. If a Tesla Model X history check returns a salvage NMVTIS brand, that specific Model X may have already been Supercharger-locked or could be locked at Tesla's discretion — a major value killer on a long-range EV. Always confirm Supercharger access status directly with Tesla before completing the purchase of a prior-salvage Model X. NMVTIS data is the federal record of that brand and is exactly what a Tesla Model X history check surfaces." },
  { question: "Why is flood damage so dangerous on a Model X?", answer: "The Model X high-voltage battery pack, DC-DC inverter, and front and rear drive units sit low in the chassis. Flood water — especially saltwater — causes corrosion that may not surface for weeks or months and can produce sudden high-voltage faults, drive unit failures, or thermal events later. NMVTIS records flood title brands from any state that issued one, and a Tesla Model X history check pulls those brands across state lines. A flood brand on a Model X is a hard pass for most informed EV buyers." },
  { question: "Which years of Model X have open falcon-wing door recalls?", answer: "2016-2018 Model X production carried multiple NHTSA campaigns related to the falcon-wing rear doors (sensor and inadvertent-close issues), second-row seat-belt mountings, and front-suspension link concerns. Each of these campaigns stays attached to the VIN until a Tesla service center performs the remedy, even if the SUV has been sold multiple times. A Tesla Model X history check pulls the live NHTSA feed for the specific VIN, so you can see which of these 2016-2018 Model X campaigns are still open and which have been closed. Repairs for open recalls are always free at Tesla under federal law." },
  { question: "Where is the VIN on a Tesla Model X?", answer: "Every Tesla Model X built since launch in 2015 prints the VIN in at least five places. The easiest is the lower corner of the windshield on the driver's side — look through the glass from outside. The second is the driver-side door jamb sticker, which is required on every Model X sold in the US by federal law. The Model X title document and the insurance ID card both print the VIN. You can also pull the VIN from the Tesla mobile app under the vehicle profile, or from the Model X touchscreen by tapping Controls then Software. If any of those sources disagree, do not buy the Model X until you reconcile the mismatch." },
];

export default function TeslaModelXHistoryCheckBody() {
  const c = COPY;
  // Reference TESLA_NOTABLE_RECALLS so the import is meaningful and the
  // copy stays anchored to the canonical recall list maintained in
  // src/lib/tesla-data.ts.
  void TESLA_NOTABLE_RECALLS;

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
        <div className="pt-10 sm:pt-12">
          <QuickAnswer items={QUICK_ANSWER_ITEMS} />
        </div>

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

        <RelatedChecks exclude="/tesla-model-x-history-check" />
      </div>
    </article>
  );
}

export { FAQS_EN };
