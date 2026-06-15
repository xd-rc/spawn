import { serviceTypes } from "./data";

export type ContactPayload = {
  name: string;
  contact: string;
  service: string;
  message: string;
  company?: string; // honeypot
  elapsedMs?: number;
};

export type ValidationResult =
  | { ok: true; value: { name: string; contact: string; service: string; message: string } }
  | { ok: false; error: string };

function clean(input: unknown): string {
  return typeof input === "string" ? input.replace(/\s+/g, " ").trim() : "";
}
function cleanMultiline(input: unknown): string {
  return typeof input === "string" ? input.replace(/[ \t]+/g, " ").trim() : "";
}

/** Validates and sanitises a submission, with lightweight spam checks. */
export function validateContact(body: ContactPayload): ValidationResult {
  // Honeypot
  if (typeof body.company === "string" && body.company.trim().length > 0) {
    return { ok: false, error: "Submission rejected." };
  }
  // Too-fast submit = bot
  if (typeof body.elapsedMs === "number" && body.elapsedMs >= 0 && body.elapsedMs < 1200) {
    return { ok: false, error: "Submission rejected." };
  }

  const name = clean(body.name);
  const contact = clean(body.contact);
  const service = clean(body.service);
  const message = cleanMultiline(body.message);

  if (name.length < 2 || name.length > 120) return { ok: false, error: "Please enter your name." };
  if (contact.length < 3 || contact.length > 200) return { ok: false, error: "Please enter valid contact information." };
  if (!(serviceTypes as readonly string[]).includes(service)) return { ok: false, error: "Please choose a service." };
  if (message.length < 5 || message.length > 4000) return { ok: false, error: "Please add a short message." };

  const linkCount = (message.match(/https?:\/\//gi) || []).length;
  if (linkCount > 5) return { ok: false, error: "Too many links in your message." };

  return { ok: true, value: { name, contact, service, message } };
}
