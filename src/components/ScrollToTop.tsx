import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { stripLang } from '@/lib/i18nPaths';
import { scrollToTarget } from '@/lib/scrollToTarget';

/**
 * Resets scroll position on navigation.
 * - Plain page changes jump instantly to the very top (bypassing the global
 *   `scroll-behavior: smooth`, which would otherwise animate the jump).
 * - Real in-page anchors (e.g. /contact#quote) jump to their target and hold
 *   it while the page finishes loading.
 * - The "/#products-section" home link is intentionally treated as "go to top".
 * - Switching language (e.g. /about → /en/about) keeps the scroll position,
 *   just like the old in-place language toggle did.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prev = useRef<{ base: string; hash: string } | null>(null);

  useEffect(() => {
    const base = stripLang(pathname);
    const onlyLanguageChanged = prev.current?.base === base && prev.current?.hash === hash;
    prev.current = { base, hash };
    if (onlyLanguageChanged) return;

    const isRealAnchor = hash && hash !== '#products-section';

    if (isRealAnchor) {
      const id = hash.slice(1);
      let tries = 0;
      let stopped = false;

      // The visitor taking over wins; we stop correcting the moment they move.
      const stop = () => {
        stopped = true;
      };
      const stopEvents = ['wheel', 'touchstart', 'keydown'] as const;
      stopEvents.forEach((e) => window.addEventListener(e, stop, { passive: true }));

      /**
       * Jump straight to the section — no smooth animation.
       *
       * A smooth scroll is aimed at where the target sits *when it starts*, and
       * this page keeps growing underneath it (lazy images, the map, the sticky
       * footer reveal). By the time it arrived, the section had moved and the
       * visitor was left staring at the footer. Jumping instantly and then
       * re-checking as the page settles lands on the form every time.
       */
      const settle = () => {
        if (stopped) return;
        const el = document.getElementById(id);
        if (!el) {
          if (tries++ < 20) window.setTimeout(settle, 60);
          return;
        }
        scrollToTarget(el);
      };

      settle();

      // Every time the page grows — an image decodes, a font swaps, the sticky
      // footer is measured — the target moves, so re-aim at it.
      const observer = new ResizeObserver(settle);
      observer.observe(document.documentElement);
      const timers = [60, 200, 500, 1000].map((ms) => window.setTimeout(settle, ms));
      window.addEventListener('load', settle);
      // Stop correcting once things have settled, so later growth (lazy images
      // further down) never yanks the page out from under the visitor.
      const release = window.setTimeout(stop, 3500);

      return () => {
        stopped = true;
        observer.disconnect();
        timers.forEach((t) => window.clearTimeout(t));
        window.clearTimeout(release);
        stopEvents.forEach((e) => window.removeEventListener(e, stop));
        window.removeEventListener('load', settle);
      };
    }

    // Plain navigation → snap to the top immediately, no animation.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
