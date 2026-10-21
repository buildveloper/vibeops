"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buildCreateHref, cn } from "@/lib/utils";
import {
  FIELD_NOTE_CATEGORIES,
  type FieldNote,
} from "@/lib/examples";

const ALL = "All";

export function FieldNotesList({ notes }: { notes: FieldNote[] }) {
  const [active, setActive] = useState(ALL);

  const filtered =
    active === ALL ? notes : notes.filter((note) => note.business === active);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by business">
          {[ALL, ...FIELD_NOTE_CATEGORIES].map((category) => {
            const selected = active === category;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(category)}
                className={cn(
                  "rounded-xs border px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                  selected
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-paper text-ink-2 hover:border-line-strong hover:bg-paper-2 hover:text-ink",
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        <p
          className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
          aria-live="polite"
        >
          Showing {filtered.length} of {notes.length}
        </p>
      </div>

      <div>
        {filtered.map((note, index) => (
          <article
            key={`${note.business}-${note.goal}`}
            className="group grid gap-5 border-b border-line py-7 transition-colors hover:bg-paper-2 md:grid-cols-[48px_minmax(0,0.8fr)_minmax(0,1.6fr)_minmax(0,1.2fr)_auto] md:items-start md:gap-6"
          >
            <p className="font-mono text-[12px] text-rust-deep">
              {String(index + 1).padStart(2, "0")}
            </p>

            <div>
              <Badge tone="neutral">{note.business}</Badge>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                {note.goal}
              </p>
            </div>

            <div>
              <p className="label-mono text-muted md:hidden">The brief</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-2">
                &ldquo;{note.vibe}&rdquo;
              </p>
            </div>

            <div>
              <p className="label-mono text-muted md:hidden">The plan</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">
                {note.result}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-2">
                {note.time}
              </p>
            </div>

            <Link
              href={buildCreateHref(note)}
              className="inline-flex w-fit items-center gap-1.5 text-[12px] font-medium text-rust-deep transition-colors hover:text-ink"
            >
              Use this brief
              <ArrowRight className="hover-arrow h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
