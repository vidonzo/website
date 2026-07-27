import { localeCodes, locales, type Locale } from './config';

/**
 * getStaticPaths entries for a page that exists in every locale.
 *
 * The default locale's `path` is empty, and an empty rest parameter must be
 * `undefined` rather than `''` for Astro to emit `/page/` instead of `//page/`.
 */
export function localeRoutes() {
  return localeCodes.map((code) => ({
    params: { locale: locales[code].path || undefined },
    props: { locale: code },
  }));
}

export type LocaleRouteProps = { locale: Locale };
