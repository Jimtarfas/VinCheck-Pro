import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "VINCheck Pro privacy policy. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
        <p>
          <strong>Last updated:</strong> April 12, 2026
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">1. Information We Collect</h2>
        <p>
          When you use VINCheck Pro, we may collect Vehicle Identification Numbers (VINs) you submit
          for decoding, basic usage data (pages visited, features used), and contact information if
          you reach out to support.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">2. How We Use Your Information</h2>
        <p>
          We use collected information to provide vehicle history reports, improve our service,
          respond to customer inquiries, and ensure platform security. We do not sell your personal
          data to third parties.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">3. Data Sources</h2>
        <p>
          Vehicle data is sourced from the National Motor Vehicle Title Information System (NMVTIS),
          manufacturer databases, and the Auto.dev API. This data is publicly available vehicle
          specification information.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">4. Cookies</h2>
        <p>
          We use essential cookies to maintain site functionality. No advertising or tracking cookies
          are used without your consent.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">5. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your data, including encrypted
          connections (HTTPS) and secure data storage practices.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">6. Contact</h2>
        <p>
          For privacy-related inquiries, contact us at{" "}
          <a href="mailto:privacy@carcheckervin.com" className="text-primary-600 hover:underline">
            privacy@carcheckervin.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
