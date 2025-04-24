import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = new URL(context.request.url);

  if (url.hostname === 'sergiopinzon.dev') {
    url.hostname = 'www.sergiopinzon.dev';
    return Response.redirect(url.toString(), 301);
  }

  return next();
};
