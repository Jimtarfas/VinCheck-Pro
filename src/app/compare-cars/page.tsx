import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import CompareCarsBody, { FAQS_EN } from "@/components/CompareCarsBody";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Free Car Comparison Tool — Compare Any Two Vehicles Side-by-Side",
  description:
    "Compare any two cars side-by-side. See MPG, horsepower, price, cargo space, towing, safety, and 30+ specs for 40+ popular models. Free, instant, no sign-up.",
  keywords: ["compare cars", "car comparison tool", "compare vehicles", "side by side car comparison", "vehicle comparison tool", "compare two cars", "car vs car", "compare car specs", "compare car prices", "compare car mpg", "camry vs accord", "civic vs corolla", "rav4 vs cr-v", "f-150 vs silverado", "tesla model 3 vs y", "compare suvs", "compare trucks", "compare sedans", "compare car features", "free car comparison", "best car comparison tool", "kelley blue book comparison alternative", "edmunds compare alternative", "auto comparison", "vehicle specs comparison", "car spec comparison", "head to head car comparison", "which car is better", "compare new cars", "compare used cars"],
  alternates: hreflangAlternates("/compare-cars"),
  openGraph: { title: "Free Car Comparison Tool — Compare Any Two Vehicles Side-by-Side", description: "Compare any two cars side-by-side. MPG, horsepower, price, cargo, towing, safety, and 30+ specs for 40+ popular models.", url: `${SITE}/compare-cars`, type: "website", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Free Car Comparison Tool — Compare Any Two Vehicles Side-by-Side", description: "Side-by-side specs for 40+ popular vehicles. MPG, horsepower, price, cargo, towing, safety, and more." },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
};

const webAppSchema = {
  "@context": "https://schema.org", "@type": ["WebApplication", "SoftwareApplication"], inLanguage: "en",
  name: "Vehicle Comparison Tool",
  description: "Free car comparison tool. Pick any two of 40+ popular vehicles and instantly see side-by-side specs across pricing, performance, efficiency, practicality, safety, warranty, and key features.",
  url: `${SITE}/compare-cars`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "en",
  mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Car Comparison Tool", item: `${SITE}/compare-cars` },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CompareCarsBody locale="en" />
    </>
  );
}
