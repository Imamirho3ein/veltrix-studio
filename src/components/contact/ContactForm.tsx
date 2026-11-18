"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { budgetOptions, projectTypes } from "@/lib/constants";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[0.68rem] text-rose-600">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      brand: "",
      projectType: "",
      budget: "",
      message: "",
      website: "",
    },
    mode: "onTouched",
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setServerError(
          data.message ??
            "ارسال درخواست انجام نشد. لطفاً دوباره تلاش کنید یا از تلگرام پیام بدهید.",
        );
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setServerError(
        "ارتباط با سرور برقرار نشد. اتصال اینترنت را بررسی کنید یا از تلگرام پیام بدهید.",
      );
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex min-h-[420px] flex-col items-center justify-center rounded-[24px] border border-white/[0.08] bg-card/70 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <span className="flex size-16 items-center justify-center rounded-full border border-brand-400/25 bg-brand-400/10 text-brand-300">
          <CheckCircle2 className="size-8" />
        </span>
        <h3 className="mt-6 text-xl font-bold text-white">
          درخواست شما با موفقیت ارسال شد.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-7 text-fog-400">
          پیام شما ثبت شد. تیم ولتریکس در اولین فرصت — معمولاً کمتر از ۲۴ ساعت
          کاری — با شما تماس می‌گیرد.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-secondary btn-sm mt-7"
        >
          ارسال درخواست دیگر
        </button>
      </motion.div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[24px] border border-white/[0.08] bg-card/60 p-5 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">فرم درخواست پروژه</h2>
          <p className="mt-2 text-xs leading-6 text-fog-400">
            هرچه دقیق‌تر بنویسید، برآورد ما دقیق‌تر خواهد بود.
          </p>
        </div>
        <span className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.62rem] text-fog-500 sm:inline-flex">
          پاسخ &lt; ۲۴ ساعت
        </span>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs text-fog-300">
            نام و نام خانوادگی <span className="text-rose-600">*</span>
          </label>
          <input
            id="name"
            className="field"
            placeholder="مثلاً سارا احمدی"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-xs text-fog-300">
            شماره تماس <span className="text-rose-600">*</span>
          </label>
          <input
            id="phone"
            className="field"
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-xs text-fog-300">
            ایمیل <span className="text-rose-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            dir="ltr"
            className="field text-start"
            placeholder="ایمیل شما"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>

        <div>
          <label htmlFor="brand" className="mb-2 block text-xs text-fog-300">
            نام برند یا کسب‌وکار <span className="text-rose-600">*</span>
          </label>
          <input
            id="brand"
            className="field"
            placeholder="نام برند شما"
            autoComplete="organization"
            aria-invalid={Boolean(errors.brand)}
            aria-describedby={errors.brand ? "brand-error" : undefined}
            {...register("brand")}
          />
          <FieldError id="brand-error" message={errors.brand?.message} />
        </div>

        <div>
          <label
            htmlFor="projectType"
            className="mb-2 block text-xs text-fog-300"
          >
            نوع پروژه <span className="text-rose-600">*</span>
          </label>
          <select
            id="projectType"
            className="field field-select"
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={
              errors.projectType ? "projectType-error" : undefined
            }
            {...register("projectType")}
          >
            <option value="">انتخاب کنید…</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <FieldError
            id="projectType-error"
            message={errors.projectType?.message}
          />
        </div>

        <div>
          <label htmlFor="budget" className="mb-2 block text-xs text-fog-300">
            بودجه تقریبی <span className="text-rose-600">*</span>
          </label>
          <select
            id="budget"
            className="field field-select"
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={errors.budget ? "budget-error" : undefined}
            {...register("budget")}
          >
            <option value="">انتخاب کنید…</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError id="budget-error" message={errors.budget?.message} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-2 block text-xs text-fog-300">
          توضیحات پروژه <span className="text-rose-600">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className="field h-auto min-h-[132px] resize-y py-3 leading-7"
          placeholder="درباره‌ی کسب‌وکار، مخاطب و چیزی که می‌خواهید بسازید بنویسید…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-rose-400/25 bg-rose-400/[0.07] px-4 py-3 text-xs leading-6 text-rose-700"
        >
          {serverError}
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          disabled={isSubmitting}
          arrow={!isSubmitting}
          icon={
            isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )
          }
          fullWidth
          className="sm:w-auto"
        >
          {isSubmitting ? "در حال ارسال..." : "ارسال درخواست"}
        </Button>
        <p className="text-[0.62rem] leading-5 text-fog-500">
          اطلاعات شما فقط برای بررسی همین پروژه استفاده می‌شود.
        </p>
      </div>
    </form>
  );
}
