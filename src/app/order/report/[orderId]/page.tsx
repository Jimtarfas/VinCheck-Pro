import type { Metadata } from "next";
import ReportView from "./_components/ReportView";

export const metadata: Metadata = {
  title: "Vehicle History Report",
  description: "Your NMVTIS-backed vehicle history report.",
  robots: { index: false, follow: false },
};

export default async function OrderReportPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  // Render unconstrained — FullVinReport (via ReportView) is fully
  // self-contained (own full-width centering, pt-24 to clear the /order
  // layout's sticky header, and bottom Download-PDF dock), matching the
  // free report page exactly.
  return <ReportView orderId={orderId} />;
}
