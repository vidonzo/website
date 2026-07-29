# Vidonzo — marketing website (vidonzo.com)

Astro 5 **static** site (`output: 'static'`) on Cloudflare Pages, with one Pages
Function (`functions/_middleware.js`) that canonicalizes the host
(`vidonzo.pages.dev` → `vidonzo.com`) and serves content redirects. The Flutter
app lives in the sibling checkout `../vidonzo-app`; this site takes its brand
colors from the app's theme (see "Design tokens").

## Commands

```bash
npm run dev              # astro dev
npm run build            # build:redirects + build:images, then astro build
npm run preview

npm run sync:tokens      # regenerate src/styles/tokens.css from the app's theme
npm run build:redirects  # compile src/content/_data/redirects.json → functions/_generated/redirects.js
npm run build:slugs      # regenerate src/content/_data/slug-registry.json from frontmatter
npm run build:images     # render the featured/OG image for every (article, locale)
npm run build:brand      # re-derive raster brand assets from public/favicon.svg

npm run check:tokens     # CI: stale tokens.css (no-op when ../vidonzo-app is absent)
npm run check:redirects  # CI: compiled redirects drifted from the JSON ledger
npm run check:slugs      # CI: stale registry, a `slug` frontmatter field, or a URL collision
npm run check:links      # CI: internal link checker (runs after the build)
npm run coverage         # local translation-coverage dashboard, opens in the browser
```

`.github/workflows/ci.yml` runs the four `check:*` scripts plus the build on
every PR. Generated files — `src/styles/tokens.css`,
`functions/_generated/redirects.js`, `src/content/_data/slug-registry.json`,
the featured images — are **committed**. Never hand-edit one: change the source
and re-run its `build:`/`sync:` script, or CI fails on the drift.

## Architecture

```
src/
  pages/[...locale]/   every public route; en is unprefixed, others are /<locale>/
  pages/admin/         Access-gated internal dashboard — noindex, excluded from the sitemap
  layouts/Base.astro   <head>, per-locale font loading, the `noindex` prop
  components/          Header, Footer, Hero, GlassCard, AuroraBackground, ...
  content/             collections: blog/, help/, legal/ — <collection>/<locale>/<slug>.mdx
  content/_data/       redirects.json (hand-edited) + slug-registry.json (generated)
  content.config.ts    the zod schema for every collection — read it before adding frontmatter
  config/site.ts       THE source for anything pointing off-site: store links, the
                       dl.vidonzo.com APK links, socials, support email. Never hardcode these.
  config/marketing.ts, config/screenshots.ts
  i18n/                config.ts (locale registry + PageKey routes), routing.ts, ui/<locale>.ts
  styles/tokens.css    GENERATED from the app theme — do not edit
functions/             Pages middleware + generated redirects
tool/                  the scripts behind the npm commands; tool/lib/ is shared by them
docs/content-engine/   ARCHITECTURE.md — the design for AI-authored articles
```

The locale is carried by the **directory path**, not by frontmatter, so a
translation cannot disagree with the folder it sits in.

## Non-negotiable contracts

### Frontmatter: the field is `urlSlug`, never `slug`
Astro's content loader treats a frontmatter `slug` as a reserved field that
overrides the entry id. Setting it silently detaches a translation from its
key and republishes it as a duplicate noindex fallback at the native URL — a
page disappears and nothing errors. `check:slugs` rejects the field outright in
every collection; keep it that way.

Frontmatter must also stay inside the small flat subset that
`tool/lib/frontmatter.mjs` parses (quoted scalars and flow arrays — no block
sequences, nested maps, anchors, or multi-line scalars). That parser is what the
slug registry and the image pipeline read *outside* the Astro build, and the
narrow grammar is the "generated content is data, never code" boundary.

### i18n — 20 locales, key parity in `src/i18n/ui/`
- Registry: `src/i18n/config.ts`. `en` is the default and lives at `/`; the
  other 19 are path-prefixed. `fa`, `ar`, `ur` are RTL. Per-script fonts come
  from `@fontsource` packages.
- UI strings: one file per locale in `src/i18n/ui/`, typed by `types.ts` — a new
  string means adding the key to **all 20**.
- Static routes are enumerated by the `PageKey` union in `i18n/config.ts`;
  a new page needs its key and per-locale paths registered there.
- A page served in a language it was not authored in renders `TranslationNotice`
  and sets `noindex`. `astro.config.mjs` keeps `/404` and `/admin` out of the
  sitemap.

### Redirects
Edit `src/content/_data/redirects.json`, then `npm run build:redirects`. Chains
are collapsed at build time so the middleware does a single hop, and only on the
canonical hostname. Never add a redirect to the middleware by hand.

### Design tokens — the app is the source of truth
`tool/sync-tokens.mjs` reads `../vidonzo-app/lib/core/theme/app_theme.dart`
(regex-matching the `AppColors` / `AppRadius` classes) and regenerates
`src/styles/tokens.css`. Brand color and radius changes are made **in the app
first**, then synced and committed here. Gradient composition (angles, stops)
lives in the tool's template, not in the app. `check:tokens` silently passes
when the app repo is not checked out alongside, so a stale token file can reach
CI if you skip the sync locally.

## Content

`blog/` is AI-authored under `docs/content-engine/ARCHITECTURE.md` — git is the
source of truth, and each language is **transcreated, not translated**.
`help/` and `legal/` are **human-owned**: never machine-generate legal pages,
help instructions, product UI copy, or store listings.

Featured images are generated, never hand-designed (20 locales × ~15 articles).
The background is text-free brand art and the headline is set by Pango from the
site's own webfonts — never ask an image model to render a headline, because
Nastaliq Urdu and Devanagari conjuncts fail there silently.

Every product claim in an article must be true of what the app actually ships,
and must obey the wording rules below.

## Brand & store wording rules (shared with vidonzo-app/CLAUDE.md — keep in sync)

What Vidonzo *says it is* matters more than what it does:

1. **Never write "download" or "offline" in marketing copy or store listings.**
   The feature ships; the marketing does not mention it. (The APK cards on
   /download are about downloading the *app itself* — that is fine.)
2. **No channel names, network logos, league or broadcaster branding** in
   screenshots, mockups, or video — use public-domain/mockup footage.
3. **"IPTV" stays out of the brand name** (keep "Vidonzo" clean); it may appear
   in body copy for discoverability.
4. **Sell playback, not access.** No copy hinting that users can *get* content —
   no channel counts, no "thousands of channels", no playlist sourcing tips.
5. An EULA or "the user is responsible" disclaimer is **not** a shield — don't
   lean on one in copy.
