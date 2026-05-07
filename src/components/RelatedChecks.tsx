import Link from "next/link";
import { Shield, FileText, AlertTriangle, Gauge, AlertOctagon, ScrollText, ArrowRight, Tag, BellRing, TrendingUp, ShieldCheck, Bike, Droplets } from "lucide-react";

const allChecks = [
  { href: "/stolen-vehicle-check", icon: Shield, title: "Stolen Vehicle Check", desc: "Verify against NICB theft database" },
  { href: "/salvage-title-check", icon: FileText, title: "Salvage Title Check", desc: "Detect rebuilt and branded titles" },
  { href: "/accident-history-check", icon: AlertTriangle, title: "Accident History", desc: "Review crash and damage records" },
  { href: "/odometer-check", icon: Gauge, title: "Odometer Check", desc: "Spot mileage rollback fraud" },
  { href: "/lemon-check", icon: AlertOctagon, title: "Lemon Check", desc: "Identify manufacturer buybacks" },
  { href: "/glossary", icon: ScrollText, title: "VIN Glossary", desc: "60+ vehicle history terms defined" },
  { href: "/window-sticker", icon: Tag, title: "Window Sticker Maker", desc: "Build a Monroney label by VIN" },
  { href: "/recall-check", icon: BellRing, title: "Recall Check", desc: "Open NHTSA safety recalls" },
  { href: "/market-value", icon: TrendingUp, title: "Market Value", desc: "Current market valuation" },
  { href: "/warranty-check", icon: ShieldCheck, title: "Warranty Check", desc: "Manufacturer warranty status" },
  { href: "/motorcycle-vin-check", icon: Bike, title: "Motorcycle VIN Check", desc: "Motorcycle VIN history" },
  { href: "/flood-check", icon: Droplets, title: "Flood Check", desc: "Water damage title records" },
];

interface Props {
  exclude?: string;
  title?: string;
  subtitle?: string;
}

export default function RelatedChecks({
  exclude,
  title = "Related VIN Checks",
  subtitle = "More tools to verify any vehicle's history",
}: Props) {
  const items = allChecks.filter((c) => c.href !== exclude).slice(0, 4);

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-700 mt-1">{subtitle}</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map(({ href, icon: Icon, title, desc }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/40 transition"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-900 group-hover:text-primary-700">{title}</p>
              <p className="text-xs text-slate-700 mt-0.5">{desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-0.5 transition flex-shrink-0 mt-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}
