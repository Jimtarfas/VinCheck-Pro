import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import { AlertTriangle } from "lucide-react";
import { getStructuredReport } from "@/lib/clearvin-report";
import FullVinReport from "@/components/report/FullVinReport";

export const dynamic = "force-dynamic";

const SAMPLE_VIN = "2T1LR32E35C508537"; // ClearVin sandbox VIN

function resolveVin(raw?: string): string {
  const v = (raw ?? "").trim().toUpperCase();
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(v) ? v : SAMPLE_VIN;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vin: string }>;
}): Promise<Metadata> {
  const { vin } = await params;
  const clean = resolveVin(vin);
  return {
    title: `Vehicle History Report — ${clean} | CarCheckerVIN`,
    description: `Full NMVTIS-backed vehicle history report for VIN ${clean}: title brands, odometer, recalls, salvage, market value and more.`,
    robots: { index: false, follow: false },
  };
}

export default async function FullReportPage({
  params,
}: {
  params: Promise<{ vin: string }>;
}) {
  const { vin } = await params;
  const clean = resolveVin(vin);
  const result = await getStructuredReport(clean);

  if (!result.ok) {
    return (
      <div className="bg-surface min-h-[60vh]">
        <div className="mx-auto max-w-xl px-4 py-20 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h1 className="mt-4 font-headline text-xl font-bold text-on-surface">Report unavailable</h1>
          <p className="mt-2 text-sm text-on-surface-variant">{result.message}</p>
          <Link href="/" className="mt-6 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white">
            Check another VIN
          </Link>
        </div>
      </div>
    );
  }

  const { report } = result;
  const v = report.vehicle;

  // SEO-friendly structured data (schema.org Vehicle).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    vehicleIdentificationNumber: v.vin,
    name: [v.year, v.make, v.model, v.trim].filter(Boolean).join(" "),
    manufacturer: v.make || undefined,
    model: v.model || undefined,
    vehicleModelDate: v.year || undefined,
    bodyType: v.bodyStyle || undefined,
    fuelType: v.fuelType || undefined,
    driveWheelConfiguration: v.driveType || undefined,
    vehicleTransmission: v.transmission || undefined,
    vehicleEngine: v.engine ? { "@type": "EngineSpecification", name: v.engine } : undefined,
    mileageFromOdometer: report.odometer.last
      ? { "@type": "QuantitativeValue", value: report.odometer.last.mileage, unitCode: "SMI" }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FullVinReport report={report} />
    </>
  );
}
