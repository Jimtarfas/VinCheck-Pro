import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, FileText, CreditCard, Wrench, Mail, Phone, Clock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Help & Support — VIN Check FAQ",
  description:
    "Answers to the most common VIN lookup, vehicle history report, account, billing, and technical questions. Get help fast from the CarCheckerVIN support team.",
  keywords: [
    "vin check help",
    "vin check faq",
    "carcheckervin support",
    "vehicle history report help",
    "vin check refund",
  ],
  alternates: { canonical: "/help" },
  openGraph: {
    title: "Help & Support — CarCheckerVIN FAQ",
    description:
      "Find answers about VIN lookups, report contents, billing, and technical issues, or contact our support team.",
    url: "https://carcheckervin.com/help",
    type: "article",
  },
};

type Faq = { q: string; a: string };

const vinLookupFaqs: Faq[] = [
  {
    q: "Where can I find the VIN on my vehicle?",
    a: "The VIN is printed in several locations: on the lower-left corner of the windshield (visible from outside), on the driver-side doorjamb sticker, on the engine block, and on your title, registration, and insurance card. Most VINs are 17 characters long and use letters and numbers but never the letters I, O, or Q.",
  },
  {
    q: "What if my VIN is shorter than 17 characters?",
    a: "Vehicles built before 1981 often have VINs shorter than 17 characters because the modern standard was not yet in effect. CarCheckerVIN can decode many pre-1981 VINs, but the depth of available history data is more limited than for modern vehicles.",
  },
  {
    q: "Can I look up motorcycles, RVs, or trailers?",
    a: "Yes. Our VIN check supports motorcycles, RVs, ATVs, trailers, and most other registered vehicles with a 17-character VIN. Some powersports records may be less complete than passenger-car history due to differences in how those records are reported.",
  },
  {
    q: "Why does my VIN return no results?",
    a: "Common causes include a typo (especially confusing 0 with O or 1 with I, even though I and O are not valid VIN characters), a vehicle that has never been registered in a participating jurisdiction, or a brand-new vehicle whose records have not yet propagated to our data sources. Double-check the VIN against the doorjamb sticker and try again.",
  },
];

const reportFaqs: Faq[] = [
  {
    q: "What is included in a paid CarCheckerVIN report?",
    a: "Every paid report includes title and brand history from NMVTIS, stolen-vehicle and total-loss flags from NICB, open recalls from NHTSA, full VIN decode with trim and equipment, accident and damage records where available, odometer history, registration and title-transfer events, and lien indicators. Sample reports are linked from each product page.",
  },
  {
    q: "How long does it take to receive my report?",
    a: "Reports are generated and delivered in under 60 seconds in most cases. You receive the report on screen immediately after checkout and a copy by email for your records. If a report takes longer than three minutes due to a temporary data-source delay, our system retries automatically and we never charge for failed deliveries.",
  },
  {
    q: "Can I print or save my report as a PDF?",
    a: "Yes. Every report has a Print and Save as PDF button at the top of the page. The PDF is fully formatted for printing and includes all data sources and timestamps for your records. You can also re-download any past report from your account dashboard for up to 12 months after purchase.",
  },
  {
    q: "Is the data in the report guaranteed to be 100% complete?",
    a: "No vehicle history service can guarantee 100% completeness because not every event is reported to a database. CarCheckerVIN aggregates the most authoritative U.S. data sources available, but a clean report should always be paired with an independent pre-purchase inspection by a qualified mechanic.",
  },
];

const accountFaqs: Faq[] = [
  {
    q: "Do I need to create an account to run a VIN check?",
    a: "No. You can run our free VIN decode without an account. An account is required only to purchase a paid report so we can deliver it to you, store your purchase history, and let you re-download it later. Account creation takes about 15 seconds.",
  },
  {
    q: "What is your refund policy?",
    a: "We offer a 100% money-back guarantee for 30 days on every paid report. If your report does not contain usable data or you are dissatisfied for any reason, email support@carcheckervin.com and we will refund you in full. Most refunds are processed the same business day.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) as well as Apple Pay, Google Pay, and Link via our payment processor Stripe. We never store your card number on our servers, and every transaction is encrypted end to end.",
  },
  {
    q: "Do you offer subscription or volume pricing?",
    a: "Yes. Dealers, wholesalers, and high-volume buyers can access discounted bulk pricing and a multi-report subscription. Email support@carcheckervin.com with your expected monthly volume and we will send a custom quote within one business day.",
  },
];

const technicalFaqs: Faq[] = [
  {
    q: "My report will not load. What should I do?",
    a: "First, refresh the page and check your internet connection. If the report still does not load, try a different browser or open the link from the confirmation email we sent you. If the issue persists, email support@carcheckervin.com with your order number and we will resolve it within one business hour during support hours.",
  },
  {
    q: "Why are some photos missing from my report?",
    a: "Photos appear only when a vehicle has been listed at a covered auction or photographed by an insurance adjuster after a covered loss. Many vehicles have no photos in any database, especially private-party cars that have never been at auction or in an insurance claim. Missing photos are not a sign that the report is incomplete.",
  },
  {
    q: "I never received my email receipt.",
    a: "Email receipts are sent within 30 seconds of checkout. If you do not see one, check your spam folder and add support@carcheckervin.com to your safe-senders list. You can also re-send the receipt anytime from your account dashboard, or contact support and we will resend it manually.",
  },
  {
    q: "Is CarCheckerVIN compatible with mobile devices and screen readers?",
    a: "Yes. The site is fully responsive on phones and tablets, and reports are tested with VoiceOver, NarratorJaws, and NVDA for screen-reader compatibility. If you encounter an accessibility issue, please email support@carcheckervin.com and we will prioritize a fix.",
  },
];

const allFaqs = [...vinLookupFaqs, ...reportFaqs, ...accountFaqs, ...technicalFaqs];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

function FaqGroup({
  icon: Icon,
  title,
  faqs,
}: {
  icon: typeof HelpCircle;
  title: string;
  faqs: Faq[];
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-7 h-7 text-primary-600" />
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      <div className="space-y-6">
        {faqs.map((f) => (
          <div key={f.q}>
            <h3 className="text-lg font-semibold text-slate-900">{f.q}</h3>
            <p className="mt-2 text-slate-600 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HelpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Help" }]} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">Help & Support</h1>
          <p className="mt-5 text-lg text-primary-100 max-w-2xl leading-relaxed">
            Answers to the most common questions about VIN lookups, vehicle history reports,
            accounts, billing, and technical issues. Cannot find what you need? Our support team
            replies within one business hour.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqGroup icon={HelpCircle} title="VIN Lookup Questions" faqs={vinLookupFaqs} />
          <FaqGroup icon={FileText} title="Report Questions" faqs={reportFaqs} />
          <FaqGroup icon={CreditCard} title="Account & Billing" faqs={accountFaqs} />
          <FaqGroup icon={Wrench} title="Technical Issues" faqs={technicalFaqs} />

          <div className="mt-4 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <p className="text-slate-700 leading-relaxed">
              Have a question about how we protect your data, our security practices, or our
              compliance posture? Visit our{" "}
              <Link
                href="/trust"
                className="text-primary-600 hover:underline font-medium"
              >
                Trust & Security
              </Link>{" "}
              page for the full picture.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Contact Support</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Real people, real responses. Our support team is staffed by current and former
            automotive analysts, not chatbots.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary-600 mt-1" />
              <div>
                <div className="font-semibold text-slate-900">Email</div>
                <a
                  href="mailto:support@carcheckervin.com"
                  className="text-primary-600 hover:underline"
                >
                  support@carcheckervin.com
                </a>
                <div className="text-sm text-slate-500">
                  Replies within one business hour during support hours.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary-600 mt-1" />
              <div>
                <div className="font-semibold text-slate-900">Phone</div>
                <a href="tel:1-800-846-2432" className="text-primary-600 hover:underline">
                  1-800-VIN-CHECK (1-800-846-2432)
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary-600 mt-1" />
              <div>
                <div className="font-semibold text-slate-900">Hours</div>
                <div className="text-slate-600">
                  Monday – Friday, 9:00 AM – 6:00 PM Eastern
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
