export function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname === 'vidonzo.pages.dev') {
    url.protocol = 'https:';
    url.hostname = 'vidonzo.com';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
