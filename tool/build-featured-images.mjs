#!/usr/bin/env node
// Renders one featured image per (article, locale).
//
// Every article needs a picture: for the blog card, for the top of the article,
// and — the one that actually matters — for the Open Graph card a link unfurls
// into on WhatsApp, Telegram, X and Slack. Twenty languages times fifteen
// articles is three hundred of them, so they are generated, not designed.
//
// Locked decision 3 in docs/content-engine §12 says how: a **text-free**
// brand background, and a text layer *we* render. Handing a headline to an
// image model and hoping it spells Persian correctly is not a plan; Nastaliq
// Urdu and Devanagari conjuncts are exactly where that fails, and it fails
// silently. So the background is composed from the brand palette and the title
// is set by Pango — which does real bidi reordering, real Arabic joining, and
// real Indic reordering — from the same webfonts the site itself serves.
//
// Layout guarantees, checked by construction rather than by eye:
//
//   - 1200×630, the size every social platform crops from;
//   - a 96px safe margin on every side, so nothing is clipped by a rounded
//     preview card or a 1:1 crop;
//   - the title is auto-fitted: the largest size from a fixed ladder whose
//     rendered raster fits the text box. A long Bengali headline shrinks; it
//     never overflows and never gets cut in half;
//   - right-to-left locales mirror the whole composition, so Persian, Arabic and
//     Urdu read from the correct corner.
//
// Two files come out of each article, because the two jobs are different:
//
//   <locale>/<key>.png         the social card — title set over the background,
//                              1200×630 PNG because scrapers are inconsistent
//                              about WebP. This is og:image and twitter:image.
//   <locale>/<key>-cover.webp  the same background *without* the title, for the
//                              blog card and the article header. Those places
//                              already show the headline as selectable text;
//                              printing it again inside the picture would be a
//                              duplicate headline and a worse reading order.
//
// The directory is generated, so it is git-ignored and rebuilt by `npm run
// build`. A manifest of content hashes keeps a rebuild that changed one title
// from re-rendering the other 299 images.
//
// Environment note: font *selection* goes through fontconfig, which is fully
// configured on the Linux builders that produce what ships. A developer machine
// with system fonts installed may substitute a different face for the Latin run;
// the layout, the wrapping and the script fonts are identical either way.

import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

import { parseFrontmatter } from './lib/frontmatter.mjs';
import { readLocales } from './lib/locales.mjs';
import { fontCacheDir, fontsForText } from './lib/fonts.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const blogDir = resolve(root, 'src/content/blog');
const outDir = resolve(root, 'public/og/blog');
const manifestPath = join(outDir, 'manifest.json');

// Bump when the composition changes, so every image regenerates.
const LAYOUT_VERSION = 1;

const WIDTH = 1200;
const HEIGHT = 630;
const MARGIN = 96;
const BOX = WIDTH - MARGIN * 2; // 1008
const BRAND_TOP = 72;
const BRAND_HEIGHT = 64;
const RULE_HEIGHT = 6;
const RULE_TOP = HEIGHT - 72 - RULE_HEIGHT;
const TITLE_BOTTOM = RULE_TOP - 44;
const TITLE_MAX = TITLE_BOTTOM - (BRAND_TOP + BRAND_HEIGHT + 36);
const SIZES = [66, 60, 54, 48, 43, 38, 34];

const INK = '#F3F5FF';

// libvips initialises Pango on first use, and fontconfig reads both its
// configuration and its font directories at that moment. So the faces have to be
// on disk and the config written *before* sharp is imported — not after, and not
// lazily as each image needs one.
let sharp;
async function startRenderer() {
  process.env.FONTCONFIG_FILE = await writeFontConfig();
  sharp = (await import('sharp')).default;
  sharp.cache(false);
}

/**
 * Point fontconfig at the decompressed faces and nothing else. On a CI runner
 * there are no system fonts to find; on a developer machine there are hundreds,
 * and letting one of those satisfy a family name is how a card ends up looking
 * different in the two places.
 */
async function writeFontConfig() {
  const dir = fontCacheDir(root);
  const path = join(dir, 'fonts.conf');
  await writeFile(
    path,
    `<?xml version="1.0"?>\n<!DOCTYPE fontconfig SYSTEM "fonts.dtd">\n<fontconfig>\n  <dir>${dir}</dir>\n  <cachedir>${dir}</cachedir>\n</fontconfig>\n`,
  );
  return path;
}

// --------------------------------------------------------------- background ---

/** A stable 32-bit hash, so an article's background is the same on every build. */
function hash32(text) {
  const digest = createHash('sha256').update(text).digest();
  return digest.readUInt32BE(0);
}

const GLOWS = ['#8b5cff', '#ff3d8b', '#22d3ee'];

/**
 * The brand aurora, varied per article but never random: two radial glows whose
 * colours and corners come from the article key. Deliberately text-free — the
 * words are a separate layer (§6.4).
 */
function background(key, rtl) {
  const seed = hash32(key);
  const a = GLOWS[seed % 3];
  const b = GLOWS[(seed >> 3) % 3 === seed % 3 ? (seed % 3 === 2 ? 0 : (seed % 3) + 1) : (seed >> 3) % 3];
  const swing = (seed >> 6) % 5;
  const ax = rtl ? WIDTH - (120 + swing * 60) : 120 + swing * 60;
  const bx = rtl ? 180 + swing * 40 : WIDTH - (180 + swing * 40);

  const markX = rtl ? WIDTH - MARGIN - BRAND_HEIGHT : MARGIN;
  const wordX = rtl ? WIDTH - MARGIN - BRAND_HEIGHT - 20 : MARGIN + BRAND_HEIGHT + 20;
  const ruleX = rtl ? WIDTH - MARGIN - 188 : MARGIN;

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <!-- social card background -->
  <defs>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8b5cff"/><stop offset=".55" stop-color="#ff3d8b"/><stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
    <radialGradient id="a" gradientUnits="userSpaceOnUse" cx="${ax}" cy="40" r="640">
      <stop offset="0" stop-color="${a}" stop-opacity=".46"/><stop offset="1" stop-color="${a}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="b" gradientUnits="userSpaceOnUse" cx="${bx}" cy="${HEIGHT - 20}" r="600">
      <stop offset="0" stop-color="${b}" stop-opacity=".32"/><stop offset="1" stop-color="${b}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0a0b12"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#a)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#b)"/>
  <g transform="translate(${markX} ${BRAND_TOP})">
    <rect width="${BRAND_HEIGHT}" height="${BRAND_HEIGHT}" rx="19" fill="url(#mark)"/>
    <path d="M26 20 44 32 26 44Z" fill="#fff" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>
  </g>
  <text x="${wordX}" y="${BRAND_TOP + 44}" ${rtl ? 'text-anchor="end" ' : ''}fill="${INK}" font-family="Inter, Helvetica, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="-.6">Vidonzo</text>
  <rect x="${ruleX}" y="${RULE_TOP}" width="188" height="${RULE_HEIGHT}" rx="3" fill="url(#mark)"/>
</svg>`);
}

/**
 * The on-page cover. Same seed, same two brand colours, so a card and the social
 * card an article unfurls into are visibly the same article — but composed to be
 * read at 300px wide against a dark page rather than at 1200px in a chat client.
 * That means brighter glows, no mark, and no rule: at card size the mark is
 * illegible and the rule is a hairline, and the site chrome shows the logo two
 * hundred pixels away regardless.
 */
function cover(key, rtl) {
  const seed = hash32(key);
  const a = GLOWS[seed % 3];
  const b = GLOWS[(seed >> 3) % 3 === seed % 3 ? (seed % 3 === 2 ? 0 : (seed % 3) + 1) : (seed >> 3) % 3];
  const swing = (seed >> 6) % 5;
  const ax = rtl ? WIDTH - (170 + swing * 90) : 170 + swing * 90;
  const bx = rtl ? 220 + swing * 70 : WIDTH - (220 + swing * 70);

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <radialGradient id="a" gradientUnits="userSpaceOnUse" cx="${ax}" cy="120" r="700">
      <stop offset="0" stop-color="${a}" stop-opacity=".92"/><stop offset="1" stop-color="${a}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="b" gradientUnits="userSpaceOnUse" cx="${bx}" cy="${HEIGHT - 60}" r="660">
      <stop offset="0" stop-color="${b}" stop-opacity=".7"/><stop offset="1" stop-color="${b}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#12141f"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#a)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#b)"/>
</svg>`);
}

// --------------------------------------------------------------- text layer ---

const escapeXml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Registers a font file with the process's fontconfig. libvips exposes this only
 * as a side effect of setting text, and it takes one file per call — so each
 * needed subset is paid for with one throwaway render before the real one. The
 * text has to be a real glyph; libvips rejects an empty or blank string.
 */
const registered = new Set();
async function registerFont(file) {
  if (registered.has(file)) return;
  await sharp({ text: { text: 'x', font: 'sans 8', fontfile: file, rgba: true } }).png().toBuffer();
  registered.add(file);
}

/**
 * Sets the title at the largest size on the ladder whose rendered raster fits
 * the text box. Returns the raster plus its measured size, so the caller can
 * place it exactly rather than trusting a gravity.
 */
async function titleLayer(title, locale, rtl, { files, stack }) {
  for (const file of files) await registerFont(file);

  const markup = `<span foreground="${INK}">${escapeXml(title)}</span>`;
  let last;
  for (const size of SIZES) {
    const rendered = await sharp({
      text: {
        text: markup,
        font: `${stack} ${size}`,
        width: BOX,
        align: rtl ? 'high' : 'low',
        wrap: 'word',
        rgba: true,
        // Nastaliq is written on a steep diagonal baseline, so its ascenders and
        // descenders reach much further than a Latin line box suggests. It needs
        // roughly double the leading before two lines stop colliding.
        spacing: Math.round(size * (locale === 'ur' ? 0.62 : 0.28)),
      },
    })
      .png()
      .toBuffer({ resolveWithObject: true });
    last = rendered;
    if (rendered.info.height <= TITLE_MAX && rendered.info.width <= BOX) break;
  }
  // The smallest size on the ladder is the floor; a title that still does not
  // fit is an authoring problem, not something to silently clip.
  if (last.info.height > TITLE_MAX) {
    throw new Error(`title does not fit at the smallest size (${locale}): ${title}`);
  }
  // A font that failed to load does not raise — Pango substitutes and carries on,
  // and the result is a card that looks fine in a log and is empty on a phone. So
  // measure the ink: a real headline covers a few per cent of its box, and an
  // empty raster covers none of it.
  const { channels } = await sharp(last.data).stats();
  const coverage = channels.at(-1).mean / 255;
  if (coverage < 0.01) {
    throw new Error(`the title layer for ${locale} rendered almost no ink — check the fonts for this script`);
  }
  return last;
}

// ----------------------------------------------------------------- scanning ---

const { codes: localeCodes, dir: localeDir } = readLocales(root);

async function articles() {
  const found = [];
  for (const locale of await readdir(blogDir)) {
    if (!localeCodes.includes(locale)) continue;
    for (const file of await readdir(join(blogDir, locale))) {
      if (!file.endsWith('.mdx')) continue;
      const key = file.slice(0, -4);
      const problems = [];
      const data = parseFrontmatter(await readFile(join(blogDir, locale, file), 'utf8'), (m) => problems.push(m));
      if (!data) {
        console.error(`build-featured-images: ${locale}/${file}: ${problems.join('; ')}`);
        process.exitCode = 1;
        continue;
      }
      found.push({ locale, key, title: String(data.title ?? '') });
    }
  }
  return found.sort((a, b) => a.locale.localeCompare(b.locale) || a.key.localeCompare(b.key));
}

// ----------------------------------------------------------------- rendering ---

async function render(item, fonts) {
  const rtl = localeDir[item.locale] === 'rtl';
  const canvas = background(item.key, rtl);
  const title = await titleLayer(item.title, item.locale, rtl, fonts);

  const left = rtl ? WIDTH - MARGIN - title.info.width : MARGIN;
  const top = TITLE_BOTTOM - title.info.height;

  const dir = join(outDir, item.locale);
  await mkdir(dir, { recursive: true });

  await sharp(canvas)
    .composite([{ input: title.data, left: Math.max(0, Math.round(left)), top: Math.max(0, Math.round(top)) }])
    .png({ compressionLevel: 9, palette: false })
    .toFile(join(dir, `${item.key}.png`));

  await sharp(cover(item.key, rtl)).webp({ quality: 82 }).toFile(join(dir, `${item.key}-cover.webp`));
}

const items = await articles();
if (process.exitCode) process.exit(1);

let manifest = {};
if (existsSync(manifestPath)) {
  try {
    manifest = JSON.parse(await readFile(manifestPath, 'utf8')).images ?? {};
  } catch {
    /* an unreadable manifest just means a full rebuild */
  }
}

const next = {};
const stale = [];
for (const item of items) {
  const id = `${item.locale}/${item.key}`;
  const stamp = createHash('sha256')
    .update(`${LAYOUT_VERSION} ${item.locale} ${item.key} ${item.title}`)
    .digest('hex')
    .slice(0, 16);
  next[id] = stamp;
  const png = join(outDir, item.locale, `${item.key}.png`);
  const cover = join(outDir, item.locale, `${item.key}-cover.webp`);
  if (manifest[id] === stamp && existsSync(png) && existsSync(cover)) continue;
  stale.push(item);
}

// Decompress every face this run needs before the renderer starts: fontconfig
// indexes the directory once, at initialisation, and will not notice a file that
// appears afterwards.
const fonts = new Map();
for (const item of stale) {
  fonts.set(`${item.locale}/${item.key}`, await fontsForText(root, item.locale, item.title));
}

if (stale.length > 0) {
  await startRenderer();
  for (const item of stale) await render(item, fonts.get(`${item.locale}/${item.key}`));
}

await mkdir(outDir, { recursive: true });
await writeFile(
  manifestPath,
  `${JSON.stringify(
    { version: LAYOUT_VERSION, images: Object.fromEntries(Object.entries(next).sort(([a], [b]) => (a < b ? -1 : 1))) },
    null,
    2,
  )}\n`,
);

console.log(
  `build-featured-images: ${items.length} image(s) for ${new Set(items.map((i) => i.key)).size} article(s) — ` +
    `${stale.length} rendered, ${items.length - stale.length} reused`,
);
