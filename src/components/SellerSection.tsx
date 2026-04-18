import Image from "next/image";
import { TrendingUp, Users, Shield } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Get Top Dollar",
    description: "Vehicles with clean reports command 10–15% higher prices.",
    accent: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Users,
    title: "Attract More Buyers",
    description: "Listings with vehicle reports get 3× more serious inquiries.",
    accent: "bg-primary/8 text-primary",
  },
  {
    icon: Shield,
    title: "Reduce Liability",
    description: "Document your vehicle's condition upfront and build buyer trust.",
    accent: "bg-violet-50 text-violet-600",
  },
];

export default function SellerSection() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Image side */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] rotate-2 -z-10" />
          <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 -rotate-1 hover:rotate-0 transition-transform duration-500">
            <Image
              src="https://api.auto.dev/photos/retail/1N6ED1EK1SN645592-1.jpg"
              alt="Vehicle listed for sale"
              fill
              className="object-cover"
              sizes="600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            <div className="absolute bottom-5 left-5 px-4 py-2.5 bg-surface-container-lowest/95 backdrop-blur rounded-2xl shadow-lg">
              <p className="text-xs text-outline font-medium">Sold in</p>
              <p className="text-2xl font-headline font-black text-green-600">3 Days</p>
            </div>
          </div>
        </div>

        {/* Content side */}
        <div>
          <span className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4 block">For Sellers</span>
          <h2 className="text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-5">
            Selling Your Vehicle?
          </h2>
          <p className="text-lg text-on-surface-variant mb-10">
            A VINCheck Pro report helps you sell faster and at a better price. Give buyers the transparency they need to say yes with confidence.
          </p>

          <div className="space-y-4">
            {benefits.map(({ icon: Icon, title, description, accent }) => (
              <div
                key={title}
                className="flex gap-5 p-5 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 hover:shadow-lg hover:shadow-outline/5 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${accent} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-on-surface mb-1">{title}</h3>
                  <p className="text-sm text-on-surface-variant">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
