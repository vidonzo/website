// Reads the locale list out of src/i18n/config.ts.
//
// The list is authored in TypeScript, which plain Node cannot import on every
// version we support, so the tools read the object literal instead of keeping a
// second copy. Adding a language in one place therefore reaches the build tools
// with no second edit — and a typo here fails loudly rather than silently
// dropping a language from a generated artifact.

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** @returns {{ codes: string[], dir: Record<string, 'ltr' | 'rtl'>, defaultLocale: string }} */
export function readLocales(root) {
  const source = readFileSync(resolve(root, 'src/i18n/config.ts'), 'utf8');
  const block = source.match(/export const locales = \{([\s\S]*?)\n\} as const/);
  if (!block) throw new Error('could not find the `locales` object in src/i18n/config.ts');

  const codes = [];
  const dir = {};
  for (const m of block[1].matchAll(/^\s{2}([a-z]{2}(?:-[A-Za-z]+)?):\s*\{[^}]*dir:\s*'(ltr|rtl)'/gm)) {
    codes.push(m[1]);
    dir[m[1]] = m[2];
  }
  if (codes.length === 0) throw new Error('read zero locales from src/i18n/config.ts');

  const defaultLocale = source.match(/export const defaultLocale = '([^']+)'/)?.[1] ?? 'en';
  return { codes, dir, defaultLocale };
}
