import { cn } from "@/lib/utils";

export function Meter({
  value,
  max = 3,
  inverse = false,
  className,
  label,
}: {
  value: number;
  max?: number;
  inverse?: boolean;
  className?: string;
  label?: string;
}) {
  const percent = Math.min(100, Math.round((value / max) * 100));

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label={label ?? `${value} of ${max} plans used`}
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full",
        inverse ? "bg-line-on-ink" : "bg-paper-3",
        className,
      )}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-500 ease-out",
          value >= max ? "bg-brass" : inverse ? "bg-rust-on-ink" : "bg-rust",
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
