import { cookies } from "next/headers";
import { z } from "zod";
import {
  SESSION_COOKIE,
  comparePassword,
  createSession,
  findUserByEmail,
  issueVerifyCode,
  issueVerifyToken,
  sessionCookieOptions,
} from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mailer";
import { loginSchema } from "@/lib/validations/auth";
import { fieldErrors, firstIssue, jsonError, jsonOk, readJson } from "@/lib/api";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = rateLimit(`login:${ip}`, MAX_REQUESTS, WINDOW_MS);
  if (!limit.success) {
    return jsonError(
      `تلاش‌های ناموفق زیاد بود. ${Math.ceil(
        limit.retryAfterSeconds / 60,
      )} دقیقه دیگر تلاش کنید.`,
      429,
    );
  }

  const payload = await readJson(request);
  const parsed = await z.object(loginSchema.shape).safeParseAsync(payload);
  if (!parsed.success) {
    return jsonError(firstIssue(parsed.error), 422, {
      errors: fieldErrors(parsed.error),
    });
  }

  const email = parsed.data.email.toLowerCase();
  const user = await findUserByEmail(email);
  const valid =
    user && (await comparePassword(parsed.data.password, user.passwordHash));

  if (!user || !valid) {
    return jsonError("ایمیل یا رمز عبور درست نیست.", 401);
  }

  if (!user.verified) {
    // کد و لینک تأیید تازه می‌فرستیم تا کاربر راهی داشته باشد.
    const token = await issueVerifyToken(user);
    const code = await issueVerifyCode(user);
    const delivery = await sendVerificationEmail(email, token, code);
    return jsonError(
      delivery.sent
        ? "حساب شما تأیید نشده است. کد تأیید ۶ رقمی تازه به ایمیل‌تان ارسال شد."
        : "حساب شما تأیید نشده است. کد تأیید در لاگ سرور/تلگرام استودیو قرار گرفت.",
      403,
      { needsVerification: true },
    );
  }

  const sessionToken = await createSession(user);
  const store = await cookies();
  store.set(SESSION_COOKIE, sessionToken, sessionCookieOptions());

  return jsonOk({ email: user.email });
}

export function GET() {
  return jsonError("روش درخواست پشتیبانی نمی‌شود.", 405);
}
