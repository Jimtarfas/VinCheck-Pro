/**
 * Body for /tesla-model-y-vin-decoder — English-only Model Y-specific VIN
 * decoder. Mirrors ToyotaVinLookupBody structure with Model Y-focused copy:
 * 4-Gigafactory production (Fremont/Austin/Shanghai/Berlin), Juniper refresh,
 * and the recall campaigns affecting Model Y.
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
    question: "How do I decode a Tesla Model Y VIN?",
    answer: (
      <>
        <strong>CarCheckerVIN&apos;s</strong> free Tesla Model Y VIN decoder
        queries <strong>NMVTIS</strong>, NHTSA, and Tesla VIN-format records to
        return the Gigafactory (Fremont, Austin, Shanghai, or Berlin), model
        year, and open recalls from any 17-character Model Y VIN in seconds.
      </>
    ),
  },
  {
    question: "Where is the Tesla Model Y VIN located?",
    answer: (
      <>
        The Model Y VIN is printed at the lower driver-side corner of the
        windshield, on the driver-door jamb sticker, inside the MyTesla app
        under the Vehicle tab, and on the Tesla title document. Any one is
        enough to run a free decode.
      </>
    ),
  },
  {
    question: "What WMIs does the Tesla Model Y use?",
    answer: (
      <>
        Model Y VINs use four WMIs: <code>5YJ</code> (Fremont, pre-2022),{" "}
        <code>7SAY</code> (Austin Gigafactory Texas, post-2022),{" "}
        <code>LRW</code> (Shanghai), and <code>XP7</code> (Berlin-Brandenburg).
        The first three characters identify the plant.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const REVEAL_ICONS = [Factory, Calendar, Car, Cpu, AlertTriangle, FileText] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Model Y VIN Decoder",
  badge: "Free Tesla Model Y VIN Decoder · Fremont/Austin/Shanghai/Berlin",
  h1Lead: "Tesla Model Y VIN Decoder — ",
  h1Accent: "Decode Any Model Y by Gigafactory, Trim & Recall Status.",
  intro:
    "CarCheckerVIN's free Model Y VIN decoder queries NMVTIS, NHTSA, and Tesla VIN-format records to decode any 17-character Tesla Model Y VIN by Gigafactory, build year, and trim. As an NMVTIS-approved data provider, CarCheckerVIN returns the same VIN decode logic Tesla service centers use, so you can confirm which of the four Model Y plants — Fremont in California, Austin in Texas, Shanghai in China, or Berlin-Brandenburg in Germany — produced the car. The decoder reads the WMI to identify the Gigafactory, the 10th character for the model year, the VDS for the trim, and surfaces any open NHTSA recall campaigns including the Autopilot remediation (23V-838) and the 2023 power-steering action that affected certain Model Y vehicles. Enter a 17-character Model Y VIN below — Long Range, Performance, Standard Range, or the 2025 Juniper refresh — and the decode runs in seconds with no account.",
  formHeading: "Free Tesla Model Y VIN Decoder — Decode Any 17-Character VIN",
  formSub:
    "Enter a Model Y VIN to decode the Gigafactory (Fremont, Austin, Shanghai, or Berlin), model year, trim, and surface any open NHTSA safety recalls attached to the VIN.",
  formNote: "Free · No sign-up · Instant decode",
  trustStats: [
    { icon: Database, value: "NMVTIS", label: "title history" },
    { icon: Factory, value: "4 plants", label: "decoded from WMI" },
    { icon: Shield, value: "NHTSA", label: "recall feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How to Decode a Tesla Model Y VIN",
  howIntro:
    "Decoding a Model Y VIN is a three-step job. You provide the 17-character VIN; we read the WMI for the plant, position-10 for the year, the VDS for the trim, then query NMVTIS for title brands and NHTSA for any open recall campaigns. Because Tesla builds Model Y at four Gigafactories — more than any other Tesla model — the plant decode is especially important.",
  howSteps: [
    {
      tag: "Step 1",
      title: "Enter the Model Y VIN",
      body:
        "Paste the 17-character VIN from the windshield, door jamb, MyTesla app, or title. The decoder validates that it is exactly 17 characters and excludes the letters I, O, and Q per FMVSS 565 before running.",
    },
    {
      tag: "Step 2",
      title: "We decode + query the records",
      body:
        "Your Model Y VIN decode reads the WMI (5YJ Fremont, 7SAY Austin, LRW Shanghai, XP7 Berlin), the model-year character at position 10, the trim and drivetrain inside the VDS, then hits NMVTIS for title brands and the NHTSA recall feed for any open Tesla Model Y actions.",
    },
    {
      tag: "Step 3",
      title: "Read the Model Y decode",
      body:
        "You see the decoded Gigafactory, model year, trim (Long Range, Performance, Standard Range, Juniper), drivetrain (RWD or AWD), title-brand summary, and any open NHTSA recalls — including OTA-delivered Autopilot remediation and any model-specific actions still attached to the VIN.",
    },
  ],
  h2Reveals: "What a Tesla Model Y VIN Reveals",
  revealsIntro:
    "A Model Y VIN decode encodes plant, model year, trim, drivetrain, and ties to recall records the previous owner may never have resolved. Because Model Y ships from four different Gigafactories, the plant decode often clarifies the spec — Berlin builds are EU-spec, Shanghai builds are global export, Fremont and Austin builds are North American market.",
  reveals: [
    {
      title: "Gigafactory of origin",
      body:
        "The WMI (positions 1-3) names the plant. 5YJ means Fremont (pre-2022 Model Y), 7SAY means Gigafactory Texas (Austin, post-2022), LRW means Gigafactory Shanghai, and XP7 means Gigafactory Berlin-Brandenburg. The plant tells you the spec and the market the car was built for.",
    },
    {
      title: "Model year (10th char)",
      body:
        "Position 10 encodes the model year per FMVSS 565: L=2020 (first Model Y), M=2021, N=2022, P=2023, R=2024, S=2025, T=2026. The 'Juniper' refresh — Model Y's mid-cycle update — shipped on 2025 (S) and later VINs.",
    },
    {
      title: "Trim & equipment",
      body:
        "The VDS (positions 4-8) encodes the trim line: Long Range, Performance, Standard Range, or the 2025 Juniper refresh. Combined with the build year you can confirm a listing is pre-refresh or post-Juniper.",
    },
    {
      title: "Drivetrain config",
      body:
        "The decoder returns the drive configuration — Rear-Wheel Drive (single motor, Standard Range), All-Wheel Drive (dual motor, Long Range and Juniper), or the Performance variant — plus the battery pack the VIN was built with.",
    },
    {
      title: "Open recall status",
      body:
        "The Model Y decode hits the NHTSA recall feed. Open actions stay attached to the VIN until completed — including the Autopilot remediation (23V-838) affecting ~2 million vehicles and the 2023 power-steering PCB campaign on certain Model Y builds. Most Tesla recalls are remedied by free over-the-air (OTA) updates.",
    },
    {
      title: "Title brand history",
      body:
        "NMVTIS supplies the title-brand chain across all 50 state DMVs. Salvage, flood, junk, rebuilt, and lemon-law buyback brands surface here — the brands that survive title washing across state lines.",
    },
  ],
  h2Wmi: "Decoding the WMI for Tesla Model Y — Four Plants",
  wmiIntro:
    "Model Y is the only Tesla model produced at all four Gigafactories. The first three characters of the VIN identify the plant, and each plant typically serves a different regional market: Fremont and Austin for North America, Shanghai for China and global export, Berlin for the EU.",
  wmiNote:
    "If a Model Y VIN starts with anything other than 5YJ, 7SAY, LRW, or XP7, it is not a Model Y. Pay attention to the plant: a Berlin-built Model Y on a US title raises questions, since Berlin builds primarily serve the EU market.",
  h2YearTable: "Year Codes (10th Character) for Tesla Model Y",
  yearTableIntro:
    "Position 10 of the VIN encodes the model year per FMVSS 565. The Model Y launched in March 2020, so only codes from L (2020) onward apply.",
  yearTableNote:
    "The cycle skips I, O, Q, U, Z, and 0 to prevent visual confusion. The Model Y 'Juniper' refresh ships on 2025 (S) and 2026 (T) VINs.",
  h2Where: "Where to Find Your Tesla Model Y VIN",
  where1Pre:
    "Every Model Y prints the VIN in ",
  where1Bold: "at least four places",
  where1Suffix:
    ", and any one is enough to run a free decode. Tesla even gives you a digital path through the MyTesla app, which is unique among automakers.",
  where2:
    "The fastest is the lower driver-side corner of the windshield — look through the glass from outside the Model Y. The driver-side door jamb sticker is the second easiest and is federally required on every Model Y sold in the US. Open the MyTesla app, tap your Model Y under the Vehicle tab, scroll down, and the full 17-character VIN appears alongside the trim. The Tesla title document prints the VIN as well.",
  where3:
    "If the VIN on the dash does not match the VIN on the title or the MyTesla app entry, stop. That mismatch is a strong signal that the Model Y has had its identity altered — a salvage rebuild, a clone, or worse — exactly the kind of thing this free decoder is designed to surface.",
  whereCardTitle: "Four places the Model Y VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "MyTesla app → Vehicle tab → scroll down",
    "Tesla title document",
  ],
  whereCardNote:
    "Found the Model Y VIN? Drop it into the decoder above to run a free decode against NMVTIS, NHTSA, and Tesla's four-plant WMI map in seconds.",
  h2Recalls: "Notable Recall Campaigns Affecting Tesla Model Y",
  recallsIntro:
    "Several large NHTSA recall campaigns affect Tesla Model Y specifically or as part of a multi-model action. Most are remedied through free over-the-air (OTA) software updates that download directly to the car, but a few require a service-center visit. A Model Y VIN decode tells you exactly which campaigns are still open against the VIN.",
  recallNoteBoldLead: "Buying a used Model Y?",
  recallNoteMid1: " Pair this Model Y VIN decoder with a focused ",
  recallNoteLink1: "Tesla recall check",
  recallNoteMid2: " and a full ",
  recallNoteLink2: "Tesla VIN history check",
  recallNoteSuffix:
    " for a complete picture before you put money down. Open recalls follow the VIN — the next owner pays nothing for the remedy.",
  h2Cpo: "Tesla CPO vs a Free Model Y VIN History Check",
  cpo1Pre:
    "Tesla's Certified Pre-Owned (CPO) program is dealer-direct: Model Y inventory inspected at Tesla service centers, sold with a limited warranty, and listed on Tesla.com. It's a fair program — but CPO listings carry a price premium, and the inspection ",
  cpo1Bold: "does not replace a VIN-level history decode",
  cpo1Suffix:
    ". CPO confirms current condition; this page confirms what the open NMVTIS and NHTSA records say about that specific Model Y.",
  cpo2Pre:
    "A free Model Y VIN decode catches the things the dealer inspection isn't designed to surface: a flood brand from a state that re-titled clean, a prior salvage history, or an open NHTSA recall the previous owner ignored. For a CPO purchase, run the decode as confirmation. For a private-party Model Y, run the decode ",
  cpo2Bold: "first",
  cpo2Mid: ", then consider a full ",
  cpo2Link1: "VIN history report",
  cpo2Mid2: " and an independent inspection. If anything looks off, a ",
  cpo2Link2: "salvage title check",
  cpo2Suffix: " can confirm exactly which brand the state applied and when.",
  cpo3:
    "Either way, double-check the VIN itself across the windshield, the door jamb, the MyTesla app, and the title. If one digit is off across those sources, the Model Y may not be what the paperwork says.",
  cpoCardTitle: "Tesla Model Y pre-purchase VIN checklist",
  cpoChecklist: [
    "Confirm the VIN matches across windshield, door jamb, MyTesla app, and title",
    "Run a free Model Y VIN decode for title brands and salvage records",
    "Check the NHTSA recall feed for any open Tesla Model Y actions",
    "Match the decoded trim to the listing (Long Range vs Performance vs Standard Range vs Juniper)",
    "Verify the Gigafactory from the WMI — Berlin-built Model Y on a US title raises questions",
    "Order a full VIN history report if the decode raises any flag",
  ],
  cpoCardCta: "Run the Model Y decoder first — paste the VIN here:",
  h2Internal: "Related Tesla Checks That Build On Your Model Y Decode",
  internalIntro:
    "A Model Y VIN decode is the entry point. These focused checks dig into specific records when something looks off — or when you want to be extra thorough before buying any used Tesla.",
  internalLinks: [
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Decode any Tesla VIN across Model S, 3, X, Y, and Cybertruck with the same plant + year logic." },
    { href: "/tesla-recall-check", label: "Tesla Recall Check", desc: "Surface every open NHTSA recall campaign attached to a Tesla VIN, including the Autopilot OTA remediation." },
    { href: "/tesla-vin-history-check", label: "Tesla VIN History Check", desc: "Pull the full NMVTIS title history for any Tesla VIN — brands, states, and salvage flags." },
    { href: "/vin-check", label: "VIN Check", desc: "Full multi-source history report on any VIN with title, accident, mileage, and recall data." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode any 17-character VIN from any manufacturer into year, make, model, trim, and plant." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if a Tesla Model Y VIN carries a salvage, junk, or non-repairable title brand." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether a Model Y was branded flood or water-damaged in any state." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims attached to the VIN." },
  ],
  h2Faq: "Tesla Model Y VIN Decoder — Frequently Asked Questions",
  faqIntro:
    "The questions buyers ask most when decoding a Tesla Model Y VIN for the first time.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Ready to Decode a Tesla Model Y VIN?",
  ctaBottomSub:
    "Enter any 17-character Model Y VIN to run a free decode against NMVTIS, the NHTSA recall feed, and Tesla's four-plant WMI map. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  {
    question: "How do I decode a Tesla Model Y VIN?",
    answer:
      "To decode a Tesla Model Y VIN, find the 17-character Vehicle Identification Number on the lower driver-side corner of the windshield, the driver-side door jamb sticker, the MyTesla app under the Vehicle tab, or the Tesla title document. Enter it into the free Model Y VIN decoder on this page. The tool validates that the string is exactly 17 characters and excludes the letters I, O, and Q per FMVSS 565, then reads the WMI (5YJ Fremont, 7SAY Austin, LRW Shanghai, XP7 Berlin), the model-year character at position 10, the trim inside the VDS, queries NMVTIS for title-brand history, and the NHTSA recall feed for open campaigns. The decode returns in seconds with no account, credit card, or sign-up required.",
  },
  {
    question: "Where is the VIN on a Tesla Model Y?",
    answer:
      "Every Tesla Model Y prints the VIN in at least four places. The easiest is the lower driver-side corner of the windshield — look through the glass from outside. The second is the driver-side door jamb sticker, federally required on every Model Y sold in the US. The MyTesla mobile app shows the full 17-character VIN when you tap your Model Y under the Vehicle tab and scroll down. The Tesla title document prints the VIN as well. If any of those sources disagree, do not buy the Model Y until you reconcile the mismatch — a VIN mismatch is the classic sign of a salvage rebuild or a clone.",
  },
  {
    question: "What WMI does the Tesla Model Y use?",
    answer:
      "Tesla Model Y uses four WMIs depending on the Gigafactory of origin. 5YJ identifies Gigafactory California (Fremont) for pre-2022 Model Y production. 7SAY identifies Gigafactory Texas (Austin), opened April 2022 and now the primary North American Model Y plant. LRW identifies Gigafactory Shanghai, opened December 2019 and Tesla's highest-volume plant by output. XP7 identifies Gigafactory Berlin-Brandenburg in Grünheide, Germany, opened March 2022 and Tesla's only EU plant. The free decoder on this page reads the first three characters of the VIN and labels the Gigafactory in the result.",
  },
  {
    question: "What does a Tesla Model Y VIN reveal?",
    answer:
      "A Model Y VIN encodes the country and plant of manufacture in positions 1-3 (the WMI), the broad vehicle attributes including body style and restraint system in positions 4-8 (the VDS), a check digit in position 9, the model year in position 10, plant detail in position 11, and the unique production sequence in positions 12-17. Decoded that returns the Gigafactory, model year, trim (Long Range, Performance, Standard Range, Juniper), drivetrain (RWD or AWD), and factory equipment. A full Model Y VIN decode adds NMVTIS title-brand history, state-by-state title trail, salvage and total-loss records, and any open NHTSA recall campaigns including the Autopilot remediation (campaign 23V-838).",
  },
  {
    question: "Are Tesla recalls free?",
    answer:
      "Yes. Under federal law (49 U.S.C. § 30120) all manufacturer safety-recall remedies are free for vehicles 15 model years old or newer, regardless of whether the current owner is the original purchaser. That covers every Tesla Model Y ever produced. The good news for Model Y owners is that an estimated 70%+ of Tesla recall remedies since 2020 are delivered as free over-the-air (OTA) software updates — the campaign downloads to the car overnight and you wake up to a fixed vehicle, no dealer visit required. The 2023 power-steering PCB action on certain Model Y vehicles is one of the hardware exceptions and requires a Tesla service-center visit, but the repair itself is free.",
  },
  {
    question: "Which Gigafactory built my Tesla Model Y?",
    answer:
      "Read the first three characters of the Model Y VIN. 5YJ means Gigafactory California (Fremont) — pre-2022 Model Y production. 7SAY means Gigafactory Texas (Austin), opened April 2022 and now the primary North American Model Y plant. LRW means Gigafactory Shanghai, opened December 2019. XP7 means Gigafactory Berlin-Brandenburg, opened March 2022 and Tesla's only EU plant. The MyTesla app does not always surface the plant directly, but the VIN's WMI tells you instantly. North-American-market Model Y is overwhelmingly Fremont or Austin; EU-market Model Y is overwhelmingly Berlin or Shanghai.",
  },
  {
    question: "How do I check Tesla Model Y history by VIN?",
    answer:
      "Run the Model Y VIN through the free decoder on this page and it queries three independent sources in seconds: NMVTIS for the full title-brand chain (salvage, flood, junk, rebuilt, lemon-law buyback, odometer-rollback brands across all 50 state DMVs), the NHTSA recall feed for any open Tesla Model Y campaigns including the Autopilot remediation (23V-838) and the 2023 power-steering PCB action, and Tesla VIN-format records for the Gigafactory, model year, and trim. For deeper accident and damage history, pair the decode with a dedicated accident history check — minor body work paid out of pocket may never appear in NMVTIS, which is why a hands-on inspection by a trusted mechanic is the best partner to any used-Tesla purchase.",
  },
];

export default function TeslaModelYVinDecoderBody() {
  const c = COPY;
  const yearCodes = Object.entries(VIN_YEAR_CODES)
    .filter(([, year]) => year >= 2020)
    .sort(([, a], [, b]) => a - b);

  const wmis = (["5YJ", "7SAY", "LRW", "XP7"] as const).map((k) => ({ code: k, ...TESLA_WMI[k] }));
  const modelYRecalls = TESLA_NOTABLE_RECALLS.filter((r) =>
    (r.affectedModels as readonly string[]).includes("Model Y"),
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
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">Decode This Specific Model Y VIN Right Now</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">You already have a Model Y in mind. Run the VIN against NMVTIS, the NHTSA recall feed, and Tesla&apos;s four-plant WMI map — free, in seconds.</p>
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
            {modelYRecalls.map((r) => (
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

        <RelatedChecks exclude="/tesla-model-y-vin-decoder" />
      </div>
    </article>
  );
}

void TESLA_VIN_RULES;

export { FAQS_EN };
