import type { GeneratedAutomation } from "@/lib/groq";

export type FieldNote = {
  business: string;
  goal: string;
  vibe: string;
  result: string;
  time: string;
};

export const FIELD_NOTES: FieldNote[] = [
  {
    business: "Salon",
    goal: "Appointment Reminders",
    vibe: "Every time a client books, I manually text them the night before to confirm. Sometimes I forget and they don't show up. I waste 2 hours a week just on confirmations.",
    result:
      "Reminders go out 24 hours and 2 hours before each appointment. The client record and the follow-up are created automatically.",
    time: "4 to 6 hours/week",
  },
  {
    business: "Plumbing",
    goal: "Lead Management",
    vibe: "When someone calls with an emergency, I write their info on a notepad, call my technician to see who's free, then call the customer back. Half the time I lose the note.",
    result:
      "Emergency calls become tickets, get assigned to the nearest available technician, and trigger a quote follow-up.",
    time: "3 to 5 hours/week",
  },
  {
    business: "Consulting",
    goal: "Client Onboarding",
    vibe: "After a client signs, I spend 3 hours sending welcome emails, scheduling kickoff calls, creating shared folders, and sending questionnaires. Every single time, manually.",
    result:
      "A signed contract starts the welcome sequence, questionnaire, kickoff scheduling, and shared folder setup.",
    time: "2 to 3 hours/week",
  },
  {
    business: "Restaurant",
    goal: "Daily Reports",
    vibe: "At the end of every night, I pull sales from the POS, count labor hours from a spreadsheet, check inventory in a notebook, and type it into a report for the owner. Takes me an hour.",
    result:
      "The end-of-day report compiles POS sales, labor hours, inventory usage, and customer feedback in one email.",
    time: "5 to 7 hours/week",
  },
  {
    business: "Law Firm",
    goal: "Invoicing",
    vibe: "Every month I go through my calendar and emails to figure out what I worked on, then manually create invoices in Word, convert to PDF, and email them. Takes me a full day.",
    result:
      "Time entries become monthly invoices with payment links and follow-up reminders.",
    time: "6 to 8 hours/week",
  },
  {
    business: "Retail",
    goal: "Customer Follow-up",
    vibe: "After someone buys something, I want to follow up a few days later to see if they liked it and suggest complementary products. I have a stack of business cards I never get to.",
    result:
      "A purchase starts a thank-you note, product tips, and a follow-up offer based on what the customer bought.",
    time: "2 to 4 hours/week",
  },
  {
    business: "Real Estate",
    goal: "Lead Management",
    vibe: "Leads come in from Zillow, my website, and calls. I put them in a spreadsheet and try to follow up but they pile up and I lose track after a few days.",
    result:
      "New leads are collected, scored, and placed into a five-day nurture sequence with property matches.",
    time: "4 to 6 hours/week",
  },
  {
    business: "Marketing Agency",
    goal: "Client Onboarding",
    vibe: "Every new client needs a welcome packet, brand asset collection, kickoff meeting scheduled, Slack channel created, and project board set up. I do this manually for every client and always miss something.",
    result:
      "A signed contract creates the Slack channel, workspace, asset request, kickoff meeting, and team roles.",
    time: "3 to 5 hours/week",
  },
];

export const FIELD_NOTE_CATEGORIES = Array.from(
  new Set(FIELD_NOTES.map((note) => note.business)),
);

export const FEATURED_NOTE = FIELD_NOTES[0];

export const FEATURED_PLAN: GeneratedAutomation = {
  title: "Appointment confirmation and follow-up",
  summary:
    "Every booking is confirmed, reminded, recorded, and followed up without the front desk chasing it.",
  estimatedTimeSavings: "4 to 6 hours/week",
  steps: [
    {
      step: 1,
      title: "Capture the booking",
      description:
        "A new appointment in Booksy creates a client record and adds the appointment to the shared schedule.",
      trigger: "New appointment in Booksy",
      action: "Create the client record and schedule row",
      tool: "Booksy + Google Sheets",
      frequency: "Real time",
    },
    {
      step: 2,
      title: "Confirm the appointment",
      description:
        "Send a confirmation by text and email with the date, time, and a link to reschedule.",
      trigger: "Client record created",
      action: "Send confirmation message",
      tool: "Twilio + Gmail",
      frequency: "Real time",
    },
    {
      step: 3,
      title: "Send the reminders",
      description:
        "Queue a reminder 24 hours before the appointment and a shorter nudge 2 hours before.",
      trigger: "Appointment time minus 24 hours",
      action: "Send reminder messages",
      tool: "Twilio",
      frequency: "Daily",
    },
    {
      step: 4,
      title: "Follow up after the visit",
      description:
        "Send a thank-you note and a rebooking link two days after the appointment is marked complete.",
      trigger: "Appointment marked complete",
      action: "Send follow-up and rebooking link",
      tool: "Mailchimp + Calendly",
      frequency: "Two days after visit",
    },
  ],
  integrations: [
    "Booksy",
    "Google Sheets",
    "Twilio",
    "Gmail",
    "Mailchimp",
    "Calendly",
  ],
};
