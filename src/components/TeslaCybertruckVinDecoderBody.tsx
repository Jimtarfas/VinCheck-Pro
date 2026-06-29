/**
 * Body for /tesla-cybertruck-vin-decoder — English-only Cybertruck-specific
 * VIN decoder. Mirrors ToyotaVinLookupBody. Cybertruck is Austin-only
 * (7SAY WMI), first deliveries November 2023, stainless-steel body,
 * tri-motor top trim, accelerator pedal recall (24V-273) the famous one.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash,
  ClipboardCheck, AlertTriangle, MapPin, Cpu, Factory, Calendar, Car,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";
import { TESLA_WMI, TESLA_NOTABLE_RECALLS, VIN_YEAR_CODES, TESLA_VIN_RULES } from "@/lib/tesla-data";

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I decode a Tesla Cybertruck VIN?",
    answer: (
      <>
        <strong>CarCheckerVIN&apos;s</strong> free Tesla Cybertruck VIN decoder
        queries <strong>NMVTIS</strong>, NHTSA, and Tesla VIN-format records to
        return the Gigafactory (always Austin), model year, trim, and open
        recalls — including the famous accelerator-pedal action (24V-273) — from
        any 17-character Cybertruck VIN in seconds.
      </>
    ),
  },
  {
    question: "Where is the Tesla Cybertruck VIN located?",
    answer: (
      <>
        The Cybertruck VIN is printed at the lower driver-side corner of the
        windshield, on the driver-door jamb sticker, inside the MyTesla app
        under the Vehicle tab, and on the Tesla title document.
      </>
    ),
  },
  {
    question: "What WMI does the Tesla Cybertruck use?",
    answer: (
      <>
        All Cybertruck VINs start with <code>7SAY</code> — Gigafactory Texas
        (Austin, TX). The Cybertruck is produced exclusively at Austin since
        first deliveries in November 2023.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const REVEAL_ICONS = [Factory, Calendar, Car, Cpu, AlertTriangle, FileText] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Cybertruck VIN Decoder",
  badge: "Free Cybertruck VIN Decoder · Austin Gigafactory Production",
  h1Lead: "Tesla Cybertruck VIN Decoder — ",
  h1Accent: "Decode Any Cybertruck by Year, Trim & Recall Status.",
  intro:
    "CarCheckerVIN's free Cybertruck VIN decoder queries NMVTIS, NHTSA, and Tesla VIN-format records to decode any 17-character Tesla Cybertruck VIN by Gigafactory, build year, and trim. As an NMVTIS-approved data provider, CarCheckerVIN returns the same VIN decode logic Tesla service centers use, so you can confirm the Austin Gigafactory production (the Cybertruck is exclusively built at Gigafactory Texas with the 7SAY WMI), the model year (first deliveries shipped November 2023 — that's P-code 2023 and later), and the trim (Cyberbeast tri-motor on top, dual-motor AWD on the standard variant, and the planned single-motor RWD entry-level). The decoder also surfaces the famous April 2024 accelerator pedal recall (NHTSA campaign 24V-273) that affected approximately 3,900 Cybertrucks and required dealer-applied trim replacement. Enter a 17-character Cybertruck VIN below and the decode runs in seconds with no account.",
  formHeading: "Free Tesla Cybertruck VIN Decoder — Decode Any 17-Character VIN",
  formSub:
    "Enter a Cybertruck VIN to decode the build year, trim (Cyberbeast tri-motor or dual-motor AWD), drivetrain config, and surface any open NHTSA recall actions including 24V-273.",
  formNote: "Free · No sign-up · Instant decode",
  trustStats: [
    { icon: Database, value: "NMVTIS", label: "title history" },
    { icon: Factory, value: "Austin", label: "since Nov 2023" },
    { icon: Shield, value: "NHTSA", label: "recall feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How to Decode a Tesla Cybertruck VIN",
  howIntro:
    "Decoding a Cybertruck VIN is a three-step job. You provide the 17-character VIN; we read the WMI for the plant (always 7SAY Gigafactory Texas / Austin), position-10 for the year, the VDS for the trim and drivetrain, then query NMVTIS for title brands and NHTSA for any open recall campaigns including the April 2024 accelerator-pedal action.",
  howSteps: [
    {
      tag: "Step 1",
      title: "Enter the Cybertruck VIN",
      body:
        "Paste the 17-character VIN from the windshield, door jamb, MyTesla app, or title. The decoder validates that it is exactly 17 characters and excludes the letters I, O, and Q per FMVSS 565 before running.",
    },
    {
      tag: "Step 2",
      title: "We decode + query the records",
      body:
        "Your Cybertruck VIN decode reads the WMI (always 7SAY for Gigafactory Texas / Austin), the model-year character at position 10, the trim and drivetrain inside the VDS, then hits NMVTIS for title brands and the NHTSA recall feed for any open Cybertruck actions including the accelerator-pedal campaign 24V-273.",
    },
    {
      tag: "Step 3",
      title: "Read the Cybertruck decode",
      body:
        "You see the decoded build year (2023 forward), trim (Cyberbeast tri-motor or dual-motor AWD), drivetrain configuration, title-brand summary, and any open NHTSA recalls. Hardware actions like the accelerator-pedal trim replacement require a Tesla service-center visit; software actions deliver over-the-air.",
    },
  ],
  h2Reveals: "What a Tesla Cybertruck VIN Reveals",
  revealsIntro:
    "A Cybertruck VIN decode encodes plant, model year, trim, drivetrain, and ties to recall records the previous owner may never have resolved. The Cybertruck is still a young product — every VIN dates to late 2023 or later — so the year code matters less than the trim and the recall status.",
  reveals: [
    {
      title: "Gigafactory of origin",
      body:
        "The WMI is always 7SAY for Cybertruck — Gigafactory Texas (Austin), opened April 2022. Cybertruck is the sole product produced exclusively at Austin; Model Y also rolls off the Austin line but with different VDS encoding. No other Gigafactory builds Cybertruck.",
    },
    {
      title: "Model year (10th char)",
      body:
        "Position 10 encodes the model year per FMVSS 565: P=2023 (first deliveries November 2023), R=2024 (the main Cybertruck production year so far), S=2025, T=2026. The April 2024 accelerator-pedal recall (24V-273) affects approximately 3,900 early Cybertrucks — typically R-coded 2024 VINs.",
    },
    {
      title: "Trim & equipment",
      body:
        "The VDS (positions 4-8) encodes the trim line: Cyberbeast (tri-motor flagship), Dual Motor AWD (volume variant), and the planned Single Motor RWD entry variant. The stainless-steel body, 12-volt low-voltage system replaced by 48-volt, and steer-by-wire system are standard across all trims.",
    },
    {
      title: "Drivetrain config",
      body:
        "The decoder returns the drive configuration — tri-motor (Cyberbeast), dual-motor AWD, or single-motor RWD (planned). All Cybertruck variants share the same stainless-steel exoskeleton body, the steer-by-wire system, and the 48-volt low-voltage architecture.",
    },
    {
      title: "Open recall status",
      body:
        "The Cybertruck decode hits the NHTSA recall feed. The headline action is the April 2024 accelerator-pedal recall (campaign 24V-273) — the famous one — affecting approximately 3,900 Cybertrucks where the pedal cover trim could detach and become trapped in the trim, requiring dealer-applied trim replacement. The touchscreen-visibility OTA (24V-051) also applies to Cybertruck.",
    },
    {
      title: "Title brand history",
      body:
        "NMVTIS supplies the title-brand chain across all 50 state DMVs. Salvage, flood, junk, rebuilt, and lemon-law buyback brands surface here. The Cybertruck's young production history and stainless-steel body mean salvage rebuilds are rare so far — but verify, don't assume.",
    },
  ],
  h2Wmi: "Decoding the WMI for Tesla Cybertruck",
  wmiIntro:
    "Every Tesla Cybertruck ever produced carries the 7SAY WMI. Gigafactory Texas in Austin is the sole production plant; Tesla has never produced Cybertruck at any other Gigafactory.",
  wmiNote:
    "If a Cybertruck VIN starts with anything other than 7SAY, it is not a legitimate Cybertruck. That mismatch is a strong signal the vehicle's identity has been changed. Even if a re-VIN attempts to clone a Cybertruck, the stainless-steel body and 48-volt architecture are difficult to fake — pair the VIN decode with hands-on inspection.",
  h2YearTable: "Year Codes (10th Character) for Tesla Cybertruck",
  yearTableIntro:
    "Position 10 of the VIN encodes the model year per FMVSS 565. The Cybertruck launched with first deliveries in November 2023, so only codes from P (2023) onward apply.",
  yearTableNote:
    "The cycle skips I, O, Q, U, Z, and 0 to prevent visual confusion. Most Cybertrucks currently on the road are R-coded 2024 VINs — those are the ones most likely to be in scope for the accelerator-pedal recall (campaign 24V-273).",
  h2Where: "Where to Find Your Tesla Cybertruck VIN",
  where1Pre:
    "Every Cybertruck prints the VIN in ",
  where1Bold: "at least four places",
  where1Suffix:
    ", and any one is enough to run a free decode. Tesla even gives you a digital path through the MyTesla app, which is unique among automakers.",
  where2:
    "The fastest is the lower driver-side corner of the windshield — look through the glass from outside the Cybertruck. The driver-side door jamb sticker is the second easiest and is federally required on every Cybertruck sold in the US. Open the MyTesla app, tap your Cybertruck under the Vehicle tab, scroll down, and the full 17-character VIN appears alongside the trim. The Tesla title document prints the VIN as well.",
  where3:
    "If the VIN on the dash does not match the VIN on the title or the MyTesla app entry, stop. That mismatch is a strong signal the Cybertruck has had its identity altered. Given the Cybertruck's youth in the market and its unique stainless-steel body, any anomaly is worth investigating before purchase.",
  whereCardTitle: "Four places the Cybertruck VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "MyTesla app → Vehicle tab → scroll down",
    "Tesla title document",
  ],
  whereCardNote:
    "Found the Cybertruck VIN? Drop it into the decoder above to run a free decode against NMVTIS, NHTSA, and Tesla's Austin Gigafactory WMI in seconds.",
  h2Recalls: "Notable Recall Campaigns Affecting Tesla Cybertruck",
  recallsIntro:
    "The Cybertruck is a young product but already has a famous NHTSA recall on the record — the April 2024 accelerator-pedal action (campaign 24V-273). That campaign required dealer-applied trim replacement rather than an over-the-air update. The touchscreen-visibility OTA (24V-051) also applies to Cybertruck. A Cybertruck VIN decode tells you exactly which campaigns are still open against the VIN.",
  recallNoteBoldLead: "Buying a used Cybertruck?",
  recallNoteMid1: " Pair this Cybertruck VIN decoder with a focused ",
  recallNoteLink1: "Tesla recall check",
  recallNoteMid2: " and a full ",
  recallNoteLink2: "Tesla VIN history check",
  recallNoteSuffix:
    " for a complete picture before you put money down. Confirm the accelerator-pedal action (24V-273) has been completed at a Tesla service center.",
  h2Cpo: "Tesla CPO vs a Free Cybertruck VIN History Check",
  cpo1Pre:
    "Tesla's Certified Pre-Owned (CPO) program is dealer-direct: Tesla inventory inspected at Tesla service centers, sold with a limited warranty, and listed on Tesla.com. As the Cybertruck ages into the used market, CPO Cybertrucks will appear with the same model. CPO listings carry a price premium, and the inspection ",
  cpo1Bold: "does not replace a VIN-level history decode",
  cpo1Suffix:
    ". CPO confirms current condition; this page confirms what the open NMVTIS and NHTSA records say about that specific Cybertruck.",
  cpo2Pre:
    "A free Cybertruck VIN decode catches the things the dealer inspection isn't designed to surface: a flood brand from a state that re-titled clean, a prior salvage history (still rare given the Cybertruck's age), or the open accelerator-pedal recall the previous owner ignored. For a CPO purchase, run the decode as confirmation. For a private-party Cybertruck, run the decode ",
  cpo2Bold: "first",
  cpo2Mid: ", then consider a full ",
  cpo2Link1: "VIN history report",
  cpo2Mid2: " and an independent inspection. If anything looks off, a ",
  cpo2Link2: "salvage title check",
  cpo2Suffix: " can confirm exactly which brand the state applied and when.",
  cpo3:
    "Either way, double-check the VIN itself across the windshield, the door jamb, the MyTesla app, and the title. If one digit is off across those sources, the Cybertruck may not be what the paperwork says.",
  cpoCardTitle: "Tesla Cybertruck pre-purchase VIN checklist",
  cpoChecklist: [
    "Confirm the VIN matches across windshield, door jamb, MyTesla app, and title",
    "Run a free Cybertruck VIN decode for title brands and salvage records",
    "Verify the accelerator-pedal recall 24V-273 has been completed at a Tesla service center",
    "Match the decoded trim to the listing (Cyberbeast tri-motor vs Dual Motor AWD)",
    "Verify the 7SAY WMI — every legitimate Cybertruck is Austin-built",
    "Order a full VIN history report if the decode raises any flag",
  ],
  cpoCardCta: "Run the Cybertruck decoder first — paste the VIN here:",
  h2Internal: "Related Tesla Checks That Build On Your Cybertruck Decode",
  internalIntro:
    "A Cybertruck VIN decode is the entry point. These focused checks dig into specific records when something looks off — or when you want to be extra thorough before buying any used Tesla.",
  internalLinks: [
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Decode any Tesla VIN across Model S, 3, X, Y, and Cybertruck with the same plant + year logic." },
    { href: "/tesla-recall-check", label: "Tesla Recall Check", desc: "Surface every open NHTSA recall campaign attached to a Tesla VIN, including the Cybertruck accelerator-pedal action." },
    { href: "/tesla-vin-history-check", label: "Tesla VIN History Check", desc: "Pull the full NMVTIS title history for any Tesla VIN — brands, states, and salvage flags." },
    { href: "/vin-check", label: "VIN Check", desc: "Full multi-source history report on any VIN with title, accident, mileage, and recall data." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode any 17-character VIN from any manufacturer into year, make, model, trim, and plant." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if a Tesla Cybertruck VIN carries a salvage, junk, or non-repairable title brand." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether a Cybertruck was branded flood or water-damaged in any state." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims attached to the VIN." },
  ],
  h2Faq: "Tesla Cybertruck VIN Decoder — Frequently Asked Questions",
  faqIntro:
    "The questions buyers ask most when decoding a Tesla Cybertruck VIN for the first time.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Ready to Decode a Tesla Cybertruck VIN?",
  ctaBottomSub:
    "Enter any 17-character Cybertruck VIN to run a free decode against NMVTIS, the NHTSA recall feed, and Tesla's Austin Gigafactory WMI. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  {
    question: "How do I decode a Tesla Cybertruck VIN?",
    answer:
      "To decode a Tesla Cybertruck VIN, find the 17-character Vehicle Identification Number on the lower driver-side corner of the windshield, the driver-side door jamb sticker, the MyTesla app under the Vehicle tab, or the Tesla title document. Enter it into the free Cybertruck VIN decoder on this page. The tool validates that the string is exactly 17 characters and excludes the letters I, O, and Q per FMVSS 565, then reads the WMI (always 7SAY for Cybertruck, indicating Gigafactory Texas / Austin), the model-year character at position 10, the trim inside the VDS, queries NMVTIS for title-brand history, and the NHTSA recall feed for open campaigns including the April 2024 accelerator-pedal action (24V-273). The decode returns in seconds with no account.",
  },
  {
    question: "Where is the VIN on a Tesla Cybertruck?",
    answer:
      "Every Tesla Cybertruck prints the VIN in at least four places. The easiest is the lower driver-side corner of the windshield — look through the glass from outside. The second is the driver-side door jamb sticker, federally required on every Cybertruck sold in the US. The MyTesla mobile app shows the full 17-character VIN when you tap your Cybertruck under the Vehicle tab and scroll down. The Tesla title document prints the VIN as well. If any of those sources disagree, do not buy the Cybertruck until you reconcile the mismatch — a VIN mismatch is the classic sign of a salvage rebuild or a clone.",
  },
  {
    question: "What WMI does the Tesla Cybertruck use?",
    answer:
      "All Tesla Cybertruck VINs start with 7SAY — Gigafactory Texas (Austin, TX), opened April 2022 and the sole Cybertruck production plant. Cybertruck has been produced exclusively at Austin since first deliveries in November 2023, so unlike Model Y (which ships from four Gigafactories) the Cybertruck WMI never varies. If a Cybertruck VIN starts with anything other than 7SAY, it is not a legitimate Cybertruck — that mismatch is the classic sign of a salvage rebuild or a re-VIN.",
  },
  {
    question: "What does a Tesla Cybertruck VIN reveal?",
    answer:
      "A Cybertruck VIN encodes the country and plant of manufacture in positions 1-3 (the WMI, always 7SAY for Cybertruck), the broad vehicle attributes including body style and restraint system in positions 4-8 (the VDS), a check digit in position 9, the model year in position 10 (P=2023 first deliveries, R=2024, S=2025, T=2026), plant detail in position 11, and the unique production sequence in positions 12-17. Decoded that returns the build year, trim (Cyberbeast tri-motor, Dual Motor AWD, or planned Single Motor RWD), drivetrain, and factory equipment. A full Cybertruck VIN decode adds NMVTIS title-brand history and open NHTSA recalls including the famous April 2024 accelerator-pedal action (24V-273) that affected approximately 3,900 Cybertrucks.",
  },
  {
    question: "Are Tesla recalls free?",
    answer:
      "Yes. Under federal law (49 U.S.C. § 30120) all manufacturer safety-recall remedies are free for vehicles 15 model years old or newer, regardless of whether the current owner is the original purchaser. That covers every Tesla Cybertruck ever produced. The good news for Tesla owners more broadly is that an estimated 70%+ of Tesla recall remedies since 2020 are delivered as free over-the-air (OTA) software updates. The Cybertruck-specific accelerator-pedal action (24V-273) is one of the hardware exceptions and requires a Tesla service-center visit for trim replacement, but the repair itself is free.",
  },
  {
    question: "Which Gigafactory built my Tesla Cybertruck?",
    answer:
      "Every Tesla Cybertruck has been built at Gigafactory Texas (Austin, TX) — the 7SAY WMI. Tesla has never produced Cybertruck at any other plant. Austin opened April 2022 and serves as Tesla's flagship North American plant for both Cybertruck and Model Y. The free decoder on this page reads the WMI to confirm Austin and labels the plant in the result. Because Cybertruck is the only Tesla model produced exclusively at Austin (Model Y is also built there but ships from four total Gigafactories), the 7SAY WMI is a quick way to confirm authentic Cybertruck production.",
  },
  {
    question: "How do I check Tesla Cybertruck history by VIN?",
    answer:
      "Run the Cybertruck VIN through the free decoder on this page and it queries three independent sources in seconds: NMVTIS for the full title-brand chain (salvage, flood, junk, rebuilt, lemon-law buyback, odometer-rollback brands across all 50 state DMVs), the NHTSA recall feed for any open Tesla Cybertruck campaigns including the famous April 2024 accelerator-pedal action (24V-273) and the touchscreen-visibility OTA (24V-051), and Tesla VIN-format records for the Gigafactory (always Austin), model year, and trim. For deeper accident and damage history pair the decode with a dedicated accident history check — minor body work paid out of pocket may never appear in NMVTIS. The Cybertruck's stainless-steel body is unforgiving of poor accident repair, so a hands-on inspection by a trusted mechanic is the best partner to any used-Cybertruck purchase.",
  },
];

export default function TeslaCybertruckVinDecoderBody() {
  const c = COPY;
  const yearCodes = Object.entries(VIN_YEAR_CODES)
    .filter(([, year]) => year >= 2023)
    .sort(([, a], [, b]) => a - b);

  const wmis = (["7SAY"] as const).map((k) => ({ code: k, ...TESLA_WMI[k] }));
  const cybertruckRecalls = TESLA_NOTABLE_RECALLS.filter((r) =>
    (r.affectedModels as readonly string[]).includes("Cybertruck"),
  );

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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Reveals}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.revealsIntro}</p>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Wmi}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.wmiIntro}</p>
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
            <ul className="space-y-2.5 text-sm text-on-surface">
              {wmis.map((w) => (
                <li key={w.code} className="flex items-start gap-3 rounded-lg bg-white px-3.5 py-3 border border-outline-variant/60">
                  <code className="font-mono font-black text-primary text-base flex-shrink-0 w-14">{w.code}</code>
                  <span className="text-on-surface-variant text-xs sm:text-sm leading-relaxed">
                    <strong className="text-on-surface">{w.plant}</strong> — {w.country}. {w.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-3xl">{c.wmiNote}</p>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2YearTable}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.yearTableIntro}</p>
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
              {yearCodes.map(([code, year]) => (
                <div key={code} className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 border border-outline-variant/60">
                  <code className="font-mono font-black text-primary text-base">{code}</code>
                  <span className="text-on-surface-variant text-sm">{year}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-5 text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-3xl">{c.yearTableNote}</p>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">Decode This Specific Cybertruck VIN Right Now</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">You already have a Cybertruck in mind. Run the VIN against NMVTIS, the NHTSA recall feed, and Tesla&apos;s Austin Gigafactory WMI — free, in seconds.</p>
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
                {c.whereList.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.whereCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Recalls}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.recallsIntro}</p>
          <div className="space-y-3">
            {cybertruckRecalls.map((r) => (
              <div key={r.campaign + r.name} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                      {r.name} <span className="text-xs font-mono font-normal text-on-surface-variant">· NHTSA {r.campaign}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      <strong className="text-on-surface">{r.affectedVehicles}.</strong> {r.summary}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.recallNoteBoldLead}</strong>
                {c.recallNoteMid1}
                <Link href="/tesla-recall-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.recallNoteLink1}</Link>
                {c.recallNoteMid2}
                <Link href="/tesla-vin-history-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.recallNoteLink2}</Link>
                {c.recallNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Cpo}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.cpo1Pre}
                <strong className="text-on-surface">{c.cpo1Bold}</strong>
                {c.cpo1Suffix}
              </p>
              <p>
                {c.cpo2Pre}
                <strong className="text-on-surface">{c.cpo2Bold}</strong>
                {c.cpo2Mid}
                <Link href="/vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.cpo2Link1}</Link>
                {c.cpo2Mid2}
                <Link href="/salvage-title-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.cpo2Link2}</Link>
                {c.cpo2Suffix}
              </p>
              <p>{c.cpo3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.cpoCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.cpoChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.cpoCardCta}</p>
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

        <RelatedChecks exclude="/tesla-cybertruck-vin-decoder" />
      </div>
    </article>
  );
}

void TESLA_VIN_RULES;

export { FAQS_EN };
