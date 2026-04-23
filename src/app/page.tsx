import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import AIFeaturesSection from "@/components/AIFeaturesSection";
import ComparisonSection from "@/components/ComparisonSection";
import PricingSection from "@/components/PricingSection";
import Reviews from "@/components/Reviews";
import SellerSection from "@/components/SellerSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is a VIN and where can I find it?", acceptedAnswer: { "@type": "Answer", text: "A Vehicle Identification Number (VIN) is a unique 17-character code assigned to every motor vehicle. You can find it on the driver-side dashboard (visible through the windshield), the driver-side door jamb sticker, your vehicle registration, or insurance documents." } },
    { "@type": "Question", name: "What information is included in a VIN check report?", acceptedAnswer: { "@type": "Answer", text: "Our VIN check reports include complete vehicle specifications (engine, transmission, drivetrain), all factory-installed options and equipment, market value estimates, recall information, real vehicle photos, and detailed technical data sourced from NMVTIS and manufacturer databases." } },
    { "@type": "Question", name: "How quickly will I receive my VIN report?", acceptedAnswer: { "@type": "Answer", text: "VIN reports are generated instantly — typically in under 60 seconds. Once your VIN is decoded, you'll see the full vehicle history report immediately on screen." } },
    { "@type": "Question", name: "Which vehicles are covered by your VIN decoder?", acceptedAnswer: { "@type": "Answer", text: "We cover vehicles manufactured from 1981 onwards (when the 17-character VIN standard was adopted). This includes cars, trucks, SUVs, and vans from all major manufacturers worldwide including Toyota, Ford, Honda, Chevrolet, BMW, Mercedes-Benz, and more." } },
    { "@type": "Question", name: "Is a VIN check useful for sellers too?", acceptedAnswer: { "@type": "Answer", text: "Absolutely! Sellers use VIN check reports to document vehicle condition, build buyer confidence, and justify asking prices. A clean vehicle report can help you sell faster and at a higher price." } },
    { "@type": "Question", name: "How is your VIN check different from free VIN decoders?", acceptedAnswer: { "@type": "Answer", text: "Free VIN decoders typically only show basic make/model/year info. Our VIN checker provides comprehensive data including full equipment lists, factory options, engine specifications, transmission details, real vehicle photos, market valuations, and comparable dealer listings sourced from trusted industry databases." } },
    { "@type": "Question", name: "What does a VIN number tell you?", acceptedAnswer: { "@type": "Answer", text: "A VIN number reveals the vehicle's country of origin, manufacturer, vehicle type, engine size, model year, assembly plant, and unique serial number. When decoded through our service, it also reveals detailed specs, equipment, pricing, photos, and history." } },
    { "@type": "Question", name: "Is this VIN check service really free?", acceptedAnswer: { "@type": "Answer", text: "Yes — and for a limited time every single plan is completely free, including full premium reports with history, market values, photos, and detailed analysis. No credit card required. Regular pricing (starting at $7.99) resumes when the promotion ends." } },
    { "@type": "Question", name: "How is CarCheckerVIN different from Carfax?", acceptedAnswer: { "@type": "Answer", text: "CarCheckerVIN offers the same core data sources Carfax uses (NMVTIS, NICB, manufacturer records) but at a fraction of the cost ($7.99 vs $44.99 for a single report). We focus on transparency, instant results, and real photos. See our full comparison on our Carfax alternative page." } },
    { "@type": "Question", name: "Can a VIN check tell me if a car was stolen?", acceptedAnswer: { "@type": "Answer", text: "Yes. Our reports cross-reference the VIN against the National Insurance Crime Bureau (NICB) database. If a vehicle is reported stolen and not yet recovered — or has been recovered as a salvage total loss — the report will flag it." } },
    { "@type": "Question", name: "Will a VIN check show me odometer rollback?", acceptedAnswer: { "@type": "Answer", text: "Premium reports show all reported mileage readings from inspections, title transfers, and service records. Inconsistencies in the timeline are a strong indicator of odometer fraud, which costs U.S. consumers over $1 billion per year." } },
    { "@type": "Question", name: "What happens if no data is found for a VIN?", acceptedAnswer: { "@type": "Answer", text: "Most pre-1981 vehicles don't have a 17-character VIN and can't be decoded. Some private-use vehicles or vehicles with very limited title history may also have minimal data. If your premium report comes back with no usable information, we offer a full refund." } },
    { "@type": "Question", name: "Do I need an account to run a VIN check?", acceptedAnswer: { "@type": "Answer", text: "No account is required to run a free VIN decode. An account is only needed if you want to save reports to your dashboard, set up vehicle watchlists, or run reports in bulk." } },
  ],
};

const productLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Vehicle History Report",
  description: "Comprehensive VIN-decoded vehicle history report including title status, accidents, mileage records, recalls, market value, and ownership data.",
  brand: { "@type": "Brand", name: "CarCheckerVIN" },
  offers: [
    { "@type": "Offer", name: "Free VIN Decode", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock", url: "https://carcheckervin.com/" },
    { "@type": "Offer", name: "Single Premium Report (Limited-Time Free)", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock", url: "https://carcheckervin.com/#pricing" },
    { "@type": "Offer", name: "5-Pack Bundle (Limited-Time Free)", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock", url: "https://carcheckervin.com/#pricing" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "50000", bestRating: "5", worstRating: "1" },
  review: [
    { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, author: { "@type": "Person", name: "Marcus J." }, reviewBody: "Saved me from buying a flood-damaged truck. The salvage title flag came up immediately and the dealer had no idea I'd checked." },
    { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, author: { "@type": "Person", name: "Sarah L." }, reviewBody: "I've sold three cars on Facebook Marketplace and including the VIN report up front cut my listing time in half." },
    { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, author: { "@type": "Person", name: "David R." }, reviewBody: "The accident history detail was way more thorough than what Carfax gave me last year, and at a fraction of the price." },
  ],
};

const howToStructuredData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Check a VIN Number Online",
  description: "Learn how to decode any Vehicle Identification Number (VIN) to get a full vehicle history report in under 60 seconds.",
  step: [
    { "@type": "HowToStep", name: "Find Your VIN", text: "Locate the 17-character VIN on your vehicle's dashboard, driver-side door jamb sticker, vehicle registration, or insurance documents." },
    { "@type": "HowToStep", name: "Enter the VIN", text: "Enter the 17-character VIN into the VIN checker search box on our website." },
    { "@type": "HowToStep", name: "Get Your Report", text: "View your complete vehicle report instantly, including specs, photos, market values, equipment lists, and vehicle history." },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />

      <HeroSection />
      <TrustBar />
      <HowItWorks />
      <FeaturesSection />
      <AIFeaturesSection />
      <ComparisonSection />
      <PricingSection />
      <Reviews />
      <SellerSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
