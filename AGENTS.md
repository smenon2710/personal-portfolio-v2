# AGENTS.md

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Production server
npm run lint     # Run ESLint
```

Note: No separate typecheck command. TypeScript errors surface in `dev` and `build`.

## Tech Stack

- **Next.js** 16.0.10 (App Router)
- **React** 19.2.0
- **TypeScript** 5
- **Tailwind CSS** 4 (configured via PostCSS, no tailwind.config.js)
- **ESLint** 9 (flat config format in `eslint.config.mjs`)

## Project Structure

```
app/              # Next.js App Router pages
├── page.tsx       # Main portfolio page
├── layout.tsx     # Root layout (Geist font)
└── globals.css    # Tailwind 4 styles (embedded config)
```

- Entry point: `app/page.tsx`
- Root layout: `app/layout.tsx`

## Tailwind CSS 4

No separate config file. Styles and config are embedded directly in `app/globals.css` using `@theme` and Tailwind 4 directives.

## ESLint Config

Uses ESLint 9 flat config format (`eslint.config.mjs`), not the legacy `.eslintrc` format.

## Deployment

Deploy on Vercel: `npm run build` output can be deployed directly to Vercel.