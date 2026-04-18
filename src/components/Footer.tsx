import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const checkLinks = [
  { href: "/vin-check",              label: "VIN Check" },
  { href: "/stolen-vehicle-check",   label: "Stolen Vehicle Check" },
  { href: "/salvage-title-check",    label: "Salvage Title Check" },
  { href: "/accident-history-check", label: "Accident History" },
  { href: "/odometer-check",         label: "Odometer Check" },
  { href: "/lemon-check",            label: "Lemon Check" },
];

const guideLinks = [
  { href: "/blog",                            label: "Blog" },
  { href: "/guides",                          label: "All VIN Guides" },
  { href: "/glossary",                        label: "VIN Glossary" },
  { href: "/guides/free-vin-check",           label: "Free VIN Decoder" },
  { href: "/guides/how-to-read-a-vin",        label: "How to Read a VIN" },
  { href: "/guides/what-is-a-vin-number",     label: "What Is a VIN Number" },
  { href: "/vin-check-vs-carfax",             label: "vs. Carfax" },
  { href: "/vin-check/state",                 label: "VIN Check by State" },
];

const companyLinks = [
  { href: "/about",   label: "About Us" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq",    label: "FAQ" },
  { href: "/login",   label: "Log In" },
  { href: "/signup",  label: "Sign Up" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms",   label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface/60">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">

          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 17H3v-4l2-5h9l4 5h1a2 2 0 0 1 2 2v2h-2" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                  <path d="M9 17h6" />
                </svg>
              </div>
              <span className="text-xl font-headline font-black text-white tracking-tighter">
                VINCheck<span style={{ color: "var(--color-secondary-container)" }}> Pro</span>
              </span>
            </Link>
            <p className="text-sm text-inverse-on-surface/50 leading-relaxed max-w-sm mb-6">
              Comprehensive vehicle history reports powered by trusted data sources. Decode any VIN, check title status, accidents, recalls, and market value in seconds.
            </p>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-inverse-on-surface/40 flex-shrink-0" />
                support@carcheckervin.com
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-inverse-on-surface/40 flex-shrink-0" />
                1-800-VIN-CHECK
              </li>
            </ul>
          </div>

          {/* VIN Checks */}
          <div>
            <h3 className="text-xs font-black text-inverse-on-surface/80 uppercase tracking-widest mb-5">VIN Checks</h3>
            <ul className="space-y-3">
              {checkLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="text-xs font-black text-inverse-on-surface/80 uppercase tracking-widest mb-5">Guides</h3>
            <ul className="space-y-3">
              {guideLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-black text-inverse-on-surface/80 uppercase tracking-widest mb-5">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popular brands */}
        <div className="border-t border-white/5 pt-8 mb-8">
          <h3 className="text-xs font-black text-inverse-on-surface/40 uppercase tracking-widest mb-4">Popular Brands</h3>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-inverse-on-surface/30">
            {["ford","chevrolet","toyota","honda","nissan","bmw","mercedes-benz","audi","volkswagen","jeep","dodge","ram","gmc","hyundai","kia","subaru","mazda","lexus","acura","tesla"].map((make) => (
              <Link key={make} href={`/vin-check/${make}`} className="hover:text-white transition-colors capitalize">
                {make.charAt(0).toUpperCase() + make.slice(1)} VIN Check
              </Link>
            ))}
            <Link href="/vin-check" className="font-bold hover:text-white transition-colors" style={{ color: "var(--color-secondary-container)" }}>
              View all 33 brands →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-inverse-on-surface/30">
            &copy; {new Date().getFullYear()} VINCheck Pro. All rights reserved.
          </p>
          <p className="text-xs text-inverse-on-surface/20">Powered by Auto.dev API</p>
        </div>
      </div>
    </footer>
  );
}
