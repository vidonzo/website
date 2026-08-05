/**
 * TEMPORARY — a shared passcode in front of the direct APK links.
 *
 * While the store listings stay unpublished, the APK builds are for testers
 * only, so /download asks for a code before it hands one over. The store links
 * are untouched: Google Play and the App Store are still one click.
 *
 * There is no server and no database. The APK URL is never written into the
 * page at all: what ships is the URL encrypted with a key derived from the
 * passcode, and the code the visitor types is what derives that key back. So
 * nothing has to store, hash, or compare the passcode itself — a wrong code
 * derives a wrong key and AES-GCM refuses to decrypt.
 *
 * Why a KDF and not something simpler: with a plain XOR, any known plaintext in
 * the payload — a marker, or just `https://` — hands the key straight back to
 * whoever XORs it against the ciphertext. Here the only way back to the code is
 * to guess it, and every guess has to pay for `apkGateIterations` rounds of
 * PBKDF2 before AES-GCM will even say no.
 *
 * It is still a doorway rather than a lock, and four digits is a small space:
 * at the setting below, grinding all ten thousand of them costs something like
 * half an hour on one core, less on a machine with cores to spare. Everything
 * needed to try is in the page. What this buys is that the code cannot simply
 * be read off the page, the casual visitor is stopped, and the crawler never
 * sees a fetchable `.apk` href. Anything stronger has to live on
 * dl.vidonzo.com itself.
 *
 * TO REOPEN DOWNLOADS: in src/pages/[...locale]/download.astro give the APK
 * links their plain `href` back and drop <ApkGate />, then delete this file and
 * src/components/ApkGate.astro. The `apkGate*` UI strings in src/i18n/ui/ go
 * with them.
 */

/** The code testers are given. Change it here and nowhere else. */
const passcode = '1000';

/**
 * PBKDF2 rounds, published to the browser because it needs them to derive the
 * same key. Well above OWASP's floor, because the passcode is four digits and
 * the per-guess cost is the only thing standing in for its missing entropy.
 * Measured at ~0.14s on a laptop, so roughly half a second on an older phone —
 * one wait per visit for a tester, ten thousand of them for anyone guessing.
 */
export const apkGateIterations = 2_000_000;

/**
 * Fixed, because the key is derived once per build and reused for both links.
 * A salt only has to be unique per key, and this one is not protecting a
 * password store — it is here so the derivation matches on the other side.
 */
const salt = new TextEncoder().encode('vidonzo-apk-gate-v1');

const encoder = new TextEncoder();

/** Derived once per build; each sealed URL then costs only its AES pass. */
let keyPromise: Promise<CryptoKey> | undefined;

function sealingKey(): Promise<CryptoKey> {
  keyPromise ??= crypto.subtle
    .importKey('raw', encoder.encode(passcode), 'PBKDF2', false, ['deriveKey'])
    .then((material) =>
      crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: apkGateIterations, hash: 'SHA-256' },
        material,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt'],
      ),
    );
  return keyPromise;
}

/**
 * URL → the string that goes in the markup: a random nonce followed by the
 * ciphertext, base64-encoded. Build-time only. The passcode must never reach
 * the browser bundle, which is why the browser's half of this lives inline in
 * ApkGate.astro rather than being imported from here.
 */
export async function sealApkUrl(url: string): Promise<string> {
  // Fresh per call: reusing a nonce under one AES-GCM key would leak the XOR of
  // the two URLs to anyone who noticed, no passcode needed.
  const nonce = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv: nonce }, await sealingKey(), encoder.encode(url)),
  );

  const sealed = new Uint8Array(nonce.length + ciphertext.length);
  sealed.set(nonce);
  sealed.set(ciphertext, nonce.length);
  return btoa(String.fromCharCode(...sealed));
}
