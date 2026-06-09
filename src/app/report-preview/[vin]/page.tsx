import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Check,
  Lock,
  ShieldCheck,
  ShieldAlert,
  Camera,
  Gavel,
  Wrench,
  AlertTriangle,
  Gauge,
  Users,
  Car,
  DollarSign,
  ChevronRight,
  BadgeCheck,
  RefreshCw,
  Star,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { fetchPreview, isUsingMockData, type ClearVinPreview } from "@/lib/clearvin";
import MarketingCard from "./MarketingCard";

/* Small laurel-wreath flourish for the satisfaction-guarantee seal. */
function Laurel({ className = "" }: { className?: string }) {
  const leaves = Array.from({ length: 6 });
  return (
    <svg viewBox="0 0 40 56" className={className} fill="currentColor" aria-hidden>
      {[1, -1].map((dir) => (
        <g key={dir} transform={dir === -1 ? "translate(40,0) scale(-1,1)" : undefined}>
          {leaves.map((_, i) => {
            const t = i / 5;
            const x = 17 - t * 9;
            const y = 50 - t * 44;
            const rot = -55 + t * 28;
            return (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx="4.4"
                ry="2"
                transform={`rotate(${rot} ${x} ${y})`}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}

export const dynamic = "force-dynamic";

const SINGLE_PRICE = Number(process.env.NEXT_PUBLIC_REPORT_PRICE_CENTS || "1499") / 100;

interface Props {
  params: Promise<{ vin: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vin } = await params;
  return {
    title: `Vehicle History Preview — ${vin.toUpperCase()}`,
    description:
      "Preview the records on file for this VIN before you unlock the full vehicle history report.",
    robots: { index: false, follow: false },
  };
}

/* Status-tile model: which records exist, what's free vs locked. */
function buildTiles(p: ClearVinPreview) {
  return [
    {
      icon: Car,
      label: "Vehicle specs",
      count: null as number | null,
      state: "open" as const,
      note: "Year, make, model, trim, engine",
    },
    {
      icon: Camera,
      label: "Photos on file",
      count: p.imagesAmount,
      state: "locked" as const,
      note: "Auction & listing images",
    },
    {
      icon: Gavel,
      label: "Auction records",
      count: p.auctionHistoryRecords,
      state: "locked" as const,
      note: "Sale events & locations",
    },
    {
      icon: Wrench,
      label: "Damage records",
      count: p.damagesCount,
      state: "locked" as const,
      note: "Reported condition notes",
    },
    {
      icon: ShieldAlert,
      label: "Open recalls",
      count: p.recallsCount,
      state: "open" as const,
      note: "NHTSA safety recalls",
    },
    {
      icon: ShieldCheck,
      label: "Title brands",
      count: null,
      state: "locked" as const,
      note: "Salvage · flood · junk · lemon",
    },
    {
      icon: AlertTriangle,
      label: "Accident history",
      count: null,
      state: "locked" as const,
      note: "Reported collision events",
    },
    {
      icon: Gauge,
      label: "Odometer history",
      count: null,
      state: "locked" as const,
      note: "Rollback & mileage checks",
    },
    {
      icon: Users,
      label: "Ownership history",
      count: null,
      state: "locked" as const,
      note: "Owners & usage type",
    },
  ];
}

/* What the paid report includes — the "what $X buys" checklist. */
const INCLUDED = [
  "Full title history & brand checks (salvage, flood, junk, lemon)",
  "Reported accident & damage records",
  "Odometer readings & rollback detection",
  "Every auction record with sale price & location",
  "All photos on file for this VIN",
  "Ownership timeline & usage (personal, fleet, rental)",
  "Open safety recalls & NHTSA campaign details",
  "Theft & total-loss checks",
  "Downloadable PDF you can keep and share",
];

export default async function ReportPreviewPage({ params }: Props) {
  const { vin } = await params;
  const cleaned = vin.trim().toUpperCase();
  if (cleaned.length !== 17) notFound();

  const result = await fetchPreview(cleaned);
  const mock = isUsingMockData();

  if (!("ok" in result) || result.ok !== true) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 pt-24 bg-surface">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-headline font-extrabold text-primary mb-3">
            No preview for this VIN
          </h1>
          <p className="text-on-surface-variant mb-6">{result.message}</p>
          <Link
            href="/report-preview"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition"
          >
            Try another VIN <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const p = result.data;
  const s = p.vinSpec;
  const tiles = buildTiles(p);
  const vehicleTitle =
    [s.year, s.make, s.model, s.trim].filter(Boolean).join(" ") || cleaned;
  const issueCount =
    p.auctionHistoryRecords + p.damagesCount + p.recallsCount;
  const heroImg = p.previewImageURL;
  const lockedPhotos = Math.max(0, p.imagesAmount - 1);
  const orderHref = `/order?vin=${encodeURIComponent(cleaned)}`;
  const exampleHref = "#whats-inside";

  return (
    <article className="pb-24 bg-surface">
      {mock && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-800 text-xs sm:text-sm text-center py-2 px-4">
          Sample data — set <code className="font-mono">CLEARVIN_API_TOKEN</code> to load live records for this VIN.
        </div>
      )}

      {/* ── Identity hero ─────────────────────────────────── */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Report Preview" },
            ]}
            onDark
          />

          <div className="mt-6">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs font-bold mb-4">
              <BadgeCheck className="w-3.5 h-3.5" /> VIN decoded · records located
            </div>
            <h1 className="text-2xl sm:text-4xl font-headline font-extrabold leading-tight mb-3">
              {vehicleTitle}
            </h1>
            <p className="font-mono text-sm text-white/70 tracking-wider mb-5">
              {cleaned}
            </p>

            {/* spec chips */}
            <div className="flex flex-wrap gap-2">
              {[
                s.engine && { k: "Engine", v: s.engine },
                s.style && { k: "Body", v: s.style },
                s.madeIn && { k: "Built in", v: s.madeIn },
                s.msrp && { k: "Original MSRP", v: s.msrp },
              ]
                .filter(Boolean)
                .map((c) => {
                  const chip = c as { k: string; v: string };
                  return (
                    <span
                      key={chip.k}
                      className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs"
                    >
                      <span className="text-white/55">{chip.k}:</span>
                      <span className="font-semibold text-white">{chip.v}</span>
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* ── Photo gallery + marketing card ──────────────── */}
        <section className="-mt-8 relative z-10 grid lg:grid-cols-[1.05fr_1fr] gap-5 sm:gap-6 items-start">
          {/* gallery */}
          <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-3 shadow-xl shadow-primary/5">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface-container-low">
              {heroImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroImg}
                  alt={`${vehicleTitle} on file`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Car className="w-16 h-16 text-on-surface-variant/40" />
                </div>
              )}
              {p.imagesAmount > 0 && (
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-black/60 backdrop-blur text-white rounded-lg px-2.5 py-1 text-xs font-semibold">
                  <Camera className="w-3.5 h-3.5" /> {p.imagesAmount} photos on file
                </div>
              )}
            </div>
            {p.imagesAmount > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant"
                  >
                    {heroImg && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={heroImg}
                        alt=""
                        aria-hidden
                        className="w-full h-full object-cover"
                        style={{ filter: "blur(8px)", transform: "scale(1.15)" }}
                      />
                    )}
                    <div className="absolute inset-0 bg-primary/35 flex items-center justify-center">
                      {i === 3 && lockedPhotos > 3 ? (
                        <span className="text-white font-headline font-black text-xs">
                          +{lockedPhotos - 3}
                        </span>
                      ) : (
                        <Lock className="w-4 h-4 text-white drop-shadow" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* marketing card */}
          <div>
            <MarketingCard
              make={s.make || ""}
              vehicleLabel={
                [s.year, s.make, s.model].filter(Boolean).join(" ") || cleaned
              }
              vin={cleaned}
              price={SINGLE_PRICE.toFixed(2)}
              orderHref={orderHref}
              exampleHref={exampleHref}
            />
            {/* satisfaction-guarantee seal */}
            <div className="flex items-center justify-center gap-2 mt-5 text-primary">
              <Laurel className="w-7 h-10" />
              <span className="text-sm font-headline font-extrabold uppercase tracking-wide leading-tight text-center">
                Satisfaction
                <br />
                Guarantee
              </span>
              <Laurel className="w-7 h-10 -scale-x-100" />
            </div>
          </div>
        </section>

        {/* ── Dynamic verdict banner ──────────────────────── */}
        <section className="pt-10 sm:pt-12 relative z-10">
          <div
            className={`rounded-2xl border p-5 sm:p-6 shadow-lg ${
              issueCount > 0
                ? "bg-amber-50 border-amber-200"
                : "bg-emerald-50 border-emerald-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  issueCount > 0 ? "bg-amber-500" : "bg-emerald-500"
                }`}
              >
                {issueCount > 0 ? (
                  <AlertTriangle className="w-5 h-5 text-white" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-headline font-extrabold text-on-surface mb-1">
                  {issueCount > 0
                    ? `We found ${issueCount} record${issueCount === 1 ? "" : "s"} on file for this ${s.make || "vehicle"}.`
                    : "No major signals in the free preview — confirm the full history before you buy."}
                </h2>
                <p className="text-sm text-on-surface-variant">
                  {issueCount > 0
                    ? "Unlock the full report to see exactly what each record says — title brands, damage, sale prices and photos."
                    : "Title brands, accidents and odometer checks are only revealed in the full report. Don't assume clean."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Records-found grid ──────────────────────────── */}
        <section className="py-10 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-headline font-extrabold text-primary mb-2">
            What we found for this VIN
          </h2>
          <p className="text-sm text-on-surface-variant mb-6 max-w-2xl">
            Records exist in the sources below. Specs and recalls are shown free —
            the rest unlock with the full report.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {tiles.map((t) => {
              const Icon = t.icon;
              const isLocked = t.state === "locked";
              const hasCount = typeof t.count === "number";
              const flagged = hasCount && (t.count as number) > 0;
              return (
                <div
                  key={t.label}
                  className={`relative rounded-2xl border p-4 ${
                    isLocked
                      ? "border-outline-variant bg-surface-container-lowest"
                      : "border-emerald-200 bg-emerald-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        isLocked ? "bg-primary/10" : "bg-emerald-500/15"
                      }`}
                    >
                      <Icon
                        className={`w-4.5 h-4.5 ${
                          isLocked ? "text-primary" : "text-emerald-600"
                        }`}
                      />
                    </div>
                    {isLocked ? (
                      <Lock className="w-3.5 h-3.5 text-on-surface-variant/60" />
                    ) : (
                      <Check className="w-4 h-4 text-emerald-600" strokeWidth={3} />
                    )}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    {hasCount ? (
                      <span
                        className={`text-lg font-headline font-black ${
                          flagged ? "text-amber-600" : "text-on-surface"
                        }`}
                      >
                        {t.count}
                      </span>
                    ) : null}
                    <span className="text-sm font-bold text-on-surface leading-tight">
                      {t.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                    {t.note}
                  </p>
                  {flagged && (
                    <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full shadow">
                      found
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Locked history timeline tease ───────────────── */}
        <section className="py-8 border-t border-outline-variant">
          <h2 className="text-lg sm:text-xl font-headline font-extrabold text-primary mb-4">
            History timeline
          </h2>
          <div className="relative rounded-2xl border border-outline-variant bg-surface-container-lowest overflow-hidden">
            <div className="divide-y divide-outline-variant/60" aria-hidden>
              {["Title issued", "Odometer reading", "Auction record", "Ownership change"].map(
                (row, i) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="h-3 w-28 rounded bg-on-surface/15 mb-2" />
                      <div className="h-2.5 w-44 rounded bg-on-surface/10" />
                    </div>
                    <div className="h-6 w-16 rounded bg-on-surface/10 blur-[2px]" />
                  </div>
                ),
              )}
            </div>
            {/* lock overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-surface/40 to-surface/85 backdrop-blur-[2px] flex flex-col items-center justify-center text-center px-6">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-3 shadow-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <p className="font-headline font-extrabold text-primary mb-1">
                {issueCount > 0
                  ? `${issueCount} timeline events recorded`
                  : "Full timeline locked"}
              </p>
              <p className="text-xs text-on-surface-variant max-w-xs">
                Unlock to reveal every dated event — titles, odometer readings,
                auctions and ownership changes.
              </p>
            </div>
          </div>
        </section>

        {/* ── Trust strip ─────────────────────────────────── */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6">
          {[
            { icon: ShieldCheck, t: "NMVTIS-backed", d: "Official title data" },
            { icon: RefreshCw, t: "Instant access", d: "Report in seconds" },
            { icon: BadgeCheck, t: "Money-back", d: "If no records found" },
            { icon: Star, t: "Trusted", d: "Thousands run monthly" },
          ].map((x) => {
            const Icon = x.icon;
            return (
              <div
                key={x.t}
                className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 text-center"
              >
                <Icon className="w-5 h-5 text-primary mx-auto mb-1.5" />
                <div className="text-sm font-bold text-on-surface">{x.t}</div>
                <div className="text-[11px] text-on-surface-variant">{x.d}</div>
              </div>
            );
          })}
        </section>

        {/* ── Free recalls (credibility) ──────────────────── */}
        {p.recalls.length > 0 && (
          <section className="py-8 border-t border-outline-variant">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg sm:text-xl font-headline font-extrabold text-primary">
                {p.recalls.length} open safety recall{p.recalls.length === 1 ? "" : "s"} — shown free
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant mb-4 max-w-2xl">
              Pulled live from NHTSA. These are the same official records included
              in your full report — proof the data behind this VIN is real and current.
            </p>
            <div className="space-y-2">
              {p.recalls.map((r, i) => (
                <details
                  key={`${r.NHTSACampaignNumber}-${i}`}
                  className="group rounded-2xl border border-outline-variant bg-surface p-4 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <div>
                      <div className="text-[11px] font-black uppercase tracking-wider text-amber-600 mb-0.5">
                        {r.Component}
                      </div>
                      <div className="text-sm font-bold text-on-surface">
                        Campaign {r.NHTSACampaignNumber} · {r.ReportReceivedDate}
                      </div>
                    </div>
                    <span className="flex-shrink-0 text-primary text-xl font-light group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-2">
                    <p><strong className="text-on-surface">Summary:</strong> {r.Summary}</p>
                    {r.Consequence && (
                      <p><strong className="text-on-surface">Risk:</strong> {r.Consequence}</p>
                    )}
                    {r.Remedy && (
                      <p><strong className="text-on-surface">Remedy:</strong> {r.Remedy}</p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ── What's inside the full report ───────────────── */}
        <section id="whats-inside" className="scroll-mt-24 py-8 border-t border-outline-variant">
          <h2 className="text-lg sm:text-xl font-headline font-extrabold text-primary mb-4">
            What&apos;s inside the full report
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {INCLUDED.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm text-on-surface">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={orderHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition"
            >
              <Lock className="w-4 h-4" /> Get the Full Report — ${SINGLE_PRICE.toFixed(2)}
            </Link>
            <div className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              Includes original MSRP {s.msrp ? `(${s.msrp})` : ""} & invoice pricing
            </div>
          </div>
          <p className="mt-3 text-xs text-on-surface-variant">
            Checking more than one car?{" "}
            <Link href={orderHref} className="font-bold text-primary underline underline-offset-2">
              Get a 3-report pack for ${(SINGLE_PRICE * 2).toFixed(2)}
            </Link>{" "}
            and save vs. three singles.
          </p>
        </section>
      </div>

      {/* ── Sticky mobile CTA ─────────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-surface/95 backdrop-blur border-t border-outline-variant p-3">
        <Link
          href={orderHref}
          className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-primary text-white font-bold"
        >
          <Lock className="w-4 h-4" /> Unlock Full Report — ${SINGLE_PRICE.toFixed(2)}
        </Link>
      </div>
    </article>
  );
}
