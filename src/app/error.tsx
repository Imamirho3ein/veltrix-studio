"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative overflow-hidden pb-20 pt-[calc(var(--header-height)+5rem)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines opacity-50" />
        <div className="orb -top-32 right-1/3 size-80 bg-rose-500/10" />
      </div>

      <div className="container-x">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-rose-400/25 bg-rose-400/10 text-rose-300">
            <AlertTriangle className="size-6" />
          </span>

          <h1 className="page-title mt-6">مشکلی پیش آمد.</h1>
          <p className="lead mx-auto mt-4 max-w-md text-[0.92rem]">
            در بارگذاری این بخش خطایی رخ داد. می‌توانید دوباره تلاش کنید؛ اگر
            مشکل ادامه داشت، از تلگرام به ما پیام بدهید.
          </p>

          {error.digest ? (
            <p className="mt-4 font-latin text-[0.62rem] tracking-wider text-fog-600">
              ERROR CODE: {error.digest}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              onClick={reset}
              icon={<RefreshCw className="size-4" />}
              type="button"
              fullWidth
              className="sm:w-auto"
            >
              تلاش دوباره
            </Button>
            <Button href="/" variant="secondary" fullWidth className="sm:w-auto">
              بازگشت به خانه
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
