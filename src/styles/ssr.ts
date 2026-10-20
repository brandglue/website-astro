import type { ServerStyleSheet } from 'styled-components';

// Shared between src/middleware.ts (server-only, owns the AsyncLocalStorage) and
// SiteShell (bundled for the browser too, so it can't import node:async_hooks).
export const SC_SSR_STORE_KEY = '__brandglueScSsrStore';

/** The current render's ServerStyleSheet, or undefined in the browser. */
export const getServerStyleSheet = (): ServerStyleSheet | undefined => {
  if (typeof window !== 'undefined') return undefined;
  const store = (globalThis as Record<string, unknown>)[SC_SSR_STORE_KEY] as
    | { getStore(): ServerStyleSheet | undefined }
    | undefined;
  return store?.getStore();
};
