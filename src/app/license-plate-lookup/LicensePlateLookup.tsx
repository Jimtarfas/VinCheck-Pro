"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Copy,
  CheckCheck,
  ArrowRight,
} from "lucide-react";
import { states } from "@/lib/states";
type Locale = "en" | "es" | "fr";

interface LookupResult {
  ok: boolean;
  vin?: string;
  year?: number;
  make?: string;
  model?: string;
  error?: string;
  message?: string;
}

interface DecodedVehicle {
  year?: number;
  make?: string;
  model?: string;
  trim?: string;
  bodyStyle?: string;
  engine?: { name?: string };
  transmission?: { name?: string };
  drivenWheels?: string;
}

const COPY = {
  en: {
    plateLabel: "License Plate Number",
    platePlaceholder: "e.g. 7ABC123",
    stateLabel: "State",
    statePlaceholder: "Select state…",
    dcOption: "District of Columbia (DC)",
    btnLoading: "Looking up VIN…",
    btnIdle: "Look Up VIN by Plate",
    legal: "Free for personal pre-purchase use — no signup. Plate data is governed by the federal",
    dppaTitle: "Driver's Privacy Protection Act",
    errEnter: "Enter a plate number.",
    errLen: "Plates are at most 8 characters.",
    errState: "Select the issuing state.",
    netError: "Network error.",
    errOnboarding: "Plate lookup is being onboarded",
    errNoMatch: "No match found",
    errFail: "Couldn't complete that lookup",
    errFallback: "Please try again or search by VIN instead.",
    searchByVin: "Search by VIN instead",
    vinFound: "VIN Found",
    copyBtn: "Copy",
    copied: "Copied",
    decoding: "Decoding vehicle…",
    dlKeys: { Year: "Year", Make: "Make", Model: "Model", Trim: "Trim", Body: "Body", Engine: "Engine", Trans: "Trans", Drive: "Drive" },
    fullReport: "See Full Vehicle History Report",
  },
  es: {
    plateLabel: "Número de placa",
    platePlaceholder: "ej. 7ABC123",
    stateLabel: "Estado",
    statePlaceholder: "Selecciona estado…",
    dcOption: "Distrito de Columbia (DC)",
    btnLoading: "Buscando VIN…",
    btnIdle: "Buscar VIN por placa",
    legal: "Gratis para uso personal de pre-compra — sin registro. Los datos de placa están regulados por la ley federal",
    dppaTitle: "Driver's Privacy Protection Act",
    errEnter: "Ingresa un número de placa.",
    errLen: "Las placas tienen un máximo de 8 caracteres.",
    errState: "Selecciona el estado emisor.",
    netError: "Error de red.",
    errOnboarding: "La búsqueda por placa se está activando",
    errNoMatch: "No se encontró coincidencia",
    errFail: "No se pudo completar esa búsqueda",
    errFallback: "Por favor intenta de nuevo o busca por VIN.",
    searchByVin: "Buscar por VIN en su lugar",
    vinFound: "VIN encontrado",
    copyBtn: "Copiar",
    copied: "Copiado",
    decoding: "Decodificando vehículo…",
    dlKeys: { Year: "Año", Make: "Marca", Model: "Modelo", Trim: "Versión", Body: "Carrocería", Engine: "Motor", Trans: "Trans", Drive: "Tracción" },
    fullReport: "Ver reporte completo del vehículo",
  },
  fr: {
    plateLabel: "Num\u00e9ro de plaque d'immatriculation",
    platePlaceholder: "ex. 7ABC123",
    stateLabel: "\u00c9tat",
    statePlaceholder: "S\u00e9lectionne un \u00e9tat\u2026",
    dcOption: "District de Columbia (DC)",
    btnLoading: "Recherche du VIN\u2026",
    btnIdle: "Rechercher le VIN par plaque",
    legal: "Gratuit pour usage personnel pr\u00e9-achat \u2014 sans inscription. Les donn\u00e9es de plaque sont r\u00e9gies par la loi f\u00e9d\u00e9rale",
    dppaTitle: "Driver's Privacy Protection Act",
    errEnter: "Saisis un num\u00e9ro de plaque.",
    errLen: "Les plaques font au plus 8 caract\u00e8res.",
    errState: "S\u00e9lectionne l'\u00e9tat \u00e9metteur.",
    netError: "Erreur r\u00e9seau.",
    errOnboarding: "La recherche par plaque est en cours d'activation",
    errNoMatch: "Aucune correspondance trouv\u00e9e",
    errFail: "Impossible de finaliser cette recherche",
    errFallback: "R\u00e9essaie ou recherche par VIN \u00e0 la place.",
    searchByVin: "Rechercher par VIN \u00e0 la place",
    vinFound: "VIN trouv\u00e9",
    copyBtn: "Copier",
    copied: "Copi\u00e9",
    decoding: "D\u00e9codage du v\u00e9hicule\u2026",
    dlKeys: { Year: "Ann\u00e9e", Make: "Marque", Model: "Mod\u00e8le", Trim: "Finition", Body: "Carrosserie", Engine: "Moteur", Trans: "Trans", Drive: "Transmission" },
    fullReport: "Voir le rapport d'historique complet",
  },
} as const;

interface Props {
  locale?: Locale;
}

export default function LicensePlateLookup({ locale = "en" }: Props) {
  const c = COPY[locale];
  const [plate, setPlate] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LookupResult | null>(null);
  const [decoded, setDecoded] = useState<DecodedVehicle | null>(null);
  const [decoding, setDecoding] = useState(false);
  const [copied, setCopied] = useState(false);

  function validate(): string | null {
    const cleanedPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (cleanedPlate.length < 2) return c.errEnter;
    if (cleanedPlate.length > 8) return c.errLen;
    if (!state) return c.errState;
    return null;
  }

  async function runLookup() {
    const err = validate();
    if (err) {
      setResult({ ok: false, error: "client", message: err });
      return;
    }

    setLoading(true);
    setResult(null);
    setDecoded(null);

    try {
      const cleanedPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, "");
      const res = await fetch("/api/plate-to-vin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plate: cleanedPlate, state }),
      });
      const data = (await res.json()) as LookupResult;

      setResult(data);

      if (data.ok && data.vin) {
        setDecoding(true);
        try {
          const dec = await fetch(`/api/vin/${data.vin}`);
          if (dec.ok) {
            const vehicle = (await dec.json()) as DecodedVehicle;
            setDecoded(vehicle);
          }
        } finally {
          setDecoding(false);
        }
      }
    } catch (e) {
      setResult({
        ok: false,
        error: "network",
        message: e instanceof Error ? e.message : c.netError,
      });
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setResult({ ok: false, error: "client", message: err });
      return;
    }
    void runLookup();
  }

  async function copyVin() {
    if (!result?.vin) return;
    try {
      await navigator.clipboard.writeText(result.vin);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px] gap-3">
            <div>
              <label htmlFor="plate" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                {c.plateLabel}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="plate"
                  type="text"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value.toUpperCase())}
                  maxLength={10}
                  placeholder={c.platePlaceholder}
                  autoComplete="off"
                  className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-base font-mono uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="state" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                {c.stateLabel}
              </label>
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-3 border border-slate-200 rounded-xl text-base bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">{c.statePlaceholder}</option>
                {states.map((s) => (
                  <option key={s.abbr} value={s.abbr}>
                    {s.name} ({s.abbr})
                  </option>
                ))}
                <option value="DC">{c.dcOption}</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {c.btnLoading}
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                {c.btnIdle}
              </>
            )}
          </button>

          <p className="text-xs text-slate-500 text-center">
            {c.legal}{" "}
            <abbr title={c.dppaTitle}>DPPA</abbr>.
          </p>
        </form>

        {result && !result.ok && (
          <div className="mt-5 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-amber-900">
                {result.error === "service-unavailable"
                  ? c.errOnboarding
                  : result.error === "no-match"
                  ? c.errNoMatch
                  : c.errFail}
              </p>
              <p className="text-sm text-amber-800 mt-0.5">
                {result.message || c.errFallback}
              </p>
              <Link
                href={locale === "es" ? "/es/vin-check" : "/vin-check"}
                className="inline-flex items-center gap-1 mt-2 text-sm font-bold text-amber-900 hover:text-amber-950"
              >
                {c.searchByVin} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {result?.ok && result.vin && (
          <div className="mt-5 p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">{c.vinFound}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <code className="text-lg font-mono font-bold text-slate-900 tracking-wider break-all">{result.vin}</code>
                  <button
                    type="button"
                    onClick={copyVin}
                    className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-white border border-emerald-200 rounded-md cursor-pointer transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCheck className="w-3 h-3" /> {c.copied}
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> {c.copyBtn}
                      </>
                    )}
                  </button>
                </div>

                {decoding && (
                  <p className="mt-3 text-xs text-emerald-700 inline-flex items-center gap-1.5">
                    <Loader2 className="w-3 h-3 animate-spin" /> {c.decoding}
                  </p>
                )}

                {decoded && (
                  <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    {(
                      [
                        ["Year", decoded.year?.toString()],
                        ["Make", decoded.make],
                        ["Model", decoded.model],
                        ["Trim", decoded.trim],
                        ["Body", decoded.bodyStyle],
                        ["Engine", decoded.engine?.name],
                        ["Trans", decoded.transmission?.name],
                        ["Drive", decoded.drivenWheels],
                      ] as Array<[keyof typeof c.dlKeys, string | undefined]>
                    )
                      .filter(([, v]) => v)
                      .map(([k, v]) => (
                        <div key={k} className="bg-white rounded-lg p-2.5 border border-emerald-100">
                          <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{c.dlKeys[k]}</dt>
                          <dd className="mt-0.5 text-sm font-semibold text-slate-900 truncate">{v}</dd>
                        </div>
                      ))}
                  </dl>
                )}

                <Link
                  href={`/report/${result.vin}`}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors"
                >
                  {c.fullReport} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
