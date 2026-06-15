"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { serviceTypes } from "@/lib/data";

type Status = "idle" | "loading" | "success" | "error";

const initial = {
  name: "",
  contact: "",
  service: "" as "" | (typeof serviceTypes)[number],
  message: "",
  company: "" // honeypot — must stay empty
};

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [startedAt] = useState<number>(() => Date.now());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    if (service && (serviceTypes as string[]).includes(service)) {
      setForm((f) => ({ ...f, service: service as (typeof serviceTypes)[number] }));
    }
  }, []);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.contact.trim() || !form.service || !form.message.trim()) {
      setError("Please fill in every field.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          contact: form.contact,
          service: form.service,
          message: form.message,
          company: form.company,
          elapsedMs: Date.now() - startedAt
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Please try again.");
      setStatus("success");
      setForm(initial);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
      setStatus("error");
    }
  }

  const fieldBase =
    "w-full rounded-xl border border-line bg-paper px-4 py-3.5 text-[15px] text-ink outline-none transition-all duration-300 placeholder:text-muted/70 focus:border-ink focus:ring-4 focus:ring-ink/5";

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center rounded-xl2 border border-line bg-paper p-10 text-center shadow-soft"
          >
            <motion.svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mb-5">
              <motion.circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" className="text-ink"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: "easeInOut" }} />
              <motion.path d="M20 33l8 8 16-18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" className="text-ink"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }} />
            </motion.svg>
            <h3 className="display-h text-2xl font-semibold">Message sent</h3>
            <p className="mt-2 max-w-sm text-muted">
              Thanks. Your message is on its way to me and I will get back to you
              shortly.
            </p>
            <button onClick={() => setStatus("idle")} className="btn btn-ghost mt-6">
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5 rounded-xl2 border border-line bg-paper p-6 shadow-soft sm:p-8"
            noValidate
          >
            <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
              <label>
                Company
                <input type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => update("company", e.target.value)} />
              </label>
            </div>

            <div>
              <label htmlFor="name" className="eyebrow mb-2 block">Name</label>
              <input id="name" type="text" className={fieldBase} placeholder="Your name"
                value={form.name} onChange={(e) => update("name", e.target.value)} maxLength={120} required />
            </div>

            <div>
              <label htmlFor="contact" className="eyebrow mb-2 block">Contact Information</label>
              <input id="contact" type="text" className={fieldBase} placeholder="Email or phone number"
                value={form.contact} onChange={(e) => update("contact", e.target.value)} maxLength={200} required />
            </div>

            <div>
              <label htmlFor="service" className="eyebrow mb-2 block">Service Needed</label>
              <div className="relative">
                <select id="service" className={`${fieldBase} appearance-none pr-10 ${form.service ? "text-ink" : "text-muted/70"}`}
                  value={form.service} onChange={(e) => update("service", e.target.value as typeof form.service)} required>
                  <option value="" disabled>Select a service</option>
                  {serviceTypes.map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
                <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="eyebrow mb-2 block">Message</label>
              <textarea id="message" rows={5} className={`${fieldBase} resize-none`}
                placeholder="Tell me a bit about what you need."
                value={form.message} onChange={(e) => update("message", e.target.value)} maxLength={4000} required />
            </div>

            <AnimatePresence>
              {status === "error" && error && (
                <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm text-red-500">
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button type="submit" disabled={status === "loading"} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-80">
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }} className="inline-flex">
                    <Image src="/brand/spawn-icon-white.png" width={1017} height={1009} alt="" className="h-4 w-4 block dark:hidden" />
                    <Image src="/brand/spawn-icon-black.png" width={584} height={599} alt="" className="h-4 w-4 hidden dark:block" />
                  </motion.span>
                  Sending…
                </span>
              ) : (
                "Send Message"
              )}
            </button>

            <p className="text-center text-xs text-muted">Goes straight to me. I reply fast.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
