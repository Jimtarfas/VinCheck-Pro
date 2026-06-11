"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

// /report-preview is the paid conversion page — its sticky mobile "Get full
// report" CTA sits in the bottom-right, exactly where the chat bubble docks,
// so we suppress the widget there to keep the buy button unobstructed.
const HIDDEN_PREFIXES = ["/admin", "/studio", "/embed", "/login", "/signup", "/report-preview"];

export default function ChatWidgetMount() {
  const pathname = usePathname();
  if (HIDDEN_PREFIXES.some((p) => pathname?.startsWith(p))) return null;
  return <ChatWidget />;
}
