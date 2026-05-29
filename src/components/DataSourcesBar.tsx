/**
 * DataSourcesBar — compact trust strip
 * Sits below the hero, matches site bg-surface-container-low.
 */

const sources = [
  {
    id: "nmvtis",
    // eslint-disable-next-line @next/next/no-img-element
    logo: <img src="https://epicvin.com/img2/security/webp/nmvtis-logo@2x.webp" alt="NMVTIS" loading="lazy" decoding="async" className="h-6 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />,
  },
  {
    id: "niada",
    // eslint-disable-next-line @next/next/no-img-element
    logo: <img src="https://epicvin.com/img2/security/png/niada-logo.png" alt="NIADA" loading="lazy" decoding="async" className="h-5 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />,
  },
  {
    id: "blockchain",
    // eslint-disable-next-line @next/next/no-img-element
    logo: <img src="https://epicvin.com/img2/security/svg/blockchain-icon.svg" alt="Blockchain Confirmed Data" loading="lazy" decoding="async" className="h-6 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />,
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
