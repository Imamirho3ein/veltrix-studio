"use client";

import { useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  BadgeCheck,
  CheckCircle2,
  Loader2,
  MailCheck,
  UserRoundPlus,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { registerSchema, type RegisterValues } from "@/lib/validations/auth";

type RegisterResponse = {
  ok?: boolean;
  message?: string;
  emailFallback?: boolean;
};

type VerifyCodeResponse = {
  ok?: boolean;
  message?: string;
};

/** next مسیر بازگشت را می‌خواند؛ فقط مسیر داخلی مجاز است. */
function nextQuery(): string {
  if (typeof window === "undefined") return "";
  const next = new URLSearchParams(window.location.search).get("next");
  return next && next.startsWith("/") && !next.startsWith("//")
    ? `?next=${encodeURIComponent(next)}`
    : "";
}

export function RegisterForm() {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fallback, setFallback] = useState(false);
  const [done, setDone] = useState(false);
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [codeMessage, setCodeMessage] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: RegisterValues) {
    setServerError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as RegisterResponse;

      if (!response.ok || !data.ok) {
        setServerError(data.message ?? "ثبت‌نام انجام نشد. دوباره تلاش کنید.");
        return;
      }

      setEmail(values.email.toLowerCase());
      setSuccessMessage(data.message ?? "حساب شما ساخته شد.");
      setFallback(Boolean(data.emailFallback));
      setDone(true);
    } catch {
      setServerError("ارتباط با سرور برقرار نشد. اتصال اینترنت را بررسی کنید.");
    }
  }

  async function submitCode(event: FormEvent) {
    event.preventDefault();
    setCodeError("");
    setCodeMessage("");

    const clean = code.replace(/\D/g, "");
    if (clean.length !== 6) {
      setCodeError("کد تأیید ۶ رقمی را وارد کنید.");
      return;
    }

    setVerifying(true);
    try {
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: clean }),
      });
      const data = (await response.json()) as VerifyCodeResponse;
      if (!response.ok || !data.ok) {
        setCodeError(data.message ?? "تأیید انجام نشد. دوباره تلاش کنید.");
        return;
      }
      setVerified(true);
    } catch {
      setCodeError("ارتباط با سرور برقرار نشد. اتصال اینترنت را بررسی کنید.");
    } finally {
      setVerifying(false);
    }
  }

  async function resendCode() {
    setResending(true);
    setCodeMessage("");
    try {
      const response = await fetch("/api/auth/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as VerifyCodeResponse;
      setCodeMessage(data.message ?? "کد تازه ارسال شد.");
    } catch {
      setCodeMessage("ارتباط با سرور برقرار نشد.");
    } finally {
      setResending(false);
    }
  }

  if (done && verified) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
        role="status"
        aria-live="polite"
      >
        <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-emerald-600/25 bg-emerald-600/10 text-emerald-700">
          <BadgeCheck className="size-7" />
        </span>
        <h2 className="mt-5 text-lg font-bold text-white">ایمیل تأیید شد!</h2>
        <p className="mt-3 text-xs leading-7 text-fog-400">
          حساب شما فعال است. برای ثبت درخواست پروژه، وارد حساب شوید.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <Button href={`/login${nextQuery()}`} fullWidth arrow>
            ورود به حساب
          </Button>
        </div>
      </motion.div>
    );
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        role="status"
        aria-live="polite"
      >
        <div className="text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-brand-400/25 bg-brand-400/10 text-brand-300">
            <MailCheck className="size-7" />
          </span>
          <h2 className="mt-5 text-lg font-bold text-white">حساب ساخته شد</h2>
          <p className="mt-3 text-xs leading-7 text-fog-400">
            {successMessage}
          </p>
          {fallback ? (
            <p className="mt-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.64rem] leading-6 text-fog-500">
              SMTP هنوز تنظیم نشده؛ کد تأیید از مسیر جایگزین (لاگ سرور یا
              تلگرام استودیو) صادر شد.
            </p>
          ) : (
            <p className="mt-2 text-[0.64rem] text-fog-500">
              اگر ایمیل را ندیدید، پوشه‌ی اسپم را هم بررسی کنید.
            </p>
          )}
        </div>

        <form
          noValidate
          onSubmit={submitCode}
          className="mt-6 space-y-3"
        >
          <label htmlFor="reg-code" className="block text-xs text-fog-300">
            کد تأیید ۶ رقمی
          </label>
          <input
            id="reg-code"
            value={code}
            onChange={(event) =>
              setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
            }
            dir="ltr"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="------"
            className="field text-center text-lg tracking-[0.6em]"
            aria-invalid={Boolean(codeError)}
          />
          {codeError ? (
            <p role="alert" className="text-[0.68rem] text-rose-600">
              {codeError}
            </p>
          ) : null}
          <Button
            type="submit"
            disabled={verifying || code.length !== 6}
            arrow={!verifying}
            icon={
              verifying ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <CheckCircle2 className="size-4" />
              )
            }
            fullWidth
          >
            {verifying ? "در حال بررسی کد..." : "تأیید ایمیل"}
          </Button>
        </form>

        <div className="mt-4 flex items-center justify-between gap-3 text-[0.66rem] text-fog-500">
          <span className="leading-6">{codeMessage}</span>
          <button
            type="button"
            onClick={resendCode}
            disabled={resending}
            className="shrink-0 text-brand-600 underline decoration-dotted underline-offset-4 transition hover:text-brand-800 disabled:opacity-60"
          >
            {resending ? "در حال ارسال..." : "ارسال دوباره‌ی کد"}
          </button>
        </div>

        <p className="mt-5 text-center text-[0.62rem] text-fog-500">
          اشتباه وارد کردید؟{" "}
          <Link
            href="/register"
            className="text-brand-600 underline decoration-dotted underline-offset-4"
          >
            ثبت‌نام مجدد
          </Link>
        </p>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="reg-email" className="mb-2 block text-xs text-fog-300">
          ایمیل
        </label>
        <input
          id="reg-email"
          type="email"
          dir="ltr"
          className="field text-start"
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email ? (
          <p role="alert" className="mt-1.5 text-[0.68rem] text-rose-600">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="reg-password" className="mb-2 block text-xs text-fog-300">
          رمز عبور
        </label>
        <input
          id="reg-password"
          type="password"
          dir="ltr"
          className="field text-start"
          placeholder="حداقل ۸ کاراکتر، حرف + عدد"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.password)}
          {...register("password")}
        />
        {errors.password ? (
          <p role="alert" className="mt-1.5 text-[0.68rem] text-rose-600">
            {errors.password.message}
          </p>
        ) : null}
        <p className="mt-2 text-[0.62rem] text-fog-500">
          رمز عبور با الگوریتم bcrypt هش می‌شود و نزد ما قابل خواندن نیست.
        </p>
      </div>

      {serverError ? (
        <div
          role="alert"
          className="rounded-xl border border-rose-400/25 bg-rose-400/[0.07] px-4 py-3 text-xs leading-6 text-rose-700"
        >
          {serverError}
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={isSubmitting}
        arrow={!isSubmitting}
        icon={
          isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <UserRoundPlus className="size-4" />
          )
        }
        fullWidth
      >
        {isSubmitting ? "در حال ثبت..." : "ساخت حساب"}
      </Button>

      <p className="flex items-center justify-center gap-2 text-center text-[0.68rem] text-fog-500">
        <CheckCircle2 className="size-3.5 text-brand-2" />
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <Link href="/login" className="text-brand-600 transition hover:text-white">
          وارد شوید
        </Link>
      </p>
    </form>
  );
}
