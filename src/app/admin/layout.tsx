import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/supabase/admin";
import { LogOut, ArrowUpRight, ShieldCheck } from "lucide-react";
import AdminNav from "./_components/AdminNav";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin — CarCheckerVIN",
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/chat", label: "Live Chat" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/signups", label: "Signup Sources" },
  { href: "/admin/lookups", label: "VIN Lookups" },
  { href: "/admin/clearvin", label: "ClearVin" },
  { href: "/admin/contact", label: "Contact Forms" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin");
  }

  if (!isAdminEmail(user.email)) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky admin header — brand on left, nav in middle, user controls on right.
          The public marketing Header is hidden on /admin/* (see Header.tsx) so
          this is the only chrome at the top of the viewport. */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-6">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-slate-900 text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-900 tracking-tight">
                Admin
              </span>
            </div>

            <div className="flex-1 min-w-0 hidden sm:block">
              <AdminNav items={navItems} />
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className="hidden md:inline-block text-xs font-mono text-slate-500 px-2 py-1 bg-slate-50 border border-slate-200 rounded-md max-w-[180px] truncate"
                title={user.email ?? ""}
              >
                {user.email}
              </span>
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition"
              >
                Site
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-md transition"
                  aria-label="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </form>
            </div>
          </div>

          {/* Mobile nav row — surfaces nav below header on small screens
              where the inline middle slot is hidden. */}
          <div className="sm:hidden border-t border-slate-100">
            <AdminNav items={navItems} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main>{children}</main>
      </div>
    </div>
  );
}
