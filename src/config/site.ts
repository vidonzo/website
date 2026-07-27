/** Everything that points somewhere outside the source tree, in one place. */

export const site = {
  url: 'https://vidonzo.com',
  name: 'Vidonzo',
  email: 'support@vidonzo.com',
  /** Kept in step with the app's own launch year for the footer notice. */
  foundedYear: 2025,
} as const;

export const storeLinks = {
  googlePlay: 'https://play.google.com/store/apps/details?id=com.vidonzo.player',
  appStore: 'https://apps.apple.com/app/id6792184222',
  androidMobileApk: 'https://dl.vidonzo.com/vidonzo-android-mobile-latest.apk',
  androidTvApk: 'https://dl.vidonzo.com/vidonzo-android-tv-universal-latest.apk',
} as const;

export const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/vidonzo' },
  { label: 'YouTube', href: 'https://youtube.com/@vidonzo' },
  { label: 'Telegram', href: 'https://t.me/vidonzo' },
  { label: 'GitHub', href: 'https://github.com/vidonzo' },
  { label: 'X', href: 'https://x.com/vidonzo' },
  { label: 'TikTok', href: 'https://tiktok.com/@vidonzo' },
  { label: 'Facebook', href: 'https://facebook.com/vidonzo' },
] as const;
