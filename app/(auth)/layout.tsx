import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { FEATURED_NOTE } from "@/lib/examples";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper lg:grid lg:grid-cols-[5fr_7fr]">
      <aside className="relative hidden overflow-hidden bg-ink-band px-10 py-10 text-paper lg:flex lg:flex-col lg:justify-between xl:px-14">
        <Logo href="/" tone="paper" />

        <div className="max-w-md">
          <p className="label-mono text-rust-on-ink">
            VibeOps / Automation planning
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.75rem,4vw,4rem)] leading-[0.98] tracking-[-0.03em] text-paper">
            The work behind the work, handled.
          </h1>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted-on-ink">
            Describe a process once. Get a clear plan for the tools your
            business already runs on.
          </p>

          <div className="mt-10 max-w-sm border-l-2 border-rust-on-ink pl-4">
            <p className="label-mono text-muted-on-ink">From a salon owner</p>
            <p className="mt-2 text-[13px] leading-relaxed text-paper/85">
              &ldquo;{FEATURED_NOTE.vibe}&rdquo;
            </p>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-on-ink">
              Four steps / Six tools / One saved automation
            </p>
          </div>
        </div>

        <p className="label-mono text-muted-on-ink">
          Small business operations / Est. 2026
        </p>
      </aside>

      <main
        id="main"
        className="flex min-h-screen flex-col px-5 py-7 sm:px-8 lg:min-h-0 lg:px-12 lg:py-8"
      >
        <div className="flex items-center justify-between">
          <div className="lg:hidden">
            <Logo href="/" />
          </div>
          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to VibeOps
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-[380px]">{children}</div>
        </div>

        <p className="text-center font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
          Operations automation for small business
        </p>
      </main>
    </div>
  );
}
