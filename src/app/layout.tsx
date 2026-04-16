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
    default: "VINCheck Pro — Free VIN Decoder & Vehicle History Reports",
    template: "%s | VINCheck Pro",
  },
  description:
    "Get instant vehicle history reports with VINCheck Pro. Decode any VIN to access full specs, equipment, recalls, market values & ownership data. Trusted by 50,000+ buyers.",
  keywords: [
    "VIN check", "VIN decoder", "vehicle history report", "car history",
    "VIN lookup", "VIN number check", "free VIN check", "vehicle report",
    "car report", "used car check", "NMVTIS", "vehicle identification number",
  ],
  authors: [{ name: "VINCheck Pro" }],
  creator: "VINCheck Pro",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "VINCheck Pro",
    title: "VINCheck Pro — Free VIN Decoder & Vehicle History Reports",
    description: "Decode any VIN instantly. Get comprehensive vehicle specs, equipment lists, recall info & market values.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VINCheck Pro — Free VIN Decoder & Vehicle History Reports",
    description: "Instant vehicle history reports. Decode any VIN for full specs, recalls & market values.",
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
