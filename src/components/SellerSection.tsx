import { TrendingUp, Users, Shield } from "lucide-react";
import Image from "next/image";

const benefits = [
  { icon: TrendingUp, title: "Get Top Dollar", description: "Vehicles with clean reports command 10-15% higher prices.", color: "bg-emerald-50 text-emerald-600" },
  { icon: Users, title: "Attract More Buyers", description: "Listings with vehicle reports get 3x more inquiries.", color: "bg-blue-50 text-blue-600" },
  { icon: Shield, title: "Reduce Liability", description: "Document your vehicle's condition upfront.", color: "bg-violet-50 text-violet-600" },
];

export default function SellerSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-200/60">
              <Image
                src="https://api.auto.dev/photos/retail/1N6ED1EK1SN645592-1.jpg"
                alt="Vehicle listed for sale"
                fill
                className="object-cover"
                sizes="600px"
              />
              <div className="absolute bottom-4 left-4 px-3 py-2 bg-white/95 backdrop-blur rounded-xl shadow-lg">
                <p className="text-xs text-slate-500">Sold in</p>
                <p className="text-lg font-bold text-emerald-600">3 Days</p>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div>
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-2">For Sellers</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Selling Your Vehicle?</h2>
            <p className="text-lg text-slate-500 mb-8">A VINCheck Pro report helps you sell faster and at a better price.</p>

            <div className="space-y-5">
              {benefits.map(({ icon: Icon, title, description, color }) => (
                <div key={title} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                  <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
