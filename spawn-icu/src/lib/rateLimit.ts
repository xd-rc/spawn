/**
 * Tiny in-memory sliding-window rate limiter.
 *
 * Suitable for a single VPS / single Node process (which is the documented
 * deployment target). For multi-instance horizontal scaling, swap the Map for
 * a shared store such as Redis — the interface stays identical.
 */

type Hit = { count: number; reset: number };

const buckets = new Map<string, Hit>();

const MAX = Number(process.env.RATE_LIMIT_MAX ?? 5);
const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_SECONDS ?? 600) * 1000;

// Opportunistic cleanup so the Map doesn't grow unbounded.
function sweep(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, hit] of buckets) {
    if (hit.reset <= now) buckets.delete(key);
  }
}

export function rateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
  retryAfter: number;
} {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(identifier);

  if (!existing || existing.reset <= now) {
    buckets.set(identifier, { count: 1, reset: now + WINDOW_MS });
    return { allowed: true, remaining: MAX - 1, retryAfter: 0 };
  }

  if (existing.count >= MAX) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((existing.reset - now) / 1000)
    };
  }

  existing.count += 1;
  return { allowed: true, remaining: MAX - existing.count, retryAfter: 0 };
}
