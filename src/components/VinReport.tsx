"use client";

import {
  Car, Gauge, Settings, Fuel, Cog, DoorOpen, Check, Shield, ChevronDown,
  ChevronLeft, ChevronRight, Printer, Share2, ArrowLeft, DollarSign,
  TrendingUp, TrendingDown, BarChart3, MapPin, Calendar, Palette, Tag,
  Zap, Award, Info, Activity, Download, AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import type { VinData } from "@/lib/api";
import { addToHistory } from "@/lib/vinHistory";
import VinSearchForm from "./VinSearchForm";
import dynamic from "next/dynamic";

// Lazy-load AI section — it's below the fold and only needed after initial render.
const VinReportAI = dynamic(() => import("./VinReportAI"), {
  loading: () => (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-600">
      Loading insights…
    </div>
  ),
});

/* ─────────────────────────────────────────────────────────────
   Download helper — unchanged from original
───────────────────────────────────────────────────────────── */
async function fetchBase64Images(urls: string[]): Promise<string[]> {
  if (urls.length === 0) return [];
  try {
    const res = await fetch("/api/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls }),
    });
    if (!res.ok) return urls.map(() => "");
    const { images } = await res.json();
    return images;
  } catch {
    return urls.map(() => "");
  }
}

function useDownloadReport(data: VinData) {
  const [loading, setLoading] = useState(false);

  const download = useCallback(async () => {
    setLoading(true);
    const year   = data.years?.[0]?.year;
    const makeName  = data.make?.name  || "Unknown";
    const modelName = data.model?.name || "Unknown";
    const trim      = data.years?.[0]?.styles?.[0]?.trim;
    const fullName  = [year, makeName, modelName, trim].filter(Boolean).join(" ");
    const styleName = data.years?.[0]?.styles?.[0]?.name || "";

    // Fire-and-forget download tracking — never blocks or fails the export.
    void fetch("/api/track-download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        vin: data.vin,
        make: makeName,
        model: modelName,
        year: year ?? null,
      }),
    }).catch(() => {});

    const photoUrls = data.photos?.slice(0, 9) || [];
    const listingPhotoUrls = data.marketData?.sampleListings
      ?.filter((l) => l.primaryPhotoUrl).slice(0, 6).map((l) => l.primaryPhotoUrl!) || [];
    const allUrls    = [...photoUrls, ...listingPhotoUrls];
    const allBase64  = await fetchBase64Images(allUrls);
    const base64Photos        = allBase64.slice(0, photoUrls.length);
    const base64ListingPhotos = allBase64.slice(photoUrls.length);

    const rows = (items: [string, string | undefined][]) =>
      items.filter(([, v]) => v)
        .map(([k, v]) => `<tr><td style="padding:8px 16px;font-weight:600;color:#003178;border-bottom:1px solid #eceef1;width:180px">${k}</td><td style="padding:8px 16px;color:#434652;border-bottom:1px solid #eceef1">${v}</td></tr>`)
        .join("");
    const sectionHtml = (title: string, content: string) =>
      `<div style="margin-bottom:24px"><h2 style="font-size:16px;font-weight:800;color:#003178;margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid #ff9800">${title}</h2>${content}</div>`;
    const tableWrap = (inner: string) =>
      `<table style="width:100%;border-collapse:collapse;font-size:13px">${inner}</table>`;

    let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${fullName} - VINCheck Pro Report</title>
<style>@media print{body{margin:0}@page{margin:0.5in}}.page{max-width:800px;margin:0 auto;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#191c1e;padding:40px}
.header{background:#003178;color:white;padding:32px;border-radius:24px;margin-bottom:32px}
.header h1{margin:0 0 4px;font-size:26px;font-weight:900}.header p{margin:4px 0;opacity:0.75;font-size:13px}
.badge{display:inline-block;background:rgba(255,152,0,0.25);color:#ff9800;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:800;letter-spacing:0.1em;margin-bottom:12px}
table{width:100%;border-collapse:collapse}td{padding:8px 16px;border-bottom:1px solid #eceef1;font-size:13px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.card{background:#f2f4f7;border-radius:12px;padding:16px}
.card-label{font-size:11px;color:#737783;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px}.card-value{font-size:20px;font-weight:800;color:#003178}
.photo-wrap{position:relative;overflow:hidden;border-radius:16px;margin-bottom:12px;background:#eceef1}
.photo-wrap img{width:108%;max-height:420px;object-fit:cover;display:block;margin-left:-4%;margin-top:-2%}
.photos-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:8px}
.photo-thumb{position:relative;overflow:hidden;border-radius:8px;height:120px;background:#eceef1}
.photo-thumb img{width:115%;height:130%;object-fit:cover;margin-left:-7%;margin-top:-15%}
.list-thumb{position:relative;overflow:hidden;height:100px;background:#eceef1}
.list-thumb img{width:118%;height:130%;object-fit:cover;margin-left:-9%;margin-top:-15%}
.footer{text-align:center;padding:24px;margin-top:32px;font-size:11px;color:#737783}
</style></head><body><div class="page">`;

    html += `<div class="header">
      <div class="badge">VINCheck Pro Report</div>
      <h1>${fullName}</h1>
      ${styleName ? `<p>${styleName}</p>` : ""}
      <p style="font-family:monospace;letter-spacing:1px">VIN: ${data.vin}</p>
      <p style="font-size:11px;opacity:0.55">Generated: ${new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</p>
    </div>`;

    const validPhotos = base64Photos.filter(Boolean);
    if (validPhotos.length > 0) {
      const mainPhoto   = validPhotos[0];
      const thumbPhotos = validPhotos.slice(1);
      html += `<div style="margin-bottom:24px">
        <h2 style="font-size:16px;font-weight:800;color:#003178;margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid #ff9800">Vehicle Photos (${data.photos?.length || validPhotos.length})</h2>
        <div class="photo-wrap"><img src="${mainPhoto}" alt="${fullName}" /></div>
        ${thumbPhotos.length > 0 ? `<div class="photos-grid">${thumbPhotos.map((p,i) => `<div class="photo-thumb"><img src="${p}" alt="Photo ${i+2}" /></div>`).join("")}</div>` : ""}
        ${(data.photos?.length||0)>9 ? `<p style="text-align:center;font-size:12px;color:#737783;margin:8px 0 0">+${(data.photos?.length||0)-9} more photos available online</p>` : ""}
      </div>`;
    }

    const overviewItems: [string, string | undefined][] = [
      ["Year", year ? String(year) : undefined],
      ["Make", makeName], ["Model", modelName], ["Trim", trim],
      ["Body Type", data.categories?.primaryBodyType], ["Vehicle Type", data.categories?.vehicleType],
      ["Doors", data.numOfDoors ? `${data.numOfDoors} Doors` : undefined],
      ["Drivetrain", data.drivenWheels], ["Vehicle Size", data.categories?.vehicleSize],
      ["EPA Class", data.categories?.epaClass], ["Manufacturer Code", data.manufacturerCode],
    ];
    html += sectionHtml("Vehicle Overview", tableWrap(rows(overviewItems)));

    if (data.price) {
      const priceItems: [string, string | undefined][] = [
        ["Base MSRP",    data.price.baseMsrp > 0     ? `$${data.price.baseMsrp.toLocaleString()}`     : undefined],
        ["Invoice Price",data.price.baseInvoice > 0  ? `$${data.price.baseInvoice.toLocaleString()}`  : undefined],
        ["Used Retail",  data.price.usedTmvRetail > 0 ? `$${data.price.usedTmvRetail.toLocaleString()}` : undefined],
        ["Trade-In",     data.price.usedTradeIn > 0  ? `$${data.price.usedTradeIn.toLocaleString()}`  : undefined],
        ["Private Party",data.price.usedPrivateParty > 0 ? `$${data.price.usedPrivateParty.toLocaleString()}` : undefined],
      ];
      html += sectionHtml("Pricing & Valuation", tableWrap(rows(priceItems)));
    }

    if (data.marketData) {
      let mkt = `<div class="grid">
        <div class="card"><div class="card-label">Average Price</div><div class="card-value">$${data.marketData.averagePrice.toLocaleString()}</div></div>
        <div class="card"><div class="card-label">Price Range</div><div class="card-value">$${data.marketData.lowestPrice.toLocaleString()} — $${data.marketData.highestPrice.toLocaleString()}</div></div>
        <div class="card"><div class="card-label">Active Listings</div><div class="card-value">${data.marketData.totalListings}</div></div>
        ${data.marketData.averageMileage > 0 ? `<div class="card"><div class="card-label">Avg. Mileage</div><div class="card-value">${data.marketData.averageMileage.toLocaleString()} mi</div></div>` : ""}
      </div>`;
      if (data.marketData.sampleListings.length > 0) {
        let idx = 0;
        mkt += `<h3 style="font-size:13px;font-weight:700;color:#434652;margin:20px 0 10px;text-transform:uppercase;letter-spacing:0.5px">Similar Vehicles</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
          ${data.marketData.sampleListings.slice(0,6).map((l) => {
            const b64 = l.primaryPhotoUrl ? base64ListingPhotos[idx++] : "";
            return `<div style="background:#f2f4f7;border-radius:10px;overflow:hidden;font-size:12px">
            ${b64 ? `<div class="list-thumb"><img src="${b64}" alt="${l.year} ${l.make} ${l.model}" /></div>` : ""}
            <div style="padding:8px"><div style="font-weight:700;color:#191c1e">${l.year} ${l.trim||l.model}</div>
            <div style="color:#003178;font-weight:800;font-size:14px">${l.price}</div>
            <div style="color:#737783">${l.mileage}${l.city&&l.state?` · ${l.city}, ${l.state}`:""}</div></div></div>`;
          }).join("")}</div>`;
      }
      html += sectionHtml("Market Analysis", mkt);
    }

    if (data.engine) {
      const eng: [string, string | undefined][] = [
        ["Configuration", data.engine.cylinder ? `${data.engine.cylinder}-Cylinder ${data.engine.configuration}` : undefined],
        ["Displacement", data.engine.displacement ? `${data.engine.displacement} cc (${data.engine.size}L)` : undefined],
        ["Horsepower", data.engine.horsepower ? `${data.engine.horsepower} HP` : undefined],
        ["Torque", data.engine.torque ? `${data.engine.torque} lb-ft` : undefined],
        ["Fuel Type", data.engine.fuelType],
        ["Aspiration", data.engine.compressorType === "NA" ? "Naturally Aspirated" : data.engine.compressorType],
        ["Total Valves", data.engine.totalValves ? String(data.engine.totalValves) : undefined],
        ["Engine Code", data.engine.manufacturerEngineCode || undefined],
      ];
      html += sectionHtml("Engine & Performance", tableWrap(rows(eng)));
    }

    if (data.transmission) {
      const trans: [string, string | undefined][] = [
        ["Type", data.transmission.transmissionType],
        ["Speeds", `${data.transmission.numberOfSpeeds}-Speed`],
        ["Driven Wheels", data.drivenWheels],
      ];
      html += sectionHtml("Transmission & Drivetrain", tableWrap(rows(trans)));
    }

    if (data.mpg) {
      html += sectionHtml("Fuel Economy",`<div class="grid">
        <div class="card"><div class="card-label">City</div><div class="card-value">${data.mpg.city} MPG</div></div>
        <div class="card"><div class="card-label">Highway</div><div class="card-value">${data.mpg.highway} MPG</div></div>
      </div>`);
    }

    if (data.colors?.length) {
      html += sectionHtml("Available Colors", data.colors.map((c) =>
        `<p style="margin:0 0 6px"><strong>${c.category}:</strong> ${c.options.map((o) => o.name).join(", ")}</p>`
      ).join(""));
    }

    if (data.options?.length) {
      const optHtml = data.options.map((cat) =>
        `<div style="margin-bottom:16px"><h3 style="font-size:12px;font-weight:800;color:#434652;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.5px">${cat.category} (${cat.options.length})</h3>
        <div style="display:flex;flex-wrap:wrap;gap:6px">${cat.options.map((o) => `<span style="background:#eceef1;border-radius:6px;padding:4px 10px;font-size:12px;color:#434652">${o.name}</span>`).join("")}</div></div>`
      ).join("");
      html += sectionHtml(`Options & Equipment (${data.options.reduce((a,c)=>a+c.options.length,0)} items)`, optHtml);
    }

    if (data.listing) {
      const lstItems: [string, string | undefined][] = [
        ["Asking Price", data.listing.price], ["Mileage", data.listing.mileage],
        ["Color", data.listing.displayColor], ["Condition", data.listing.condition],
        ["Dealer", data.listing.dealerName],
        ["Location", data.listing.city&&data.listing.state ? `${data.listing.city}, ${data.listing.state}` : undefined],
      ];
      html += sectionHtml("Current Listing", tableWrap(rows(lstItems)));
    }

    html += `<div class="footer"><p>Generated by VINCheck Pro — carcheckervin.com</p>
      <p>This report is for informational purposes only. Always verify with official records.</p></div>
    </div></body></html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url  = URL.createObjectURL(blob);
    const win  = window.open(url, "_blank");
    if (win) { win.onload = () => { setTimeout(() => win.print(), 300); URL.revokeObjectURL(url); }; }

    // Fire-and-forget: record this download against the signed-in user so it
    // appears in their /dashboard. Guests are silently ignored by the API.
    try {
      void fetch("/api/user/track-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vin: data.vin,
          make: makeName,
          model: modelName,
          year: year ?? null,
        }),
        keepalive: true,
      });
    } catch {
      /* ignore */
    }

    setLoading(false);
  }, [data]);

  return { download, loading };
}

/* ─────────────────────────────────────────────────────────────
   Photo Gallery
───────────────────────────────────────────────────────────── */
function PhotoGallery({ photos, alt }: { photos: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-surface-container-low rounded-[2rem]">
        <div className="w-20 h-20 rounded-2xl bg-surface-container flex items-center justify-center mb-4">
          <Car className="w-10 h-10 text-outline/40" />
        </div>
        <h3 className="font-headline font-bold text-on-surface mb-1">No Photos Available</h3>
        <p className="text-sm text-on-surface-variant text-center max-w-sm">
          This vehicle is not currently listed for sale, so no real photos are available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-sm">
      {/* Main photo — 3:2 on mobile matches real car-photo dimensions so the whole
          vehicle stays visible (2:1 was cropping off the roof and wheels), 16:9 on desktop */}
      <div className="relative aspect-[3/2] sm:aspect-[16/9] bg-surface-container overflow-hidden">
        <div className="absolute inset-0">
          <Image src={photos[current]} alt={`${alt} - Photo ${current + 1}`} fill className="object-cover" sizes="(max-width:768px) 100vw, 900px" priority={current === 0} />
        </div>
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

        {/* Photo count badge */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-on-surface/70 backdrop-blur rounded-full text-[10px] sm:text-xs text-white font-bold">
          {photos.length} Photos
        </div>

        {photos.length > 1 && (
          <>
            <button onClick={() => setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1))}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-surface-container-lowest/80 hover:bg-surface-container-lowest rounded-full flex items-center justify-center text-on-surface shadow-lg transition cursor-pointer backdrop-blur-sm">
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button onClick={() => setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1))}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-surface-container-lowest/80 hover:bg-surface-container-lowest rounded-full flex items-center justify-center text-on-surface shadow-lg transition cursor-pointer backdrop-blur-sm">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-on-surface/60 backdrop-blur rounded-full text-[10px] sm:text-xs text-white font-semibold">
              {current + 1} / {photos.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails — smaller on mobile */}
      {photos.length > 1 && (
        <div className="flex gap-1.5 sm:gap-2 p-2 sm:p-3 overflow-x-auto bg-surface-container-low [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {photos.slice(0, 14).map((photo, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`relative w-14 h-10 sm:w-20 sm:h-14 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer transition-all ${i === current ? "ring-2 ring-primary" : "opacity-50 hover:opacity-100"}`}>
              <div className="absolute inset-0" style={{ transform: "scale(1.08)" }}>
                <Image src={photo} alt={`Thumb ${i + 1}`} fill className="object-cover" sizes="80px" />
              </div>
            </button>
          ))}
          {photos.length > 14 && (
            <div className="w-14 h-10 sm:w-20 sm:h-14 flex-shrink-0 rounded-lg sm:rounded-xl bg-surface-container flex items-center justify-center text-[10px] sm:text-xs text-on-surface-variant font-medium">
              +{photos.length - 14}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Reusable primitives
───────────────────────────────────────────────────────────── */
function DataCard({ icon: Icon, label, value, accent = "bg-primary/8 text-primary" }: {
  icon: React.ComponentType<{ className?: string }>; label: string; value: string; accent?: string;
}) {
  return (
    <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 bg-surface-container-lowest rounded-2xl shadow-sm">
      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${accent} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] sm:text-xs text-outline uppercase tracking-wider font-semibold">{label}</p>
        <p className="text-sm sm:text-base font-semibold text-on-surface break-words mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 border-b border-surface-container last:border-0">
      <p className="text-xs text-outline uppercase tracking-wider font-semibold mb-1">{label}</p>
      <p className="font-semibold text-on-surface capitalize">{value}</p>
    </div>
  );
}

function Card({ icon: Icon, title, subtitle, accent = "bg-primary/8 text-primary", children }: {
  icon: React.ComponentType<{ className?: string }>; title: string; subtitle?: string; accent?: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-container-lowest rounded-3xl sm:rounded-[2rem] shadow-sm overflow-hidden">
      <div className="px-4 sm:px-6 py-5 border-b border-surface-container">
        <h2 className="font-headline font-bold text-base sm:text-lg text-on-surface flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${accent} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
          {title}
        </h2>
        {subtitle && <p className="text-xs sm:text-sm text-on-surface-variant mt-1 ml-12">{subtitle}</p>}
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Report Component
───────────────────────────────────────────────────────────── */
export default function VinReport({ data }: { data: VinData }) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["Interior", "Exterior"]));
  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => { const next = new Set(prev); if (next.has(cat)) next.delete(cat); else next.add(cat); return next; });
  };
  const { download: downloadReport, loading: downloadLoading } = useDownloadReport(data);

  const year      = data.years?.[0]?.year;
  const trim      = data.years?.[0]?.styles?.[0]?.trim;
  const styleName = data.years?.[0]?.styles?.[0]?.name;
  const submodel  = data.years?.[0]?.styles?.[0]?.submodel;
  const makeName  = data.make?.name  || "Unknown Make";
  const modelName = data.model?.name || "Unknown Model";
  const fullName  = [year, makeName, modelName, trim].filter(Boolean).join(" ");

  const [shareState, setShareState] = useState<"idle" | "copied" | "error">("idle");

  // Persist this visit into the per-browser history so the home page
  // can show it back to the user (guest or logged-in).
  useEffect(() => {
    if (!data.vin) return;
    addToHistory({
      vin: data.vin,
      label: fullName || data.vin,
      photo: data.photos?.[0],
      price: data.listing?.price,
    });

    // Client-side backstop for server-side tracking. If the user is signed
    // in, this ensures the view lands in vin_lookups with their user_id so
    // it shows in /dashboard. The API silently no-ops for guests.
    try {
      void fetch("/api/user/track-view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vin: data.vin,
          make: makeName,
          model: modelName,
          year: year ?? null,
        }),
        keepalive: true,
      });
    } catch {
      /* ignore */
    }
  }, [data.vin, fullName, data.photos, data.listing?.price, makeName, modelName, year]);

  const handleShare = useCallback(async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    const title = `${fullName} — VIN Report`;
    const text = `Vehicle history report for ${fullName} (VIN: ${data.vin})`;

    // Try the native share sheet first (mobile + modern desktop).
    const nav = navigator as Navigator & { share?: (d: ShareData) => Promise<void> };
    if (typeof nav.share === "function") {
      try {
        await nav.share({ title, text, url });
        return;
      } catch (err) {
        // User cancelled — don't treat as an error, and don't fall through.
        if (err instanceof Error && err.name === "AbortError") return;
        // Any other share failure falls through to clipboard.
      }
    }

    // Clipboard fallback.
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Legacy fallback for older browsers / insecure contexts.
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setShareState("copied");
      setTimeout(() => setShareState("idle"), 2000);
    } catch {
      setShareState("error");
      setTimeout(() => setShareState("idle"), 2500);
    }
  }, [data.vin, fullName]);

  return (
    <div className="bg-surface min-h-screen pt-16">

      {/* ══════════════════════════════════════════════════════
          HERO HEADER — Deep navy, editorial, car-forward
      ══════════════════════════════════════════════════════ */}
      <div className="bg-primary relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #0d47a1 0%, transparent 70%)", filter: "blur(40px)" }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          {/* Back link */}
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/85 hover:text-white mb-5 sm:mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex-1 min-w-0">
              {/* Status chips */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1.5 text-on-secondary-container"
                  style={{ background: "var(--color-secondary-container)" }}>
                  <Shield className="w-3 h-3" /> Report Generated
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

              {/* Vehicle name */}
              <h1 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-2 break-words">
                {year && <span className="text-secondary-fixed-dim">{year} </span>}
                {makeName} {modelName}
              </h1>
              {styleName && <p className="text-sm sm:text-base text-white/85 mb-2 break-words">{styleName}</p>}
              <p className="font-mono text-[11px] sm:text-sm tracking-wider sm:tracking-widest text-white/85 break-all">VIN: {data.vin}</p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 mt-5 sm:mt-6">
                <button onClick={downloadReport} disabled={downloadLoading}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-on-secondary-container hover:brightness-110 transition cursor-pointer disabled:opacity-60"
                  style={{ background: "var(--color-secondary-container)" }}>
                  <Download className={`w-4 h-4 ${downloadLoading ? "animate-pulse" : ""}`} />
                  {downloadLoading ? "Preparing…" : "Download Report"}
                </button>
                <button onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 rounded-full text-xs sm:text-sm font-medium text-white transition cursor-pointer">
                  <Printer className="w-4 h-4" /> Print
                </button>
                <button
                  onClick={handleShare}
                  aria-live="polite"
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium text-white transition cursor-pointer ${
                    shareState === "copied"
                      ? "bg-green-500/30 hover:bg-green-500/40"
                      : shareState === "error"
                      ? "bg-red-500/30 hover:bg-red-500/40"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {shareState === "copied" ? (
                    <>
                      <Check className="w-4 h-4" /> Link copied!
                    </>
                  ) : shareState === "error" ? (
                    <>
                      <Share2 className="w-4 h-4" /> Copy failed
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" /> Share
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          BODY — Two-column layout
      ══════════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full overflow-hidden">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

          {/* ── LEFT / MAIN COLUMN (2/3) ── */}
          <div className="lg:col-span-2 space-y-6 min-w-0">

            {/* Photo gallery */}
            <PhotoGallery photos={data.photos || []} alt={fullName} />

            {/* Currently listed banner */}
            {data.listing && (
              <div className="bg-primary p-5 sm:p-6 rounded-3xl sm:rounded-[2rem] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--color-secondary-container)" }} />
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-secondary-container" />
                  <h2 className="font-headline font-bold text-white">Currently Listed for Sale</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-white/85 font-semibold uppercase tracking-wider">Asking Price</p>
                    <p className="text-xl sm:text-2xl font-headline font-black text-secondary-container break-words">{data.listing.price}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-white/85 font-semibold uppercase tracking-wider">Mileage</p>
                    <p className="text-lg sm:text-xl font-headline font-bold text-white break-words">{data.listing.mileage}</p>
                  </div>
                  {data.listing.displayColor && (
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-white/85 font-semibold uppercase tracking-wider">Color</p>
                      <p className="text-base sm:text-lg font-bold text-white break-words">{data.listing.displayColor}</p>
                    </div>
                  )}
                  {data.listing.dealerName && (
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-white/85 font-semibold uppercase tracking-wider">Dealer</p>
                      <p className="text-sm font-semibold text-white break-words">{data.listing.dealerName}</p>
                      {data.listing.city && data.listing.state && (
                        <p className="text-xs text-white/85 flex items-center gap-1 mt-0.5 break-words">
                          <MapPin className="w-3 h-3 flex-shrink-0" />{data.listing.city}, {data.listing.state}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick specs grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {year        && <DataCard icon={Calendar}  label="Year"         value={String(year)}                 accent="bg-primary/8 text-primary" />}
              <DataCard icon={Car}      label="Make"         value={makeName}                     accent="bg-primary/8 text-primary" />
              <DataCard icon={Car}      label="Model"        value={modelName}                    accent="bg-tertiary/10 text-tertiary" />
              {trim        && <DataCard icon={Tag}       label="Trim"         value={trim}                         accent="bg-violet-50 text-violet-600" />}
              {data.numOfDoors && <DataCard icon={DoorOpen} label="Doors"    value={`${data.numOfDoors} Doors`}   accent="bg-amber-50 text-amber-600" />}
              {data.drivenWheels && <DataCard icon={Cog}  label="Drivetrain" value={data.drivenWheels}            accent="bg-cyan-50 text-cyan-600" />}
              {data.transmission && <DataCard icon={Settings} label="Transmission" value={`${data.transmission.numberOfSpeeds}-Spd ${data.transmission.transmissionType}`} accent="bg-purple-50 text-purple-600" />}
              {data.engine?.fuelType && <DataCard icon={Fuel} label="Fuel Type"  value={data.engine.fuelType}     accent="bg-green-50 text-green-600" />}
              {data.mpg    && <DataCard icon={Gauge}     label="Fuel Economy" value={`${data.mpg.city} / ${data.mpg.highway} MPG`} accent="bg-emerald-50 text-emerald-600" />}
              {data.categories?.vehicleSize && <DataCard icon={Info}   label="Size"  value={data.categories.vehicleSize} accent="bg-amber-50 text-amber-600" />}
              {data.categories?.epaClass    && <DataCard icon={Award}  label="EPA Class" value={data.categories.epaClass}    accent="bg-teal-50 text-teal-600" />}
              {submodel?.body && <DataCard icon={Car} label="Body Style" value={submodel.body} accent="bg-indigo-50 text-indigo-600" />}
            </div>

            {/* Engine & Performance */}
            {data.engine && (
              <Card icon={Zap} title="Engine & Performance" subtitle="Complete powertrain specifications" accent="bg-amber-50 text-amber-600">
                <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8">
                  {data.engine.cylinder     && <Stat label="Configuration" value={`${data.engine.cylinder}-Cyl ${data.engine.configuration}`} />}
                  {data.engine.displacement && <Stat label="Displacement"  value={`${data.engine.displacement} cc (${data.engine.size}L)`} />}
                  {data.engine.horsepower   && <Stat label="Horsepower"    value={`${data.engine.horsepower} HP${data.engine.rpm?.horsepower ? ` @ ${data.engine.rpm.horsepower} RPM` : ""}`} />}
                  {data.engine.torque       && <Stat label="Torque"        value={`${data.engine.torque} lb-ft${data.engine.rpm?.torque ? ` @ ${data.engine.rpm.torque} RPM` : ""}`} />}
                  {data.engine.totalValves  && <Stat label="Valves"        value={String(data.engine.totalValves)} />}
                  {data.engine.fuelType     && <Stat label="Fuel Type"     value={data.engine.fuelType} />}
                  {data.engine.compressorType && <Stat label="Aspiration"  value={data.engine.compressorType === "NA" ? "Naturally Aspirated" : data.engine.compressorType} />}
                  {data.engine.compressionRatio && <Stat label="Compression" value={`${data.engine.compressionRatio}:1`} />}
                  {data.engine.manufacturerEngineCode && <Stat label="Engine Code" value={data.engine.manufacturerEngineCode} />}
                  {data.engine.valve && <><Stat label="Valve Timing" value={data.engine.valve.timing} /><Stat label="Valve Gear" value={data.engine.valve.gear} /></>}
                </div>
              </Card>
            )}

            {/* Transmission */}
            {data.transmission && (
              <Card icon={Cog} title="Transmission & Drivetrain" accent="bg-cyan-50 text-cyan-600">
                <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8">
                  <Stat label="Type"          value={data.transmission.transmissionType} />
                  <Stat label="Speeds"        value={`${data.transmission.numberOfSpeeds}-Speed`} />
                  {data.drivenWheels && <Stat label="Driven Wheels" value={data.drivenWheels} />}
                  {data.transmission.name    && <Stat label="Code"  value={data.transmission.name} />}
                  {data.numOfDoors && <Stat label="Doors" value={`${data.numOfDoors} Doors`} />}
                </div>
              </Card>
            )}

            {/* Fuel Economy */}
            {data.mpg && (
              <Card icon={Fuel} title="Fuel Economy" subtitle="EPA estimated fuel efficiency" accent="bg-green-50 text-green-600">
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {[
                    { label: "City",     val: data.mpg.city,    accent: "bg-primary/8 text-primary" },
                    { label: "Highway",  val: data.mpg.highway, accent: "bg-tertiary/10 text-tertiary" },
                    { label: "Combined", val: Math.round(data.mpg.city * 0.55 + data.mpg.highway * 0.45), accent: "bg-green-50 text-green-700" },
                  ].map(({ label, val, accent }) => (
                    <div key={label} className={`text-center p-3 sm:p-6 rounded-2xl ${accent.split(" ")[0]}`}>
                      <p className={`text-xs sm:text-sm font-semibold mb-1 sm:mb-2 ${accent.split(" ")[1]}`}>{label}</p>
                      <p className={`text-3xl sm:text-5xl font-headline font-black ${accent.split(" ")[1]}`}>{val}</p>
                      <p className="text-[10px] sm:text-xs text-on-surface-variant mt-1">MPG{label==="Combined"?" (est.)":""}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Vehicle Classification */}
            {data.categories && (
              <Card icon={Info} title="Vehicle Classification" accent="bg-indigo-50 text-indigo-600">
                <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8">
                  {data.categories.primaryBodyType && <Stat label="Body Type"    value={data.categories.primaryBodyType} />}
                  {data.categories.vehicleType     && <Stat label="Vehicle Type" value={data.categories.vehicleType} />}
                  {data.categories.vehicleStyle    && <Stat label="Style"        value={data.categories.vehicleStyle} />}
                  {data.categories.vehicleSize     && <Stat label="Size"         value={data.categories.vehicleSize} />}
                  {data.categories.market          && <Stat label="Segment"      value={data.categories.market} />}
                  {data.categories.epaClass        && <Stat label="EPA Class"    value={data.categories.epaClass} />}
                  {data.manufacturerCode           && <Stat label="Mfr Code"     value={data.manufacturerCode} />}
                  {data.squishVin                  && <Stat label="Squish VIN"   value={data.squishVin} />}
                </div>
              </Card>
            )}

            {/* Colors */}
            {data.colors && data.colors.length > 0 && (
              <Card icon={Palette} title="Available Colors" accent="bg-pink-50 text-pink-600">
                <div className="space-y-5">
                  {data.colors.map((c) => (
                    <div key={c.category}>
                      <p className="text-xs font-semibold text-outline uppercase tracking-widest mb-3">{c.category}</p>
                      <div className="flex flex-wrap gap-2">
                        {c.options.map((o) => (
                          <span key={o.name} className="px-4 py-2 bg-surface-container text-on-surface-variant text-sm rounded-xl font-medium hover:bg-surface-container-high transition-colors">
                            {o.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Options & Equipment — accordion */}
            {data.options && data.options.length > 0 && (
              <div className="bg-surface-container-lowest rounded-[2rem] shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-surface-container">
                  <h2 className="font-headline font-bold text-lg text-on-surface flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
                      <Settings className="w-5 h-5" />
                    </div>
                    Options &amp; Equipment
                  </h2>
                  <p className="text-sm text-on-surface-variant mt-1 ml-12">
                    {data.options.reduce((a, c) => a + c.options.length, 0)} options across {data.options.length} categories
                  </p>
                </div>
                <div>
                  {data.options.map((cat) => (
                    <div key={cat.category} className="border-b border-surface-container last:border-0">
                      <button onClick={() => toggleCategory(cat.category)}
                        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-surface-container-low transition cursor-pointer">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-on-surface">{cat.category}</span>
                          <span className="text-xs bg-primary/8 text-primary px-2.5 py-0.5 rounded-full font-bold">
                            {cat.options.length}
                          </span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-outline transition-transform duration-300 ${expandedCategories.has(cat.category) ? "rotate-180" : ""}`} />
                      </button>
                      {expandedCategories.has(cat.category) && (
                        <div className="px-4 sm:px-6 pb-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {cat.options.map((o) => (
                              <div key={o.name} className="flex items-start gap-2.5 p-3 bg-surface-container-low rounded-xl">
                                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-on-surface">{o.name}</p>
                                  {o.description && <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{o.description}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Check another VIN */}
            <div className="bg-primary-container rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 text-center relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--color-secondary-container)" }} />
              <h2 className="font-headline font-extrabold text-lg sm:text-xl text-white mb-2">Check Another Vehicle</h2>
              <p className="text-sm sm:text-base text-white/85 mb-5 sm:mb-6">Enter a different VIN to generate a new report</p>
              <div className="max-w-lg mx-auto">
                <VinSearchForm size="sm" />
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR (1/3) — scrolls naturally with the page ── */}
          <div className="space-y-6 lg:self-start">

            {/* Pricing sidebar card */}
            {data.price && (
              <div className="bg-surface-container-lowest rounded-[2rem] shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-surface-container">
                  <h3 className="font-headline font-bold text-on-surface flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" /> Valuation
                  </h3>
                </div>
                <div className="p-5 space-y-3">
                  {data.price.baseMsrp > 0 && (
                    <div className="flex justify-between items-center p-3 bg-primary/8 rounded-xl">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">Base MSRP</span>
                      <span className="font-headline font-black text-primary">${data.price.baseMsrp.toLocaleString()}</span>
                    </div>
                  )}
                  {data.price.usedTmvRetail > 0 && (
                    <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
                      <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Used Retail</span>
                      <span className="font-headline font-black text-on-surface">${data.price.usedTmvRetail.toLocaleString()}</span>
                    </div>
                  )}
                  {data.price.usedTradeIn > 0 && (
                    <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
                      <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Trade-In</span>
                      <span className="font-headline font-black text-on-surface">${data.price.usedTradeIn.toLocaleString()}</span>
                    </div>
                  )}
                  {data.price.usedPrivateParty > 0 && (
                    <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
                      <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Private Party</span>
                      <span className="font-headline font-black text-on-surface">${data.price.usedPrivateParty.toLocaleString()}</span>
                    </div>
                  )}
                  {data.price.baseInvoice > 0 && (
                    <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
                      <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Invoice</span>
                      <span className="font-headline font-black text-on-surface">${data.price.baseInvoice.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Market analysis sidebar */}
            {data.marketData && (
              <div className="bg-surface-container-lowest rounded-[2rem] shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-surface-container">
                  <h3 className="font-headline font-bold text-on-surface flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" /> Market Analysis
                  </h3>
                  <p className="text-xs text-outline mt-0.5">{data.marketData.totalListings} active listings</p>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="text-center p-3 bg-green-50 rounded-xl">
                      <TrendingDown className="w-4 h-4 text-green-600 mx-auto mb-1" />
                      <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Low</p>
                      <p className="font-headline font-black text-sm text-green-700">${data.marketData.lowestPrice.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-primary/8 rounded-xl">
                      <BarChart3 className="w-4 h-4 text-primary mx-auto mb-1" />
                      <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Avg</p>
                      <p className="font-headline font-black text-sm text-primary">${data.marketData.averagePrice.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-xl">
                      <TrendingUp className="w-4 h-4 text-red-500 mx-auto mb-1" />
                      <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">High</p>
                      <p className="font-headline font-black text-sm text-red-600">${data.marketData.highestPrice.toLocaleString()}</p>
                    </div>
                  </div>

                  {data.marketData.averageMileage > 0 && (
                    <div className="flex justify-between items-center py-3 border-t border-surface-container">
                      <span className="text-xs text-outline font-semibold uppercase tracking-wider">Avg. Mileage</span>
                      <span className="font-bold text-on-surface">{data.marketData.averageMileage.toLocaleString()} mi</span>
                    </div>
                  )}

                  {/* Similar listings */}
                  {data.marketData.sampleListings.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-black text-outline uppercase tracking-widest mb-3">Similar Listings</p>
                      <div className="space-y-3">
                        {data.marketData.sampleListings.slice(0, 4).map((l) => (
                          <div key={l.id} className="flex gap-3 p-3 bg-surface-container-low rounded-2xl hover:shadow-sm transition-all">
                            {l.primaryPhotoUrl && (
                              <div className="relative w-16 h-12 flex-shrink-0 rounded-xl overflow-hidden">
                                <div className="absolute inset-0" style={{ transform: "scale(1.18)" }}>
                                  <Image src={l.primaryPhotoUrl} alt={`${l.year} ${l.make} ${l.model}`} fill className="object-cover" sizes="64px" />
                                </div>
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-on-surface truncate">{l.year} {l.trim || l.model}</p>
                              <p className="font-headline font-black text-sm text-primary">{l.price}</p>
                              <p className="text-[10px] text-outline">{l.mileage}{l.city && l.state ? ` · ${l.city}, ${l.state}` : ""}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick report summary sidebar */}
            <div className="bg-surface-container-lowest rounded-[2rem] shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-surface-container">
                <h3 className="font-headline font-bold text-on-surface flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-secondary-container" style={{ color: "var(--color-secondary-container)" }} /> Report Summary
                </h3>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { label: "VIN Verified",       ok: true },
                  { label: "Specs Decoded",       ok: true },
                  { label: "Photos Retrieved",    ok: (data.photos?.length ?? 0) > 0 },
                  { label: "Market Data",         ok: !!data.marketData },
                  { label: "Pricing Data",        ok: !!data.price },
                  { label: "Listed for Sale",     ok: !!data.listing },
                ].map(({ label, ok }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-sm text-on-surface-variant">{label}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ok ? "bg-green-50 text-green-700" : "bg-surface-container text-outline"}`}>
                      {ok ? "✓ Found" : "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI-powered report sections (Concierge, Risk Insights, Storyteller) */}
            <VinReportAI data={data} fullName={fullName} />

          </div>{/* end sidebar */}
        </div>{/* end grid */}
      </div>{/* end body */}
    </div>
  );
}
