/**
 * Wave 18 batch 3 — English golf-cart-vin-lookup. Same full layout shared with
 * /es/golf-cart-vin-lookup via GolfCartVinLookupBody.
 */

import type { Metadata } from "next";
import GolfCartVinLookupBody, { FAQS_EN } from "@/components/GolfCartVinLookupBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/golf-cart-vin-lookup`;

export const metadata: Metadata = {
  title: "Golf Cart VIN Lookup — Serial Decoder",
  description: "Golf carts use a serial number, not a 17-character VIN. Decode a Club Car serial for the model year, with E-Z-GO and Yamaha guides. Free.",
  keywords: ["golf cart vin lookup", "yamaha golf cart vin lookup", "club car serial number lookup", "ezgo serial number lookup", "golf cart serial number lookup", "golf cart year by serial number", "club car year lookup", "yamaha golf cart year by serial number", "ezgo golf cart year lookup", "golf cart vin decoder", "how to tell what year a golf cart is", "golf cart model year lookup"],
  alternates: hreflangAlternates("/golf-cart-vin-lookup"),
  openGraph: {
    title: "Golf Cart VIN Lookup — Free Serial Decoder (Club Car, EZGO, Yamaha)",
    description: "Golf carts use a serial number, not a road VIN. Find and decode it to get the model year on any Club Car, E-Z-GO, or Yamaha cart. Free, instant.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    images: [{ url: `${SITE}/golf-cart-vin-lookup/opengraph-image`, width: 1200, height: 630, alt: "Golf Cart VIN Lookup — free serial number decoder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Golf Cart VIN Lookup — Free Serial Decoder (Club Car, EZGO, Yamaha)",
    description: "Golf carts use a serial number, not a road VIN. Decode it to find the model year. Free, instant, no sign-up.",
    images: [`${SITE}/golf-cart-vin-lookup/opengraph-image`],
  },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Golf Cart VIN / Serial Number Lookup", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free tool to find and decode a golf cart serial number — Club Car, E-Z-GO, or Yamaha — to determine the model year. Golf carts use a manufacturer serial number rather than a 17-character road VIN.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Look Up a Golf Cart Year by Serial Number", description: "Step-by-step guide to finding and decoding a golf cart serial number to determine the model year on a Club Car, E-Z-GO, or Yamaha cart.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Identify the brand", text: "Confirm whether the cart is a Club Car, E-Z-GO, or Yamaha — each encodes the year differently. The brand is usually on the body, the steering column, or the seat." }, { "@type": "HowToStep", position: 2, name: "Locate the serial number", text: "Find the serial on the frame and the label: Club Car under the glove box or driver seat, E-Z-GO under the seat or near the controller, Yamaha stamped on the frame under the seat." }, { "@type": "HowToStep", position: 3, name: "Read or decode the year", text: "For a Club Car, enter the serial into the decoder to read the model year and week. For Yamaha or E-Z-GO, match the model prefix to that brand's year chart." }, { "@type": "HowToStep", position: 4, name: "Verify against the cart", text: "Match the decoded year and model to the cart's features and the seller's claim. A mismatch between the serial and the advertised year is a red flag." }, { "@type": "HowToStep", position: 5, name: "Use the year to order parts or value the cart", text: "Once you know the exact model year, order year-specific batteries, controllers, and accessories, or use it to price the cart for sale or purchase." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Golf Cart VIN Lookup", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: PAGE_URL };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <GolfCartVinLookupBody locale="en" />
    </>
  );
}
