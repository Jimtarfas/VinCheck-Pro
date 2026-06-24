import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "CarCheckerVIN terms of service. Review the terms and conditions for using our vehicle history report platform.",
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
        <p>
          These Terms govern your use of <strong>CarCheckerVIN</strong>
          (carcheckervin.com), operated by{" "}
          <strong>Cognifyx Solutions LLC</strong>, a New Mexico limited
          liability company with its registered office at 1209 Mountain Road
          Pl NE, Ste N, Albuquerque, NM 87110, United States
          (&ldquo;Cognifyx Solutions LLC,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">1. Acceptance of Terms</h2>
        <p>
          By using CarCheckerVIN, you agree to these Terms of Service. If you do not agree,
          please do not use the service.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">2. Service Description</h2>
        <p>
          CarCheckerVIN provides vehicle identification number (VIN) decoding and vehicle history
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
          You may use CarCheckerVIN for personal, non-commercial vehicle research purposes.
          Automated scraping, bulk downloads, or redistribution of report data is prohibited.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">5. Limitation of Liability</h2>
        <p>
          CarCheckerVIN is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable for
          any damages arising from the use of our reports or reliance on the information provided.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">6. Refunds</h2>
        <p>
          Refunds are issued only when the data in a report does not match
          the vehicle identified by the VIN you submitted. See the full{" "}
          <a href="/refund-policy" className="text-primary-600 hover:underline">
            Refund Policy
          </a>{" "}
          for eligibility criteria, evidence requirements, and the request
          process.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">7. Contact</h2>
        <p>
          For questions about these terms, contact us at{" "}
          <a href="mailto:contact@carcheckervin.com" className="text-primary-600 hover:underline">
            contact@carcheckervin.com
          </a>{" "}
          or by mail at:
        </p>
        <address className="not-italic text-slate-700">
          Cognifyx Solutions LLC
          <br />
          1209 Mountain Road Pl NE, Ste N
          <br />
          Albuquerque, NM 87110
          <br />
          United States
        </address>
      </div>
    </div>
  );
}
