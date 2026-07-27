#!/usr/bin/env node
// Verifies that every internal link in the built site resolves to a file.
//
// A static multilingual site is exactly where dead links breed: a path is
// translated in one place and not another, and nothing complains until a reader
// hits it. This runs over dist/ after a build and fails CI if anything dangles.

import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, extname, join, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');

if (!existsSync(dist)) {
  console.error('check-links: dist/ not found — run `npm run build` first');
  process.exit(1);
}

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith('.html')) yield full;
  }
}

/** Maps a site path to the file that would serve it. */
function resolves(path) {
  const clean = path.split('#')[0].split('?')[0];
  if (clean === '' || clean === '/') return existsSync(join(dist, 'index.html'));
  const target = join(dist, decodeURIComponent(clean));
  if (extname(clean)) return existsSync(target);
  return existsSync(join(target, 'index.html')) || existsSync(`${target}.html`);
}

const broken = [];
let checked = 0;

for await (const file of htmlFiles(dist)) {
  const html = await readFile(file, 'utf8');
  const page = file.slice(dist.length) || '/';

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    // Only internal, navigable paths: skip protocols, anchors and mailto.
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    checked += 1;
    if (!resolves(url)) broken.push({ page, url });
  }
}

if (broken.length > 0) {
  console.error(`check-links: ${broken.length} broken link(s) of ${checked} checked\n`);
  for (const { page, url } of broken) console.error(`  ${url}\n    in ${page}`);
  process.exit(1);
}

console.log(`check-links: ${checked} internal links, all resolve`);
