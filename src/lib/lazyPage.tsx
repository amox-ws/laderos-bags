import { lazy, type ComponentType } from 'react';

/**
 * React.lazy with a preload() handle.
 *
 * Once preload() has resolved, the page renders synchronously — no Suspense
 * fallback, no blank frame. main.tsx preloads the current route before the
 * first render and the rest while the browser is idle; the build-time
 * prerender preloads everything so renderToString never suspends.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyPage<P extends Record<string, any>>(factory: () => Promise<{ default: ComponentType<P> }>) {
  let Loaded: ComponentType<P> | null = null;
  let pending: Promise<void> | null = null;

  const preload = () =>
    (pending ??= factory().then((m) => {
      Loaded = m.default;
    }));

  const Lazy = lazy(() => preload().then(() => ({ default: Loaded as ComponentType<P> }))) as unknown as ComponentType<P>;

  const Page = (props: P) => (Loaded ? <Loaded {...props} /> : <Lazy {...props} />);
  Page.preload = preload;
  return Page;
}
