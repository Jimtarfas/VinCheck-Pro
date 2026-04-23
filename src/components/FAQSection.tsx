"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is a VIN and where can I find it?",
    answer: "A Vehicle Identification Number (VIN) is a unique 17-character code assigned to every motor vehicle. You can find it on the driver-side dashboard (visible through the windshield), the driver-side door jamb sticker, your vehicle registration, or insurance documents.",
  },
  {
    question: "What information is included in a VINCheck Pro report?",
    answer: "Our reports include complete vehicle specifications (engine, transmission, drivetrain), all factory-installed options and equipment, market value estimates, recall information, real vehicle photos, and detailed technical data sourced from NMVTIS and manufacturer databases.",
  },
  {
    question: "How quickly will I receive my VIN report?",
    answer: "VIN reports are generated instantly — typically in under 60 seconds. Once your VIN is decoded, you'll see the full vehicle history report immediately on screen.",
  },
  {
    question: "Which vehicles are covered by your VIN decoder?",
    answer: "We cover vehicles manufactured from 1981 onwards (when the 17-character VIN standard was adopted). This includes cars, trucks, SUVs, and vans from all major manufacturers worldwide including Toyota, Ford, Honda, Chevrolet, BMW, Mercedes-Benz, and more.",
  },
  {
    question: "Is a VIN check useful for sellers too?",
    answer: "Absolutely! Sellers use VIN check reports to document vehicle condition, build buyer confidence, and justify asking prices. A clean vehicle report can help you sell faster and at a higher price.",
  },
  {
    question: "How is your VIN check different from free VIN decoders?",
    answer: "Free VIN decoders typically only show basic make/model/year info. Our VIN checker provides comprehensive data including full equipment lists, factory options, engine specifications, transmission details, real vehicle photos, and market valuations sourced from trusted industry databases.",
  },
  {
    question: "Can a VIN check tell me if a car was stolen?",
    answer: "Yes. Our reports cross-reference the VIN against the National Insurance Crime Bureau (NICB) database. If a vehicle is reported stolen and not yet recovered — or has been recovered as a salvage total loss — the report will flag it.",
  },
  {
    question: "Will a VIN check show me odometer rollback?",
    answer: "Premium reports show all reported mileage readings from inspections, title transfers, and service records. Inconsistencies in the timeline are a strong indicator of odometer fraud, which costs U.S. consumers over $1 billion per year.",
  },
  {
    question: "Is this VIN check service really free?",
    answer: "Yes — and for a limited time every single plan is completely free, including full premium reports with history, market values, photos, and detailed analysis. No credit card required. Regular pricing (starting at $7.99) resumes when the promotion ends.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-container-lowest">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant">
            Everything you need to know about VINCheck Pro reports.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? "bg-surface shadow-sm border border-outline-variant/10"
                    : "bg-surface hover:bg-surface-container-low border border-transparent"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left cursor-pointer"
                >
                  <span className={`font-headline font-bold text-base sm:text-lg pr-3 sm:pr-4 ${isOpen ? "text-primary" : "text-on-surface"}`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-outline"}`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
