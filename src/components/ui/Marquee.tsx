import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
  fast?: boolean;
};

export function Marquee({
  items,
  className,
  itemClassName,
  fast = false,
}: MarqueeProps) {
  const repeated = [...items, ...items];

  return (
    <div className={cn("marquee", fast && "marquee-fast", className)}>
      <div className="marquee-track">
        {repeated.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className={cn(
              "flex shrink-0 items-center gap-7 px-7 sm:gap-9 sm:px-9",
              itemClassName,
            )}
          >
            <span className="whitespace-nowrap">{item}</span>
            <span aria-hidden="true" className="text-brand-2/60">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
