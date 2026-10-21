import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FEATURED_NOTE, FEATURED_PLAN } from "@/lib/examples";

export function PlanSpecimen({ openHref }: { openHref: string }) {
  const plan = FEATURED_PLAN;
  const tools = plan.integrations;

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-2 translate-y-2 border border-line bg-paper-2"
      />

      <article className="relative border border-line-strong bg-paper shadow-lift">
        <div className="flex items-center justify-between border-b border-line bg-paper-2 px-4 py-2.5">
          <span className="label-mono text-muted">Automation / 001</span>
          <Badge tone="pine">Saved</Badge>
        </div>

        <div className="px-5 pb-5 pt-5 sm:px-6">
          <p className="label-mono text-muted">Your description</p>
          <p className="mt-2 border-l border-rust pl-3 text-[12px] leading-relaxed text-ink-2">
            &ldquo;{FEATURED_NOTE.vibe}&rdquo;
          </p>

          <h3 className="mt-5 font-display text-[26px] leading-[1.05] tracking-[-0.03em] text-ink">
            {plan.title}
          </h3>
          <p className="mt-2 text-[12px] leading-relaxed text-muted">
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

          <ol className="mt-4">
            {plan.steps.map((step) => (
              <li
                key={step.step}
                className="flex gap-3 border-b border-line py-2.5 last:border-b-0"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-[9px] text-rust-deep">
                  {String(step.step).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-medium leading-tight text-ink">
                    {step.title}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                    {step.trigger} / {step.tool}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {tools.slice(0, 4).map((tool) => (
              <span
                key={tool}
                className="rounded-xs border border-line bg-paper-2 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-ink-2"
              >
                {tool}
              </span>
            ))}
            {tools.length > 4 && (
              <span className="rounded-xs border border-line bg-paper-2 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                +{tools.length - 4}
              </span>
            )}
          </div>

          <div className="mt-5 flex items-end justify-between gap-4 border-t border-line pt-4">
            <div>
              <p className="label-mono text-muted">Estimated return</p>
              <p className="mt-1 font-display text-[22px] leading-none tracking-[-0.02em] text-rust-deep">
                {plan.estimatedTimeSavings}
              </p>
            </div>
            <Link
              href={openHref}
              className="group inline-flex items-center gap-1.5 text-[11px] font-medium text-ink transition-colors hover:text-rust-deep"
            >
              Use this template
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
