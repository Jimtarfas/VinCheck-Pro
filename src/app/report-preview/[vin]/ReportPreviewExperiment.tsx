"use client";

import { useEffect, useState, type ComponentType } from "react";
import {
  BadgePercent, Check, Copy, X, FileCheck2, Gauge, CarFront,
  ShieldAlert, CalendarClock, ClipboardList, Download, Share2,
  Printer, KeyRound, Power, MapPin, DollarSign,
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

/* ───────────────────────────────────────────────────────────────────────────
   Report-preview coupon popup — client surface
   ---------------------------------------------------------------------------
   Shown to every visitor of the report-preview page, independent of the
   A/B/C/D bucket the proxy assigns for the server-rendered report variants
   (blur / swap / nophoto). Five seconds after the visitor first scrolls, a
   VIN10 (10% off) popup appears, styled to match the site.

   The popup pairs our offer (right) with a faithful preview of a real purchased
   report (left) — built from the public example VIN (2018 Jeep Grand Cherokee,
   1C4RJEAG0JC168184) with its actual auction/damage photos, so the visitor sees
   exactly the kind of history they'd unlock.
   ─────────────────────────────────────────────────────────────────────────── */

const COUPON_CODE = "VIN10";
/* Reveal the coupon 5s after the visitor first scrolls the report — a short
   pause to signal engagement, without gating on a specific scroll depth. */
const POPUP_DELAY_MS = 5000;

/* ── Left panel: a faithful preview of the real purchased report ─────────────
   A full-fidelity reproduction of the actual report document the visitor
   unlocks — the same four sections, in the same order, that appear on the
   live report page: the report header (share / download + decoded specs),
   Vehicle Summary, Accident Records, and Auction History (hero + photo grid
   + the runs-and-drives / sold-on-approval status row). Built from the public
   example VIN (2018 Jeep Grand Cherokee Laredo, 1C4RJEAG0JC168184) with its
   real auction photos. Purely presentational — aria-hidden so assistive tech
   jumps straight to the offer on the right.

   On desktop the whole document reads top-to-bottom beside the offer. On the
   mobile teaser (capped height) the photo-rich Auction History card leads
   (order-first) so the most persuasive proof — the damage photos — is what
   shows above the fold. */

const SPEC_COLS: [string, string][] = [
  ["Year", "2018"],
  ["Make", "Jeep"],
  ["Model", "Grand Cherokee"],
  ["Trim", "Laredo"],
  ["Engine", "3.6L V6"],
  ["Drive", "4WD"],
];

const SUMMARY_TILES = [
  { icon: ClipboardList, label: "Title Brand", note: "Branded title", bad: true },
  { icon: Gauge, label: "Odometer", note: "No discrepancy", bad: false },
  { icon: CarFront, label: "Accidents", note: "3 reported", bad: true },
  { icon: ShieldAlert, label: "Damage", note: "2 records", bad: true },
  { icon: CalendarClock, label: "Events", note: "1 event", bad: true },
];

const GRID_PHOTOS = ["jeep-1", "jeep-3", "jeep-4", "jeep-5", "jeep-6", "jeep-1", "jeep-3", "jeep-4"];

function SectionHeader({
  icon: Icon,
  title,
  sub,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center justify-between bg-primary px-3 py-1.5 max-lg:pr-12">
      <span className="flex items-center gap-1.5 text-[9px] font-headline font-bold text-white">
        <Icon className="w-3 h-3" /> {title}
      </span>
      <span className="text-[8px] font-semibold text-secondary-container">{sub}</span>
    </div>
  );
}

function ReportScreens() {
  return (
    <div
      aria-hidden
      className="relative h-full min-h-[220px] overflow-hidden bg-surface-container px-3 pt-4 pb-0 lg:px-4 lg:pt-5"
    >
      <div className="relative flex flex-col gap-2.5">
        {/* Label — always tops the preview (order-first) so the visitor reads
            it as a sample of a purchased report, not their own live report. */}
        <div className="order-first flex justify-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-primary ring-1 ring-primary/15">
            <FileCheck2 className="h-2.5 w-2.5" /> Example of a purchased report
          </span>
        </div>

        {/* ── Section 1: report header ────────────────────────── */}
        <div className="rounded-xl bg-white shadow-lg shadow-primary/5 ring-1 ring-black/5 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-primary">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span className="text-[10px] font-headline font-bold">Vehicle History Report</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="flex h-4 w-4 items-center justify-center rounded-md bg-surface-container-low text-outline">
                <Share2 className="h-2 w-2" />
              </span>
              <span className="flex h-4 w-4 items-center justify-center rounded-md bg-surface-container-low text-outline">
                <Printer className="h-2 w-2" />
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-primary px-1.5 py-0.5 text-[7px] font-bold text-white">
                <Download className="w-2 h-2" /> Download Report
              </span>
            </div>
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container ring-1 ring-black/5">
              <BrandLogo make="Jeep" className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-[11px] font-headline font-extrabold uppercase tracking-tight text-on-surface">
                2018 Jeep Grand Cherokee Laredo
              </div>
              <div className="font-mono text-[8px] tracking-wider text-outline">
                VIN: 1C4RJEAG0JC168184
              </div>
            </div>
          </div>
          <div className="mt-2.5 grid grid-cols-6 divide-x divide-outline-variant rounded-md bg-surface-container-low">
            {SPEC_COLS.map(([k, v]) => (
              <div key={k} className="px-1.5 py-1">
                <div className="text-[5.5px] font-semibold uppercase tracking-wide text-outline">{k}</div>
                <div className="mt-0.5 truncate text-[7px] font-bold text-on-surface">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 2: vehicle summary ──────────────────────── */}
        <div className="rounded-xl bg-white shadow-lg shadow-primary/5 ring-1 ring-black/5 overflow-hidden">
          <SectionHeader icon={ClipboardList} title="Vehicle Summary" sub="5 records found" />
          <div className="grid grid-cols-5 gap-1 p-2">
            {SUMMARY_TILES.map(({ icon: Icon, label, note, bad }) => (
              <div key={label} className="flex flex-col items-center rounded-lg bg-surface-container-low px-1 py-1.5 text-center">
                <Icon className={`mb-0.5 h-3 w-3 ${bad ? "text-red-500" : "text-emerald-600"}`} />
                <div className="text-[6.5px] font-bold leading-tight text-on-surface">{label}</div>
                <div className={`mt-0.5 text-[6px] leading-tight ${bad ? "text-red-500" : "text-emerald-600"}`}>{note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 3: accident records ─────────────────────── */}
        <div className="rounded-xl bg-white shadow-lg shadow-primary/5 ring-1 ring-black/5 overflow-hidden">
          <SectionHeader icon={ShieldAlert} title="Accident Records" sub="3 accidents" />
          <div className="p-2">
            <div className="flex items-start gap-2 rounded-lg border-l-2 border-red-400 bg-red-50 px-2 py-1.5">
              <ShieldAlert className="mt-0.5 h-3 w-3 flex-shrink-0 text-red-500" />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-bold text-on-surface">Moderate damage reported</span>
                  <span className="rounded bg-red-100 px-1 text-[6px] font-bold text-red-600">Airbags deployed</span>
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-[6.5px] text-outline">
                  <span className="flex items-center gap-0.5"><CalendarClock className="h-2 w-2" /> Mar 2022</span>
                  <span className="flex items-center gap-0.5"><MapPin className="h-2 w-2" /> Front-end impact</span>
                </div>
                <p className="mt-0.5 text-[6.5px] leading-tight text-on-surface-variant">
                  Disabling damage recorded; vehicle towed from scene.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 4: auction history w/ real Jeep photos ─────
             Leads the stack on mobile (order-first) so the damage photos —
             the most compelling proof — are what shows in the capped teaser. */}
        <div className="order-first lg:order-none rounded-xl bg-white shadow-xl shadow-primary/10 ring-1 ring-black/5 overflow-hidden">
          <SectionHeader icon={CarFront} title="Auction History" sub="1 sale record" />
          <div className="p-2">
            {/* hero photo */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-surface-container">
              {/* eslint-disable-next-line @next/next/no-img-element -- small decorative marketing image */}
              <img src="/coupon/jeep-2.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <span className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[6.5px] font-bold text-white">
                Sold at Copart · Salvage
              </span>
            </div>
            {/* 3x3 thumbnail grid */}
            <div className="mt-1 grid grid-cols-3 gap-1">
              {GRID_PHOTOS.map((n, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded bg-surface-container">
                  {/* eslint-disable-next-line @next/next/no-img-element -- small decorative marketing image */}
                  <img src={`/coupon/${n}.jpg`} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  {i === GRID_PHOTOS.length - 1 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-[8px] font-bold text-white">
                      +14
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* condition badges */}
            <div className="mt-1.5 grid grid-cols-3 gap-1">
              {[
                { icon: Check, label: "Runs & Drives" },
                { icon: Power, label: "Engine Starts" },
                { icon: KeyRound, label: "Has Keys" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center justify-center gap-1 rounded bg-emerald-50 px-1 py-1 text-[6.5px] font-bold text-emerald-700">
                  <Icon className="h-2.5 w-2.5" /> {label}
                </span>
              ))}
            </div>
            {/* status / value row */}
            <div className="mt-1 grid grid-cols-3 divide-x divide-outline-variant rounded-md bg-surface-container-low">
              <div className="px-1.5 py-1">
                <div className="text-[5.5px] font-semibold uppercase tracking-wide text-outline">Status</div>
                <div className="mt-0.5 text-[7px] font-bold text-primary">Sold on Approval!</div>
              </div>
              <div className="px-1.5 py-1">
                <div className="text-[5.5px] font-semibold uppercase tracking-wide text-outline">Sale Date</div>
                <div className="mt-0.5 text-[7px] font-bold text-on-surface">Apr 12, 2022</div>
              </div>
              <div className="px-1.5 py-1">
                <div className="flex items-center gap-0.5 text-[5.5px] font-semibold uppercase tracking-wide text-outline">
                  <DollarSign className="h-2 w-2" /> Est. Retail
                </div>
                <div className="mt-0.5 text-[7px] font-bold text-emerald-600">$10,686</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* fade the document out at the bottom so it reads as a longer report */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-surface-container to-transparent" />
    </div>
  );
}

export default function ReportPreviewExperiment() {
  const [showCoupon, setShowCoupon] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Reveal the popup 5 seconds after the visitor first scrolls the report.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      window.removeEventListener("scroll", onScroll);
      timer = setTimeout(() => setShowCoupon(true), POPUP_DELAY_MS);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the code is shown in full for manual copy */
    }
  };

  if (!showCoupon || dismissed) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rp-coupon-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close offer"
        onClick={() => setDismissed(true)}
        className="absolute inset-0 bg-on-surface/50 backdrop-blur-sm cursor-pointer"
      />

      {/* Card — scrolls internally on short viewports so nothing is ever clipped */}
      <div className="relative grid w-full max-w-4xl max-h-[92vh] overflow-y-auto overflow-x-hidden overscroll-contain rounded-3xl bg-surface-container-lowest shadow-2xl animate-rp-coupon lg:grid-cols-2">
        <button
          type="button"
          aria-label="Close offer"
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-on-surface shadow-lg ring-1 ring-black/10 backdrop-blur transition-colors hover:bg-white cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* ── LEFT: report-screens preview ─────────────────────── */}
        <div className="order-first max-h-[210px] lg:max-h-none">
          <ReportScreens />
        </div>

        {/* ── RIGHT: the offer (our copy + coupon code) ────────── */}
        <div className="flex flex-col justify-center px-5 py-6 sm:px-8 sm:py-9 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 self-center rounded-full bg-primary/8 border border-primary/20 px-3 py-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-primary lg:self-start">
            <BadgePercent className="w-3.5 h-3.5" /> Limited-time offer
          </div>

          <div className="mt-3 sm:mt-4 font-headline font-extrabold text-4xl sm:text-5xl leading-none text-primary">
            10% OFF
          </div>
          <p className="mt-1.5 text-sm text-on-surface-variant">
            your full vehicle history report
          </p>

          <h2
            id="rp-coupon-title"
            className="mt-4 sm:mt-5 font-headline font-extrabold text-base sm:text-lg text-on-surface"
          >
            Here&apos;s a little something to seal the deal
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-on-surface-variant">
            Apply this code at checkout and save 10% on your complete
            NMVTIS-backed report.
          </p>

          {/* Coupon code chip */}
          <button
            type="button"
            onClick={copyCode}
            className="group mt-4 sm:mt-5 flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-primary/40 bg-secondary-container/40 px-4 py-3 sm:py-3.5 cursor-pointer hover:border-primary/70 transition-colors"
            aria-label={`Copy coupon code ${COUPON_CODE}`}
          >
            <span className="font-headline font-black text-xl tracking-widest text-primary">
              {COUPON_CODE}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-on-surface-variant group-hover:text-primary transition-colors">
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy
                </>
              )}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="mt-4 w-full rounded-2xl bg-primary text-white px-6 py-3.5 font-headline font-extrabold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Continue to my report
          </button>

          <p className="mt-3 text-[11px] text-on-surface-variant">
            One-time use · Applied at checkout
          </p>
        </div>
      </div>
    </div>
  );
}
