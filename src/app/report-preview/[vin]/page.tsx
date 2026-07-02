import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
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
  Globe2,
  Palette,
  MapPin,
  Waves,
  Bike,
  Citrus,
  Info,
} from "lucide-react";
import { cookies, headers } from "next/headers";
import { detectLocale, isLocale, type Locale } from "@/i18n/config";
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
import BrandLogo from "@/components/BrandLogo";
import ReportPreviewExperiment from "./ReportPreviewExperiment";
import { RP_AB_COOKIE, isRpAbVariant, type RpAbVariant } from "@/lib/report-ab";
import { fetchVehicleSpecs, type VehicleSpec } from "@/lib/vpic-specs";
import VehicleSpecs from "./VehicleSpecs";

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
  // `from` carries the source-page slug for the contextual "message match"
  // banner (see src/lib/report-context.ts). Optional — the report is fully
  // functional without it, and generateMetadata ignores it.
  // `rp_nophoto` is a dev-only preview flag (see below) — ignored in production.
  searchParams?: Promise<{ from?: string; rp_nophoto?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vin } = await params;
  // Locale detection mirrors the page-level mechanism below (x-locale header
  // set by the proxy when the request came in under /es or /fr).
  const h = await headers();
  const localeHeader = h.get("x-locale") || "";
  const locale: Locale = isLocale(localeHeader) ? localeHeader : "en";
  const c = COPY[locale];
  return {
    title: c.metaTitle(vin.toUpperCase()),
    description: c.metaDescription,
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
  // ClearVin's FREE preview already carries manufacturer pricing for this VIN
  // (vinSpec.msrp / vinSpec.invoice) — so the Valuation card shows real,
  // VIN-specific figures without ever spending a credit on the paid report.
  // The strings may arrive as "$31,545", "31545.00" or "" — parse to a clean
  // integer and treat anything unparseable as absent (0 → row hidden).
  const parseUsd = (v: string | null | undefined): number => {
    if (!v) return 0;
    const n = Number(String(v).replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) && n > 0 ? Math.round(n) : 0;
  };
  const baseMsrp = parseUsd(s.msrp);
  const baseInvoice = parseUsd(s.invoice);
  const clearVinPrice =
    baseMsrp > 0 || baseInvoice > 0
      ? {
          baseMsrp,
          baseInvoice,
          deliveryCharges: 0,
          usedTmvRetail: 0,
          usedPrivateParty: 0,
          usedTradeIn: 0,
          estimateTmv: false,
        }
      : undefined;
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
    price: clearVinPrice,
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
   under the car info. Counts come live from ClearVin when present.
   Damage & auction counts are the two signals ClearVin returns in the free
   preview, so we keep an explicit 0 (rather than collapsing to null) — a real
   "0 found" lets the card show a reassuring "None reported" badge for clean
   cars instead of a bare lock. The other four stay null (genuinely unknown
   until unlocked). */
/**
 * The locked record categories surfaced in the "Premium vehicle history"
 * section. Each renders as a competitor-style teaser card: a header with a
 * status pill + a BLURRED skeleton of the underlying data so the buyer sees
 * the *shape* of what's on file (how many accidents, an ownership timeline,
 * title rows, damage photos) without the answer. This drives urgency without
 * giving the result away for free.
 *
 * `count` carries a *confirmed* finding from the free preview:
 *   - number > 0 → real signal we can truthfully count ("3 found").
 *   - null       → checked in the paid report, result not shown for free.
 * We never surface a "0 / none" result, so a clean category keeps its mystery
 * (and a real finding still gets the high-urgency red badge).
 *
 * `body` picks the blurred skeleton style — each one shows VISIBLE descriptive
 * labels (entry headings + field names) with only the VALUES blurred, so the
 * buyer reads the *shape* of the data (like GoodCar's preview) without the
 * answer:
 *   - "photos"   → entries with a blurred thumbnail + labelled fields
 *                  (accidents, auctions).
 *   - "timeline" → an owner dot-timeline with labelled stops (ownership).
 *   - "grid"     → a named flag grid (major-problem screening).
 *   - "rows"     → labelled record rows (titles, odometer).
 * `entry` is the per-row heading prefix; `fields` are the visible column labels
 * shown next to each blurred value.
 */
type RecordBody = "rows" | "photos" | "timeline" | "grid";
function lockedRecords(p: ClearVinPreview | null, locale: Locale = "en") {
  const c = COPY[locale];
  return [
    {
      icon: AlertTriangle,
      label: c.accidentDamage,
      note: c.accidentDamageNote,
      count: p ? p.damagesCount : null,
      rows: 3,
      body: "photos" as RecordBody,
      entry: c.entryAccident,
      fields: [c.fieldDate, c.fieldDamage, c.fieldState],
    },
    {
      icon: FileText,
      label: c.titleRecords,
      note: c.titleRecordsNote,
      count: null as number | null,
      rows: 3,
      body: "rows" as RecordBody,
      entry: c.entryTitle,
      fields: [c.fieldState, c.fieldOdometer, c.fieldIssueDate],
    },
    {
      icon: Users,
      label: c.ownershipHistory,
      note: c.ownershipHistoryNote,
      count: null,
      rows: 3,
      body: "timeline" as RecordBody,
      entry: c.entryOwner,
      fields: [c.fieldYears, c.fieldType, c.fieldLocation],
    },
    {
      icon: Gavel,
      label: c.salesAuction,
      note: c.salesAuctionNote,
      count: p ? p.auctionHistoryRecords : null,
      rows: 3,
      body: "photos" as RecordBody,
      entry: c.entrySale,
      fields: [c.fieldFoundAt, c.fieldDate, c.fieldPrice],
    },
    {
      icon: Gauge,
      label: c.odometerReadings,
      note: c.odometerReadingsNote,
      count: null,
      rows: 3,
      body: "rows" as RecordBody,
      entry: c.entryReading,
      fields: [c.fieldDate, c.fieldMileage, c.fieldSource],
    },
    {
      icon: Skull,
      label: c.majorProblems,
      note: c.majorProblemsNote,
      count: null,
      rows: 4,
      body: "grid" as RecordBody,
      entry: c.entryCheck,
      fields: [c.fieldSalvage, c.fieldTotalLoss, c.fieldLemon, c.fieldRebuilt],
    },
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

/* Screen-4 "every record your report checks" grid.
   `key` is the COPY key for the localised label. */
const RECORDS_CHECKED = [
  { icon: AlertTriangle, key: "accidentHistory" as const },
  { icon: Banknote, key: "liensLoans" as const },
  { icon: FileText, key: "titleHistory" as const },
  { icon: Users, key: "ownershipRecords" as const },
  { icon: Gauge, key: "odometerRecords" as const },
  { icon: Wrench, key: "salvageRecords" as const },
  { icon: Receipt, key: "salesHistory" as const },
  { icon: Skull, key: "totalLossEvents" as const },
  { icon: ShieldAlert, key: "openRecalls" as const },
  { icon: BadgeCheck, key: "lemonCheck" as const },
];

/* Screen-4 "your report may contain" 16-item green checklist.
   `key` is the COPY key for the localised label. */
const MAY_CONTAIN = [
  { icon: AlertTriangle, key: "majorAccident" as const },
  { icon: Gauge, key: "mileageRollback" as const },
  { icon: Hammer, key: "frameDamage" as const },
  { icon: Car, key: "leaseTaxi" as const },
  { icon: FileText, key: "rebuiltBranded" as const },
  { icon: ShieldCheck, key: "policeGov" as const },
  { icon: Users, key: "ownerHistory" as const },
  { icon: Wrench, key: "salvageHistory" as const },
  { icon: Skull, key: "junked" as const },
  { icon: Flame, key: "airbagDeployment" as const },
  { icon: Fingerprint, key: "vehicleSpecs" as const },
  { icon: BadgeCheck, key: "warrantyInfo" as const },
  { icon: Receipt, key: "saleHistory" as const },
  { icon: ScrollText, key: "billOfSale" as const },
  { icon: KeyRound, key: "lemonCheck2" as const },
  { icon: Banknote, key: "theftRecovery" as const },
];

/* Everything the buyer gets — shown as the premium Report Summary in the
   sidebar, grouped with titles. Stored as keys so each group/item can be
   localised via COPY. */
const SUMMARY_GROUPS_KEYS = [
  { title: "titleOwnership" as const, items: ["titleBrandCheck", "ownershipHistory", "numberOfOwners", "usageType"] as const },
  { title: "conditionDamage" as const, items: ["accidentDamage", "salvageTotalLoss", "airbagDeployment", "frameDamage"] as const },
  { title: "mileageLegal" as const, items: ["odometerReadings", "rollbackDetection", "openLiens", "lemonCheck"] as const },
  { title: "valueMarket" as const, items: ["marketValue", "originalMsrp", "warrantyInfo"] as const },
  { title: "recordsMedia" as const, items: ["auctionRecords", "allPhotos", "openSafetyRecalls", "downloadablePdf"] as const },
];

/* ─── Localised copy for the report-preview page ──────────────────────────
   Every visible English string has a key here; the page component picks
   `COPY[locale]` once and uses `c.<key>` throughout. */
const COPY = {
  en: {
    // Locked-record card labels (lockedRecords())
    accidentDamage: "Accident & damage",
    accidentDamageNote: "Collisions, severity & damage photos",
    titleRecords: "Title records",
    titleRecordsNote: "Brands, state & odometer at title",
    ownershipHistory: "Ownership history",
    ownershipHistoryNote: "Owners, usage type & timeline",
    salesAuction: "Sales & auction history",
    salesAuctionNote: "Sale price, location & dates",
    odometerReadings: "Odometer readings",
    odometerReadingsNote: "Rollback & mileage timeline",
    majorProblems: "Major problems",
    majorProblemsNote: "Salvage · total loss · lemon · rebuilt",
    fieldDate: "Date",
    fieldDamage: "Damage",
    fieldState: "State",
    fieldOdometer: "Odometer",
    fieldIssueDate: "Issue date",
    fieldYears: "Years",
    fieldType: "Type",
    fieldLocation: "Location",
    fieldFoundAt: "Found at",
    fieldPrice: "Price",
    fieldMileage: "Mileage",
    fieldSource: "Source",
    fieldSalvage: "Salvage",
    fieldTotalLoss: "Total loss",
    fieldLemon: "Lemon",
    fieldRebuilt: "Rebuilt title",
    entryAccident: "Accident",
    entryTitle: "Title",
    entryOwner: "Owner",
    entrySale: "Sale",
    entryReading: "Reading",
    entryCheck: "Check",
    // Records-checked grid (RECORDS_CHECKED)
    accidentHistory: "Accident History",
    liensLoans: "Liens & Loans",
    titleHistory: "Title History",
    ownershipRecords: "Ownership Records",
    odometerRecords: "Odometer Records",
    salvageRecords: "Salvage Records",
    salesHistory: "Sales History",
    totalLossEvents: "Total Loss Events",
    openRecalls: "Open Recalls",
    lemonCheck: "Lemon Check",
    // May-contain checklist (MAY_CONTAIN)
    majorAccident: "Major Accident",
    mileageRollback: "Mileage Rollback",
    frameDamage: "Frame Damage",
    leaseTaxi: "Lease & Taxi Use",
    rebuiltBranded: "Rebuilt / Branded Title",
    policeGov: "Police & Government Use",
    ownerHistory: "Owner History",
    salvageHistory: "Salvage History",
    junked: "Junked",
    airbagDeployment: "Airbag Deployment",
    vehicleSpecs: "Vehicle Specifications",
    warrantyInfo: "Warranty Information",
    saleHistory: "Sale History",
    billOfSale: "Bill of Sale Template",
    lemonCheck2: "Lemon Check",
    theftRecovery: "Theft & Recovery Check",
    // SUMMARY_GROUPS_KEYS titles
    titleOwnership: "Title & Ownership",
    conditionDamage: "Condition & Damage",
    mileageLegal: "Mileage & Legal",
    valueMarket: "Value & Market",
    recordsMedia: "Records & Media",
    // SUMMARY_GROUPS_KEYS items
    titleBrandCheck: "Title Brand Check",
    numberOfOwners: "Number of Owners",
    usageType: "Usage Type",
    accidentDamageRecords: "Accident & Damage Records",
    salvageTotalLoss: "Salvage / Total-Loss Check",
    rollbackDetection: "Rollback Detection",
    openLiens: "Open Liens",
    marketValue: "Market Value",
    originalMsrp: "Original MSRP & Invoice",
    auctionRecords: "Auction Records & Prices",
    allPhotos: "All Photos on File",
    openSafetyRecalls: "Open Safety Recalls",
    downloadablePdf: "Downloadable PDF",
    // Error / no records
    noRecordsHeading: "No records for this VIN",
    noRecordsBody: (vin: string) =>
      `We couldn't locate any records for ${vin}. Double-check the VIN and try again.`,
    tryAnotherVin: "Try another VIN",
    // Finding banner
    recordsFoundOnVin: "Records found on this VIN",
    looksClean: "Looks clean — confirm before you buy",
    findingHeadlineAlerts: (vehicleLabel: string, parts: string[]) =>
      `This ${vehicleLabel} has ${parts.join(" and ")} on file`,
    findingHeadlineClean: "No damage or auction sales in this free preview — verify before you buy",
    findingBodyAlerts:
      "Title brands, liens, odometer rollbacks and ownership records aren't shown here either. Unlock the full NMVTIS report to see the complete picture before you pay the seller's price.",
    findingBodyClean: (vehicleLabel: string) =>
      `Title brands, liens, odometer rollbacks and ownership history aren't shown in the free preview. Confirm this ${vehicleLabel} is genuinely clean, in writing, before you pay.`,
    damageRecord: (n: number) => `${n} damage record${n === 1 ? "" : "s"}`,
    priorAuctionSale: (n: number) => `${n} prior auction sale${n === 1 ? "" : "s"}`,
    openSafetyRecallsCount: (n: number) => `${n} open safety recall${n === 1 ? "" : "s"}`,
    alsoReportedFree: " also reported (shown free below).",
    unlockFullReportPrice: (price: string) => `Unlock the full report — $${price}`,
    unlockFullReportAria: "Unlock the full vehicle history report",
    // Unsupported VIN notice
    unsupportedTitle: "Full report not available for this VIN yet",
    unsupportedBody:
      "Our paid history report database doesn't cover this VIN — it's most likely a non-US vehicle or hasn't been added by our data provider yet. We've shown all the free decoded information we could find below, including specs and market data where available. Try a different VIN or come back later.",
    // Hero CTA
    getFullReport: (price: string) => `Get full report — $${price}`,
    // Recalls section
    openSafetyRecall: (n: number) => `${n} open safety recall${n === 1 ? "" : "s"}`,
    shownFreeSuffix: (n: number) => (n > 2 ? " — 2 shown free" : " — shown free"),
    summary: "Summary",
    risk: "Risk",
    remedy: "Remedy",
    unlockRecalls: (n: number) => `Unlock ${n} more recall${n === 1 ? "" : "s"}`,
    unlockRecallsAria: (n: number) => `Unlock ${n} more open safety recalls`,
    recallsBridgeTitle: "Recalls are only the public layer",
    recallsBridgeBody:
      "Accidents, title brands, odometer history, owners & liens are in your full report.",
    recallsBridgeAria: "Unlock accident, title and ownership records",
    // Premium vehicle history
    premiumBadge: "Premium vehicle history",
    historyRecordsHeading: (n: number, make: string) =>
      `${n} history record${n === 1 ? "" : "s"} on file for this ${make}`,
    unlockHistoryHeading: "Unlock the full vehicle history",
    premiumIntro:
      "The specs below are free. Title brands, accidents, odometer and ownership records are revealed in the full report.",
    weFoundLead: "We found ",
    historyRecordsCount: (n: number) =>
      `${n} history record${n === 1 ? "" : "s"}`,
    onYourVehicle: " on your vehicle.",
    unlockFullReport: "Unlock the full report",
    foundBadge: (n: number) => `${n} found`,
    infoAvailable: "Info available",
    viewAll: "View all",
    unlockInCardAria: (label: string) => `Unlock ${label} in the full report`,
    // Report Summary card
    reportSummary: "Report Summary",
    reportSummaryNote: (vehicleLabel: string) =>
      `Everything the full report on this ${vehicleLabel} unlocks.`,
    included: "✓ Included",
    // Your report contains
    yourReportContains: "Your report contains",
    yourReportContainsNote: (make: string) =>
      `Here's everything you could uncover about this ${make} before you buy.`,
    // Every record your report checks
    everyRecordHeading: "Every record your report checks",
    everyRecordBody: (make: string) =>
      `Your ${make} report is cross-checked against billions of records from thousands of trusted sources nationwide.`,
    vehicle: "vehicle",
    // Paint code
    paintCodeFor: (make: string) => `Paint code${make ? ` for your ${make}` : ""}`,
    paintCodeEstimated: "(estimated)",
    paintCodeIntro:
      "A factory paint code is not stored in the VIN, so it can't be decoded from the 17 characters alone. The exact code lives on a sticker on the car. Based on this vehicle's details, here's our best estimate of what it may be and exactly where to find the real one.",
    likelyPaint: "Likely paint code (estimate — verify on the car)",
    matchedColorNote: (color: string | null | undefined) =>
      `This is matched from the color on file${color ? ` (“${color}”)` : ""} and may not be exact — color names map to several codes across model years. Always confirm against the sticker before ordering paint.`,
    noConfidentEstimate: (color: string | null | undefined) =>
      `We couldn't confidently estimate a code for this VIN${color ? ` (color on file: “${color}”)` : ""}. The surest way is to read it directly off the car — here's where to look.`,
    whereToFind: "Where to find it",
    whatItLooksLike: "What it looks like",
    paintFallback:
      "On most vehicles the paint code is on a sticker in the driver-side door jamb, the spare-tire well, or under the hood — look for a row labeled “Color,” “Paint,” or “EXT.”",
    fullPaintGuide: "Full paint-code guide",
    findByMakeModel: "Find by make & model",
    // Market analysis
    marketAnalysis: "Market Analysis",
    example: "Example",
    avgMarketPrice: "Avg. Market Price",
    priceRange: "Price Range",
    activeListings: "Active Listings",
    avgMileage: "Avg. Mileage",
    pricingForYear: "Manufacturer & guide pricing for this year, make & model.",
    exampleFigures: "Example figures — live pricing loads from auto.dev once configured.",
    originalMSRPLabel: "Original MSRP",
    dealerInvoice: "Dealer Invoice",
    usedRetail: "Used Retail",
    privateParty: "Private Party",
    tradeIn: "Trade-In",
    // Vehicle details / VIN label
    vinLabel: "VIN:",
    // Sample data banner
    sampleDataPre: "Sample data — set the ",
    sampleDataAnd: " / ",
    sampleDataSuffix: " production credentials to load live records for this VIN.",
    // Right column "no surprises"
    noSurprisesTitle: "No surprises before you buy",
    noSurprisesBody: (vehicleLabel: string) =>
      `Unlock the full NMVTIS title history, accident, odometer and ownership records for this ${vehicleLabel}.`,
    seeFullReport: (price: string) => `See the full report — $${price}`,
    // Trust band
    nhtsaRecall: "NHTSA recall data",
    nhtsaRecallSub: "Official safety source",
    nmvtisBacked: "NMVTIS-backed",
    nmvtisBackedSub: "Federal title records",
    ratedExcellent: "Rated Excellent",
    onTrustpilot: "on Trustpilot",
    seeReviews: "See reviews",
    moneyBack: "30-day money-back",
    moneyBackSub: "Full refund guarantee",
    seeReviewsAria: "See CarCheckerVIN reviews on Trustpilot (opens in a new tab)",
    // Final paywall
    whatYouGet: "What you get the moment you pay",
    finalHeadline: (vehicleLabel: string) =>
      `Full ${vehicleLabel} history report — unlocked instantly`,
    finalBody:
      "Your complete NMVTIS-backed report renders in seconds: title brands, accident & damage records, odometer timeline, ownership history, auction photos and a downloadable PDF you can keep.",
    viewSampleReport: "View sample report",
    finalFooter: "One-time payment · No subscription · 30-day money-back guarantee",
    // FAQ
    faqHeading: "FAQ",
    faqs: (vehicleLabel: string, price: string) =>
      [
        {
          q: "What's included in the full report?",
          a: `Your ${vehicleLabel} report compiles every record on file: title brands (salvage, junk, flood, lemon), reported accidents and damage, the odometer timeline with rollback checks, ownership history and number of owners, open liens, theft and total-loss records, market values, warranty status, auction sale history and all photos on file — plus a downloadable PDF you can keep.`,
        },
        {
          q: "Will I be billed monthly?",
          a: `No. CarCheckerVin does not offer monthly recurring subscriptions and does not use automated recurring billing. You pay a single one-time fee of $${price} for this report — your access simply ends when your access pass expires, with nothing further to cancel.`,
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
      ] as const,
    // Sticky bar
    satisfactionGuarantee: "100% Satisfaction Guarantee · Full refund if you're not satisfied",
    viewSampleFirst: "View sample report first",
    // Check another vehicle
    checkAnother: "Check Another Vehicle",
    checkAnotherSub: "Enter a different VIN to generate a new report",
    // Satisfaction laurel
    satisfaction: "Satisfaction",
    guarantee: "Guarantee",
    // Generate metadata
    metaTitle: (vin: string) => `Vehicle History Report — ${vin}`,
    metaDescription:
      "Unlock the full NMVTIS-backed vehicle history report for this VIN — title brands, accidents, odometer, ownership and more.",
  },
  es: {
    accidentDamage: "Accidente y daños",
    accidentDamageNote: "Colisiones, gravedad y fotos de daños",
    titleRecords: "Registros de título",
    titleRecordsNote: "Marcas, estado y odómetro al titular",
    ownershipHistory: "Historial de propietarios",
    ownershipHistoryNote: "Dueños, tipo de uso y línea de tiempo",
    salesAuction: "Historial de ventas y subastas",
    salesAuctionNote: "Precio de venta, ubicación y fechas",
    odometerReadings: "Lecturas del odómetro",
    odometerReadingsNote: "Retroceso y línea de tiempo de kilometraje",
    majorProblems: "Problemas mayores",
    majorProblemsNote: "Salvamento · pérdida total · lemon · reconstruido",
    fieldDate: "Fecha",
    fieldDamage: "Daño",
    fieldState: "Estado",
    fieldOdometer: "Odómetro",
    fieldIssueDate: "Fecha de emisión",
    fieldYears: "Años",
    fieldType: "Tipo",
    fieldLocation: "Ubicación",
    fieldFoundAt: "Encontrado en",
    fieldPrice: "Precio",
    fieldMileage: "Kilometraje",
    fieldSource: "Fuente",
    fieldSalvage: "Salvamento",
    fieldTotalLoss: "Pérdida total",
    fieldLemon: "Lemon",
    fieldRebuilt: "Título reconstruido",
    entryAccident: "Accidente",
    entryTitle: "Título",
    entryOwner: "Dueño",
    entrySale: "Venta",
    entryReading: "Lectura",
    entryCheck: "Verificación",
    accidentHistory: "Historial de accidentes",
    liensLoans: "Gravámenes y préstamos",
    titleHistory: "Historial de título",
    ownershipRecords: "Registros de propiedad",
    odometerRecords: "Registros de odómetro",
    salvageRecords: "Registros de salvamento",
    salesHistory: "Historial de ventas",
    totalLossEvents: "Eventos de pérdida total",
    openRecalls: "Llamados a revisión abiertos",
    lemonCheck: "Verificación lemon",
    majorAccident: "Accidente grave",
    mileageRollback: "Retroceso de kilometraje",
    frameDamage: "Daño estructural",
    leaseTaxi: "Uso como leasing o taxi",
    rebuiltBranded: "Título reconstruido / marcado",
    policeGov: "Uso policial o gubernamental",
    ownerHistory: "Historial de dueños",
    salvageHistory: "Historial de salvamento",
    junked: "Chatarra",
    airbagDeployment: "Activación de airbag",
    vehicleSpecs: "Especificaciones del vehículo",
    warrantyInfo: "Información de garantía",
    saleHistory: "Historial de ventas",
    billOfSale: "Plantilla de factura de venta",
    lemonCheck2: "Verificación lemon",
    theftRecovery: "Verificación de robo y recuperación",
    titleOwnership: "Título y propiedad",
    conditionDamage: "Condición y daños",
    mileageLegal: "Kilometraje y legal",
    valueMarket: "Valor y mercado",
    recordsMedia: "Registros y multimedia",
    titleBrandCheck: "Verificación de marcas de título",
    numberOfOwners: "Número de dueños",
    usageType: "Tipo de uso",
    accidentDamageRecords: "Registros de accidentes y daños",
    salvageTotalLoss: "Verificación de salvamento / pérdida total",
    rollbackDetection: "Detección de retroceso",
    openLiens: "Gravámenes abiertos",
    marketValue: "Valor de mercado",
    originalMsrp: "MSRP original y factura",
    auctionRecords: "Registros y precios de subasta",
    allPhotos: "Todas las fotos en archivo",
    openSafetyRecalls: "Llamados de seguridad abiertos",
    downloadablePdf: "PDF descargable",
    noRecordsHeading: "Sin registros para este VIN",
    noRecordsBody: (vin: string) =>
      `No encontramos registros para ${vin}. Verifica el VIN e inténtalo de nuevo.`,
    tryAnotherVin: "Probar otro VIN",
    recordsFoundOnVin: "Registros encontrados en este VIN",
    looksClean: "Se ve limpio — confirma antes de comprar",
    findingHeadlineAlerts: (vehicleLabel: string, parts: string[]) =>
      `Este ${vehicleLabel} tiene ${parts.join(" y ")} en archivo`,
    findingHeadlineClean:
      "Sin daños ni ventas en subasta en esta vista previa gratis — verifica antes de comprar",
    findingBodyAlerts:
      "Aquí tampoco se muestran marcas de título, gravámenes, retrocesos de odómetro ni registros de propietarios. Desbloquea el reporte completo NMVTIS para ver el panorama completo antes de pagar el precio del vendedor.",
    findingBodyClean: (vehicleLabel: string) =>
      `Las marcas de título, gravámenes, retrocesos de odómetro y el historial de propietarios no se muestran en la vista previa gratis. Confirma por escrito que este ${vehicleLabel} esté realmente limpio antes de pagar.`,
    damageRecord: (n: number) => `${n} registro${n === 1 ? "" : "s"} de daño`,
    priorAuctionSale: (n: number) =>
      `${n} venta${n === 1 ? "" : "s"} previa${n === 1 ? "" : "s"} en subasta`,
    openSafetyRecallsCount: (n: number) =>
      `${n} llamado${n === 1 ? "" : "s"} de seguridad abierto${n === 1 ? "" : "s"}`,
    alsoReportedFree: " también reportado (mostrado gratis abajo).",
    unlockFullReportPrice: (price: string) => `Desbloquear el reporte completo — $${price}`,
    unlockFullReportAria: "Desbloquear el reporte completo de historial vehicular",
    unsupportedTitle: "El reporte completo aún no está disponible para este VIN",
    unsupportedBody:
      "Nuestra base de datos de reportes de pago no cubre este VIN — probablemente sea un vehículo no estadounidense o aún no haya sido agregado por nuestro proveedor de datos. Abajo mostramos toda la información gratuita que pudimos decodificar, incluidas especificaciones y datos de mercado cuando están disponibles. Prueba con otro VIN o vuelve más tarde.",
    getFullReport: (price: string) => `Obtén el reporte completo — $${price}`,
    openSafetyRecall: (n: number) =>
      `${n} llamado${n === 1 ? "" : "s"} de seguridad abierto${n === 1 ? "" : "s"}`,
    shownFreeSuffix: (n: number) => (n > 2 ? " — 2 mostrados gratis" : " — mostrado gratis"),
    summary: "Resumen",
    risk: "Riesgo",
    remedy: "Solución",
    unlockRecalls: (n: number) =>
      `Desbloquear ${n} llamado${n === 1 ? "" : "s"} más`,
    unlockRecallsAria: (n: number) =>
      `Desbloquear ${n} llamados de seguridad abiertos más`,
    recallsBridgeTitle: "Los llamados a revisión son solo la capa pública",
    recallsBridgeBody:
      "Accidentes, marcas de título, historial de odómetro, dueños y gravámenes están en tu reporte completo.",
    recallsBridgeAria: "Desbloquear registros de accidentes, título y propiedad",
    premiumBadge: "Historial vehicular premium",
    historyRecordsHeading: (n: number, make: string) =>
      `${n} registro${n === 1 ? "" : "s"} de historial en archivo para este ${make}`,
    unlockHistoryHeading: "Desbloquea el historial vehicular completo",
    premiumIntro:
      "Las especificaciones de abajo son gratis. Las marcas de título, accidentes, odómetro y registros de propiedad se revelan en el reporte completo.",
    weFoundLead: "Encontramos ",
    historyRecordsCount: (n: number) =>
      `${n} registro${n === 1 ? "" : "s"} de historial`,
    onYourVehicle: " sobre tu vehículo.",
    unlockFullReport: "Desbloquear el reporte completo",
    foundBadge: (n: number) => `${n} encontrado${n === 1 ? "" : "s"}`,
    infoAvailable: "Info disponible",
    viewAll: "Ver todo",
    unlockInCardAria: (label: string) =>
      `Desbloquear ${label} en el reporte completo`,
    reportSummary: "Resumen del reporte",
    reportSummaryNote: (vehicleLabel: string) =>
      `Todo lo que desbloquea el reporte completo sobre este ${vehicleLabel}.`,
    included: "✓ Incluido",
    yourReportContains: "Tu reporte contiene",
    yourReportContainsNote: (make: string) =>
      `Esto es todo lo que podrías descubrir sobre este ${make} antes de comprarlo.`,
    everyRecordHeading: "Cada registro que tu reporte verifica",
    everyRecordBody: (make: string) =>
      `Tu reporte de ${make} se contrasta con miles de millones de registros de miles de fuentes confiables a nivel nacional.`,
    vehicle: "vehículo",
    paintCodeFor: (make: string) => `Código de pintura${make ? ` para tu ${make}` : ""}`,
    paintCodeEstimated: "(estimado)",
    paintCodeIntro:
      "El código de pintura de fábrica no se almacena en el VIN, así que no se puede decodificar solo a partir de los 17 caracteres. El código exacto vive en una calcomanía del auto. Según los detalles de este vehículo, esta es nuestra mejor estimación de cuál podría ser y dónde encontrar el real.",
    likelyPaint: "Código de pintura probable (estimado — verifica en el auto)",
    matchedColorNote: (color: string | null | undefined) =>
      `Esto se basa en el color en archivo${color ? ` (“${color}”)` : ""} y puede no ser exacto — los nombres de color mapean a varios códigos según el año del modelo. Confirma siempre contra la calcomanía antes de pedir pintura.`,
    noConfidentEstimate: (color: string | null | undefined) =>
      `No pudimos estimar un código con confianza para este VIN${color ? ` (color en archivo: “${color}”)` : ""}. La forma más segura es leerlo directamente del auto — aquí te decimos dónde buscar.`,
    whereToFind: "Dónde encontrarlo",
    whatItLooksLike: "Cómo se ve",
    paintFallback:
      "En la mayoría de los vehículos el código de pintura está en una calcomanía en el marco de la puerta del conductor, en el hueco de la llanta de refacción o debajo del cofre — busca una fila con la etiqueta “Color”, “Paint” o “EXT.”",
    fullPaintGuide: "Guía completa de códigos de pintura",
    findByMakeModel: "Buscar por marca y modelo",
    marketAnalysis: "Análisis de mercado",
    example: "Ejemplo",
    avgMarketPrice: "Precio promedio",
    priceRange: "Rango de precio",
    activeListings: "Listados activos",
    avgMileage: "Kilometraje promedio",
    pricingForYear: "Precios del fabricante y guía para este año, marca y modelo.",
    exampleFigures:
      "Cifras de ejemplo — el precio en vivo se carga desde auto.dev una vez configurado.",
    originalMSRPLabel: "MSRP original",
    dealerInvoice: "Factura al concesionario",
    usedRetail: "Venta usado",
    privateParty: "Particular",
    tradeIn: "Trade-In",
    vinLabel: "VIN:",
    sampleDataPre: "Datos de muestra — define las credenciales de producción ",
    sampleDataAnd: " / ",
    sampleDataSuffix: " para cargar registros en vivo para este VIN.",
    noSurprisesTitle: "Sin sorpresas antes de comprar",
    noSurprisesBody: (vehicleLabel: string) =>
      `Desbloquea el historial completo de título NMVTIS, accidentes, odómetro y registros de propiedad de este ${vehicleLabel}.`,
    seeFullReport: (price: string) => `Ver el reporte completo — $${price}`,
    nhtsaRecall: "Datos NHTSA",
    nhtsaRecallSub: "Fuente oficial de seguridad",
    nmvtisBacked: "Respaldado por NMVTIS",
    nmvtisBackedSub: "Registros federales de título",
    ratedExcellent: "Calificado Excelente",
    onTrustpilot: "en Trustpilot",
    seeReviews: "Ver reseñas",
    moneyBack: "30 días de devolución",
    moneyBackSub: "Garantía de reembolso completo",
    seeReviewsAria:
      "Ver reseñas de CarCheckerVIN en Trustpilot (se abre en una pestaña nueva)",
    whatYouGet: "Lo que recibes en el momento de pagar",
    finalHeadline: (vehicleLabel: string) =>
      `Reporte completo de historial del ${vehicleLabel} — desbloqueado al instante`,
    finalBody:
      "Tu reporte completo respaldado por NMVTIS se carga en segundos: marcas de título, registros de accidente y daños, línea de tiempo del odómetro, historial de propietarios, fotos de subasta y un PDF descargable que puedes guardar.",
    viewSampleReport: "Ver reporte de muestra",
    finalFooter:
      "Pago único · Sin suscripción · 30 días de garantía de devolución",
    faqHeading: "Preguntas frecuentes",
    faqs: (vehicleLabel: string, price: string) =>
      [
        {
          q: "¿Qué incluye el reporte completo?",
          a: `Tu reporte del ${vehicleLabel} reúne todos los registros en archivo: marcas de título (salvamento, chatarra, inundación, lemon), accidentes y daños reportados, la línea de tiempo del odómetro con verificación de retroceso, historial de propietarios y número de dueños, gravámenes abiertos, robos y pérdidas totales, valores de mercado, garantía, historial de subastas y todas las fotos en archivo — además de un PDF descargable que puedes guardar.`,
        },
        {
          q: "¿Se me cobrará mensualmente?",
          a: `No. CarCheckerVin no ofrece suscripciones mensuales recurrentes ni utiliza cobros automáticos recurrentes. Pagas una tarifa única de $${price} por este reporte — tu acceso simplemente termina cuando expira tu pase, sin nada más que cancelar.`,
        },
        {
          q: "¿Por qué cobran por estos datos?",
          a: "Obtener un historial completo significa consultar bases de datos oficiales NMVTIS, casas de subasta, registros de pérdida total de aseguradoras y datos de llamados NHTSA — cada uno con un costo real por consulta. La tarifa única cubre ese acceso directo para que obtengas registros verificados y actualizados en lugar de adivinanzas.",
        },
        {
          q: "¿Qué vehículos puedo buscar?",
          a: "Casi cualquier auto, camioneta, SUV, van o motocicleta vendido en EE.UU. con un VIN estándar de 17 caracteres. Ingresa el VIN y mostraremos los registros en archivo de ese vehículo exacto.",
        },
        {
          q: "¿Recibiré un correo notificándome la compra?",
          a: "Sí. Una confirmación y un recibo se envían por correo justo después del pago, y tu reporte completo — incluido el PDF descargable — está disponible al instante en pantalla, así nunca tienes que esperar.",
        },
        {
          q: "¿Y si el reporte no ayuda — puedo obtener un reembolso?",
          a: "Estás cubierto por una garantía de devolución de 30 días. Si el reporte no cumple tus expectativas, contáctanos dentro de los 30 días posteriores a la compra y te haremos un reembolso completo — sin formularios complicados.",
        },
      ] as const,
    satisfactionGuarantee:
      "Garantía de satisfacción 100% · Reembolso completo si no quedas satisfecho",
    viewSampleFirst: "Ver reporte de muestra primero",
    checkAnother: "Verificar otro vehículo",
    checkAnotherSub: "Ingresa otro VIN para generar un nuevo reporte",
    satisfaction: "Garantía de",
    guarantee: "Satisfacción",
    metaTitle: (vin: string) => `Reporte de historial vehicular — ${vin}`,
    metaDescription:
      "Desbloquea el reporte completo de historial vehicular respaldado por NMVTIS para este VIN — marcas de título, accidentes, odómetro, propiedad y más.",
  },
  fr: {
    accidentDamage: "Accident et dommages",
    accidentDamageNote: "Collisions, gravité et photos des dommages",
    titleRecords: "Registres de titre",
    titleRecordsNote: "Mentions, État et odomètre au moment du titre",
    ownershipHistory: "Historique des propriétaires",
    ownershipHistoryNote: "Propriétaires, type d'usage et chronologie",
    salesAuction: "Historique des ventes et enchères",
    salesAuctionNote: "Prix de vente, lieu et dates",
    odometerReadings: "Relevés d'odomètre",
    odometerReadingsNote: "Recul et chronologie du kilométrage",
    majorProblems: "Problèmes majeurs",
    majorProblemsNote: "Épave · perte totale · lemon · reconstruit",
    fieldDate: "Date",
    fieldDamage: "Dommages",
    fieldState: "État",
    fieldOdometer: "Odomètre",
    fieldIssueDate: "Date d'émission",
    fieldYears: "Années",
    fieldType: "Type",
    fieldLocation: "Lieu",
    fieldFoundAt: "Trouvé chez",
    fieldPrice: "Prix",
    fieldMileage: "Kilométrage",
    fieldSource: "Source",
    fieldSalvage: "Épave",
    fieldTotalLoss: "Perte totale",
    fieldLemon: "Lemon",
    fieldRebuilt: "Titre reconstruit",
    entryAccident: "Accident",
    entryTitle: "Titre",
    entryOwner: "Propriétaire",
    entrySale: "Vente",
    entryReading: "Relevé",
    entryCheck: "Vérification",
    accidentHistory: "Historique des accidents",
    liensLoans: "Privilèges et prêts",
    titleHistory: "Historique du titre",
    ownershipRecords: "Registres de propriété",
    odometerRecords: "Registres d'odomètre",
    salvageRecords: "Registres d'épave",
    salesHistory: "Historique des ventes",
    totalLossEvents: "Événements de perte totale",
    openRecalls: "Rappels ouverts",
    lemonCheck: "Vérification lemon",
    majorAccident: "Accident grave",
    mileageRollback: "Recul du kilométrage",
    frameDamage: "Dommage de châssis",
    leaseTaxi: "Usage en leasing ou taxi",
    rebuiltBranded: "Titre reconstruit / mentionné",
    policeGov: "Usage police ou gouvernement",
    ownerHistory: "Historique des propriétaires",
    salvageHistory: "Historique d'épave",
    junked: "Mis à la ferraille",
    airbagDeployment: "Déploiement d'airbag",
    vehicleSpecs: "Spécifications du véhicule",
    warrantyInfo: "Informations de garantie",
    saleHistory: "Historique des ventes",
    billOfSale: "Modèle d'acte de vente",
    lemonCheck2: "Vérification lemon",
    theftRecovery: "Vérification de vol et récupération",
    titleOwnership: "Titre et propriété",
    conditionDamage: "État et dommages",
    mileageLegal: "Kilométrage et juridique",
    valueMarket: "Valeur et marché",
    recordsMedia: "Registres et médias",
    titleBrandCheck: "Vérification des mentions de titre",
    numberOfOwners: "Nombre de propriétaires",
    usageType: "Type d'usage",
    accidentDamageRecords: "Registres d'accidents et de dommages",
    salvageTotalLoss: "Vérification épave / perte totale",
    rollbackDetection: "Détection de recul",
    openLiens: "Privilèges ouverts",
    marketValue: "Valeur marchande",
    originalMsrp: "MSRP original et facture",
    auctionRecords: "Registres et prix d'enchères",
    allPhotos: "Toutes les photos en archive",
    openSafetyRecalls: "Rappels de sécurité ouverts",
    downloadablePdf: "PDF téléchargeable",
    noRecordsHeading: "Aucun registre pour ce VIN",
    noRecordsBody: (vin: string) =>
      `Nous n'avons trouvé aucun registre pour ${vin}. Vérifie le VIN et réessaie.`,
    tryAnotherVin: "Essayer un autre VIN",
    recordsFoundOnVin: "Registres trouvés sur ce VIN",
    looksClean: "Semble propre — vérifie avant d'acheter",
    findingHeadlineAlerts: (vehicleLabel: string, parts: string[]) =>
      `Ce ${vehicleLabel} a ${parts.join(" et ")} en archive`,
    findingHeadlineClean:
      "Pas de dommages ni de ventes aux enchères dans cet aperçu gratuit — vérifie avant d'acheter",
    findingBodyAlerts:
      "Les mentions de titre, privilèges, reculs d'odomètre et registres de propriété ne sont pas non plus affichés ici. Débloque le rapport NMVTIS complet pour voir l'ensemble avant de payer le prix demandé par le vendeur.",
    findingBodyClean: (vehicleLabel: string) =>
      `Les mentions de titre, privilèges, reculs d'odomètre et l'historique des propriétaires ne sont pas affichés dans l'aperçu gratuit. Confirme par écrit que ce ${vehicleLabel} est vraiment propre avant de payer.`,
    damageRecord: (n: number) => `${n} registre${n === 1 ? "" : "s"} de dommage`,
    priorAuctionSale: (n: number) =>
      `${n} vente${n === 1 ? "" : "s"} antérieure${n === 1 ? "" : "s"} aux enchères`,
    openSafetyRecallsCount: (n: number) =>
      `${n} rappel${n === 1 ? "" : "s"} de sécurité ouvert${n === 1 ? "" : "s"}`,
    alsoReportedFree: " également signalé (affiché gratuitement ci-dessous).",
    unlockFullReportPrice: (price: string) => `Débloquer le rapport complet — $${price}`,
    unlockFullReportAria: "Débloquer le rapport complet d'historique du véhicule",
    unsupportedTitle: "Rapport complet pas encore disponible pour ce VIN",
    unsupportedBody:
      "Notre base de données de rapports payants ne couvre pas ce VIN — il s'agit probablement d'un véhicule non américain ou il n'a pas encore été ajouté par notre fournisseur de données. Nous avons affiché ci-dessous toutes les informations gratuites que nous avons pu décoder, y compris les spécifications et les données de marché lorsqu'elles sont disponibles. Essaie un autre VIN ou reviens plus tard.",
    getFullReport: (price: string) => `Obtenir le rapport complet — $${price}`,
    openSafetyRecall: (n: number) =>
      `${n} rappel${n === 1 ? "" : "s"} de sécurité ouvert${n === 1 ? "" : "s"}`,
    shownFreeSuffix: (n: number) =>
      n > 2 ? " — 2 affichés gratuitement" : " — affiché gratuitement",
    summary: "Résumé",
    risk: "Risque",
    remedy: "Solution",
    unlockRecalls: (n: number) =>
      `Débloquer ${n} rappel${n === 1 ? "" : "s"} de plus`,
    unlockRecallsAria: (n: number) =>
      `Débloquer ${n} rappels de sécurité ouverts de plus`,
    recallsBridgeTitle: "Les rappels ne sont que la couche publique",
    recallsBridgeBody:
      "Accidents, mentions de titre, historique d'odomètre, propriétaires et privilèges sont dans ton rapport complet.",
    recallsBridgeAria: "Débloquer les registres d'accidents, de titre et de propriété",
    premiumBadge: "Historique véhicule premium",
    historyRecordsHeading: (n: number, make: string) =>
      `${n} registre${n === 1 ? "" : "s"} d'historique en archive pour ce ${make}`,
    unlockHistoryHeading: "Débloque l'historique complet du véhicule",
    premiumIntro:
      "Les spécifications ci-dessous sont gratuites. Les mentions de titre, accidents, odomètre et registres de propriété sont révélés dans le rapport complet.",
    weFoundLead: "Nous avons trouvé ",
    historyRecordsCount: (n: number) =>
      `${n} registre${n === 1 ? "" : "s"} d'historique`,
    onYourVehicle: " sur ton véhicule.",
    unlockFullReport: "Débloquer le rapport complet",
    foundBadge: (n: number) => `${n} trouvé${n === 1 ? "" : "s"}`,
    infoAvailable: "Info disponible",
    viewAll: "Tout voir",
    unlockInCardAria: (label: string) =>
      `Débloquer ${label} dans le rapport complet`,
    reportSummary: "Résumé du rapport",
    reportSummaryNote: (vehicleLabel: string) =>
      `Tout ce que le rapport complet sur ce ${vehicleLabel} débloque.`,
    included: "✓ Inclus",
    yourReportContains: "Ton rapport contient",
    yourReportContainsNote: (make: string) =>
      `Voici tout ce que tu pourrais découvrir sur ce ${make} avant d'acheter.`,
    everyRecordHeading: "Chaque registre vérifié par ton rapport",
    everyRecordBody: (make: string) =>
      `Ton rapport ${make} est recoupé avec des milliards de registres provenant de milliers de sources fiables à l'échelle nationale.`,
    vehicle: "véhicule",
    paintCodeFor: (make: string) =>
      `Code de peinture${make ? ` pour ton ${make}` : ""}`,
    paintCodeEstimated: "(estimé)",
    paintCodeIntro:
      "Un code de peinture d'usine n'est pas stocké dans le VIN, il ne peut donc pas être décodé à partir des 17 caractères seuls. Le code exact se trouve sur un autocollant de la voiture. D'après les détails de ce véhicule, voici notre meilleure estimation de ce qu'il pourrait être et où trouver le vrai.",
    likelyPaint: "Code de peinture probable (estimé — vérifie sur la voiture)",
    matchedColorNote: (color: string | null | undefined) =>
      `Cette estimation est basée sur la couleur en archive${color ? ` (« ${color} »)` : ""} et peut ne pas être exacte — les noms de couleur correspondent à plusieurs codes selon les années de modèle. Vérifie toujours sur l'autocollant avant de commander de la peinture.`,
    noConfidentEstimate: (color: string | null | undefined) =>
      `Nous n'avons pas pu estimer un code avec confiance pour ce VIN${color ? ` (couleur en archive : « ${color} »)` : ""}. Le plus sûr est de le lire directement sur la voiture — voici où chercher.`,
    whereToFind: "Où le trouver",
    whatItLooksLike: "À quoi ça ressemble",
    paintFallback:
      "Sur la plupart des véhicules, le code de peinture est sur un autocollant dans le montant de la portière conducteur, dans le puits de la roue de secours ou sous le capot — cherche une ligne marquée « Color », « Paint » ou « EXT. »",
    fullPaintGuide: "Guide complet des codes de peinture",
    findByMakeModel: "Trouver par marque et modèle",
    marketAnalysis: "Analyse du marché",
    example: "Exemple",
    avgMarketPrice: "Prix moyen",
    priceRange: "Fourchette de prix",
    activeListings: "Annonces actives",
    avgMileage: "Kilométrage moyen",
    pricingForYear: "Tarifs constructeur et guides pour cette année, marque et modèle.",
    exampleFigures:
      "Chiffres d'exemple — les prix en direct se chargent depuis auto.dev une fois configurés.",
    originalMSRPLabel: "MSRP original",
    dealerInvoice: "Facture concessionnaire",
    usedRetail: "Détail occasion",
    privateParty: "Particulier",
    tradeIn: "Reprise",
    vinLabel: "VIN :",
    sampleDataPre: "Données d'exemple — définis les identifiants de production ",
    sampleDataAnd: " / ",
    sampleDataSuffix: " pour charger les registres en direct pour ce VIN.",
    noSurprisesTitle: "Aucune surprise avant d'acheter",
    noSurprisesBody: (vehicleLabel: string) =>
      `Débloque l'historique complet du titre NMVTIS, les accidents, l'odomètre et les registres de propriété de ce ${vehicleLabel}.`,
    seeFullReport: (price: string) => `Voir le rapport complet — $${price}`,
    nhtsaRecall: "Données NHTSA",
    nhtsaRecallSub: "Source officielle de sécurité",
    nmvtisBacked: "Soutenu par NMVTIS",
    nmvtisBackedSub: "Registres fédéraux de titre",
    ratedExcellent: "Noté Excellent",
    onTrustpilot: "sur Trustpilot",
    seeReviews: "Voir les avis",
    moneyBack: "30 jours satisfait ou remboursé",
    moneyBackSub: "Garantie de remboursement complet",
    seeReviewsAria:
      "Voir les avis CarCheckerVIN sur Trustpilot (s'ouvre dans un nouvel onglet)",
    whatYouGet: "Ce que tu obtiens au moment du paiement",
    finalHeadline: (vehicleLabel: string) =>
      `Rapport complet d'historique du ${vehicleLabel} — débloqué instantanément`,
    finalBody:
      "Ton rapport complet soutenu par NMVTIS s'affiche en quelques secondes : mentions de titre, registres d'accidents et de dommages, chronologie de l'odomètre, historique des propriétaires, photos d'enchères et un PDF téléchargeable que tu peux garder.",
    viewSampleReport: "Voir un exemple de rapport",
    finalFooter:
      "Paiement unique · Sans abonnement · 30 jours satisfait ou remboursé",
    faqHeading: "FAQ",
    faqs: (vehicleLabel: string, price: string) =>
      [
        {
          q: "Qu'est-ce qui est inclus dans le rapport complet ?",
          a: `Ton rapport sur le ${vehicleLabel} compile tous les registres en archive : mentions de titre (épave, ferraille, inondation, lemon), accidents et dommages signalés, chronologie de l'odomètre avec vérification de recul, historique et nombre de propriétaires, privilèges ouverts, vol et perte totale, valeurs de marché, garantie, historique d'enchères et toutes les photos en archive — plus un PDF téléchargeable que tu peux garder.`,
        },
        {
          q: "Vais-je être facturé mensuellement ?",
          a: `Non. CarCheckerVin n'offre pas d'abonnement mensuel récurrent et n'utilise pas de facturation récurrente automatique. Tu paies un montant unique de $${price} pour ce rapport — ton accès prend simplement fin lorsque ton pass expire, sans rien d'autre à annuler.`,
        },
        {
          q: "Pourquoi facturez-vous ces données ?",
          a: "Récupérer un historique complet signifie interroger les bases de données officielles de titres soutenues par NMVTIS, les maisons d'enchères, les registres de perte totale des assureurs et les données de rappels NHTSA — chacune ayant un coût réel par requête. Le montant unique couvre cet accès direct pour que tu obtiennes des registres vérifiés et à jour plutôt que des suppositions.",
        },
        {
          q: "Quels véhicules puis-je rechercher ?",
          a: "Presque toute voiture, camion, SUV, van ou moto vendu aux États-Unis avec un VIN standard de 17 caractères. Saisis le VIN et nous afficherons les registres en archive pour ce véhicule exact.",
        },
        {
          q: "Vais-je recevoir un e-mail pour la confirmation d'achat ?",
          a: "Oui. Une confirmation et un reçu te sont envoyés par e-mail juste après le paiement, et ton rapport complet — y compris le PDF téléchargeable — est disponible instantanément à l'écran, tu n'as donc jamais à attendre.",
        },
        {
          q: "Et si le rapport ne m'aide pas — puis-je obtenir un remboursement ?",
          a: "Tu es couvert par une garantie satisfait ou remboursé de 30 jours. Si le rapport ne répond pas à tes attentes, contacte-nous dans les 30 jours suivant l'achat et nous t'émettrons un remboursement complet — sans formulaires compliqués.",
        },
      ] as const,
    satisfactionGuarantee:
      "Garantie satisfaction 100% · Remboursement complet si tu n'es pas satisfait",
    viewSampleFirst: "Voir d'abord un exemple de rapport",
    checkAnother: "Vérifier un autre véhicule",
    checkAnotherSub: "Saisis un autre VIN pour générer un nouveau rapport",
    satisfaction: "Garantie",
    guarantee: "Satisfaction",
    metaTitle: (vin: string) => `Rapport d'historique du véhicule — ${vin}`,
    metaDescription:
      "Débloque le rapport complet d'historique du véhicule soutenu par NMVTIS pour ce VIN — mentions de titre, accidents, odomètre, propriété et plus encore.",
  },
} as const;

export default async function ReportPreviewPage({ params, searchParams }: Props) {
  const { vin } = await params;
  const cleaned = vin.trim().toUpperCase();
  if (cleaned.length !== 17) notFound();

  // Locale detection.
  //
  // /report-preview/[vin] is a single canonical route (English). The proxy
  // (src/proxy.ts) rewrites any /es/report-preview/<vin> or /fr/report-preview/<vin>
  // request onto this same internal route, but FIRST sets the `x-locale`
  // request header to the requested locale ("es" / "fr") and `x-pathname`
  // to the original incoming pathname. We read either signal here and fall
  // back to:
  //   • detectLocale(referer pathname)   — covers in-app navigation
  //   • the ?locale=fr query param       — manual override / link sharing
  //   • "en"                              — direct hit on /report-preview
  // No layout/logic changes — purely picks which COPY map drives the labels.
  const sp = (await searchParams) || {};
  // Dev-only preview escape hatch: `?rp_nophoto=1` forces the "nophoto"
  // (variant D) empty-photo layout on ANY VIN, so the manufacturer-logo hero
  // can be reviewed locally without hunting for a genuinely photo-less vehicle
  // (most VINs get a Bing "similar" photo fallback). Never active in production.
  const forceNoPhoto =
    process.env.NODE_ENV !== "production" && sp.rp_nophoto != null;
  const reqHeaders = await headers();
  const xLocale = reqHeaders.get("x-locale") || "";
  const xPath = reqHeaders.get("x-pathname") || reqHeaders.get("x-invoke-path") || "";
  const refererHdr = reqHeaders.get("referer") || "";
  const queryLocale = typeof (sp as Record<string, unknown>).locale === "string"
    ? ((sp as Record<string, string>).locale)
    : "";
  let locale: Locale = "en";
  if (isLocale(xLocale)) {
    locale = xLocale;
  } else if (isLocale(queryLocale)) {
    locale = queryLocale;
  } else if (xPath) {
    locale = detectLocale(xPath).locale;
  } else if (refererHdr) {
    try {
      locale = detectLocale(new URL(refererHdr).pathname).locale;
    } catch {
      locale = "en";
    }
  }
  const c = COPY[locale];

  // Source-page "message match" context — drives the optional banner that
  // echoes the check the visitor came from (e.g. arriving from /warranty-check
  // shows a warranty-framed intro). null for direct/organic/unknown sources.
  const reportContext = getReportContext(sp?.from);

  // Pull the production ClearVin preview (vehicle identity + photos — the
  // source of truth for this preview) and auto.dev's decode (used ONLY for the
  // Market Analysis pricing) in parallel; tolerate either failing.
  // Full NHTSA (vPIC) spec decode for the "Vehicle Specifications" grid — kicked
  // off in parallel with the identity/preview fetches. Never rejects (yields []
  // on failure), so it can't affect the rest of the page.
  const specsPromise = fetchVehicleSpecs(cleaned);

  const [decodedResult, previewResult] = await Promise.allSettled([
    decodeVin(cleaned),
    fetchPreview(cleaned),
  ]);

  const vehicleSpecs = await specsPromise;

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

  // ── Report-preview A/B/C experiment variant ──────────────────────
  // The sticky 3-way bucket is assigned by the proxy (see src/proxy.ts) and
  // read here so the page server-renders the right variant flash-free. Defaults
  // to "coupon" on the rare chance the cookie is missing (e.g. proxy skipped).
  const abCookie = (await cookies()).get(RP_AB_COOKIE)?.value;
  const abVariant: RpAbVariant = isRpAbVariant(abCookie) ? abCookie : "coupon";
  const abBlur = abVariant === "blur";
  // Only swap the bundle/CARFAX cards for supported VINs — unsupported VINs drop
  // the CARFAX marketing card entirely, so there's nothing to swap.
  const abSwap = abVariant === "swap" && !isUnsupported;
  // "nophoto" (variant D): for photo-less VINs, drop the image area and show a
  // clean manufacturer-logo hero instead. VinReport applies it only when there
  // are genuinely no photos on file, so it's a no-op for vehicles with photos.
  const abNoPhoto = abVariant === "nophoto" || forceNoPhoto;

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
      // Valuation is sourced from ClearVin's free preview (vinSpec MSRP/Invoice)
      // when present, but that preview often carries only the MSRP. Merge in
      // auto.dev's decoded pricing to backfill any figure ClearVin left blank
      // (e.g. Dealer Invoice, used-value guides) so the Market Analysis card
      // shows the full valuation. ClearVin stays authoritative for the fields
      // it does provide; auto.dev only fills the zeros.
      if (!reportData.price) {
        reportData.price = decoded.price;
      } else if (decoded.price) {
        const cv = reportData.price;
        const ad = decoded.price;
        reportData.price = {
          ...cv,
          baseMsrp: cv.baseMsrp || ad.baseMsrp,
          baseInvoice: cv.baseInvoice || ad.baseInvoice,
          deliveryCharges: cv.deliveryCharges || ad.deliveryCharges,
          usedTmvRetail: cv.usedTmvRetail || ad.usedTmvRetail,
          usedPrivateParty: cv.usedPrivateParty || ad.usedPrivateParty,
          usedTradeIn: cv.usedTradeIn || ad.usedTradeIn,
        };
      }
      // ClearVin's free preview carries no live-listings market data, so the
      // Market Analysis panel still comes from auto.dev when it's configured.
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
            {c.noRecordsHeading}
          </h1>
          <p className="text-on-surface-variant mb-6">
            {c.noRecordsBody(cleaned)}
          </p>
          <Link
            href="/report-preview"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition"
          >
            {c.tryAnotherVin} <ChevronRight className="w-4 h-4" />
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
  // Dev preview: strip any photo so the empty-state (logo hero) is what renders.
  if (forceNoPhoto) {
    reportData.photos = undefined;
    reportData.photoSource = undefined;
  }
  const hasRealPhoto =
    Array.isArray(reportData.photos) &&
    reportData.photos.some((u) => typeof u === "string" && u.length > 0 && u !== "0");
  // When we fall back to similar photos, how many we found — used to tease the
  // rest as blurred, locked thumbnails (see fallbackLockedCount below).
  let fallbackLockedCount: number | undefined;
  if (!hasRealPhoto && !forceNoPhoto) {
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
  // A VIN with no reported damage and no auction/salvage activity *looks*
  // clean. But title brands, liens, odometer rollbacks and ownership records
  // are NOT surfaced in the free preview, so "looks clean" is not "is clean".
  // When true we swap the section's high-urgency "X problems found" framing for
  // medium-urgency "looks clean — confirm before you buy" copy, which still
  // gives the buyer a concrete reason to unlock rather than an empty section.
  const looksClean =
    !!preview &&
    (preview.damagesCount || 0) === 0 &&
    (preview.auctionHistoryRecords || 0) === 0;
  // Order records by urgency so the buyer sees what matters first:
  //   1. found problems (live count > 0)  — highest urgency
  //   2. locked / unknown (count === null) — still a reason to unlock
  //   3. clean / none reported (count === 0) — reassurance, lowest urgency
  // A stable sort keeps the original list order within each tier.
  const urgencyRank = (c: number | null) => (c && c > 0 ? 0 : c === null ? 1 : 2);
  const records = lockedRecords(preview, locale).sort(
    (a, b) => urgencyRank(a.count) - urgencyRank(b.count)
  );

  /* ── Vehicle-specific finding banner (above the fold) ─────────────────────
     The first thing the buyer sees after decoding their VIN should be the
     single most relevant true fact about THEIR car, not a generic feature
     list. When the free preview surfaces real damage/auction activity we lead
     with a high-urgency alert; when it looks clean we lead with the "but the
     records that matter aren't shown for free" angle so there's still a
     concrete reason to unlock. Suppressed for unsupported VINs (nothing to
     buy) and when we have no live preview signals to stand on. */
  const findingBanner =
    !isUnsupported && previewSignals
      ? (() => {
          const { damageRecords, auctionRecords, recalls } = previewSignals;
          const alertParts: string[] = [];
          if (damageRecords > 0)
            alertParts.push(c.damageRecord(damageRecords));
          if (auctionRecords > 0)
            alertParts.push(c.priorAuctionSale(auctionRecords));
          const hasAlerts = alertParts.length > 0;
          // Only surface this above-the-fold banner when there's a real finding
          // (damage or a prior auction sale). A "looks clean" banner here just
          // reassured buyers into leaving without unlocking, so the clean state
          // is intentionally suppressed.
          if (!hasAlerts) return null;
          const Icon = hasAlerts ? AlertTriangle : ShieldAlert;

          const headline = hasAlerts
            ? c.findingHeadlineAlerts(vehicleLabel, alertParts)
            : c.findingHeadlineClean;
          const body = hasAlerts
            ? c.findingBodyAlerts
            : c.findingBodyClean(vehicleLabel);

          const shell = hasAlerts
            ? "border-red-200 bg-gradient-to-br from-red-50 to-surface-container-lowest"
            : "border-amber-200 bg-gradient-to-br from-amber-50 to-surface-container-lowest";
          const iconWrap = hasAlerts
            ? "bg-red-100 text-red-600"
            : "bg-amber-100 text-amber-700";
          const eyebrowTone = hasAlerts ? "text-red-600" : "text-amber-700";

          return (
            <div className={`rounded-3xl border p-5 sm:p-6 ${shell}`}>
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl ${iconWrap}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-[11px] font-bold uppercase tracking-widest ${eyebrowTone}`}
                  >
                    {hasAlerts ? c.recordsFoundOnVin : c.looksClean}
                  </p>
                  <h2 className="mt-1 font-headline text-lg font-extrabold leading-tight text-on-surface sm:text-xl">
                    {headline}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                    {body}
                    {recalls > 0 && (
                      <>
                        {" "}
                        <span className="font-semibold text-on-surface">
                          {c.openSafetyRecallsCount(recalls)}
                        </span>
                        {c.alsoReportedFree}
                      </>
                    )}
                  </p>
                  <BuyReportButton
                    ariaLabel={c.unlockFullReportAria}
                    locale={locale}
                    className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 font-headline text-sm font-extrabold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90 cursor-pointer"
                  >
                    <Lock className="h-4 w-4" /> {c.unlockFullReportPrice(SINGLE_PRICE.toFixed(2))}
                  </BuyReportButton>
                </div>
              </div>
            </div>
          );
        })()
      : null;

  // Paint-code section (Option 3) — only shown when the buyer arrived from the
  // paint-code lookup/finder tools, so it answers the intent they came with
  // without cluttering the report for everyone else.
  // Reuse the headers we already read above for locale detection.
  const cameFromPaint = /\/paint-code-(lookup|finder)/.test(refererHdr);
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
            {c.unsupportedTitle}
          </p>
          <p className="mt-1.5 text-xs sm:text-sm text-amber-900 leading-relaxed">
            {c.unsupportedBody}
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
    <BuyReportButton locale={locale} className="flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-headline font-extrabold bg-white text-primary shadow-lg hover:bg-yellow-50 transition cursor-pointer">
      <Lock className="w-4 h-4" /> {c.getFullReport(SINGLE_PRICE.toFixed(2))}
    </BuyReportButton>
  );

  /* ── Vehicle details card ─────────────────────────────────────────────
     The free, decoded identity of THIS vehicle (year/make/model/trim plus
     body type and the build specs from ClearVin's preview), gathered into a
     single card rendered full-width directly under the photo gallery so the
     buyer reads the car's facts (and the free recalls) BEFORE any paywall. */
  // Headline build facts from ClearVin's preview decode — the recognisable
  // summary specs (trim, body, engine, origin, MSRP) that used to sit as chips
  // under the vehicle image. They now open the Vehicle Specifications sheet:
  // surfaced first, then merged with the deep NHTSA vPIC decode below. vPIC
  // rows that duplicate one of these facts are dropped so nothing shows twice.
  const previewSpecs: VehicleSpec[] = [];
  const pushPreviewSpec = (label: string, v?: string | null) => {
    const val = (v || "").trim();
    if (val) previewSpecs.push({ label, value: val });
  };
  pushPreviewSpec("Trim", s?.trim);
  pushPreviewSpec("Body Style", s?.style);
  pushPreviewSpec("Engine", s?.engine);
  pushPreviewSpec("Country of Manufacture", s?.madeIn);
  pushPreviewSpec("MSRP", s?.msrp);

  // vPIC labels that would restate a ClearVin headline fact (its trim/body/
  // origin values are richer), so we drop them from the merged sheet.
  const DROP_VPIC_LABELS = new Set([
    "Trim",
    "Body",
    "Country of Assembly",
  ]);
  const mergedSpecs: VehicleSpec[] = [
    ...previewSpecs,
    ...vehicleSpecs.filter((sp) => !DROP_VPIC_LABELS.has(sp.label)),
  ];

  // The card is worth showing when we have a real decoded identity (a name
  // beyond the bare VIN) or at least one decoded specification.
  const hasVehicleDetails =
    Boolean(vehicleLabel && vehicleLabel !== cleaned) || mergedSpecs.length > 0;

  // Detail strip attached to the bottom of the photo gallery (passed as
  // VinReport's `galleryFooter`). It shares the gallery's light surface so it
  // reads as one unit with the image rather than a separate card; the gallery
  // container supplies the rounding/shadow/clip, so this block stays flat. The
  // header pairs the brand logo + vehicle name + VIN; directly beneath it the
  // full Vehicle Specifications sheet (ClearVin headline facts + NHTSA vPIC
  // decode) replaces the old chip row, so the buyer reads the car's complete
  // decoded build before any paywall.
  const renderVehicleDetails = () => (
    <div className="bg-surface-container-lowest border-t border-outline-variant">
      <div className="flex items-center gap-3.5 px-5 sm:px-6 py-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center flex-shrink-0 overflow-hidden">
          <BrandLogo make={make} className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        <div className="min-w-0">
          <h2 className="font-headline font-bold text-lg sm:text-2xl leading-tight text-on-surface break-words">
            {vehicleLabel}
          </h2>
          <p className="text-xs sm:text-sm font-semibold mt-0.5">
            <span className="text-on-surface-variant">{c.vinLabel} </span>
            <span className="text-primary font-mono tracking-wide break-all">
              {cleaned}
            </span>
          </p>
        </div>
      </div>
      {mergedSpecs.length > 0 && (
        <div className="px-5 sm:px-6 pb-6 pt-4 border-t border-outline-variant/60">
          <VehicleSpecs specs={mergedSpecs} />
        </div>
      )}
    </div>
  );

  /* ── Blurred record teaser card ───────────────────────────────────────────
     Mirrors the competitor pattern: a category header with a status pill +
     a blurred skeleton of the data so the buyer sees the *shape* of what's on
     file (record count, ownership timeline, damage photos) but not the answer.
     A confirmed finding (count > 0) gets a high-urgency red "N found" badge;
     everything else shows a neutral "Info available" pill so a clean category
     keeps its mystery (we never reveal a "none reported" result for free). */
  // A blurred value placeholder. Labels stay crisp; only the *answer* is
  // obscured, so the buyer reads what a field IS but not what it SAYS.
  const blurVal = (cls = "w-full") => (
    <div className={`h-2 rounded bg-on-surface/20 blur-[2.5px] ${cls}`} aria-hidden />
  );
  // Descriptive blurred skeleton — visible field labels next to blurred values
  // (GoodCar-style), so each card describes the records it's hiding.
  const renderRecordSkeleton = (
    r: ReturnType<typeof lockedRecords>[number]
  ) => {
    const { body, rows, entry, fields } = r;

    if (body === "timeline") {
      return (
        <div className="space-y-3">
          <div className="flex items-center">
            {Array.from({ length: rows }).map((_, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-primary bg-surface-container-lowest flex-shrink-0" />
                {i < rows - 1 && <div className="h-0.5 flex-1 bg-on-surface/15" />}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: rows }).map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="text-[9px] font-bold text-on-surface leading-none">
                  {entry} {i + 1}
                </div>
                {blurVal("w-3/4")}
                {blurVal("w-1/2")}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (body === "grid") {
      return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
          {fields.map((f) => (
            <div key={f} className="space-y-1">
              <div className="text-[9px] font-bold uppercase tracking-wide text-on-surface leading-none">
                {f}
              </div>
              {blurVal("w-2/3")}
            </div>
          ))}
        </div>
      );
    }

    // "rows" and "photos" — labelled record rows, optionally with a thumbnail.
    return (
      <div className="space-y-2.5">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-2.5">
            {body === "photos" && (
              <div className="w-12 h-9 rounded-md bg-on-surface/10 blur-[2px] flex-shrink-0" aria-hidden />
            )}
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-bold text-on-surface leading-none mb-1.5">
                {entry} #{i + 1}
              </div>
              <div className="flex gap-3">
                {fields.map((f) => (
                  <div key={f} className="flex-1 min-w-0 space-y-1">
                    <div className="text-[8px] uppercase tracking-wide text-outline leading-none truncate">
                      {f}
                    </div>
                    {blurVal()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const renderRecordCard = (r: ReturnType<typeof lockedRecords>[number]) => {
    const Icon = r.icon;
    const found = typeof r.count === "number" && r.count > 0;
    return (
      <BuyReportButton
        key={r.label}
        ariaLabel={c.unlockInCardAria(r.label)}
        locale={locale}
        className="group block w-full h-full text-left rounded-2xl border border-outline-variant bg-surface-container-lowest overflow-hidden cursor-pointer transition-colors hover:border-primary/40"
      >
        {/* Inner flex wrapper: iPhone Safari does NOT treat a <button> as a
            flex container, so the card's children (and their nested flex-1
            columns) collapse to content width and bunch to the left. Putting
            the column layout on a <div> instead fixes the alignment on iOS. */}
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2.5 px-3.5 pt-3.5 pb-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div className="text-[12px] font-extrabold uppercase tracking-wide text-on-surface leading-tight flex-1 min-w-0">
              {r.label}
            </div>
            {found ? (
              <span className="flex-shrink-0 inline-flex items-center gap-1 whitespace-nowrap bg-red-500 text-white text-[9px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full">
                <AlertTriangle className="w-2.5 h-2.5" /> {c.foundBadge(r.count as number)}
              </span>
            ) : (
              <span className="flex-shrink-0 inline-flex items-center gap-1 whitespace-nowrap bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full">
                <Info className="w-2.5 h-2.5" /> {c.infoAvailable}
              </span>
            )}
          </div>
          <div className="px-3.5 text-[11px] text-on-surface-variant mb-3 truncate">
            {r.note}
          </div>
          <div className="px-3.5 select-none pointer-events-none">
            {renderRecordSkeleton(r)}
          </div>
          <div className="mt-auto px-3.5 pt-3 pb-3.5">
            <span className="flex items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2 text-[11px] font-bold text-white transition-colors group-hover:bg-primary/90">
              <Lock className="w-3 h-3 flex-shrink-0" /> {c.viewAll}
            </span>
          </div>
        </div>
      </BuyReportButton>
    );
  };

  /* ── Market Analysis card (sidebar, above Report Summary) ──────────────
     Built from auto.dev market/pricing data with an example fallback so the
     panel is reviewable before AUTO_DEV_API_KEY is configured. Skipped when
     the rich live-listings Market Analysis (inside VinReport) already renders,
     so the two never double up. */
  const summaryTop = reportData.marketData ? null : (() => {
    const pr = reportData.price;
    const cards: { label: string; value: string }[] = [];
    if (pr) {
      if (pr.baseMsrp > 0) cards.push({ label: c.originalMSRPLabel, value: `$${pr.baseMsrp.toLocaleString()}` });
      if (pr.baseInvoice > 0) cards.push({ label: c.dealerInvoice, value: `$${pr.baseInvoice.toLocaleString()}` });
      if (pr.usedTmvRetail > 0) cards.push({ label: c.usedRetail, value: `$${pr.usedTmvRetail.toLocaleString()}` });
      if (pr.usedPrivateParty > 0) cards.push({ label: c.privateParty, value: `$${pr.usedPrivateParty.toLocaleString()}` });
      if (pr.usedTradeIn > 0) cards.push({ label: c.tradeIn, value: `$${pr.usedTradeIn.toLocaleString()}` });
    }
    const isExample = cards.length === 0;
    // On a live report with no auto.dev pricing, omit the card entirely rather
    // than showing fabricated "Example" figures. The example fallback only
    // renders in sample/dev mode (no ClearVin creds) so the panel stays
    // reviewable before AUTO_DEV_API_KEY is configured.
    if (isExample && !mock) return null;
    if (isExample) {
      cards.push(
        { label: c.avgMarketPrice, value: "$24,850" },
        { label: c.priceRange, value: "$21,300 – $28,400" },
        { label: c.activeListings, value: "37" },
        { label: c.avgMileage, value: "92,400 mi" },
      );
    }
    return (
      <div className="bg-surface-container-lowest rounded-[2rem] shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-surface-container flex items-center justify-between gap-2">
          <h3 className="font-headline font-bold text-on-surface flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> {c.marketAnalysis}
          </h3>
          {isExample && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-outline border border-outline-variant rounded-full px-2 py-0.5">
              {c.example}
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
            {pr ? c.pricingForYear : c.exampleFigures}
          </p>
        </div>
      </div>
    );
  })();

  /* Report Summary — the full list of deliverables, grouped. On desktop this
     renders in the MAIN column (behind the Premium/Unlock section), having
     swapped places with the bundle checkout, which moves into the sidebar. The
     wider main column lets the groups sit two-up. (On mobile the built-in
     sidebar copy from VinReport is used instead — see summaryDesktopHidden.) */
  // Build localised summary groups from SUMMARY_GROUPS_KEYS, picking the
  // matching string from COPY for both group titles and each item label.
  const summaryGroupsLocalized: { title: string; items: string[] }[] =
    SUMMARY_GROUPS_KEYS.map((group) => ({
      title: c[group.title],
      items: group.items.map((k) => {
        // Items live under different keys in COPY (some shared with other
        // sections). Map them with a typed lookup so the keys collapse to
        // strings without using `any`.
        switch (k) {
          case "titleBrandCheck": return c.titleBrandCheck;
          case "ownershipHistory": return c.ownershipHistory;
          case "numberOfOwners": return c.numberOfOwners;
          case "usageType": return c.usageType;
          case "accidentDamage": return c.accidentDamageRecords;
          case "salvageTotalLoss": return c.salvageTotalLoss;
          case "airbagDeployment": return c.airbagDeployment;
          case "frameDamage": return c.frameDamage;
          case "odometerReadings": return c.odometerReadings;
          case "rollbackDetection": return c.rollbackDetection;
          case "openLiens": return c.openLiens;
          case "lemonCheck": return c.lemonCheck;
          case "marketValue": return c.marketValue;
          case "originalMsrp": return c.originalMsrp;
          case "warrantyInfo": return c.warrantyInfo;
          case "auctionRecords": return c.auctionRecords;
          case "allPhotos": return c.allPhotos;
          case "openSafetyRecalls": return c.openSafetyRecalls;
          case "downloadablePdf": return c.downloadablePdf;
        }
      }),
    }));

  const reportSummaryCard = (
    <div className="bg-surface-container-lowest rounded-[2rem] shadow-sm overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-surface-container">
        <h3 className="font-headline font-bold text-on-surface flex items-center gap-2">
          <AlertTriangle
            className="w-5 h-5"
            style={{ color: "var(--color-secondary-container)" }}
          />{" "}
          {c.reportSummary}
        </h3>
        <p className="text-xs text-on-surface-variant mt-0.5">
          {c.reportSummaryNote(vehicleLabel)}
        </p>
      </div>
      <div className="p-5 sm:p-6 grid sm:grid-cols-2 gap-x-8 gap-y-5">
        {summaryGroupsLocalized.map((group) => (
          <div key={group.title}>
            <p className="text-[11px] font-black text-primary uppercase tracking-wider mb-2">
              {group.title}
            </p>
            <div className="space-y-2">
              {group.items.map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-sm text-on-surface-variant">
                    {label}
                  </span>
                  <span className="flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                    {c.included}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* "Your report contains" — the green deliverables checklist. Rendered behind
     the Unlock section (it swapped places with the Report Summary card). */
  const reportContainsSection = (
    <section className="rounded-3xl bg-surface-container-lowest border border-outline-variant p-6">
      <h2 className="text-xl font-headline font-extrabold text-primary mb-2">
        {c.yourReportContains}
      </h2>
      <p className="text-sm text-on-surface-variant mb-5 max-w-2xl">
        {c.yourReportContainsNote(make || c.vehicle)}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
        {MAY_CONTAIN.map((item) => {
          const Icon = item.icon;
          const label = c[item.key];
          return (
            <div key={item.key} className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-emerald-600" />
              </span>
              <span className="text-sm font-semibold text-on-surface leading-tight">{label}</span>
              <Check className="w-4 h-4 text-emerald-600 ml-auto flex-shrink-0" strokeWidth={3} />
            </div>
          );
        })}
      </div>
    </section>
  );

  /* ── Free data surfaced directly under the photo gallery ──
     The buyer reads the car's facts first: the Vehicle Details card, then the
     free NHTSA recalls (public data, framed as trust proof + a bridge). Only
     AFTER that free data do the paywalled records on file (the conversion
     driver) and the bundle upsell appear — so nobody is asked to pay before
     seeing real information about the vehicle. */
  const afterPhotos = (
    <div className="space-y-12">
      {/* Vehicle Details are attached to the gallery itself (see galleryFooter),
          so the decoded identity reads as one unit with the photo. */}

      {/* Free recalls — public NHTSA data, framed as proof + a bridge to the
          non-public records the paid report adds. Recalls alone don't drive a
          purchase, so we contrast them with what stays locked. */}
      {preview && preview.recalls.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-headline font-extrabold text-primary">
              {c.openSafetyRecall(preview.recalls.length)}
              {c.shownFreeSuffix(preview.recalls.length)}
            </h2>
          </div>
          <div className="space-y-2">
            {preview.recalls.slice(0, 2).map((r, i) => (
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
                  <p><strong className="text-on-surface">{c.summary}:</strong> {r.Summary}</p>
                  {r.Consequence && (
                    <p><strong className="text-on-surface">{c.risk}:</strong> {r.Consequence}</p>
                  )}
                  {r.Remedy && (
                    <p><strong className="text-on-surface">{c.remedy}:</strong> {r.Remedy}</p>
                  )}
                </div>
              </details>
            ))}

            {/* Remaining recalls are blurred behind an unlock overlay — the first
                two are shown free as proof, the rest convert. */}
            {preview.recalls.length > 2 && (
              <BuyReportButton
                ariaLabel={c.unlockRecallsAria(preview.recalls.length - 2)}
                locale={locale}
                className="group relative block w-full cursor-pointer text-left"
              >
                <div aria-hidden className="space-y-2 blur-[5px] select-none pointer-events-none">
                  {preview.recalls.slice(2, 5).map((r, i) => (
                    <div
                      key={`${r.NHTSACampaignNumber}-locked-${i}`}
                      className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4"
                    >
                      <div className="text-[11px] font-black uppercase tracking-wider text-amber-600 mb-0.5">
                        {r.Component}
                      </div>
                      <div className="text-sm font-bold text-on-surface">
                        Campaign {r.NHTSACampaignNumber} · {r.ReportReceivedDate}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-headline text-sm font-extrabold text-white shadow-lg shadow-primary/25 transition-colors group-hover:bg-primary/90">
                    <Lock className="h-4 w-4" />
                    {c.unlockRecalls(preview.recalls.length - 2)}
                  </span>
                </div>
              </BuyReportButton>
            )}
          </div>

          {/* Bridge: pivot from free public recalls to the locked records */}
          <BuyReportButton
            ariaLabel={c.recallsBridgeAria}
            locale={locale}
            className="group mt-4 flex w-full items-center gap-3 rounded-2xl border border-primary/20 bg-primary/[0.04] p-4 text-left cursor-pointer transition-colors hover:border-primary/40 hover:bg-primary/[0.07]"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-on-surface">
                {c.recallsBridgeTitle}
              </div>
              <div className="text-xs text-on-surface-variant">
                {c.recallsBridgeBody}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 flex-shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
          </BuyReportButton>
        </section>
      )}

      {/* Premium vehicle history — records on file (the conversion driver).
          Sits AFTER the free vehicle details + recalls so buyers see real
          data before the paywall. */}
      <section>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary mb-3">
          <Crown className="w-3.5 h-3.5" /> {c.premiumBadge}
        </div>
        <h2 className="text-2xl font-headline font-extrabold text-on-surface mb-2">
          {!looksClean && recordsFound > 0
            ? c.historyRecordsHeading(recordsFound, make || c.vehicle)
            : c.unlockHistoryHeading}
        </h2>
        <p className="text-sm text-on-surface-variant mb-5 max-w-md">
          {c.premiumIntro}
        </p>
        {recordsFound > 0 && (
          <p className="text-base sm:text-lg font-headline font-bold text-on-surface mb-4">
            {c.weFoundLead}
            <span className="text-primary">
              {c.historyRecordsCount(recordsFound)}
            </span>
            {c.onYourVehicle}
          </p>
        )}
        <div className="grid sm:grid-cols-2 gap-3">
          {records.map((r) => renderRecordCard(r))}
        </div>
        <BuyReportButton
          ariaLabel={c.unlockFullReportAria}
          locale={locale}
          className="group mt-3 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-primary px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary/90 cursor-pointer"
        >
          <Lock className="w-4 h-4" /> {c.unlockFullReport}
        </BuyReportButton>
      </section>

      {/* Behind the Unlock section the two columns swap by viewport:
          • Mobile — the bundle checkout sits here so phone users can buy right
            after reading the history (Report Summary lives in the sidebar below).
          • Desktop — the Report Summary sits here instead; the bundle moves into
            the right sidebar so it stays beside the history as the buyer reads. */}
      {!isUnsupported &&
        (abSwap ? (
          /* Swap bucket (phone): the CarCheckerVIN-vs-CARFAX card takes this
             slot; the bundle checkout moves down into premiumSections. */
          <div className="lg:hidden">
            <MarketingCard
              make={make}
              vehicleLabel={vehicleLabel}
              vin={cleaned}
              price={SINGLE_PRICE.toFixed(2)}
              exampleHref={exampleHref}
              locale={locale}
            />
          </div>
        ) : (
          <div className="lg:hidden" data-buybar-hide data-bundle-target>
            <BundleUpsellCard
              vin={cleaned}
              vehicleLabel={vehicleLabel}
              inputId="bundle-email-mobile"
              locale={locale}
            />
          </div>
        ))}
      {reportContainsSection}
    </div>
  );

  /* ── Premium sections injected UNDER the car info (main column) ── */
  const premiumSections = (
    <div className="space-y-12">
      {/* Mobile-only purchase card — surfaced right after the recalls so phone
          users see the offer without scrolling past the whole report. The
          desktop copy lives in the sticky sidebar (hidden on mobile).
          Replaced by the unsupported-VIN notice when ClearVin doesn't
          cover the VIN; the page still shows the decoded auto.dev data
          above (specs, photos, market analysis) — just without the buy CTA. */}
      <div className="lg:hidden">
        {isUnsupported ? (
          unsupportedNotice
        ) : abSwap ? (
          /* Swap bucket (phone): the bundle checkout takes this slot; the
             CarCheckerVIN-vs-CARFAX card moved up into afterPhotos. */
          <div data-buybar-hide data-bundle-target>
            <BundleUpsellCard
              vin={cleaned}
              vehicleLabel={vehicleLabel}
              inputId="bundle-email-mobile"
              locale={locale}
            />
          </div>
        ) : (
          <MarketingCard
            make={make}
            vehicleLabel={vehicleLabel}
            vin={cleaned}
            price={SINGLE_PRICE.toFixed(2)}
            exampleHref={exampleHref}
            locale={locale}
          />
        )}
      </div>

      {/* Report Summary — swapped down here from behind the Unlock section,
          trading places with "Your report contains". Desktop-only; on mobile
          the built-in sidebar copy is used (see summaryDesktopHidden). */}
      <div className="hidden lg:block">{reportSummaryCard}</div>

      {/* Every record your report checks */}
      <section>
        <h2 className="text-xl font-headline font-extrabold text-primary mb-2">
          {c.everyRecordHeading}
        </h2>
        <p className="text-sm text-on-surface-variant mb-5 max-w-2xl">
          {c.everyRecordBody(make || c.vehicle)}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {RECORDS_CHECKED.map((r) => {
            const Icon = r.icon;
            const label = c[r.key];
            return (
              <div
                key={r.key}
                className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xs font-bold text-on-surface leading-tight">{label}</div>
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
              {c.paintCodeFor(make)}{" "}
              <span className="text-secondary-container">{c.paintCodeEstimated}</span>
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant mb-5 max-w-2xl">
            {c.paintCodeIntro}
          </p>

          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6 space-y-5">
            {/* Likely code — only when we could match the color name */}
            {likelyPaint ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-1">
                  {c.likelyPaint}
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
                  {c.matchedColorNote(paintColorName)}
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-outline-variant bg-surface-container p-4">
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {c.noConfidentEstimate(paintColorName)}
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
                      {c.whereToFind}
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
                      {c.whatItLooksLike}
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
                {c.paintFallback}
              </p>
            )}

            {/* CTAs back to the dedicated tools */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/paint-code-lookup"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-on-primary hover:opacity-90 transition"
              >
                <Palette className="w-4 h-4" />
                {c.fullPaintGuide}
              </Link>
              <Link
                href="/paint-code-finder"
                className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant px-4 py-2 text-sm font-bold text-on-surface hover:bg-surface-container transition"
              >
                {c.findByMakeModel}
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
  // Desktop sidebar "Additional records available" marketing card. Sits at the
  // TOP of the sidebar (sidebarTop) — swapped above the bundle upsell. Dropped
  // for unsupported VINs (no CTA to sell).
  const sidebarMarketingCard = isUnsupported ? null : (
    <div className="hidden lg:block">
      <MarketingCard
        make={make}
        vehicleLabel={vehicleLabel}
        vin={cleaned}
        price={SINGLE_PRICE.toFixed(2)}
        exampleHref={exampleHref}
        locale={locale}
      />
      <div className="flex items-center justify-center gap-2 mt-5 text-primary">
        <Laurel className="w-7 h-10" />
        <span className="text-sm font-headline font-extrabold uppercase tracking-wide leading-tight text-center">
          {c.satisfaction}
          <br />
          {c.guarantee}
        </span>
        <Laurel className="w-7 h-10 -scale-x-100" />
      </div>
    </div>
  );

  // Desktop sidebar slot. On desktop the "Buy more, pay less" bundle lives HERE
  // in the sidebar — swapped with the Report Summary, which moves into the main
  // column behind the "Unlock the full vehicle history" section — so the
  // checkout stays beside the history as the buyer reads it. (On mobile the
  // bundle renders inline in the main column instead; see afterPhotos.) For
  // unsupported VINs this slot carries the friendly notice. Either way it keeps
  // the AI block hidden + the sidebar column stretched.
  const sidebarBundleOrNotice = isUnsupported ? (
    <div className="hidden lg:block">{unsupportedNotice}</div>
  ) : (
    <div className="hidden lg:block" data-buybar-hide data-bundle-target>
      <BundleUpsellCard
        vin={cleaned}
        vehicleLabel={vehicleLabel}
        inputId="bundle-email-desktop"
        locale={locale}
      />
    </div>
  );

  /* Purchase & report FAQ. Rendered in two places: under the Report Summary in
     the sidebar on desktop (via VinReport's sidebarBottom), and in the footer
     on mobile. */
  const faqSection = (
    <section>
      <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-5">
        {c.faqHeading}
      </h2>

      <div className="space-y-3">
        {c.faqs(vehicleLabel, SINGLE_PRICE.toFixed(2)).map(({ q, a }, i) => (
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
      {/* The VIN10 coupon popup shows for every visitor (independent of the
          A/B/C/D bucket) — it appears 5s after the first scroll. The sticky
          bucket still drives the server-rendered report variants (blur / swap /
          nophoto) above. */}
      <ReportPreviewExperiment />
      {mock && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-800 text-xs sm:text-sm text-center py-2 px-4 pt-16">
          {c.sampleDataPre}<code className="font-mono">CLEARVIN_API_EMAIL</code>{c.sampleDataAnd}<code className="font-mono">CLEARVIN_API_PASSWORD</code>{c.sampleDataSuffix}
        </div>
      )}

      {/* The free-report design, reused — with the premium sections under the
          car info, the paywall card in the sidebar, locked gallery & listing,
          and the full deliverables list as the Report Summary. */}
      <VinReport
        data={reportData}
        locale={locale}
        hideCheckAnother
        mainTop={
          findingBanner || contextBanner ? (
            <div className="space-y-4">
              {findingBanner}
              {contextBanner}
            </div>
          ) : undefined
        }
        galleryFooter={hasVehicleDetails ? renderVehicleDetails() : undefined}
        afterPhotos={afterPhotos}
        mainExtra={premiumSections}
        mainFiller={
          <ReportColumnFiller>
            <div className="h-full rounded-3xl border border-outline-variant bg-gradient-to-br from-primary/[0.06] to-surface-container-lowest p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline font-extrabold text-lg text-on-surface mb-1.5">
                {c.noSurprisesTitle}
              </h3>
              <p className="text-sm text-on-surface-variant max-w-xs mb-4">
                {c.noSurprisesBody(vehicleLabel)}
              </p>
              <BuyReportButton locale={locale} className="inline-flex items-center justify-center gap-2 bg-primary text-white rounded-2xl px-6 py-3 font-headline font-extrabold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors cursor-pointer">
                <Lock className="w-4 h-4" /> {c.seeFullReport(SINGLE_PRICE.toFixed(2))}
              </BuyReportButton>
            </div>
          </ReportColumnFiller>
        }
        sidebarReplaceAI={abSwap ? sidebarMarketingCard : sidebarBundleOrNotice}
        lockedPhotoCount={lockedPhotoCount}
        auctionCount={previewSignals?.auctionRecords}
        lockListing={!!reportData.listing}
        unlockHref={orderHref}
        summaryGroups={summaryGroupsLocalized}
        heroCta={heroCta}
        hideIdentityCards={hasVehicleDetails}
        hideValuation
        mobileMarketAnalysisFirst
        summaryTop={summaryTop}
        summaryDesktopHidden
        keepSidebarAI
        sidebarTop={abSwap ? sidebarBundleOrNotice : sidebarMarketingCard}
        sidebarBottom={<div className="hidden lg:block">{faqSection}</div>}
        lockActions
        unlockPrice={SINGLE_PRICE}
        mainImageClassName={abBlur ? "rp-ab-blur" : undefined}
        hideVehicleImage={abNoPhoto}
      />

      {/* ═══ Commercial footer sections ═══════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-28 lg:pb-16 space-y-10">
        {/* Trust band */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 text-center">
            <ShieldCheck className="w-6 h-6 text-primary mx-auto mb-1.5" />
            <div className="text-sm font-bold text-on-surface">{c.nhtsaRecall}</div>
            <div className="text-[11px] text-on-surface-variant">{c.nhtsaRecallSub}</div>
          </div>
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 text-center">
            <BadgeCheck className="w-6 h-6 text-primary mx-auto mb-1.5" />
            <div className="text-sm font-bold text-on-surface">{c.nmvtisBacked}</div>
            <div className="text-[11px] text-on-surface-variant">{c.nmvtisBackedSub}</div>
          </div>
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 text-center">
            <div className="flex items-center justify-center gap-0.5 mb-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-emerald-500 fill-emerald-500" />
              ))}
            </div>
            <div className="text-sm font-bold text-on-surface">{c.ratedExcellent}</div>
            <div className="text-[11px] text-on-surface-variant">{c.onTrustpilot}</div>
            <a
              href="https://www.trustpilot.com/review/www.carcheckervin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={c.seeReviewsAria}
              className="mt-2 inline-flex items-center justify-center gap-1 rounded-full border border-[#00B67A] px-3 py-1 text-[11px] font-bold text-[#00B67A] hover:bg-[#00B67A] hover:text-white transition-colors"
            >
              {c.seeReviews}
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 text-center">
            <Crown className="w-6 h-6 text-primary mx-auto mb-1.5" />
            <div className="text-sm font-bold text-on-surface">{c.moneyBack}</div>
            <div className="text-[11px] text-on-surface-variant">{c.moneyBackSub}</div>
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
              <Crown className="w-3.5 h-3.5" /> {c.whatYouGet}
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold mb-3">
              {c.finalHeadline(vehicleLabel)}
            </h2>
            <p className="text-sm text-white/75 max-w-xl mx-auto mb-7">
              {c.finalBody}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <BuyReportButton locale={locale} className="inline-flex items-center justify-center gap-2 bg-white text-primary rounded-2xl px-7 py-4 font-headline font-extrabold text-base hover:bg-yellow-50 transition-colors shadow-lg cursor-pointer">
                <Lock className="w-5 h-5" /> {c.getFullReport(SINGLE_PRICE.toFixed(2))}
              </BuyReportButton>
              <Link
                href={exampleHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 font-bold text-white/90 border border-white/25 hover:bg-white/10 transition-colors"
              >
                <FileText className="w-5 h-5" /> {c.viewSampleReport}
              </Link>
            </div>
            <p className="text-xs text-white/60 mt-4">
              {c.finalFooter}
            </p>
          </section>
        )}

        {/* Purchase & report FAQ — mobile only; on desktop it renders under the
            Report Summary in the sidebar (VinReport sidebarBottom). */}
        <div className="lg:hidden">{faqSection}</div>

        {/* Check Another Vehicle — moved here, under the final CTA */}
        <section className="bg-primary text-white rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 text-center relative overflow-hidden shadow-sm">
          <h2 className="font-headline font-extrabold text-lg sm:text-xl text-white mb-2">{c.checkAnother}</h2>
          <p className="text-sm sm:text-base text-white/75 mb-5 sm:mb-6">{c.checkAnotherSub}</p>
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
        <StickyBuyBar locale={locale} className="fixed bottom-0 inset-x-0 z-40 lg:hidden isolate transform-gpu bg-surface border-t border-outline-variant px-4 pt-2.5 pb-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <p className="flex items-center justify-center gap-1.5 text-[11px] text-on-surface-variant text-center mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            {c.satisfactionGuarantee}
          </p>
          <BuyReportButton locale={locale} className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-primary text-white font-headline font-extrabold text-base shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors cursor-pointer">
            <Gem className="w-5 h-5" /> {c.getFullReport(SINGLE_PRICE.toFixed(2))}
          </BuyReportButton>
          <Link
            href={exampleHref}
            className="block text-center mt-2 text-sm font-bold text-primary underline underline-offset-4"
          >
            {c.viewSampleFirst}
          </Link>
        </StickyBuyBar>
      )}
    </div>
  );
}
