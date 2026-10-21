import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FIELD_NOTES } from "@/lib/examples";
import { buildCreateHref } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function TemplateShortcuts({ limit = 3 }: { limit?: number }) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-3">
      {FIELD_NOTES.slice(0, limit).map((note) => (
        <Link
          key={`${note.business}-${note.goal}`}
          href={buildCreateHref(note)}
          className="group flex flex-col border border-line bg-paper p-4 transition-colors hover:bg-paper-2"
        >
          <div className="flex items-start justify-between gap-3">
            <Badge tone="neutral">{note.business}</Badge>
            <ArrowUpRight
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
              aria-hidden="true"
            />
          </div>
          <p className="mt-3 text-[14px] font-medium leading-snug text-ink transition-colors group-hover:text-rust-deep">
            {note.goal}
          </p>
          <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-muted">
            {note.result}
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
            {note.time}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-rust-deep">
            Use template
            <ArrowRight
              className="hover-arrow h-3.5 w-3.5"
              aria-hidden="true"
            />
          </span>
        </Link>
      ))}
    </div>
  );
}
