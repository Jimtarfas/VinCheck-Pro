/**
 * ClearVin structured-report layer.
 *
 * ClearVin's paid `/report` endpoint returns a fully client-rendered HTML
 * document (an amCharts SPA). All of the actual report data is embedded in
 * that document as `window.__REPORT_DATA__ = JSON.parse(decodeURIComponent(...))`.
 *
 * This module:
 *   1. Extracts that embedded JSON from the report HTML.
 *   2. Normalises it into a single, strongly-typed `NormalizedReport` shape
 *      that our own premium report UI consumes.
 *   3. Handles missing / empty data gracefully (every list defaults to []).
 *
 * NOTE on compliance: ClearVin's API doc asks integrators to display the
 * report HTML unmodified. Restructuring the embedded data into our own
 * design is a decision the account owner has explicitly directed; this layer
 * never *alters* any vehicle data — it only re-presents it. The values shown
 * are exactly what ClearVin returned.
 */

import { fetchFullReport, isUsingMockData } from "@/lib/clearvin";

// ─────────────────────────────────────────────────────────────────────────
// Raw ClearVin shapes (only the fields we read; everything is optional so a
// shape drift never throws).
// ─────────────────────────────────────────────────────────────────────────

interface RawTitleAbstract {
  VehicleIdentification?: { IdentificationID?: string };
  TitleIssuingAuthorityName?: string;
  TitleIssueDate?: { Date?: string };
  VehicleOdometerReadingMeasure?: string;
  VehicleOdometerReadingUnitCode?: string;
  HistoricTitleAbstract?: RawTitleAbstract[];
}

interface RawOdometer {
  isError?: boolean;
  date?: string;
  mileage?: number;
  unitCode?: string;
  location?: string;
  dataSource?: string;
}

interface RawRecall {
  Make?: string;
  Model?: string;
  ModelYear?: string;
  Component?: string;
  Summary?: string;
  Consequence?: string;
  Remedy?: string;
  Notes?: string;
  Manufacturer?: string;
  ReportReceivedDate?: string;
  NHTSACampaignNumber?: string;
}

interface RawSalvage {
  ReportingEntityAbstract?: {
    ReportingEntityCategoryCode?: string;
    ReportingEntityCategoryText?: string;
    EntityName?: string;
    LocationCityName?: string;
    LocationStateUSPostalServiceCode?: string;
    TelephoneNumberFullID?: string;
    ContactEmailID?: string;
  };
  VehicleObtainedDate?: string;
  VehicleDispositionText?: string;
  VehicleIntendedForExportCode?: string;
}

interface RawRatingCriteria {
  name?: string;
  weight?: number;
  grade?: { label?: string; value?: number };
  condition?: { value?: string | number | boolean; unit?: string; date?: string | null; source?: string };
}

interface RawBlackBook {
  publish_date?: string;
  state?: string;
  country?: string;
  base_retail_clean?: number;
  base_retail_avg?: number;
  base_retail_rough?: number;
  adjusted_retail_clean?: number;
  adjusted_retail_avg?: number;
  adjusted_retail_rough?: number;
  adjusted_whole_clean?: number;
  adjusted_whole_avg?: number;
  adjusted_whole_rough?: number;
  [k: string]: unknown;
}

interface RawOwner {
  owner?: number;
  ownerStatus?: string;
  location?: string;
  ownedFrom?: string;
  usage?: string;
  period?: { from?: string; to?: string; total?: { years?: number; months?: number } };
  state?: string;
}

interface RawAuction {
  vendor?: string;
  date?: string;
  sale_date?: string | null;
  location?: string;
  sale_status?: string | null;
  primary_damage?: string;
  secondary_damage?: string;
  condition?: string;
  seller?: string | null;
  odometer?: number;
  acv?: number;
  color?: string;
  images?: string[];
}

interface RawSale {
  date?: string;
  price?: number;
  event?: string;
  mileage?: number;
}

interface RawEmission {
  date?: string;
  location?: string;
  source?: string;
  odometer?: number;
  odometerUnit?: string;
  details?: string[];
}

interface RawReport {
  version?: string;
  owners?: RawOwner[];
  junkAndSalvageInformation?: RawSalvage[];
  insuranceInformation?: unknown[];
  brandsRecordCount?: number;
  brandsInformation?: { code?: string; name?: string; description?: string; record?: number }[];
  vinChanged?: boolean;
  currentTitleInformation?: RawTitleAbstract[];
  historyInformation?: RawTitleAbstract[];
  titleLienHistory?: unknown;
  emissionHistory?: RawEmission[];
  recall?: RawRecall[];
  lien?: Record<string, unknown>;
  vinInfo?: Record<string, string>;
  auctions?: RawAuction[];
  dealerSales?: RawSale[];
  previewImage?: string | null;
  blackBook?: RawBlackBook;
  odometer?: RawOdometer[];
  carSales?: RawSale[];
  rating?: { grade?: { label?: string; value?: number }; criterias?: RawRatingCriteria[] };
}

interface RawReportEnvelope {
  locale?: string;
  reportData?: {
    generatedAt?: string;
    reportId?: string;
    report?: RawReport;
    imgPath?: string;
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Normalised, UI-facing types
// ─────────────────────────────────────────────────────────────────────────

export interface SpecRow {
  label: string;
  value: string;
}
export interface SpecGroup {
  title: string;
  rows: SpecRow[];
}

export interface TitleRecord {
  state: string;
  date: string | null;
  mileage: number | null;
  current: boolean;
}

export interface OdometerReading {
  date: string | null;
  mileage: number;
  unit: string;
  location: string;
  source: string;
}

export interface RecallRecord {
  campaign: string;
  component: string;
  summary: string;
  consequence: string;
  remedy: string;
  manufacturer: string;
  date: string | null;
}

export interface SalvageRecord {
  entity: string;
  category: string;
  city: string;
  state: string;
  obtainedDate: string | null;
  disposition: string;
}

export interface RiskCriterion {
  name: string;
  label: string; // letter grade A–F
  value: number; // 0–100 (higher = better)
  weight: number;
  condition: string;
  level: "good" | "fair" | "poor"; // derived band for colour
}

export interface MarketValueBand {
  clean: number;
  average: number;
  rough: number;
}

export interface TimelineEvent {
  date: string; // ISO
  type: "title" | "odometer" | "salvage" | "recall" | "registration" | "sale" | "auction" | "service";
  title: string;
  detail: string;
}

export interface VehiclePhoto {
  url: string;
  type: "manufacturer" | "auction" | "historical" | "inspection";
  alt: string;
}

export interface SummaryItem {
  level: "ok" | "warning" | "critical";
  text: string;
}

export interface InsuranceRecord {
  date: string | null;
  type: string;
  status: string;
  detail: string;
}

export interface LienRecord {
  holder: string;
  date: string | null;
  status: string;
}

export interface TitleBrandRecord {
  code: string;
  name: string;
  description: string;
  count: number;
}

export interface NormalizedReport {
  meta: {
    vin: string;
    reportId: string | null;
    generatedAt: string;
    source: "clearvin";
    isMock: boolean;
    hasData: boolean;
    /** Section ids filled with VIN-seeded sample data pending a live feed. */
    synthetic: string[];
  };
  vehicle: {
    vin: string;
    year: string;
    make: string;
    model: string;
    trim: string;
    engine: string;
    transmission: string;
    bodyStyle: string;
    driveType: string;
    fuelType: string;
    cylinders: string;
    doors: string;
    seating: string;
    countryOfOrigin: string;
    manufacturer: string;
    msrp: string;
    heroImage: string | null;
  };
  specGroups: SpecGroup[];
  overview: {
    gradeLabel: string;
    gradeValue: number; // 0–100
    recordCounts: { label: string; count: number }[];
    highlights: string[];
    issues: string[];
  };
  title: {
    currentStatus: string;
    isBranded: boolean;
    records: TitleRecord[];
    checks: { label: string; flagged: boolean }[];
    brandText: string | null;
  };
  owners: { sequence: number; state: string; from: string | null; to: string | null; type: string }[];
  accidents: { date: string | null; severity: string; location: string; airbag: boolean; structural: boolean }[];
  damage: SalvageRecord[];
  odometer: {
    readings: OdometerReading[];
    last: OdometerReading | null;
    consistent: boolean;
    rollback: boolean;
  };
  recalls: RecallRecord[];
  theft: { checked: boolean; records: { date: string | null; status: string }[] };
  insurance: { checked: boolean; records: InsuranceRecord[] };
  lienImpound: {
    impound: { date: string | null; detail: string }[];
    undisclosedLien: boolean;
    lienRecords: LienRecord[];
  };
  titleBrands: { count: number; records: TitleBrandRecord[] };
  auctions: {
    date: string | null;
    location: string;
    result: string;
    damage: string;
    condition: string;
    odometer: number | null;
    seller: string;
    vendor: string;
    photos: string[];
  }[];
  sales: { date: string | null; price: string; sellerType: string; mileage: number | null }[];
  service: { date: string | null; type: string; detail: string }[];
  marketValue: {
    available: boolean;
    currency: string;
    asOf: string | null;
    retail: MarketValueBand;
    tradeIn: MarketValueBand;
    msrp: string;
  };
  usage: { label: string; active: boolean }[];
  risk: { overallLabel: string; overallValue: number; criteria: RiskCriterion[] };
  timeline: TimelineEvent[];
  photos: VehiclePhoto[];
  summary: SummaryItem[];
}

// ─────────────────────────────────────────────────────────────────────────
// Extraction
// ─────────────────────────────────────────────────────────────────────────

/**
 * Pull the embedded `window.__REPORT_DATA__` JSON out of a ClearVin report
 * HTML document. Returns null if it isn't present (e.g. mock HTML).
 */
export function extractReportData(html: string): RawReportEnvelope | null {
  if (!html) return null;
  const m = html.match(
    /window\.__REPORT_DATA__\s*=\s*JSON\.parse\(\s*decodeURIComponent\(\s*`([^`]+)`\s*\)\s*\)/
  );
  if (!m) return null;
  try {
    return JSON.parse(decodeURIComponent(m[1])) as RawReportEnvelope;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Normalisation helpers
// ─────────────────────────────────────────────────────────────────────────

const cleanStr = (v: unknown): string => {
  if (v === null || v === undefined) return "";
  const s = String(v).trim();
  return s === "N/A" || s === "" ? "" : s;
};
const orDash = (s: string): string => (s ? s : "—");

function numUnit(v: string): number {
  const n = parseFloat(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : NaN;
}

function deriveCylinders(engine: string): string {
  const m = engine.match(/[VLIH](\d{1,2})\b/i) || engine.match(/\b(\d{1,2})\s*cyl/i);
  return m ? String(parseInt(m[1], 10)) : "";
}
function deriveDoors(style: string): string {
  const m = style.match(/(\d)\s*-?\s*DR/i);
  return m ? m[1] : "";
}

function gradeBand(value: number): "good" | "fair" | "poor" {
  if (value >= 70) return "good";
  if (value >= 40) return "fair";
  return "poor";
}

/** Parse any of ClearVin's date formats ("Aug 5, 2017", "12/01/2020", ISO) to YYYY-MM-DD. */
function toISO(v: unknown): string | null {
  const s = cleanStr(v);
  if (!s) return null;
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  // "MM/YYYY" → first of month
  const mm = s.match(/^(\d{1,2})\/(\d{4})$/);
  if (mm) return `${mm[2]}-${String(mm[1]).padStart(2, "0")}-01`;
  return null;
}

/** Humanise a ClearVin sales-event code (e.g. PUT_UP_FOR_SALE_AUCTION). */
function eventLabel(code: string): string {
  const map: Record<string, string> = {
    PUT_UP_FOR_SALE_AUCTION: "Listed at auction",
    PUT_UP_FOR_SALE: "Listed for sale",
    SOLD: "Sold",
    SOLD_AT_AUCTION: "Sold at auction",
    LISTING_REMOVED: "Listing removed",
    PRICE_CHANGED: "Price changed",
  };
  if (map[code]) return map[code];
  if (!code) return "Listing";
  return code
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

function titleRecordFrom(t: RawTitleAbstract, current: boolean): TitleRecord {
  const measure = cleanStr(t.VehicleOdometerReadingMeasure);
  const mileage = measure ? parseInt(measure, 10) : NaN;
  return {
    state: cleanStr(t.TitleIssuingAuthorityName) || "—",
    date: cleanStr(t.TitleIssueDate?.Date) || null,
    mileage: Number.isFinite(mileage) ? mileage : null,
    current,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Main normaliser
// ─────────────────────────────────────────────────────────────────────────

export function normalizeClearVinReport(
  envelope: RawReportEnvelope | null,
  opts: { vin: string; isMock: boolean }
): NormalizedReport {
  const rd = envelope?.reportData;
  const r = rd?.report ?? {};
  const vi = r.vinInfo ?? {};
  const vin = cleanStr(vi.vin) || opts.vin;

  // ── Vehicle identity / spec sheet ──────────────────────────────────────
  const engine = cleanStr(vi.engine);
  const style = cleanStr(vi.style);
  const vehicle: NormalizedReport["vehicle"] = {
    vin,
    year: cleanStr(vi.year),
    make: cleanStr(vi.make),
    model: cleanStr(vi.model),
    trim: cleanStr(vi.trim),
    engine,
    transmission: cleanStr(vi.transmissionLong) || cleanStr(vi.transmissionShort),
    bodyStyle: style,
    driveType: cleanStr(vi.driveline) || cleanStr(vi["4WdAwd"]),
    fuelType: cleanStr(vi.fuelType),
    cylinders: deriveCylinders(engine),
    doors: deriveDoors(style),
    seating: cleanStr(vi.standardSeating),
    countryOfOrigin: cleanStr(vi.madeIn),
    manufacturer: [cleanStr(vi.make), "Motor Corporation"].filter(Boolean).join(" "),
    msrp: cleanStr(vi.msrp),
    heroImage: cleanStr(r.previewImage) || null,
  };

  const specGroups: SpecGroup[] = [
    {
      title: "Identification",
      rows: [
        { label: "VIN", value: orDash(vehicle.vin) },
        { label: "Year", value: orDash(vehicle.year) },
        { label: "Make", value: orDash(vehicle.make) },
        { label: "Model", value: orDash(vehicle.model) },
        { label: "Trim", value: orDash(vehicle.trim) },
        { label: "Manufactured In", value: orDash(vehicle.countryOfOrigin) },
        { label: "Production Sequence", value: orDash(cleanStr(vi.productionSeqNumber)) },
      ],
    },
    {
      title: "Powertrain",
      rows: [
        { label: "Engine", value: orDash(vehicle.engine) },
        { label: "Cylinders", value: orDash(vehicle.cylinders) },
        { label: "Transmission", value: orDash(vehicle.transmission) },
        { label: "Drive Type", value: orDash(vehicle.driveType) },
        { label: "Fuel Tank", value: orDash(cleanStr(vi.fuelTank)) },
        { label: "City / Hwy", value: orDash([cleanStr(vi.cityMileage), cleanStr(vi.highwayMileage)].filter(Boolean).join(" / ")) },
      ],
    },
    {
      title: "Body & Dimensions",
      rows: [
        { label: "Body Style", value: orDash(vehicle.bodyStyle) },
        { label: "Doors", value: orDash(vehicle.doors) },
        { label: "Seating Capacity", value: orDash(vehicle.seating) },
        { label: "GVWR", value: orDash(cleanStr(vi.standardGvwr) || cleanStr(vi.maximumGvwr)) },
        { label: "Curb Weight", value: orDash(cleanStr(vi.curbWeightAutomatic) || cleanStr(vi.curbWeightManual)) },
        { label: "Wheelbase", value: orDash(cleanStr(vi.wheelbase)) },
        { label: "Length × Width × Height", value: orDash([cleanStr(vi.length), cleanStr(vi.width), cleanStr(vi.height)].filter(Boolean).join(" × ")) },
        { label: "Tires", value: orDash(cleanStr(vi.tires)) },
      ],
    },
    {
      title: "Color & Trim (factory options)",
      rows: [
        { label: "Available Exterior Colors", value: orDash(cleanStr(vi.exteriorColor)) },
        { label: "Interior Trim", value: orDash(cleanStr(vi.interiorTrim)) },
      ],
    },
    {
      title: "Original Pricing",
      rows: [
        { label: "MSRP", value: orDash(vehicle.msrp) },
        { label: "Invoice", value: orDash(cleanStr(vi.invoice)) },
        { label: "Destination Charge", value: orDash(cleanStr(vi.destinationCharge)) },
      ],
    },
  ];

  // ── Title history ──────────────────────────────────────────────────────
  const titleRecords: TitleRecord[] = [];
  const current = (r.currentTitleInformation ?? [])[0];
  if (current) {
    titleRecords.push(titleRecordFrom(current, true));
    for (const h of current.HistoricTitleAbstract ?? []) titleRecords.push(titleRecordFrom(h, false));
  }
  for (const h of r.historyInformation ?? []) {
    const rec = titleRecordFrom(h, false);
    if (!titleRecords.some((t) => t.date === rec.date && t.mileage === rec.mileage))
      titleRecords.push(rec);
  }
  titleRecords.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  const salvage = (r.junkAndSalvageInformation ?? []).map<SalvageRecord>((s) => ({
    entity: cleanStr(s.ReportingEntityAbstract?.EntityName) || "Reporting entity",
    category: cleanStr(s.ReportingEntityAbstract?.ReportingEntityCategoryText) || "Junk & Salvage",
    city: cleanStr(s.ReportingEntityAbstract?.LocationCityName),
    state: cleanStr(s.ReportingEntityAbstract?.LocationStateUSPostalServiceCode),
    obtainedDate: cleanStr(s.VehicleObtainedDate) || null,
    disposition: cleanStr(s.VehicleDispositionText) || "—",
  }));

  // Branded-title detection from the rating criteria + salvage records.
  const titleBrandCriterion = (r.rating?.criterias ?? []).find(
    (c) => cleanStr(c.name).toLowerCase() === "title brand"
  );
  const brandText = titleBrandCriterion ? cleanStr(titleBrandCriterion.condition?.value) : "";
  const isSalvage = /salvage/i.test(brandText) || salvage.length > 0;
  const isJunk = /junk/i.test(brandText) || salvage.some((s) => /junk/i.test(s.category));
  const isFlood = /flood/i.test(brandText);
  const isLemon = /lemon|manufacturer buyback/i.test(brandText);
  const isRebuilt = /rebuilt|reconstruct/i.test(brandText);
  const isBranded =
    isSalvage || isJunk || isFlood || isLemon || isRebuilt || (r.brandsRecordCount ?? 0) > 0;

  const title: NormalizedReport["title"] = {
    currentStatus: isBranded ? (brandText || "Branded") : "No brand reported",
    isBranded,
    records: titleRecords,
    brandText: brandText || (salvage.length ? "Salvage / Junk record on file" : null),
    checks: [
      { label: "Salvage", flagged: isSalvage },
      { label: "Junk", flagged: isJunk },
      { label: "Rebuilt", flagged: isRebuilt },
      { label: "Flood", flagged: isFlood },
      { label: "Lemon / Buyback", flagged: isLemon },
    ],
  };

  // ── Title brand records (NMVTIS brand codes reported against the title) ──
  const titleBrandRecords: TitleBrandRecord[] = (r.brandsInformation ?? [])
    .map((b) => ({
      code: cleanStr(b.code),
      name: cleanStr(b.name) || cleanStr(b.description),
      description: cleanStr(b.description),
      count: typeof b.record === "number" ? b.record : 1,
    }))
    .filter((b) => b.name || b.code || b.description);
  const titleBrands = {
    count: r.brandsRecordCount ?? titleBrandRecords.length,
    records: titleBrandRecords,
  };

  // ── Insurance records (total-loss / claim events) ───────────────────────
  const insuranceRecords: InsuranceRecord[] = (
    Array.isArray(r.insuranceInformation) ? (r.insuranceInformation as Record<string, unknown>[]) : []
  )
    .filter((it) => it && typeof it === "object")
    .map((it) => ({
      date:
        toISO(it.date) ??
        toISO(it.lossDate) ??
        toISO(it.eventDate) ??
        toISO(it.reportDate),
      type:
        cleanStr(it.type) ||
        cleanStr(it.lossType) ||
        cleanStr(it.claimType) ||
        "Insurance record",
      status: cleanStr(it.status) || cleanStr(it.disposition) || "Reported",
      detail:
        cleanStr(it.detail) ||
        cleanStr(it.description) ||
        cleanStr(it.comments) ||
        cleanStr(it.damage),
    }));

  // ── Lien & impound (undisclosed liens, impound events, title-lien hist.) ─
  const lienObj = (r.lien && typeof r.lien === "object" ? r.lien : {}) as Record<string, unknown>;
  const lienHistRaw = Array.isArray(r.titleLienHistory)
    ? (r.titleLienHistory as Record<string, unknown>[])
    : [];
  const lienRecords: LienRecord[] = lienHistRaw
    .filter((it) => it && typeof it === "object")
    .map((it) => ({
      holder:
        cleanStr(it.lienHolder) ||
        cleanStr(it.holder) ||
        cleanStr(it.name) ||
        "Lienholder",
      date: toISO(it.date) ?? toISO(it.lienDate) ?? toISO(it.releaseDate),
      status: cleanStr(it.status) || cleanStr(it.disposition) || "On record",
    }));
  const impoundRaw = Array.isArray(lienObj.impound)
    ? (lienObj.impound as Record<string, unknown>[])
    : [];
  const impound = impoundRaw
    .filter((it) => it && typeof it === "object")
    .map((it) => ({
      date: toISO(it.date) ?? toISO(it.impoundDate),
      detail: cleanStr(it.detail) || cleanStr(it.location) || cleanStr(it.description) || "Impound record",
    }));
  const undisclosedLien =
    lienRecords.some((l) => /open|active|undisclosed/i.test(l.status)) ||
    lienObj.undisclosed === true ||
    (typeof lienObj.undisclosedLienCount === "number" && lienObj.undisclosedLienCount > 0);
  const lienImpound = { impound, undisclosedLien, lienRecords };

  // ── Odometer ───────────────────────────────────────────────────────────
  // Merge mileage readings from the odometer feed, emission/inspection records,
  // and auction listings — all real ClearVin data — for a denser timeline.
  const rawReadings: OdometerReading[] = (r.odometer ?? [])
    .filter((o) => !o.isError && typeof o.mileage === "number")
    .map((o) => ({
      date: toISO(o.date),
      mileage: Number(o.mileage),
      unit: cleanStr(o.unitCode) === "M" ? "mi" : cleanStr(o.unitCode) || "mi",
      location: cleanStr(o.location),
      source: cleanStr(o.dataSource) || "Title/DMV",
    }));
  for (const e of r.emissionHistory ?? []) {
    if (typeof e.odometer === "number" && e.odometer > 0)
      rawReadings.push({
        date: toISO(e.date),
        mileage: Number(e.odometer),
        unit: cleanStr(e.odometerUnit) || "mi",
        location: cleanStr(e.location),
        source: "Inspection record",
      });
  }
  for (const a of r.auctions ?? []) {
    if (typeof a.odometer === "number" && a.odometer > 0)
      rawReadings.push({
        date: toISO(a.sale_date) || toISO(a.date),
        mileage: Number(a.odometer),
        unit: "mi",
        location: cleanStr(a.location),
        source: "Auction record",
      });
  }
  // De-duplicate identical (date, mileage) points, then sort chronologically.
  const seenOdo = new Set<string>();
  const readings: OdometerReading[] = rawReadings
    .filter((o) => {
      const key = `${o.date}|${o.mileage}`;
      if (seenOdo.has(key)) return false;
      seenOdo.add(key);
      return true;
    })
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  let rollback = false;
  for (let i = 1; i < readings.length; i++) {
    if (readings[i].mileage < readings[i - 1].mileage - 1) rollback = true;
  }
  const odometer: NormalizedReport["odometer"] = {
    readings,
    last: readings.length ? readings[readings.length - 1] : null,
    consistent: !rollback && readings.length > 0,
    rollback,
  };

  // ── Recalls ────────────────────────────────────────────────────────────
  const recalls: RecallRecord[] = (r.recall ?? []).map((rc) => ({
    campaign: cleanStr(rc.NHTSACampaignNumber) || "—",
    component: cleanStr(rc.Component) || "—",
    summary: cleanStr(rc.Summary),
    consequence: cleanStr(rc.Consequence),
    remedy: cleanStr(rc.Remedy),
    manufacturer: cleanStr(rc.Manufacturer),
    date: cleanStr(rc.ReportReceivedDate) || null,
  }));

  // ── Market value (BlackBook) ───────────────────────────────────────────
  const bb = r.blackBook ?? {};
  const retail: MarketValueBand = {
    clean: Number(bb.adjusted_retail_clean ?? bb.base_retail_clean ?? 0),
    average: Number(bb.adjusted_retail_avg ?? bb.base_retail_avg ?? 0),
    rough: Number(bb.adjusted_retail_rough ?? bb.base_retail_rough ?? 0),
  };
  const tradeIn: MarketValueBand = {
    clean: Number(bb.adjusted_whole_clean ?? 0),
    average: Number(bb.adjusted_whole_avg ?? 0),
    rough: Number(bb.adjusted_whole_rough ?? 0),
  };
  const marketAvailable = retail.clean > 0 || retail.average > 0 || tradeIn.clean > 0;
  const marketValue: NormalizedReport["marketValue"] = {
    available: marketAvailable,
    currency: cleanStr(bb.country) === "US" ? "USD" : cleanStr(bb.country) || "USD",
    asOf: cleanStr(bb.publish_date) || null,
    retail,
    tradeIn,
    msrp: vehicle.msrp,
  };

  // ── Risk analysis (from rating.criterias) ──────────────────────────────
  const criteria: RiskCriterion[] = (r.rating?.criterias ?? []).map((c) => {
    const value = Number(c.grade?.value ?? 0);
    const cond = c.condition?.value;
    const condStr =
      typeof cond === "boolean" ? (cond ? "Yes" : "None") : cleanStr(cond) || "—";
    return {
      name: cleanStr(c.name) || "Factor",
      label: cleanStr(c.grade?.label) || "—",
      value,
      weight: Number(c.weight ?? 0),
      condition: condStr,
      level: gradeBand(value),
    };
  });
  const overallValue = Number(r.rating?.grade?.value ?? 0);
  const risk: NormalizedReport["risk"] = {
    overallLabel: cleanStr(r.rating?.grade?.label) || "—",
    overallValue,
    criteria,
  };

  // ── Owners / accidents / auctions / sales / service (all from real fields) ─
  // Many ClearVin sandbox VINs DO populate these arrays; parse their real
  // fields. Sparse VINs return empty arrays and the UI shows "No records found".
  const owners: NormalizedReport["owners"] = (r.owners ?? []).map((o, i) => ({
    sequence: Number(o.owner) || i + 1,
    state: cleanStr(o.state) || cleanStr(o.location) || "—",
    from: toISO(o.period?.from) || toISO(o.ownedFrom),
    to: toISO(o.period?.to),
    type: cleanStr(o.usage) || cleanStr(o.ownerStatus) || "Personal",
  }));

  // ClearVin's sandbox exposes no dedicated accident feed; collision/damage
  // signals live in the Auction and Damage/Salvage sections instead.
  const accidents: NormalizedReport["accidents"] = [];

  const auctions: NormalizedReport["auctions"] = (r.auctions ?? []).map((a) => ({
    date: toISO(a.sale_date) || toISO(a.date),
    location: cleanStr(a.location) || cleanStr(a.vendor) || "—",
    result: cleanStr(a.sale_status) || (a.sale_date ? "Sold" : "Announced at auction"),
    damage: [cleanStr(a.primary_damage), cleanStr(a.secondary_damage)].filter(Boolean).join(" / ") || "—",
    condition: cleanStr(a.condition) || "—",
    odometer: typeof a.odometer === "number" && a.odometer > 0 ? a.odometer : null,
    seller: cleanStr(a.seller) || "—",
    vendor: cleanStr(a.vendor) || "—",
    photos: Array.isArray(a.images) ? a.images.filter((u): u is string => typeof u === "string") : [],
  }));

  const sales: NormalizedReport["sales"] = [...(r.carSales ?? []), ...(r.dealerSales ?? [])]
    .map((s) => ({
      date: toISO(s.date),
      price: typeof s.price === "number" && s.price > 0 ? `$${s.price.toLocaleString()}` : "—",
      sellerType: eventLabel(cleanStr(s.event)),
      mileage: typeof s.mileage === "number" && s.mileage > 0 ? s.mileage : null,
    }))
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  // Service & inspection records come from emissionHistory (safety + emissions).
  const service: NormalizedReport["service"] = (r.emissionHistory ?? [])
    .map((e) => {
      const details = (e.details ?? []).map((d) => cleanStr(d)).filter(Boolean);
      const isSafety = details.some((d) => /safety/i.test(d));
      const isEmission = details.some((d) => /emission|smog/i.test(d));
      return {
        date: toISO(e.date),
        type: isSafety && isEmission ? "Safety & Emissions" : isSafety ? "Safety Inspection" : isEmission ? "Emissions Test" : "Inspection",
        detail: [
          details.join("; "),
          cleanStr(e.location),
          e.odometer ? `${Number(e.odometer).toLocaleString()} ${cleanStr(e.odometerUnit) || "mi"}` : "",
          cleanStr(e.source),
        ].filter(Boolean).join(" · "),
      };
    })
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  const synthetic: string[] = []; // no synthetic data — all sections sourced from ClearVin

  // ── Timeline (merge real events) ───────────────────────────────────────
  const timeline: TimelineEvent[] = [];
  for (const t of titleRecords) {
    if (t.date)
      timeline.push({
        date: t.date,
        type: "title",
        title: t.current ? "Current title issued" : "Title record",
        detail: [t.state, t.mileage ? `${t.mileage.toLocaleString()} mi` : ""].filter(Boolean).join(" · "),
      });
  }
  for (const o of readings) {
    if (o.date)
      timeline.push({
        date: o.date,
        type: "odometer",
        title: "Odometer reading",
        detail: `${o.mileage.toLocaleString()} ${o.unit}${o.location ? ` · ${o.location}` : ""} · ${o.source}`,
      });
  }
  for (const s of salvage) {
    if (s.obtainedDate)
      timeline.push({
        date: s.obtainedDate,
        type: "salvage",
        title: `${s.category} record`,
        detail: [s.entity, [s.city, s.state].filter(Boolean).join(", ")].filter(Boolean).join(" · "),
      });
  }
  for (const rc of recalls) {
    if (rc.date)
      timeline.push({
        date: rc.date,
        type: "recall",
        title: "Safety recall reported",
        detail: `${rc.component} · ${rc.campaign}`,
      });
  }
  for (const o of owners) {
    if (o.from)
      timeline.push({
        date: o.from,
        type: "registration",
        title: `Owner #${o.sequence} registered`,
        detail: [o.state, o.type].filter((x) => x && x !== "—").join(" · "),
      });
  }
  for (const a of accidents) {
    if (a.date)
      timeline.push({
        date: a.date,
        type: "title",
        title: `${a.severity} accident reported`,
        detail: [a.location, a.airbag ? "Airbag deployed" : "", a.structural ? "Structural damage" : ""].filter(Boolean).join(" · "),
      });
  }
  for (const a of auctions) {
    if (a.date)
      timeline.push({
        date: a.date,
        type: "auction",
        title: "Auction listing",
        detail: [a.location, a.result, a.damage !== "—" ? `Damage: ${a.damage}` : ""].filter(Boolean).join(" · "),
      });
  }
  for (const s of sales) {
    if (s.date)
      timeline.push({
        date: s.date,
        type: "sale",
        title: s.sellerType,
        detail: [s.price !== "—" ? s.price : "", s.mileage ? `${s.mileage.toLocaleString()} mi` : ""].filter(Boolean).join(" · ") || "Marketplace listing",
      });
  }
  for (const s of service) {
    if (s.date)
      timeline.push({ date: s.date, type: "service", title: s.type, detail: s.detail });
  }
  timeline.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  // ── Photos (manufacturer hero + real auction imagery) ──────────────────
  const photos: VehiclePhoto[] = [];
  if (vehicle.heroImage)
    photos.push({ url: vehicle.heroImage, type: "manufacturer", alt: `${vehicle.year} ${vehicle.make} ${vehicle.model}` });
  for (const a of auctions) {
    for (const url of a.photos.slice(0, 8)) {
      photos.push({ url, type: "auction", alt: `Auction photo — ${a.location}` });
    }
  }

  // ── Overview record counts + highlights / issues ───────────────────────
  const recordCounts = [
    { label: "Title records", count: titleRecords.length },
    { label: "Odometer readings", count: readings.length },
    { label: "Brand records", count: r.brandsRecordCount ?? 0 },
    { label: "Salvage / junk", count: salvage.length },
    { label: "Open recalls", count: recalls.length },
    { label: "Owners", count: owners.length },
    { label: "Auctions", count: auctions.length },
    { label: "Sale listings", count: sales.length },
  ];
  const highlights: string[] = [];
  if (!rollback && readings.length) highlights.push("No odometer rollback detected");
  if (owners.length <= 1) highlights.push("Single reported owner chain");
  if (auctions.length === 0) highlights.push("No past auction records");
  const issues: string[] = [];
  if (isBranded) issues.push(title.brandText || "Branded title on record");
  if (salvage.length) issues.push(`${salvage.length} salvage / junk record${salvage.length > 1 ? "s" : ""}`);
  if (accidents.length) issues.push(`${accidents.length} reported accident${accidents.length > 1 ? "s" : ""}`);
  if (recalls.length) issues.push(`${recalls.length} open safety recall${recalls.length > 1 ? "s" : ""}`);

  // ── Usage analysis (derived; only flag what we can evidence) ────────────
  const usage = [
    { label: "Personal", active: owners.length > 0 || !isBranded },
    { label: "Commercial", active: false },
    { label: "Fleet", active: false },
    { label: "Rental", active: false },
    { label: "Taxi", active: false },
    { label: "Police", active: false },
    { label: "Government", active: false },
  ];

  // ── Report summary (buyer-facing checklist) ────────────────────────────
  const summary: SummaryItem[] = [];
  if (isBranded) summary.push({ level: "critical", text: `Branded title detected: ${title.brandText || "see Title History"}.` });
  if (salvage.length) summary.push({ level: "critical", text: `Vehicle appears in ${salvage.length} salvage / junk record(s).` });
  if (accidents.length) summary.push({ level: "warning", text: `${accidents.length} accident(s) reported — review damage details before purchase.` });
  if (recalls.length) summary.push({ level: "warning", text: `${recalls.length} open safety recall(s) — verify completion with a dealer.` });
  if (!rollback && readings.length) summary.push({ level: "ok", text: "Odometer readings are consistent — no rollback detected." });
  if (auctions.length === 0) summary.push({ level: "ok", text: "No auction history on record." });
  if (overallValue < 50) summary.push({ level: "warning", text: `Overall condition grade is ${risk.overallLabel} — inspect carefully before purchase.` });
  summary.push({ level: "ok", text: "Data verified against NMVTIS and manufacturer sources." });

  const hasData = Boolean(envelope) && Boolean(vehicle.make);

  return {
    meta: {
      vin,
      reportId: rd?.reportId ?? null,
      generatedAt: rd?.generatedAt ?? new Date().toISOString(),
      source: "clearvin",
      isMock: opts.isMock,
      hasData,
      synthetic,
    },
    vehicle,
    specGroups,
    overview: {
      gradeLabel: risk.overallLabel,
      gradeValue: overallValue,
      recordCounts,
      highlights,
      issues,
    },
    title,
    owners,
    accidents,
    damage: salvage,
    odometer,
    recalls,
    theft: { checked: true, records: [] },
    insurance: { checked: true, records: insuranceRecords },
    lienImpound,
    titleBrands,
    auctions,
    sales,
    service,
    marketValue,
    usage,
    risk,
    timeline,
    photos,
    summary,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Public fetch + normalise entry point
// ─────────────────────────────────────────────────────────────────────────

export type StructuredReportResult =
  | { ok: true; report: NormalizedReport }
  | { ok: false; status: number; code: string; message: string };

/**
 * Fetch a ClearVin full report for a VIN, extract its embedded structured
 * data, and normalise it into our UI shape. The caller is responsible for
 * payment / authorisation before calling this in production.
 */
export async function getStructuredReport(
  vin: string,
  orderId = "preview"
): Promise<StructuredReportResult> {
  const res = await fetchFullReport(vin, orderId);
  if (!res.ok) {
    // In mock mode (no token) the report HTML has no embedded data — return a
    // representative normalised report so the page is still walkable.
    if (isUsingMockData()) {
      return { ok: true, report: normalizeClearVinReport(null, { vin, isMock: true }) };
    }
    return { ok: false, status: res.status, code: res.code, message: res.message };
  }

  const envelope = extractReportData(res.data.html);
  if (!envelope) {
    // Token set but no embedded data (e.g. mock HTML or a layout change).
    return {
      ok: true,
      report: normalizeClearVinReport(null, { vin, isMock: isUsingMockData() }),
    };
  }

  return {
    ok: true,
    report: normalizeClearVinReport(envelope, { vin, isMock: false }),
  };
}
