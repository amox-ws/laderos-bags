import { ReactNode, useEffect, useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieConsentBanner from '@/components/CookieConsentBanner';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Footer reveal: the content (main) scrolls normally until its end reaches
 * the bottom of the viewport — there it STICKS (sticky with a negative top
 * equal to `100vh - mainHeight`), and as the user keeps scrolling the footer
 * slides up OVER the pinned section: its title appears first, then
 * progressively the rest, until the footer fully covers it. Because the
 * footer is in the normal flow, it always ends fully visible.
 */
const Layout = ({ children }: LayoutProps) => {
  const mainRef = useRef<HTMLElement>(null);
  const [stickyTop, setStickyTop] = useState<number | null>(null);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const measure = () => {
      const vh = window.innerHeight;
      const h = el.offsetHeight;
      // pin the main only once its bottom hits the viewport bottom
      setStickyTop(Math.min(0, Math.round(vh - h)));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Content — sticks when fully scrolled, footer slides over it */}
      <main
        ref={mainRef}
        className="pt-16 md:pt-20"
        style={{
          position: 'sticky',
          top: stickyTop ?? undefined,
          zIndex: 0,
        }}
      >
        {children}
      </main>

      {/* Footer — normal flow, layered above the pinned content */}
      <div className="relative z-10">
        <Footer />
      </div>

      <CookieConsentBanner />
    </div>
  );
};

export default Layout;
