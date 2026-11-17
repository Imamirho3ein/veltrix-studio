import Link from "next/link";
import { LockKeyhole, LogIn, UserRoundPlus } from "lucide-react";

export function LoginGate() {
  return (
    <div className="gradient-border card-surface relative overflow-hidden p-8 text-center sm:p-10">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 size-64 -translate-x-1/2 rounded-full bg-brand/10 blur-[70px]"
      />
      <span className="relative mx-auto flex size-14 items-center justify-center rounded-2xl border border-brand/25 bg-brand/10 text-brand-500">
        <LockKeyhole className="size-6" />
      </span>
      <h2 className="relative mt-5 text-lg font-bold text-white">
        ثبت درخواست پروژه مخصوص کاربران استودیو است
      </h2>
      <p className="relative mx-auto mt-3 max-w-sm text-[0.82rem] leading-7 text-fog-400">
        برای ثبت درخواست، اول حساب بسازید یا وارد شوید. بعد از تأیید ایمیل با
        کد ۶ رقمی، فرم پروژه باز می‌شود و وضعیت درخواست‌تان را در پنل
        اختصاصی می‌بینید.
      </p>
      <div className="relative mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/register" className="btn btn-primary">
          <UserRoundPlus className="size-4" />
          ساخت حساب
        </Link>
        <Link href="/login?next=/contact" className="btn btn-secondary">
          <LogIn className="size-4" />
          ورود به حساب
        </Link>
      </div>
      <p className="relative mt-5 text-[0.66rem] text-fog-500">
        تأیید ایمیل با کد ۶ رقمی انجام می‌شود؛ لینک تأیید هم به‌عنوان پشتیبان
        فعال است.
      </p>
    </div>
  );
}
