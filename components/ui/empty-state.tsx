import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  label = "Blank sheet",
  title,
  description,
  action,
  secondary,
  className,
}: {
  label?: string;
  title: ReactNode;
  description: ReactNode;
  action?: ReactNode;
  secondary?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative border border-dashed border-line-strong bg-paper/50 px-6 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-12",
        className,
      )}
    >
      <div className="absolute -top-px left-5 border-x border-b border-dashed border-line-strong bg-paper px-3 py-1.5">
        <span className="label-mono text-muted">{label}</span>
      </div>
      <h3 className="max-w-lg font-display text-[28px] leading-[1.08] tracking-[-0.025em] text-ink sm:text-[34px]">
        {title}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        {description}
      </p>
      {(action || secondary) && (
        <div className="mt-7 flex flex-wrap items-center gap-3">
          {action}
          {secondary}
        </div>
      )}
    </div>
  );
}
