import { Search, Database, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Find Your VIN",
    description: "Locate the 17-character VIN on your dashboard (visible through the windshield), driver-side door jamb sticker, or vehicle registration.",
    accent: "bg-primary/8 text-primary",
  },
  {
    icon: Database,
    step: "02",
    title: "Instant Decoding",
    description: "We query NMVTIS, manufacturer databases, and dealer listings in real time — cross-referencing 40+ data points in under 60 seconds.",
    accent: "bg-secondary-container/15 text-secondary",
  },
  {
    icon: FileCheck,
    step: "03",
    title: "Get Your Report",
    description: "View a complete breakdown: full specs, real photos, market values, equipment list, recall alerts, and ownership history — all on one screen.",
    accent: "bg-green-500/10 text-green-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <span className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4 block">Simple Process</span>
          <h2 className="text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-4">How It Works</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Get your full vehicle history report in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting gradient line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px"
            style={{ background: "linear-gradient(to right, #003178, #ff9800, #16a34a)" }} />

          {steps.map(({ icon: Icon, step, title, description, accent }) => (
            <div key={step} className="relative text-center group">
              <div className="relative z-10 inline-flex flex-col items-center">
                <div className={`w-16 h-16 rounded-2xl ${accent} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                {/* Step number badge */}
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-on-primary text-xs font-black font-headline flex items-center justify-center shadow-md">
                  {step.replace("0", "")}
                </div>
              </div>
              <h3 className="text-xl font-headline font-bold text-primary mb-3">{title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs mx-auto">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
