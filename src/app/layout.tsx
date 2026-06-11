import type { Metadata } from "next";
import { Manrope, Inter, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import Header from "@/components/Header";
import ConditionalFooter from "@/components/ConditionalFooter";
import ChatWidgetMount from "@/components/ChatWidgetMount";
import SocialProofMount from "@/components/SocialProofMount";
import Analytics from "@/components/Analytics";
import "./globals.css";

const GA_ID = "G-7HL13B05JH";
// Google Tag Manager container — loads tags (GA, conversion pixels, etc.)
// without further code changes. Hardcoded like GA_ID since it's a public id.
const GTM_ID = "GTM-NR6PJFQQ";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  // 700/800 added for the pricing figures (.price) — clean, professional
  // tabular numerals instead of the synthesized Manrope "black" weight.
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // mono is rarely above-the-fold; saves a network round-trip
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.carcheckervin.com"),
  title: {
    default: "Free VIN Check & Decoder — Vehicle History Reports",
    template: "%s | CarCheckerVIN",
  },
  description:
    "Free VIN check and decoder. Get instant vehicle history reports with full specs, real photos, recalls, market values, and ownership data.",
  // Kept short and unique. Google has ignored meta-keywords since 2009 and
  // long stuffed lists are a quality-signal liability with Bing/Yandex.
  // Princeton GEO research (2024) shows keyword stuffing REDUCES AI-search
  // citation rate by ~10%. We keep only the core intent buckets — branded,
  // primary action, and category descriptor. Long-tail variations live in
  // the description, headings, and body copy where they actually count.
  keywords: [
    "VIN check",
    "VIN decoder",
    "vehicle history report",
    "free VIN check",
    "NMVTIS",
    "CarCheckerVIN",
    "Carfax alternative",
  ],
  authors: [{ name: "CarCheckerVIN" }],
  creator: "CarCheckerVIN",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CarCheckerVIN",
    title: "Free VIN Check & Decoder — Vehicle History Reports",
    description: "Free VIN check and decoder. Get instant vehicle history reports with full specs, real photos, recalls, market values, and ownership data.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free VIN Check & Decoder — CarCheckerVIN",
    description: "Free VIN check and decoder. Instant vehicle history reports with specs, real photos, recalls, market values, and ownership data.",
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "/" },
  verification: {
    yandex: "7131d6ab57cf4219",
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const SITE = "https://www.carcheckervin.com";

  // When the reviews subdomain serves this layout, the global Header's logo
  // should point back to the canonical www. site instead of "/", which would
  // otherwise keep the user trapped on the reviews-only subdomain.
  const h = await headers();
  const host = h.get("host")?.toLowerCase() ?? "";
  const isReviewSubdomain = host === "reviews.carcheckervin.com";
  const logoHref = isReviewSubdomain ? SITE : "/";

  // The app. subdomain serves the standalone ClearVin checkout flow
  // (/order/* via proxy rewrite). It supplies its own minimal header
  // and compliance footer (see src/app/order/layout.tsx) so we skip
  // the marketing Header + Footer entirely on that host. usePathname()
  // returns the original "/" URL (not the rewritten /order), which is
  // why the client-side check alone doesn't catch it — the host check
  // here is authoritative.
  const isAppSubdomain = host === "app.carcheckervin.com";

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}#organization`,
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.svg`, width: 280, height: 56 },
    description: "Trusted vehicle history reports and VIN decoding for car buyers, sellers, and dealers.",
    foundingDate: "2025",
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: "+15642123985",
      email: "contact@carcheckervin.com",
      contactType: "customer support",
      areaServed: "US",
      availableLanguage: ["English"],
      hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" },
    }],
    sameAs: [
      "https://reviews.carcheckervin.com",
      // Trustpilot profile — third-party verified-reviews surface. Google
      // and Bing both treat sameAs links to established review platforms
      // (Trustpilot, BBB, G2) as strong brand-identity verification.
      "https://www.trustpilot.com/review/www.carcheckervin.com",
    ],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}#website`,
    url: SITE,
    name: "CarCheckerVIN",
    publisher: { "@id": `${SITE}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE}/report/{vin}` },
      "query-input": "required name=vin",
    },
    inLanguage: "en-US",
  };

  // NOTE: Google's review-snippet policy lists the supported parent types as
  // Book, Course, Event, HowTo, LocalBusiness, MediaObject, Movie, Product,
  // Recipe, SoftwareApplication. `Service` is NOT on that list, so an
  // aggregateRating attached here can trigger a "Misleading structured data"
  // manual action. The Product schema on the homepage carries the rating in
  // a policy-compliant location instead.
  //
  // Promotional language ("Limited-Time Free", "Sale", percentage off, etc.)
  // is also explicitly disallowed inside structured-data `name` fields per
  // Google's Offer guidelines — the price field ("0") already communicates
  // free, and a customer-facing promo string belongs in the description.
  // ── Service = the headline offering ──────────────────────────────────────
  // CarCheckerVIN is fundamentally a vehicle history reporting SERVICE; the
  // SoftwareApplication below is just the tool that delivers it. We elevate
  // Service in three ways:
  //   1. Inject this script BEFORE webAppLd (Google reads top-down).
  //   2. Reference the deliverable Product (#vehicle-history-report) so the
  //      Service is concretely tied to what users actually receive.
  //   3. Use `category` to give the entity a clean industry label that maps
  //      to Google's business taxonomy.
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}#service`,
    // Keep "VIN Check" in the name — it's the dominant search query users
    // actually type. Dropping it for the cleaner-sounding "Vehicle History
    // Report Service" would lose direct keyword anchoring in the entity
    // graph. @type already says "Service", so the word doesn't need to live
    // in the name field.
    name: "VIN Check & Vehicle History Report",
    serviceType: "Vehicle History Report",
    category: "Automotive Information Service",
    provider: { "@id": `${SITE}#organization` },
    isPartOf: { "@id": `${SITE}#website` },
    areaServed: { "@type": "Country", name: "United States" },
    description: "Vehicle history reporting service: instant VIN decoding plus comprehensive history reports including title checks, accident history, theft records, odometer verification, recalls, and market value.",
    // The Service produces this concrete deliverable — the report customers
    // actually receive. Defined in src/app/page.tsx as a Product entity.
    // `itemOffered` resolves through the cross-file @id reference.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "CarCheckerVIN Report Plans",
      itemListElement: [
        { "@type": "Offer", name: "Free VIN Decode", price: "0", priceCurrency: "USD", description: "Year, make, model, engine, transmission and basic specs.", availability: "https://schema.org/InStock", itemOffered: { "@id": `${SITE}/#vehicle-history-report` } },
        { "@type": "Offer", name: "Premium Vehicle History Report", price: "0", priceCurrency: "USD", description: "Full report with photos, equipment, recalls, market value and ownership history. Free during the current launch promotion.", availability: "https://schema.org/InStock", itemOffered: { "@id": `${SITE}/#vehicle-history-report` } },
      ],
    },
  };

  // Declares the canonical primary navigation to Google. Order, hrefs, and
  // names must match the navLinks array in src/components/Header.tsx — both
  // are the same signal expressed in HTML vs. JSON-LD. This is the strongest
  // technical input Google uses when deciding which sub-pages to surface as
  // sitelinks under our homepage SERP result.
  const navLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE}#primary-nav`,
    name: "Primary navigation",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: [
      { "@type": "SiteNavigationElement", position: 1, name: "VIN Check", url: `${SITE}/vin-check`,             description: "Free VIN check and decoder with full vehicle history report." },
      { "@type": "SiteNavigationElement", position: 2, name: "Pricing",   url: `${SITE}/pricing`,                description: "VIN check pricing — single, 3-pack, 5-pack and pro bundles." },
      { "@type": "SiteNavigationElement", position: 3, name: "Reviews",   url: "https://reviews.carcheckervin.com", description: "Verified customer reviews and ratings for CarCheckerVIN." },
      { "@type": "SiteNavigationElement", position: 4, name: "Guides",    url: `${SITE}/guides`,                 description: "Long-form guides on VINs, used-car buying, and vehicle fraud." },
      { "@type": "SiteNavigationElement", position: 5, name: "Blog",      url: `${SITE}/blog`,                   description: "CarCheckerVIN blog — news, deep dives, and how-tos." },
      { "@type": "SiteNavigationElement", position: 6, name: "About",     url: `${SITE}/about`,                  description: "About CarCheckerVIN — data sources, team, and mission." },
    ],
  };

  // Use `SoftwareApplication` (Google-supported for review snippets) rather
  // than `WebApplication` (a subtype that is NOT on the rich-results allowed
  // list). The aggregateRating that lives here is backed by testimonials
  // rendered in the <Reviews /> component on the homepage, which keeps us
  // compliant with Google's "ratings must be visible on the page" rule.
  // SoftwareApplication describes the *tool* (the VIN lookup platform), NOT
  // the primary thing customers buy. The primary offering is the Service
  // (#service) — the vehicle history report itself. We strip the
  // aggregateRating from here for two reasons:
  //   1. Users don't rate "the software"; they rate the reports it produces.
  //      Keeping the rating only on Product (#vehicle-history-report) makes
  //      that semantically honest.
  //   2. Putting reviewCount: 50000 on both SoftwareApplication AND Product
  //      reads as a duplicated rating signal, which Google's documentation
  //      warns against ("don't repeat the same rating across multiple types").
  //
  // The name + description here are deliberately phrased as "platform / tool",
  // so Google's Knowledge Graph understands SoftwareApplication as the
  // delivery mechanism rather than the product. The free Offer remains to
  // signal the platform itself is free to use.
  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE}#software`,
    // Distinct from the Organization name on purpose. The Organization (the
    // company) and the SoftwareApplication (the platform that powers the
    // company's service) are genuinely different entities, and Google's
    // entity disambiguation works more reliably when name+type both differ.
    // Brand consolidation is handled by the explicit `publisher` @id ref
    // below — not by name collision.
    name: "CarCheckerVIN VIN Lookup Platform",
    description: "Online platform used to generate and deliver CarCheckerVIN vehicle history reports. The platform decodes any 17-character VIN and renders the corresponding report on the web.",
    url: SITE,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    publisher: { "@id": `${SITE}#organization` },
    isPartOf: { "@id": `${SITE}#website` },
    // Functional link: this software is the implementation of the Service.
    // Helps Google recognise "the platform is how the service is delivered."
    additionalType: "https://schema.org/WebApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        {/* DNS prefetch + preconnect to image CDNs and analytics — saves 100-300ms on first paint */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://api.auto.dev" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://vjyntseiimvuwbuknocp.supabase.co" />

        {/* PWA + Windows tile signals — Bing rewards sites with full app metadata */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="application-name" content="CarCheckerVIN" />
        <meta name="apple-mobile-web-app-title" content="CarCheckerVIN" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="msapplication-TileColor" content="#4f46e5" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Geo-targeting (US) — Bing uses these for regional results */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="ICBM" content="39.8283, -98.5795" />

        {/* Sitemap auto-discovery (in addition to robots.txt) */}
        <link rel="sitemap" type="application/xml" href="/sitemap-index.xml" />

        {/* Google Tag Manager — loaded as high in <head> as the App Router
            allows. strategy="afterInteractive" is Next.js's recommended mode
            for GTM: it injects right after hydration without blocking FCP/LCP,
            while still firing before user interaction so no events are missed. */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(navLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }} />
        {/*
          Trustpilot Automatic Feedback Service (AFS) — raw inline <script>
          tag, NOT next/script. Trustpilot's domain verifier does a plain
          HTML fetch of the homepage and grep's for this snippet literally.
          When emitted via <Script>, Next.js inlines the contents inside an
          RSC streaming payload (self.__next_f.push(...)) which the verifier
          cannot see, causing "We weren't able to verify your domain".
          Putting it inside <head> via dangerouslySetInnerHTML emits it as a
          flat <script>...</script> element that the verifier will find.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(w,d,s,r,n){w.TrustpilotObject=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};a=d.createElement(s);a.async=1;a.src=r;a.type='text/java'+s;f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(a,f)})(window,document,'script','https://invitejs.trustpilot.com/tp.min.js','tp');tp('register', 'AyhvdpNh2fuxwn0n');",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        {/* Google Tag Manager (noscript) — fallback for JS-disabled clients,
            must sit immediately after the opening <body> tag per GTM spec. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {!isAppSubdomain && <Header logoHref={logoHref} />}
        <main className="flex-1">{children}</main>
        {!isAppSubdomain && <ConditionalFooter />}
        <ChatWidgetMount />
        <SocialProofMount />
        {/*
          GA4 deferred to lazyOnload — does not block FCP, LCP, or hydration.
          Drops Lighthouse Performance penalty for "main thread work" by ~20%.
        */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="ga-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { send_page_view: true });
          `}
        </Script>
        {/* Session-replay analytics (PostHog + Clarity) live in a client
            component that refuses to load on /admin, /dashboard, /studio and
            auth routes, so customer PII rendered there is never recorded. */}
        <Analytics />
      </body>
    </html>
  );
}
