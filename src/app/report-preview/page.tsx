import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import { CLEARVIN_TEST_VINS, isUsingMockData } from "@/lib/clearvin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vehicle History Report Preview",
  description:
    "Enter a VIN to preview the records on file before unlocking the full vehicle history report.",
  robots: { index: false, follow: false },
};

async function go(formData: FormData) {
  "use server";
  const raw = String(formData.get("vin") || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
  if (raw.length >= 11) redirect(`/report-preview/${raw}`);
  redirect(`/report-preview`);
}

export default function ReportPreviewIndex() {
  const mock = isUsingMockData();
  const samples = CLEARVIN_TEST_VINS.slice(0, 8);

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary mb-4">
        <Sparkles className="w-3.5 h-3.5" /> Premium report preview
      </div>
      <h1 className="text-3xl sm:text-4xl font-headline font-extrabold text-on-surface mb-3">
        Preview a vehicle history report
      </h1>
      <p className="text-on-surface-variant mb-8">
        Enter a 17-character VIN to see which records exist on file
        {mock ? " (showing mock data — no live token configured)" : " — pulled live from ClearVin"}.
      </p>

      <form action={go} className="flex flex-col sm:flex-row gap-3 mb-10">
        <input
          name="vin"
          placeholder="Enter VIN (e.g. 5TDYK3DC8DS290235)"
          maxLength={17}
          autoComplete="off"
          className="flex-1 rounded-xl border border-outline-variant bg-surface px-4 py-3 text-on-surface font-mono tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white hover:bg-primary-container transition-colors"
        >
          <Search className="w-4 h-4" /> Preview
        </button>
      </form>

      <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">
        Sample test VINs
      </p>
      <div className="flex flex-wrap gap-2">
        {samples.map((v) => (
          <Link
            key={v}
            href={`/report-preview/${v}`}
            className="rounded-lg border border-outline-variant bg-surface px-3 py-1.5 text-xs font-mono text-on-surface hover:border-primary/40 hover:bg-primary/5 transition-colors"
          >
            {v}
          </Link>
        ))}
      </div>
    </main>
  );
}
