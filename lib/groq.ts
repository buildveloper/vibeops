import OpenAI from "openai";

let client: OpenAI | null = null;

function getGroq(): OpenAI {
  if (!client) {
    client = new OpenAI({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: process.env.GROQ_API_KEY || "placeholder",
    });
  }
  return client;
}

export interface AutomationStep {
  step: number;
  title: string;
  description: string;
  trigger: string;
  action: string;
  tool: string;
  frequency: string;
}

export interface GeneratedAutomation {
  title: string;
  summary: string;
  estimatedTimeSavings: string;
  steps: AutomationStep[];
  integrations: string[];
}

const SYSTEM_PROMPT = `You are a Vibe to Automation Engineer — an expert at helping small businesses turn their messy manual operations into clean, structured automation workflows.

## Your Task
A business owner will describe their current manual process in plain English (their "vibe"). They'll also tell you their business type and what they want to automate. Your job is to design a practical, implementable automation workflow in response.

## Output Format
Respond with a single JSON object matching this exact structure:

{
  "title": "Clear, descriptive title for the automation",
  "summary": "2-3 sentence summary explaining what this automation does and why it helps the business",
  "estimatedTimeSavings": "Estimated hours saved per week, ex: '5-8 hours/week'",
  "steps": [
    {
      "step": 1,
      "title": "Step name (4-7 words)",
      "description": "Detailed explanation of what happens in this step (1-2 sentences)",
      "trigger": "What initiates this step, ex: 'New form submission', 'Daily at 9:00 AM'",
      "action": "What action should be performed, ex: 'Send email notification to team'",
      "tool": "Recommended tool/software, ex: 'Zapier', 'Twilio', 'Google Sheets'",
      "frequency": "How often this runs, ex: 'Real-time', 'Daily', 'On trigger'"
    }
  ],
  "integrations": ["List of recommended tools/software names"]
}

## Guidelines
- Provide 3-5 realistic, actionable steps
- Recommend real tools small businesses actually use: Zapier, Make.com, Twilio, SendGrid, Mailchimp, Stripe, Calendly, Typeform, Google Workspace, Notion, Airtable, QuickBooks, Square, Slack, Trello, etc.
- Match tools to the business type (restaurants use Toast/Square, salons use Booksy/Calendly, contractors use Jobber/QuickBooks, etc.)
- Be specific in trigger and action descriptions
- Estimate time savings conservatively and realistically
- Make the title sound professional and results-oriented
- Ensure every step has all 6 required fields

## Important
Output ONLY the JSON object. No markdown, no code blocks, no additional text.`;

export async function generateAutomation(
  vibe: string,
  businessType: string,
  goal: string,
): Promise<GeneratedAutomation> {
  const groq = getGroq();

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Business Type: ${businessType}\nGoal: ${goal}\n\nHere's the current manual workflow I want to automate:\n\n"${vibe}"\n\nDesign an automation workflow for this.`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 2000,
  });

  const raw = response.choices[0]?.message?.content;
  if (!raw) throw new Error("No response from Groq");

  let parsed: GeneratedAutomation;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Failed to parse Groq response as JSON");
  }

  if (
    !parsed.title ||
    !parsed.summary ||
    !Array.isArray(parsed.steps) ||
    parsed.steps.length === 0
  ) {
    throw new Error("Invalid automation structure from Groq");
  }

  return parsed;
}
