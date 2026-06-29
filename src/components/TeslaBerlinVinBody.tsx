/**
 * Body for /tesla-berlin-vin — English-only plant-hub page targeting the
 * "tesla berlin vin lookup" keyword. Decodes the XP7 WMI (Gigafactory
 * Berlin-Brandenburg), explains EU-spec Model Y assembly and rare-US-market
 * status, and cross-links to the broader Tesla VIN hub pages.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, MapPin, Cpu, Factory, Calendar, Globe,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";
import { TESLA_PLANTS, TESLA_VIN_RULES } from "@/lib/tesla-data";

const QUICK_ANSWER_ITEMS = [
  {
    question: "What does a Tesla VIN starting with XP7 mean?",
    answer: (
      <>
        <strong>CarCheckerVIN&apos;s</strong> free Tesla Berlin VIN lookup
        confirms any 17-character Tesla VIN beginning with <code>XP7</code> was
        assembled at <strong>Gigafactory Berlin-Brandenburg</strong> in Grünheide,
        Germany. As an NMVTIS-approved data provider, CarCheckerVIN also surfaces
        title brands and open NHTSA recalls for any Berlin-built Model Y in seconds.
      </>
    ),
  },
  {
    question: "Are XP7 Tesla VINs common in the US used market?",
    answer: (
      <>
        No — XP7 Tesla VINs are <strong>rare in the US used market</strong>.
        Gigafactory Berlin builds Model Y exclusively for the EU market. Any XP7
        Tesla on a US lot is a gray-market import, with the warranty, parts, and
        Supercharger implications that go with it.
      </>
    ),
  },
  {
    question: "How do I look up a Gigafactory Berlin Tesla VIN?",
    answer: (
      <>
        Find the 17-character VIN on the lower driver-side windshield, the door
        pillar sticker, or the Tesla app and enter it in the form on this page.
        CarCheckerVIN queries NMVTIS, the NHTSA recall feed, and Tesla VIN-format
        records to confirm XP7 Berlin assembly and surface any title brands or
        open recalls.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Hash, Car, Cpu, AlertTriangle, Globe, Gauge] as const;
const DANGER_ICONS = [Cpu, Shield, Gauge] as const;

const PLANT = TESLA_PLANTS.find((p) => p.slug === "berlin")!;

const COPY = {
  home: "Home",
  crumb: "Tesla Berlin VIN Lookup",
  badge: "Free Tesla Berlin VIN Lookup   ·   XP7 WMI   ·   NMVTIS-Sourced",
  h1Lead: "Tesla Berlin VIN Lookup — ",
  h1Accent: "Decode Any XP7 Model Y and Pull Its History Free.",
  intro:
    "CarCheckerVIN's free Tesla Berlin VIN lookup decodes any 17-character Tesla VIN beginning with XP7 to identify Gigafactory Berlin-Brandenburg as the assembly Gigafactory. As an NMVTIS-approved data provider, CarCheckerVIN also surfaces title brands, NHTSA recalls, and accident records for any Tesla built at Berlin — free, with no credit card. Berlin is Tesla's first European assembly plant, opened in March 2022 in Grünheide, Brandenburg, and produces the Model Y compact SUV exclusively for the European Union market. XP7 VINs are very rare in the US used market — any XP7 Tesla on a US lot is a gray-market import. Enter a 17-character XP7 VIN below and we'll run the lookup against NMVTIS in seconds.",
  formHeading: "Free Tesla Berlin VIN Lookup — Search Any XP7 Tesla VIN",
  formSub:
    "Enter a 17-character Tesla VIN starting with XP7 and we'll decode the model year, trim, and drivetrain, confirm Gigafactory Berlin-Brandenburg assembly, and check NMVTIS for title brands and NHTSA for open recalls.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Database, value: "NMVTIS", label: "title history" },
    { icon: Factory, value: "XP7", label: "Gigafactory Berlin" },
    { icon: Shield, value: "NHTSA", label: "recall feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Tesla Berlin VIN Lookup Works",
  howIntro:
    "A Tesla Berlin VIN lookup is a three-step job. You supply the 17-character VIN beginning with XP7; we read the WMI for the plant, position 10 for the model year, the VDS for the model and trim, then query NMVTIS for title brands and NHTSA for any open Tesla recall campaigns. The full lookup runs in seconds against the same VIN-keyed records Tesla service centers use.",
  howSteps: [
    {
      tag: "Step 1",
      title: "Enter the XP7 Tesla VIN",
      body:
        "Paste the 17-character Tesla VIN from the windshield, driver-side door pillar, the Tesla app, or the title document. Our Berlin VIN lookup validates that it is exactly 17 characters and excludes the letters I, O, and Q per FMVSS 565 before running.",
    },
    {
      tag: "Step 2",
      title: "We confirm Berlin assembly + query the records",
      body:
        "Your Tesla Berlin VIN check reads the XP7 WMI to confirm Gigafactory Berlin-Brandenburg assembly, decodes the model year at position 10, identifies the Model Y at the VDS, then queries NMVTIS — the federal aggregator that pulls all 50 state DMVs, insurers, and salvage auctions — plus the live NHTSA recall feed for the Tesla VIN.",
    },
    {
      tag: "Step 3",
      title: "Read the Berlin Tesla report",
      body:
        "You see the decoded Gigafactory Berlin-Brandenburg assembly, model year, trim, drivetrain, title-brand summary, ownership-state chain, and any open NHTSA Tesla recalls — including the Autopilot OTA remediation (campaign 23V-838) and the touchscreen visibility action (24V-051).",
    },
  ],
  h2Plant: "Gigafactory Berlin-Brandenburg — Tesla's First European Plant",
  plantIntro:
    "Gigafactory Berlin-Brandenburg opened in March 2022 in Grünheide, a forested suburb southeast of Berlin in the German state of Brandenburg. It is Tesla's first European assembly plant and was built to serve the EU market with locally-produced Model Y vehicles, reducing reliance on Shanghai exports for European customers and shortening delivery times across the continent.",
  plantP2:
    "Every Berlin Tesla carries a VIN beginning with the XP7 World Manufacturer Identifier. XP7 is assigned exclusively to Tesla Germany under the SAE J853 standard and confirms the country of origin (Germany), the manufacturer (Tesla), and the assembly plant in a single three-character prefix. If a Tesla VIN does not start with XP7, it was not built at Berlin — full stop.",
  plantP3:
    "Berlin builds the Model Y compact SUV exclusively. It does not produce Model S, Model 3, Model X, Cybertruck, or Roadster — any seller claiming those models from Berlin is misreading or misrepresenting the VIN. The plant has faced public debate over forest-clearance permits granted for the original construction and over its water-usage allocations in the Brandenburg region — both topics are extensively covered in German press without affecting the VIN-level legitimacy of the vehicles the plant produces.",
  plantCardTitle: "Gigafactory Berlin at a glance",
  plantRows: [
    { label: "WMI", value: PLANT.wmi },
    { label: "Country", value: PLANT.country },
    { label: "Opened", value: String(PLANT.opened) },
    { label: "Models built", value: "Model Y (EU)" },
    { label: "Region served", value: "European Union" },
  ],
  plantCardNote:
    "One 17-character XP7 VIN, every Berlin detail. The full Tesla Berlin VIN lookup runs in seconds and never asks for an account.",
  h2Decode: "Decoding an XP7 Tesla VIN Position by Position",
  decodeIntro:
    "The 17 characters of an XP7 Tesla VIN follow the federal VIN standard (49 CFR Part 565, ISO 3779). Each position carries specific information about the Berlin-built Tesla — here is the breakdown you can apply to any XP7 VIN on a windshield or title.",
  decodeRows: [
    { code: "1-3", meaning: "WMI = XP7 — Tesla, built in Germany at Gigafactory Berlin-Brandenburg. Confirms country, manufacturer, and plant in a single prefix per SAE J853." },
    { code: "4-8", meaning: "VDS — vehicle descriptor section encoding the Model Y body style, restraint system, and high-voltage battery configuration." },
    { code: "9", meaning: "Check digit — a federally-required mathematical checksum that catches typos and fraudulent VIN edits. If position 9 does not validate, the VIN is wrong or has been tampered with." },
    { code: "10", meaning: "Model year — N=2022, P=2023, R=2024, S=2025, T=2026. Berlin started Model Y production in March 2022, so the earliest legitimate position-10 code is N (2022)." },
    { code: "11", meaning: "Plant code — narrows assembly within Berlin (Tesla uses a single Berlin code in practice, but the position is reserved per standard)." },
    { code: "12-17", meaning: "Production sequence — the unique six-digit serial that distinguishes one Berlin Tesla from the next off the same line." },
  ],
  decodeTail: `Tesla VINs use the standard 17-character length, exclude the letters I, O, Q (and Z, U, 0 in the year position) per ${TESLA_VIN_RULES.standard}, and follow the same rules every post-1981 vehicle does. If a Berlin VIN you are checking starts with XP7 but the seller swears the car was assembled in Fremont or Shanghai, the VIN disagrees — and the VIN is right.`,
  h2Where: "Where to Find Your Tesla Berlin VIN",
  where1Pre: "Most people get stuck before they even start a Tesla Berlin VIN lookup because they cannot find the VIN on the car. Good news — every Tesla prints the VIN in ",
  where1Bold: "at least four places",
  where1Suffix: ", and any one of them is enough to run a free Berlin VIN check.",
  where2:
    "The fastest spot is the lower corner of the windshield on the driver's side — look through the glass from outside the Tesla. The driver-side door pillar sticker is the second-easiest and is required on every Tesla regardless of plant. The Tesla app prints the VIN inside the Vehicle tab once the car is associated with your account, and the title or import-paperwork document and insurance card print it as well.",
  where3:
    "Berlin-built Model Y sold inside the EU also prints the VIN at the base of the windshield on the dashboard, visible from outside through the glass. If the VIN on the dashboard does not match the VIN on the Tesla title or import paperwork, stop. Gray-market import fraud sometimes involves cloned VINs — exactly the kind of thing a Tesla Berlin VIN lookup is designed to catch.",
  whereCardTitle: "Five places the Berlin Tesla VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door pillar sticker",
    "Tesla app · Vehicle tab",
    "Title document / import paperwork",
    "Insurance ID card and registration",
  ],
  whereCardNote: "Found it? Drop the XP7 VIN into the form above and run a free Tesla Berlin VIN lookup against NMVTIS in seconds.",
  h2GrayMarket: "Berlin Teslas in the US Market — Why XP7 VINs Are Rare",
  grayIntro:
    "Gigafactory Berlin was built for the EU market, not the US. XP7 VINs are uncommon on US used-car lots, and the ones that do appear are gray-market imports with real implications for warranty, Supercharger access, and parts availability.",
  grays: [
    {
      title: "EU-only production — US-spec models come from Fremont/Austin",
      body:
        "Berlin's Model Y production is allocated to EU customers under Tesla's regional manufacturing strategy. US-bound Model Y vehicles are built at Fremont (5YJ, pre-2022) or Austin (7SAY, 2022 and later). If a US dealer is selling an XP7 Model Y, it was imported after first being sold in the EU — that is a gray-market vehicle by definition.",
    },
    {
      title: "Tesla US warranty does not transfer to gray-market Berlins",
      body:
        "Tesla's New Vehicle Limited Warranty is sold per market. A Berlin-built Tesla originally delivered in Germany, France, or any other EU country carries warranty terms from that region — and Tesla USA's standard 4-year / 50,000-mile basic and 8-year battery / drive-unit warranties do not transfer to a gray-market XP7 import.",
    },
    {
      title: "CCS2 charging hardware requires adapters in North America",
      body:
        "Berlin Teslas ship with the EU-standard CCS2 fast-charge port. US Superchargers (and the NACS network) require either a physical adapter or a hardware retrofit before a Berlin Model Y can use them. Adapters exist, but session billing, software handshake, and warranty implications differ from US-spec NACS-equipped vehicles.",
    },
  ],
  grayNoteBoldLead: "Buying a gray-market Berlin Tesla?",
  grayNoteMid1: " Pair this Tesla Berlin VIN lookup with a focused ",
  grayNoteLink1: "accident history check",
  grayNoteMid2: " and a ",
  grayNoteLink2: "salvage title check",
  grayNoteSuffix: " — gray-market vehicles sometimes carry overseas damage history that never reached US insurers.",
  h2Signs: "When You Should Run a Tesla Berlin VIN Lookup",
  signsIntro:
    "A Tesla Berlin VIN lookup is cheap insurance — actually free — for anyone making a decision about a specific XP7 Tesla. Six situations where it pays to lookup the Berlin Tesla VIN before you commit.",
  signs: [
    { title: "Before buying an XP7 Model Y in the EU", body: "European private-party Model Y sellers don't always have full title context. A free Tesla Berlin VIN lookup confirms the XP7 WMI, the model year encoded at position 10, and surfaces any open Tesla recalls applicable to the EU-spec Model Y." },
    { title: "Shopping a gray-market XP7 at a US dealer", body: "Even franchise lots inherit gray-market Teslas at auction. A quick Berlin VIN check tells you whether the Model Y came with a title brand, a prior accident, or unresolved Autopilot or touchscreen recalls before you negotiate." },
    { title: "Decoding the EU trim on a Berlin Model Y", body: "Berlin Model Y trims include Long Range AWD, Performance, and the EU-only RWD variant. The decoder portion of the lookup returns the factory-installed trim so you can compare apples to apples on a Berlin-built Model Y." },
    { title: "Confirming an EU import claim", body: "Sellers sometimes claim a Berlin Tesla was imported from Norway, the UK, or another EU/EEA market. The VIN itself cannot tell you the destination market, but a Berlin VIN lookup combined with the title chain often surfaces overseas registrations." },
    { title: "Checking a Berlin import for prior damage", body: "Damage that happened in Europe before import may not be in NMVTIS — but a Tesla Berlin VIN check still surfaces any US-recorded incidents and any title brands applied since the XP7 Tesla cleared customs." },
    { title: "Verifying an insurance quote on an XP7 Tesla", body: "US insurers price by VIN. Running a free Tesla Berlin VIN lookup confirms the year, trim, and safety equipment they used — and catches mistakes that inflate premiums on a gray-market Model Y." },
  ],
  midCtaHeading: "Lookup This Specific Berlin Tesla VIN Right Now",
  midCtaSub: "You already have an XP7 Tesla in mind. Run the VIN against NMVTIS, the NHTSA recall feed, and our decoder — free, in seconds. No sign-up.",
  h2Quirks: "Berlin Tesla Quirks Worth Knowing",
  quirks: [
    { title: "Structural battery + 4680 cells", body: "Berlin Model Y was the first Tesla to use the 4680 structural battery pack as a load-bearing chassis element, paired with single-piece front and rear gigacastings. That construction reduces parts count and improves crash performance, but it also means body repair after a significant collision is more involved (and more expensive) than on earlier Model Y builds." },
    { title: "Autopilot hardware HW3 vs HW4", body: "Berlin Model Y vehicles built before April 2023 shipped with Autopilot HW3; later builds carry HW4. The VIN does not encode hardware revision directly, but the build date plus a Tesla service VIN check confirms HW3 vs HW4. Full Self-Driving (FSD) transfer between cars requires matching hardware tiers." },
    { title: "EU-spec safety + lighting equipment", body: "Berlin Model Y ships with EU-spec amber turn signals, headlight beam patterns conforming to ECE rather than SAE, and EU-mandated emergency-call (eCall) hardware. A US-imported Berlin Model Y may need retrofits to pass state inspection in stricter jurisdictions. A Berlin VIN lookup helps surface the configuration before purchase." },
    { title: "Right-hand vs left-hand drive", body: "Berlin builds both left-hand-drive (continental EU) and right-hand-drive (UK, Ireland) Model Y. The VIN's VDS encodes restraint configuration which corresponds with steering side. Right-hand-drive Berlin Model Y vehicles are particularly unusual on US lots — a strong signal a Berlin VIN lookup is warranted." },
  ],
  h2Internal: "Related Tesla VIN Pages That Build On Your Berlin Lookup",
  internalIntro: "A Tesla Berlin VIN lookup is the plant-specific entry point. These related Tesla pages dig deeper when you have a Model Y from Berlin — or when you want to compare Gigafactory output across plants.",
  internalLinks: [
    { href: "/tesla-vin-lookup", label: "Tesla VIN Lookup (Hub)", desc: "The top-of-funnel Tesla VIN lookup hub — covers every plant, every model, full history report." },
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Decode any Tesla VIN by Gigafactory, year, trim, and Autopilot hardware tier." },
    { href: "/tesla-vin-history-check", label: "Tesla Vehicle History Check", desc: "Title brands, accidents, odometer integrity, and recalls for any Tesla VIN." },
    { href: "/tesla-fremont-vin", label: "Tesla Fremont VIN Lookup", desc: "Lookup the 5YJ WMI — Tesla's original California plant, Model S/3/X/Y." },
    { href: "/tesla-austin-vin", label: "Tesla Austin VIN Lookup", desc: "Lookup the 7SAY WMI — Cybertruck and post-2022 Model Y from Gigafactory Texas." },
    { href: "/tesla-shanghai-vin", label: "Tesla Shanghai VIN Lookup", desc: "Lookup the LRW WMI — Model 3 and Model Y from Gigafactory Shanghai." },
    { href: "/tesla-model-3-vin-decoder", label: "Tesla Model 3 VIN Decoder", desc: "Model 3-specific decoder covering Fremont (5YJ) and Shanghai (LRW) builds." },
    { href: "/tesla-model-y-vin-decoder", label: "Tesla Model Y VIN Decoder", desc: "Model Y-specific decoder covering all four Gigafactories that build the Model Y." },
    { href: "/tesla-model-s-vin-decoder", label: "Tesla Model S VIN Decoder", desc: "Decode the 5YJ Model S — Tesla's flagship sedan from Fremont only." },
    { href: "/tesla-model-x-vin-decoder", label: "Tesla Model X VIN Decoder", desc: "Falcon-wing Model X decoder — Fremont 5YJ exclusive." },
    { href: "/tesla-cybertruck-vin-decoder", label: "Tesla Cybertruck VIN Decoder", desc: "Decode the 7SAY Cybertruck — Austin-only stainless-steel pickup." },
    { href: "/tesla-roadster-vin-decoder", label: "Tesla Roadster VIN Decoder", desc: "Decode the original 2008-2012 Roadster and second-gen reservations." },
    { href: "/tesla-model-3-recall-check", label: "Tesla Model 3 Recall Check", desc: "Open NHTSA recalls attached to a specific Model 3 VIN." },
    { href: "/tesla-model-y-recall-check", label: "Tesla Model Y Recall Check", desc: "Open NHTSA recalls attached to a specific Model Y VIN — including Berlin builds." },
    { href: "/tesla-model-s-recall-check", label: "Tesla Model S Recall Check", desc: "Open recalls for the 5YJ Model S — Autopilot OTA, touchscreen visibility, and more." },
    { href: "/tesla-model-x-recall-check", label: "Tesla Model X Recall Check", desc: "Open recalls for the 5YJ Model X — falcon-wing and front-trunk latch actions." },
    { href: "/tesla-cybertruck-recall-check", label: "Tesla Cybertruck Recall Check", desc: "Open recalls for the 7SAY Cybertruck — accelerator pedal and trim actions." },
    { href: "/tesla-roadster-recall-check", label: "Tesla Roadster Recall Check", desc: "Open recalls on the original first-generation Tesla Roadster." },
    { href: "/tesla-model-3-history-check", label: "Tesla Model 3 History Check", desc: "Full title and accident history for any Model 3 VIN." },
    { href: "/tesla-model-y-history-check", label: "Tesla Model Y History Check", desc: "Full title and accident history for any Model Y VIN across all four plants." },
    { href: "/tesla-model-s-history-check", label: "Tesla Model S History Check", desc: "Title brands, accidents, and ownership chain for any Model S VIN." },
    { href: "/tesla-model-x-history-check", label: "Tesla Model X History Check", desc: "Title brands, accidents, and ownership chain for any Model X VIN." },
    { href: "/tesla-cybertruck-history-check", label: "Tesla Cybertruck History Check", desc: "Title and accident history for the 7SAY Cybertruck." },
    { href: "/tesla-roadster-history-check", label: "Tesla Roadster History Check", desc: "Title and accident history for the original Tesla Roadster." },
    { href: "/recall-check", label: "General Recall Check", desc: "Any-make open NHTSA recall lookup — useful for non-Tesla vehicles." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Confirm whether a Berlin Tesla VIN carries a salvage, junk, or non-repairable brand." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Check whether an XP7 Tesla was branded flood or water-damaged in any US state." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims on the Tesla VIN." },
    { href: "/odometer-check", label: "Odometer Check", desc: "Track mileage history and spot rollbacks across the Berlin Tesla title chain." },
    { href: "/vin-check", label: "Full VIN Check", desc: "Upgrade to a complete VIN history report on any Tesla VIN when the free lookup raises a flag." },
  ],
  h2Faq: "Tesla Berlin VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions buyers ask most when they want to lookup an XP7 Tesla VIN for the first time.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Ready to Lookup a Berlin Tesla VIN?",
  ctaBottomSub: "Enter any 17-character Tesla VIN starting with XP7 to run a free Tesla Berlin VIN lookup against NMVTIS, the NHTSA recall feed, and our decoder. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "What does a Tesla VIN starting with XP7 mean?", answer: "A Tesla VIN starting with XP7 means the vehicle was assembled at Gigafactory Berlin-Brandenburg in Grünheide, Germany. XP7 is the World Manufacturer Identifier (WMI) assigned to Tesla Germany under the SAE J853 standard. The first three characters of any Tesla VIN identify the plant, the country of origin, and the manufacturer in a single prefix. Only the Tesla Model Y is built at Berlin — if a seller claims a Berlin-built Model S, Model 3, Model X, Cybertruck, or Roadster, the VIN is wrong or the seller is misrepresenting the car. A free Tesla Berlin VIN lookup confirms XP7 assembly in seconds." },
  { question: "When did Gigafactory Berlin start producing Teslas?", answer: "Gigafactory Berlin-Brandenburg opened in March 2022 in Grünheide, a forested suburb southeast of Berlin. It was Tesla's first European assembly plant and was built to serve the EU market with locally-produced Model Y vehicles. The earliest legitimate XP7 VINs therefore carry a model-year code of N (2022) at position 10, followed by P (2023), R (2024), S (2025), and T (2026). Any XP7 VIN claiming a year before 2022 is invalid — the plant did not exist." },
  { question: "Are XP7 Tesla VINs common in the United States?", answer: "No — XP7 Tesla VINs are very rare in the US used market because Gigafactory Berlin produces Model Y exclusively for the European Union. US-bound Model Y vehicles come from Fremont (5YJ, pre-2022) or Austin (7SAY, 2022 and later). Any XP7 Model Y on a US lot is a gray-market import that was first sold in Europe and later shipped to the United States. Gray-market imports carry distinct warranty, charging, and parts implications. Always run a free Tesla Berlin VIN lookup before buying any XP7 Tesla in the US." },
  { question: "How do I look up a Gigafactory Berlin Tesla VIN?", answer: "Find the 17-character VIN on the lower driver-side corner of the windshield, the driver-side door pillar sticker, the Tesla app under the Vehicle tab, or the title document. Enter it into the free Tesla Berlin VIN lookup form on this page. The tool validates the format, reads the XP7 WMI to confirm Gigafactory Berlin-Brandenburg assembly, decodes the model year at position 10, identifies the Model Y trim from the VDS, then queries NMVTIS for title brands and the NHTSA recall feed for open Tesla campaigns. Results return in seconds with no account required." },
  { question: "Does Tesla's US warranty cover Berlin-built Model Y?", answer: "Tesla's New Vehicle Limited Warranty is sold per market and does not transfer between regions. A Berlin-built Tesla originally delivered in Germany, France, Norway, or any other EU country carries warranty coverage from that original market only — Tesla USA's standard 4-year / 50,000-mile basic warranty and 8-year battery / drive-unit warranty do not transfer to gray-market XP7 imports. Tesla US service centers can usually perform paid service on Berlin vehicles but parts ordering goes through different supply channels. A free Tesla Berlin VIN lookup helps confirm the original market of sale before you commit." },
  { question: "Can a Berlin Tesla use US Superchargers?", answer: "Berlin Model Y vehicles ship with the EU-standard CCS2 fast-charge port. To use US Superchargers or the broader NACS network, a Berlin Tesla needs either a physical CCS2-to-NACS adapter or a hardware retrofit. Adapters exist and many gray-market Berlin owners successfully Supercharge using them, but session billing, software handshake behavior, and any warranty implications differ from US-spec NACS-equipped vehicles. A Berlin VIN lookup confirms the original-market hardware configuration." },
  { question: "How do I check Tesla recalls on a Berlin-built car?", answer: "Run the XP7 Tesla VIN through the free Tesla Berlin VIN lookup form on this page and it will surface any open NHTSA safety recalls attached to the VIN through the live recall feed. Recalls remain attached to the VIN until the work is completed, even after a vehicle has been imported. Common open Tesla recalls touching Berlin-built Model Y include the Autopilot OTA remediation (campaign 23V-838, ~2 million vehicles), the touchscreen rearview-camera visibility action (24V-051, ~2.2 million vehicles), and the 2023 Model Y power steering campaign. Most Tesla recalls are remediated by free over-the-air software updates with no service-center visit required." },
];

export default function TeslaBerlinVinBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Factory className="w-4 h-4" /> {c.badge}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Plant}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.plantIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{c.plantP2}</p>
              <p>{c.plantP3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Factory className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.plantCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.plantRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.plantCardNote}</p>
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
                  <code className="font-mono font-black text-primary text-base flex-shrink-0 w-14">{r.code}</code>
                  <span className="text-on-surface-variant text-xs sm:text-sm leading-relaxed">{r.meaning}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-3xl">{c.decodeTail}</p>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2GrayMarket}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.grayIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.grays.map((item, i) => {
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
                <strong className="text-on-surface">{c.grayNoteBoldLead}</strong>
                {c.grayNoteMid1}
                <Link href="/accident-history-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.grayNoteLink1}</Link>
                {c.grayNoteMid2}
                <Link href="/salvage-title-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.grayNoteLink2}</Link>
                {c.grayNoteSuffix}
              </p>
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

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Quirks}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.quirks.map((q) => (
              <div key={q.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-5 h-5 text-primary" />
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary">{q.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{q.body}</p>
              </div>
            ))}
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

        <RelatedChecks exclude="/tesla-berlin-vin" />
      </div>
    </article>
  );
}

export { FAQS_EN };
