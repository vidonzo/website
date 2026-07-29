#!/usr/bin/env node
// Generates the slug registry from article frontmatter, and validates it.
//
// Frontmatter is canonical (docs/content-engine §4.2); this derives the map
// `key → { locale → urlSlug }` at src/content/_data/slug-registry.json, so the
// URL set of the whole site is inspectable in one reviewable file rather than
// scattered across three hundred MDX headers.
//
// The generation is the cheap part. The checks are the point:
//
//   - A frontmatter `slug` field is rejected outright, in every collection.
//     Astro's content loader treats `slug` as the entry id, which silently
//     detaches a translation from its key and republishes it as a duplicate
//     noindex fallback at the native URL. The field is `urlSlug`, and this makes
//     that unforgettable.
//   - Frontmatter must stay inside the small, flat, quoted subset that
//     tool/lib/frontmatter.mjs accepts — the same "generated content is data,
//     never code" boundary the MDX body has.
//   - Every URL a locale actually serves is enumerated and checked for
//     collisions, including the fallback pages a locale serves at the bare key
//     for articles it has no native version of. Two articles resolving to one
//     path is the failure mode that silently deletes a page from the site.
//   - Every article group agrees on its `sourceLocale`, that locale is present,
//     and so is the default locale the other nineteen fall back to.
//
// Run with `--check` in CI to fail when the committed registry is stale.

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

import { parseFrontmatter } from './lib/frontmatter.mjs';
import { readLocales } from './lib/locales.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = resolve(root, 'src/content');
const blogDir = join(contentDir, 'blog');
const outPath = resolve(root, 'src/content/_data/slug-registry.json');
const check = process.argv.includes('--check');

const problems = [];
const report = (file, message) => problems.push(`${file}: ${message}`);

const { codes: localeCodes, defaultLocale } = readLocales(root);

// ---------------------------------------------------------------- scanning ---

async function* mdxFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* mdxFiles(full);
    else if (entry.name.endsWith('.mdx')) yield full;
  }
}

async function read(file) {
  const rel = file.slice(root.length + 1);
  return { rel, data: parseFrontmatter(await readFile(file, 'utf8'), (message) => report(rel, message)) };
}

/** `slug` is reserved by Astro's loader — no collection may declare it. */
for await (const file of mdxFiles(contentDir)) {
  const { rel, data } = await read(file);
  if (data && 'slug' in data) {
    report(
      rel,
      "frontmatter declares `slug`, which Astro's content loader treats as the entry id — " +
        'it detaches the file from its key and publishes a duplicate fallback. Rename it to `urlSlug`.',
    );
  }
}

/** Blog articles carry the URL identity, so they get the full treatment. */
const articles = []; // { locale, key, urlSlug, data, rel }

for await (const file of mdxFiles(blogDir)) {
  const parts = file.slice(blogDir.length + 1).split('/');
  const rel = file.slice(root.length + 1);
  if (parts.length !== 2) {
    report(rel, 'blog articles live at src/content/blog/<locale>/<key>.mdx');
    continue;
  }
  const [locale, filename] = parts;
  const key = filename.replace(/\.mdx$/, '');

  if (!localeCodes.includes(locale)) {
    report(rel, `unknown locale directory "${locale}" — add it to src/i18n/config.ts first`);
    continue;
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(key)) {
    report(rel, `key "${key}" must be lowercase ASCII words separated by single hyphens`);
    continue;
  }

  const { data } = await read(file);
  if (!data) continue;

  const urlSlug = data.urlSlug;
  if (urlSlug !== undefined) {
    if (typeof urlSlug !== 'string' || urlSlug === '') report(rel, '`urlSlug` must be a non-empty string');
    else if (urlSlug !== urlSlug.normalize('NFC')) report(rel, '`urlSlug` must be Unicode NFC normalized');
    else if (/\s/.test(urlSlug)) report(rel, '`urlSlug` must not contain whitespace — use hyphens');
    else if (/[/?#%]/.test(urlSlug)) report(rel, '`urlSlug` must not contain "/", "?", "#" or "%" — store it decoded');
    else if (/^-|-$|--/.test(urlSlug)) report(rel, '`urlSlug` must not start, end, or double up on hyphens');
    else if (urlSlug !== urlSlug.toLowerCase()) report(rel, '`urlSlug` must be lowercase');
  }
  for (const field of ['title', 'description']) {
    if (typeof data[field] !== 'string' || data[field] === '') report(rel, `\`${field}\` is required`);
  }

  articles.push({ locale, key, urlSlug: typeof urlSlug === 'string' ? urlSlug : undefined, data, rel });
}

// ---------------------------------------------------------------- grouping ---

const groups = new Map(); // key → Map<locale, article>
for (const article of articles) {
  const group = groups.get(article.key) ?? new Map();
  group.set(article.locale, article);
  groups.set(article.key, group);
}

for (const [key, group] of groups) {
  // Every variant of one article must agree on which language it came from, and
  // that language must actually be present — otherwise `sourceLocale` is a claim
  // about an original that does not exist.
  const declared = [...group.values()].filter((a) => a.data.sourceLocale !== undefined);
  const distinct = new Set(declared.map((a) => a.data.sourceLocale));
  if (distinct.size > 1) {
    report(`blog/${key}`, `variants disagree on sourceLocale: ${[...distinct].sort().join(', ')}`);
  } else if (distinct.size === 1) {
    const source = [...distinct][0];
    if (!localeCodes.includes(source)) report(`blog/${key}`, `sourceLocale "${source}" is not a configured locale`);
    else if (!group.has(source)) report(`blog/${key}`, `sourceLocale is "${source}" but there is no ${source} variant`);
  }
  if (!group.has(defaultLocale)) {
    // Locales without a native variant fall back to the default-locale entry, so
    // an article missing it would 404 everywhere it is not translated.
    report(`blog/${key}`, `no ${defaultLocale} variant — every article needs one to fall back to`);
  }
}

// Enumerate the URL each locale genuinely serves for each key — the native slug
// when there is a native variant, otherwise the fallback page rendered at the
// source entry's slug — and reject two keys landing on one path.
for (const locale of localeCodes) {
  const byPath = new Map();
  for (const [key, group] of groups) {
    const entry = group.get(locale) ?? group.get(defaultLocale);
    if (!entry) continue;
    const path = entry.urlSlug ?? key;
    const clash = byPath.get(path);
    if (clash) {
      report(
        `blog/${locale}`,
        `"${key}" and "${clash}" both resolve to /${locale}/blog/${path}/ — one of them would never be served`,
      );
    } else {
      byPath.set(path, key);
    }
  }
}

if (problems.length > 0) {
  console.error(`build-slug-registry: ${problems.length} problem(s)\n`);
  for (const problem of problems.sort()) console.error(`  ${problem}`);
  process.exit(1);
}

// ---------------------------------------------------------------- emitting ---

const sortedKeys = [...groups.keys()].sort();
const registry = {
  version: 1,
  note:
    'GENERATED by tool/build-slug-registry.mjs from blog frontmatter. Do not edit by hand — ' +
    'change the article `urlSlug` and run `npm run build:slugs`. Only locales with a native ' +
    'variant appear here; every other locale serves the fallback page. See docs/content-engine §4.2.',
  articles: Object.fromEntries(
    sortedKeys.map((key) => {
      const group = groups.get(key);
      const locales = Object.fromEntries(
        localeCodes.filter((code) => group.has(code)).map((code) => [code, group.get(code).urlSlug ?? key]),
      );
      return [key, { sourceLocale: group.values().next().value.data.sourceLocale ?? defaultLocale, locales }];
    }),
  ),
};

const serialized = `${JSON.stringify(registry, null, 2)}\n`;

if (check) {
  let current = '';
  try {
    current = await readFile(outPath, 'utf8');
  } catch {
    /* missing counts as stale */
  }
  if (current !== serialized) {
    console.error(
      'build-slug-registry: src/content/_data/slug-registry.json is stale — run `npm run build:slugs` and commit.',
    );
    process.exit(1);
  }
  console.log(`build-slug-registry: up to date (${sortedKeys.length} article(s), ${articles.length} variant(s))`);
} else {
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, serialized);
  console.log(`build-slug-registry: wrote ${sortedKeys.length} article(s), ${articles.length} variant(s)`);
}
