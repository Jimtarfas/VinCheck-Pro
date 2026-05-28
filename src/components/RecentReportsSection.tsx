import Link from "next/link";
import { Clock, ArrowRight, Car } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface ReportRow {
  vin: string;
  make: string | null;
  model: string | null;
  year: number | null;
  report_data: { photos?: string[]; listing?: { price?: string } } | null;
  updated_at: string;
}

function relativeTime(iso: string): string {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const mins = Math.round(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? "" : "s"} ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks} wk${weeks === 1 ? "" : "s"} ago`;
  const months = Math.round(days / 30);
  return `${months} mo${months === 1 ? "" : "s"} ago`;
}

/**
 * Server-rendered "your recent reports" widget. Reads vin_reports for the
 * currently signed-in user — anonymous visitors render nothing. Replaces
 * the old localStorage-backed VinHistorySection so reports survive cache
 * clears and follow the user across devices.
 */
export default async function RecentReportsSection() {
  let rows: ReportRow[] = [];

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const admin = createAdminClient();
    const { data } = await admin
      .from("vin_reports")
      .select("vin, make, model, year, report_data, updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(12);

    rows = (data ?? []) as ReportRow[];
  } catch {
    return null;
  }

  if (rows.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8 flex-wrap">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-2">
              <Clock className="w-4 h-4" /> Your recent VIN reports
            </span>
            <h2 className="font-headline font-extrabold text-2xl sm:text-3xl lg:text-4xl text-on-surface leading-tight">
              Pick up where you left off
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-1.5 max-w-xl">
              Saved to your account — open them from any device, anytime.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-primary bg-primary-container/30 hover:bg-primary-container/50 transition-colors"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {rows.map((r) => {
            const label =
              [r.year, r.make, r.model].filter(Boolean).join(" ") || r.vin;
            const photo = r.report_data?.photos?.[0];
            const price = r.report_data?.listing?.price;

            return (
              <Link
                key={r.vin}
                href={`/report/${r.vin}`}
                className="group block bg-surface-container-lowest rounded-2xl sm:rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-outline-variant/10 focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <div className="relative aspect-[16/9] bg-surface-container overflow-hidden">
                  {photo ? (
                    // Plain img — saved-report thumbnails can come from any
                    // dealer/CDN host, so we don't require whitelisting.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo}
                      alt={label}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/5 text-primary/40">
                      <Car className="w-10 h-10" />
                    </div>
                  )}
                  {price && (
                    <span
                      className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-on-secondary-container"
                      style={{ background: "var(--color-secondary-container)" }}
                    >
                      {price}
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">
                    {relativeTime(r.updated_at)}
                  </p>
                  <p className="font-headline font-bold text-on-surface text-sm sm:text-base leading-tight break-words mb-1">
                    {label}
                  </p>
                  <p className="font-mono text-[10px] sm:text-xs text-outline tracking-wider break-all mb-3">
                    VIN: {r.vin}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
                    Reopen report <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
