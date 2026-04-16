import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const serviceLinks = [
  { href: "/#hero", label: "VIN Decoder" },
  { href: "/#features", label: "Vehicle Reports" },
  { href: "/#pricing", label: "Pricing" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/#faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 17H3v-4l2-5h9l4 5h1a2 2 0 0 1 2 2v2h-2" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /><path d="M9 17h6" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">VINCheck<span className="text-primary-400"> Pro</span></span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">Comprehensive vehicle history reports powered by trusted data sources.</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((l) => <li key={l.href}><Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => <li key={l.href}><Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-slate-500" />support@carcheckervin.com</li>
              <li className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-slate-500" />1-800-VIN-CHECK</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-600">&copy; {new Date().getFullYear()} VINCheck Pro. All rights reserved.</p>
          <p className="text-xs text-slate-700">Powered by Auto.dev API</p>
        </div>
      </div>
    </footer>
  );
}
