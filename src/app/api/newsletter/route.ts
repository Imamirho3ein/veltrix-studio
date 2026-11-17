import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations/newsletter";
import { escapeHtml, isTelegramConfigured, sendTelegramMessage } from "@/lib/telegram";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 4;

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originHost = new URL(origin).host;
    const requestHost =
      request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    if (requestHost && originHost === requestHost) return true;
    return originHost === new URL(siteConfig.url).host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json(
      { ok: false, message: "درخواست از منبع نامعتبر ارسال شده است." },
      { status: 403 },
    );
  }

  const ip = getClientIp(request.headers);
  const limit = rateLimit(`newsletter:${ip}`, MAX_REQUESTS, WINDOW_MS);
  if (!limit.success) {
    return NextResponse.json(
      {
        ok: false,
        message: `تعداد تلاش‌ها زیاد است. لطفاً ${Math.ceil(
          limit.retryAfterSeconds / 60,
        )} دقیقه دیگر دوباره امتحان کنید.`,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "ساختار درخواست معتبر نیست." },
      { status: 400 },
    );
  }

  const parsed = newsletterSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: parsed.error.issues[0]?.message ?? "ایمیل معتبر نیست.",
      },
      { status: 422 },
    );
  }

  // Honeypot: silently accept bot submissions.
  if (parsed.data.website && parsed.data.website.trim().length > 0) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const email = parsed.data.email;

  if (!isTelegramConfigured()) {
    console.warn("[newsletter] Telegram is not configured. Signup captured locally:", email);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const sent = await sendTelegramMessage(
    ["📬 <b>عضویت جدید در خبرنامه</b>", "", `<code>${escapeHtml(email)}</code>`].join(
      "\n",
    ),
  );

  if (!sent) {
    return NextResponse.json(
      {
        ok: false,
        message: "ثبت ایمیل انجام نشد. لطفاً دوباره تلاش کنید.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}

export function GET() {
  return NextResponse.json(
    { ok: false, message: "روش درخواست پشتیبانی نمی‌شود." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
