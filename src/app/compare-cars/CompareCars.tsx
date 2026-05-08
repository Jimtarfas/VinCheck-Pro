"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeftRight,
  Award,
  Car,
  CircleDollarSign,
  Fuel,
  Gauge,
  ImageIcon,
  RefreshCcw,
  Shield,
  ShoppingBag,
  Sparkles,
  Trophy,
} from "lucide-react";
import {
  type VehicleSpec,
  getVehicleBySlug,
  listMakes,
  listModelsForMake,
  vehicleSpecs,
  vehicleToSlug,
} from "@/lib/vehicle-specs";

/* ── Public wrapper — Suspense is required for useSearchParams in Next 15+ ── */
export default function CompareCars() {
  return (
    <Suspense fallback={<CompareCarsSkeleton />}>
      <CompareCarsInner />
    </Suspense>
  );
}

function CompareCarsSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 animate-pulse">
      <div className="h-6 w-48 bg-slate-100 rounded mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-40 bg-slate-50 rounded-xl" />
        <div className="h-40 bg-slate-50 rounded-xl" />
      </div>
    </div>
  );
}

/* ── Inner component (uses useSearchParams) ── */
function CompareCarsInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const aSlug = searchParams.get("a") ?? "";
  const bSlug = searchParams.get("b") ?? "";

  const initialA = useMemo(() => getVehicleBySlug(aSlug), [aSlug]);
  const initialB = useMemo(() => getVehicleBySlug(bSlug), [bSlug]);

  const [vehicleA, setVehicleA] = useState<VehicleSpec | undefined>(initialA);
  const [vehicleB, setVehicleB] = useState<VehicleSpec | undefined>(initialB);

  // When URL changes externally, mirror it.
  useEffect(() => {
    setVehicleA(getVehicleBySlug(aSlug));
    setVehicleB(getVehicleBySlug(bSlug));
  }, [aSlug, bSlug]);

  // Keep URL in sync as the user changes selections.
  const updateUrl = useCallback(
    (a: VehicleSpec | undefined, b: VehicleSpec | undefined) => {
      const params = new URLSearchParams();
      if (a) params.set("a", vehicleToSlug(a));
      if (b) params.set("b", vehicleToSlug(b));
      const qs = params.toString();
      router.replace(qs ? `/compare-cars?${qs}` : "/compare-cars", { scroll: false });
    },
    [router]
  );

  const onSelectA = (v: VehicleSpec | undefined) => {
    setVehicleA(v);
    updateUrl(v, vehicleB);
  };
  const onSelectB = (v: VehicleSpec | undefined) => {
    setVehicleB(v);
    updateUrl(vehicleA, v);
  };

  function reset() {
    setVehicleA(undefined);
    setVehicleB(undefined);
    router.replace("/compare-cars", { scroll: false });
  }

  function swap() {
    const tmpA = vehicleA;
    setVehicleA(vehicleB);
    setVehicleB(tmpA);
    updateUrl(vehicleB, tmpA);
  }

  return (
    <div className="space-y-6">
      {/* ── Selector card ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Pick Two Vehicles to Compare
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={swap}
              disabled={!vehicleA && !vehicleB}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title="Swap A & B"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              Swap
            </button>
            <button
              type="button"
              onClick={reset}
              disabled={!vehicleA && !vehicleB}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title="Reset"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <VehiclePicker
            label="Vehicle A"
            selected={vehicleA}
            onChange={onSelectA}
            badgeColor="bg-primary-50 text-primary-700 border-primary-100"
          />
          <VehiclePicker
            label="Vehicle B"
            selected={vehicleB}
            onChange={onSelectB}
            badgeColor="bg-amber-50 text-amber-700 border-amber-100"
          />
        </div>
      </div>

      {/* ── Comparison results ── */}
      {vehicleA && vehicleB && <ComparisonResults a={vehicleA} b={vehicleB} />}

      {(vehicleA && !vehicleB) || (!vehicleA && vehicleB) ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <Sparkles className="w-6 h-6 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-700 font-medium">
            Pick a second vehicle to see the side-by-side comparison
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Compare 30+ specs including price, MPG, performance, safety, and features.
          </p>
        </div>
      ) : null}

      {!vehicleA && !vehicleB && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <Car className="w-7 h-7 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-700 font-medium">
            Select two vehicles above to start comparing
          </p>
          <p className="text-xs text-slate-500 mt-1">
            40+ popular models &middot; 2024 model-year specs &middot; instant winner analysis
          </p>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Vehicle picker
   ────────────────────────────────────────────────────────────── */

function VehiclePicker({
  label,
  selected,
  onChange,
  badgeColor,
}: {
  label: string;
  selected: VehicleSpec | undefined;
  onChange: (v: VehicleSpec | undefined) => void;
  badgeColor: string;
}) {
  const makes = useMemo(() => listMakes(), []);
  const [make, setMake] = useState<string>(selected?.make ?? "");
  const [model, setModel] = useState<string>(selected?.model ?? "");

  // Mirror parent → local state when selection changes externally (swap/reset).
  useEffect(() => {
    setMake(selected?.make ?? "");
    setModel(selected?.model ?? "");
  }, [selected]);

  const models = useMemo(() => (make ? listModelsForMake(make) : []), [make]);

  function applyMake(nextMake: string) {
    setMake(nextMake);
    setModel("");
    onChange(undefined);
  }

  function applyModel(nextModel: string) {
    setModel(nextModel);
    const v = vehicleSpecs.find(
      (x) => x.make === make && x.model === nextModel
    );
    onChange(v);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wide ${badgeColor}`}
        >
          {label}
        </span>
        {selected ? (
          <span className="text-[11px] text-slate-500">
            {selected.year} &middot; {selected.bodyStyle}
          </span>
        ) : null}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] text-slate-500 mb-1">Make</label>
          <select
            value={make}
            onChange={(e) => applyMake(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select make…</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] text-slate-500 mb-1">Model</label>
          <select
            value={model}
            onChange={(e) => applyModel(e.target.value)}
            disabled={!make}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-slate-100 disabled:text-slate-400"
          >
            <option value="">{make ? "Select model…" : "Pick a make first"}</option>
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected card */}
      {selected ? (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0">
              <ImageIcon className="w-6 h-6 text-slate-400" />
            </div>
            <div className="min-w-0">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wide">
                {selected.bodyStyle}
              </span>
              <p className="mt-1 text-base font-bold text-slate-900 truncate">
                {selected.year} {selected.make} {selected.model}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {selected.engine} &middot; {selected.drivetrain}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-4 text-center">
          <p className="text-xs text-slate-500">No vehicle selected</p>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Comparison results
   ────────────────────────────────────────────────────────────── */

type Direction = "higher" | "lower";

interface MetricRow {
  label: string;
  aValue: string;
  bValue: string;
  /** Numeric values — used to determine the winner */
  aNum: number | null;
  bNum: number | null;
  direction: Direction; // higher = bigger is better; lower = smaller is better
}

interface MetricGroup {
  title: string;
  icon: typeof Car;
  rows: MetricRow[];
}

function buildGroups(a: VehicleSpec, b: VehicleSpec): MetricGroup[] {
  const fmtMoney = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const fmtNum = (n: number) => n.toLocaleString("en-US");

  return [
    {
      title: "Pricing",
      icon: CircleDollarSign,
      rows: [
        {
          label: "MSRP — Starting",
          aValue: fmtMoney(a.msrpStart),
          bValue: fmtMoney(b.msrpStart),
          aNum: a.msrpStart,
          bNum: b.msrpStart,
          direction: "lower",
        },
        {
          label: "MSRP — Top Trim",
          aValue: fmtMoney(a.msrpEnd),
          bValue: fmtMoney(b.msrpEnd),
          aNum: a.msrpEnd,
          bNum: b.msrpEnd,
          direction: "lower",
        },
      ],
    },
    {
      title: "Performance",
      icon: Gauge,
      rows: [
        {
          label: "Horsepower",
          aValue: `${a.horsepower} hp`,
          bValue: `${b.horsepower} hp`,
          aNum: a.horsepower,
          bNum: b.horsepower,
          direction: "higher",
        },
        {
          label: "Torque",
          aValue: `${fmtNum(a.torque)} lb-ft`,
          bValue: `${fmtNum(b.torque)} lb-ft`,
          aNum: a.torque,
          bNum: b.torque,
          direction: "higher",
        },
        {
          label: "0–60 mph",
          aValue: `${a.zeroToSixty.toFixed(1)} s`,
          bValue: `${b.zeroToSixty.toFixed(1)} s`,
          aNum: a.zeroToSixty,
          bNum: b.zeroToSixty,
          direction: "lower",
        },
        {
          label: "Top Speed",
          aValue: a.topSpeed ? `${a.topSpeed} mph` : "—",
          bValue: b.topSpeed ? `${b.topSpeed} mph` : "—",
          aNum: a.topSpeed ?? null,
          bNum: b.topSpeed ?? null,
          direction: "higher",
        },
        {
          label: "Engine",
          aValue: a.engine,
          bValue: b.engine,
          aNum: null,
          bNum: null,
          direction: "higher",
        },
        {
          label: "Transmission",
          aValue: a.transmission,
          bValue: b.transmission,
          aNum: null,
          bNum: null,
          direction: "higher",
        },
        {
          label: "Drivetrain",
          aValue: a.drivetrain,
          bValue: b.drivetrain,
          aNum: null,
          bNum: null,
          direction: "higher",
        },
      ],
    },
    {
      title: "Efficiency",
      icon: Fuel,
      rows: [
        {
          label: "MPG — City",
          aValue: a.fuelType === "Electric" ? `${a.mpgCity} MPGe` : `${a.mpgCity}`,
          bValue: b.fuelType === "Electric" ? `${b.mpgCity} MPGe` : `${b.mpgCity}`,
          aNum: a.mpgCity,
          bNum: b.mpgCity,
          direction: "higher",
        },
        {
          label: "MPG — Highway",
          aValue: a.fuelType === "Electric" ? `${a.mpgHwy} MPGe` : `${a.mpgHwy}`,
          bValue: b.fuelType === "Electric" ? `${b.mpgHwy} MPGe` : `${b.mpgHwy}`,
          aNum: a.mpgHwy,
          bNum: b.mpgHwy,
          direction: "higher",
        },
        {
          label: "MPG — Combined",
          aValue: a.fuelType === "Electric" ? `${a.mpgCombined} MPGe` : `${a.mpgCombined}`,
          bValue: b.fuelType === "Electric" ? `${b.mpgCombined} MPGe` : `${b.mpgCombined}`,
          aNum: a.mpgCombined,
          bNum: b.mpgCombined,
          direction: "higher",
        },
        {
          label: "Fuel Type",
          aValue: a.fuelType,
          bValue: b.fuelType,
          aNum: null,
          bNum: null,
          direction: "higher",
        },
        {
          label: "Range (EV)",
          aValue: a.rangeMiles ? `${a.rangeMiles} mi` : "—",
          bValue: b.rangeMiles ? `${b.rangeMiles} mi` : "—",
          aNum: a.rangeMiles ?? null,
          bNum: b.rangeMiles ?? null,
          direction: "higher",
        },
      ],
    },
    {
      title: "Practicality",
      icon: ShoppingBag,
      rows: [
        {
          label: "Seating Capacity",
          aValue: `${a.seatingCapacity}`,
          bValue: `${b.seatingCapacity}`,
          aNum: a.seatingCapacity,
          bNum: b.seatingCapacity,
          direction: "higher",
        },
        {
          label: "Cargo Space",
          aValue: a.cargoFt3 ? `${a.cargoFt3} ft³` : "—",
          bValue: b.cargoFt3 ? `${b.cargoFt3} ft³` : "—",
          aNum: a.cargoFt3 || null,
          bNum: b.cargoFt3 || null,
          direction: "higher",
        },
        {
          label: "Towing Capacity",
          aValue: a.towingLbs ? `${fmtNum(a.towingLbs)} lbs` : "—",
          bValue: b.towingLbs ? `${fmtNum(b.towingLbs)} lbs` : "—",
          aNum: a.towingLbs || null,
          bNum: b.towingLbs || null,
          direction: "higher",
        },
        {
          label: "Body Style",
          aValue: a.bodyStyle,
          bValue: b.bodyStyle,
          aNum: null,
          bNum: null,
          direction: "higher",
        },
      ],
    },
    {
      title: "Quality & Ownership",
      icon: Shield,
      rows: [
        {
          label: "NHTSA Safety",
          aValue: `${a.safetyScore} / 5 ★`,
          bValue: `${b.safetyScore} / 5 ★`,
          aNum: a.safetyScore,
          bNum: b.safetyScore,
          direction: "higher",
        },
        {
          label: "Reliability",
          aValue: `${a.reliabilityScore} / 10`,
          bValue: `${b.reliabilityScore} / 10`,
          aNum: a.reliabilityScore,
          bNum: b.reliabilityScore,
          direction: "higher",
        },
        {
          label: "Resale Value",
          aValue: `${a.resaleScore} / 10`,
          bValue: `${b.resaleScore} / 10`,
          aNum: a.resaleScore,
          bNum: b.resaleScore,
          direction: "higher",
        },
        {
          label: "Basic Warranty",
          aValue: a.warranty.basic,
          bValue: b.warranty.basic,
          aNum: null,
          bNum: null,
          direction: "higher",
        },
        {
          label: "Powertrain Warranty",
          aValue: a.warranty.powertrain,
          bValue: b.warranty.powertrain,
          aNum: null,
          bNum: null,
          direction: "higher",
        },
      ],
    },
  ];
}

function rowWinner(row: MetricRow): "A" | "B" | null {
  if (row.aNum === null || row.bNum === null) return null;
  if (row.aNum === row.bNum) return null;
  if (row.direction === "higher") return row.aNum > row.bNum ? "A" : "B";
  return row.aNum < row.bNum ? "A" : "B";
}

function ComparisonResults({ a, b }: { a: VehicleSpec; b: VehicleSpec }) {
  const groups = useMemo(() => buildGroups(a, b), [a, b]);

  // Tally winners across all numeric rows.
  const tally = useMemo(() => {
    let aWins = 0;
    let bWins = 0;
    let ties = 0;
    for (const g of groups) {
      for (const r of g.rows) {
        const w = rowWinner(r);
        if (w === "A") aWins++;
        else if (w === "B") bWins++;
        else if (r.aNum !== null && r.bNum !== null) ties++;
      }
    }
    return { aWins, bWins, ties };
  }, [groups]);

  const overallWinner: "A" | "B" | "Tie" =
    tally.aWins > tally.bWins ? "A" : tally.bWins > tally.aWins ? "B" : "Tie";

  return (
    <div className="space-y-5">
      {/* Winner summary */}
      <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 sm:p-8 text-white">
        <div className="flex items-start gap-3">
          <Trophy className="w-7 h-7 flex-shrink-0 mt-1 text-amber-300" />
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-primary-200 mb-1">
              Head-to-Head Result
            </p>
            <p className="text-2xl sm:text-3xl font-bold leading-tight">
              {overallWinner === "Tie" ? (
                <>It&rsquo;s a tie — {tally.aWins} categories each</>
              ) : (
                <>
                  {overallWinner === "A"
                    ? `${a.year} ${a.make} ${a.model}`
                    : `${b.year} ${b.make} ${b.model}`}{" "}
                  wins {Math.max(tally.aWins, tally.bWins)} categories
                </>
              )}
            </p>
            <p className="mt-2 text-sm text-primary-100">
              {a.make} {a.model}: <strong>{tally.aWins}</strong> wins &middot;{" "}
              {b.make} {b.model}: <strong>{tally.bWins}</strong> wins &middot;{" "}
              <strong>{tally.ties}</strong> ties
            </p>
          </div>
        </div>
      </div>

      {/* Stat groups */}
      {groups.map((g) => (
        <GroupTable key={g.title} group={g} a={a} b={b} />
      ))}

      {/* Features side-by-side */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2">
          <Award className="w-4 h-4 text-primary-600" />
          <h3 className="text-sm font-bold text-slate-900">Key Features</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <FeatureColumn vehicle={a} />
          <FeatureColumn vehicle={b} />
        </div>
      </div>
    </div>
  );
}

function GroupTable({ group, a, b }: { group: MetricGroup; a: VehicleSpec; b: VehicleSpec }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2">
        <group.icon className="w-4 h-4 text-primary-600" />
        <h3 className="text-sm font-bold text-slate-900">{group.title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-xs">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium w-1/3">Spec</th>
              <th className="text-right px-4 py-2.5 font-medium">
                {a.year} {a.make} {a.model}
              </th>
              <th className="text-right px-4 py-2.5 font-medium">
                {b.year} {b.make} {b.model}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {group.rows.map((row) => {
              const winner = rowWinner(row);
              return (
                <tr key={row.label} className="hover:bg-slate-50/60">
                  <td className="px-4 py-2.5 text-slate-700 font-medium">{row.label}</td>
                  <td
                    className={`px-4 py-2.5 text-right tabular-nums ${
                      winner === "A" ? "font-bold text-emerald-700" : "text-slate-700"
                    }`}
                  >
                    {row.aValue}
                    {winner === "A" && <span className="ml-1 text-[10px]">▲</span>}
                  </td>
                  <td
                    className={`px-4 py-2.5 text-right tabular-nums ${
                      winner === "B" ? "font-bold text-emerald-700" : "text-slate-700"
                    }`}
                  >
                    {row.bValue}
                    {winner === "B" && <span className="ml-1 text-[10px]">▲</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FeatureColumn({ vehicle }: { vehicle: VehicleSpec }) {
  return (
    <div className="p-5">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
        {vehicle.year} {vehicle.make} {vehicle.model}
      </p>
      <ul className="space-y-2">
        {vehicle.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
