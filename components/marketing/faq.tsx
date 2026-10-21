import { Plus } from "lucide-react";

const QUESTIONS = [
  {
    question: "Does VibeOps run the automations for me?",
    answer:
      "It builds the plan and the exact step sequence. You connect the tools you already use, or hand the plan to whoever sets them up. The simulation lets you review the logic before anything goes live.",
  },
  {
    question: "Do I need to know Zapier, Make, or n8n?",
    answer:
      "No. The plan names the tools and explains what each step does. If you already use an automation platform, the pattern will look familiar. If you do not, the plan is still a clear handoff document.",
  },
  {
    question: "What happens to the work I describe?",
    answer:
      "Your brief is stored with your account and sent to our AI provider only to generate the plan. Deleting the plan removes it from your library.",
  },
  {
    question: "How accurate is the time estimate?",
    answer:
      "It is an estimate from the plan, not a guarantee. Use it as a starting point, then measure the real change once the automation is running.",
  },
  {
    question: "What happens after three saved plans?",
    answer:
      "You can still build and preview new plans. To save another one, delete a plan from your library. There is no paid plan to upgrade to right now.",
  },
  {
    question: "Can I export a plan?",
    answer:
      "Yes. Export any generated plan as a Markdown file with the brief, steps, tools, and estimated time. No lock-in.",
  },
];

export function Faq() {
  return (
    <div className="border-y border-line">
      {QUESTIONS.map((item) => (
        <details key={item.question} className="group border-b border-line last:border-b-0">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[15px] font-medium leading-snug text-ink">
            {item.question}
            <Plus
              className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="max-w-[62ch] pb-5 pr-8 text-sm leading-relaxed text-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
