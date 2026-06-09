import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Info } from "lucide-react";
import SampleReportFrame from "./_components/SampleReportFrame";

export const metadata: Metadata = {
  title: "Sample Vehicle History Report",
  description:
    "A live sample of the full NMVTIS-backed vehicle history report you receive after ordering on CarCheckerVIN.",
  robots: { index: false, follow: true },
};

/**
 * Public sample report — pulled live from ClearVin using the documented
 * test VIN 5TDYK3DC8DS290235 (Toyota Sienna XLE). No order or payment
 * required; this exists so visitors and ClearVin compliance reviewers
 * can see exactly what a paid report renders as.
 *
 * The PDF is streamed by /api/order/sample-report-pdf — that route reuses
 * the same ClearVin client + auth pattern as the real /api/order/report-pdf
 * endpoint, just without the order-id / cookie auth (anyone can view this
 * single VIN).
 */
const SAMPLE_VIN = "5TDYK3DC8DS290235";
const SAMPLE_LABEL = "2013 Toyota Sienna XLE";

export default function SampleReportPage() {
  return (
    <div className="bg-surface min-h-[calc(100vh-200px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex items-center justify-between mb-5 print:hidden">
          <Link
            href="/"
            className="text-sm text-primary hover:text-primary-700 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to ordering
          </Link>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/20 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
            <ShieldCheck className="w-3 h-3" />
            Sample
          </span>
        </div>

        {/* Intro */}
        <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-primary via-primary-700 to-primary-800 text-white px-6 sm:px-8 py-6">
            <p className="text-[11px] uppercase font-bold tracking-[0.16em] text-white/70">
              Sample Vehicle History Report
            </p>
            <h1 className="text-2xl sm:text-3xl font-headline font-extrabold mt-1 tracking-tight">
              {SAMPLE_LABEL}
            </h1>
            <p className="text-sm font-mono text-white/70 mt-1">{SAMPLE_VIN}</p>
          </div>
          <div className="px-6 sm:px-8 py-3 bg-surface-container/50 text-xs text-on-surface-variant">
            This is the same full NMVTIS-backed report buyers receive after
            checkout. Rendered live from ClearVin, unmodified.
          </div>
        </div>

        {/* PDF iframe — served by /api/order/sample-report-pdf */}
        <div className="mt-4 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl overflow-hidden">
          <SampleReportFrame />
        </div>

        {/* Disclosure footer */}
        <div className="mt-4 bg-surface-container-low border border-outline-variant/40 rounded-2xl p-5 sm:p-6 text-xs text-on-surface-variant leading-relaxed">
          <p className="flex items-start gap-2">
            <Info className="w-4 h-4 text-outline mt-0.5 flex-shrink-0" />
            <span>
              Vehicle data sourced from <strong>ClearVin LLC</strong>, an
              approved NMVTIS Data Provider, and rendered unmodified. For the
              limits of NMVTIS data and the federally-mandated consumer
              disclosure, see the{" "}
              <Link href="/disclaimer" className="underline hover:text-primary">
                NMVTIS Disclaimer
              </Link>
              .
            </span>
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-primary/20"
          >
            Order a report on your VIN
          </Link>
        </div>
      </div>
    </div>
  );
}
