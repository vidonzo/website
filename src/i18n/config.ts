export const defaultLocale = 'en';

export const locales = {
  en: { label: 'English', endonym: 'English', dir: 'ltr', path: '', htmlLang: 'en' },
  fa: { label: 'Persian', endonym: 'فارسی', dir: 'rtl', path: 'fa', htmlLang: 'fa' },
  ar: { label: 'Arabic', endonym: 'العربية', dir: 'rtl', path: 'ar', htmlLang: 'ar' },
  es: { label: 'Spanish', endonym: 'Español', dir: 'ltr', path: 'es', htmlLang: 'es' },
  tr: { label: 'Turkish', endonym: 'Türkçe', dir: 'ltr', path: 'tr', htmlLang: 'tr' },
  fr: { label: 'French', endonym: 'Français', dir: 'ltr', path: 'fr', htmlLang: 'fr' },
} as const satisfies Record<string, { label: string; endonym: string; dir: 'ltr' | 'rtl'; path: string; htmlLang: string }>;

export type Locale = keyof typeof locales;

export const localeCodes = Object.keys(locales) as Locale[];

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && value in locales;
}

/** Static routes, i.e. everything that is not driven by a content collection. */
export type PageKey =
  | 'home'
  | 'features'
  | 'download'
  | 'blog'
  | 'help'
  | 'support'
  | 'privacy'
  | 'terms'
  | 'accountDeletion';

export const pagePaths: Record<PageKey, string> = {
  home: '',
  features: 'features',
  download: 'download',
  blog: 'blog',
  help: 'help',
  support: 'support',
  privacy: 'privacy',
  terms: 'terms',
  accountDeletion: 'account-deletion',
};

export const navKeys = ['features', 'download', 'blog', 'help', 'support'] as const satisfies readonly PageKey[];

export const footerLegalKeys = ['privacy', 'terms', 'accountDeletion'] as const satisfies readonly PageKey[];

/**
 * Builds a site path for a locale.
 *
 * The default locale lives at the root — `/download/`, not `/en/download/` —
 * which is what the existing URLs and the store listings already point at.
 */
export function localizedPath(locale: Locale, page: PageKey = 'home', ...rest: string[]) {
  const parts = [locales[locale].path, pagePaths[page], ...rest].filter(Boolean);
  return `/${parts.join('/')}${parts.length ? '/' : ''}`;
}

/** Splits a catch-all slug into its locale and the remaining segments. */
export function parseRoute(slug: string[] = []) {
  const first = slug[0];
  const locale = isLocale(first) ? first : defaultLocale;
  const rest = isLocale(first) ? slug.slice(1) : slug;
  return { locale, segments: rest };
}

export function pageFromSegments(segments: string[]): PageKey | undefined {
  const path = segments.join('/');
  return (Object.keys(pagePaths) as PageKey[]).find((key) => pagePaths[key] === path);
}
