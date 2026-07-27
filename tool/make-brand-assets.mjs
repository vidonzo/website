#!/usr/bin/env node
// Renders the raster brand assets from SVG sources.
//
// The mark itself is authored once, in public/favicon.svg. Everything raster —
// touch icons, the PWA sizes, the Open Graph card — is derived from it here so
// there is no set of PNGs quietly drifting from the vector they came from.
//
// Run after changing the mark: `npm run build:brand`.

import { mkdir, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const markPath = resolve(root, 'public/favicon.svg');
const mark = readFileSync(markPath);

/** Square icons, padded onto the deep-space background so they never sit on white. */
async function icon(size, out, { padding = 0 } = {}) {
  const inner = Math.round(size * (1 - padding * 2));
  const glyph = await sharp(mark).resize(inner, inner).png().toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: padding > 0 ? { r: 10, g: 11, b: 18, alpha: 1 } : { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: glyph, gravity: 'centre' }])
    .png()
    .toFile(resolve(root, out));

  console.log(`brand: ${out} (${size}×${size})`);
}

/**
 * The social card. Rendered from its own SVG rather than composited, so the
 * type is real vector text laid out by the renderer.
 */
async function ogCard() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8b5cff"/><stop offset=".55" stop-color="#ff3d8b"/><stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
    <radialGradient id="glowA" gradientUnits="userSpaceOnUse" cx="170" cy="70" r="620">
      <stop offset="0" stop-color="#8b5cff" stop-opacity=".5"/><stop offset="1" stop-color="#8b5cff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" gradientUnits="userSpaceOnUse" cx="1090" cy="590" r="560">
      <stop offset="0" stop-color="#22d3ee" stop-opacity=".34"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#0a0b12"/>
  <rect width="1200" height="630" fill="url(#glowA)"/>
  <rect width="1200" height="630" fill="url(#glowB)"/>
  <g transform="translate(96 208)">
    <rect width="104" height="104" rx="30" fill="url(#mark)"/>
    <path d="M42 32 71 52 42 72Z" fill="#fff" stroke="#fff" stroke-width="7" stroke-linejoin="round"/>
  </g>
  <text x="228" y="286" fill="#f3f5ff" font-family="Inter, Helvetica, Arial, sans-serif" font-size="76" font-weight="800" letter-spacing="-2">Vidonzo</text>
  <text x="96" y="404" fill="#a8aec7" font-family="Inter, Helvetica, Arial, sans-serif" font-size="38" font-weight="500">A private, cross-platform IPTV player</text>
  <text x="96" y="456" fill="#a8aec7" font-family="Inter, Helvetica, Arial, sans-serif" font-size="38" font-weight="500">for Xtream and M3U playlists.</text>
  <rect x="96" y="518" width="188" height="6" rx="3" fill="url(#mark)"/>
</svg>`;

  await mkdir(resolve(root, 'public/og'), { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(resolve(root, 'public/og/default.png'));
  console.log('brand: public/og/default.png (1200×630)');
}

await icon(32, 'public/favicon-32.png');
await icon(180, 'public/apple-touch-icon.png', { padding: 0.08 });
await icon(192, 'public/icon-192.png');
await icon(512, 'public/icon-512.png');
await ogCard();

// A minimal manifest so an installed shortcut gets the mark and the dark chrome.
await writeFile(
  resolve(root, 'public/site.webmanifest'),
  `${JSON.stringify(
    {
      name: 'Vidonzo',
      short_name: 'Vidonzo',
      start_url: '/',
      display: 'standalone',
      background_color: '#0a0b12',
      theme_color: '#0a0b12',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      ],
    },
    null,
    2,
  )}\n`,
);
console.log('brand: public/site.webmanifest');
