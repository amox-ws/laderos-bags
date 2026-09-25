import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { stripLang } from '@/lib/i18nPaths';

/**
 * Resets scroll position on navigation.
 * - Plain page changes jump instantly to the very top (bypassing the global
 *   `scroll-behavior: smooth`, which would otherwise animate the jump).
 * - Real in-page anchors (e.g. /contact#quote) smooth-scroll to their target.
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
      const scrollToEl = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (tries++ < 12) {
          // element may not be mounted yet on a fresh route — retry briefly
          setTimeout(scrollToEl, 60);
        }
      };
      setTimeout(scrollToEl, 60);
      return;
    }

    // Plain navigation → snap to the top immediately, no animation.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
