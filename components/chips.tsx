"use client";

const BUSINESS_TYPES = [
  "Salon",
  "Plumbing",
  "Consulting",
  "Retail",
  "Restaurant",
  "Law Firm",
  "Real Estate",
  "Healthcare",
  "Construction",
  "Marketing Agency",
];

const GOALS = [
  "Lead Management",
  "Client Onboarding",
  "Invoicing",
  "Appointment Reminders",
  "Daily Reports",
  "Inventory Management",
  "Customer Follow-up",
  "Team Scheduling",
];

export function GoalChips({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {GOALS.map((goal) => (
        <button
          key={goal}
          type="button"
          onClick={() => onChange(goal === selected ? "" : goal)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            goal === selected
              ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
              : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
          }`}
        >
          {goal}
        </button>
      ))}
    </div>
  );
}

export function BusinessChips({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {BUSINESS_TYPES.map((biz) => (
        <button
          key={biz}
          type="button"
          onClick={() => onChange(biz === selected ? "" : biz)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            biz === selected
              ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
              : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
          }`}
        >
          {biz}
        </button>
      ))}
    </div>
  );
}
