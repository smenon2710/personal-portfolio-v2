# Sujithkumar Menon — Personal Portfolio

Personal portfolio site for Sujithkumar Menon, Analytics & AI Product Manager. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Deployed on Vercel.

**Live site:** [personal-portfolio-smenon2710.vercel.app](https://personal-portfolio-smenon2710.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS v4 (PostCSS, no config file) |
| Fonts | Cormorant Garamond (display) + DM Sans (body) via `next/font/google` |
| CMS | Airtable — all portfolio content editable without code |
| Chat LLM | Groq — GPT OSS 120B (`openai/gpt-oss-120b`) |
| Lead capture | Airtable REST API |
| Deployment | Vercel (auto-deploys on push to `main`) |

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
AIRTABLE_API_KEY=...      # https://airtable.com/create/tokens
AIRTABLE_BASE_ID=...
AIRTABLE_TABLE_NAME=Leads
```

The Airtable token needs these scopes: `data.records:read`, `data.records:write`, `schema.bases:write`.

Set the same keys in **Vercel → Project Settings → Environment Variables** before deploying.

---

## Project Structure

```
app/
├── api/
│   └── chat/
│       └── route.ts          # Chat API: streaming Groq call + Airtable lead capture
├── components/
│   ├── Header.tsx            # Sticky nav with scroll-spy, progress bar, mobile menu
│   ├── CountUp.tsx           # Animated stat counter (IntersectionObserver + RAF)
│   ├── Markdown.tsx          # Shared markdown renderer (bold, lists, headings)
│   ├── ProjectGrid.tsx       # Project cards with per-card iframe preview + error fallback
│   ├── ChatWidget.tsx        # Floating chat UI, stateless (no localStorage)
│   └── ScrollRevealInit.tsx  # Wires up [data-reveal] IntersectionObserver on mount
├── lib/
│   └── airtable.ts           # Typed fetchers for all 7 portfolio content tables
├── page.tsx                  # Async server component — fetches Airtable data + static fallbacks
├── layout.tsx                # Root layout: fonts, metadata, OpenGraph/Twitter cards
├── sitemap.ts                # Generates /sitemap.xml
├── robots.ts                 # Generates /robots.txt
└── globals.css               # Tailwind v4 @theme config, scroll-reveal CSS, streaming cursor

data/
└── chatbot/                  # 10 markdown docs loaded as full context for the chat LLM
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
├── sujith-profile.png                  # Hero profile photo + OpenGraph image
├── Sujithkumar_Menon_Resume_DA_AI.pdf  # Resume (linked from hero)
├── be-cert.jpg                         # B.E. certificate thumbnail
├── purdue-genai-cert.jpg               # Purdue GenAI certificate thumbnail
└── pm-cert.pdf                         # Product Manager Certified certificate
```

---

## Architecture

`page.tsx` is an **async server component** that fetches all content from Airtable at request time with 60-second ISR revalidation. If any Airtable table is unreachable or empty, it silently falls back to the hardcoded static data in the same file. Interactive features are isolated as client component islands in `app/components/`.

### Client components

| Component | Purpose |
|---|---|
| `Header` | Scroll progress bar, sticky nav, scroll-spy, mobile hamburger |
| `CountUp` | Animates stat numbers on scroll-into-view via IntersectionObserver + RAF |
| `Markdown` | Renders Airtable/LLM markdown — bold, italic, bullet lists, numbered lists, headings |
| `ProjectGrid` | Manages per-card iframe load state with 10s timeout and error fallback |
| `ChatWidget` | Floating native chat UI — streams from `/api/chat`, stateless (no localStorage) |
| `ScrollRevealInit` | Renders `null`; sets up IntersectionObserver for `[data-reveal]` elements |

### Content CMS (Airtable)

All portfolio content is stored in Airtable and fetched by `app/lib/airtable.ts`. The page revalidates every 60 seconds — edit a cell in Airtable and the live site reflects it within a minute, no code changes needed.

| Table | Records | Key fields |
|---|---|---|
| `Highlights` | 4 | Label, Num, Suffix, Prefix, Sort |
| `Experience` | 6 | Company, Role, Location, Period, Bullets, Sort |
| `Projects` | 5 | Name, Description, Tech, LiveUrl, EmbedUrl, EmbedScale, EmbedHeight, GithubUrl, IsAgent, Sort |
| `Skills` | 4 | Title, Accent, Items, Sort |
| `Education` | 2 | Title, Org, Date, Detail, CertImage, CertLink, Sort |
| `Certifications` | 2 | Title, Org, Date, ColorFrom, ColorTo, Initials, Link, LinkLabel, Verified, Sort |
| `Contact` | 1 | Location, Email, LinkedIn, GitHub |

**Experience.Bullets** — plain long text, one bullet per line (no markdown syntax needed).  
**Skills.Items** — plain long text, one skill per line.  
**Projects.Tech** — single line text, comma-separated (e.g. `GPT-4, Streamlit, Python`).  
**Sort** — number field controlling display order; lower number = appears first.

### Chat API (`app/api/chat/route.ts`)

`POST /api/chat`

1. **Extracts** name/email/purpose from messages via regex
2. **Gates** responses — collects email first, then purpose, before answering
3. **Records** leads to Airtable on first purpose capture
4. **Loads** all 10 docs from `data/chatbot/` as full LLM context (module-level cache)
5. **Streams** the Groq `openai/gpt-oss-120b` response as `text/plain` chunked
6. **Returns** updated `userInfo` in the `X-UserInfo` response header

**Updating chatbot knowledge:** Edit the markdown files in `data/chatbot/`. Changes take effect on the next server restart or Vercel redeployment.

---

## Page Sections

| Section | ID | Notes |
|---|---|---|
| Hero | `#home` | Full-width editorial name at display scale; small profile photo; CTA links; stat strip |
| About | `#about` | Bio paragraph, wide measure |
| Experience | `#experience` | 6 entries; `divide-y` hairline layout; left-border bullet lists |
| Projects | `#projects` | 5 cards; lazy-loaded iframe previews with error fallback |
| Skills | `#skills` | 4 categories; two-column label + dot-separated items |
| Education | `#education` | 2 cert thumbnail cards with thin border (B.E. + Purdue GenAI) |
| Certifications | `#education` | 2 bordered cards with navy initial badge (Tableau + PM Certified) |
| Contact | `#contact` | Location, email, LinkedIn, GitHub |

---

## Visual Design

- **Palette** — Warm off-white paper (`#F8F8F6`), near-black ink (`#111110`), warm mid-grey (`#77766F`), hairline rules (`#E5E5E1`), deep navy accent (`#1A4480`)
- **Fonts** — Cormorant Garamond light (`font-display`) for headings and stats, DM Sans (`font-sans`) for body
- **Signature element** — Four KPI stats as oversized Cormorant Garamond numerals in a hairline-divided strip (no card backgrounds)
- **Section headings** — Tracked uppercase eyebrow label above a light-weight display serif `<h2>`
- **Scroll-reveal** — Fade-up (12px) on viewport entry with staggered delays
- **Progress bar** — 1px navy bar at top tracking scroll depth
- **Active nav** — Scroll-spy changes nav link to accent navy; no background fill
- **Experience layout** — `divide-y` rule separators; left-border bullet lists
- **Mobile nav** — Hamburger toggle with rule-bordered dropdown
- **Chat streaming cursor** — Blinking `|` at the end of in-progress assistant messages

---

## Chat Widget

Floating bottom-right button opens a native React chat panel. Calls `/api/chat` and reads the response as a `ReadableStream`, appending tokens as they arrive. Responses are rendered through the shared `Markdown` component.

**Lead collection flow:**
1. Visitor must provide name + email before questions are answered
2. Visitor is asked what brings them here (purpose)
3. On first purpose capture, lead is recorded to Airtable
4. All subsequent messages answered by the LLM with full profile context

**Persistence:** None — the widget is fully stateless. Every page load starts a fresh session so the email, purpose, and Airtable lead-capture gates always run. The trash icon in the chat header resets the in-memory conversation within the current session.

**Visual design:** Fully aligned with the site's design system — no hardcoded hex or `slate-*`/`blue-*` classes. Trigger button: flat `bg-accent` navy rectangle with uppercase tracking label. Panel: sharp corners with `border-rule bg-paper`, matching project cards. User bubbles: `bg-accent text-paper`. Assistant bubbles: `border-rule bg-paper` (hairline bordered). All typography uses site eyebrow and display conventions.
