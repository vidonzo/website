// Scans the content collections and reports, per article and per locale,
// whether a translation exists and whether it carries the frontmatter the
// translation standard expects. Reads the live files every time, so the result
// is never a hand-maintained snapshot.
//
// Consumed by two callers that must agree:
//   - tool/coverage.mjs        — the local `npm run coverage` report
//   - src/pages/admin/index.astro — the Cloudflare-Access-gated dashboard
//
// Deliberately free of `astro:content` and any TypeScript import, so the plain
// Node CLI and the Astro build can both call it. The canonical locale list and
// its order are read out of src/i18n/config.ts, so adding a language there makes
// it appear here with no second edit.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

/** Persian display names for the languages, keyed by locale code. */
const FA_NAMES = {
  en: 'انگلیسی', fa: 'فارسی', ar: 'عربی', es: 'اسپانیایی', tr: 'ترکی', fr: 'فرانسه',
  de: 'آلمانی', pt: 'پرتغالی', ru: 'روسی', id: 'اندونزیایی', it: 'ایتالیایی',
  vi: 'ویتنامی', pl: 'لهستانی', nl: 'هلندی', hi: 'هندی', bn: 'بنگالی', th: 'تایلندی',
  ur: 'اردو', ja: 'ژاپنی', ko: 'کره‌ای',
};

/**
 * Which collections to report, and what "properly translated" means for each.
 *
 * - `engineFields`: their presence on the source marks an entry as built to the
 *   content-engine standard. An entry whose source lacks them is "pre-standard"
 *   — older articles the engine predates — and its translations are not held to
 *   the richer bar.
 * - `translationStandard`: the frontmatter a *translated* file must carry to
 *   count as fully compliant (only enforced on standard, non-pre-standard entries).
 * - `requiredFields`: for the non-blog collections, the schema fields every
 *   locale is expected to repeat.
 */
const COLLECTIONS = [
  {
    id: 'blog',
    faLabel: 'بلاگ — مقاله‌ها',
    base: 'src/content/blog',
    engineFields: ['keywords', 'heroImageAlt'],
    translationStandard: ['urlSlug', 'sourceLocale', 'keywords', 'heroImageAlt'],
    requiredFields: [],
  },
  {
    id: 'help',
    faLabel: 'راهنما — Help',
    base: 'src/content/help',
    engineFields: [],
    translationStandard: [],
    requiredFields: ['category', 'order'],
  },
  {
    id: 'legal',
    faLabel: 'اسناد حقوقی — Legal',
    base: 'src/content/legal',
    engineFields: [],
    translationStandard: [],
    requiredFields: ['page'],
  },
];

/** Reads the ordered locale list and English labels out of src/i18n/config.ts. */
function readLocales(root) {
  const text = readFileSync(resolve(root, 'src/i18n/config.ts'), 'utf8');
  // Only the block inside `export const locales = { … }`, so PageKey and the
  // like never leak in.
  const block = text.slice(text.indexOf('export const locales'), text.indexOf('} as const'));
  const re = /^\s{2}([a-z]{2,3}):\s*\{\s*label:\s*'([^']+)'/gm;
  const out = [];
  let m;
  while ((m = re.exec(block))) {
    const code = m[1];
    out.push({ code, label: m[2], faName: FA_NAMES[code] || code });
  }
  return out;
}

/**
 * Pulls the frontmatter block into a set of top-level keys and the scalar values
 * we care about. Not a full YAML parser — it only needs to know which keys are
 * present and read a handful of simple strings (title, sourceLocale, urlSlug).
 */
function parseFrontmatter(text) {
  const keys = new Set();
  const values = {};
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { keys, values };
  for (const line of m[1].split(/\r?\n/)) {
    // Top-level keys only: a leading space means a nested or array-continuation
    // line, which we skip.
    const mm = line.match(/^([A-Za-z0-9_]+):\s?(.*)$/);
    if (!mm) continue;
    const key = mm[1];
    keys.add(key);
    let v = mm[2].trim();
    if (v) {
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      values[key] = v;
    }
  }
  return { keys, values };
}

function localeDirs(absBase) {
  if (!existsSync(absBase)) return [];
  return readdirSync(absBase).filter((name) => {
    try {
      return statSync(join(absBase, name)).isDirectory();
    } catch {
      return false;
    }
  });
}

function analyzeCollection(collection, locales, root) {
  const absBase = resolve(root, collection.base);
  const present = new Set(localeDirs(absBase));

  // key -> { locale -> parsed file }
  const byKey = new Map();
  for (const loc of present) {
    const dir = join(absBase, loc);
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.mdx')) continue;
      const key = file.slice(0, -4);
      const parsed = parseFrontmatter(readFileSync(join(dir, file), 'utf8'));
      if (!byKey.has(key)) byKey.set(key, {});
      byKey.get(key)[loc] = parsed;
    }
  }

  const canonical = locales.map((l) => l.code);
  const entries = [];

  for (const [key, files] of byKey) {
    // The locale the entry was authored in: whatever sourceLocale says, else en,
    // else the first present locale in canonical order.
    let source =
      Object.values(files).map((f) => f.values.sourceLocale).find(Boolean) ||
      (files.en ? 'en' : null) ||
      canonical.find((c) => files[c]);

    const sourceFile = files[source];
    const preStandard =
      collection.engineFields.length > 0 &&
      !collection.engineFields.every((f) => sourceFile?.keys.has(f));

    // Persian-first title for display: the fa translation if present, else the
    // source, else anything, else the file key.
    const title =
      files.fa?.values.title ||
      sourceFile?.values.title ||
      Object.values(files).map((f) => f.values.title).find(Boolean) ||
      key;

    const cells = {};
    for (const loc of canonical) {
      const file = files[loc];
      if (!file) {
        cells[loc] = 'missing';
      } else if (loc === source) {
        cells[loc] = 'source';
      } else {
        const needs =
          collection.id === 'blog'
            ? preStandard
              ? [] // matches the simpler shape its source has
              : collection.translationStandard
            : collection.requiredFields;
        cells[loc] = needs.every((f) => file.keys.has(f)) ? 'ok' : 'partial';
      }
    }

    const tags = [];
    if (collection.id === 'blog') {
      tags.push(preStandard
        ? { text: 'پیش‌استاندارد', kind: 'warn' }
        : { text: 'استاندارد کامل', kind: 'accent' });
    } else if (collection.id === 'help' && sourceFile?.values.category) {
      tags.push({ text: sourceFile.values.category, kind: 'neutral' });
    } else if (collection.id === 'legal' && sourceFile?.values.page) {
      tags.push({ text: sourceFile.values.page, kind: 'neutral' });
    }

    entries.push({ key, title, source, preStandard, cells, tags });
  }

  // Stable order: pre-standard entries sink to the bottom, then by coverage
  // descending, then alphabetically — so the fullest, most-standard rows lead.
  const coverage = (e) => canonical.filter((c) => e.cells[c] !== 'missing').length;
  entries.sort((a, b) =>
    Number(a.preStandard) - Number(b.preStandard) ||
    coverage(b) - coverage(a) ||
    a.key.localeCompare(b.key));

  // Per-locale coverage for the collection.
  const perLocale = {};
  for (const loc of canonical) {
    perLocale[loc] = entries.filter((e) => e.cells[loc] !== 'missing').length;
  }

  const total = entries.length * canonical.length;
  let existing = 0, translated = 0, standard = 0, partial = 0;
  for (const e of entries) {
    for (const loc of canonical) {
      const s = e.cells[loc];
      if (s === 'missing') continue;
      existing++;
      if (s === 'source') continue;
      translated++;
      if (s === 'ok') standard++;
      else partial++;
    }
  }

  return {
    id: collection.id,
    faLabel: collection.faLabel,
    base: collection.base,
    entries,
    perLocale,
    stats: { entryCount: entries.length, total, existing, translated, standard, partial },
  };
}

/** Runs the full scan. Pass a root to override the repo root (tests). */
export function computeCoverage(root = repoRoot) {
  const locales = readLocales(root);
  const collections = COLLECTIONS.map((c) => analyzeCollection(c, locales, root));

  const canonical = locales.map((l) => l.code);

  // Site-wide rollups across every collection.
  let total = 0, existing = 0, entryCount = 0;
  const localeTotals = Object.fromEntries(canonical.map((c) => [c, { have: 0, of: 0 }]));
  for (const col of collections) {
    total += col.stats.total;
    existing += col.stats.existing;
    entryCount += col.stats.entryCount;
    for (const loc of canonical) {
      localeTotals[loc].have += col.perLocale[loc];
      localeTotals[loc].of += col.stats.entryCount;
    }
  }
  const emptyLocales = canonical.filter((c) => localeTotals[c].have === 0);
  const completeLocales = canonical.filter((c) => localeTotals[c].have === localeTotals[c].of && localeTotals[c].of > 0);

  return {
    generatedAt: new Date(),
    locales,
    collections,
    summary: {
      entryCount,
      localeCount: canonical.length,
      total,
      existing,
      coveragePct: total ? Math.round((existing / total) * 100) : 0,
      emptyLocales,
      completeLocales,
      localeTotals,
    },
  };
}
