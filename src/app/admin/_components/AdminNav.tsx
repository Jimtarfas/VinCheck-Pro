"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Item {
  href: string;
  label: string;
}

/**
 * Top-bar admin nav. Highlights the active section based on pathname.
 * Lives in a client component so we can read usePathname; the parent
 * layout remains server-rendered for auth/redirect.
 *
 * "Active" matches exact href for /admin (overview), and prefix match
 * for the rest, so /admin/chat/[id] still highlights "Live Chat".
 */
export default function AdminNav({ items }: { items: Item[] }) {
  const pathname = usePathname() || "/admin";

  return (
    <nav className="flex items-center gap-1 overflow-x-auto -mx-1 px-1 scrollbar-none">
      {items.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              "relative px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors " +
              (isActive
                ? "text-slate-900"
                : "text-slate-500 hover:text-slate-900")
            }
          >
            {item.label}
            {isActive && (
              <span
                aria-hidden="true"
                className="absolute inset-x-3 -bottom-px h-0.5 bg-slate-900 rounded-full"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
