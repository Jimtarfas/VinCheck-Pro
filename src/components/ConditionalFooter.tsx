"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

/**
 * Renders the public marketing Footer everywhere except where the page
 * provides its own chrome:
 *   - /admin/*  — admin panel has its own top-bar (src/app/admin/layout.tsx)
 *   - /order/*  — served from app.carcheckervin.com via proxy rewrite; the
 *                /order layout renders its own compliance footer (legal
 *                links + NMVTIS attribution) and stacking the marketing
 *                footer on top of it leaks the main-site nav into the
 *                checkout surface ClearVin reviews.
 *
 * Pairs with the same pathname check in src/components/Header.tsx.
 */
export default function ConditionalFooter() {
  const pathname = usePathname();
  const isAdmin =
    pathname === "/admin" || (pathname?.startsWith("/admin/") ?? false);
  const isOrder =
    pathname === "/order" || (pathname?.startsWith("/order/") ?? false);
  if (isAdmin || isOrder) return null;
  return <Footer />;
}
