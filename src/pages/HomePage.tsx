import { useEffect, useRef, useState, useMemo } from 'react';
import SEO from '@/components/SEO';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronsDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import ProductsSection from '@/components/home/ProductsSection';
import TrustedBySection from '@/components/home/TrustedBySection';
import AboutPreviewSection from '@/components/home/AboutPreviewSection';
import AnimatedStatsSection from '@/components/home/AnimatedStatsSection';
import WhereToFindUsSection from '@/components/home/WhereToFindUsSection';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// Module-level flag: survives SPA navigation, resets on page refresh/reload
let animationHasPlayed = false;

const HomePage = () => {
  const { t, language } = useLanguage();
  const location = useLocation();

  // Skip animation if it already played in this app session (module lifetime)
  const skipAnimation = useMemo(() => {
    return animationHasPlayed;
  }, []);

  // Refs
  const pinnedSectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const preload = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.decoding = 'async';
        img.loading = 'eager';
        img.src = frameSrc(i);

        img.onload = () => {
          loadedCount++;
          if (!firstFrameReady && i === 0) {
            firstFrameReady = true;
            resize();
            render(0);
          }
          if (loadedCount === frameCount) setImagesLoaded(true);
        };

        images[i] = img;
      }
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
      window.removeEventListener('resize', resize);
      tl.kill();
      st?.kill();
    };
  }, []);

  return (
    <Layout>
      <SEO routeKey="/" />
      {/* Primary page heading — visually hidden, present for SEO & screen readers */}
      <h1 className="sr-only">
        {language === 'el'
          ? 'Laderos Bags — Χάρτινες & Πλαστικές Σακούλες με Εκτύπωση Λογοτύπου για Επιχειρήσεις'
          : 'Laderos Bags — Custom Printed Paper & Plastic Bags for Businesses'}
      </h1>
      {/* SECTION 1: ANIMATION WRAPPER - Only on first visit */}
      {!skipAnimation && (
        <div
          ref={pinnedSectionRef}
          className="relative w-full h-screen bg-background -mt-16 md:-mt-20"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          />
          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-transparent" />
          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center transition-opacity duration-500 ${showIndicator ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-white/70 text-sm tracking-widest uppercase mb-2">Scroll</span>
            <ChevronsDown className="text-white/70 w-6 h-6 animate-bounce" />
          </div>
        </div>
      )}

      {/* Products section - pulled up behind canvas when animation is active */}
      <div className={`main-section pt-12 ${!skipAnimation ? 'relative z-10 -mt-[100dvh]' : ''}`}>
        <ProductsSection />
      </div>

      {/* REMAINING SECTIONS - always rendered normally below */}
      <div>
        <div className="main-section">
          <TrustedBySection />
        </div>

        <div className="main-section">
          <AboutPreviewSection />
        </div>

        <div className="accent-section">
          <AnimatedStatsSection />
        </div>

        <div className="main-section">
          <WhereToFindUsSection />
        </div>

        {/* CTA Section */}
        <section className="section-padding accent-section overflow-hidden relative grain-overlay">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                'radial-gradient(ellipse 60% 55% at 50% 0%, hsl(210 90% 62% / 0.4), transparent 60%), radial-gradient(ellipse 60% 60% at 50% 120%, hsl(218 60% 14% / 0.55), transparent 60%)',
            }}
            aria-hidden
          />
          <div className="container-page relative">
            <motion.div
              className="text-center max-w-3xl mx-auto flex flex-col items-center"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="section-label justify-center">
                {language === 'el' ? 'Ξεκινήστε σήμερα' : 'Get started'}
              </span>
              <h2 className="mb-6 max-w-2xl">
                {t('cta.title')}
              </h2>
              <p className="text-lg opacity-80 mb-10 max-w-xl mx-auto">
                {t('cta.subtitle')}
              </p>
              <Button variant="heroOutline" size="xl" asChild className="group">
                <Link to="/contact#quote">
                  {t('cta.button')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;