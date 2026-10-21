import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { getSession } from "@/lib/auth";
import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button";
import { FieldNotesList } from "@/components/field-notes-list";
import { FIELD_NOTES } from "@/lib/examples";

export const metadata: Metadata = {
  title: "Field notes",
  description:
    "Recurring small business processes mapped into automation plans.",
};

export default async function ExamplesPage() {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  return (
    <div>
      <PageHeader
        eyebrow="Reference"
        title="Field notes"
        description="Eight recurring processes, mapped into plans. Open one to start from its brief."
        meta={<span>{FIELD_NOTES.length} notes</span>}
        actions={
          <ButtonLink href="/dashboard/create" size="md">
            <Plus className="h-4 w-4" aria-hidden="true" />
            New automation
          </ButtonLink>
        }
      />

      <div className="mt-8">
        <FieldNotesList notes={FIELD_NOTES} />
      </div>

      <div className="mt-8 flex flex-col gap-4 border border-line bg-paper-2 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-[22px] leading-tight tracking-[-0.02em] text-ink">
            Have a process like these?
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">
            Write it the way you would explain it to someone new.
          </p>
        </div>
        <ButtonLink href="/dashboard/create" size="md">
          Map it
          <Plus className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </div>

      <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
        Plans shown are illustrative examples, not customer results.
      </p>
    </div>
  );
}
