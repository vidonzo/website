import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import { defaultLocale, isLocale, localeCodes, type Locale } from './config';

/**
 * Locale-aware access to the content collections.
 *
 * Two identifiers, deliberately separated (see docs/content-engine §4–5):
 *
 * - **key** — the language-neutral identity of a document. It is the file name,
 *   so `blog/en/no-ads.mdx` and `blog/fa/no-ads.mdx` are the same article in two
 *   languages. Grouping, "related", and cross-language pairing all key off this.
 * - **slug** — the URL segment for one locale. It comes from the entry's `slug`
 *   frontmatter and may be written in that language's own script
 *   (`/fa/بدون-تبلیغ/`). When a document has no `slug`, the URL falls back to the
 *   key, which is exactly today's behaviour — so adding the field to the schema
 *   changes no existing route until a slug is actually authored.
 *
 * Translating every article into every language is a standing debt, so a missing
 * translation must degrade rather than 404: the reader gets the source-language
 * original with a notice, and that URL is kept out of the language's hreflang set
 * and marked noindex so search engines are not told a translation exists.
 */

type Localised<C extends CollectionKey> = {
  entry: CollectionEntry<C>;
  /** Language-neutral identity, i.e. the file name with the locale prefix stripped. */
  key: string;
  /** URL segment for the resolved locale (frontmatter `slug`, else the key). */
  slug: string;
  /** True when the reader is being shown the source-language original. */
  isFallback: boolean;
  /** Locales this document is genuinely written in. */
  availableLocales: Locale[];
  /** Every genuinely-written locale mapped to its own URL slug — for hreflang. */
  localeSlugs: Partial<Record<Locale, string>>;
};

function splitId(id: string) {
  const [head, ...rest] = id.split('/');
  return isLocale(head)
    ? { locale: head as Locale, key: rest.join('/') }
    : // An entry outside a locale directory is an authoring mistake, not a
      // reason to crash the build — treat it as the default language.
      { locale: defaultLocale, key: id };
}

/** The URL slug an entry serves under: its own `slug`, or the key as a fallback. */
function slugOf<C extends CollectionKey>(entry: CollectionEntry<C>, key: string): string {
  const declared = (entry.data as { slug?: unknown }).slug;
  return typeof declared === 'string' && declared.length > 0 ? declared : key;
}

async function indexed<C extends CollectionKey>(collection: C) {
  const entries = await getCollection(collection, ({ data }) => {
    return import.meta.env.PROD ? !(data as { draft?: boolean }).draft : true;
  });

  const byKey = new Map<string, Map<Locale, CollectionEntry<C>>>();
  for (const entry of entries) {
    const { locale, key } = splitId(entry.id);
    const group = byKey.get(key) ?? new Map<Locale, CollectionEntry<C>>();
    group.set(locale, entry);
    byKey.set(key, group);
  }
  return byKey;
}

/** Every document in the collection, resolved for one locale. */
export async function getLocalizedCollection<C extends CollectionKey>(
  collection: C,
  locale: Locale,
): Promise<Localised<C>[]> {
  const byKey = await indexed(collection);
  const result: Localised<C>[] = [];

  for (const [key, group] of byKey) {
    const native = group.get(locale);
    const entry = native ?? group.get(defaultLocale);
    if (!entry) continue; // Translated but never written in the source locale.

    const localeSlugs = Object.fromEntries(
      [...group.entries()].map(([loc, e]) => [loc, slugOf(e, key)]),
    ) as Partial<Record<Locale, string>>;

    result.push({
      entry,
      key,
      // A native page serves its own slug; a fallback serves the source slug it
      // is actually rendering, so the URL always matches the content shown.
      slug: slugOf(entry, key),
      isFallback: !native,
      availableLocales: [...group.keys()],
      localeSlugs,
    });
  }

  return result;
}

/** One document, resolved for one locale, addressed by its language-neutral key. */
export async function getLocalizedEntry<C extends CollectionKey>(
  collection: C,
  locale: Locale,
  key: string,
): Promise<Localised<C> | undefined> {
  const all = await getLocalizedCollection(collection, locale);
  return all.find((item) => item.key === key);
}

/** Distinct keys across all locales — the identity set for a collection. */
export async function getCollectionKeys<C extends CollectionKey>(collection: C) {
  return [...(await indexed(collection)).keys()];
}

/**
 * For one document, the URL slug every locale serves it under — native locales
 * their own slug, and (while a locale is still a fallback) the source slug it
 * renders. Callers use it to build the language switcher and hreflang hrefs so
 * that each language points at a URL that genuinely resolves.
 */
export async function getLocaleHrefSlugs<C extends CollectionKey>(
  collection: C,
  key: string,
): Promise<Partial<Record<Locale, string>>> {
  const group = (await indexed(collection)).get(key);
  if (!group) return {};

  const source = group.get(defaultLocale);
  const result: Partial<Record<Locale, string>> = {};
  for (const locale of localeCodes) {
    const entry = group.get(locale) ?? source;
    if (entry) result[locale] = slugOf(entry, key);
  }
  return result;
}
