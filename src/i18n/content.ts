import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import { defaultLocale, isLocale, type Locale } from './config';

/**
 * Locale-aware access to the content collections.
 *
 * Translating every article into six languages is a standing debt, so a missing
 * translation must degrade rather than 404: the reader gets the English
 * original with a notice, and that URL is kept out of the language's hreflang
 * set and marked noindex so search engines are not told a translation exists.
 */

type Localised<C extends CollectionKey> = {
  entry: CollectionEntry<C>;
  /** Path segment, with the locale prefix stripped from the entry id. */
  slug: string;
  /** True when the reader is being shown the default-locale original. */
  isFallback: boolean;
  /** Locales this document is genuinely written in. */
  availableLocales: Locale[];
};

function splitId(id: string) {
  const [head, ...rest] = id.split('/');
  return isLocale(head)
    ? { locale: head as Locale, slug: rest.join('/') }
    : // An entry outside a locale directory is a authoring mistake, not a
      // reason to crash the build — treat it as the default language.
      { locale: defaultLocale, slug: id };
}

async function indexed<C extends CollectionKey>(collection: C) {
  const entries = await getCollection(collection, ({ data }) => {
    return import.meta.env.PROD ? !(data as { draft?: boolean }).draft : true;
  });

  const bySlug = new Map<string, Map<Locale, CollectionEntry<C>>>();
  for (const entry of entries) {
    const { locale, slug } = splitId(entry.id);
    const group = bySlug.get(slug) ?? new Map<Locale, CollectionEntry<C>>();
    group.set(locale, entry);
    bySlug.set(slug, group);
  }
  return bySlug;
}

/** Every document in the collection, resolved for one locale. */
export async function getLocalizedCollection<C extends CollectionKey>(
  collection: C,
  locale: Locale,
): Promise<Localised<C>[]> {
  const bySlug = await indexed(collection);
  const result: Localised<C>[] = [];

  for (const [slug, group] of bySlug) {
    const entry = group.get(locale) ?? group.get(defaultLocale);
    if (!entry) continue; // Translated but never written in the default locale.
    result.push({
      entry,
      slug,
      isFallback: !group.has(locale),
      availableLocales: [...group.keys()],
    });
  }

  return result;
}

export async function getLocalizedEntry<C extends CollectionKey>(
  collection: C,
  locale: Locale,
  slug: string,
): Promise<Localised<C> | undefined> {
  const all = await getLocalizedCollection(collection, locale);
  return all.find((item) => item.slug === slug);
}

/** Distinct slugs across all locales — the route set for a collection. */
export async function getCollectionSlugs<C extends CollectionKey>(collection: C) {
  return [...(await indexed(collection)).keys()];
}
