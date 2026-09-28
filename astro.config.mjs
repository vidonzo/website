import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { fileURLToPath } from 'node:url';
import { blogLastModified } from './tool/lib/sitemap-dates.mjs';

const lastModified = blogLastModified(fileURLToPath(new URL('.', import.meta.url)), 'https://vidonzo.com');

export default defineConfig({
  site: 'https://vidonzo.com',
  output: 'static',
  integrations: [
    mdx(),
    // Pages served in a language they were not written in mark themselves
    // noindex; the 404 has nothing to say to a crawler, and /admin is the
    // Access-gated internal dashboard, kept out of the sitemap entirely.
    // Articles carry <lastmod> so a revised one is recrawled first.
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/admin'),
      serialize: (item) => {
        const lastmod = lastModified.get(item.url);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
});
