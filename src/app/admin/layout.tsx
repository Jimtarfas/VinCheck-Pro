import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/supabase/admin";
import { LayoutDashboard, Users, Search, LogOut, Home } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin — CarCheckerVIN",
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/lookups", label: "VIN Lookups", icon: Search },
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
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Signed in as <span className="font-mono text-slate-700">{user.email}</span>
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg transition"
          >
            <Home className="w-4 h-4" />
            Back to site
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <nav className="md:w-56 flex-shrink-0">
            <ul className="flex md:flex-col gap-1 bg-white border border-slate-200 rounded-xl p-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="border-t border-slate-100 mt-1 pt-1">
                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </form>
              </li>
            </ul>
          </nav>

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
