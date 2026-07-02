import type { Metadata } from "next";
import Link from "@/components/LocaleLink";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "CarCheckerVIN cookie policy. We use only essential cookies to keep the site working — no advertising or third-party tracking cookies are set without your consent.",
  alternates: { canonical: "/cookie-policy" },
  robots: { index: true, follow: true },
};

// Last-updated date stays in one place so updates are a single-line edit.
const LAST_UPDATED = "June 28, 2026";
const SUPPORT_EMAIL = "contact@carcheckervin.com";

export default function CookiePolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-3">Cookie Policy</h1>
      <p className="text-sm text-slate-500 mb-8">
        <strong>Last updated:</strong> {LAST_UPDATED}
      </p>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">

        <div className="not-prose rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 sm:p-6">
          <h2 className="text-base font-bold text-primary mb-2 uppercase tracking-wide">
            Policy in one sentence
          </h2>
          <p className="text-slate-800 leading-relaxed">
            We use <strong>only the cookies required to make the site work</strong>{" "}
            (such as keeping you signed in and securing checkout). We do not run
            advertising or third-party tracking cookies without your consent.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">1. What cookies are</h2>
        <p>
          Cookies are small text files a website stores in your browser. They let
          a site remember information between page loads and visits — for example,
          that you are signed in or that you have started a checkout. Similar
          technologies such as <code>localStorage</code> are covered by this policy
          where we use them for the same purposes.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          2. Cookies we use
        </h2>
        <p>
          <strong>CarCheckerVIN</strong> (carcheckervin.com), operated by{" "}
          <strong>Coconut Ventures LLC</strong>, sets only the following
          categories of cookies:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong>Strictly necessary</strong> — session and security cookies
            that keep you authenticated, protect checkout against fraud, and
            remember your language preference. The site cannot function correctly
            without these, so they are not subject to consent.
          </li>
          <li>
            <strong>Functional</strong> — remember preferences such as your
            selected language so you do not have to set them again.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> set advertising, profiling, or
          cross-site tracking cookies. We do not sell or share cookie data with
          advertising networks.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          3. Third-party services
        </h2>
        <p>
          Some essential functions rely on trusted third-party providers that may
          set their own strictly-necessary cookies when you use them — for
          example, our authentication provider (sign-in sessions) and our payment
          processor (secure checkout). These cookies are used only to deliver the
          service you requested and are governed by each provider&apos;s own
          privacy and cookie terms.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          4. Managing cookies
        </h2>
        <p>
          You can delete or block cookies through your browser settings at any
          time. Because the cookies we set are strictly necessary or functional,
          blocking them may prevent you from signing in, completing checkout, or
          retaining your preferences. Most browsers let you clear cookies under
          their Privacy or History settings.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          5. Changes to this policy
        </h2>
        <p>
          We may update this policy from time to time. Material changes will be
          reflected on this page and the &ldquo;Last updated&rdquo; date above
          will be revised.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">6. Contact</h2>
        <p>
          Questions about how we use cookies:
        </p>
        <ul className="list-none pl-0 space-y-1.5">
          <li>
            Email:{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary-600 hover:underline">
              {SUPPORT_EMAIL}
            </a>
          </li>
          <li>
            Related pages:{" "}
            <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
            {" · "}
            <Link href="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>
          </li>
        </ul>

      </div>
    </div>
  );
}
