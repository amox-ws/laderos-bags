import { useEffect, useRef, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
  const { t } = useLanguage();
  const location = useLocation();

  // Skip animation if it already played in this app session (module lifetime)
  const skipAnimation = useMemo(() => {
    return animationHasPlayed;
  }, []);

  // Refs
  const pinnedSectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);

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
      '/product_bags/butcher.png'
    ];

    productImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    // ---------------------------------------------------

    // --- 1) FRAMES SETUP ---
    const frameCount = 140;
    const frameSrc = (i: number) => `/bags/ezgif-frame-${String(i + 1).padStart(3, '0')}.png`;

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
        </div>
      )}

      {/* Products section - pulled up behind canvas when animation is active */}
      <div className={`main-section pt-12 ${!skipAnimation ? 'relative z-10 -mt-[100vh]' : ''}`}>
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
        <section className="section-padding accent-section overflow-hidden">
          <div className="container-page">
            <motion.div 
              className="text-center max-w-3xl mx-auto"
              initial={{ y: 200, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h2 className="mb-6">
                {t('cta.title')}
              </h2>
              <div className="w-12 h-[1px] bg-white/30 mx-auto mb-6" />
              <p className="text-lg opacity-70 mb-10 max-w-xl mx-auto">
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