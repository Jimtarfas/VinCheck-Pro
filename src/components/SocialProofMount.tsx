"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const SocialProofToast = dynamic(() => import("./SocialProofToast"), {
  ssr: false,
});

// Don't show on admin/auth/widget/checkout-style routes.
const HIDDEN_PREFIXES = [
  "/admin",
  "/studio",
  "/embed",
  "/login",
  "/signup",
  "/auth",
];

export default function SocialProofMount() {
  const pathname = usePathname();
  if (HIDDEN_PREFIXES.some((p) => pathname?.startsWith(p))) return null;
  return <SocialProofToast />;
}
