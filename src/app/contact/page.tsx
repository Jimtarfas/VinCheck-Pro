import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  Headphones,
  Handshake,
  Newspaper,
  Scale,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch | CarCheckerVIN",
  description:
    "Contact CarCheckerVIN for support, partnerships, press inquiries, or legal questions. Email, phone, and message form — our team replies within 24 hours.",
  keywords: [
    "contact carcheckervin",
    "vin check support",
    "vehicle history contact",
    "carcheckervin partnerships",
    "carcheckervin press",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact CarCheckerVIN — Support, Partnerships & Press",
    description:
      "Reach the CarCheckerVIN team for help with VIN lookups, vehicle history reports, partnerships, press, or legal inquiries.",
    url: "https://carcheckervin.com/contact",
    type: "website",
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact CarCheckerVIN",
  url: "https://carcheckervin.com/contact",
  description:
    "Contact CarCheckerVIN for support, partnerships, press, and legal inquiries.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CarCheckerVIN",
  url: "https://carcheckervin.com",
  logo: "https://carcheckervin.com/icon.svg",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-800-846-2432",
      contactType: "customer support",
      email: "support@carcheckervin.com",
      areaServed: "US",
      availableLanguage: ["English"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
  ],
};

const reasons = [
  {
    icon: Headphones,
    title: "Customer support",
    body: "Questions about a report, a refund, or your account — we reply within one business hour during support hours.",
  },
  {
    icon: Handshake,
    title: "Partnerships & API",
    body: "Dealers, lenders, and resellers can request bulk pricing, white-label reports, or API access for high-volume lookups.",
  },
  {
    icon: Newspaper,
    title: "Press & media",
    body: "Journalists, podcasters, and analysts — request interviews, data, expert quotes, or industry commentary.",
  },
  {
    icon: Scale,
    title: "Legal & compliance",
    body: "DMCA notices, law-enforcement requests, privacy questions, and regulatory inquiries are handled by our legal team.",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">Contact CarCheckerVIN</h1>
          <p className="mt-5 text-lg text-primary-100 max-w-2xl leading-relaxed">
            Real people, real responses. Whether you need help with a report, want to partner
            with us, or have a press inquiry, our team is here to help. Most messages get a reply
            within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: contact info */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Get in touch</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Pick whichever channel works best for you. For the fastest response, send a
                message using the form on this page.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
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
                  <Phone className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">Phone</div>
                    <a href="tel:1-800-846-2432" className="text-primary-600 hover:underline">
                      1-800-VIN-CHECK (1-800-846-2432)
                    </a>
                    <div className="text-sm text-slate-500">Toll-free, US callers.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">Hours</div>
                    <div className="text-slate-600">
                      Monday – Friday, 9:00 AM – 6:00 PM Eastern
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">Address</div>
                    <div className="text-slate-600">United States — Online Service</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-5 bg-primary-50 rounded-2xl border border-primary-100">
                <p className="text-sm text-slate-700 leading-relaxed">
                  Looking for help with a specific report or billing question? Our{" "}
                  <Link
                    href="/help"
                    className="text-primary-600 hover:underline font-medium"
                  >
                    Help &amp; Support
                  </Link>{" "}
                  page has answers to the most common questions.
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900">Send us a message</h2>
                <p className="mt-2 text-slate-600">
                  Fill out the form below and we&rsquo;ll reply by email.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Why people contact us</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Not sure which subject to pick? Here are the most common reasons people reach out.
          </p>

          <ul className="mt-8 space-y-6">
            {reasons.map((r) => (
              <li key={r.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <r.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{r.title}</h3>
                  <p className="mt-1 text-slate-600 leading-relaxed">{r.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
