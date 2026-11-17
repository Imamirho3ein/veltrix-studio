import { z } from "zod";
import {
  createUser,
  findUserByEmail,
  issueVerifyCode,
  issueVerifyToken,
} from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mailer";
import { registerSchema } from "@/lib/validations/auth";
import {
  fieldErrors,
  firstIssue,
  jsonError,
  jsonOk,
  readJson,
} from "@/lib/api";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = rateLimit(`register:${ip}`, MAX_REQUESTS, WINDOW_MS);
  if (!limit.success) {
    return jsonError(
      `تعداد تلاش‌ها زیاد است. لطفاً ${Math.ceil(
        limit.retryAfterSeconds / 60,
      )} دقیقه دیگر تلاش کنید.`,
      429,
    );
  }

  const payload = await readJson(request);
  const parsed = await z.object(registerSchema.shape).safeParseAsync(payload);
  if (!parsed.success) {
    return jsonError(firstIssue(parsed.error), 422, {
      errors: fieldErrors(parsed.error),
    });
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await findUserByEmail(email);

  if (existing) {
    if (existing.verified) {
      return jsonError(
        "این ایمیل قبلاً ثبت شده است. وارد شوید یا ایمیل دیگری بزنید.",
        409,
      );
    }
    // حساب ثبت شده اما تأیید نشده — کد و لینک تازه می‌فرستیم.
    const token = await issueVerifyToken(existing);
    const code = await issueVerifyCode(existing);
    const delivery = await sendVerificationEmail(email, token, code);
    return jsonOk({
      message: delivery.sent
        ? "کد تأیید ۶ رقمی به ایمیل‌تان ارسال شد؛ آن را در همین صفحه وارد کنید."
        : "حساب شما از قبل ساخته شده بود. کد تأیید در لاگ سرور/تلگرام استودیو قرار گرفت.",
      emailFallback: !delivery.sent,
    });
  }

  const user = await createUser(email, parsed.data.password);
  const token = await issueVerifyToken(user);
  const code = await issueVerifyCode(user);
  const delivery = await sendVerificationEmail(email, token, code);

  return jsonOk({
    message: delivery.sent
      ? "حساب شما ساخته شد. کد تأیید ۶ رقمی به ایمیل‌تان ارسال شد."
      : "حساب شما ساخته شد، اما SMTP هنوز تنظیم نشده است. کد تأیید در لاگ سرور/تلگرام استودیو قرار گرفت.",
    emailFallback: !delivery.sent,
  });
}

export function GET() {
  return jsonError("روش درخواست پشتیبانی نمی‌شود.", 405);
}
