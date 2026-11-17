"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const messages: Record<string, { text: string; success: boolean }> = {
  success: {
    text: "ایمیل شما تأیید شد! حالا با ایمیل و رمز عبور وارد شوید.",
    success: true,
  },
  expired: {
    text: "لینک تأیید نامعتبر یا منقضی شده است. می‌توانید بعد از ورود، لینک تازه بگیرید یا دوباره ثبت‌نام کنید.",
    success: false,
  },
  missing: {
    text: "لینک تأیید ناقص است.",
    success: false,
  },
};

export function VerifyNotice() {
  const params = useSearchParams();
  const key = params.get("verify");
  if (!key) return null;
  const notice = messages[key];
  if (!notice) return null;

  return (
    <div
      role="status"
      className={`mb-5 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-xs leading-6 ${
        notice.success
          ? "border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-700"
          : "border-rose-400/25 bg-rose-400/[0.07] text-rose-700"
      }`}
    >
      {notice.success ? (
        <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
      ) : (
        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
      )}
      <span>
        {notice.text}{" "}
        {key === "expired" ? (
          <Link
            href="/register"
            className="underline decoration-dotted underline-offset-4 hover:text-white"
          >
            ثبت‌نام
          </Link>
        ) : null}
      </span>
    </div>
  );
}
