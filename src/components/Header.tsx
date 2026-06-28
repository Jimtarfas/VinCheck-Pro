"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu, X, ChevronRight, ChevronDown, User, LogOut, FileText,
  SquareArrowOutUpRight,
} from "lucide-react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

// ── Navigation model ─────────────────────────────────────────────────
// The primary nav is a Claude.ai-style mega-menu: a few top-level entries,
// each either a plain link or a dropdown of grouped columns. `external`
// items render as <a target="_blank"> with the SquareArrowOutUpRight icon
// (matching the off-domain affordance) instead of a prefetched <Link>.
//
// Keep the top-level labels/hrefs in sync with the SiteNavigationElement
// JSON-LD in src/app/layout.tsx so Google's sitelinks signal stays
// consistent — update both together.
interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}
interface NavColumn {
  heading: string;
  items: NavItem[];
}
type TopNav =
  | { kind: "link"; href: string; label: string; external?: boolean }
  | { kind: "menu"; label: string; columns: NavColumn[] };

const NAV: TopNav[] = [
  {
    kind: "menu",
    label: "VIN Checks",
    columns: [
      {
        heading: "History Checks",
        items: [
          { href: "/vin-check", label: "VIN Check" },
          { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
          { href: "/salvage-title-check", label: "Salvage Title Check" },
          { href: "/accident-history-check", label: "Accident History" },
          { href: "/odometer-check", label: "Odometer Check" },
          { href: "/lemon-check", label: "Lemon Check" },
          { href: "/flood-check", label: "Flood Check" },
        ],
      },
      {
        heading: "More Checks",
        items: [
          { href: "/airbag-check", label: "Airbag Check" },
          { href: "/hail-damage-check", label: "Hail Damage Check" },
          { href: "/impound-check", label: "Impound Check" },
          { href: "/dealer-check", label: "Dealer Check" },
          { href: "/recall-check", label: "Recall Check" },
          { href: "/warranty-check", label: "Warranty Check" },
          { href: "/total-loss-check", label: "Total Loss Check" },
          { href: "/vehicle-lien-check", label: "Vehicle Lien Check" },
        ],
      },
      {
        heading: "Title & Registration",
        items: [
          { href: "/vehicle-registration", label: "Vehicle Registration" },
          { href: "/vehicle-title", label: "Vehicle Title" },
          { href: "/bill-of-sale", label: "Bill of Sale" },
          { href: "/vin-check/state", label: "VIN Check by State" },
          { href: "/market-value", label: "Market Value" },
        ],
      },
    ],
  },
  {
    kind: "menu",
    label: "Tools",
    columns: [
      {
        heading: "Plate & Decode",
        items: [
          { href: "/plate-to-vin", label: "Plate to VIN" },
          { href: "/state-to-vin", label: "State to VIN" },
          { href: "/license-plate-lookup", label: "License Plate Lookup" },
          { href: "/look-up-car-plates-free", label: "Look Up Car Plates Free" },
          { href: "/vin-decoder", label: "VIN Decoder" },
          { href: "/window-sticker", label: "Window Sticker Maker" },
          { href: "/paint-code-lookup", label: "Paint Code Lookup" },
          { href: "/obd2-codes", label: "OBD-II Code Lookup" },
        ],
      },
      {
        heading: "Calculators",
        items: [
          { href: "/car-loan-calculator", label: "Car Loan Calculator" },
          { href: "/car-affordability-calculator", label: "Car Affordability" },
          { href: "/trade-in-value-estimator", label: "Trade-In Estimator" },
          { href: "/gas-mileage-calculator", label: "Gas Mileage Calculator" },
          { href: "/car-depreciation-calculator", label: "Car Depreciation" },
          { href: "/lease-vs-buy-calculator", label: "Lease vs Buy" },
          { href: "/total-cost-of-ownership-calculator", label: "Total Cost of Ownership" },
          { href: "/diminished-value-calculator", label: "Diminished Value" },
        ],
      },
      {
        heading: "By Vehicle Type",
        items: [
          { href: "/motorcycle-vin-search", label: "Motorcycle VIN Search" },
          { href: "/motorcycle-vin-check", label: "Motorcycle VIN Check" },
          { href: "/rv-vin-check", label: "RV VIN Check" },
          { href: "/semi-truck-vin-lookup", label: "Semi Truck VIN Lookup" },
          { href: "/golf-cart-vin-lookup", label: "Golf Cart VIN Lookup" },
          { href: "/hin-lookup", label: "HIN Lookup (Boat VIN)" },
          { href: "/classic-car-vin", label: "Classic Car VIN" },
          { href: "/compare-cars", label: "Compare Vehicles" },
        ],
      },
    ],
  },
  {
    kind: "menu",
    label: "Guides",
    columns: [
      {
        heading: "Guides",
        items: [
          { href: "/guides", label: "All VIN Guides" },
          { href: "/guides/free-vin-check", label: "Free VIN Decoder" },
          { href: "/guides/how-to-read-a-vin", label: "How to Read a VIN" },
          { href: "/guides/what-is-a-vin-number", label: "What Is a VIN Number" },
          { href: "/guides/used-car-buying-complete-guide", label: "Used Car Buying Guide" },
          { href: "/guides/vehicle-fraud-prevention", label: "Vehicle Fraud Prevention" },
          { href: "/road-traffic-signs", label: "Road & Traffic Signs" },
          { href: "/glossary", label: "VIN Glossary" },
          { href: "/blog", label: "Blog" },
        ],
      },
      {
        heading: "Compare",
        items: [
          { href: "/vin-check-vs-carfax", label: "vs. Carfax" },
          { href: "/vin-check-vs-autocheck", label: "vs. AutoCheck" },
          { href: "/vin-check-vs-bumper", label: "vs. Bumper" },
          { href: "/vin-check-vs-clearvin", label: "vs. ClearVin" },
          { href: "/vin-check-vs-vinaudit", label: "vs. VinAudit" },
          { href: "/used-car-inspection-checklist", label: "Inspection Checklist" },
        ],
      },
      {
        heading: "Marketplace",
        items: [
          { href: "/marketplace-vin-check", label: "All Marketplaces" },
          { href: "/marketplace-vin-check/facebook-marketplace", label: "Facebook Marketplace" },
          { href: "/marketplace-vin-check/craigslist", label: "Craigslist" },
          { href: "/marketplace-vin-check/offerup", label: "OfferUp" },
          { href: "/marketplace-vin-check/ebay-motors", label: "eBay Motors" },
          { href: "/marketplace-vin-check/autotrader", label: "AutoTrader" },
          { href: "/marketplace-vin-check/copart", label: "Copart" },
        ],
      },
    ],
  },
  { kind: "link", href: "/pricing", label: "Pricing" },
  { kind: "link", href: "https://reviews.carcheckervin.com", label: "Reviews", external: true },
];

// `logoHref` lets the parent (root layout) override where the brand logo links.
// On the reviews subdomain (reviews.carcheckervin.com) we pass the absolute www.
// URL so clicking the logo escapes back to the main site instead of looping
// the user back to the reviews page on the same subdomain.
export default function Header({ logoHref = "/" }: { logoHref?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const isAdmin =
    pathname === "/admin" || (pathname?.startsWith("/admin/") ?? false);
  const isOrder =
    pathname === "/order" || (pathname?.startsWith("/order/") ?? false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-hide header site-wide so it gets out of the way while reading.
  // While the mobile menu or a desktop dropdown is open we stay visible so
  // the open menu is reachable.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onAutoHideScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 80 || mobileOpen || openMenu) {
          setHidden(false);
        } else if (y > lastY + 6) {
          setHidden(true);
          setUserMenuOpen(false);
        } else if (y < lastY - 6) {
          setHidden(false);
        }
        lastY = y;
        ticking = false;
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) setHidden(false);
    };

    window.addEventListener("scroll", onAutoHideScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onAutoHideScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [mobileOpen, openMenu]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      subscription.unsubscribe();
    };
  }, []);

  // Close the dropdown on route change so it doesn't linger over the new page.
  // Done with the render-time "adjust state when a value changes" pattern
  // (React docs) rather than an effect — avoids a cascading-render pass.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }

  const handleLogout = async () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  // Hover open/close with a small close delay so moving the cursor from the
  // trigger to the panel (across the small gap) doesn't dismiss the menu.
  const openNow = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  if (isAdmin || isOrder) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-white/85 shadow-md shadow-primary/5 border-b border-outline-variant/30"
          : "bg-white border-b border-outline-variant/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ── Brand ── */}
        <Logo variant="onLight" size="md" href={logoHref} />

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((entry) => {
            if (entry.kind === "link") {
              return entry.external ? (
                <a
                  key={entry.label}
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-on-surface/70 hover:text-primary rounded-lg hover:bg-surface-container transition-all duration-200"
                >
                  {entry.label}
                  <SquareArrowOutUpRight className="w-3.5 h-3.5 opacity-70" />
                </a>
              ) : (
                <Link
                  key={entry.label}
                  href={entry.href}
                  className="px-4 py-2 text-sm font-medium text-on-surface/70 hover:text-primary rounded-lg hover:bg-surface-container transition-all duration-200"
                >
                  {entry.label}
                </Link>
              );
            }

            const isOpen = openMenu === entry.label;
            return (
              <div
                key={entry.label}
                className="relative"
                onMouseEnter={() => openNow(entry.label)}
                onMouseLeave={closeSoon}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenMenu(isOpen ? null : entry.label)}
                  className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                    isOpen
                      ? "text-primary bg-surface-container"
                      : "text-on-surface/70 hover:text-primary hover:bg-surface-container"
                  }`}
                >
                  {entry.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Mega-menu panel */}
                {isOpen && (
                  <div className="absolute left-0 top-full pt-3 z-50">
                    <div className="rounded-2xl bg-white shadow-2xl shadow-primary/10 border border-outline-variant/40 p-6 grid gap-x-10 gap-y-2"
                      style={{ gridTemplateColumns: `repeat(${entry.columns.length}, minmax(12rem, 1fr))` }}
                    >
                      {entry.columns.map((col) => (
                        <div key={col.heading}>
                          <p className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant mb-3">
                            {col.heading}
                          </p>
                          <ul className="space-y-0.5">
                            {col.items.map((item) => (
                              <li key={item.href}>
                                {item.external ? (
                                  <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 -mx-2 text-[15px] text-on-surface hover:text-primary hover:bg-primary/5 transition-colors"
                                  >
                                    {item.label}
                                    <SquareArrowOutUpRight className="w-3.5 h-3.5 opacity-70" />
                                  </a>
                                ) : (
                                  <Link
                                    href={item.href}
                                    className="block rounded-lg px-2 py-1.5 -mx-2 text-[15px] text-on-surface hover:text-primary hover:bg-primary/5 transition-colors"
                                  >
                                    {item.label}
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ── Desktop auth ── */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <LanguageSwitcher variant="header" />
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-surface-container transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold font-headline">
                  {user.email?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
                </div>
                <span className="text-sm font-medium text-on-surface max-w-[120px] truncate">
                  {user.email?.split("@")[0]}
                </span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/10 py-1 z-50">
                  <p className="px-4 py-2 text-xs text-outline truncate">{user.email}</p>
                  <div className="h-px bg-surface-container mx-2" />
                  <Link
                    href="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4" /> My reports
                  </Link>
                  <div className="h-px bg-surface-container mx-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-error hover:bg-error-container/30 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-on-surface/70 hover:text-primary transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/vin-check"
                className="group flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold text-on-primary bg-primary rounded-full hover:bg-primary-container transition-all shadow-md shadow-primary/20"
              >
                Check VIN <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-on-surface/60 hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-[85vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"}`}>
        <div className="px-5 py-4 space-y-1 bg-surface-container-lowest border-t border-outline-variant/10">
          {NAV.map((entry) => {
            if (entry.kind === "link") {
              return entry.external ? (
                <a
                  key={entry.label}
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-on-surface/80 hover:text-primary rounded-xl hover:bg-surface-container transition-all"
                >
                  {entry.label}
                  <SquareArrowOutUpRight className="w-3.5 h-3.5 opacity-70" />
                </a>
              ) : (
                <Link
                  key={entry.label}
                  href={entry.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-on-surface/80 hover:text-primary rounded-xl hover:bg-surface-container transition-all"
                >
                  {entry.label}
                </Link>
              );
            }

            const isOpen = mobileSection === entry.label;
            return (
              <div key={entry.label}>
                <button
                  type="button"
                  onClick={() => setMobileSection(isOpen ? null : entry.label)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-on-surface/80 hover:text-primary rounded-xl hover:bg-surface-container transition-all cursor-pointer"
                >
                  {entry.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="pl-3 pb-2 space-y-3">
                    {entry.columns.map((col) => (
                      <div key={col.heading}>
                        <p className="px-4 pt-1 pb-1 text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
                          {col.heading}
                        </p>
                        <ul>
                          {col.items.map((item) => (
                            <li key={item.href}>
                              {item.external ? (
                                <a
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-1.5 px-4 py-2 text-sm text-on-surface/75 hover:text-primary rounded-lg hover:bg-surface-container transition-colors"
                                >
                                  {item.label}
                                  <SquareArrowOutUpRight className="w-3.5 h-3.5 opacity-70" />
                                </a>
                              ) : (
                                <Link
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block px-4 py-2 text-sm text-on-surface/75 hover:text-primary rounded-lg hover:bg-surface-container transition-colors"
                                >
                                  {item.label}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-3 space-y-2 border-t border-outline-variant/10 mt-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-center px-5 py-3 text-sm font-semibold text-on-surface bg-surface-container rounded-xl"
                >
                  <FileText className="w-4 h-4" /> My reports
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="block w-full text-center px-5 py-3 text-sm font-semibold text-error bg-error-container/20 rounded-xl cursor-pointer"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-5 py-3 text-sm font-semibold text-on-surface/70 bg-surface-container rounded-xl">
                  Log in
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-5 py-3 text-sm font-bold text-on-primary bg-primary rounded-full">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
