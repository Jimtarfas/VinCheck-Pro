/**
 * Body for /vin-owner-lookup — English-only.
 * Educates visitors on DPPA legality of "owner lookup by VIN," redirects
 * them to ownership count + transfer history (what we actually deliver),
 * and uses the /vin-check report as the actionable CTA.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Lock, UserX,
  Scale, AlertCircle, AlertTriangle, ChevronRight, Sparkles,
  BadgeCheck, Zap, ClipboardCheck, Gavel, Building2, MapPin,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const HOW_ICONS = [Search, Database, FileText] as const;
const LEGIT_ICONS = [Gavel, Scale, Building2] as const;
const RED_FLAG_ICONS = [AlertTriangle, UserX, AlertCircle] as const;

const COPY = {
  home: "Home",
  crumb: "VIN Owner Lookup",
  badge: "Ownership History by VIN   ·   DPPA-Compliant   ·   No Owner Names",
  h1Lead: "VIN Owner Lookup — ",
  h1Accent: "What's Legally Available by VIN",
  intro: "Looking up a vehicle's owner by VIN is one of the most misunderstood searches on the internet. Federal law — the Driver's Privacy Protection Act — bars releasing an owner's name, address, or phone number to the general public. What you can legitimately get is ownership count, the state-by-state title history, and dealer or lessor periods. Enter a 17-character VIN to pull that record, free.",
  formHeading: "Look Up the Ownership History of a VIN",
  formSub: "Enter any 17-character VIN — you'll see ownership count, transfer history, and title state-by-state (no owner names, by federal law)",
  formNote: "Free · No sign-up · Instant result",

  trustStats: [
    { icon: Shield, value: "DPPA", label: "compliant" },
    { icon: Database, value: "50-state", label: "title history" },
    { icon: UserX, value: "No names", label: "no contact info" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],

  // Yellow/amber callout right under the hero.
  calloutTitle: "We do not return owner names or contact info.",
  calloutBody: "That isn't a policy choice — it's federal law. The Driver's Privacy Protection Act (18 U.S.C. § 2721) prohibits any business from releasing personal info from a state DMV record to a consumer who doesn't fit one of 14 narrow permissible uses. What you'll see in our report: ownership count, transfer dates, the states the vehicle has been titled in, and dealer or lessor periods — never a name, address, or phone number.",

  h2Direct: "Can You Really Look Up a Car's Owner by VIN?",
  directIntro: "The short answer is: not by name, and not legally — at least not through any consumer-facing service. Here's what's actually going on behind the keyword.",
  direct1Pre: "When you search for ",
  direct1Bold: "\"VIN owner lookup,\"",
  direct1Suffix: " you're almost always looking for one of three things: you bought a used car and want to know how many owners it had, you found an abandoned vehicle and need to reach the title holder, or you're checking out a private-party seller before you hand over money. Those are three very different problems, and only the first one is fully solvable through a VIN report.",
  direct2: "For the first case — verifying ownership count and transfer history — a VIN check is exactly the right tool. NMVTIS aggregates title records from all 50 state DMVs, and a VIN report will tell you how many distinct title-holders the vehicle has had, in which states, and when each transfer happened. That tells you most of what a buyer needs to know.",
  direct3Pre: "For the second and third cases — getting an actual ",
  direct3Bold: "name, address, or phone number",
  direct3Suffix: " — federal law gets in the way. The Driver's Privacy Protection Act, passed in 1994 after a stalker used DMV records to murder actress Rebecca Schaeffer, restricts who can pull personal information from a state motor vehicle record. Consumer-facing \"owner lookup\" services that promise to deliver a name are either lying, scraping data illegally, or repackaging old data breaches.",

  h2Law: "What the Law Actually Says (DPPA Explained)",
  lawIntro: "The Driver's Privacy Protection Act is short, specific, and the single biggest reason no legitimate site will sell you an owner's name. Here's the plain-English version.",
  law1Pre: "The DPPA — codified at ",
  law1Bold: "18 U.S.C. § 2721",
  law1Suffix: " — makes it unlawful for a state DMV (or anyone who has obtained DMV data) to knowingly disclose or otherwise make available personal information about an individual driver, except for one of 14 enumerated \"permissible uses.\" Personal information includes name, address, phone number, Social Security number, driver identification number, photograph, and medical or disability information.",
  law2Pre: "The 14 permissible uses ",
  law2Bold: "do not include",
  law2Suffix: " general consumer curiosity, finding a former friend, contacting a private-party seller, or running a background check on the guy who scratched your car. The exceptions are narrowly drawn: use by a government agency, motor vehicle safety, insurance underwriting, employer commercial driver verification, court orders, licensed private investigators acting on a permitted purpose, toll-collection operations, research, and a handful of similar categories.",
  law3: "Penalties for a willful violation include criminal fines and civil liability of at least $2,500 per individual whose record was improperly disclosed. The statute also creates a private right of action — meaning the person whose record was leaked can sue. That's why state DMVs are extremely conservative about who gets a name, and it's why no legitimate VIN-report provider will hand one to you.",
  lawCardTitle: "The 14 DPPA permissible uses (summary)",
  lawList: [
    "Use by a government agency carrying out its functions",
    "Motor vehicle and driver safety, theft, and emissions",
    "Verifying personal info submitted to a business (fraud prevention)",
    "Court, agency, or self-regulatory body proceedings",
    "Research activities, with no individual contact",
    "Insurance investigation, underwriting, anti-fraud, claims",
    "Notice to owners of towed or impounded vehicles",
    "Licensed private investigators on a permitted purpose",
    "Employer commercial driver verification",
    "Operation of toll transportation facilities",
    "Court or law-enforcement requests pursuant to a subpoena",
    "Bulk distribution for surveys/marketing only with owner consent",
    "Any use with express written consent of the individual",
    "Use by an insurer or insurance support organization",
  ],
  lawCardNote: "If your reason isn't on this list, the state DMV cannot release the owner's name to you — and neither can a third-party data broker who got the record from the state.",

  h2CanFind: "What You CAN Find With a VIN Owner Lookup",
  canFindIntro: "DPPA doesn't make ownership history secret — only the personal identifiers attached to each owner. The structural facts are still available, and they are usually enough to answer a buyer's real question.",
  canFind: [
    { title: "Ownership count", body: "How many distinct title-holders the vehicle has had since it was first sold new. A two-owner car at six years old looks very different from a six-owner car at the same age." },
    { title: "States titled in", body: "Every state where the VIN has been registered for a title, in chronological order. A vehicle that bounced through four states in three years deserves a closer look — that pattern is associated with title-washing and salvage rebuilds." },
    { title: "Transfer dates", body: "When each ownership change happened, so you can see whether the vehicle was flipped quickly or held for years. Rapid back-to-back transfers can indicate a dealer flip, a lemon, or a hidden problem." },
    { title: "Dealer or lessor periods", body: "Whether the vehicle was held by a franchised dealer, an auction company, or a leasing fleet at any point — these commercial holders are reported as the title-holder of record but aren't \"owners\" in the private-party sense." },
    { title: "Salvage retitle gaps", body: "When a title goes dark for a period and then re-appears with a different brand (clean → salvage → rebuilt), the gap and the state-of-issue tell you a salvage rebuilder owned the vehicle in between." },
    { title: "Title brand history", body: "Every brand the title has carried — clean, salvage, rebuilt, flood, lemon, odometer rollback — alongside the ownership chain, so you can see which owner the car was carrying which brand under." },
  ],

  h2RedFlags: "Why Third-Party Sites That Sell Owner Names Are a Red Flag",
  redFlagsIntro: "If a website promises to deliver the current owner's name, address, and phone number from a VIN for $9.99, something is wrong. There are three possibilities — none of them good for you.",
  redFlags: [
    { title: "Scraped or breached data", body: "The data may come from a state DMV breach, a leaked dealer DMS, or a scraped insurance broker portal. Using that data — even unknowingly — can expose you to DPPA civil liability, and the person whose record was leaked can sue you for at least $2,500." },
    { title: "Stale and wrong", body: "Aggregators frequently sell data that's years old. A name attached to a VIN in 2019 may be the previous-previous owner, not the current title-holder. You can pay your money, contact the listed person, and find out they sold the car two owners ago." },
    { title: "Pure fabrication", body: "Some sites simply generate plausible-looking names tied to public address records, betting that buyers won't try to verify before paying. A few even auto-bill recurring \"membership\" fees after the first $1 trial — at which point the lost dollars are the smallest problem." },
  ],
  redFlagsNote: "The federal courts have repeatedly held that downstream users of unlawfully obtained DMV data can be liable under DPPA. Don't be the customer who finds that out.",

  midCtaHeading: "Run the VIN and See the Real Ownership History",
  midCtaSub: "You'll get ownership count, transfer dates, and state-by-state title history — everything a buyer actually needs, with no DPPA-restricted personal info.",

  h2Legit: "Legitimate Ways to Contact a Vehicle's Owner",
  legitIntro: "If you have an actual lawful purpose — a lien-holder trying to repossess, a court-ordered process server, an insurer running a claim — there are established paths that comply with DPPA. None of them route through a consumer VIN lookup.",
  legit: [
    { title: "State DMV permissible-use request", body: "Most state DMVs have an owner-information request form (in New York it's Form MV-15; California has INF 70; Texas has Form VTR-275). You fill out the form, attach proof that your purpose fits a DPPA permissible use, pay a small fee, and the DMV releases the owner's name and address. Without a valid permissible use, the form will be rejected." },
    { title: "Court process", body: "If you're trying to serve legal papers, name a defendant in a lawsuit, or enforce a judgment, your attorney can subpoena the DMV record. Courts routinely grant this for active litigation. This is the path repo agents, judgment creditors, and personal-injury plaintiffs use." },
    { title: "Licensed private investigator", body: "A licensed PI acting on a DPPA-permitted purpose can pull DMV data through state channels — typically for service of process, repossession, missing-persons cases, or insurance work. They are bound by the same statute and must document the permitted use." },
  ],
  legitNote1Pre: "Looking for the form for your state? Start at the ",
  legitNote1Link1: "NHTSA",
  legitNote1Mid: " site or your state DMV's website — search for \"vehicle record request\" or \"DPPA request form.\" If your reason genuinely fits a permissible use, the legitimate path is fast, cheap, and bulletproof. For a list of state DMV contacts the U.S. ",
  legitNote1Link2: "Department of Transportation",
  legitNote1Suffix: " maintains a reference directory.",

  h2Report: "What Our Free VIN Report Does Show About Ownership",
  reportIntro: "Concretely, here's what a CarCheckerVIN report returns for the ownership section of a VIN — and what it deliberately leaves out.",
  reportShows: [
    "Total number of title-holders recorded in NMVTIS",
    "List of states where the vehicle has been titled",
    "Dates of each ownership transfer",
    "Whether each holder was a dealer, lessor, or individual (without the individual's name)",
    "Title brand carried under each holder (clean / salvage / rebuilt / flood / lemon)",
    "Odometer reading reported at each transfer (so you can spot a rollback)",
    "Whether the vehicle was registered as personal, lease, fleet, or rental use",
  ],
  reportOmits: [
    "Owner names — past or present",
    "Owner addresses or ZIP codes",
    "Owner phone numbers or email addresses",
    "Driver license numbers, SSNs, or other PII",
    "Anything else that would violate 18 U.S.C. § 2721",
  ],
  reportNotePre: "If you need any of the omitted fields for a DPPA-permissible purpose, use the state DMV ",
  reportNoteBold: "owner-information request form",
  reportNoteSuffix: " instead — that's the only lawful consumer path to a name.",

  h2Internal: "More VIN Checks That Pair With an Ownership Lookup",
  internalIntro: "Ownership history is one slice of the picture. These checks fill in the rest before you commit to a vehicle.",
  internalLinks: [
    { href: "/vin-check", label: "Full VIN History Check", desc: "Title, ownership, accident, flood, odometer, and recall records in one report." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17-character VIN to year, make, model, trim, and factory options." },
    { href: "/license-plate-lookup", label: "License Plate Lookup", desc: "Look up a vehicle by license plate to retrieve the VIN and check its history." },
    { href: "/plate-to-vin", label: "Plate to VIN", desc: "Convert a license plate number into the matching 17-character VIN." },
    { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check", desc: "Verify the vehicle isn't reported stolen in any U.S. database before you buy." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "See reported collisions, damage events, and total-loss declarations." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Confirm whether the title was ever branded salvage, junk, or non-repairable." },
    { href: "/vehicle-lien-check", label: "Vehicle Lien Check", desc: "Check whether a lender holds an open lien against the vehicle's title." },
  ],

  h2Faq: "VIN Owner Lookup — Frequently Asked Questions",
  faqIntro: "The questions buyers and researchers ask most about looking up a vehicle's owner by VIN.",

  bottomBadge: "Free · Instant · DPPA-Compliant",
  ctaBottomHeading: "See the Real Ownership History of Any VIN",
  ctaBottomSub: "Enter a 17-character VIN to pull ownership count, transfer dates, and state-by-state title history — with no owner names or personal info, in full compliance with federal privacy law.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "Can I find a car's owner by the VIN?", answer: "Not by name, and not legally through any consumer service. The Driver's Privacy Protection Act (18 U.S.C. § 2721) bars state DMVs and data brokers from releasing an owner's name, address, or phone number to the general public except for 14 narrow permissible uses such as law enforcement, insurance underwriting, court orders, or licensed PIs acting on a permitted purpose. What you can find by VIN is ownership count, the states the vehicle has been titled in, transfer dates, and dealer or lessor periods — all without personal identifiers. If a website promises to sell you the current owner's name for a small fee, that data is almost certainly scraped, breached, stale, or fabricated." },
  { question: "Is it legal to look up a car owner by VIN?", answer: "It is legal to look up the ownership history of a VIN — ownership count, transfer dates, title states, and brand history — because that information does not include personal identifiers. It is not legal for a consumer-facing service to release the owner's name, address, or phone number from a state DMV record, because the Driver's Privacy Protection Act restricts that data to 14 enumerated permissible uses. Pulling personal info without a permissible use exposes both the requester and the provider to civil liability of at least $2,500 per affected individual, plus possible criminal fines." },
  { question: "Why won't anyone show me the owner's name?", answer: "Because federal law prohibits it. 18 U.S.C. § 2721 makes it unlawful for a state DMV — or anyone who has lawfully obtained DMV data — to knowingly disclose personal information about an individual driver to anyone who doesn't fit one of the 14 permissible-use categories. General consumer curiosity, contacting a private-party seller, and looking up an ex are not on that list. State DMVs are conservative because the statute creates a private right of action: the person whose record is leaked can sue for $2,500 or more. Reputable VIN-report providers honor the law, which is why no legitimate service will sell you a name." },
  { question: "What ownership info does a VIN report show?", answer: "A VIN report from CarCheckerVIN returns the structural facts of ownership without any personal identifiers. You'll see the total number of title-holders recorded in NMVTIS, the list of states the vehicle has been titled in (in order), the date of each transfer, whether each holder was a dealer or lessor or individual (without the individual's name), and the title brand carried under each holder. You will also see the odometer reading reported at each transfer, which lets you spot a rollback. What you won't see is any name, address, phone number, or other DPPA-restricted personal information." },
  { question: "How do police look up car owners?", answer: "Law enforcement is the first of the 14 DPPA permissible uses. Police query state DMV systems directly through the National Law Enforcement Telecommunications System (NLETS), which gives officers the registered owner's name and address keyed to a VIN or license plate, plus stolen-vehicle flags and warrant data. That access is restricted to sworn officers operating in an official capacity, logged at the query level, and audited — it is not a service that can be re-sold or shared with a civilian, and unauthorized use is a federal crime that has cost officers their jobs and their freedom." },
  { question: "What is the DPPA and why does it matter?", answer: "The Driver's Privacy Protection Act, codified at 18 U.S.C. § 2721, is a 1994 federal statute that restricts state DMVs (and anyone downstream who obtains DMV data) from disclosing personal information about an individual driver. It was passed after a stalker used California DMV records to find and murder actress Rebecca Schaeffer in 1989. The statute lists 14 permissible uses — including law enforcement, insurance underwriting, court orders, and licensed-PI work on a permitted purpose — and bars everyone else from receiving the data. Penalties include criminal fines, civil liability of at least $2,500 per individual, and a private right of action for the person whose record was leaked." },
  { question: "Can a private investigator look up an owner by VIN?", answer: "A licensed private investigator can pull DMV data on a VIN, but only when acting on a DPPA-permitted purpose — typically service of process, repossession on behalf of a lien-holder, missing-persons work, insurance investigation, or fraud prevention. The PI must be licensed in their state, must document the permitted purpose, and is personally liable under DPPA if the data is used for an impermissible reason. Hiring a PI is the standard path when you need an owner's identity for a lawful purpose like serving legal papers or repossessing a vehicle against which you hold a lien. It is not a back door around the statute for general consumer use." },
];

export { FAQS_EN };

export default function VinOwnerLookupBody() {
  const c = COPY;
  const link = (en: string) => en;

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
        {/* Prominent amber DPPA callout right under the hero */}
        <section className="pt-10">
          <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-5 sm:p-6 flex gap-4 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-950" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-amber-950 mb-1.5">{c.calloutTitle}</h2>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">{c.calloutBody}</p>
            </div>
          </div>
        </section>

        {/* Direct answer */}
        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Direct}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6 max-w-3xl leading-relaxed">{c.directIntro}</p>
          <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4 max-w-3xl">
            <p>
              {c.direct1Pre}
              <strong className="text-on-surface">{c.direct1Bold}</strong>
              {c.direct1Suffix}
            </p>
            <p>{c.direct2}</p>
            <p>
              {c.direct3Pre}
              <strong className="text-on-surface">{c.direct3Bold}</strong>
              {c.direct3Suffix}
            </p>
          </div>
        </section>

        {/* DPPA law */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Law}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.lawIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.law1Pre}
                <strong className="text-on-surface">{c.law1Bold}</strong>
                {c.law1Suffix}
              </p>
              <p>
                {c.law2Pre}
                <strong className="text-on-surface">{c.law2Bold}</strong>
                {c.law2Suffix}
              </p>
              <p>{c.law3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.lawCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.lawList.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.lawCardNote}</p>
            </div>
          </div>
        </section>

        {/* What you CAN find */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2CanFind}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.canFindIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.canFind.map((s) => (
              <div key={s.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Check className="w-5 h-5 text-primary" strokeWidth={3} />
                </div>
                <h3 className="text-base font-headline font-extrabold text-primary mb-1">{s.title}</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Red flags */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2RedFlags}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.redFlagsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.redFlags.map((item, i) => {
              const Icon = RED_FLAG_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-red-300 bg-red-50/40 p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-red-500 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-red-900 mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-red-950/80 leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">{c.redFlagsNote}</p>
            </div>
          </div>
        </section>

        {/* Mid CTA */}
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

        {/* Legitimate paths */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Legit}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.legitIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.legit.map((item, i) => {
              const Icon = LEGIT_ICONS[i];
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
              <MapPin className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                {c.legitNote1Pre}
                <a href="https://www.nhtsa.gov/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.legitNote1Link1}</a>
                {c.legitNote1Mid}
                <a href="https://www.transportation.gov/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.legitNote1Link2}</a>
                {c.legitNote1Suffix}
              </p>
            </div>
          </div>
        </section>

        {/* What our report DOES show */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Report}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.reportIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl bg-green-50 border border-green-300 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Check className="w-5 h-5 text-green-700" strokeWidth={3} />
                <h3 className="font-headline font-extrabold text-green-900">What our report shows</h3>
              </div>
              <ul className="space-y-2 text-sm text-green-950">
                {c.reportShows.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-700 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-slate-50 border border-slate-300 p-6">
              <div className="flex items-center gap-2 mb-3">
                <UserX className="w-5 h-5 text-slate-700" />
                <h3 className="font-headline font-extrabold text-slate-900">What our report omits (by law)</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-800">
                {c.reportOmits.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <UserX className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                {c.reportNotePre}
                <strong className="text-on-surface">{c.reportNoteBold}</strong>
                {c.reportNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        {/* Internal links */}
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

        {/* FAQ */}
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

        {/* Bottom CTA */}
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

        <RelatedChecks exclude="/vin-owner-lookup" />
      </div>
    </article>
  );
}
