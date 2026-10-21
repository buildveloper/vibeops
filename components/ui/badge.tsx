import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeTone = "neutral" | "rust" | "pine" | "danger" | "brass" | "ink";

const tones: Record<BadgeTone, string> = {
  neutral: "border-line bg-paper-2 text-ink-2",
  rust: "border-rust/30 bg-rust-wash text-rust-deep",
  pine: "border-pine/25 bg-pine-wash text-pine",
  danger: "border-danger/25 bg-danger-wash text-danger",
  brass: "border-brass/30 bg-brass/10 text-ink-2",
  ink: "border-ink bg-ink text-paper",
};

export function Badge({
  children,
  tone = "neutral",
  dot = true,
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-xs border px-2 py-1 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.1em]",
        tones[tone],
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
