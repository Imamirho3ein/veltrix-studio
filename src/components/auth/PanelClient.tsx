"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MailWarning, LogOut } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import type { PanelLead } from "@/components/auth/panel-types";
import { cn } from "@/lib/utils";

const statusLabels: Record<string, string> = {
  new: "ثبت شده",
  "in-review": "در حال بررسی",
  done: "انجام شد",
};

type PanelClientProps = {
  email: string;
  verified: boolean;
  leads: PanelLead[];
};

export function PanelClient({ email, verified, leads }: PanelClientProps) {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [code, setCode] = useState("");
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState("");

  async function resendVerification() {
    setSending(true);
    setResendMessage("");
    try {
      const response = await fetch("/api/auth/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { ok?: boolean; message?: string };
      setResendMessage(data.message ?? "درخواست ارسال شد.");
    } catch {
      setResendMessage("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
    } finally {
      setSending(false);
    }
  }

  async function submitVerifyCode(event: FormEvent) {
    event.preventDefault();
    setVerifyingCode(true);
    setVerifyMessage("");
    try {
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };
      if (!response.ok || !data.ok) {
        setVerifyMessage(data.message ?? "تأیید انجام نشد. دوباره تلاش کنید.");
        return;
      }
      setVerifyMessage("تأیید شد؛ پنل به‌روز می‌شود.");
      router.refresh();
    } catch {
      setVerifyMessage("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
    } finally {
      setVerifyingCode(false);
    }
  }

  async function logout() {    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="space-y-8">
      {!verified ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[20px] border border-amber-400/30 bg-amber-400/[0.06] p-5"
        >
          <div className="flex items-start gap-3">
            <MailWarning className="mt-0.5 size-5 shrink-0 text-amber-700" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">
                ایمیل شما تأیید نشده است
              </p>
              <p className="mt-1 text-[0.7rem] leading-6 text-amber-900/70">
                برای فعال شدن کامل حساب، لینک تأییدی که به ایمیل‌تان ارسال شده
                را باز کنید.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={resendVerification}
                  disabled={sending}
                  className="inline-flex items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-300/10 px-3.5 py-2 text-[0.7rem] font-medium text-amber-800 transition hover:bg-amber-800/20 disabled:opacity-60"
                >
                  {sending ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : null}
                  ارسال دوباره‌ی لینک تأیید
                </button>
                {resendMessage ? (
                  <span className="text-[0.66rem] text-amber-900/80">
                    {resendMessage}
                  </span>
                ) : null}
              </div>
              <form
                onSubmit={submitVerifyCode}
                className="mt-4 flex flex-wrap items-center gap-2 border-t border-amber-800/15 pt-4"
              >
                <input
                  value={code}
                  onChange={(event) =>
                    setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  dir="ltr"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="کد ۶ رقمی"
                  aria-label="کد تأیید ایمیل"
                  className="field h-10 w-44 text-center"
                />
                <button
                  type="submit"
                  disabled={verifyingCode || code.length !== 6}
                  className="btn btn-sm btn-primary"
                >
                  {verifyingCode ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : null}
                  تأیید کد
                </button>
                {verifyMessage ? (
                  <span className="text-[0.66rem] leading-6 text-amber-900/80">
                    {verifyMessage}
                  </span>
                ) : null}
              </form>
            </div>
          </div>
        </motion.div>
      ) : null}

      <section aria-labelledby="leads-title">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="leads-title" className="text-lg font-bold text-white">
              درخواست‌های من
            </h2>
            <p className="mt-1.5 text-xs text-fog-400">
              فرم‌هایی که با این ایمیل ثبت کرده‌اید.
            </p>
          </div>
          <Button href="/contact" size="sm" arrow>
            درخواست جدید
          </Button>
        </div>

        {leads.length === 0 ? (
          <div className="mt-5 rounded-[20px] border border-dashed border-white/[0.12] bg-white/[0.02] p-10 text-center">
            <p className="text-sm font-medium text-fog-300">
              هنوز درخواستی ثبت نکرده‌اید
            </p>
            <p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-fog-500">
              فرم درخواست پروژه را پر کنید؛ وضعیت هر درخواست همین‌جا نمایش داده
              می‌شود.
            </p>
          </div>
        ) : (
          <ul className="mt-5 space-y-3">
            {leads.map((lead, index) => (
              <motion.li
                key={lead.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
              >
                <article className="rounded-[20px] border border-white/[0.08] bg-card/60 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
                    <h3 className="text-sm font-bold text-white">
                      {lead.projectType}
                      {lead.brand ? (
                        <span className="ms-2 font-latin text-[0.66rem] font-medium text-fog-500">
                          {lead.brand}
                        </span>
                      ) : null}
                    </h3>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-[0.62rem]",
                        lead.status === "new" &&
                          "bg-brand/10 text-brand-600",
                        lead.status === "in-review" &&
                          "bg-sky-400/10 text-sky-700",
                        lead.status === "done" && "bg-emerald-400/10 text-emerald-700",
                      )}
                    >
                      {statusLabels[lead.status] ?? lead.status}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-3 text-[0.8rem] leading-7 text-fog-400">
                    {lead.message}
                  </p>
                  <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-[0.66rem] text-fog-500">
                    <div className="flex gap-1.5">
                      <dt>بودجه:</dt>
                      <dd className="text-fog-300">{lead.budget || "—"}</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt>تاریخ ثبت:</dt>
                      <dd className="text-fog-300">{lead.createdAtFa}</dd>
                    </div>
                  </dl>
                </article>
              </motion.li>
            ))}
          </ul>
        )}
      </section>

      <div className="flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center">
        <p className="text-[0.68rem] text-fog-500">
          برای تغییر اطلاعات حساب یا سؤال، با استودیو در تماس باشید.
        </p>
        <button
          type="button"
          onClick={logout}
          disabled={loggingOut}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-fog-300 transition hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-600 disabled:opacity-60"
        >
          {loggingOut ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <LogOut className="size-4" />
          )}
          خروج از حساب
        </button>
      </div>
    </div>
  );
}
