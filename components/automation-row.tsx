import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { GeneratedAutomation } from "@/lib/groq";
import { Badge } from "@/components/ui/badge";
import { DeletePlanButton } from "@/components/confirm-dialog";
import { cn, formatDate, formatMonthDay } from "@/lib/utils";

export const AUTOMATION_GRID =
  "lg:grid lg:grid-cols-[28px_minmax(0,1.7fr)_minmax(0,0.8fr)_48px_112px_96px_80px_40px] lg:items-center lg:gap-4";

export function AutomationRow({
  id,
  title,
  businessType,
  goal,
  status,
  createdAt,
  plan,
  index,
  className,
}: {
  id: string;
  title: string;
  businessType: string;
  goal: string;
  status: string;
  createdAt: Date;
  plan: GeneratedAutomation | null;
  index: number;
  className?: string;
}) {
  const label =
    status === "saved" ? "Saved" : status === "draft" ? "Draft" : status;

  return (
    <div
      className={cn(
        "group relative border-b border-line transition-colors hover:bg-paper-2",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-3 py-4 lg:gap-4 lg:py-3", AUTOMATION_GRID)}>
        <span className="hidden font-mono text-[10px] text-muted lg:block">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          <Link
            href={`/dashboard/automations/${id}`}
            className="block after:absolute after:inset-0 focus-visible:after:outline-none"
          >
            <p className="truncate text-[14px] font-medium text-ink transition-colors group-hover:text-rust-deep">
              {title}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-muted">{goal}</p>
          </Link>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-muted lg:hidden">
            <span>{businessType}</span>
            <span aria-hidden="true">/</span>
            <span>{plan?.steps.length ?? 0} steps</span>
            <span aria-hidden="true">/</span>
            <span>{plan?.estimatedTimeSavings ?? "No estimate"}</span>
            <span aria-hidden="true">/</span>
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>

        <p className="hidden text-[12px] text-ink-2 lg:block">{businessType}</p>

        <p className="hidden font-mono text-[11px] text-muted lg:block">
          {String(plan?.steps.length ?? 0).padStart(2, "0")}
        </p>

        <p className="hidden text-[11px] text-ink-2 lg:block">
          {plan?.estimatedTimeSavings ?? "No estimate"}
        </p>

        <p className="hidden font-mono text-[10px] text-muted lg:block">
          {formatMonthDay(createdAt)}
        </p>

        <div className="hidden lg:block">
          <Badge tone={status === "saved" ? "pine" : "neutral"}>{label}</Badge>
        </div>

        <div className="flex items-center justify-end gap-1">
          <div className="mr-auto lg:hidden">
            <Badge tone={status === "saved" ? "pine" : "neutral"}>{label}</Badge>
          </div>
          <DeletePlanButton id={id} title={title} className="relative z-10" />
          <ChevronRight
            className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
