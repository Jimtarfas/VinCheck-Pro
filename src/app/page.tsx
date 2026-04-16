import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import SellerSection from "@/components/SellerSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
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
