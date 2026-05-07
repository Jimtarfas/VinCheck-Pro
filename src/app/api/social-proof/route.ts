/**
 * Social-proof feed for the conversion toast.
 *
 * Returns a list of "activity events" (someone just ran a check, someone
 * just downloaded a report, etc.) that the floating widget cycles
 * through. We blend three data sources:
 *
 *   1. REAL recent VIN lookups (anonymized) — pulled from the
 *      vin_lookups table over the last 7 days. Most authentic.
 *   2. REAL recent downloads — same idea, but from report_downloads.
 *   3. SYNTHETIC fillers when there isn't enough real activity yet
 *      (so a brand-new install still looks active).
 *
 * Privacy:
 *   - First names only, drawn from a fixed pool (we don't expose any
 *     names visitors actually entered).
 *   - State only (no city), derived from country_name when present.
 *   - VINs masked to first-3 + last-3 with the rest dotted out.
 */

import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const revalidate = 30; // re-fetch from DB at most every 30s

// ────────────────────────────────────────────────────────────────────
// Names + locations pools
// ────────────────────────────────────────────────────────────────────
const FIRST_NAMES = [
  "Alex","Jordan","Sam","Taylor","Casey","Morgan","Riley","Avery",
  "Mike","David","James","John","Robert","William","Tom","Chris",
  "Sarah","Emily","Jessica","Ashley","Amanda","Jennifer","Lisa","Elena",
  "Carlos","Miguel","Diego","Luis","Marcus","Devon","Tyler","Jake",
  "Priya","Aisha","Sofia","Olivia","Maya","Ava","Nora","Layla",
];
const US_STATES = [
  "California","Texas","Florida","New York","Illinois","Pennsylvania",
  "Ohio","Georgia","North Carolina","Michigan","New Jersey","Virginia",
  "Washington","Arizona","Massachusetts","Tennessee","Indiana","Missouri",
  "Maryland","Colorado","Wisconsin","Minnesota","South Carolina","Alabama",
  "Louisiana","Kentucky","Oregon","Oklahoma","Connecticut","Utah",
];

const POPULAR_MAKES = [
  "Toyota","Honda","Ford","Chevrolet","Nissan","Hyundai","Kia","BMW",
  "Mercedes-Benz","Audi","Volkswagen","Subaru","Mazda","Jeep","Ram",
  "GMC","Lexus","Acura","Tesla","Dodge",
];
const POPULAR_MODELS_BY_MAKE: Record<string, string[]> = {
  Toyota: ["Camry","RAV4","Corolla","Tacoma","Highlander","4Runner"],
  Honda: ["Civic","Accord","CR-V","Pilot","Odyssey"],
  Ford: ["F-150","Mustang","Explorer","Escape","Bronco"],
  Chevrolet: ["Silverado","Equinox","Tahoe","Malibu","Camaro"],
  Nissan: ["Altima","Rogue","Sentra","Pathfinder","Frontier"],
  Hyundai: ["Tucson","Santa Fe","Elantra","Sonata"],
  Kia: ["Sorento","Sportage","Forte","Telluride"],
  BMW: ["3 Series","5 Series","X3","X5"],
  "Mercedes-Benz": ["C-Class","E-Class","GLC","GLE"],
  Audi: ["A4","Q5","A6","Q7"],
  Volkswagen: ["Jetta","Atlas","Tiguan","Passat"],
  Subaru: ["Outback","Forester","Crosstrek"],
  Mazda: ["CX-5","Mazda3","CX-9"],
  Jeep: ["Wrangler","Grand Cherokee","Cherokee","Compass"],
  Ram: ["1500","2500"],
  GMC: ["Sierra","Yukon","Acadia"],
  Lexus: ["RX","ES","NX"],
  Acura: ["MDX","RDX","TLX"],
  Tesla: ["Model 3","Model Y","Model S"],
  Dodge: ["Charger","Challenger","Durango"],
};

// Stable hashing so the same VIN always anonymizes to the same name +
// state across page loads.
function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
function pick<T>(arr: T[], seed: number): T {
  if (arr.length === 0) throw new Error("pick from empty array");
  // `(s % n + n) % n` guarantees a non-negative result even if `seed`
  // is negative after bit-shifts overflow into a signed int.
  const n = arr.length;
  const idx = ((seed % n) + n) % n;
  return arr[idx];
}
function maskVin(vin: string): string {
  if (!vin || vin.length < 7) return vin;
  return `${vin.slice(0, 3)}•••${vin.slice(-3)}`;
}

// ────────────────────────────────────────────────────────────────────
// Activity assembly
// ────────────────────────────────────────────────────────────────────

export interface SocialEvent {
  /** Stable id for React keys — derived from event source + timestamp */
  id: string;
  type: "lookup" | "download" | "alert" | "savings";
  /** Anonymized display name */
  name: string;
  /** Human-friendly state */
  location: string;
  /** Full HTML-safe message */
  message: string;
  /** Masked VIN, only when relevant */
  vin?: string;
  /** Vehicle (e.g. "2021 Toyota Camry") */
  vehicle?: string;
  /** Original timestamp */
  at: string;
  /** "2 min ago", "just now" */
  ago: string;
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  if (diffMs < 60_000) return "just now";
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function vehicleLabel(year: number | null, make: string | null, model: string | null): string {
  return [year, make, model].filter(Boolean).join(" ") || "a vehicle";
}

interface DbRow {
  vin: string;
  make: string | null;
  model: string | null;
  year: number | null;
  country_name?: string | null;
  city?: string | null;
  region?: string | null;
  created_at: string;
}

function eventFromLookup(r: DbRow): SocialEvent {
  const seed = hashStr(r.vin);
  const name = pick(FIRST_NAMES, seed);
  const state =
    r.country_name === "United States"
      ? r.region || pick(US_STATES, seed >> 4)
      : r.country_name || pick(US_STATES, seed >> 4);
  const veh = vehicleLabel(r.year, r.make, r.model);
  return {
    id: `lookup-${r.vin}-${r.created_at}`,
    type: "lookup",
    name,
    location: state,
    vin: maskVin(r.vin),
    vehicle: veh,
    message: `${name} just ran a VIN check on ${veh}`,
    at: r.created_at,
    ago: timeAgo(r.created_at),
  };
}

function eventFromDownload(r: DbRow): SocialEvent {
  const seed = hashStr(r.vin) ^ 0xff;
  const name = pick(FIRST_NAMES, seed);
  const state =
    r.country_name === "United States"
      ? r.region || pick(US_STATES, seed >> 4)
      : r.country_name || pick(US_STATES, seed >> 4);
  const veh = vehicleLabel(r.year, r.make, r.model);
  return {
    id: `dl-${r.vin}-${r.created_at}`,
    type: "download",
    name,
    location: state,
    vin: maskVin(r.vin),
    vehicle: veh,
    message: `${name} downloaded a full report for ${veh}`,
    at: r.created_at,
    ago: timeAgo(r.created_at),
  };
}

// Synthetic events when DB doesn't have enough volume yet.
// Time-stamped so they look fresh on each fetch.
function syntheticEvents(): SocialEvent[] {
  const now = Date.now();
  // 8 templates of varying styles
  const templates: Array<(seed: number, mins: number) => SocialEvent> = [
    (seed, mins) => {
      const make = pick(POPULAR_MAKES, seed);
      const model = pick(POPULAR_MODELS_BY_MAKE[make] || ["sedan"], seed >> 1);
      const year = 2018 + (seed % 8);
      const state = pick(US_STATES, seed >> 3);
      const name = pick(FIRST_NAMES, seed >> 4);
      const at = new Date(now - mins * 60_000).toISOString();
      return {
        id: `s-${seed}-${mins}`,
        type: "lookup",
        name,
        location: state,
        vehicle: `${year} ${make} ${model}`,
        message: `${name} just verified a ${year} ${make} ${model}`,
        at,
        ago: timeAgo(at),
      };
    },
    (seed, mins) => {
      const make = pick(POPULAR_MAKES, seed);
      const model = pick(POPULAR_MODELS_BY_MAKE[make] || ["truck"], seed >> 1);
      const state = pick(US_STATES, seed >> 3);
      const name = pick(FIRST_NAMES, seed >> 4);
      const at = new Date(now - mins * 60_000).toISOString();
      return {
        id: `s-${seed}-${mins}`,
        type: "download",
        name,
        location: state,
        vehicle: `${make} ${model}`,
        message: `${name} downloaded the full vehicle history for a ${make} ${model}`,
        at,
        ago: timeAgo(at),
      };
    },
    (seed, mins) => {
      const state = pick(US_STATES, seed >> 3);
      const name = pick(FIRST_NAMES, seed >> 4);
      const at = new Date(now - mins * 60_000).toISOString();
      return {
        id: `s-${seed}-${mins}`,
        type: "alert",
        name,
        location: state,
        message: `${name} avoided a salvage-titled vehicle just in time`,
        at,
        ago: timeAgo(at),
      };
    },
    (seed, mins) => {
      const state = pick(US_STATES, seed >> 3);
      const name = pick(FIRST_NAMES, seed >> 4);
      const amount = 1500 + (seed % 35) * 100;
      const at = new Date(now - mins * 60_000).toISOString();
      return {
        id: `s-${seed}-${mins}`,
        type: "savings",
        name,
        location: state,
        message: `${name} saved $${amount.toLocaleString()} negotiating after spotting accident history`,
        at,
        ago: timeAgo(at),
      };
    },
    (seed, mins) => {
      const make = pick(POPULAR_MAKES, seed);
      const state = pick(US_STATES, seed >> 3);
      const name = pick(FIRST_NAMES, seed >> 4);
      const at = new Date(now - mins * 60_000).toISOString();
      return {
        id: `s-${seed}-${mins}`,
        type: "lookup",
        name,
        location: state,
        message: `${name} caught odometer rollback on a used ${make}`,
        at,
        ago: timeAgo(at),
      };
    },
  ];

  // Generate ~12 events spread over the last hour
  const events: SocialEvent[] = [];
  for (let i = 0; i < 12; i++) {
    const seed = hashStr(`v3-${i}-${Math.floor(Date.now() / 60_000)}`); // re-seeds every minute
    const mins = 1 + (seed % 55); // 1–55 mins ago
    const tpl = templates[seed % templates.length];
    events.push(tpl(seed, mins));
  }
  return events;
}

export async function GET() {
  let realLookups: DbRow[] = [];
  let realDownloads: DbRow[] = [];

  // Best-effort: missing tables / env vars should NOT break the toast.
  try {
    const admin = createAdminClient();
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400_000).toISOString();

    const [{ data: lookups }, { data: downloads }] = await Promise.all([
      admin
        .from("vin_lookups")
        .select("vin, make, model, year, created_at")
        .gte("created_at", sevenDaysAgo)
        .order("created_at", { ascending: false })
        .limit(40),
      admin
        .from("report_downloads")
        .select("vin, make, model, year, created_at")
        .gte("created_at", sevenDaysAgo)
        .order("created_at", { ascending: false })
        .limit(20),
    ]);
    realLookups = (lookups ?? []) as DbRow[];
    realDownloads = (downloads ?? []) as DbRow[];
  } catch {
    // ignore — we'll just use synthetic
  }

  const realEvents: SocialEvent[] = [
    ...realDownloads.map(eventFromDownload),
    ...realLookups.map(eventFromLookup),
  ];

  // If we have lots of real activity, weight it more heavily; if not,
  // fill with synthetic so the toast never feels dead.
  const synthetic = syntheticEvents();
  const merged: SocialEvent[] = [];

  if (realEvents.length >= 6) {
    // 70% real, 30% synthetic
    merged.push(...realEvents.slice(0, 14));
    merged.push(...synthetic.slice(0, 6));
  } else {
    // Boost synthetic so the feed doesn't feel empty
    merged.push(...realEvents);
    merged.push(...synthetic);
  }

  // Sort by timestamp descending (most recent first) and dedupe by id
  const seen = new Set<string>();
  const final = merged
    .filter((e) => (seen.has(e.id) ? false : seen.add(e.id) && true))
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 20)
    .map((e) => ({ ...e, ago: timeAgo(e.at) }));

  return NextResponse.json({ events: final, generatedAt: new Date().toISOString() });
}
