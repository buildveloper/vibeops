# VibeOps

**Operations Automation Studio**

Describe the work in plain English. VibeOps turns it into a structured, step-by-step automation plan for the tools your business already uses. Built for small businesses, consultants, and professionals who want fewer loose ends.

<p align="center">
  <strong>Describe the work. We'll build the machine.</strong>
</p>

The interface is built on **The Operations Ledger** design system: warm paper, ink, rust, Fraunces, Instrument Sans, and IBM Plex Mono. Plans are presented as documents, not dashboard cards.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router + Turbopack) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4 — warm paper and ink operations system |
| **Database** | LibSQL (Turso-compatible) via `@libsql/client` |
| **ORM** | Drizzle ORM — type-safe, parameterized queries |
| **Auth** | Lucia v3 — session-based auth with argon2 password hashing |
| **AI** | Groq API — `llama-3.3-70b-versatile` via OpenAI-compatible SDK |
| **Validation** | Server-side only — never trusts client input |

---

## Key Features

- **Vibe-to-Workflow Engine** — Describe a manual process in plain English and get a structured plan with triggers, actions, tools, frequency, and an estimated time return
- **Two-Panel Builder** — Write the brief on the left, review the generated plan on the right. A read-only sample plan is included for orientation
- **Honest Simulation** — Step-by-step plan checking with a clear notice that no external tools are connected or executed
- **Save & Export** — Store up to 3 plans, export any plan as Markdown
- **Operations Ledger UI** — Warm paper and ink system, responsive desktop and mobile shell, visible keyboard focus, native dialogs
- **Field Notes** — Eight small business processes that can prefill a new brief
- **Secure by Design** — Lucia auth, server-side authorization, rate limiting, input sanitization, IDOR protection

---

## Getting Started

```bash
# Clone and install
git clone <repo-url>
cd vibeops
npm install

# Set up environment
cp .env.local.example .env.local
# Add your GROQ_API_KEY to .env.local

# Initialize the database
npm run db:generate
npm run db:push

# Start developing
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
vibeops/
├── app/
│   ├── (auth)/                  # Sign in / Sign up
│   ├── (protected)/dashboard/   # Dashboard, Create, Automations, Examples, Settings
│   └── api/generate/            # Groq AI generation endpoint
├── components/
│   ├── ui/                      # Button, Input primitives
│   ├── create-automation.tsx    # Two-panel builder
│   ├── preview-panel.tsx        # Generated workflow preview + test run
│   ├── automation-card.tsx      # Saved automation card with delete
│   └── footer.tsx               # Shared footer credit
├── lib/
│   ├── db/                      # Drizzle schema + connection
│   ├── groq.ts                  # Groq AI client + system prompt
│   ├── auth.ts                  # Lucia v3 session management
│   ├── auth-actions.ts          # Sign up / sign in / sign out
│   ├── automation-actions.ts    # Save / delete with ownership checks
│   └── rate-limit.ts            # In-memory rate limiter
└── drizzle/                     # SQL migration files
```

---

## Security

- **Auth**: Lucia v3 with argon2 password hashing, `sameSite: "lax"`, secure-only cookies in production
- **Authorization**: Every DB operation verifies `userId` ownership — no IDORs
- **Rate Limiting**: AI generation endpoint capped at 5 requests/minute per user
- **Input Sanitization**: All user input trimmed and length-capped server-side, type-checked before use
- **Parameterized Queries**: Drizzle ORM prevents SQL injection
- **No Client Trust**: All validation, auth checks, and ownership verification happen server-side only

---

<p align="center">
  Built by <a href="https://buildveloper.com"><strong>Christopher John</strong></a><br>
  <em>AI-Native Fullstack & Automation Engineer</em><br>
  <a href="https://x.com/shigusna">@shigusna</a>
</p>
