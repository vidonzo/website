# Translation-coverage dashboard

An internal report of which articles are translated into which of the site's
locales, and whether each translation carries the frontmatter the standard
expects. It reads the live `.mdx` files every time, so it is never a
hand-maintained snapshot.

## The engine

`tool/lib/coverage.mjs` scans `src/content/{blog,help,legal}` across every
locale declared in `src/i18n/config.ts` and returns a per-collection matrix.
`tool/lib/render-coverage.mjs` turns that into one self-contained HTML string
(its own `<style>`, no client JavaScript). Both consumers below share them, so
they can never disagree.

Cell states:

- **source** (`م`) — the locale the entry was authored in (`sourceLocale`, else `en`).
- **translated, standard** (✓) — the file exists and carries the expected
  frontmatter. For blog: `urlSlug`, `sourceLocale`, `keywords`, `heroImageAlt`.
  For help/legal: the schema fields (`category`/`order`, `page`).
- **translated, incomplete** (`–`) — the file exists but is missing some of
  those fields. Worth completing.
- **missing** — no file.

A blog entry whose *source* lacks the engine fields (`keywords`, `heroImageAlt`)
is tagged **pre-standard**: its translations are only held to the simpler shape
its source has, not the full bar.

## Local report — private, zero infrastructure

```bash
npm run coverage
```

Writes `tool/.coverage/index.html` (git-ignored) and opens it. Flags:

- `npm run coverage -- --no-open` — build only, print the path.
- `npm run coverage -- --json` — emit the raw data.

This runs only on your machine and is never deployed. For a solo content-ops
view this is all you need.

## On-site page — `/admin`, gated by Cloudflare Access

`src/pages/admin/index.astro` renders the same dashboard at build time. It is a
static page, so it ships in `dist/` and is reachable by URL. `noindex` + the
sitemap exclusion keep it out of search, but **only Cloudflare Access actually
keeps people out.** Set it up once in the Cloudflare dashboard:

1. **Zero Trust** → **Access** → **Applications** → **Add an application** →
   **Self-hosted**.
2. Application domain: `vidonzo.com`, path `admin`. (Add `vidonzo.pages.dev`
   too if you want the preview host gated as well.)
3. **Add a policy**: Action **Allow**, rule **Emails** → your own address(es).
   Everyone else is blocked at the edge before the page is served.
4. Identity/login: the built-in **one-time PIN** (email a code) needs no extra
   setup; add Google/GitHub as a login method if you prefer.
5. Save. Visiting `/admin/` now requires signing in; the data refreshes on every
   deploy (which is also the only time content changes).

Free for up to 50 users. Nothing about the gate lives in this repo — it is
account configuration — so there is no secret in the code to leak.

> The page is not linked from anywhere in the site. Reach it by typing the URL.
