import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getLocalizedCollection } from '../i18n/content';
import { defaultLocale, localizedPath, useTranslations } from '../i18n';
import { site } from '../config/site';

/**
 * One feed, in the default language.
 *
 * Per-locale feeds would mostly republish the English originals through the
 * fallback, which is exactly the duplication a feed reader handles worst.
 */
export async function GET(context: APIContext) {
  const t = useTranslations(defaultLocale);
  const posts = (await getLocalizedCollection('blog', defaultLocale))
    .filter((post) => !post.isFallback)
    .sort((a, b) => b.entry.data.publishedAt.getTime() - a.entry.data.publishedAt.getTime());

  return rss({
    title: `${site.name} — ${t.blog.title}`,
    description: t.blog.lead,
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.entry.data.title,
      description: post.entry.data.description,
      pubDate: post.entry.data.publishedAt,
      categories: post.entry.data.tags,
      link: localizedPath(defaultLocale, 'blog', post.slug),
    })),
    customData: `<language>${defaultLocale}</language>`,
  });
}
