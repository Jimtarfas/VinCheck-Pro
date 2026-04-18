import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah M.",  role: "Used Car Buyer",    text: "VINCheck Pro saved me from buying a car with hidden flood damage. The detailed report showed everything the dealer tried to hide. Worth every penny!" },
  { name: "James R.",  role: "Auto Dealer",        text: "I use VINCheck Pro for every vehicle on my lot. The comprehensive specs and equipment lists help me price cars accurately and build trust with customers." },
  { name: "Maria L.",  role: "First-time Buyer",   text: "As a first-time car buyer, I had no idea what to look for. The report was easy to understand and gave me confidence to negotiate a better deal." },
  { name: "David K.",  role: "Car Seller",         text: "I included the VINCheck Pro report in my listing and sold my car in 3 days at full asking price. Buyers loved the transparency." },
  { name: "Emily W.",  role: "Fleet Manager",      text: "Managing a fleet of 50+ vehicles, I rely on VINCheck Pro for recall monitoring and maintenance tracking. The bulk pricing is unbeatable." },
  { name: "Robert T.", role: "Mechanic",           text: "The detailed engine and transmission specs help me prepare accurate repair quotes before the vehicle even arrives at my shop." },
];

const avatarColors = [
  "bg-primary/10 text-primary",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
  "bg-cyan-100 text-cyan-700",
  "bg-violet-100 text-violet-700",
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4 block">
            Trusted by Buyers, Sellers &amp; Dealers
          </span>
          <h2 className="text-4xl font-headline font-extrabold text-primary">
            Trusted by Thousands
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-surface-container-lowest p-7 rounded-2xl shadow-sm border border-outline-variant/10 hover:shadow-lg hover:shadow-outline/5 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-secondary-container text-secondary-container" />
                ))}
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${avatarColors[i]} flex items-center justify-center text-sm font-headline font-black`}>
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-on-surface text-sm">{t.name}</p>
                  <p className="text-xs text-outline">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
