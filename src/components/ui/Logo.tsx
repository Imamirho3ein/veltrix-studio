import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  size = 44,
  loading = "lazy",
}: {
  className?: string;
  size?: number;
  loading?: "eager" | "lazy";
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[14%] rounded-full bg-brand/45 blur-[14px]"
      />
      <Image
        src="/brand/logo-192.png"
        alt=""
        width={size}
        height={size}
        loading={loading}
        className="relative h-full w-full object-contain drop-shadow-[0_0_12px_rgba(240, 162, 76,0.38)]"
      />
    </span>
  );
}
