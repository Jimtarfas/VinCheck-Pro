/**
 * Body for /tesla-model-3-vin-decoder — English-only Model 3-specific VIN
 * decoder page. Mirrors ToyotaVinLookupBody structure, pivoted to Tesla
 * Model 3 production at Fremont and Shanghai, plus model-specific recall
 * campaigns sourced from src/lib/tesla-data.ts.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, MapPin, Cpu, Factory, Calendar,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";
import { TESLA_WMI, TESLA_NOTABLE_RECALLS, VIN_YEAR_CODES, TESLA_VIN_RULES } from "@/lib/tesla-data";

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I decode a Tesla Model 3 VIN?",
    answer: (
      <>
        <strong>CarCheckerVIN&apos;s</strong> free Tesla Model 3 VIN decoder queries{" "}
        <strong>NMVTIS</strong>, NHTSA, and Tesla VIN-format records to return the
        Gigafactory, model year, trim, and open recalls from any 17-character
        Model 3 VIN in seconds — no sign-up required.
      </>
    ),
  },
  {
    question: "Where is the Tesla Model 3 VIN located?",
    answer: (
      <>
        The Model 3 VIN is printed at the lower driver-side corner of the
        windshield, on the driver-door jamb sticker, inside the MyTesla app under
        the Vehicle tab, and on the title document. Any one of these is enough to
        run a free decode.
      </>
    ),
  },
  {
    question: "What WMI does the Tesla Model 3 use?",
    answer: (
      <>
        Model 3 VINs starting with <code>5YJ</code> are built at Gigafactory
        California (Fremont) and <code>LRW</code> at Gigafactory Shanghai. The
        WMI is the first three characters of the VIN and tells you the plant
        without any other lookup.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const REVEAL_ICONS = [Factory, Calendar, Car, Cpu, AlertTriangle, FileText] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Model 3 VIN Decoder",
  badge: "Free Tesla Model 3 VIN Decoder · Gigafactory + Recall Lookup",
  h1Lead: "Tesla Model 3 VIN Decoder — ",
  h1Accent: "Decode Any Model 3 by Gigafactory, Year & Recall Status.",
  intro:
    "CarCheckerVIN's free Model 3 VIN decoder queries NMVTIS, NHTSA, and Tesla VIN-format records to decode any 17-character Tesla Model 3 VIN by Gigafactory, build year, and trim. As an NMVTIS-approved data provider, CarCheckerVIN returns the same VIN decode logic Tesla service centers use, so you can confirm whether a Model 3 came off the line at Fremont in California or Shanghai in China, what model year position-10 of the VIN encodes, and whether the car still carries open NHTSA recall actions like the Autopilot remediation (campaign 23V-838) or the power-steering campaign affecting 2023 Model 3 vehicles. Enter a 17-character Model 3 VIN below — Standard Range, Long Range, Performance, or the late-2023 Highland refresh — and we'll run the decode in seconds with no account.",
  formHeading: "Free Tesla Model 3 VIN Decoder — Decode Any 17-Character VIN",
  formSub:
    "Enter a Model 3 VIN to decode the Gigafactory, model year, trim, and drivetrain configuration, then surface any open NHTSA safety recalls attached to the VIN.",
  formNote: "Free · No sign-up · Instant decode",
  trustStats: [
    { icon: Database, value: "NMVTIS", label: "title history" },
    { icon: Factory, value: "Plant", label: "decoded from WMI" },
    { icon: Shield, value: "NHTSA", label: "recall feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How to Decode a Tesla Model 3 VIN",
  howIntro:
    "Decoding a Model 3 VIN is a three-step job. You provide the 17-character VIN; we read the WMI for the plant, position-10 for the year, the VDS for the trim, then query NMVTIS for title brands and NHTSA for any open recall campaigns. The whole decode runs in seconds against the same records Tesla service centers use.",
  howSteps: [
    {
      tag: "Step 1",
      title: "Enter the Model 3 VIN",
      body:
        "Paste the 17-character VIN from the windshield, door jamb, MyTesla app, or title. Our decoder validates that it is exactly 17 characters and excludes the disallowed letters I, O, and Q per FMVSS 565 before running.",
    },
    {
      tag: "Step 2",
      title: "We decode + query the records",
      body:
        "Your Model 3 VIN decode reads the WMI (5YJ for Fremont, LRW for Shanghai), the model year character at position 10, the trim and drivetrain inside the VDS, then queries NMVTIS for title brands and the NHTSA recall feed for any open Tesla Model 3 actions.",
    },
    {
      tag: "Step 3",
      title: "Read the Model 3 decode",
      body:
        "You see the decoded Gigafactory, model year, trim (Standard Range, Long Range, Performance, Highland), drivetrain (RWD or AWD), title-brand summary, and any open NHTSA recalls — including the Autopilot OTA campaign and any model-specific actions still attached to the VIN.",
    },
  ],
  h2Reveals: "What a Tesla Model 3 VIN Reveals",
  revealsIntro:
    "A Model 3 VIN decode goes well beyond year-make-model. The 17-character string encodes plant, model year, trim, drivetrain, and ties to recall records the previous owner may never have resolved.",
  reveals: [
    {
      title: "Gigafactory of origin",
      body:
        "The WMI (positions 1-3) names the plant. 5YJ means Gigafactory California (Fremont); LRW means Gigafactory Shanghai. Tesla has built Model 3 at both since late 2019 — Shanghai for the China market and most EU/APAC export, Fremont for North America.",
    },
    {
      title: "Model year (10th char)",
      body:
        "Position 10 encodes the model year per FMVSS 565: H=2017 (first Model 3), J=2018, K=2019, L=2020, M=2021, N=2022, P=2023, R=2024, S=2025, T=2026. The 'Highland' refresh appears on late-2023 builds onward.",
    },
    {
      title: "Trim & equipment",
      body:
        "The VDS (positions 4-8) encodes the trim line: Standard Range, Long Range, Performance, or the Highland refresh. Combined with build year you can confirm whether a listing is the pre-refresh or Highland generation.",
    },
    {
      title: "Drivetrain config",
      body:
        "The decoder returns the drive configuration — Rear-Wheel Drive (single motor) or All-Wheel Drive (dual motor) — plus the battery pack the VIN was built with. This is how you confirm a Performance variant rather than a re-badged AWD.",
    },
    {
      title: "Open recall status",
      body:
        "The Model 3 decode hits the NHTSA recall feed. Open actions stay attached to the VIN until completed — including the Autopilot remediation (23V-838) affecting ~2 million vehicles and the power-steering PCB campaign on certain 2023 builds. Most Model 3 recalls are remedied by free over-the-air (OTA) updates with no dealer visit.",
    },
    {
      title: "Title brand history",
      body:
        "NMVTIS supplies the title-brand chain across all 50 state DMVs. Salvage, flood, junk, rebuilt, and lemon-law buyback brands surface here — the brands that survive title washing across state lines.",
    },
  ],
  h2Wmi: "Decoding the WMI for Tesla Model 3",
  wmiIntro:
    "The first three characters of the VIN — the World Manufacturer Identifier — tell you where the Model 3 was built. Tesla uses different WMIs per Gigafactory, so you can identify the plant before any other lookup.",
  wmiNote:
    "If a Model 3 VIN starts with anything other than 5YJ or LRW it is not a Tesla Model 3. That mismatch is a strong signal something is wrong with the vehicle's identity — exactly the kind of thing a Model 3 VIN decode is designed to catch.",
  h2YearTable: "Year Codes (10th Character) for Tesla Model 3",
  yearTableIntro:
    "Position 10 of the VIN encodes the model year per FMVSS 565. The Model 3 launched in 2017, so only the codes from H (2017) onward apply.",
  yearTableNote:
    "The cycle skips I, O, Q, U, Z, and 0 to prevent visual confusion with similar-looking digits. The Model 3 'Highland' refresh appears on late-2023 (P) and all 2024-onward (R, S, T) VINs.",
  h2Where: "Where to Find Your Tesla Model 3 VIN",
  where1Pre:
    "Every Model 3 prints the VIN in ",
  where1Bold: "at least four places",
  where1Suffix:
    ", and any one of them is enough to run a free decode. Tesla even gives you a digital path through the MyTesla app, which is unique among automakers.",
  where2:
    "The fastest is the lower driver-side corner of the windshield — look through the glass from outside the Model 3. The driver-side door jamb sticker is the second easiest and is required by US federal law on every Model 3 sold here. Open the MyTesla app, tap your Model 3 under the Vehicle tab, scroll down, and the full 17-character VIN appears alongside the model and trim. The Tesla title document prints the VIN as well.",
  where3:
    "If the VIN on the dash does not match the VIN on the title or the MyTesla app entry, stop. That mismatch is a strong signal that the Model 3 has had its identity changed — a salvage rebuild, a clone, or worse. Exactly the kind of thing this free decoder is designed to surface.",
  whereCardTitle: "Four places the Model 3 VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "MyTesla app → Vehicle tab → scroll down",
    "Tesla title document",
  ],
  whereCardNote:
    "Found the Model 3 VIN? Drop it into the decoder above to run a free decode against NMVTIS, NHTSA, and Tesla's plant-WMI map in seconds.",
  h2Recalls: "Notable Recall Campaigns Affecting Tesla Model 3",
  recallsIntro:
    "Several large NHTSA recall campaigns affect Tesla Model 3 specifically or as part of a multi-model action. Most are remedied through free over-the-air (OTA) software updates that download directly to the car, but a few require a service-center visit. A Model 3 VIN decode tells you exactly which campaigns are still open against the VIN.",
  recallNoteBoldLead: "Buying a used Model 3?",
  recallNoteMid1: " Pair this Model 3 VIN decoder with a focused ",
  recallNoteLink1: "Tesla recall check",
  recallNoteMid2: " and a full ",
  recallNoteLink2: "Tesla VIN history check",
  recallNoteSuffix:
    " for a complete picture before you put money down. Open recalls follow the VIN and the next owner pays nothing for the remedy.",
  h2Cpo: "Tesla CPO vs a Free Model 3 VIN History Check",
  cpo1Pre:
    "Tesla's Certified Pre-Owned (CPO) program is dealer-direct: Model 3 inventory inspected at Tesla service centers, sold with a limited warranty, and listed on Tesla.com. It's a fair program — but CPO listings carry a price premium, and the inspection ",
  cpo1Bold: "does not replace a VIN-level history decode",
  cpo1Suffix:
    ". CPO confirms current condition; this page confirms what the open NMVTIS and NHTSA records say about that specific Model 3.",
  cpo2Pre:
    "A free Model 3 VIN decode catches the things the dealer inspection isn't designed to surface: a flood brand from a state that re-titled the car clean, a prior salvage history, or an open NHTSA recall the previous owner ignored. For a CPO purchase, run the decode as confirmation. For a private-party Model 3, run the decode ",
  cpo2Bold: "first",
  cpo2Mid: ", then consider a full ",
  cpo2Link1: "VIN history report",
  cpo2Mid2: " and an independent inspection. If anything looks off, a ",
  cpo2Link2: "salvage title check",
  cpo2Suffix: " can confirm exactly which brand the state applied and when.",
  cpo3:
    "Either way, double-check the VIN itself across the windshield, the door jamb, the MyTesla app, and the title. If one digit is off across those sources, the Model 3 may not be what the paperwork says.",
  cpoCardTitle: "Tesla Model 3 pre-purchase VIN checklist",
  cpoChecklist: [
    "Confirm the VIN matches across windshield, door jamb, MyTesla app, and title",
    "Run a free Model 3 VIN decode for title brands and salvage records",
    "Check the NHTSA recall feed for any open Tesla Model 3 actions",
    "Match the decoded trim to what the seller is advertising (Standard Range vs Long Range vs Performance vs Highland)",
    "Verify the Gigafactory from the WMI against the seller's claim of US-built or Shanghai-built",
    "Order a full VIN history report if the decode raises any flag",
  ],
  cpoCardCta: "Run the Model 3 decoder first — paste the VIN here:",
  h2Internal: "Related Tesla Checks That Build On Your Model 3 Decode",
  internalIntro:
    "A Model 3 VIN decode is the entry point. These focused checks dig into specific records when something looks off — or when you want to be extra thorough before buying any used Tesla.",
  internalLinks: [
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Decode any Tesla VIN across Model S, 3, X, Y, and Cybertruck with the same plant + year logic." },
    { href: "/tesla-recall-check", label: "Tesla Recall Check", desc: "Surface every open NHTSA recall campaign attached to a Tesla VIN, including the Autopilot OTA remediation." },
    { href: "/tesla-vin-history-check", label: "Tesla VIN History Check", desc: "Pull the full NMVTIS title history for any Tesla VIN — brands, states, and salvage flags." },
    { href: "/vin-check", label: "VIN Check", desc: "Full multi-source history report on any VIN with title, accident, mileage, and recall data." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode any 17-character VIN from any manufacturer into year, make, model, trim, and plant." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if a Tesla Model 3 VIN carries a salvage, junk, or non-repairable title brand." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether a Model 3 was branded flood or water-damaged in any state." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims attached to the VIN." },
  ],
  h2Faq: "Tesla Model 3 VIN Decoder — Frequently Asked Questions",
  faqIntro:
    "The questions buyers ask most when decoding a Tesla Model 3 VIN for the first time.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Ready to Decode a Tesla Model 3 VIN?",
  ctaBottomSub:
    "Enter any 17-character Model 3 VIN to run a free decode against NMVTIS, the NHTSA recall feed, and Tesla's plant-WMI map. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  {
    question: "How do I decode a Tesla Model 3 VIN?",
    answer:
      "To decode a Tesla Model 3 VIN, find the 17-character Vehicle Identification Number on the lower driver-side corner of the windshield, the driver-side door jamb sticker, the MyTesla app under the Vehicle tab, or the Tesla title document. Enter it into the free Model 3 VIN decoder on this page. The tool validates that the string is exactly 17 characters and excludes the letters I, O, and Q per FMVSS 565, then reads the WMI (5YJ for Fremont, LRW for Shanghai), the model-year character at position 10, the trim inside the VDS, queries NMVTIS for title-brand history, and the NHTSA recall feed for open campaigns. The decode returns in seconds with no account, credit card, or sign-up required.",
  },
  {
    question: "Where is the VIN on a Tesla Model 3?",
    answer:
      "Every Tesla Model 3 prints the VIN in at least four places. The easiest is the lower driver-side corner of the windshield — look through the glass from outside. The second is the driver-side door jamb sticker, which is required on every Model 3 sold in the US by federal law. The MyTesla mobile app shows the full 17-character VIN when you tap your car under the Vehicle tab and scroll down. The Tesla title document prints the VIN as well. If any of those sources disagree, do not buy the Model 3 until you reconcile the mismatch — a VIN mismatch is the classic sign of a salvage rebuild or a clone.",
  },
  {
    question: "What WMI does the Tesla Model 3 use?",
    answer:
      "Tesla Model 3 uses two WMIs depending on the Gigafactory of origin. 5YJ identifies Gigafactory California (Fremont), Tesla's original plant opened in 2010 in the former NUMMI facility. LRW identifies Gigafactory Shanghai, opened December 2019 and now Tesla's highest-volume plant by output. Model 3 produced for the North American market is overwhelmingly Fremont-built (5YJ); Model 3 for China and most EU/APAC export markets is Shanghai-built (LRW). If a Model 3 VIN starts with anything else, it is not a Model 3 — the WMI is the first thing the free decoder checks.",
  },
  {
    question: "What does a Tesla Model 3 VIN reveal?",
    answer:
      "A Model 3 VIN encodes the country and plant of manufacture in positions 1-3 (the WMI), the broad vehicle attributes including body style and restraint system in positions 4-8 (the VDS), a check digit in position 9, the model year in position 10, plant detail in position 11, and the unique production sequence in positions 12-17. Decoded that returns the Gigafactory, model year, trim (Standard Range, Long Range, Performance, Highland), drivetrain (RWD or AWD), and factory equipment. A full Model 3 VIN decode adds NMVTIS title-brand history, state-by-state title trail, salvage and total-loss records, and any open NHTSA recall campaigns including the Autopilot remediation (campaign 23V-838).",
  },
  {
    question: "Are Tesla recalls free?",
    answer:
      "Yes. Under federal law (49 U.S.C. § 30120) all manufacturer safety-recall remedies are free for vehicles 15 model years old or newer, regardless of whether the current owner is the original purchaser. That covers every Tesla Model 3 ever produced. The good news for Model 3 owners is that an estimated 70%+ of Tesla recall remedies since 2020 are delivered as free over-the-air (OTA) software updates — the campaign downloads to the car overnight and you wake up to a fixed vehicle, no dealer visit required. Hardware campaigns like the 2023 power-steering PCB action do require a Tesla service-center visit, but the repair itself is free.",
  },
  {
    question: "Which Gigafactory built my Tesla Model 3?",
    answer:
      "Read the first three characters of the Model 3 VIN. 5YJ means Gigafactory California (Fremont, CA) — Tesla's original plant opened in 2010. LRW means Gigafactory Shanghai, opened December 2019. The MyTesla app does not always surface the plant directly, but the VIN's WMI tells you instantly. Tesla Model 3 produced for the US market is overwhelmingly Fremont-built; Tesla Model 3 produced for China and most EU/APAC export markets is Shanghai-built. The free decoder on this page reads the WMI and labels the plant in the result.",
  },
  {
    question: "How do I check Tesla Model 3 history by VIN?",
    answer:
      "Run the Model 3 VIN through the free decoder on this page and it queries three independent sources in seconds: NMVTIS for the full title-brand chain (salvage, flood, junk, rebuilt, lemon-law buyback, odometer-rollback brands across all 50 state DMVs), the NHTSA recall feed for any open Tesla Model 3 campaigns including the Autopilot remediation (23V-838) and the power-steering PCB action on 2023 builds, and Tesla VIN-format records for the Gigafactory, model year, and trim. For deeper accident and damage history, pair the decode with a dedicated accident history check — minor body work paid out of pocket may never appear in NMVTIS, which is why a hands-on inspection by a trusted mechanic is the best partner to any used-Tesla purchase.",
  },
];

export default function TeslaModel3VinDecoderBody() {
  const c = COPY;
  const yearCodes = Object.entries(VIN_YEAR_CODES)
    .filter(([, year]) => year >= 2017)
    .sort(([, a], [, b]) => a - b);

  const wmis = (["5YJ", "LRW"] as const).map((k) => ({ code: k, ...TESLA_WMI[k] }));
  const model3Recalls = TESLA_NOTABLE_RECALLS.filter((r) =>
    (r.affectedModels as readonly string[]).includes("Model 3"),
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
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">Decode This Specific Model 3 VIN Right Now</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">You already have a Model 3 in mind. Run the VIN against NMVTIS, the NHTSA recall feed, and Tesla&apos;s plant-WMI map — free, in seconds.</p>
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
            {model3Recalls.map((r) => (
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

        <RelatedChecks exclude="/tesla-model-3-vin-decoder" />
      </div>
    </article>
  );
}

// Suppress unused-import warning for TESLA_VIN_RULES — surfaced in copy.
void TESLA_VIN_RULES;

export { FAQS_EN };
