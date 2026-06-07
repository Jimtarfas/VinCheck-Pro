import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock } from "lucide-react";
import Logo from "@/components/Logo";

/**
 * Standalone layout for the ClearVin-powered paid-report flow served from
 * app.carcheckervin.com. The proxy at src/proxy.ts rewrites pretty paths
 * (/, /terms, /disclaimer, /account, /success, /r/<id>) onto /order/*.
 *
 * Intentionally does NOT render the main-site <Header/>, <Footer/>,
 * <ChatWidget/>, or <SocialProofToast/> — the order flow stands alone for
 * compliance review and to keep the buyer focused on the purchase.
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
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-surface-container-lowest/85 border-b border-outline-variant/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="CarCheckerVIN — Order">
            <Logo />
            <span className="hidden sm:inline-flex items-center gap-1.5 ml-2 pl-3 border-l border-outline-variant text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
              <ShieldCheck className="w-3 h-3 text-primary" />
              Secure Checkout
            </span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-on-surface-variant">
            <Link
              href="/account"
              className="hidden sm:inline-flex px-3 py-1.5 rounded-lg hover:text-primary hover:bg-primary/5 transition"
            >
              My reports
            </Link>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10 text-[11px] font-semibold text-primary">
              <Lock className="w-3 h-3" />
              SSL
            </span>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* ─── Compliance footer ─── */}
      {/* Legal links must be visible on every page in the order flow per
          ClearVin's integration requirements. */}
      <footer className="border-t border-outline-variant/40 bg-surface-container-lowest mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid sm:grid-cols-[1fr_auto] gap-6 sm:gap-10 items-start">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <Logo />
              </Link>
              <p className="text-[11px] text-on-surface-variant leading-relaxed max-w-xl">
                CarCheckerVIN provides NMVTIS-backed vehicle history reports.
                Report data is supplied by ClearVin LLC, an approved NMVTIS
                Data Provider, and is rendered unmodified. Reports are sold
                for personal use only and may not be resold or
                redistributed; ClearVin&rsquo;s data remains the intellectual
                property of ClearVin and its underlying data partners. See
                the full{" "}
                <Link href="/terms" className="underline hover:text-primary">
                  Terms &amp; Conditions
                </Link>{" "}
                and{" "}
                <Link href="/disclaimer" className="underline hover:text-primary">
                  NMVTIS Disclaimer
                </Link>
                .
              </p>
            </div>

            <ul className="flex flex-col gap-2 text-sm text-on-surface-variant sm:text-right">
              <li>
                <Link href="/terms" className="hover:text-primary transition">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-primary transition">
                  NMVTIS Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-primary transition">
                  My Reports
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@carcheckervin.com"
                  className="hover:text-primary transition"
                >
                  contact@carcheckervin.com
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-outline-variant/40 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] text-outline">
              &copy; {new Date().getFullYear()} CarCheckerVIN. All rights
              reserved. Data &copy; ClearVin LLC and underlying data
              providers.
            </p>
            <div className="flex items-center gap-3 text-[10px] font-semibold text-outline uppercase tracking-[0.16em]">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                NMVTIS-Backed
              </span>
              <span className="inline-flex items-center gap-1">
                <Lock className="w-3 h-3" />
                256-bit SSL
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
