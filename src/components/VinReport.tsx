"use client";

import {
  Car, Gauge, Settings, Fuel, Cog, DoorOpen, Check, Shield, ChevronDown,
  ChevronLeft, ChevronRight, Printer, Share2, ArrowLeft, DollarSign,
  TrendingUp, TrendingDown, BarChart3, MapPin, Calendar, Palette, Tag,
  Zap, Award, Info, Download, AlertTriangle, Lock, CircleAlert,
} from "lucide-react";
import Image from "next/image";
import Link from "@/components/LocaleLink";
import { useState, useCallback, useEffect } from "react";
import type { VinData } from "@/lib/api";
import type { Locale } from "@/i18n/config";
import VinSearchForm from "./VinSearchForm";
import BrandLogo from "./BrandLogo";
import { scrollToBundle } from "@/lib/scroll-to-bundle";
import dynamic from "next/dynamic";

/**
 * VIN-specific signals pulled from the ClearVin preview, surfaced inside the
 * upsell modal so a buyer sees what's actually on *this* vehicle's record
 * (open recalls, auction sales, damage, photos) before they pay — real
 * urgency instead of a generic feature list. All counts are plain numbers so
 * the object stays serializable across the server → client boundary.
 */
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
function PhotoGallery({
  photos,
  photoSource,
  alt,
  year,
  make,
  model,
  lockedPhotoCount,
  footer,
  mainImageClassName,
  c,
}: {
  photos: string[];
  photoSource?: VinData["photoSource"];
  alt: string;
  year?: number;
  make?: string;
  model?: string;
  lockedPhotoCount?: number;
  footer?: React.ReactNode;
  mainImageClassName?: string;
  c: (typeof COPY)[Locale];
}) {
  const [current, setCurrent] = useState(0);

  // Preview mode: only one real photo on file, but `lockedPhotoCount` more
  // exist behind the paywall. We tease them as blurred, locked thumbnails
  // derived from the single hero image.
  const lockedMode = (lockedPhotoCount ?? 0) > 1 && photos.length <= 1;

  if (!photos || photos.length === 0) {
    const label = [year, make, model].filter(Boolean).join(" ");
    return (
      <div className="bg-surface-container-lowest rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-sm">
        <div className="flex flex-col items-center justify-center py-20 bg-surface-container-low">
          <div className="w-20 h-20 rounded-2xl bg-surface-container flex items-center justify-center mb-4">
            <Car className="w-10 h-10 text-outline/40" />
          </div>
          <h3 className="font-headline font-bold text-on-surface mb-1">{c.noPhotos}</h3>
          <p className="text-sm text-on-surface-variant text-center max-w-sm">
            {c.noPhotosBodyPre}{label ? ` ${label}` : ""} {c.noPhotosBodySuffix}
          </p>
        </div>
        {footer}
      </div>
    );
  }

  // When the gallery is showing real photos of the same year/make/model
  // (rather than this exact VIN), the photo-count badge labels them "Similar".
  const isSimilar = photoSource === "similar" || photoSource === "web";

  return (
    <div className="bg-surface-container-lowest rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-sm">
      {/* Main photo — 3:2 on mobile matches real car-photo dimensions so the whole
          vehicle stays visible (2:1 was cropping off the roof and wheels), 16:9 on desktop */}
      <div className="relative aspect-[3/2] sm:aspect-[16/9] bg-surface-container overflow-hidden">
        <div className="absolute inset-0">
          <Image src={photos[current]} alt={`${alt} - Photo ${current + 1}`} fill className={`object-cover${mainImageClassName ? ` ${mainImageClassName}` : ""}`} sizes="(max-width:768px) 100vw, 900px" quality={70} priority={current === 0} />
        </div>
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

        {/* Photo count badge */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-on-surface/70 backdrop-blur rounded-full text-[10px] sm:text-xs text-white font-bold">
          {lockedMode ? lockedPhotoCount : photos.length} {isSimilar ? c.similar : ""} {c.photos}
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

      {/* Preview: blurred, locked thumbnails teasing the photos behind the paywall */}
      {lockedMode && (
        <div className="flex gap-1.5 sm:gap-2 p-2 sm:p-3 overflow-x-auto bg-surface-container-low [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* first thumb = the one real photo */}
          <div className="relative w-14 h-10 sm:w-20 sm:h-14 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden ring-2 ring-primary">
            <div className="absolute inset-0" style={{ transform: "scale(1.08)" }}>
              <Image src={photos[0]} alt="Photo 1" fill className={`object-cover${mainImageClassName ? ` ${mainImageClassName}` : ""}`} sizes="80px" />
            </div>
          </div>
          {Array.from({ length: Math.min((lockedPhotoCount ?? 1) - 1, 8) }).map((_, i, arr) => {
            const remaining = (lockedPhotoCount ?? 1) - 1 - arr.length;
            const isLast = i === arr.length - 1 && remaining > 0;
            return (
              <button
                key={i}
                type="button"
                onClick={scrollToBundle}
                aria-label={c.unlockAllPhotosAria}
                className="relative w-14 h-10 sm:w-20 sm:h-14 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer"
              >
                <div
                  className="absolute inset-0"
                  style={{ transform: "scale(1.2)", filter: "blur(6px)" }}
                >
                  <Image src={photos[0]} alt="" aria-hidden fill className="object-cover" sizes="80px" />
                </div>
                <div className="absolute inset-0 bg-primary/45 hover:bg-primary/60 transition-colors flex items-center justify-center">
                  {isLast ? (
                    <span className="text-white font-headline font-black text-[10px] sm:text-xs">
                      +{remaining}
                    </span>
                  ) : (
                    <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white drop-shadow" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Thumbnails — smaller on mobile */}
      {!lockedMode && photos.length > 1 && (
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

      {/* Similar-photo disclaimer — only when the gallery is showing stock
          imagery of the same year/make/model rather than this exact VIN. */}
      {isSimilar && (
        <div className="flex items-center gap-2 px-3 sm:px-4 py-3 border-t border-surface-container text-xs sm:text-sm text-on-surface-variant">
          <CircleAlert className="w-4 h-4 flex-shrink-0 text-outline" />
          <span>{c.similarVehicleDisclaimer}</span>
        </div>
      )}

      {/* Optional footer rendered inside the gallery's rounded container so an
          attached panel (e.g. the vehicle-details strip) reads as one unit with
          the photo rather than a separate card below it. */}
      {footer}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Logo-only hero  (report A/B/C/D — "nophoto" / variant D)

   For vehicles with no photo on file, the "nophoto" bucket drops the image
   area entirely and presents a clean, premium manufacturer-logo card in its
   place — no generic "no photos available" placeholder. We're testing whether
   the vehicle photo is what drives conversion, so this variant must still look
   intentional and polished, not "broken / empty".
───────────────────────────────────────────────────────────── */
function LogoOnlyHero({
  make,
  model,
  year,
  footer,
}: {
  make?: string;
  model?: string;
  year?: number;
  footer?: React.ReactNode;
}) {
  const label = [year, make, model].filter(Boolean).join(" ");
  return (
    <div className="bg-surface-container-lowest rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-sm">
      <div className="relative flex flex-col items-center justify-center py-16 sm:py-24 px-6 bg-gradient-to-b from-surface-container-low to-surface-container-lowest">
        {/* thin brand accent so the card reads as a designed header, not a gap */}
        <div className="absolute inset-x-0 top-0 h-1" style={{ background: "var(--color-secondary-container)" }} />
        {make && (
          <div className="flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] bg-white shadow-sm ring-1 ring-outline-variant/40 mb-6">
            <BrandLogo make={make} className="w-24 h-24 sm:w-28 sm:h-28" />
          </div>
        )}
        {label && (
          <h2 className="font-headline font-extrabold text-lg sm:text-2xl text-on-surface text-center tracking-tight break-words">
            {label}
          </h2>
        )}
      </div>
      {footer}
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
   Localized copy — every visible string in the React JSX. The
   inline print()-generated HTML at the top of the file is a
   separate concern and stays English for now.
───────────────────────────────────────────────────────────── */
const COPY = {
  en: {
    backHome: "Back to Home",
    reportGenerated: "Report Generated",
    noPhotos: "No Photos Available",
    noPhotosBodyPre: "We couldn't locate photos for this VIN or any",
    noPhotosBodySuffix: "from our data sources.",
    similar: "Similar",
    photos: "Photos",
    similarVehicleDisclaimer: "Example image of a similar vehicle. The photo does not depict the inspected car.",
    unlockAllPhotosAria: "Unlock all photos in the full report",
    preparing: "Preparing…",
    downloadReport: "Download Report",
    print: "Print",
    share: "Share",
    linkCopied: "Link copied!",
    copyFailed: "Copy failed",
    currentlyListed: "Currently Listed for Sale",
    premium: "Premium",
    unlockListing: "Unlock listing details",
    includedInFullReport: "Included in full report",
    askingPrice: "Asking Price",
    mileage: "Mileage",
    color: "Color",
    dealer: "Dealer",
    year: "Year",
    make: "Make",
    model: "Model",
    trim: "Trim",
    doors: "Doors",
    doorsSuffix: "Doors",
    drivetrain: "Drivetrain",
    transmission: "Transmission",
    fuelType: "Fuel Type",
    fuelEconomy: "Fuel Economy",
    size: "Size",
    epaClass: "EPA Class",
    bodyStyle: "Body Style",
    engineAndPerformance: "Engine & Performance",
    engineSubtitle: "Complete powertrain specifications",
    configuration: "Configuration",
    displacement: "Displacement",
    horsepower: "Horsepower",
    torque: "Torque",
    valves: "Valves",
    aspiration: "Aspiration",
    naturallyAspirated: "Naturally Aspirated",
    compression: "Compression",
    engineCode: "Engine Code",
    valveTiming: "Valve Timing",
    valveGear: "Valve Gear",
    transmissionDrivetrain: "Transmission & Drivetrain",
    type: "Type",
    speeds: "Speeds",
    speedSuffix: "Speed",
    drivenWheels: "Driven Wheels",
    code: "Code",
    fuelEconomySubtitle: "EPA estimated fuel efficiency",
    city: "City",
    highway: "Highway",
    combined: "Combined",
    mpgEstSuffix: " (est.)",
    vehicleClassification: "Vehicle Classification",
    bodyType: "Body Type",
    vehicleType: "Vehicle Type",
    style: "Style",
    segment: "Segment",
    mfrCode: "Mfr Code",
    squishVin: "Squish VIN",
    availableColors: "Available Colors",
    optionsEquipment: "Options & Equipment",
    optionsSummary: (opts: number, cats: number) => `${opts} options across ${cats} categories`,
    checkAnother: "Check Another Vehicle",
    checkAnotherSub: "Enter a different VIN to generate a new report",
    valuation: "Valuation",
    baseMsrp: "Base MSRP",
    usedRetail: "Used Retail",
    tradeIn: "Trade-In",
    privateParty: "Private Party",
    invoice: "Invoice",
    marketAnalysis: "Market Analysis",
    activeListings: (n: number) => `${n} active listings`,
    low: "Low",
    avg: "Avg",
    high: "High",
    avgMileage: "Avg. Mileage",
    similarListings: "Similar Listings",
    reportSummary: "Report Summary",
    included: "Included",
    vinVerified: "VIN Verified",
    specsDecoded: "Specs Decoded",
    photosRetrieved: "Photos Retrieved",
    marketData: "Market Data",
    pricingData: "Pricing Data",
    listedForSale: "Listed for Sale",
    found: "Found",
    notFound: "—",
    loadingInsights: "Loading insights…",
  },
  es: {
    backHome: "Volver al inicio",
    reportGenerated: "Reporte generado",
    noPhotos: "Sin fotos disponibles",
    noPhotosBodyPre: "No pudimos localizar fotos para este VIN ni de ningún",
    noPhotosBodySuffix: "en nuestras fuentes de datos.",
    similar: "Similares",
    photos: "Fotos",
    similarVehicleDisclaimer: "Imagen de ejemplo de un vehículo similar. La foto no representa el auto inspeccionado.",
    unlockAllPhotosAria: "Desbloquea todas las fotos en el reporte completo",
    preparing: "Preparando…",
    downloadReport: "Descargar reporte",
    print: "Imprimir",
    share: "Compartir",
    linkCopied: "¡Enlace copiado!",
    copyFailed: "Error al copiar",
    currentlyListed: "Actualmente en venta",
    premium: "Premium",
    unlockListing: "Desbloquear detalles del anuncio",
    includedInFullReport: "Incluido en el reporte completo",
    askingPrice: "Precio solicitado",
    mileage: "Kilometraje",
    color: "Color",
    dealer: "Concesionario",
    year: "Año",
    make: "Marca",
    model: "Modelo",
    trim: "Versión",
    doors: "Puertas",
    doorsSuffix: "Puertas",
    drivetrain: "Tracción",
    transmission: "Transmisión",
    fuelType: "Combustible",
    fuelEconomy: "Consumo",
    size: "Tamaño",
    epaClass: "Clase EPA",
    bodyStyle: "Carrocería",
    engineAndPerformance: "Motor y rendimiento",
    engineSubtitle: "Especificaciones completas del tren motriz",
    configuration: "Configuración",
    displacement: "Cilindrada",
    horsepower: "Potencia",
    torque: "Par motor",
    valves: "Válvulas",
    aspiration: "Aspiración",
    naturallyAspirated: "Aspiración natural",
    compression: "Compresión",
    engineCode: "Código de motor",
    valveTiming: "Distribución de válvulas",
    valveGear: "Mecanismo de válvulas",
    transmissionDrivetrain: "Transmisión y tracción",
    type: "Tipo",
    speeds: "Velocidades",
    speedSuffix: "Velocidades",
    drivenWheels: "Ruedas motrices",
    code: "Código",
    fuelEconomySubtitle: "Eficiencia de combustible estimada por la EPA",
    city: "Ciudad",
    highway: "Carretera",
    combined: "Combinado",
    mpgEstSuffix: " (est.)",
    vehicleClassification: "Clasificación del vehículo",
    bodyType: "Tipo de carrocería",
    vehicleType: "Tipo de vehículo",
    style: "Estilo",
    segment: "Segmento",
    mfrCode: "Código del fabricante",
    squishVin: "VIN comprimido",
    availableColors: "Colores disponibles",
    optionsEquipment: "Opciones y equipamiento",
    optionsSummary: (opts: number, cats: number) => `${opts} opciones en ${cats} categorías`,
    checkAnother: "Verificar otro vehículo",
    checkAnotherSub: "Ingresa un VIN diferente para generar un nuevo reporte",
    valuation: "Valoración",
    baseMsrp: "PVP base",
    usedRetail: "Venta usado",
    tradeIn: "Permuta",
    privateParty: "Particular",
    invoice: "Factura",
    marketAnalysis: "Análisis de mercado",
    activeListings: (n: number) => `${n} anuncios activos`,
    low: "Bajo",
    avg: "Prom.",
    high: "Alto",
    avgMileage: "Kilometraje prom.",
    similarListings: "Anuncios similares",
    reportSummary: "Resumen del reporte",
    included: "Incluido",
    vinVerified: "VIN verificado",
    specsDecoded: "Especificaciones decodificadas",
    photosRetrieved: "Fotos obtenidas",
    marketData: "Datos de mercado",
    pricingData: "Datos de precios",
    listedForSale: "En venta",
    found: "Encontrado",
    notFound: "—",
    loadingInsights: "Cargando análisis…",
  },
  fr: {
    backHome: "Retour à l'accueil",
    reportGenerated: "Rapport généré",
    noPhotos: "Aucune photo disponible",
    noPhotosBodyPre: "Nous n'avons pas pu trouver de photos pour ce VIN ni d'aucun",
    noPhotosBodySuffix: "dans nos sources de données.",
    similar: "Similaires",
    photos: "Photos",
    similarVehicleDisclaimer: "Image d'exemple d'un véhicule similaire. La photo ne représente pas la voiture inspectée.",
    unlockAllPhotosAria: "Débloque toutes les photos dans le rapport complet",
    preparing: "Préparation…",
    downloadReport: "Télécharger le rapport",
    print: "Imprimer",
    share: "Partager",
    linkCopied: "Lien copié !",
    copyFailed: "Échec de la copie",
    currentlyListed: "Actuellement en vente",
    premium: "Premium",
    unlockListing: "Débloquer les détails de l'annonce",
    includedInFullReport: "Inclus dans le rapport complet",
    askingPrice: "Prix demandé",
    mileage: "Kilométrage",
    color: "Couleur",
    dealer: "Concessionnaire",
    year: "Année",
    make: "Marque",
    model: "Modèle",
    trim: "Finition",
    doors: "Portes",
    doorsSuffix: "portes",
    drivetrain: "Transmission",
    transmission: "Transmission",
    fuelType: "Carburant",
    fuelEconomy: "Consommation",
    size: "Taille",
    epaClass: "Classe EPA",
    bodyStyle: "Carrosserie",
    engineAndPerformance: "Moteur et performance",
    engineSubtitle: "Spécifications complètes du groupe motopropulseur",
    configuration: "Configuration",
    displacement: "Cylindrée",
    horsepower: "Puissance",
    torque: "Couple",
    valves: "Soupapes",
    aspiration: "Aspiration",
    naturallyAspirated: "Aspiration naturelle",
    compression: "Compression",
    engineCode: "Code moteur",
    valveTiming: "Distribution",
    valveGear: "Mécanisme de soupapes",
    transmissionDrivetrain: "Transmission et entraînement",
    type: "Type",
    speeds: "Vitesses",
    speedSuffix: "vitesses",
    drivenWheels: "Roues motrices",
    code: "Code",
    fuelEconomySubtitle: "Efficacité énergétique estimée par l'EPA",
    city: "Ville",
    highway: "Autoroute",
    combined: "Combiné",
    mpgEstSuffix: " (est.)",
    vehicleClassification: "Classification du véhicule",
    bodyType: "Type de carrosserie",
    vehicleType: "Type de véhicule",
    style: "Style",
    segment: "Segment",
    mfrCode: "Code constructeur",
    squishVin: "VIN compressé",
    availableColors: "Couleurs disponibles",
    optionsEquipment: "Options et équipements",
    optionsSummary: (opts: number, cats: number) => `${opts} options réparties sur ${cats} catégories`,
    checkAnother: "Vérifier un autre véhicule",
    checkAnotherSub: "Saisis un autre VIN pour générer un nouveau rapport",
    valuation: "Valorisation",
    baseMsrp: "PVC de base",
    usedRetail: "Détail occasion",
    tradeIn: "Reprise",
    privateParty: "Particulier",
    invoice: "Facture",
    marketAnalysis: "Analyse du marché",
    activeListings: (n: number) => `${n} annonces actives`,
    low: "Bas",
    avg: "Moy.",
    high: "Haut",
    avgMileage: "Kilométrage moy.",
    similarListings: "Annonces similaires",
    reportSummary: "Résumé du rapport",
    included: "Inclus",
    vinVerified: "VIN vérifié",
    specsDecoded: "Spécifications décodées",
    photosRetrieved: "Photos récupérées",
    marketData: "Données du marché",
    pricingData: "Données de prix",
    listedForSale: "En vente",
    found: "Trouvé",
    notFound: "—",
    loadingInsights: "Chargement des analyses…",
  },
} as const;

/* ─────────────────────────────────────────────────────────────
   Main Report Component
───────────────────────────────────────────────────────────── */
export default function VinReport({
  data,
  hideCheckAnother = false,
  mainTop,
  galleryFooter,
  afterPhotos,
  mainExtra,
  mainFiller,
  sidebarReplaceAI,
  lockedPhotoCount,
  lockListing = false,
  unlockHref,
  summaryGroups,
  heroAside,
  heroCta,
  heroPromo,
  summaryTop,
  sidebarTop,
  sidebarBottom,
  lockActions = false,
  unlockPrice,
  hideIdentityCards = false,
  hideValuation = false,
  mobileMarketAnalysisFirst = false,
  summaryDesktopHidden = false,
  keepSidebarAI = false,
  mainImageClassName,
  hideVehicleImage = false,
  locale = "en",
}: {
  data: VinData;
  /** Hide the "Check Another Vehicle" form (the preview moves it to the page foot). */
  hideCheckAnother?: boolean;
  /** Content rendered at the very top of the main column, above the photo
   *  gallery (e.g. a source-page message-match banner). */
  mainTop?: React.ReactNode;
  /** Content rendered inside the photo-gallery container, attached to the
   *  bottom of the photo so it reads as one unit with the image (e.g. the
   *  preview's vehicle-details strip). */
  galleryFooter?: React.ReactNode;
  /** Content rendered directly under the photo gallery, above the spec cards
   *  (e.g. the preview's free recalls + records-on-file teasers). */
  afterPhotos?: React.ReactNode;
  /** Extra content appended to the end of the main column (premium sections). */
  mainExtra?: React.ReactNode;
  /** Desktop-only filler rendered as the last main-column child; balances the
   *  column height against the taller sidebar when the report is data-sparse. */
  mainFiller?: React.ReactNode;
  /** When provided, replaces the AI block in the sidebar (e.g. the paywall card). */
  sidebarReplaceAI?: React.ReactNode;
  /** Preview: total photos on file — renders blurred locked thumbnails to tease them. */
  lockedPhotoCount?: number;
  /** Preview: blur the "Currently Listed for Sale" banner behind a premium lock. */
  lockListing?: boolean;
  /** Preview: where the premium lock overlays link to. */
  unlockHref?: string;
  /** Preview: replaces the default Report Summary rows with grouped premium deliverables. */
  summaryGroups?: { title: string; items: string[] }[];
  /** Preview: server-built content rendered in the navy hero beside the vehicle
      name (e.g. a "records found for this VIN" risk snapshot). Desktop-only. */
  heroAside?: React.ReactNode;
  /** Preview: primary CTA button rendered first in the hero action-button row
      (e.g. "Get full report"). The free report never passes this prop. */
  heroCta?: React.ReactNode;
  /** Preview: promotional card rendered in the empty navy space on the right of
      the hero, beside the vehicle name/action row (e.g. the free-window-sticker
      offer). Desktop-only; the free report never passes this prop. */
  heroPromo?: React.ReactNode;
  /** Preview: server-built card rendered directly above the Report Summary in
      the sidebar (e.g. the Market Analysis panel). */
  summaryTop?: React.ReactNode;
  /** Preview: card rendered at the very top of the sidebar, above the
      Valuation card (e.g. the bundle/prepaid-pack upsell). */
  sidebarTop?: React.ReactNode;
  /** Preview: server-built content rendered in the sidebar directly below the
      Report Summary card (e.g. the FAQ on desktop). */
  sidebarBottom?: React.ReactNode;
  /** Preview: intercept the Download / Print / Share buttons and open a
      marketing upsell modal instead of running their real action. The free
      report never passes this, so its buttons behave normally. */
  lockActions?: boolean;
  /** Preview: price (in dollars) shown in the upsell modal CTA, e.g. 9.99. */
  unlockPrice?: number;
  /** Preview: hide the built-in identity DataCards grid (Year/Make/Model/Trim…)
      and Vehicle Classification card on every viewport, where the page renders
      its own inline Vehicle Details strip under the photo instead — avoids
      duplicating the same fields. */
  hideIdentityCards?: boolean;
  /** Preview: hide the sidebar Valuation card (from data.price). The preview
      surfaces MSRP/pricing through its own Market Analysis panel instead, so
      the standalone Valuation card would just duplicate those figures. */
  hideValuation?: boolean;
  /** Preview: on phone, render the Market Analysis panel (and the summaryTop
      fallback) inline in the main column — directly under the vehicle
      specifications and above the recalls (afterPhotos) — instead of in the
      sidebar. Desktop keeps it in the sidebar. */
  mobileMarketAnalysisFirst?: boolean;
  /** Preview: hide the built-in sidebar Report Summary card on desktop, where the
      page renders it in the main column instead (and moves the bundle into the
      sidebar). Stays visible on mobile. */
  summaryDesktopHidden?: boolean;
  /** Render the AI report sections even when sidebarReplaceAI is set. The
      preview uses this because its sidebar now carries the bundle checkout in
      sidebarReplaceAI, yet still wants the AI sections at the sidebar foot. */
  keepSidebarAI?: boolean;
  /** Extra className applied to the main hero photo (used by the report-preview
      A/B test to softly blur it for the "blur" variant). */
  mainImageClassName?: string;
  /** Report-preview A/B test — "nophoto" (variant D). When set AND the vehicle
      has no photo on file, the photo gallery (and its generic placeholder) is
      replaced by a clean manufacturer-logo hero, removing the image area
      entirely. Has no effect when real photos exist. */
  hideVehicleImage?: boolean;
  /** UI language. Defaults to English. */
  locale?: Locale;
}) {
  const c = COPY[locale];
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

  // Client-side backstop for server-side tracking. The server component
  // already calls trackVinLookup + saveVinReport, but this fetch covers
  // the edge case where the serverless function froze before the inserts
  // resolved, or where the user signed in mid-render via ReportGate.
  useEffect(() => {
    if (!data.vin) return;
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
  }, [data.vin, makeName, modelName, year]);

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

  // Market Analysis card (live auto.dev listings). Extracted so the preview can
  // render it either in the sidebar (desktop) or inline in the main column
  // under the specs (mobile, via mobileMarketAnalysisFirst).
  const marketAnalysisCard = data.marketData ? (
    <div className="bg-surface-container-lowest rounded-[2rem] shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-surface-container">
        <h3 className="font-headline font-bold text-on-surface flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" /> {c.marketAnalysis}
        </h3>
        <p className="text-xs text-outline mt-0.5">{c.activeListings(data.marketData.totalListings)}</p>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="text-center p-3 bg-green-50 rounded-xl">
            <TrendingDown className="w-4 h-4 text-green-600 mx-auto mb-1" />
            <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">{c.low}</p>
            <p className="font-headline font-black text-sm text-green-700">${data.marketData.lowestPrice.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 bg-primary/8 rounded-xl">
            <BarChart3 className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{c.avg}</p>
            <p className="font-headline font-black text-sm text-primary">${data.marketData.averagePrice.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-xl">
            <TrendingUp className="w-4 h-4 text-red-500 mx-auto mb-1" />
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{c.high}</p>
            <p className="font-headline font-black text-sm text-red-600">${data.marketData.highestPrice.toLocaleString()}</p>
          </div>
        </div>

        {data.marketData.averageMileage > 0 && (
          <div className="flex justify-between items-center py-3 border-t border-surface-container">
            <span className="text-xs text-outline font-semibold uppercase tracking-wider">{c.avgMileage}</span>
            <span className="font-bold text-on-surface">{data.marketData.averageMileage.toLocaleString()} mi</span>
          </div>
        )}

        {/* Similar listings */}
        {data.marketData.sampleListings.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-black text-outline uppercase tracking-widest mb-3">{c.similarListings}</p>
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
  ) : null;

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
            <ArrowLeft className="w-4 h-4" /> {c.backHome}
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex-1 min-w-0">
              {/* Status chips */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1.5 text-on-secondary-container"
                  style={{ background: "var(--color-secondary-container)" }}>
                  <Shield className="w-3 h-3" /> {c.reportGenerated}
                </span>
                {(() => {
                  // Body-type / size chips render ONLY from real decoded data
                  // (auto.dev categories). No example fallback here: unlike the
                  // clearly-labelled "Example" market panel, these chips read as
                  // factual, so a hardcoded value would mislabel the vehicle
                  // (e.g. tagging a sedan as an "SUV"). When the data is absent
                  // they simply don't show.
                  const bodyType = data.categories?.primaryBodyType || "";
                  const size = data.categories?.vehicleSize || "";
                  return (
                    <>
                      {bodyType && (
                        <span className="px-3 py-1 bg-white/10 text-white/85 text-xs font-semibold rounded-full">
                          {bodyType}
                        </span>
                      )}
                      {size && (
                        <span className="px-3 py-1 bg-white/10 text-white/85 text-xs font-semibold rounded-full">
                          {size}
                        </span>
                      )}
                    </>
                  );
                })()}
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
                {/* Preview-only primary CTA — rendered first so the buy button
                    sits alongside the action buttons, above the fold. */}
                {heroCta}
                <button
                  onClick={lockActions ? scrollToBundle : downloadReport}
                  disabled={lockActions ? false : downloadLoading}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-on-secondary-container hover:brightness-110 transition cursor-pointer disabled:opacity-60"
                  style={{ background: "var(--color-secondary-container)" }}>
                  <Download className={`w-4 h-4 ${!lockActions && downloadLoading ? "animate-pulse" : ""}`} />
                  {!lockActions && downloadLoading ? c.preparing : c.downloadReport}
                </button>
                <button onClick={lockActions ? scrollToBundle : () => window.print()}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 rounded-full text-xs sm:text-sm font-medium text-white transition cursor-pointer">
                  <Printer className="w-4 h-4" /> {c.print}
                </button>
                <button
                  onClick={lockActions ? scrollToBundle : handleShare}
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
                      <Check className="w-4 h-4" /> {c.linkCopied}
                    </>
                  ) : shareState === "error" ? (
                    <>
                      <Share2 className="w-4 h-4" /> {c.copyFailed}
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" /> {c.share}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Preview-only: promotional card that fills the otherwise-empty
                navy space to the right of the vehicle name / action buttons.
                Desktop-only — on smaller screens it would crowd the hero. */}
            {heroPromo}

          </div>

          {/* Preview-only: server-built aside rendered full-width BELOW the
              vehicle name (e.g. the mobile Vehicle Details card that replaces
              the old "On this VIN's record" strip). The free report never
              passes it. */}
          {heroAside}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          BODY — Two-column layout
      ══════════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full overflow-x-clip">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

          {/* ── LEFT / MAIN COLUMN (2/3) ── */}
          <div className="lg:col-span-2 space-y-6 min-w-0">

            {/* Source-page message-match banner — above the photo gallery so a
                visitor coming from a check tool sees the matched copy first. */}
            {mainTop}

            {/* Photo gallery — A/B/C/D "nophoto" variant swaps the empty-state
                placeholder for a clean manufacturer-logo hero when this VIN has
                no photo on file (real photos always render the gallery). */}
            {hideVehicleImage && (!data.photos || data.photos.length === 0) ? (
              <LogoOnlyHero
                make={makeName}
                model={modelName}
                year={year}
                footer={galleryFooter}
              />
            ) : (
              <PhotoGallery
                photos={data.photos || []}
                photoSource={data.photoSource}
                alt={fullName}
                year={year}
                make={makeName}
                model={modelName}
                lockedPhotoCount={lockedPhotoCount}
                footer={galleryFooter}
                mainImageClassName={mainImageClassName}
                c={c}
              />
            )}

            {/* Preview (phone only): Market Analysis inline directly under the
                vehicle specifications (galleryFooter) and above the recalls, per
                mobileMarketAnalysisFirst. Desktop keeps these in the sidebar. */}
            {mobileMarketAnalysisFirst && (marketAnalysisCard || summaryTop) && (
              <div className="lg:hidden space-y-6">
                {marketAnalysisCard}
                {summaryTop}
              </div>
            )}

            {/* Slot directly under the gallery (preview: free recalls +
                records-on-file teasers, surfaced before the spec cards). */}
            {afterPhotos}

            {/* Currently listed banner */}
            {data.listing && (
              <div className="bg-primary p-5 sm:p-6 rounded-3xl sm:rounded-[2rem] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--color-secondary-container)" }} />
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-secondary-container" />
                  <h2 className="font-headline font-bold text-white">{c.currentlyListed}</h2>
                  {lockListing && (
                    <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-secondary-container">
                      <Lock className="w-3 h-3" /> {c.premium}
                    </span>
                  )}
                </div>
                <div className="relative">
                {lockListing && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    {unlockHref ? (
                      <button
                        type="button"
                        onClick={scrollToBundle}
                        className="inline-flex items-center gap-2 bg-white text-primary rounded-xl px-4 py-2.5 text-sm font-headline font-extrabold shadow-lg hover:bg-yellow-50 transition-colors cursor-pointer"
                      >
                        <Lock className="w-4 h-4" /> {c.unlockListing}
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-2 bg-white/90 text-primary rounded-xl px-4 py-2.5 text-sm font-headline font-extrabold shadow-lg">
                        <Lock className="w-4 h-4" /> {c.includedInFullReport}
                      </span>
                    )}
                  </div>
                )}
                <div
                  className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 ${lockListing ? "blur-md select-none pointer-events-none" : ""}`}
                  aria-hidden={lockListing || undefined}
                >
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-white/85 font-semibold uppercase tracking-wider">{c.askingPrice}</p>
                    <p className="text-xl sm:text-2xl font-headline font-black text-secondary-container break-words">{data.listing.price}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-white/85 font-semibold uppercase tracking-wider">{c.mileage}</p>
                    <p className="text-lg sm:text-xl font-headline font-bold text-white break-words">{data.listing.mileage}</p>
                  </div>
                  {data.listing.displayColor && (
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-white/85 font-semibold uppercase tracking-wider">{c.color}</p>
                      <p className="text-base sm:text-lg font-bold text-white break-words">{data.listing.displayColor}</p>
                    </div>
                  )}
                  {data.listing.dealerName && (
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-white/85 font-semibold uppercase tracking-wider">{c.dealer}</p>
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
              </div>
            )}

            {/* Quick specs grid */}
            <div className={`grid-cols-2 md:grid-cols-3 gap-3 ${hideIdentityCards ? "hidden" : "grid"}`}>
              {year        && <DataCard icon={Calendar}  label={c.year}         value={String(year)}                 accent="bg-primary/8 text-primary" />}
              <DataCard icon={Car}      label={c.make}         value={makeName}                     accent="bg-primary/8 text-primary" />
              <DataCard icon={Car}      label={c.model}        value={modelName}                    accent="bg-tertiary/10 text-tertiary" />
              {trim        && <DataCard icon={Tag}       label={c.trim}         value={trim}                         accent="bg-violet-50 text-violet-600" />}
              {data.numOfDoors && <DataCard icon={DoorOpen} label={c.doors}    value={`${data.numOfDoors} ${c.doorsSuffix}`}   accent="bg-amber-50 text-amber-600" />}
              {data.drivenWheels && <DataCard icon={Cog}  label={c.drivetrain} value={data.drivenWheels}            accent="bg-cyan-50 text-cyan-600" />}
              {data.transmission && <DataCard icon={Settings} label={c.transmission} value={`${data.transmission.numberOfSpeeds}-Spd ${data.transmission.transmissionType}`} accent="bg-purple-50 text-purple-600" />}
              {data.engine?.fuelType && <DataCard icon={Fuel} label={c.fuelType}  value={data.engine.fuelType}     accent="bg-green-50 text-green-600" />}
              {data.mpg    && <DataCard icon={Gauge}     label={c.fuelEconomy} value={`${data.mpg.city} / ${data.mpg.highway} MPG`} accent="bg-emerald-50 text-emerald-600" />}
              {data.categories?.vehicleSize && <DataCard icon={Info}   label={c.size}  value={data.categories.vehicleSize} accent="bg-amber-50 text-amber-600" />}
              {data.categories?.epaClass    && <DataCard icon={Award}  label={c.epaClass} value={data.categories.epaClass}    accent="bg-teal-50 text-teal-600" />}
              {submodel?.body && <DataCard icon={Car} label={c.bodyStyle} value={submodel.body} accent="bg-indigo-50 text-indigo-600" />}
            </div>

            {/* Engine & Performance */}
            {data.engine && (
              <Card icon={Zap} title={c.engineAndPerformance} subtitle={c.engineSubtitle} accent="bg-amber-50 text-amber-600">
                <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8">
                  {data.engine.cylinder     && <Stat label={c.configuration} value={`${data.engine.cylinder}-Cyl ${data.engine.configuration}`} />}
                  {data.engine.displacement && <Stat label={c.displacement}  value={`${data.engine.displacement} cc (${data.engine.size}L)`} />}
                  {data.engine.horsepower   && <Stat label={c.horsepower}    value={`${data.engine.horsepower} HP${data.engine.rpm?.horsepower ? ` @ ${data.engine.rpm.horsepower} RPM` : ""}`} />}
                  {data.engine.torque       && <Stat label={c.torque}        value={`${data.engine.torque} lb-ft${data.engine.rpm?.torque ? ` @ ${data.engine.rpm.torque} RPM` : ""}`} />}
                  {data.engine.totalValves  && <Stat label={c.valves}        value={String(data.engine.totalValves)} />}
                  {data.engine.fuelType     && <Stat label={c.fuelType}     value={data.engine.fuelType} />}
                  {data.engine.compressorType && <Stat label={c.aspiration}  value={data.engine.compressorType === "NA" ? c.naturallyAspirated : data.engine.compressorType} />}
                  {data.engine.compressionRatio && <Stat label={c.compression} value={`${data.engine.compressionRatio}:1`} />}
                  {data.engine.manufacturerEngineCode && <Stat label={c.engineCode} value={data.engine.manufacturerEngineCode} />}
                  {data.engine.valve && <><Stat label={c.valveTiming} value={data.engine.valve.timing} /><Stat label={c.valveGear} value={data.engine.valve.gear} /></>}
                </div>
              </Card>
            )}

            {/* Transmission */}
            {data.transmission && (
              <Card icon={Cog} title={c.transmissionDrivetrain} accent="bg-cyan-50 text-cyan-600">
                <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8">
                  <Stat label={c.type}          value={data.transmission.transmissionType} />
                  <Stat label={c.speeds}        value={`${data.transmission.numberOfSpeeds}-${c.speedSuffix}`} />
                  {data.drivenWheels && <Stat label={c.drivenWheels} value={data.drivenWheels} />}
                  {data.transmission.name    && <Stat label={c.code}  value={data.transmission.name} />}
                  {data.numOfDoors && <Stat label={c.doors} value={`${data.numOfDoors} ${c.doorsSuffix}`} />}
                </div>
              </Card>
            )}

            {/* Fuel Economy */}
            {data.mpg && (
              <Card icon={Fuel} title={c.fuelEconomy} subtitle={c.fuelEconomySubtitle} accent="bg-green-50 text-green-600">
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {[
                    { key: "city",     label: c.city,     val: data.mpg.city,    accent: "bg-primary/8 text-primary" },
                    { key: "highway",  label: c.highway,  val: data.mpg.highway, accent: "bg-tertiary/10 text-tertiary" },
                    { key: "combined", label: c.combined, val: Math.round(data.mpg.city * 0.55 + data.mpg.highway * 0.45), accent: "bg-green-50 text-green-700" },
                  ].map(({ key, label, val, accent }) => (
                    <div key={key} className={`text-center p-3 sm:p-6 rounded-2xl ${accent.split(" ")[0]}`}>
                      <p className={`text-xs sm:text-sm font-semibold mb-1 sm:mb-2 ${accent.split(" ")[1]}`}>{label}</p>
                      <p className={`text-3xl sm:text-5xl font-headline font-black ${accent.split(" ")[1]}`}>{val}</p>
                      <p className="text-[10px] sm:text-xs text-on-surface-variant mt-1">MPG{key === "combined" ? c.mpgEstSuffix : ""}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Vehicle Classification */}
            {data.categories && !hideIdentityCards && (
              <div>
                <Card icon={Info} title={c.vehicleClassification} accent="bg-indigo-50 text-indigo-600">
                  <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8">
                    {data.categories.primaryBodyType && <Stat label={c.bodyType}    value={data.categories.primaryBodyType} />}
                    {data.categories.vehicleType     && <Stat label={c.vehicleType} value={data.categories.vehicleType} />}
                    {data.categories.vehicleStyle    && <Stat label={c.style}       value={data.categories.vehicleStyle} />}
                    {data.categories.vehicleSize     && <Stat label={c.size}        value={data.categories.vehicleSize} />}
                    {data.categories.market          && <Stat label={c.segment}     value={data.categories.market} />}
                    {data.categories.epaClass        && <Stat label={c.epaClass}    value={data.categories.epaClass} />}
                    {data.manufacturerCode           && <Stat label={c.mfrCode}     value={data.manufacturerCode} />}
                    {data.squishVin                  && <Stat label={c.squishVin}   value={data.squishVin} />}
                  </div>
                </Card>
              </div>
            )}

            {/* Colors */}
            {data.colors && data.colors.length > 0 && (
              <Card icon={Palette} title={c.availableColors} accent="bg-pink-50 text-pink-600">
                <div className="space-y-5">
                  {data.colors.map((color) => (
                    <div key={color.category}>
                      <p className="text-xs font-semibold text-outline uppercase tracking-widest mb-3">{color.category}</p>
                      <div className="flex flex-wrap gap-2">
                        {color.options.map((o) => (
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
                    {c.optionsEquipment}
                  </h2>
                  <p className="text-sm text-on-surface-variant mt-1 ml-12">
                    {c.optionsSummary(data.options.reduce((a, cat) => a + cat.options.length, 0), data.options.length)}
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
            {!hideCheckAnother && (
              <div className="bg-primary-container rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 text-center relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--color-secondary-container)" }} />
                <h2 className="font-headline font-extrabold text-lg sm:text-xl text-white mb-2">{c.checkAnother}</h2>
                <p className="text-sm sm:text-base text-white/85 mb-5 sm:mb-6">{c.checkAnotherSub}</p>
                <div className="max-w-lg mx-auto">
                  <VinSearchForm size="sm" />
                </div>
              </div>
            )}

            {/* Preview-only: premium sections injected under the car info */}
            {mainExtra}

            {/* Preview-only: balances the column height on desktop when the
                report is sparse, so the main column never ends in a blank gap. */}
            {mainFiller}
          </div>

          {/* ── RIGHT SIDEBAR (1/3) — scrolls naturally with the page.
              In preview mode the column stretches to full height so the
              paywall card (sidebarReplaceAI) can stay sticky on scroll. ── */}
          <div className={`space-y-6 ${sidebarReplaceAI ? "" : "lg:self-start"}`}>

            {/* Preview-only: bundle/prepaid-pack upsell, above Valuation. */}
            {sidebarTop}

            {/* Pricing sidebar card */}
            {!hideValuation && data.price && (
              <div className="bg-surface-container-lowest rounded-[2rem] shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-surface-container">
                  <h3 className="font-headline font-bold text-on-surface flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" /> {c.valuation}
                  </h3>
                </div>
                <div className="p-5 space-y-3">
                  {data.price.baseMsrp > 0 && (
                    <div className="flex justify-between items-center p-3 bg-primary/8 rounded-xl">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">{c.baseMsrp}</span>
                      <span className="font-headline font-black text-primary">${data.price.baseMsrp.toLocaleString()}</span>
                    </div>
                  )}
                  {data.price.usedTmvRetail > 0 && (
                    <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
                      <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{c.usedRetail}</span>
                      <span className="font-headline font-black text-on-surface">${data.price.usedTmvRetail.toLocaleString()}</span>
                    </div>
                  )}
                  {data.price.usedTradeIn > 0 && (
                    <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
                      <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{c.tradeIn}</span>
                      <span className="font-headline font-black text-on-surface">${data.price.usedTradeIn.toLocaleString()}</span>
                    </div>
                  )}
                  {data.price.usedPrivateParty > 0 && (
                    <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
                      <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{c.privateParty}</span>
                      <span className="font-headline font-black text-on-surface">${data.price.usedPrivateParty.toLocaleString()}</span>
                    </div>
                  )}
                  {data.price.baseInvoice > 0 && (
                    <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
                      <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{c.invoice}</span>
                      <span className="font-headline font-black text-on-surface">${data.price.baseInvoice.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Market analysis sidebar. When mobileMarketAnalysisFirst is set
                the preview renders this (and summaryTop) inline in the main
                column on phones instead, so here it's desktop-only. */}
            {marketAnalysisCard && (
              <div className={mobileMarketAnalysisFirst ? "hidden lg:block" : undefined}>
                {marketAnalysisCard}
              </div>
            )}

            {/* Preview-only: server-built card directly above Report Summary
                (e.g. the Market Analysis fallback panel). Desktop-only when the
                preview surfaces it in the main column on phones. */}
            {summaryTop && (
              <div className={mobileMarketAnalysisFirst ? "hidden lg:block" : undefined}>
                {summaryTop}
              </div>
            )}

            {/* Preview-only paywall / marketing card — pinned directly beneath
                the Market Analysis panel so the offer sits with the value it
                sells. (Free report leaves this empty; its AI sections render
                at the bottom of the sidebar, as before.) */}
            {sidebarReplaceAI}

            {/* Quick report summary sidebar */}
            <div className={`bg-surface-container-lowest rounded-[2rem] shadow-sm overflow-hidden${summaryDesktopHidden ? " lg:hidden" : ""}`}>
              <div className="px-5 py-4 border-b border-surface-container">
                <h3 className="font-headline font-bold text-on-surface flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-secondary-container" style={{ color: "var(--color-secondary-container)" }} /> {c.reportSummary}
                </h3>
              </div>
              {summaryGroups ? (
                <div className="p-5 space-y-4">
                  {summaryGroups.map((group) => (
                    <div key={group.title}>
                      <p className="text-[11px] font-black text-primary uppercase tracking-wider mb-2">
                        {group.title}
                      </p>
                      <div className="space-y-2">
                        {group.items.map((label) => (
                          <div key={label} className="flex items-center justify-between gap-3">
                            <span className="text-sm text-on-surface-variant">{label}</span>
                            <span className="flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                              ✓ {c.included}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 space-y-3">
                  {[
                    { label: c.vinVerified,    ok: true },
                    { label: c.specsDecoded,   ok: true },
                    { label: c.photosRetrieved, ok: (data.photos?.length ?? 0) > 0 },
                    { label: c.marketData,     ok: !!data.marketData },
                    { label: c.pricingData,    ok: !!data.price },
                    { label: c.listedForSale,  ok: !!data.listing },
                  ].map(({ label, ok }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-sm text-on-surface-variant">{label}</span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ok ? "bg-green-50 text-green-700" : "bg-surface-container text-outline"}`}>
                        {ok ? `✓ ${c.found}` : c.notFound}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Preview: server-built content directly under Report Summary
                (e.g. the FAQ on desktop). */}
            {sidebarBottom}

            {/* AI-powered report sections (Concierge, Risk Insights, Storyteller).
                Render whenever the AI block isn't being replaced — or when the
                caller explicitly opts to keep them alongside a replacement
                (e.g. the preview keeps them even though the sidebar now carries
                the bundle in sidebarReplaceAI). */}
            {(!sidebarReplaceAI || keepSidebarAI) && (
              <VinReportAI data={data} fullName={fullName} />
            )}

          </div>{/* end sidebar */}
        </div>{/* end grid */}
      </div>{/* end body */}
    </div>
  );
}
