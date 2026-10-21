import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  Play,
} from "lucide-react";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { PlanSpecimen } from "@/components/marketing/plan-specimen";
import { Faq } from "@/components/marketing/faq";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { FIELD_NOTES, FIELD_NOTE_CATEGORIES, FEATURED_NOTE } from "@/lib/examples";

const COSTS = [
  {
    title: "The follow-up you remember at 9pm.",
    body: "A client asked a question four days ago. You answered it in your head on the drive home, then lost it under today's work.",
    cost: "The lead cools while the day runs",
  },
  {
    title: "The onboarding checklist you rebuild every time.",
    body: "Welcome email, folder, questionnaire, kickoff call. Same eight steps, different order, every new client.",
    cost: "Hours rebuilt from memory",
  },
  {
    title: "The invoice that waits for a quiet day.",
    body: "The work is finished. The invoice is not. Cash flow waits for the one afternoon you can sit down and reconstruct the month.",
    cost: "Payment delayed by admin",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Say it plainly",
    body: "Write it the way you would explain it to a new hire. The trigger, the steps, the frequency. No diagram required.",
  },
  {
    number: "02",
    title: "Get a real plan",
    body: "VibeOps maps the brief into a step-by-step plan with a trigger, action, tool, and frequency for every step.",
  },
  {
    number: "03",
    title: "Keep it and hand it off",
    body: "Save the plan to your library, export it, or use it as the setup brief for the tools you already run.",
  },
];

const PRINCIPLES = [
  {
    title: "Plain English in",
    body: "No flowcharts, no setup calls, no new vocabulary.",
  },
  {
    title: "A real plan out",
    body: "Triggers, actions, tools, frequency. A document you can hand to anyone.",
  },
  {
    title: "Your tools, your data",
    body: "Keep the stack you already run. Export the plan whenever you want.",
  },
];

export default function LandingPage() {
  return (
    <div className="grain-overlay min-h-screen bg-paper text-ink">
      <SiteHeader />

      <main id="main">
        <section className="border-b border-line">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-0 lg:pb-24 lg:pt-24">
            <div className="lg:col-span-7 lg:pr-12 xl:pr-20">
              <p className="animate-rise flex items-center gap-2 text-rust-deep label-mono">
                <span className="h-1.5 w-1.5 bg-rust" aria-hidden="true" />
                For the businesses that keep things running
              </p>

              <h1
                className="animate-rise mt-6 font-display text-[clamp(3.25rem,7vw,6.25rem)] leading-[0.95] tracking-[-0.04em] text-ink"
                style={{ animationDelay: "60ms" }}
              >
                Describe the work.
                <span className="block text-rust-deep">
                  We&apos;ll build the machine.
                </span>
              </h1>

              <p
                className="animate-rise mt-7 max-w-[56ch] text-[17px] leading-relaxed text-ink-2 sm:text-[18px]"
                style={{ animationDelay: "120ms" }}
              >
                VibeOps turns the processes you run by hand into clear,
                step-by-step automations. Written in plain English. Structured
                for the tools you already use.
              </p>

              <div
                className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "180ms" }}
              >
                <ButtonLink href="/signup" size="lg">
                  Start with three free automations
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="#how-it-works" variant="secondary" size="lg">
                  See how it works
                </ButtonLink>
              </div>

              <div
                className="animate-rise mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
                style={{ animationDelay: "240ms" }}
              >
                <span>Three plans free</span>
                <span className="text-line-strong" aria-hidden="true">
                  /
                </span>
                <span>No card</span>
                <span className="text-line-strong" aria-hidden="true">
                  /
                </span>
                <span>Export anytime</span>
              </div>
            </div>

            <div
              className="animate-rise relative lg:col-span-5 lg:border-l lg:border-line lg:pl-10 xl:pl-14"
              style={{ animationDelay: "160ms" }}
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="label-mono text-muted">
                  A real plan from a 31-word brief
                </p>
                <ArrowUpRight
                  className="h-4 w-4 text-muted"
                  aria-hidden="true"
                />
              </div>
              <PlanSpecimen />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                Generated in one pass / Reviewed before saving
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-line-on-ink bg-ink-band">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="label-mono text-rust-on-ink">Built for</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.1em] text-paper-on-ink">
              {FIELD_NOTE_CATEGORIES.map((category, index) => (
                <span key={category} className="flex items-center gap-3">
                  {category}
                  {index < FIELD_NOTE_CATEGORIES.length - 1 && (
                    <span className="text-line-on-ink" aria-hidden="true">
                      /
                    </span>
                  )}
                </span>
              ))}
            </div>
            <p className="label-mono text-muted-on-ink">
              The work that does not make the brochure
            </p>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-28">
            <div className="lg:col-span-4">
              <p className="label-mono text-rust-deep">The daily cost</p>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-ink lg:sticky lg:top-28">
                The work is not the problem. The loose ends are.
              </h2>
            </div>

            <div className="lg:col-span-8">
              {COSTS.map((item, index) => (
                <div
                  key={item.title}
                  className="view-reveal grid gap-4 border-t border-line py-8 sm:grid-cols-[48px_1fr] sm:gap-6"
                >
                  <p className="font-mono text-[13px] text-rust-deep">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="font-display text-[26px] leading-tight tracking-[-0.02em] text-ink sm:text-[30px]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                    <p className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-rust-deep">
                      <span className="h-1 w-1 bg-rust" aria-hidden="true" />
                      {item.cost}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-24 border-b border-line bg-paper-2"
        >
          <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-28">
            <div className="lg:col-span-4">
              <p className="label-mono text-rust-deep">How it works</p>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-ink lg:sticky lg:top-28">
                From how you say it to how it runs.
              </h2>
            </div>

            <div className="lg:col-span-8">
              {STEPS.map((step, index) => (
                <div
                  key={step.number}
                  className="view-reveal grid gap-5 border-t border-line py-9 sm:grid-cols-[56px_1fr] sm:gap-6 sm:py-10"
                >
                  <p className="font-mono text-[13px] text-rust-deep">
                    {step.number}
                  </p>
                  <div>
                    <h3 className="font-display text-[26px] leading-tight tracking-[-0.02em] text-ink sm:text-[30px]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                      {step.body}
                    </p>

                    {index === 0 && (
                      <div className="mt-5 max-w-xl border-l-2 border-rust bg-paper p-4">
                        <p className="label-mono text-muted">
                          What the brief sounds like
                        </p>
                        <p className="mt-2 text-[13px] leading-relaxed text-ink-2">
                          &ldquo;{FEATURED_NOTE.vibe}&rdquo;
                        </p>
                        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                          31 words / 4 hours back
                        </p>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="mt-5 max-w-xl border border-line bg-paper">
                        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                          <span className="label-mono text-muted">
                            Plan / 4 steps
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-pine">
                            Structured
                          </span>
                        </div>
                        <ul>
                          {[
                            ["01", "Capture the booking", "Booksy + Sheets"],
                            ["02", "Confirm the appointment", "Twilio + Gmail"],
                            ["03", "Send the reminders", "Twilio"],
                          ].map(([number, title, tool]) => (
                            <li
                              key={number}
                              className="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-b-0"
                            >
                              <span className="font-mono text-[9px] text-rust-deep">
                                {number}
                              </span>
                              <span className="flex-1 text-[12px] font-medium text-ink">
                                {title}
                              </span>
                              <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                                {tool}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {index === 2 && (
                      <div className="mt-5 max-w-xl border border-line bg-paper p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[13px] font-medium text-ink">
                              Appointment confirmation and follow-up
                            </p>
                            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                              4 steps / 6 tools / 4 to 6 hours back
                            </p>
                          </div>
                          <Badge tone="pine">Saved</Badge>
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-line pt-3">
                          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                            <Play className="h-3 w-3" aria-hidden="true" />
                            Simulation
                          </span>
                          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                            <Download className="h-3 w-3" aria-hidden="true" />
                            Export
                          </span>
                          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-pine">
                            <Check className="h-3 w-3" aria-hidden="true" />
                            Ready to hand off
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="field-notes"
          className="scroll-mt-24 border-b border-line"
        >
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="label-mono text-rust-deep">Field notes</p>
                <h2 className="mt-4 max-w-xl font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-ink">
                  Four businesses. Four recurring headaches.
                </h2>
              </div>
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-ink transition-colors hover:text-rust-deep"
              >
                Open the full library
                <ArrowUpRight className="hover-arrow h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10">
              <div className="hidden border-b border-line pb-3 md:grid md:grid-cols-[0.8fr_1.5fr_1.5fr_0.8fr] md:gap-8">
                {["Business", "The recurring problem", "The plan", "Time returned"].map(
                  (label) => (
                    <span key={label} className="label-mono text-muted">
                      {label}
                    </span>
                  ),
                )}
              </div>

              {FIELD_NOTES.slice(0, 4).map((note) => (
                <div
                  key={`${note.business}-${note.goal}`}
                  className="group grid gap-4 border-b border-line py-6 transition-colors hover:bg-paper-2 md:grid-cols-[0.8fr_1.5fr_1.5fr_0.8fr] md:gap-8 md:py-7"
                >
                  <div>
                    <Badge tone="neutral">{note.business}</Badge>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                      {note.goal}
                    </p>
                  </div>
                  <p className="text-[13px] leading-relaxed text-ink-2">
                    &ldquo;{note.vibe}&rdquo;
                  </p>
                  <p className="text-[13px] leading-relaxed text-muted">
                    {note.result}
                  </p>
                  <div>
                    <p className="font-mono text-[12px] text-ink">{note.time}</p>
                    <Link
                      href="/signup"
                      className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-rust-deep transition-colors hover:text-ink"
                    >
                      Use this brief
                      <ArrowRight className="hover-arrow h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
              Plans shown are illustrative examples, not customer results.
            </p>
          </div>
        </section>

        <section className="border-b border-line-on-ink bg-ink-band">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-28">
            <div className="lg:col-span-7">
              <p className="label-mono text-rust-on-ink">Why VibeOps</p>
              <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.035em] text-paper">
                Software should remove work, not add another place to check.
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted-on-ink">
                VibeOps is built for the owner who is also the operations
                manager, the scheduler, and the person who remembers the
                follow-up. The plan should fit on one page and make sense on the
                first read.
              </p>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-on-ink">
                Small business operations / Built to be handed off
              </p>
            </div>

            <div className="lg:col-span-5">
              {PRINCIPLES.map((principle) => (
                <div
                  key={principle.title}
                  className="border-t border-line-on-ink py-5"
                >
                  <h3 className="text-[15px] font-medium text-paper">
                    {principle.title}
                  </h3>
                  <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted-on-ink">
                    {principle.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="questions" className="scroll-mt-24 border-b border-line">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-28">
            <div className="lg:col-span-4">
              <p className="label-mono text-rust-deep">Questions</p>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-ink">
                Questions, answered plainly.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                No sales call. No hidden workflow. Here is how the product
                actually works today.
              </p>
            </div>

            <div className="lg:col-span-8">
              <Faq />
            </div>
          </div>
        </section>

        <section className="bg-rust text-paper">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-28">
            <div className="lg:col-span-7">
              <p className="label-mono text-paper/70">Start here</p>
              <h2 className="mt-4 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.92] tracking-[-0.04em] text-paper">
                Bring us the mess.
              </h2>
              <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-paper/80">
                Three plans free. Export them. No card. Describe the work the
                way you would describe it to someone new.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/signup" variant="paper" size="lg">
                  Start with a brief
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink
                  href="#how-it-works"
                  variant="ghostDark"
                  size="lg"
                >
                  See how it works
                </ButtonLink>
              </div>
            </div>

            <div className="hidden lg:col-span-5 lg:block">
              <div className="border border-paper/30 p-5">
                <p className="label-mono text-paper/70">What you need</p>
                <ul className="mt-5 space-y-4">
                  {[
                    "A process you run by hand",
                    "The tools you already use",
                    "Fifteen minutes to write it down",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 border-t border-paper/20 pt-4 first:border-t-0 first:pt-0"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-paper"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-paper/90">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
