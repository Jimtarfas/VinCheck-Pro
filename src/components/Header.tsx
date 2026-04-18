"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, ChevronRight, User, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navLinks = [
  { href: "/vin-check",  label: "How it Works" },
  { href: "/#pricing",   label: "Pricing" },
  { href: "/blog",       label: "Blog" },
  { href: "/guides",     label: "Guides" },
  { href: "/about",      label: "About" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isReportPage = pathname?.startsWith("/report/") ?? false;

  const [mobileOpen, setMobileOpen]     = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [hidden, setHidden]             = useState(false);
  const [user, setUser]                 = useState<SupabaseUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Auto-hide header on report pages: hide when scrolling down, show when
  // scrolling up, near the top of the page, or when cursor reaches top edge.
  useEffect(() => {
    if (!isReportPage) {
      setHidden(false);
      return;
    }

    let lastY = window.scrollY;
    let ticking = false;

    const onAutoHideScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 80) {
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
  }, [isReportPage]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Guard: skip Supabase if env vars are not configured
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

  const handleLogout = async () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-surface/85 shadow-sm border-b border-outline-variant/10"
          : "bg-surface/90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ── Brand ── */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 17H3v-4l2-5h9l4 5h1a2 2 0 0 1 2 2v2h-2" />
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
              <path d="M9 17h6" />
            </svg>
          </div>
          <span className="text-xl font-headline font-black text-primary tracking-tighter">
            VINCheck<span style={{ color: "var(--color-secondary-container)" }}> Pro</span>
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-on-surface/70 hover:text-primary rounded-lg hover:bg-surface-container transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop auth ── */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
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
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/10 py-1 z-50">
                  <p className="px-4 py-2 text-xs text-outline truncate">{user.email}</p>
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
                href="/signup"
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
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 py-4 space-y-1 bg-surface-container-lowest border-t border-outline-variant/10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-on-surface/70 hover:text-primary rounded-xl hover:bg-surface-container transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 space-y-2">
            {user ? (
              <button
                onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="block w-full text-center px-5 py-3 text-sm font-semibold text-error bg-error-container/20 rounded-xl cursor-pointer"
              >
                Log out
              </button>
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
