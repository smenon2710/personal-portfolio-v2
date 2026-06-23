# Sujithkumar Menon — Personal Portfolio

Personal portfolio site for Sujithkumar Menon, Analytics & AI Product Manager. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Deployed on Vercel.

**Live site:** [personal-portfolio-v2.vercel.app](https://personal-portfolio-v2.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS v4 (PostCSS, no config file) |
| Fonts | Syne (headings) + DM Sans (body) via `next/font/google` |
| Chat LLM | Groq — Llama 3.3 70B Versatile |
| Lead capture | Airtable REST API |
| Deployment | Vercel |

---

## Getting Started

```bash
npm install
npm run dev       # Dev server at http://localhost:3000
npm run build     # Production build
npm run start     # Production server
npm run lint      # ESLint (flat config)
```

### Environment variables

Create `.env.local` at the project root (gitignored):

```env
GROQ_API_KEY=...          # https://console.groq.com
AIRTABLE_API_KEY=...
AIRTABLE_BASE_ID=...
AIRTABLE_TABLE_NAME=Leads
```

Set the same four keys in **Vercel → Project Settings → Environment Variables** before deploying.

---

## Project Structure

```
app/
├── api/
│   └── chat/
│       └── route.ts        # Chat API: RAG-free, full-context Groq call + Airtable lead capture
├── page.tsx                # Entire portfolio — all sections, components, and data
├── layout.tsx              # Root layout: fonts (Syne + DM Sans), metadata
└── globals.css             # Tailwind v4 @theme config, scroll-reveal CSS, streaming cursor

data/
└── chatbot/                # 10 markdown docs loaded as full context for the chat LLM
    ├── 01_Personal_Information.md
    ├── 02_Career_Summary.md
    ├── 03_Technical_Skills.md
    ├── 04_Certifications.md
    ├── 05_Languages.md
    ├── 06_Awards_And_Recognitions.md
    ├── 07_Projects.md
    ├── 08_Professional_Experience.md
    ├── 09_Education.md
    └── 10_Reach_Out.md

public/
├── sujith-profile.png       # Hero profile photo
├── be-cert.jpg              # B.E. certificate thumbnail
├── purdue-genai-cert.jpg    # Purdue GenAI certificate thumbnail
├── purdue-genai-cert.pdf    # Purdue GenAI certificate (full)
└── pm-cert.pdf              # Product Manager Certified certificate (full)
```

---

## Architecture

The entire site is a **single client component** (`page.tsx`) with one server-side API route (`/api/chat`). All portfolio content is hardcoded as typed constants at the top of `page.tsx`.

### Key components (all inline in `page.tsx`)

| Component | Purpose |
|---|---|
| `Home` | Main page — manages all state and side effects |
| `CountUp` | Animates stat numbers on scroll-into-view via IntersectionObserver + RAF |
| `ChatWidget` | Floating bottom-right native chat UI — no iframe |

### Chat API (`app/api/chat/route.ts`)

Handles all chat requests server-side:

1. **Extracts** name/email/purpose from messages via regex
2. **Gates** responses — collects name + email first, then purpose, before answering questions
3. **Records leads** to Airtable on first purpose capture
4. **Loads** all 10 docs from `data/chatbot/` as full LLM context (module-level cache)
5. **Streams** the Groq response back as `text/plain` with `Transfer-Encoding: chunked`
6. **Returns** updated `userInfo` in the `X-UserInfo` response header

### State in `Home`

| State | Purpose |
|---|---|
| `loadedPreviews` | Tracks which project iframe previews have been user-triggered |
| `mobileMenuOpen` | Controls mobile hamburger nav visibility |
| `scrollProgress` | Drives the fixed top progress bar (0–100) |
| `activeSection` | Drives the nav scroll-spy highlight |

### State in `ChatWidget`

| State | Purpose |
|---|---|
| `messages` | Full conversation history (`ChatMessage[]`) |
| `userInfo` | Visitor name/email/purpose collected during the chat session |
| `loading` | True while waiting for first stream chunk — shows typing dots |
| `streaming` | True while reading stream chunks — shows blinking cursor |

### Side effects

Two `useEffect` hooks in `Home`:
1. **Scroll-reveal** — IntersectionObserver adds `.revealed` class to `[data-reveal]` elements
2. **Scroll handler** — Passive scroll listener updates `scrollProgress` and `activeSection` together

---

## Page Sections

| Section | ID | Notes |
|---|---|---|
| Hero | `#home` | 2-col grid; KPI stat counters; profile photo |
| About | `#about` | Bio paragraph |
| Experience | `#experience` | 6 entries; vertical timeline with dot markers |
| Projects | `#projects` | 5 cards; lazy-loaded iframe previews |
| Skills | `#skills` | 4 categories; colored accent bars |
| Education | `#education` | 2 cert thumbnail cards (B.E. + Purdue GenAI) |
| Certifications | `#education` | 2 visual gradient cards (Tableau + PM Certified) |
| Contact | `#contact` | Location, email, LinkedIn, GitHub |

---

## Visual Design

- **Fonts** — Syne (`font-display`) for headings, DM Sans (`font-sans`) for body
- **Section headings** — Thin 3px blue pill bar to the left of every `<h2>` (signature element)
- **Stat counters** — Bold dark KPI tiles that count up with easeOutCubic on scroll-into-view
- **Scroll-reveal** — Fade-up on viewport entry with staggered delays per card
- **Progress bar** — 2px blue bar at top tracking scroll depth
- **Active nav** — Scroll-spy highlights current section in sticky header
- **Timeline** — Vertical line + dot markers in the Experience section
- **Card hover lift** — `translateY(-2px)` + shadow on all interactive cards
- **Mobile nav** — Hamburger toggle with full-width dropdown
- **Chat streaming cursor** — Blinking `|` at the end of in-progress assistant messages

---

## Chat Widget

The `ChatWidget` is a floating bubble (bottom-right) that opens a native React chat panel. It calls `/api/chat` and reads the response as a `ReadableStream`, appending tokens as they arrive.

**Lead collection flow:**
1. Visitor must provide name + email before questions are answered
2. Visitor is then asked what brings them here (purpose)
3. On first purpose capture, lead is recorded to Airtable
4. All subsequent messages are answered by the LLM with full profile context

**Updating the chatbot's knowledge:** Edit the markdown files in `data/chatbot/`. Changes take effect on the next server restart (the context is module-level cached).

---

## Certificates & Assets

| File | Linked from |
|---|---|
| `/be-cert.jpg` | Education — B.E. card thumbnail; click opens full image |
| `/purdue-genai-cert.jpg` | Education — Purdue GenAI card thumbnail |
| `/purdue-genai-cert.pdf` | Education — Purdue GenAI card; click opens full PDF |
| `/pm-cert.pdf` | Certifications — Product Manager card; click opens full PDF |
| Credly badge | Certifications — Tableau card links to Credly for verification |
