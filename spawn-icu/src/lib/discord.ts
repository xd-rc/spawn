import "server-only";

/**
 * Sends a project request as a Discord DM to the owner using the Discord REST
 * API directly (no gateway connection). This is fast and reliable on
 * serverless hosts such as Netlify.
 */

const API = "https://discord.com/api/v10";

export type DiscordMessageInput = {
  name: string;
  contact: string;
  service: string;
  message: string;
  submittedAt: string;
};

function formatMessage(i: DiscordMessageInput): string {
  return [
    "🚀 **New Spawn Project**",
    "",
    `**Name:** ${i.name}`,
    `**Contact:** ${i.contact}`,
    `**Service:** ${i.service}`,
    `**Message:** ${i.message}`,
    `**Time:** ${i.submittedAt}`
  ].join("\n");
}

export async function sendDiscordDM(input: DiscordMessageInput): Promise<void> {
  const token = process.env.DISCORD_BOT_TOKEN;
  const ownerId = process.env.DISCORD_OWNER_ID;
  if (!token || !ownerId) {
    throw new Error("Discord is not configured: set DISCORD_BOT_TOKEN and DISCORD_OWNER_ID.");
  }

  const authHeaders = {
    Authorization: `Bot ${token}`,
    "Content-Type": "application/json"
  };

  const dmRes = await fetch(`${API}/users/@me/channels`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ recipient_id: ownerId }),
    cache: "no-store"
  });
  if (!dmRes.ok) {
    const detail = await dmRes.text().catch(() => "");
    throw new Error(`Failed to open Discord DM channel (${dmRes.status}): ${detail}`);
  }
  const channel = (await dmRes.json()) as { id: string };

  const msgRes = await fetch(`${API}/channels/${channel.id}/messages`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ content: formatMessage(input) }),
    cache: "no-store"
  });
  if (!msgRes.ok) {
    const detail = await msgRes.text().catch(() => "");
    throw new Error(`Failed to send Discord DM (${msgRes.status}): ${detail}`);
  }
}
