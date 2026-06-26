"use client";

/**
 * FullVinReport — the premium, post-purchase vehicle history report.
 *
 * Consumes a single `NormalizedReport` (built server-side from ClearVin's
 * structured data) and renders all 20 report sections in CarCheckerVIN's
 * design system. Self-contained dark mode + print/PDF support.
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Car, FileText, Gauge, ShieldCheck, ShieldAlert, AlertTriangle, Wrench,
  History, Users, Hammer, Droplets, BadgeCheck, Banknote, TrendingUp,
  Camera, ListChecks, Printer, Download, Moon, Sun, Fingerprint, Award,
  CalendarClock, ScrollText, Building2, Truck, ClipboardCheck, Siren,
  CircleDollarSign, MapPin, CheckCircle2, XCircle, Info, Loader2,
  X, ChevronLeft, ChevronRight,
} from "lucide-react";
import type { NormalizedReport } from "@/lib/clearvin-report";
import Logo from "@/components/Logo";
import {
  ReportSection, Badge, StatTile, DataGrid, EmptyState, CheckRow, DataTable,
} from "./primitives";
import { OdometerChart, ValueBars, ScoreGauge, RiskMeter } from "./charts";
import SectionNav, { type SectionNavItem } from "./SectionNav";

/* ── helpers ──────────────────────────────────────────────────────────── */

const fmtDate = (iso: string | null): string => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};
const money = (n: number, currency = "USD") =>
  n > 0 ? `${currency === "USD" ? "$" : ""}${n.toLocaleString()}` : "—";

/* A labelled status line: green check + "No Issues Reported", or a red alert
   with the finding. Mirrors the lien / theft summary rows in ClearVin. */
function StatusLine({
  label,
  flagged,
  flagText,
  okText = "No Issues Reported",
}: {
  label: string;
  flagged: boolean;
  flagText: string;
  okText?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-outline-variant/30 py-3 last:border-b-0 dark:border-white/5">
      <span className="min-w-0 break-words font-bold text-on-surface dark:text-slate-100">{label}</span>
      <span
        className={`flex flex-shrink-0 items-center gap-2 text-sm font-semibold ${
          flagged ? "text-red-600 dark:text-red-400" : "text-on-surface-variant dark:text-slate-300"
        }`}
      >
        {flagged ? (
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-500" />
        ) : (
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
        )}
        {flagged ? flagText : okText}
      </span>
    </div>
  );
}

/* ── PDF image helpers ────────────────────────────────────────────────────

   The report shows hero/auction/gallery images served from external CDNs
   (auto.dev, ClearVin) with no CORS headers. html-to-image draws them with
   their original cross-origin URL, which taints the export canvas — and the
   subsequent `toDataURL()` then throws a SecurityError ("could not generate").

   To avoid the taint entirely we route every external <img> through our own
   `/api/images` proxy (server-side fetch → base64 data URI), swap the data URIs
   into the live DOM just for the capture, then restore the originals after. */

const isExternalSrc = (s: string): boolean =>
  /^https?:\/\//.test(s) && !s.startsWith(window.location.origin);

// 1×1 transparent GIF — used when an image can't be proxied, so it still won't
// taint the canvas (a blank cell is better than a failed export).
const TRANSPARENT_PX =
  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

async function proxyToDataUris(urls: string[]): Promise<string[]> {
  const out: string[] = [];
  // The proxy caps each request at 15 URLs, so chunk to cover long galleries.
  for (let i = 0; i < urls.length; i += 15) {
    const chunk = urls.slice(i, i + 15);
    try {
      // Hard cap each proxy round-trip. /api/images fetches the source CDN
      // server-side; if a CDN stalls, an un-aborted fetch would hang the whole
      // PDF export forever (the request never rejects on its own). Abort after
      // 8s and fall back to blank cells so the report still downloads.
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      let j: { images?: string[] };
      try {
        const res = await fetch("/api/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls: chunk }),
          signal: ctrl.signal,
        });
        j = (await res.json()) as { images?: string[] };
      } finally {
        clearTimeout(timer);
      }
      const imgs = Array.isArray(j.images) ? j.images : [];
      for (let k = 0; k < chunk.length; k++) out.push(imgs[k] || "");
    } catch {
      for (let k = 0; k < chunk.length; k++) out.push("");
    }
  }
  return out;
}

/* Shrink a (same-origin) data URI by drawing it to an offscreen canvas at a
   capped width and re-encoding as JPEG. This is essential for the export:
   html-to-image embeds every image as base64 inside ONE giant SVG, and the
   browser's SVG rasteriser hangs when that SVG balloons to several MB. A long
   report with dozens of full-res auction photos easily hits that wall, so we
   downscale each image to a print-sufficient size first. */
function downscaleDataUri(
  src: string,
  maxW = 720,
  quality = 0.72
): Promise<string> {
  return new Promise((resolve) => {
    if (!src || !src.startsWith("data:")) return resolve(src);
    const img = new window.Image();
    let settled = false;
    const done = (v: string) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(v);
    };
    // Belt-and-suspenders: if the decode never fires onload/onerror (corrupt
    // data URI), don't hang the export — fall back to the original after 5s.
    const timer = setTimeout(() => done(src), 5000);
    img.onload = () => {
      const scale = img.naturalWidth > maxW ? maxW / img.naturalWidth : 1;
      const w = Math.max(1, Math.round(img.naturalWidth * scale));
      const h = Math.max(1, Math.round(img.naturalHeight * scale));
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d");
      if (!ctx) return done(src);
      ctx.drawImage(img, 0, 0, w, h);
      try {
        done(c.toDataURL("image/jpeg", quality));
      } catch {
        done(src);
      }
    };
    img.onerror = () => done(src);
    img.src = src;
  });
}

/* Reject if `promise` hasn't settled within `ms`. Used to bound the
   html-to-image capture, whose SVG rasteriser can occasionally hang on large
   image-heavy reports and never resolve. */
function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms);
    promise.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      }
    );
  });
}

/* Prepare `root` for a clean capture by neutralising horizontal scroll
   containers — and, crucially, the wide tables inside them.

   Our data tables wrap in `overflow-x-auto` around an inner `min-w-[480px]`
   table so they scroll on narrow screens. During capture two things go wrong:
     1. the `auto` overflow renders a real scrollbar track into the PDF, and
     2. when the report column is narrower than the table's 480px min-width,
        forcing `overflow:visible` lets the table spill past the captured
        node's right edge, where it gets clipped — that's the "Title Brand
        Information" text being cut off horizontally.

   So for every scroll container we (a) set `overflow:visible` to drop the
   track, and (b) collapse the `min-width` on its descendant tables to `0`,
   letting them reflow and wrap within the page width. Returns a restore fn. */
function freezeScrollbars(root: HTMLElement): () => void {
  const restores: Array<() => void> = [];
  root.querySelectorAll<HTMLElement>("*").forEach((el) => {
    const cs = getComputedStyle(el);
    if (/(auto|scroll)/.test(`${cs.overflow}${cs.overflowX}${cs.overflowY}`)) {
      const prevOverflow = el.style.overflow;
      el.style.overflow = "visible";
      restores.push(() => {
        el.style.overflow = prevOverflow;
      });
      // Collapse the min-width on any table inside this scroll box so it fits
      // the page instead of overflowing (and getting clipped) on capture.
      el.querySelectorAll<HTMLElement>("table").forEach((tbl) => {
        const prevMin = tbl.style.minWidth;
        const prevWidth = tbl.style.width;
        tbl.style.minWidth = "0";
        tbl.style.width = "100%";
        restores.push(() => {
          tbl.style.minWidth = prevMin;
          tbl.style.width = prevWidth;
        });
      });
    }
  });
  return () => {
    for (const restore of restores) restore();
  };
}

/* Replace every external <img> in `root` with an inlined, downscaled data URI.
   Returns a function that restores the original src/srcset attributes. */
async function inlineExternalImages(root: HTMLElement): Promise<() => void> {
  const externals = Array.from(root.querySelectorAll("img")).filter((img) =>
    isExternalSrc(img.currentSrc || img.src)
  );
  if (externals.length === 0) return () => {};

  const proxied = await proxyToDataUris(
    externals.map((img) => img.currentSrc || img.src)
  );
  // Downscale so the captured SVG stays small enough to rasterise.
  const dataUris = await Promise.all(
    proxied.map((u) => (u ? downscaleDataUri(u) : Promise.resolve("")))
  );

  const restores = externals.map((img, i) => {
    const origSrc = img.getAttribute("src");
    const origSrcset = img.getAttribute("srcset");
    // next/image sets srcset; clear it so the browser uses our swapped src.
    img.removeAttribute("srcset");
    img.setAttribute("src", dataUris[i] || TRANSPARENT_PX);
    return () => {
      if (origSrcset !== null) img.setAttribute("srcset", origSrcset);
      if (origSrc !== null) img.setAttribute("src", origSrc);
      else img.removeAttribute("src");
    };
  });

  // Wait for the swapped images to decode before capturing.
  await Promise.all(externals.map((img) => img.decode().catch(() => {})));

  return () => restores.forEach((r) => r());
}

/* ── component ────────────────────────────────────────────────────────── */

export default function FullVinReport({
  report,
  pdfUrl,
}: {
  report: NormalizedReport;
  pdfUrl?: string;
}) {
  const [dark, setDark] = useState(false);
  // PDF export state. `exporting` momentarily hides the in-report nav dropdown
  // so it isn't baked into the captured image; `generating` drives the button.
  const [generating, setGenerating] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  // Photo lightbox: index of the open photo, or null when closed. Buyers can
  // click any thumbnail to open it full-size and arrow between all photos.
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { vehicle: v, meta } = report;
  const fullName = [v.year, v.make, v.model, v.trim].filter(Boolean).join(" ") || "Vehicle";

  // "Jump to Section" table of contents. Order mirrors the rendered sections;
  // `count` surfaces how many records each carries (red only when an alert
  // section actually has findings — 0 stays neutral, matching the design).
  const navItems: SectionNavItem[] = [
    { id: "overview", label: "Vehicle Overview",     icon: Award },
    { id: "specs",    label: "Vehicle Specs",        icon: Car },
    { id: "owners",   label: "Ownership History",    icon: Users,            count: report.owners.length },
    { id: "accidents",label: "Accident History",     icon: AlertTriangle,    count: report.accidents.length, alert: report.accidents.length > 0 },
    { id: "damage",   label: "Damage & Salvage",     icon: Hammer,           count: report.damage.length,    alert: report.damage.length > 0 },
    { id: "odometer", label: "Odometer History",     icon: Gauge,            count: report.odometer.readings.length },
    { id: "recalls",  label: "Safety Recalls",       icon: Siren,            count: report.recalls.length,   alert: report.recalls.length > 0 },
    { id: "insurance",label: "Insurance Records",    icon: ClipboardCheck,   count: report.insurance.records.length, alert: report.insurance.records.length > 0 },
    { id: "lien",     label: "Lien & Impound",       icon: Banknote,         alert: report.lienImpound.impound.length > 0 || report.lienImpound.undisclosedLien || report.lienImpound.lienRecords.length > 0 },
    { id: "theft",    label: "Theft Records",        icon: ShieldCheck },
    { id: "brands",   label: "Title Brand Info",     icon: BadgeCheck,       count: report.titleBrands.count, alert: report.titleBrands.count > 0 },
    { id: "auctions", label: "Auction History",      icon: Building2,        count: report.auctions.length,  alert: report.auctions.length > 0 },
    { id: "sales",    label: "Sales Listings",       icon: CircleDollarSign, count: report.sales.length },
    { id: "service",  label: "Service & Maintenance",icon: Wrench,           count: report.service.length },
    { id: "value",    label: "Market Value",         icon: Banknote },
    { id: "usage",    label: "Usage Analysis",       icon: Truck },
    { id: "risk",     label: "Risk Analysis",        icon: ShieldAlert },
    { id: "timeline", label: "Vehicle Timeline",     icon: History,          count: report.timeline.length },
    { id: "photos",   label: "Vehicle Photos",       icon: Camera,           count: report.photos.length },
    { id: "summary",  label: "Report Summary",       icon: ListChecks },
  ];

  // Lightbox keyboard control: Esc closes, ←/→ step through photos. Bound only
  // while the lightbox is open so it never interferes with the rest of the page.
  const photoCount = report.photos.length;
  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % photoCount));
      else if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? i : (i - 1 + photoCount) % photoCount));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, photoCount]);

  function pdfFileName(): string {
    return (
      `${fullName}-${v.vin}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "vehicle-history-report"
    );
  }

  /* Download a pixel-perfect PDF of exactly what's on screen.

     Same technique as the window-sticker export: capture the live report DOM
     with html-to-image (renders Tailwind v4's oklch colors faithfully, which
     html2canvas cannot), then place the bitmap into a jsPDF. Because the report
     is long, the single tall capture is sliced into A4-height bands so it
     paginates cleanly instead of becoming one over-tall page. */
  async function doPdf() {
    setGenerating(true);
    setExportError(null);
    setExporting(true);
    // Let the nav-hidden state paint before we capture.
    await new Promise<void>((r) =>
      requestAnimationFrame(() => requestAnimationFrame(() => r()))
    );

    const bg = dark ? "#020617" : "#ffffff";
    let restoreImages: (() => void) | null = null;
    let restoreScroll: (() => void) | null = null;
    try {
      const node = document.getElementById("report-export");
      if (!node) {
        setExportError("Report content not found. Please try again.");
        return;
      }

      // Hide scroll tracks so they don't get rasterised into the PDF.
      restoreScroll = freezeScrollbars(node);

      // Inline cross-origin images so the export canvas isn't tainted.
      restoreImages = await inlineExternalImages(node);

      const { toCanvas } = await import("html-to-image");
      // html-to-image rasterises the whole DOM into a single SVG <foreignObject>
      // and hands it to the browser's image decoder. On large, image-heavy
      // reports that SVG can balloon to several MB and the decoder occasionally
      // never resolves — leaving the button stuck on "Generating…" forever with
      // no error to catch. Race the capture against a hard timeout so a hung
      // rasteriser can't strand the user; the catch below falls back to the
      // browser's native print-to-PDF, which uses our full print stylesheet.
      const canvas = await withTimeout(
        toCanvas(node, {
          // 2× (~210 DPI at print width) keeps body text and table labels sharp
          // rather than pixelated. The image-heavy cost of the higher resolution
          // is offset by the aggressive image downscaling above (every photo is
          // re-encoded ≤720px before capture), so the SVG stays rasterisable.
          pixelRatio: 2,
          backgroundColor: bg,
          // External images are already inlined as data URIs above, so cache-
          // busting only forces needless re-fetches of same-origin assets.
          cacheBust: false,
          // Fonts are already loaded in-page; embedding cross-origin font files
          // can fail, so skip it (matches the window-sticker export).
          skipFonts: true,
        }),
        25_000,
        "PDF capture timed out"
      );

      const { default: jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = 210;
      const pageH = 297;
      const margin = 8;
      const printW = pageW - margin * 2;
      const pxPerMm = canvas.width / printW;
      const slicePxMax = Math.floor((pageH - margin * 2) * pxPerMm);

      // ── Smart page breaks ──────────────────────────────────────────────
      // Naive fixed-height bands slice straight through whatever happens to
      // sit on the fold — most visibly the auction photo grids, which ended
      // up cut in half across two pages. Instead, prefer to break the page at
      // a *section* boundary so each card stays whole. We measure the bottom
      // edge of every top-level block in the report (and every image, as a
      // fallback) in canvas pixels, then pack as many whole sections onto a
      // page as fit.
      const rootRect = node.getBoundingClientRect();
      const scaleY = canvas.height / rootRect.height;
      const toCanvasY = (clientY: number) => (clientY - rootRect.top) * scaleY;

      const sectionBreaks: number[] = [];
      for (const child of Array.from(node.children) as HTMLElement[]) {
        const b = toCanvasY(child.getBoundingClientRect().bottom);
        if (b > 0) sectionBreaks.push(b);
      }
      // Guard-rails: [top, bottom] of every atomic block we must never slice
      // through when a single section is taller than a page. Images (so a photo
      // isn't cut in half) plus row-level content — timeline items, table rows,
      // key/value grid rows, recall/damage cards — so a line of text never gets
      // bisected across the page fold (the "Safety recall reported" row that was
      // splitting between pages).
      const forbiddenZones: Array<[number, number]> = [];
      const addZone = (r: DOMRect) => {
        const top = toCanvasY(r.top);
        const bot = toCanvasY(r.bottom);
        // Only guard rows shorter than a page; a taller-than-page block can't be
        // protected and must be allowed to split.
        if (bot - top > 4 && bot - top < slicePxMax) {
          forbiddenZones.push([top, bot]);
        }
      };
      node
        .querySelectorAll(
          "img, li, tr, dl > div, details, .rounded-xl"
        )
        .forEach((el) => addZone(el.getBoundingClientRect()));

      let offset = 0;
      let page = 0;
      while (offset < canvas.height - 1) {
        const maxCut = offset + slicePxMax;
        let cut: number;
        if (maxCut >= canvas.height) {
          cut = canvas.height;
        } else {
          // Prefer the furthest section boundary that still fits on this page.
          let best = -1;
          for (const b of sectionBreaks) {
            if (b > offset + 1 && b <= maxCut && b > best) best = b;
          }
          if (best > offset + 1) {
            cut = best;
          } else {
            // A single section is taller than one page — hard-cut at the page
            // height, but pull the cut above any atomic block (image or text
            // row) it would slice through, so nothing is bisected on the fold.
            // Iterate to a fixed point: pulling the cut up can expose a higher
            // (e.g. nested or parent-card) block that now straddles the fold.
            cut = maxCut;
            for (let guard = 0; guard < 200; guard++) {
              let lifted = cut;
              for (const [top, bot] of forbiddenZones) {
                if (top > offset + 1 && top < lifted && bot > cut) lifted = top;
              }
              if (lifted === cut) break;
              cut = lifted;
            }
            // Block taller than a whole page: nothing we can do but cut it.
            if (cut <= offset + 1) cut = maxCut;
          }
        }

        const slicePx = Math.round(cut - offset);
        if (slicePx <= 0) break;

        const slice = document.createElement("canvas");
        slice.width = canvas.width;
        slice.height = slicePx;
        const ctx = slice.getContext("2d");
        if (ctx) {
          ctx.fillStyle = bg;
          ctx.fillRect(0, 0, slice.width, slice.height);
          ctx.drawImage(
            canvas,
            0, offset, canvas.width, slicePx,
            0, 0, canvas.width, slicePx
          );
        }
        // JPEG (not PNG): the band is an opaque, photo-heavy snapshot, so JPEG
        // encodes several times faster and produces ~5–8× less data — which in
        // turn makes jsPDF's addImage/save dramatically quicker. The background
        // is already painted above, so there's no transparency to lose.
        const img = slice.toDataURL("image/jpeg", 0.9);
        const sliceMm = slicePx / pxPerMm;
        if (page > 0) pdf.addPage();
        pdf.addImage(img, "JPEG", margin, margin, printW, sliceMm);
        offset += slicePx;
        page++;
      }

      pdf.save(`${pdfFileName()}.pdf`);
    } catch (err) {
      console.error("[FullReport] doPdf failed:", err);
      // Restore the live images/scrollbars before any fallback so the page
      // (and the print view) shows the real artwork rather than the inlined
      // placeholders.
      restoreImages?.();
      restoreImages = null;
      restoreScroll?.();
      restoreScroll = null;
      if (pdfUrl) {
        // Prefer ClearVin's own PDF if this instance was given one.
        window.open(pdfUrl, "_blank");
      } else {
        // No server PDF to fall back to. Rather than strand the buyer, hand
        // off to the browser's native print-to-PDF — the report ships a full
        // print stylesheet, so "Save as PDF" produces a clean document.
        setExportError(
          "Building the download took too long — opening your browser's print dialog instead. Choose “Save as PDF.”"
        );
        // `finally` resets the nav/exporting state synchronously after this
        // return; give it a beat to paint, then open the native print dialog.
        setTimeout(() => {
          try {
            window.print();
          } catch {
            /* user can still use the Print button manually */
          }
        }, 400);
        return;
      }
    } finally {
      restoreImages?.();
      restoreScroll?.();
      setExporting(false);
      setGenerating(false);
    }
  }

  return (
    <div className={dark ? "dark" : ""}>
      <div className="report-root bg-surface dark:bg-slate-950 min-h-screen pb-28 print:bg-white print:pb-0">
        {/* ── Action toolbar (fixed floating dock) ──────────────────────
           Pinned to the bottom of the viewport so it's always reachable.
           A floating dock (not a top bar) never slices through report cards
           and never collides with the fixed site header. */}
        <div className="fixed inset-x-0 bottom-4 z-40 px-4 print:hidden">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-2xl border border-outline-variant/40 bg-white/95 px-4 py-2.5 shadow-lg shadow-primary/10 backdrop-blur dark:border-white/10 dark:bg-slate-900/95 sm:px-6">
            <span className="flex items-center gap-2 text-sm font-bold text-on-surface dark:text-slate-100">
              <BadgeCheck className="h-4 w-4 text-green-600" />
              <span className="hidden sm:inline">Verified Vehicle History Report</span>
              <span className="sm:hidden">Report</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDark((d) => !d)}
                aria-label="Toggle dark mode"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition hover:brightness-95 dark:bg-slate-800 dark:text-slate-300"
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 rounded-full bg-surface-container px-3.5 py-2 text-xs font-bold text-on-surface transition hover:brightness-95 dark:bg-slate-800 dark:text-slate-200"
              >
                <Printer className="h-4 w-4" /> <span className="hidden sm:inline">Print</span>
              </button>
              <button
                onClick={doPdf}
                disabled={generating}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold text-on-secondary-container transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
                style={{ background: "var(--color-secondary-container)" }}
              >
                {generating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">{generating ? "Generating…" : "Download PDF"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* PDF-export error toast — sits just above the floating dock. */}
        {exportError && (
          <div className="fixed inset-x-0 bottom-20 z-40 px-4 print:hidden">
            <div className="mx-auto flex max-w-5xl items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-700 shadow-lg dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
              <XCircle className="h-4 w-4 flex-shrink-0" />
              {exportError}
            </div>
          </div>
        )}

        {/* pt clears the fixed site Header (~70px) so the hero card isn't
            hidden behind the nav on first paint (desktop + mobile). */}
        <div className="mx-auto max-w-6xl px-4 pb-6 pt-24 sm:px-6 print:pt-6">
          {meta.isMock && (
            <div className="mb-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
              Sample data shown — set <code className="font-mono">CLEARVIN_SANDBOX_API_TOKEN</code> to fetch live records for this VIN.
            </div>
          )}

          {/* Two-column shell: a sticky "Jump to Section" rail on large screens,
              the full report body alongside it. The rail collapses into a
              dropdown above the body on tablet/mobile (and is hidden in print). */}
          <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-6">
            <aside className="hidden lg:block print:hidden">
              <SectionNav items={navItems} variant="desktop" />
            </aside>

            <div id="report-export" className="min-w-0 space-y-5">
              {!exporting && <SectionNav items={navItems} variant="mobile" />}

              {/* ══ 0. BRAND BAR (logo + site link, baked into the PDF) ═══ */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest dark:bg-slate-900 px-4 py-3">
                <Logo variant={dark ? "onDark" : "onLight"} size="md" href="/" />
                <a
                  href="https://www.carcheckervin.com"
                  className="text-xs font-semibold text-primary dark:text-slate-300 hover:underline"
                >
                  www.carcheckervin.com
                </a>
              </div>

              {/* ══ 1. REPORT HEADER ══════════════════════════════════════ */}
              <header className="overflow-hidden rounded-2xl bg-primary text-white shadow-lg print:shadow-none">
            <div className="grid gap-0 sm:grid-cols-[260px_1fr]">
              <div className="relative flex min-h-[180px] items-center justify-center bg-white/5">
                {v.heroImage ? (
                  <Image src={v.heroImage} alt={fullName} fill className="object-cover" unoptimized />
                ) : (
                  <div className="flex flex-col items-center gap-2 p-6 text-center text-white/60">
                    <Car className="h-12 w-12" />
                    <span className="text-xs">Manufacturer image<br />not on file</span>
                  </div>
                )}
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="info">{meta.source === "clearvin" ? "NMVTIS-backed" : "Report"}</Badge>
                  {report.title.isBranded ? (
                    <Badge tone="critical">Branded title</Badge>
                  ) : (
                    <Badge tone="good">No title brand</Badge>
                  )}
                </div>
                <h1 className="mt-2 font-headline text-2xl font-extrabold leading-tight sm:text-3xl">{fullName}</h1>
                <p className="mt-1 font-mono text-sm tracking-wide text-white/70">{v.vin}</p>

                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                  {[
                    ["Engine", v.engine],
                    ["Transmission", v.transmission],
                    ["Body", v.bodyStyle],
                    ["Drive", v.driveType],
                    ["Fuel", v.fuelType || "—"],
                    ["Made in", v.countryOfOrigin],
                  ].map(([k, val]) => (
                    <div key={k}>
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-white/50">{k}</div>
                      <div className="truncate text-sm font-semibold">{val || "—"}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-white/10 pt-3 text-xs text-white/60">
                  <span className="inline-flex items-center gap-1"><CalendarClock className="h-3.5 w-3.5" /> Generated {fmtDate(meta.generatedAt)}</span>
                  <span className="inline-flex items-center gap-1"><Fingerprint className="h-3.5 w-3.5" /> Report ID {meta.reportId || "—"}</span>
                </div>
              </div>
            </div>
          </header>

          {/* ══ 2. VEHICLE OVERVIEW ═══════════════════════════════════ */}
          <ReportSection id="overview" icon={Award} title="Vehicle Overview" subtitle="Condition score, key highlights & records found">
            <div className="grid gap-5 lg:grid-cols-[200px_1fr]">
              <div className="flex flex-col items-center justify-center rounded-2xl bg-surface-container-low dark:bg-slate-800/60 p-4">
                <ScoreGauge value={report.overview.gradeValue} label={report.overview.gradeLabel} />
                <p className="mt-1 text-center text-xs text-on-surface-variant dark:text-slate-400">
                  Overall condition grade
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {report.overview.recordCounts.slice(0, 8).map((rc) => (
                    <StatTile key={rc.label} label={rc.label} value={rc.count} tone={rc.count > 0 && /brand|salvage|recall/i.test(rc.label) ? "warning" : "neutral"} />
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-green-700 dark:text-green-400"><CheckCircle2 className="h-4 w-4" /> Key highlights</h3>
                    {report.overview.highlights.length ? (
                      <ul className="space-y-1 text-sm text-on-surface-variant dark:text-slate-300">
                        {report.overview.highlights.map((h) => <li key={h} className="flex gap-2"><span className="text-green-500">✓</span>{h}</li>)}
                      </ul>
                    ) : <p className="text-sm text-on-surface-variant dark:text-slate-400">—</p>}
                  </div>
                  <div>
                    <h3 className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-red-700 dark:text-red-400"><AlertTriangle className="h-4 w-4" /> Potential issues</h3>
                    {report.overview.issues.length ? (
                      <ul className="space-y-1 text-sm text-on-surface-variant dark:text-slate-300">
                        {report.overview.issues.map((h) => <li key={h} className="flex gap-2"><span className="text-red-500">!</span>{h}</li>)}
                      </ul>
                    ) : <p className="text-sm text-on-surface-variant dark:text-slate-400">None detected</p>}
                  </div>
                </div>
              </div>
            </div>
          </ReportSection>

          {/* ══ 3. SPECIFICATIONS ═════════════════════════════════════ */}
          <ReportSection id="specs" icon={Car} title="Vehicle Specifications" subtitle="Factory build & decoded VIN details">
            <div className="space-y-5">
              {report.specGroups.map((g) => (
                <div key={g.title}>
                  <h3 className="mb-1 text-xs font-bold uppercase tracking-wide text-primary dark:text-primary-fixed">{g.title}</h3>
                  <DataGrid rows={g.rows} />
                </div>
              ))}
            </div>
          </ReportSection>

          {/* ══ 4. TITLE HISTORY ══════════════════════════════════════ */}
          <ReportSection
            id="title" icon={ScrollText} title="Title History"
            subtitle="Title brands, state history & ownership transfers"
            tone={report.title.isBranded ? "alert" : "good"}
            count={report.title.records.length}
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-on-surface dark:text-slate-200">Current status:</span>
              <Badge tone={report.title.isBranded ? "critical" : "good"}>{report.title.currentStatus}</Badge>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
              {report.title.checks.map((c) => <CheckRow key={c.label} label={c.label} flagged={c.flagged} />)}
            </div>
            {report.title.records.length ? (
              <DataTable
                head={["Date", "State", "Odometer", "Type"]}
                rows={report.title.records.map((t) => [
                  fmtDate(t.date),
                  t.state,
                  t.mileage != null ? `${t.mileage.toLocaleString()} mi` : "—",
                  t.current ? <Badge key="c" tone="info">Current</Badge> : "Historical",
                ])}
              />
            ) : <EmptyState hint="No title records were returned for this VIN." />}
          </ReportSection>

          {/* ══ 5. OWNERSHIP HISTORY ══════════════════════════════════ */}
          <ReportSection id="owners" icon={Users} title="Ownership History" subtitle="Owner count, duration & use type" count={report.owners.length}>
            {report.owners.length ? (
              <DataTable
                head={["Owner", "State", "From", "To", "Use"]}
                rows={report.owners.map((o) => [`#${o.sequence}`, o.state, fmtDate(o.from), fmtDate(o.to), o.type])}
              />
            ) : (
              <EmptyState title="No ownership records found" hint="NMVTIS did not return individual owner records for this VIN. Title transfers are listed in the Title History section above." />
            )}
          </ReportSection>

          {/* ══ 6. ACCIDENT HISTORY ═══════════════════════════════════ */}
          <ReportSection id="accidents" icon={AlertTriangle} title="Accident History" subtitle="Reported collisions, severity & airbag deployment" count={report.accidents.length} tone={report.accidents.length ? "alert" : "good"}>
            {report.accidents.length ? (
              <DataTable
                head={["Date", "Severity", "Location", "Airbag", "Structural"]}
                rows={report.accidents.map((a) => [fmtDate(a.date), a.severity, a.location, a.airbag ? "Deployed" : "No", a.structural ? "Yes" : "No"])}
              />
            ) : (
              <EmptyState title="No accident records found" hint="No reported accidents were found in the available data sources for this VIN." />
            )}
          </ReportSection>

          {/* ══ 7. DAMAGE & SALVAGE RECORDS ═══════════════════════════ */}
          <ReportSection id="damage" icon={Hammer} title="Damage & Salvage Records" subtitle="Salvage yards, junk, insurance & structural damage" count={report.damage.length} tone={report.damage.length ? "alert" : "good"}>
            {report.damage.length ? (
              <div className="space-y-3">
                {report.damage.map((d, i) => (
                  <div key={i} className="rounded-xl border border-red-200 bg-red-50/60 p-4 dark:border-red-500/30 dark:bg-red-500/10">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="flex items-center gap-2 font-bold text-red-700 dark:text-red-300"><ShieldAlert className="h-4 w-4" /> {d.category}</span>
                      <span className="text-sm text-on-surface-variant dark:text-slate-400">{fmtDate(d.obtainedDate)}</span>
                    </div>
                    <div className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                      <div><span className="text-on-surface-variant dark:text-slate-400">Reporting entity:</span> <span className="font-semibold text-on-surface dark:text-slate-100">{d.entity}</span></div>
                      <div className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-on-surface-variant" /> {[d.city, d.state].filter(Boolean).join(", ") || "—"}</div>
                      <div><span className="text-on-surface-variant dark:text-slate-400">Disposition:</span> <span className="font-semibold text-on-surface dark:text-slate-100">{d.disposition}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No damage records found" hint="No collision, hail, flood, fire or salvage damage was reported." />
            )}
          </ReportSection>

          {/* ══ 8. ODOMETER HISTORY ═══════════════════════════════════ */}
          <ReportSection id="odometer" icon={Gauge} title="Odometer History" subtitle="Mileage timeline, consistency & rollback check" count={report.odometer.readings.length}>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge tone={report.odometer.rollback ? "critical" : "good"}>
                {report.odometer.rollback ? "Possible rollback detected" : "Mileage consistent"}
              </Badge>
              {report.odometer.last && (
                <Badge tone="neutral">Last reading: {report.odometer.last.mileage.toLocaleString()} {report.odometer.last.unit}</Badge>
              )}
            </div>
            {report.odometer.readings.length >= 2 && (
              <div className="mb-4 rounded-xl bg-surface-container-low dark:bg-slate-800/60 p-3">
                <OdometerChart readings={report.odometer.readings} />
              </div>
            )}
            {report.odometer.readings.length ? (
              <DataTable
                head={["Date", "Mileage", "Location", "Source"]}
                rows={report.odometer.readings.slice().reverse().map((o) => [
                  fmtDate(o.date), `${o.mileage.toLocaleString()} ${o.unit}`, o.location || "—", o.source || "—",
                ])}
              />
            ) : <EmptyState title="No odometer readings found" />}
          </ReportSection>

          {/* ══ 9. OPEN RECALLS ═══════════════════════════════════════ */}
          <ReportSection id="recalls" icon={Siren} title="Open Recalls" subtitle="NHTSA safety recalls & manufacturer references" count={report.recalls.length} tone={report.recalls.length ? "alert" : "good"}>
            {report.recalls.length ? (
              <div className="space-y-3">
                {report.recalls.map((rc, i) => (
                  <details key={i} className="group rounded-xl border border-amber-200 bg-amber-50/50 dark:border-amber-500/30 dark:bg-amber-500/10 [&_summary]:list-none" open={i === 0}>
                    <summary className="flex cursor-pointer items-start justify-between gap-3 p-4">
                      <span className="flex min-w-0 items-start gap-2 font-bold text-amber-800 dark:text-amber-200">
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span className="min-w-0 break-words [overflow-wrap:anywhere]">{rc.component}</span>
                      </span>
                      <span className="flex-shrink-0 whitespace-nowrap font-mono text-xs text-on-surface-variant dark:text-slate-400">{rc.campaign}</span>
                    </summary>
                    <div className="space-y-2 px-4 pb-4 text-sm text-on-surface-variant dark:text-slate-300">
                      <p><span className="font-semibold text-on-surface dark:text-slate-100">Summary: </span>{rc.summary}</p>
                      <p><span className="font-semibold text-on-surface dark:text-slate-100">Risk: </span>{rc.consequence}</p>
                      <p><span className="font-semibold text-on-surface dark:text-slate-100">Remedy: </span>{rc.remedy}</p>
                      <p className="text-xs">{rc.manufacturer} · Reported {fmtDate(rc.date)}</p>
                    </div>
                  </details>
                ))}
                <p className="flex items-start gap-2 rounded-lg bg-surface-container-low dark:bg-slate-800/60 p-3 text-xs text-on-surface-variant dark:text-slate-400">
                  <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                  Recalls are repaired free of charge by any franchised dealer. Confirm completion status before purchase.
                </p>
              </div>
            ) : <EmptyState title="No open recalls" hint="No outstanding NHTSA safety recalls were found." />}
          </ReportSection>

          {/* ══ 10. INSURANCE RECORDS ═════════════════════════════════ */}
          <ReportSection id="insurance" icon={ClipboardCheck} title="Insurance Records" subtitle="Total-loss & insurance claim events" count={report.insurance.records.length} tone={report.insurance.records.length ? "alert" : "good"}>
            {report.insurance.records.length ? (
              <DataTable
                head={["Date", "Type", "Status", "Detail"]}
                rows={report.insurance.records.map((rec) => [fmtDate(rec.date), rec.type, rec.status, rec.detail || "—"])}
              />
            ) : (
              <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 dark:bg-green-500/10">
                <ShieldCheck className="h-6 w-6 flex-shrink-0 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-200">No insurance loss reported</p>
                  <p className="text-sm text-green-700/80 dark:text-green-300/80">No total-loss or insurance claim events were found for this VIN in the available data sources.</p>
                </div>
              </div>
            )}
          </ReportSection>

          {/* ══ 11. LIEN & IMPOUND RECORDS ════════════════════════════ */}
          {(() => {
            const li = report.lienImpound;
            const flagged = li.impound.length > 0 || li.undisclosedLien || li.lienRecords.length > 0;
            return (
              <ReportSection id="lien" icon={Banknote} title="Lien & Impound Records" subtitle="Impound events, undisclosed liens & title-lien history" tone={flagged ? "alert" : "good"}>
                <div className="rounded-xl bg-surface-container-low px-4 dark:bg-slate-800/40">
                  <StatusLine label="Impound Information" flagged={li.impound.length > 0} flagText={`${li.impound.length} record${li.impound.length > 1 ? "s" : ""}`} />
                  <StatusLine label="Undisclosed Lien" flagged={li.undisclosedLien} flagText="Reported" />
                  <StatusLine label="Historical Title Lien Records" flagged={li.lienRecords.length > 0} flagText={`${li.lienRecords.length} record${li.lienRecords.length > 1 ? "s" : ""}`} />
                </div>
                {li.lienRecords.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-on-surface-variant dark:text-slate-400">Title lien history</p>
                    <DataTable head={["Lienholder", "Date", "Status"]} rows={li.lienRecords.map((l) => [l.holder, fmtDate(l.date), l.status])} />
                  </div>
                )}
                {li.impound.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-on-surface-variant dark:text-slate-400">Impound records</p>
                    <DataTable head={["Date", "Detail"]} rows={li.impound.map((im) => [fmtDate(im.date), im.detail])} />
                  </div>
                )}
              </ReportSection>
            );
          })()}

          {/* ══ 12. THEFT RECORDS ═════════════════════════════════════ */}
          <ReportSection id="theft" icon={ShieldCheck} title="Theft Records" subtitle="Theft & recovery checks" tone={report.theft.records.length ? "alert" : "good"}>
            {report.theft.records.length ? (
              <DataTable head={["Date", "Status"]} rows={report.theft.records.map((t) => [fmtDate(t.date), t.status])} />
            ) : (
              <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 dark:bg-green-500/10">
                <ShieldCheck className="h-6 w-6 flex-shrink-0 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-200">Not listed as stolen</p>
                  <p className="text-sm text-green-700/80 dark:text-green-300/80">This VIN was checked against theft databases and no active theft or unrecovered status was found.</p>
                </div>
              </div>
            )}
          </ReportSection>

          {/* ══ 13. TITLE BRAND INFORMATION ═══════════════════════════ */}
          <ReportSection id="brands" icon={BadgeCheck} title="Title Brand Information" subtitle="NMVTIS title brand codes reported against this VIN" count={report.titleBrands.count} tone={report.titleBrands.count ? "alert" : "good"}>
            {report.titleBrands.count ? (
              <>
                <div className="mb-3 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 dark:bg-red-500/10">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
                  <span className="font-bold uppercase tracking-wide text-red-700 dark:text-red-300">
                    {report.titleBrands.count} Brand(-s) Reported
                  </span>
                </div>
                {report.titleBrands.records.length > 0 ? (
                  <DataTable
                    head={["Brand", "Code", "Description"]}
                    rows={report.titleBrands.records.map((b) => [
                      <Badge key="b" tone="critical">{b.name || b.code || "Brand"}</Badge>,
                      b.code || "—",
                      b.description || "—",
                    ])}
                  />
                ) : (
                  <p className="text-sm text-on-surface-variant dark:text-slate-400">
                    Brand code details are listed in the Title History section above.
                  </p>
                )}
              </>
            ) : (
              <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 dark:bg-green-500/10">
                <BadgeCheck className="h-6 w-6 flex-shrink-0 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-200">No title brands reported</p>
                  <p className="text-sm text-green-700/80 dark:text-green-300/80">No NMVTIS title brands (salvage, junk, flood, lemon, rebuilt) were recorded against this VIN.</p>
                </div>
              </div>
            )}
          </ReportSection>

          {/* ══ 11. AUCTION HISTORY ═══════════════════════════════════ */}
          <ReportSection id="auctions" icon={Building2} title="Auction History" subtitle="Auction events, damage, mileage & sale results" count={report.auctions.length} tone={report.auctions.length ? "alert" : "good"}>
            {report.auctions.length ? (
              <div className="space-y-3">
                {report.auctions.map((a, i) => (
                  <div key={i} className="rounded-xl border border-outline-variant/40 bg-surface-container-low p-4 dark:border-white/10 dark:bg-slate-800/60">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="flex items-center gap-2 font-bold text-on-surface dark:text-slate-100">
                        <Building2 className="h-4 w-4 text-primary dark:text-primary-fixed" /> {a.location}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge tone={/sold/i.test(a.result) ? "info" : "neutral"}>{a.result}</Badge>
                        <span className="text-xs text-on-surface-variant dark:text-slate-400">{fmtDate(a.date)}</span>
                      </div>
                    </div>
                    <div className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                      {a.damage !== "—" && <div><span className="text-on-surface-variant dark:text-slate-400">Damage:</span> <span className="font-semibold text-red-700 dark:text-red-300">{a.damage}</span></div>}
                      {a.condition !== "—" && <div><span className="text-on-surface-variant dark:text-slate-400">Condition:</span> <span className="font-semibold text-on-surface dark:text-slate-100">{a.condition}</span></div>}
                      {a.odometer != null && <div><span className="text-on-surface-variant dark:text-slate-400">Odometer:</span> <span className="font-semibold text-on-surface dark:text-slate-100">{a.odometer.toLocaleString()} mi</span></div>}
                      {a.seller !== "—" && <div><span className="text-on-surface-variant dark:text-slate-400">Seller:</span> <span className="font-semibold text-on-surface dark:text-slate-100">{a.seller}</span></div>}
                    </div>
                    {a.photos.length > 0 && (
                      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                        {a.photos.slice(0, 5).map((url, pi) => (
                          <div key={pi} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface-container">
                            <Image src={url} alt={`Auction photo ${pi + 1}`} fill className="object-cover" unoptimized />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : <EmptyState title="No auction records found" hint="This vehicle has no salvage- or dealer-auction history on file." />}
          </ReportSection>

          {/* ══ 12. SALES LISTINGS HISTORY ════════════════════════════ */}
          <ReportSection id="sales" icon={CircleDollarSign} title="Sales Listings History" subtitle="Marketplace listings, prices, mileage & event type" count={report.sales.length}>
            {report.sales.length ? (
              <DataTable
                head={["Date", "Event", "Price", "Mileage"]}
                rows={report.sales.map((s) => [
                  fmtDate(s.date),
                  s.sellerType,
                  s.price,
                  s.mileage ? `${s.mileage.toLocaleString()} mi` : "—",
                ])}
              />
            ) : <EmptyState title="No listing history found" hint="No historical marketplace listings were returned for this VIN." />}
          </ReportSection>

          {/* ══ 13. SERVICE & MAINTENANCE ═════════════════════════════ */}
          <ReportSection id="service" icon={Wrench} title="Service & Maintenance" subtitle="Service, inspection & emissions records" count={report.service.length}>
            {report.service.length ? (
              <DataTable head={["Date", "Type", "Detail"]} rows={report.service.map((s) => [fmtDate(s.date), s.type, s.detail])} />
            ) : <EmptyState title="No service records found" hint="No maintenance, inspection or emissions records were reported for this VIN." />}
          </ReportSection>

          {/* ══ 14. MARKET VALUE ══════════════════════════════════════ */}
          <ReportSection id="value" icon={Banknote} title="Market Value" subtitle="Estimated retail & trade-in value by condition">
            {report.marketValue.available ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  <StatTile icon={TrendingUp} label="Retail (clean)" value={money(report.marketValue.retail.clean, report.marketValue.currency)} tone="good" />
                  <StatTile label="Retail (avg)" value={money(report.marketValue.retail.average, report.marketValue.currency)} />
                  <StatTile label="Trade-in (clean)" value={money(report.marketValue.tradeIn.clean, report.marketValue.currency)} />
                  <StatTile label="Original MSRP" value={report.marketValue.msrp || "—"} />
                </div>
                <div className="rounded-xl bg-surface-container-low dark:bg-slate-800/60 p-3">
                  <div className="mb-2 flex items-center gap-4 px-1 text-xs font-semibold text-on-surface-variant dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-primary dark:bg-primary-fixed" /> Retail</span>
                    <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: "#ffb870" }} /> Trade-in</span>
                  </div>
                  <ValueBars retail={report.marketValue.retail} tradeIn={report.marketValue.tradeIn} currency={report.marketValue.currency} />
                </div>
                {report.marketValue.asOf && (
                  <p className="text-xs text-on-surface-variant dark:text-slate-400">Valuation as of {report.marketValue.asOf} · Source: Black Book.</p>
                )}
              </div>
            ) : <EmptyState title="Market value unavailable" hint="No valuation data was returned for this VIN." />}
          </ReportSection>

          {/* ══ 15. VEHICLE USAGE ANALYSIS ════════════════════════════ */}
          <ReportSection id="usage" icon={Truck} title="Vehicle Usage Analysis" subtitle="Detected use type across its history">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
              {report.usage.map((u) => (
                <div key={u.label} className={`rounded-xl p-3 text-center ${u.active ? "bg-primary/10 dark:bg-primary-fixed/15" : "bg-surface-container-low dark:bg-slate-800/60"}`}>
                  <div className={`text-sm font-bold ${u.active ? "text-primary dark:text-primary-fixed" : "text-on-surface-variant dark:text-slate-400"}`}>{u.label}</div>
                  <div className="mt-1 text-[11px] text-on-surface-variant dark:text-slate-500">{u.active ? "Detected" : "Not detected"}</div>
                </div>
              ))}
            </div>
          </ReportSection>

          {/* ══ 16. RISK ANALYSIS ═════════════════════════════════════ */}
          <ReportSection id="risk" icon={ShieldAlert} title="Vehicle Risk Analysis" subtitle="Weighted scorecards across key risk factors">
            <div className="grid gap-3 sm:grid-cols-2">
              {report.risk.criteria.map((c) => (
                <div key={c.name} className="rounded-xl bg-surface-container-low dark:bg-slate-800/60 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-on-surface dark:text-slate-100">{c.name}</span>
                    <Badge tone={c.level === "good" ? "good" : c.level === "fair" ? "warning" : "critical"}>{c.label}</Badge>
                  </div>
                  <div className="my-2"><RiskMeter value={c.value} /></div>
                  <div className="flex items-center justify-between text-xs text-on-surface-variant dark:text-slate-400">
                    <span>{c.condition}</span>
                    <span>weight {Math.round(c.weight * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
            {report.risk.criteria.length === 0 && <EmptyState title="Risk analysis unavailable" />}
          </ReportSection>

          {/* ══ 17. TIMELINE ══════════════════════════════════════════ */}
          <ReportSection id="timeline" icon={History} title="Vehicle Timeline" subtitle="Chronological record of every reported event" count={report.timeline.length}>
            {report.timeline.length ? (
              <ol className="relative ml-2 space-y-4 border-l-2 border-outline-variant/50 dark:border-white/10 pl-5">
                {report.timeline.map((e, i) => {
                  const tone = e.type === "salvage" ? "critical" : e.type === "recall" ? "warning" : "info";
                  const dot = tone === "critical" ? "bg-red-500" : tone === "warning" ? "bg-amber-500" : "bg-primary dark:bg-primary-fixed";
                  return (
                    <li key={i} className="relative">
                      <span className={`absolute -left-[27px] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-white dark:ring-slate-900 ${dot}`} />
                      {/* Title + date use inline flow (not flex) so the PDF/print
                          capture re-wraps text without the flex line-box height
                          miscalculation that overlapped the detail line below. */}
                      <p className="text-sm font-bold leading-snug text-on-surface dark:text-slate-100">
                        {e.title}
                        <span className="ml-2 align-baseline text-xs font-normal text-on-surface-variant dark:text-slate-400">
                          {fmtDate(e.date)}
                        </span>
                      </p>
                      <p className="mt-0.5 text-sm leading-snug text-on-surface-variant dark:text-slate-300">{e.detail}</p>
                    </li>
                  );
                })}
              </ol>
            ) : <EmptyState title="No timeline events" />}
          </ReportSection>

          {/* ══ 18. PHOTOS ════════════════════════════════════════════ */}
          <ReportSection id="photos" icon={Camera} title="Vehicle Photos" subtitle="Manufacturer, auction & historical imagery" count={report.photos.length}>
            {report.photos.length ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {report.photos.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setLightbox(i)}
                    className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-xl bg-surface-container outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={`View photo ${i + 1} of ${report.photos.length}`}
                  >
                    <Image src={p.url} alt={p.alt} fill className="object-cover transition group-hover:scale-105" unoptimized />
                    <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold capitalize text-white">{p.type}</span>
                  </button>
                ))}
              </div>
            ) : <EmptyState title="No photos on file" hint="No manufacturer or auction images were available for this VIN." />}
          </ReportSection>

          {/* ══ 19. REPORT SUMMARY ════════════════════════════════════ */}
          <ReportSection id="summary" icon={ListChecks} title="Report Summary" subtitle="What buyers should know & recommended next steps" defaultOpen>
            <div className="space-y-2.5">
              {report.summary.map((s, i) => {
                const cfg = {
                  ok: { icon: CheckCircle2, ring: "border-green-200 bg-green-50/60 dark:border-green-500/30 dark:bg-green-500/10", text: "text-green-800 dark:text-green-200", ic: "text-green-600 dark:text-green-400" },
                  warning: { icon: AlertTriangle, ring: "border-amber-200 bg-amber-50/60 dark:border-amber-500/30 dark:bg-amber-500/10", text: "text-amber-800 dark:text-amber-200", ic: "text-amber-600 dark:text-amber-400" },
                  critical: { icon: XCircle, ring: "border-red-200 bg-red-50/60 dark:border-red-500/30 dark:bg-red-500/10", text: "text-red-800 dark:text-red-200", ic: "text-red-600 dark:text-red-400" },
                }[s.level];
                const Ic = cfg.icon;
                return (
                  <div key={i} className={`flex items-start gap-3 rounded-xl border p-3.5 ${cfg.ring}`}>
                    <Ic className={`mt-0.5 h-5 w-5 flex-shrink-0 ${cfg.ic}`} />
                    <p className={`text-sm font-medium ${cfg.text}`}>{s.text}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-xl bg-primary/5 dark:bg-primary-fixed/10 p-4">
              <h3 className="flex items-center gap-1.5 text-sm font-bold text-primary dark:text-primary-fixed"><ClipboardCheck className="h-4 w-4" /> Recommended next steps</h3>
              <ul className="mt-2 space-y-1 text-sm text-on-surface-variant dark:text-slate-300">
                <li>• Have any branded-title or salvage record independently verified before purchase.</li>
                <li>• Confirm all open recalls have been completed at a franchised dealer.</li>
                <li>• Get a pre-purchase inspection by a qualified mechanic.</li>
                <li>• Cross-check the asking price against the market values shown above.</li>
              </ul>
            </div>
          </ReportSection>

          {/* ══ 20. FOOTER DISCLAIMER ═════════════════════════════════ */}
          <footer className="rounded-2xl bg-surface-container-low dark:bg-slate-900 p-5 text-xs leading-relaxed text-on-surface-variant dark:text-slate-400">
            <div className="mb-2 flex items-center gap-2 font-bold text-on-surface dark:text-slate-200">
              <FileText className="h-4 w-4" /> Data sources & disclaimer
            </div>
            <p>
              This vehicle history report is compiled from NMVTIS (National Motor Vehicle Title Information System),
              participating state DMVs, NHTSA, Black Book valuations and ClearVin data partners. CarCheckerVIN re-presents
              this data unaltered; values shown reflect the records returned for VIN <span className="font-mono">{v.vin}</span>.
            </p>
            <p className="mt-2">
              A vehicle history report is not a substitute for an independent inspection. Records may be incomplete where a
              state, insurer or repair facility did not report an event. CarCheckerVIN makes no warranty regarding completeness
              or accuracy and is not liable for decisions made based on this report.
            </p>
            <p className="mt-2 text-on-surface-variant/70 dark:text-slate-500">
              Report ID {meta.reportId || "—"} · Generated {new Date(meta.generatedAt).toLocaleString("en-US")} · © {new Date().getFullYear()} CarCheckerVIN.com
            </p>
          </footer>
            </div>
          </div>
        </div>
      </div>

      {/* ── Photo lightbox ────────────────────────────────────────────
         Full-screen viewer opened by clicking any photo. Click the backdrop
         or the ✕ to close; arrows (on-screen or keyboard) step through every
         photo. Hidden from print/PDF. */}
      {lightbox !== null && report.photos[lightbox] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 print:hidden"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Vehicle photo viewer"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          {photoCount > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? i : (i - 1 + photoCount) % photoCount)); }}
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? i : (i + 1) % photoCount)); }}
                aria-label="Next photo"
                className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="relative flex max-h-[88vh] w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[78vh] w-full">
              <Image
                src={report.photos[lightbox].url}
                alt={report.photos[lightbox].alt}
                fill
                className="object-contain"
                sizes="100vw"
                unoptimized
              />
            </div>
            <div className="mt-3 flex items-center gap-3 text-sm font-medium text-white/80">
              <span className="rounded-full bg-white/10 px-3 py-1 capitalize">
                {report.photos[lightbox].type}
              </span>
              <span>{lightbox + 1} / {photoCount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
