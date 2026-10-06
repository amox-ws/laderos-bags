import { Fragment, useEffect, type CSSProperties, useRef, useState, useMemo } from 'react';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import ProductsSection from '@/components/home/ProductsSection';
import TrustedBySection from '@/components/home/TrustedBySection';
import AboutPreviewSection from '@/components/home/AboutPreviewSection';
import AnimatedStatsSection from '@/components/home/AnimatedStatsSection';
import ShowcaseCarouselSection from '@/components/home/ShowcaseCarouselSection';
import WhereToFindUsSection from '@/components/home/WhereToFindUsSection';
import Marquee from '@/components/ui/Marquee';
import CtaPanel from '@/components/CtaPanel';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Module-level flag: survives SPA navigation, resets on page refresh/reload
let animationHasPlayed = false;

const HomePage = () => {
  const { t, language } = useLanguage();

  // Skip animation if it already played in this app session (module lifetime)
  const skipAnimation = useMemo(() => {
    return animationHasPlayed;
  }, []);

  // Refs
  const pinnedSectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    if (skipAnimation) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    const pinnedEl = pinnedSectionRef.current;

    if (!canvas || !ctx || !pinnedEl) return;

    // --- FIX: PRELOAD ΓΙΑ ΤΙΣ 8 ΕΙΚΟΝΕΣ ΤΟΥ CAROUSEL ---
    const productImages = [
      '/product_bags/navy_and_green.webp',
      '/product_bags/pink.webp',
      '/product_bags/redbull.webp',
      '/product_bags/cashew.webp',
      '/product_bags/black_pink.webp',
      '/product_bags/ygeia.webp',
      '/product_bags/oasisbnb.webp',
      '/product_bags/butcher.webp'
    ];

    // Warmed once the film has loaded (see preload below), so they never compete with it.
    const warmCarousel = () =>
      productImages.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    // ---------------------------------------------------

    // --- 1) FRAMES SETUP ---
    const frameCount = 140;
    const frameSrc = (i: number) => `/bags/ezgif-frame-${String(i + 1).padStart(3, '0')}.webp`;

    const images: HTMLImageElement[] = new Array(frameCount);
    const bag = { frame: 0 };
    let loadedCount = 0;
    let firstFrameReady = false;
    let cancelled = false;

    // Frame 1 first (it is the poster), then the rest in scroll order, a few at a time.
    const BATCH = 12;
    const loadFrame = (i: number, done: () => void) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = img.onerror = () => {
        if (img.naturalWidth > 0) {
          loadedCount++;
          if (!firstFrameReady && i === 0) {
            firstFrameReady = true;
            resize();
            render(0);
          }
          if (loadedCount === frameCount) {
            setImagesLoaded(true);
            warmCarousel();
          }
        }
        done();
      };
      img.src = frameSrc(i);
      images[i] = img;
    };

    let next = 1;
    const pump = () => {
      if (cancelled || next >= frameCount) return;
      loadFrame(next++, pump);
    };

    const preload = () => {
      // The rest of the film waits until the page itself has finished loading,
      // so 140 frames never compete with the headline and first screen.
      const startRest = () => {
        if (cancelled) return;
        for (let k = 0; k < BATCH; k++) pump();
      };
      const afterLoad = () => ('requestIdleCallback' in window ? window.requestIdleCallback(startRest, { timeout: 1500 }) : setTimeout(startRest, 500));
      loadFrame(0, () => {
        if (document.readyState === 'complete') afterLoad();
        else window.addEventListener('load', afterLoad, { once: true });
      });
    };

    // --- 2) CANVAS RESIZE ---
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render(st?.progress ?? 0);
    };

    window.addEventListener('resize', resize);

    // --- 3) RENDER FUNCTION ---
    const yOffset = 80;
    const zoomMin = 1.0;
    const zoomMax = 1.22;
    const zoomEase = (p: number) => p * p;

    const render = (progress: number) => {
      const img = images[bag.frame];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = window.innerWidth;
      const ch = window.innerHeight;

      ctx.clearRect(0, 0, cw, ch);

      const eased = zoomEase(progress);
      const zoom = zoomMin + (zoomMax - zoomMin) * eased;

      const canvasRatio = cw / ch;
      const imgRatio = img.naturalWidth / img.naturalHeight;

      let renderWidth: number;
      let renderHeight: number;

      if (canvasRatio > imgRatio) {
        renderWidth = cw * zoom;
        renderHeight = (img.naturalHeight * (cw / img.naturalWidth)) * zoom;
      } else {
        renderWidth = (img.naturalWidth * (ch / img.naturalHeight)) * zoom;
        renderHeight = ch * zoom;
      }

      const offsetX = (cw - renderWidth) / 2;
      const offsetY = (ch - renderHeight) / 2 + yOffset;

      // The frame sits a little low; fill the strip above it with the frame's
      // own top row so there is never a band of flat colour under the header.
      if (offsetY > 0) {
        ctx.drawImage(img, 0, 0, img.naturalWidth, 1, offsetX, 0, renderWidth, offsetY + 1);
      }

      ctx.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        offsetX,
        offsetY,
        renderWidth,
        renderHeight
      );
    };

    // --- 4) GSAP TIMELINE ---
    let st: ScrollTrigger | null = null;

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: pinnedEl,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 0.15,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          render(self.progress);
          setShowIndicator(self.progress <= 0.05);
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
          if (self.progress >= 0.95) {
            animationHasPlayed = true;
          }
        },
      },
    });

    st = tl.scrollTrigger ?? null;

    // A) Play Bag Animation
    tl.to(bag, {
      frame: frameCount - 1,
      snap: 'frame',
      duration: 5,
      onUpdate: () => render(st?.progress ?? 0),
    });

    // B) Entire pinned section fades out, revealing products behind
    tl.to(pinnedEl, {
        opacity: 0,
        duration: 0.8,
        ease: 'power1.inOut'
    });

    // Start
    preload();
    resize();

    return () => {
      cancelled = true;
      window.removeEventListener('resize', resize);
      tl.kill();
      st?.kill();
    };
  }, []);

  const h1Brand = 'Laderos Bags —';
  const h1Rest =
    language === 'el'
      ? 'Χάρτινες & Πλαστικές Σακούλες με Εκτύπωση Λογοτύπου για Επιχειρήσεις'
      : 'Custom Printed Paper & Plastic Bags for Businesses';

  // Two halves of the heading flank the bag on wider screens
  const heroWords = h1Rest.split(' ');
  const splitAt = language === 'el' ? 4 : 6;
  const heroLines = [heroWords.slice(0, splitAt), heroWords.slice(splitAt)];

  const marqueeItems = [
    t('nav.products.paper'),
    t('nav.products.plastic'),
    language === 'el' ? 'Οπτικά' : 'Optical',
    language === 'el' ? 'Παιδικά' : 'Kids',
    language === 'el' ? 'Ανδρικά' : 'Menswear',
    language === 'el' ? 'Γυναικεία' : 'Womenswear',
    language === 'el' ? 'Οικολογικά' : 'Eco-Friendly',
  ];

  return (
    <Layout>
      <SEO routeKey="/" />

      {/* Primary page heading — set over the opening film; screen-reader only when the film is skipped */}
      {skipAnimation && (
        <h1 className="sr-only">
          {h1Brand} {h1Rest}
        </h1>
      )}

      {/* SECTION 1: ANIMATION WRAPPER - Only on first visit */}
      {!skipAnimation && (
        <div
          ref={pinnedSectionRef}
          className="relative -mt-16 h-screen w-full bg-[#d4d7dd] md:-mt-20"
        >
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-20 h-full w-full"
          />

          {/* Phones: the bag fills the screen, so the type sits on a navy veil that melts into it */}
          <div
            className={`pointer-events-none absolute inset-0 z-[25] transition-opacity duration-700 md:hidden ${showIndicator ? 'opacity-100' : 'opacity-0'}`}
            style={{ background: 'linear-gradient(0deg, hsl(224 44% 9% / 0.9) 0%, hsl(224 44% 9% / 0.55) 30%, transparent 58%)' }}
          />

          <div className="pointer-events-none absolute inset-0 z-30">
            <div className="container-page flex h-full flex-col justify-end pb-28 md:pb-16 lg:pb-20">
              <h1
                className={`grid gap-1 text-[clamp(2rem,0.9rem+2.3vw,3.6rem)] leading-[1.02] tracking-[-0.03em] text-paper transition-[opacity,transform] duration-700 ease-out-expo md:grid-cols-2 md:items-end md:gap-[34vw] md:text-ink ${
                  showIndicator ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                {heroLines.map((line, li) => (
                  <span key={li} className={`block md:max-w-[13ch] ${li === 1 ? 'md:justify-self-end md:text-right' : ''}`}>
                    {li === 0 && (
                      <span
                        className="hero-rise mb-4 block font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60 md:mb-6 md:text-ink/55"
                        style={{ '--rise-from': '12px', '--rise-opacity': 0, '--rise-dur': '1s', animationDelay: '0.05s' } as CSSProperties}
                      >
                        {h1Brand}
                      </span>
                    )}
                    {li === 0 && ' '}
                    {line.map((word, i) => (
                      <Fragment key={i}>
                        <span className="inline-block overflow-hidden pb-[0.14em] pt-[0.1em] -mb-[0.14em] -mt-[0.1em] align-bottom">
                          <span
                            className={`hero-rise inline-block ${word === '&' ? 'amp' : ''}`}
                            style={{ '--rise-from': '115%', '--rise-dur': '0.9s', animationDelay: `${0.1 + (li * 4 + i) * 0.03}s` } as CSSProperties}
                          >
                            {word}
                          </span>
                        </span>
                        {(i < line.length - 1 || li === 0) && ' '}
                      </Fragment>
                    ))}
                  </span>
                ))}
              </h1>
            </div>
          </div>

          {/* Scroll cue — difference blend keeps it visible on grey and on navy */}
          <div
            className={`pointer-events-none absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2.5 text-white mix-blend-difference transition-opacity duration-500 ${showIndicator ? 'opacity-100' : 'opacity-0'}`}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.24em]">Scroll</span>
            <span className="relative h-10 w-px overflow-hidden bg-white/25">
              <span className="absolute inset-0 animate-scroll-line bg-white" />
            </span>
          </div>

          {/* Film progress */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[2px] bg-ink/10">
            <span ref={progressRef} className="block h-full origin-left scale-x-0 bg-brand" />
          </div>
        </div>
      )}

      {/* Products section - pulled up behind canvas when animation is active */}
      <div className={`main-section ${!skipAnimation ? 'relative z-10 -mt-[100dvh]' : ''}`}>
        <ProductsSection />
      </div>

      {/* REMAINING SECTIONS - always rendered normally below */}
      <div>
        {/* Category ribbon */}
        <div className="border-y border-ink/10 py-6 md:py-8" aria-hidden>
          <Marquee duration={38} pauseOnHover={false}>
            {marqueeItems.map((item) => (
              <span key={item} className="flex items-center">
                <span className="whitespace-nowrap px-6 font-display text-[clamp(2rem,1.4rem+2.6vw,4rem)] italic font-light tracking-[-0.03em] text-ink md:px-10">
                  {item}
                </span>
                <span className="text-brand">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 md:h-7 md:w-7" fill="currentColor">
                    <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" />
                  </svg>
                </span>
              </span>
            ))}
          </Marquee>
        </div>

        <TrustedBySection />

        <AboutPreviewSection />

        <ShowcaseCarouselSection />

        <AnimatedStatsSection />

        <WhereToFindUsSection />

        <CtaPanel />
      </div>
    </Layout>
  );
};

export default HomePage;
