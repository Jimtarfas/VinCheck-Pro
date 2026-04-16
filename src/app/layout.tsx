import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    "Free VIN check and decoder. Look up any VIN number to get instant vehicle history reports with full specs, real photos, equipment, recalls, market values & ownership data. Trusted by 50,000+ buyers.",
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
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "VINCheck Pro",
    description: "Instant VIN decoder and vehicle history reports.",
    url: "https://carcheckervin.com",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free VIN decoding with premium report options" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "50000" },
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
