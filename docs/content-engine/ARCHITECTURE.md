# Vidonzo Content Engine — Architecture

> The long-lived design for AI-authored, natively-multilingual, SEO-first
> articles on vidonzo.com. This document is the source of truth for *what* the
> system does and *why*. Implementation lands incrementally against it.

Status: **Draft for approval** · Owner: Hamed · Last updated: 2026-07-29

---

## 1. Goal in one sentence

Give one topic (a title/brief) to the system and get, across every language the
site supports, a set of articles that each **read as if written by a native
professional in that language** — SEO-grade, on-brand, cross-linked, illustrated,
legally safe, and self-maintaining — with a human able to review before anything
goes live.

## 2. Non-negotiable principles

1. **Git is the source of truth.** Every article is MDX committed to this repo.
   The AI produces commits/PRs, never a hidden database. This matches the
   existing content-collections model and keeps full history, review, and
   rollback for free.
2. **Transcreation, never translation.** Each language version is *authored*,
   not translated. Currency (تومان → USD/EUR), examples, food, idioms, cultural
   references, and — critically — the **SEO keywords** are re-researched per
   language. A reader must never smell a translation.
3. **Language-neutral identity, per-language slug.** All versions of an article
   share one immutable `key`; each version owns its own in-language `slug`
   (Persian slug for `fa`, English slug for `en`). *(This is the one real change
   to today's architecture — see §4.)*
4. **Automated publish, review-after (locked §12.1).** Content is generated,
   validated, and auto-merged/deployed without waiting for a human. Because there
   is *no* human pre-publish gate, the automated **compliance gate is the primary
   legal-safety control** and is deliberately strict (§8): anything it cannot
   clear with high confidence is held as a draft PR for a human instead of being
   published. Every publish is still a reviewable commit, easy to revert.
5. **Idempotent, resumable, self-healing.** Every stage is validated and
   re-runnable. A reconciler continuously closes gaps (missing languages,
   images, back-links, broken redirects) — this is the "system checks and fixes
   itself" requirement, kept inside the PR gate.
6. **Backfill is free.** Adding a language = adding one entry to locale config.
   The reconciler then enqueues every existing article for that language.

## 3. Current state this builds on

| Area | Today | Implication |
|---|---|---|
| Framework | Astro 5, `output: 'static'`, Cloudflare Pages | Redirects via `public/_redirects` at the edge; generation is a build-time/CI concern, not runtime |
| Content | `src/content/blog/<locale>/<slug>.mdx`, collections in `src/content.config.ts` | Extend the schema, keep the collection model |
| Locales | `en`(root)`, fa, ar, es, tr, fr`; `fa`/`ar` are RTL — `src/i18n/config.ts` | Locale list is already the single source we scale from |
| Fallback | Missing translation → English shown, `noindex`, excluded from hreflang — `src/i18n/content.ts` | Fallback stays as the safety net while a language backfills |
| Slug | **Shared across languages**, grouping is by slug | ⚠️ Must change to per-language slug + shared `key` |
| Linking | Related posts computed at build by shared tags | Add a persistent, editable **link graph** for true internal linking |
| Redirects | Only `pages.dev → vidonzo.com` in `functions/_middleware.js` | Add a generated `_redirects` map for slug changes |
| Validation | `tool/check-links.mjs` + CI build | Grow into the full validation/self-heal stage |
| Images | Hand-picked app screenshots in `src/assets/app` | Add a per-article featured-image pipeline |

## 4. Data model

### 4.1 Article identity and frontmatter

Introduce a stable **`key`** and make the URL come from a per-language **`slug`**.
Recommended file layout keeps translations visibly paired while URLs localize:

```
src/content/blog/en/no-ads-no-trackers.mdx      # filename = key
src/content/blog/fa/no-ads-no-trackers.mdx      # same key, Persian slug in frontmatter
src/content/blog/it/no-ads-no-trackers.mdx
```

- **Filename = `key`** (language-neutral, immutable). Grouping across languages
  stays trivial (group by filename), exactly as `content.ts` does today.
- **`slug` lives in frontmatter**, per language, and drives the URL. Changing a
  title never renames the file — it only changes `slug` and appends a redirect.

Extended blog frontmatter:

```yaml
# --- identity ---
key: no-ads-no-trackers          # immutable, = filename, shared by all languages
slug: بدون-تبلیغ-بدون-ردیاب       # in-language, drives the URL (fa example)
sourceLocale: en                 # which language was authored first (the "original")

# --- existing fields (kept) ---
title: ...
description: ...                 # doubles as meta description; length-checked
publishedAt: 2026-07-20
updatedAt: 2026-07-29            # bumped on any edit, incl. back-link insertions
tags: [privacy, product]
author: Vidonzo

# --- SEO ---
keywords: [...]                  # per-language target keywords (researched, not translated)
heroImage: ./_media/no-ads-no-trackers/fa.webp
heroImageAlt: ...                # localized alt text
faq: [...]                       # optional Q/A pairs → FAQPage schema

# --- provenance / governance ---
aiGenerated: true
model: claude-...                # model + prompt version for auditability
generatedAt: 2026-07-29T10:00:00Z
humanReviewed: false            # flips true on approving merge; gates auto-publish policy
status: draft                   # draft → review → published
```

### 4.2 Central data files (`src/content/_data/`)

- **`slug-registry.json`** — canonical map `key → { locale → slug }`. The build
  reads this to construct URLs and hreflang. Guarantees uniqueness per locale
  and detects collisions before they ship.
- **`redirects.json`** — `[{ from, to, code: 301, reason, at }]`. Every slug
  change appends here automatically. A build step compiles this into
  `public/_redirects` (Cloudflare-native, edge-enforced).
- **`link-graph.json`** — the internal-link graph (see §6.4). Nodes are article
  keys; edges carry the anchor phrase per language and a relevance score.

### 4.3 Slug policy for non-Latin scripts

**Locked (§12.2): native-script slugs, URL-encoded** — Persian/Arabic text in the
URL (e.g. `/fa/بدون-تبلیغ-بدون-ردیاب/`). Google handles UTF-8 slugs well and
in-locale CTR is higher when the URL is readable to the reader. Rules:

- Lowercase where the script has case; spaces → hyphens; strip punctuation.
- Normalize Persian/Arabic forms (Arabic `ي`/`ك` → Persian `ی`/`ک`, remove
  ZWNJ/diacritics from the slug) so the same title always yields the same slug.
- Enforce a max byte-length; keep a per-locale uniqueness check.
- Store both the raw (display) and URL-encoded form; links and hreflang use the
  encoded form, breadcrumbs show the raw form.
- Slug is **immutable once `status: published`** unless a change is explicitly
  requested — and then a redirect is mandatory and automatic.

## 5. Runtime routing changes (Astro)

`src/i18n/content.ts` and `blog/[slug].astro` change from *shared-slug* to
*key + per-language slug*:

1. Group entries by `key` (filename), as today.
2. Read `slug` from each locale's frontmatter (fall back to `key` if absent).
3. `getStaticPaths` emits `{ locale, slug }` from the registry — each language
   its own slug.
4. `hreflang` cluster maps every available locale to **its own** slug (not a
   shared one). `x-default` → `sourceLocale` (or `en`).
5. Fallback behavior is unchanged: no native version → English shown, `noindex`,
   excluded from hreflang.
6. Canonical of each version points to itself; cross-language association is via
   hreflang only (never cross-language canonical).

## 6. The generation pipeline

Orchestrated in GitHub Actions, written as discrete resumable stages. Uses the
Claude API. Each stage logs inputs/outputs and is independently retryable.

```
brief → draft(source) → transcreate(each locale) → featured images
      → internal linking (new + back-links) → validate & self-heal → PR → review → merge → deploy
```

### 6.0 Topic intake
- **Now:** a brief is a file in `content-engine/briefs/*.yml` (title + optional
  angle), or a GitHub issue with a label, or a manual `workflow_dispatch`.
- **Soon (planned):** an intake job proposes titles from **GA4 + Search Console**
  (queries with impressions but poor CTR/position, rising topics, content gaps).
  Same downstream pipeline; only the brief's origin changes.
- Output: a **content brief** — target keyword & search intent, audience, source
  locale, outline, internal-link candidates, the app angle/CTA, and explicit
  legal/safety constraints.

### 6.1 Draft in the source language
- **Source locale is per-topic: `fa` or `en` (locked §12.4).** The brief declares
  which language a topic is genuinely native to (a locally-flavoured topic may be
  authored in `fa` first; a globally-framed one in `en`), and every other locale
  transcreates from that original. `sourceLocale` records the choice per article.
- One strong model authors full MDX in the source locale.
- Guided by a **brand voice guide** distilled from existing posts (precise,
  technical, privacy-first, quietly confident, *no hype*) plus a per-language
  **style guide**.
- SEO structure enforced: single H1, logical H2/H3, keyword in the first
  paragraph and naturally throughout (no stuffing), meta description in range,
  scannable, optional FAQ block, internal-link slots.
- CTA is helpful-not-salesy: guides toward the app as the natural answer, never
  reads as an ad.

### 6.2 Transcreation to each locale
For every other locale, build a **localization brief** and author natively:
- Currency & units localized (تومان → local currency; metric/imperial).
- Cultural references swapped, not translated (an Iranian dish → an Italian dish
  in `it`, a local analogy in `es`, etc.).
- **Keywords re-researched** in-language — the `fa` keyword is not a translation
  of the `en` keyword.
- Register/formality and idiom matched to the language; RTL handled for `fa`/`ar`.
- Its own `slug`, `title`, `description`, `keywords`, `heroImageAlt`.
- Explicit instruction: forbid "translation feel"; write as a native author.

### 6.3 Featured image
Requirements: at least one per article; matches the topic; any text on it is in
the article's language; readable with safe padding at phone/tablet/desktop.

**Locked (§12.3): templated composition (deterministic text).**
1. A background layer: brand-consistent, **text-free** (from a curated library or
   a generative image model, but never relying on the model to render words).
2. A text layer rendered by us (HTML/SVG → WebP) using the correct language,
   font (Vazirmatn `fa`, Cairo `ar`, Inter Latin), direction, and **guaranteed
   safe-area padding**. This makes text legible and never broken across sizes —
   which generative text rendering cannot guarantee, especially for Persian/Arabic.
3. Export responsive WebP sizes; also serves as the Open Graph / Twitter image.
4. Purely photographic images with no text can be shared across languages.

Validation: aspect ratio, dimensions, min contrast, safe-area padding respected,
localized `heroImageAlt` present.

### 6.4 Internal linking (bidirectional)
The heart of the "auto-link to previous articles, and update old articles to
point at the new one" requirement. Backed by `link-graph.json`.

- **Forward links:** the new article links to the most relevant existing
  articles *in the same language*, with a contextually justified anchor phrase.
- **Back-links:** scan existing same-language articles for passages genuinely
  relevant to the new topic; where the match is strong, insert a link to the new
  article. These edits are part of the *same PR* and bump `updatedAt`.
- Applied across **every language** independently (fa links to fa, it to it).
- Guardrails: cap links per article, require a relevance threshold, no
  over-linking, no duplicate anchors, no reciprocal-loop spam.

### 6.5 Validation & self-heal
A dedicated stage (also runs in CI on the PR):
- Frontmatter schema; `key`/`slug` uniqueness; registry consistency.
- Link resolution (extends `check-links.mjs` to cover the content graph and
  per-language slugs).
- hreflang completeness; redirect integrity (every historical URL resolves live
  or via a 301).
- Image presence/size/alt/padding.
- **SEO checklist:** title & meta length, one H1, keyword placement, heading
  hierarchy, reading level, image alt coverage, structured-data validity.
- **Compliance/editor pass** (see §8).
- Auto-fixable issues → fixed and re-validated (bounded retries). Non-fixable →
  block the PR with a clear comment.

### 6.6 Publish (automated, review-after — §12.1)
- The run bundles: new MDX (all languages), back-link edits, images, updated
  `slug-registry.json` / `redirects.json` / `link-graph.json`, sitemap deltas.
- **Two outcomes, decided by the gate, not a person:**
  - **Clear** → commit is auto-merged and Cloudflare Pages deploys. A summary is
    posted (issue comment / notification) so a human can review *after* the fact
    and revert if needed.
  - **Held** → if the compliance gate (§8) or any hard validation is not passed
    with high confidence, the change is opened as a **draft PR** and *not*
    published, with the exact reason. This is the safety valve that keeps
    auto-publish from shipping risky content.
- Every publish is an ordinary commit: one-click revert, full history, and the
  reconciler re-checks it on the next nightly pass.

## 7. Scaling to many languages & self-reconciliation

### 7.1 Adding a language (6 → 46)
1. Add the locale to `src/i18n/config.ts` (label, endonym, dir, path, htmlLang)
   and a `src/i18n/ui/<locale>.ts` (typed against `UiStrings`).
2. The **reconciler** computes the gap matrix `articles × locales`, enqueues a
   transcreation job for every missing `(key, locale)`, and opens PRs in
   rate-limited, cost-capped waves. Until a language's article is merged, the
   existing English-fallback + `noindex` keeps the site correct.

### 7.2 Nightly reconciler (self-check)
A scheduled Action that:
- Rebuilds the `articles × locales` matrix and reports/fills gaps.
- Runs link-graph integrity + `check-links` + redirect resolution over history.
- Re-scores SEO and flags drift; can auto-open fix PRs.
- Verifies every image exists per language with valid padding/alt.

Everything the reconciler "fixes" still flows through the PR gate — automated
detection, human-approvable correction.

## 8. Safety, legal & truthfulness

Because publishing is automated with review-*after* (§12.1), this gate — not a
human — is what stands between generation and the live site. It is intentionally
strict and runs on **every language version independently**.

- **Compliance editor stage** with an explicit deny-list: medical/financial/legal
  advice, unverifiable superiority or "best/guaranteed" claims, competitor
  disparagement, defamation, reproduced copyrighted text, privacy-violating or
  misleading claims, and anything region-sensitive.
- **Confidence threshold, fail-closed:** the gate must *affirmatively* clear a
  document. Uncertainty is not a pass — anything below the confidence bar is
  **held as a draft PR** (§6.6), never published.
- **Feature-truth grounding:** claims about the app are grounded in real product
  facts (app docs / UI strings / this repo), never invented, to avoid
  hallucinated features. A claim that cannot be grounded is removed or the doc is
  held.
- **Independent second pass:** the compliance check is a *separate* model call
  from the author (and ideally a different prompt/tier), so the reviewer is not
  the same context that wrote the text.
- **Provenance** (`model`, prompt version, `generatedAt`) recorded per article;
  every publish is a revertible commit and is re-audited by the nightly
  reconciler (§7.2).
- **Kill switch:** a single flag (env / repo variable) disables auto-merge and
  forces every run into held-PR mode, for when you want to pause automation.

## 9. SEO specifics (summary)

- Per-language keyword research (intent-based, not translated keywords).
- Native-script localized slugs; immutable-after-publish with mandatory redirects.
- Per-article hreflang cluster; `x-default`; self-canonical per language.
- Structured data: `BlogPosting`, `BreadcrumbList`, `FAQPage` where applicable
  (extends the JSON-LD already in `blog/[slug].astro`).
- Sitemap already integrated; ensure per-language slugs are emitted and fallback
  pages stay `noindex` and out of the sitemap.
- Featured image = OG/Twitter image per language.

## 10. Cost & operational controls

- **Model tiering:** strong model for source draft + compliance; cheaper model
  for mechanical steps (registry updates, link scans).
- Per-run token/cost budget with hard caps; batching and rate limits in the
  reconciler; idempotency keys so retries never duplicate work.
- Style guide, brand facts, and briefs cached/pinned for cache-friendly prompts.
- Every run leaves an auditable log artifact.

## 11. Proposed repository layout

```
content-engine/
  briefs/                 # topic queue (yml) — later fed by GA4/Search Console
  prompts/                # versioned system prompts per stage
  style/
    brand-voice.md        # distilled from existing posts
    <locale>.md           # per-language style + localization rules
  lib/                    # pipeline stages (draft, transcreate, image, link, validate)
  run.mjs                 # orchestrator (resumable, idempotent)
src/content/blog/<locale>/<key>.mdx
src/content/_data/
  slug-registry.json
  redirects.json
  link-graph.json
public/_redirects         # generated from redirects.json
.github/workflows/
  content-generate.yml    # on new brief / workflow_dispatch
  content-reconcile.yml   # nightly: gaps, links, redirects, SEO drift
docs/content-engine/
  ARCHITECTURE.md         # this file
```

## 12. Locked decisions

Decided 2026-07-29. Change requires updating this section and dependent sections.

1. **Publish gate → automated, review-after.** No human pre-publish step; the
   strict compliance gate (§8) decides publish-vs-hold, with a kill switch and
   easy revert. *(Drives §2.4, §6.6, §8.)*
2. **Non-Latin slugs → native script**, URL-encoded, normalized. *(Drives §4.3.)*
3. **Featured image → templated composition:** text-free background + our own
   text layer rendered with the correct font/direction/padding. *(Drives §6.3.)*
4. **Source language → per-topic, `fa` or `en`,** declared in the brief; all
   other locales transcreate from that original. *(Drives §6.1, `sourceLocale`.)*

## 13. Phased delivery

- **Phase 1 — Foundations:** frontmatter `key`+`slug`, slug registry, redirects
  map + `_redirects`, routing/hreflang changes, extended validation. *(No AI yet;
  the site keeps working, per-language slugs become possible.)*
- **Phase 2 — Single-language generation:** brief → source draft → featured image
  → validate → publish. Ships in *held-PR mode* first (kill switch on) so you can
  confirm quality & voice on the first several articles, then flip the switch to
  full auto-publish once the compliance gate is trusted.
- **Phase 3 — Transcreation:** fan out to all current locales with localization
  briefs; per-language images and slugs.
- **Phase 4 — Internal linking:** link graph, forward + back-links across
  languages.
- **Phase 5 — Reconciler & scale:** nightly self-check, language backfill,
  SEO-drift fixes.
- **Phase 6 — Autonomous intake:** GA4 + Search Console topic proposals.
```
