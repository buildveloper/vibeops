import Link from "next/link";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-slate-100"
        >
          VibeOps
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/signin"
            className="text-sm text-slate-400 transition-colors hover:text-slate-200"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-400"
          >
            Get started
          </Link>
        </nav>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="max-w-2xl space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-widest text-indigo-400">
              AI-Powered Operations Automation Studio
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
              Your operations,
              <br />
              <span className="text-indigo-400">on autopilot.</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-400">
              Describe your messy business processes in plain English. VibeOps
              understands your vibe and turns it into clean, automated workflows
              — no code required.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-indigo-500 px-8 text-sm font-medium text-white transition-colors hover:bg-indigo-400"
            >
              Start building free
            </Link>
            <Link
              href="/signin"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-800 px-8 text-sm font-medium text-slate-300 transition-colors hover:border-slate-700 hover:text-slate-100"
            >
              Sign in
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-3">
            {[
              {
                title: "Describe your vibe",
                description:
                  "Explain your process in plain English — onboarding, invoicing, client follow-ups.",
              },
              {
                title: "AI structures it",
                description:
                  "Our engine maps your words into a structured, repeatable workflow.",
              },
              {
                title: "Run on autopilot",
                description:
                  "Triggers, reminders, and automations handle the rest while you focus on growth.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-left"
              >
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-indigo-400">
                  Step {i + 1}
                </p>
                <h3 className="mb-1 text-sm font-semibold text-slate-100">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
