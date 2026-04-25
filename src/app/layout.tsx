import type { Metadata } from "next";
import { Manrope, Inter, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const GA_ID = "G-7HL13B05JH";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://carcheckervin.com"),
  title: {
    default: "Free VIN Check & Decoder — Vehicle History Reports | CarCheckerVIN",
    template: "%s | CarCheckerVIN",
  },
  description:
    "Free VIN check & decoder — instant vehicle history reports with full specs, real photos, recalls, market values & ownership data. Trusted by 50,000+ buyers.",
  keywords: [
    "VIN check", "VIN checker", "VIN decoder", "free VIN check", "VIN lookup",
    "VIN number check", "check VIN", "vehicle history report", "car history check",
    "VIN number lookup", "decode VIN", "vehicle report", "car VIN check",
    "free VIN decoder", "NMVTIS", "vehicle identification number",
    "used car VIN check", "VIN search", "car checker",
  ],
  authors: [{ name: "CarCheckerVIN" }],
  creator: "CarCheckerVIN",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CarCheckerVIN",
    title: "Free VIN Check & Decoder — Instant Vehicle History Reports",
    description: "Check any VIN for free. Get instant vehicle history reports with full specs, real photos, equipment lists, recall info & market values.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free VIN Check & Decoder — CarCheckerVIN",
    description: "Check any VIN for free. Instant vehicle history reports with specs, photos, recalls & market values.",
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    yandex: "7131d6ab57cf4219",
  },
  alternates: { canonical: "/" },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const SITE = "https://carcheckervin.com";

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}#organization`,
    name: "CarCheckerVIN",
    alternateName: "VINCheck Pro",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.svg`, width: 280, height: 56 },
    description: "Trusted vehicle history reports and VIN decoding for car buyers, sellers, and dealers.",
    foundingDate: "2025",
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: "+1-800-846-2432",
      email: "support@carcheckervin.com",
      contactType: "customer support",
      areaServed: "US",
      availableLanguage: ["English"],
      hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" },
    }],
    sameAs: [],
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

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}#service`,
    name: "VIN Check & Vehicle History Report",
    serviceType: "Vehicle History Report",
    provider: { "@id": `${SITE}#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    description: "Instant VIN decoding and comprehensive vehicle history reports including title checks, accident history, theft records, odometer verification, and market value.",
    offers: [
      { "@type": "Offer", name: "Free VIN Decode", price: "0", priceCurrency: "USD", description: "Year, make, model, engine, transmission and basic specs", availability: "https://schema.org/InStock" },
      { "@type": "Offer", name: "Premium Vehicle History Report (Limited-Time Free)", price: "0", priceCurrency: "USD", description: "Full report with photos, equipment, recalls, market value and ownership history — currently free for a limited time.", availability: "https://schema.org/InStock" },
    ],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "50000", bestRating: "5", worstRating: "1" },
  };

  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "VINCheck Pro",
    description: "Instant VIN decoder and vehicle history reports.",
    url: SITE,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "50000" },
  };

  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }} />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
