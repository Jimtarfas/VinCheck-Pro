import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Check,
  Lock,
  ShieldCheck,
  ShieldAlert,
  Gavel,
  Wrench,
  AlertTriangle,
  Gauge,
  Users,
  Car,
  FileText,
  ChevronRight,
  BadgeCheck,
  Star,
  Crown,
  Gem,
  Receipt,
  Fingerprint,
  Flame,
  Skull,
  KeyRound,
  Hammer,
  ScrollText,
  Banknote,
  BarChart3,
} from "lucide-react";
import VinReport from "@/components/VinReport";
import VinSearchForm from "@/components/VinSearchForm";
import { decodeVin, type VinData } from "@/lib/api";
import { fetchPreview, isUsingMockData, type ClearVinPreview } from "@/lib/clearvin";
import { fetchExternalVehiclePhotos } from "@/lib/external-photos";
import MarketingCard from "./MarketingCard";
import BuyReportButton from "@/components/BuyReportButton";

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

const SINGLE_PRICE = Number(process.env.NEXT_PUBLIC_REPORT_PRICE_CENTS || "999") / 100;

interface Props {
  params: Promise<{ vin: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vin } = await params;
  return {
    title: `Vehicle History Report — ${vin.toUpperCase()}`,
    description:
      "Unlock the full NMVTIS-backed vehicle history report for this VIN — title brands, accidents, odometer, ownership and more.",
    robots: { index: false, follow: false },
  };
}

/* Build the report's VinData straight from ClearVin's production preview —
   the authoritative source for vehicle identity + photos. auto.dev's pricing
   is attached separately (Market Analysis only). */
function clearVinReportData(vin: string, p: ClearVinPreview): VinData {
  const s = p.vinSpec;
  const year = s.year ? Number(s.year) : undefined;
  const bodyType = (s.style || "").trim();
  // ClearVin returns the literal "0" (not a URL) when it has no photo on file.
  const heroPhoto =
    p.previewImageURL && p.previewImageURL !== "0" ? p.previewImageURL : null;
  return {
    vin,
    make: { id: 0, name: s.make || "Vehicle", niceName: "" },
    model: { id: "0", name: s.model || "", niceName: "" },
    drivenWheels: "",
    numOfDoors: "",
    options: [],
    years: year
      ? [
          {
            id: 0,
            year,
            styles: [{ id: 0, name: s.style || "", trim: s.trim || "" }],
          },
        ]
      : undefined,
    categories: bodyType
      ? ({ primaryBodyType: bodyType } as VinData["categories"])
      : undefined,
    photos: heroPhoto ? [heroPhoto] : undefined,
    photoSource: "vin",
  } as unknown as VinData;
}

/* The locked records the paid report reveals — shown as a teaser list
   under the car info. Counts come live from ClearVin when present. */
function lockedRecords(p: ClearVinPreview | null) {
  return [
    { icon: ShieldCheck, label: "Title brands & history", note: "Salvage · flood · junk · lemon", count: null as number | null },
    { icon: AlertTriangle, label: "Accident & damage records", note: "Reported collisions & severity", count: p?.damagesCount || null },
    { icon: Gauge, label: "Odometer readings", note: "Rollback & mileage checks", count: null },
    { icon: Users, label: "Ownership history", note: "Owners & usage type", count: null },
    { icon: Gavel, label: "Auction & sale records", note: "Sale price & location", count: p?.auctionHistoryRecords || null },
    { icon: Wrench, label: "Theft & total-loss checks", note: "Stolen / recovered / junked", count: null },
  ];
}

/* Screen-4 "every record your report checks" grid. */
const RECORDS_CHECKED = [
  { icon: AlertTriangle, label: "Accident History" },
  { icon: Banknote, label: "Liens & Loans" },
  { icon: FileText, label: "Title History" },
  { icon: Users, label: "Ownership Records" },
  { icon: Gauge, label: "Odometer Records" },
  { icon: Wrench, label: "Salvage Records" },
  { icon: Receipt, label: "Sales History" },
  { icon: Skull, label: "Total Loss Events" },
  { icon: ShieldAlert, label: "Open Recalls" },
  { icon: BadgeCheck, label: "Lemon Check" },
];

/* Screen-4 "your report may contain" 16-item green checklist. */
const MAY_CONTAIN = [
  { icon: AlertTriangle, label: "Major Accident" },
  { icon: Gauge, label: "Mileage Rollback" },
  { icon: Hammer, label: "Frame Damage" },
  { icon: Car, label: "Lease & Taxi Use" },
  { icon: FileText, label: "Rebuilt / Branded Title" },
  { icon: ShieldCheck, label: "Police & Government Use" },
  { icon: Users, label: "Owner History" },
  { icon: Wrench, label: "Salvage History" },
  { icon: Skull, label: "Junked" },
  { icon: Flame, label: "Airbag Deployment" },
  { icon: Fingerprint, label: "Vehicle Specifications" },
  { icon: BadgeCheck, label: "Warranty Information" },
  { icon: Receipt, label: "Sale History" },
  { icon: ScrollText, label: "Bill of Sale Template" },
  { icon: KeyRound, label: "Lemon Check" },
  { icon: Banknote, label: "Theft & Recovery Check" },
];

/* Everything the buyer gets — shown as the premium Report Summary in the
   sidebar, grouped with titles. */
const SUMMARY_GROUPS = [
  {
    title: "Title & Ownership",
    items: ["Title Brand Check", "Ownership History", "Number of Owners", "Usage Type"],
  },
  {
    title: "Condition & Damage",
    items: ["Accident & Damage Records", "Salvage / Total-Loss Check", "Airbag Deployment", "Frame Damage"],
  },
  {
    title: "Mileage & Legal",
    items: ["Odometer Readings", "Rollback Detection", "Open Liens", "Lemon Check"],
  },
  {
    title: "Value & Market",
    items: ["Market Value", "Original MSRP & Invoice", "Warranty Information"],
  },
  {
    title: "Records & Media",
    items: ["Auction Records & Prices", "All Photos on File", "Open Safety Recalls", "Downloadable PDF"],
  },
];

export default async function ReportPreviewPage({ params }: Props) {
  const { vin } = await params;
  const cleaned = vin.trim().toUpperCase();
  if (cleaned.length !== 17) notFound();

  // Pull the production ClearVin preview (vehicle identity + photos — the
  // source of truth for this preview) and auto.dev's decode (used ONLY for the
  // Market Analysis pricing) in parallel; tolerate either failing.
  const [decodedResult, previewResult] = await Promise.allSettled([
    decodeVin(cleaned),
    fetchPreview(cleaned),
  ]);

  const preview =
    previewResult.status === "fulfilled" && "ok" in previewResult.value && previewResult.value.ok
      ? previewResult.value.data
      : null;
  const decoded =
    decodedResult.status === "fulfilled" ? decodedResult.value : null;

  // Build the data the report design renders. ClearVin is authoritative for
  // identity + photos; auto.dev contributes only price + marketData (Market
  // Analysis). When ClearVin is unavailable we fall back to the full auto.dev
  // decode so dev/QA can still see the layout.
  let reportData: VinData | null = null;
  if (preview) {
    reportData = clearVinReportData(cleaned, preview);
    if (decoded) {
      reportData.price = decoded.price;
      reportData.marketData = decoded.marketData;
    }
  } else if (decoded) {
    reportData = decoded;
  }

  // Neither source returned anything usable — there is nothing to show.
  if (!reportData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 pt-24 bg-surface">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-headline font-extrabold text-primary mb-3">
            No records for this VIN
          </h1>
          <p className="text-on-surface-variant mb-6">
            We couldn&apos;t locate any records for {cleaned}. Double-check the VIN and try again.
          </p>
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

  // Photo fallback: ClearVin only has images for vehicles with auction/salvage
  // history, so clean cars come back with none. Rather than show an empty
  // placeholder, fetch high-quality Bing photos of the SAME year/make/model and
  // present them (clearly labeled "similar" in the gallery). Only runs when no
  // real photo was attached by ClearVin or auto.dev.
  const hasRealPhoto =
    Array.isArray(reportData.photos) &&
    reportData.photos.some((u) => typeof u === "string" && u.length > 0 && u !== "0");
  if (!hasRealPhoto) {
    const spec = preview?.vinSpec;
    const fbYear = Number(spec?.year ?? reportData.years?.[0]?.year) || undefined;
    const fbMake = spec?.make ?? reportData.make?.name ?? undefined;
    const fbModel = spec?.model ?? reportData.model?.name ?? undefined;
    const similarPhotos = await fetchExternalVehiclePhotos(fbYear, fbMake, fbModel, {
      trim: spec?.trim ?? undefined,
      bodyType: spec?.style ?? undefined,
    });
    if (similarPhotos.length > 0) {
      reportData.photos = similarPhotos;
      reportData.photoSource = "web";
    }
  }

  // ClearVin's hero photo is already on reportData (clearVinReportData). Tease
  // the rest of the photos on file as blurred, locked thumbnails.
  const lockedPhotoCount =
    preview?.previewImageURL && preview.imagesAmount > 1
      ? preview.imagesAmount
      : undefined;

  const mock = isUsingMockData();
  const s = preview?.vinSpec;
  const make = s?.make || reportData.make?.name || "";
  const aiYear = reportData.years?.[0]?.year;
  const vehicleLabel =
    [s?.year ?? aiYear, make, s?.model ?? reportData.model?.name].filter(Boolean).join(" ") ||
    cleaned;

  // Total "history records" on file — matches ClearVin's headline count, which
  // rolls photos in alongside auction, damage and recall records.
  const recordsFound = preview
    ? preview.auctionHistoryRecords +
      preview.damagesCount +
      preview.recallsCount +
      preview.imagesAmount
    : 0;
  const records = lockedRecords(preview);

  const orderHref = `/order?vin=${encodeURIComponent(cleaned)}`;
  const exampleHref = "/report/1C4RJEAG0JC168184";

  /* ── Hero primary CTA ─────────────────────────────────────────────────
     Sits first in the hero action-button row so the buy button is visible
     above the fold, next to Download/Print/Share. Gold accent so it reads
     as THE primary action against the navy. Preview-only. */
  const heroCta = (
    <BuyReportButton className="flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-headline font-extrabold bg-white text-primary shadow-lg hover:bg-yellow-50 transition cursor-pointer">
      <Lock className="w-4 h-4" /> Get full report — ${SINGLE_PRICE.toFixed(2)}
    </BuyReportButton>
  );

  /* ── Hero risk snapshot ───────────────────────────────────────────────
     Fills the navy hero space beside the vehicle name. Built entirely from
     the FREE ClearVin preview signals — we surface the *counts* of records on
     file (damage, auction, photos) and keep the details locked behind the
     paywall, which is the strongest conversion lever for a used-car buyer:
     it proves concerning records exist without giving them away. Recalls are
     the one set shown free (NHTSA, also rendered below) as a trust proof.
     Falls back to example numbers when ClearVin has no token configured. */
  const heroAside = (() => {
    const isExample = !preview;
    const dmg = preview?.damagesCount ?? 2;
    const auc = preview?.auctionHistoryRecords ?? 1;
    const rec = preview?.recallsCount ?? 6;
    const imgs = preview?.imagesAmount ?? 12;

    // Locked teaser tiles — count shown, detail behind the paywall.
    const tiles: { icon: typeof Lock; label: string; value: string; alert?: boolean }[] = [
      { icon: ShieldCheck, label: "Title & odometer", value: "Check" },
      { icon: AlertTriangle, label: "Damage records", value: String(dmg), alert: dmg > 0 },
      { icon: Gavel, label: "Auction & sales", value: String(auc), alert: auc > 0 },
      { icon: Car, label: "Photos on file", value: String(imgs) },
    ];

    // Trust facts — concrete identity details that prove the data is real and
    // specific to this exact car (not a generic year/make/model lookup).
    const facts: string[] = [];
    if (isExample) {
      facts.push("3.5L V6 · Assembled in USA", "Original MSRP $31,840");
    } else {
      const eng = preview?.vinSpec.engine?.trim();
      const made = preview?.vinSpec.madeIn?.trim();
      const msrp = preview?.vinSpec.msrp?.trim();
      if (eng || made) facts.push([eng, made && `Assembled in ${made}`].filter(Boolean).join(" · "));
      if (msrp) facts.push(`Original MSRP ${msrp}`);
    }

    return (
      <div className="hidden lg:block mt-8 rounded-2xl bg-white/[0.07] border border-white/15 p-4">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Fingerprint className="w-4 h-4 text-secondary-fixed-dim" />
          <h2 className="text-xs font-headline font-extrabold uppercase tracking-wider text-white">
            Records found for this VIN
          </h2>
          {isExample && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/45 border border-white/20 rounded-full px-2 py-0.5">
              Example
            </span>
          )}
          {/* Trust facts inline on the right of the header */}
          {facts.length > 0 && (
            <div className="ml-auto flex items-center gap-4">
              {facts.map((f) => (
                <span key={f} className="hidden xl:flex items-center gap-1.5 text-[11px] text-white/70">
                  <BadgeCheck className="w-3.5 h-3.5 text-secondary-fixed-dim flex-shrink-0" />
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Single horizontal row: 4 locked record tiles + the free recall tile */}
        <div className="grid grid-cols-5 gap-2.5">
          {tiles.map(({ icon: Icon, label, value, alert }) => (
            <div key={label} className="rounded-xl bg-white/[0.06] border border-white/10 px-3.5 py-2.5">
              <div className="flex items-center justify-between mb-1">
                <Icon className={`w-4 h-4 ${alert ? "text-amber-300" : "text-secondary-fixed-dim"}`} />
                <Lock className="w-3 h-3 text-white/40" />
              </div>
              <div className={`text-lg font-headline font-extrabold leading-none ${alert ? "text-amber-300" : "text-white"}`}>
                {value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/55 mt-1 leading-tight">
                {label}
              </div>
            </div>
          ))}

          {/* Recalls — the one record set shown free, as proof the data is real */}
          <div className="rounded-xl bg-amber-400/15 border border-amber-300/25 px-3.5 py-2.5 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-1">
              <ShieldAlert className="w-4 h-4 text-amber-300" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-200">Free</span>
            </div>
            <div className="text-lg font-headline font-extrabold leading-none text-amber-300">{rec}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-100/80 mt-1 leading-tight">
              Open recall{rec === 1 ? "" : "s"}
            </div>
          </div>
        </div>
      </div>
    );
  })();

  /* ── Market Analysis card (sidebar, above Report Summary) ──────────────
     Built from auto.dev market/pricing data with an example fallback so the
     panel is reviewable before AUTO_DEV_API_KEY is configured. Skipped when
     the rich live-listings Market Analysis (inside VinReport) already renders,
     so the two never double up. */
  const summaryTop = reportData.marketData ? null : (() => {
    const pr = reportData.price;
    const cards: { label: string; value: string }[] = [];
    if (pr) {
      if (pr.baseMsrp > 0) cards.push({ label: "Original MSRP", value: `$${pr.baseMsrp.toLocaleString()}` });
      if (pr.usedTmvRetail > 0) cards.push({ label: "Used Retail", value: `$${pr.usedTmvRetail.toLocaleString()}` });
      if (pr.usedPrivateParty > 0) cards.push({ label: "Private Party", value: `$${pr.usedPrivateParty.toLocaleString()}` });
      if (pr.usedTradeIn > 0) cards.push({ label: "Trade-In", value: `$${pr.usedTradeIn.toLocaleString()}` });
    }
    const isExample = cards.length === 0;
    if (isExample) {
      cards.push(
        { label: "Avg. Market Price", value: "$24,850" },
        { label: "Price Range", value: "$21,300 – $28,400" },
        { label: "Active Listings", value: "37" },
        { label: "Avg. Mileage", value: "92,400 mi" },
      );
    }
    return (
      <div className="bg-surface-container-lowest rounded-[2rem] shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-surface-container flex items-center justify-between gap-2">
          <h3 className="font-headline font-bold text-on-surface flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> Market Analysis
          </h3>
          {isExample && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-outline border border-outline-variant rounded-full px-2 py-0.5">
              Example
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-3">
            {cards.map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-surface-container-low px-3.5 py-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-outline mb-1 leading-tight">
                  {label}
                </div>
                <div className="text-base font-headline font-extrabold text-on-surface leading-none">
                  {value}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-outline leading-snug">
            {pr
              ? "Manufacturer & guide pricing for this year, make & model."
              : "Example figures — live pricing loads from auto.dev once configured."}
          </p>
        </div>
      </div>
    );
  })();

  /* ── Build & pricing specs (free, from ClearVin's preview) ──
     Only the ClearVin spec fields NOT already covered by VinReport's built-in
     quick-specs (Year/Make/Model/Trim) and Vehicle Classification (Body Type)
     cards — so the two never duplicate. Empty values (e.g. blank invoice) are
     dropped. Rendered only when the ClearVin preview is present (never from the
     auto.dev fallback). Styled to match VinReport's Card/Stat design. */
  const buildSpecs: { label: string; value: string }[] = [];
  if (preview) {
    const sp = preview.vinSpec;
    const push = (label: string, v?: string | null) => {
      const val = (v || "").trim();
      if (val) buildSpecs.push({ label, value: val });
    };
    push("Engine", sp.engine);
    push("Assembled In", sp.madeIn);
    push("Original MSRP", sp.msrp);
    push("Invoice Price", sp.invoice);
  }

  /* ── Premium sections injected UNDER the car info (main column) ── */
  const premiumSections = (
    <div className="space-y-12">
      {/* Build & pricing specs — free, complements VinReport's identity cards */}
      {buildSpecs.length > 0 && (
        <div className="bg-surface-container-lowest rounded-3xl sm:rounded-[2rem] shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-5 border-b border-surface-container">
            <h2 className="font-headline font-bold text-base sm:text-lg text-on-surface flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <Fingerprint className="w-5 h-5" />
              </div>
              Vehicle Specifications
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 ml-12">
              Decoded from this VIN — free. Verify it matches the seller&apos;s listing.
            </p>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8">
              {buildSpecs.map((s) => (
                <div
                  key={s.label}
                  className="py-3 border-b border-surface-container last:border-0"
                >
                  <p className="text-xs text-outline uppercase tracking-wider font-semibold mb-1">
                    {s.label}
                  </p>
                  <p className="font-semibold text-on-surface">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Premium vehicle history */}
      <section>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary mb-3">
          <Crown className="w-3.5 h-3.5" /> Premium vehicle history
        </div>
        <h2 className="text-2xl font-headline font-extrabold text-on-surface mb-2">
          {recordsFound > 0
            ? `${recordsFound} history record${recordsFound === 1 ? "" : "s"} on file for this ${make || "vehicle"}`
            : "Unlock the full vehicle history"}
        </h2>
        <p className="text-sm text-on-surface-variant mb-5 max-w-md">
          The specs above are free. Title brands, accidents, odometer and
          ownership records are revealed in the full report.
        </p>
        <div className="relative rounded-3xl border border-outline-variant bg-surface-container-lowest overflow-hidden">
          <div className="divide-y divide-outline-variant/60">
            {records.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.label} className="flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-on-surface">{r.label}</div>
                    <div className="text-xs text-on-surface-variant">{r.note}</div>
                  </div>
                  {typeof r.count === "number" ? (
                    <span className="flex-shrink-0 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full">
                      {r.count} found
                    </span>
                  ) : (
                    <Lock className="w-4 h-4 text-on-surface-variant/60 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free recalls — right after the "records on file" section */}
      {preview && preview.recalls.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-headline font-extrabold text-primary">
              {preview.recalls.length} open safety recall{preview.recalls.length === 1 ? "" : "s"} — shown free
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant mb-4 max-w-2xl">
            Pulled live from NHTSA — the same official records included in your
            full report, proof the data behind this VIN is real and current.
          </p>
          <div className="space-y-2">
            {preview.recalls.map((r, i) => (
              <details
                key={`${r.NHTSACampaignNumber}-${i}`}
                className="group rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 [&_summary::-webkit-details-marker]:hidden"
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

      {/* Mobile-only purchase card — surfaced right after the recalls so phone
          users see the offer without scrolling past the whole report. The
          desktop copy lives in the sticky sidebar (hidden on mobile). */}
      <div className="lg:hidden">
        <MarketingCard
          make={make}
          vehicleLabel={vehicleLabel}
          vin={cleaned}
          price={SINGLE_PRICE.toFixed(2)}
          exampleHref={exampleHref}
        />
      </div>

      {/* Your report contains */}
      <section className="rounded-3xl bg-surface-container-lowest border border-outline-variant p-6">
        <h2 className="text-xl font-headline font-extrabold text-primary mb-2">
          Your report contains
        </h2>
        <p className="text-sm text-on-surface-variant mb-5 max-w-2xl">
          Here&apos;s everything you could uncover about this {make || "vehicle"} before you buy.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
          {MAY_CONTAIN.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-emerald-600" />
                </span>
                <span className="text-sm font-semibold text-on-surface leading-tight">{item.label}</span>
                <Check className="w-4 h-4 text-emerald-600 ml-auto flex-shrink-0" strokeWidth={3} />
              </div>
            );
          })}
        </div>
      </section>

      {/* Every record your report checks */}
      <section>
        <h2 className="text-xl font-headline font-extrabold text-primary mb-2">
          Every record your report checks
        </h2>
        <p className="text-sm text-on-surface-variant mb-5 max-w-2xl">
          Your {make || "vehicle"} report is cross-checked against billions of
          records from thousands of trusted sources nationwide.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {RECORDS_CHECKED.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.label}
                className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xs font-bold text-on-surface leading-tight">{r.label}</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );

  /* ── Paywall card that replaces the AI block in the sidebar ──
     Desktop-only: on mobile the sidebar renders far below the whole main
     column, so an inline copy is shown right after the recalls section
     instead (see premiumSections). Sits in normal flow directly beneath the
     Market Analysis panel — not sticky, so it never overlaps the Report
     Summary that follows it in the sidebar. */
  const sidebarCard = (
    <div className="hidden lg:block">
      <MarketingCard
        make={make}
        vehicleLabel={vehicleLabel}
        vin={cleaned}
        price={SINGLE_PRICE.toFixed(2)}
        exampleHref={exampleHref}
      />
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
  );

  /* Purchase & report FAQ. Rendered in two places: under the Report Summary in
     the sidebar on desktop (via VinReport's sidebarBottom), and in the footer
     on mobile. */
  const faqSection = (
    <section>
      <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-5">
        FAQ
      </h2>

      <div className="space-y-3">
        {[
          {
            q: "What's included in the full report?",
            a: `Your ${vehicleLabel} report compiles every record on file: title brands (salvage, junk, flood, lemon), reported accidents and damage, the odometer timeline with rollback checks, ownership history and number of owners, open liens, theft and total-loss records, market values, warranty status, auction sale history and all photos on file — plus a downloadable PDF you can keep.`,
          },
          {
            q: "Will I be billed monthly?",
            a: `No. CarCheckerVin does not offer monthly recurring subscriptions and does not use automated recurring billing. You pay a single one-time fee of $${SINGLE_PRICE.toFixed(2)} for this report — your access simply ends when your access pass expires, with nothing further to cancel.`,
          },
          {
            q: "Why do you charge for this data?",
            a: "Pulling a complete history means querying official NMVTIS-backed title databases, auction houses, insurance total-loss records and NHTSA recall data — each of which carries a real cost per lookup. The one-time fee covers that direct access so you get verified, current records instead of guesswork.",
          },
          {
            q: "What vehicles can I search for?",
            a: "Almost any car, truck, SUV, van or motorcycle sold in the US with a standard 17-character VIN. Just enter the VIN and we'll pull the records on file for that exact vehicle.",
          },
          {
            q: "Will I receive an email notifying me of the purchase?",
            a: "Yes. A confirmation and receipt are emailed to you right after checkout, and your full report — including the downloadable PDF — is available instantly on-screen so you never have to wait.",
          },
          {
            q: "What if the report doesn't help — can I get a refund?",
            a: "You're covered by a 30-day money-back guarantee. If the report doesn't meet your expectations, reach out within 30 days of purchase and we'll issue a full refund — no complicated forms.",
          },
        ].map(({ q, a }, i) => (
          <details
            key={i}
            open={i === 0}
            className="group rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 open:shadow-sm [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
              <span className="text-sm sm:text-base font-bold text-on-surface group-open:text-primary transition-colors">
                {q}
              </span>
              <span className="flex-shrink-0 text-2xl font-light leading-none text-on-surface-variant group-open:text-primary">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
              {a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );

  return (
    <div className="bg-surface">
      {mock && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-800 text-xs sm:text-sm text-center py-2 px-4 pt-16">
          Sample data — set the <code className="font-mono">CLEARVIN_API_EMAIL</code> / <code className="font-mono">CLEARVIN_API_PASSWORD</code> production credentials to load live records for this VIN.
        </div>
      )}

      {/* The free-report design, reused — with the premium sections under the
          car info, the paywall card in the sidebar, locked gallery & listing,
          and the full deliverables list as the Report Summary. */}
      <VinReport
        data={reportData}
        hideCheckAnother
        mainExtra={premiumSections}
        sidebarReplaceAI={sidebarCard}
        lockedPhotoCount={lockedPhotoCount}
        lockListing={!!reportData.listing}
        unlockHref={orderHref}
        summaryGroups={SUMMARY_GROUPS}
        heroAside={heroAside}
        heroCta={heroCta}
        summaryTop={summaryTop}
        sidebarBottom={<div className="hidden lg:block">{faqSection}</div>}
        lockActions
        unlockPrice={SINGLE_PRICE}
      />

      {/* ═══ Commercial footer sections ═══════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-28 lg:pb-16 space-y-10">
        {/* Trust band */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 text-center">
            <ShieldCheck className="w-6 h-6 text-primary mx-auto mb-1.5" />
            <div className="text-sm font-bold text-on-surface">NHTSA recall data</div>
            <div className="text-[11px] text-on-surface-variant">Official safety source</div>
          </div>
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 text-center">
            <BadgeCheck className="w-6 h-6 text-primary mx-auto mb-1.5" />
            <div className="text-sm font-bold text-on-surface">NMVTIS-backed</div>
            <div className="text-[11px] text-on-surface-variant">Federal title records</div>
          </div>
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 text-center">
            <div className="flex items-center justify-center gap-0.5 mb-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-emerald-500 fill-emerald-500" />
              ))}
            </div>
            <div className="text-sm font-bold text-on-surface">Rated Excellent</div>
            <div className="text-[11px] text-on-surface-variant">on Trustpilot</div>
          </div>
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 text-center">
            <Crown className="w-6 h-6 text-primary mx-auto mb-1.5" />
            <div className="text-sm font-bold text-on-surface">30-day money-back</div>
            <div className="text-[11px] text-on-surface-variant">Full refund guarantee</div>
          </div>
        </section>

        {/* What you get the moment you pay */}
        <section className="rounded-3xl bg-primary text-white p-6 sm:p-10 text-center relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 rounded-full bg-white/5 blur-2xl"
          />
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider mb-4">
            <Crown className="w-3.5 h-3.5" /> What you get the moment you pay
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold mb-3">
            Full {vehicleLabel} history report — unlocked instantly
          </h2>
          <p className="text-sm text-white/75 max-w-xl mx-auto mb-7">
            Your complete NMVTIS-backed report renders in seconds: title brands,
            accident & damage records, odometer timeline, ownership history,
            auction photos and a downloadable PDF you can keep.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <BuyReportButton className="inline-flex items-center justify-center gap-2 bg-white text-primary rounded-2xl px-7 py-4 font-headline font-extrabold text-base hover:bg-yellow-50 transition-colors shadow-lg cursor-pointer">
              <Lock className="w-5 h-5" /> Get full report — ${SINGLE_PRICE.toFixed(2)}
            </BuyReportButton>
            <Link
              href={exampleHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 font-bold text-white/90 border border-white/25 hover:bg-white/10 transition-colors"
            >
              <FileText className="w-5 h-5" /> View sample report
            </Link>
          </div>
          <p className="text-xs text-white/60 mt-4">
            One-time payment · No subscription · 30-day money-back guarantee
          </p>
        </section>

        {/* Purchase & report FAQ — mobile only; on desktop it renders under the
            Report Summary in the sidebar (VinReport sidebarBottom). */}
        <div className="lg:hidden">{faqSection}</div>

        {/* Check Another Vehicle — moved here, under the final CTA */}
        <section className="bg-primary-container rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 text-center relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--color-secondary-container)" }} />
          <h2 className="font-headline font-extrabold text-lg sm:text-xl text-white mb-2">Check Another Vehicle</h2>
          <p className="text-sm sm:text-base text-white/85 mb-5 sm:mb-6">Enter a different VIN to generate a new report</p>
          <div className="max-w-lg mx-auto">
            <VinSearchForm size="sm" />
          </div>
        </section>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-surface/95 backdrop-blur border-t border-outline-variant px-4 pt-2.5 pb-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <p className="flex items-center justify-center gap-1.5 text-[11px] text-on-surface-variant text-center mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          100% Satisfaction Guarantee · Full refund if you&apos;re not satisfied
        </p>
        <BuyReportButton className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-primary text-white font-headline font-extrabold text-base shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors cursor-pointer">
          <Gem className="w-5 h-5" /> Get full report — ${SINGLE_PRICE.toFixed(2)}
        </BuyReportButton>
        <Link
          href={exampleHref}
          className="block text-center mt-2 text-sm font-bold text-primary underline underline-offset-4"
        >
          View sample report first
        </Link>
      </div>
    </div>
  );
}
