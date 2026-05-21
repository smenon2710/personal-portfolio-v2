# Changelog

All notable changes to this portfolio are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased] — Planned Enhancements

### Tier 1 · High Impact, Low Risk ✓ Completed 2026-05-21
- [x] **Typography upgrade** — Replaced Inter with Syne (headings, `font-display`) + DM Sans (body, `font-sans`) via next/font/google
- [x] **Scroll-reveal animations** — IntersectionObserver fades sections and cards up on entry; staggered `transitionDelay` per card index
- [x] **Animated stat counters** — `CountUp` component with easeOutCubic RAF animation, triggers on scroll-into-view
- [x] **Mobile hamburger navigation** — SVG hamburger/close toggle; full-width dropdown menu with all nav links + CTA

### Education & Certifications · Updated 2026-05-21
- [x] **Education section** redesigned with prominent certificate thumbnail cards (2-col grid)
- [x] **Purdue GenAI Bootcamp** moved from Certifications → Education; shown with certificate thumbnail
- [x] **B.E., Information Technology** now shows certificate thumbnail (be-cert.jpg); click opens full image
- [x] **Certifications section** trimmed to 2 cards (Tableau + Product Manager only)

### Certifications · Completed 2026-05-21
- [x] **Visual certificate cards** — 3-card grid replacing flat list; each card has a gradient header (brand colors), large initials watermark, issue date, and CTA link
- [x] **Removed Collibra Data Governance** cert from display
- [x] **Tableau** — Credly verify link + "✓ Verified" pill (navy-to-blue gradient)
- [x] **Product Manager Certified** — PDF link (orange gradient), hosted in public/pm-cert.pdf
- [x] **Applied Generative AI (Purdue)** — PDF link (violet gradient), hosted in public/purdue-genai-cert.pdf
- [x] **Education & Certifications** restructured from side-by-side columns to stacked sections, giving certs full-width 3-col grid

### Tier 2 · Visual Polish ✓ Completed 2026-05-21
- [x] **Background grain/noise texture** — SVG fractalNoise body::after overlay at 3.5% opacity; pointer-events:none so it's purely visual
- [x] **Card hover lift** — Added translateY + shadow transition to skill category cards (experience/project/cert cards already had it from Tier 1)
- [x] **Scroll progress bar** — Fixed 2px blue bar at z-[60], width driven by scroll percentage
- [x] **Active nav scroll-spy** — Single passive scroll listener highlights the current section in both desktop and mobile nav; combined with progress bar in one handler

### Tier 3 · Structural Improvements
- [ ] **Experience timeline layout** — Vertical left-border timeline with dot markers replacing stacked cards
- [ ] **Hero background mesh** — Soft radial gradient or blob behind profile photo card
- [ ] **Skills section redesign** — Category accent bars + reorganized pill layout for visual hierarchy

### Tier 4 · Optional / Larger Scope
- [ ] **Dark mode toggle** — Wire in-app toggle to the `prefers-color-scheme` CSS already in globals.css
- [ ] **Contact form** — Replace mailto link with working form (Formspree or Resend)
- [ ] **Open Graph metadata** — Add og:image, og:title, twitter:card to layout.tsx for social sharing

### Tech Debt
- [x] **Remove unused CSS vars** — Removed `--font-geist-sans` / `--font-geist-mono` from globals.css
- [x] **Type the `isAgent` field properly** — Added `type Project` with `isAgent?: true`; removed all `(project as any)` casts

---

## [0.2.0] — 2025-05-21

### Changed
- Chat bubble text updated
- Location updated to New York City Metropolitan Area
- Phone number removed from CONTACT object

## [0.1.1] — 2025 (prior)

### Fixed
- React Server Components CVE vulnerabilities patched (Next.js upgrade)

## [0.1.0] — Initial Release

### Added
- Single-page portfolio: Hero, About, Experience, Projects, Skills, Education, Contact
- Floating ChatWidget (Hugging Face Spaces iframe — Digital Twin agent)
- Lazy-loaded project iframe previews with click-to-load UX
- Sticky header with anchor navigation
- 5 featured projects: Restobot, GenAI SQL Assistant, InsightMate, AI Stock Analyzer, Digital Twin
- 6 experience entries spanning 2011–Present
- Contact section with email, LinkedIn, GitHub, and Google Calendar booking link
- Deployed on Vercel
