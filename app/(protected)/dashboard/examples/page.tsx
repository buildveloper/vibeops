import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const EXAMPLES = [
  {
    business: "Salon",
    goal: "Appointment Reminders",
    vibe: "Every time a client books, I manually text them the night before to confirm. Sometimes I forget and they don't show up. I waste 2 hours a week just on confirmations.",
    result: "Automated SMS + email reminders 24h and 2h before appointments, reducing no-shows by 70%.",
  },
  {
    business: "Plumbing",
    goal: "Lead Management",
    vibe: "When someone calls with an emergency, I write their info on a notepad, call my technician to see who's free, then call the customer back. Half the time I lose the note.",
    result: "Instant ticket creation, auto-dispatch to nearest available tech, automated quote follow-up — all in real time.",
  },
  {
    business: "Consulting",
    goal: "Client Onboarding",
    vibe: "After a client signs, I spend 3 hours sending welcome emails, scheduling kickoff calls, creating shared folders, and sending questionnaires. Every single time, manually.",
    result: "Fully automated onboarding sequence: contract → questionnaire → kickoff scheduling → welcome materials, triggered on signature.",
  },
  {
    business: "Restaurant",
    goal: "Daily Reports",
    vibe: "At the end of every night, I pull sales from the POS, count labor hours from a spreadsheet, check inventory in a notebook, and type it into a report for the owner. Takes me an hour.",
    result: "Auto-generated end-of-day report compiling POS data, labor costs, inventory usage, and customer feedback — emailed at 11:30 PM.",
  },
  {
    business: "Law Firm",
    goal: "Invoicing",
    vibe: "Every month I go through my calendar and emails to figure out what I worked on, then manually create invoices in Word, convert to PDF, and email them. Takes me a full day.",
    result: "Automated time tracking → monthly invoice generation with time entries → email distribution with payment links → 15/30-day follow-up reminders.",
  },
  {
    business: "Retail",
    goal: "Customer Follow-up",
    vibe: "After someone buys something, I want to follow up a few days later to see if they liked it and suggest complementary products. I have a stack of business cards I never get to.",
    result: "Post-purchase email sequence: day 1 thank you + receipt, day 3 product tips, day 7 complementary product offer based on purchase history.",
  },
  {
    business: "Real Estate",
    goal: "Lead Management",
    vibe: "Leads come in from Zillow, my website, and calls. I put them in a spreadsheet and try to follow up but they pile up and I lose track after a few days.",
    result: "Multi-channel lead aggregation → automated scoring → 5-day nurture sequence with property matches → hot lead alert to agent when they engage.",
  },
  {
    business: "Marketing Agency",
    goal: "Client Onboarding",
    vibe: "Every new client needs a welcome packet, brand asset collection, kickoff meeting scheduled, Slack channel created, and project board set up. I do this manually for every client and always miss something.",
    result: "One-trigger onboarding: signed contract → auto-create Slack channel + Notion workspace → send brand asset request → schedule kickoff → assign team roles.",
  },
];

export default async function ExamplesPage() {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-100">
          Workflow Examples
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Real small business workflows that VibeOps can automate. Select one
          as inspiration, then describe your own.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {EXAMPLES.map((ex, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-400">
                {ex.business}
              </span>
              <span className="text-xs text-slate-600">{ex.goal}</span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  The Vibe
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">
                  &ldquo;{ex.vibe}&rdquo;
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  The Automation
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  {ex.result}
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-slate-800 pt-3">
              <Link
                href="/dashboard/create"
                className="text-xs font-medium text-indigo-400 transition-colors hover:text-indigo-300"
              >
                Try this workflow →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center">
        <p className="text-sm text-slate-400">
          Have a workflow like one of these?{" "}
          <Link
            href="/dashboard/create"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Create your automation now
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
