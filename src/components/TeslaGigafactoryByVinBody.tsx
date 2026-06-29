/**
 * Body for /tesla-gigafactory-by-vin — English-only WMI-to-plant decoder
 * for any Tesla VIN. Mirrors ToyotaVinLookupBody's structure with copy
 * pivoted to the four Gigafactory mappings (5YJ Fremont, 7SAY Austin,
 * LRW Shanghai, XP7 Berlin) and cross-links to the per-plant pages.
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
import { TESLA_WMI, TESLA_PLANTS } from "@/lib/tesla-data";

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I know which Gigafactory built my Tesla?",
    answer: (
      <>
        Read the first three characters of the 17-character Tesla VIN — the
        World Manufacturer Identifier. <strong>5YJ</strong> is Gigafactory
        California (Fremont), <strong>7SAY</strong> is Gigafactory Texas
        (Austin), <strong>LRW</strong> is Gigafactory Shanghai, and{" "}
        <strong>XP7</strong> is Gigafactory Berlin. <strong>CarCheckerVIN</strong>{" "}
        decodes the WMI free, instantly.
      </>
    ),
  },
  {
    question: "Why does the Gigafactory matter on a used Tesla?",
    answer: (
      <>
        Shanghai-built (<strong>LRW</strong>) Teslas in the US are usually
        gray-market imports without Tesla USA warranty or Supercharger billing
        defaults set to North America. Berlin-built (<strong>XP7</strong>) VINs
        in the US are extremely rare and almost always import questions.
        Fremont (5YJ) and Austin (7SAY) builds are the standard North-American
        market vehicles.
      </>
    ),
  },
  {
    question: "Is the Tesla Gigafactory VIN decoder free?",
    answer: (
      <>
        Yes. CarCheckerVIN&apos;s Tesla Gigafactory decoder is free with no
        sign-up. It reads the WMI per the federal SAE J853 standard and returns
        the plant, country, opening year, and which Tesla models are built
        there. Pair it with our recall check and history report for full
        pre-purchase due diligence.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Hash, Car, Cpu, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [Cpu, Shield, Gauge] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Gigafactory by VIN",
  badge: "Free Tesla Gigafactory Decoder   ·   WMI → Plant",
  h1Lead: "Tesla Gigafactory by VIN — ",
  h1Accent: "Decode 5YJ, 7SAY, LRW, XP7 in Seconds.",
  intro: "CarCheckerVIN's free Tesla Gigafactory decoder identifies which of Tesla's four Gigafactories — California (Fremont, WMI 5YJ), Texas (Austin, WMI 7SAY), Shanghai (WMI LRW), or Berlin (WMI XP7) — assembled any 17-character Tesla VIN. As an NMVTIS-approved data provider, CarCheckerVIN reads the World Manufacturer Identifier (positions 1-3 of the VIN) per the federal SAE J853 standard. Knowing the Gigafactory matters: Shanghai builds imported into the US are usually gray-market vehicles without Tesla USA warranty, and Berlin builds in the US are almost always import questions. Enter a Tesla VIN below and we'll surface the plant in seconds. No account, no card, no catch.",
  formHeading: "Free Tesla Gigafactory Decoder — Lookup Any 17-Character Tesla VIN",
  formSub: "Enter the Tesla VIN and we'll read the WMI (positions 1-3) to identify the assembly Gigafactory — Fremont, Austin, Shanghai, or Berlin.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: MapPin, value: "4", label: "Tesla Gigafactories" },
    { icon: Database, value: "SAE J853", label: "WMI standard" },
    { icon: Shield, value: "NMVTIS", label: "approved provider" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How the Tesla Gigafactory VIN Decoder Works",
  howIntro: "The Tesla Gigafactory decoder is the simplest VIN lookup we run. The first three characters of any VIN are the World Manufacturer Identifier, and Tesla uses a different WMI for each of its four assembly plants. Three steps from VIN to plant.",
  howSteps: [
    { tag: "Step 1", title: "Enter the Tesla VIN", body: "Type or paste the 17-character VIN from the lower windshield, the driver-side door jamb sticker, the Tesla title, or your MyTesla app vehicle profile. The first three characters are all the decoder needs to identify the Gigafactory." },
    { tag: "Step 2", title: "We read the WMI", body: "Your Tesla VIN's first three characters get matched against the SAE J853 World Manufacturer Identifier registry. Tesla uses 5YJ for Fremont, 7SAY for Austin, LRW for Shanghai, and XP7 for Berlin. Each WMI is unique to one plant." },
    { tag: "Step 3", title: "Read the Gigafactory profile", body: "You'll see the plant name, country, opening year, and the Tesla models that come out of that plant — Fremont builds Model S, 3, X, and pre-2022 Model Y; Austin builds post-2022 Model Y and Cybertruck; Shanghai builds export Model 3 and Model Y; Berlin builds EU-market Model Y." },
  ],
  h2Title: "What the Tesla Gigafactory Decoder Reveals",
  titleIntro: "A Tesla Gigafactory by VIN lookup returns the same WMI-level data Tesla service centers, customs brokers, and state DMVs already rely on, presented for a buyer rather than a back-office system. Here is what comes back when you decode a Tesla VIN through the lookup.",
  title1Pre: "First, the decoder reads the ",
  title1Bold1: "World Manufacturer Identifier",
  title1Mid: " — positions 1-3 of the Tesla VIN. The WMI alone tells you the country of origin and the specific Gigafactory. The next characters describe the ",
  title1Bold2: "model line and trim attributes",
  title1Mid2: " (positions 4-8), the model year (position 10), and the unique ",
  title1Bold3: "production sequence",
  title1Suffix: " (positions 12-17). The WMI is what we surface in the Gigafactory result.",
  title2Pre: "Second, the lookup returns the ",
  title2Bold: "Gigafactory profile",
  title2Suffix: " behind that WMI: the plant name, its country and US state (or foreign province), the year Tesla opened the plant, and the Tesla models the plant currently builds. For Fremont the answer is Model S, 3, X, and pre-2022 Model Y; for Austin it's post-2022 Model Y and Cybertruck; for Shanghai it's export Model 3 and Model Y; for Berlin it's EU-market Model Y.",
  title3: "Third, the result flags whether the VIN's Gigafactory is normal for the current US registration. A Shanghai-built (LRW) Tesla currently titled in a US state is almost always a gray-market import — buyer beware on Tesla USA warranty, Supercharger account regions, and EPA compliance. Berlin-built (XP7) Teslas in the US are even rarer and warrant the same import scrutiny. Fremont and Austin VINs are the expected North-American market builds.",
  pathCardTitle: "What you get from one Tesla VIN",
  pathRows: [
    { label: "WMI prefix", value: "5YJ · 7SAY · LRW · XP7" },
    { label: "Gigafactory", value: "Fremont · Austin · Shanghai · Berlin" },
    { label: "Tesla models built", value: "S · 3 · X · Y · CT" },
  ],
  pathCardNote: "One 17-character Tesla VIN, three layers of plant insight. The whole Tesla Gigafactory decode runs in seconds and never asks for an account.",
  h2Decode: "Tesla WMI → Gigafactory Map",
  decodeIntro: "The first three characters of any Tesla VIN — the World Manufacturer Identifier — tell you exactly which Gigafactory assembled the car under the SAE J853 standard. Tesla uses four distinct WMIs because each plant is a separately-coded manufacturing facility.",
  decodeRows: [
    { code: "5YJ", meaning: `${TESLA_WMI["5YJ"].plant} (${TESLA_WMI["5YJ"].country}) — builds ${TESLA_WMI["5YJ"].models.join(", ")}. ${TESLA_WMI["5YJ"].note}` },
    { code: "7SAY", meaning: `${TESLA_WMI["7SAY"].plant} (${TESLA_WMI["7SAY"].country}) — builds ${TESLA_WMI["7SAY"].models.join(", ")}. ${TESLA_WMI["7SAY"].note}` },
    { code: "LRW", meaning: `${TESLA_WMI.LRW.plant} (${TESLA_WMI.LRW.country}) — builds ${TESLA_WMI.LRW.models.join(", ")}. ${TESLA_WMI.LRW.note}` },
    { code: "XP7", meaning: `${TESLA_WMI.XP7.plant} (${TESLA_WMI.XP7.country}) — builds ${TESLA_WMI.XP7.models.join(", ")}. ${TESLA_WMI.XP7.note}` },
  ],
  decodeTail: "After the WMI, position 10 of the Tesla VIN encodes the model year (P = 2023, R = 2024, S = 2025, T = 2026) and positions 4-8 describe the model line, body, and restraint system. The combined VIN is the unique fingerprint Tesla, NHTSA, and NMVTIS all rely on. If the WMI says one Gigafactory but the seller swears the car was built somewhere else, the VIN disagrees — and the VIN is right.",
  h2Signs: "When You Should Decode a Tesla Gigafactory by VIN",
  signsIntro: "A Tesla Gigafactory decode is cheap insurance — actually free — for anyone considering a specific Tesla. Six situations where the WMI lookup pays off before you commit.",
  signs: [
    { title: "Before you buy a used Tesla private-party", body: "The seller's word is not the WMI. Run a Tesla Gigafactory decode before you hand over a deposit and you'll know if you're buying a normal Fremont or Austin build, or an imported Shanghai or Berlin Tesla that may not carry Tesla USA warranty." },
    { title: "Shopping a Tesla import or gray-market listing", body: "Listings of Shanghai-built (LRW) Teslas appear regularly on US auction sites and import-broker pages. A Gigafactory decode confirms the plant before you bid, and tells you whether the unit is the China-spec or the export-spec build." },
    { title: "Confirming a Cybertruck is genuine Austin (7SAY)", body: "All Tesla Cybertrucks are built at Gigafactory Texas (WMI 7SAY). If the VIN starts with anything else, the listing is wrong or the truck is mis-identified. The Gigafactory decode is the fastest sanity check." },
    { title: "Checking an inherited or gifted Tesla", body: "Inheriting or being gifted a Tesla? A free Gigafactory decode tells you the plant, country, and build family before you put your name on the title — handy if the previous owner traveled overseas and brought back a unit." },
    { title: "Verifying a Tesla auction lot vehicle", body: "Salvage and dealer auctions often list Teslas with vague or wrong country fields. A Gigafactory decode from the VIN cuts through the listing copy and tells you exactly where the car was built." },
    { title: "Spotting a fake or cloned Tesla VIN", body: "Cloned Tesla VINs sometimes copy the WMI from one car onto a different one. If the WMI says Fremont but the car carries Cybertruck badging (Austin-only), the VIN is a clone. The Gigafactory decode is one of the cheapest fraud checks available." },
  ],
  midCtaHeading: "Decode This Specific Tesla VIN Right Now",
  midCtaSub: "You already have a Tesla in mind. Decode the WMI against the federal SAE J853 standard and our Gigafactory map — free, in seconds, no sign-up.",
  h2Where: "Where to Find a Tesla VIN Before You Decode the Gigafactory",
  where1Pre: "The Tesla VIN is printed in ",
  where1Bold: "at least five places",
  where1Suffix: " on every Tesla sold worldwide, and any one of them is enough to decode the Gigafactory. The first three characters of any of these copies are the WMI we read.",
  where2: "The fastest spot is the lower corner of the windshield on the driver's side — look through the glass from outside the Tesla. The driver-side door jamb sticker is the second-easiest. The Tesla title document and the insurance ID card both print the VIN, and the MyTesla mobile app shows it on the vehicle profile screen alongside the firmware version and Autopilot hardware revision.",
  where3: "If the WMI on the dashboard does not match the WMI on the Tesla title, stop. That mismatch is a strong signal that something is wrong with the vehicle's identity — a re-titled Tesla, a clone, or a paperwork error. Exactly the kind of thing a Gigafactory decode (and a full Tesla VIN history check) is designed to catch.",
  whereCardTitle: "Five places the Tesla VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "Tesla title document",
    "MyTesla app — vehicle profile screen",
    "Insurance ID card and state registration",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free Tesla Gigafactory decode against the federal SAE J853 WMI registry in seconds.",
  h2Danger: "Why the Gigafactory Matters — Imports, Warranty, and Supercharging",
  dangerIntro: "Knowing which of the four Tesla Gigafactories built a specific car is more than trivia. The plant determines warranty coverage, Supercharger account region, EPA compliance, and resale value in the US market.",
  dangers: [
    { title: "Shanghai (LRW) gray-market imports", body: "Shanghai-built Model 3 and Model Y units are common on Chinese, EU, and APAC roads but are not officially sold in the US. When they appear in US listings, they are gray-market imports — usually without Tesla USA warranty coverage, without an active Supercharger billing region set to North America, and sometimes without EPA compliance certification. A Gigafactory decode flags the LRW WMI before you commit." },
    { title: "Berlin (XP7) European-spec units", body: "Berlin-built Model Y units are the EU-market Tesla. They occasionally show up in US auctions through expat returns or import brokers. Berlin builds carry European-spec lighting, regional Supercharger defaults, and EU regulatory compliance. Verify Tesla USA warranty and EPA paperwork before purchase if the WMI reads XP7." },
    { title: "Fremont vs Austin — same warranty, different model mix", body: "Fremont (5YJ) and Austin (7SAY) Teslas are both standard North-American market vehicles with full Tesla USA warranty coverage. The difference is the model mix: Fremont builds Model S, 3, X, and pre-2022 Model Y; Austin builds post-2022 Model Y and the Cybertruck. The Gigafactory decode confirms which production family the unit comes from." },
  ],
  dangerNoteBoldLead: "Buying a used Tesla?",
  dangerNoteMid1: " Pair this Tesla Gigafactory decode with a focused ",
  dangerNoteLink1: "Tesla recall check",
  dangerNoteMid2: " and a ",
  dangerNoteLink2: "full Tesla VIN decoder",
  dangerNoteSuffix: " for a complete pre-purchase picture before you put money down.",
  h2Certified: "Tesla Gigafactory Decode vs Full Tesla VIN History",
  cert1Pre: "Tesla's MyTesla app surfaces the Gigafactory implicitly through firmware regional defaults, but it does not expose the WMI mapping the way an independent Tesla Gigafactory decoder does. A WMI decode is enough to confirm the plant and country of origin in five seconds — useful for sanity-checking a private-party listing or an auction lot — but it ",
  cert1Bold: "does not replace a full VIN-level history check",
  cert1Suffix: ". The Gigafactory decode confirms where the car was built; a full Tesla VIN history confirms what has happened to it since.",
  cert2Pre: "A free Tesla Gigafactory decode catches the things a simple model badge does not surface: a Shanghai-built Model 3 wearing US-market badges, a Berlin-built Model Y on an expat-import paper trail, or a cloned VIN where the WMI does not match the body type. Pair the WMI lookup with a focused ",
  cert2Bold: "per-plant Tesla page",
  cert2Mid: " — for example our ",
  cert2Link1: "Tesla Fremont VIN page",
  cert2Mid2: " — and a full ",
  cert2Link2: "Tesla VIN decoder",
  cert2Suffix: " for trim, motor count, and Autopilot hardware revision.",
  cert3: "Either way, double-check the VIN itself. Compare the VIN on the Tesla dashboard against the door jamb sticker, the title, and the MyTesla app. If even one digit is off across those sources — especially in the first three (WMI) characters — the Tesla may not be what the paperwork says it is.",
  certCardTitle: "Tesla pre-purchase Gigafactory checklist",
  certChecklist: [
    "Confirm the VIN matches across dashboard, door jamb, title, and MyTesla app",
    "Read the first three characters — 5YJ, 7SAY, LRW, or XP7",
    "Map the WMI to its Gigafactory (Fremont, Austin, Shanghai, Berlin)",
    "If LRW or XP7, confirm Tesla USA warranty and EPA compliance paperwork",
    "Confirm the WMI matches the model on the car (Cybertruck = 7SAY only)",
    "Pair with a Tesla recall check and full VIN history before you commit",
  ],
  certCardCta: "Run the Tesla Gigafactory decode first — paste the VIN here:",
  h2Internal: "Related Tesla Plant and VIN Pages",
  internalIntro: "A Tesla Gigafactory decode is the plant entry point. These focused pages cover each Gigafactory in detail plus the broader Tesla VIN tools that complete your due diligence.",
  internalLinks: TESLA_PLANTS.map((p) => ({
    href: `/tesla-${p.slug}-vin`,
    label: `Tesla ${p.name.split(" (")[0]} VIN`,
    desc: `${p.name} (WMI ${p.wmi}) — ${p.note}`,
  })).concat([
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Full Tesla VIN decoder for trim, motor count, Autopilot hardware revision, and equipment package." },
    { href: "/vin-decoder", label: "Universal VIN Decoder", desc: "Decode any 17-character VIN into year, make, model, trim, plant, and factory equipment." },
    { href: "/tesla-recall-check", label: "Tesla Recall Check", desc: "Open NHTSA campaign lookup for any Tesla VIN — Model S, 3, X, Y, Cybertruck, or Roadster." },
    { href: "/vin-check", label: "Full VIN History Check", desc: "Run a complete vehicle history report on any Tesla VIN, including title brands, accidents, and recalls." },
  ]),
  h2Faq: "Tesla Gigafactory Decoder — Frequently Asked Questions",
  faqIntro: "The questions Tesla buyers ask most when they want to decode the Gigafactory from a VIN for the first time.",
  bottomBadge: "Free · Instant · SAE J853 Source",
  ctaBottomHeading: "Ready to Decode a Tesla Gigafactory?",
  ctaBottomSub: "Enter any 17-character Tesla VIN to read the World Manufacturer Identifier and identify the assembly Gigafactory in seconds — Fremont, Austin, Shanghai, or Berlin. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "How do I tell which Gigafactory built my Tesla from the VIN?", answer: "Read the first three characters of the 17-character Tesla VIN — the World Manufacturer Identifier (WMI) under the SAE J853 standard. Tesla uses four distinct WMIs: 5YJ for Gigafactory California (Fremont), 7SAY for Gigafactory Texas (Austin), LRW for Gigafactory Shanghai, and XP7 for Gigafactory Berlin. Enter any Tesla VIN into the free Gigafactory decoder on this page and the lookup returns the plant name, country, opening year, and the Tesla models built at that Gigafactory. No two Tesla plants share a WMI, so the first three characters uniquely identify the assembly facility." },
  { question: "What does WMI 5YJ mean on a Tesla?", answer: "WMI 5YJ identifies Gigafactory California in Fremont, California — Tesla's original assembly plant, opened in 2010 inside the former NUMMI / GM-Toyota joint venture facility. Fremont builds the Tesla Model S, Model 3, Model X, and the pre-2022 Model Y. It is the only Gigafactory that builds Model S and Model X. Any Tesla VIN beginning with 5YJ is a Fremont build and is a standard North-American market vehicle with full Tesla USA warranty coverage." },
  { question: "What does WMI 7SAY mean on a Tesla?", answer: "WMI 7SAY identifies Gigafactory Texas in Austin, Texas — Tesla's flagship plant since 2022. Austin builds the post-2022 Model Y and the Cybertruck. All Tesla Cybertrucks share the 7SAY WMI; if a listing claims Cybertruck but the VIN does not start with 7SAY, the listing is wrong or the truck is mis-identified. Austin Teslas are standard North-American market vehicles with full Tesla USA warranty coverage, identical to Fremont (5YJ) builds in service and warranty terms." },
  { question: "What does WMI LRW mean on a Tesla?", answer: "WMI LRW identifies Gigafactory Shanghai, Tesla's plant in China that opened in December 2019. Shanghai is Tesla's highest-volume Gigafactory and primarily serves China, EU export, and APAC export markets with Model 3 and Model Y. When a Shanghai-built Tesla appears in a US listing, it is almost always a gray-market import — usually without Tesla USA warranty coverage, with a Supercharger billing region defaulted outside North America, and sometimes without EPA compliance certification. Verify Tesla USA warranty status and EPA paperwork directly with Tesla before any LRW Tesla purchase in the US." },
  { question: "What does WMI XP7 mean on a Tesla?", answer: "WMI XP7 identifies Gigafactory Berlin-Brandenburg in Grünheide, Germany — Tesla's first European plant, opened in March 2022. Berlin builds the EU-market Model Y. Berlin-built Teslas are extremely rare in US listings; when they appear, they are usually expat returns or import-broker units carrying European-spec lighting, regional Supercharger defaults, and EU regulatory compliance rather than US-spec. Treat any XP7 VIN in a US listing as an import question and verify Tesla USA warranty, EPA paperwork, and lighting conversion before purchase." },
  { question: "Does the Tesla Gigafactory matter for warranty coverage?", answer: "Yes, significantly. Fremont (5YJ) and Austin (7SAY) Teslas are sold by Tesla USA with the standard 4-year / 50,000-mile Basic Vehicle Limited Warranty plus the 8-year battery and drive unit warranty. Shanghai (LRW) and Berlin (XP7) Teslas sold in other markets carry equivalent warranties in their original sale region, but those warranties do not automatically transfer to a US owner who imports the vehicle. Tesla service centers in the US can sometimes honor the underlying battery warranty on imported units, but Basic Vehicle warranty and Supercharger billing may differ. Always confirm coverage with Tesla directly before purchasing an LRW or XP7 unit in the US." },
  { question: "Can I trust the Gigafactory result if the VIN is cloned?", answer: "The Gigafactory decoder reads the WMI from the 17-character VIN as the seller presents it. If the VIN has been cloned — a thief copying a legitimate VIN onto a different vehicle — the decoder will still return the legitimate VIN's Gigafactory even though the physical car may be a different make, model, or build entirely. That is why a Gigafactory decode should always be paired with a physical VIN check: compare the dashboard VIN to the door jamb sticker, the title, the MyTesla app, and any visible body badges (especially Cybertruck = Austin / 7SAY only). Mismatches between the WMI and the visible body type are a strong cloning flag." },
  { question: "Where is the Tesla VIN located on the car?", answer: "Every Tesla prints the VIN in at least five places. The fastest is the lower corner of the windshield on the driver's side — look through the glass from outside the vehicle. The driver-side door jamb sticker is the second-easiest and is required on every Tesla sold in the US by federal law. The Tesla title document and the insurance ID card both print the VIN, and the MyTesla mobile app shows it on the vehicle profile screen alongside firmware version, Autopilot hardware revision, and Supercharger entitlement. Any of these sources is enough to decode the Gigafactory from the first three characters." },
];

export default function TeslaGigafactoryByVinBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <MapPin className="w-4 h-4" /> {c.badge}
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
                    <code className="font-mono font-bold text-primary text-xs">{r.value}</code>
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
                  <code className="font-mono font-black text-primary text-base flex-shrink-0 w-16">{r.code}</code>
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
                <Link href="/tesla-recall-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink1}</Link>
                {c.dangerNoteMid2}
                <Link href="/tesla-vin-decoder" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink2}</Link>
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
                <Link href="/tesla-fremont-vin" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.cert2Link1}</Link>
                {c.cert2Mid2}
                <Link href="/tesla-vin-decoder" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.cert2Link2}</Link>
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

        <RelatedChecks exclude="/tesla-gigafactory-by-vin" />
      </div>
    </article>
  );
}

export { FAQS_EN };
