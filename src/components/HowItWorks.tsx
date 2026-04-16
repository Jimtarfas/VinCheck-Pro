import { Search, Database, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "1",
    title: "Enter Your VIN",
    description: "Locate the 17-character VIN on your dashboard, door frame, or registration docs.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Database,
    step: "2",
    title: "Instant Decoding",
    description: "We query NMVTIS, manufacturer databases, and dealer listings in real time.",
    color: "bg-primary-50 text-primary-600",
  },
  {
    icon: FileCheck,
    step: "3",
    title: "Get Your Report",
    description: "View a complete breakdown of specs, photos, market values, and history.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-2">Simple Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">How It Works</h2>
          <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">Get your full vehicle report in three simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-200 via-primary-200 to-emerald-200" />

          {steps.map(({ icon: Icon, step, title, description, color }) => (
            <div key={step} className="relative text-center group">
              <div className="relative z-10 inline-flex flex-col items-center">
                <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center shadow-md">
                  {step}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
