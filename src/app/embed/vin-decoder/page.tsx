import type { Metadata } from "next";
import VinSearchForm from "@/components/VinSearchForm";

export const metadata: Metadata = {
  title: "Free VIN Decoder Widget",
  description:
    "Embeddable VIN decoder widget by CarCheckerVIN. Free, no signup, NMVTIS-backed.",
  alternates: { canonical: "/embed/vin-decoder" },
  robots: { index: false, follow: false },
};

export default function EmbedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Free VIN Decoder</h2>
        <p className="text-sm text-slate-700 mb-4">Decode any VIN in under 60 seconds.</p>
        <VinSearchForm size="sm" />
        <div className="mt-4 text-xs text-slate-600 flex items-center justify-between">
          <span>Free &bull; No signup &bull; NMVTIS data</span>
          <a
            href="https://carcheckervin.com"
            target="_blank"
            rel="noopener"
            className="text-primary-600 hover:underline"
          >
            Powered by CarCheckerVIN
          </a>
        </div>
      </div>
    </div>
  );
}
