import { z } from "zod";
import { consumeVerifyCode } from "@/lib/auth";
import { emailSchema } from "@/lib/validations/auth";
import { fieldErrors, firstIssue, jsonError, jsonOk, readJson } from "@/lib/api";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 12;

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = rateLimit(`verify-code:${ip}`, MAX_REQUESTS, WINDOW_MS);
  if (!limit.success) {
    return jsonError(
      `تلاش‌های شما زیاد است. ${Math.ceil(limit.retryAfterSeconds / 60)} دقیقه دیگر تلاش کنید.`,
      429,
    );
  }

  const payload = await readJson(request);
  const parsed = await z
    .object({
      email: emailSchema,
      code: z
        .string()
        .trim()
        .regex(/^\d{6}$/, "کد تأیید ۶ رقمی را وارد کنید."),
    })
    .safeParseAsync(payload);
  if (!parsed.success) {
    return jsonError(firstIssue(parsed.error), 422, {
      errors: fieldErrors(parsed.error),
    });
  }

  const emailLimit = rateLimit(
    `verify-code-email:${parsed.data.email.toLowerCase()}`,
    MAX_REQUESTS,
    WINDOW_MS,
  );
  if (!emailLimit.success) {
    return jsonError(
      "تلاش‌های زیادی برای این ایمیل انجام شده است. کمی بعد دوباره تلاش کنید.",
      429,
    );
  }

  const ok = await consumeVerifyCode(parsed.data.email, parsed.data.code);
  if (!ok) {
    return jsonError(
      "کد تأیید نامعتبر یا منقضی شده است. دوباره تلاش کنید یا کد تازه بگیرید.",
      400,
    );
  }

  return jsonOk({
    message: "ایمیل شما تأیید شد. حالا می‌توانید وارد حساب شوید.",
  });
}

export function GET() {
  return jsonError("روش درخواست پشتیبانی نمی‌شود.", 405);
}
