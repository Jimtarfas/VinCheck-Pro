/**
 * DataSourcesBar — compact trust strip
 * Sits below the hero, matches site bg-surface-container-low.
 */

// Logos were previously hot-linked from epicvin.com (a competitor's CDN).
// Until we have proper licensed local assets, we render text-only labels
// for the trusted sources to avoid both the link-rot risk and the IP issue.
const sources = [
  {
    id: "nmvtis",
    logo: (
      <span className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">
        NMVTIS
      </span>
    ),
  },
  {
    id: "niada",
    logo: (
      <span className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">
        NIADA
      </span>
    ),
  },
  {
    id: "nicb",
    logo: (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-red-700 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-[6px] font-black leading-none">NICB</span>
        </div>
        <span className="text-[11px] font-bold text-slate-500 tracking-wide">NICB</span>
      </div>
    ),
  },
];

export default function DataSourcesBar() {
  return (
    <section className="py-4 px-4 sm:px-6" style={{ background: "#eceef1" }}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2">

        <span className="text-[10px] font-semibold text-outline uppercase tracking-[0.18em] mr-3 hidden sm:inline">
          Trusted sources:
        </span>

        {sources.map(({ id, logo }, i) => (
          <div key={id} className="flex items-center gap-2">
            <div className="flex items-center justify-center h-7">
              {logo}
            </div>
            {i < sources.length - 1 && (
              <div className="w-px h-4 bg-outline-variant/40 ml-2" aria-hidden="true" />
            )}
          </div>
        ))}

      </div>
    </section>
  );
}
