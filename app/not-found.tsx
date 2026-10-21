import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <header className="border-b border-line px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="text-[12px] text-muted transition-colors hover:text-ink"
          >
            Back to VibeOps
          </Link>
        </div>
      </header>

      <main id="main" className="flex flex-1 items-center px-5 py-16 sm:px-8">
        <div className="mx-auto w-full max-w-[1280px]">
          <p className="label-mono text-rust-deep">404 / Page not found</p>
          <h1 className="mt-4 max-w-2xl font-display text-[clamp(3rem,8vw,6rem)] leading-[0.92] tracking-[-0.04em] text-ink">
            This page is not on the board.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
            The link may be old, or the plan may have been deleted. Start from
            the operations desk.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/dashboard" size="md">
              Open operations desk
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/" variant="secondary" size="md">
              Back to VibeOps
            </ButtonLink>
          </div>
        </div>
      </main>

      <footer className="border-t border-line px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
            VibeOps / Operations automation
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
            &copy; 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
