import type { ReactNode } from "react";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertTone = "danger" | "success" | "warning" | "info";

const tones: Record<AlertTone, string> = {
  danger: "border-danger/30 bg-danger-wash text-danger",
  success: "border-pine/25 bg-pine-wash text-pine",
  warning: "border-brass/40 bg-brass/10 text-ink-2",
  info: "border-line bg-paper-2 text-ink-2",
};

const iconTones: Record<AlertTone, string> = {
  danger: "text-danger",
  success: "text-pine",
  warning: "text-brass",
  info: "text-muted",
};

const icons = {
  danger: CircleAlert,
  success: CircleCheck,
  warning: TriangleAlert,
  info: Info,
};

export function Alert({
  tone = "danger",
  children,
  className,
}: {
  tone?: AlertTone;
  children: ReactNode;
  className?: string;
}) {
  const Icon = icons[tone];

  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-2 border px-3.5 py-3 text-[13px] leading-relaxed",
        tones[tone],
        className,
      )}
    >
      <Icon
        className={cn("mt-0.5 h-4 w-4 shrink-0", iconTones[tone])}
        aria-hidden="true"
      />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
