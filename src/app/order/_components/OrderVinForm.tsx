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

  const fetchPreview = useCallback(
    async (rawVin: string) => {
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
    },
    []
  );

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
          vehicleLabel: [preview.year, preview.make, preview.model].filter(Boolean).join(" "),
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

  return (
    <div className="space-y-6">
      {/* VIN entry */}
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

      {/* Preview error */}
      {previewError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800 flex items-start gap-2">
          <TriangleAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{previewError}</span>
        </div>
      )}

      {/* Preview result */}
      {preview && (
        <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl overflow-hidden shadow-xl shadow-primary/5">
          {/* Vehicle header */}
          <div className="bg-surface-container/50 border-b border-outline-variant/40 px-5 sm:px-7 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.16em] font-bold">
                  Vehicle Identified
                </p>
                <h2 className="text-xl sm:text-2xl font-headline font-extrabold text-primary mt-1 tracking-tight">
                  {[preview.year, preview.make, preview.model, preview.trim]
                    .filter(Boolean)
                    .join(" ") || "Unknown vehicle"}
                </h2>
                <p className="text-xs font-mono text-outline mt-0.5">{preview.vin}</p>
              </div>
              {preview.hasMajorIssues ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-bold">
                  <OctagonAlert className="w-3.5 h-3.5" />
                  Issues Detected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-bold">
                  <CircleCheck className="w-3.5 h-3.5" />
                  No Red Flags
                </span>
              )}
            </div>
            {/* Spec chips */}
            <div className="flex flex-wrap gap-2 mt-4 text-xs text-on-surface">
              {preview.bodyType && <SpecChip icon={Car}>{preview.bodyType}</SpecChip>}
              {preview.engine && <SpecChip icon={Wrench}>{preview.engine}</SpecChip>}
              {preview.transmission && <SpecChip icon={Gauge}>{preview.transmission}</SpecChip>}
              {preview.drivetrain && <SpecChip icon={ShieldCheck}>{preview.drivetrain}</SpecChip>}
              {preview.fuelType && <SpecChip icon={Wrench}>{preview.fuelType}</SpecChip>}
            </div>
          </div>

          {/* Record counts (the "tease" — drives the purchase) */}
          <div className="px-5 sm:px-7 py-5 border-b border-outline-variant/40">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.16em] mb-3">
              What the full report includes
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <RecordRow
                label="Accident records"
                count={preview.recordCounts.accidents}
                alert={preview.recordCounts.accidents > 0}
              />
              <RecordRow
                label="Title brands"
                count={preview.recordCounts.titleBrands}
                alert={preview.recordCounts.titleBrands > 0}
              />
              <RecordRow label="Past owners" count={preview.recordCounts.owners} />
              <RecordRow
                label="Open recalls"
                count={preview.recordCounts.recalls}
                alert={preview.recordCounts.recalls > 0}
              />
              <RecordRow
                label="Odometer readings"
                count={preview.recordCounts.odometerReadings}
              />
              <RecordRow
                label="Service records"
                count={preview.recordCounts.serviceRecords}
              />
            </div>
          </div>

          {/* Buy section */}
          <div className="px-5 sm:px-7 py-6 bg-surface-container/50">
            <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.16em] mb-1.5">
              Email for receipt &amp; report
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none mb-3 bg-white"
            />

            <button
              onClick={handleBuy}
              disabled={submitting}
              className="w-full bg-gradient-to-r from-primary to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition shadow-xl shadow-primary/25"
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
                </>
              )}
            </button>

            {/* NMVTIS DISCLAIMER — placement required by ClearVin (matches their
                official integration spec). Must sit directly below the order
                button on every page of the checkout flow. */}
            <p className="mt-3 text-[11px] text-on-surface-variant leading-relaxed text-center">
              By clicking <strong>Order Full Report</strong> you agree to our{" "}
              <Link href="/terms" className="underline text-primary hover:text-primary-700 font-semibold">
                Terms &amp; Conditions
              </Link>{" "}
              and the{" "}
              <Link href="/disclaimer" className="underline text-primary hover:text-primary-700 font-semibold">
                NMVTIS disclaimer
              </Link>
              .
            </p>

            {mockMode && (
              <p className="mt-3 text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-center">
                ⚠ Sample mode — Stripe credentials not yet configured. &ldquo;Order&rdquo; will skip
                payment and land directly on the success page so the flow can be reviewed end-to-end.
              </p>
            )}

            {/* Trust strip */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4 text-[11px] text-on-surface-variant">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" /> 256-bit SSL
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> NMVTIS-certified data
              </span>
              <span className="flex items-center gap-1">
                <CircleCheck className="w-3 h-3" /> 100% refund if no data
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SpecChip({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-outline-variant/60 font-medium text-on-surface-variant">
      <Icon className="w-3 h-3 text-outline" />
      {children}
    </span>
  );
}

function RecordRow({
  label,
  count,
  alert,
}: {
  label: string;
  count: number;
  alert?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg px-3 py-2 border ${
        alert
          ? "bg-red-50 border-red-200"
          : "bg-white border-outline-variant/60"
      }`}
    >
      <span className="text-xs text-on-surface-variant">{label}</span>
      <span
        className={`text-sm font-bold ${
          alert ? "text-red-700" : count > 0 ? "text-primary" : "text-outline"
        }`}
      >
        {count > 0 ? count : "—"}
      </span>
    </div>
  );
}
