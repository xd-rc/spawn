import "server-only";
import { Client, GatewayIntentBits } from "discord.js";

/**
 * Sends a project request as a Discord DM to the owner.
 * The bot token is read only from process.env and never reaches the client.
 */

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

  const client = new Client({ intents: [GatewayIntentBits.DirectMessages] });
  try {
    await client.login(token);
    const user = await client.users.fetch(ownerId);
    await user.send(formatMessage(input));
  } finally {
    await client.destroy().catch(() => {});
  }
}
