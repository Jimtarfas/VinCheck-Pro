/**
 * Body for /edmunds-vin-lookup — English-only SEO landing page targeting the
 * "edmunds vin lookup" keyword (~1.9K US monthly searches).
 * Angle: Edmunds is primarily a valuation tool (True Market Value). We position
 * CarCheckerVIN as the complementary history layer that makes an Edmunds
 * appraisal honest. Never disparages Edmunds.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, DollarSign, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, TrendingDown, Scale,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const DOES_ICONS = [Car, DollarSign, Gauge] as const;
const NOT_ICONS = [Shield, AlertTriangle, ClipboardCheck] as const;
const IMPACT_ICONS = [BadgeCheck, TrendingDown, Wrench] as const;
const STEP_ICONS = [Search, DollarSign, FileText] as const;

const COPY = {
  home: "Home",
  crumb: "Edmunds VIN Lookup",
  badge: "Edmunds VIN Lookup + Free Title & Recall History",
  h1Lead: "Edmunds VIN Lookup — ",
  h1Accent: "Pair the Appraisal With a Free History Check.",
  intro: "Edmunds is one of the strongest valuation tools on the internet. Its True Market Value (TMV) engine and 5-Year Cost to Own calculator give you a credible price for almost any used car in seconds. The one variable Edmunds cannot pull from a VIN, however, is the car's title and accident history — it asks you to self-report condition. Run the VIN through our free lookup first and you will know whether that self-report is honest before you trust the TMV. Free, instant, NMVTIS-sourced.",
  formHeading: "Free VIN History Check — Before You Trust an Edmunds Appraisal",
  formSub: "Enter the 17-character VIN and we'll surface title brands, salvage records, accident flags, and open recalls — instantly.",
  formNote: "Free preview · No sign-up · Instant result",
  trustStats: [
    { icon: DollarSign, value: "TMV", label: "valuation context" },
    { icon: Database, value: "NMVTIS", label: "title brand source" },
    { icon: Shield, value: "Salvage", label: "& accident flags" },
    { icon: BadgeCheck, value: "Free", label: "preview report" },
  ],
  h2Does: "What Edmunds Does With a VIN",
  doesIntro: "When you punch a VIN into Edmunds, the platform spins up three different products at once. Knowing exactly what each one returns — and what it doesn't — helps you use Edmunds the way it was built to be used.",
  doesSteps: [
    { tag: "Decoder", title: "Decodes the factory specs", body: "Edmunds reads the 17-character VIN and returns the year, make, model, trim, body style, engine, transmission, and original factory equipment. This is the same decoder layer most VIN tools share — it tells you what the car was built to be on day one." },
    { tag: "Valuation", title: "Computes True Market Value (TMV)", body: "Edmunds' flagship feature. TMV blends transaction data, regional supply, mileage, options, and a self-reported condition rating to produce a fair private-party, trade-in, and dealer-retail price. For most buyers, this is the headline number — and it is genuinely useful." },
    { tag: "Ownership", title: "Provides Edmunds 5-Year Cost to Own", body: "Edmunds projects depreciation, financing, insurance, taxes, fuel, maintenance, and repairs over a five-year horizon. It is one of the better total-cost models in the consumer space and is great for comparing two cars at the same purchase price." },
  ],
  h2Not: "What an Edmunds VIN Appraisal Does Not Cover",
  notIntro: "Edmunds is upfront about its scope. The valuation engine is excellent, but it is not a history report. Three categories of risk sit outside what an Edmunds VIN lookup returns — and each one can swing the real-world value of a car by thousands of dollars.",
  notItems: [
    { title: "Title brands and salvage history", body: "Edmunds does not query NMVTIS or state DMV title records. A car branded flood, salvage, junk, rebuilt, or lemon in any of the 50 states will still receive a clean-condition TMV from Edmunds unless you down-rate the condition yourself." },
    { title: "Accident reports and damage events", body: "Edmunds asks you to self-report whether the car has been in an accident. It does not pull a database of reported collisions. Sellers and even some honest owners simply do not know about damage that happened before they took ownership." },
    { title: "Condition is self-reported", body: "The TMV calculator asks you to rate the car as Outstanding, Clean, Average, or Rough. The right rating depends entirely on title and damage history that Edmunds does not check for you. A free VIN history lookup is what tells you whether the self-report is honest." },
  ],
  notNoteBoldLead: "Edmunds doesn't hide this.",
  notNoteRest: " The platform is explicit about being a valuation and ownership-cost tool, and it links out to history providers. We just make the history layer free, instant, and sourced from NMVTIS so you can complete the picture before you trust the appraisal.",
  midCtaHeading: "Run the VIN Through Our Free History Check",
  midCtaSub: "Before you trust an Edmunds True Market Value, confirm the title is clean and there are no salvage or accident flags. Free, in seconds, no sign-up.",
  h2Impact: "How a Clean vs. Branded VIN History Changes an Edmunds Appraisal",
  impactIntro: "TMV is built on the assumption that you have entered honest condition data. The moment a title brand or accident flag enters the picture, the realistic market value diverges sharply from the displayed TMV. Here is roughly how that divergence plays out in the wild.",
  impactItems: [
    { title: "Clean history → TMV is realistic", body: "If the VIN lookup returns no title brands, no salvage records, and no reported accidents, an Edmunds TMV at Clean or Outstanding condition is a fair starting point for negotiation. This is the case Edmunds is calibrated for, and the appraisal usually lands within a few percent of real transactions." },
    { title: "Salvage title → TMV drops 30–50%", body: "A salvage, junk, or non-repairable brand on the VIN typically erases 30 to 50 percent of the displayed TMV. Insurance is more expensive, financing is harder, and resale is a fraction of what Edmunds shows. The TMV is not wrong — it just assumes a clean title you no longer have." },
    { title: "Accident history → TMV drops 10–30%", body: "A reported accident — even one repaired correctly — typically takes 10 to 30 percent off the realistic market value depending on severity, structural involvement, and airbag deployment. Edmunds will give the same TMV the seller sees; the discount appears only when buyers walk away during the test drive." },
  ],
  impactBoldLead: "The valuation is fine; the input is the problem.",
  impactNoteRest: " A free VIN history check changes the condition rating you should enter into the TMV calculator. That single corrected input often moves the appraisal by several thousand dollars — and it is the difference between a fair deal and an expensive lesson.",
  h2Vs: "Edmunds vs. Carfax vs. CarCheckerVIN — At a Glance",
  vsIntro: "The three tools solve different parts of the same problem. Use them together and you cover both the valuation and the history side of a used-car decision without paying for anything you don't need.",
  vsRows: [
    {
      name: "Edmunds",
      price: "Free",
      focus: "Valuation",
      strength: "True Market Value, 5-Year Cost to Own, reviews, ownership analysis. Excellent for pricing.",
      gap: "Self-reported condition. No title brand or accident database query.",
    },
    {
      name: "Carfax",
      price: "$39.99",
      focus: "History",
      strength: "Detailed accident, service, and ownership history. Dealer-grade depth on individual records.",
      gap: "No native valuation engine. Per-VIN price adds up across multiple shortlisted cars.",
    },
    {
      name: "CarCheckerVIN",
      price: "Free preview · $14.99 full",
      focus: "History",
      strength: "NMVTIS-sourced title brands, salvage flags, and recalls free. $14.99 unlocks the full report.",
      gap: "Valuation context comes from Edmunds or KBB, not from us. We pair with them, not replace them.",
    },
  ],
  vsNote: "Practical workflow: use our free VIN history lookup to confirm the title is clean, then take that confirmed condition into the Edmunds TMV calculator for a realistic price. If the history flags anything, upgrade to a full report before you make an offer.",
  h2Steps: "Step-by-Step — Edmunds Appraisal + Free VIN History Check",
  stepsIntro: "Three steps, fifteen minutes, zero dollars. This is the workflow most savvy used-car buyers run before they ever contact a seller.",
  stepsList: [
    { tag: "Step 1", title: "Run the free VIN history check first", body: "Paste the 17-character VIN into our free lookup at the top of this page. You'll see title brands, salvage records, and any open safety recalls in seconds. Note the condition that history implies — clean, branded, or accident-flagged." },
    { tag: "Step 2", title: "Take the verified condition to Edmunds TMV", body: "Open the Edmunds appraisal tool, enter the same VIN, and select the condition rating that matches what the history actually shows. If the VIN came back clean, use Clean or Outstanding. If salvage or accident flags appeared, drop to Average or Rough." },
    { tag: "Step 3", title: "Negotiate against the honest TMV", body: "The price Edmunds returns with the correct condition input is your negotiation anchor. If the seller is asking above that figure, you have the data to push back. If a deeper history report is warranted, upgrade for the full breakdown before you commit money." },
  ],
  h2Internal: "Related Tools That Build on an Edmunds Appraisal",
  internalIntro: "These focused checks complement the Edmunds workflow — pricing tools to cross-check the TMV, and history tools to validate the condition assumption underneath it.",
  internalLinks: [
    { href: "/kbb-vin-lookup", label: "KBB VIN Lookup", desc: "Cross-check the Edmunds TMV against Kelley Blue Book values from the same VIN." },
    { href: "/market-value", label: "Market Value Estimator", desc: "Get a second-opinion market value figure you can stack against the Edmunds appraisal." },
    { href: "/trade-in-value-estimator", label: "Trade-In Value Estimator", desc: "See what a dealer would realistically pay at trade-in versus Edmunds' trade-in TMV." },
    { href: "/vin-check", label: "Full VIN Check", desc: "Complete history report including title brands, accidents, odometer, and recalls in one place." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down the 17-character VIN into year, make, model, trim, and factory equipment." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if the VIN carries a salvage, junk, or non-repairable title brand that breaks TMV." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions and total-loss claims before you set the Edmunds condition rating." },
    { href: "/pricing", label: "Pricing", desc: "Compare the free history preview against the $14.99 full report." },
  ],
  h2Faq: "Edmunds VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions buyers ask most when they want to pair an Edmunds appraisal with a free VIN history check.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Ready to Run the VIN Before You Trust the TMV?",
  ctaBottomSub: "Enter any 17-character VIN to run a free history check against NMVTIS sources and the national recall feed. Then take the verified condition to Edmunds for an honest appraisal.",
  ctaBottomNote: "No credit card · No sign-up · Free preview",
} as const;

const FAQS_EN = [
  { question: "Does Edmunds do a free VIN lookup?", answer: "Yes. Edmunds offers a free VIN lookup as part of its appraisal flow. You enter the 17-character VIN and Edmunds returns the decoded factory specifications — year, make, model, trim, engine, transmission, and original options — along with its True Market Value (TMV) for private-party, trade-in, and dealer-retail scenarios. The Edmunds VIN lookup is genuinely free, with no card required. What it does not include is a title-brand or accident-history database query; for that, you need a separate VIN history check. We surface that history layer for free at the top of this page, sourced from NMVTIS." },
  { question: "What does Edmunds show with a VIN?", answer: "An Edmunds VIN lookup returns three things. First, decoded factory specifications: year, make, model, trim, body style, engine, transmission, drivetrain, and original equipment. Second, True Market Value: a calculated fair price for private-party, trade-in, and dealer-retail scenarios based on the VIN, mileage, options, regional supply, and a self-reported condition rating. Third, Edmunds 5-Year Cost to Own: a projection of depreciation, financing, insurance, taxes, fuel, maintenance, and repairs over five years. What Edmunds does not show is title-brand or accident history — those have to be confirmed separately." },
  { question: "Is the Edmunds VIN lookup free?", answer: "Yes, the Edmunds VIN lookup and the True Market Value calculator are free with no account required. Edmunds monetizes through dealer leads, advertising, and certified partner referrals rather than charging consumers for valuations. The free Edmunds VIN lookup is one of the best pure-valuation tools on the internet. To complete the picture you also want a free VIN history check — that confirms the title is clean and there are no salvage or accident flags, so the condition rating you enter into the Edmunds TMV calculator reflects reality." },
  { question: "How is Edmunds True Market Value calculated?", answer: "Edmunds True Market Value blends several inputs into a single fair-price figure. Recent transaction data from dealers and private parties, the specific VIN's decoded trim and options, the entered mileage, regional supply and demand, the time of year, and a self-reported condition rating from Outstanding down to Rough all feed the model. TMV is then split into private-party, trade-in, and dealer-retail scenarios because each market prices differently. The accuracy depends heavily on the condition rating being honest — which in turn depends on a title and accident history check the TMV engine itself does not run." },
  { question: "Does Edmunds show accident history by VIN?", answer: "No. The Edmunds VIN lookup does not include an accident-history database query. Edmunds asks you to self-report whether the car has been in an accident as part of the condition rating, but it does not pull from NMVTIS, state DMV records, or insurance claim data. If the seller is unaware of a prior accident — or does not disclose it — Edmunds will return a TMV that assumes a clean history. To check accident history by VIN you need a dedicated history report, which is exactly what a free history lookup at the top of this page provides." },
  { question: "What's better — Edmunds or KBB?", answer: "Both are reputable valuation tools and most professionals cross-check them against each other. Kelley Blue Book (KBB) tends to lean slightly higher on dealer-retail figures, while Edmunds tends to be slightly more conservative and ships a stronger 5-Year Cost to Own model. The honest answer is to use both: get an Edmunds TMV, get a KBB value, and treat the range between them as your realistic market window. Neither tool, however, queries title-brand or accident-history databases — so a free VIN history check belongs in front of either appraisal." },
  { question: "Can I trust an Edmunds appraisal without a history check?", answer: "Only if the condition input is honest. Edmunds calculates TMV based on the condition rating you enter, and the right condition rating depends on title and accident history that Edmunds does not check for you. A clean-history car with a Clean condition rating produces a TMV you can trust. A salvage-titled or accident-damaged car with a Clean condition rating produces a TMV that is thousands of dollars too high. Running a free VIN history check before the Edmunds appraisal — to confirm the title is clean and there are no salvage or accident flags — is what makes the resulting TMV trustworthy." },
];

export default function EdmundsVinLookupBody() {
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Does}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.doesIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.doesSteps.map((m, i) => {
              const Icon = DOES_ICONS[i];
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Not}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.notIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.notItems.map((item, i) => {
              const Icon = NOT_ICONS[i];
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
              <Database className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.notNoteBoldLead}</strong>
                {c.notNoteRest}
              </p>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Impact}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.impactIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.impactItems.map((item, i) => {
              const Icon = IMPACT_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.impactBoldLead}</strong>
                {c.impactNoteRest}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Vs}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.vsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.vsRows.map((row) => (
              <div key={row.name} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="w-5 h-5 text-primary" />
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary">{row.name}</h3>
                </div>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 border border-outline-variant/60">
                    <span className="text-on-surface-variant">Price</span>
                    <code className="font-mono font-bold text-primary">{row.price}</code>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 border border-outline-variant/60">
                    <span className="text-on-surface-variant">Focus</span>
                    <code className="font-mono font-bold text-primary">{row.focus}</code>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed pt-1">
                    <strong className="text-on-surface">Strength: </strong>{row.strength}
                  </p>
                  <p className="text-on-surface-variant leading-relaxed">
                    <strong className="text-on-surface">Gap: </strong>{row.gap}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
            <p className="text-sm text-on-surface leading-relaxed">{c.vsNote}</p>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Steps}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.stepsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.stepsList.map((m, i) => {
              const Icon = STEP_ICONS[i];
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

        <RelatedChecks exclude="/edmunds-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
