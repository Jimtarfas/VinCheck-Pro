import type { Metadata } from "next";
import Link from "next/link";
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

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-200px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex items-center justify-between mb-5 print:hidden">
          <Link
            href="/order/account"
            className="text-sm text-blue-700 hover:text-blue-900"
          >
            ← My reports
          </Link>
          <Link
            href="/order"
            className="text-sm text-blue-700 hover:text-blue-900"
          >
            Order another VIN
          </Link>
        </div>

        <ReportView orderId={orderId} />
      </div>
    </div>
  );
}
