"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { Locale } from "@/i18n/config";

const SUBJECT_KEYS = ["general", "report", "partnership", "press", "other"] as const;
type SubjectKey = (typeof SUBJECT_KEYS)[number];

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Per-locale copy. Same pattern as VinSearchForm (Wave 13) — form-only
// strings live next to the component so the Spanish page renders the
// same form widget with translated labels and errors.
const COPY = {
  en: {
    subjects: {
      general: "General Question",
      report: "Report Issue",
      partnership: "Partnership",
      press: "Press",
      other: "Other",
    },
    nameLabel: "Name",
    emailLabel: "Email",
    subjectLabel: "Subject",
    messageLabel: "Message",
    requiredMark: "*",
    namePlaceholder: "Jane Doe",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "How can we help?",
    charCounterTemplate: "{n} / 5000 characters (minimum 10)",
    submit: "Send message",
    submitLoading: "Sending...",
    consent:
      "By submitting this form you agree we may use the information you provide to respond to your message. We never share your details with third parties.",
    successHeading: "Thanks! We'll reply within 24 hours",
    successBody:
      "Your message has been received. A member of our team will get back to you at the email address you provided.",
    sendAnother: "Send another message",
    websiteLabel: "Website",
    errorName: "Please enter your name.",
    errorEmail: "Please enter a valid email address.",
    errorMessageShort: "Message must be at least 10 characters long.",
    errorGeneric: "Something went wrong. Please try again.",
    errorNetwork:
      "Network error. Please check your connection and try again.",
  },
  es: {
    subjects: {
      general: "Pregunta general",
      report: "Problema con un reporte",
      partnership: "Asociación",
      press: "Prensa",
      other: "Otro",
    },
    nameLabel: "Nombre",
    emailLabel: "Correo electrónico",
    subjectLabel: "Asunto",
    messageLabel: "Mensaje",
    requiredMark: "*",
    namePlaceholder: "Juan Pérez",
    emailPlaceholder: "tu@ejemplo.com",
    messagePlaceholder: "¿Cómo podemos ayudarte?",
    charCounterTemplate: "{n} / 5000 caracteres (mínimo 10)",
    submit: "Enviar mensaje",
    submitLoading: "Enviando...",
    consent:
      "Al enviar este formulario aceptas que usemos la información proporcionada para responderte. Nunca compartimos tus datos con terceros.",
    successHeading: "¡Gracias! Te responderemos en menos de 24 horas",
    successBody:
      "Tu mensaje ha sido recibido. Un miembro de nuestro equipo te responderá al correo que proporcionaste.",
    sendAnother: "Enviar otro mensaje",
    websiteLabel: "Sitio web",
    errorName: "Por favor ingresa tu nombre.",
    errorEmail: "Por favor ingresa un correo electrónico válido.",
    errorMessageShort: "El mensaje debe tener al menos 10 caracteres.",
    errorGeneric: "Algo salió mal. Por favor intenta de nuevo.",
    errorNetwork:
      "Error de red. Verifica tu conexión e intenta de nuevo.",
  },
} as const;

export default function ContactForm({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<SubjectKey>("general");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    // Client-side validation
    if (!name.trim()) {
      setStatus("error");
      setErrorMsg(copy.errorName);
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setErrorMsg(copy.errorEmail);
      return;
    }
    if (message.trim().length < 10) {
      setStatus("error");
      setErrorMsg(copy.errorMessageShort);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          // Always send the English subject label so the inbox stays
          // consistent regardless of which locale submitted it.
          subject: COPY.en.subjects[subject],
          message: message.trim(),
          website,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error || copy.errorGeneric);
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setSubject("general");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg(copy.errorNetwork);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {copy.successHeading}
            </h3>
            <p className="mt-1 text-slate-600">
              {copy.successBody}
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-4 text-sm font-medium text-primary-600 hover:underline"
            >
              {copy.sendAnother}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="website">{copy.websiteLabel}</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          {copy.nameLabel} <span className="text-red-500">{copy.requiredMark}</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          placeholder={copy.namePlaceholder}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          {copy.emailLabel} <span className="text-red-500">{copy.requiredMark}</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          placeholder={copy.emailPlaceholder}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
          {copy.subjectLabel} <span className="text-red-500">{copy.requiredMark}</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value as SubjectKey)}
          className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        >
          {SUBJECT_KEYS.map((k) => (
            <option key={k} value={k}>
              {copy.subjects[k]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">
          {copy.messageLabel} <span className="text-red-500">{copy.requiredMark}</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={10}
          maxLength={5000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 resize-y"
          placeholder={copy.messagePlaceholder}
        />
        <p className="mt-1 text-xs text-slate-700">
          {copy.charCounterTemplate.replace("{n}", String(message.length))}
        </p>
      </div>

      {status === "error" && errorMsg && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-800">{errorMsg}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {copy.submitLoading}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {copy.submit}
          </>
        )}
      </button>

      <p className="text-xs text-slate-700">{copy.consent}</p>
    </form>
  );
}
