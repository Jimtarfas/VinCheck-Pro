/**
 * Body for /tesla-roadster-vin-decoder — English-only Tesla-specific page
 * covering both the 1st-gen (2008-2012, Lotus Elise platform, AC Propulsion
 * drivetrain, ~2,400 units produced) and the 2nd-gen Roadster (reservations
 * opened 2017, production repeatedly delayed). All Tesla facts come from
 * src/lib/tesla-data.ts.
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
import { TESLA_WMI, TESLA_MODELS, TESLA_VIN_RULES } from "@/lib/tesla-data";

const ROADSTER = TESLA_MODELS.find((m) => m.key === "roadster")!;

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I decode a Tesla Roadster VIN?",
    answer: (
      <>
        Enter the 17-character Roadster VIN into{" "}
        <strong>CarCheckerVIN&apos;s</strong> free Tesla Roadster decoder.
        It cross-references <strong>NMVTIS</strong> and NHTSA, returning
        year, trim, drivetrain, and any open recall campaigns in seconds.
      </>
    ),
  },
  {
    question: "Is the Tesla Roadster VIN decoder free?",
    answer: (
      <>
        Yes. The Tesla Roadster VIN decoder is free with no sign-up. It
        works for both the 1st-gen Roadster (2008-2012, built on the Lotus
        Elise platform with an AC Propulsion-derived drivetrain) and the
        2nd-gen Roadster whose reservations opened in 2017.
      </>
    ),
  },
  {
    question: "What WMI does the original Tesla Roadster use?",
    answer: (
      <>
        The original 2008-2012 Roadster used a different VIN format from
        the modern <strong>5YJ</strong> Tesla WMI — Lotus performed chassis
        assembly at Hethel before Tesla installed the powertrain at Menlo
        Park (later Fremont), so pre-2010 build numbers vary by chassis batch.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Hash, Car, Cpu, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [Cpu, Shield, Gauge] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Roadster VIN Decoder",
  badge: "Free Tesla Roadster VIN Decoder · 1st-Gen & 2nd-Gen Lookup",
  h1Lead: "Tesla Roadster VIN Decoder — ",
  h1Accent: "Decode Any 1st-Gen or 2nd-Gen Roadster Free.",
  intro: "The Tesla Roadster started it all — roughly 2,400 first-generation cars rolled out between 2008 and 2012 on a stretched Lotus Elise platform with an AC Propulsion-derived drivetrain, and the long-anticipated second-generation Roadster has been on reservations since 2017. Either way, every Roadster carries a unique Vehicle Identification Number that hides the build year, the chassis batch, the drivetrain revision, and the equipment package the car left the factory with. A Tesla Roadster VIN decoder unscrambles that string, then cross-references NMVTIS for title brand history and NHTSA for any open recall campaigns. Enter a Roadster VIN below — 2008 Signature 100, 2010 Sport, 2.5, or a reserved 2nd-gen build — and we will run the decoder in seconds. No account, no card, no catch.",
  formHeading: "Free Tesla Roadster VIN Decoder — 2008-2012 1st-Gen & 2nd-Gen",
  formSub: "Enter a 17-character Tesla Roadster VIN to decode the year, drivetrain, chassis batch, and equipment package, then surface NMVTIS title-brand history and NHTSA recall campaigns.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Database, value: "NMVTIS", label: "title history" },
    { icon: Car, value: "Decoded", label: "Roadster specs" },
    { icon: Shield, value: "NHTSA", label: "recall feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Tesla Roadster VIN Decoder Works",
  howIntro: "Decoding a Tesla Roadster VIN is fast from your side. Behind the form, the tool reaches into the same federal databases Tesla service centers and insurers query, then returns the result in plain English. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the Roadster VIN", body: "Type or paste the 17-character VIN from the lower windshield, the driver-side door jamb, the Tesla title, or your insurance card. The decoder validates that it is exactly 17 characters and excludes the disallowed letters I, O, and Q before it runs." },
    { tag: "Step 2", title: "We query the records", body: "Your Roadster VIN decode hits NMVTIS — the federal aggregator that pulls from all 50 state DMVs, insurers, junk yards, and salvage auctions — plus the live NHTSA recall feed. The full lookup runs in seconds." },
    { tag: "Step 3", title: "Read the Roadster report", body: "You will see the decoded year, chassis batch, drivetrain revision (1.5, Sport, 2.0, 2.5), and equipment package alongside any title brands, salvage flags, and open Roadster recall campaigns. Use it to verify provenance before buying or insuring a rare collector car." },
  ],
  h2Title: "What a Tesla Roadster VIN Decoder Reveals",
  titleIntro: "The original Roadster is a low-production collector car — fewer than 2,500 worldwide — which makes VIN-level verification more important, not less. Here is what comes back when you decode a Tesla Roadster VIN with us.",
  title1Pre: "First, the decoder reads the Roadster VIN itself. The first three characters identify the ",
  title1Bold1: "world manufacturer and chassis source",
  title1Mid: ", the next six describe model attributes including body style and restraint system, the tenth digit encodes the ",
  title1Bold2: "model year",
  title1Mid2: ", the eleventh digit identifies the ",
  title1Bold3: "assembly batch",
  title1Suffix: ", and the final six form the unique production sequence number. From those alone we return the year, drivetrain revision, trim, and equipment.",
  title2Pre: "Second, your Roadster VIN # decoder queries the ",
  title2Bold: "title and brand history",
  title2Suffix: ". That is where flood, salvage, junk, rebuilt, lemon-law buyback, and odometer-rollback brands surface, alongside the chain of states the title has passed through. Roadsters are now appreciating collector cars — NMVTIS is what keeps the original brand visible across state lines.",
  title3: "Third, the decoder checks the open-recall feed published by Tesla and NHTSA. Open safety recalls stay attached to the VIN until the work is completed by an authorized Tesla service center. Most 1st-gen Roadster campaigns have aged out, but a verified, VIN-specific recall lookup is still the only way to be sure.",
  pathCardTitle: "What you get from one Roadster VIN",
  pathRows: [
    { label: "Decoded specs", value: "Year · Trim · Drivetrain" },
    { label: "Title history", value: "Brands · States" },
    { label: "Open recalls", value: "Active · Resolved" },
  ],
  pathCardNote: "One 17-character Tesla Roadster VIN, three layers of insight. The whole decoder runs in seconds and never asks for an account.",
  h2Decode: "Decoding a Tesla Roadster VIN — Pattern Notes",
  decodeIntro: "Modern Teslas built at Fremont use the 5YJ WMI, but the original Roadster came together very differently. Lotus assembled the glider at Hethel in the UK, then Tesla installed the powertrain at its Menlo Park facility (and later Fremont). Pre-2010 build numbers therefore vary by chassis batch and do not follow the same WMI rules as a modern Model S, 3, X, or Y.",
  decodeRows: [
    { code: "5YJ", meaning: "Modern Tesla WMI for Gigafactory California (Fremont) — used on Model S, Model 3, Model X, and pre-2022 Model Y. Not the original Roadster pattern." },
    { code: "7SAY", meaning: "Gigafactory Texas (Austin) WMI — Cybertruck and post-2022 Model Y. Not used on the Roadster." },
    { code: "LRW", meaning: "Gigafactory Shanghai WMI — export Model 3 and Model Y. Not used on the Roadster." },
    { code: "XP7", meaning: "Gigafactory Berlin-Brandenburg WMI — EU Model Y. Not used on the Roadster." },
    { code: "Hethel", meaning: "Original Roadster chassis (2008-2012) was built at the Lotus Hethel facility in the UK; Tesla performed final powertrain assembly at Menlo Park, then Fremont after 2010." },
    { code: "Batch", meaning: "Pre-2010 Roadster build numbers vary by chassis batch — early Signature 100 cars, Sport, 2.0, and 2.5 revisions each used distinct sequence ranges." },
  ],
  decodeTail: "Position 10 of any post-1981 VIN encodes the model year — for the original Roadster window, 8 = 2008, 9 = 2009, A = 2010, B = 2011, C = 2012. If a Roadster VIN does not parse cleanly to a 2008-2012 production year, it may be a re-titled chassis or a non-US build; treat the mismatch as a red flag and stop the purchase until you reconcile it.",
  h2Signs: "When You Should Decode a Tesla Roadster VIN",
  signsIntro: "A Roadster VIN decode is cheap insurance — actually free — for anyone making a decision about a rare 1st-gen car or a long-pending 2nd-gen reservation. Six situations where decoding the VIN first pays off.",
  signs: [
    { title: "Buying a 1st-gen Roadster private-party", body: "There are fewer than 2,500 first-gen Roadsters worldwide. Run a Tesla Roadster VIN decoder before you hand over a deposit and you will see brands, salvage flags, and any unresolved recall campaign the seller may not have disclosed." },
    { title: "Insuring or appraising a collector Roadster", body: "Insurers and agreed-value appraisers price by VIN. Decoding the Roadster VIN yourself confirms the year, drivetrain revision, and equipment they used — and catches mistakes that inflate the premium on a Sport, a 2.5, or a Signature 100 car." },
    { title: "Verifying drivetrain generation (1.5, Sport, 2.0, 2.5)", body: "The 1st-gen Roadster received several drivetrain revisions between 2008 and 2012. A VIN decode confirms which revision the chassis left the factory with, which matters for service parts, software, and resale value." },
    { title: "Checking a 2nd-gen Roadster reservation", body: "Second-gen Roadster reservations opened in 2017 and production has been delayed multiple times. If a VIN appears on a transferred reservation, decoding it confirms the build year and helps validate the chain of custody before you take over the order." },
    { title: "Inherited or gifted Roadster", body: "Inheriting a rare Tesla Roadster? A free VIN decode confirms title status and surfaces any historical recall campaigns before you put your name on the registration." },
    { title: "Spotting a too-cheap Roadster listing", body: "A 1st-gen Roadster priced well below market is the classic salvage-or-flood tell. Roadsters are appreciating — if the price feels off, a VIN decode is the fastest way to confirm or rule it out." },
  ],
  midCtaHeading: "Decode This Specific Roadster VIN Right Now",
  midCtaSub: "You already have a Tesla Roadster in mind. Run the VIN against NMVTIS, the NHTSA recall feed, and our decoder — free, in seconds. No sign-up.",
  h2Where: "Where to Find Your Tesla Roadster VIN",
  where1Pre: "Most people get stuck before they even start a Roadster VIN decode because they cannot find the VIN. Good news — every Tesla Roadster prints it in ",
  where1Bold: "at least four places",
  where1Suffix: ", and any one of them is enough to run a free decode.",
  where2: "The fastest spot is the lower corner of the windshield on the driver's side — look through the glass from outside. The driver-side door jamb sticker is the second-easiest and is required by federal law on every US-market Roadster. The Tesla title document and the insurance ID card both print the VIN as well, and the state registration usually does too. On Lotus-built 1st-gen Roadsters there is also a stamped chassis number on the aluminum bonded tub that is worth comparing against the VIN on the paperwork.",
  where3: "If the VIN on the dashboard does not match the VIN on the Tesla title, stop. That mismatch is a strong signal that something is wrong with the car's identity — a re-titled salvage Roadster, a cloned chassis, or worse. Exactly the kind of thing a VIN decoder is designed to catch.",
  whereCardTitle: "Five places the Roadster VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "Tesla title document",
    "Insurance ID card",
    "Lotus-built aluminum bonded tub (1st-gen chassis stamp)",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free Tesla Roadster VIN decoder in seconds.",
  h2Danger: "Roadster-Specific Things a VIN Decoder Surfaces",
  dangerIntro: "The Roadster's tiny production run and unusual UK-then-US assembly path mean a few specific patterns are worth checking on every used 1st-gen car. A VIN decoder is the fastest way to surface them.",
  dangers: [
    { title: "Drivetrain revision (1.5, Sport, 2.0, 2.5)", body: "The 1st-gen Roadster moved through several drivetrain revisions during its 2008-2012 production run. Decoding the VIN confirms the revision the chassis left the factory with, which matters for parts, software compatibility, and collector value." },
    { title: "Title brand history", body: "Roadsters are now appreciating collector cars, which makes title washing tempting. A NMVTIS-backed VIN decoder surfaces any salvage, junk, rebuilt, flood, or lemon-buyback brand the chassis has carried across state lines." },
    { title: "Historic recall campaigns", body: "Most original-Roadster NHTSA campaigns have aged out, but the only way to be certain on a specific VIN is to query the live recall feed. The decoder does that automatically for both 1st-gen and 2nd-gen Roadster VINs." },
  ],
  dangerNoteBoldLead: "Buying a used Roadster?",
  dangerNoteMid1: " Pair this VIN decoder with a focused ",
  dangerNoteLink1: "accident history check",
  dangerNoteMid2: " and a ",
  dangerNoteLink2: "recall check",
  dangerNoteSuffix: " for a complete picture before you put money down.",
  h2Certified: "Buying a Used Roadster — VIN Decoder vs Dealer Inspection",
  cert1Pre: "Tesla does not run a brand-certified used program for the 1st-gen Roadster — it is too old and too low-volume. Specialist Tesla shops and EV restoration outfits sometimes offer their own warranty packages, but those are bespoke programs and ",
  cert1Bold: "do not replace a VIN-level history check",
  cert1Suffix: ". A specialist inspection confirms the car's current mechanical condition; a VIN decoder confirms what has happened to it across its title chain.",
  cert2Pre: "A free Roadster VIN decoder catches the things a hands-on inspection isn't designed to surface: a flood brand from a state that re-titled the car clean, a prior salvage history, or an unresolved historical recall campaign. For any 1st-gen Roadster purchase, run the decoder ",
  cert2Bold: "first",
  cert2Mid: ", and consider a full ",
  cert2Link1: "VIN history report",
  cert2Mid2: " plus an independent specialist inspection. If anything looks off, a ",
  cert2Link2: "salvage title check",
  cert2Suffix: " can confirm exactly which brand the state applied and when.",
  cert3: "Either way, double-check the VIN itself. Compare the VIN on the dashboard against the door jamb sticker, the title, the insurance card, and (on a 1st-gen) the chassis stamp on the aluminum tub. If even one digit is off across those sources, the Roadster may not be what the paperwork says it is.",
  certCardTitle: "Tesla Roadster pre-purchase VIN checklist",
  certChecklist: [
    "Confirm the VIN matches across dashboard, door jamb, and Tesla title",
    "Run a free Roadster VIN decoder for title brands and salvage records",
    "Check the NHTSA recall feed for any historical campaigns left unresolved",
    "Match the decoded drivetrain revision to the seller's listing (1.5, Sport, 2.0, 2.5)",
    "Verify mileage on the decoder against the odometer reading",
    "Order a full history report if the decoder raises any flag",
  ],
  certCardCta: "Run the Roadster decoder first — paste the VIN here:",
  h2Internal: "Related Checks That Build On Your Roadster Decoder",
  internalIntro: "A Roadster VIN decoder is the entry point. These focused checks dig into specific records when something looks off — or when you want to be extra thorough before buying a rare collector Tesla.",
  internalLinks: [
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Decode any Tesla VIN — Model S, 3, X, Y, Cybertruck — into year, plant, and equipment." },
    { href: "/tesla-recall-check", label: "Tesla Recall Check", desc: "Look up any open Tesla safety recalls attached to a VIN through the NHTSA feed." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down any 17-character VIN into year, make, model, trim, plant, and factory equipment." },
    { href: "/recall-check", label: "Recall Check", desc: "Surface any open NHTSA safety recalls attached to a VIN — Tesla or otherwise." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether a Roadster was branded flood or water-damaged in any state." },
    { href: "/odometer-check", label: "Odometer Check", desc: "Track mileage history and spot odometer rollbacks across the Roadster title chain." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if the Roadster VIN carries a salvage, junk, or non-repairable title brand." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims on the Roadster VIN." },
  ],
  h2Faq: "Tesla Roadster VIN Decoder — Frequently Asked Questions",
  faqIntro: "The questions buyers ask most when they want to decode a Tesla Roadster VIN for the first time.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Ready to Decode a Tesla Roadster VIN?",
  ctaBottomSub: "Enter any 17-character Tesla Roadster VIN — 1st-gen 2008-2012 or 2nd-gen — to run a free decode against NMVTIS, the NHTSA recall feed, and our spec database. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "How do I decode a Tesla Roadster VIN?", answer: `To decode a Tesla Roadster VIN, find the 17-character Vehicle Identification Number on the lower driver-side corner of the windshield, the door jamb sticker, the Tesla title, or the insurance card. Enter it into the free Roadster decoder on this page. The tool first validates that the string is exactly ${TESLA_VIN_RULES.length} characters and excludes the disallowed letters ${TESLA_VIN_RULES.excludedChars.join(", ")}, then queries NMVTIS for title brand and salvage history and the NHTSA recall feed for any open Roadster safety recalls. Results return in seconds with no account, credit card, or sign-up required.` },
  { question: "How many 1st-gen Tesla Roadsters were built?", answer: `Tesla produced approximately 2,400 first-generation Roadsters between 2008 and 2012. The car was built on a stretched Lotus Elise platform with chassis assembly performed by Lotus at Hethel in the UK; Tesla installed the AC Propulsion-derived electric drivetrain at its Menlo Park facility and (after 2010) at the Fremont plant. ${ROADSTER.note} Because the production run is so small, every surviving 1st-gen Roadster benefits from VIN-level verification before a sale.` },
  { question: "What WMI does the original Tesla Roadster use?", answer: `Modern Teslas built at Gigafactory California use the 5YJ WMI (${TESLA_WMI["5YJ"].note}), but the original 2008-2012 Roadster used a different VIN format because the chassis was assembled at Lotus Hethel in the UK rather than at a Tesla US plant. Pre-2010 Roadster build numbers vary by chassis batch — early Signature 100 cars, Sport, 2.0, and 2.5 revisions each used distinct sequence ranges. A VIN decoder is the cleanest way to confirm which build batch any specific Roadster belongs to.` },
  { question: "When does the 2nd-gen Tesla Roadster ship?", answer: "Tesla opened reservations for the second-generation Roadster in 2017 and the production date has been pushed back multiple times across subsequent investor calls. The decoder on this page works for any 17-character Roadster VIN that has been issued, whether the car has actually been delivered or whether the VIN was generated against a transferred reservation. Always validate a 2nd-gen Roadster VIN before paying any deposit to a private party for a transferred reservation slot." },
  { question: "Is the Tesla Roadster VIN decoder free?", answer: "Yes. Our Tesla Roadster VIN decoder is free, with no sign-up, no credit card, and no hidden charges. You enter the 17-character VIN and we return the decoded specs, the title-brand summary from NMVTIS, and any open recall campaigns from NHTSA. The free decoder covers the basics most Roadster buyers need; an optional paid full history report is available if you need every line item and every date stamp." },
  { question: "Where is the VIN on a Tesla Roadster?", answer: "Every US-market Tesla Roadster prints the VIN in at least four places. The easiest is the lower corner of the windshield on the driver's side. The second is the driver-side door jamb sticker, which is required by federal law and also lists the manufacture date. The Tesla title document and the insurance ID card both print the VIN, and the state registration usually does too. On 1st-gen Roadsters there is also a chassis number stamped on the aluminum bonded tub left over from Lotus Hethel assembly — comparing that stamp against the paperwork is a useful provenance check." },
  { question: "Can a VIN decoder confirm 1st-gen Roadster drivetrain revision?", answer: "Yes. The 1st-gen Roadster moved through several drivetrain revisions between 2008 and 2012 — including the 1.5 update, the Sport variant, the 2.0 platform, and the 2.5 refresh that ran out the production line. A Tesla Roadster VIN decoder reads the chassis batch and equipment fields to identify which revision the car left the factory with, which directly affects service parts, motor controller software compatibility, and collector resale value. Pair the decoded revision with the seller's stated trim and walk away from any car where they disagree." },
];

export default function TeslaRoadsterVinDecoderBody() {
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

        <RelatedChecks exclude="/tesla-roadster-vin-decoder" />
      </div>
    </article>
  );
}

export { FAQS_EN };
