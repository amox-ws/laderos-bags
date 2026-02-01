import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { motion } from 'framer-motion'; // <--- ΠΡΟΣΘΗΚΗ IMPORT

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const { t } = useLanguage();

  // Refs
  const pinnedSectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    const pinnedEl = pinnedSectionRef.current;
    const contentEl = mainContentRef.current;

    if (!canvas || !ctx || !pinnedEl || !contentEl) return;

    // --- FIX: PRELOAD ΓΙΑ ΤΙΣ 8 ΕΙΚΟΝΕΣ ΤΟΥ CAROUSEL ---
    const productImages = [
      '/product_bags/navy_and_green.png',
      '/product_bags/pink.png',
      '/product_bags/redbull.png',
      '/product_bags/cashew.png',
      '/product_bags/black_pink.png',
      '/product_bags/ygeia.png',
      '/product_bags/oasisbnb.png',
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
        end: '+=450%',
        pin: true,
        scrub: 0.65, 
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          render(self.progress);
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

    // B) Canvas Fades Out
    tl.to(canvas, { 
        opacity: 0, 
        duration: 1, 
        ease: 'power1.inOut' 
    });

    // C) NEXT SECTION (Products) Fades In & Slides Up
    tl.fromTo(
      contentEl,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' },
      "<" 
    );

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
      {/* SECTION 1: ANIMATION WRAPPER */}
      <div
        ref={pinnedSectionRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-background -mt-16 md:-mt-20"
      >
        {/* Layer 1: Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        />

        {/* Light Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-transparent" />

        {!imagesLoaded && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-sm text-muted-foreground">
            Loading…
          </div>
        )}
      </div>

      {/* SECTION 2: MAIN CONTENT (Acts as new Hero) */}
      <div 
        ref={mainContentRef} 
        className="relative z-30 -mt-40 md:-mt-60 opacity-0"
      >
        <div className="section-depth-1 pt-12">
          <ProductsSection />
        </div>

        <div className="section-depth-2">
          <TrustedBySection />
        </div>

        <div className="section-depth-3">
          <AboutPreviewSection />
        </div>

        <div className="section-depth-4">
          <AnimatedStatsSection />
        </div>

        <div className="section-depth-5">
          <WhereToFindUsSection />
        </div>

        {/* ΤΕΛΕΥΤΑΙΟ SECTION ΜΕ ΤΟ CTA - ΕΡΧΕΤΑΙ ΑΠΟ ΚΑΤΩ */}
        <section className="section-padding section-depth-6 overflow-hidden">
          <div className="container-page">
            <motion.div 
              className="text-center"
              initial={{ y: 200, opacity: 0 }} // Ξεκινάει 200px κάτω
              whileInView={{ y: 0, opacity: 1 }} // Πάει στο 0
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-lg opacity-80 mb-8 max-w-xl mx-auto">
                {t('cta.subtitle')}
              </p>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/contact#quote">
                  {t('cta.button')}
                  <ArrowRight className="ml-2 h-5 w-5" />
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