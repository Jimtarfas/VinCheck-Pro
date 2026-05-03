import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { decodeVin } from "@/lib/api";
import VinReport from "@/components/VinReport";
import VinSearchForm from "@/components/VinSearchForm";
import ReportGate from "@/components/ReportGate";
import { trackVinLookup } from "@/lib/tracking";

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

  let data;
  try {
    data = await decodeVin(cleaned);
  } catch {
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

  const makeName = data.make?.name || "Unknown Make";
  const modelName = data.model?.name || "Unknown Model";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${makeName} ${modelName}`,
    manufacturer: makeName,
    model: modelName,
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReportGate vin={cleaned}>
        <VinReport data={data} />
      </ReportGate>
    </>
  );
}
