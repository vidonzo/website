import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://vidonzo.com',
  output: 'static',
  integrations: [
    mdx(),
    // Pages served in a language they were not written in mark themselves
    // noindex; the 404 has nothing to say to a crawler, and /admin is the
    // Access-gated internal dashboard, kept out of the sitemap entirely.
    sitemap({ filter: (page) => !page.includes('/404') && !page.includes('/admin') }),
  ],
});
