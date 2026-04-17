import { Shield, Lock, Database, Award, CheckCircle2 } from "lucide-react";

const items = [
  { icon: Shield, text: "NMVTIS Authorized Source" },
  { icon: Database, text: "40+ Data Points per VIN" },
  { icon: Lock, text: "256-bit SSL Encrypted" },
  { icon: CheckCircle2, text: "100% Money-Back Guarantee" },
  { icon: Award, text: "Trusted by 50,000+ Buyers" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-600">
          {items.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-primary-600" />
              <span className="font-medium">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
