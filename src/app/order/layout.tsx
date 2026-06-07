import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock } from "lucide-react";

/**
 * Standalone layout for the ClearVin-powered paid-report flow.
 *
 * Intentionally does NOT render the main-site <Header/>, <Footer/>,
 * <ChatWidget/>, or <SocialProofToast/> so this section can stand on its
 * own for compliance review without dragging in marketing chrome.
 */

export const metadata: Metadata = {
  title: {
    default: "Order a Vehicle History Report",
    template: "%s | CarCheckerVIN",
  },
  description:
    "Order an NMVTIS-backed vehicle history report. Includes title brands, accident records, odometer history, and open recalls.",
  robots: { index: false, follow: true },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Minimal header — no marketing nav */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/order" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">
              CarChecker<span className="text-blue-700">VIN</span>
            </span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Compliance footer — legal links must be visible on every page in
          the order flow, per ClearVin's integration requirements. */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600">
            <Link href="/order/terms" className="hover:text-slate-900 underline">
              Terms &amp; Conditions
            </Link>
            <Link href="/order/disclaimer" className="hover:text-slate-900 underline">
              NMVTIS Disclaimer
            </Link>
            <Link href="/order/account" className="hover:text-slate-900 underline">
              My Reports
            </Link>
            <a
              href="mailto:contact@carcheckervin.com"
              className="hover:text-slate-900 underline"
            >
              contact@carcheckervin.com
            </a>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            CarCheckerVIN provides NMVTIS-backed vehicle history reports. Report data is
            provided by ClearVin, an approved NMVTIS Data Provider. Reports are for personal
            use only and may not be resold or redistributed. ClearVin&rsquo;s data is
            copyrighted and remains the intellectual property of ClearVin and its data
            partners. See full{" "}
            <Link href="/order/terms" className="underline hover:text-slate-700">
              terms
            </Link>{" "}
            and{" "}
            <Link href="/order/disclaimer" className="underline hover:text-slate-700">
              NMVTIS disclaimer
            </Link>
            .
          </p>
          <p className="text-[11px] text-slate-400">
            &copy; {new Date().getFullYear()} CarCheckerVIN. All rights reserved.
            Data &copy; ClearVin LLC and underlying data providers.
          </p>
        </div>
      </footer>
    </div>
  );
}
