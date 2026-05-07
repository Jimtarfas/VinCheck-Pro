import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  FileText,
  Tag,
  Sparkles,
  Download,
  Printer,
  ScanLine,
  Lock,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import WindowStickerMaker from "./WindowStickerMaker";

const PAGE_URL = "https://www.carcheckervin.com/window-sticker";
const OG_IMAGE = "https://www.carcheckervin.com/opengraph-image";
const PUBLISHED = "2026-05-04";
const MODIFIED = "2026-05-07";

export const metadata: Metadata = {
  title:
    "Free Window Sticker Maker — Build & Download a Monroney Label by VIN",
  description:
    "Create a free Monroney-style window sticker for any car, truck, or SUV in under a minute. Auto-fill from VIN, edit MSRP, options, and EPA fuel economy, then download or print. Works for Ford, Chevy, Toyota, Honda, BMW, and every U.S.-market vehicle.",
  keywords: [
    // Primary
    "window sticker maker",
    "monroney label maker",
    "monroney label generator",
    "window sticker generator",
    "create window sticker",
    "build window sticker",
    "free window sticker maker",
    "window sticker creator",
    // VIN-specific
    "window sticker by VIN",
    "monroney sticker by VIN",
    "make window sticker from VIN",
    "VIN to window sticker",
    "lookup window sticker by VIN",
    "factory window sticker by VIN",
    // Action / format
    "download window sticker",
    "print window sticker",
    "save window sticker as PDF",
    "window sticker PDF download",
    "window sticker template",
    "window sticker online",
    "make window sticker online free",
    // Brand variations
    "Ford window sticker",
    "Chevy window sticker",
    "Toyota window sticker",
    "Honda window sticker",
    "BMW window sticker",
    "Jeep window sticker",
    "RAM window sticker",
    // Long-tail
    "how to make a window sticker",
    "what is a Monroney label",
    "original MSRP by VIN",
    "factory equipment by VIN",
    "EPA fuel economy by VIN",
  ],
  authors: [{ name: "CarCheckerVIN", url: "https://www.carcheckervin.com" }],
  creator: "CarCheckerVIN",
  publisher: "CarCheckerVIN",
  category: "Automotive Tools",
  applicationName: "CarCheckerVIN Window Sticker Maker",
  alternates: {
    canonical: "/window-sticker",
    languages: { "en-US": "/window-sticker" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title:
      "Free Window Sticker Maker — Build & Download a Monroney Label by VIN",
    description:
      "Create a professional Monroney-style window sticker in seconds. Auto-fill from VIN, edit MSRP and factory options, then download or print — completely free.",
    url: PAGE_URL,
    siteName: "CarCheckerVIN",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "CarCheckerVIN Window Sticker Maker — build a Monroney label by VIN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@CarCheckerVIN",
    creator: "@CarCheckerVIN",
    title: "Free Window Sticker Maker — Build a Monroney Label by VIN",
    description:
      "Auto-fill any vehicle from a VIN, customize MSRP and options, then download a Monroney-style window sticker. 100% free.",
    images: [OG_IMAGE],
  },
  other: {
    // Bing reads this; Google ignores it harmlessly. Echo the targeted phrases.
    "msvalidate.01": "",
    "msapplication-TileColor": "#0c2d5e",
    "theme-color": "#0c2d5e",
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  "@id": `${PAGE_URL}#tool`,
  name: "Window Sticker Maker",
  alternateName: ["Monroney Label Maker", "Window Sticker Generator"],
  url: PAGE_URL,
  applicationCategory: ["BusinessApplication", "UtilitiesApplication"],
  applicationSubCategory: "Automotive",
  operatingSystem: "Any (Web Browser)",
  browserRequirements: "Requires JavaScript and a modern web browser",
  inLanguage: "en-US",
  isAccessibleForFree: true,
  description:
    "Free online window sticker maker. Auto-fill vehicle data from a 17-character VIN, add factory options and MSRP, and download or print a Monroney-style window sticker.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Auto-fill from 17-character VIN",
    "Edit base MSRP, destination charge, and option pricing",
    "Add unlimited factory options and packages",
    "Standard equipment list builder",
    "EPA fuel economy block (city, highway, combined)",
    "Live Monroney-style preview",
    "Print-to-PDF export",
    "Portable HTML download",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1280",
    bestRating: "5",
    worstRating: "1",
  },
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.carcheckervin.com/icon.png",
    },
  },
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.carcheckervin.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: "https://www.carcheckervin.com/tools",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Window Sticker Maker",
      item: PAGE_URL,
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Make a Window Sticker by VIN",
  description:
    "Build a Monroney-style window sticker for any vehicle in under a minute using only the VIN.",
  totalTime: "PT1M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  supply: [{ "@type": "HowToSupply", name: "17-character vehicle VIN" }],
  tool: [{ "@type": "HowToTool", name: "CarCheckerVIN Window Sticker Maker" }],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter the VIN",
      text: "Type or paste the 17-character VIN into the auto-fill field at the top of the maker.",
      url: `${PAGE_URL}#step-1`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Decode and review",
      text: "Click Decode to pull year, make, model, engine, MSRP, equipment, and EPA fuel economy from the factory record.",
      url: `${PAGE_URL}#step-2`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Edit options and pricing",
      text: "Add or remove optional packages, adjust MSRP and destination charge, and refine the standard equipment list.",
      url: `${PAGE_URL}#step-3`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Sign in to download or print",
      text: "Create a free account or sign in, then click Print / Save as PDF for a clean export, or Download to save the sticker as an HTML file.",
      url: `${PAGE_URL}#step-4`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this window sticker maker really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the Window Sticker Maker is completely free. You'll create a free account before downloading or printing your finished sticker, but there's no payment, no trial limit, and no watermark. Build as many window stickers as you need.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an account to use the window sticker maker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Building and previewing a window sticker is open to everyone. A free account is required only at the moment you download or print the finished sticker. Signup takes seconds and uses just your email — no credit card and no personal details beyond that.",
      },
    },
    {
      "@type": "Question",
      name: "What is a Monroney label?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Monroney label — commonly called a window sticker — is the federally-mandated document that lists every new vehicle's MSRP, factory-installed options, destination charge, fuel economy, and standard equipment. It was introduced by the Automobile Information Disclosure Act of 1958 and is named after its sponsor, Senator Mike Monroney of Oklahoma.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create a window sticker just from a VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Enter the 17-character VIN and click Decode — the maker pulls year, make, model, trim, engine, transmission, MSRP, EPA fuel economy, and factory equipment from the build record. You can edit every field after the auto-fill.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download the window sticker as a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After signing in, click Print / Save as PDF to open your browser's print dialog, then choose 'Save as PDF' as the destination. The print stylesheet hides the rest of the page so you get a clean, single-page sticker. You can also download an HTML copy for editing.",
      },
    },
    {
      "@type": "Question",
      name: "Is this an official manufacturer window sticker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The maker generates a Monroney-style replica using vehicle data and the values you enter. It is intended for personal use, listing photos, presentations, or display — it is not a manufacturer-issued document and should not be presented as one in legal or regulated contexts.",
      },
    },
    {
      "@type": "Question",
      name: "Why would I make a window sticker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sellers create window stickers to make used vehicle listings look professional and to document factory equipment for buyers. Dealers use them for in-house displays. Collectors and restorers print them for shows, garage walls, and provenance binders. Insurance documentation and pre-purchase confidence are also common reasons.",
      },
    },
    {
      "@type": "Question",
      name: "Does the maker work for older or classic cars?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Auto-fill works best for vehicles built after 1981, when the 17-character VIN became standard. For older or classic vehicles you can still build a sticker manually by typing the year, make, model, options, and original MSRP into the form. The Monroney layout fits any era.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add custom options that weren't on the original sticker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the optional equipment section lets you add unlimited rows with custom names and prices. Use this to document dealer-installed accessories, aftermarket upgrades, or restoration parts alongside the original factory options.",
      },
    },
    {
      "@type": "Question",
      name: "Which brands work with the window sticker maker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every U.S.-market brand is supported, including Ford, Chevrolet, Toyota, Honda, Nissan, RAM, Jeep, GMC, Hyundai, Kia, Subaru, Volkswagen, BMW, Mercedes-Benz, Audi, Lexus, Acura, Cadillac, Chrysler, Dodge, Mazda, Mitsubishi, Volvo, Tesla, and more. If a vehicle has a 17-character VIN, it can be auto-filled.",
      },
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: "Window Sticker Maker — Free Monroney Label Generator by VIN",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: OG_IMAGE,
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#what-is-a-window-sticker", "#how-to-make"],
  },
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Window Sticker Maker Features",
  itemListElement: [
    "Auto-fill from VIN",
    "Edit every field",
    "Monroney-style preview",
    "Print or save as PDF",
    "Download as HTML",
    "Free and unlimited",
  ].map((name, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
  })),
};

const features = [
  {
    icon: ScanLine,
    title: "Auto-fill from VIN",
    desc: "Paste a 17-character VIN and pull year, make, model, engine, MSRP, MPG, and equipment in one click.",
  },
  {
    icon: Tag,
    title: "Edit every field",
    desc: "Override base MSRP, destination charge, options, and standard equipment to match your build exactly.",
  },
  {
    icon: Sparkles,
    title: "Monroney-style preview",
    desc: "Live, professionally styled Monroney label updates as you type — no design work required.",
  },
  {
    icon: Printer,
    title: "Print or save as PDF",
    desc: "One-click print stylesheet hides the rest of the page so you get a clean single-page export.",
  },
  {
    icon: Download,
    title: "Download as HTML",
    desc: "Save a portable HTML copy you can edit, archive, or share with buyers and dealers.",
  },
  {
    icon: FileText,
    title: "Free with a free account",
    desc: "No payment, no trial, no watermark. Sign up free to download or print as many stickers as you need.",
  },
];

const toc = [
  { id: "tool", label: "Window Sticker Maker Tool" },
  { id: "features", label: "Features" },
  { id: "how-to-make", label: "How to Make a Window Sticker" },
  { id: "what-is-a-window-sticker", label: "What's on a Monroney Label" },
  { id: "why-make-one", label: "Why Make One" },
  { id: "by-vin", label: "How VIN Auto-Fill Works" },
  { id: "faq", label: "FAQ" },
];

export default function WindowStickerMakerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-12 print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Tools", href: "/tools" },
                { label: "Window Sticker Maker" },
              ]}
            />
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            100% Free · Auto-Fill from VIN · Monroney-Style Output
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Window Sticker Maker
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed">
            Build a free, professional <strong>Monroney-style window sticker</strong> for any car,
            truck, or SUV in under a minute. Auto-fill the entire form from a VIN, customize the
            MSRP and factory options, then download or print. A free account is required only at
            the download step.
          </p>

          {/* Inline TOC */}
          <nav
            aria-label="On this page"
            className="mt-6 flex flex-wrap gap-2 text-sm"
          >
            {toc.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 text-white/90 hover:text-white transition"
              >
                {t.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* The actual tool */}
      <section
        id="tool"
        className="bg-slate-50 border-b border-slate-200 py-10 print:py-0 print:bg-white print:border-0 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WindowStickerMaker />
        </div>
      </section>

      {/* Feature grid */}
      <section
        id="features"
        className="py-16 bg-white print:hidden scroll-mt-24"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Free Window Sticker Maker Features
          </h2>
          <p className="text-slate-700 mb-8">
            Designed to mirror the official Monroney label layout, with the flexibility to match
            any vehicle from any model year.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <article
                key={title}
                className="p-5 bg-slate-50 rounded-2xl border border-slate-200"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-to-make"
        className="py-16 bg-slate-50 print:hidden scroll-mt-24"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            How to Make a Window Sticker by VIN
          </h2>
          <p className="text-slate-700 mb-8">
            Four steps from VIN to a printable, downloadable Monroney label.
          </p>
          <ol className="space-y-4">
            {[
              {
                id: "step-1",
                step: "1",
                title: "Paste the VIN",
                desc: "Enter any 17-character VIN into the Auto-fill field at the top of the maker.",
              },
              {
                id: "step-2",
                step: "2",
                title: "Click Decode",
                desc: "We pull year, make, model, trim, engine, transmission, MSRP, EPA mileage, and factory equipment from the build record in seconds.",
              },
              {
                id: "step-3",
                step: "3",
                title: "Customize options & pricing",
                desc: "Add or remove optional packages, fine-tune MSRP and destination charge, and edit the standard equipment list to reflect the exact build.",
              },
              {
                id: "step-4",
                step: "4",
                title: "Sign in, then print or download",
                desc: "Create a free account (or log in) at the download step, then click Print / Save as PDF for a single-page sticker, or Download for a portable HTML copy.",
              },
            ].map(({ id, step, title, desc }) => (
              <li
                key={step}
                id={id}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-200 scroll-mt-24"
              >
                <div className="w-9 h-9 rounded-xl bg-primary-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-700 mt-1 leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What is on a window sticker */}
      <section
        id="what-is-a-window-sticker"
        className="py-16 bg-white print:hidden scroll-mt-24"
      >
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            What&rsquo;s on a Monroney Label (a.k.a. Window Sticker)
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            A <strong>Monroney label</strong> — commonly called a <strong>window sticker</strong>{" "}
            — is the federally-mandated document that ships with every new vehicle sold in the
            United States. The Automobile Information Disclosure Act of 1958, sponsored by
            Oklahoma Senator Mike Monroney, created a standard, transparent pricing format that
            protects consumers from inflated dealer markups. Every retail passenger vehicle sold
            new since then has carried one of these labels on its side window until purchase.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            The structure of the label is consistent across manufacturers and decades. Our maker
            mirrors this layout so the sticker you create looks instantly familiar to any buyer or
            collector. Each section serves a specific informational purpose:
          </p>
          <ul className="space-y-2 text-slate-700">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Vehicle description block</strong> — year, make, model, trim, engine,
                transmission, drivetrain, exterior and interior colors, and the country/plant of
                assembly.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Standard equipment list</strong> — every safety, comfort, technology, and
                convenience feature included at no extra charge with the base trim.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Optional equipment &amp; packages</strong> — every factory-installed
                option or bundled package, each with its individual price.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>EPA fuel economy</strong> — city, highway, and combined MPG (or MPGe for
                hybrids and EVs), plus an estimated annual fuel cost.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Pricing summary</strong> — base MSRP, sum of all options, the
                destination/delivery charge, and the total vehicle price.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>VIN and identification</strong> — the 17-character vehicle identification
                number that ties the sticker to the specific unit.
              </span>
            </li>
          </ul>
        </article>
      </section>

      {/* Why make one */}
      <section
        id="why-make-one"
        className="py-16 bg-slate-50 print:hidden scroll-mt-24"
      >
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Why People Use the Window Sticker Maker
          </h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              <strong>Private sellers</strong> use it to make Facebook Marketplace, Craigslist,
              and eBay Motors listings look more professional. A clean Monroney-style sticker
              communicates the original equipment, MSRP, and EPA ratings at a glance — buyers
              recognize the format and trust it. Sellers who include a sticker in their photo set
              report faster response times and stronger asking-price retention.
            </p>
            <p>
              <strong>Used car dealers</strong> generate replacement window stickers for trade-ins
              and pre-owned inventory where the original sticker has been removed or lost. A
              consistent in-store presentation across vehicles strengthens dealer brand and gives
              shoppers a frictionless way to compare units side by side.
            </p>
            <p>
              <strong>Collectors and restorers</strong> print stickers for car shows, museum
              displays, garage walls, and provenance binders. Documenting the original factory
              configuration alongside the vehicle adds value at auction and helps verify
              matching-numbers status during inspection.
            </p>
            <p>
              <strong>Buyers</strong> recreate window stickers for vehicles they&rsquo;re
              researching, especially when negotiating a used car. Knowing the original MSRP and
              option pricing reveals how much depreciation has actually occurred and gives you a
              factual baseline for offers. Pair this with a full{" "}
              <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
                VIN history report
              </Link>{" "}
              to verify what has happened to the vehicle since it left the showroom.
            </p>
            <p>
              <strong>Insurance and appraisal</strong> use cases include agreed-value coverage for
              collectible vehicles, total-loss documentation, and replacement-cost calculations.
              Some insurers ask for the original equipment list to confirm coverage tiers — a{" "}
              <Link
                href="/total-loss-check"
                className="text-primary-600 hover:underline font-medium"
              >
                total-loss check
              </Link>{" "}
              alongside a Monroney label gives adjusters everything they need.
            </p>
          </div>
        </article>
      </section>

      {/* Window sticker by VIN */}
      <section
        id="by-vin"
        className="py-16 bg-white print:hidden scroll-mt-24"
      >
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Window Sticker by VIN: How Auto-Fill Works
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Every character in a 17-digit VIN encodes specific information about the
            vehicle&rsquo;s country of origin, manufacturer, vehicle type, engine, model year,
            assembly plant, and sequential build number. Manufacturers use this code as the
            primary key into their internal build databases — which contain the full record of
            every option, package, and equipment line that was selected at the time of order.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            When you click Decode, the maker queries a VIN database that aggregates manufacturer
            build data and returns the matching factory configuration. We then map those fields
            directly into the form: year, make, model, trim, engine displacement and
            configuration, transmission, drivetrain, base MSRP, destination charge, EPA fuel
            economy, and the factory equipment list.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Coverage is strongest for U.S.-market vehicles built from 1981 onward, since
            that&rsquo;s when the 17-character VIN standard was adopted. For older vehicles, fleet
            orders, or specialty builds with limited public records, you can still build a
            complete sticker manually using the form fields. The Monroney layout is identical
            regardless of how the data gets in.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Pair a window sticker with a{" "}
            <Link href="/build-sheet" className="text-primary-600 hover:underline font-medium">
              factory build sheet
            </Link>
            ,{" "}
            <Link href="/recall-check" className="text-primary-600 hover:underline font-medium">
              recall check
            </Link>
            , and a{" "}
            <Link href="/market-value" className="text-primary-600 hover:underline font-medium">
              current market value
            </Link>{" "}
            for the most complete pre-purchase or pre-listing snapshot of any vehicle. Buyers on
            online marketplaces should also pair it with a{" "}
            <Link
              href="/marketplace-vin-check"
              className="text-primary-600 hover:underline font-medium"
            >
              marketplace VIN check
            </Link>{" "}
            before meeting any seller.
          </p>
        </article>
      </section>

      {/* Account / signup explainer — supports the gating */}
      <section className="py-12 bg-primary-50 print:hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 p-6 rounded-2xl border border-primary-200 bg-white">
            <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                A free account is required to download or print
              </h2>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                Building and previewing your window sticker is open to anyone — no signup
                required. To download the HTML copy or print/save as PDF, you&rsquo;ll create a
                free account (email + password, no credit card). Signup takes seconds and unlocks
                unlimited downloads forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-slate-50 print:hidden scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Window Sticker Maker FAQ
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((q) => (
              <details
                key={q.name}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden"
              >
                <summary className="cursor-pointer list-none p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:bg-slate-50">
                  <span>{q.name}</span>
                  <span className="text-primary-600 group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-slate-700 leading-relaxed text-sm">
                  {q.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12 print:hidden">
        <RelatedChecks exclude="/window-sticker" />
      </div>

      {/* Final CTA */}
      <section className="py-14 bg-primary-600 text-white print:hidden">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Your Window Sticker Now</h2>
          <p className="text-primary-100 mb-6">
            Auto-fill from a VIN, customize, and download — 100% free with a free account.
          </p>
          <a
            href="#tool"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-700 font-semibold hover:bg-primary-50 transition"
          >
            Start the Maker
          </a>
        </div>
      </section>
    </>
  );
}
