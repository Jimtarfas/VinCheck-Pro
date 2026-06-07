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
  ArrowUp,
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
  warrantyBasic: string;
  warrantyPowertrain: string;
  warrantyCorrosion: string;
  warrantyRoadside: string;
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
  warrantyBasic: "3 yr / 36,000 mi bumper-to-bumper",
  warrantyPowertrain: "5 yr / 60,000 mi powertrain",
  warrantyCorrosion: "5 yr / unlimited mi corrosion perforation",
  warrantyRoadside: "5 yr / 60,000 mi roadside assistance",
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
  warrantyBasic: "",
  warrantyPowertrain: "",
  warrantyCorrosion: "",
  warrantyRoadside: "",
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

/* QR image — PNG so html2canvas can render it faithfully in the exported PDF. */
function qrUrl(vin: string): string {
  const target = `https://www.carcheckervin.com/report/${encodeURIComponent(vin)}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=4&format=png&data=${encodeURIComponent(target)}`;
}

/* OEM manufacturer logo (Ford oval, Toyota mark, etc.) by make, via the public
   car-logos-dataset on jsDelivr. Unknown makes resolve to a 404 image, which we
   hide with onError so the header degrades gracefully to the make wordmark. */
const BRAND_ALIASES: Record<string, string> = {
  vw: "volkswagen",
  chevy: "chevrolet",
  mercedes: "mercedes-benz",
  "mercedes benz": "mercedes-benz",
  "general motors": "gmc",
};

function brandLogoUrl(make: string): string {
  const m = make.trim().toLowerCase();
  const slug =
    BRAND_ALIASES[m] ||
    m.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/optimized/${slug}.png`;
}

type AuthState = "loading" | "authed" | "guest";

export default function WindowStickerMaker() {
  const [data, setData] = useState<StickerData>(sample);
  const [decoding, setDecoding] = useState(false);
  const [decodeError, setDecodeError] = useState<string | null>(null);
  const [auth, setAuth] = useState<AuthState>("loading");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");
  // Mini summary bar shows only while the full sticker is scrolled off-screen,
  // so the user always has the live total in view (mobile AND desktop) without
  // it being redundant when the full preview is already visible.
  const [stickerVisible, setStickerVisible] = useState(true);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
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
      if (action === "download") doPdf();
    }, 120);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  // Track whether the full sticker is on screen — drives the mini summary bar.
  useEffect(() => {
    const el = document.getElementById("sticker-export");
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => setStickerVisible(entry.isIntersecting),
      // Fire as soon as any part of the sticker enters/leaves the viewport.
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function scrollToSticker() {
    document
      .getElementById("sticker-export")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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

  function handleDownloadPdf() {
    if (!requireAuth("download")) return;
    doPdf();
  }

  function stickerFileName(): string {
    return (
      `${data.year}-${data.make}-${data.model}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "window-sticker"
    );
  }

  /* Convert an external image URL to a data URL by fetching it through the
     browser (bypasses CORS restrictions that would taint the canvas). */
  async function imgToDataUrl(url: string): Promise<string | null> {
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      const blob = await res.blob();
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  }

  /* Capture the live sticker element as a high-res canvas using html2canvas.
     We clone the node offscreen and replace all external <img> srcs with data
     URLs first — this is the only reliable way to avoid the CORS canvas-taint
     SecurityError that causes toDataURL() to silently fail. */
  async function captureCanvas(): Promise<HTMLCanvasElement | null> {
    const node = document.getElementById("sticker-export");
    if (!node) return null;

    // Clone into a hidden, same-size offscreen element
    const clone = node.cloneNode(true) as HTMLElement;
    clone.style.cssText = `
      position: absolute;
      top: -9999px;
      left: -9999px;
      width: ${node.offsetWidth}px;
      visibility: hidden;
      pointer-events: none;
    `;
    document.body.appendChild(clone);

    try {
      // Pre-fetch every external image as a data URL so html2canvas never
      // has to do a cross-origin request (eliminates canvas taint entirely).
      const imgs = Array.from(clone.querySelectorAll<HTMLImageElement>("img"));
      await Promise.all(
        imgs.map(async (img) => {
          const src = img.getAttribute("src");
          if (!src || src.startsWith("data:") || src.startsWith("blob:")) return;
          const dataUrl = await imgToDataUrl(src);
          if (dataUrl) {
            img.src = dataUrl;
          } else {
            img.style.display = "none";
          }
        })
      );

      const { default: html2canvas } = await import("html2canvas");
      return await html2canvas(clone, {
        scale: 2,
        useCORS: false,   // not needed — all imgs are now data URLs
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
      });
    } finally {
      document.body.removeChild(clone);
    }
  }

  /* Download a pixel-perfect PDF of exactly what the user sees in the preview. */
  async function doPdf() {
    setGeneratingPdf(true);
    setExportError(null);
    try {
      let canvas: HTMLCanvasElement | null = null;
      try {
        canvas = await captureCanvas();
      } catch (err) {
        console.error("[WindowSticker] captureCanvas failed:", err);
        setExportError("Could not generate the PDF — please try again.");
        return;
      }
      if (!canvas) {
        setExportError("Sticker element not found. Please try again.");
        return;
      }

      let imgData: string;
      try {
        imgData = canvas.toDataURL("image/png");
      } catch (err) {
        console.error("[WindowSticker] toDataURL failed:", err);
        setExportError("Image export failed. Please try again.");
        return;
      }

      const { default: jsPDF } = await import("jspdf");

      // Fit the sticker width to an A4 page (210 mm) with 10 mm side margins.
      const pageW = 210;
      const margins = 10;
      const printW = pageW - margins * 2;
      const ratio = canvas.height / canvas.width;
      const printH = printW * ratio;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [pageW, printH + margins * 2],
      });

      pdf.addImage(imgData, "PNG", margins, margins, printW, printH);
      pdf.save(`${stickerFileName()}-window-sticker.pdf`);

      fetch("/api/window-sticker/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vin: data.vin, make: data.make, model: data.model, year: data.year, action: "download" }),
      }).catch(() => {});
    } catch (err) {
      console.error("[WindowSticker] doPdf failed:", err);
      setExportError("Something went wrong. Please try again.");
    } finally {
      setGeneratingPdf(false);
    }
  }

  /* Print: render to canvas → open a minimal print window with the PNG so the
     browser's print dialog shows exactly what the preview shows, including all
     logos. The user can choose their printer or "Save as PDF". */
  async function doPrint() {
    setGeneratingPdf(true);
    setExportError(null);
    try {
      let canvas: HTMLCanvasElement | null = null;
      try {
        canvas = await captureCanvas();
      } catch (err) {
        console.error("[WindowSticker] captureCanvas failed:", err);
        setExportError("Could not generate the print image — please try again.");
        return;
      }
      if (!canvas) {
        setExportError("Sticker element not found. Please try again.");
        return;
      }

      let imgSrc: string;
      try {
        imgSrc = canvas.toDataURL("image/png");
      } catch (err) {
        console.error("[WindowSticker] toDataURL failed:", err);
        setExportError("Image export failed. Please try again.");
        return;
      }

      // Try popup first; fall back to an injected iframe if the popup is blocked.
      const win = window.open("", "_blank");
      if (win) {
        win.document.write(
          `<!doctype html><html><head>` +
          `<title>${data.year} ${data.make} ${data.model} Window Sticker</title>` +
          `<style>` +
          `*{margin:0;padding:0;box-sizing:border-box}` +
          `body{background:#fff}` +
          `img{display:block;width:100%;height:auto}` +
          `@media print{@page{size:auto;margin:0.4in}body{background:#fff}}` +
          `</style></head><body>` +
          `<img src="${imgSrc}" alt="Window sticker"/>` +
          `<script>window.onload=function(){window.print();}<\/script>` +
          `</body></html>`
        );
        win.document.close();
      } else {
        // Popup blocked — inject a hidden iframe to trigger print
        const iframe = document.createElement("iframe");
        iframe.style.cssText = "position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;border:none;";
        document.body.appendChild(iframe);
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(
            `<!doctype html><html><head>` +
            `<title>Window Sticker</title>` +
            `<style>*{margin:0;padding:0}body{background:#fff}img{display:block;width:100%;height:auto}` +
            `@media print{@page{size:auto;margin:0.4in}}</style>` +
            `</head><body><img src="${imgSrc}" alt="Window sticker"/></body></html>`
          );
          doc.close();
          setTimeout(() => {
            iframe.contentWindow?.print();
            setTimeout(() => document.body.removeChild(iframe), 2000);
          }, 500);
        }
      }

      fetch("/api/window-sticker/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vin: data.vin, make: data.make, model: data.model, year: data.year, action: "print" }),
      }).catch(() => {});
    } catch (err) {
      console.error("[WindowSticker] doPrint failed:", err);
      setExportError("Something went wrong. Please try again.");
    } finally {
      setGeneratingPdf(false);
    }
  }

  const standardList = data.standardEquipment
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* ── FORM ──
          On phones (stacked layout) the preview is ordered ABOVE the form so
          users see the sticker immediately without scrolling past the long
          form. On lg the grid restores form-left / preview-right. */}
      <div className="order-2 lg:order-1 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 print:hidden">
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
          <div className="col-span-2 space-y-3">
            {data.options.map((opt, i) => (
              <div
                key={opt.id}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Option {i + 1}
                  </span>
                  {data.options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOption(opt.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-rose-600 transition"
                      aria-label={`Remove option ${i + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  )}
                </div>
                <input
                  value={opt.name}
                  onChange={(e) => updateOption(opt.id, "name", e.target.value)}
                  placeholder="Option or package name"
                  aria-label={`Option ${i + 1} name`}
                  className={`${inputCls} mb-2`}
                />
                <div className="relative w-40">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    $
                  </span>
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
                    aria-label={`Option ${i + 1} price`}
                    className={`${inputCls} pl-7`}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-primary-300 bg-primary-50/40 px-4 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50 hover:border-primary-400 transition"
            >
              <Plus className="w-4 h-4" /> Add another option
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

        <Section title="Warranty">
          <Field label="Basic / bumper-to-bumper">
            <input
              value={data.warrantyBasic}
              onChange={(e) => update("warrantyBasic", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Powertrain">
            <input
              value={data.warrantyPowertrain}
              onChange={(e) => update("warrantyPowertrain", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Corrosion / rust-through">
            <input
              value={data.warrantyCorrosion}
              onChange={(e) => update("warrantyCorrosion", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Roadside assistance">
            <input
              value={data.warrantyRoadside}
              onChange={(e) => update("warrantyRoadside", e.target.value)}
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
      <div className="order-1 lg:order-2">
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
                onClick={handleDownloadPdf}
                disabled={generatingPdf}
                className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-semibold hover:border-primary-400 hover:text-primary-700 transition inline-flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-wait"
              >
                {generatingPdf ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : auth === "guest" ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {generatingPdf ? "Generating…" : "Download PDF"}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                disabled={generatingPdf}
                className="px-3 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition inline-flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-wait"
              >
                {generatingPdf ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : auth === "guest" ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Printer className="w-4 h-4" />
                )}
                Print
              </button>
            </div>
          </div>

          {exportError && (
            <p className="mb-2 rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 text-xs font-medium text-rose-700 flex items-center gap-1.5">
              <X className="w-3.5 h-3.5 shrink-0" />
              {exportError}
            </p>
          )}

          <StickerPreview data={data} totals={totals} standardList={standardList} />

          <p className="mt-3 text-[11px] text-slate-500 leading-relaxed print:hidden">
            This window sticker is generated from the data you entered. It is a Monroney-style
            replica for personal, listing, or display use — it is not a manufacturer-issued
            document. Use &ldquo;Print / Save as PDF&rdquo; for the cleanest export.
          </p>
        </div>
      </div>

      {/* Live mini summary bar — sticks to the bottom of the screen whenever
          the full sticker is scrolled out of view (mobile + desktop), so the
          running total stays visible while editing. Tapping it jumps back to
          the full preview. Hidden when the sticker is on screen, and in print. */}
      {!stickerVisible && (
        <button
          type="button"
          onClick={scrollToSticker}
          aria-label="Scroll to full window sticker preview"
          className="fixed inset-x-0 bottom-0 z-40 print:hidden border-t border-slate-700 bg-slate-900/95 backdrop-blur text-white shadow-[0_-4px_20px_rgba(0,0,0,0.25)]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
            <div className="min-w-0 text-left">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 leading-none">
                Live preview
              </p>
              <p className="text-sm font-semibold truncate leading-tight mt-0.5">
                {[data.year, data.make, data.model].filter(Boolean).join(" ") ||
                  "Your vehicle"}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 leading-none">
                  Total
                </p>
                <p className="font-mono font-extrabold tabular-nums leading-tight mt-0.5">
                  {formatMoney(totals.total)}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold">
                View <ArrowUp className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </button>
      )}

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
  const annual = parseFloat(data.annualFuelCost);
  const annualValid = Number.isFinite(annual);
  // EPA prints a 5-year fuel cost projection against a 15,000 mi/yr average.
  const fiveYear = annualValid ? annual * 5 : null;
  const warranties = [
    { k: "Basic", v: data.warrantyBasic },
    { k: "Powertrain", v: data.warrantyPowertrain },
    { k: "Corrosion", v: data.warrantyCorrosion },
    { k: "Roadside", v: data.warrantyRoadside },
  ].filter((w) => w.v.trim());

  return (
    <div
      id="sticker-export"
      className="bg-white border border-slate-900 shadow-xl shadow-slate-900/10 overflow-hidden text-slate-900"
    >
      {/* OEM brand header — manufacturer logo + make name, like a real label */}
      <div className="bg-white border-b-4 border-[#0c2d5e] px-5 pt-4 pb-3 flex items-center gap-3">
        {data.make && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={data.make}
            src={brandLogoUrl(data.make)}
            alt={`${data.make} logo`}
            className="h-11 w-auto max-w-[120px] object-contain shrink-0"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
        <div className="min-w-0">
          <p className="text-[26px] leading-none font-black uppercase tracking-tight text-[#0c2d5e] truncate">
            {data.make || "Vehicle"}
          </p>
          <p className="text-[10px] tracking-[0.25em] font-bold text-slate-500 mt-1">
            MONRONEY VEHICLE LABEL · WINDOW STICKER
          </p>
        </div>
      </div>

      {/* Title bar: year/model/trim + MSRP callout */}
      <div className="bg-[#0c2d5e] text-white px-5 py-3 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-xl font-extrabold leading-tight truncate">
            {data.year || "—"} {data.make || "Vehicle"} {data.model}
          </h3>
          <p className="text-[11px] opacity-80 truncate">
            {data.trim || "—"}
            {data.bodyStyle ? ` · ${data.bodyStyle}` : ""}
            {data.drivetrain ? ` · ${data.drivetrain}` : ""}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[9px] tracking-[0.2em] font-bold opacity-70">BASE MSRP</p>
          <p className="font-mono text-lg font-extrabold leading-none tabular-nums">
            {formatMoney(totals.base)}
          </p>
        </div>
      </div>

      {/* VIN strip */}
      <div className="bg-slate-100 border-b border-slate-300 px-5 py-1.5 flex justify-between items-center text-[11px]">
        <span className="font-bold tracking-[0.15em] text-slate-500">
          VEHICLE IDENTIFICATION NUMBER
        </span>
        <span className="font-mono font-bold tracking-[0.18em] text-slate-900">
          {data.vin || "—"}
        </span>
      </div>

      {/* Description + Standard equipment | Options + Pricing */}
      <div className="grid grid-cols-2">
        {/* Left column */}
        <div className="border-r border-slate-300">
          <div className="p-4 border-b border-slate-300">
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
          <div className="p-4">
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
        </div>

        {/* Right column */}
        <div>
          <div className="p-4 border-b border-slate-300">
            <p className="text-[10px] tracking-[0.15em] font-bold text-slate-500 mb-2">
              OPTIONAL EQUIPMENT
            </p>
            {data.options.some((o) => o.name) ? (
              <table className="w-full text-[11px]">
                <tbody>
                  {data.options
                    .filter((o) => o.name || o.price)
                    .map((o) => (
                      <tr
                        key={o.id}
                        className="border-b border-dashed border-slate-200 last:border-0"
                      >
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

          {/* Pricing summary */}
          <div className="p-4">
            <p className="text-[10px] tracking-[0.15em] font-bold text-slate-500 mb-2">
              PRICE INFORMATION
            </p>
            <div className="grid grid-cols-2 gap-y-1 text-xs">
              <span className="text-slate-600">Base price</span>
              <span className="text-right font-mono font-semibold tabular-nums">
                {formatMoney(totals.base)}
              </span>
              <span className="text-slate-600">Total options</span>
              <span className="text-right font-mono font-semibold tabular-nums">
                {formatMoney(totals.opts)}
              </span>
              <span className="text-slate-600">Destination charge</span>
              <span className="text-right font-mono font-semibold tabular-nums">
                {formatMoney(totals.dest)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Total band */}
      <div className="bg-[#0c2d5e] text-white px-5 py-3 flex items-center justify-between border-t border-slate-300">
        <span className="font-extrabold tracking-wide whitespace-nowrap">
          TOTAL VEHICLE PRICE
        </span>
        <span className="font-mono font-extrabold text-xl tabular-nums">
          {formatMoney(totals.total)}
        </span>
      </div>

      {/* Official-style EPA fuel economy panel */}
      <div className="border-t border-slate-300 bg-[#fbe10a] text-slate-900">
        <div className="flex items-center justify-between px-5 pt-3">
          <p className="text-[13px] font-black uppercase tracking-tight whitespace-nowrap">
            Fuel Economy &amp; Environment
          </p>
          <p className="text-[10px] font-bold uppercase tracking-wider">EPA</p>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-4 px-5 py-3 items-stretch">
          {/* Big combined number */}
          <div className="flex flex-col items-center justify-center border-r-2 border-slate-900/40 pr-5">
            <p className="text-[9px] font-bold uppercase tracking-wider">Combined</p>
            <p className="text-[58px] leading-none font-black">
              {data.combinedMpg || "—"}
            </p>
            <p className="text-[11px] font-bold uppercase tracking-wide">MPG</p>
          </div>
          {/* City / Highway + costs */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 content-center">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider">City</p>
              <p className="text-2xl font-black leading-none">
                {data.cityMpg || "—"}
                <span className="text-[11px] font-bold"> MPG</span>
              </p>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider">Highway</p>
              <p className="text-2xl font-black leading-none">
                {data.hwyMpg || "—"}
                <span className="text-[11px] font-bold"> MPG</span>
              </p>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider">
                Est. annual fuel cost
              </p>
              <p className="text-lg font-black leading-none">
                {annualValid ? formatMoney(annual) : "—"}
              </p>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider">
                5-year fuel cost
              </p>
              <p className="text-lg font-black leading-none">
                {fiveYear !== null ? formatMoney(fiveYear) : "—"}
              </p>
            </div>
          </div>
        </div>
        <div className="px-5 pb-2 flex justify-between text-[9px] font-semibold text-slate-800/80">
          <span>Fuel type: {data.fuelType || "Gasoline"}</span>
          <span>Based on 15,000 mi/yr · fueleconomy.gov</span>
        </div>
      </div>

      {/* Warranty + QR */}
      <div className="grid grid-cols-[1fr_auto] gap-4 border-t border-slate-300 p-4 items-start">
        <div>
          <p className="text-[10px] tracking-[0.15em] font-bold text-slate-500 mb-2">
            WARRANTY COVERAGE
          </p>
          {warranties.length > 0 ? (
            <dl className="text-[11px] space-y-1.5">
              {warranties.map((w) => (
                <div key={w.k} className="grid grid-cols-[76px_1fr] gap-x-3">
                  <dt className="text-slate-500">{w.k}</dt>
                  <dd className="font-medium text-slate-800 min-w-0 break-words">{w.v}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-[11px] italic text-slate-400">
              Add warranty terms in the form…
            </p>
          )}
        </div>
        <div className="flex flex-col items-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrUrl(data.vin || "VIN")}
            alt="QR code linking to the live VIN report"
            width={96}
            height={96}
            className="w-24 h-24 border border-slate-300 bg-white"
          />
          <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500 mt-1 text-center leading-tight max-w-[96px]">
            Scan to open window sticker
          </p>
        </div>
      </div>

      {/* Dealer / disclaimer row */}
      <div className="px-5 py-2 bg-slate-50 border-t border-slate-300 flex justify-between text-[10px] text-slate-500">
        <span>
          {data.dealerName && (
            <strong className="text-slate-700">{data.dealerName}</strong>
          )}
          {data.dealerName && data.dealerLocation && " · "}
          {data.dealerLocation}
        </span>
        <span className="whitespace-nowrap">Replica for display purposes only</span>
      </div>

      {/* Branded footer — our logo + website. Literal colors (no CSS vars) so
          the standalone HTML export renders the brand faithfully. */}
      <div className="px-5 py-3 bg-[#0c2d5e] text-white flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <svg
            width={26}
            height={26}
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="40" height="40" rx="10" fill="#003178" />
            <path
              d="M 26.75 11.96 A 10.5 10.5 0 1 0 26.75 28.04"
              stroke="#ffffff"
              strokeWidth="3.4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 14.5 20.6 L 17.8 24 L 25 16"
              stroke="#ff9800"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="font-black tracking-tight text-base leading-none">
            CarChecker<span className="ml-1 text-[#ff9800]">VIN</span>
          </span>
        </div>
        <span className="font-semibold text-[11px] tracking-wide text-white/90">
          www.carcheckervin.com
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
