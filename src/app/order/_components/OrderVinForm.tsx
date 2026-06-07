"use client";

import { useState, useCallback, useEffect } from "react";
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
  Car,
  Gauge,
  Wrench,
  OctagonAlert,
  BadgeCheck,
  EyeOff,
  Info,
  Globe,
  Mail,
  ArrowRight,
} from "lucide-react";

interface PreviewData {
  vin: string;
  year: number | null;
  make: string | null;
  model: string | null;
  trim: string | null;
  bodyType: string | null;
  engine: string | null;
  transmission: string | null;
  drivetrain: string | null;
  fuelType: string | null;
  madeIn: string | null;
  recordCounts: {
    accidents: number;
    titleBrands: number;
    owners: number;
    recalls: number;
    odometerReadings: number;
    serviceRecords: number;
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
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill VIN from `?vin=` query string (e.g. after a cancelled checkout)
  useEffect(() => {
    const v = search.get("vin");
    if (v && !vin) setVin(v.toUpperCase());
  }, [search, vin]);

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
    setSubmitting(true);
    try {
      const res = await fetch("/api/order/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vin: preview.vin,
          email: email.trim() || undefined,
          vehicleLabel: [preview.year, preview.make, preview.model]
            .filter(Boolean)
            .join(" "),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) {
        throw new Error(json.error || "Could not start checkout.");
      }
      router.push(json.url);
    } catch (e) {
      setSubmitting(false);
      setPreviewError(e instanceof Error ? e.message : "Checkout failed.");
    }
  }

  const priceLabel = `$${(priceCents / 100).toFixed(2)}`;
  const vehicleTitle =
    preview &&
    ([preview.year, preview.make, preview.model, preview.trim]
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
              className="w-full pl-9 pr-3 py-2.5 text-sm font-mono tracking-wider rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none uppercase bg-white"
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

      {/* ── Preview error ─────────────────────────────────────────── */}
      {previewError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800 flex items-start gap-2">
          <TriangleAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{previewError}</span>
        </div>
      )}

      {/* ── Preview result ────────────────────────────────────────── */}
      {preview && (
        <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
          {/* Hero header — vehicle identity */}
          <div className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-800 text-white px-6 sm:px-8 py-7 overflow-hidden">
            {/* subtle background pattern */}
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "16px 16px",
              }}
            />
            <div className="relative">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-[0.16em]">
                  <EyeOff className="w-3 h-3" />
                  Free Preview
                </span>
                {preview.hasMajorIssues ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/25 border border-red-300/40 text-white text-[11px] font-bold">
                    <OctagonAlert className="w-3.5 h-3.5" />
                    Issues Detected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/25 border border-green-300/40 text-white text-[11px] font-bold">
                    <CircleCheck className="w-3.5 h-3.5" />
                    No Red Flags
                  </span>
                )}
              </div>

              <p className="text-[10px] uppercase font-bold tracking-[0.18em] text-white/60">
                Vehicle Identified
              </p>
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold mt-1 tracking-tight">
                {vehicleTitle}
              </h2>
              <p className="text-xs font-mono text-white/70 mt-1">{preview.vin}</p>

              {/* Spec chips */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {preview.bodyType && (
                  <SpecChipDark icon={Car}>{preview.bodyType}</SpecChipDark>
                )}
                {preview.engine && (
                  <SpecChipDark icon={Wrench}>{preview.engine}</SpecChipDark>
                )}
                {preview.transmission && (
                  <SpecChipDark icon={Gauge}>{preview.transmission}</SpecChipDark>
                )}
                {preview.drivetrain && (
                  <SpecChipDark icon={ShieldCheck}>{preview.drivetrain}</SpecChipDark>
                )}
                {preview.fuelType && (
                  <SpecChipDark icon={Wrench}>{preview.fuelType}</SpecChipDark>
                )}
                {preview.madeIn && (
                  <SpecChipDark icon={Globe}>{preview.madeIn}</SpecChipDark>
                )}
              </div>
            </div>
          </div>

          {/* ── What we found (record counts) ─────────────────────── */}
          <div className="px-6 sm:px-8 py-6 bg-surface-container-lowest">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.16em]">
                  Records on file
                </p>
                <p className="text-sm font-bold text-on-surface mt-0.5">
                  Unlock the full detail with the paid report
                </p>
              </div>
              <BadgeCheck className="w-5 h-5 text-primary hidden sm:block" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <RecordTile
                label="Accident records"
                count={preview.recordCounts.accidents}
                alert={preview.recordCounts.accidents > 0}
              />
              <RecordTile
                label="Title brands"
                count={preview.recordCounts.titleBrands}
                alert={preview.recordCounts.titleBrands > 0}
              />
              <RecordTile
                label="Past owners"
                count={preview.recordCounts.owners}
              />
              <RecordTile
                label="Open recalls"
                count={preview.recordCounts.recalls}
                alert={preview.recordCounts.recalls > 0}
              />
              <RecordTile
                label="Odometer readings"
                count={preview.recordCounts.odometerReadings}
              />
              <RecordTile
                label="Service records"
                count={preview.recordCounts.serviceRecords}
              />
            </div>

            {/* What you get bullets — adds purchase clarity */}
            <div className="mt-5 grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
              {[
                "Every record above with dates, states & details",
                "NHTSA recall remedies & service history",
                "Odometer rollback detection",
                "Title brand history across all states",
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
                <p className="text-2xl sm:text-3xl font-headline font-extrabold text-primary leading-none">
                  {priceLabel}
                </p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">
                  USD
                </p>
              </div>
            </div>

            {/* Email */}
            <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.16em] mb-1.5">
              Email for receipt &amp; report
            </label>
            <div className="relative mb-3">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none bg-white"
              />
            </div>

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

            {/* ── NMVTIS DISCLAIMER — required by ClearVin spec ──
                 Must sit directly below the order button on every page
                 of the checkout flow. Wording mirrors ClearVin's own
                 checkout copy. */}
            <div className="mt-3 px-3 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/40">
              <p className="text-[11px] text-on-surface-variant leading-relaxed text-center">
                By clicking <strong className="text-on-surface">Order Full Report</strong>{" "}
                you acknowledge that this report is for your personal use only
                and you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline text-primary hover:text-primary-700 font-semibold"
                >
                  Terms &amp; Conditions
                </Link>{" "}
                and the federally-mandated{" "}
                <Link
                  href="/disclaimer"
                  className="underline text-primary hover:text-primary-700 font-semibold"
                >
                  NMVTIS Consumer Disclosure
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
              <BadgeCheck className="w-3 h-3 text-primary" />
              <span>
                Vehicle data sourced from{" "}
                <strong className="text-on-surface">ClearVin LLC</strong>, an
                approved NMVTIS Data Provider. Reports are rendered unmodified.
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Subcomponents ─────────────────────────────────────────────────────

function SpecChipDark({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-medium text-white/95 backdrop-blur-sm">
      <Icon className="w-3 h-3 text-white/70" />
      {children}
    </span>
  );
}

function RecordTile({
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
      className={`relative flex flex-col items-start justify-center rounded-xl px-3 py-3 border transition ${
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
          alert
            ? "text-red-700"
            : hasData
            ? "text-primary"
            : "text-outline"
        }`}
      >
        {hasData ? count : "0"}
      </span>
      {alert && (
        <span className="absolute top-1.5 right-1.5">
          <TriangleAlert className="w-3 h-3 text-red-500" />
        </span>
      )}
    </div>
  );
}
