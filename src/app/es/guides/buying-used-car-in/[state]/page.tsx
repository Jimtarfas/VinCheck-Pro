/**
 * Wave 15 — Spanish dynamic template for /guides/buying-used-car-in/[state].
 * 50 per-state buying guides using the existing states + statesEs data.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import SpecialtyToolPage from "../../../_specialty-shared/SpecialtyToolPage";
import { specialtyMetadata, specialtySchemas } from "../../../_specialty-shared/metadata";
import type { SpecialtyHook } from "../../../_specialty-shared/strings";
import { states } from "@/lib/states";
import { statesEs } from "@/lib/states-es";

export function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

function buildHook(stateSlug: string): SpecialtyHook | null {
  const state = states.find((s) => s.slug === stateSlug);
  if (!state) return null;
  const stateEs = statesEs.find((s) => s.slug === stateSlug);
  const name = stateEs?.nameEs ?? state.name;
  const dmvName = stateEs?.dmvNameEs ?? state.dmvName;

  return {
    esSlug: `/guides/buying-used-car-in/${state.slug}`,
    englishPath: `/guides/buying-used-car-in/${state.slug}`,
    icon: BookOpen,
    badge: `Guía de compra · ${name}`,
    h1: `Guía para comprar un auto usado en ${name}`,
    metaTitle: `Comprar auto usado en ${name} — Guía completa`,
    metaDescription: `Guía paso a paso para comprar un auto usado en ${name}. Marcas de título del ${dmvName}, inspección, registro, impuestos e historial VIN.`,
    keywords: [
      `comprar auto usado ${name}`,
      `guía auto usado ${name} español`,
      `${name} DMV registro auto`,
      `${name} título salvamento`,
      `${name} impuestos auto usado`,
      `inspección auto ${name}`,
    ],
    intro: `${stateEs?.descriptionHookEs ?? `Comprar un auto usado en ${name} requiere conocer los procesos del ${dmvName}, las marcas de título estatales y los pasos de inspección y registro.`} Esta guía paso a paso te lleva desde la búsqueda inicial hasta la transferencia de título, incluyendo verificación VIN antes de pagar.`,
    whatYouGet: [
      `Lista de marcas de título reconocidas por el ${dmvName}: ${state.titleBrands.join(", ")}`,
      `Procesos específicos de registro en ${name} (con aproximadamente ${state.vehiclesRegistered} vehículos registrados)`,
      `Requisitos de inspección y verificación VIN antes del registro`,
      `Notas sobre la Ley Limón estatal: ${stateEs?.lemonLawNotesEs ?? state.lemonLawNotes}`,
      `Cálculo aproximado de impuestos y tarifas de título en ${name}`,
      `Consejos para detectar autos importados con título "lavado" desde otros estados`,
      `Lista de verificación pre-compra adaptada a las regulaciones de ${name}`,
    ],
    whyItMatters: [
      stateEs?.specialFactEs ?? `${name} tiene reglas específicas para registrar vehículos de otros estados`,
      `El ${dmvName} mantiene registros de título y transferencias — el VIN es la única forma de cruzarlos`,
      `Con ${state.population} de población y ${state.vehiclesRegistered} vehículos, el mercado usado es activo y la diligencia importa`,
      `La verificación VIN antes de pagar protege contra fraudes específicos del mercado de ${name}`,
    ],
    trustNote: `Datos del ${dmvName} y NMVTIS cruzados en tiempo real. Esta guía es educativa — los requisitos exactos de registro, impuestos y tarifas pueden cambiar; confirma siempre con la oficina local del DMV antes de completar la compra.`,
    schemaName: `Guía compra auto usado en ${name}`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const hook = buildHook(state);
  if (!hook) return {};
  return specialtyMetadata(hook);
}

export default async function Page({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const hook = buildHook(state);
  if (!hook) notFound();
  const { webAppSchema, breadcrumbSchema } = specialtySchemas(hook);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SpecialtyToolPage hook={hook} />
    </>
  );
}
