import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import {
  Octagon, Triangle, Diamond, Square, RectangleHorizontal, Circle,
  AlertTriangle, Ban, Info, Zap, ArrowRight, ShieldCheck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Road & Traffic Signs — Shapes, Colors & Meanings Explained (Complete Guide)",
  description:
    "A complete guide to U.S. road and traffic signs: what every sign shape and color means, and the three main categories — regulatory, warning, and guide signs — standardized nationwide under the federal MUTCD.",
  keywords: [
    "road signs",
    "traffic signs",
    "road traffic signs",
    "traffic sign meanings",
    "road sign shapes",
    "road sign colors",
    "regulatory signs",
    "warning signs",
    "guide signs",
    "what does a yellow road sign mean",
    "stop sign shape",
    "road signs and meanings",
  ],
  alternates: { canonical: "/road-traffic-signs" },
  openGraph: {
    title: "Road & Traffic Signs — Shapes, Colors & Meanings",
    description:
      "What every road sign shape and color means, plus the three main categories of traffic sign — regulatory, warning, and guide — standardized nationwide.",
    url: `${SITE}/road-traffic-signs`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Road & Traffic Signs — Shapes, Colors & Meanings",
    description:
      "A complete guide to U.S. road and traffic signs: shapes, colors, and the regulatory, warning, and guide sign categories.",
  },
  robots: { index: true, follow: true },
};

const SHAPES = [
  { icon: Octagon, title: "Octagon", body: "Reserved exclusively for STOP signs. The eight-sided shape is recognizable even when the lettering is obscured by snow or dirt, so you must come to a full stop." },
  { icon: Triangle, title: "Inverted triangle", body: "Always means YIELD. The downward-pointing triangle tells you to slow down and give the right-of-way to other traffic and pedestrians before proceeding." },
  { icon: Diamond, title: "Diamond", body: "A warning sign. Diamonds alert you to hazards or changing conditions ahead, such as a curve, merge, pedestrian crossing, or slippery surface." },
  { icon: RectangleHorizontal, title: "Rectangle (horizontal)", body: "Usually a guide sign — directions, distances, route markers, or services. Vertical rectangles are typically regulatory signs such as speed limits." },
  { icon: Square, title: "Pennant / pentagon & others", body: "A pennant (sideways triangle) marks no-passing zones; a five-sided pentagon marks school zones and crossings; a round sign means a railroad crossing is ahead." },
  { icon: Circle, title: "Round", body: "A round sign warns that a railroad crossing is ahead. When you see the round yellow advance-warning sign, prepare to stop for a train." },
];

const COLORS = [
  { swatch: "#DC2626", name: "Red", body: "Stop, yield, or prohibited. Red means you must stop or that an action is not allowed (do not enter, wrong way, no turn)." },
  { swatch: "#F59E0B", name: "Yellow", body: "General warning. Yellow signs caution you about conditions ahead — curves, hills, intersections, or pedestrian and school zones." },
  { swatch: "#16A34A", name: "Green", body: "Guidance and permitted movements. Green signs give directions, distances, and route information, or indicate a movement is allowed." },
  { swatch: "#2563EB", name: "Blue", body: "Motorist services. Blue signs point to rest areas, hospitals, gas, food, lodging, and other roadside services." },
  { swatch: "#EA580C", name: "Orange", body: "Construction and maintenance. Orange signs warn of work zones, detours, and temporary conditions where extra caution is required." },
  { swatch: "#78350F", name: "Brown", body: "Recreation and culture. Brown signs mark parks, historic sites, campgrounds, and other points of public interest." },
];

const CATEGORIES = [
  {
    icon: Ban,
    title: "Regulatory signs",
    body: "Regulatory signs tell you what you must or must not do — they carry the force of law. They include STOP and YIELD signs, speed limits, lane-use and turn restrictions, one-way and do-not-enter signs, and parking rules. Most are white with black or red lettering; ignoring one is a traffic violation.",
    examples: ["Stop", "Yield", "Speed limit", "Do not enter", "One way", "No turn on red"],
  },
  {
    icon: AlertTriangle,
    title: "Warning signs",
    body: "Warning signs alert you to hazards or changes in road conditions ahead so you can slow down and react in time. Most are yellow diamonds with black symbols — curves, merges, slippery-when-wet, deer crossings — while school and pedestrian warnings use a fluorescent yellow-green, and work-zone warnings use orange.",
    examples: ["Curve ahead", "Merge", "Pedestrian crossing", "Slippery road", "Stop ahead", "Deer crossing"],
  },
  {
    icon: Info,
    title: "Guide & information signs",
    body: "Guide signs help you navigate and find services. Green signs give directions, exit numbers, distances, and route markers; blue signs point to motorist services like rest areas and hospitals; brown signs mark parks and recreation. They inform rather than command.",
    examples: ["Route markers", "Exit signs", "Distance signs", "Rest area", "Hospital", "Recreation area"],
  },
];

const FAQS = [
  {
    question: "What are the three main types of road sign?",
    answer:
      "Road signs fall into three main categories: regulatory signs, which tell you what you must or must not do (stop, yield, speed limit); warning signs, which alert you to hazards ahead (curves, crossings, merges); and guide signs, which help you navigate and find services (route markers, exits, rest areas). In the United States these are standardized nationwide under the federal Manual on Uniform Traffic Control Devices (MUTCD).",
  },
  {
    question: "Why is the stop sign an octagon?",
    answer:
      "The STOP sign is the only sign that uses an eight-sided octagon shape, and it is reserved exclusively for stopping. The distinctive shape was chosen so drivers can recognize it instantly — even from behind, or when the red face and white lettering are covered by snow, dirt, or glare. Shape alone communicates the message.",
  },
  {
    question: "What does a yellow road sign mean?",
    answer:
      "Yellow is the standard color for general warning signs. A yellow sign — usually a diamond — tells you to use caution because of a condition ahead, such as a sharp curve, an intersection, a hill, a pedestrian crossing, or a slippery surface. A fluorescent yellow-green shade is used specifically for school zones, pedestrian, and bicycle warnings.",
  },
  {
    question: "What is the difference between a regulatory and a warning sign?",
    answer:
      "A regulatory sign carries the force of law — it tells you what you must do (stop, yield, obey the speed limit) or must not do (no turn, do not enter), and violating it is a traffic offense. A warning sign has no legal command; it simply alerts you to a hazard or change ahead so you can adjust your speed and be ready. Regulatory signs are usually white or red; warning signs are usually yellow or orange.",
  },
  {
    question: "Are road signs the same in every U.S. state?",
    answer:
      "Yes, to a very large degree. Traffic signs across the United States are standardized by the federal Manual on Uniform Traffic Control Devices (MUTCD), which sets the shapes, colors, symbols, and placement rules every state must follow. States can add a limited number of state-specific signs, but the core set — stop, yield, speed limit, warning diamonds — looks the same nationwide so drivers can read them anywhere.",
  },
  {
    question: "What do orange road signs mean?",
    answer:
      "Orange signs indicate construction, maintenance, and work zones. When you see orange, expect temporary conditions ahead — lane closures, detours, flaggers, reduced speed limits, or workers on the road — and slow down. Work-zone traffic fines are often doubled, and the changing layout makes extra caution essential.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Road & Traffic Signs — Shapes, Colors & Meanings",
  description:
    "A complete guide to U.S. road and traffic signs: what every sign shape and color means, and the three main categories — regulatory, warning, and guide signs — standardized nationwide under the federal MUTCD.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/road-traffic-signs` },
  datePublished: "2026-06-28",
  dateModified: new Date().toISOString().slice(0, 10),
  image: `${SITE}/opengraph-image`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Road & Traffic Signs", item: `${SITE}/road-traffic-signs` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: `${SITE}/road-traffic-signs`,
};

const categoriesListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Categories of Road & Traffic Sign",
  itemListElement: CATEGORIES.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.title,
  })),
};

export default function RoadTrafficSignsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categoriesListSchema) }} />

      <article className="pb-16 bg-surface">
        {/* Hero */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Road & Traffic Signs" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Octagon className="w-4 h-4" /> Road & Traffic Signs Guide
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Road & Traffic Signs —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>Shapes, Colors & Meanings</span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Every road sign tells you something through its shape and color before you even read
              the words. This guide breaks down what each shape and color means, and the three main
              categories of traffic sign — regulatory, warning, and guide — standardized nationwide
              under the federal Manual on Uniform Traffic Control Devices (MUTCD).
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-md">
              {[
                { icon: Ban, label: "Regulatory" },
                { icon: AlertTriangle, label: "Warning" },
                { icon: Info, label: "Guide" },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="bg-white/10 border border-white/15 rounded-xl px-3 py-4 text-center">
                    <Icon className="w-6 h-6 mx-auto mb-1.5 text-white/80" />
                    <div className="text-xs sm:text-sm font-headline font-black text-white">{c.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Sign shapes */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Road Sign Shapes Mean
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              Shape is the first clue a sign gives you. A few shapes are reserved for one meaning
              only, so you can react even before the message is readable:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SHAPES.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-5 h-5 text-primary" />
                      <h3 className="text-base font-headline font-extrabold text-primary">{t.title}</h3>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{t.body}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Sign colors */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Road Sign Colors Mean
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              Color is the second instant signal. Each color is tied to a type of message, so the
              moment you spot a sign you already know whether it commands, warns, or guides:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COLORS.map((c) => (
                <div key={c.name} className="flex items-start gap-3 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                  <span
                    className="w-9 h-9 rounded-lg flex-shrink-0 border border-black/10"
                    style={{ backgroundColor: c.swatch }}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-0.5">{c.name}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              The Three Categories of Traffic Sign
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              Every traffic sign does one of three jobs. Knowing the category tells you how to
              respond — whether the sign is the law, a heads-up, or directions.
            </p>
            <div className="space-y-4">
              {CATEGORIES.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-headline font-extrabold text-primary">{c.title}</h3>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-3">{c.body}</p>
                    <div className="flex flex-wrap gap-2">
                      {c.examples.map((e) => (
                        <span key={e} className="text-xs font-semibold rounded-full bg-primary/10 text-primary px-3 py-1">{e}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-secondary-container p-5">
              <p className="text-sm text-on-surface-variant leading-relaxed">
                <strong className="text-on-surface">Standardized nationwide. </strong>
                Because U.S. traffic signs follow the federal MUTCD, the shapes, colors, and
                symbols on this page look the same whether you&apos;re driving in California or
                Maine — which is exactly why learning them once works everywhere.
              </p>
            </div>
          </section>

          {/* Buying a car tie-in */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              New Driver? Buying Your First Car?
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              Learning the signs is step one. When it&apos;s time to buy the car you&apos;ll drive,
              run the 17-character VIN first — a free check confirms the title is clean, the
              mileage is honest, and there&apos;s no hidden lien or salvage history.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">Check a car by VIN</h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  Enter the VIN to see title brands, reported accidents, odometer history, and open
                  recalls before you buy. Free and instant.
                </p>
                <div className="rounded-xl bg-white p-4 border border-outline-variant">
                  <VinSearchForm size="sm" />
                </div>
              </div>
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  <strong className="text-on-surface">Verify the paperwork.</strong>{" "}
                  Before you sign a{" "}
                  <Link href="/bill-of-sale" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                    bill of sale
                  </Link>
                  , make sure the title is clean and the VIN matches the car.
                </p>
                <p>
                  <strong className="text-on-surface">Know the title.</strong>{" "}
                  Read the{" "}
                  <Link href="/vehicle-title" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                    vehicle title guide
                  </Link>{" "}
                  so you understand what every title brand means before money changes hands.
                </p>
                <p>
                  <strong className="text-on-surface">Register it right.</strong>{" "}
                  Once the car is yours, the{" "}
                  <Link href="/vehicle-registration" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                    registration guide
                  </Link>{" "}
                  walks through plates and DMV steps state by state.
                </p>
              </div>
            </div>
          </section>

          <section className="py-10">
            <VinCheckBanner />
          </section>

          {/* FAQ */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Road & Traffic Signs FAQ
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions drivers and learners ask most about reading road and traffic signs.
            </p>
            <div className="space-y-3">
              {FAQS.map((f) => (
                <details key={f.question} className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">{f.question}</span>
                    <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Free · Instant · All 50 states
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Ready to Buy? Check the VIN First.
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 17-character VIN to confirm a clean, lien-free title and honest mileage
              before you buy the car you&apos;ll learn to drive in.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <Link href="/vin-check" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline">
              Or get the full VIN history report
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          <RelatedChecks />
        </div>
      </article>
    </>
  );
}
