import type { Locale } from './config';
import type { UiStrings } from './ui/types';
import { en } from './ui/en';
import { fa } from './ui/fa';
import { ar } from './ui/ar';
import { es } from './ui/es';
import { tr } from './ui/tr';
import { fr } from './ui/fr';
import { de } from './ui/de';
import { pt } from './ui/pt';
import { ru } from './ui/ru';
import { id } from './ui/id';
import { it } from './ui/it';
import { vi } from './ui/vi';
import { pl } from './ui/pl';
import { nl } from './ui/nl';
import { hi } from './ui/hi';
import { bn } from './ui/bn';
import { th } from './ui/th';
import { ur } from './ui/ur';
import { ja } from './ui/ja';
import { ko } from './ui/ko';

export * from './config';
export type { UiStrings } from './ui/types';

export const ui = {
  en, fa, ar, es, tr, fr,
  de, pt, ru, id, it, vi, pl, nl, hi, bn, th, ur, ja, ko,
} satisfies Record<Locale, UiStrings>;

export function useTranslations(locale: Locale): UiStrings {
  return ui[locale];
}
