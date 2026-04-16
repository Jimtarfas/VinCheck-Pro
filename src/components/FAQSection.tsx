"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { question: "What is a VIN and where can I find it?", answer: "A Vehicle Identification Number (VIN) is a unique 17-character code assigned to every motor vehicle. You can find it on the driver-side dashboard (visible through the windshield), the driver-side door jamb sticker, your vehicle registration, or insurance documents." },
  { question: "What information is included in a VINCheck Pro report?", answer: "Our reports include complete vehicle specifications (engine, transmission, drivetrain), all factory-installed options and equipment, market value estimates, recall information, and detailed technical data. We pull data from NMVTIS and manufacturer databases." },
  { question: "How quickly will I receive my report?", answer: "Reports are generated instantly — typically in under 60 seconds. Once your VIN is decoded, you'll see the full report immediately on screen." },
  { question: "Which vehicles are covered?", answer: "We cover vehicles manufactured from 1981 onwards (when the 17-character VIN standard was adopted). This includes cars, trucks, SUVs, and vans from all major manufacturers worldwide." },
  { question: "Is VINCheck Pro useful for sellers too?", answer: "Absolutely! Sellers use our reports to document vehicle condition, build buyer confidence, and justify asking prices. A clean vehicle report can help you sell faster and at a higher price." },
  { question: "How is your data different from free VIN decoders?", answer: "Free decoders typically only show basic make/model/year info. VINCheck Pro provides comprehensive data including full equipment lists, factory options, engine specifications, transmission details, and market valuations sourced from trusted industry databases." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={`rounded-2xl border transition-all duration-300 ${isOpen ? "border-primary-200 bg-primary-50/30 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full flex items-center justify-between p-5 text-left cursor-pointer">
                  <span className={`font-semibold pr-4 ${isOpen ? "text-primary-700" : "text-slate-800"}`}>{faq.question}</span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${isOpen ? "bg-primary-100 text-primary-600" : "bg-slate-100 text-slate-400"}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-5 pb-5">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
