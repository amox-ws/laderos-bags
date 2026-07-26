import { ReactNode, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieConsentBanner from '@/components/CookieConsentBanner';

interface LayoutProps {
  children: ReactNode;
}

/** How far (as % of its height) the footer starts shifted down. */
const REVEAL_SHIFT = 38;

/**
 * Layout with a scroll-linked footer reveal: the footer lives in the normal
 * document flow (so the page always scrolls far enough for it to fully show),
 * but its content starts shifted downwards and slides up in sync with the
 * scroll — it gradually appears top-first, in motion, and reaches its natural
 * position exactly at the end of the page.
 */
const Layout = ({ children }: LayoutProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const wrap = wrapRef.current;
      const inner = innerRef.current;
      if (!wrap || !inner) return;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const h = rect.height || 1;
      // 0 → footer top just entered the viewport bottom
      // 1 → footer bottom aligned with viewport bottom (end of page)
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / h));
      inner.style.transform = `translateY(${((1 - progress) * REVEAL_SHIFT).toFixed(3)}%)`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>

      {/* Footer reveal — slides up into place as you scroll */}
      <div ref={wrapRef} className="relative overflow-hidden" style={{ backgroundColor: 'hsl(220 55% 6%)' }}>
        <div ref={innerRef} style={{ transform: `translateY(${REVEAL_SHIFT}%)`, willChange: 'transform' }}>
          <Footer />
        </div>
      </div>

      <CookieConsentBanner />
    </div>
  );
};

export default Layout;
