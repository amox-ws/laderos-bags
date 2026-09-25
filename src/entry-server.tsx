/**
 * Build-time render entry (used only by scripts/prerender.mjs, never shipped
 * to the browser). Renders a route to static HTML so crawlers — including AI
 * crawlers that don't run JavaScript — get the full page: text, images, FAQ
 * and JSON-LD.
 */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import type { HelmetServerState } from 'react-helmet-async';
import { AppProviders, AppRoutes, ROUTES } from './App';

/** Load every page up front so rendering never suspends. */
export const preloadAll = () => Promise.all(ROUTES.map((r) => r.page.preload()));

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <AppProviders helmetContext={helmetContext}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>
  );
  return { html, helmet: helmetContext.helmet };
}
