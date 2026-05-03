import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Lock,
  Database,
  FileText,
  Award,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";

export const metadata: Metadata = {
  title: "Trust & Security — How We Protect Your Data",
  description:
    "Learn how CarCheckerVIN sources vehicle data from NMVTIS, NICB, and OEM APIs, encrypts every transaction, and protects your privacy under GDPR and CCPA.",
  keywords: [
    "carcheckervin trust",
    "vin check security",
    "nmvtis data privacy",
    "vehicle history data sources",
    "ccpa gdpr vin check",
  ],
  alternates: { canonical: "/trust" },
  openGraph: {
    title: "Trust & Security at CarCheckerVIN",
    description:
      "Authoritative data sources, end-to-end encryption, transparent privacy practices, and a 100% money-back guarantee.",
    url: "https://www.carcheckervin.com/trust",
    type: "article",
  },
};

const trustSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Trust & Security — How We Protect Your Data",
    url: "https://www.carcheckervin.com/trust",
    description:
      "How CarCheckerVIN sources, secures, and stewards the data behind every vehicle history report.",
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "CarCheckerVIN",
      url: "https://www.carcheckervin.com",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
    logo: "https://www.carcheckervin.com/logo.png",
    description:
      "Affordable, accurate vehicle history reports backed by NMVTIS, NICB, and manufacturer data sources.",
    sameAs: ["https://www.carcheckervin.com/about"],
  },
];

export default function TrustPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trustSchema) }}
      />

      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Trust & Security" }]}
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">
            Trust, Security & Data Privacy
          </h1>
          <p className="mt-5 text-lg text-primary-100 max-w-2xl leading-relaxed">
            Every CarCheckerVIN report is built on authoritative data, encrypted in transit and at
            rest, and backed by a no-questions-asked refund. Here is exactly how we protect you and
            the information you trust us with.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-7 h-7 text-primary-600" />
            <h2 className="text-2xl font-bold text-slate-900">Our Data Sources</h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed">
            A vehicle history report is only as trustworthy as the data behind it. CarCheckerVIN
            does not scrape forums, classified ads, or unverified third-party aggregators. Every
            record in your report is sourced directly from a federally recognized or
            industry-standard provider, then validated by our internal data layer before it ever
            reaches your screen.
          </p>
          <ul className="mt-6 space-y-4 text-slate-600 leading-relaxed">
            <li>
              <strong className="text-slate-900">NMVTIS</strong> — The National Motor Vehicle Title
              Information System is the only federally mandated database that consolidates title,
              brand, junk, and salvage records across all U.S. jurisdictions. NMVTIS is the gold
              standard for cross-state title history, and it is the backbone of every paid report we
              issue.
            </li>
            <li>
              <strong className="text-slate-900">NICB</strong> — The National Insurance Crime
              Bureau supplies stolen-vehicle records and insurer total-loss data reported by member
              carriers. We integrate NICB feeds to power our{" "}
              <Link
                href="/stolen-vehicle-check"
                className="text-primary-600 hover:underline font-medium"
              >
                stolen vehicle check
              </Link>
              .
            </li>
            <li>
              <strong className="text-slate-900">NHTSA</strong> — The National Highway Traffic
              Safety Administration is our authoritative source for open recalls, complaints, and
              safety investigations. NHTSA data is updated daily and surfaced on every report so you
              never miss an active recall.
            </li>
            <li>
              <strong className="text-slate-900">Manufacturer APIs</strong> — Direct OEM
              integrations decode VINs to the trim level, surface Technical Service Bulletins, and
              cross-reference build records straight from the source rather than relying on
              third-party copies that can fall out of date.
            </li>
          </ul>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            This is the same trust chain insurance carriers and franchise dealerships rely on every
            day. We just make it accessible at a price ordinary buyers can afford.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-7 h-7 text-primary-600" />
            <h2 className="text-2xl font-bold text-slate-900">How We Handle Your Data</h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed">
            We follow a strict data-minimization principle: we collect only what we need to deliver
            your report and protect your account, nothing more. All data is encrypted in transit
            using TLS 1.3 and at rest using AES-256, the same standard used by major financial
            institutions.
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            <strong className="text-slate-900">What we collect:</strong> the VINs you look up, your
            email address (if you create an account or purchase a report), and standard log
            information such as IP address and browser type used to prevent abuse and improve site
            reliability.
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            <strong className="text-slate-900">What we do not collect:</strong> we never store your
            credit card or bank information on our servers, we never sell your personal data to
            third parties, and we never share your VIN history with marketers, dealers, or
            insurers. Full details live in our{" "}
            <Link href="/privacy" className="text-primary-600 hover:underline font-medium">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-7 h-7 text-primary-600" />
            <h2 className="text-2xl font-bold text-slate-900">Your Privacy Rights</h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed">
            CarCheckerVIN respects the privacy laws that apply wherever our customers live,
            including the EU General Data Protection Regulation (GDPR) and the California Consumer
            Privacy Act (CCPA). You have the right to know what data we hold about you, the right
            to request a copy, the right to correct inaccurate information, the right to opt out of
            any non-essential processing, and the right to request deletion at any time.
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            To exercise any of these rights, email{" "}
            <a
              href="mailto:support@carcheckervin.com"
              className="text-primary-600 hover:underline font-medium"
            >
              support@carcheckervin.com
            </a>{" "}
            with the subject line "Privacy Request." We respond to every request within 30 days,
            often within one business day, and we never charge a fee for verified personal-data
            requests. See our full{" "}
            <Link href="/terms" className="text-primary-600 hover:underline font-medium">
              Terms of Service
            </Link>{" "}
            for the complete legal framework.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-7 h-7 text-primary-600" />
            <h2 className="text-2xl font-bold text-slate-900">Security Practices</h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed">
            Security is not a feature we bolt on at the end. It is engineered into every layer of
            our platform from the database up.
          </p>
          <ul className="mt-6 space-y-4 text-slate-600 leading-relaxed">
            <li>
              <strong className="text-slate-900">256-bit SSL encryption</strong> protects every page
              you visit and every transaction you complete on carcheckervin.com. Look for the lock
              icon in your browser bar to confirm.
            </li>
            <li>
              <strong className="text-slate-900">Hashed passwords with bcrypt</strong> mean we never
              store your password in a recoverable form. Even our engineers cannot read it.
            </li>
            <li>
              <strong className="text-slate-900">No stored payment data</strong> on CarCheckerVIN
              servers. All payments are tokenized and processed by Stripe, a PCI-DSS Level 1
              certified provider.
            </li>
            <li>
              <strong className="text-slate-900">Continuous monitoring and least-privilege
              access</strong> across our infrastructure. Production database access is restricted to
              a small on-call group and audited on every session.
            </li>
            <li>
              <strong className="text-slate-900">Automated backups and disaster recovery</strong>{" "}
              ensure your account history and reports are never a single hardware failure away from
              loss.
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-7 h-7 text-primary-600" />
            <h2 className="text-2xl font-bold text-slate-900">Compliance & Certifications</h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed">
            CarCheckerVIN partners with NMVTIS-approved data providers and complies with the
            disclosure and accuracy requirements published by the U.S. Department of Justice for the
            consumer-facing use of NMVTIS data. Every paid report includes the federally required
            NMVTIS disclaimer and source attribution.
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Payment processing is handled exclusively by Stripe, which is PCI-DSS Level 1 certified,
            the most stringent certification available for payment processors. Our authentication
            stack uses industry-standard OAuth 2.0 flows and enforces strong session controls. To
            learn more about our team and editorial standards, visit our{" "}
            <Link href="/about" className="text-primary-600 hover:underline font-medium">
              About page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="w-7 h-7 text-primary-600" />
            <h2 className="text-2xl font-bold text-slate-900">
              Refund & Satisfaction Guarantee
            </h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed">
            We stand behind every report we sell with a 100% money-back guarantee. If your report
            does not contain usable data, if a record is materially inaccurate, or if you are
            dissatisfied for any reason within 30 days of purchase, email our team and we will issue
            a full refund — no forms, no phone trees, no questions.
          </p>
          <div className="mt-6 p-6 bg-white rounded-2xl border border-slate-200">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-slate-900">
                  100% Money-Back Guarantee
                </div>
                <p className="mt-1 text-slate-600 leading-relaxed">
                  Request a refund anytime within 30 days at{" "}
                  <a
                    href="mailto:support@carcheckervin.com"
                    className="text-primary-600 hover:underline font-medium"
                  >
                    support@carcheckervin.com
                  </a>
                  . Most refunds are processed the same business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Run a Report You Can Trust</h2>
          <p className="text-slate-700 mb-8">
            Authoritative data, encrypted delivery, and a 30-day money-back guarantee. Start with a
            free decode.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
