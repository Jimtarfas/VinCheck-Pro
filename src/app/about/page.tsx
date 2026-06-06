import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Database, Users, Award, Mail, Phone, Clock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";

export const metadata: Metadata = {
  title: "About — Trusted Vehicle History Reports",
  description:
    "Meet the team behind CarCheckerVIN. We source NMVTIS, NICB, and manufacturer data to deliver accurate, affordable vehicle history reports buyers trust.",
  keywords: [
    "about vincheck pro",
    "about carcheckervin",
    "who we are",
    "vin check company",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About CarCheckerVIN — Trusted Vehicle History Reports",
    description:
      "Our mission, our data sources, and the team behind CarCheckerVIN's accurate, affordable VIN reports.",
    url: "https://www.carcheckervin.com/about",
    type: "article",
  },
};

const aboutSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
    logo: "https://www.carcheckervin.com/logo.png",
    description:
      "CarCheckerVIN provides instant, affordable vehicle history reports powered by NMVTIS, NICB, and manufacturer data sources.",
    foundingDate: "2025",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+15642123985",
      contactType: "customer support",
      email: "contact@carcheckervin.com",
      areaServed: "US",
      availableLanguage: ["English"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About CarCheckerVIN",
    url: "https://www.carcheckervin.com/about",
    description:
      "About CarCheckerVIN: our mission, data sources, editorial standards, and the team behind our vehicle history reports.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where does CarCheckerVIN get its vehicle data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CarCheckerVIN assembles each report in real time from multiple authoritative sources. Title brands, salvage, and junk records come from NMVTIS (the National Motor Vehicle Title Information System). Stolen-vehicle and total-loss records come from the NICB (National Insurance Crime Bureau). Manufacturer APIs supply trim-level VIN decoding plus open recalls and Technical Service Bulletins, and Auto.dev provides supplemental specifications, valuations, and listing-history signals.",
      },
    },
    {
      "@type": "Question",
      name: "Is CarCheckerVIN affiliated with Carfax or AutoCheck?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. CarCheckerVIN is an independent vehicle history service and is not affiliated with, endorsed by, or owned by Carfax, AutoCheck, or any other report provider. We draw from the same kinds of authoritative federal and industry data sources — NMVTIS, NICB, and manufacturer feeds — and offer reports at a lower price.",
      },
    },
    {
      "@type": "Question",
      name: "What is NMVTIS and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NMVTIS — the National Motor Vehicle Title Information System — is a federally mandated database that aggregates title and brand records from state motor vehicle agencies, insurance carriers, and salvage and junk operators. Because it pulls from every state, it surfaces cross-state title history that a single paper title can hide, which is what makes it the backbone of an honest vehicle history check.",
      },
    },
    {
      "@type": "Question",
      name: "How current is the data in a CarCheckerVIN report?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every report is assembled in real time from live data sources at the moment you run it, then validated and normalized by our internal data layer before it reaches you. We do not store stale snapshots and resell them weeks later. Our published editorial content and guides are reviewed on a quarterly cadence to reflect changes in state title laws and federal recall guidance.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a CarCheckerVIN report cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A basic VIN decode is genuinely free with no signup required. Full paid history reports start at $7.99. Our car-buying guides are also free to read with no paywall, because we believe informed buyers make better decisions.",
      },
    },
    {
      "@type": "Question",
      name: "Who is behind CarCheckerVIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CarCheckerVIN is built by a small team with a combined background in automotive data engineering, insurance fraud investigation, DMV records, ASE-certified vehicle inspection, and customer support. Founded in 2025, the company sources its data from NMVTIS-approved providers, the NICB, and manufacturer APIs.",
      },
    },
    {
      "@type": "Question",
      name: "What do I do if I find an error in a report?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Contact our team and we will investigate personally. When we discover or confirm an inaccuracy, we correct it within two business days and disclose the change in our changelog. You can reach support by email at contact@carcheckervin.com or by phone at +1 (564) 212-3985, Monday through Friday, 9:00 AM to 6:00 PM Eastern.",
      },
    },
  ],
};

const FAQS = faqSchema.mainEntity.map((q) => ({
  q: q.name,
  a: q.acceptedAnswer.text,
}));

const team = [
  {
    name: "Marcus Chen",
    role: "Founder & CEO",
    bio: "Marcus spent 12 years in automotive data engineering at major insurance carriers before launching CarCheckerVIN. He has personally reviewed more than 200,000 NMVTIS title records and built the pricing-and-pipeline architecture that lets us run reports at a fraction of legacy provider costs.",
  },
  {
    name: "Priya Anand",
    role: "Head of Data",
    bio: "Priya leads our data partnerships and integration work with NMVTIS-approved providers, NICB, and OEM APIs. A former lead engineer at a Fortune 100 auto auction, she designed the validation layer that catches stale or inconsistent records before they reach a customer report.",
  },
  {
    name: "Devon Whitfield",
    role: "Lead Research Analyst",
    bio: "Devon is an ASE-certified technician turned investigative analyst with a decade of fraud-detection experience at a state DMV. He authors our long-form guides on title washing, VIN cloning, and odometer rollback, and he reviews every data-source change before it ships.",
  },
  {
    name: "Sara Okonkwo",
    role: "Customer Success Lead",
    bio: "Sara has helped more than 30,000 buyers interpret their vehicle history reports and negotiate fair deals. She runs our in-house support team, edits buyer education content, and personally responds to escalated cases within one business day.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs onDark items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">About CarCheckerVIN</h1>
          <p className="mt-5 text-lg text-primary-100 max-w-2xl leading-relaxed">
            We build the vehicle history reports we wish we had when we were buying our own used
            cars: accurate, fast, affordable, and written in plain English.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Every year, more than 40 million used vehicles change hands in the United States, and a
            staggering share of those buyers never see a vehicle history report before they sign.
            The reason is rarely apathy. It is cost, complexity, and a marketplace dominated by
            premium-priced legacy reports that small dealers and private buyers simply cannot
            justify on a single vehicle.
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            CarCheckerVIN exists to close that gap. Our mission is to make the same authoritative
            title, brand, theft, and recall data that insurance companies and franchise dealers
            rely on available to anyone buying a car, for less than the price of a tank of gas. We
            believe transparency is the single most powerful tool a buyer has, and we believe it
            should not be reserved for the people who can afford a thirty-dollar premium report.
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            That mission shapes every decision we make. It is why our{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              free VIN check
            </Link>{" "}
            is genuinely free, why our paid reports start at $7.99, and why we publish a growing
            library of <Link href="/guides" className="text-primary-600 hover:underline font-medium">car-buying guides</Link>{" "}
            without paywalls. Informed buyers make better decisions, and better decisions make for a
            healthier used-car market for everyone.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">How We Work</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Every CarCheckerVIN report is assembled in real time from multiple authoritative
            sources, then validated and normalized by our internal data layer before it reaches
            you. We do not store stale snapshots and resell them weeks later, and we do not pad
            reports with filler from low-quality scraping operations.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <Database className="w-8 h-8 text-primary-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">NMVTIS</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">
                The federally mandated National Motor Vehicle Title Information System is our
                primary source for title brands, junk and salvage records, and cross-state title
                history.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <Shield className="w-8 h-8 text-primary-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">NICB</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">
                The National Insurance Crime Bureau supplies stolen-vehicle and total-loss records
                that power our{" "}
                <Link href="/stolen-vehicle-check" className="text-primary-600 hover:underline">
                  stolen vehicle check
                </Link>
                .
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <Award className="w-8 h-8 text-primary-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">Manufacturer APIs</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">
                Direct OEM integrations let us decode VINs to the trim level and surface open
                recalls and Technical Service Bulletins straight from the source.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <Users className="w-8 h-8 text-primary-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">Auto.dev</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">
                Auto.dev provides supplemental specifications, market valuations, and
                listing-history signals that round out every CarCheckerVIN report.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Our Commitment to Accuracy</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Our data team brings more than 35 years of combined experience in automotive data,
            insurance fraud investigation, DMV records, and ASE-certified vehicle inspection.
            Every editorial guide we publish is reviewed by at least one subject-matter expert on
            staff before it goes live, and every dataset change is tested against a regression
            suite of more than 5,000 known vehicles before it reaches production.
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            We update our content on a quarterly cadence to reflect changes in state title laws,
            new federal recall guidance, and shifts in how the major data providers report
            information. When we discover an inaccuracy, we correct it within two business days
            and disclose the change in our changelog. If you ever spot something that looks wrong
            in a report, our team will investigate and respond personally.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Why We Built CarCheckerVIN</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            After watching a family member get scammed into a flood-damaged car that had been
            quietly retitled across three state lines, our founder spent a weekend trying to
            untangle what a thirty-dollar report would have surfaced in seconds. The damage had
            been hidden well, the seller had been confident, and the title looked clean on the
            surface. The truth was buried in NMVTIS records that almost no private buyer ever
            sees.
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            That experience became the core thesis behind CarCheckerVIN. The data exists. The
            tools exist. The only thing missing is a service that delivers them at a price
            ordinary buyers can actually afford and in a format they can actually understand. We
            built CarCheckerVIN so that the next family does not have to learn the hard way. Start
            with a free <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">VIN check</Link>{" "}
            or browse our{" "}
            <Link href="/guides" className="text-primary-600 hover:underline font-medium">
              buyer education guides
            </Link>{" "}
            to see what we mean.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">The Team</h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              CarCheckerVIN is built by a small team of automotive data, fraud investigation, and
              customer support veterans. Real people, real expertise, real accountability.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {team.map((member) => (
              <div
                key={member.name}
                className="p-6 bg-white rounded-2xl border border-slate-200"
              >
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-primary-600 font-medium">{member.role}</p>
                <p className="mt-3 text-slate-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Contact Us</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Questions about a report, a data source, or your account? Our team is ready to help.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary-600 mt-1" />
              <div>
                <div className="font-semibold text-slate-900">Email</div>
                <a
                  href="mailto:contact@carcheckervin.com"
                  className="text-primary-600 hover:underline"
                >
                  contact@carcheckervin.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary-600 mt-1" />
              <div>
                <div className="font-semibold text-slate-900">Phone</div>
                <a href="tel:+15642123985" className="text-primary-600 hover:underline">
                  +1 (564) 212-3985
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary-600 mt-1" />
              <div>
                <div className="font-semibold text-slate-900">Hours</div>
                <div className="text-slate-600">Monday – Friday, 9:00 AM – 6:00 PM Eastern</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Common questions about who we are, where our data comes from, and how our
            vehicle history reports work.
          </p>
          <div className="mt-8 space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-lg font-bold text-slate-900 pr-2">{f.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-2xl font-light leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Ready to Check a Vehicle?</h2>
          <p className="text-slate-700 mb-8">
            Run a free VIN decode in seconds, or unlock a full history report for $7.99.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
