/**
 * TEMPORARY — a shared passcode in front of the direct APK links.
 *
 * While the store listings stay unpublished, the APK builds are for testers
 * only, so /download asks for a code before it hands one over. The store links
 * are untouched: Google Play and the App Store are still one click.
 *
 * There is no server and no database. The trick is that the APK URL is never
 * written into the page at all: what ships is the URL XOR-ed with the passcode,
 * and the code the visitor types is the key that reconstructs it. A wrong key
 * yields bytes that fail the prefix check on the other side, so nothing needs
 * to store, hash, or compare the passcode itself.
 *
 * This is a doorway, not a lock — whoever has the code can pass it on, and the
 * key sits in the page for anyone determined enough. It stops the casual
 * visitor and, more to the point, the crawler that would otherwise index a
 * plain `.apk` href.
 *
 * TO REOPEN DOWNLOADS: in src/pages/[...locale]/download.astro give the APK
 * links their plain `href` back and drop <ApkGate />, then delete this file and
 * src/components/ApkGate.astro. The `apkGate*` UI strings in src/i18n/ui/ go
 * with them.
 */

/** The code testers are given. Change it here and nowhere else. */
const passcode = '1000';

/**
 * Sealed into the payload ahead of the URL: a decode that starts with this is
 * a right code, one that does not is a wrong one. A marker rather than the URL
 * prefix, so the page never publishes the host either.
 */
export const apkSealMarker = 'vidonzo-apk:';

/**
 * URL → the string that goes in the markup. Build-time only; the passcode must
 * never reach the browser bundle, which is why the browser's mirror image of
 * this lives inline in ApkGate.astro rather than being imported from here.
 */
export function sealApkUrl(url: string): string {
  const payload = `${apkSealMarker}${url}`;
  const bytes = new Uint8Array(payload.length);
  for (let i = 0; i < payload.length; i += 1) {
    // Download URLs are ASCII, so a char is a byte and no encoder is needed.
    bytes[i] = payload.charCodeAt(i) ^ passcode.charCodeAt(i % passcode.length);
  }
  return btoa(String.fromCharCode(...bytes));
}
