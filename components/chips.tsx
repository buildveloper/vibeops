"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const BUSINESS_TYPES = [
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

export const GOALS = [
  "Lead Management",
  "Client Onboarding",
  "Invoicing",
  "Appointment Reminders",
  "Daily Reports",
  "Inventory Management",
  "Customer Follow-up",
  "Team Scheduling",
];

function OptionChips({
  options,
  selected,
  onChange,
  label,
}: {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map((option) => {
        const active = option === selected;

        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(active ? "" : option)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xs border px-2.5 py-2 text-[12px] font-medium transition-colors",
              active
                ? "border-ink bg-ink text-paper"
                : "border-line bg-paper text-ink-2 hover:border-line-strong hover:bg-paper-2 hover:text-ink",
            )}
          >
            {active && <Check className="h-3 w-3" aria-hidden="true" />}
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function GoalChips({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <OptionChips
      options={GOALS}
      selected={selected}
      onChange={onChange}
      label="What should this automate?"
    />
  );
}

export function BusinessChips({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <OptionChips
      options={BUSINESS_TYPES}
      selected={selected}
      onChange={onChange}
      label="Business type"
    />
  );
}
