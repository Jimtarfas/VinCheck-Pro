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
  Sparkles,
  Gift,
  Globe2,
  Palette,
  MapPin,
  Waves,
  Bike,
  Citrus,
} from "lucide-react";
import { headers } from "next/headers";
import { getReportContext, type ReportContext } from "@/lib/report-context";
import VinReport from "@/components/VinReport";
import VinSearchForm from "@/components/VinSearchForm";
import { decodeVin, type VinData } from "@/lib/api";
import { fetchPreview, isUsingMockData, type ClearVinPreview } from "@/lib/clearvin";
import { fetchExternalVehiclePhotos } from "@/lib/external-photos";
import { findBrand } from "@/lib/paint-codes";
import MarketingCard from "./MarketingCard";
import BuyReportButton from "@/components/BuyReportButton";
import BundleUpsellCard from "./BundleUpsellCard";
import StickyBuyBar from "./StickyBuyBar";
import ReportColumnFiller from "./ReportColumnFiller";

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
  // `from` carries the source-page slug for the contextual "message match"
  // banner (see src/lib/report-context.ts). Optional — the report is fully
  // functional without it, and generateMetadata ignores it.
  searchParams?: Promise<{ from?: string }>;
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

/* Reduce a full auto.dev decode down to the SAME minimal preview shape that
   ClearVin supplies (identity + body type + photos only). This is the fallback
   used when ClearVin has no preview for the VIN. Without it, the page would
   render auto.dev's complete spec sheet (engine, transmission, fuel economy,
   colors, every option) unlocked — making the free preview look like a full
   report. Price/marketData/listing are re-attached separately so Market
   Analysis still works and the listing stays locked behind the paywall.
   Only the FIRST photo is kept (like ClearVin's single preview image) so the
   gallery shows one hero photo with the rest teased as blurred locked
   thumbnails — never the full carousel. The total count is teased separately
   via lockedPhotoCount. */
function minimalReportData(vin: string, d: VinData): VinData {
  const year = d.years?.[0]?.year;
  const style = d.years?.[0]?.styles?.[0];
  const bodyType = (d.categories?.primaryBodyType || "").trim();
  const realPhotos = Array.isArray(d.photos)
    ? d.photos.filter((u) => typeof u === "string" && u.length > 0 && u !== "0")
    : [];
  return {
    vin,
    make: d.make || { id: 0, name: "Vehicle", niceName: "" },
    model: d.model || { id: "0", name: "", niceName: "" },
    drivenWheels: "",
    numOfDoors: "",
    options: [],
    years: year
      ? [
          {
            id: 0,
            year,
            styles: [{ id: 0, name: style?.name || "", trim: style?.trim || "" }],
          },
        ]
      : undefined,
    categories: bodyType
      ? ({ primaryBodyType: bodyType } as VinData["categories"])
      : undefined,
    photos: realPhotos.length > 0 ? [realPhotos[0]] : undefined,
    photoSource: d.photoSource ?? "vin",
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

/* Best-effort paint-code estimate (Option 3).
 *
 * Paint codes are NOT encoded in the VIN and no integrated data source returns
 * a per-VIN factory paint code — only a color NAME (from a listing) or a
 * brand's catalog. So this is a *heuristic*: take the report's exterior color
 * name and fuzzy-match it against the known example colors for the make in our
 * paint-code reference. A hit gives a *likely* code to look for on the car; it
 * is explicitly labeled as an estimate, never presented as confirmed fact. */
function normalizeColor(s: string): string {
  return s
    .toLowerCase()
    .replace(/metallic|pearl|mica|clearcoat|tri-coat|tricoat|effect/g, "")
    .replace(/[^a-z]/g, "");
}

function likelyPaintCode(
  make: string | undefined,
  colorName: string | undefined
): { code: string; matchedName: string } | null {
  if (!make || !colorName) return null;
  const brand = findBrand(make.toLowerCase().trim().replace(/\s+/g, "-"));
  if (!brand) return null;
  const target = normalizeColor(colorName);
  if (!target) return null;
  for (const ex of brand.examples) {
    const candidate = normalizeColor(ex.colorName);
    if (!candidate) continue;
    // Match when either name contains the other (handles "Shadow Black" vs
    // "Tuxedo Black / Shadow Black", "White" vs "Oxford White", etc.).
    if (candidate.includes(target) || target.includes(candidate)) {
      return { code: ex.code, matchedName: ex.colorName };
    }
  }
  return null;
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

export default async function ReportPreviewPage({ params, searchParams }: Props) {
  const { vin } = await params;
  const cleaned = vin.trim().toUpperCase();
  if (cleaned.length !== 17) notFound();

  // Source-page "message match" context — drives the optional banner that
  // echoes the check the visitor came from (e.g. arriving from /warranty-check
  // shows a warranty-framed intro). null for direct/organic/unknown sources.
  const reportContext = getReportContext((await searchParams)?.from);

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

  // "ClearVin doesn't cover this VIN" detection.
  //
  // Background: ClearVin's paid pipeline only covers US-registered
  // vehicles, and within that, some VINs still come back with an
  // empty spec (no make/model/year, no recall/auction/damage/photo
  // signals). A paid full report for those VINs is effectively
  // useless — the upstream data just isn't there. Yesterday a buyer
  // paid $9.99 for one of these and got nothing.
  //
  // The flag is computed in one place here and threaded through every
  // paywall-adjacent surface below (hero CTA, marketing cards, bundle
  // upsells, final purchase section, sticky mobile bar). When true:
  //   - the report-preview page replaces every "Get full report" CTA
  //     with a friendly notice + whatever data auto.dev was able to
  //     decode for free,
  //   - /api/order/checkout independently re-checks the same flag and
  //     refuses to create a Stripe session (server-side hard guard for
  //     anyone bypassing the UI).
  //
  // Sources:
  //   - preview.unsupported  — set by fetchPreview() when ClearVin
  //                            returned 200 with an empty/zero-signal
  //                            payload (canonical signal from the lib).
  //   - !preview && decoded  — ClearVin call failed entirely and the
  //                            only data we have is auto.dev's. We
  //                            cannot promise a paid report in this
  //                            case either, so treat as unsupported.
  const isUnsupported = !preview || preview.unsupported === true;

  // Build the data the report design renders. ClearVin is authoritative for
  // identity + photos; auto.dev contributes only price + marketData (Market
  // Analysis). When ClearVin is unavailable we fall back to the full auto.dev
  // decode so dev/QA can still see the layout.
  let reportData: VinData | null = null;
  // When we fall back to the auto.dev decode, how many photos it had — used to
  // tease the rest as blurred locked thumbnails after we keep only the first.
  let decodeFallbackPhotoCount: number | undefined;
  if (preview) {
    reportData = clearVinReportData(cleaned, preview);
    if (decoded) {
      reportData.price = decoded.price;
      reportData.marketData = decoded.marketData;
    }
  } else if (decoded) {
    // No ClearVin preview for this VIN. Fall back to auto.dev, but reduce it to
    // the minimal preview shape so the spec sheet stays locked like every other
    // preview. Re-attach price/marketData/listing for Market Analysis (the
    // listing renders blurred behind the paywall via lockListing).
    reportData = minimalReportData(cleaned, decoded);
    reportData.price = decoded.price;
    reportData.marketData = decoded.marketData;
    reportData.listing = decoded.listing;
    decodeFallbackPhotoCount = Array.isArray(decoded.photos)
      ? decoded.photos.filter((u) => typeof u === "string" && u.length > 0 && u !== "0").length
      : undefined;
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
  // When we fall back to similar photos, how many we found — used to tease the
  // rest as blurred, locked thumbnails (see fallbackLockedCount below).
  let fallbackLockedCount: number | undefined;
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
      // Premium preview: keep only the single best-matching photo as the hero
      // and lock the rest as blurred duplicates behind the paywall — just like
      // real-photo VINs. Showing the full strip of mismatched colors/trims for
      // free both gives away the gallery and looks inconsistent.
      reportData.photos = [similarPhotos[0]];
      reportData.photoSource = "web";
      fallbackLockedCount = similarPhotos.length;
    }
  }

  // ClearVin's hero photo is already on reportData (clearVinReportData). Tease
  // the rest of the photos on file as blurred, locked thumbnails. For similar-
  // photo VINs, fall back to the count of photos we found above.
  const lockedPhotoCount =
    preview?.previewImageURL && preview.imagesAmount > 1
      ? preview.imagesAmount
      : fallbackLockedCount ??
        (decodeFallbackPhotoCount && decodeFallbackPhotoCount > 1
          ? decodeFallbackPhotoCount
          : undefined);

  // VIN-specific findings teased inside the upsell modal so the buyer sees
  // what's actually on this record (recalls, auctions, damage, photos) before
  // paying — real urgency rather than a generic feature list.
  const previewSignals = preview
    ? {
        recalls: preview.recallsCount || preview.recalls.length || 0,
        auctionRecords: preview.auctionHistoryRecords || 0,
        damageRecords: preview.damagesCount || 0,
        photos: preview.imagesAmount || 0,
      }
    : undefined;

  const mock = isUsingMockData();
  const s = preview?.vinSpec;
  const make = s?.make || reportData.make?.name || "";
  const aiYear = reportData.years?.[0]?.year;
  const vehicleLabel =
    [s?.year ?? aiYear, make, s?.model ?? reportData.model?.name].filter(Boolean).join(" ") ||
    cleaned;

  // ── Source-page "message match" banner ──────────────────────────────────
  // Additive only: rendered at the top of the main report column when the
  // visitor arrived from a focused check tool (reportContext != null). The
  // baseline report is unchanged for everyone else.
  const CONTEXT_ICONS: Record<ReportContext["icon"], typeof ShieldCheck> = {
    BadgeCheck,
    Banknote,
    AlertTriangle,
    Gauge,
    ShieldAlert,
    Fingerprint,
    Skull,
    Waves,
    Bike,
    Car,
    Citrus,
    ScrollText,
  };
  const contextBanner = reportContext
    ? (() => {
        const Icon = CONTEXT_ICONS[reportContext.icon];
        const fill = (t: string) => t.replace(/\{vehicle\}/g, vehicleLabel);
        return (
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.07] to-surface-container-lowest p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
                  {reportContext.eyebrow}
                </p>
                <h2 className="mt-1 font-headline text-lg font-extrabold leading-tight text-on-surface sm:text-xl">
                  {fill(reportContext.headline)}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  {fill(reportContext.body)}
                </p>
              </div>
            </div>
          </div>
        );
      })()
    : null;

  // Total "history records" on file — matches ClearVin's headline count, which
  // rolls photos in alongside auction, damage and recall records.
  const recordsFound = preview
    ? preview.auctionHistoryRecords +
      preview.damagesCount +
      preview.recallsCount +
      preview.imagesAmount
    : 0;
  const records = lockedRecords(preview);

  // Paint-code section (Option 3) — only shown when the buyer arrived from the
  // paint-code lookup/finder tools, so it answers the intent they came with
  // without cluttering the report for everyone else.
  const referer = (await headers()).get("referer") || "";
  const cameFromPaint = /\/paint-code-(lookup|finder)/.test(referer);
  const paintBrand = cameFromPaint
    ? findBrand(make.toLowerCase().trim().replace(/\s+/g, "-"))
    : undefined;
  const paintColorName = decoded?.listing?.displayColor;
  const likelyPaint = cameFromPaint
    ? likelyPaintCode(make, paintColorName)
    : null;

  const orderHref = `/order?vin=${encodeURIComponent(cleaned)}`;
  const exampleHref = "/full-report/1C4RJEAG0JC168184";

  /* ── Unsupported-VIN notice ───────────────────────────────────────────
     Shown in place of every buy CTA when ClearVin doesn't cover this VIN.
     Friendly tone — explains the situation without making the page feel
     broken. The buyer still sees whatever auto.dev was able to decode for
     free, just without the paywall.
     Defined as a value so we can drop it into 3-4 spots without
     duplicating the markup. */
  const unsupportedNotice = (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <Globe2 className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-amber-900">
            Full report not available for this VIN yet
          </p>
          <p className="mt-1.5 text-xs sm:text-sm text-amber-900 leading-relaxed">
            Our paid history report database doesn&apos;t cover this VIN —
            it&apos;s most likely a non-US vehicle or hasn&apos;t been added by
            our data provider yet. We&apos;ve shown all the free decoded
            information we could find below, including specs and market data
            where available. Try a different VIN or come back later.
          </p>
        </div>
      </div>
    </div>
  );

  /* ── Hero primary CTA ─────────────────────────────────────────────────
     Sits first in the hero action-button row so the buy button is visible
     above the fold, next to Download/Print/Share. Gold accent so it reads
     as THE primary action against the navy. Preview-only.
     When the VIN is unsupported we suppress this entirely — there is
     nothing to buy. (VinReport's heroCta is optional so passing undefined
     simply omits it from the action row.) */
  const heroCta = isUnsupported ? undefined : (
    <BuyReportButton className="flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-headline font-extrabold bg-white text-primary shadow-lg hover:bg-yellow-50 transition cursor-pointer">
      <Lock className="w-4 h-4" /> Get full report — ${SINGLE_PRICE.toFixed(2)}
    </BuyReportButton>
  );

  /* ── Free window-sticker promo ────────────────────────────────────────
     A "scratch-off coupon" styled banner pitching a free factory-style
     window sticker with the buyer's first report. The window-sticker
     generator is a flagship free tool on the site, so bundling it as a
     first-purchase gift is a creative, no-cost conversion sweetener.
     Rendered twice: in the empty navy hero space on desktop, and inline
     after the records card on mobile (where the hero version is hidden). */
  const stickerCoupon = (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary-fixed to-amber-200 text-primary shadow-xl shadow-black/25 ring-1 ring-white/40">
      {/* ticket perforation notches */}
      <span aria-hidden className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-primary" />
      <span aria-hidden className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-primary" />
      {/* soft sheen */}
      <span aria-hidden className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-white/30 blur-2xl" />

      <div className="flex items-stretch">
        {/* Left stub — the "gift" face of the coupon */}
        <div className="flex flex-col items-center justify-center gap-1 border-r-2 border-dashed border-primary/25 px-5 py-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-secondary-fixed shadow-md">
            <Receipt className="h-6 w-6" />
          </div>
          <span className="font-headline text-2xl font-black leading-none tracking-tight">FREE</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-primary/65">Bonus</span>
        </div>

        {/* Right body — the offer */}
        <div className="relative flex-1 px-4 py-3.5">
          <div className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-secondary-fixed">
            <Sparkles className="h-3 w-3" /> First-order gift
          </div>
          <h3 className="mt-2 flex items-center gap-1.5 font-headline text-[19px] font-extrabold leading-tight">
            <Gift className="h-4 w-4 flex-shrink-0" /> Free Window Sticker
          </h3>
          <p className="mt-1 text-[12px] font-semibold leading-snug text-primary/80">
            Buy your first report and we&apos;ll throw in a factory-style window
            sticker — Original MSRP, factory options &amp; EPA fuel economy — on us.
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary/60">
            <BadgeCheck className="h-3 w-3" /> Auto-applied at checkout
          </p>
        </div>
      </div>
    </div>
  );

  // Desktop: fills the empty navy space on the right of the hero.
  const heroPromo = (
    <div className="hidden lg:block w-[340px] flex-shrink-0 self-end">{stickerCoupon}</div>
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
      <div className="mt-6 lg:mt-8 rounded-2xl bg-white/[0.07] border border-white/15 p-4">
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

        {/* 4 locked record tiles + the free recall tile. Wraps to a 2-up grid
            on phones, then a single row from the small breakpoint up. */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
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

          {/* Recalls — the one record set shown free, as proof the data is real.
              Spans the full width on phones so it doesn't leave a lone gap. */}
          <div className="col-span-2 sm:col-span-1 rounded-xl bg-amber-400/15 border border-amber-300/25 px-3.5 py-2.5 flex flex-col justify-center">
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
    // On a live report with no auto.dev pricing, omit the card entirely rather
    // than showing fabricated "Example" figures. The example fallback only
    // renders in sample/dev mode (no ClearVin creds) so the panel stays
    // reviewable before AUTO_DEV_API_KEY is configured.
    if (isExample && !mock) return null;
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

      {/* Mobile-only bundle/prepaid-pack checkout — the desktop copy lives at
          the top of the sidebar (hidden on mobile, where the sidebar stacks far
          below the whole report). Surfaced here so phone buyers can pick a pack
          and check out straight to Stripe without scrolling to the bottom.
          Hidden when the VIN is unsupported — replaced with the friendly
          notice below the mobile MarketingCard slot. */}
      {!isUnsupported && (
        <div className="lg:hidden" data-buybar-hide data-bundle-target>
          <BundleUpsellCard vin={cleaned} vehicleLabel={vehicleLabel} />
        </div>
      )}

      {/* Mobile-only purchase card — surfaced right after the recalls so phone
          users see the offer without scrolling past the whole report. The
          desktop copy lives in the sticky sidebar (hidden on mobile).
          Replaced by the unsupported-VIN notice when ClearVin doesn't
          cover the VIN; the page still shows the decoded auto.dev data
          above (specs, photos, market analysis) — just without the buy CTA. */}
      <div className="lg:hidden">
        {isUnsupported ? (
          unsupportedNotice
        ) : (
          <MarketingCard
            make={make}
            vehicleLabel={vehicleLabel}
            vin={cleaned}
            price={SINGLE_PRICE.toFixed(2)}
            exampleHref={exampleHref}
          />
        )}
      </div>

      {/* Free window-sticker bonus — phone users don't see the hero version
          (desktop-only), so surface the same coupon here, right after the
          records/purchase card. */}
      <div className="lg:hidden">{stickerCoupon}</div>

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

      {/* Paint code (estimated) — only when the buyer arrived from the
          paint-code lookup/finder tools. Paint codes are never encoded in the
          VIN, so this is a best-effort estimate clearly labeled as such. */}
      {cameFromPaint && (
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-headline font-extrabold text-primary">
              Paint code{make ? ` for your ${make}` : ""}{" "}
              <span className="text-secondary-container">(estimated)</span>
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant mb-5 max-w-2xl">
            A factory paint code is <strong>not</strong> stored in the VIN, so
            it can&apos;t be decoded from the 17 characters alone. The exact code
            lives on a sticker on the car. Based on this vehicle&apos;s details,
            here&apos;s our best estimate of what it <em>may</em> be and exactly
            where to find the real one.
          </p>

          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6 space-y-5">
            {/* Likely code — only when we could match the color name */}
            {likelyPaint ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-1">
                  Likely paint code (estimate — verify on the car)
                </p>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-mono font-extrabold text-2xl text-amber-900">
                    {likelyPaint.code}
                  </span>
                  <span className="text-sm font-semibold text-amber-900">
                    {likelyPaint.matchedName}
                  </span>
                </div>
                <p className="mt-2 text-xs text-amber-900 leading-relaxed">
                  This is matched from the color on file
                  {paintColorName ? ` (“${paintColorName}”)` : ""} and may not be
                  exact — color names map to several codes across model years.
                  Always confirm against the sticker before ordering paint.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-outline-variant bg-surface-container p-4">
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  We couldn&apos;t confidently estimate a code for this VIN
                  {paintColorName ? ` (color on file: “${paintColorName}”)` : ""}.
                  The surest way is to read it directly off the car — here&apos;s
                  where to look.
                </p>
              </div>
            )}

            {/* Where to find the real code — brand-specific when known */}
            {paintBrand ? (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      Where to find it
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-on-surface">
                    {paintBrand.primaryLocation}
                  </p>
                  {paintBrand.secondaryLocations.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {paintBrand.secondaryLocations.map((loc) => (
                        <li
                          key={loc}
                          className="text-xs text-on-surface-variant flex items-start gap-1.5"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-outline flex-shrink-0 mt-0.5" />
                          {loc}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <FileText className="w-4 h-4 text-primary" />
                    <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      What it looks like
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-on-surface">
                    {paintBrand.stickerLabel}
                  </p>
                  <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">
                    {paintBrand.codeFormat}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-on-surface-variant leading-relaxed">
                On most vehicles the paint code is on a sticker in the
                driver-side door jamb, the spare-tire well, or under the hood —
                look for a row labeled “Color,” “Paint,” or “EXT.”
              </p>
            )}

            {/* CTAs back to the dedicated tools */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/paint-code-lookup"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-on-primary hover:opacity-90 transition"
              >
                <Palette className="w-4 h-4" />
                Full paint-code guide
              </Link>
              <Link
                href="/paint-code-finder"
                className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant px-4 py-2 text-sm font-bold text-on-surface hover:bg-surface-container transition"
              >
                Find by make &amp; model
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );

  /* ── Paywall card that replaces the AI block in the sidebar ──
     Desktop-only: on mobile the sidebar renders far below the whole main
     column, so an inline copy is shown right after the recalls section
     instead (see premiumSections). Sits in normal flow directly beneath the
     Market Analysis panel — not sticky, so it never overlaps the Report
     Summary that follows it in the sidebar. */
  // Desktop sidebar paywall card. When the VIN is unsupported we replace
  // the MarketingCard with the same friendly notice + drop the satisfaction-
  // guarantee laurel (which only makes sense next to a CTA).
  const sidebarCard = (
    <div className="hidden lg:block">
      {isUnsupported ? (
        unsupportedNotice
      ) : (
        <>
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
        </>
      )}
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
        mainTop={contextBanner}
        mainExtra={premiumSections}
        mainFiller={
          <ReportColumnFiller>
            <div className="h-full rounded-3xl border border-outline-variant bg-gradient-to-br from-primary/[0.06] to-surface-container-lowest p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline font-extrabold text-lg text-on-surface mb-1.5">
                No surprises before you buy
              </h3>
              <p className="text-sm text-on-surface-variant max-w-xs mb-4">
                Unlock the full NMVTIS title history, accident, odometer and
                ownership records for this {vehicleLabel}.
              </p>
              <BuyReportButton className="inline-flex items-center justify-center gap-2 bg-primary text-white rounded-2xl px-6 py-3 font-headline font-extrabold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors cursor-pointer">
                <Lock className="w-4 h-4" /> See the full report — ${SINGLE_PRICE.toFixed(2)}
              </BuyReportButton>
            </div>
          </ReportColumnFiller>
        }
        sidebarReplaceAI={sidebarCard}
        lockedPhotoCount={lockedPhotoCount}
        lockListing={!!reportData.listing}
        unlockHref={orderHref}
        summaryGroups={SUMMARY_GROUPS}
        heroAside={heroAside}
        heroCta={heroCta}
        heroPromo={heroPromo}
        summaryTop={summaryTop}
        sidebarTop={
          // Desktop sidebar bundle upsell. Hidden when the VIN is
          // unsupported (the unsupportedNotice already lives in
          // sidebarCard below; no need for two notices stacked).
          isUnsupported ? undefined : (
            <div className="hidden lg:block" data-bundle-target>
              <BundleUpsellCard vin={cleaned} vehicleLabel={vehicleLabel} />
            </div>
          )
        }
        sidebarBottom={<div className="hidden lg:block">{faqSection}</div>}
        lockActions
        unlockPrice={SINGLE_PRICE}
        previewSignals={previewSignals}
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
            <a
              href="https://www.trustpilot.com/review/www.carcheckervin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="See CarCheckerVIN reviews on Trustpilot (opens in a new tab)"
              className="mt-2 inline-flex items-center justify-center gap-1 rounded-full border border-[#00B67A] px-3 py-1 text-[11px] font-bold text-[#00B67A] hover:bg-[#00B67A] hover:text-white transition-colors"
            >
              See reviews
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 text-center">
            <Crown className="w-6 h-6 text-primary mx-auto mb-1.5" />
            <div className="text-sm font-bold text-on-surface">30-day money-back</div>
            <div className="text-[11px] text-on-surface-variant">Full refund guarantee</div>
          </div>
        </section>

        {/* "What you get the moment you pay" full-width paywall. Hidden
            entirely for unsupported VINs — keeping it would have the
            same "Get full report" buttons that the rest of the page
            already suppressed. The unsupportedNotice in the sidebar
            (desktop) and inline (mobile) already communicates the
            situation. */}
        {!isUnsupported && (
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
        )}

        {/* Purchase & report FAQ — mobile only; on desktop it renders under the
            Report Summary in the sidebar (VinReport sidebarBottom). */}
        <div className="lg:hidden">{faqSection}</div>

        {/* Check Another Vehicle — moved here, under the final CTA */}
        <section className="bg-primary text-white rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 text-center relative overflow-hidden shadow-sm">
          <h2 className="font-headline font-extrabold text-lg sm:text-xl text-white mb-2">Check Another Vehicle</h2>
          <p className="text-sm sm:text-base text-white/75 mb-5 sm:mb-6">Enter a different VIN to generate a new report</p>
          <div className="max-w-lg mx-auto">
            <VinSearchForm size="sm" />
          </div>
        </section>
      </div>

      {/* Sticky mobile CTA — solid (no backdrop-blur) and forced onto its own
          GPU layer (transform-gpu + isolate). A translucent `backdrop-filter`
          bar is the classic trigger for iOS Safari dropping `position: fixed`
          elements mid-scroll (it vanished when the bundle card's form scrolled
          into view); an opaque, isolated layer paints reliably.
          StickyBuyBar hides it whenever an in-page checkout block
          (`data-buybar-hide`, e.g. the bundle card) is on screen, so the
          floating bar never duplicates the section's own order buttons.
          Suppressed entirely for unsupported VINs — the sticky bar is the
          most aggressive of all the paywall surfaces, hovering above the
          bottom of the page on phones; leaving it visible while every
          other CTA is hidden would be the worst dark-pattern signal. */}
      {!isUnsupported && (
        <StickyBuyBar className="fixed bottom-0 inset-x-0 z-40 lg:hidden isolate transform-gpu bg-surface border-t border-outline-variant px-4 pt-2.5 pb-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
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
        </StickyBuyBar>
      )}
    </div>
  );
}
