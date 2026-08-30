# FocusFlow

A local-first focus timer. Sit down, start the clock, stop when the ring empties.

The page is a product landing. The timer in the hero is real.

## Demo

https://frosty3316.github.io/focusflow-landing/

Pushes to `main` build and deploy through GitHub Actions. In the repo settings, set Pages source to **GitHub Actions** (not “Deploy from a branch”). `npm run deploy` still publishes `dist` to the `gh-pages` branch if you need a manual fallback.

---

## Problem

Most “productivity” landing pages are a headline, four cards, and a dead Get Started button. Recruiter-facing timer demos usually add a countdown and call it a product.

The question here is narrower: **can you start deep work without opening a second app?**

## Decisions

- **Timer first.** The hero is a working session, not a screenshot. 25 / 15 / 5. Start, pause, reset.
- **Not a to-do list.** Lists, drag-and-drop, and Today views live in TaskNest. FocusFlow is the clock.
- **Local only.** No auth, no cloud, no “sync” claim. Persistence is a versioned `focusflow:v1` document in `localStorage`. Corrupt data is dropped.
- **Honest fiction.** Pricing and the waitlist are the marketing structure. The form validates and stores one entry on this device. A real list would POST to an API.
- **One accent.** Indigo on deep slate. No leftover green glow. Fraunces for the voice, Instrument Sans for the UI.

## Design

- Night-desk mood, dark-only
- 8px rhythm, 44px-class tap targets, max-width 70rem
- Sticky nav, mobile menu, skip link, `:focus-visible`
- `prefers-reduced-motion` kills entrance motion
- Product visual is a faux browser chrome around the live timer

## Engineering

- Vite, React 19, TypeScript
- Pure timer and streak helpers with Vitest coverage
- Streak uses the local calendar, not UTC
- Same-day completions increment the count, not the streak
- Waitlist validates name and email before writing
- GitHub Pages base path is `/focusflow-landing/`

## Tradeoffs

Accounts, custom lengths, sounds, and a real waitlist were left out on purpose. Those need a backend and do not prove what this project is for: a finished landing page and a timer you can actually use.

## Stack

- React + TypeScript
- Vite
- CSS custom properties
- Vitest

## Scripts

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```

Open the printed local URL. In production the app lives under `/focusflow-landing/`.

---

Built as a portfolio piece for product design and frontend engineering — not as a generic countdown tutorial.
