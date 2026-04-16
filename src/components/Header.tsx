"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronRight, User, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });

    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 17H3v-4l2-5h9l4 5h1a2 2 0 0 1 2 2v2h-2" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
                <path d="M9 17h6" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900">
              VINCheck<span className="text-primary-600"> Pro</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 rounded-lg hover:bg-slate-50 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold">
                    {user.email?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
                  </div>
                  <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">{user.email?.split("@")[0]}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl border border-slate-200 shadow-lg py-1 z-50">
                    <p className="px-4 py-2 text-xs text-slate-400 truncate">{user.email}</p>
                    <div className="border-t border-slate-100" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
                      <LogOut className="w-4 h-4" /> Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
                  Log in
                </Link>
                <Link href="/signup" className="group flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all shadow-md shadow-primary-600/20">
                  Sign Up <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-slate-600" aria-label="Toggle menu">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 py-4 space-y-1 bg-white border-t border-slate-100">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-primary-600 rounded-xl hover:bg-slate-50 transition-all">
              {link.label}
            </Link>
          ))}
          {user ? (
            <button onClick={() => { handleLogout(); setMobileOpen(false); }}
              className="block w-full text-center px-5 py-3 mt-2 text-sm font-semibold text-red-600 bg-red-50 rounded-xl cursor-pointer">
              Log out
            </button>
          ) : (
            <>
              <Link href="/login" onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-3 mt-2 text-sm font-semibold text-slate-700 bg-slate-50 rounded-xl">
                Log in
              </Link>
              <Link href="/signup" onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-3 mt-1 text-sm font-semibold text-white bg-primary-600 rounded-xl">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
