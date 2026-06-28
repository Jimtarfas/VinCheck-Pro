import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

// Footer is intentionally lean: the full tool / check / guide / marketplace
// catalog now lives in the header mega-menu. Down here we keep only the
// site identity + contact, the Company links, the Policies, and the
// Popular Brands strip — the things people scroll to the bottom looking for.
const companyLinks = [
  { href: "/about",     label: "About Us" },
  { href: "/contact",   label: "Contact" },
  { href: "/dealers",   label: "For Dealers" },
  { href: "/help",      label: "Help Center" },
  { href: "/research",  label: "Research" },
  { href: "/changelog", label: "Changelog" },
  { href: "/pricing",   label: "Pricing" },
  { href: "/login",     label: "Log In" },
  { href: "/signup",    label: "Sign Up" },
];

const policyLinks = [
  { href: "/privacy",       label: "Privacy Policy" },
  { href: "/terms",         label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/disclaimer",    label: "Disclaimer" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/trust",         label: "Trust & Security" },
];

export default function Footer() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-10 sm:pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-16">

          {/* Brand / site information + contact */}
          <div className="col-span-2">
            <div className="mb-5">
              <Logo variant="onDark" size="md" />
            </div>
            <p className="text-sm text-inverse-on-surface/85 leading-relaxed max-w-sm mb-6">
              Comprehensive vehicle history reports powered by trusted data sources. Decode any VIN, check title status, accidents, recalls, and market value in seconds.
            </p>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-inverse-on-surface/80 flex-shrink-0" />
                contact@carcheckervin.com
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-inverse-on-surface/80 flex-shrink-0" />
                +1 (564) 212-3985
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-inverse-on-surface/80 flex-shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  Cognifyx Solutions LLC
                  <br />
                  1209 Mountain Road Pl NE, Ste N
                  <br />
                  Albuquerque, NM 87110
                </address>
              </li>
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

          {/* Policies */}
          <div>
            <h3 className="text-xs font-black text-inverse-on-surface/80 uppercase tracking-widest mb-5">Policies</h3>
            <ul className="space-y-3">
              {policyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popular brands */}
        <div className="border-t border-white/5 pt-8 mb-8">
          <h3 className="text-xs font-black text-inverse-on-surface/80 uppercase tracking-widest mb-4">Popular Brands</h3>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-inverse-on-surface/75">
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

        {/* Language picker — surfaced at the bottom of long pages too. Inline
            list (no dropdown) so the alternate-language URL is a direct
            anchor, giving Google an internal link signal between locales. */}
        <div className="border-t border-white/5 pt-6 pb-4 flex justify-center sm:justify-start">
          <div className="rounded-lg bg-white/[0.03] px-3 py-2 [&_a]:text-inverse-on-surface [&_span]:text-inverse-on-surface">
            <LanguageSwitcher variant="footer" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-inverse-on-surface/75">
            &copy; {new Date().getFullYear()} Cognifyx Solutions LLC. CarCheckerVIN
            is a trademark of Cognifyx Solutions LLC. All rights reserved.
          </p>
          <p className="text-xs text-inverse-on-surface/20">Powered by Auto.dev API</p>
        </div>
      </div>
    </footer>
  );
}
