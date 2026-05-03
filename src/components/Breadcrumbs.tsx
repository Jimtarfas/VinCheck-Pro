import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({
  items,
  onDark = false,
}: {
  items: BreadcrumbItem[];
  onDark?: boolean;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://www.carcheckervin.com${item.href}` } : {}),
    })),
  };

  // Stock Tailwind colors only — avoid custom-token + opacity-modifier so the
  // breadcrumbs always render at full contrast (matching the trust-badge fix).
  const navClass       = onDark ? "text-sm text-white"        : "text-sm text-slate-700";
  const sepClass       = onDark ? "text-white/60"             : "text-slate-300";
  const linkHoverClass = onDark ? "hover:text-white"          : "hover:text-primary-600";
  const currentClass   = onDark ? "text-white font-medium"    : "text-slate-700 font-medium";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className={navClass}>
        <ol className="flex items-center gap-1.5 flex-wrap">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className={sepClass}>/</span>}
              {item.href ? (
                <Link href={item.href} className={`${linkHoverClass} transition-colors`}>{item.label}</Link>
              ) : (
                <span className={currentClass}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
