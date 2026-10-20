import { AsyncLocalStorage } from 'node:async_hooks';
import { defineMiddleware } from 'astro:middleware';
import { ServerStyleSheet } from 'styled-components';

import { SC_SSR_STORE_KEY } from '@styles/ssr';

/**
 * Server-render styled-components CSS into each page's <head>.
 *
 * Without this, SC styles only exist once a React island hydrates. On a full page
 * load that's hidden by the html.no-js visibility rule, but on View Transitions
 * navigations the new page is swapped in before its island hydrates (100-300ms on
 * Netlify), so components rendered for the first time showed up unstyled.
 *
 * Each render gets its own ServerStyleSheet (via AsyncLocalStorage so concurrent
 * renders can't mix). SiteShell picks it up server-side and passes it to its
 * StyleSheetManager; we then inject the collected CSS before </head>. The tag is
 * deliberately not `data-styled` so SC's client runtime ignores it — the client
 * inserts the same rules into its own tag on hydration, which is harmless.
 */
const store = new AsyncLocalStorage<ServerStyleSheet>();
(globalThis as Record<string, unknown>)[SC_SSR_STORE_KEY] = store;

export const onRequest = defineMiddleware(async (_context, next) => {
  const sheet = new ServerStyleSheet();
  try {
    return await store.run(sheet, async () => {
      const response = await next();
      if (!response.headers.get('content-type')?.includes('text/html')) {
        return response;
      }
      // Consume the body inside run() so the island renders see this sheet.
      const html = await response.text();
      const css = sheet.instance.toString();
      const body = css
        ? html.replace('</head>', `<style data-sc-ssr>${css}</style></head>`)
        : html;
      return new Response(body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    });
  } finally {
    sheet.seal();
  }
});
