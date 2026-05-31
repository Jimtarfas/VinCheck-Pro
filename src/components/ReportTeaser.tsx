"use client";

import {
  Car, Settings, Fuel, Cog, DoorOpen, Shield, ArrowLeft, Calendar, Tag,
  Gauge, Info, Award, Lock, ChevronRight, Camera, BarChart3, DollarSign,
  ListChecks, Wrench, FileText, AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import type { VinData } from "@/lib/api";
import { PhotoGallery, DataCard } from "./VinReport";

/* ─────────────────────────────────────────────────────────────
   ReportTeaser
   ---------------------------------------------------------------
   The free, ungated "page 1" a guest sees. It confirms we found
   their exact vehicle (photos, name, VIN, key specs) and teases —
   with honest, data-derived counts — everything waiting inside the
   full report. A single CTA ("View full report — free") opens the
   signup popup. Nothing here is blurred: the goal is to earn trust
   and curiosity *before* asking for an email, which is what cuts
   the bounce on the old blur-everything wall.
───────────────────────────────────────────────────────────── */

interface FoundItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  count: string;
  found: boolean;
}

export default function ReportTeaser({
  data,
  onUnlock,
}: {
  data: VinData;
  onUnlock: () => void;
}) {
  const year = data.years?.[0]?.year;
  const trim = data.years?.[0]?.styles?.[0]?.trim;
  const styleName = data.years?.[0]?.styles?.[0]?.name;
  const submodel = data.years?.[0]?.styles?.[0]?.submodel;
  const makeName = data.make?.name || "Unknown Make";
  const modelName = data.model?.name || "Unknown Model";

  // Honest, data-derived counts. Each row only claims what we actually have.
  const photoCount = data.photos?.length ?? 0;
  const listingCount = data.marketData?.totalListings ?? 0;
  const pricePoints = data.price
    ? [
        data.price.baseMsrp,
        data.price.baseInvoice,
        data.price.usedTmvRetail,
        data.price.usedTradeIn,
        data.price.usedPrivateParty,
      ].filter((p) => (p ?? 0) > 0).length
    : 0;
  const optionCount = data.options?.reduce((a, c) => a + c.options.length, 0) ?? 0;
  const colorCount = data.colors?.reduce((a, c) => a + c.options.length, 0) ?? 0;
  const hasEngine = !!data.engine;
  const hasMpg = !!data.mpg;

  const found: FoundItem[] = [
    { icon: Camera, label: "Vehicle Photos", count: photoCount > 0 ? `${photoCount} found` : "—", found: photoCount > 0 },
    { icon: BarChart3, label: "Market Listings", count: listingCount > 0 ? `${listingCount} active` : "—", found: listingCount > 0 },
    { icon: DollarSign, label: "Valuation & Pricing", count: pricePoints > 0 ? `${pricePoints} price points` : "—", found: pricePoints > 0 },
    { icon: Wrench, label: "Engine & Performance", count: hasEngine ? "Full specs" : "—", found: hasEngine },
    { icon: ListChecks, label: "Options & Equipment", count: optionCount > 0 ? `${optionCount} documented` : "—", found: optionCount > 0 },
    { icon: Fuel, label: "Fuel Economy", count: hasMpg ? `${data.mpg!.city}/${data.mpg!.highway} MPG` : "—", found: hasMpg },
    { icon: Palette2, label: "Factory Colors", count: colorCount > 0 ? `${colorCount} options` : "—", found: colorCount > 0 },
    { icon: FileText, label: "Downloadable PDF", count: "Ready", found: true },
  ];

  const foundCount = found.filter((f) => f.found).length;

  return (
    <div className="bg-surface min-h-screen pt-16">
      {/* ── HERO ── */}
      <div className="bg-primary relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #0d47a1 0%, transparent 70%)", filter: "blur(40px)" }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/85 hover:text-white mb-5 sm:mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span
              className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1.5 text-on-secondary-container"
              style={{ background: "var(--color-secondary-container)" }}
            >
              <Shield className="w-3 h-3" /> Vehicle Found
            </span>
            {data.categories?.primaryBodyType && (
              <span className="px-3 py-1 bg-white/10 text-white/85 text-xs font-semibold rounded-full">
                {data.categories.primaryBodyType}
              </span>
            )}
            {data.categories?.vehicleSize && (
              <span className="px-3 py-1 bg-white/10 text-white/85 text-xs font-semibold rounded-full">
                {data.categories.vehicleSize}
              </span>
            )}
          </div>

          <h1 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-2 break-words">
            {year && <span className="text-secondary-fixed-dim">{year} </span>}
            {makeName} {modelName}
          </h1>
          {styleName && <p className="text-sm sm:text-base text-white/85 mb-2 break-words">{styleName}</p>}
          <p className="font-mono text-[11px] sm:text-sm tracking-wider sm:tracking-widest text-white/85 break-all">VIN: {data.vin}</p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full overflow-hidden space-y-6">
        {/* Photo gallery */}
        <PhotoGallery
          photos={data.photos || []}
          photoSource={data.photoSource}
          alt={`${year ?? ""} ${makeName} ${modelName}`.trim()}
          year={year}
          make={makeName}
          model={modelName}
        />

        {/* Quick specs grid (mirrors the full report's chip grid) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {year && <DataCard icon={Calendar} label="Year" value={String(year)} accent="bg-primary/8 text-primary" />}
          <DataCard icon={Car} label="Make" value={makeName} accent="bg-primary/8 text-primary" />
          <DataCard icon={Car} label="Model" value={modelName} accent="bg-tertiary/10 text-tertiary" />
          {trim && <DataCard icon={Tag} label="Trim" value={trim} accent="bg-violet-50 text-violet-600" />}
          {data.engine?.size && (
            <DataCard
              icon={Wrench}
              label="Engine"
              value={`${data.engine.size}L${data.engine.cylinder ? ` ${data.engine.cylinder}-Cyl` : ""}`}
              accent="bg-amber-50 text-amber-600"
            />
          )}
          {data.numOfDoors && <DataCard icon={DoorOpen} label="Doors" value={`${data.numOfDoors} Doors`} accent="bg-amber-50 text-amber-600" />}
          {data.drivenWheels && <DataCard icon={Cog} label="Drivetrain" value={data.drivenWheels} accent="bg-cyan-50 text-cyan-600" />}
          {data.transmission && (
            <DataCard
              icon={Settings}
              label="Transmission"
              value={`${data.transmission.numberOfSpeeds}-Spd ${data.transmission.transmissionType}`}
              accent="bg-purple-50 text-purple-600"
            />
          )}
          {data.engine?.fuelType && <DataCard icon={Fuel} label="Fuel Type" value={data.engine.fuelType} accent="bg-green-50 text-green-600" />}
          {data.mpg && <DataCard icon={Gauge} label="Fuel Economy" value={`${data.mpg.city} / ${data.mpg.highway} MPG`} accent="bg-emerald-50 text-emerald-600" />}
          {data.price && data.price.baseMsrp > 0 && (
            <DataCard icon={DollarSign} label="MSRP" value={`$${data.price.baseMsrp.toLocaleString()}`} accent="bg-green-50 text-green-600" />
          )}
          {submodel?.body && <DataCard icon={Car} label="Body Style" value={submodel.body} accent="bg-indigo-50 text-indigo-600" />}
          {data.categories?.epaClass && <DataCard icon={Award} label="EPA Class" value={data.categories.epaClass} accent="bg-teal-50 text-teal-600" />}
        </div>

        {/* ── "What we found for this VIN" ── */}
        <div className="bg-surface-container-lowest rounded-3xl sm:rounded-[2rem] shadow-sm overflow-hidden">
          <div className="px-5 sm:px-7 py-5 border-b border-surface-container flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/8 text-primary flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5" style={{ color: "var(--color-secondary-container)" }} />
            </div>
            <div className="min-w-0">
              <h2 className="font-headline font-bold text-base sm:text-lg text-on-surface">
                What we found for this VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                {foundCount} data {foundCount === 1 ? "category" : "categories"} ready in your full report
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {found.map(({ icon: Icon, label, count, found: ok }) => (
              <div
                key={label}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border ${
                  ok ? "bg-surface-container-low border-surface-container" : "bg-surface-container-low/50 border-transparent opacity-60"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${ok ? "bg-primary/8 text-primary" : "bg-surface-container text-outline"}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-on-surface truncate">{label}</p>
                  <p className={`text-xs font-bold uppercase tracking-wide ${ok ? "text-primary" : "text-outline"}`}>{count}</p>
                </div>
                {ok ? (
                  <span className="text-[11px] font-black uppercase tracking-wider px-2 py-1 rounded-full bg-green-50 text-green-700 flex-shrink-0">
                    Ready
                  </span>
                ) : (
                  <span className="text-[11px] font-bold uppercase tracking-wider text-outline flex-shrink-0">—</span>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="px-4 sm:px-6 pb-6 sm:pb-7">
            <button
              onClick={onUnlock}
              className="group w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-base sm:text-lg font-extrabold text-on-secondary-container shadow-lg hover:brightness-110 transition cursor-pointer"
              style={{ background: "var(--color-secondary-container)" }}
            >
              <Lock className="w-5 h-5" />
              View Full Report — Free
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <p className="text-center text-xs text-on-surface-variant mt-3 flex items-center justify-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> No credit card
              </span>
              <span className="text-outline/40">•</span>
              <span>Free account</span>
              <span className="text-outline/40">•</span>
              <span>Instant access</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small inline palette icon (lucide's Palette under an alias to avoid a
   name clash with the full report's import). */
function Palette2({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}
