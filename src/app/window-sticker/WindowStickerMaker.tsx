"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Loader2,
  Download,
  Printer,
  Wand2,
  RotateCcw,
  Plus,
  Trash2,
  Lock,
  X,
  ShieldCheck,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import AuthForm from "@/components/AuthForm";
import Logo from "@/components/Logo";

interface OptionRow {
  id: string;
  name: string;
  price: string;
}

interface StickerData {
  vin: string;
  year: string;
  make: string;
  model: string;
  trim: string;
  bodyStyle: string;
  drivetrain: string;
  transmission: string;
  engine: string;
  exteriorColor: string;
  interiorColor: string;
  baseMsrp: string;
  destination: string;
  standardEquipment: string;
  options: OptionRow[];
  cityMpg: string;
  hwyMpg: string;
  combinedMpg: string;
  fuelType: string;
  annualFuelCost: string;
  assembledIn: string;
  plantCode: string;
  dealerName: string;
  dealerLocation: string;
}

const sample: StickerData = {
  vin: "1FTFW1ET0EFB12345",
  year: "2024",
  make: "Ford",
  model: "F-150",
  trim: "XLT SuperCrew 4x4",
  bodyStyle: "Crew Cab Pickup",
  drivetrain: "4WD",
  transmission: "10-Speed Automatic",
  engine: "3.5L EcoBoost V6 Twin-Turbo",
  exteriorColor: "Antimatter Blue Metallic",
  interiorColor: "Medium Dark Slate Cloth",
  baseMsrp: "44995",
  destination: "1995",
  standardEquipment: [
    "Pre-Collision Assist with Automatic Emergency Braking",
    "BLIS Blind Spot Information System",
    "SYNC 4 with 12-inch Touchscreen",
    "Lane-Keeping System",
    "Reverse Sensing System",
    "FordPass Connect 4G LTE Wi-Fi Hotspot",
    "Trailer Sway Control",
    "Hill Start Assist",
    "Tire Pressure Monitoring System",
    "LED Box Lighting",
    "Auto Start-Stop Technology",
    "Power-Adjustable Pedals",
  ].join("\n"),
  options: [
    { id: "1", name: "302A Mid Equipment Group", price: "3500" },
    { id: "2", name: "FX4 Off-Road Package", price: "1095" },
    { id: "3", name: "Twin Panel Moonroof", price: "1495" },
    { id: "4", name: "Tow Technology Package", price: "1095" },
    { id: "5", name: "20-inch Machined Aluminum Wheels", price: "795" },
    { id: "6", name: "Spray-In Bedliner", price: "595" },
  ],
  cityMpg: "18",
  hwyMpg: "24",
  combinedMpg: "20",
  fuelType: "Gasoline",
  annualFuelCost: "2750",
  assembledIn: "Dearborn, Michigan, USA",
  plantCode: "F",
  dealerName: "",
  dealerLocation: "",
};

const blank: StickerData = {
  vin: "",
  year: "",
  make: "",
  model: "",
  trim: "",
  bodyStyle: "",
  drivetrain: "",
  transmission: "",
  engine: "",
  exteriorColor: "",
  interiorColor: "",
  baseMsrp: "",
  destination: "",
  standardEquipment: "",
  options: [{ id: "1", name: "", price: "" }],
  cityMpg: "",
  hwyMpg: "",
  combinedMpg: "",
  fuelType: "Gasoline",
  annualFuelCost: "",
  assembledIn: "",
  plantCode: "",
  dealerName: "",
  dealerLocation: "",
};

function formatMoney(v: string | number): string {
  const n = typeof v === "string" ? parseFloat(v) : v;
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

type AuthState = "loading" | "authed" | "guest";

export default function WindowStickerMaker() {
  const [data, setData] = useState<StickerData>(sample);
  const [decoding, setDecoding] = useState(false);
  const [decodeError, setDecodeError] = useState<string | null>(null);
  const [auth, setAuth] = useState<AuthState>("loading");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");
  // Action queued while waiting for the user to authenticate
  const pendingActionRef = useRef<"print" | "download" | null>(null);

  /* Detect Supabase auth — mirrors ReportGate's pattern. If env vars
     aren't configured, we don't gate (better than bricking the tool). */
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      setAuth("authed");
      return;
    }
    let mounted = true;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!mounted) return;
      setAuth(user ? "authed" : "guest");
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setAuth(session?.user ? "authed" : "guest");
    });
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  /* When auth flips to "authed" and there's a queued action, fire it.
     Kept in its own effect so the action functions see the latest `data`
     instead of the stale closures from the auth subscription. */
  useEffect(() => {
    if (auth !== "authed") return;
    const action = pendingActionRef.current;
    if (!action) return;
    pendingActionRef.current = null;
    setAuthOpen(false);
    const t = setTimeout(() => {
      if (action === "print") doPrint();
      if (action === "download") doDownloadHtml();
    }, 120);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  // Lock body scroll while the auth modal is up
  useEffect(() => {
    if (!authOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [authOpen]);

  const totals = useMemo(() => {
    const base = parseFloat(data.baseMsrp) || 0;
    const dest = parseFloat(data.destination) || 0;
    const opts = data.options.reduce(
      (sum, o) => sum + (parseFloat(o.price) || 0),
      0
    );
    return { base, dest, opts, total: base + dest + opts };
  }, [data]);

  function update<K extends keyof StickerData>(key: K, value: StickerData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function updateOption(id: string, key: "name" | "price", value: string) {
    setData((d) => ({
      ...d,
      options: d.options.map((o) => (o.id === id ? { ...o, [key]: value } : o)),
    }));
  }

  function addOption() {
    setData((d) => ({
      ...d,
      options: [...d.options, { id: uid(), name: "", price: "" }],
    }));
  }

  function removeOption(id: string) {
    setData((d) => ({
      ...d,
      options:
        d.options.length > 1 ? d.options.filter((o) => o.id !== id) : d.options,
    }));
  }

  async function autofillFromVin() {
    const vin = data.vin.trim().toUpperCase();
    if (vin.length !== 17) {
      setDecodeError("Enter a 17-character VIN to auto-fill.");
      return;
    }
    setDecoding(true);
    setDecodeError(null);
    try {
      const res = await fetch(`/api/vin/${vin}`);
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Could not decode this VIN.");
      }
      const v = await res.json();

      const styleName: string =
        v?.years?.[0]?.styles?.[0]?.name || v?.years?.[0]?.styles?.[0]?.trim || "";
      const yearVal = v?.years?.[0]?.year ? String(v.years[0].year) : "";

      const engineParts = [
        v?.engine?.size ? `${v.engine.size}L` : "",
        v?.engine?.configuration || "",
        v?.engine?.cylinder ? `${v.engine.configuration || ""}${v.engine.cylinder}` : "",
        v?.engine?.compressorType && v.engine.compressorType !== "NA"
          ? v.engine.compressorType
          : "",
      ]
        .filter(Boolean)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      const transStr = v?.transmission
        ? `${v.transmission.numberOfSpeeds || ""}-Speed ${v.transmission.transmissionType || ""}`
            .replace(/\s+/g, " ")
            .trim()
        : "";

      const standardLines: string[] = [];
      type OptCat = { category: string; options: { name: string }[] };
      const cats: OptCat[] = Array.isArray(v?.options) ? (v.options as OptCat[]) : [];
      for (const cat of cats) {
        for (const opt of cat.options || []) {
          if (opt?.name) standardLines.push(opt.name);
        }
      }

      type ColorCat = { category: string; options: { name: string }[] };
      const colorCats: ColorCat[] = Array.isArray(v?.colors)
        ? (v.colors as ColorCat[])
        : [];
      const exterior =
        colorCats.find((c) => /exterior/i.test(c.category))?.options?.[0]?.name ||
        "";
      const interior =
        colorCats.find((c) => /interior/i.test(c.category))?.options?.[0]?.name ||
        "";

      setData((d) => ({
        ...d,
        vin,
        year: yearVal || d.year,
        make: v?.make?.name || d.make,
        model: v?.model?.name || d.model,
        trim: styleName || d.trim,
        bodyStyle:
          v?.categories?.vehicleStyle ||
          v?.categories?.primaryBodyType ||
          d.bodyStyle,
        drivetrain: v?.drivenWheels || d.drivetrain,
        transmission: transStr || d.transmission,
        engine: engineParts || d.engine,
        exteriorColor: exterior || d.exteriorColor,
        interiorColor: interior || d.interiorColor,
        baseMsrp: v?.price?.baseMsrp ? String(v.price.baseMsrp) : d.baseMsrp,
        destination: v?.price?.deliveryCharges
          ? String(v.price.deliveryCharges)
          : d.destination,
        standardEquipment: standardLines.length
          ? standardLines.slice(0, 14).join("\n")
          : d.standardEquipment,
        fuelType: v?.engine?.fuelType
          ? v.engine.fuelType.charAt(0).toUpperCase() + v.engine.fuelType.slice(1)
          : d.fuelType,
        cityMpg: v?.mpg?.city ? String(v.mpg.city) : d.cityMpg,
        hwyMpg: v?.mpg?.highway ? String(v.mpg.highway) : d.hwyMpg,
        combinedMpg:
          v?.mpg?.city && v?.mpg?.highway
            ? String(Math.round((Number(v.mpg.city) + Number(v.mpg.highway)) / 2))
            : d.combinedMpg,
      }));
    } catch (e) {
      setDecodeError(
        e instanceof Error ? e.message : "Could not decode this VIN."
      );
    } finally {
      setDecoding(false);
    }
  }

  function loadSample() {
    setData({ ...sample, options: sample.options.map((o) => ({ ...o })) });
    setDecodeError(null);
  }

  function reset() {
    setData({ ...blank, options: [{ id: uid(), name: "", price: "" }] });
    setDecodeError(null);
  }

  function requireAuth(action: "print" | "download"): boolean {
    if (auth === "authed") return true;
    pendingActionRef.current = action;
    setAuthMode("signup");
    setAuthOpen(true);
    return false;
  }

  function handlePrint() {
    if (!requireAuth("print")) return;
    doPrint();
  }

  function handleDownloadHtml() {
    if (!requireAuth("download")) return;
    doDownloadHtml();
  }

  function doPrint() {
    if (typeof window !== "undefined") window.print();
  }

  function doDownloadHtml() {
    const node = document.getElementById("sticker-export");
    if (!node) return;
    const styles = `
      <style>
        body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #f1f5f9; padding: 24px; }
        .sticker { background: #fff; border: 2px solid #0f172a; max-width: 900px; margin: 0 auto; }
        .sticker h1, .sticker h2, .sticker h3 { margin: 0; }
        .sticker .band { background: #0c2d5e; color: #fff; padding: 14px 20px; }
        .sticker .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        .sticker .pad { padding: 14px 20px; }
        .sticker .border-t { border-top: 1px solid #cbd5e1; }
        .sticker .border-r { border-right: 1px solid #cbd5e1; }
        .sticker table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .sticker th, .sticker td { padding: 4px 0; text-align: left; }
        .sticker .muted { color: #475569; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; font-weight: 700; }
        .sticker .right { text-align: right; }
        .sticker .total { background: #0c2d5e; color: #fff; padding: 12px 20px; font-weight: 800; font-size: 18px; display: flex; justify-content: space-between; }
        .sticker .mpg { background: #f8fafc; border: 1px solid #cbd5e1; padding: 14px; }
        .sticker .mpg .big { font-size: 64px; font-weight: 800; color: #0c2d5e; line-height: 1; }
        .sticker ul { margin: 0; padding-left: 16px; font-size: 12px; line-height: 1.55; color: #1e293b; }
        .sticker .vin { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; letter-spacing: .05em; }
      </style>
    `;
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${data.year} ${data.make} ${data.model} Window Sticker</title>${styles}</head><body>${node.outerHTML}</body></html>`;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const safeName =
      `${data.year}-${data.make}-${data.model}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "window-sticker";
    a.href = url;
    a.download = `${safeName}-window-sticker.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const standardList = data.standardEquipment
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* ── FORM ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 print:hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Vehicle Details</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={loadSample}
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
            >
              <Wand2 className="w-3.5 h-3.5" /> Load sample
            </button>
            <button
              type="button"
              onClick={reset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-700 inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* VIN auto-fill */}
        <div className="mb-5 p-4 rounded-xl bg-primary-50/60 border border-primary-100">
          <label className="text-xs font-bold text-primary-800 uppercase tracking-wider">
            Auto-fill from VIN
          </label>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              maxLength={17}
              value={data.vin}
              onChange={(e) => update("vin", e.target.value.toUpperCase())}
              placeholder="17-character VIN"
              className="flex-1 px-3 py-2 rounded-lg border border-slate-300 bg-white font-mono text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <button
              type="button"
              onClick={autofillFromVin}
              disabled={decoding}
              className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition disabled:opacity-60 inline-flex items-center gap-1.5"
            >
              {decoding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Wand2 className="w-4 h-4" />
              )}
              Decode
            </button>
          </div>
          {decodeError && (
            <p className="mt-2 text-xs text-rose-600 font-medium">{decodeError}</p>
          )}
          <p className="mt-2 text-[11px] text-slate-600">
            We&rsquo;ll fill in the year, make, model, engine, MSRP, MPG, and equipment from the
            factory record — you can edit anything after.
          </p>
        </div>

        <Section title="Identification">
          <Field label="Year">
            <input
              value={data.year}
              onChange={(e) => update("year", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Make">
            <input
              value={data.make}
              onChange={(e) => update("make", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Model">
            <input
              value={data.model}
              onChange={(e) => update("model", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Trim / Style">
            <input
              value={data.trim}
              onChange={(e) => update("trim", e.target.value)}
              className={inputCls}
            />
          </Field>
        </Section>

        <Section title="Mechanical">
          <Field label="Body style">
            <input
              value={data.bodyStyle}
              onChange={(e) => update("bodyStyle", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Drivetrain">
            <input
              value={data.drivetrain}
              onChange={(e) => update("drivetrain", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Engine">
            <input
              value={data.engine}
              onChange={(e) => update("engine", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Transmission">
            <input
              value={data.transmission}
              onChange={(e) => update("transmission", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Exterior color">
            <input
              value={data.exteriorColor}
              onChange={(e) => update("exteriorColor", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Interior color">
            <input
              value={data.interiorColor}
              onChange={(e) => update("interiorColor", e.target.value)}
              className={inputCls}
            />
          </Field>
        </Section>

        <Section title="Pricing">
          <Field label="Base MSRP ($)">
            <input
              inputMode="numeric"
              value={data.baseMsrp}
              onChange={(e) =>
                update("baseMsrp", e.target.value.replace(/[^0-9.]/g, ""))
              }
              className={inputCls}
            />
          </Field>
          <Field label="Destination charge ($)">
            <input
              inputMode="numeric"
              value={data.destination}
              onChange={(e) =>
                update("destination", e.target.value.replace(/[^0-9.]/g, ""))
              }
              className={inputCls}
            />
          </Field>
        </Section>

        <Section title="Standard equipment">
          <div className="col-span-2">
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              One item per line
            </label>
            <textarea
              value={data.standardEquipment}
              onChange={(e) => update("standardEquipment", e.target.value)}
              rows={6}
              className={`${inputCls} font-mono text-xs leading-relaxed`}
            />
          </div>
        </Section>

        <Section title="Optional equipment">
          <div className="col-span-2 space-y-2">
            {data.options.map((opt) => (
              <div key={opt.id} className="flex gap-2">
                <input
                  value={opt.name}
                  onChange={(e) => updateOption(opt.id, "name", e.target.value)}
                  placeholder="Option / package name"
                  className={`${inputCls} flex-1`}
                />
                <input
                  inputMode="numeric"
                  value={opt.price}
                  onChange={(e) =>
                    updateOption(
                      opt.id,
                      "price",
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  placeholder="Price"
                  className={`${inputCls} w-28`}
                />
                <button
                  type="button"
                  onClick={() => removeOption(opt.id)}
                  className="px-2 rounded-lg border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-300"
                  aria-label="Remove option"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              <Plus className="w-4 h-4" /> Add option
            </button>
          </div>
        </Section>

        <Section title="Fuel economy (EPA)">
          <Field label="City MPG">
            <input
              value={data.cityMpg}
              onChange={(e) =>
                update("cityMpg", e.target.value.replace(/[^0-9.]/g, ""))
              }
              className={inputCls}
            />
          </Field>
          <Field label="Highway MPG">
            <input
              value={data.hwyMpg}
              onChange={(e) =>
                update("hwyMpg", e.target.value.replace(/[^0-9.]/g, ""))
              }
              className={inputCls}
            />
          </Field>
          <Field label="Combined MPG">
            <input
              value={data.combinedMpg}
              onChange={(e) =>
                update("combinedMpg", e.target.value.replace(/[^0-9.]/g, ""))
              }
              className={inputCls}
            />
          </Field>
          <Field label="Fuel type">
            <input
              value={data.fuelType}
              onChange={(e) => update("fuelType", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Annual fuel cost ($)">
            <input
              inputMode="numeric"
              value={data.annualFuelCost}
              onChange={(e) =>
                update("annualFuelCost", e.target.value.replace(/[^0-9.]/g, ""))
              }
              className={inputCls}
            />
          </Field>
        </Section>

        <Section title="Origin (optional)">
          <Field label="Assembled in">
            <input
              value={data.assembledIn}
              onChange={(e) => update("assembledIn", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Plant code">
            <input
              value={data.plantCode}
              onChange={(e) => update("plantCode", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Dealer name">
            <input
              value={data.dealerName}
              onChange={(e) => update("dealerName", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Dealer location">
            <input
              value={data.dealerLocation}
              onChange={(e) => update("dealerLocation", e.target.value)}
              className={inputCls}
            />
          </Field>
        </Section>
      </div>

      {/* ── PREVIEW ── */}
      <div>
        <div className="lg:sticky lg:top-24">
          <div className="flex items-center justify-between mb-3 print:hidden">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Live Preview</h2>
              {auth === "guest" && (
                <p className="text-[11px] text-slate-500 mt-0.5 inline-flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Free account required to download or print
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDownloadHtml}
                className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-semibold hover:border-primary-400 hover:text-primary-700 transition inline-flex items-center gap-1.5"
              >
                {auth === "guest" ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                Download
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="px-3 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition inline-flex items-center gap-1.5"
              >
                {auth === "guest" ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Printer className="w-4 h-4" />
                )}
                Print / Save as PDF
              </button>
            </div>
          </div>

          <StickerPreview data={data} totals={totals} standardList={standardList} />

          <p className="mt-3 text-[11px] text-slate-500 leading-relaxed print:hidden">
            This window sticker is generated from the data you entered. It is a Monroney-style
            replica for personal, listing, or display use — it is not a manufacturer-issued
            document. Use &ldquo;Print / Save as PDF&rdquo; for the cleanest export.
          </p>
        </div>
      </div>

      {/* Print CSS — hide everything except the sticker */}
      <style jsx global>{`
        @media print {
          @page {
            size: letter portrait;
            margin: 0.4in;
          }
          body * {
            visibility: hidden !important;
          }
          #sticker-export,
          #sticker-export * {
            visibility: visible !important;
          }
          #sticker-export {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
          }
        }
      `}</style>

      {/* Auth gate modal — opens when a guest clicks Print or Download */}
      {authOpen && (
        <AuthGateModal
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => {
            pendingActionRef.current = null;
            setAuthOpen(false);
          }}
        />
      )}
    </div>
  );
}

function AuthGateModal({
  mode,
  setMode,
  onClose,
}: {
  mode: "signup" | "login";
  setMode: (m: "signup" | "login") => void;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ws-gate-title"
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center px-4 py-6 sm:py-8 bg-slate-900/70 backdrop-blur-sm overflow-y-auto print:hidden"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 my-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex justify-center mb-4">
          <Logo variant="onLight" size="sm" />
        </div>

        <h2
          id="ws-gate-title"
          className="text-2xl sm:text-[1.6rem] font-headline font-extrabold text-slate-900 text-center leading-tight tracking-tight mb-2"
        >
          {mode === "signup"
            ? "Sign up to download your sticker"
            : "Log in to download your sticker"}
        </h2>
        <p className="text-sm text-slate-700 text-center mb-5">
          {mode === "signup"
            ? "Create a free account in seconds — no credit card. Your account unlocks unlimited window sticker downloads."
            : "Welcome back. Sign in to continue and download your window sticker."}
        </p>

        <div
          role="tablist"
          aria-label="Authentication mode"
          className="flex bg-slate-100 rounded-full p-1 mb-5"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === "signup"}
            onClick={() => setMode("signup")}
            className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer ${
              mode === "signup"
                ? "bg-white text-primary-700 shadow-sm"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            Sign up
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "login"}
            onClick={() => setMode("login")}
            className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer ${
              mode === "login"
                ? "bg-white text-primary-700 shadow-sm"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            Log in
          </button>
        </div>

        <AuthForm mode={mode} next="/window-sticker" compact />

        <div className="mt-5 flex items-center justify-center gap-4 text-[11px] font-semibold text-slate-600 uppercase tracking-widest">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary-600" /> Free forever
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5 text-primary-600" /> Unlimited downloads
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1.5">No credit card</span>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}

function StickerPreview({
  data,
  totals,
  standardList,
}: {
  data: StickerData;
  totals: { base: number; dest: number; opts: number; total: number };
  standardList: string[];
}) {
  return (
    <div
      id="sticker-export"
      className="bg-white border-2 border-slate-900 shadow-xl shadow-slate-900/10 overflow-hidden text-slate-900"
    >
      {/* Top band */}
      <div className="bg-[#0c2d5e] text-white px-5 py-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] tracking-[0.2em] font-bold opacity-80">
            MONRONEY LABEL
          </p>
          <h3 className="text-xl font-extrabold leading-tight">
            {data.year || "—"} {data.make || "Vehicle"} {data.model}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-[10px] tracking-[0.2em] font-bold opacity-80">VIN</p>
          <p className="font-mono text-sm font-bold tracking-wider">
            {data.vin || "—"}
          </p>
        </div>
      </div>

      {/* Trim / Body strip */}
      <div className="bg-slate-100 border-b border-slate-300 px-5 py-2 flex justify-between text-xs">
        <span className="font-semibold text-slate-700">{data.trim || "—"}</span>
        <span className="text-slate-600">
          {data.bodyStyle}
          {data.drivetrain ? ` · ${data.drivetrain}` : ""}
        </span>
      </div>

      {/* Description block */}
      <div className="grid grid-cols-2">
        <div className="p-4 border-r border-slate-300">
          <p className="text-[10px] tracking-[0.15em] font-bold text-slate-500 mb-2">
            VEHICLE DESCRIPTION
          </p>
          <dl className="text-xs space-y-1">
            <Row k="Engine" v={data.engine} />
            <Row k="Transmission" v={data.transmission} />
            <Row k="Drivetrain" v={data.drivetrain} />
            <Row k="Exterior" v={data.exteriorColor} />
            <Row k="Interior" v={data.interiorColor} />
            {data.assembledIn && <Row k="Assembled in" v={data.assembledIn} />}
          </dl>
        </div>

        {/* Fuel economy box */}
        <div className="p-4 bg-slate-50">
          <p className="text-[10px] tracking-[0.15em] font-bold text-slate-500 mb-2">
            FUEL ECONOMY · EPA
          </p>
          <div className="flex items-end gap-3">
            <div className="text-center">
              <p className="text-5xl font-extrabold text-[#0c2d5e] leading-none">
                {data.combinedMpg || "—"}
              </p>
              <p className="text-[10px] font-bold text-slate-500 tracking-wider mt-1">
                COMBINED MPG
              </p>
            </div>
            <div className="text-xs text-slate-700 space-y-0.5 pb-1">
              <p>
                <span className="font-bold">{data.cityMpg || "—"}</span> city
              </p>
              <p>
                <span className="font-bold">{data.hwyMpg || "—"}</span> highway
              </p>
              <p className="text-slate-500">{data.fuelType || "Gasoline"}</p>
            </div>
          </div>
          {data.annualFuelCost && (
            <p className="mt-2 text-[11px] text-slate-600">
              Est. annual fuel cost: <strong>{formatMoney(data.annualFuelCost)}</strong>
            </p>
          )}
        </div>
      </div>

      {/* Equipment columns */}
      <div className="grid grid-cols-2 border-t border-slate-300">
        <div className="p-4 border-r border-slate-300">
          <p className="text-[10px] tracking-[0.15em] font-bold text-slate-500 mb-2">
            STANDARD EQUIPMENT
          </p>
          {standardList.length > 0 ? (
            <ul className="text-[11px] leading-relaxed text-slate-800 space-y-0.5 list-disc pl-4">
              {standardList.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          ) : (
            <p className="text-[11px] italic text-slate-400">
              Add standard equipment in the form…
            </p>
          )}
        </div>

        <div className="p-4">
          <p className="text-[10px] tracking-[0.15em] font-bold text-slate-500 mb-2">
            OPTIONAL EQUIPMENT
          </p>
          {data.options.some((o) => o.name) ? (
            <table className="w-full text-[11px]">
              <tbody>
                {data.options
                  .filter((o) => o.name || o.price)
                  .map((o) => (
                    <tr key={o.id} className="border-b border-dashed border-slate-200 last:border-0">
                      <td className="py-1 pr-2 text-slate-800">{o.name || "—"}</td>
                      <td className="py-1 text-right font-mono font-semibold tabular-nums whitespace-nowrap">
                        {o.price ? formatMoney(o.price) : "—"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="text-[11px] italic text-slate-400">
              Add optional packages in the form…
            </p>
          )}
        </div>
      </div>

      {/* Pricing summary */}
      <div className="border-t border-slate-300">
        <div className="px-5 py-3 grid grid-cols-2 gap-y-1 text-sm">
          <span className="text-slate-700">Base MSRP</span>
          <span className="text-right font-mono font-semibold tabular-nums">
            {formatMoney(totals.base)}
          </span>
          <span className="text-slate-700">Total options</span>
          <span className="text-right font-mono font-semibold tabular-nums">
            {formatMoney(totals.opts)}
          </span>
          <span className="text-slate-700">Destination charge</span>
          <span className="text-right font-mono font-semibold tabular-nums">
            {formatMoney(totals.dest)}
          </span>
        </div>
        <div className="bg-[#0c2d5e] text-white px-5 py-3 flex items-center justify-between">
          <span className="font-extrabold tracking-wide">TOTAL VEHICLE PRICE</span>
          <span className="font-mono font-extrabold text-lg tabular-nums">
            {formatMoney(totals.total)}
          </span>
        </div>
      </div>

      {/* Footer strip */}
      <div className="px-5 py-2 bg-slate-50 border-t border-slate-300 flex justify-between text-[10px] text-slate-500">
        <span>
          {data.dealerName && <strong className="text-slate-700">{data.dealerName}</strong>}
          {data.dealerName && data.dealerLocation && " · "}
          {data.dealerLocation}
        </span>
        <span>
          Generated by carcheckervin.com · Replica for display purposes
        </span>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v?: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-500">{k}</dt>
      <dd className="text-right font-medium text-slate-800 truncate max-w-[60%]">
        {v || "—"}
      </dd>
    </div>
  );
}
