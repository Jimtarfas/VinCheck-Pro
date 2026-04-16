import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah M.", role: "Used Car Buyer", text: "VINCheck Pro saved me from buying a car with hidden flood damage. The detailed report showed everything the dealer tried to hide. Worth every penny!" },
  { name: "James R.", role: "Auto Dealer", text: "I use VINCheck Pro for every vehicle on my lot. The comprehensive specs and equipment lists help me price cars accurately and build trust with customers." },
  { name: "Maria L.", role: "First-time Buyer", text: "As a first-time car buyer, I had no idea what to look for. The report was easy to understand and gave me confidence to negotiate a better deal." },
  { name: "David K.", role: "Car Seller", text: "I included the VINCheck Pro report in my listing and sold my car in 3 days at full asking price. Buyers loved the transparency." },
  { name: "Emily W.", role: "Fleet Manager", text: "Managing a fleet of 50+ vehicles, I rely on VINCheck Pro for recall monitoring and maintenance tracking. The bulk pricing is unbeatable." },
  { name: "Robert T.", role: "Mechanic", text: "The detailed engine and transmission specs help me prepare accurate repair quotes before the vehicle even arrives at my shop." },
];

const colors = ["bg-primary-100 text-primary-700", "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700", "bg-pink-100 text-pink-700", "bg-cyan-100 text-cyan-700", "bg-violet-100 text-violet-700"];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-2">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Trusted by Thousands</h2>
          <p className="mt-3 text-lg text-slate-500">See what our customers say about VINCheck Pro</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={t.name} className="p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-600 leading-relaxed mb-5 text-sm">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${colors[i]} flex items-center justify-center text-sm font-bold`}>
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
