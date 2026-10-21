import {
  Bell,
  Check,
  Loader2,
  RefreshCw,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import type { AutomationStep } from "@/lib/groq";
import { cn } from "@/lib/utils";

export type StepStatus = "pending" | "running" | "completed" | "failed";

function StepNode({
  number,
  status,
}: {
  number: number;
  status: StepStatus;
}) {
  return (
    <span
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[10px]",
        status === "running" && "border-rust/40 bg-rust-wash text-rust-deep",
        status === "completed" && "border-pine/30 bg-pine-wash text-pine",
        status === "failed" && "border-danger/30 bg-danger-wash text-danger",
        status === "pending" && "border-line-strong bg-paper text-rust-deep",
      )}
      aria-hidden="true"
    >
      {status === "running" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
      {status === "completed" && <Check className="h-3.5 w-3.5" />}
      {status === "failed" && <X className="h-3.5 w-3.5" />}
      {status === "pending" && String(number).padStart(2, "0")}
    </span>
  );
}

function Metadata({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Bell;
}) {
  if (!value) return null;

  return (
    <div className="flex items-start gap-2">
      <Icon
        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="label-mono text-muted">{label}</p>
        <p className="mt-0.5 text-[12px] leading-snug text-ink-2">{value}</p>
      </div>
    </div>
  );
}

export function StepTimeline({
  steps,
  statuses,
  compact = false,
}: {
  steps: AutomationStep[];
  statuses?: Record<number, StepStatus>;
  compact?: boolean;
}) {
  return (
    <ol className="space-y-0">
      {steps.map((step, index) => {
        const status = statuses?.[step.step] ?? "pending";
        const isLast = index === steps.length - 1;

        return (
          <li
            key={`${step.step}-${step.title}`}
            className={cn("flex gap-4", compact ? "pb-5 last:pb-0" : "pb-7 last:pb-0")}
          >
            <div className="flex flex-col items-center">
              <StepNode number={step.step} status={status} />
              {!isLast && <span className="mt-1 w-px flex-1 bg-line" />}
            </div>

            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-[15px] font-medium leading-snug text-ink">
                  {step.title}
                </h3>
                <span className="label-mono text-muted">
                  {String(step.step).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1 max-w-[62ch] text-[13px] leading-relaxed text-muted">
                {step.description}
              </p>

              <div className="mt-3 grid gap-x-6 gap-y-3 border-t border-line pt-3 sm:grid-cols-2">
                <Metadata label="Trigger" value={step.trigger} icon={Bell} />
                <Metadata label="Action" value={step.action} icon={Zap} />
                <Metadata label="Tool" value={step.tool} icon={Wrench} />
                <Metadata label="Frequency" value={step.frequency} icon={RefreshCw} />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
