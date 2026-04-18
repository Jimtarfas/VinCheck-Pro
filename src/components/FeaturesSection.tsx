import { Camera, DollarSign, Gauge, Settings, BarChart3, Wrench, Cpu, Car, MapPin, AlertTriangle, FileText, ShieldCheck } from "lucide-react";

/* ─── 40+ Point Coverage columns ─── */
const coverageColumns = [
  {
    icon: Gauge,
    accent: "bg-primary/8 text-primary",
    title: "Condition & Value Data",
    items: [
      "Market Valuation (Trade-In & Retail)",
      "Odometer Verification & Rollbacks",
      "Structural Damage & Total Loss",
      "Accident History & Severity",
      "Junk, Lemon & Flood Brands",
    ],
    more: "+ 7 More Checks",
    moreColor: "text-primary",
  },
  {
    icon: FileText,
    accent: "bg-secondary-container/15 text-secondary",
    title: "Ownership & Legal Records",
    items: [
      "Detailed Ownership History",
      "Title Brand Records",
      "State Title Registrations",
      "Active Liens & Auto Loans",
      "Theft & Recovery Records",
    ],
    more: "+ 7 More Checks",
    moreColor: "text-secondary",
  },
  {
    icon: Settings,
    accent: "bg-tertiary-container/10 text-tertiary-container",
    title: "Technical & Lifecycle Data",
    items: [
      "Original MSRP & Specs",
      "Full Equipment & Options List",
      "Active Safety Recalls",
      "Engine & Powertrain Details",
      "Dealer & Market Listings",
    ],
    more: "+ 8 More Checks",
    moreColor: "text-tertiary-container",
  },
];

/* ─── Core Documentation bento cards ─── */
const bentoItems = [
  {
    wide: true,
    icon: AlertTriangle,
    iconColor: "text-secondary",
    title: "Accident History",
    desc: "Detailed records of collisions, frame damage, and structural repairs documented by law enforcement and insurers.",
    bg: "bg-surface-container-lowest",
  },
  {
    wide: false,
    icon: FileText,
    iconColor: "text-on-primary",
    title: "Title Records",
    desc: "Salvage, flood, lemon, and rebuild brandings that stay with the vehicle's permanent digital ID.",
    bg: "bg-primary text-white",
    dark: true,
  },
  {
    wide: false,
    icon: Settings,
    iconColor: "text-primary",
    title: "Full Specs",
    desc: "Original manufacturer data, equipment packages, and factory build sheets.",
    bg: "bg-surface-container-high",
  },
  {
    wide: true,
    icon: Wrench,
    iconColor: "text-error",
    title: "Safety Recalls",
    desc: "Stay informed about open recalls and safety notices directly from the NHTSA and manufacturers.",
    bg: "bg-surface-container-lowest",
  },
];

/* ─── All feature icons (12-point grid) ─── */
const featureGrid = [
  { icon: Camera,        title: "Real Vehicle Photos",    color: "bg-pink-50 text-pink-600" },
  { icon: DollarSign,    title: "Market Valuation",       color: "bg-emerald-50 text-emerald-600" },
  { icon: Gauge,         title: "Full Specifications",    color: "bg-amber-50 text-amber-600" },
  { icon: Settings,      title: "Equipment & Options",    color: "bg-violet-50 text-violet-600" },
  { icon: BarChart3,     title: "Price Comparison",       color: "bg-blue-50 text-blue-600" },
  { icon: Wrench,        title: "Recall Alerts",          color: "bg-red-50 text-red-600" },
  { icon: Cpu,           title: "Engine & Powertrain",    color: "bg-cyan-50 text-cyan-600" },
  { icon: Car,           title: "Classification",         color: "bg-indigo-50 text-indigo-600" },
  { icon: MapPin,        title: "Dealer Listings",        color: "bg-teal-50 text-teal-600" },
  { icon: AlertTriangle, title: "Accident History",       color: "bg-orange-50 text-orange-600" },
  { icon: FileText,      title: "Title & Ownership",      color: "bg-purple-50 text-purple-600" },
  { icon: ShieldCheck,   title: "Theft Records",          color: "bg-green-50 text-green-600" },
];

export default function FeaturesSection() {
  return (
    <>
      {/* ══════════════════════════════════════════════
          SECTION A — Comprehensive 40+ Point Coverage
      ══════════════════════════════════════════════ */}
      <section id="features" className="py-24 px-6 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <h2 className="text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-4">
              Comprehensive 40+ Point Coverage
            </h2>
            <p className="text-on-surface-variant max-w-3xl text-lg">
              We leverage NMVTIS federal data, dealership networks, and insurance databases to give you the most exhaustive vehicle record possible. Here is what&apos;s included in every report.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {coverageColumns.map(({ icon: Icon, accent, title, items, more, moreColor }) => (
              <div key={title} className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm">
                <div className={`w-12 h-12 rounded-xl ${accent} flex items-center justify-center mb-6`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-headline font-bold text-on-surface mb-6">{title}</h4>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-on-surface-variant">
                      <span className="w-4 h-4 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      </span>
                      {item}
                    </li>
                  ))}
                  <li className={`text-sm font-bold ${moreColor}`}>{more}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION B — Core Documentation (Bento)
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-sm font-black uppercase tracking-[0.2em] mb-3" style={{ color: "var(--color-secondary-container)" }}>The Archive</p>
            <h3 className="text-4xl font-headline font-extrabold text-primary">Core Documentation.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bentoItems.map(({ wide, icon: Icon, iconColor, title, desc, bg, dark }) => (
              <div
                key={title}
                className={`${wide ? "md:col-span-2" : ""} ${bg} p-8 rounded-[2rem] flex flex-col justify-between group shadow-sm`}
              >
                <div className="max-w-md">
                  <Icon className={`w-10 h-10 ${iconColor} mb-6`} />
                  <h4 className={`text-2xl font-headline font-bold mb-3 ${dark ? "text-white" : "text-on-surface"}`}>
                    {title}
                  </h4>
                  <p className={`text-sm leading-relaxed ${dark ? "text-primary-fixed/80" : "text-on-surface-variant"}`}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION C — 12-Feature Icon Grid
      ══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4 block">Everything You Need</span>
            <h2 className="text-4xl font-headline font-extrabold text-primary">
              40+ Data Points, One Report
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featureGrid.map(({ icon: Icon, title, color }) => (
              <div
                key={title}
                className="group p-5 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-lg hover:shadow-outline/5 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-on-surface">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
