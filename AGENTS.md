# AGENTS.md

Developer reference for AI agents and contributors working on this repository.

---

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000 (Turbopack)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint (flat config — eslint.config.mjs)
```

TypeScript errors surface during `dev` and `build`. There is no separate typecheck script.

---

## Tech Stack

| Technology | Version | Notes |
|---|---|---|
| Next.js | 16.0.10 | App Router, Turbopack in dev |
| React | 19.2.0 | |
| TypeScript | 5 | |
| Tailwind CSS | 4 | No config file — all in `globals.css` via `@theme` |
| Fonts | — | Syne + DM Sans via `next/font/google` (CSS vars `--font-syne`, `--font-dm-sans`) |
| groq-sdk | ^1.3.0 | Server-side only — chat API route |
| Deployment | — | Vercel (auto-deploys on push to `main`) |

---

## Project Structure

```
app/
├── api/
│   └── chat/
│       └── route.ts          # POST /api/chat — streaming Groq + Airtable lead capture
├── components/
│   ├── Header.tsx            # "use client" — scroll progress bar, sticky nav, scroll-spy, mobile menu
│   ├── CountUp.tsx           # "use client" — animated stat counter
│   ├── Markdown.tsx          # Shared renderer — bold, italic, bullet/numbered lists, headings
│   ├── ProjectGrid.tsx       # "use client" — project cards with iframe load state + error fallback
│   ├── ChatWidget.tsx        # "use client" — floating chat UI, stateless (no localStorage)
│   └── ScrollRevealInit.tsx  # "use client" — wires up [data-reveal] IntersectionObserver, renders null
├── lib/
│   └── airtable.ts           # Typed fetchers for all 7 portfolio content tables (60s ISR cache)
├── page.tsx                  # Async server component — fetches Airtable data, falls back to static constants
├── layout.tsx                # Root layout: fonts, metadata, OpenGraph/Twitter cards
├── sitemap.ts                # Generates /sitemap.xml
├── robots.ts                 # Generates /robots.txt
└── globals.css               # Tailwind @theme, scroll-reveal CSS, streaming cursor animation

data/
└── chatbot/                  # Profile docs loaded as full LLM context
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
├── sujith-profile.png                  # Hero photo + OpenGraph image
├── Sujithkumar_Menon_Resume_DA_AI.pdf  # Resume (linked from hero CTA)
├── be-cert.jpg
├── purdue-genai-cert.jpg
└── pm-cert.pdf
```

---

## Environment Variables

Required in `.env.local` (gitignored) and Vercel project settings:

```env
GROQ_API_KEY=...          # https://console.groq.com
AIRTABLE_API_KEY=...      # https://airtable.com/create/tokens
AIRTABLE_BASE_ID=...
AIRTABLE_TABLE_NAME=Leads
```

The Airtable personal access token requires these scopes:
- `data.records:read` — page fetches portfolio content
- `data.records:write` — chat route writes leads
- `schema.bases:write` — only needed if recreating tables from scratch

---

## Architecture

`page.tsx` is an **async server component** with `export const revalidate = 60`. It fetches all content from Airtable in a single `Promise.all` at request time. If any table returns empty (not yet set up, or Airtable unreachable), it falls back silently to the hardcoded `FALLBACK_*` constants at the top of the file.

### Key Conventions

#### Fonts

`layout.tsx` loads Syne and DM Sans via `next/font/google`, applying CSS variables `--font-syne` and `--font-dm-sans` to `<body>`. `globals.css` maps them into Tailwind:

```css
@theme inline {
  --font-sans: var(--font-dm-sans);    /* font-sans utility */
  --font-display: var(--font-syne);    /* font-display utility */
}
```

Use `font-display` for headings and labels, `font-sans` (default) for body text.

#### Section headings

Every `<h2>` uses a flex layout with a 3px blue pill bar as a leading accent:

```tsx
<h2 className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-slate-900">
  <span className="inline-block h-5 w-[3px] shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
  Section Title
</h2>
```

Maintain this pattern for all new sections.

#### Scroll-reveal

Add `data-reveal` to any element to opt into the scroll-reveal system. `ScrollRevealInit` sets up a single IntersectionObserver that adds `.revealed` to matching elements. CSS transition is in `globals.css`.

Add `style={{ transitionDelay: '0.Xs' }}` for staggered entry within a group.

#### Inline styles vs Tailwind

Use **inline styles** for dynamic values to avoid Tailwind class purging:
- Gradient colors: `style={{ background: '...' }}`
- Skill category accent bars: `style={{ backgroundColor: cat.accent }}`
- Stagger delays: `style={{ transitionDelay: '...' }}`

#### Color discipline

Blue (`blue-600` / `#2563EB`) is reserved for primary actions and section heading accent bars. Use slate for decorative elements, tag backgrounds, and bullet points.

---

## Airtable CMS (`app/lib/airtable.ts`)

All portfolio content is editable via Airtable — no code changes needed. The page revalidates every 60 seconds.

### Tables

| Table | Records | Sort field |
|---|---|---|
| `Highlights` | 4 | Sort (Number) |
| `Experience` | 6 | Sort (Number) |
| `Projects` | 5 | Sort (Number) |
| `Skills` | 4 | Sort (Number) |
| `Education` | 2 | Sort (Number) |
| `Certifications` | 2 | Sort (Number) |
| `Contact` | 1 | — |

### Field conventions

- **Experience.Bullets** — plain long text, one bullet per line. No markdown syntax.
- **Skills.Items** — plain long text, one skill per line.
- **Projects.Tech** — single line text, comma-separated (`GPT-4, Streamlit, Python`).
- **Sort** — controls display order; lower number = shown first.
- **Certifications.ColorFrom / ColorTo** — hex colors for the gradient banner (`#1e3a5f`).

### Adding content

**New experience entry** — add a row to the `Experience` table. Set `Sort` to place it in the timeline.

**New project** — add a row to `Projects`. Set `IsAgent` checkbox if it's an AI agent (changes button label and adds blue border).

**New certification** — add a row to `Certifications` with `ColorFrom`, `ColorTo`, `Initials`, `Link`, `LinkLabel`. Set `Verified` checkbox for Credly-verified badges.

**New skill category** — add a row to `Skills` with the `Accent` hex color and `Items` (one per line).

**New education entry** — add a row to `Education` with `CertImage` (public path like `/be-cert.jpg`) and `CertLink`.

**Update contact info** — edit the single row in `Contact`.

**Update chatbot knowledge** — edit `.md` files in `data/chatbot/`. Restart dev server or redeploy to Vercel to pick up changes.

---

## Chat API (`app/api/chat/route.ts`)

`POST /api/chat`

**Request body:**
```ts
{ message: string; history: Message[]; userInfo: UserInfo }
```

**Response:**
- Body: `text/plain` stream (chunked) — LLM reply or a gated message
- Header `X-UserInfo`: JSON-encoded updated `UserInfo`

**Flow:**
1. Extract email/name from `message` via regex if not in `userInfo`
2. Gate 1 — if no email: stream "please share name + email", return
3. Extract purpose via keywords (or accept any message if already asked once)
4. Gate 2 — if no purpose: stream "what brings you here?", return
5. Record to Airtable once (`!incoming.purpose && userInfo.purpose`)
6. Load all docs from `data/chatbot/` (module-level cache, reloads on cold start)
7. Stream Groq `openai/gpt-oss-120b` response with full docs as context

---

## Chat Widget (`app/components/ChatWidget.tsx`)

State:

| State | Type | Purpose |
|---|---|---|
| `messages` | `ChatMessage[]` | Full conversation history |
| `userInfo` | `UserInfo` | Visitor name/email/purpose |
| `loading` | `boolean` | True while awaiting first chunk — shows typing dots |
| `streaming` | `boolean` | True while reading stream — shows `.streaming-cursor` on last message |

**Persistence:** None — fully stateless. Every page load starts a fresh session, ensuring the email gate, purpose gate, and Airtable lead-capture always run. The clear-chat button in the header resets in-memory state within the current session.

**Markdown rendering:** Assistant messages are rendered through the shared `Markdown` component (`app/components/Markdown.tsx`), which handles bold, italic, bullet lists, numbered lists, and headings.

Streaming pattern:
1. `POST /api/chat` → read `X-UserInfo` header → `setUserInfo(newUserInfo)`
2. Add empty assistant message → read `res.body` as `ReadableStream`
3. Append decoded chunks to last message in state until stream closes
4. `streaming = false` → cursor disappears

---

## Markdown Component (`app/components/Markdown.tsx`)

Shared zero-dependency markdown renderer. Used by `ChatWidget` for LLM responses. Can be used in `page.tsx` for any Airtable rich-text field.

Handles:
- `**bold**` / `*italic*` — inline
- `- item` / `* item` — unordered lists
- `1. item` — ordered lists
- `## Heading` — rendered as semibold paragraph
- Plain paragraphs and blank line separation

Import as a component or use the exported `renderMarkdown(text)` function directly.

---

## Project Grid (`app/components/ProjectGrid.tsx`)

Each project card contains a `ProjectEmbed` sub-component with its own state:

| State | Values | Purpose |
|---|---|---|
| `state` | `idle \| loading \| error` | Controls what's shown in the preview area |

On "Load Preview" click: transitions to `loading`, starts a 10-second timeout. `onLoad` clears the timer. `onError` or timeout expiry transitions to `error`, showing an "Open in New Tab" fallback.

---

## Content data

All content lives in Airtable. `page.tsx` contains `FALLBACK_*` constants (identical to the original static data) used when Airtable tables are empty or unreachable.

| Source | Used when |
|---|---|
| Airtable table has rows | Normal operation |
| Airtable table empty / unreachable | Falls back to `FALLBACK_*` in `page.tsx` |

Note: `navItems` lives in `Header.tsx` (not Airtable) since it is only used by the header client component and changes require a redeployment regardless.
