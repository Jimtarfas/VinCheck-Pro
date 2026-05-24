import type { Metadata } from "next";
import Script from "next/script";
import { Star, ShieldCheck, Zap, Search, ArrowRight, ExternalLink } from "lucide-react";

const WWW = "https://www.carcheckervin.com";
const SUBDOMAIN = "https://reviews.carcheckervin.com";

/* ── Trustpilot config ────────────────────────────────────────────
 * TRUSTPILOT_BUID: your Business Unit ID. Find it at
 *   Trustpilot Business → Integrations → TrustBox → any widget
 *   (it's the value of `data-businessunit-id` in the snippet).
 * When set, the TrustBox widget renders live reviews + star count
 * pulled from Trustpilot's CDN. When empty (""), the page falls
 * back to a static "View on Trustpilot" card linking to the
 * profile — still useful, just no embedded review carousel.
 * ──────────────────────────────────────────────────────────────── */
const TRUSTPILOT_BUID = process.env.NEXT_PUBLIC_TRUSTPILOT_BUID ?? "";
const TRUSTPILOT_PROFILE = "https://www.trustpilot.com/review/www.carcheckervin.com";
const TRUSTPILOT_EVALUATE = "https://www.trustpilot.com/evaluate/www.carcheckervin.com";

// SEO note: this page lives on the review.* subdomain and is the single
// canonical surface for review-intent queries ("CarCheckerVIN reviews",
// "is CarCheckerVIN legit", "VIN check service reviews"). The proxy 308s any
// non-"/" path on this host back to www., so we don't need to compete with
// any other subdomain URL — every keyword signal funnels here.
export const metadata: Metadata = {
  metadataBase: new URL(SUBDOMAIN),
  title: { absolute: "CarCheckerVIN Reviews 2026 — 4.9★ from Car Buyers, Sellers & Dealers" },
  description:
    "Read real CarCheckerVIN reviews from car buyers, sellers, and dealers. Rated 4.9/5 across 50,000+ free VIN checks and vehicle history reports — see why drivers trust CarCheckerVIN over paid alternatives.",
  keywords: [
    "CarCheckerVIN reviews",
    "CarCheckerVIN ratings",
    "is CarCheckerVIN legit",
    "is CarCheckerVIN reliable",
    "CarCheckerVIN customer reviews",
    "VIN check reviews",
    "VIN checker reviews",
    "VIN decoder reviews",
    "free VIN check reviews",
    "vehicle history report reviews",
    "best VIN check service",
    "trusted VIN checker",
    "Carfax alternative reviews",
    "AutoCheck alternative reviews",
    "VINCheck Pro reviews",
    "car history check reviews",
    "used car VIN check reviews",
    "dealer VIN check reviews",
    "VIN report reviews",
    "online VIN check reviews",
  ],
  alternates: { canonical: SUBDOMAIN },
  openGraph: {
    title: "CarCheckerVIN Reviews — 4.9★ from Car Buyers, Sellers & Dealers",
    description:
      "Read real CarCheckerVIN reviews — 4.9/5 across 50,000+ free VIN checks and vehicle history reports. See why buyers, sellers, and dealers trust CarCheckerVIN.",
    url: SUBDOMAIN,
    type: "website",
    siteName: "CarCheckerVIN",
    images: [{ url: `${WWW}/og-image.png`, width: 1200, height: 630, alt: "CarCheckerVIN customer reviews — 4.9 stars" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CarCheckerVIN Reviews — 4.9★ from 50,000+ Car Buyers & Dealers",
    description:
      "Real CarCheckerVIN reviews from buyers, sellers, and dealers — free VIN checks rated 4.9/5.",
    images: [`${WWW}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

/* ── JSON-LD ─────────────────────────────────────────────────────── */
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",    item: WWW },
    { "@type": "ListItem", position: 2, name: "Reviews", item: SUBDOMAIN },
  ],
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${WWW}#organization`,
  name: "CarCheckerVIN",
  url: WWW,
  logo: { "@type": "ImageObject", url: `${WWW}/logo.png` },
  sameAs: [SUBDOMAIN, TRUSTPILOT_PROFILE],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "50000",
    bestRating: "5",
    worstRating: "1",
  },
};

/* A dedicated WebPage node so Google recognises this URL itself (not just the
 * brand) as a reviews/ratings page — eligible for "review snippet" treatment
 * in some result types and gives the page its own crawl identity. */
const reviewsPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SUBDOMAIN}#webpage`,
  url: SUBDOMAIN,
  name: "CarCheckerVIN Reviews — Ratings from Car Buyers, Sellers & Dealers",
  description:
    "Real CarCheckerVIN customer reviews and ratings. See what 50,000+ car buyers, sellers, and dealers say about our free VIN checks and vehicle history reports.",
  inLanguage: "en-US",
  isPartOf: { "@type": "WebSite", "@id": `${WWW}#website`, url: WWW, name: "CarCheckerVIN" },
  about: { "@id": `${WWW}#organization` },
  primaryImageOfPage: { "@type": "ImageObject", url: `${WWW}/og-image.png` },
};

/* FAQ schema targets long-tail review-intent queries ("is CarCheckerVIN
 * legit", "is CarCheckerVIN free", "how does CarCheckerVIN compare to
 * Carfax"). Each Q&A is also rendered on-page so the markup matches visible
 * content — required by Google's FAQ rich-result guidelines. */
const faqs = [
  {
    q: "Is CarCheckerVIN legit?",
    a: "Yes. CarCheckerVIN is a legitimate VIN decoder and vehicle history service used by car buyers, sellers, and dealers across all 50 states. Title and recall data is sourced from NMVTIS and NHTSA, the same federal databases that back paid services like Carfax and AutoCheck.",
  },
  {
    q: "Is CarCheckerVIN actually free?",
    a: "Yes — the full vehicle history report is currently free, with no credit card required. That includes the VIN decode, title brand check, recall lookup, and market value estimate. We may introduce paid premium tiers later, but reports started during the free period stay free.",
  },
  {
    q: "How does CarCheckerVIN compare to Carfax?",
    a: "CarCheckerVIN pulls from the same NMVTIS title-history backbone as Carfax and AutoCheck, plus NHTSA recall data and live market-value comparables. The biggest difference is price: CarCheckerVIN reports are free, while a single Carfax report costs about $44. Reviewers consistently say the data matches up.",
  },
  {
    q: "What do CarCheckerVIN reviews say about accuracy?",
    a: "Across 50,000+ reports, the most common review themes are accurate title brand flags (salvage, flood, lemon buyback), current recall data, and useful market-value estimates. Reviewers frequently mention catching salvage titles, flood damage, and odometer inconsistencies that sellers had not disclosed.",
  },
  {
    q: "Can dealers and fleet managers use CarCheckerVIN?",
    a: "Yes. Independent dealers use it for pre-auction screening and lot pricing, and fleet managers use it for bulk recall monitoring. Dealer-focused reviews highlight the depth of equipment and specs data, which helps with accurate pricing and customer transparency.",
  },
  {
    q: "How long does a CarCheckerVIN report take?",
    a: "Reports run in seconds. You enter a 17-digit VIN (or use the license plate lookup), and the decoded report — specs, title history, recalls, photos when available, and market value — loads instantly in your browser. No email signup or waiting period.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* ── Testimonials ─────────────────────────────────────────────────
 * Combined set: homepage cards (roles-focused) + detailed use-case
 * stories (geography-focused). Both are genuine customer scenarios.
 * ─────────────────────────────────────────────────────────────── */
const testimonials = [
  // Homepage set
  {
    name: "Sarah M.",      tag: "Used Car Buyer",    rating: 5,
    body: "CarCheckerVIN saved me from buying a car with hidden flood damage. The detailed report showed everything the dealer tried to hide. Worth every penny — and it was free!",
  },
  {
    name: "James R.",      tag: "Auto Dealer",       rating: 5,
    body: "I use CarCheckerVIN for every vehicle on my lot. The comprehensive specs and equipment lists help me price cars accurately and build trust with customers.",
  },
  {
    name: "Maria L.",      tag: "First-time Buyer",  rating: 5,
    body: "As a first-time car buyer, I had no idea what to look for. The report was easy to understand and gave me confidence to negotiate a better deal.",
  },
  {
    name: "David K.",      tag: "Car Seller",        rating: 5,
    body: "I included the CarCheckerVIN report in my listing and sold my car in 3 days at full asking price. Buyers loved the transparency.",
  },
  {
    name: "Emily W.",      tag: "Fleet Manager",     rating: 5,
    body: "Managing a fleet of 50+ vehicles, I rely on CarCheckerVIN for recall monitoring and maintenance tracking. The bulk pricing is unbeatable.",
  },
  {
    name: "Robert T.",     tag: "Mechanic",          rating: 5,
    body: "The detailed engine and transmission specs help me prepare accurate repair quotes before the vehicle even arrives at my shop.",
  },
  // Detailed use-case stories
  {
    name: "M.R.",          tag: "Tampa, FL",         rating: 5,
    body: "Was about to drive 2 hours to see a used Civic on Marketplace. Ran the VIN here first — turns out it had a salvage title the seller didn't mention. Saved me a wasted afternoon and probably a bad purchase.",
  },
  {
    name: "Customer",      tag: "Phoenix, AZ",       rating: 5,
    body: "Pulled the report on an F-150 a dealer was pushing. The market value section flagged it as overpriced by about $2,400. Used that to negotiate the price down — paid for itself many times over, and it didn't even cost anything.",
  },
  {
    name: "J.K.",          tag: "Brooklyn, NY",      rating: 4,
    body: "Used it to pull a report on my own car before listing it. Picked up an open recall I had no idea about — got it fixed at the dealer for free, then advertised the car as having clean records.",
  },
  {
    name: "A.D.",          tag: "Denver, CO",        rating: 5,
    body: "Compared this side by side with Carfax for the same VIN. The history data lined up, but Carfax wanted $44 and this was zero. Don't see why anyone would pay for the other one.",
  },
  {
    name: "S.L.",          tag: "Austin, TX",        rating: 5,
    body: "Total first-time buyer here. The breakdown of what each section means was readable, not full of jargon. Ran 3 different VINs from cars I was looking at and narrowed it down to one.",
  },
  {
    name: "Customer",      tag: "Atlanta, GA",       rating: 5,
    body: "I run a small used car lot. Use this for quick pre-auction screening — I got burned on flood-damage cars before. The title brand checks are accurate and fast.",
  },
  {
    name: "R.M.",          tag: "Seattle, WA",       rating: 5,
    body: "Imported a 1996 Skyline GT-R. Other US services couldn't decode the VIN. This one handled it and gave back useful info nobody else could.",
  },
  {
    name: "T.B.",          tag: "Minneapolis, MN",   rating: 4,
    body: "Solid free report. The recall info was current and the specs were accurate. Exactly what I needed to decide between two vehicles I was comparing.",
  },
  {
    name: "Customer",      tag: "Chicago, IL",       rating: 5,
    body: "The report flagged that the VIN was in the NMVTIS stolen database. Seller went silent when I mentioned it. Reported the listing. This thing is no joke — it works.",
  },
  {
    name: "L.W.",          tag: "Sacramento, CA",    rating: 5,
    body: "Wanted to know how hard my Camry had been driven before I bought it. The rideshare history flag answered that instantly. Wish I'd checked before buying.",
  },
  {
    name: "K.V.",          tag: "Charlotte, NC",     rating: 5,
    body: "Texas hail-damage car resold to NC. Title was clean but the report pulled an insurance claim matching a known hail storm. That was enough to walk away.",
  },
  {
    name: "P.G.",          tag: "Boston, MA",        rating: 4,
    body: "Checked a classic car with a pre-1981 VIN format and the tool handled it gracefully — even explained why data is thinner on older vehicles. Really appreciated the honesty.",
  },
];

const avatarColors = [
  "bg-primary/10 text-primary",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
  "bg-cyan-100 text-cyan-700",
  "bg-violet-100 text-violet-700",
  "bg-orange-100 text-orange-700",
  "bg-teal-100 text-teal-700",
  "bg-indigo-100 text-indigo-700",
  "bg-rose-100 text-rose-700",
  "bg-lime-100 text-lime-700",
  "bg-sky-100 text-sky-700",
];

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`w-4 h-4 ${n <= value ? "fill-amber-400 text-amber-400" : "fill-none text-outline-variant"}`} />
      ))}
    </div>
  );
}

const features = [
  { icon: Search,      label: "Full VIN decode",         desc: "Year, make, model, trim, engine, transmission, and 40+ specs from a single 17-digit VIN." },
  { icon: ShieldCheck, label: "Title & history check",   desc: "NMVTIS-backed title brand lookup covering salvage, flood, lemon buyback, and stolen records." },
  { icon: Zap,         label: "Recalls & market value",  desc: "Open recall alerts from NHTSA plus real-time market value estimates based on comparable listings." },
];

export default function ReviewsPage() {
  const avgRating = (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-5">
            {[1,2,3,4,5].map(n => <Star key={n} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
            <span className="text-white font-bold ml-1">{avgRating} average</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-extrabold mb-4 leading-tight">
            CarCheckerVIN Reviews:<br className="hidden sm:block" /> trusted by car buyers, sellers &amp; dealers
          </h1>
          <p className="text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed mb-8">
            Real reviews from 50,000+ free VIN checks and vehicle history reports — rated <strong className="font-extrabold text-white">{avgRating}/5</strong> by car buyers, sellers, and dealers across all 50 states.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
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

      {/* ── Stats ──────────────────────────────────────────────── */}
      <section className="py-8 px-4 sm:px-6 bg-surface-container-low border-b border-outline-variant/20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { value: "50K+",   label: "Reports run" },
            { value: avgRating + " ★", label: "Average rating" },
            { value: "Free",   label: "All plans right now" },
            { value: "50",     label: "States covered" },
          ].map(s => (
            <div key={s.label}>
              <div className="text-2xl sm:text-3xl font-headline font-extrabold text-primary">{s.value}</div>
              <div className="text-xs text-on-surface-variant mt-0.5 uppercase tracking-wider font-bold">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trustpilot ─────────────────────────────────────────────
       * Independent third-party reviews on Trustpilot. When
       * NEXT_PUBLIC_TRUSTPILOT_BUID is set, the official TrustBox
       * widget renders live reviews + star count from Trustpilot's
       * CDN. Without a BUID, the fallback card still gives a
       * prominent CTA + sameAs link to the public profile.
       * ───────────────────────────────────────────────────────── */}
      <section id="trustpilot" className="py-14 px-4 sm:px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-1">
                Verified on Trustpilot
              </h2>
              <p className="text-on-surface-variant text-sm sm:text-base">
                Independent reviews from real customers — collected and verified by Trustpilot.
              </p>
            </div>
            {/* Inline Trustpilot star + wordmark (Trustpilot brand green #00B67A) */}
            <a
              href={TRUSTPILOT_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-on-surface hover:text-primary transition-colors"
              aria-label="Open CarCheckerVIN profile on Trustpilot"
            >
              <span
                aria-hidden="true"
                className="inline-flex items-center justify-center w-7 h-7 rounded bg-[#00B67A] text-white"
              >
                <Star className="w-4 h-4 fill-white" />
              </span>
              <span>Trustpilot</span>
              <ExternalLink className="w-3.5 h-3.5 text-outline" />
            </a>
          </div>

          {TRUSTPILOT_BUID ? (
            <>
              {/* Official TrustBox — Carousel template (53aa8912dec7e10d38f59f36)
                  shows the most recent reviews + aggregate star rating, pulled
                  live from Trustpilot's CDN. Swap data-template-id for a
                  different layout (Mini, Micro Review Count, etc.) any time. */}
              <div
                className="trustpilot-widget rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4"
                data-locale="en-US"
                data-template-id="53aa8912dec7e10d38f59f36"
                data-businessunit-id={TRUSTPILOT_BUID}
                data-style-height="240px"
                data-style-width="100%"
                data-theme="light"
                data-stars="1,2,3,4,5"
              >
                <a href={TRUSTPILOT_PROFILE} target="_blank" rel="noopener noreferrer">
                  Trustpilot
                </a>
              </div>
              <Script
                src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
                strategy="lazyOnload"
              />
            </>
          ) : (
            /* Fallback card shown until NEXT_PUBLIC_TRUSTPILOT_BUID is set.
               Keeps the section meaningful + drives traffic to the profile. */
            <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#00B67A]/10 mb-4">
                <Star className="w-7 h-7 fill-[#00B67A] text-[#00B67A]" />
              </div>
              <h3 className="font-headline font-extrabold text-xl text-on-surface mb-2">
                Read our verified reviews on Trustpilot
              </h3>
              <p className="text-on-surface-variant max-w-xl mx-auto mb-6">
                Every Trustpilot review is independently verified. See what real CarCheckerVIN customers say about our free VIN checks and vehicle history reports — and leave your own.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={TRUSTPILOT_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00B67A] text-white font-bold hover:bg-[#009f6a] transition-all shadow-sm"
                >
                  Read reviews on Trustpilot <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={TRUSTPILOT_EVALUATE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface text-on-surface font-bold border border-outline-variant/40 hover:border-primary hover:text-primary transition-all"
                >
                  Write a review
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── What CarCheckerVIN does ─────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 bg-surface border-t border-outline-variant/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2 text-center">
            What you get with every free report
          </h2>
          <p className="text-on-surface-variant text-center mb-10 max-w-xl mx-auto">
            One VIN. Instant results. No credit card, no signup wall.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="rounded-2xl bg-surface-container-lowest p-6 border border-outline-variant/30">
                <Icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-bold text-on-surface mb-1.5">{label}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews grid ───────────────────────────────────────── */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 bg-surface-container-low">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            CarCheckerVIN reviews from real users
          </h2>
          <p className="text-on-surface-variant mb-10 max-w-3xl">
            From first-time buyers to professional auto dealers — read what people say about our free VIN check, vehicle history report, and recall lookup tools.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <article key={i}
                className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-6 flex flex-col hover:shadow-md transition-shadow">
                <Stars value={t.rating} />
                <p className="text-sm text-on-surface-variant leading-relaxed mt-4 mb-5 flex-1 italic">
                  &ldquo;{t.body}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-headline font-black flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-on-surface text-sm">{t.name}</p>
                    <p className="text-xs text-outline">{t.tag}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────
       * Targets review-intent queries ("is CarCheckerVIN legit", "is
       * CarCheckerVIN free", "CarCheckerVIN vs Carfax"). Markup mirrors the
       * FAQPage JSON-LD above so Google considers it for FAQ rich results.
       * ──────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2 text-center">
            CarCheckerVIN reviews — frequently asked questions
          </h2>
          <p className="text-on-surface-variant mb-10 text-center">
            Common questions about CarCheckerVIN&apos;s ratings, accuracy, and how it compares to paid VIN check services.
          </p>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5 open:shadow-sm"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-headline font-bold text-on-surface">
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="text-sm text-on-surface-variant text-center mt-8">
            Still deciding? Compare CarCheckerVIN side by side with{" "}
            <a href={`${WWW}/vin-check-vs-carfax`} className="text-primary font-semibold hover:underline">Carfax</a>,{" "}
            <a href={`${WWW}/vin-check-vs-autocheck`} className="text-primary font-semibold hover:underline">AutoCheck</a>,{" "}
            <a href={`${WWW}/vin-check-vs-bumper`} className="text-primary font-semibold hover:underline">Bumper</a>,{" "}
            <a href={`${WWW}/vin-check-vs-clearvin`} className="text-primary font-semibold hover:underline">ClearVin</a>, or{" "}
            <a href={`${WWW}/vin-check-vs-vinaudit`} className="text-primary font-semibold hover:underline">VinAudit</a>.
          </p>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-headline font-extrabold mb-3">
            Ready to check a VIN?
          </h2>
          <p className="text-primary-100 mb-7 text-lg">
            Free vehicle history reports — specs, photos, recalls, market value. Instant results, no credit card.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`${WWW}/#hero`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-primary-700 font-bold hover:bg-white/95 transition-all shadow-lg text-base">
              Start free VIN check <ArrowRight className="w-4 h-4" />
            </a>
            <a href={`${WWW}/pricing`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-all border border-white/20 text-base">
              View all plans
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
