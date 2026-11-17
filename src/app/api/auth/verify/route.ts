import { NextResponse } from "next/server";
import { consumeVerifyToken } from "@/lib/auth";
import { siteConfig } from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Origin درخواست را برمی‌گرداند تا ریدایرکت همیشه در همان محیط بماند
 * (لوکال → localhost، پروداکشن پشت پروکسی → دامنه اصلی).
 */
function resolveOrigin(request: Request): string {
  const host =
    request.headers.get("x-forwarded-host")?.split(",")[0] ??
    request.headers.get("host");
  if (!host) return siteConfig.url;

  const proto =
    request.headers.get("x-forwarded-proto")?.split(",")[0] ??
    new URL(request.url).protocol.replace(":", "");
  return `${proto}://${host}`;
}

/**
 * کاربر با کلیک روی لینک ایمیل به این مسیر می‌رسد.
 * در صورت موفقیت به صفحه‌ی ورود (با پیام موفقیت) و در غیر این صورت
 * با پیام خطا هدایت می‌شود.
 */
export async function GET(request: Request) {
  const origin = resolveOrigin(request);
  const token = new URL(request.url).searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/login?verify=missing", origin),
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const ok = await consumeVerifyToken(token);

  return NextResponse.redirect(
    new URL(ok ? "/login?verify=success" : "/login?verify=expired", origin),
    { headers: { "Cache-Control": "no-store" } },
  );
}
