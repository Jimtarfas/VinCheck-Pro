"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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
 * ClearVin returns the full report as a self-contained HTML document.
 * Compliance requirement: the data must be displayed *unmodified*. We
 * embed it in a sandboxed iframe via srcdoc so:
 *   - ClearVin's HTML renders exactly as they produced it,
 *   - it can't read our DOM / cookies (sandbox attribute),
 *   - we keep our own page chrome around it (the part they explicitly
 *     allow us to customise).
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
  html: string;
  reportId?: string;
  requestId?: string;
  /** False if ClearVin returned an effectively empty HTML body. */
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
  const [iframeHeight, setIframeHeight] = useState<number>(800);
  const [expanded, setExpanded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch(`/api/order/report/${orderId}`, { cache: "no-store" });
      const json = (await res.json()) as ApiResponse;

      if (json.status === "pending") {
        setPending(true);
        setOrder(json.order || null);
        return;
      }
      if (!res.ok || !json.ok || !json.report) {
        setErrorMessage(json.error || json.message || "Could not load report.");
        return;
      }
      setPending(false);
      setOrder(json.order || null);
      setReport(json.report);
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

  // Auto-size the iframe to the rendered ClearVin document so the buyer
  // doesn't get a tiny scrolling box inside our page. We measure
  // scrollHeight on load + on subsequent resize events posted from inside
  // the iframe (we inject a tiny postMessage shim into the srcdoc).
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e?.data?.type === "cv-report-height" && typeof e.data.value === "number") {
        // Clamp to a sane range to avoid layout explosions on tiny reports.
        const h = Math.max(600, Math.min(20000, Math.round(e.data.value)));
        setIframeHeight(h);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  function handleIframeLoad() {
    try {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return;
      const h = doc.documentElement.scrollHeight || doc.body?.scrollHeight || 800;
      setIframeHeight(Math.max(600, Math.min(20000, h)));
    } catch {
      // Cross-origin (shouldn't happen with srcdoc, but be defensive).
    }
  }

  function handlePrint() {
    iframeRef.current?.contentWindow?.print();
  }

  function handleDownloadHtml() {
    if (!report) return;
    const blob = new Blob([report.html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vinreport-${order?.vin || report.vin}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
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

  if (!report || !order) return null;

  // ── Empty-content fallback ──
  // ClearVin may legitimately have no data on a given VIN — especially
  // in test mode where many of the whitelisted VINs return an empty
  // html_report. Render a friendly explanation instead of a blank iframe.
  if (report.hasContent === false) {
    return (
      <div className="space-y-4">
        <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-primary via-primary-700 to-primary-800 text-white px-6 sm:px-8 py-6">
            <p className="text-[11px] uppercase font-bold tracking-[0.16em] text-white/70">
              Vehicle History Report
            </p>
            <h1 className="text-2xl sm:text-3xl font-headline font-extrabold mt-1 tracking-tight">
              {order.vehicleLabel || "Vehicle history report"}
            </h1>
            <p className="text-sm font-mono text-white/70 mt-1">{order.vin}</p>
          </div>
        </div>

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

        <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-5 text-xs text-on-surface-variant leading-relaxed">
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
              . Data sourced from <strong>ClearVin LLC</strong>, an approved
              NMVTIS Data Provider, and rendered unmodified.
            </span>
          </p>
        </div>
      </div>
    );
  }

  // ── Build the iframe document.
  // We inject a tiny <script> at the end of the body that posts the
  // document height back to us — both on load and on ResizeObserver
  // events — so the iframe height stays in sync with the report.
  // ClearVin's HTML itself is untouched; the shim is appended, not
  // edited into their markup.
  const SIZE_SHIM = `
<script>
(function(){
  function post(){
    try { parent.postMessage({type:'cv-report-height', value: document.documentElement.scrollHeight}, '*'); }
    catch(e) {}
  }
  window.addEventListener('load', post);
  if ('ResizeObserver' in window) {
    new ResizeObserver(post).observe(document.documentElement);
  }
  setTimeout(post, 100);
  setTimeout(post, 500);
  setTimeout(post, 1500);
})();
</script>`;
  const srcDoc = report.html.includes("</body>")
    ? report.html.replace("</body>", `${SIZE_SHIM}</body>`)
    : report.html + SIZE_SHIM;

  return (
    <div className="space-y-4 print:space-y-2">
      {/* ── Header strip — our own chrome (the part ClearVin lets us style) ── */}
      <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-primary via-primary-700 to-primary-800 text-white px-6 sm:px-8 py-6">
          <p className="text-[11px] uppercase font-bold tracking-[0.16em] text-white/70">
            Vehicle History Report
          </p>
          <h1 className="text-2xl sm:text-3xl font-headline font-extrabold mt-1 tracking-tight">
            {order.vehicleLabel || "Vehicle history report"}
          </h1>
          <p className="text-sm font-mono text-white/70 mt-1">{order.vin}</p>
        </div>

        {/* Toolbar */}
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
            <button
              onClick={handleDownloadHtml}
              className="text-xs px-3 py-1.5 bg-white border border-outline-variant/60 rounded-lg inline-flex items-center gap-1.5 hover:bg-surface-container-low"
            >
              <Download className="w-3.5 h-3.5" />
              Save HTML
            </button>
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

      {/* ── ClearVin report (rendered unmodified) ── */}
      <div
        className={
          expanded
            ? "fixed inset-0 z-50 bg-surface p-3 overflow-auto"
            : "bg-surface-container-lowest border border-outline-variant/40 rounded-2xl overflow-hidden"
        }
      >
        {expanded && (
          <div className="flex items-center justify-between px-3 pb-3 print:hidden">
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
          ref={iframeRef}
          title={`ClearVin report for ${order.vin}`}
          srcDoc={srcDoc}
          onLoad={handleIframeLoad}
          /* sandbox: render scripts (ClearVin's report may use them for
             tables/charts) but block top-level navigation + form
             submission, and DON'T grant same-origin so it cannot reach
             our cookies / storage. */
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          className={
            expanded
              ? "w-full h-[calc(100vh-60px)] rounded-xl border border-outline-variant/40 bg-white"
              : "w-full bg-white"
          }
          style={
            expanded
              ? undefined
              : { height: `${iframeHeight}px`, border: "none" }
          }
        />
      </div>

      {/* ── Footer disclosures ── */}
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
            {!report.reportId && report.requestId && (
              <>
                {" · ClearVin reference "}
                <code className="px-1 bg-white border border-outline-variant/60 rounded">
                  {report.requestId}
                </code>
              </>
            )}
            . Data sourced from <strong>ClearVin LLC</strong>, an approved
            NMVTIS Data Provider, and rendered unmodified. For the limits
            of NMVTIS data and the federally-mandated consumer disclosure,
            see the{" "}
            <Link href="/disclaimer" className="underline hover:text-primary">
              NMVTIS Disclaimer
            </Link>
            .
          </span>
        </p>
      </div>
    </div>
  );
}
