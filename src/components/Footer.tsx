import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const checkLinks = [
  { href: "/vin-check", label: "VIN Check" },
  { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
  { href: "/salvage-title-check", label: "Salvage Title Check" },
  { href: "/accident-history-check", label: "Accident History" },
  { href: "/odometer-check", label: "Odometer Check" },
  { href: "/lemon-check", label: "Lemon Check" },
];

const guideLinks = [
  { href: "/guides", label: "All VIN Guides" },
  { href: "/guides/free-vin-check", label: "Free VIN Decoder" },
  { href: "/guides/how-to-read-a-vin", label: "How to Read a VIN" },
  { href: "/guides/what-is-a-vin-number", label: "What Is a VIN Number" },
  { href: "/vin-check-vs-carfax", label: "vs. Carfax" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/login", label: "Log In" },
  { href: "/signup", label: "Sign Up" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 17H3v-4l2-5h9l4 5h1a2 2 0 0 1 2 2v2h-2" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /><path d="M9 17h6" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">VINCheck<span className="text-primary-400"> Pro</span></span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Comprehensive vehicle history reports powered by trusted data sources. Decode any VIN, check title status, accidents, recalls, and market value in seconds.
            </p>
            <ul className="mt-5 space-y-2.5">
              <li className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-slate-500" />support@carcheckervin.com</li>
              <li className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-slate-500" />1-800-VIN-CHECK</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">VIN Checks</h3>
            <ul className="space-y-2.5">
              {checkLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Guides</h3>
            <ul className="space-y-2.5">
              {guideLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-8">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Popular Brands</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
            <Link href="/vin-check/ford" className="hover:text-white transition-colors">Ford VIN Check</Link>
            <Link href="/vin-check/chevrolet" className="hover:text-white transition-colors">Chevrolet VIN Check</Link>
            <Link href="/vin-check/toyota" className="hover:text-white transition-colors">Toyota VIN Check</Link>
            <Link href="/vin-check/honda" className="hover:text-white transition-colors">Honda VIN Check</Link>
            <Link href="/vin-check/nissan" className="hover:text-white transition-colors">Nissan VIN Check</Link>
            <Link href="/vin-check/bmw" className="hover:text-white transition-colors">BMW VIN Check</Link>
            <Link href="/vin-check/mercedes-benz" className="hover:text-white transition-colors">Mercedes-Benz VIN Check</Link>
            <Link href="/vin-check/audi" className="hover:text-white transition-colors">Audi VIN Check</Link>
            <Link href="/vin-check/volkswagen" className="hover:text-white transition-colors">Volkswagen VIN Check</Link>
            <Link href="/vin-check/jeep" className="hover:text-white transition-colors">Jeep VIN Check</Link>
            <Link href="/vin-check/dodge" className="hover:text-white transition-colors">Dodge VIN Check</Link>
            <Link href="/vin-check/ram" className="hover:text-white transition-colors">Ram VIN Check</Link>
            <Link href="/vin-check/gmc" className="hover:text-white transition-colors">GMC VIN Check</Link>
            <Link href="/vin-check/hyundai" className="hover:text-white transition-colors">Hyundai VIN Check</Link>
            <Link href="/vin-check/kia" className="hover:text-white transition-colors">Kia VIN Check</Link>
            <Link href="/vin-check/subaru" className="hover:text-white transition-colors">Subaru VIN Check</Link>
            <Link href="/vin-check/mazda" className="hover:text-white transition-colors">Mazda VIN Check</Link>
            <Link href="/vin-check/lexus" className="hover:text-white transition-colors">Lexus VIN Check</Link>
            <Link href="/vin-check/acura" className="hover:text-white transition-colors">Acura VIN Check</Link>
            <Link href="/vin-check/tesla" className="hover:text-white transition-colors">Tesla VIN Check</Link>
            <Link href="/vin-check" className="text-primary-400 hover:text-white font-medium transition-colors">View all 33 brands &rarr;</Link>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-600">&copy; {new Date().getFullYear()} VINCheck Pro. All rights reserved.</p>
          <p className="text-xs text-slate-700">Powered by Auto.dev API</p>
        </div>
      </div>
    </footer>
  );
}
