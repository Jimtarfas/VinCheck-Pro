"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  LoaderCircle,
  TriangleAlert,
  RefreshCw,
  Download,
  Printer,
  Info,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface Props {
  orderId: string;
}

/**
 * ClearVin returns the full report as a PDF. We just iframe our PDF proxy
 * endpoint and let the browser render it natively — gives the buyer
 * native scroll/zoom/save/print controls and zero JS-shim complexity.
 *
 * Compliance: the PDF binary is forwarded byte-for-byte from ClearVin
 * (the data they require "rendered unmodified"); only the page chrome
 * around the iframe is our own (the part they explicitly allow us to
 * customise).
 */

interface OrderMeta {
  id: string;
  vin: string;
  vehicleLabel: string | null;
  createdAt?: string;
  deliveredAt?: string;
}

interface ReportData {
  vin: string;
  reportId?: string;
  requestId?: string;
  /** False if ClearVin returned an empty html_report. */
  hasContent?: boolean;
  generatedAt: string;
  schemaVersion?: number;
}

interface ApiResponse {
  ok: boolean;
  status?: "pending" | "paid" | "delivered" | "failed" | "refunded";
  message?: string;
  error?: string;
  order?: OrderMeta;
  report?: ReportData;
}

export default function ReportView({ orderId }: Props) {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [order, setOrder] = useState<OrderMeta | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);
  const [expanded, setExpanded] = useState(false);

  // The PDF endpoint we'll iframe — and pass through to the download button.
  const pdfUrl = `/api/order/report-pdf/${orderId}`;

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      // We still hit the JSON endpoint to validate auth + payment status +
      // pick up metadata (vehicle label, delivered timestamp, report id).
      const res = await fetch(`/api/order/report/${orderId}`, {
        cache: "no-store",
      });
      const json = (await res.json()) as ApiResponse;

      if (json.status === "pending") {
        setPending(true);
        setOrder(json.order || null);
        return;
      }
      if (!res.ok || !json.ok) {
        setErrorMessage(json.error || json.message || "Could not load report.");
        return;
      }
      setPending(false);
      setOrder(json.order || null);
      setReport(json.report || null);
    } catch {
      setErrorMessage("Network error — please retry.");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    void fetchReport();
  }, [fetchReport]);

  // Poll while pending — webhook may still be processing.
  useEffect(() => {
    if (!pending) return;
    const t = setInterval(() => void fetchReport(), 4000);
    return () => clearInterval(t);
  }, [pending, fetchReport]);

  function handlePrint() {
    // Open PDF in new tab so the browser's native print dialog gets the
    // PDF directly — more reliable than iframe.contentWindow.print() for
    // PDFs (some browsers print the page, not the embedded PDF).
    const w = window.open(pdfUrl, "_blank");
    if (w) {
      w.addEventListener("load", () => {
        try {
          w.print();
        } catch {
          /* user can hit print themselves */
        }
      });
    }
  }

  // ── Loading / error / pending states ──
  if (loading) {
    return (
      <div className="text-center py-20">
        <LoaderCircle className="w-8 h-8 animate-spin text-primary mx-auto" />
        <p className="mt-3 text-sm text-on-surface-variant">Loading your report…</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-xl mx-auto text-center">
        <TriangleAlert className="w-8 h-8 text-red-600 mx-auto" />
        <p className="mt-3 text-sm font-bold text-red-900">
          We hit a snag loading this report
        </p>
        <p className="mt-1 text-sm text-red-800">{errorMessage}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => void fetchReport()}
            className="px-4 py-2 bg-primary hover:bg-primary-700 text-white text-sm font-bold rounded-xl inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try again
          </button>
          <a
            href="mailto:contact@carcheckervin.com"
            className="px-4 py-2 bg-white border border-outline-variant text-on-surface hover:bg-surface-container-low text-sm font-bold rounded-xl"
          >
            Email support
          </a>
        </div>
      </div>
    );
  }

  if (pending) {
    return (
      <div className="bg-white border border-outline-variant/60 rounded-2xl p-8 max-w-xl mx-auto text-center">
        <LoaderCircle className="w-8 h-8 animate-spin text-primary mx-auto" />
        <p className="mt-3 text-sm font-bold text-on-surface">
          Waiting for payment confirmation
        </p>
        <p className="mt-1 text-sm text-on-surface-variant">
          Stripe is still confirming the charge. This page will refresh
          automatically.
        </p>
        {order && (
          <p className="mt-3 text-xs text-outline font-mono">{order.vin}</p>
        )}
      </div>
    );
  }

  if (!order || !report) return null;

  // ── Empty-content fallback ──
  if (report.hasContent === false) {
    return (
      <div className="space-y-4">
        <ReportHeader order={order} />
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 max-w-2xl mx-auto text-center">
          <TriangleAlert className="w-8 h-8 text-amber-700 mx-auto" />
          <p className="mt-3 text-sm font-bold text-amber-900">
            ClearVin has no recorded events for this VIN
          </p>
          <p className="mt-2 text-sm text-amber-800">
            The vehicle has no title brands, accidents, odometer readings, or
            service records reported to NMVTIS at this time. This is normal
            for newer vehicles or VINs with no public reporting history.
          </p>
          <p className="mt-4 text-xs text-amber-700">
            Per our{" "}
            <Link href="/terms" className="underline">
              Terms
            </Link>
            , reports returning no data qualify for a full refund — email{" "}
            <a href="mailto:contact@carcheckervin.com" className="underline">
              contact@carcheckervin.com
            </a>{" "}
            with order {order.id.slice(0, 8)}.
          </p>
        </div>
        <ReportFooter report={report} />
      </div>
    );
  }

  return (
    <div className="space-y-4 print:space-y-2">
      {/* Header strip + toolbar */}
      <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl overflow-hidden">
        <ReportHeaderInner order={order} />
        <div className="px-6 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-2 bg-surface-container/50 print:hidden">
          <p className="text-xs text-on-surface-variant">
            Order{" "}
            <code className="px-1 bg-white border border-outline-variant/60 rounded">
              {order.id.slice(0, 8)}
            </code>
            {order.deliveredAt &&
              ` · Delivered ${new Date(order.deliveredAt).toLocaleString()}`}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="text-xs px-3 py-1.5 bg-white border border-outline-variant/60 rounded-lg inline-flex items-center gap-1.5 hover:bg-surface-container-low"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <a
              href={pdfUrl}
              download={`vinreport-${order.vin}.pdf`}
              className="text-xs px-3 py-1.5 bg-white border border-outline-variant/60 rounded-lg inline-flex items-center gap-1.5 hover:bg-surface-container-low"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="text-xs px-3 py-1.5 bg-white border border-outline-variant/60 rounded-lg inline-flex items-center gap-1.5 hover:bg-surface-container-low"
              title={expanded ? "Collapse" : "Expand to full screen"}
            >
              {expanded ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  Collapse
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  Expand
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ClearVin PDF — rendered unmodified by the browser */}
      <div
        className={
          expanded
            ? "fixed inset-0 z-50 bg-surface p-3 overflow-hidden flex flex-col"
            : "bg-surface-container-lowest border border-outline-variant/40 rounded-2xl overflow-hidden"
        }
      >
        {expanded && (
          <div className="flex items-center justify-between px-3 pb-3 flex-shrink-0 print:hidden">
            <p className="text-xs text-on-surface-variant">
              Full-screen view · {order.vin}
            </p>
            <button
              onClick={() => setExpanded(false)}
              className="text-xs px-3 py-1.5 bg-white border border-outline-variant/60 rounded-lg inline-flex items-center gap-1.5 hover:bg-surface-container-low"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              Close
            </button>
          </div>
        )}
        <iframe
          src={pdfUrl}
          title={`ClearVin report for ${order.vin}`}
          className={
            expanded
              ? "w-full flex-1 rounded-xl border border-outline-variant/40 bg-white"
              : "w-full bg-white block"
          }
          style={expanded ? undefined : { height: "1100px", border: "none" }}
        />
      </div>

      <ReportFooter report={report} />
    </div>
  );
}

// ── Subcomponents ────────────────────────────────────────────────────

function ReportHeader({ order }: { order: OrderMeta }) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl overflow-hidden">
      <ReportHeaderInner order={order} />
    </div>
  );
}

function ReportHeaderInner({ order }: { order: OrderMeta }) {
  return (
    <div className="bg-gradient-to-br from-primary via-primary-700 to-primary-800 text-white px-6 sm:px-8 py-6">
      <p className="text-[11px] uppercase font-bold tracking-[0.16em] text-white/70">
        Vehicle History Report
      </p>
      <h1 className="text-2xl sm:text-3xl font-headline font-extrabold mt-1 tracking-tight">
        {order.vehicleLabel || "Vehicle history report"}
      </h1>
      <p className="text-sm font-mono text-white/70 mt-1">{order.vin}</p>
    </div>
  );
}

function ReportFooter({ report }: { report: ReportData }) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-5 sm:p-6 text-xs text-on-surface-variant leading-relaxed">
      <p className="flex items-start gap-2">
        <Info className="w-4 h-4 text-outline mt-0.5 flex-shrink-0" />
        <span>
          Report generated{" "}
          <strong>{new Date(report.generatedAt).toLocaleString()}</strong>
          {report.reportId && (
            <>
              {" · ClearVin report id "}
              <code className="px-1 bg-white border border-outline-variant/60 rounded">
                {report.reportId}
              </code>
            </>
          )}
          . Data sourced from <strong>ClearVin LLC</strong>, an approved NMVTIS
          Data Provider, and rendered unmodified. For the limits of NMVTIS data
          and the federally-mandated consumer disclosure, see the{" "}
          <Link href="/disclaimer" className="underline hover:text-primary">
            NMVTIS Disclaimer
          </Link>
          .
        </span>
      </p>
    </div>
  );
}
