/**
 * Body for /kbb-vin-lookup — English-only landing page.
 * Pairs CarCheckerVIN history with Kelley Blue Book valuation.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, BookOpen,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, TrendingUp,
  DollarSign, Calculator, ClipboardCheck, AlertTriangle, Gauge, Cpu,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";

const QUICK_ANSWER_ITEMS = [
  {
    question: "Does KBB do a free VIN lookup?",
    answer: (
      <>
        <strong>Yes.</strong> Kelley Blue Book offers a free VIN-based valuation
        at kbb.com, but it does not pull title brands or accident history. Pair
        it with <strong>CarCheckerVIN&apos;s</strong> free history check —
        backed by <strong>NMVTIS</strong>, the federal title database — to see
        both value and history.
      </>
    ),
  },
  {
    question: "What does a KBB VIN lookup show?",
    answer: (
      <>
        KBB returns the decoded year, make, model, trim, and factory options
        plus a Fair Market Range for private-party sale, trade-in, and dealer
        retail based on mileage, condition tier, and ZIP code. It does not
        show title brands, recalls, accidents, or odometer rollback records.
      </>
    ),
  },
  {
    question: "What does a VIN history check add to a KBB estimate?",
    answer: (
      <>
        A history lookup tells you whether the car matches the clean-history
        assumption KBB uses. A reported accident typically shaves 5-30% off
        resale value, a salvage or rebuilt title 30-50%, and odometer rollback
        can collapse it entirely. NMVTIS surfaces all three.
      </>
    ),
  },
];

const HOW_ICONS = [Search, BookOpen, Calculator] as const;
const SIGN_ICONS = [DollarSign, TrendingUp, Gauge, AlertTriangle, FileText, Cpu] as const;
const DANGER_ICONS = [Calculator, Shield, BadgeCheck] as const;

const COPY = {
  home: "Home",
  crumb: "KBB VIN Lookup",
  badge: "Pair Your KBB Estimate with a Free VIN Check",
  h1Lead: "KBB VIN Lookup — ",
  h1Accent: "Pair Blue Book Value with Free History",
  intro: "Kelley Blue Book is the gold standard for what a used car is worth. But the Blue Book Fair Market Range assumes the car has a clean history — and a single hidden accident, title brand, or rolled-back odometer can quietly turn a fair KBB estimate into a money pit. Run any 17-character VIN below to pair your KBB lookup with a free vehicle history check.",
  formHeading: "Pair Your KBB Value with a Free VIN History Check",
  formSub: "Enter any 17-character VIN — we'll surface the title, accident, recall, and odometer history that affects the Blue Book value",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: BookOpen, value: "KBB", label: "valuation companion" },
    { icon: Database, value: "NMVTIS", label: "title & history data" },
    { icon: TrendingUp, value: "Fair", label: "market range insight" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "What KBB Tells You vs. What a VIN Lookup Tells You",
  howIntro: "Kelley Blue Book and a VIN history report answer two different questions about the same car. Used together, they give you the full picture before you buy.",
  howSteps: [
    { tag: "KBB", title: "What it is worth", body: "Kelley Blue Book uses transaction data, region, mileage, trim, and condition to estimate a Fair Market Range and Fair Purchase Price. It is the standard reference for what a typical example of this make, model, and year sells for today." },
    { tag: "VIN History", title: "What is in its past", body: "A VIN history check pulls title brands, reported accidents, recall status, odometer records, and salvage events from NMVTIS, state DMVs, and insurers. It answers whether this specific VIN matches the clean-car assumption that the KBB value is built on." },
    { tag: "Together", title: "What it is really worth to you", body: "A clean VIN history confirms the KBB estimate is realistic. A flagged history — salvage brand, prior major accident, odometer rollback — tells you to discount well below KBB, walk away, or negotiate hard before you commit." },
  ],
  h2KbbWorks: "How a KBB VIN Lookup Works (on kbb.com)",
  kbbWorksIntro: "Kelley Blue Book's own VIN lookup is built around valuation. Here is what the kbb.com VIN tool actually returns, and where it stops short.",
  kbbWorksPara1Pre: "On kbb.com you enter a 17-character VIN and KBB decodes the year, make, model, trim, and factory equipment. It then asks you to confirm the ",
  kbbWorksPara1Bold: "mileage and condition",
  kbbWorksPara1Suffix: " (Excellent, Very Good, Good, or Fair) and your ZIP code. From those inputs Kelley Blue Book returns a Fair Market Range for private-party sale, trade-in, and dealer retail.",
  kbbWorksPara2Pre: "That is enormously useful — KBB's pricing data is sourced from millions of transactions and is the figure most buyers, sellers, and lenders anchor to. But the kbb.com VIN lookup ",
  kbbWorksPara2Bold: "does not pull title brands, reported accidents, recall status, or odometer rollback records",
  kbbWorksPara2Suffix: ". Those records live in NMVTIS and state DMV systems, not in KBB's valuation database.",
  kbbWorksPara3: "That gap is exactly what a free VIN history check fills in. KBB tells you what a clean version of this car is worth in your area. The VIN history tells you whether the specific car in front of you actually matches that clean baseline.",
  kbbCardTitle: "What KBB returns vs. what it does not",
  kbbCardYes: [
    "Year, make, model, trim, factory options",
    "Fair Market Range for private-party sale",
    "Trade-in value range",
    "Dealer retail / certified retail estimate",
    "Adjustments for mileage, condition, ZIP",
  ],
  kbbCardNo: [
    "Title brands (salvage, flood, rebuilt)",
    "Reported accidents and damage events",
    "Open recall status from NHTSA",
    "Odometer rollback / inconsistency flags",
    "Insurance total-loss declarations",
  ],
  kbbCardNote: "A free CarCheckerVIN lookup fills in every item in the right-hand column — so the KBB estimate you trust is for the car you actually have.",
  h2Pair: "Why Pair KBB with a Free VIN History Check",
  pairIntro: "KBB tells you what the car is worth. We tell you what's IN the car's history that affects that number. Use them together and you stop overpaying for the wrong VIN.",
  pairBoxTitle: "The two-tool used-car workflow",
  pairBoxBody: "KBB tells you what the car is worth. CarCheckerVIN tells you what's in the car's history that affects that number. Run both before you make an offer.",
  pairPoints: [
    "KBB's Fair Market Range assumes a clean title and no major prior accidents — that assumption breaks the moment a salvage brand or major collision shows up on the VIN.",
    "A reported accident with airbag deployment can reduce a car's resale value by 10-30% versus a clean equivalent. KBB cannot see that event; a VIN history check can.",
    "Odometer rollback artificially inflates the KBB value — a car priced for 60,000 miles that actually has 130,000 is one of the most common used-car scams.",
    "Open safety recalls do not lower the KBB number, but they cost time and money to fix and may signal deferred maintenance. A VIN history surfaces them in seconds.",
  ],
  h2Impact: "How History Affects a KBB Fair Market Range",
  impactIntro: "A title brand or major accident does not just dent resale value — it can put the car in a different valuation tier entirely. Here is how the most common history flags move the KBB number.",
  impact1Pre: "A salvage or rebuilt title is the single biggest history-driven discount. Industry data and dealer pricing consistently show salvage-titled vehicles trading ",
  impact1Bold1: "30-50% below",
  impact1Mid: " the clean-title KBB Fair Market Range for the same year, make, model, and mileage. KBB will not return a normal value for a salvage VIN — many lenders also refuse to finance one, and most full-coverage insurers will only write liability.",
  impact1Suffix: "",
  impact2Pre: "A reported major accident with structural or airbag deployment typically discounts a vehicle ",
  impact2Bold: "10-30%",
  impact2Suffix: " versus a clean equivalent, depending on severity, age, and brand. Even a minor reported accident usually shaves a few percentage points off — and it follows the VIN to the next owner, the one after that, and every KBB-anchored negotiation in between.",
  impact3Pre: "Odometer rollback distorts everything. If KBB returns a value of $14,000 for a 60,000-mile car that actually has 130,000 miles, the real value is closer to ",
  impact3Bold: "$9,000",
  impact3Suffix: " — a $5,000 gap created entirely by a falsified mileage reading. A VIN check that compares reported odometer readings over time is the cleanest defense.",
  impactCardTitle: "Typical KBB impact of a history flag",
  impactRows: [
    { label: "Clean history", value: "KBB as-is" },
    { label: "Minor reported accident", value: "−5 to −10%" },
    { label: "Major / airbag accident", value: "−10 to −30%" },
    { label: "Salvage / rebuilt title", value: "−30 to −50%" },
    { label: "Odometer rollback", value: "value collapses" },
  ],
  impactCardNote: "Ranges are typical market discounts versus a clean-history KBB Fair Market Range — actual impact depends on severity, region, and age.",
  h2Steps: "Step-by-Step: KBB + VIN History for a Used Car Purchase",
  stepsIntro: "The fastest way to avoid overpaying on a used car is to run both lookups before you make any offer. Five steps, about ten minutes total.",
  steps: [
    { title: "Get the 17-character VIN", body: "Read the VIN from the lower driver-side windshield, the door-jamb sticker, the title, or the listing photos. Confirm it is exactly 17 characters with no letters I, O, or Q." },
    { title: "Run the VIN at kbb.com", body: "Enter the VIN at kbb.com, confirm mileage and the condition tier, and add the ZIP code. Capture the Fair Market Range and the Fair Purchase Price — these are your negotiation anchors." },
    { title: "Run the same VIN here for free history", body: "Paste the same VIN into the search box on this page. The free history check surfaces title brands, reported accidents, recall status, and odometer records — the inputs KBB does not see." },
    { title: "Compare the two outputs", body: "If the history is clean, the KBB estimate is realistic and you can negotiate normally. If the history is flagged, adjust your offer downward using the typical discount ranges, or walk away if the flag is severe." },
    { title: "Confirm with a pre-purchase inspection", body: "Even a clean VIN and a fair KBB number do not replace eyes on the car. A 150-dollar pre-purchase inspection from an independent mechanic catches what neither tool can — and pays for itself many times over on the first deal." },
  ],
  midCtaHeading: "Run the Same VIN for Free History — Right Now",
  midCtaSub: "You already know the KBB value. See whether the title, accident, and odometer history backs it up — free, in seconds, no sign-up.",
  h2Difference: "How KBB and Carfax (and CarCheckerVIN) Differ",
  differenceIntro: "Three of the most-searched used-car names answer three different questions. Knowing which tool answers which question is how you stop overpaying.",
  differenceCards: [
    { title: "Kelley Blue Book (KBB)", body: "A valuation tool. KBB tells you what a typical example of the year, make, model, trim, and mileage is worth in your region — Fair Market Range, trade-in, and dealer retail. It does not surface history events." },
    { title: "Carfax / AutoCheck", body: "Paid vehicle history reports. They pull title, accident, service, and ownership records into a long PDF and charge per report or per subscription. Excellent depth, but the per-report fee adds up fast when you are comparing several cars." },
    { title: "CarCheckerVIN", body: "A free VIN history check sourced from NMVTIS — title brands, salvage events, recall status, odometer records — designed to pair with whatever valuation tool you are already using. Free first-pass screening for every VIN you consider." },
  ],
  differenceNoteBoldLead: "The smart workflow:",
  differenceNoteMid1: " run the VIN at kbb.com for value, run it here for free history, and only pay for a deeper ",
  differenceNoteLink1: "full VIN history report",
  differenceNoteMid2: " or a Carfax on the one or two cars you actually want to buy. Always finish with an in-person ",
  differenceNoteLink2: "accident history check",
  differenceNoteSuffix: " and an independent mechanic's inspection.",
  h2Inspect: "Buying a Used Car? Verify Before You Anchor on a Number",
  inspect1Pre: "A KBB Fair Market Range is only as honest as the inputs you feed it. Mileage, condition, and ZIP are easy to enter accurately — but ",
  inspect1Bold: "history is the hidden input",
  inspect1Suffix: ", and KBB cannot pull it for you.",
  inspect2Pre: "Pair the KBB lookup with a free ",
  inspect2Link1: "VIN history report",
  inspect2Mid: " and a ",
  inspect2Link2: "salvage title check",
  inspect2Suffix: " for the most complete picture of what the car is actually worth — not just what a clean version of it would be worth.",
  inspect3: "When in doubt, pay an independent mechanic for a pre-purchase inspection. A few hundred dollars up front is far cheaper than discovering a hidden structural repair after the title transfer.",
  inspectCardTitle: "KBB + VIN history checklist",
  inspectChecklist: [
    "Get the 17-character VIN from the windshield or door jamb",
    "Run the VIN at kbb.com for the Fair Market Range",
    "Run the same VIN here for free title, accident, and recall history",
    "Discount the KBB number for any reported damage or brand",
    "Verify the listed mileage matches reported odometer readings",
    "Finish with a pre-purchase inspection by an independent mechanic",
  ],
  inspectCardCta: "Free VIN history check to pair with your KBB lookup:",
  h2Internal: "More Tools That Pair With KBB and a VIN Lookup",
  internalIntro: "Valuation is one input. These free tools cover the rest of the used-car decision.",
  internalLinks: [
    { href: "/market-value", label: "Vehicle Market Value", desc: "Cross-check the KBB Fair Market Range against current listing data for the same year, make, and model." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17-character VIN to year, make, model, trim, engine, and factory-installed options." },
    { href: "/vin-check", label: "Full VIN History Check", desc: "Title brands, reported accidents, recall status, odometer records, and salvage events in one report." },
    { href: "/trade-in-value-estimator", label: "Trade-In Value Estimator", desc: "Estimate what a dealer is likely to offer for your current car when you bring it in." },
    { href: "/car-depreciation-calculator", label: "Car Depreciation Calculator", desc: "Project how much value a specific year, make, and model will lose over the next three to five years." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Confirm a vehicle does not carry a salvage, rebuilt, junk, or non-repairable title brand." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions and airbag-deployment events that drag the KBB resale number down." },
    { href: "/pricing", label: "Pricing", desc: "Compare CarCheckerVIN report tiers when you want to go beyond the free VIN history check." },
  ],
  h2Faq: "KBB VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions used-car buyers ask most when pairing a KBB lookup with a VIN history check.",
  bottomBadge: "Free · Instant · Pairs with KBB",
  ctaBottomHeading: "Got a KBB Estimate? Verify the History — Free.",
  ctaBottomSub: "Enter a 17-character VIN to surface the title, accident, recall, and odometer records that decide whether the Kelley Blue Book value actually applies to this specific car.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "Does KBB do a free VIN lookup?", answer: "Yes. Kelley Blue Book offers a free VIN lookup at kbb.com — you enter the 17-character VIN, confirm mileage and condition, and add a ZIP code, and KBB returns a Fair Market Range for private-party sale, trade-in, and dealer retail. The KBB VIN lookup is a valuation tool, however; it does not pull title brands, reported accidents, recall status, or odometer rollback records. For that side of the picture, pair the KBB lookup with a free VIN history check like the one on this page." },
  { question: "What does KBB show with a VIN?", answer: "A KBB VIN lookup shows the decoded year, make, model, trim, and factory equipment, plus a Fair Market Range based on mileage, condition tier (Excellent, Very Good, Good, or Fair), and ZIP code. You get separate estimates for private-party sale, trade-in to a dealer, and dealer retail or certified retail. What KBB does not show is the vehicle's history — title brands, reported damage, open recalls, and odometer records all live in NMVTIS and state DMV systems, not in the KBB valuation database." },
  { question: "Is the KBB VIN lookup free?", answer: "Yes. Kelley Blue Book's VIN lookup and Fair Market Range tools at kbb.com are free to use — there is no paywall, no sign-up, and no per-report charge for the core valuation. The free CarCheckerVIN history check on this page is also free with no sign-up. The combination of KBB for value and CarCheckerVIN for history covers most of what a typical used-car buyer needs at zero cost." },
  { question: "Can I get a car's value by VIN?", answer: "Yes — that is exactly what a KBB VIN lookup is designed for. Enter the 17-character VIN at kbb.com along with the current mileage, condition tier, and ZIP code, and KBB returns a value range tailored to your specific vehicle and region. For the most accurate negotiation anchor, run the same VIN through a free history check first: a salvage brand, prior major accident, or odometer rollback can shift the actual market value 10-50% below the standard KBB number." },
  { question: "How do KBB and Carfax differ?", answer: "KBB and Carfax answer two different questions. Kelley Blue Book is a valuation tool — it tells you what a typical example of the year, make, model, and mileage is worth in your region. Carfax is a vehicle history report — it tells you what has happened to that specific VIN over its lifetime, including title brands, accidents, service records, and ownership changes. KBB does not surface history; Carfax does not return a value range. Used together, they cover both questions. A free VIN history check like CarCheckerVIN's covers the same NMVTIS-sourced history layer at no cost." },
  { question: "What does a VIN lookup add to a KBB estimate?", answer: "A VIN history lookup tells you whether the specific car matches the clean-history assumption baked into the KBB Fair Market Range. A clean history confirms the KBB number is realistic. A flagged history adjusts it — a minor reported accident typically shaves 5-10% off resale value, a major accident with airbag deployment 10-30%, a salvage or rebuilt title 30-50%, and odometer rollback can collapse the value entirely. The free history check turns the KBB estimate from a generic number into a number for the actual car in front of you." },
  { question: "Can a VIN tell me the original MSRP?", answer: "Sometimes, depending on the make, model, and decoder. A VIN decoder unpacks the year, make, model, trim, engine, and factory-installed options, and many decoders return the manufacturer's original MSRP for the vehicle and its options as configured. KBB and other valuation tools then use today's market data to translate that original MSRP and the current mileage and condition into a present-day Fair Market Range — original MSRP is the starting point, current KBB value is what the same car is worth now." },
];

export default function KbbVinLookupBody() {
  const c = COPY;
  const faqs = FAQS_EN;
  const link = (en: string) => en;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <BookOpen className="w-4 h-4" /> {c.badge}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2KbbWorks}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.kbbWorksIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.kbbWorksPara1Pre}
                <strong className="text-on-surface">{c.kbbWorksPara1Bold}</strong>
                {c.kbbWorksPara1Suffix}
              </p>
              <p>
                {c.kbbWorksPara2Pre}
                <strong className="text-on-surface">{c.kbbWorksPara2Bold}</strong>
                {c.kbbWorksPara2Suffix}
              </p>
              <p>{c.kbbWorksPara3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.kbbCardTitle}</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-green-700 mb-2">KBB returns</div>
                  <ul className="space-y-1.5 text-sm text-on-surface">
                    {c.kbbCardYes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-outline-variant/60">
                  <div className="text-xs font-black uppercase tracking-wider text-amber-700 mb-2">KBB does not return</div>
                  <ul className="space-y-1.5 text-sm text-on-surface">
                    {c.kbbCardNo.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.kbbCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Pair}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.pairIntro}</p>
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6 sm:p-7 mb-6">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-headline font-extrabold text-primary mb-1.5">{c.pairBoxTitle}</h3>
                <p className="text-sm sm:text-base text-on-surface leading-relaxed">{c.pairBoxBody}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.pairPoints.map((item, i) => (
              <div key={i} className="flex gap-3 items-start rounded-2xl border border-outline-variant bg-surface p-5">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item}</p>
              </div>
            ))}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Impact}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.impactIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.impact1Pre}
                <strong className="text-on-surface">{c.impact1Bold1}</strong>
                {c.impact1Mid}
              </p>
              <p>
                {c.impact2Pre}
                <strong className="text-on-surface">{c.impact2Bold}</strong>
                {c.impact2Suffix}
              </p>
              <p>
                {c.impact3Pre}
                <strong className="text-on-surface">{c.impact3Bold}</strong>
                {c.impact3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.impactCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.impactRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.impactCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Steps}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.stepsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.steps.map((s, i) => {
              const Icon = SIGN_ICONS[i];
              return (
                <div key={s.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">Step {i + 1}</div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Difference}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.differenceIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.differenceCards.map((item, i) => {
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
                <strong className="text-on-surface">{c.differenceNoteBoldLead}</strong>
                {c.differenceNoteMid1}
                <Link href={link("/vin-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.differenceNoteLink1}</Link>
                {c.differenceNoteMid2}
                <Link href={link("/accident-history-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.differenceNoteLink2}</Link>
                {c.differenceNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Inspect}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.inspect1Pre}
                <strong className="text-on-surface">{c.inspect1Bold}</strong>
                {c.inspect1Suffix}
              </p>
              <p>
                {c.inspect2Pre}
                <Link href={link("/vin-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.inspect2Link1}</Link>
                {c.inspect2Mid}
                <Link href={link("/salvage-title-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.inspect2Link2}</Link>
                {c.inspect2Suffix}
              </p>
              <p>{c.inspect3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.inspectCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.inspectChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.inspectCardCta}</p>
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
              <Link key={l.href} href={link(l.href)} className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group">
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
            {faqs.map((f) => (
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

        <RelatedChecks exclude="/kbb-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
