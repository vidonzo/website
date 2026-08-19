#!/usr/bin/env node
// Helper for transcreation batches. Two jobs, both driven by the slug registry:
//
//   1. Fill `/<locale>/blog/{{key}}/` (and `/blog/{{key}}/` for en) with the
//      URL slug that locale actually publishes the article under.
//   2. Repair links that already point at another locale's slug — which happens
//      when a link is written before that locale's variant exists, so the path
//      still carries the source-locale slug.
//
// Run `npm run build:slugs` first so newly added variants are registered.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const reg = JSON.parse(readFileSync('src/content/_data/slug-registry.json', 'utf8')).articles;

/** Every slug any locale uses for an article, so a stale one can be recognised. */
const slugOwner = new Map();
for (const [key, article] of Object.entries(reg)) {
  slugOwner.set(key, key);
  for (const slug of Object.values(article.locales)) slugOwner.set(slug, key);
}

let filled = 0;
let repaired = 0;
const missing = [];

for (const locale of readdirSync('src/content/blog')) {
  for (const file of readdirSync(`src/content/blog/${locale}`)) {
    const path = `src/content/blog/${locale}/${file}`;
    const before = readFileSync(path, 'utf8');
    let after = before;

    // 1. Placeholders. The locale-prefixed form must be tried first, and the
    //    bare form must not be allowed to match the tail of a prefixed path.
    after = after.replace(/\/([a-z]{2})\/blog\/\{\{([a-z0-9-]+)\}\}\//g, (m, l, key) => {
      const slug = reg[key]?.locales[l];
      if (!slug) { missing.push(`${path}: ${l}/${key}`); return m; }
      filled++; return `/${l}/blog/${slug}/`;
    });
    after = after.replace(/(^|[^/a-z])\/blog\/\{\{([a-z0-9-]+)\}\}\//g, (m, lead, key) => {
      const slug = reg[key]?.locales.en;
      if (!slug) { missing.push(`${path}: en/${key}`); return m; }
      filled++; return `${lead}/blog/${slug}/`;
    });

    // 2. Stale cross-locale slugs.
    after = after.replace(/\/([a-z]{2})\/blog\/([^)\s#]+)\//g, (m, l, slug) => {
      const key = slugOwner.get(slug);
      if (!key) return m;
      const correct = reg[key]?.locales[l];
      if (!correct || correct === slug) return m;
      repaired++; return `/${l}/blog/${correct}/`;
    });

    if (after !== before) writeFileSync(path, after);
  }
}

console.log(`filled ${filled} placeholder(s), repaired ${repaired} stale slug(s)`);
if (missing.length) {
  console.log('MISSING:');
  for (const m of missing) console.log(' ', m);
  process.exit(1);
}
