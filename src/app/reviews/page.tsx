import type { Metadata } from "next";
import { Star, ShieldCheck, Sparkles, ArrowRight, Info } from "lucide-react";
import { ORG_AUTHOR } from "@/lib/seo/author";

// The reviews subdomain is served by rewriting review.carcheckervin.com/ → /reviews
// in src/middleware.ts. The canonical URL for this page is the subdomain root,
// NOT www.carcheckervin.com/reviews (which 308s here so Google only indexes one
// version). Every CTA on this page deliberately links to the main www. origin —
// the subdomain is content-only, conversion happens on the main site.

const WWW = "https://www.carcheckervin.com";
const SUBDOMAIN = "https://review.carcheckervin.com";

export const metadata: Metadata = {
  metadataBase: new URL(SUBDOMAIN),
  title: {
    absolute: "Reviews & Testimonials — CarCheckerVIN",
  },
  description:
    "Reviews and testimonials for CarCheckerVIN — the free VIN check and vehicle history report service. We're now collecting verified customer reviews.",
  alternates: { canonical: SUBDOMAIN },
  openGraph: {
    title: "Reviews & Testimonials — CarCheckerVIN",
    description:
      "Reviews and testimonials for CarCheckerVIN — the free VIN check and vehicle history report service.",
    url: SUBDOMAIN,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reviews & Testimonials — CarCheckerVIN",
    description:
      "Reviews and testimonials for CarCheckerVIN — the free VIN check service.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD ──────────────────────────────────────────────────────────
 * Deliberately NOT emitting Review or AggregateRating schema while the
 * page contains sample testimonials. Schema.org structured data shouldn't
 * claim these as real consumer reviews. When verified Trustpilot reviews
 * are wired in, swap in Review + AggregateRating then.
 * ─────────────────────────────────────────────────────────────────── */
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: WWW },
    { "@type": "ListItem", position: 2, name: "Reviews", item: SUBDOMAIN },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": SUBDOMAIN,
  url: SUBDOMAIN,
  name: "CarCheckerVIN Reviews & Testimonials",
  description:
    "Reviews, testimonials, and customer feedback for CarCheckerVIN's free VIN check and vehicle history report service.",
  inLanguage: "en-US",
  isPartOf: { "@type": "WebSite", "@id": `${WWW}#website`, url: WWW, name: "CarCheckerVIN" },
  about: { "@type": "Organization", "@id": `${WWW}#organization`, name: "CarCheckerVIN" },
  publisher: ORG_AUTHOR,
};

/* ── Sample testimonials ──────────────────────────────────────────────
 * These are clearly labeled as samples — both on every visible card AND
 * in the page hero. They are NOT included in Review JSON-LD. They exist
 * so the page isn't empty during the launch period.
 * ─────────────────────────────────────────────────────────────────── */
type Sample = {
  initials: string;
  city: string;
  state: string;
  date: string;
  rating: number;
  context: string;
  body: string;
};

const samples: Sample[] = [
  {
    initials: "M.R.",
    city: "Tampa", state: "FL",
    date: "2026-04-12", rating: 5,
    context: "Looking at a 2018 Honda Civic",
    body: "Was about to drive 2 hours to see a used Civic on Marketplace. Ran the VIN here first — turns out it had a salvage title the seller didn't mention. Saved me a wasted afternoon and probably a bad purchase. Free is a wild price for what this actually shows.",
  },
  {
    initials: "Customer in Phoenix",
    city: "Phoenix", state: "AZ",
    date: "2026-04-03", rating: 5,
    context: "Buying a 2020 F-150",
    body: "Pulled the report on a Ford F-150 a dealer was trying to push. The market value section flagged it as overpriced by about $2,400 vs comparable trim/mileage. Used that to negotiate the price down — paid for itself many times over and it didn't even cost anything.",
  },
  {
    initials: "J.K.",
    city: "Brooklyn", state: "NY",
    date: "2026-03-28", rating: 4,
    context: "Checking my own car before selling",
    body: "Used it to pull a report on my own car before listing it. Picked up an open recall I had no idea about — got it fixed at the dealer (free), then was able to advertise the car as having clean records. Genuinely useful tool. Photos section was a bit hit-or-miss for my year/trim but everything else was solid.",
  },
  {
    initials: "A.D.",
    city: "Denver", state: "CO",
    date: "2026-03-21", rating: 5,
    context: "Off-lease return decision",
    body: "Compared this side by side with Carfax for the same VIN. The history data lined up, but Carfax wanted $44 and this was zero. The mileage rollback alert is what I was checking for and both flagged the same thing. Don't see why anyone would pay for the other one.",
  },
  {
    initials: "S.L.",
    city: "Austin", state: "TX",
    date: "2026-03-14", rating: 5,
    context: "First-time buyer",
    body: "Total first-time buyer here. The breakdown of what each section means was actually readable, not full of jargon. Made the recall section super easy to understand. Ran 3 different VINs from cars I was looking at, narrowed it down to one.",
  },
  {
    initials: "Customer in Atlanta",
    city: "Atlanta", state: "GA",
    date: "2026-03-05", rating: 5,
    context: "Wholesale dealer",
    body: "I run a small used car lot. Use this for quick pre-auction screening — burned too much money on cars with hidden flood damage from Hurricane Ian. The title brand checks are accurate and fast. Tried the 10-pack and it just works.",
  },
  {
    initials: "R.M.",
    city: "Seattle", state: "WA",
    date: "2026-02-26", rating: 5,
    context: "JDM import check",
    body: "Imported a 1996 Skyline GT-R last year. Tried running the JDM-format VIN on a few US services and got nothing. This one actually handles 17-digit AND chassis-code VINs. Got back useful info nobody else gave me.",
  },
  {
    initials: "T.B.",
    city: "Minneapolis", state: "MN",
    date: "2026-02-19", rating: 4,
    context: "Looking at a 2017 Subaru",
    body: "Solid free report. The only thing missing for me was a detailed odometer history graph like the paid services have — I could see the latest reading but not the over-time data. Otherwise everything checked out and the recall info was current.",
  },
  {
    initials: "Customer in Chicago",
    city: "Chicago", state: "IL",
    date: "2026-02-11", rating: 5,
    context: "Avoided a stolen vehicle",
    body: "Came up clean on the title check but the report also flagged that the VIN was reported in the NMVTIS stolen database. Seller went silent when I mentioned it. Reported the listing. This thing is no joke — it works.",
  },
  {
    initials: "P.G.",
    city: "Boston", state: "MA",
    date: "2026-02-02", rating: 3,
    context: "Classic car check",
    body: "I tried it on a 1979 Camaro — the VIN format from pre-1981 isn't 17 digits and the tool handled it but the data was thin (which is expected for that era, the records just don't exist). Helpful that the page actually explained why. Three stars because for older classics there isn't much it can do.",
  },
  {
    initials: "L.W.",
    city: "Sacramento", state: "CA",
    date: "2026-01-24", rating: 5,
    context: "Rideshare driver",
    body: "Drive for Uber. Wanted to verify the prior owner had used my Camry for rideshare too — wanted to know how much hard mileage the car had really seen. The rideshare history check flagged it. Wish I'd known before I bought.",
  },
  {
    initials: "K.V.",
    city: "Charlotte", state: "NC",
    date: "2026-01-17", rating: 5,
    context: "Hail damage flag",
    body: "Texas hail-damage car that had been resold up to NC. Title was clean but the report pulled an insurance claim record from May 2023 that matched a known hail storm. That was enough to walk away. Free service, real info.",
  },
];

const avg = (samples.reduce((s, r) => s + r.rating, 0) / samples.length).toFixed(1);

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-4 h-4 ${n <= value ? "fill-amber-400 text-amber-400" : "fill-none text-outline-variant"}`}
        />
      ))}
    </div>
  );
}

function fmtDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

export default function ReviewsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-20 pb-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <a href={WWW} className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-4">
            ← Back to CarCheckerVIN
          </a>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-5 text-on-secondary-container"
            style={{ background: "var(--color-secondary-container)" }}>
            <Sparkles className="w-3.5 h-3.5" /> Reviews Page Launch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-extrabold mb-4 leading-tight">
            What people say about CarCheckerVIN
          </h1>
          <p className="text-lg sm:text-xl text-primary-100 max-w-3xl leading-relaxed">
            Real customer reviews from buyers, sellers, and dealers who use our free VIN check to avoid bad used-car purchases.
            <span className="block mt-3 text-white/95">
              <strong>We&apos;re currently collecting verified reviews via Trustpilot.</strong> The testimonials below are <strong>sample testimonials</strong> illustrating how our service is used — not consumer reviews. We&apos;ll replace them with verified Trustpilot reviews as soon as enough have been collected.
            </span>
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <a href={`${WWW}/#hero`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary-700 font-bold hover:bg-white/95 transition-all shadow-lg">
              Run a free VIN check <ArrowRight className="w-4 h-4" />
            </a>
            <a href={`${WWW}/pricing`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-all border border-white/20">
              See pricing
            </a>
          </div>
        </div>
      </section>

      {/* ── Sample disclosure banner ───────────────────────────────── */}
      <section className="bg-amber-50 border-y-2 border-amber-200 px-4 sm:px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900 leading-relaxed">
            <strong>Transparency note:</strong> The 12 testimonials shown on this page are <strong>sample testimonials</strong> written to illustrate how customers use CarCheckerVIN. They are <strong>not real consumer reviews</strong>. Verified reviews from our Trustpilot profile will replace these once collected.
            We chose this honest interim approach over publishing fake reviews, in line with the FTC&apos;s 2024 rule on consumer reviews (16 CFR Part 465).
          </div>
        </div>
      </section>

      {/* ── Headline stats ─────────────────────────────────────────── */}
      <section className="py-10 px-4 sm:px-6 bg-surface-container-low">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Sample rating", value: `${avg} ★`, sub: "across 12 samples" },
            { label: "Service launched", value: "2025", sub: "delaware-based" },
            { label: "VIN reports", value: "Free", sub: "limited-time" },
            { label: "Data source", value: "NMVTIS", sub: "+ auto.dev" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-surface-container-lowest p-5 border border-outline-variant/30">
              <div className="text-2xl sm:text-3xl font-headline font-extrabold text-primary">{s.value}</div>
              <div className="text-xs uppercase tracking-wider text-on-surface-variant mt-1 font-bold">{s.label}</div>
              <div className="text-xs text-outline mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sample testimonial cards ───────────────────────────────── */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
            <div>
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary">
                Sample testimonials
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Twelve scenarios showing how CarCheckerVIN is used — clearly labeled samples, not real reviews.
              </p>
            </div>
            <a href={`${WWW}/#hero`} className="text-sm font-bold text-primary hover:underline inline-flex items-center gap-1">
              Try it on a real VIN <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {samples.map((r, i) => (
              <article key={i} className="relative rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-5 flex flex-col">
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-100 text-amber-900">
                  Sample
                </span>
                <Stars value={r.rating} />
                <div className="text-xs text-outline mt-2 mb-3 flex items-center gap-2">
                  <span className="font-bold text-on-surface">{r.initials}</span>
                  <span>·</span>
                  <span>{r.city}, {r.state}</span>
                  <span>·</span>
                  <span>{fmtDate(r.date)}</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-primary font-bold mb-2">
                  Context: {r.context}
                </p>
                <p className="text-sm text-on-surface leading-relaxed flex-1">
                  &ldquo;{r.body}&rdquo;
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why no Trustpilot widget yet ────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 bg-surface-container-low">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            Why isn&apos;t there a Trustpilot widget here yet?
          </h2>
          <div className="space-y-4 text-on-surface leading-relaxed">
            <p>
              Honest answer: we&apos;re a new service (launched 2025) and we&apos;re in the process of collecting verified Trustpilot reviews from real customers. Publishing fake reviews to fill the gap isn&apos;t something we&apos;re willing to do — both because it&apos;s prohibited by the FTC&apos;s 2024 rule on consumer reviews and because it&apos;d break trust the moment someone noticed.
            </p>
            <p>
              The sample testimonials above are clearly labeled as samples and exist to illustrate the kinds of situations where a free VIN check matters. They&apos;re not in our structured data (the <code className="font-mono text-xs bg-surface-container px-1.5 py-0.5 rounded">Review</code> JSON-LD schema), they&apos;re not submitted to Google as if they were real reviews, and they will be removed once we have verified Trustpilot reviews to show in their place.
            </p>
            <p>
              <strong>If you&apos;ve used CarCheckerVIN and want to help</strong> — once our Trustpilot profile is live (in the next few weeks), we&apos;ll add a button here so you can leave a verified review. We&apos;ll never offer payment, discounts, or anything else in exchange for a positive review.
            </p>
          </div>
        </div>
      </section>

      {/* ── Trust signals ───────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-8 text-center">
            What CarCheckerVIN gives you
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck, title: "NMVTIS-backed data", body: "Title brands, theft records, and salvage events come from the federal National Motor Vehicle Title Information System." },
              { icon: Sparkles,    title: "Free during launch", body: "Every plan — single, 3-pack, 5-pack, 10-pack — is $0 during the limited-time launch promotion. No credit card." },
              { icon: Star,        title: "All 50 states",      body: "State-specific lemon laws, registration data, and title formats across the US — plus 30+ car brands." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl bg-surface-container-lowest p-6 border border-outline-variant/30">
                <Icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-bold text-on-surface mb-1.5">{title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-headline font-extrabold mb-3">
            See for yourself
          </h2>
          <p className="text-primary-100 mb-7">
            Enter any 17-digit VIN — get a full vehicle history report in seconds.
            No credit card. No signup wall.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`${WWW}/#hero`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-primary-700 font-bold hover:bg-white/95 transition-all shadow-lg">
              Start free VIN check <ArrowRight className="w-4 h-4" />
            </a>
            <a href={`${WWW}/pricing`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-all border border-white/20">
              See pricing
            </a>
          </div>
          <p className="text-xs text-white/70 mt-6">
            All actions on this page link to{" "}
            <a href={WWW} className="underline hover:text-white">www.carcheckervin.com</a>{" "}
            — the official CarCheckerVIN website.
          </p>
        </div>
      </section>
    </>
  );
}
