import { redirects } from './_generated/redirects.js';

/** Match today's build normalization: decoded path, single trailing slash. */
function normalize(pathname) {
  let clean = pathname;
  try {
    clean = decodeURIComponent(pathname);
  } catch {
    return pathname; // Leave a malformed path alone; it will 404 downstream.
  }
  if (clean !== '/' && !clean.endsWith('/')) clean += '/';
  return clean;
}

export function onRequest(context) {
  const url = new URL(context.request.url);

  // Host canonicalization first, so a redirected path is only ever emitted on
  // the primary hostname.
  if (url.hostname === 'vidonzo.pages.dev') {
    url.protocol = 'https:';
    url.hostname = 'vidonzo.com';
    return Response.redirect(url.toString(), 301);
  }

  // Content redirects compiled from src/content/_data/redirects.json. Chains are
  // already collapsed at build time, so this is a single hop.
  const rule = redirects[normalize(url.pathname)];
  if (rule) {
    return Response.redirect(new URL(rule.to, url).toString(), rule.code);
  }

  return context.next();
}
