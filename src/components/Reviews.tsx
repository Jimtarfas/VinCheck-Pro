import { Star } from "lucide-react";

const reviews = [
  { name: "Marcus J.", location: "Austin, TX", rating: 5, text: "Saved me from buying a flood-damaged truck. The salvage title flag came up immediately and the dealer had no idea I'd checked. Worth every penny.", role: "Used Truck Buyer" },
  { name: "Sarah L.",  location: "Denver, CO",  rating: 5, text: "I've sold three cars on Facebook Marketplace and including the VIN report up front cut my listing time in half. Buyers trust the data.", role: "Private Seller" },
  { name: "David R.",  location: "Miami, FL",   rating: 5, text: "The accident history detail was way more thorough than what Carfax gave me last year, and at a fraction of the price. No-brainer.", role: "Car Enthusiast" },
];

export default function Reviews() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-4">
            What Customers Are Saying
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1,2,3,4,5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-secondary-container text-secondary-container" />
            ))}
            <span className="ml-2 text-base font-bold text-on-surface">4.9</span>
            <span className="text-sm text-on-surface-variant">/ 5 from 50,000+ reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm border border-outline-variant/10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary-container text-secondary-container" />
                ))}
              </div>

              <p className="text-on-surface-variant leading-relaxed italic text-sm mb-7">
                &ldquo;{r.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/10">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center text-sm font-headline font-black">
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-bold text-on-surface text-sm">{r.name}</p>
                  <p className="text-xs text-outline">{r.role} &middot; {r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
