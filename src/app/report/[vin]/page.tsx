import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { decodeVin } from "@/lib/api";
import ReportPreviewPage from "@/app/report-preview/[vin]/page";
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

  // Decode is best-effort: it powers tracking, the dashboard save and the
  // JSON-LD, but a decode miss must NOT block the report — the ClearVin
  // preview below stands on its own.
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
      {/* Render the ClearVin preview (vehicle identity, photos, recall/auction/
          damage record counts) rather than the auto.dev decode — same upsell
          experience as /report-preview. */}
      <ReportPreviewPage params={params} />
    </>
  );
}
