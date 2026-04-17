import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Marcus J.", location: "Austin, TX", rating: 5, text: "Saved me from buying a flood-damaged truck. The salvage title flag came up immediately and the dealer had no idea I&rsquo;d checked. Worth every penny.", role: "Used Truck Buyer" },
  { name: "Sarah L.", location: "Denver, CO", rating: 5, text: "I&rsquo;ve sold three cars on Facebook Marketplace and including the VIN report up front cut my listing time in half. Buyers trust the data.", role: "Private Seller" },
  { name: "David R.", location: "Miami, FL", rating: 5, text: "The accident history detail was way more thorough than what Carfax gave me last year, and at a fraction of the price. No-brainer.", role: "Car Enthusiast" },
  { name: "Priya S.", location: "Chicago, IL", rating: 5, text: "First time buying used. The free VIN decode confirmed the listing matched what the dealer was telling me. Premium report sealed the deal.", role: "First-Time Buyer" },
  { name: "Jordan K.", location: "Seattle, WA", rating: 5, text: "Use this professionally as a wholesale dealer. The market data and photo history have caught two cloned VINs in the last year alone.", role: "Wholesale Dealer" },
  { name: "Elena V.", location: "Phoenix, AZ", rating: 4, text: "Detailed and fast. The mileage check section was the deciding factor for me &mdash; previous owner had clearly rolled it back.", role: "Used Sedan Buyer" },
];

const totalReviews = 50000;
const avgRating = 4.9;

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-primary-600 tracking-widest uppercase mb-3">Trusted by Buyers, Sellers &amp; Dealers</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">What Our Users Say</h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-lg font-bold text-slate-900">{avgRating}</span>
            <span className="text-sm text-slate-500">/ 5 from {totalReviews.toLocaleString()}+ reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div key={r.name} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative">
              <Quote className="w-8 h-8 text-primary-200 absolute top-4 right-4" />
              <div className="flex mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p
                className="text-sm text-slate-700 leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${r.text}&rdquo;` }}
              />
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{r.name}</p>
                  <p className="text-xs text-slate-500">{r.role} &middot; {r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
