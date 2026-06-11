import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { decodeVin } from "@/lib/api";
import VinReport from "@/components/VinReport";
import VinSearchForm from "@/components/VinSearchForm";
import FullVinReport from "@/components/report/FullVinReport";
import { getStructuredReport } from "@/lib/clearvin-report";
import { trackVinLookup, saveVinReport } from "@/lib/tracking";

// Render fresh on every request. Without this, Next caches the rendered HTML
// per VIN in the Full Route Cache and serves a stale "old version" of the
// report after deploys/content changes. The report pulls live data and writes
// tracking rows, so it must always run dynamically (matches /full-report).
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ vin: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vin } = await params;

  try {
    const data = await decodeVin(vin);
    const makeName = data.make?.name || "Unknown Make";
    const modelName = data.model?.name || "Unknown Model";
    const title = `${makeName} ${modelName} VIN Report — ${vin}`;
    const description = `Complete vehicle report for ${makeName} ${modelName} (VIN: ${vin}). View full specifications, engine details, equipment, options, and market data.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
      },
      alternates: {
        canonical: `/report/${vin}`,
      },
      robots: { index: false, follow: false },
    };
  } catch {
    return {
      title: `VIN Report — ${vin}`,
      description: `Vehicle history report for VIN ${vin}.`,
    };
  }
}

export default async function ReportPage({ params }: Props) {
  const { vin } = await params;
  const cleaned = vin.trim().toUpperCase();

  if (cleaned.length !== 17) {
    notFound();
  }

  // The report body now uses the richer ClearVin structured report (same UI as
  // /full-report). Kick it off first so it runs concurrently with the decode +
  // DB writes below. It has a mock fallback, so it resolves for any valid VIN.
  const structuredPromise = getStructuredReport(cleaned);

  // Decode is now best-effort: it still powers tracking, the dashboard save and
  // the JSON-LD, but a decode miss must NOT block the report — the structured
  // report can stand on its own. (Previously a decode failure hard-bailed.)
  let data: Awaited<ReturnType<typeof decodeVin>> | null = null;
  try {
    data = await decodeVin(cleaned);
  } catch {
    data = null;
  }

  if (data) {
    // Track every view synchronously so the insert completes before the
    // serverless function returns — otherwise Vercel can freeze the function
    // before the fire-and-forget promise resolves, and rows never land.
    // This also guarantees the row shows up in the user's /dashboard.
    await trackVinLookup({
      vin: cleaned,
      make: data.make?.name ?? null,
      model: data.model?.name ?? null,
      year: data.years?.[0]?.year ?? null,
    });

    // Persist the full decode payload to vin_reports. The report itself is
    // now anonymous (no signup wall), but if the visitor happens to be signed
    // in the upsert still lands under their user_id so the report shows up on
    // /dashboard across their devices. No-op for unauthed visitors.
    await saveVinReport({
      vin: cleaned,
      make: data.make?.name ?? null,
      model: data.model?.name ?? null,
      year: data.years?.[0]?.year ?? null,
      reportData: data,
    });
  }

  const structured = await structuredPromise;

  // Genuine miss only when BOTH the structured report and the decode failed.
  if (!structured.ok && !data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            VIN Not Found
          </h1>
          <p className="text-slate-700 mb-8">
            We couldn&apos;t find data for VIN <code className="font-mono bg-slate-100 text-primary-600 px-2 py-1 rounded">{cleaned}</code>.
            Please double-check and try again.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </div>
    );
  }

  // JSON-LD is built from decode data when we have it (richer engine specs).
  const jsonLd = data
    ? {
        "@context": "https://schema.org",
        "@type": "Vehicle",
        name: `${data.make?.name || "Unknown Make"} ${data.model?.name || "Unknown Model"}`,
        manufacturer: data.make?.name || "Unknown Make",
        model: data.model?.name || "Unknown Model",
        vehicleIdentificationNumber: cleaned,
        ...(data.engine && {
          vehicleEngine: {
            "@type": "EngineSpecification",
            engineDisplacement: {
              "@type": "QuantitativeValue",
              value: data.engine.displacement,
              unitCode: "CMQ",
            },
            enginePower: {
              "@type": "QuantitativeValue",
              value: data.engine.horsepower,
              unitCode: "BHP",
            },
            fuelType: data.engine.fuelType,
          },
        }),
        vehicleTransmission: data.transmission?.transmissionType,
        driveWheelConfiguration: data.drivenWheels,
        numberOfDoors: data.numOfDoors,
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {structured.ok ? (
        <FullVinReport report={structured.report} />
      ) : data ? (
        <VinReport data={data} />
      ) : null}
    </>
  );
}
