/**
 * Body for /tesla-model-s-vin-decoder — English-only Model S-specific VIN
 * decoder. Mirrors ToyotaVinLookupBody. Model S is Fremont-only (5YJ WMI),
 * launched 2012, with Plaid and Long Range as current trims.
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
    question: "How do I decode a Tesla Model S VIN?",
    answer: (
      <>
        <strong>CarCheckerVIN&apos;s</strong> free Tesla Model S VIN decoder
        queries <strong>NMVTIS</strong>, NHTSA, and Tesla VIN-format records to
        return the Gigafactory, model year, trim (Plaid or Long Range), and
        open recalls from any 17-character Model S VIN in seconds.
      </>
    ),
  },
  {
    question: "Where is the Tesla Model S VIN located?",
    answer: (
      <>
        The Model S VIN is printed at the lower driver-side corner of the
        windshield, on the driver-door jamb sticker, inside the MyTesla app
        under the Vehicle tab, and on the Tesla title document.
      </>
    ),
  },
  {
    question: "What WMI does the Tesla Model S use?",
    answer: (
      <>
        All Model S VINs start with <code>5YJ</code> — Gigafactory California
        (Fremont). Model S has been produced exclusively at Fremont since 2012,
        Tesla&apos;s original plant in the former NUMMI facility.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const REVEAL_ICONS = [Factory, Calendar, Car, Cpu, AlertTriangle, FileText] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Model S VIN Decoder",
  badge: "Free Tesla Model S VIN Decoder · Plaid & Long Range Decode",
  h1Lead: "Tesla Model S VIN Decoder — ",
  h1Accent: "Decode Any Model S by Trim, Year & Recall Status.",
  intro:
    "CarCheckerVIN's free Model S VIN decoder queries NMVTIS, NHTSA, and Tesla VIN-format records to decode any 17-character Tesla Model S VIN by Gigafactory, build year, and trim. As an NMVTIS-approved data provider, CarCheckerVIN returns the same VIN decode logic Tesla service centers use, so you can confirm the model year (the Model S goes back to 2012, the longest-running Tesla in production), the trim (current Long Range and tri-motor Plaid, plus historic 60, 75, 85, 90D, 100D, P85D, P90D, P100D, and the original 'Performance' designations), and any open NHTSA recall campaigns. Recalls include the Autopilot remediation (campaign 23V-838), the 2023 front-trunk hood-latch action on Model S/X, and the touchscreen visibility OTA. Enter a 17-character Model S VIN below and we'll run the decode in seconds with no account.",
  formHeading: "Free Tesla Model S VIN Decoder — Decode Any 17-Character VIN",
  formSub:
    "Enter a Model S VIN to decode the model year, trim (Plaid, Long Range, or historic), and drivetrain config, then surface any open NHTSA safety recalls attached to the VIN.",
  formNote: "Free · No sign-up · Instant decode",
  trustStats: [
    { icon: Database, value: "NMVTIS", label: "title history" },
    { icon: Factory, value: "Fremont", label: "since 2012" },
    { icon: Shield, value: "NHTSA", label: "recall feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How to Decode a Tesla Model S VIN",
  howIntro:
    "Decoding a Model S VIN is a three-step job. You provide the 17-character VIN; we read the WMI for the plant (always 5YJ Fremont for Model S), position-10 for the year, the VDS for the trim, then query NMVTIS for title brands and NHTSA for any open recall campaigns. The Model S has the longest production history of any Tesla — VINs go back to 2012 — so the year code matters more than on newer models.",
  howSteps: [
    {
      tag: "Step 1",
      title: "Enter the Model S VIN",
      body:
        "Paste the 17-character VIN from the windshield, door jamb, MyTesla app, or title. The decoder validates that it is exactly 17 characters and excludes the letters I, O, and Q per FMVSS 565 before running.",
    },
    {
      tag: "Step 2",
      title: "We decode + query the records",
      body:
        "Your Model S VIN decode reads the WMI (always 5YJ Fremont), the model-year character at position 10, the trim and drivetrain inside the VDS, then hits NMVTIS for title brands and the NHTSA recall feed for any open Tesla Model S actions including the front-trunk hood-latch campaign on certain Model S/X.",
    },
    {
      tag: "Step 3",
      title: "Read the Model S decode",
      body:
        "You see the decoded model year, trim (Long Range, Plaid, or historic 60/75/85/90D/100D/P85D), drivetrain (RWD, AWD dual-motor, or tri-motor Plaid), title-brand summary, and any open NHTSA recalls — most of which are OTA-delivered with no service-center visit required.",
    },
  ],
  h2Reveals: "What a Tesla Model S VIN Reveals",
  revealsIntro:
    "A Model S VIN decode encodes plant, model year, trim, drivetrain, and ties to recall records the previous owner may never have resolved. Because Model S has the longest production history of any Tesla, the year and trim decode matters more — a 2013 60 kWh car is a very different vehicle from a 2024 Plaid.",
  reveals: [
    {
      title: "Gigafactory of origin",
      body:
        "The WMI is always 5YJ for Model S — Gigafactory California (Fremont, CA), Tesla's original plant opened in 2010 in the former NUMMI / GM-Toyota joint venture facility. Model S has been produced exclusively at Fremont since 2012.",
    },
    {
      title: "Model year (10th char)",
      body:
        "Position 10 encodes the model year per FMVSS 565: C=2012, D=2013, E=2014, F=2015, G=2016, H=2017, J=2018, K=2019, L=2020, M=2021 (Plaid introduced), N=2022, P=2023, R=2024, S=2025, T=2026. The Plaid tri-motor variant appears on 2021 (M) and later VINs.",
    },
    {
      title: "Trim & equipment",
      body:
        "The VDS (positions 4-8) encodes the trim line: current Long Range dual-motor or Plaid tri-motor, plus historic 60, 75, 85, 90D, 100D, P85D, P90D, P100D, and the original 'Performance' designations. The year and trim together tell you which generation of Model S the listing is.",
    },
    {
      title: "Drivetrain config",
      body:
        "The decoder returns the drive configuration — Rear-Wheel Drive (early Model S 60/85), All-Wheel Drive dual-motor (Long Range and historic D variants), or tri-motor (Plaid only, 2021+). Battery pack capacity also varies by VIN — early Model S ran 60, 75, 85, 90, or 100 kWh packs.",
    },
    {
      title: "Open recall status",
      body:
        "The Model S decode hits the NHTSA recall feed. Open actions include the Autopilot remediation (23V-838) affecting ~2 million vehicles via OTA, the 2023 front-trunk hood-latch action (23V-376) on certain Model S/X requiring a service-center visit, and the touchscreen-visibility OTA (24V-051).",
    },
    {
      title: "Title brand history",
      body:
        "NMVTIS supplies the title-brand chain across all 50 state DMVs. Salvage, flood, junk, rebuilt, and lemon-law buyback brands surface here — the brands that survive title washing across state lines. Older Model S cars are more likely to carry salvage brands due to age.",
    },
  ],
  h2Wmi: "Decoding the WMI for Tesla Model S",
  wmiIntro:
    "Every Tesla Model S ever produced carries the 5YJ WMI. Tesla has never produced Model S at any plant other than Fremont, so any Model S VIN with a different WMI is not a legitimate Model S.",
  wmiNote:
    "If a Model S VIN starts with anything other than 5YJ, it is not a Model S. That mismatch is a strong signal the vehicle's identity has been changed — a re-VIN, a clone, or worse. Exactly the kind of thing this free decoder is designed to catch.",
  h2YearTable: "Year Codes (10th Character) for Tesla Model S",
  yearTableIntro:
    "Position 10 of the VIN encodes the model year per FMVSS 565. The Model S launched in mid-2012, so codes from C (2012) onward apply.",
  yearTableNote:
    "The cycle skips I, O, Q, U, Z, and 0 to prevent visual confusion. The Plaid tri-motor variant appears on 2021 (M) and later VINs; earlier Model S VINs are dual-motor D variants or single-motor Standard / 60 / 85 cars.",
  h2Where: "Where to Find Your Tesla Model S VIN",
  where1Pre:
    "Every Model S prints the VIN in ",
  where1Bold: "at least four places",
  where1Suffix:
    ", and any one is enough to run a free decode. Tesla even gives you a digital path through the MyTesla app, which is unique among automakers.",
  where2:
    "The fastest is the lower driver-side corner of the windshield — look through the glass from outside the Model S. The driver-side door jamb sticker is the second easiest and is federally required on every Model S sold in the US. Open the MyTesla app, tap your Model S under the Vehicle tab, scroll down, and the full 17-character VIN appears alongside the trim. The Tesla title document prints the VIN as well. On early (2012-2015) Model S cars the door jamb sticker can fade — the windshield VIN is the most reliable backup.",
  where3:
    "If the VIN on the dash does not match the VIN on the title or the MyTesla app entry, stop. That mismatch is a strong signal the Model S has had its identity altered. Because Model S is now 14+ years into production, older salvage Model S cars are more common in the used market — the VIN decoder is your first line of defense.",
  whereCardTitle: "Four places the Model S VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "MyTesla app → Vehicle tab → scroll down",
    "Tesla title document",
  ],
  whereCardNote:
    "Found the Model S VIN? Drop it into the decoder above to run a free decode against NMVTIS, NHTSA, and Tesla's plant-WMI map in seconds.",
  h2Recalls: "Notable Recall Campaigns Affecting Tesla Model S",
  recallsIntro:
    "Several large NHTSA recall campaigns affect Tesla Model S specifically or as part of a multi-model action. Most are remedied through free over-the-air (OTA) software updates that download directly to the car, but a few — including the 2023 front-trunk hood-latch action — require a Tesla service-center visit. A Model S VIN decode tells you exactly which campaigns are still open against the VIN.",
  recallNoteBoldLead: "Buying a used Model S?",
  recallNoteMid1: " Pair this Model S VIN decoder with a focused ",
  recallNoteLink1: "Tesla recall check",
  recallNoteMid2: " and a full ",
  recallNoteLink2: "Tesla VIN history check",
  recallNoteSuffix:
    " for a complete picture before you put money down. Open recalls follow the VIN — the next owner pays nothing for the remedy.",
  h2Cpo: "Tesla CPO vs a Free Model S VIN History Check",
  cpo1Pre:
    "Tesla's Certified Pre-Owned (CPO) program is dealer-direct: Model S inventory inspected at Tesla service centers, sold with a limited warranty, and listed on Tesla.com. It's a fair program — but CPO listings carry a price premium, and the inspection ",
  cpo1Bold: "does not replace a VIN-level history decode",
  cpo1Suffix:
    ". CPO confirms current condition; this page confirms what the open NMVTIS and NHTSA records say about that specific Model S.",
  cpo2Pre:
    "A free Model S VIN decode catches the things the dealer inspection isn't designed to surface: a flood brand from a state that re-titled clean, a prior salvage history, or an open NHTSA recall the previous owner ignored. For a CPO purchase, run the decode as confirmation. For a private-party Model S, run the decode ",
  cpo2Bold: "first",
  cpo2Mid: ", then consider a full ",
  cpo2Link1: "VIN history report",
  cpo2Mid2: " and an independent inspection. If anything looks off, a ",
  cpo2Link2: "salvage title check",
  cpo2Suffix: " can confirm exactly which brand the state applied and when.",
  cpo3:
    "Either way, double-check the VIN itself across the windshield, the door jamb, the MyTesla app, and the title. If one digit is off across those sources, the Model S may not be what the paperwork says — especially relevant on older 2012-2016 cars where battery-pack swaps and salvage rebuilds are more common.",
  cpoCardTitle: "Tesla Model S pre-purchase VIN checklist",
  cpoChecklist: [
    "Confirm the VIN matches across windshield, door jamb, MyTesla app, and title",
    "Run a free Model S VIN decode for title brands and salvage records",
    "Check the NHTSA recall feed for any open Tesla Model S actions including the front-trunk hood-latch",
    "Match the decoded trim to the listing (Long Range vs Plaid vs historic 75/85/P100D)",
    "Verify the model year — a 2013 60 kWh is a very different car from a 2024 Plaid",
    "Order a full VIN history report if the decode raises any flag",
  ],
  cpoCardCta: "Run the Model S decoder first — paste the VIN here:",
  h2Internal: "Related Tesla Checks That Build On Your Model S Decode",
  internalIntro:
    "A Model S VIN decode is the entry point. These focused checks dig into specific records when something looks off — or when you want to be extra thorough before buying any used Tesla.",
  internalLinks: [
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Decode any Tesla VIN across Model S, 3, X, Y, and Cybertruck with the same plant + year logic." },
    { href: "/tesla-recall-check", label: "Tesla Recall Check", desc: "Surface every open NHTSA recall campaign attached to a Tesla VIN, including the Autopilot OTA remediation." },
    { href: "/tesla-vin-history-check", label: "Tesla VIN History Check", desc: "Pull the full NMVTIS title history for any Tesla VIN — brands, states, and salvage flags." },
    { href: "/vin-check", label: "VIN Check", desc: "Full multi-source history report on any VIN with title, accident, mileage, and recall data." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode any 17-character VIN from any manufacturer into year, make, model, trim, and plant." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if a Tesla Model S VIN carries a salvage, junk, or non-repairable title brand." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether a Model S was branded flood or water-damaged in any state." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims attached to the VIN." },
  ],
  h2Faq: "Tesla Model S VIN Decoder — Frequently Asked Questions",
  faqIntro:
    "The questions buyers ask most when decoding a Tesla Model S VIN for the first time.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Ready to Decode a Tesla Model S VIN?",
  ctaBottomSub:
    "Enter any 17-character Model S VIN to run a free decode against NMVTIS, the NHTSA recall feed, and Tesla's plant-WMI map. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  {
    question: "How do I decode a Tesla Model S VIN?",
    answer:
      "To decode a Tesla Model S VIN, find the 17-character Vehicle Identification Number on the lower driver-side corner of the windshield, the driver-side door jamb sticker, the MyTesla app under the Vehicle tab, or the Tesla title document. Enter it into the free Model S VIN decoder on this page. The tool validates that the string is exactly 17 characters and excludes the letters I, O, and Q per FMVSS 565, then reads the WMI (always 5YJ for Model S, indicating Gigafactory California / Fremont), the model-year character at position 10, the trim inside the VDS, queries NMVTIS for title-brand history, and the NHTSA recall feed for open campaigns. The decode returns in seconds with no account, credit card, or sign-up required.",
  },
  {
    question: "Where is the VIN on a Tesla Model S?",
    answer:
      "Every Tesla Model S prints the VIN in at least four places. The easiest is the lower driver-side corner of the windshield — look through the glass from outside. The second is the driver-side door jamb sticker, federally required on every Model S sold in the US. The MyTesla mobile app shows the full 17-character VIN when you tap your Model S under the Vehicle tab and scroll down. The Tesla title document prints the VIN as well. On early 2012-2015 Model S cars the door jamb sticker can fade — the windshield VIN is the most reliable backup. If any of those sources disagree, do not buy the Model S until you reconcile the mismatch.",
  },
  {
    question: "What WMI does the Tesla Model S use?",
    answer:
      "All Tesla Model S VINs start with 5YJ — Gigafactory California (Fremont, CA), Tesla's original assembly plant opened in 2010 in the former NUMMI / GM-Toyota joint venture facility. Model S has been produced exclusively at Fremont since 2012, so unlike Model Y (which ships from four Gigafactories) the Model S WMI never varies. If a Model S VIN starts with anything other than 5YJ, it is not a Model S — that mismatch is the classic sign of a salvage rebuild or a re-VIN.",
  },
  {
    question: "What does a Tesla Model S VIN reveal?",
    answer:
      "A Model S VIN encodes the country and plant of manufacture in positions 1-3 (the WMI, always 5YJ for Model S), the broad vehicle attributes including body style and restraint system in positions 4-8 (the VDS), a check digit in position 9, the model year in position 10, plant detail in position 11, and the unique production sequence in positions 12-17. Decoded that returns the model year (2012 forward — Model S has the longest production history of any Tesla), trim (current Long Range and Plaid, plus historic 60, 75, 85, 90D, 100D, P85D, P90D, P100D, and 'Performance' variants), drivetrain (RWD single-motor on early 60/85, AWD dual-motor on D variants, tri-motor on 2021+ Plaid), and battery-pack capacity. A full Model S VIN decode adds NMVTIS title-brand history and open NHTSA recalls.",
  },
  {
    question: "Are Tesla recalls free?",
    answer:
      "Yes. Under federal law (49 U.S.C. § 30120) all manufacturer safety-recall remedies are free for vehicles 15 model years old or newer, regardless of whether the current owner is the original purchaser. That covers every Tesla Model S ever produced. The good news for Model S owners is that an estimated 70%+ of Tesla recall remedies since 2020 are delivered as free over-the-air (OTA) software updates — the campaign downloads to the car overnight. The 2023 front-trunk hood-latch action (campaign 23V-376) on certain Model S/X is one of the hardware exceptions and requires a Tesla service-center visit, but the repair itself is free.",
  },
  {
    question: "Which Gigafactory built my Tesla Model S?",
    answer:
      "Every Tesla Model S has been built at Gigafactory California (Fremont, CA) — the 5YJ WMI. Tesla has never produced Model S at any other plant. Fremont opened in 2010 in the former NUMMI / GM-Toyota joint venture facility and continues to be Model S's sole assembly site. Unlike Model Y (Fremont, Austin, Shanghai, and Berlin) or Model 3 (Fremont and Shanghai), there's no ambiguity on Model S production location. The free decoder on this page reads the WMI to confirm Fremont and labels the plant in the result.",
  },
  {
    question: "How do I check Tesla Model S history by VIN?",
    answer:
      "Run the Model S VIN through the free decoder on this page and it queries three independent sources in seconds: NMVTIS for the full title-brand chain (salvage, flood, junk, rebuilt, lemon-law buyback, odometer-rollback brands across all 50 state DMVs), the NHTSA recall feed for any open Tesla Model S campaigns including the Autopilot remediation (23V-838), the touchscreen-visibility OTA (24V-051), and the front-trunk hood-latch action (23V-376) on certain Model S/X, and Tesla VIN-format records for the Gigafactory, model year, and trim. For deeper accident and damage history, pair the decode with a dedicated accident history check — minor body work paid out of pocket may never appear in NMVTIS, which is why a hands-on inspection by a trusted mechanic is the best partner to any used-Model-S purchase.",
  },
];

export default function TeslaModelSVinDecoderBody() {
  const c = COPY;
  const yearCodes = Object.entries(VIN_YEAR_CODES)
    .filter(([, year]) => year >= 2012)
    .sort(([, a], [, b]) => a - b);

  const wmis = (["5YJ"] as const).map((k) => ({ code: k, ...TESLA_WMI[k] }));
  const modelSRecalls = TESLA_NOTABLE_RECALLS.filter((r) =>
    (r.affectedModels as readonly string[]).includes("Model S"),
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
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">Decode This Specific Model S VIN Right Now</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">You already have a Model S in mind. Run the VIN against NMVTIS, the NHTSA recall feed, and Tesla&apos;s plant-WMI map — free, in seconds.</p>
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
            {modelSRecalls.map((r) => (
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

        <RelatedChecks exclude="/tesla-model-s-vin-decoder" />
      </div>
    </article>
  );
}

void TESLA_VIN_RULES;

export { FAQS_EN };
