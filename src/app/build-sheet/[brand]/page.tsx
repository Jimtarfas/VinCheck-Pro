import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Check,
  Search,
  Factory,
  ChevronRight,
  ArrowRight,
  Lock,
  Zap,
  ClipboardList,
  Tag,
  MapPin,
  Cog,
  ScrollText,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";
import { BUILD_SHEET_BRANDS, findBuildSheetBrand } from "@/lib/build-sheets";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";

interface Props {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  return BUILD_SHEET_BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = findBuildSheetBrand(slug);
  if (!brand) return { title: "Build Sheet by VIN" };

  // Layout appends " | CarCheckerVIN" (~17c) — keep the stem tight so the
  // brand name + suffix stays inside Google's ~62c snippet.
  const title = `${brand.name} Build Sheet by VIN — Free Decoder`;
  const description = `Look up a ${brand.name} build sheet by VIN, free. Decode the ${brand.docName}: factory options, paint and interior codes, engine, transmission, and assembly plant from the original build record.`;

  return {
    title,
    description,
    keywords: [
      `${brand.name} build sheet`,
      `${brand.name} build sheet by VIN`,
      `${brand.name} factory options by VIN`,
      `${brand.name} option codes`,
      `${brand.name} paint code by VIN`,
      `${brand.name} VIN decoder`,
    ],
    alternates: hreflangAlternates(`/build-sheet/${brand.slug}`),
    openGraph: {
      title: `${brand.name} Build Sheet by VIN — ${brand.docName}`,
      description,
      url: `${SITE}/build-sheet/${brand.slug}`,
      type: "article",
      siteName: "CarCheckerVIN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand.name} Build Sheet by VIN`,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BrandBuildSheetPage({ params }: Props) {
  const { brand: slug } = await params;
  const brand = findBuildSheetBrand(slug);
  if (!brand) notFound();

  const url = `${SITE}/build-sheet/${brand.slug}`;

  // Single source of truth: FAQ rendered as accordions AND as FAQPage JSON-LD.
  const faqs = [
    {
      q: `What is a ${brand.name} build sheet?`,
      a: `A ${brand.name} build sheet is the ${brand.docName} — the factory record of how a single vehicle was originally specified. ${brand.summary.replace(/^A[n]? [^—]+—\s*/, "It is ")} It documents ${brand.contains.slice(0, 3).join(", ").toLowerCase()}, and more.`,
    },
    {
      q: `How do I find a ${brand.name} build sheet by VIN?`,
      a: `Enter the 17-character VIN in the form above. The VIN fixes the model year, assembly plant, and body style, which is what lets the ${brand.docName} decode correctly. You can find the VIN on the dashboard, the driver-side door jamb, the title, or the registration.`,
    },
    {
      q: `What do ${brand.name} option codes look like?`,
      a: `${brand.optionCodeFormat}`,
    },
    {
      q: `Where is the ${brand.name} build data located?`,
      a: `On a ${brand.name}, the build data is found in these places: ${brand.whereToFind.join("; ")}.`,
    },
    {
      q: `Why do ${brand.name} buyers and collectors check the build sheet?`,
      a: `The build record is how you confirm a factory option, package, or color was fitted at the factory rather than added later — which directly affects what a ${brand.name} is worth. ${brand.sourceName} is the authority that ${brand.sourceNote.charAt(0).toLowerCase() + brand.sourceNote.slice(1)}`,
    },
  ];

  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${brand.name} Build Sheet by VIN`,
    url,
    applicationCategory: "AutomotiveApplication",
    operatingSystem: "All",
    description: `Retrieve a ${brand.name} factory build record by VIN — the ${brand.docName} with option codes, paint and interior codes, engine, transmission, and assembly plant.`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${brand.name} Build Sheet by VIN — ${brand.docName}`,
    description: `How to read a ${brand.name} build record by VIN: the ${brand.docName}, factory option codes, paint and interior codes, and assembly data.`,
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Read a ${brand.name} Build Sheet by VIN`,
    description: `Decode a ${brand.name} factory build record from the VIN and the ${brand.docName}.`,
    totalTime: "PT3M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Enter the VIN",
        text: `Read the 17-character VIN from the dash, door jamb, or title and enter it. It anchors the model year, plant, and body style.`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: `Locate the ${brand.docName}`,
        text: `Find the build data: ${brand.whereToFind[0]}.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Decode the option and color codes",
        text: `${brand.optionCodeFormat}`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Verify against the factory authority",
        text: `For authenticated original-build confirmation, ${brand.sourceName} ${brand.sourceNote.charAt(0).toLowerCase() + brand.sourceNote.slice(1)}`,
      },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Build Sheet",
        item: `${SITE}/build-sheet`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${brand.name} Build Sheet`,
        item: url,
      },
    ],
  };

  const speakableLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".speakable-intro"],
    },
    url,
  };

  const TRUST_STATS = [
    { icon: Tag, value: brand.docName.split(" ")[0], label: "build record" },
    { icon: ClipboardList, value: "Option", label: "code decode" },
    { icon: Factory, value: "Plant", label: "& production data" },
    { icon: Search, value: "Free", label: "VIN lookup, no sign-up" },
  ];

  const HOW_STEPS = [
    {
      icon: Search,
      tag: "Step 1",
      title: `Enter the ${brand.name} VIN`,
      body: `Type the VIN from the dash, door jamb, title, or registration. It fixes the model year, assembly plant, and body style before you read the rest.`,
    },
    {
      icon: Tag,
      tag: "Step 2",
      title: `We tie it to the ${brand.docName}`,
      body: `The VIN points to the right reference so the build record's option, paint, and equipment codes decode correctly for that exact car.`,
    },
    {
      icon: ScrollText,
      tag: "Step 3",
      title: "Reconstruct the original spec",
      body: `The build record rebuilds the factory order: options, colors, drivetrain, and the plant it came from — the configuration the car left the line with.`,
    },
  ];

  const otherBrands = BUILD_SHEET_BRANDS.filter((b) => b.slug !== brand.slug);

  const INTERNAL_LINKS = [
    {
      href: "/build-sheet",
      label: "Build Sheet by VIN (All Makes)",
      desc: "The general factory build-sheet lookup covering every manufacturer.",
    },
    {
      href: "/vin-decoder",
      label: "VIN Decoder",
      desc: `Decode the ${brand.name} VIN to model year, plant, and production sequence.`,
    },
    {
      href: "/paint-code-lookup",
      label: "Paint Code Lookup",
      desc: `Confirm the exact ${brand.name} factory paint code for touch-up or restoration.`,
    },
    {
      href: "/window-sticker",
      label: "Window Sticker Maker",
      desc: "The consumer-facing Monroney view with options in plain language and MSRP.",
    },
    {
      href: "/vin-check",
      label: "Full VIN History Check",
      desc: "Title, accident, odometer, and recall records to pair with the factory origin.",
    },
    {
      href: "/classic-car-vin",
      label: "Classic Car VIN Decoder",
      desc: `For older ${brand.name} models with shorter VINs and era-specific plates.`,
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

      <article className="pb-16 bg-surface">
        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Build Sheet", href: "/build-sheet" },
                { label: brand.name },
              ]}
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <ClipboardList className="w-4 h-4" /> {brand.name} · {brand.eyebrow}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              {brand.name} Build Sheet by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Decode the {brand.docName}
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              {brand.summary} Start with the VIN to lock in the year and plant —
              it&apos;s free.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Look Up a {brand.name} Build Sheet by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter the VIN and we&apos;ll fix the year, plant, and body so the
                build record decodes correctly
              </p>
              <VinSearchForm size="lg" />
              <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> Free · No sign-up · Instant result
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {TRUST_STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center"
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                    <div className="text-lg sm:text-xl font-headline font-black text-white truncate">
                      {s.value}
                    </div>
                    <div className="text-[11px] text-white/65 leading-tight mt-0.5">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* ── How it works ─────────────────────────────────── */}
          <section className="py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How a {brand.name} Build Sheet Lookup Works
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              The VIN points you to the right reference; the {brand.docName} fills
              in the original factory configuration.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HOW_STEPS.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.title}
                    className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">
                      {m.tag}
                    </div>
                    <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {m.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Where to find it ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Where to Find {brand.name} Build Data
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              {brand.name} records the build in the {brand.docName}. Here is where
              that data lives and how to reach it.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <ol className="space-y-3">
                {brand.whereToFind.map((loc, i) => (
                  <li
                    key={loc}
                    className="flex gap-4 items-start rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
                  >
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black ${
                        i === 0 ? "bg-primary text-white" : "bg-primary/10 text-primary"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm sm:text-base text-on-surface font-medium leading-relaxed">
                        {loc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Cog className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    {brand.name} option-code format
                  </h3>
                </div>
                <p className="text-sm text-on-surface leading-relaxed">
                  {brand.optionCodeFormat}
                </p>
                <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                  <p className="text-xs font-bold text-on-surface mb-2">
                    Start the {brand.name} build lookup by VIN:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── What the record contains ─────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What a {brand.name} Build Record Shows
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              The {brand.docName} documents the car as it left the factory — far
              more detail than the window sticker ever showed the buyer.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {brand.contains.map((c) => (
                <div
                  key={c}
                  className="flex items-start gap-3 rounded-2xl border border-outline-variant bg-surface p-5"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                  </div>
                  <p className="text-sm text-on-surface font-medium leading-relaxed pt-1.5">
                    {c}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Mid CTA ──────────────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <ClipboardList className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Decode Your {brand.name}&apos;s Original Build
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Enter the VIN to lock in the year and plant, then read the{" "}
                {brand.docName} for the original options, colors, and equipment.
                Free, in seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── Tips ─────────────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              {brand.name} Build Sheet Tips
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              What buyers, collectors, and restorers should know before trusting
              a {brand.name} build record.
            </p>
            <div className="space-y-3">
              {brand.tips.map((tip) => (
                <div
                  key={tip}
                  className="flex gap-3 items-start rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
                >
                  <div className="w-9 h-9 rounded-xl bg-secondary-container/50 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-on-secondary-container" strokeWidth={3} />
                  </div>
                  <p className="text-sm text-on-surface leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Authority / source ───────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-3">
              {brand.name} Build Data — Sources & Authority
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-6 max-w-3xl leading-relaxed">
              <strong className="text-on-surface">{brand.sourceName}</strong>{" "}
              {brand.sourceNote} The references below are the authoritative public
              origins behind {brand.name} VIN, recall, and title data in the
              United States.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                {
                  href: "https://vpic.nhtsa.dot.gov/decoder/",
                  label: "NHTSA VIN Decoder",
                  note: `Federal reference decoder for ${brand.name} VIN structure.`,
                },
                {
                  href: "https://www.nhtsa.gov/recalls",
                  label: "NHTSA — Safety Recalls",
                  note: `Open ${brand.name} recall lookup by VIN.`,
                },
                {
                  href: "https://vehiclehistory.bja.ojp.gov/",
                  label: "NMVTIS — Bureau of Justice Assistance",
                  note: `Federal title-brand database covering every ${brand.name} across all 50 states.`,
                },
                {
                  href: "https://www.iihs.org/",
                  label: "IIHS — Safety Ratings",
                  note: `Independent crash-test results for modern ${brand.name} models.`,
                },
              ].map((s) => (
                <li
                  key={s.href}
                  className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    {s.label} ↗
                  </a>
                  <p className="mt-1.5 text-xs text-on-surface-variant leading-relaxed">
                    {s.note}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Other brands ─────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Build Sheets for Other Brands
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-6 max-w-3xl">
              Every manufacturer records the factory build differently. Jump to
              another brand&apos;s decoder.
            </p>
            <div className="flex flex-wrap gap-2">
              {otherBrands.map((b) => (
                <Link
                  key={b.slug}
                  href={`/build-sheet/${b.slug}`}
                  className="px-4 py-2 bg-surface text-on-surface text-sm rounded-xl border border-outline-variant hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all font-medium"
                >
                  {b.name} build sheet
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { href: "/ford-build-sheet", label: "Ford build sheet" },
                { href: "/gm-build-sheet", label: "GM build sheet" },
                { href: "/mopar-broadcast-sheet", label: "Mopar broadcast sheet" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-4 py-2 bg-surface text-on-surface text-sm rounded-xl border border-outline-variant hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all font-medium"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Link
              href="/build-sheet"
              className="inline-flex items-center gap-1.5 mt-6 text-primary font-semibold text-sm hover:text-primary/80 transition-colors"
            >
              View the all-makes build sheet lookup <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          {/* ── Internal links ───────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Tools for {brand.name} Owners
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              The build record is the starting point. These checks complete the
              picture on any {brand.name}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INTERNAL_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary group-hover:underline">
                      {l.label}
                    </div>
                    <div className="text-xs text-on-surface-variant mt-0.5">
                      {l.desc}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── VIN check banner ─────────────────────────────── */}
          <section className="py-10">
            <VinCheckBanner />
          </section>

          {/* ── FAQ ──────────────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              {brand.name} Build Sheet — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions {brand.name} owners and buyers ask most about the{" "}
              {brand.docName}.
            </p>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">
                      {f.q}
                    </span>
                    <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* ── Bottom CTA ───────────────────────────────────── */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Free · Instant · {brand.name} Build Codes
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Look Up a {brand.name} Build Sheet by VIN
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter the VIN to anchor the year and plant, then decode the{" "}
              {brand.docName} — factory options, paint and interior codes, and
              drivetrain.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free
            </div>
          </section>

          <RelatedChecks exclude="/build-sheet" />
        </div>
      </article>
    </>
  );
}
