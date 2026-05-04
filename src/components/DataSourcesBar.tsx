/**
 * DataSourcesBar
 * -------------------------------------------------------
 * Shows the authoritative data sources powering CarCheckerVIN
 * reports — NMVTIS, NIADA, Blockchain Confirmed Data, NICB.
 * Sits below the hero so visitors immediately understand the
 * data comes from trusted, regulated industry sources.
 */

const sources = [
  {
    id: "nmvtis",
    // eslint-disable-next-line @next/next/no-img-element
    logo: (
      <img
        src="https://epicvin.com/img2/security/webp/nmvtis-logo@2x.webp"
        alt="NMVTIS — National Motor Vehicle Title Information System"
        width={120}
        height={40}
        loading="lazy"
        decoding="async"
        className="h-9 w-auto object-contain"
      />
    ),
  },
  {
    id: "niada",
    // eslint-disable-next-line @next/next/no-img-element
    logo: (
      <img
        src="https://epicvin.com/img2/security/png/niada-logo.png"
        alt="NIADA — National Independent Automobile Dealers Association"
        width={110}
        height={40}
        loading="lazy"
        decoding="async"
        className="h-9 w-auto object-contain"
      />
    ),
  },
  {
    id: "blockchain",
    // eslint-disable-next-line @next/next/no-img-element
    logo: (
      <img
        src="https://epicvin.com/img2/security/svg/blockchain-icon.svg"
        alt="Blockchain Confirmed Data"
        width={130}
        height={40}
        loading="lazy"
        decoding="async"
        className="h-9 w-auto object-contain"
      />
    ),
  },
  {
    id: "nicb",
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-[7px] font-black leading-none">NICB</span>
        </div>
        <div>
          <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-none">NICB</p>
          <p className="text-[9px] text-slate-500 leading-tight mt-0.5 max-w-[100px]">Nat&apos;l Insurance Crime<br />Bureau — Stolen Check</p>
        </div>
      </div>
    ),
  },
];

export default function DataSourcesBar() {
  return (
    <section className="bg-slate-50 border-y border-slate-200/80 py-7 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-5">
          Powered by trusted industry databases
        </p>

        {/* Logos row */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-14">
          {sources.map(({ id, logo }, i) => (
            <div key={id} className="flex items-center gap-8">
              <div className="flex items-center justify-center h-10">
                {logo}
              </div>
              {i < sources.length - 1 && (
                <div className="hidden sm:block w-px h-8 bg-slate-200" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* Compliance note */}
        <p className="text-center text-[10px] text-slate-400 mt-5 max-w-lg mx-auto leading-relaxed">
          CarCheckerVIN is an approved NMVTIS data provider. All vehicle history data is cross-referenced
          against federal and state title databases to ensure accuracy.
        </p>
      </div>
    </section>
  );
}
