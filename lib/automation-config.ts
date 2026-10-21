export const MAX_AUTOMATIONS = 3;
export const MAX_DESCRIPTION_LENGTH = 2000;

export type SavedAutomationSummary = {
  id: string;
  title: string;
  createdAt: number;
};

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
