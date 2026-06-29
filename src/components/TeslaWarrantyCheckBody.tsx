/**
 * Body for /tesla-warranty-check — English-only Tesla-specific warranty
 * estimator landing. Mirrors the visual structure of ToyotaVinLookupBody
 * with copy pivoted to Tesla's 4yr/50k Basic Vehicle + 8yr battery and
 * drive unit warranty plus salvage/rebuilt voiding rules.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, MapPin, Cpu, Battery,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I check Tesla warranty by VIN?",
    answer: (
      <>
        Enter the 17-character Tesla VIN into{" "}
        <strong>CarCheckerVIN&apos;s</strong> free Tesla warranty check. It
        decodes the model year, estimates remaining{" "}
        <strong>4-year / 50,000-mile Basic Vehicle Limited Warranty</strong>{" "}
        coverage, and reads NMVTIS for any salvage or rebuilt brand that would
        void Tesla coverage.
      </>
    ),
  },
  {
    question: "How long is the Tesla battery warranty?",
    answer: (
      <>
        Tesla&apos;s battery and drive unit warranty runs <strong>8 years</strong>{" "}
        with mileage caps that vary by model: 100,000 miles for Model 3 / Y
        Standard Range, 120,000 miles for Model 3 / Y Long Range and
        Performance, and 150,000 miles for Model S and Model X. All include a{" "}
        <strong>70% capacity retention guarantee</strong>.
      </>
    ),
  },
  {
    question: "Does a salvage title void Tesla warranty?",
    answer: (
      <>
        Yes. A <strong>salvage or rebuilt title brand voids all Tesla
        warranty</strong> coverage — Basic Vehicle and battery/drive unit alike.
        A Tesla warranty check pairs the VIN-level warranty estimate with an
        NMVTIS title check so you see both pieces of information together
        before purchase.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Hash, Car, Cpu, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [Battery, Shield, AlertTriangle] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Warranty Check",
  badge: "Free Tesla Warranty Check   ·   4yr/50k + 8yr Battery",
  h1Lead: "Tesla Warranty Check — ",
  h1Accent: "Estimate Remaining Coverage by VIN, Free.",
  intro: "CarCheckerVIN's free Tesla warranty check decodes any Tesla VIN to estimate remaining factory warranty coverage based on the vehicle's in-service date, mileage, and model-specific Tesla warranty terms (4-year/50,000-mile Basic Vehicle Limited Warranty + 8-year battery and drive unit warranty). As an NMVTIS-approved data provider, CarCheckerVIN also confirms whether the VIN has any salvage or rebuilt title brand that would void Tesla warranty coverage. The result is the single fastest way to know what factory protection still applies — and what doesn't — before you commit to a used Tesla. Enter a Tesla VIN below and we'll surface the warranty estimate in seconds. No account, no card, no catch.",
  formHeading: "Free Tesla Warranty Check — Lookup Any 17-Character Tesla VIN",
  formSub: "Enter the Tesla VIN and we'll estimate remaining Basic Vehicle and battery/drive unit warranty coverage, plus any salvage brand that would void it.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Shield, value: "4 yr / 50k", label: "Basic Vehicle" },
    { icon: Battery, value: "8 yr", label: "battery + drive unit" },
    { icon: Database, value: "NMVTIS", label: "salvage check" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Tesla Warranty Check Works",
  howIntro: "A Tesla warranty check is simple from your side of the screen. Behind it, the tool decodes the model year, infers the in-service date, applies Tesla's model-specific warranty terms, and reads NMVTIS for any title brand that would void coverage. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the Tesla VIN", body: "Type or paste the 17-character VIN from the lower windshield, the driver-side door jamb sticker, the Tesla title, or your MyTesla app vehicle profile. The 10th character encodes the model year — the foundation of any Tesla warranty estimate." },
    { tag: "Step 2", title: "We decode the model and read NMVTIS", body: "Your Tesla VIN gets decoded into model, year, and trim, then cross-checked against NMVTIS for any salvage, rebuilt, or junk brand that would void Tesla warranty coverage. The model determines which mileage cap applies to the 8-year battery warranty (100K, 120K, or 150K)." },
    { tag: "Step 3", title: "Read the Tesla warranty report", body: "You'll see the estimated remaining Basic Vehicle Limited Warranty (4 years / 50,000 miles from the in-service date), the estimated remaining battery and drive unit warranty (8 years with model-specific mileage caps), and any title brand that voids the coverage. Confirm exact coverage with Tesla service before purchase." },
  ],
  h2Title: "What a Tesla Warranty Check Reveals",
  titleIntro: "A Tesla warranty check returns the same VIN-keyed data Tesla service centers reference when an owner schedules a warranty repair, presented for a buyer rather than a back-office system. Here is what comes back when you run a Tesla VIN through the lookup.",
  title1Pre: "First, the lookup decodes the ",
  title1Bold1: "model year and model line",
  title1Mid: " from the VIN's WMI and 10th character. The model year determines whether the vehicle is still inside the 4-year Basic Vehicle Limited Warranty window, and the ",
  title1Bold2: "model line",
  title1Mid2: " determines the mileage cap on the 8-year battery and drive unit warranty: 100,000 miles for Model 3 / Y Standard Range, 120,000 miles for Model 3 / Y Long Range and Performance, and ",
  title1Bold3: "150,000 miles for Model S and Model X",
  title1Suffix: ". The Cybertruck warranty matches Model S/X terms.",
  title2Pre: "Second, your Tesla warranty check reads ",
  title2Bold: "NMVTIS for salvage and rebuilt brands",
  title2Suffix: ". A salvage title — applied when an insurer declares the Tesla a total loss, typically from a major accident, flood, or theft-recovery damage — voids all Tesla factory warranty coverage. A rebuilt brand applied after a salvage Tesla is repaired and re-inspected by the state also voids the original Tesla warranty. This is true regardless of whether the rebuilt Tesla looks and drives normally.",
  title3: "Third, the result accounts for Tesla's used-vehicle limited warranty. When you buy a used Tesla directly from Tesla (through tesla.com used inventory), the Tesla used-vehicle limited warranty applies — typically 1 year or 10,000 miles from the date Tesla sells the unit to you, whichever comes first. The used-vehicle limited warranty stacks on top of any remaining factory Basic Vehicle warranty and the 8-year battery and drive unit warranty. Private-party Tesla purchases do not include the used-vehicle limited warranty.",
  pathCardTitle: "What you get from one Tesla VIN",
  pathRows: [
    { label: "Basic Vehicle Limited", value: "4 yr / 50,000 mi" },
    { label: "Battery + drive unit", value: "8 yr / 100k-150k mi" },
    { label: "Capacity retention", value: "70% guarantee" },
  ],
  pathCardNote: "One 17-character Tesla VIN, three layers of warranty insight. The whole Tesla warranty check runs in seconds and never asks for an account.",
  h2Decode: "Tesla Warranty Terms by Model",
  decodeIntro: "Tesla applies a 4-year / 50,000-mile Basic Vehicle Limited Warranty to every new Tesla regardless of model, then a separate 8-year battery and drive unit warranty with mileage caps that vary by model and trim. Both warranties run from the date the Tesla was first delivered to its original owner. A Tesla warranty check estimates how much of each window is left on a specific VIN.",
  decodeRows: [
    { code: "4yr/50k", meaning: "Basic Vehicle Limited Warranty — covers defects in materials and workmanship for 4 years or 50,000 miles, whichever comes first, from the original in-service date. Applies to every Tesla model including Cybertruck." },
    { code: "8yr/100k", meaning: "Model 3 / Model Y Standard Range — battery and drive unit warranty runs 8 years or 100,000 miles, whichever comes first, with the 70% capacity retention guarantee." },
    { code: "8yr/120k", meaning: "Model 3 / Model Y Long Range and Performance — battery and drive unit warranty runs 8 years or 120,000 miles, whichever comes first, with the 70% capacity retention guarantee." },
    { code: "8yr/150k", meaning: "Model S / Model X (all trims) — battery and drive unit warranty runs 8 years or 150,000 miles, whichever comes first, with the 70% capacity retention guarantee. The Cybertruck warranty matches this tier." },
    { code: "70%cap", meaning: "Capacity retention guarantee — Tesla guarantees the battery pack retains at least 70% of its original capacity over the 8-year / model-specific-mileage warranty window. If the pack falls below 70%, Tesla replaces it under warranty at no cost." },
    { code: "1yr/10k", meaning: "Tesla used-vehicle limited warranty — applies only when you buy a used Tesla directly from Tesla (tesla.com used inventory). Runs 1 year or 10,000 miles, whichever comes first, from Tesla's sale date. Stacks on top of remaining factory coverage." },
  ],
  decodeTail: "All Tesla warranty terms run from the original in-service date — the date Tesla first delivered the vehicle to its original owner — not from a subsequent resale. A used Tesla that has been on the road for 3 years and 30,000 miles still has 1 year and 20,000 miles of Basic Vehicle Limited Warranty left, plus 5 years of battery and drive unit coverage. A Tesla warranty check estimates the remaining window so you know exactly what factory protection transfers to you at purchase.",
  h2Signs: "When You Should Run a Tesla Warranty Check",
  signsIntro: "A Tesla warranty check is cheap insurance — actually free — for anyone making a decision about a specific Tesla. Six situations where the warranty estimate pays off before you commit.",
  signs: [
    { title: "Before you buy a used Tesla private-party", body: "The previous owner's word is not the warranty record. Run a Tesla warranty check before you hand over a deposit and you'll see exactly how much Basic Vehicle and battery warranty remains, plus whether any salvage brand has voided coverage." },
    { title: "Shopping Tesla's used inventory online", body: "Tesla's own tesla.com used inventory includes a 1-year / 10,000-mile used-vehicle limited warranty on top of any remaining factory coverage. A pre-listing warranty check confirms what factory coverage you'll inherit before you reserve the unit." },
    { title: "Estimating a Tesla battery replacement window", body: "Tesla battery pack replacements outside warranty can cost $10,000 to $20,000 depending on model. A Tesla warranty check tells you whether the 8-year battery and drive unit warranty is still active — critical for older Model S and Model X units approaching the 8-year mark." },
    { title: "Confirming a Tesla is not salvage or rebuilt", body: "Salvage and rebuilt brands void all Tesla warranty coverage permanently. A Tesla warranty check reads NMVTIS for any salvage or rebuilt brand so you see both the remaining warranty estimate and the voiding-brand status in one result." },
    { title: "Pricing a Tesla extended service agreement", body: "Tesla used to offer Extended Service Agreements (ESAs) for additional Basic Vehicle coverage beyond the factory window; while the official ESA program changed, third-party Tesla warranties are still sold. Knowing exactly how much factory coverage remains tells you whether an aftermarket warranty is worth the price." },
    { title: "Verifying a leased Tesla return", body: "Tesla lease returns sometimes carry damage or unrepaired items that the lessor will deduct from the final settlement. A Tesla warranty check confirms what factory coverage still applies at lease-end — useful for arguing about wear-and-tear charges that should be covered under warranty." },
  ],
  midCtaHeading: "Run a Tesla Warranty Check on This Specific VIN",
  midCtaSub: "You already have a Tesla in mind. Run the VIN against our Tesla warranty estimator and NMVTIS title check — free, in seconds, no sign-up.",
  h2Where: "Where to Find a Tesla VIN Before You Run the Warranty Check",
  where1Pre: "The Tesla VIN is printed in ",
  where1Bold: "at least five places",
  where1Suffix: " on every Tesla, and any one of them is enough to run a free Tesla warranty check. The 10th character is the model-year code we read for the warranty estimate.",
  where2: "The fastest spot is the lower corner of the windshield on the driver's side — look through the glass from outside the Tesla. The driver-side door jamb sticker is the second-easiest. The Tesla title document and the insurance ID card both print the VIN, and the MyTesla mobile app shows it on the vehicle profile screen alongside the in-service date Tesla used to start the warranty clock.",
  where3: "If the VIN-decoded model year does not match the in-service date Tesla used on the warranty, contact Tesla service to reconcile. Cases where Tesla sold a vehicle months after manufacture (typical of inventory cars and demo units) can shift the warranty start date forward. A Tesla service center can confirm the exact in-service date from the VIN.",
  whereCardTitle: "Five places the Tesla VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "Tesla title document",
    "MyTesla app — vehicle profile screen (shows in-service date)",
    "Insurance ID card and state registration",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free Tesla warranty check against our warranty estimator and NMVTIS title data in seconds.",
  h2Danger: "What Voids a Tesla Warranty — Salvage, Rebuilt, and Modifications",
  dangerIntro: "Tesla applies the same warranty-voiding rules across all models. A Tesla warranty check is the single fastest way to surface the brands that void coverage on a specific VIN before you commit to a purchase.",
  dangers: [
    { title: "Salvage and rebuilt title brands", body: "A salvage title brand — applied when an insurer declares the Tesla a total loss after a major accident, flood, fire, or theft-recovery damage — voids all Tesla factory warranty coverage permanently. A rebuilt brand applied after a salvage Tesla is repaired and re-inspected by the state also voids the original Tesla warranty. This is true regardless of whether the rebuilt Tesla looks and drives normally. A Tesla warranty check reads NMVTIS for both brands." },
    { title: "Battery pack modifications and third-party repairs", body: "Tesla considers any battery pack modification or third-party battery work (outside Tesla service centers and authorized body shops) as warranty-voiding for the 8-year battery and drive unit warranty. Aftermarket battery upgrades, third-party module swaps, or DIY pack opening will void the 70% capacity retention guarantee. Verify any used Tesla's pack has only had Tesla-authorized work before relying on the battery warranty." },
    { title: "Aftermarket motor swaps and chassis modifications", body: "Aftermarket drive unit swaps, chassis cuts, and certain unapproved suspension modifications can void Tesla warranty coverage. The 4-year Basic Vehicle Limited Warranty specifically excludes damage from non-Tesla modifications. Used Teslas showing track-day or off-road modifications deserve a careful warranty check plus a Tesla service inspection before purchase." },
  ],
  dangerNoteBoldLead: "Buying a used Tesla?",
  dangerNoteMid1: " Pair this Tesla warranty check with a general ",
  dangerNoteLink1: "warranty check",
  dangerNoteMid2: " and a focused ",
  dangerNoteLink2: "salvage title check",
  dangerNoteSuffix: " for a complete pre-purchase coverage picture before you put money down.",
  h2Certified: "Tesla Warranty Check vs Tesla Service Center Confirmation",
  cert1Pre: "Tesla service centers can confirm exact warranty status by VIN — they read the same internal database Tesla uses for warranty repair authorization. A VIN-level Tesla warranty check is enough to estimate coverage in five seconds — useful for sanity-checking a private-party listing or an auction lot — but it ",
  cert1Bold: "does not replace a Tesla service-center warranty confirmation",
  cert1Suffix: ". The warranty check estimates remaining coverage from the VIN-decoded model year and Tesla's published terms; a Tesla service-center confirmation reads the exact in-service date and any factory warranty extensions.",
  cert2Pre: "A free Tesla warranty check catches the things a simple model badge does not surface: a Tesla just outside the 4-year Basic Vehicle window, a Model 3 Long Range crossing the 120,000-mile battery warranty cap, an older Model S approaching the 8-year battery warranty expiration, or a salvage brand quietly applied two title transfers ago. Pair the warranty estimate with our ",
  cert2Bold: "general warranty check page",
  cert2Mid: " — see our ",
  cert2Link1: "universal warranty check",
  cert2Mid2: " for non-Tesla makes — and a ",
  cert2Link2: "salvage title check",
  cert2Suffix: " if the warranty estimate shows the Tesla should still be in coverage but the title chain looks off.",
  cert3: "Either way, double-check the VIN itself. Compare the VIN on the Tesla dashboard against the door jamb sticker, the title, and the MyTesla app. If even one digit is off across those sources, the Tesla may be cloned or re-VINned — and the warranty estimate will apply to the wrong vehicle.",
  certCardTitle: "Tesla pre-purchase warranty checklist",
  certChecklist: [
    "Confirm the VIN matches across dashboard, door jamb, title, and MyTesla app",
    "Run a free Tesla warranty check to estimate remaining factory coverage",
    "Confirm no NMVTIS salvage or rebuilt brand voids the warranty",
    "Note the model-specific battery warranty mileage cap (100K, 120K, or 150K)",
    "Confirm the in-service date with Tesla service before relying on the estimate",
    "If buying from tesla.com, confirm the 1-year used-vehicle limited warranty applies",
  ],
  certCardCta: "Run the Tesla warranty check first — paste the VIN here:",
  h2Internal: "Related Tesla and Warranty Pages",
  internalIntro: "A Tesla warranty check is the coverage entry point. These focused pages cover the broader Tesla and general warranty tools that complete your due diligence.",
  internalLinks: [
    { href: "/warranty-check", label: "Universal Warranty Check", desc: "Warranty estimator for any 17-character VIN across all major makes, not just Tesla." },
    { href: "/tesla-recall-check", label: "Tesla Recall Check", desc: "Open NHTSA campaign lookup for any Tesla VIN — Model S, 3, X, Y, Cybertruck, or Roadster." },
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Decode any Tesla VIN into model, year, plant, and Autopilot hardware revision." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Confirm whether a Tesla VIN carries a salvage, rebuilt, or junk brand that would void warranty." },
    { href: "/vin-check", label: "Full VIN History Check", desc: "Run a complete vehicle history report on any Tesla VIN, including title brands and warranty signals." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions and damage events that could trigger a salvage brand." },
    { href: "/tesla-gigafactory-by-vin", label: "Tesla Gigafactory by VIN", desc: "Decode the World Manufacturer Identifier to identify the assembly Gigafactory." },
    { href: "/lemon-check", label: "Lemon Check", desc: "Find buyback records that may reset or alter the original Tesla warranty terms." },
  ],
  h2Faq: "Tesla Warranty Check — Frequently Asked Questions",
  faqIntro: "The questions Tesla buyers ask most when they want to verify warranty coverage by VIN for the first time.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Ready to Check Tesla Warranty Coverage?",
  ctaBottomSub: "Enter any 17-character Tesla VIN to estimate remaining Basic Vehicle and battery/drive unit warranty coverage plus any salvage brand that voids it. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "How do I check Tesla warranty by VIN?", answer: "Enter the 17-character Tesla VIN into the free Tesla warranty check form on this page. The lookup decodes the model year and model line from the VIN, applies Tesla's published warranty terms (4-year / 50,000-mile Basic Vehicle Limited Warranty + 8-year battery and drive unit warranty with model-specific mileage caps), and cross-checks NMVTIS for any salvage or rebuilt title brand that would void coverage. The result returns in seconds with the estimated remaining factory warranty window and any voiding-brand status. Confirm exact coverage with a Tesla service center before purchase using the in-service date Tesla applied to the original delivery." },
  { question: "How long is the Tesla Basic Vehicle Limited Warranty?", answer: "Tesla's Basic Vehicle Limited Warranty runs 4 years or 50,000 miles, whichever comes first, from the date Tesla originally delivered the vehicle to its first owner. It covers defects in materials and workmanship across the entire vehicle except for items covered by separate warranties (battery, drive unit, supplemental restraint, body). The Basic Vehicle Limited Warranty applies to every Tesla model — Model S, Model 3, Model X, Model Y, Cybertruck, and Roadster — and transfers automatically to subsequent owners for the remaining time and mileage. A Tesla warranty check estimates how much of this window remains on a specific VIN." },
  { question: "How long is the Tesla battery warranty?", answer: "Tesla's battery and drive unit warranty runs 8 years with mileage caps that vary by model: 100,000 miles for Model 3 / Y Standard Range, 120,000 miles for Model 3 / Y Long Range and Performance, and 150,000 miles for Model S and Model X (Cybertruck matches the S/X terms). All include Tesla's 70% capacity retention guarantee — if the battery pack falls below 70% of its original capacity during the warranty window, Tesla replaces the pack at no cost. The warranty runs from the original in-service date and transfers automatically to subsequent owners for the remaining time and mileage. Salvage or rebuilt title brands void the battery warranty permanently." },
  { question: "What voids a Tesla warranty?", answer: "Three things commonly void Tesla warranty coverage. First, a salvage or rebuilt title brand — applied when an insurer declares the Tesla a total loss after a major accident, flood, fire, or theft-recovery damage — voids all Tesla factory warranty permanently, including the 8-year battery warranty. Second, battery pack modifications or third-party battery work outside Tesla service centers voids the 8-year battery and drive unit warranty. Third, aftermarket motor swaps, chassis cuts, and certain unapproved suspension modifications void the 4-year Basic Vehicle Limited Warranty. A Tesla warranty check reads NMVTIS for salvage and rebuilt brands as part of the result." },
  { question: "Does the Tesla warranty transfer to a second owner?", answer: "Yes. Both the 4-year / 50,000-mile Basic Vehicle Limited Warranty and the 8-year battery and drive unit warranty transfer automatically to subsequent owners for the remaining time and mileage, with no transfer fee. The warranties always run from the original in-service date — not from the resale date — so a used Tesla that was delivered 3 years and 30,000 miles ago still has 1 year and 20,000 miles of Basic Vehicle Limited Warranty plus 5 years of battery and drive unit coverage remaining for the new owner. A Tesla warranty check estimates exactly how much of each window transfers with the VIN at purchase." },
  { question: "What is the Tesla used-vehicle limited warranty?", answer: "Tesla's used-vehicle limited warranty applies only when you buy a used Tesla directly from Tesla through tesla.com used inventory. It runs 1 year or 10,000 miles, whichever comes first, from the date Tesla sells the unit to you, and stacks on top of any remaining factory Basic Vehicle Limited Warranty and the 8-year battery and drive unit warranty. The used-vehicle limited warranty covers most major mechanical and electrical components excluding wear items. Private-party Tesla purchases do not include the used-vehicle limited warranty — they get only the remaining factory coverage that transfers automatically with the VIN." },
  { question: "Does a salvage Tesla still have any warranty?", answer: "No. A salvage title brand voids all Tesla factory warranty coverage permanently — the 4-year Basic Vehicle Limited Warranty and the 8-year battery and drive unit warranty both stop applying the moment the salvage brand is recorded. The same is true for a rebuilt brand applied after a salvage Tesla is repaired and re-inspected by the state. Tesla will not perform warranty repairs on a salvage or rebuilt VIN, and Tesla service centers may decline some out-of-warranty work on these vehicles as well. A Tesla warranty check reads NMVTIS for salvage and rebuilt brands so you see both the warranty estimate and the voiding-brand status before purchase." },
  { question: "How much does a Tesla battery replacement cost out of warranty?", answer: "Tesla battery pack replacements outside warranty typically cost $10,000 to $20,000 depending on model and pack size — Model 3 / Y Standard Range packs sit at the lower end, Model S / X long-range packs at the upper end. Labor adds several hundred dollars on top of the part cost. This is why the 8-year / model-specific-mileage battery warranty matters so much on used Teslas: a warranty-eligible pack replacement is free, while an out-of-warranty replacement can equal a significant fraction of the Tesla's used value. A Tesla warranty check tells you whether the 8-year battery warranty is still active on a specific VIN before you commit." },
];

export default function TeslaWarrantyCheckBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Shield className="w-4 h-4" /> {c.badge}
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
                  <code className="font-mono font-black text-primary text-xs flex-shrink-0 w-20">{r.code}</code>
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
                <Link href="/warranty-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink1}</Link>
                {c.dangerNoteMid2}
                <Link href="/salvage-title-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink2}</Link>
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
                <Link href="/warranty-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.cert2Link1}</Link>
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

        <RelatedChecks exclude="/tesla-warranty-check" />
      </div>
    </article>
  );
}

export { FAQS_EN };
