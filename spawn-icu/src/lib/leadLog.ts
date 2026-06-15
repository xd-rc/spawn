import { promises as fs } from "fs";
import path from "path";

/**
 * Append-only local lead log. A durable fallback so a submission is never lost
 * if the Discord DM fails. Stored as JSON Lines in /data/leads.jsonl.
 */
export type LeadRecord = {
  name: string;
  contact: string;
  service: string;
  message: string;
  submittedAt: string;
  delivered: boolean;
};

const DATA_DIR = path.join(process.cwd(), "data");
const LOG_FILE = path.join(DATA_DIR, "leads.jsonl");

export async function logLead(record: LeadRecord): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(LOG_FILE, JSON.stringify(record) + "\n", "utf8");
  } catch (err) {
    console.error("[leadLog] failed to persist lead:", err);
  }
}
