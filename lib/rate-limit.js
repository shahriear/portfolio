// lib/rate-limit.js
// Simple per-IP fixed-window rate limiter (in-memory)
const store = new Map();
// optional GC
let lastSweep = Date.now();

export function rateLimitAllow({ key, limit = 8, windowMs = 60_000 }) {
  const now = Date.now();

  // sweep old keys every ~2 minutes
  if (now - lastSweep > 120_000) {
    for (const [k, v] of store.entries()) {
      if (v.reset <= now) store.delete(k);
    }
    lastSweep = now;
  }

  const cur = store.get(key) || { count: 0, reset: now + windowMs };
  if (cur.reset <= now) {
    cur.count = 0;
    cur.reset = now + windowMs;
  }

  cur.count += 1;
  store.set(key, cur);

  const remaining = Math.max(0, limit - cur.count);
  const ok = cur.count <= limit;

  return {
    ok,
    limit,
    remaining,
    reset: cur.reset,
    retryAfterSec: ok ? 0 : Math.ceil((cur.reset - now) / 1000),
  };
}
