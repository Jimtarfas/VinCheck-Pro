"use client";

import { useEffect, useState } from "react";
import { BadgePercent, Check, Copy, X } from "lucide-react";

/* ───────────────────────────────────────────────────────────────────────────
   Report-preview A/B test
   ---------------------------------------------------------------------------
   Splits visitors 50/50 into two persistent buckets to learn which nudge wins:

     • "coupon" → a scroll-triggered VIN10 (10% off) popup, site-styled.
     • "blur"   → the main hero photo is softly blurred (handled in CSS via the
                  `data-rp-ab="blur"` flag this component sets on <html>, which
                  targets the `.rp-ab-main-photo` class on the report image).

   The bucket is assigned once and stored in localStorage so a returning visitor
   always sees the same variant — a clean, consistent experiment per user.
   ─────────────────────────────────────────────────────────────────────────── */

type Variant = "coupon" | "blur";
const STORAGE_KEY = "rp_ab_variant";
const COUPON_CODE = "VIN10";
/* Reveal the coupon only once the visitor has engaged with the report. */
const SCROLL_TRIGGER_PX = 650;

function pickVariant(): Variant {
  return Math.random() < 0.5 ? "coupon" : "blur";
}

export default function ReportPreviewExperiment() {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [showCoupon, setShowCoupon] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Assign (or restore) the persistent 50/50 bucket on mount.
  useEffect(() => {
    let v: Variant;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "coupon" || stored === "blur") {
        v = stored;
      } else {
        v = pickVariant();
        localStorage.setItem(STORAGE_KEY, v);
      }
    } catch {
      v = pickVariant();
    }
    setVariant(v);
  }, []);

  // "blur" variant: flag the document so global CSS softens the main report photo.
  useEffect(() => {
    if (variant !== "blur") return;
    const el = document.documentElement;
    el.setAttribute("data-rp-ab", "blur");
    return () => el.removeAttribute("data-rp-ab");
  }, [variant]);

  // "coupon" variant: reveal the popup once the visitor scrolls into the report.
  useEffect(() => {
    if (variant !== "coupon") return;
    const onScroll = () => {
      if (window.scrollY > SCROLL_TRIGGER_PX) {
        setShowCoupon(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // In case the page is already scrolled (e.g. restored position).
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the code is shown in full for manual copy */
    }
  };

  if (variant !== "coupon" || !showCoupon || dismissed) return null;

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

      {/* Card */}
      <div className="relative w-full max-w-sm rounded-3xl bg-surface-container-lowest shadow-2xl overflow-hidden animate-rp-coupon">
        <button
          type="button"
          aria-label="Close offer"
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header band */}
        <div className="bg-primary text-white px-6 pt-8 pb-7 text-center relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-12 w-56 h-56 rounded-full bg-white/5 blur-2xl"
          />
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider mb-4">
            <BadgePercent className="w-3.5 h-3.5" /> Limited-time offer
          </div>
          <div className="font-headline font-extrabold text-5xl leading-none mb-1">
            10% OFF
          </div>
          <p className="text-sm text-white/80">your full vehicle history report</p>
        </div>

        {/* Body */}
        <div className="px-6 py-6 text-center">
          <h2
            id="rp-coupon-title"
            className="font-headline font-extrabold text-lg text-on-surface mb-1.5"
          >
            Here&apos;s a little something to seal the deal
          </h2>
          <p className="text-sm text-on-surface-variant mb-5">
            Apply this code at checkout and save 10% on your complete
            NMVTIS-backed report.
          </p>

          {/* Coupon code chip */}
          <button
            type="button"
            onClick={copyCode}
            className="group w-full flex items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-primary/40 bg-secondary-container/40 px-4 py-3.5 mb-4 cursor-pointer hover:border-primary/70 transition-colors"
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
            className="w-full rounded-2xl bg-primary text-white px-6 py-3.5 font-headline font-extrabold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Continue to my report
          </button>

          <p className="text-[11px] text-on-surface-variant mt-3">
            One-time use · Applied at checkout
          </p>
        </div>
      </div>
    </div>
  );
}
