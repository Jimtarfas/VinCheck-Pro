import {
  Gauge, ShieldCheck, Wrench, FileText, AlertTriangle,
  Settings, DollarSign, BarChart3, Car, Camera, Cpu, MapPin,
} from "lucide-react";
import Image from "next/image";

const features = [
  { icon: Camera, title: "Real Vehicle Photos", description: "Actual photos of the exact vehicle from dealer listings", color: "bg-pink-50 text-pink-600" },
  { icon: DollarSign, title: "Market Valuation", description: "MSRP, trade-in, retail, and private party values", color: "bg-emerald-50 text-emerald-600" },
  { icon: Gauge, title: "Full Specifications", description: "Engine, transmission, drivetrain, and performance data", color: "bg-amber-50 text-amber-600" },
  { icon: Settings, title: "Equipment & Options", description: "Every factory option and equipment itemized", color: "bg-violet-50 text-violet-600" },
  { icon: BarChart3, title: "Price Comparison", description: "Compare against active dealer listings", color: "bg-blue-50 text-blue-600" },
  { icon: Wrench, title: "Recall Alerts", description: "Open recalls and safety campaigns", color: "bg-red-50 text-red-600" },
  { icon: Cpu, title: "Engine & Powertrain", description: "HP, torque, displacement, and more", color: "bg-cyan-50 text-cyan-600" },
  { icon: Car, title: "Classification", description: "Body type, EPA class, and market segment", color: "bg-indigo-50 text-indigo-600" },
  { icon: MapPin, title: "Dealer Listings", description: "Where it's listed, with price and location", color: "bg-teal-50 text-teal-600" },
  { icon: AlertTriangle, title: "Accident History", description: "Damage records from federal databases", color: "bg-orange-50 text-orange-600" },
  { icon: FileText, title: "Title & Ownership", description: "Title history, lien, and registration data", color: "bg-purple-50 text-purple-600" },
  { icon: ShieldCheck, title: "Theft Records", description: "NMVTIS stolen vehicle verification", color: "bg-green-50 text-green-600" },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Feature showcase with car image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-2">Comprehensive Data</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Everything You Need to Know</h2>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              Our reports pull from 40+ data points across federal and industry sources.
              Get real photos, detailed specs, market pricing, and more — all from one VIN.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["bg-primary-100", "bg-emerald-100", "bg-amber-100", "bg-pink-100"].map((bg, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-xs font-bold`}>
                    {["V", "I", "N", "+"[0]][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500">Trusted by <strong className="text-slate-700">50,000+</strong> car buyers</p>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-200/60">
              <Image
                src="https://api.auto.dev/photos/retail/3GCPKCEK6TG148125-1.jpg"
                alt="Vehicle with full VIN report"
                fill
                className="object-cover"
                sizes="600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="px-3 py-1.5 bg-white/90 backdrop-blur rounded-lg text-xs font-semibold text-slate-700">
                  72 Photos Available
                </div>
                <div className="px-3 py-1.5 bg-primary-600 rounded-lg text-xs font-semibold text-white">
                  Full Report Ready
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, description, color }) => (
            <div key={title} className="group p-5 bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:shadow-slate-100 hover:border-slate-200 transition-all duration-300">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
