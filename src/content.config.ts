import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content lives at `<collection>/<locale>/<slug>.mdx`, so the locale is part of
 * the entry id. Keeping it in the path rather than in frontmatter means a
 * translation cannot silently disagree with the directory it sits in.
 */

const common = {
  title: z.string(),
  description: z.string(),
  /** Set once, when the English original is published. */
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  draft: z.boolean().default(false),
};

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    ...common,
    tags: z.array(z.string()).default([]),
    author: z.string().default('Vidonzo'),
    /**
     * The URL segment for this locale, in its own language/script. Optional:
     * when absent the route falls back to the file name (the key), which is the
     * pre-migration behaviour. See docs/content-engine §4.3 for the slug policy.
     */
    slug: z.string().optional(),
    /** The language this article was authored in first; others transcreate from it. */
    sourceLocale: z.string().optional(),
    /** Per-language research targets. Never emitted as a `<meta keywords>` tag. */
    keywords: z.array(z.string()).default([]),
    /** Featured image for cards, OG/Twitter, and the article header. */
    heroImage: z.string().optional(),
    /** Localized alt text for {@link heroImage}. */
    heroImageAlt: z.string().optional(),
  }),
});

const help = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/help' }),
  schema: z.object({
    ...common,
    /** Groups guides on the help index. */
    category: z.enum(['setup', 'playlists', 'television', 'troubleshooting', 'account']),
    /** Lower sorts first within a category. */
    order: z.number().default(100),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/legal' }),
  schema: z.object({
    ...common,
    /** Which static route renders this document. */
    page: z.enum(['privacy', 'terms', 'accountDeletion']),
  }),
});

export const collections = { blog, help, legal };
