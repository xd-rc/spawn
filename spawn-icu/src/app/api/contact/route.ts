import { NextRequest, NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/validation";
import { rateLimit } from "@/lib/rateLimit";
import { sendDiscordDM } from "@/lib/discord";
import { logLead } from "@/lib/leadLog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const ip = getClientIp(req);
  const limit = rateLimit(`contact:${ip}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { name, contact, service, message } = result.value;
  const submittedAt =
    new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC"
    }) + " UTC";

  let delivered = false;
  let deliveryError: unknown = null;

  try {
    await sendDiscordDM({ name, contact, service, message, submittedAt });
    delivered = true;
  } catch (err) {
    deliveryError = err;
    console.error("[contact] Discord delivery failed:", err);
  }

  await logLead({ name, contact, service, message, submittedAt, delivered });

  if (!delivered && deliveryError) {
    return NextResponse.json({
      ok: true,
      delivered: false,
      message: "Your message was received and saved. I'll follow up shortly."
    });
  }

  return NextResponse.json({ ok: true, delivered: true });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
