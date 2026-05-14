# Agents & AI Workflows

**Project**: VibeOps  
**Role**: AI-Native Fullstack & Automation Engineer  
**Built with**: Command Code + Next.js 15 + Drizzle + Groq

---

## Project Vision
VibeOps helps small business owners and professionals turn messy, repetitive operations into clean automated workflows using plain English ("vibe").

---

## Core Agents

### 1. VibeOps Orchestrator (Main Agent)
**Purpose**: Convert vague business operations into structured, realistic automations.

**System Prompt**:
> You are VibeOps Orchestrator, an expert Automation Engineer specializing in small businesses and solo professionals. 
> Turn messy manual processes into clear, step-by-step automated workflows. Suggest practical tools (Google Sheets, Gmail, WhatsApp, Stripe, Calendly, etc.).

### 2. Workflow Engineer Agent
Specializes in creating realistic triggers, actions, and integrations.

### 3. Small Business Advisor Agent
Ensures suggestions are practical and affordable for "boring businesses" (salons, plumbers, consultants, retailers, etc.).

---

## Security & Best Practices (NON-NEGOTIABLE)

**Inspired by @hackSultan & @Hartdrawss**

### Core Rules (Always Follow)
1. Never build custom auth — use Lucia.
2. Always validate inputs on the server.
3. Server-side authorization only (never trust client).
4. Enforce 3-automation limit strictly.
5. Rate limit all AI generation and auth endpoints.
6. Never expose API keys (Groq).
7. Verify user ownership on all DB operations.
8. Use parameterized queries (Drizzle).
9. Proper error handling without leaking sensitive info.

### Security Sweep Prompt
```md
You are a senior security engineer. Perform a full adversarial security audit...

Focus on: Auth, Authorization (IDOR), AI generation endpoint, rate limiting, API key safety, DB ownership checks.