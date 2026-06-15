import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "spawn.icu",
    time: new Date().toISOString(),
    discordConfigured: Boolean(
      process.env.DISCORD_BOT_TOKEN && process.env.DISCORD_OWNER_ID
    )
  });
}
