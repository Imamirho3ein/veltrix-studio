import { NextResponse } from "next/server";
import { contactSchema, sanitizeText } from "@/lib/validations/contact";
import { escapeHtml, isTelegramConfigured, sendTelegramMessage } from "@/lib/telegram";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/constants";
import { getSessionUser } from "@/lib/auth";
import { mutateDb, newLeadRecord } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function tooMany(retryAfterSeconds: number) {
  return NextResponse.json(
    {
      ok: false,
      message: `تعداد درخواست‌های شما زیاد است. لطفاً ${Math.ceil(
        retryAfterSeconds / 60,
      )} دقیقه دیگر دوباره تلاش کنید.`,
    },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSeconds) },
    },
  );
}

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
  const limit = rateLimit(`contact:${ip}`, MAX_REQUESTS, WINDOW_MS);
  if (!limit.success) return tooMany(limit.retryAfterSeconds);

  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "برای ثبت درخواست پروژه، ابتدا وارد حساب خود شوید یا ثبت‌نام کنید.",
      },
      { status: 401 },
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

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      {
        ok: false,
        message: firstIssue?.message ?? "اطلاعات ارسال‌شده معتبر نیست.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: bots fill hidden fields. Pretend everything is fine.
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const clean = {
    name: sanitizeText(data.name),
    phone: sanitizeText(data.phone),
    email: sanitizeText(data.email),
    brand: sanitizeText(data.brand),
    projectType: sanitizeText(data.projectType),
    budget: sanitizeText(data.budget),
    message: sanitizeText(data.message),
  };

  const submittedAt = new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Tehran",
  }).format(new Date());

  // درخواست همیشه در دیتابیس ثبت می‌شود تا در پنل کاربر دیده شود.
  const lead = newLeadRecord({ ...clean, userId: sessionUser.id });
  await mutateDb((db) => {
    db.leads.push(lead);
  });

  const lines = [
    "🚀 <b>درخواست پروژه‌ی جدید</b>",
    "",
    `<b>نام:</b> ${escapeHtml(clean.name)}`,
    `<b>برند:</b> ${escapeHtml(clean.brand)}`,
    `<b>نوع پروژه:</b> ${escapeHtml(clean.projectType)}`,
    `<b>بودجه:</b> ${escapeHtml(clean.budget)}`,
    `<b>ایمیل:</b> <code>${escapeHtml(clean.email)}</code>`,
    `<b>تلفن:</b> <code>${escapeHtml(clean.phone)}</code>`,
    "",
    "<b>توضیحات:</b>",
    escapeHtml(clean.message),
    "",
    `<i>${escapeHtml(submittedAt)} — ${escapeHtml(ip)}</i>`,
  ];

  if (!isTelegramConfigured()) {
    console.warn(
      "[contact] Telegram is not configured. Lead captured locally:",
      clean,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  const sent = await sendTelegramMessage(lines.join("\n"));
  if (!sent) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "ارسال درخواست انجام نشد. لطفاً دوباره تلاش کنید یا مستقیم به ایمیل ما پیام بدهید.",
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
