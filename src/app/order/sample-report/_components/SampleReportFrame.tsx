"use client";

import { useState } from "react";
import { Download, Printer, Maximize2, Minimize2 } from "lucide-react";

/**
 * Sample-report iframe. Lives on its own client component so the parent
 * page can stay a server component with metadata. Same UX as the real
 * paid report (print / download / fullscreen) but the iframe always
 * points at the public /api/order/sample-report-pdf endpoint.
 */
export default function SampleReportFrame() {
  const [expanded, setExpanded] = useState(false);
  const pdfUrl = "/api/order/sample-report-pdf";

  function handlePrint() {
    const w = window.open(pdfUrl, "_blank");
    if (w) {
      w.addEventListener("load", () => {
        try {
          w.print();
        } catch {
          /* noop */
        }
      });
    }
  }

  return (
    <>
      <div className="px-6 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-2 bg-surface-container/50 print:hidden">
        <p className="text-xs text-on-surface-variant">
          PDF rendered live from ClearVin
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
            download="sample-vin-report.pdf"
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

      <div
        className={
          expanded
            ? "fixed inset-0 z-50 bg-surface p-3 overflow-hidden flex flex-col"
            : ""
        }
      >
        {expanded && (
          <div className="flex items-center justify-between px-3 pb-3 flex-shrink-0 print:hidden">
            <p className="text-xs text-on-surface-variant">
              Full-screen view · Sample report
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
          title="Sample ClearVin report"
          className={
            expanded
              ? "w-full flex-1 rounded-xl border border-outline-variant/40 bg-white"
              : "w-full bg-white block"
          }
          style={expanded ? undefined : { height: "1100px", border: "none" }}
        />
      </div>
    </>
  );
}
