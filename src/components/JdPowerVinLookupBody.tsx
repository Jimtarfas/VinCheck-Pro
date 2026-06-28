/**
 * Body for /jd-power-vin-lookup — English-only landing page targeting the
 * "j.d. power vin lookup" keyword (~1K US monthly searches).
 * Position: J.D. Power offers VIN-based valuation (Used Car Values, formerly
 * NADAguides). CarCheckerVIN is the HISTORY layer that affects the appraisal.
 * Never disparages J.D. Power; positions the two services as complementary.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, DollarSign,
  TrendingUp, AlertTriangle, ClipboardCheck, Scale, Layers,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const HOW_ICONS = [DollarSign, Search, FileText] as const;
const TIER_ICONS = [BadgeCheck, Layers, TrendingUp, AlertTriangle] as const;
const COMPARE_ICONS = [Scale, DollarSign, TrendingUp] as const;

const COPY = {
  home: "Home",
  crumb: "J.D. Power VIN Lookup",
  badge: "J.D. Power VIN Lookup   +   Free Title & Recall History",
  h1Lead: "J.D. Power VIN Lookup — ",
  h1Accent: "Pair the Valuation With a Free History Check.",
  intro: "J.D. Power runs one of the most respected VIN-keyed valuation tools in the industry — the same Used Car Values that dealers and lenders have leaned on since J.D. Power acquired NADA Guides in 2015. The valuation answers what a car is worth on the wholesale and retail market. It does not, however, answer whether the car has been in a flood, branded salvage, or carries open recalls. That is where this page comes in. Run your free VIN history check below, then take the result straight into your J.D. Power appraisal so the dollar figure reflects the car you are actually buying.",
  formHeading: "Free VIN History Check — Pair It With Your J.D. Power Valuation",
  formSub: "Enter the VIN and we'll surface title brands, salvage records, and open recalls — the inputs that determine which J.D. Power value tier your car actually belongs in.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: DollarSign, value: "Value", label: "tier inputs" },
    { icon: Shield, value: "Title", label: "brand history" },
    { icon: Car, value: "Recall", label: "status by VIN" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],

  h2What: "What J.D. Power Does With a VIN",
  whatIntro: "J.D. Power's VIN-based valuation tool — formerly known as NADAguides and now branded J.D. Power Used Car Values — takes the 17-character VIN and returns a vehicle-specific market value. The tool draws on the same dealer wholesale and retail data set that powers professional NADA reports, then publishes a consumer-facing version on jdpower.com/cars.",
  whatBoldLead: "Used Car Value tiers.",
  whatRest: " A J.D. Power VIN lookup typically returns four key dollar figures: Rough Trade-In, Average Trade-In, Clean Trade-In, and Clean Retail. Trade-In tiers reflect what a dealer would pay you for the car at the curb. Clean Retail reflects the asking price a dealer would put on the same vehicle after reconditioning. The spread between Rough Trade-In and Clean Retail can easily exceed several thousand dollars on the same VIN — and the condition you self-report is what slides the appraisal up or down the ladder.",
  whatCardTitle: "What a J.D. Power VIN lookup returns",
  whatRows: [
    { label: "Rough Trade-In", value: "Bottom tier · dealer wholesale" },
    { label: "Average Trade-In", value: "Mid tier · typical curb offer" },
    { label: "Clean Trade-In", value: "Top trade tier · no major issues" },
    { label: "Clean Retail", value: "Asking price · reconditioned" },
  ],
  whatCardNote: "The basic J.D. Power Used Car Value lookup is free at jdpower.com/cars. Professional NADA dealer reports cost more and are sold through J.D. Power's commercial channels.",

  h2Gap: "What J.D. Power Valuation Does NOT Cover",
  gapIntro: "J.D. Power is, by design, a pricing benchmark. It tells you what a vehicle of a given year, make, model, trim, mileage, and self-reported condition is worth. It does not run a title-brand or accident-history check on the specific VIN you entered — that is not what the tool is built to do.",
  gap1Pre: "When you choose a condition slider — Rough, Average, Clean — J.D. Power assumes you are describing the car ",
  gap1Bold: "honestly and accurately",
  gap1Suffix: ". The valuation is anchored to that condition. If the car has a salvage title, an undisclosed flood record, or unrepaired collision damage and you click Clean anyway, the dollar figure you get back is for a clean car that does not exist.",
  gap2: "That is exactly the gap a free VIN history check fills. We surface the title brands, salvage records, and open recalls that should pull a J.D. Power valuation down a tier — or rule the car out of a J.D. Power tier altogether.",
  gapCardTitle: "Not in a J.D. Power valuation",
  gapList: [
    "Title brands (flood, salvage, junk, rebuilt, lemon)",
    "Accident and total-loss claim history",
    "Open NHTSA safety recalls by VIN",
    "Odometer rollback and mileage discrepancies",
    "Auction sale history at Copart and IAA",
  ],
  gapCardNote: "Run a free VIN history check first, then take the findings into your J.D. Power lookup so the condition tier you pick reflects reality.",

  midCtaHeading: "Check the History Before You Trust the J.D. Power Value",
  midCtaSub: "Run a free VIN history check on the exact car you are appraising. Title brands, salvage flags, and open recalls — instant, no sign-up.",

  h2Tiers: "How Vehicle History Affects a J.D. Power Value Tier",
  tiersIntro: "The four J.D. Power value tiers are not interchangeable — each assumes a specific condition profile. A clean VIN history is the price of entry for the top tiers. Here is how the title and history record we surface maps onto the dollar figure you see in your J.D. Power appraisal.",
  tiers: [
    { title: "Clean Retail — top tier", body: "Requires a clean title with no major brands, no significant accident history, full service records, and showroom-grade cosmetic condition. A single salvage or flood brand on the VIN takes the car out of Clean Retail consideration." },
    { title: "Clean Trade-In", body: "Assumes a clean title and no mechanical issues. Minor cosmetic flaws are allowed. An open safety recall the seller never resolved is a yellow flag — surface it before you accept this tier as the baseline." },
    { title: "Average Trade-In", body: "Allows for normal wear-and-tear and modest cosmetic issues. Even at this tier, a branded title (salvage, flood, rebuilt) typically pushes the car below the J.D. Power tier system entirely and into a separate branded-title valuation." },
    { title: "Rough Trade-In — bottom tier", body: "Bottom of the J.D. Power tier ladder. A salvage title can knock the value 30–50% below even this floor because the standard J.D. Power Used Car Value pricing assumes a clean, registrable title across all four tiers." },
  ],

  h2Compare: "J.D. Power vs KBB vs Edmunds — Quick Comparison",
  compareIntro: "J.D. Power is one of three big consumer-facing VIN valuation tools. Each draws from a different data set and serves a slightly different audience. None of them runs a title or accident check on the VIN — that is universal to the category.",
  compares: [
    { title: "J.D. Power (NADA)", body: "Dealer-side benchmarks. Built on the wholesale and retail data set J.D. Power inherited from NADA Guides in 2015. Strongest for trade-in negotiations and lender appraisals because that is where the original NADA data was authoritative." },
    { title: "Kelley Blue Book (KBB)", body: "Blends consumer and dealer pricing. Adds a Private Party Value tier that J.D. Power does not publish at the same prominence, which makes KBB the go-to for buyers selling to another individual rather than trading to a dealer." },
    { title: "Edmunds (TMV)", body: "Consumer-side True Market Value. Skews toward actual transaction prices reported by buyers and dealers. Useful as a third opinion to triangulate when J.D. Power and KBB disagree on the same VIN." },
  ],
  compareNoteBoldLead: "Cross-reference all three.",
  compareNoteMid1: " A 20-second cross-check against a ",
  compareNoteLink1: "KBB VIN lookup",
  compareNoteMid2: " and an ",
  compareNoteLink2: "Edmunds VIN lookup",
  compareNoteSuffix: " is the fastest way to spot an outlier — but layer all three on top of the VIN history check below before you make an offer.",

  h2Steps: "Step-by-Step: J.D. Power Valuation + Free VIN History Check",
  stepsIntro: "Three steps that fold a free VIN history check into your J.D. Power appraisal. Do them in this order and you'll never overpay for a branded title disguised as a clean one.",
  howSteps: [
    { tag: "Step 1", title: "Run the J.D. Power VIN lookup", body: "Go to jdpower.com/cars, enter the 17-character VIN, and review the Rough Trade-In through Clean Retail tiers. Note the spread between the tiers — that is the dollar range your negotiation lives inside." },
    { tag: "Step 2", title: "Pull the free VIN history check", body: "Paste the same VIN into the form on this page. We return title brands, salvage records, and open recalls in seconds. This is the data that determines which J.D. Power tier the car actually belongs in." },
    { tag: "Step 3", title: "Pick the honest condition tier", body: "Take the history findings back into the J.D. Power tool and choose the condition tier that matches reality. If we found a salvage brand, the car is not Clean Retail. If we found an open recall, you have negotiation leverage at the Trade-In tiers." },
  ],

  h2Free: "Is the J.D. Power VIN Lookup Free?",
  free1Pre: "Yes — the basic J.D. Power Used Car Value lookup at ",
  free1Bold: "jdpower.com/cars",
  free1Suffix: " is free. You enter the VIN or the year/make/model/trim, pick a condition tier, and the tool returns the Rough Trade-In through Clean Retail dollar figures at no charge. That covers the use case most car buyers and sellers care about.",
  free2: "What costs more is the professional side of the business. The full J.D. Power NADA dealer reports — the ones with deep specification history, monthly value trend lines, and the wholesale auction comparables — are sold through J.D. Power's commercial channels and are priced for dealers and lenders, not consumers.",
  free3: "For most pre-purchase decisions, the free J.D. Power VIN lookup combined with the free VIN history check on this page is enough to walk into a deal informed. Order a paid full history report only if our free check raises a flag worth digging into.",

  h2Internal: "Related Tools That Round Out a J.D. Power Lookup",
  internalIntro: "These free CarCheckerVIN tools pair naturally with a J.D. Power valuation — from competing value benchmarks to the title and recall checks that anchor the appraisal in reality.",
  internalLinks: [
    { href: "/kbb-vin-lookup", label: "KBB VIN Lookup", desc: "Cross-check the J.D. Power valuation against Kelley Blue Book's consumer-and-dealer pricing tiers." },
    { href: "/edmunds-vin-lookup", label: "Edmunds VIN Lookup", desc: "Triangulate with Edmunds True Market Value to spot a J.D. Power outlier on the same VIN." },
    { href: "/market-value", label: "Market Value Estimator", desc: "Get a consolidated CarCheckerVIN market value figure that blends multiple pricing benchmarks." },
    { href: "/trade-in-value-estimator", label: "Trade-In Value Estimator", desc: "Estimate your trade-in figure independently before walking into the dealer with a J.D. Power printout." },
    { href: "/vin-check", label: "Full VIN Check", desc: "Comprehensive history report — title brands, accidents, odometer, and recalls in one place." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Confirm the year, make, model, and trim a J.D. Power lookup will price against." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Confirm whether the VIN carries a salvage brand that pulls it out of J.D. Power's tier system." },
    { href: "/pricing", label: "Full Report Pricing", desc: "See what a paid CarCheckerVIN full history report covers if the free check raises a flag." },
  ],

  h2Faq: "J.D. Power VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions car buyers ask most when they pair a J.D. Power VIN lookup with a free history check.",

  bottomBadge: "Free · Instant · NMVTIS-Sourced",
  ctaBottomHeading: "Ready to Pair a History Check With Your J.D. Power Lookup?",
  ctaBottomSub: "Enter any 17-character VIN to run a free CarCheckerVIN history check, then take the findings into your J.D. Power Used Car Value appraisal. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "Does J.D. Power do a free VIN lookup?", answer: "Yes. J.D. Power offers a free VIN-based Used Car Value lookup on jdpower.com/cars. You enter the 17-character VIN or pick the year, make, model, and trim manually, then choose a condition tier. The tool returns the Rough Trade-In, Average Trade-In, Clean Trade-In, and Clean Retail dollar figures at no charge. The basic consumer lookup is free; J.D. Power's professional NADA dealer reports — used by dealers, lenders, and insurers — are paid products sold through J.D. Power's commercial channels. For most car-buying decisions, the free J.D. Power VIN lookup combined with a free CarCheckerVIN history check on this page is enough." },
  { question: "What does J.D. Power show with a VIN?", answer: "A J.D. Power VIN lookup returns a vehicle-specific market valuation across four tiers: Rough Trade-In (bottom tier, dealer wholesale floor), Average Trade-In (typical curb offer), Clean Trade-In (top trade tier for a no-issues car), and Clean Retail (asking price after dealer reconditioning). It also displays the decoded year, make, model, and trim the valuation is based on, plus mileage-adjusted figures and any optional equipment that affects value. What J.D. Power does not show with a VIN is the car's title-brand history, accident record, or open recalls — those come from a separate VIN history check." },
  { question: "What's the difference between J.D. Power and NADA Guides?", answer: "They are the same data set under different names. J.D. Power acquired NADA Used Car Guide in 2015 and progressively rebranded the consumer-facing product as J.D. Power Used Car Values. The wholesale and retail pricing data that powered NADA Guides — the gold-standard reference dealers and lenders had used for decades — now sits inside the J.D. Power valuation tool. When you see Trade-In and Retail figures on jdpower.com/cars, that is the modern interface to the same NADA pricing data set, refreshed and maintained by J.D. Power." },
  { question: "How is J.D. Power Used Car Value calculated?", answer: "J.D. Power calculates Used Car Values from a continuously updated pool of wholesale auction transactions, dealer retail sales, and certified pre-owned listings nationwide. The tool takes your VIN, decodes the exact year, make, model, trim, and factory equipment, then applies regional and condition adjustments to produce the four tier values. Mileage is the single biggest individual variable — well above or below the average for the car's age slides the figure significantly. The condition tier you pick (Rough, Average, Clean) then anchors the final dollar amount. The valuation does not pull a title-brand or accident-history record on the specific VIN, which is why pairing it with a free VIN history check matters." },
  { question: "Does J.D. Power show accident history by VIN?", answer: "No. J.D. Power's VIN lookup is a valuation tool, not a vehicle history report. It does not query NMVTIS, state DMV title records, or insurance accident databases — that is not what the tool is designed to do. If a car has been in a major accident, branded a flood loss, or carries a salvage title, the J.D. Power valuation will not reflect those facts unless you manually downgrade the condition tier you pick. That is precisely why a free VIN history check — which surfaces title brands, salvage records, and open recalls — is the natural companion to a J.D. Power appraisal." },
  { question: "What's better — J.D. Power, KBB, or Edmunds?", answer: "All three are credible. They simply draw from different data sets and serve slightly different audiences. J.D. Power, via the former NADA Guides data, leans dealer-side and is strongest for trade-in negotiations and lender appraisals. Kelley Blue Book blends consumer and dealer pricing and publishes a prominent Private Party Value tier that suits buyers selling to another individual. Edmunds True Market Value tilts toward actual reported transaction prices and is useful as a third opinion when J.D. Power and KBB disagree. The smartest approach is to cross-reference all three for the same VIN, then layer a free VIN history check on top before you finalize the offer." },
  { question: "Can I trust a J.D. Power value without a history check?", answer: "Not entirely, no. The J.D. Power valuation is reliable for what it measures — the market value of a vehicle of a given year, make, model, trim, mileage, and self-reported condition. It is not reliable as a standalone signal of whether the specific car in front of you matches that condition profile. A flood-damaged car with an undisclosed brand will return the same Clean Retail figure as a pristine one if you click Clean — but the actual car is worth a fraction of that. A free CarCheckerVIN history check takes about ten seconds and tells you whether the condition tier you picked in J.D. Power is honest. That is the cheap insurance step that makes the valuation trustworthy." },
];

export default function JdPowerVinLookupBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <DollarSign className="w-4 h-4" /> {c.badge}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2What}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.whatIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                <strong className="text-on-surface">{c.whatBoldLead}</strong>
                {c.whatRest}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.whatCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.whatRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary text-xs">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.whatCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Gap}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.gapIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.gap1Pre}
                <strong className="text-on-surface">{c.gap1Bold}</strong>
                {c.gap1Suffix}
              </p>
              <p>{c.gap2}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.gapCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.gapList.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.gapCardNote}</p>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Tiers}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.tiersIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.tiers.map((t, i) => {
              const Icon = TIER_ICONS[i];
              return (
                <div key={t.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{t.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{t.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Compare}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.compareIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.compares.map((item, i) => {
              const Icon = COMPARE_ICONS[i];
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
              <Scale className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.compareNoteBoldLead}</strong>
                {c.compareNoteMid1}
                <Link href="/kbb-vin-lookup" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.compareNoteLink1}</Link>
                {c.compareNoteMid2}
                <Link href="/edmunds-vin-lookup" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.compareNoteLink2}</Link>
                {c.compareNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Steps}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.stepsIntro}</p>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Free}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.free1Pre}
                <strong className="text-on-surface">{c.free1Bold}</strong>
                {c.free1Suffix}
              </p>
              <p>{c.free2}</p>
              <p>{c.free3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">Free vs paid breakdown</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span><strong>Free:</strong> J.D. Power Used Car Value lookup on jdpower.com/cars (Rough → Clean Retail tiers)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span><strong>Free:</strong> CarCheckerVIN history check on this page (title brands, recalls)</span>
                </li>
                <li className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Paid:</strong> J.D. Power professional NADA dealer reports (commercial channels)</span>
                </li>
                <li className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Paid:</strong> CarCheckerVIN full history report when the free check raises a flag</span>
                </li>
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">Run the free CarCheckerVIN history check here:</p>
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

        <RelatedChecks exclude="/jd-power-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
