"use client";

import Link from "@/components/LocaleLink";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { detectLocale, type Locale } from "@/i18n/config";

// Footer translation map. Same shape as Header's HEADER_COPY: keys are
// stable English identifiers, lookup falls back to en when a key is
// missing in es/fr.
const FOOTER_COPY = {
  en: {
    blurb:
      "Comprehensive vehicle history reports powered by trusted data sources. Decode any VIN, check title status, accidents, recalls, and market value in seconds.",
    Company: "Company",
    Policies: "Policies",
    "Popular Brands": "Popular Brands",
    Language: "Language",
    "About Us": "About Us",
    Contact: "Contact",
    "For Dealers": "For Dealers",
    "Help Center": "Help Center",
    Research: "Research",
    Changelog: "Changelog",
    Pricing: "Pricing",
    "Log In": "Log In",
    "Sign Up": "Sign Up",
    "Privacy Policy": "Privacy Policy",
    "Terms of Service": "Terms of Service",
    "Refund Policy": "Refund Policy",
    Disclaimer: "Disclaimer",
    "Cookie Policy": "Cookie Policy",
    Accessibility: "Accessibility",
    "Trust & Security": "Trust & Security",
    viewAll: "View all 33 brands →",
    vinCheckSuffix: "VIN Check",
    poweredBy: "Powered by Auto.dev API",
    copyrightLine: (y: number) =>
      `© ${y} Cognifyx Solutions LLC. CarCheckerVIN is a trademark of Cognifyx Solutions LLC. All rights reserved.`,
  },
  es: {
    blurb:
      "Reportes completos de historial vehicular con datos de fuentes confiables. Decodifica cualquier VIN, verifica el estado del título, accidentes, llamados a revisión y valor de mercado en segundos.",
    Company: "Empresa",
    Policies: "Políticas",
    "Popular Brands": "Marcas populares",
    Language: "Idioma",
    "About Us": "Acerca de",
    Contact: "Contacto",
    "For Dealers": "Para concesionarios",
    "Help Center": "Centro de ayuda",
    Research: "Investigación",
    Changelog: "Novedades",
    Pricing: "Precios",
    "Log In": "Iniciar sesión",
    "Sign Up": "Registrarse",
    "Privacy Policy": "Política de privacidad",
    "Terms of Service": "Términos del servicio",
    "Refund Policy": "Política de reembolso",
    Disclaimer: "Aviso legal",
    "Cookie Policy": "Política de cookies",
    Accessibility: "Accesibilidad",
    "Trust & Security": "Confianza y seguridad",
    viewAll: "Ver las 33 marcas →",
    vinCheckSuffix: "verificación VIN",
    poweredBy: "Con tecnología de Auto.dev API",
    copyrightLine: (y: number) =>
      `© ${y} Cognifyx Solutions LLC. CarCheckerVIN es una marca registrada de Cognifyx Solutions LLC. Todos los derechos reservados.`,
  },
  fr: {
    blurb:
      "Rapports complets d’historique de véhicule alimentés par des sources fiables. Décode n’importe quel VIN, vérifie le statut du titre, les accidents, les rappels et la valeur de marché en quelques secondes.",
    Company: "Entreprise",
    Policies: "Politiques",
    "Popular Brands": "Marques populaires",
    Language: "Langue",
    "About Us": "À propos",
    Contact: "Contact",
    "For Dealers": "Pour concessionnaires",
    "Help Center": "Centre d’aide",
    Research: "Recherche",
    Changelog: "Nouveautés",
    Pricing: "Tarifs",
    "Log In": "Connexion",
    "Sign Up": "Inscription",
    "Privacy Policy": "Politique de confidentialité",
    "Terms of Service": "Conditions du service",
    "Refund Policy": "Politique de remboursement",
    Disclaimer: "Mentions légales",
    "Cookie Policy": "Politique de cookies",
    Accessibility: "Accessibilité",
    "Trust & Security": "Confiance et sécurité",
    viewAll: "Voir les 33 marques →",
    vinCheckSuffix: "vérification VIN",
    poweredBy: "Propulsé par l’API Auto.dev",
    copyrightLine: (y: number) =>
      `© ${y} Cognifyx Solutions LLC. CarCheckerVIN est une marque déposée de Cognifyx Solutions LLC. Tous droits réservés.`,
  },
} as const;

function tFooter(locale: Locale, key: string): string {
  const dict = FOOTER_COPY[locale] || FOOTER_COPY.en;
  const v = (dict as unknown as Record<string, unknown>)[key];
  return typeof v === "string" ? v : key;
}

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
  const pathname = usePathname();
  const { locale } = detectLocale(pathname || "/");
  const t = (k: string) => tFooter(locale, k);
  const c = FOOTER_COPY[locale] || FOOTER_COPY.en;
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
              {c.blurb}
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
            <h3 className="text-xs font-black text-inverse-on-surface/80 uppercase tracking-widest mb-5">{t("Company")}</h3>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">{t(l.label)}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-xs font-black text-inverse-on-surface/80 uppercase tracking-widest mb-5">{t("Policies")}</h3>
            <ul className="space-y-3">
              {policyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">{t(l.label)}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popular brands */}
        <div className="border-t border-white/5 pt-8 mb-8">
          <h3 className="text-xs font-black text-inverse-on-surface/80 uppercase tracking-widest mb-4">{t("Popular Brands")}</h3>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-inverse-on-surface/75">
            {["ford","chevrolet","toyota","honda","nissan","bmw","mercedes-benz","audi","volkswagen","jeep","dodge","ram","gmc","hyundai","kia","subaru","mazda","lexus","acura","tesla"].map((make) => (
              <Link key={make} href={`/vin-check/${make}`} className="hover:text-white transition-colors capitalize">
                {make.charAt(0).toUpperCase() + make.slice(1)} {c.vinCheckSuffix}
              </Link>
            ))}
            <Link href="/vin-check" className="font-bold hover:text-white transition-colors" style={{ color: "var(--color-secondary-container)" }}>
              {c.viewAll}
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
            {c.copyrightLine(new Date().getFullYear())}
          </p>
          <p className="text-xs text-inverse-on-surface/20">{c.poweredBy}</p>
        </div>
      </div>
    </footer>
  );
}
