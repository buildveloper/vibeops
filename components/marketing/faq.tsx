import { Plus } from "lucide-react";

const QUESTIONS = [
  {
    question: "Does VibeOps run the automations for me?",
    answer:
      "It builds the automation and the exact step sequence. You connect the tools you already use, or hand it to whoever sets them up. You review every step before saving.",
  },
  {
    question: "Do I need to know Zapier, Make, or n8n?",
    answer:
      "No. The automation names the tools and explains what each step does. If you already use an automation platform, the pattern will look familiar. If you do not, it is still a clear handoff document.",
  },
  {
    question: "What happens to the work I describe?",
    answer:
      "Your description is stored with your account and sent to our AI provider only to generate the automation. Deleting the automation removes it from your account.",
  },
  {
    question: "How accurate is the time estimate?",
    answer:
      "It is an estimate from the automation, not a guarantee. Use it as a starting point, then measure the real change once the automation is running.",
  },
  {
    question: "What happens after three saved automations?",
    answer:
      "You can still create and preview new automations. To save another one, choose one of your three to replace when you save. There is no paid plan to upgrade to right now.",
  },
  {
    question: "Can I export an automation?",
    answer:
      "Yes. Export any automation as a Markdown file from its detail page or before saving. No lock-in.",
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
