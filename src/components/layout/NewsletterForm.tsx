"use client";

import { useState } from "react";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "ok" | "error";

const DEFAULT_NOTE = "هفته‌ای یک ایمیل کوتاه؛ هر وقت خواستید لغو کنید.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState(DEFAULT_NOTE);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setNote("ایمیل معتبر نیست. نمونه: name@example.com");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setNote(data.message ?? "ثبت ایمیل انجام نشد. لطفاً دوباره تلاش کنید.");
        return;
      }

      setStatus("ok");
      setNote("ثبت شد؛ به‌زودی از ما خبر می‌شنوید.");
      setEmail("");
    } catch {
      setStatus("error");
      setNote("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
    }
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    if (status === "error" || status === "ok") {
      setStatus("idle");
      setNote(DEFAULT_NOTE);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-4">
      <label htmlFor="newsletter-email" className="sr-only">
        ایمیل برای عضویت در خبرنامه‌ی ولتریکس استودیو
      </label>

      <div
        className={cn(
          "flex h-[3.15rem] items-center gap-1.5 rounded-[0.85rem] border bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] py-1.5 pe-1.5 ps-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-300",
          status === "error"
            ? "border-rose-400/60"
            : "border-white/10 focus-within:border-brand/50 focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_3px_rgba(240,162,76,0.12)]",
        )}
      >
        <input
          id="newsletter-email"
          name="email"
          type="email"
          dir="ltr"
          inputMode="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={onChange}
          aria-invalid={status === "error" ? true : undefined}
          aria-describedby="newsletter-note"
          className="h-full min-w-0 flex-1 border-0 bg-transparent text-left text-sm text-white outline-none placeholder:text-left placeholder:text-fog-500"
        />
        <button
          type="submit"
          aria-label="عضویت در خبرنامه"
          disabled={status === "loading"}
          className="grid size-9 shrink-0 place-items-center rounded-[0.6rem] border border-[#fff0dc]/60 bg-[linear-gradient(180deg,#f7d3a4_0%,#d69c5f_42%,#a9703a_74%,#8d5c2d_100%)] text-[#2a1b0c] shadow-[inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-1px_0_rgba(90,52,24,0.5),0_4px_14px_-5px_rgba(240,162,76,0.7)] transition duration-200 hover:-translate-y-px hover:brightness-105 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : status === "ok" ? (
            <Check className="size-4" />
          ) : (
            <ArrowLeft className="size-4" />
          )}
        </button>
      </div>

      <p
        id="newsletter-note"
        role="status"
        aria-live="polite"
        className={cn(
          "mt-2.5 min-h-4 text-[0.68rem] leading-5",
          status === "error"
            ? "text-brand"
            : status === "ok"
              ? "text-brand-2"
              : "text-fog-500",
        )}
      >
        {note}
      </p>
    </form>
  );
}
