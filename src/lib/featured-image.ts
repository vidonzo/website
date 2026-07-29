import type { Locale } from '../i18n';

/**
 * Where an article's featured imagery lives, per language.
 *
 * `tool/build-featured-images.mjs` renders two files per (article, locale):
 *
 * - **`social`** — the 1200×630 card with the title set on it, for `og:image`
 *   and `twitter:image`. PNG, because scrapers are inconsistent about WebP.
 * - **`cover`** — the same brand background without the title, for the blog card
 *   and the article header. Those already show the headline as real text; the
 *   picture repeating it would be a second headline in a worse reading order.
 *
 * The paths are derived rather than stored, so three hundred articles do not
 * each need a generated line of frontmatter kept in step with the generator.
 * `heroImage` in frontmatter overrides both, for the day an article earns a real
 * photograph or a hand-drawn diagram instead of the generated card.
 */
export function featuredImage(locale: Locale, key: string, heroImage?: string) {
  if (heroImage) return { social: heroImage, cover: heroImage };
  const base = `/og/blog/${locale}/${key}`;
  return { social: `${base}.png`, cover: `${base}-cover.webp` };
}
