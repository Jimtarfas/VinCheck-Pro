import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/sanity/client";
import { Info, Lightbulb, AlertTriangle } from "lucide-react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-base leading-7 text-slate-700 my-4">{children}</p>,
    h2: ({ children }) => <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-12 mb-4 scroll-mt-24">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold text-slate-900 mt-6 mb-2">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-5 border-l-4 border-primary-500 italic text-slate-700">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-4 space-y-2 list-disc list-inside text-slate-700">{children}</ul>,
    number: ({ children }) => <ol className="my-4 space-y-2 list-decimal list-inside text-slate-700">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 bg-slate-100 text-primary-700 rounded text-sm font-mono">{children}</code>
    ),
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          target={value?.blank || isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-primary-600 underline hover:text-primary-700"
        >
          {children}
        </a>
      );
    },
    internalLink: ({ value, children }) => (
      <Link href={value?.path || "/"} className="text-primary-600 underline hover:text-primary-700">
        {children}
      </Link>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlFor(value).width(1600).quality(85).url();
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
            <Image src={url} alt={value.alt || ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
          </div>
          {value.caption && <figcaption className="text-sm text-slate-500 text-center mt-2">{value.caption}</figcaption>}
        </figure>
      );
    },
    callout: ({ value }) => {
      const variant = value?.variant || "info";
      const styles = {
        info: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-900", icon: Info, iconColor: "text-blue-600" },
        tip: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-900", icon: Lightbulb, iconColor: "text-emerald-600" },
        warning: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-900", icon: AlertTriangle, iconColor: "text-amber-600" },
      }[variant as "info" | "tip" | "warning"];
      const Icon = styles.icon;
      return (
        <div className={`my-6 p-5 rounded-xl border ${styles.bg} ${styles.border}`}>
          <div className="flex gap-3">
            <Icon className={`w-5 h-5 ${styles.iconColor} flex-shrink-0 mt-0.5`} />
            <div>
              {value?.title && <p className={`font-bold mb-1 ${styles.text}`}>{value.title}</p>}
              <p className={`text-sm ${styles.text}`}>{value?.text}</p>
            </div>
          </div>
        </div>
      );
    },
  },
};

export default function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
