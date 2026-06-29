/**
 * DMV VIN Lookup landing page body.
 * English-only — targets "DMV VIN lookup free" (~5K monthly US searches).
 * Honest-angle SEO: the DMV does NOT offer a free self-serve public VIN lookup.
 * NMVTIS-sourced reports are the practical free alternative.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Search, FileText, Database, Building2,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Clock,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";

const QUICK_ANSWER_ITEMS = [
  {
    question: "Does the DMV offer a free online VIN lookup?",
    answer: (
      <>
        <strong>No.</strong> There is no self-serve DMV website where you can
        type a VIN and pull title history for free. <strong>CarCheckerVIN</strong>{" "}
        is the practical free alternative — it pulls from <strong>NMVTIS</strong>,
        the federal database all 50 state DMVs report into, and returns the
        record instantly.
      </>
    ),
  },
  {
    question: "How do I get DMV records for a vehicle by VIN?",
    answer: (
      <>
        File a vehicle-records request with the state DMV where the vehicle is
        titled — California REG-124, New York MV-15, Florida HSMV 90510, Texas
        VTR-275. Expect a $5-$25 fee, a DPPA permissible-use attestation, and a
        2-6 week wait by mail.
      </>
    ),
  },
  {
    question: "What's the difference between DMV records and a VIN history report?",
    answer: (
      <>
        A DMV record is a single state&apos;s official title document. A VIN
        history report pulls from NMVTIS — which aggregates title and brand
        data from all 50 state DMVs, insurers, and salvage auctions — so it
        surfaces title washing across state lines a single-state record cannot.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;

const COPY = {
  home: "Home",
  crumb: "DMV VIN Lookup",
  badge: "Free NMVTIS VIN Lookup   ·   DMV Data, No 6-Week Wait",
  h1Lead: "DMV VIN Lookup Free — ",
  h1Accent: "Get DMV-Sourced Data Without the Paper Form",
  intro: "Searching for a free DMV VIN lookup? Here's the honest answer: state DMVs don't offer a self-serve public VIN search the way you're imagining. Records exist, but you have to file an open-records request under your state's vehicle privacy law — typically a paper form, a $5–$25 fee, and a 2–6 week wait. The faster, free alternative is an NMVTIS-backed VIN report. NMVTIS aggregates title and brand data contributed by all 50 state DMVs, so you get the same underlying DMV-sourced records in seconds.",
  formHeading: "Run a Free NMVTIS-Backed VIN Lookup",
  formSub: "Enter any 17-character VIN — we'll pull title, brand, odometer, and salvage records from all 50 state DMVs via NMVTIS",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Database, value: "50-state", label: "DMV data via NMVTIS" },
    { icon: Building2, value: "DOJ", label: "federally administered" },
    { icon: Clock, value: "Instant", label: "no 2–6 week wait" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],

  h2How: "How a Free NMVTIS-Backed VIN Lookup Works",
  howIntro: "If you're trying to verify a vehicle's title and history without a paper form to your state DMV, this is the path. Three steps, no fees, no waiting.",
  howSteps: [
    { tag: "Step 1", title: "Enter the 17-character VIN", body: "Type the VIN from the driver-side dashboard, the door-jamb sticker, the title, or the insurance card. The check is keyed to the VIN, so it surfaces records from every state the vehicle has ever been titled in." },
    { tag: "Step 2", title: "We query NMVTIS title data", body: "The lookup pulls from the National Motor Vehicle Title Information System — the federal database that aggregates title and brand records contributed directly by all 50 state DMVs, insurers, junk yards, and salvage auctions." },
    { tag: "Step 3", title: "Read the title and brand record", body: "See the title history, brand events (salvage, flood, junk, rebuilt), odometer readings, and total-loss records the DMVs themselves report — no open-records request, no in-person trip, no waiting weeks." },
  ],

  h2DMV: "Does the DMV Do a Free VIN Lookup?",
  dmvIntro: "Short answer: no — at least not the way most people picture it. There is no national self-serve DMV website where you can type a VIN and pull a vehicle's title and brand history for free.",
  dmv1Pre: "What state DMVs actually offer for a VIN search is a ",
  dmv1Bold1: "vehicle records request",
  dmv1Mid: " filed under each state's version of the Driver's Privacy Protection Act (DPPA) and open-records law. You complete a form (often called an MV-15, REG-124, or similar), pay a fee usually between ",
  dmv1Bold2: "$5 and $25",
  dmv1Suffix: ", attest to a permissible use, and wait 2–6 weeks for the result to be mailed back. A handful of states offer limited online lookups, but most still require paper.",
  dmv2Pre: "The DMV also can't legally hand out everything. Under ",
  dmv2Bold: "the federal DPPA (18 U.S.C. § 2721)",
  dmv2Suffix: ", state DMVs are prohibited from releasing personal owner information except for specific permissible uses such as litigation, insurance claims, or law enforcement. A casual buyer-due-diligence request does not qualify, which is why DMV records rarely include the current owner's name.",
  dmv3: "That gap — between what people think a 'free DMV VIN lookup' is and what actually exists — is why NMVTIS-backed reports became the practical answer. NMVTIS pulls from the same state DMV title systems, but it does so on the buyer's behalf and returns the de-identified title and brand data instantly.",
  dmvCardTitle: "What a state DMV request actually involves",
  dmvCardRows: [
    { label: "Form", value: "Open-records / MV-15" },
    { label: "Fee", value: "$5–$25" },
    { label: "Wait", value: "2–6 weeks" },
    { label: "Owner name", value: "DPPA-restricted" },
  ],
  dmvCardNote: "There is no national, self-serve, free DMV VIN-lookup tool. NMVTIS aggregates the same title and brand data and returns it instantly.",

  h2Compare: "What You CAN Check at the DMV vs Through NMVTIS",
  compareIntro: "Both paths return DMV-sourced data, but they don't return the same thing. Here is what each one actually delivers, side by side.",
  compareRows: [
    { topic: "Open recall info", dmv: "Not from the DMV — federal data via NHTSA", nmvtis: "Use NHTSA's free recall lookup (linked below)" },
    { topic: "Title brand history", dmv: "Yes, via paid open-records request, current state only", nmvtis: "Yes, instant, across all 50 state DMVs" },
    { topic: "Salvage / junk / flood brands", dmv: "Yes, on the state-issued record", nmvtis: "Yes, plus salvage-auction reporters (Copart, IAA)" },
    { topic: "Odometer history", dmv: "Yes, on the title transfer records", nmvtis: "Yes, multi-state odometer readings" },
    { topic: "Accident records", dmv: "Usually no — DMVs typically don't aggregate crash reports by VIN", nmvtis: "Reported events surface when an insurer logs a total loss" },
    { topic: "Current owner identification", dmv: "DPPA-restricted — not released for casual due diligence", nmvtis: "Not released — same DPPA protections apply" },
    { topic: "Wait time", dmv: "2–6 weeks for a mailed reply in most states", nmvtis: "Instant" },
    { topic: "Cost", dmv: "$5–$25 per record per state", nmvtis: "Free basic lookup" },
  ],
  compareNoteBoldLead: "On owner information:",
  compareNoteRest: " neither this site nor any consumer VIN service returns the registered owner's name. The DPPA prohibits its release for casual buyer due diligence, and that restriction follows the data wherever it goes. If you have a permissible use (such as an insurance claim or active litigation), file directly with the state DMV.",

  h2Request: "How to Request DMV Vehicle Records (State-by-State Overview)",
  requestIntro: "If you genuinely need the official DMV-issued title record — for a legal matter, an insurance claim, or to resolve a paperwork dispute — you can file the request directly with your state. Here is the general pattern.",
  requestSteps: [
    "Identify your state's vehicle-records form. Common names: MV-15 (NY), REG-124 (CA), HSMV 90510 (FL), VTR-275 (TX). Search the state DMV site for 'request for motor vehicle records.'",
    "Read the permissible-use list. The form requires you to attest, under penalty of perjury, that you fall under one of the 14 federal DPPA permissible uses. Casual buyer due diligence is not on that list.",
    "Provide the VIN, your ID, and proof of any qualifying use. Some states also require a notarized signature for non-self lookups.",
    "Pay the fee. Most states charge $5–$25 per record. A few are higher; a handful waive the fee for individuals requesting their own records.",
    "Mail or hand-deliver the request. Online intake exists in a small number of states but is the exception, not the rule.",
    "Wait 2–6 weeks for a mailed response. Expedited processing is rare and usually costs extra.",
  ],
  requestNotePre: "If you only need title-brand history, odometer readings, and salvage flags for a used-car purchase, the DMV paperwork path is overkill. The same data — contributed by those same DMVs — flows into NMVTIS, and a ",
  requestNoteLink: "free VIN check",
  requestNoteSuffix: " returns it in seconds.",

  midCtaHeading: "Skip the 6-Week Wait — Run the VIN Now",
  midCtaSub: "NMVTIS-backed lookup pulls title and brand data straight from all 50 state DMVs. Free, instant, no paper form.",

  h2Alt: "The Free Alternative: NMVTIS-Sourced VIN Lookups",
  altIntro: "NMVTIS — the National Motor Vehicle Title Information System — is the federal database the state DMVs themselves feed. That's the key fact most buyers miss.",
  alt1Pre: "Congress created NMVTIS through the ",
  alt1Bold1: "Anti Car Theft Act of 1992",
  alt1Mid: " and assigned it to the ",
  alt1Bold2: "U.S. Department of Justice",
  alt1Suffix: ". Every state DMV is required to report title, brand, and salvage data to it. Insurers, junk yards, and salvage auctions are also required reporters. The result is a single VIN-keyed record of what every state knows about a vehicle's title history.",
  alt2Pre: "When a consumer runs a NMVTIS-backed VIN check, they're getting the ",
  alt2Bold: "same underlying title-brand records",
  alt2Suffix: " a state DMV would release on a paid open-records request — but aggregated across every state the vehicle has ever been titled in, and returned instantly. That cross-state visibility is exactly what catches title washing.",
  alt3: "NMVTIS does not return owner names — the same DPPA restrictions that limit DMV releases apply here too. What it does return is the data that matters for buyer due diligence: title status, brand events, odometer readings, salvage records, and last-known state of title.",
  altCardTitle: "Why NMVTIS = DMV data, in practice",
  altCardRows: [
    "All 50 state DMVs are required reporters",
    "Administered by the U.S. Department of Justice",
    "Same title-brand records, aggregated nationally",
    "Returned instantly, no paper form, no fee",
    "DPPA owner protections preserved",
  ],
  altCardNote: "NMVTIS is not a workaround — it is the federal system the DMVs built together to share VIN title data.",

  h2Recall: "Federal Recall Lookup via NHTSA (Truly Free)",
  recallIntro: "One area where a self-serve, truly free, federally-run lookup actually exists: open safety recalls.",
  recall1Pre: "The ",
  recall1Bold1: "National Highway Traffic Safety Administration",
  recall1Mid1: " runs a free VIN recall search at ",
  recall1Bold2: "nhtsa.gov/recalls",
  recall1Suffix: ". Type the VIN, see every open manufacturer safety recall on the vehicle, and find dealer fix-it instructions. The fix is performed free by any franchised dealer of the same brand, regardless of who owns the car.",
  recall2Pre: "For a more thorough check that surfaces recalls alongside title brands, accident records, and odometer history, run a ",
  recall2Link: "full recall and history check",
  recall2Suffix: " by VIN. Recalls are one record class — title brands and salvage history are equally important when you're buying used.",

  h2Internal: "More VIN Checks Buyers Run Alongside a DMV Lookup",
  internalIntro: "DMV records are one slice of a vehicle's story. These checks fill in the rest.",
  internalLinks: [
    { href: "/vin-check", label: "Full VIN History Check", desc: "Title, brand, accident, odometer, and recall records in one report — all NMVTIS-sourced." },
    { href: "/recall-check", label: "Free Recall Check", desc: "Federal NHTSA recall lookup by VIN for every open safety recall on the vehicle." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17-character VIN to year, make, model, trim, engine, and factory options." },
    { href: "/florida-vin-check", label: "Florida VIN Check", desc: "State-specific guidance for Florida title and brand records via HSMV." },
    { href: "/vin-check/state", label: "State VIN Check Hub", desc: "Per-state guides for DMV records, brand laws, and where to file." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Confirm whether a state branded the title salvage, junk, or non-repairable." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Reported collision and damage events from insurers and total-loss records." },
    { href: "/pricing", label: "Pricing & Full Reports", desc: "Upgrade options when you need the deepest level of detail before you buy." },
  ],

  h2Faq: "DMV VIN Lookup — Frequently Asked Questions",
  faqIntro: "What buyers ask most when they're trying to get DMV records by VIN.",

  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Skip the DMV Paper Form — Run a Free VIN Lookup",
  ctaBottomSub: "NMVTIS-backed title, brand, odometer, and salvage records — pulled straight from the state DMV data. Instant, free, no sign-up.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "Does the DMV offer a free online VIN lookup?", answer: "Not as a self-serve public tool. There is no national DMV website where you can type a VIN and pull a vehicle's title and brand history for free. State DMVs maintain those records but release them only through a formal vehicle-records request under their state's open-records law — typically a paper form, a $5–$25 fee, and a 2–6 week wait by mail. The free alternative most buyers actually want is an NMVTIS-backed VIN report, which aggregates title-brand data contributed by all 50 state DMVs and returns it instantly." },
  { question: "How do I get DMV records for a vehicle by VIN?", answer: "File a vehicle-records request directly with the state DMV where the vehicle is currently titled. The form goes by different names — MV-15 in New York, REG-124 in California, HSMV 90510 in Florida, VTR-275 in Texas. You'll need to provide the VIN, your ID, attest to a permissible use under the federal Driver's Privacy Protection Act (DPPA), pay the state's fee, and wait roughly 2–6 weeks for a mailed response. A small number of states offer limited online intake, but paper is still the norm." },
  { question: "Why does the DMV charge a fee for records?", answer: "State motor-vehicle agencies recover the cost of locating, redacting, and producing the record. Fees typically run $5–$25 per record per state and are set by state statute. The fee also helps fund the IT systems that contribute data to NMVTIS. There is no federally mandated free public-records tier for DMV vehicle records, which is part of why a free NMVTIS-backed VIN check has become the practical answer for buyers." },
  { question: "Can I look up the owner of a vehicle by VIN at the DMV?", answer: "Generally no — and the same restriction applies to every consumer VIN service, including this one. The federal Driver's Privacy Protection Act (18 U.S.C. § 2721) prohibits state DMVs from releasing personal owner information except for 14 specific permissible uses such as active litigation, insurance claims, or law enforcement. Casual buyer due diligence is not a permissible use. If you have a qualifying use, you can request owner information directly from the state DMV with documentation." },
  { question: "What's the difference between DMV records and a VIN history report?", answer: "A DMV record is a single state's official title document for a specific vehicle, issued in response to a paid open-records request and typically limited to what that state knows. A VIN history report pulls from NMVTIS — which aggregates title and brand data contributed by all 50 state DMVs, plus insurance carriers and salvage auctions — and returns a multi-state picture instantly. For most buyer due diligence, the VIN history report is more useful because it surfaces title washing across state lines." },
  { question: "How long does a DMV records request take?", answer: "Most states quote a 2–6 week turnaround for a mailed records request, though it can be longer during peak volume. A few states offer expedited processing for an extra fee. Online intake (where available) is faster but still measured in days, not seconds. If you only need title-brand history, odometer readings, and salvage flags for a buying decision, an NMVTIS-backed VIN check returns that data instantly — the same data the DMVs themselves reported into the federal system." },
  { question: "Do DMV records show accident history?", answer: "Usually not in a usable way. State DMVs maintain title and registration records, but most do not aggregate police accident reports by VIN — those typically live with the law-enforcement agency that filed them. Accident-related events surface in a VIN history report when an insurer reports a total-loss claim, which is one of the data classes NMVTIS captures. For collision records that didn't trigger a total loss, accident-data providers and police-report retrieval are the better paths." },
];

export default function DmvVinLookupBody() {
  const c = COPY;
  const faqs = FAQS_EN;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Building2 className="w-4 h-4" /> {c.badge}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2DMV}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.dmvIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.dmv1Pre}
                <strong className="text-on-surface">{c.dmv1Bold1}</strong>
                {c.dmv1Mid}
                <strong className="text-on-surface">{c.dmv1Bold2}</strong>
                {c.dmv1Suffix}
              </p>
              <p>
                {c.dmv2Pre}
                <strong className="text-on-surface">{c.dmv2Bold}</strong>
                {c.dmv2Suffix}
              </p>
              <p>{c.dmv3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.dmvCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.dmvCardRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.dmvCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Compare}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.compareIntro}</p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant">
            <table className="w-full text-sm">
              <thead className="bg-primary/5">
                <tr>
                  <th className="text-left font-headline font-extrabold text-primary px-4 py-3 border-b border-outline-variant">Record type</th>
                  <th className="text-left font-headline font-extrabold text-primary px-4 py-3 border-b border-outline-variant">State DMV (paid request)</th>
                  <th className="text-left font-headline font-extrabold text-primary px-4 py-3 border-b border-outline-variant">NMVTIS-backed VIN check (free)</th>
                </tr>
              </thead>
              <tbody>
                {c.compareRows.map((row, i) => (
                  <tr key={row.topic} className={i % 2 === 0 ? "bg-white" : "bg-surface-container-lowest"}>
                    <td className="px-4 py-3 font-semibold text-on-surface align-top">{row.topic}</td>
                    <td className="px-4 py-3 text-on-surface-variant align-top">{row.dmv}</td>
                    <td className="px-4 py-3 text-on-surface-variant align-top">{row.nmvtis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.compareNoteBoldLead}</strong>
                {c.compareNoteRest}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Request}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.requestIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.requestSteps.map((item, i) => (
              <div key={i} className="flex gap-3 items-start rounded-2xl border border-outline-variant bg-surface p-5">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-headline font-black text-sm">{i + 1}</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                {c.requestNotePre}
                <Link href="/vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.requestNoteLink}</Link>
                {c.requestNoteSuffix}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Alt}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.altIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.alt1Pre}
                <strong className="text-on-surface">{c.alt1Bold1}</strong>
                {c.alt1Mid}
                <strong className="text-on-surface">{c.alt1Bold2}</strong>
                {c.alt1Suffix}
              </p>
              <p>
                {c.alt2Pre}
                <strong className="text-on-surface">{c.alt2Bold}</strong>
                {c.alt2Suffix}
              </p>
              <p>{c.alt3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.altCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.altCardRows.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.altCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Recall}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6 max-w-3xl leading-relaxed">{c.recallIntro}</p>
          <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4 max-w-3xl">
            <p>
              {c.recall1Pre}
              <strong className="text-on-surface">{c.recall1Bold1}</strong>
              {c.recall1Mid1}
              <strong className="text-on-surface">{c.recall1Bold2}</strong>
              {c.recall1Suffix}
            </p>
            <p>
              {c.recall2Pre}
              <Link href="/recall-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.recall2Link}</Link>
              {c.recall2Suffix}
            </p>
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

        <RelatedChecks exclude="/dmv-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
