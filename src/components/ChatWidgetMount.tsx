"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

const HIDDEN_PREFIXES = ["/admin", "/studio", "/embed", "/login", "/signup"];

export default function ChatWidgetMount() {
  const pathname = usePathname();
  if (HIDDEN_PREFIXES.some((p) => pathname?.startsWith(p))) return null;
  return <ChatWidget />;
}
