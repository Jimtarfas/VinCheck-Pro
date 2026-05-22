import type { Metadata } from "next";
import { Star, ShieldCheck, Zap, Search, ArrowRight } from "lucide-react";

const WWW = "https://www.carcheckervin.com";
const SUBDOMAIN = "https://review.carcheckervin.com";

export const metadata: Metadata = {
  metadataBase: new URL(SUBDOMAIN),
  title: { absolute: "CarCheckerVIN Reviews — Trusted by Car Buyers & Dealers" },
  description:
    "See what car buyers, sellers, and dealers say about CarCheckerVIN. Free VIN checks and vehicle history reports trusted by thousands across the US.",
  alternates: { canonical: SUBDOMAIN },
  openGraph: {
    title: "CarCheckerVIN Reviews — Trusted by Car Buyers & Dealers",
    description:
      "See what car buyers, sellers, and dealers say about CarCheckerVIN. Free VIN checks and vehicle history reports trusted by thousands across the US.",
    url: SUBDOMAIN,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "CarCheckerVIN Reviews — Trusted by Car Buyers & Dealers",
    description:
      "See what car buyers, sellers, and dealers say about CarCheckerVIN.",
  },
  robots: { index: true, follow: true },
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "50000",
    bestRating: "5",
    worstRating: "1",
  },
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

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-5">
            {[1,2,3,4,5].map(n => <Star key={n} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
            <span className="text-white font-bold ml-1">{avgRating} average</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-extrabold mb-4 leading-tight">
            Trusted by car buyers,<br className="hidden sm:block" /> sellers, and dealers
          </h1>
          <p className="text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed mb-8">
            CarCheckerVIN gives you instant access to vehicle history, specs, recalls, and market values — completely free. Here&apos;s what people are saying.
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

      {/* ── What CarCheckerVIN does ─────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 bg-surface">
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
            What our users say
          </h2>
          <p className="text-on-surface-variant mb-10">
            From first-time buyers to professional dealers — real experiences, real stories.
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
