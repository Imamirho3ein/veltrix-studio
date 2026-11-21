import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/animations/FadeUp";

type SectionTitleProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  className?: string;
  action?: ReactNode;
  id?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "start",
  className,
  action,
  id,
}: SectionTitleProps) {
  const descriptionText =
    typeof description === "string" && description.endsWith(".")
      ? `${description} `
      : description;

  return (
    <FadeUp
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
        <h2 id={id} className="section-title">
          {title}
        </h2>
        {descriptionText ? (
          <p className="lead mt-5 text-[0.98rem] md:text-base">
            {descriptionText}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </FadeUp>
  );
}
