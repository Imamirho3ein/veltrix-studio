"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { loginSchema, type LoginValues } from "@/lib/validations/auth";

type LoginResponse = {
  ok?: boolean;
  message?: string;
  needsVerification?: boolean;
};

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [pending, setPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: LoginValues) {
    setServerError("");
    setPending(false);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as LoginResponse;

      if (!response.ok || !data.ok) {
        if (data.needsVerification) {
          setServerError(data.message ?? "حساب شما تأیید نشده است.");
          setPending(true);
          return;
        }
        setServerError(data.message ?? "ورود انجام نشد. دوباره تلاش کنید.");
        return;
      }

      const next = new URLSearchParams(window.location.search).get("next");
      router.push(
        next && next.startsWith("/") && !next.startsWith("//")
          ? next
          : "/panel",
      );
      router.refresh();
    } catch {
      setServerError("ارتباط با سرور برقرار نشد. اتصال اینترنت را بررسی کنید.");
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="login-email" className="mb-2 block text-xs text-fog-300">
          ایمیل
        </label>
        <input
          id="login-email"
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
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="login-password" className="block text-xs text-fog-300">
            رمز عبور
          </label>
          <Link
            href="/register"
            className="text-[0.66rem] text-fog-500 transition hover:text-brand-600"
          >
            حساب ندارید؟ ثبت‌نام
          </Link>
        </div>
        <input
          id="login-password"
          type="password"
          dir="ltr"
          className="field text-start"
          placeholder="••••••••"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          {...register("password")}
        />
        {errors.password ? (
          <p role="alert" className="mt-1.5 text-[0.68rem] text-rose-600">
            {errors.password.message}
          </p>
        ) : null}
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
            <LogIn className="size-4" />
          )
        }
        fullWidth
      >
        {isSubmitting ? "در حال ورود..." : "ورود به حساب"}
      </Button>

      {pending ? (
        <p className="flex items-start gap-2 text-[0.68rem] leading-6 text-fog-500">
          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-brand-2" />
          کد تأیید تازه به ایمیل‌تان ارسال شد؛ بعد از تأیید، دوباره وارد شوید.
        </p>
      ) : null}
    </form>
  );
}
