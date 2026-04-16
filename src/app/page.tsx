import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import SellerSection from "@/components/SellerSection";
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
    { "@type": "Question", name: "Is this VIN check service really free?", acceptedAnswer: { "@type": "Answer", text: "Yes, basic VIN decoding is completely free. You can decode any VIN to see vehicle specs, engine details, and basic information at no cost. Premium reports with full history, market values, and detailed analysis start at just $7.99." } },
  ],
};

const howToStructuredData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Check a VIN Number Online",
  description: "Learn how to decode any Vehicle Identification Number (VIN) to get a full vehicle history report in under 60 seconds.",
  step: [
    { "@type": "HowToStep", name: "Find Your VIN", text: "Locate the 17-character VIN on your vehicle's dashboard (visible through the windshield), driver-side door jamb sticker, vehicle registration, or insurance documents." },
    { "@type": "HowToStep", name: "Enter the VIN", text: "Enter the 17-character VIN into the VIN checker search box on our website." },
    { "@type": "HowToStep", name: "Get Your Report", text: "View your complete vehicle report instantly, including specs, photos, market values, equipment lists, and vehicle history." },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }} />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <SellerSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
