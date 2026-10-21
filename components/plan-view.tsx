import type { GeneratedAutomation } from "@/lib/groq";
import { Badge } from "@/components/ui/badge";
import { StepTimeline, type StepStatus } from "@/components/step-timeline";
import { uniqueTools } from "@/lib/plans";

export function PlanView({
  plan,
  statuses,
}: {
  plan: GeneratedAutomation;
  statuses?: Record<number, StepStatus>;
}) {
  const tools = uniqueTools(plan);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="neutral" dot={false}>
          Plan
        </Badge>
        <span className="label-mono text-muted">
          Est. {plan.estimatedTimeSavings}
        </span>
      </div>

      <h2 className="mt-3 font-display text-[28px] leading-[1.08] tracking-[-0.03em] text-ink sm:text-[32px]">
        {plan.title}
      </h2>
      <p className="mt-2 max-w-[62ch] text-[13px] leading-relaxed text-muted">
        {plan.summary}
      </p>

      <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-line py-3">
        <div>
          <dt className="label-mono text-muted">Est. return</dt>
          <dd className="mt-1 text-[12px] font-medium leading-tight text-ink">
            {plan.estimatedTimeSavings}
          </dd>
        </div>
        <div className="border-l border-line pl-3">
          <dt className="label-mono text-muted">Steps</dt>
          <dd className="mt-1 font-mono text-[15px] leading-none text-ink">
            {String(plan.steps.length).padStart(2, "0")}
          </dd>
        </div>
        <div className="border-l border-line pl-3">
          <dt className="label-mono text-muted">Tools</dt>
          <dd className="mt-1 font-mono text-[15px] leading-none text-ink">
            {String(tools.length).padStart(2, "0")}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-4">
          <p className="label-mono text-muted">Automation steps</p>
          <p className="font-mono text-[10px] text-muted">
            {String(plan.steps.length).padStart(2, "0")}
          </p>
        </div>
        <div className="mt-4">
          <StepTimeline steps={plan.steps} statuses={statuses} />
        </div>
      </div>

      {tools.length > 0 && (
        <div className="mt-6 border-t border-line pt-5">
          <p className="label-mono text-muted">Tools</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-xs border border-line bg-paper-2 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-ink-2"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
