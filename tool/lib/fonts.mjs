// Picks the font files needed to set a given string in a given locale.
//
// The site already ships per-script webfonts for all twenty languages, so the
// image pipeline uses those same files rather than a second, separately-licensed
// set that could drift from what a reader sees on the page.
//
// Fontsource splits each family by `unicode-range` — Noto Sans JP alone is 124
// files — so setting one title means finding the handful of subsets that
// actually cover its characters. That is what this does: read the package's
// `unicode.json`, intersect each subset's ranges with the codepoints in the
// text, and return only the files that carry a glyph we need. A twenty-character
// Japanese headline typically needs four of those 124 files.
//
// Every locale also gets Inter, because every title contains Latin: `Vidonzo`,
// `M3U`, `IPTV`, `EPG`, digits.

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** Locales whose script Inter does not cover. Latin and Cyrillic locales use Inter alone. */
const SCRIPT_FONTS = {
  fa: { pkg: '@fontsource-variable/vazirmatn', family: 'Vazirmatn', axis: 'wght' },
  ar: { pkg: '@fontsource-variable/cairo', family: 'Cairo', axis: 'wght' },
  ur: { pkg: '@fontsource/noto-nastaliq-urdu', family: 'Noto Nastaliq Urdu', axis: '600' },
  hi: { pkg: '@fontsource-variable/noto-sans-devanagari', family: 'Noto Sans Devanagari', axis: 'wght' },
  bn: { pkg: '@fontsource-variable/noto-sans-bengali', family: 'Noto Sans Bengali', axis: 'wght' },
  th: { pkg: '@fontsource-variable/noto-sans-thai', family: 'Noto Sans Thai', axis: 'wght' },
  ja: { pkg: '@fontsource-variable/noto-sans-jp', family: 'Noto Sans JP', axis: 'wght' },
  ko: { pkg: '@fontsource-variable/noto-sans-kr', family: 'Noto Sans KR', axis: 'wght' },
};

const LATIN = { pkg: '@fontsource-variable/inter', family: 'Inter', axis: 'wght' };

/** `U+0041,U+0100-017f` → a predicate over codepoints. */
function coversAny(ranges, codepoints) {
  for (const part of ranges.split(',')) {
    const m = part.trim().match(/^U\+([0-9a-f]+)(?:-([0-9a-f]+))?$/i);
    if (!m) continue;
    const lo = parseInt(m[1], 16);
    const hi = m[2] ? parseInt(m[2], 16) : lo;
    for (const cp of codepoints) if (cp >= lo && cp <= hi) return true;
  }
  return false;
}

function filesFor(root, spec, codepoints) {
  const dir = resolve(root, 'node_modules', spec.pkg);
  const unicode = JSON.parse(readFileSync(resolve(dir, 'unicode.json'), 'utf8'));
  const stem = spec.pkg.split('/')[1];

  const files = [];
  for (const [subset, ranges] of Object.entries(unicode)) {
    if (!coversAny(ranges, codepoints)) continue;
    // Numeric CJK subsets are keyed "[0]".."[123]" but named "…-0-…" on disk.
    const name = subset.replace(/^\[|\]$/g, '');
    const file = resolve(dir, 'files', `${stem}-${name}-${spec.axis}-normal.woff2`);
    if (existsSync(file)) files.push(file);
  }
  return files;
}

/**
 * @returns {{ files: string[], stack: string }} the font files to register and
 *   the Pango family list to set the text in, most specific family first.
 */
export function fontsForText(root, locale, text) {
  const codepoints = [...text].map((ch) => ch.codePointAt(0));
  const script = SCRIPT_FONTS[locale];

  const files = [];
  let stack = LATIN.family;

  if (script) {
    const scriptFiles = filesFor(root, script, codepoints);
    if (scriptFiles.length === 0) {
      throw new Error(`no ${script.family} subset covers any character of the ${locale} text: ${text}`);
    }
    files.push(...scriptFiles);
    stack = `${script.family}, ${LATIN.family}`;
  }
  files.push(...filesFor(root, LATIN, codepoints));

  if (files.length === 0) throw new Error(`no font file covers the ${locale} text: ${text}`);
  return { files, stack };
}
