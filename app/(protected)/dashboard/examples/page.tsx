import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { getSession } from "@/lib/auth";
import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button";
import { FieldNotesList } from "@/components/field-notes-list";
import { FIELD_NOTES } from "@/lib/examples";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Ready-made automation templates for common small business processes.",
};

export default async function ExamplesPage() {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  return (
    <div>
      <PageHeader
        eyebrow="Starting points"
        title="Templates"
        description="Proven starting points for common business tasks. Pick one, adjust the description, and create your own."
        meta={<span>{FIELD_NOTES.length} templates</span>}
        actions={
          <ButtonLink
            href="/dashboard/create"
            variant="secondary"
            size="md"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Start from scratch
          </ButtonLink>
        }
      />

      <div className="mt-8">
        <FieldNotesList notes={FIELD_NOTES} />
      </div>

      <div className="mt-8 flex flex-col gap-4 border border-line bg-paper-2 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-[22px] leading-tight tracking-[-0.02em] text-ink">
            Don&apos;t see your process?
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">
            Describe it the way you would explain it to someone new.
          </p>
        </div>
        <ButtonLink href="/dashboard/create" size="md">
          Describe it
          <Plus className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </div>

      <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
        Templates are illustrative examples, not customer results.
      </p>
    </div>
  );
}
