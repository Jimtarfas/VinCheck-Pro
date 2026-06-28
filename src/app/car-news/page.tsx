import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import {
  Siren,
  ShieldAlert,
  AlertTriangle,
  Clock,
  Lock,
  Wrench,
  Flame,
  Ban,
  ChevronRight,
  Zap,
  Rss,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";
import {
  getLatestRecalls,
  recallSeverity,
  formatRecallDate,
  CAR_NEWS_REVALIDATE,
  type Recall,
} from "@/lib/car-news";

const SITE = "https://www.carcheckervin.com";

/** Re-fetch the live recall feed at most once per hour. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: "Car News — Latest Vehicle Safety Recalls (NHTSA, Live)",
  },
  description:
    "The latest US vehicle safety recalls, updated from official NHTSA data. See newly recalled cars and trucks, the defect, the risk, the free dealer remedy — then check any VIN for open recalls in seconds.",
  keywords: [
    "car news",
    "latest car recalls",
    "new vehicle recalls",
    "NHTSA recalls",
    "recent car recalls",
    "safety recall news",
    "is my car recalled",
    "car recall list",
  ],
  alternates: { canonical: "/car-news" },
  openGraph: {
    title: "Car News — Latest Vehicle Safety Recalls (NHTSA, Live)",
    description:
      "Newly recalled cars and trucks from official NHTSA data: the defect, the safety risk, and the free dealer remedy. Check any VIN for open recalls.",
    url: `${SITE}/car-news`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car News — Latest Vehicle Safety Recalls (NHTSA, Live)",
    description:
      "The latest US vehicle safety recalls from official NHTSA data, updated hourly. Check any VIN for open recalls.",
  },
  robots: { index: true, follow: true },
};

const SEVERITY_STYLES: Record<
  ReturnType<typeof recallSeverity>["tone"],
  { wrap: string; badge: string; icon: typeof Siren }
> = {
  critical: {
    wrap: "border-red-200 bg-gradient-to-br from-red-50 to-surface-container-lowest",
    badge: "bg-red-100 text-red-700",
    icon: Ban,
  },
  high: {
    wrap: "border-amber-200 bg-gradient-to-br from-amber-50 to-surface-container-lowest",
    badge: "bg-amber-100 text-amber-700",
    icon: Flame,
  },
  normal: {
    wrap: "border-outline-variant bg-surface-container-lowest",
    badge: "bg-primary/10 text-primary",
    icon: ShieldAlert,
  },
};

function RecallCard({ recall }: { recall: Recall }) {
  const sev = recallSeverity(recall);
  const style = SEVERITY_STYLES[sev.tone];
  const Icon = style.icon;
  const vehicle = [recall.modelYear, recall.make, recall.model]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={`rounded-3xl border p-5 sm:p-6 ${style.wrap}`}>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider ${style.badge}`}
        >
          <Icon className="w-3.5 h-3.5" /> {sev.label}
        </span>
        <time className="text-xs font-semibold text-on-surface-variant inline-flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" /> {formatRecallDate(recall)}
        </time>
      </div>

      <h3 className="mt-3 font-headline text-lg sm:text-xl font-extrabold leading-tight text-on-surface">
        {vehicle || recall.manufacturer}
      </h3>
      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-primary">
        {recall.component}
      </p>

      {recall.summary && (
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant line-clamp-4">
          {recall.summary}
        </p>
      )}

      {recall.consequence && (
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50/70 border border-red-100 p-3">
          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed text-on-surface-variant">
            <span className="font-bold text-on-surface">Risk: </span>
            {recall.consequence}
          </p>
        </div>
      )}

      {recall.remedy && (
        <div className="mt-2 flex items-start gap-2 rounded-xl bg-green-50/70 border border-green-100 p-3">
          <Wrench className="w-4 h-4 text-green-700 flex-shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed text-on-surface-variant line-clamp-3">
            <span className="font-bold text-on-surface">Free remedy: </span>
            {recall.remedy}
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-3 flex-wrap border-t border-outline-variant/60 pt-3">
        <span className="text-[11px] text-on-surface-variant">
          NHTSA campaign{" "}
          <span className="font-bold text-on-surface">{recall.campaignNumber}</span>
        </span>
        <Link
          href="/recall-check"
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-extrabold text-white transition-colors hover:bg-primary-700"
        >
          <Lock className="w-3.5 h-3.5" /> Check your VIN
        </Link>
      </div>
    </article>
  );
}

export default async function CarNewsPage() {
  const recalls = await getLatestRecalls(24);
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const criticalCount = recalls.filter((r) => r.parkIt || r.parkOutSide).length;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Latest US Vehicle Safety Recalls",
    description:
      "The most recent vehicle safety recalls from the NHTSA database, updated hourly.",
    url: `${SITE}/car-news`,
    numberOfItems: recalls.length,
    itemListElement: recalls.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${[r.modelYear, r.make, r.model].filter(Boolean).join(" ")} — ${r.component}`,
    })),
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Car News — Latest Vehicle Safety Recalls",
    description:
      "Live feed of the latest US vehicle safety recalls from official NHTSA data, with defect, risk, and the free dealer remedy for each campaign.",
    url: `${SITE}/car-news`,
    isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: SITE },
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Car News", item: `${SITE}/car-news` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="pb-16 bg-surface">
        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Car News" }]} onDark />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Rss className="w-4 h-4" /> Live from NHTSA · Updated {lastUpdated}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Car News —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Latest Safety Recalls
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              The newest US vehicle safety recalls, pulled straight from the official
              NHTSA database. See which cars and trucks were just recalled, what the
              defect is, the safety risk, and the free dealer fix — then check your own
              VIN for open recalls in seconds.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Is your car on a recall list? Check by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — matched to NHTSA at the exact build range
              </p>
              <VinSearchForm size="lg" />
              <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> 256-bit encrypted · No personal data stored
              </p>
            </div>
          </div>
        </div>

        {/* ── Live recall feed ─────────────────────────────── */}
        <section
          aria-labelledby="recall-feed-heading"
          className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16"
        >
          <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider mb-3">
                <Siren className="w-3.5 h-3.5" /> Live recall feed
              </div>
              <h2
                id="recall-feed-heading"
                className="text-2xl sm:text-3xl font-headline font-extrabold text-primary"
              >
                Latest Vehicle Safety Recalls
              </h2>
              <p className="mt-2 text-sm sm:text-base text-on-surface-variant max-w-2xl">
                {recalls.length > 0
                  ? `${recalls.length} recent campaigns across major brands${
                      criticalCount > 0
                        ? `, including ${criticalCount} carrying a do-not-drive or fire-risk warning.`
                        : "."
                    }`
                  : "Recall data is briefly unavailable. Check any VIN directly using the search above."}
              </p>
            </div>
          </div>

          {recalls.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              {recalls.map((r) => (
                <RecallCard key={r.campaignNumber} recall={r} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-8 text-center">
              <ShieldAlert className="w-10 h-10 text-primary mx-auto mb-3" />
              <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                We couldn&apos;t reach the NHTSA recall feed just now. Run your VIN in
                the search box above to check it directly against NHTSA records.
              </p>
            </div>
          )}

          <p className="mt-5 text-xs text-on-surface-variant italic">
            Source: National Highway Traffic Safety Administration (NHTSA). Feed
            refreshes about every {Math.round(CAR_NEWS_REVALIDATE / 60)} minutes and
            shows recent campaigns for high-volume models. A recall not listed here may
            still apply to your vehicle — always confirm by VIN.
          </p>
        </section>

        {/* ── Mid CTA ──────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Zap className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              A recall is only half the story
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              Recalls are free to read, but title brands, accident damage, odometer
              rollbacks, and auction history aren&apos;t. Run one VIN check for the
              full picture before you buy.
            </p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        {/* ── Why it matters ───────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <section className="py-4 sm:py-6 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Why Recall News Matters When You&apos;re Buying Used
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                A safety recall is issued when a manufacturer or the{" "}
                <a
                  href="https://www.nhtsa.gov/recalls"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-primary underline underline-offset-2"
                >
                  National Highway Traffic Safety Administration (NHTSA)
                </a>{" "}
                finds a defect that creates an unreasonable safety risk. The automaker
                must fix it free — but the notice only reaches owners it can find, so
                used cars routinely carry open recalls the current driver never heard
                about.
              </p>
              <p>
                Following recall news tells you which models are having problems right
                now. But a headline only covers a model and year range; whether a
                specific car still has the repair outstanding comes down to its VIN.
                That&apos;s the gap a VIN recall check closes — it matches the exact
                17-character VIN against NHTSA and returns every open campaign on file.
              </p>
            </div>
          </section>

          {/* ── Related ──────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Go Deeper Than the Headlines
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              Recall news is one safety signal. These checks cover the records it
              connects to.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/recall-check", label: "VIN Recall Check", desc: "Match a VIN to open NHTSA campaigns." },
                { href: "/airbag-check", label: "Airbag Check", desc: "Takata and airbag-deployment history." },
                { href: "/accident-history-check", label: "Accident History", desc: "Collision and damage records." },
                { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Salvage and rebuilt title brands." },
                { href: "/odometer-check", label: "Odometer Check", desc: "Cross-check mileage for rollback." },
                { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the build behind the VIN." },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary group-hover:underline">{l.label}</div>
                    <div className="text-xs text-on-surface-variant mt-0.5">{l.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="py-10">
            <VinCheckBanner />
          </section>

          <RelatedChecks exclude="/car-news" />
        </div>
      </article>
    </>
  );
}
