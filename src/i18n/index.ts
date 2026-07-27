import type { Locale } from './config';
import type { UiStrings } from './ui/types';
import { en } from './ui/en';
import { fa } from './ui/fa';
import { ar } from './ui/ar';
import { es } from './ui/es';
import { tr } from './ui/tr';
import { fr } from './ui/fr';

export * from './config';
export type { UiStrings } from './ui/types';

export const ui = { en, fa, ar, es, tr, fr } satisfies Record<Locale, UiStrings>;

export function useTranslations(locale: Locale): UiStrings {
  return ui[locale];
}
