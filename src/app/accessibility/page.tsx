import type { Metadata } from "next";
import Link from "@/components/LocaleLink";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "CarCheckerVIN is committed to making its VIN check and vehicle history tools accessible to everyone, aiming to meet WCAG 2.1 AA standards. Report an accessibility issue.",
  alternates: { canonical: "/accessibility" },
  robots: { index: true, follow: true },
};

// Last-updated date stays in one place so updates are a single-line edit.
const LAST_UPDATED = "June 28, 2026";
const SUPPORT_EMAIL = "contact@carcheckervin.com";
const SUPPORT_PHONE = "+1 (564) 212-3985";

export default function AccessibilityPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-3">Accessibility Statement</h1>
      <p className="text-sm text-slate-500 mb-8">
        <strong>Last updated:</strong> {LAST_UPDATED}
      </p>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">

        <div className="not-prose rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 sm:p-6">
          <h2 className="text-base font-bold text-primary mb-2 uppercase tracking-wide">
            Our commitment
          </h2>
          <p className="text-slate-800 leading-relaxed">
            We want everyone to be able to look up a VIN and read a vehicle
            history report. We are working toward conformance with the{" "}
            <strong>Web Content Accessibility Guidelines (WCAG) 2.1, Level AA</strong>.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">1. Overview</h2>
        <p>
          <strong>CarCheckerVIN</strong> (carcheckervin.com), operated by{" "}
          <strong>Cognifyx Solutions LLC</strong>, is committed to ensuring its
          website and tools are usable by as many people as possible, including
          people who rely on assistive technologies such as screen readers,
          keyboard navigation, or browser zoom.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          2. Measures we take
        </h2>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Semantic HTML structure with headings, landmarks, and labelled form fields.</li>
          <li>Keyboard-operable navigation, menus, and forms.</li>
          <li>Text alternatives for meaningful images and icons.</li>
          <li>Colour-contrast and responsive layouts that adapt to zoom and small screens.</li>
          <li>Consideration of accessibility when adding new features.</li>
        </ul>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          3. Conformance status
        </h2>
        <p>
          We aim to meet WCAG 2.1 Level AA. Accessibility is an ongoing effort,
          and some parts of the site may not yet fully conform. We continue to
          test and improve the experience over time. This statement reflects our
          current efforts rather than a certified audit.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          4. Known limitations
        </h2>
        <p>
          Some content is generated from third-party automotive databases, and
          documents or data returned by those providers may not always meet the
          same accessibility standards as our own pages. Where we identify such
          issues we work to provide an accessible alternative on request.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          5. Report a problem or request help
        </h2>
        <p>
          If you encounter an accessibility barrier, or need information in an
          alternative format, please contact us and we will do our best to help:
        </p>
        <ul className="list-none pl-0 space-y-1.5">
          <li>
            Email:{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary-600 hover:underline">
              {SUPPORT_EMAIL}
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href={`tel:${SUPPORT_PHONE.replace(/[^+\d]/g, "")}`} className="text-primary-600 hover:underline">
              {SUPPORT_PHONE}
            </a>{" "}
            (Mon–Fri, 9:00–18:00 US ET)
          </li>
          <li>
            Related pages:{" "}
            <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
            {" · "}
            <Link href="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>
          </li>
        </ul>
        <p>
          We try to respond to accessibility feedback within{" "}
          <strong>5 business days</strong>.
        </p>

      </div>
    </div>
  );
}
