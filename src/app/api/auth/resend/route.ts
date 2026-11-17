import { z } from "zod";
import {
  findUserByEmail,
  issueVerifyCode,
  issueVerifyToken,
} from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mailer";
import { emailSchema } from "@/lib/validations/auth";
import { fieldErrors, firstIssue, jsonError, jsonOk, readJson } from "@/lib/api";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 3;

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = rateLimit(`resend:${ip}`, MAX_REQUESTS, WINDOW_MS);
  if (!limit.success) {
    return jsonError(
      `تعداد تلاش‌ها زیاد است. ${Math.ceil(limit.retryAfterSeconds / 60)} دقیقه دیگر تلاش کنید.`,
      429,
    );
  }

  const payload = await readJson(request);
  const parsed = await z.object({ email: emailSchema }).safeParseAsync(payload);
  if (!parsed.success) {
    return jsonError(firstIssue(parsed.error), 422, {
      errors: fieldErrors(parsed.error),
    });
  }

  const email = parsed.data.email.toLowerCase();
  const user = await findUserByEmail(email);

  // برای جلوگیری از کشف ایمیلی که ثبت‌نام کرده، پاسخ همیشه یکسان است.
  if (!user || user.verified) {
    return jsonOk({
      message: "اگر این ایمیل ثبت‌نام نشده باشد، نادیده گرفته می‌شود.",
    });
  }

  const token = await issueVerifyToken(user);
  const code = await issueVerifyCode(user);
  const delivery = await sendVerificationEmail(email, token, code);

  return jsonOk({
    message: delivery.sent
      ? "کد تأیید تازه ارسال شد. صندوق ورودی (و پوشه‌ی اسپم) را بررسی کنید."
      : "SMTP تنظیم نشده است. کد تأیید در لاگ سرور/تلگرام استودیو قرار گرفت.",
    emailFallback: !delivery.sent,
  });
}

export function GET() {
  return jsonError("روش درخواست پشتیبانی نمی‌شود.", 405);
}
