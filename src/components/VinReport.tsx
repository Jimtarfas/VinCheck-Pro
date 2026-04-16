"use client";

import {
  Car, Gauge, Settings, Fuel, Cog, DoorOpen, Check, Shield, ChevronDown,
  ChevronLeft, ChevronRight, Printer, Share2, ArrowLeft, DollarSign,
  TrendingUp, TrendingDown, BarChart3, MapPin, Calendar, Palette, Tag,
  Zap, Award, Info, Activity, Download,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import type { VinData } from "@/lib/api";
import VinSearchForm from "./VinSearchForm";

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
    const year = data.years?.[0]?.year;
    const makeName = data.make?.name || "Unknown";
    const modelName = data.model?.name || "Unknown";
    const trim = data.years?.[0]?.styles?.[0]?.trim;
    const fullName = [year, makeName, modelName, trim].filter(Boolean).join(" ");
    const styleName = data.years?.[0]?.styles?.[0]?.name || "";

    // Fetch all images via server-side API (bypasses CORS)
    const photoUrls = data.photos?.slice(0, 9) || [];
    const listingPhotoUrls = data.marketData?.sampleListings
      ?.filter((l) => l.primaryPhotoUrl)
      .slice(0, 6)
      .map((l) => l.primaryPhotoUrl!) || [];
    const allUrls = [...photoUrls, ...listingPhotoUrls];
    const allBase64 = await fetchBase64Images(allUrls);
    const base64Photos = allBase64.slice(0, photoUrls.length);
    const base64ListingPhotos = allBase64.slice(photoUrls.length);

    const rows = (items: [string, string | undefined][]) =>
      items
        .filter(([, v]) => v)
        .map(([k, v]) => `<tr><td style="padding:8px 16px;font-weight:600;color:#334155;border-bottom:1px solid #e2e8f0;width:180px">${k}</td><td style="padding:8px 16px;color:#475569;border-bottom:1px solid #e2e8f0">${v}</td></tr>`)
        .join("");

    const sectionHtml = (title: string, content: string) =>
      `<div style="margin-bottom:24px"><h2 style="font-size:16px;font-weight:700;color:#1e293b;margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid #4f46e5">${title}</h2>${content}</div>`;

    const tableWrap = (inner: string) =>
      `<table style="width:100%;border-collapse:collapse;font-size:13px">${inner}</table>`;

    let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${fullName} - VIN Report</title>
<style>@media print{body{margin:0}@page{margin:0.5in}}.page{max-width:800px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#334155;padding:40px}
.header{background:linear-gradient(135deg,#4338ca,#4f46e5);color:white;padding:32px;border-radius:12px;margin-bottom:32px}
.header h1{margin:0 0 4px;font-size:24px}.header p{margin:4px 0;opacity:0.85;font-size:13px}
.badge{display:inline-block;background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600;margin-bottom:12px}
table{width:100%;border-collapse:collapse}td{padding:8px 16px;border-bottom:1px solid #e2e8f0;font-size:13px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px}
.card-label{font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px}.card-value{font-size:20px;font-weight:700;color:#1e293b}
.photos-main{width:100%;max-height:400px;object-fit:cover;border-radius:10px;margin-bottom:12px}
.photos-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:8px}
.photos-grid img{width:100%;height:120px;object-fit:cover;border-radius:6px;border:1px solid #e2e8f0}
.footer{text-align:center;padding:24px;border-top:1px solid #e2e8f0;margin-top:32px;font-size:11px;color:#94a3b8}
</style></head><body><div class="page">`;

    // Header
    html += `<div class="header">
      <div class="badge">VINCheck Pro Report</div>
      <h1>${fullName}</h1>
      ${styleName ? `<p>${styleName}</p>` : ""}
      <p style="font-family:monospace;letter-spacing:1px">VIN: ${data.vin}</p>
      <p style="font-size:11px;opacity:0.7">Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
    </div>`;

    // Vehicle Photos (using base64)
    const validPhotos = base64Photos.filter(Boolean);
    if (validPhotos.length > 0) {
      const mainPhoto = validPhotos[0];
      const thumbPhotos = validPhotos.slice(1);
      html += `<div style="margin-bottom:24px">
        <h2 style="font-size:16px;font-weight:700;color:#1e293b;margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid #4f46e5">Vehicle Photos (${data.photos?.length || validPhotos.length})</h2>
        <img src="${mainPhoto}" alt="${fullName}" class="photos-main" />
        ${thumbPhotos.length > 0 ? `<div class="photos-grid">${thumbPhotos.map((p, i) => `<img src="${p}" alt="Photo ${i + 2}" />`).join("")}</div>` : ""}
        ${(data.photos?.length || 0) > 9 ? `<p style="text-align:center;font-size:12px;color:#94a3b8;margin:8px 0 0">+ ${(data.photos?.length || 0) - 9} more photos available online</p>` : ""}
      </div>`;
    }

    // Vehicle Overview
    const overviewItems: [string, string | undefined][] = [
      ["Year", year ? String(year) : undefined],
      ["Make", makeName],
      ["Model", modelName],
      ["Trim", trim],
      ["Body Type", data.categories?.primaryBodyType],
      ["Vehicle Type", data.categories?.vehicleType],
      ["Doors", data.numOfDoors ? `${data.numOfDoors} Doors` : undefined],
      ["Drivetrain", data.drivenWheels],
      ["Vehicle Size", data.categories?.vehicleSize],
      ["EPA Class", data.categories?.epaClass],
      ["Market Segment", data.categories?.market],
      ["Manufacturer Code", data.manufacturerCode],
    ];
    html += sectionHtml("Vehicle Overview", tableWrap(rows(overviewItems)));

    // Pricing
    if (data.price) {
      const priceItems: [string, string | undefined][] = [
        ["Base MSRP", data.price.baseMsrp > 0 ? `$${data.price.baseMsrp.toLocaleString()}` : undefined],
        ["Invoice Price", data.price.baseInvoice > 0 ? `$${data.price.baseInvoice.toLocaleString()}` : undefined],
        ["Used Retail", data.price.usedTmvRetail > 0 ? `$${data.price.usedTmvRetail.toLocaleString()}` : undefined],
        ["Trade-In Value", data.price.usedTradeIn > 0 ? `$${data.price.usedTradeIn.toLocaleString()}` : undefined],
        ["Private Party", data.price.usedPrivateParty > 0 ? `$${data.price.usedPrivateParty.toLocaleString()}` : undefined],
      ];
      html += sectionHtml("Pricing & Valuation", tableWrap(rows(priceItems)));
    }

    // Market Data
    if (data.marketData) {
      let marketContent = `<div class="grid">
          <div class="card"><div class="card-label">Average Price</div><div class="card-value">$${data.marketData.averagePrice.toLocaleString()}</div></div>
          <div class="card"><div class="card-label">Price Range</div><div class="card-value">$${data.marketData.lowestPrice.toLocaleString()} — $${data.marketData.highestPrice.toLocaleString()}</div></div>
          <div class="card"><div class="card-label">Active Listings</div><div class="card-value">${data.marketData.totalListings}</div></div>
          ${data.marketData.averageMileage > 0 ? `<div class="card"><div class="card-label">Avg. Mileage</div><div class="card-value">${data.marketData.averageMileage.toLocaleString()} mi</div></div>` : ""}
        </div>`;
      if (data.marketData.sampleListings.length > 0) {
        let listingPhotoIdx = 0;
        marketContent += `<h3 style="font-size:13px;font-weight:700;color:#475569;margin:20px 0 10px;text-transform:uppercase;letter-spacing:0.5px">Similar Vehicles</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
          ${data.marketData.sampleListings.slice(0, 6).map((l) => {
            const b64 = l.primaryPhotoUrl ? base64ListingPhotos[listingPhotoIdx++] : "";
            return `<div style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;font-size:12px">
            ${b64 ? `<img src="${b64}" alt="${l.year} ${l.make} ${l.model}" style="width:100%;height:100px;object-fit:cover" />` : ""}
            <div style="padding:8px">
              <div style="font-weight:700;color:#1e293b">${l.year} ${l.trim || l.model}</div>
              <div style="color:#4f46e5;font-weight:700;font-size:14px">${l.price}</div>
              <div style="color:#94a3b8">${l.mileage}${l.city && l.state ? ` · ${l.city}, ${l.state}` : ""}</div>
            </div>
          </div>`;
          }).join("")}
        </div>`;
      }
      html += sectionHtml("Market Analysis", marketContent);
    }

    // Engine
    if (data.engine) {
      const engineItems: [string, string | undefined][] = [
        ["Configuration", data.engine.cylinder ? `${data.engine.cylinder}-Cylinder ${data.engine.configuration}` : undefined],
        ["Displacement", data.engine.displacement ? `${data.engine.displacement} cc (${data.engine.size}L)` : undefined],
        ["Horsepower", data.engine.horsepower ? `${data.engine.horsepower} HP` : undefined],
        ["Torque", data.engine.torque ? `${data.engine.torque} lb-ft` : undefined],
        ["Fuel Type", data.engine.fuelType],
        ["Aspiration", data.engine.compressorType === "NA" ? "Naturally Aspirated" : data.engine.compressorType],
        ["Total Valves", data.engine.totalValves ? String(data.engine.totalValves) : undefined],
        ["Engine Code", data.engine.manufacturerEngineCode || undefined],
      ];
      html += sectionHtml("Engine & Performance", tableWrap(rows(engineItems)));
    }

    // Transmission
    if (data.transmission) {
      const transItems: [string, string | undefined][] = [
        ["Type", data.transmission.transmissionType],
        ["Speeds", `${data.transmission.numberOfSpeeds}-Speed`],
        ["Driven Wheels", data.drivenWheels],
      ];
      html += sectionHtml("Transmission & Drivetrain", tableWrap(rows(transItems)));
    }

    // Fuel Economy
    if (data.mpg) {
      html += sectionHtml("Fuel Economy", `
        <div class="grid">
          <div class="card"><div class="card-label">City</div><div class="card-value">${data.mpg.city} MPG</div></div>
          <div class="card"><div class="card-label">Highway</div><div class="card-value">${data.mpg.highway} MPG</div></div>
        </div>
      `);
    }

    // Colors
    if (data.colors && data.colors.length > 0) {
      const colorContent = data.colors.map((c) =>
        `<p style="margin:0 0 4px"><strong>${c.category}:</strong> ${c.options.map((o) => o.name).join(", ")}</p>`
      ).join("");
      html += sectionHtml("Available Colors", colorContent);
    }

    // Options
    if (data.options && data.options.length > 0) {
      const optContent = data.options.map((cat) =>
        `<div style="margin-bottom:16px"><h3 style="font-size:13px;font-weight:700;color:#475569;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.5px">${cat.category} (${cat.options.length})</h3>
        <div style="display:flex;flex-wrap:wrap;gap:6px">${cat.options.map((o) => `<span style="display:inline-block;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:6px;padding:4px 10px;font-size:12px;color:#475569">${o.name}</span>`).join("")}</div></div>`
      ).join("");
      html += sectionHtml(`Options & Equipment (${data.options.reduce((a, c) => a + c.options.length, 0)} items)`, optContent);
    }

    // Listing info
    if (data.listing) {
      const listItems: [string, string | undefined][] = [
        ["Asking Price", data.listing.price],
        ["Mileage", data.listing.mileage],
        ["Color", data.listing.displayColor],
        ["Condition", data.listing.condition],
        ["Dealer", data.listing.dealerName],
        ["Location", data.listing.city && data.listing.state ? `${data.listing.city}, ${data.listing.state}` : undefined],
      ];
      html += sectionHtml("Current Listing", tableWrap(rows(listItems)));
    }

    html += `<div class="footer">
      <p>Generated by VINCheck Pro &mdash; carcheckervin.com</p>
      <p>This report is for informational purposes only. Always verify vehicle details with official records.</p>
    </div></div></body></html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => printWindow.print(), 300);
        URL.revokeObjectURL(url);
      };
    }
    setLoading(false);
  }, [data]);

  return { download, loading };
}

/* ─── Photo Gallery ─── */
function PhotoGallery({ photos, alt, listingInfo }: {
  photos: string[]; alt: string;
  listingInfo?: { price?: string; mileage?: string; city?: string; state?: string; dealerName?: string; displayColor?: string };
}) {
  const [current, setCurrent] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="flex flex-col items-center justify-center py-20 px-6 bg-slate-50">
          <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <Car className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-1">No Photos Available</h3>
          <p className="text-sm text-slate-500 text-center max-w-md">
            This vehicle is not currently listed for sale, so no real photos are available.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-bold text-slate-900">Vehicle Photos</span>
          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-100">
            This Vehicle
          </span>
        </div>
        {listingInfo?.price && (
          <div className="flex items-center gap-3 text-sm">
            <span className="font-bold text-primary-600">{listingInfo.price}</span>
            {listingInfo.mileage && <span className="text-slate-500">{listingInfo.mileage}</span>}
            {listingInfo.city && listingInfo.state && (
              <span className="text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{listingInfo.city}, {listingInfo.state}</span>
            )}
          </div>
        )}
      </div>
      <div className="relative aspect-[16/9] bg-slate-100">
        <Image src={photos[current]} alt={`${alt} - Photo ${current + 1}`} fill className="object-contain" sizes="(max-width: 768px) 100vw, 900px" priority={current === 0} />
        {photos.length > 1 && (
          <>
            <button onClick={() => setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1))} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-xl flex items-center justify-center text-slate-700 shadow-md transition cursor-pointer backdrop-blur-sm">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1))} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-xl flex items-center justify-center text-slate-700 shadow-md transition cursor-pointer backdrop-blur-sm">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white/90 backdrop-blur rounded-full text-xs text-slate-700 font-medium shadow-sm">
              {current + 1} / {photos.length}
            </div>
          </>
        )}
      </div>
      {photos.length > 1 && (
        <div className="flex gap-1.5 p-2 overflow-x-auto bg-slate-50">
          {photos.slice(0, 12).map((photo, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`relative w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${i === current ? "border-primary-500" : "border-transparent opacity-60 hover:opacity-100"}`}>
              <Image src={photo} alt={`Thumb ${i + 1}`} fill className="object-cover" sizes="80px" />
            </button>
          ))}
          {photos.length > 12 && (
            <div className="w-20 h-14 flex-shrink-0 rounded-lg bg-slate-100 flex items-center justify-center text-xs text-slate-500 font-medium">+{photos.length - 12}</div>
          )}
        </div>
      )}
    </section>
  );
}

/* ─── Info Card ─── */
function InfoCard({ icon: Icon, label, value, color = "bg-primary-50 text-primary-600" }: {
  icon: React.ComponentType<{ className?: string }>; label: string; value: string; color?: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
        <p className="font-semibold text-slate-900 truncate">{value}</p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div><p className="text-sm text-slate-500 mb-1">{label}</p><p className="font-semibold text-slate-900 capitalize">{value}</p></div>;
}

function Section({ icon: Icon, title, subtitle, color = "bg-primary-50 text-primary-600", children }: {
  icon: React.ComponentType<{ className?: string }>; title: string; subtitle?: string; color?: string; children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}><Icon className="w-4 h-4" /></div>
          {title}
        </h2>
        {subtitle && <p className="text-sm text-slate-500 mt-1 ml-11">{subtitle}</p>}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

/* ─── Main Report ─── */
export default function VinReport({ data }: { data: VinData }) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["Interior", "Exterior"]));
  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => { const next = new Set(prev); if (next.has(cat)) next.delete(cat); else next.add(cat); return next; });
  };
  const { download: downloadReport, loading: downloadLoading } = useDownloadReport(data);

  const year = data.years?.[0]?.year;
  const trim = data.years?.[0]?.styles?.[0]?.trim;
  const styleName = data.years?.[0]?.styles?.[0]?.name;
  const submodel = data.years?.[0]?.styles?.[0]?.submodel;
  const makeName = data.make?.name || "Unknown Make";
  const modelName = data.model?.name || "Unknown Model";
  const fullName = [year, makeName, modelName, trim].filter(Boolean).join(" ");

  return (
    <div className="bg-slate-50 min-h-screen pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-primary-200 hover:text-white mb-5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-200 text-xs font-bold rounded-full flex items-center gap-1"><Shield className="w-3 h-3" />Report Generated</span>
                {data.categories?.primaryBodyType && <span className="px-3 py-1 bg-white/10 text-primary-100 text-xs font-medium rounded-full">{data.categories.primaryBodyType}</span>}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold">{fullName}</h1>
              {styleName && <p className="mt-1 text-primary-200 text-sm">{styleName}</p>}
              <p className="mt-2 text-primary-300 font-mono text-sm tracking-wider">VIN: {data.vin}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={downloadReport} disabled={downloadLoading} className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl text-sm font-bold hover:bg-white/30 transition cursor-pointer disabled:opacity-60 disabled:cursor-wait"><Download className={`w-4 h-4 ${downloadLoading ? "animate-pulse" : ""}`} />{downloadLoading ? "Preparing..." : "Download Report"}</button>
              <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20 transition cursor-pointer"><Printer className="w-4 h-4" />Print</button>
              <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20 transition cursor-pointer"><Share2 className="w-4 h-4" />Share</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <PhotoGallery photos={data.photos || []} alt={fullName}
          listingInfo={data.listing ? { price: data.listing.price, mileage: data.listing.mileage, city: data.listing.city, state: data.listing.state, dealerName: data.listing.dealerName, displayColor: data.listing.displayColor } : undefined} />

        {data.listing && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3"><Shield className="w-5 h-5 text-emerald-600" /><h2 className="text-lg font-bold text-emerald-800">Currently Listed for Sale</h2></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><p className="text-xs text-emerald-600 font-medium">Asking Price</p><p className="text-2xl font-bold text-emerald-800">{data.listing.price}</p></div>
              <div><p className="text-xs text-emerald-600 font-medium">Mileage</p><p className="text-lg font-bold text-emerald-800">{data.listing.mileage}</p></div>
              {data.listing.displayColor && <div><p className="text-xs text-emerald-600 font-medium">Color</p><p className="text-lg font-bold text-emerald-800">{data.listing.displayColor}</p></div>}
              {data.listing.dealerName && <div><p className="text-xs text-emerald-600 font-medium">Dealer</p><p className="text-sm font-semibold text-emerald-800">{data.listing.dealerName}</p>
                {data.listing.city && data.listing.state && <p className="text-xs text-emerald-600 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{data.listing.city}, {data.listing.state}</p>}
              </div>}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {year && <InfoCard icon={Calendar} label="Year" value={String(year)} color="bg-blue-50 text-blue-600" />}
          <InfoCard icon={Car} label="Make" value={makeName} />
          <InfoCard icon={Car} label="Model" value={modelName} color="bg-indigo-50 text-indigo-600" />
          {trim && <InfoCard icon={Tag} label="Trim" value={trim} color="bg-violet-50 text-violet-600" />}
          {data.numOfDoors && <InfoCard icon={DoorOpen} label="Doors" value={`${data.numOfDoors} Doors`} color="bg-amber-50 text-amber-600" />}
          {data.drivenWheels && <InfoCard icon={Cog} label="Drivetrain" value={data.drivenWheels} color="bg-cyan-50 text-cyan-600" />}
          {data.transmission && <InfoCard icon={Settings} label="Transmission" value={`${data.transmission.numberOfSpeeds}-Speed ${data.transmission.transmissionType}`} color="bg-purple-50 text-purple-600" />}
          {data.engine?.fuelType && <InfoCard icon={Fuel} label="Fuel Type" value={data.engine.fuelType} color="bg-emerald-50 text-emerald-600" />}
          {data.mpg && <InfoCard icon={Gauge} label="Fuel Economy" value={`${data.mpg.city} City / ${data.mpg.highway} Hwy MPG`} color="bg-green-50 text-green-600" />}
          {data.categories?.vehicleSize && <InfoCard icon={Info} label="Vehicle Size" value={data.categories.vehicleSize} color="bg-amber-50 text-amber-600" />}
          {data.categories?.epaClass && <InfoCard icon={Award} label="EPA Class" value={data.categories.epaClass} color="bg-teal-50 text-teal-600" />}
          {submodel?.body && <InfoCard icon={Car} label="Body Style" value={submodel.body} color="bg-indigo-50 text-indigo-600" />}
        </div>

        {(data.price || data.marketData) && (
          <Section icon={DollarSign} title="Market Value & Pricing" subtitle="MSRP, trade-in values, and current market analysis" color="bg-emerald-50 text-emerald-600">
            {data.price && (
              <div className="mb-8">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Official Valuation</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {data.price.baseMsrp > 0 && <div className="p-4 bg-primary-50 rounded-xl border border-primary-100"><p className="text-xs text-primary-600 font-medium">Base MSRP</p><p className="text-2xl font-bold text-primary-800">${data.price.baseMsrp.toLocaleString()}</p></div>}
                  {data.price.baseInvoice > 0 && <div className="p-4 bg-slate-50 rounded-xl border border-slate-200"><p className="text-xs text-slate-500 font-medium">Invoice Price</p><p className="text-2xl font-bold text-slate-800">${data.price.baseInvoice.toLocaleString()}</p></div>}
                  {data.price.usedTmvRetail > 0 && <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100"><p className="text-xs text-emerald-600 font-medium">Used Retail</p><p className="text-2xl font-bold text-emerald-700">${data.price.usedTmvRetail.toLocaleString()}</p></div>}
                  {data.price.usedTradeIn > 0 && <div className="p-4 bg-amber-50 rounded-xl border border-amber-100"><p className="text-xs text-amber-600 font-medium">Trade-In</p><p className="text-2xl font-bold text-amber-700">${data.price.usedTradeIn.toLocaleString()}</p></div>}
                  {data.price.usedPrivateParty > 0 && <div className="p-4 bg-violet-50 rounded-xl border border-violet-100"><p className="text-xs text-violet-600 font-medium">Private Party</p><p className="text-2xl font-bold text-violet-700">${data.price.usedPrivateParty.toLocaleString()}</p></div>}
                  {data.price.deliveryCharges > 0 && <div className="p-4 bg-slate-50 rounded-xl border border-slate-200"><p className="text-xs text-slate-500 font-medium">Delivery</p><p className="text-2xl font-bold text-slate-700">${data.price.deliveryCharges.toLocaleString()}</p></div>}
                </div>
              </div>
            )}
            {data.marketData && (
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Market ({data.marketData.totalListings} listings)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center"><BarChart3 className="w-5 h-5 text-blue-600 mx-auto mb-1" /><p className="text-xs text-blue-600 font-medium">Average</p><p className="text-xl font-bold text-blue-800">${data.marketData.averagePrice.toLocaleString()}</p></div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center"><TrendingDown className="w-5 h-5 text-green-600 mx-auto mb-1" /><p className="text-xs text-green-600 font-medium">Lowest</p><p className="text-xl font-bold text-green-800">${data.marketData.lowestPrice.toLocaleString()}</p></div>
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-center"><TrendingUp className="w-5 h-5 text-red-600 mx-auto mb-1" /><p className="text-xs text-red-600 font-medium">Highest</p><p className="text-xl font-bold text-red-800">${data.marketData.highestPrice.toLocaleString()}</p></div>
                  {data.marketData.averageMileage > 0 && <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center"><Activity className="w-5 h-5 text-slate-600 mx-auto mb-1" /><p className="text-xs text-slate-500 font-medium">Avg. Mileage</p><p className="text-xl font-bold text-slate-800">{data.marketData.averageMileage.toLocaleString()} mi</p></div>}
                </div>
                {data.marketData.sampleListings.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Similar Vehicles</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {data.marketData.sampleListings.map((l) => (
                        <div key={l.id} className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-sm transition-all">
                          {l.primaryPhotoUrl && <div className="relative w-24 h-18 flex-shrink-0 rounded-lg overflow-hidden"><Image src={l.primaryPhotoUrl} alt={`${l.year} ${l.make} ${l.model}`} fill className="object-cover" sizes="96px" /></div>}
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-slate-900 truncate">{l.year} {l.trim || l.model}</p>
                            <p className="text-lg font-bold text-primary-600">{l.price}</p>
                            <p className="text-xs text-slate-500">{l.mileage}</p>
                            {l.city && l.state && <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{l.city}, {l.state}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Section>
        )}

        {data.mpg && (
          <Section icon={Fuel} title="Fuel Economy" subtitle="EPA estimated fuel efficiency" color="bg-green-50 text-green-600">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-6 bg-emerald-50 rounded-xl border border-emerald-100"><p className="text-sm text-emerald-600 font-medium mb-2">City</p><p className="text-5xl font-extrabold text-emerald-700">{data.mpg.city}</p><p className="text-sm text-emerald-500 mt-1">MPG</p></div>
              <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100"><p className="text-sm text-blue-600 font-medium mb-2">Highway</p><p className="text-5xl font-extrabold text-blue-700">{data.mpg.highway}</p><p className="text-sm text-blue-500 mt-1">MPG</p></div>
              <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-100"><p className="text-sm text-purple-600 font-medium mb-2">Combined</p><p className="text-5xl font-extrabold text-purple-700">{Math.round((data.mpg.city * 0.55 + data.mpg.highway * 0.45))}</p><p className="text-sm text-purple-500 mt-1">MPG (est.)</p></div>
            </div>
          </Section>
        )}

        {data.engine && (
          <Section icon={Zap} title="Engine & Performance" subtitle="Complete powertrain specifications" color="bg-amber-50 text-amber-600">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.engine.cylinder && <Stat label="Configuration" value={`${data.engine.cylinder}-Cyl ${data.engine.configuration}`} />}
              {data.engine.displacement && <Stat label="Displacement" value={`${data.engine.displacement} cc (${data.engine.size}L)`} />}
              {data.engine.horsepower && <Stat label="Horsepower" value={`${data.engine.horsepower} HP${data.engine.rpm?.horsepower ? ` @ ${data.engine.rpm.horsepower} RPM` : ""}`} />}
              {data.engine.torque && <Stat label="Torque" value={`${data.engine.torque} lb-ft${data.engine.rpm?.torque ? ` @ ${data.engine.rpm.torque} RPM` : ""}`} />}
              {data.engine.totalValves && <Stat label="Valves" value={String(data.engine.totalValves)} />}
              {data.engine.fuelType && <Stat label="Fuel Type" value={data.engine.fuelType} />}
              {data.engine.compressorType && <Stat label="Aspiration" value={data.engine.compressorType === "NA" ? "Naturally Aspirated" : data.engine.compressorType} />}
              {data.engine.compressionRatio && <Stat label="Compression" value={`${data.engine.compressionRatio}:1`} />}
              {data.engine.manufacturerEngineCode && <Stat label="Engine Code" value={data.engine.manufacturerEngineCode} />}
              {data.engine.code && <Stat label="Engine ID" value={data.engine.code} />}
              {data.engine.valve && <><Stat label="Valve Timing" value={data.engine.valve.timing} /><Stat label="Valve Gear" value={data.engine.valve.gear} /></>}
            </div>
          </Section>
        )}

        {data.transmission && (
          <Section icon={Cog} title="Transmission & Drivetrain" color="bg-cyan-50 text-cyan-600">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <Stat label="Type" value={data.transmission.transmissionType} />
              <Stat label="Speeds" value={`${data.transmission.numberOfSpeeds}-Speed`} />
              {data.drivenWheels && <Stat label="Driven Wheels" value={data.drivenWheels} />}
              {data.transmission.name && <Stat label="Code" value={data.transmission.name} />}
              {data.numOfDoors && <Stat label="Doors" value={`${data.numOfDoors} Doors`} />}
            </div>
          </Section>
        )}

        {data.categories && (
          <Section icon={Info} title="Vehicle Classification" color="bg-indigo-50 text-indigo-600">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {data.categories.primaryBodyType && <Stat label="Body Type" value={data.categories.primaryBodyType} />}
              {data.categories.vehicleType && <Stat label="Vehicle Type" value={data.categories.vehicleType} />}
              {data.categories.vehicleStyle && <Stat label="Style" value={data.categories.vehicleStyle} />}
              {data.categories.vehicleSize && <Stat label="Size" value={data.categories.vehicleSize} />}
              {data.categories.market && <Stat label="Segment" value={data.categories.market} />}
              {data.categories.epaClass && <Stat label="EPA Class" value={data.categories.epaClass} />}
              {data.manufacturerCode && <Stat label="Mfr Code" value={data.manufacturerCode} />}
              {data.squishVin && <Stat label="Squish VIN" value={data.squishVin} />}
            </div>
          </Section>
        )}

        {data.colors && data.colors.length > 0 && (
          <Section icon={Palette} title="Available Colors" color="bg-pink-50 text-pink-600">
            <div className="space-y-5">
              {data.colors.map((c) => (
                <div key={c.category}>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">{c.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {c.options.map((o) => <span key={o.name} className="px-4 py-2 bg-slate-50 text-slate-700 text-sm rounded-xl border border-slate-200 font-medium hover:bg-slate-100 transition-colors">{o.name}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {data.options && data.options.length > 0 && (
          <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center"><Settings className="w-4 h-4" /></div>
                Options & Equipment
              </h2>
              <p className="text-sm text-slate-500 mt-1 ml-11">{data.options.reduce((a, c) => a + c.options.length, 0)} options across {data.options.length} categories</p>
            </div>
            <div className="divide-y divide-slate-100">
              {data.options.map((cat) => (
                <div key={cat.category}>
                  <button onClick={() => toggleCategory(cat.category)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-slate-900">{cat.category}</span>
                      <span className="text-xs bg-primary-50 text-primary-700 px-2.5 py-0.5 rounded-full font-medium">{cat.options.length}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedCategories.has(cat.category) ? "rotate-180" : ""}`} />
                  </button>
                  {expandedCategories.has(cat.category) && (
                    <div className="px-6 pb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {cat.options.map((o) => (
                          <div key={o.name} className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl">
                            <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-slate-900">{o.name}</p>
                              {o.description && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{o.description}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Check Another Vehicle</h2>
          <p className="text-slate-500 mb-6">Enter a different VIN to generate a new report</p>
          <VinSearchForm size="sm" />
        </section>
      </div>
    </div>
  );
}
