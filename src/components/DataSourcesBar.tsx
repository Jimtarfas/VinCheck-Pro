/**
 * DataSourcesBar
 * -------------------------------------------------------
 * Shows the authoritative data sources powering CarCheckerVIN
 * reports — NMVTIS, NIADA, Blockchain Confirmed Data, NICB.
 * Sits below the hero / TrustBar so visitors immediately
 * understand the data is from trusted, regulated sources.
 */

const sources = [
  {
    id: "nmvtis",
    logo: (
      <div className="flex items-center gap-2">
        {/* NMVTIS shield */}
        <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M14 1L2 6v10c0 7.18 5.14 13.89 12 15.93C20.86 29.89 26 23.18 26 16V6L14 1Z" fill="#003178"/>
          <path d="M14 1L2 6v10c0 7.18 5.14 13.89 12 15.93C20.86 29.89 26 23.18 26 16V6L14 1Z" fill="url(#nmvtis-grad)" opacity="0.4"/>
          <text x="14" y="19" textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.5">NMVTIS</text>
          <defs>
            <linearGradient id="nmvtis-grad" x1="14" y1="1" x2="14" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.3"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
        <div>
          <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-none">NMVTIS</p>
          <p className="text-[9px] text-slate-500 leading-tight mt-0.5 max-w-[110px]">National Motor Vehicle<br/>Title Information System</p>
        </div>
      </div>
    ),
  },
  {
    id: "niada",
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-[8px] font-black leading-none tracking-tight">N<br/>I</span>
        </div>
        <div>
          <p className="text-[13px] font-black text-slate-800 uppercase tracking-[0.15em] leading-none">NIADA</p>
          <p className="text-[9px] text-slate-500 leading-tight mt-0.5 max-w-[110px]">National Ind. Automobile<br/>Dealers Association</p>
        </div>
      </div>
    ),
  },
  {
    id: "blockchain",
    logo: (
      <div className="flex items-center gap-2">
        {/* Blockchain hexagon icon */}
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M15 2L27 8.5v13L15 28 3 21.5v-13L15 2Z" fill="#F59E0B" opacity="0.15"/>
          <path d="M15 2L27 8.5v13L15 28 3 21.5v-13L15 2Z" stroke="#F59E0B" strokeWidth="1.5"/>
          {/* chain link dots */}
          <circle cx="15" cy="10" r="2" fill="#F59E0B"/>
          <circle cx="10" cy="18" r="2" fill="#F59E0B"/>
          <circle cx="20" cy="18" r="2" fill="#F59E0B"/>
          <line x1="15" y1="10" x2="10" y2="18" stroke="#F59E0B" strokeWidth="1" opacity="0.6"/>
          <line x1="15" y1="10" x2="20" y2="18" stroke="#F59E0B" strokeWidth="1" opacity="0.6"/>
          <line x1="10" y1="18" x2="20" y2="18" stroke="#F59E0B" strokeWidth="1" opacity="0.6"/>
        </svg>
        <div>
          <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-none">Blockchain</p>
          <p className="text-[9px] text-slate-500 leading-tight mt-0.5">Confirmed Data</p>
        </div>
      </div>
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
          <p className="text-[9px] text-slate-500 leading-tight mt-0.5 max-w-[100px]">Nat'l Insurance Crime<br/>Bureau — Stolen Check</p>
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
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12">
          {sources.map(({ id, logo }, i) => (
            <div key={id} className="flex items-center gap-8">
              {logo}
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
