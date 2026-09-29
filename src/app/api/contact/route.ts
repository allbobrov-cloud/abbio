import { NextRequest, NextResponse } from "next/server";
import { isTelegramContactEnabled, parseContactSubmission, sendTelegramContact } from "@/lib/telegramContact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8192;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function noStoreJson(body: object, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET() {
  return noStoreJson({ mode: isTelegramContactEnabled() ? "telegram" : "email" });
}

export async function POST(request: NextRequest) {
  if (!isTelegramContactEnabled()) return noStoreJson({ error: "not_configured" }, 503);

  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return noStoreJson({ error: "invalid_origin" }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return noStoreJson({ error: "invalid_content_type" }, 415);
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return noStoreJson({ error: "too_large" }, 413);
  }

  let submission;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) return noStoreJson({ error: "too_large" }, 413);
    submission = parseContactSubmission(JSON.parse(raw));
  } catch {
    return noStoreJson({ error: "invalid_request" }, 400);
  }
  if (!submission) return noStoreJson({ error: "invalid_request" }, 400);
  if (submission.website) return noStoreJson({ ok: true });

  const address = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const bucket = attempts.get(address);
  if (bucket && bucket.resetAt > now && bucket.count >= MAX_ATTEMPTS) {
    return noStoreJson({ error: "rate_limited" }, 429);
  }
  attempts.set(address, {
    count: bucket && bucket.resetAt > now ? bucket.count + 1 : 1,
    resetAt: bucket && bucket.resetAt > now ? bucket.resetAt : now + WINDOW_MS,
  });
  if (attempts.size > 10000) {
    for (const [key, value] of attempts) if (value.resetAt <= now) attempts.delete(key);
  }

  const sent = await sendTelegramContact(submission);
  if (!sent) return noStoreJson({ error: "delivery_failed" }, 502);
  return noStoreJson({ ok: true });
}
