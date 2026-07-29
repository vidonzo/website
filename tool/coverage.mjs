#!/usr/bin/env node
// Local translation-coverage report. Scans src/content live, writes a
// self-contained HTML dashboard to tool/.coverage/index.html, and opens it.
//
//   npm run coverage          build the report and open it in the browser
//   npm run coverage -- --no-open   build only, print the path
//   npm run coverage -- --json      print the raw coverage data as JSON
//
// This is an operator tool: it is never bundled into the site. The same data
// feeds the Cloudflare-Access-gated /admin page via tool/lib/coverage.mjs.

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { computeCoverage } from './lib/coverage.mjs';
import { renderCoverage } from './lib/render-coverage.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);

const data = computeCoverage(root);

if (args.includes('--json')) {
  // Dates do not survive JSON; stamp an ISO string instead.
  console.log(JSON.stringify({ ...data, generatedAt: data.generatedAt.toISOString() }, null, 2));
  process.exit(0);
}

const { html } = renderCoverage(data);
const page = `<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>پوشش ترجمه‌ی محتوای ویدونزو</title>
<style>body{margin:0;background:#eef1f3}@media(prefers-color-scheme:dark){body{background:#0e1214}}</style>
</head>
<body>${html}</body>
</html>`;

const outDir = resolve(root, 'tool/.coverage');
mkdirSync(outDir, { recursive: true });
const outPath = resolve(outDir, 'index.html');
writeFileSync(outPath, page);

const s = data.summary;
console.log('coverage: ' + `${s.existing}/${s.total} versions built (${s.coveragePct}%) across ${s.localeCount} locales.`);
if (s.emptyLocales.length) {
  console.log('coverage: ' + `${s.emptyLocales.length} empty locales — ${s.emptyLocales.join(', ')}`);
}
for (const c of data.collections) {
  console.log('coverage: ' + `  ${c.id.padEnd(6)} ${c.stats.existing}/${c.stats.total}` + (c.stats.partial ? `  (${c.stats.partial} incomplete)` : ''));
}
console.log('coverage: wrote ' + outPath);

if (!args.includes('--no-open')) {
  const opener = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
  spawn(opener, [outPath], { stdio: 'ignore', detached: true, shell: process.platform === 'win32' }).unref();
}
