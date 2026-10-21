import { cn } from "@/lib/utils";

export function StatStrip({
  items,
}: {
  items: { label: string; value: string; detail?: string }[];
}) {
  return (
    <dl className="grid grid-cols-1 border-y border-line sm:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={cn(
            "py-5 sm:px-6",
            index === 0 && "sm:pl-0",
            index > 0 && "border-t border-line sm:border-l sm:border-t-0",
          )}
        >
          <dt className="label-mono text-muted">{item.label}</dt>
          <dd className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-[32px] font-semibold leading-none tracking-[-0.03em] tabular-nums text-ink">
              {item.value}
            </span>
            {item.detail && (
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                {item.detail}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
