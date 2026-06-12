"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  LoaderCircle,
  TriangleAlert,
  CircleCheck,
  Lock,
  ShieldCheck,
  FileText,
  EyeOff,
  Info,
  Mail,
  ArrowRight,
  Image as ImageIcon,
  Gavel,
  OctagonAlert,
} from "lucide-react";

// ── Type mirrors src/lib/clearvin.ts ─────────────────────────────────

interface ClearVinRecall {
  Make: string;
  Model: string;
  ModelYear: string;
  Component: string;
  Summary: string;
  Consequence: string;
  Remedy: string;
  Notes?: string;
  Manufacturer: string;
  ReportReceivedDate: string;
  NHTSACampaignNumber: string;
}

interface PreviewData {
  vin: string;
  previewImageURL: string | null;
  imagesAmount: number;
  auctionHistoryRecords: number;
  recalls: ClearVinRecall[];
  vinSpec: {
    vin: string;
    year: string | null;
    make: string | null;
    model: string | null;
    trim: string | null;
    engine: string | null;
    madeIn: string | null;
    style: string | null;
    msrp: string | null;
    invoice: string | null;
  };
  hasMajorIssues: boolean;
}

interface Props {
  /** Price in cents (e.g. 1499 = $14.99). Comes from the server. */
  priceCents: number;
  /** When true, payment is bypassed and we land on /order/success?mock=1. */
  mockMode: boolean;
}

export default function OrderVinForm({ priceCents, mockMode }: Props) {
  const router = useRouter();
  const search = useSearchParams();

  const [vin, setVin] = useState("");
  const [vinError, setVinError] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  // `buyError` is shown right next to the order button so the user can't
  // miss it (e.g. missing email). `previewError` lives further up the
  // card and would be off-screen by the time the user clicks "Order".
  const [buyError, setBuyError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Minimal RFC-5322-ish check — good enough to catch typos client-side
  // before we waste a roundtrip to /api/order/checkout.
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const fetchPreview = useCallback(async (rawVin: string) => {
    setLoadingPreview(true);
    setPreviewError(null);
    setPreview(null);
    try {
      const res = await fetch(`/api/order/preview/${encodeURIComponent(rawVin)}`);
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setPreviewError(json.message || "Could not fetch a preview for this VIN.");
      } else {
        setPreview(json.data);
      }
    } catch {
      setPreviewError("Network error — please try again.");
    } finally {
      setLoadingPreview(false);
    }
  }, []);

  // Pre-fill the VIN from `?vin=` (a cancelled/failed checkout returns the buyer
  // here with ?vin=...&cancelled=1) and immediately re-render its free preview,
  // so they land back on the preview of the VIN they entered rather than an
  // empty form. Runs once on mount.
  const autofilledFromQuery = useRef(false);
  useEffect(() => {
    if (autofilledFromQuery.current) return;
    const raw = search.get("vin");
    if (!raw) return;
    autofilledFromQuery.current = true;
    const v = raw.trim().toUpperCase();
    setVin(v);
    if (v.length === 17 && !/[IOQ]/.test(v)) void fetchPreview(v);
  }, [search, fetchPreview]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = vin.trim().toUpperCase();
    if (cleaned.length !== 17) {
      setVinError("A valid VIN is exactly 17 characters.");
      return;
    }
    if (/[IOQ]/.test(cleaned)) {
      setVinError("VINs cannot contain the letters I, O, or Q.");
      return;
    }
    setVinError(null);
    setVin(cleaned);
    void fetchPreview(cleaned);
  }

  async function handleBuy() {
    if (!preview) return;
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setBuyError("Please enter your email so we can deliver your report.");
      document.querySelector<HTMLInputElement>('input[type="email"]')?.focus();
      return;
    }
    if (!EMAIL_RE.test(trimmedEmail)) {
      setBuyError("That doesn't look like a valid email address.");
      document.querySelector<HTMLInputElement>('input[type="email"]')?.focus();
      return;
    }

    setBuyError(null);
    setSubmitting(true);
    try {
      const vehicleLabel = [
        preview.vinSpec.year,
        preview.vinSpec.make,
        preview.vinSpec.model,
      ]
        .filter(Boolean)
        .join(" ");
      const res = await fetch("/api/order/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vin: preview.vin,
          email: trimmedEmail,
          vehicleLabel,
          // Return a cancelled/failed payment to this page WITH the VIN in the
          // query string so it re-renders the preview of the VIN they entered
          // rather than an empty form.
          returnTo:
            typeof window !== "undefined"
              ? (() => {
                  const u = new URL(window.location.href);
                  u.searchParams.set("vin", preview.vin);
                  return u.toString();
                })()
              : undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) {
        throw new Error(json.error || "Could not start checkout.");
      }
      router.push(json.url);
    } catch (e) {
      setSubmitting(false);
      setBuyError(e instanceof Error ? e.message : "Checkout failed.");
    }
  }

  const priceLabel = `$${(priceCents / 100).toFixed(2)}`;
  const vehicleTitle =
    preview &&
    ([
      preview.vinSpec.year,
      preview.vinSpec.make,
      preview.vinSpec.model,
      preview.vinSpec.trim,
    ]
      .filter(Boolean)
      .join(" ") ||
      "Unknown vehicle");

  return (
    <div className="space-y-6">
      {/* ── VIN entry ─────────────────────────────────────────────── */}
      <form
        onSubmit={handleSearch}
        className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 sm:p-7 shadow-xl shadow-primary/5"
      >
        <label className="block text-sm font-bold text-on-surface mb-2">
          Enter the 17-character VIN
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input
              type="text"
              value={vin}
              onChange={(e) => {
                setVin(e.target.value.toUpperCase());
                if (vinError) setVinError(null);
                if (preview) setPreview(null);
              }}
              maxLength={17}
              placeholder="e.g. 1HGBH41JXMN109186"
              className="w-full pl-9 pr-3 py-2.5 text-base sm:text-sm font-mono tracking-wider rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none uppercase bg-white"
            />
          </div>
          <button
            type="submit"
            disabled={loadingPreview || !vin}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold inline-flex items-center justify-center gap-2 transition"
          >
            {loadingPreview ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Loading…
              </>
            ) : (
              "Get Free Preview"
            )}
          </button>
        </div>
        {vinError && (
          <p className="mt-2 text-xs text-red-600 flex items-center gap-1.5">
            <TriangleAlert className="w-3.5 h-3.5" />
            {vinError}
          </p>
        )}
        <p className="mt-3 text-[11px] text-on-surface-variant flex items-center gap-1.5">
          <Lock className="w-3 h-3" />
          Free preview · No card required to see the basics
        </p>
      </form>

      {/* ── Preview error ────────────────────────────────────────── */}
      {previewError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800 flex items-start gap-2">
          <TriangleAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{previewError}</span>
        </div>
      )}

      {/* ── Preview result ───────────────────────────────────────── */}
      {preview && (
        <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
          {/* Hero header — vehicle identity + photo */}
          <div className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-800 text-white overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "16px 16px",
              }}
            />
            <div className="relative grid sm:grid-cols-[1fr_220px] gap-0">
              {/* Identity */}
              <div className="px-6 sm:px-8 py-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-[0.16em]">
                    <EyeOff className="w-3 h-3" />
                    Free Preview
                  </span>
                  {preview.hasMajorIssues ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/25 border border-red-300/40 text-white text-[11px] font-bold">
                      <OctagonAlert className="w-3.5 h-3.5" />
                      Records Found
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/25 border border-green-300/40 text-white text-[11px] font-bold">
                      <CircleCheck className="w-3.5 h-3.5" />
                      Clean Preview
                    </span>
                  )}
                </div>

                <p className="text-[10px] uppercase font-bold tracking-[0.18em] text-white/60">
                  Vehicle Identified
                </p>
                <h2 className="text-2xl sm:text-3xl font-headline font-extrabold mt-1 tracking-tight">
                  {vehicleTitle}
                </h2>
                <p className="text-xs font-mono text-white/70 mt-1">
                  {preview.vin}
                </p>

                {/* Spec chips — only show fields ClearVin actually returned */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {preview.vinSpec.style && (
                    <SpecChipDark>{preview.vinSpec.style}</SpecChipDark>
                  )}
                  {preview.vinSpec.engine && (
                    <SpecChipDark>{preview.vinSpec.engine}</SpecChipDark>
                  )}
                  {preview.vinSpec.madeIn && (
                    <SpecChipDark>Made in {preview.vinSpec.madeIn}</SpecChipDark>
                  )}
                  {preview.vinSpec.msrp && (
                    <SpecChipDark>MSRP {preview.vinSpec.msrp}</SpecChipDark>
                  )}
                </div>
              </div>

              {/* Auction photo — provided by ClearVin */}
              {preview.previewImageURL && (
                <div className="relative h-40 sm:h-auto sm:min-h-[180px] bg-black/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview.previewImageURL}
                    alt={vehicleTitle || preview.vin}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {preview.imagesAmount > 1 && (
                    <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur text-white text-[11px] font-bold">
                      <ImageIcon className="w-3 h-3" />
                      {preview.imagesAmount} photos
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── At-a-glance numbers ── */}
          <div className="px-6 sm:px-8 py-5 bg-surface-container-lowest border-b border-outline-variant/40">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.16em] mb-3">
              Records ClearVin already has on this VIN
            </p>
            <div className="grid grid-cols-3 gap-3">
              <PreviewStat
                label="Open recalls"
                count={preview.recalls.length}
                alert={preview.recalls.length > 0}
              />
              <PreviewStat
                label="Auction history"
                count={preview.auctionHistoryRecords}
                alert={preview.auctionHistoryRecords > 0}
              />
              <PreviewStat
                label="Photos on file"
                count={preview.imagesAmount}
              />
            </div>

            {/* Honest copy — explain what the full report adds */}
            <div className="mt-4 grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
              {[
                "Full title brand history & all recorded states",
                "Reported accident records with severity",
                "Every odometer reading from DMV transfers",
                "Past owners & registration transfers",
                "Service & maintenance records",
                "Theft / total-loss / lemon flags",
              ].map((b) => (
                <p
                  key={b}
                  className="flex items-start gap-2 text-[12px] text-on-surface-variant leading-snug"
                >
                  <CircleCheck className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                  {b}
                </p>
              ))}
            </div>
          </div>

          {/* ── Recalls (ClearVin returns full detail in preview) ── */}
          {preview.recalls.length > 0 && (
            <div className="px-6 sm:px-8 py-5 border-b border-outline-variant/40">
              <div className="flex items-center gap-2 mb-3">
                <OctagonAlert className="w-4 h-4 text-amber-700" />
                <p className="text-sm font-bold text-on-surface">
                  Active safety recalls ({preview.recalls.length})
                </p>
              </div>
              <div className="space-y-2">
                {preview.recalls.slice(0, 3).map((r) => (
                  <div
                    key={r.NHTSACampaignNumber}
                    className="border border-amber-200 bg-amber-50 rounded-xl px-3 py-2.5 text-[12px]"
                  >
                    <p className="font-bold text-amber-900">
                      {r.Component}{" "}
                      <span className="font-mono text-[11px] text-amber-700">
                        · {r.NHTSACampaignNumber}
                      </span>
                    </p>
                    <p className="text-amber-900 mt-1 line-clamp-2">
                      {r.Summary}
                    </p>
                  </div>
                ))}
                {preview.recalls.length > 3 && (
                  <p className="text-[11px] text-on-surface-variant text-center pt-1">
                    + {preview.recalls.length - 3} more in the full report
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── Auction-history teaser ── */}
          {preview.auctionHistoryRecords > 0 && (
            <div className="px-6 sm:px-8 py-4 border-b border-outline-variant/40 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                <Gavel className="w-4 h-4 text-primary" />
              </div>
              <p className="text-[12px] text-on-surface-variant">
                <strong className="text-on-surface">
                  {preview.auctionHistoryRecords} auction-history record
                  {preview.auctionHistoryRecords === 1 ? "" : "s"}
                </strong>{" "}
                on file — unlocked with the full report.
              </p>
            </div>
          )}

          {/* ── Buy section ──────────────────────────────────────── */}
          <div className="px-6 sm:px-8 py-6 bg-surface-container/40 border-t border-outline-variant/40">
            {/* Price summary */}
            <div className="flex items-end justify-between mb-5 pb-5 border-b border-outline-variant/40">
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.16em]">
                  Vehicle History Report
                </p>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  One-time payment · Instant delivery
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl sm:text-3xl price font-extrabold text-primary leading-none">
                  {priceLabel}
                </p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">
                  USD
                </p>
              </div>
            </div>

            {/* Email */}
            <label
              htmlFor="order-email"
              className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.16em] mb-1.5"
            >
              Email for receipt &amp; report
            </label>
            <div className="relative mb-3">
              <Mail
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  buyError ? "text-red-500" : "text-outline"
                }`}
              />
              <input
                id="order-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (buyError) setBuyError(null);
                }}
                placeholder="you@example.com"
                required
                aria-invalid={buyError ? "true" : "false"}
                aria-describedby={buyError ? "order-buy-error" : undefined}
                className={`w-full pl-9 pr-3 py-2.5 text-base sm:text-sm rounded-xl border outline-none bg-white transition ${
                  buyError
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/15"
                }`}
              />
            </div>

            {buyError && (
              <div
                id="order-buy-error"
                role="alert"
                className="mb-3 flex items-start gap-2 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-[12px] text-red-800 leading-snug"
              >
                <TriangleAlert className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                <span>{buyError}</span>
              </div>
            )}

            {/* Buy button */}
            <button
              onClick={handleBuy}
              disabled={submitting}
              className="w-full bg-gradient-to-r from-primary to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30"
            >
              {submitting ? (
                <>
                  <LoaderCircle className="w-5 h-5 animate-spin" />
                  Redirecting to checkout…
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  Order Full Report — {priceLabel}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Consent line — "CarCheckerVIN's T&C" and "NMVTIS
                disclaimer" are inline clickable links inside the
                sentence itself (not separate buttons). */}
            <div className="mt-3 px-3 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/40">
              <p className="text-[12px] text-on-surface-variant leading-relaxed text-center">
                By clicking{" "}
                <strong className="text-on-surface">Order Full Report</strong>{" "}
                you agree to{" "}
                <Link
                  href="/terms"
                  className="underline text-primary hover:text-primary-700 font-semibold"
                >
                  CarCheckerVIN&rsquo;s T&amp;C
                </Link>{" "}
                and{" "}
                <Link
                  href="/disclaimer"
                  className="underline text-primary hover:text-primary-700 font-semibold"
                >
                  NMVTIS disclaimer
                </Link>
                .
              </p>
            </div>

            {mockMode && (
              <div className="mt-3 px-3 py-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Sandbox mode</strong> — Stripe credentials are not
                  configured yet. Clicking &ldquo;Order&rdquo; will skip the
                  payment screen and load the success page directly so the
                  end-to-end flow is reviewable.
                </span>
              </div>
            )}

            {/* Trust strip */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4 pt-4 border-t border-outline-variant/40 text-[11px] text-on-surface-variant">
              <span className="inline-flex items-center gap-1">
                <Lock className="w-3 h-3 text-on-surface" />
                256-bit SSL
              </span>
              <span className="text-outline-variant">·</span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-on-surface" />
                NMVTIS-certified data
              </span>
              <span className="text-outline-variant">·</span>
              <span className="inline-flex items-center gap-1">
                <CircleCheck className="w-3 h-3 text-green-600" />
                100% refund if no data
              </span>
            </div>
          </div>

          {/* ── Data provider attribution (ClearVin compliance) ─── */}
          <div className="px-6 sm:px-8 py-3 bg-surface-container-low border-t border-outline-variant/40">
            <p className="text-[10px] text-on-surface-variant flex flex-wrap items-center justify-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-primary" />
              <span>
                Vehicle data sourced from{" "}
                <strong className="text-on-surface">ClearVin LLC</strong>, an
                approved NMVTIS Data Provider. Reports are rendered unmodified.
              </span>
            </p>
          </div>
        </div>
      )}

      {/* ── FEDERALLY-MANDATED NMVTIS DISCLOSURE ON CHECKOUT ───── */}
      <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl px-5 sm:px-6 py-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.16em]">
              Federally Mandated Disclosure
            </p>
            <p className="text-sm font-bold text-on-surface mt-0.5">
              NMVTIS Consumer Access Notice
            </p>
          </div>
        </div>

        <div className="space-y-3 text-[12px] text-on-surface-variant leading-relaxed">
          <p>
            The National Motor Vehicle Title Information System (NMVTIS) is an
            electronic system that contains information on certain automobiles
            titled in the United States. NMVTIS is intended to serve as a
            reliable source of title and brand history for automobiles, but it
            does not contain detailed information regarding the vehicle&rsquo;s
            repair history.
          </p>
          <p>
            All states, insurance carriers, and junk and salvage yards are
            required by federal law to report information to NMVTIS. However,
            NMVTIS data is supplied by current data providers, and the data
            for any vehicle may not be in the system if the data providers are
            not yet reporting.
          </p>
          <p>
            While NMVTIS is designed to protect consumers from fraud and
            unsafe vehicles, users should not solely rely on NMVTIS. NMVTIS
            data <strong>does not include</strong> event data on vehicles
            damaged prior to NMVTIS reporting requirements, collision damage
            that has not been reported by a participating insurance carrier,
            or damage to vehicles where insurance claims were not filed.
          </p>
          <p>
            <strong>
              Before purchasing a vehicle, in addition to obtaining a vehicle
              history report, consumers should:
            </strong>
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              Obtain an independent vehicle inspection by a qualified mechanic
              of their choosing.
            </li>
            <li>
              Verify that the vehicle identification number (VIN) on the
              vehicle matches the VIN on the title and any other vehicle
              documents.
            </li>
            <li>
              Examine the title to determine if there are any brands listed
              (e.g., flood, salvage, junk).
            </li>
          </ul>
          <p>
            For more information about NMVTIS, the data included in the system,
            and the definitions of the standard NMVTIS brands, please visit{" "}
            <a
              href="https://vehiclehistory.bja.ojp.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary hover:text-primary-700 font-semibold"
            >
              vehiclehistory.bja.ojp.gov
            </a>
            . For the full disclosure see the{" "}
            <Link
              href="/disclaimer"
              className="underline text-primary hover:text-primary-700 font-semibold"
            >
              NMVTIS Disclaimer page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Subcomponents ────────────────────────────────────────────────────

function SpecChipDark({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-medium text-white/95 backdrop-blur-sm">
      {children}
    </span>
  );
}

function PreviewStat({
  label,
  count,
  alert,
}: {
  label: string;
  count: number;
  alert?: boolean;
}) {
  const hasData = count > 0;
  return (
    <div
      className={`relative flex flex-col items-start justify-center rounded-xl px-3 py-3 border ${
        alert
          ? "bg-red-50/70 border-red-200"
          : hasData
          ? "bg-white border-outline-variant/60"
          : "bg-surface-container-low border-outline-variant/40"
      }`}
    >
      <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant leading-none">
        {label}
      </span>
      <span
        className={`text-xl font-headline font-extrabold leading-none mt-1.5 ${
          alert ? "text-red-700" : hasData ? "text-primary" : "text-outline"
        }`}
      >
        {hasData ? count : "0"}
      </span>
    </div>
  );
}
