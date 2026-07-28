# Vidonzo Content Engine — Architecture

> The long-lived design for AI-authored, natively-multilingual, SEO-first
> articles on vidonzo.com. This document is the source of truth for *what* the
> system does and *why*. Implementation lands incrementally against it.

Status: **Draft for approval** · Owner: Hamed · Last reviewed: 2026-07-29

---

## 1. Goal in one sentence

Give one topic (a title/brief) to the system and get, across every language the
site supports, a set of articles that each **read as if written by a native
professional in that language** — SEO-grade, on-brand, cross-linked, illustrated,
within approved legal/safety policy, and self-maintaining — with every
publication observable, reviewable after release, and reversible without
rebuilding content by hand.

### 1.1 Scope

This architecture owns the lifecycle of **blog articles**: intake, research,
authoring, transcreation, media, validation, publication, measurement, refresh,
retirement, and locale backfill. It also owns the routing metadata needed to
keep those articles paired across languages.

It does **not**:

- Generate legal pages, product UI copy, help-center instructions, or app-store
  listings. Those remain human-owned workflows.
- Publish breaking news or advice in medical, financial, or legal domains.
- Treat search traffic, article count, or locale coverage as success by itself.
- Make model output, third-party webpages, analytics data, or generated MDX
  trusted input.

### 1.2 Success criteria

The system is successful only when all of the following remain true:

- **Correctness:** every material factual or product claim is traceable to an
  approved source and has a freshness policy.
- **Native quality:** locale reviewers consistently judge each variant as native
  writing, not translated prose.
- **Technical integrity:** builds, internal links, canonicals, hreflang clusters,
  redirects, structured data, and images pass deterministic checks.
- **Operational safety:** a failed run cannot partially publish a content set;
  a bad release can be identified and reverted quickly.
- **User value:** published articles satisfy the declared user intent and add
  original value; generation volume is never used as an SEO strategy.
- **Economics:** cost, latency, retry rate, and editorial exception rate stay
  within explicit per-run and monthly budgets (§10).

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
4. **Automated publish, review-after (locked decision 1 in §12).** Content is
   generated, validated, and auto-merged/deployed without waiting for a human.
   Because there is *no* human pre-publish gate, the automated **compliance gate
   is the primary legal-safety control** and is deliberately strict (§8):
   anything it cannot clear with high confidence is held as a draft PR for a
   human instead of being published. Every publish is still a reviewable commit,
   easy to revert.
5. **Idempotent, resumable, self-healing.** Every stage is validated and
   re-runnable. A reconciler continuously closes gaps (missing languages,
   images, back-links, broken redirects) — this is the "system checks and fixes
   itself" requirement, kept inside the PR gate.
6. **Quality before coverage.** Adding a locale makes it *eligible* for backfill;
   it does not publish content until the locale has an approved style guide,
   evaluator, fonts, URL policy, and launch thresholds (§7.1).
7. **Generated content is data, never trusted code.** AI-authored MDX is limited
   to an allowlisted Markdown/MDX subset. Imports, exports, expressions, scripts,
   inline event handlers, and arbitrary components are rejected before Astro
   compiles the file (§4.4).

## 3. Current state this builds on

| Area | Today | Implication |
|---|---|---|
| Framework | Astro 5, `output: 'static'`, Cloudflare Pages | Generation is a build-time/CI concern. Because a catch-all Pages Function currently exists, article redirects must run in that Function (or its routes must explicitly exclude static paths); `_redirects` alone is insufficient |
| Content | `src/content/blog/<locale>/<slug>.mdx`, collections in `src/content.config.ts` | Extend the schema, keep the collection model |
| Locales | `en` (root), `fa`, `ar`, `es`, `tr`, `fr`; `fa`/`ar` are RTL — `src/i18n/config.ts` | Locale list is already the single source we scale from |
| Fallback | Missing translation → English shown, `noindex`, excluded from hreflang — `src/i18n/content.ts` | Fallback stays as the safety net while a language backfills |
| Slug | **Shared across languages**, grouping is by slug | ⚠️ Must change to per-language slug + shared `key` |
| Linking | Related posts computed at build by shared tags | Add a generated, inspectable **link graph** and explicit contextual links |
| Redirects | `pages.dev → vidonzo.com` exists in both `public/_redirects` and catch-all `functions/_middleware.js` | Compile content redirects into the middleware path; keep one tested execution path and graduate to Cloudflare Bulk Redirects before the static-rule limit |
| Validation | `tool/check-links.mjs` checks rendered internal `href`/`src` targets after the CI build | Grow into schema, URL, graph, HTML, security, evidence, and SEO validation |
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
description: ...                 # meta description; locale-aware preview checked
publishedAt: 2026-07-20
updatedAt: 2026-07-29            # substantive reader-visible change only
tags: [privacy, product]
author: Vidonzo
draft: false

# --- SEO ---
keywords: [...]                  # research targets; never emitted as meta keywords
heroImage: ./_media/no-ads-no-trackers/fa.webp
heroImageAlt: ...                # localized alt text
faq: [...]                       # optional visible Q/A pairs; schema mirrors visible content

# --- review metadata (informational, never an auto-publish prerequisite) ---
reviewedAt: 2026-07-30T10:00:00Z # optional
reviewedBy: hamedsaghafi          # optional GitHub login
reviewOutcome: approved           # approved | changes-requested
```

`publishedAt` is the first public release date of that locale variant.
`updatedAt` changes only for a substantive content correction or refresh, not
for formatting, metadata-only edits, or mechanical back-links. Git already
records every file modification; using `updatedAt` for trivial edits would
misrepresent freshness to readers and search engines.

Group validation enforces exactly one variant per `(key, locale)`, identical
`key` and `sourceLocale` across the group, a real source-locale entry, and
language-neutral tag identifiers. Titles, descriptions, slugs, keywords, dates,
review metadata, and alt text belong to the individual locale variant.

Generation details do not belong in reader-facing frontmatter. Each run writes
an immutable `content-engine/runs/<runId>/manifest.json` containing:

- brief hash and source-locale content hash;
- exact model identifier, prompt/template versions, and evaluator versions;
- source URLs, retrieval timestamps, approved-source classification, and the
  claim-to-source evidence map;
- per-stage inputs/outputs, retry count, cost, quality scores, and file hashes;
- publication commit SHA, locale dependency hashes, and any human review event.

Secrets, full model chain-of-thought, raw analytics rows, and personal data are
never written to the manifest or CI artifacts.

### 4.2 Central and generated data (`src/content/_data/`)

- **`slug-registry.json`** — generated map `key → { locale → slug }`. Article
  frontmatter is canonical; the registry is rebuilt deterministically and CI
  fails if the checked-in artifact is stale. The build reads it to construct
  URLs and hreflang without creating a second editable source of truth.
- **`redirects.json`** — `[{ from, to, code: 301, reason, at }]`. Every slug
  change appends here automatically. It is append-only except for an explicit
  compaction migration; a build step resolves chains, rejects loops/conflicts,
  and compiles a lookup table consumed by `functions/_middleware.js` (§5.2).
- **`link-graph.json`** — a generated index of internal links found in the
  rendered content (see §6.5). Nodes are article keys; edges record locale,
  anchor text, target, and relevance metadata. The article body—not the graph—
  remains canonical.

All generated JSON is stable-sorted and schema-versioned to keep diffs
reviewable. A workflow uses one repository-wide content concurrency group;
after rebasing on the latest `main`, it regenerates these artifacts before
publishing so parallel runs cannot silently overwrite one another.

### 4.3 Slug policy for non-Latin scripts

**Locked decision 2 (§12): native-script slugs, URL-encoded** — Persian/Arabic
text in the URL (e.g. `/fa/بدون-تبلیغ-بدون-ردیاب/`). This makes the URL readable
to its intended audience; it is a product decision, not a ranking guarantee.
Rules:

- Lowercase where the script has case; spaces → hyphens; strip punctuation.
- Normalize Persian/Arabic forms (Arabic `ي`/`ك` → Persian `ی`/`ک`, remove
  ZWNJ/diacritics from the slug) so the same title always yields the same slug.
- Enforce a max byte-length; keep a per-locale uniqueness check.
- Store only the normalized Unicode slug. Percent-encode exactly once at the URL
  serialization boundary; storing both forms invites double-encoding and drift.
- Slug is **immutable after the locale variant's first production deployment**
  unless a change is explicitly requested — and then a redirect is mandatory
  and automatic.

### 4.4 Content execution boundary

MDX can contain JavaScript-capable constructs, so generated `.mdx` must be
treated like an untrusted program even when the prose looks harmless.

- Parse every generated file before `astro build` and reject `mdxjsEsm`,
  expressions, raw `<script>`/`<style>`, event-handler attributes, dangerous URL
  schemes, and HTML outside an explicit allowlist.
- Permit only standard Markdown plus a small registry of content-only components
  such as `Callout` or `Figure`, with Zod-validated literal props.
- Fetch research and image inputs in an isolated, no-secret job with response
  size/time limits, MIME validation, and an outbound-host allowlist. Never let a
  model-provided URL reach internal or link-local addresses.
- Compile and render only the sanitized artifact. The privileged publish job
  consumes validated files and hashes; it never executes untrusted PR code.

## 5. Routing and URL lifecycle

`src/i18n/content.ts` and `blog/[slug].astro` change from *shared-slug* to
*key + per-language slug*:

1. Group entries by `key` (filename), as today.
2. Read `slug` from each locale's frontmatter (fall back to `key` if absent).
3. `getStaticPaths` emits each **native** `{ locale, slug }` pair from the
   generated registry.
4. Every native version emits a self-canonical. Its hreflang cluster contains
   only published native variants, uses fully qualified URLs, is identical and
   reciprocal on every member, and maps each locale to its own slug.
5. `x-default` points to the default-locale version when available; otherwise it
   points to the source-locale version. It is not a substitute for a missing
   locale entry.
6. During migration/backfill, a missing locale may keep the current fallback URL
   at `/<locale>/blog/<key>/`. That page shows the source content with a notice,
   is `noindex`, is excluded from sitemap/hreflang, and canonicalizes to the
   source-locale article. When the native variant ships, the fallback URL 301s
   to its native slug.
7. Cross-language association uses hreflang, never a cross-language canonical
   for two genuinely localized pages.

CI renders every cluster and checks self-inclusion, bidirectionality, supported
BCP 47 codes, absolute URLs, indexability, status 200, and agreement between
HTML canonicals, internal links, and the sitemap.

### 5.1 Slug migration

Phase 1 must preserve every existing blog URL:

1. Snapshot the current `/<locale>/blog/<key>/` URL set.
2. Add `key` and `slug` without changing the rendered routes.
3. Switch native variants to localized slugs in one atomic change set.
4. Generate a 301 from every changed old URL to the new canonical URL.
5. Crawl both the preview deployment and production after release; fail or
   automatically revert if any old URL does not resolve in one hop.

### 5.2 Redirect execution

The repository currently has a catch-all Pages Function. Cloudflare documents
that `_redirects` rules are not applied to requests served through Pages
Functions, so `public/_redirects` cannot be the sole content-redirect mechanism.

- The build compiles `redirects.json` into a deterministic module imported by
  `functions/_middleware.js`; host canonicalization and article redirects are
  evaluated in one place before `context.next()`.
- Validation rejects duplicate sources, cycles, chains, non-canonical targets,
  encoded/decoded aliases, and any target outside the allowed site origin.
- The compiler reports redirect count and generated-module size. Use the
  documented `_redirects` limit (2,000 static rules) as an early scale signal;
  migrate historical entries to Cloudflare Bulk Redirects before middleware
  growth becomes an operational risk, while keeping the JSON ledger in Git.
- Post-deploy probes verify representative ASCII, Persian, and Arabic URLs with
  both encoded and browser-visible Unicode forms.

## 6. The generation pipeline

Orchestrated in GitHub Actions, written as discrete resumable stages. Uses the
configured model providers behind a provider-neutral adapter. Each stage logs
inputs/outputs and is independently retryable.

```
brief → research/evidence → draft(source) → transcreate(each locale)
      → featured images → internal linking (new + bounded back-links)
      → validate & self-heal → publish or hold → deploy → observe/review
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

Every brief also declares an idempotency key, owner, risk tier, intended
original value, expiry/refresh policy, maximum files touched, and maximum cost.
The system rejects a topic whose only stated value is capturing a keyword.

### 6.1 Research and evidence

Research is a separate stage from writing:

- Search intent and locale-specific queries are researched independently; a
  keyword provider's volume is a planning signal, not a factual source.
- Sources are classified: first-party product facts and primary/authoritative
  references are preferred. User-generated or commercial pages may inform
  language and examples but cannot alone support material claims.
- Retrieved text is untrusted and can contain prompt injection. It is converted
  to inert, quoted evidence records; source text cannot alter system
  instructions, tool permissions, or the list of approved claims.
- Material claims receive an evidence record with URL, retrieval time, excerpt
  hash, supported claim, locale relevance, and review-after date. Time-sensitive
  claims require an authoritative primary source or two suitable independent
  sources; otherwise they are omitted or held.
- A source disappearing later does not rewrite history, but the reconciler marks
  the dependent claim stale and schedules a refresh.

The output is a versioned evidence pack. The author receives the approved claims
and citations, not unrestricted browsing or repository secrets.

### 6.2 Draft in the source language
- **Source locale is per-topic: `fa` or `en` (locked decision 4 in §12).** The
  brief declares which language a topic is genuinely native to (a
  locally-flavoured topic may be authored in `fa` first; a globally-framed one
  in `en`), and every other locale transcreates from that original.
  `sourceLocale` records the choice per article.
- One strong model authors full MDX in the source locale.
- Guided by a **brand voice guide** distilled from existing posts (precise,
  technical, privacy-first, quietly confident, *no hype*) plus a per-language
  **style guide**.
- SEO structure enforced: single H1, logical H2/H3, keyword in the first
  paragraph and naturally throughout (no stuffing), meta description in range,
  scannable, optional FAQ block, internal-link slots.
- `ArticleLayout.astro` owns the single H1 from frontmatter; generated MDX starts
  with prose or H2 and is rejected if it contains another H1.
- CTA is helpful-not-salesy: guides toward the app as the natural answer, never
  reads as an ad.

### 6.3 Transcreation to each locale
For every other locale, build a **localization brief** and author natively:
- Currency & units localized (تومان → local currency; metric/imperial).
- Cultural references swapped, not translated (an Iranian dish → an Italian dish
  in `it`, a local analogy in `es`, etc.).
- **Keywords re-researched** in-language — the `fa` keyword is not a translation
  of the `en` keyword.
- Register/formality and idiom matched to the language; RTL handled for `fa`/`ar`.
- Its own `slug`, `title`, `description`, `keywords`, `heroImageAlt`.
- Explicit instruction: forbid "translation feel"; write as a native author.
- Record the source content hash in the run manifest. If the source changes
  materially, dependent locales become `stale` until re-evaluated; a source edit
  never silently leaves translations claiming parity.
- Preserve facts and meaning from the evidence pack, but re-research
  locale-sensitive facts. A cultural rewrite may change examples, never the
  product's capabilities or a cited factual conclusion.

### 6.4 Featured image
Requirements: at least one per article; matches the topic; any text on it is in
the article's language; readable with safe padding at phone/tablet/desktop.

**Locked decision 3 (§12): templated composition (deterministic text).**
1. A background layer: brand-consistent, **text-free** (from a curated library or
   a generative image model, but never relying on the model to render words).
2. A text layer rendered by us (HTML/SVG → WebP) using the correct language,
   font (Vazirmatn `fa`, Cairo `ar`, Inter Latin), direction, and **guaranteed
   safe-area padding**. This makes text legible and never broken across sizes —
   which generative text rendering cannot guarantee, especially for Persian/Arabic.
3. Export responsive WebP sizes; also serves as the Open Graph / Twitter image.
4. Purely photographic images with no text can be shared across languages.

Validation: aspect ratio, dimensions, min contrast, safe-area padding respected,
localized `heroImageAlt` present. Alt text describes the meaningful image rather
than repeating the title or keywords; decorative variants use empty alt text.
Generated backgrounds retain license/source metadata and an automation
disclosure appropriate to the publishing policy.

### 6.5 Internal linking (bidirectional)
The heart of the "auto-link to previous articles, and update old articles to
point at the new one" requirement. Backed by `link-graph.json`.

- **Forward links:** the new article links to the most relevant existing
  articles *in the same language*, with a contextually justified anchor phrase.
- **Back-links:** scan existing same-language articles for passages genuinely
  relevant to the new topic; where the match is strong, insert a link to the new
  article. These edits can be part of the same release but do not bump
  `updatedAt` unless the surrounding reader-visible meaning changes materially.
- Applied across **every language** independently (fa links to fa, it to it).
- Guardrails: cap links per article, require a relevance threshold, no
  over-linking, no duplicate anchors, no reciprocal-loop spam.
- Limit the number of existing files touched by one release. If high-quality
  back-links exceed the brief's blast-radius budget, publish the new article
  first and open a separate, non-blocking maintenance change for the remainder.
- Never rewrite a sentence merely to manufacture an anchor. A back-link edit
  must preserve meaning and pass the locale's regression evaluation.

### 6.6 Validation & self-heal
A dedicated stage (also runs in CI on the PR):
- Frontmatter schema; `key`/`slug` uniqueness; registry consistency.
- Link resolution (extends `check-links.mjs` to cover the content graph and
  per-language slugs).
- hreflang completeness; redirect integrity (every historical URL resolves live
  or via a 301).
- Image presence/size/alt/padding.
- **SEO checklist:** title/meta preview quality, one layout-owned H1, natural
  intent coverage, heading hierarchy, reading level, image alt coverage, and
  structured-data validity. Length heuristics are locale-aware advisories, not
  universal ranking rules.
- Evidence coverage, source freshness, originality/near-duplicate detection,
  locale quality, security boundary, and **compliance/editor pass** (§8).
- Auto-fixable issues → fixed and re-validated (bounded retries). Non-fixable →
  block the PR with a clear comment.

Checks are classified rather than blended into one opaque score:

- **Hard gates:** schema, build, MDX safety, unsupported claims, rights/license,
  high-risk policy, URL integrity, locale readiness, and provenance.
- **Measured thresholds:** native-quality evaluation, originality, readability,
  relevance, visual quality, and link relevance. Thresholds and evaluator
  versions are stored in the manifest.
- **Advisories:** non-blocking optimization ideas. Advisories never compensate
  for a failed hard gate.

Self-heal has a small allowlist of deterministic fixes. Model-based rewrites
start a new validation attempt, preserve the failed artifact for audit, and stop
after a fixed retry count; the system may not repeatedly rewrite until a scorer
happens to pass.

### 6.7 Publish (automated, review-after — locked decision 1 in §12)
- The run bundles: new MDX (all languages), back-link edits, images, updated
  `slug-registry.json` / `redirects.json` / `link-graph.json`, sitemap deltas.
- **Two outcomes, decided by the gate, not a person:**
  - **Clear** → commit is auto-merged and Cloudflare Pages deploys. A summary is
    posted (issue comment / notification) so a human can review *after* the fact
    and revert if needed.
  - **Held** → if the compliance gate (§8) or any hard validation is not passed
    with high confidence, the change is opened as a **draft PR** and *not*
    published, with exact machine-readable reason codes and remediation. This is
    the safety valve that keeps auto-publish from shipping risky content.
- Every publish is an ordinary commit: one-click revert, full history, and the
  reconciler re-checks it on the next nightly pass.

The validated commit SHA—not a mutable branch head—is the release unit. The
publish job rebases/regenerates shared artifacts, reruns all deterministic gates,
merges, waits for the production deployment, and executes smoke probes. A failed
deployment or post-deploy probe automatically disables further auto-merges and
opens a revert PR; it does not start a second generation attempt.

## 7. Scaling to many languages & self-reconciliation

### 7.1 Adding a language (6 → 46)
1. Add the locale to `src/i18n/config.ts` (label, endonym, dir, path, htmlLang)
   and a `src/i18n/ui/<locale>.ts` (typed against `UiStrings`).
2. Add a locale manifest with font/license coverage, normalization and slug
   rules, style guide, prohibited/regulated topics, evaluator thresholds,
   currency/units policy, named locale owner, and launch budget.
3. Pass a readiness suite: UI completeness, bidi/layout snapshots, a small
   human-reviewed gold set, native-quality evaluator calibration, search-market
   demand, and production URL probes.
4. Mark the locale `backfillEligible: true`. Only then does the **reconciler**
   compute the gap matrix `articles × locales`, enqueue missing `(key, locale)`
   jobs, and open changes in rate-limited, cost-capped waves.

Backfill rolls out in bounded cohorts, not all articles at once. Until a native
version is published, the source-language fallback contract in §5 applies.
Locale coverage is reported separately from locale quality; “46 configured
locales” must never be presented as “46 complete locales.”

### 7.2 Nightly reconciler (self-check)
A scheduled Action that:
- Rebuilds the `articles × locales` matrix and reports/fills gaps.
- Runs link-graph integrity + `check-links` + redirect resolution over history.
- Detects source edits, stale evidence, changed product facts, locale drift,
  near-duplicates, and content whose refresh/retire date has passed.
- Re-scores quality and SEO and can open bounded fix PRs.
- Verifies every image exists per language with valid padding/alt.

Everything the reconciler changes flows through the same publish-or-hold gates
as new content. Detection is broad; auto-fix remains narrow and auditable.

### 7.3 Refresh, correction, and retirement

- Each article declares a refresh policy in its manifest: event-driven,
  time-based, or evergreen with periodic evidence checks.
- Product-fact changes trigger an impact query over the evidence map. Corrections
  to factual, privacy, security, pricing, or availability claims have priority
  over new generation.
- A correction preserves the canonical URL, explains material reader-facing
  changes when appropriate, and updates `updatedAt`. Locale variants are
  re-evaluated against the corrected source.
- Retirement uses a reasoned 301 to the closest true replacement only when one
  exists; otherwise return an intentional 410. Never redirect unrelated retired
  content to the blog index.

## 8. Safety, legal & truthfulness

Because publishing is automated with review-*after* (locked decision 1 in §12),
this gate — not a
human — is what stands between generation and the live site. It is intentionally
strict and runs on **every language version independently**.

- **Compliance editor stage** with an explicit deny-list: medical/financial/legal
  advice, unverifiable superiority or "best/guaranteed" claims, competitor
  disparagement, defamation, reproduced copyrighted text, privacy-violating or
  misleading claims, and anything region-sensitive. Topics involving streaming
  rights, circumvention, piracy, jurisdiction-specific availability, minors, or
  security/privacy guarantees are always held for named-owner review.
- **Confidence threshold, fail-closed:** the gate must *affirmatively* clear a
  document. Uncertainty is not a pass — anything below the confidence bar is
  **held as a draft PR** (§6.7), never published. A model's self-reported
  confidence is never a pass signal; thresholds come from calibrated evaluators,
  deterministic evidence coverage, and the human-reviewed gold set.
- **Feature-truth grounding:** claims about the app are grounded in real product
  facts from a versioned, owner-approved product-facts file—not inferred from a
  screenshot or stale marketing copy. A claim that cannot be grounded is removed
  or the article is held.
- **Claim-level evidence:** material external claims must be supported by the
  evidence pack (§6.1). The published article cites sources where a reasonable
  reader would need verification; machine provenance alone is not a substitute
  for reader-visible sourcing.
- **Originality and rights:** compare against research sources and existing site
  content, reject close paraphrase or reproduced passages, record image/font
  licenses, and never treat attribution as permission.
- **Independent second pass:** the compliance check is a *separate* model call
  from the author (and ideally a different prompt/tier), so the reviewer is not
  the same context that wrote the text.
- **User transparency:** the site has a concise editorial/automation policy, and
  articles disclose material automation where appropriate. Do not fabricate a
  human byline or imply first-hand testing that did not happen.
- **Provenance** is recorded in the immutable run manifest (§4.1); every publish
  is a revertible commit and is re-audited by the nightly reconciler (§7.2).
- **Kill switch:** a single flag (env / repo variable) disables auto-merge and
  forces every run into held-PR mode, for when you want to pause automation.

### 8.1 Workflow and secret isolation

Validation and publication have separate trust boundaries:

- The generation/research job has no repository write token and no production
  secret. It uploads a bounded artifact containing candidate content, evidence,
  and hashes.
- A validation job treats that artifact as untrusted, sanitizes MDX (§4.4), and
  runs without write credentials.
- A minimal publish job receives only the validated commit/artifact hashes and
  the exact permissions it needs. Repository permissions default to read-only;
  actions are pinned to immutable commit SHAs.
- Do not combine privileged secrets with checkout or execution of untrusted PR
  code. In particular, avoid `pull_request_target` for candidate content.
- API secrets are environment-scoped, masked, rotated, and never exposed to
  prompts, generated files, cache keys, or artifacts. Logs have retention and
  redaction policies.
- Changes to workflows, prompts, policy, evaluators, product facts, and
  allowlists require `CODEOWNERS` review even while ordinary clear content can
  auto-publish.

## 9. SEO specifics (summary)

- People-first usefulness and originality are hard requirements. Automated scale
  is not an SEO goal; low-value query permutations and thin locale variants are
  rejected as scaled-content risk.
- Per-language keyword research (intent-based, not translated keywords).
- Native-script localized slugs; immutable-after-publish with mandatory redirects.
- Per-article hreflang cluster; `x-default`; self-canonical per language.
- Structured data: complete, visible-content-matching `BlogPosting` and
  `BreadcrumbList`. `FAQPage` may describe a genuine visible FAQ but is not
  justified as a Vidonzo rich-result tactic: Google normally limits FAQ rich
  results to authoritative government and health sites.
- Sitemap already integrated; ensure per-language slugs are emitted and fallback
  pages stay `noindex` and out of the sitemap.
- Featured image = OG/Twitter image per language.
- Search Console monitoring is segmented by locale and article key. Indexing,
  selected canonical, hreflang errors, impressions, CTR, and useful engagement
  are observed after release; traffic alone never overrides a quality failure.

## 10. Cost & operational controls

- **Model tiering:** strong model for source draft + compliance; cheaper model
  for mechanical steps (registry updates, link scans).
- Per-run token/cost budget with hard caps; batching and rate limits in the
  reconciler; idempotency keys so retries never duplicate work.
- Style guide, brand facts, and briefs cached/pinned for cache-friendly prompts.
- Every run leaves an auditable, redacted log artifact and immutable manifest.
- Workflow `concurrency` serializes writes to shared registries while
  generation-only jobs may run in parallel. A run always rebases and
  revalidates the exact candidate SHA before merge.
- A monthly budget is partitioned among corrections, refreshes, current-locale
  coverage, and new-locale backfill; maintenance cannot be starved by new
  article generation.

### 10.1 Observability and service objectives

Track at minimum: stage latency, cost, retry/failure/hold rates, evaluator
disagreement, unsupported-claim rate, locale defect rate, files touched,
deployment outcome, redirect probe failures, stale evidence, and time to
correction.

Before enabling auto-merge, set explicit targets for:

- zero hard-gate escapes and zero broken canonical/redirect releases;
- maximum publish-to-detection and detection-to-revert/correction time;
- minimum native-review pass rate per locale;
- maximum held-run, retry, and monthly-spend rates.

Alerts include the run ID, commit SHA, affected keys/locales, gate version, and a
safe next action. If error budget is exhausted, the kill switch automatically
forces held-PR mode.

## 11. Proposed repository layout

```
content-engine/
  briefs/                 # topic queue (yml) — later fed by GA4/Search Console
  prompts/                # versioned system prompts per stage
  policy/                 # gates, approved sources, topic risk, MDX allowlist
  product-facts.yml       # owner-approved, versioned claims about the app
  style/
    brand-voice.md        # distilled from existing posts
    <locale>.md           # per-language style + localization rules
  locales/
    <locale>.yml          # readiness, owner, URL/evaluator/launch policy
  runs/<runId>/
    manifest.json         # immutable provenance/evidence/release record
  lib/                    # research, draft, transcreate, image, link, validate
  run.mjs                 # orchestrator (resumable, idempotent)
src/content/blog/<locale>/<key>.mdx
src/content/_data/
  slug-registry.json      # generated from frontmatter
  redirects.json          # append-only URL history
  link-graph.json         # generated from rendered content
functions/
  _middleware.js
  _generated-content-redirects.js  # generated; imported by middleware
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
   easy revert. *(Drives §2.4, §6.7, §8.)*
2. **Non-Latin slugs → native script**, URL-encoded, normalized. *(Drives §4.3.)*
3. **Featured image → templated composition:** text-free background + our own
   text layer rendered with the correct font/direction/padding. *(Drives §6.4.)*
4. **Source language → per-topic, `fa` or `en`,** declared in the brief; all
   other locales transcreate from that original. *(Drives §6.2, `sourceLocale`.)*

### Recommended decisions to confirm before Phase 1

These defaults are used throughout this draft but are not added to the locked
list until the owner confirms them:

1. **Frontmatter is canonical; registries are generated.** This avoids two
   editable sources of truth (§4.2).
2. **Generated MDX uses a restricted, content-only subset.** Imports,
   expressions, scripts, and arbitrary components fail closed (§4.4).
3. **Content redirects execute in the existing Pages middleware path,** with
   Bulk Redirects as the scale-out path; `_redirects` is not the sole mechanism
   (§5.2).
4. **Fallback pages canonicalize to the source variant** and are excluded from
   indexing, sitemap, and hreflang until a native variant exists (§5).
5. **Run manifests hold machine provenance; frontmatter holds reader-facing
   publication data.** This keeps article diffs stable and audit data complete
   (§4.1).

## 13. Phased delivery

- **Phase 1 — Foundations:** frontmatter `key`+`slug`, slug registry, redirects
  map + middleware lookup, routing/hreflang/fallback changes, MDX sanitizer, and
  extended validation. Migrate existing URLs in a preview deployment and prove
  zero broken old URLs before production. *(No generation yet.)*
- **Phase 2 — Research + single-language generation:** brief → evidence → source
  draft → featured image → validate. Run in shadow mode first (artifacts only),
  then held-PR mode with the kill switch on. Calibrate gates against a
  human-reviewed gold set and record false-pass/false-hold rates.
- **Phase 3 — Controlled auto-publish:** enable review-after for a small,
  low-risk source-locale cohort only after Phase 2 service objectives are met.
  Use a daily release cap, post-deploy probes, automatic kill-switch trip, and a
  documented revert drill before increasing volume.
- **Phase 4 — Transcreation:** onboard current locales one at a time through the
  readiness gate; generate localization briefs, per-language images/slugs, and
  verify stale-source propagation.
- **Phase 5 — Internal linking:** link graph, forward + back-links across
  languages with a strict existing-file blast-radius cap.
- **Phase 6 — Reconciler & lifecycle:** nightly self-check, corrections,
  evidence refresh, retirement, language backfill, and quality/SEO drift fixes.
- **Phase 7 — Autonomous intake:** GA4 + Search Console may propose briefs; topic
  selection remains subject to user-value, risk, duplication, and budget gates.

Each phase has an explicit go/no-go review based on the measures in §10.1.
Advancing a phase never disables the kill switch or the held-PR path.

## 14. External constraints and references

These are implementation constraints, not general reading:

- [Cloudflare Pages redirects](https://developers.cloudflare.com/pages/configuration/redirects/)
  — `_redirects` behavior with Pages Functions, ordering, and rule limits.
- [Google: localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
  — reciprocal, fully qualified hreflang clusters and `x-default`.
- [Google: canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
  — self-canonicals, redirects, sitemap alignment, and same-language targets.
- [Google: generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)
  and [spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
  — accuracy, user value, transparency, and scaled-content abuse.
- [Google: structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
  and [FAQ visibility change](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
  — visible-content parity and realistic FAQ expectations.
- [GitHub Actions secure use](https://docs.github.com/en/actions/reference/security/secure-use)
  — least privilege, immutable action pins, secret isolation, and untrusted
  workflow risks.
- [Astro MDX integration](https://docs.astro.build/en/guides/integrations-guide/mdx/)
  — MDX rendering and component/JavaScript capability that motivates §4.4.
