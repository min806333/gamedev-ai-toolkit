import { getEnv } from "@/lib/utils/env";

type LimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

const UPSTASH_REDIS_REST_URL = getEnv("UPSTASH_REDIS_REST_URL");
const UPSTASH_REDIS_REST_TOKEN = getEnv("UPSTASH_REDIS_REST_TOKEN");

const localStore = new Map<string, { count: number; resetAt: number }>();

let limiterPromise: Promise<{
  limit: (identifier: string) => Promise<LimitResult>;
} | null> | null = null;

function runLocalLimit(identifier: string): LimitResult {
  const now = Date.now();
  const existing = localStore.get(identifier);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + 60_000;
    localStore.set(identifier, { count: 1, resetAt });

    return {
      success: true,
      limit: 10,
      remaining: 9,
      reset: resetAt
    };
  }

  const nextCount = existing.count + 1;
  existing.count = nextCount;
  localStore.set(identifier, existing);

  return {
    success: nextCount <= 10,
    limit: 10,
    remaining: Math.max(0, 10 - nextCount),
    reset: existing.resetAt
  };
}

export async function checkRateLimit(identifier: string): Promise<LimitResult> {
  if (!limiterPromise) {
    limiterPromise = createLimiter();
  }

  const limiter = await limiterPromise;

  if (limiter) {
    return limiter.limit(identifier);
  }

  return runLocalLimit(identifier);
}

async function createLimiter() {
  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }

  const [{ Ratelimit }, { Redis }] = await Promise.all([import("@upstash/ratelimit"), import("@upstash/redis")]);

  const redis = new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN
  });

  return new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(10, "60 s"),
    analytics: true,
    prefix: "gamedev-ai-toolkit"
  });
}
