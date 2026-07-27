import type { ImageMetadata } from 'astro';
import type { Locale } from '../i18n';

import liveEn from '../assets/app/live-en.webp';
import liveFa from '../assets/app/live-fa.webp';
import homeEn from '../assets/app/home-en.webp';
import settingsEn from '../assets/app/settings-en.webp';
import languageFa from '../assets/app/language-fa.webp';

/**
 * Real captures from the app running on an iPhone simulator, not mockups.
 *
 * Persian has its own set because the app mirrors fully in right-to-left, and
 * showing a left-to-right capture on the Persian page would undersell the one
 * thing that page's readers most want to see. Arabic still gets the English
 * capture for now — an Arabic reader is better served by an honest English
 * screenshot than by a Persian one.
 */
export function heroShot(locale: Locale): ImageMetadata {
  return locale === 'fa' ? liveFa : liveEn;
}

export const appShots = {
  home: homeEn,
  settings: settingsEn,
  language: languageFa,
} satisfies Record<string, ImageMetadata>;
