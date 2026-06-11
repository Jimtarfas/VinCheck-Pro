import type { Metadata } from "next";
import ReportPreviewPage, {
  generateMetadata as previewMetadata,
} from "../report-preview/[vin]/page";

/* ────────────────────────────────────────────────────────────────────────
   PUBLIC PREMIUM-PREVIEW TEST PAGE  —  /premium-preview

   A stable, shareable URL for reviewing the paid report-preview design
   without having to know a VIN. It simply RE-RENDERS the existing
   /report-preview/[vin] page component against a sample VIN — it does NOT
   copy, fork, or modify that page's content, and it never touches the free
   /report/[vin] route. Any future change to the real preview shows up here
   automatically. Override the VIN with ?vin=YOUR_VIN.
──────────────────────────────────────────────────────────────────────── */

export const dynamic = "force-dynamic";

// A valid 17-char sample VIN used when no ?vin override is supplied.
const SAMPLE_VIN = "2C3CDXBG3JH232310";

type Search = { searchParams: Promise<{ vin?: string }> };

function resolveVin(vin?: string): string {
  const v = (vin ?? "").trim().toUpperCase();
  return v.length === 17 ? v : SAMPLE_VIN;
}

export async function generateMetadata({ searchParams }: Search): Promise<Metadata> {
  const { vin } = await searchParams;
  return previewMetadata({ params: Promise.resolve({ vin: resolveVin(vin) }) });
}

export default async function PremiumPreviewTestPage({ searchParams }: Search) {
  const { vin } = await searchParams;
  return ReportPreviewPage({ params: Promise.resolve({ vin: resolveVin(vin) }) });
}
