import { ArrowRight, Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export default function ProtectedNotFound() {
  return (
    <div className="py-10">
      <p className="label-mono text-rust-deep">Not found</p>
      <h1 className="mt-4 max-w-2xl font-display text-[38px] leading-[1.02] tracking-[-0.035em] text-ink sm:text-[46px]">
        This automation isn&apos;t here.
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        It may have been deleted, or the link is out of date.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/dashboard" size="md">
          Back to your automations
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
        <ButtonLink
          href="/dashboard/create"
          variant="secondary"
          size="md"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Create a new automation
        </ButtonLink>
      </div>
    </div>
  );
}
