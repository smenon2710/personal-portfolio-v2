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
│       └── route.ts        # POST /api/chat — streaming Groq + Airtable lead capture
├── page.tsx                # Entire portfolio — all data, components, and page JSX
├── layout.tsx              # Root layout: Syne + DM Sans fonts, HTML metadata
└── globals.css             # Tailwind @theme, scroll-reveal CSS, streaming cursor animation

data/
└── chatbot/                # Profile docs loaded as full LLM context
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
├── sujith-profile.png
├── be-cert.jpg
├── purdue-genai-cert.jpg
├── purdue-genai-cert.pdf
└── pm-cert.pdf
```

---

## Environment Variables

Required in `.env.local` (gitignored) and Vercel project settings:

```env
GROQ_API_KEY=...          # https://console.groq.com
AIRTABLE_API_KEY=...
AIRTABLE_BASE_ID=...
AIRTABLE_TABLE_NAME=Leads
```

---

## Key Conventions

### Fonts

`layout.tsx` loads Syne and DM Sans via `next/font/google`, applying CSS variables `--font-syne` and `--font-dm-sans` to the `<body>`. `globals.css` maps them into Tailwind via `@theme inline`:

```css
@theme inline {
  --font-sans: var(--font-dm-sans);    /* font-sans utility */
  --font-display: var(--font-syne);    /* font-display utility */
}
```

Use `font-display` for headings and labels, `font-sans` (default) for body text.

### Section headings

Every `<h2>` uses a flex layout with a 3px blue pill bar as a leading accent:

```tsx
<h2 className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-slate-900">
  <span className="inline-block h-5 w-[3px] shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
  Section Title
</h2>
```

Maintain this pattern for all new sections.

### Scroll-reveal

Add `data-reveal` to any element to opt it into the scroll-reveal system. The `Home` component's `useEffect` sets up a single IntersectionObserver that adds `.revealed` to matching elements. The CSS transition is in `globals.css`.

Add `style={{ transitionDelay: '0.Xs' }}` for staggered entry.

### Inline styles vs Tailwind

Use **inline styles** for dynamic values that would create Tailwind class-name purging issues:
- Gradient colors in certification/education cards: `style={{ background: '...' }}`
- Skill category accent bar: `style={{ backgroundColor: cat.accent }}`
- Stagger delays: `style={{ transitionDelay: '...' }}`
- Scroll progress bar width: `style={{ width: '...' }}`

### Color discipline

Blue (`blue-600` / `#2563EB`) is reserved for primary actions and the section heading accent bar. Avoid using it for decorative elements, tag backgrounds, or bullet points — use slate instead.

---

## Chat API (`app/api/chat/route.ts`)

`POST /api/chat`

**Request body:**
```ts
{ message: string; history: Message[]; userInfo: UserInfo }
```

**Response:**
- Body: `text/plain` stream (chunked) — the LLM reply or a gated message
- Header `X-UserInfo`: JSON-encoded updated `UserInfo`

**Flow:**
1. Extract email/name from `message` via regex if not in `userInfo`
2. Gate 1 — if no email: stream "please share name + email", return
3. Extract purpose via keywords (or accept any message if already asked once)
4. Gate 2 — if no purpose: stream "what brings you here?", return
5. Record to Airtable once (`!incoming.purpose && userInfo.purpose`)
6. Load all docs from `data/chatbot/` (module-level cache, reloads on cold start)
7. Stream Groq `llama-3.3-70b-versatile` response with full docs as context

**Updating chatbot knowledge:** Edit the markdown files in `data/chatbot/`. The context is cached at module level — changes take effect after a server restart or Vercel redeployment.

---

## Chat Widget (`ChatWidget` in `page.tsx`)

State:

| State | Type | Purpose |
|---|---|---|
| `messages` | `ChatMessage[]` | Full conversation history |
| `userInfo` | `UserInfo` | Visitor name/email/purpose for the session |
| `loading` | `boolean` | True while awaiting first stream chunk — shows typing dots |
| `streaming` | `boolean` | True while reading stream — shows `.streaming-cursor` on last message |

Streaming pattern:
1. `POST /api/chat` → read `X-UserInfo` header → `setUserInfo(newUserInfo)`
2. Add empty assistant message → read `res.body` as `ReadableStream`
3. Append decoded chunks to last message in state until stream closes
4. `streaming = false` → cursor disappears

---

## Content data

All site content is typed constants at the top of `page.tsx`:

| Constant | Type | Contents |
|---|---|---|
| `navItems` | array | Nav link labels and anchor hrefs |
| `highlights` | array | Hero KPI stat counters (num, suffix, prefix, label) |
| `experience` | array | 6 jobs: company, role, location, period, bullets |
| `projects` | `Project[]` | 5 projects: name, description, tech, URLs, embedScale |
| `skillCategories` | array | 4 categories with accent hex color and items |
| `education` | array | 2 entries with certImage and certLink |
| `certifications` | array | 2 entries with gradient colors, Credly/PDF links |
| `CONTACT` | object | location, email, linkedin, github |

---

## State overview (`Home` component)

| State | Type | Purpose |
|---|---|---|
| `loadedPreviews` | `Record<string, boolean>` | Lazy-load project iframe previews on user click |
| `mobileMenuOpen` | `boolean` | Hamburger nav toggle |
| `scrollProgress` | `number` | 0–100; drives the fixed top progress bar width |
| `activeSection` | `string` | ID of the currently visible section; drives nav highlight |

Two `useEffect` hooks run on mount (empty dep array):
1. **Scroll-reveal**: IntersectionObserver on `[data-reveal]` elements
2. **Scroll**: Passive listener updating `scrollProgress` + `activeSection` together

---

## Adding content

**New experience entry** — append to `experience` array with `company`, `role`, `location`, `period`, `bullets[]`.

**New project** — append to `projects: Project[]`. Set `isAgent: true` for AI agent projects (changes button label to "Open Agent" and adds a blue border + tip text).

**New certification** — append to `certifications` with `colorFrom`, `colorTo`, `initials`, `link`, `linkLabel`, `verified`.

**New education entry** — append to `education` with `certImage` (path in `public/`) and `certLink` (image or PDF).

**Update chatbot knowledge** — edit or add `.md` files in `data/chatbot/`. Restart the dev server to pick up changes.
