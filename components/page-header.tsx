import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  meta,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && (
          <p className="label-mono mb-3 text-rust-deep">{eyebrow}</p>
        )}
        <h1 className="font-display text-[32px] leading-[1.05] tracking-[-0.03em] text-ink sm:text-[38px]">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>
      {(actions || meta) && (
        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          {meta && (
            <div className="label-mono text-muted">{meta}</div>
          )}
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
      )}
    </header>
  );
}
