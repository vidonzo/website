// Last-modified dates for the sitemap, read from blog frontmatter.
//
// A sitemap entry without <lastmod> tells a crawler nothing about which of a
// thousand URLs changed, so an edited article waits for its turn in the normal
// recrawl. With it, the article that was just corrected is the one that gets
// fetched. The date is the reader-facing one — `updatedAt` when the article had
// a substantive revision, otherwise `publishedAt` — never the file's mtime,
// which a mechanical edit would move without anything having changed for a
// reader.
//
// Only native variants are listed: a fallback page is noindex and filtered out
// of the sitemap, so a date for it would describe a URL that is not there.

import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { parseFrontmatter } from './frontmatter.mjs';
import { readLocales } from './locales.mjs';

/** @returns {Map<string, string>} absolute page URL → ISO date */
export function blogLastModified(root, siteUrl) {
  const { codes, defaultLocale } = readLocales(root);
  const blogDir = resolve(root, 'src/content/blog');
  const dates = new Map();

  for (const locale of codes) {
    let files;
    try {
      files = readdirSync(join(blogDir, locale)).filter((file) => file.endsWith('.mdx'));
    } catch {
      continue;
    }
    for (const file of files) {
      const data = parseFrontmatter(readFileSync(join(blogDir, locale, file), 'utf8'), (message) => {
        throw new Error(`${locale}/${file}: ${message}`);
      });
      if (!data || data.draft === 'true') continue;
      const date = data.updatedAt || data.publishedAt;
      if (!date) continue;
      const slug = data.urlSlug || file.replace(/\.mdx$/, '');
      const prefix = locale === defaultLocale ? '' : `/${locale}`;
      const url = new URL(`${prefix}/blog/${slug}/`, siteUrl).href;
      dates.set(url, new Date(date).toISOString());
    }
  }
  return dates;
}
