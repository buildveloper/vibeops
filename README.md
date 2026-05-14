# VibeOps

**AI-Powered Operations Automation Studio**

Describe your messy business processes in plain English. VibeOps turns your "vibe" into structured, executable automation workflows — powered by Groq's Llama 3.3 70B. Built for real small businesses, consultants, and professionals who want to work smarter, not harder.

<p align="center">
  <strong>Vibe → AI → Automated Workflow</strong>
</p>

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router + Turbopack) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4 — Dark slate minimal theme |
| **Database** | LibSQL (Turso-compatible) via `@libsql/client` |
| **ORM** | Drizzle ORM — type-safe, parameterized queries |
| **Auth** | Lucia v3 — session-based auth with argon2 password hashing |
| **AI** | Groq API — `llama-3.3-70b-versatile` via OpenAI-compatible SDK |
| **Validation** | Server-side only — never trusts client input |

---

## Key Features

- **Vibe-to-Workflow Engine** — Describe any manual process in plain English, AI generates a structured automation plan with triggers, actions, tools, and frequency
- **Two-Panel Builder** — Write your vibe on the left, see the generated automation on the right in real time
- **Test Run Simulation** — Step-by-step execution simulation with live progress tracking and terminal-style logs
- **Save & Export** — Store up to 3 automations, export as text reports
- **Dark Minimal UI** — Professional slate theme, fully responsive (mobile-first)
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
