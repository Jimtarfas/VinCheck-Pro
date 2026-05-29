"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

/**
 * Renders the public Footer everywhere except /admin/*. The admin panel has
 * its own chrome (see src/app/admin/layout.tsx); showing the marketing
 * footer below it leaks public-site links into the operator console and
 * makes the admin surface feel unprofessional.
 *
 * Pairs with the same pathname check in src/components/Header.tsx.
 */
export default function ConditionalFooter() {
  const pathname = usePathname();
  const isAdmin =
    pathname === "/admin" || (pathname?.startsWith("/admin/") ?? false);
  if (isAdmin) return null;
  return <Footer />;
}
