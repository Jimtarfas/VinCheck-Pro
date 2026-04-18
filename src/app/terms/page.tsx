import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "VINCheck Pro terms of service. Review the terms and conditions for using our vehicle history report platform.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Terms of Service</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
        <p>
          <strong>Last updated:</strong> April 12, 2026
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">1. Acceptance of Terms</h2>
        <p>
          By using VINCheck Pro, you agree to these Terms of Service. If you do not agree,
          please do not use the service.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">2. Service Description</h2>
        <p>
          VINCheck Pro provides vehicle identification number (VIN) decoding and vehicle history
          report services. Reports include vehicle specifications, equipment details, and related
          data sourced from third-party databases.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">3. Accuracy of Information</h2>
        <p>
          While we strive for accuracy, vehicle data is sourced from third-party providers and we
          cannot guarantee 100% accuracy. Reports should be used as one factor in your vehicle
          purchase decision, alongside a physical inspection and test drive.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">4. Permitted Use</h2>
        <p>
          You may use VINCheck Pro for personal, non-commercial vehicle research purposes.
          Automated scraping, bulk downloads, or redistribution of report data is prohibited.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">5. Limitation of Liability</h2>
        <p>
          VINCheck Pro is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable for
          any damages arising from the use of our reports or reliance on the information provided.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">6. Contact</h2>
        <p>
          For questions about these terms, contact us at{" "}
          <a href="mailto:legal@carcheckervin.com" className="text-primary-600 hover:underline">
            legal@carcheckervin.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
