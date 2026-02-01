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
import heroBags from '@/assets/hero-bags.jpg';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const { t } = useLanguage();

  const pinnedSectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    const pinnedEl = pinnedSectionRef.current;
    const heroEl = heroContentRef.current;

    if (!canvas || !ctx || !pinnedEl || !heroEl) return;

    // --- 1) FRAMES SETUP ---
    const frameCount = 140;
    const frameSrc = (i: number) => `/bags/ezgif-frame-${String(i + 1).padStart(3, '0')}.png`;

    const images: HTMLImageElement[] = new Array(frameCount);
    const bag = { frame: 0 };
    let loadedCount = 0;

    // Προαιρετικό: ξεκίνα animation μόλις φορτώσει το 1ο frame (και συνέχισε background)
    // Αυτό δίνει πιο “snappy” αίσθηση στο user.
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

    // --- 2) CANVAS (RETINA) RESIZE ---
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      // Canvas internal pixels for crispness
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);

      // CSS size stays in CSS pixels
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      // Draw in CSS pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      render(st?.progress ?? 0);
    };

    window.addEventListener('resize', resize);

    // --- 3) RENDER FUNCTION (cinematic zoom inside render) ---
    // progress: 0..1 από το ScrollTrigger
    const yOffset = 80;         // μικρό offset προς τα κάτω (όπως είχες)
    const zoomMin = 1.0;        // ξεκινάει “normal”
    const zoomMax = 1.22;       // μικρό cinematic zoom (όχι pixel-break)
    const zoomEase = (p: number) => p * p; // ease-in (πιο “κινηματογραφικό”)

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

      // object-fit: cover + zoom
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

    // --- 4) GSAP TIMELINE (NO SCALE 60, smoother scrub, hold, clean handoff) ---
    let st: ScrollTrigger | null = null;

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: pinnedEl,
        start: 'top top',
        end: '+=450%',
        pin: true,
        scrub: 0.65,            // smoother από 1
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // κρατάμε progress για zoom (render μέσα)
          render(self.progress);
        },
      },
    });

    st = tl.scrollTrigger ?? null;

    // A) Frames playback
    tl.to(bag, {
      frame: frameCount - 1,
      snap: 'frame',
      duration: 6,
      onUpdate: () => render(st?.progress ?? 0),
    });

    // B) HOLD λίγο στο τέλος (premium feeling)
    tl.to({}, { duration: 1.5 }); // κρατάει το τελευταίο frame

    // C) Canvas fade out
    tl.to(canvas, { opacity: 0, duration: 1.0, ease: 'power1.out' }, '>-0.2');

    // D) Hero in (λίγο πριν τελειώσει το fade)
    tl.fromTo(
      heroEl,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' },
      '>-0.8'
    );

    // Start
    preload();
    resize();

    return () => {
      window.removeEventListener('resize', resize);

      // kill only what we created
      tl.kill();
      st?.kill();
    };
  }, []);

  return (
    <Layout>
      {/* SECTION 1: PINNED WRAPPER */}
      <div
        ref={pinnedSectionRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-background -mt-16 md:-mt-20"
      >
        {/* Layer 1: Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        />

        {/* Optional overlay για να “δέσει” με το brand και να κρύβει artifacts */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-background/30" />

        {/* Optional tiny hint (αν δεν θες, σβήστο) */}
        {!imagesLoaded && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-sm text-muted-foreground">
            Loading…
          </div>
        )}

        {/* Layer 2: Hero Content */}
        <div ref={heroContentRef} className="relative z-10 w-full opacity-0">
          <div className="absolute inset-0 z-0">
            <img
              src={heroBags}
              alt="Hero Background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>

          <div className="container-page relative z-10 py-20 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/products">
                    {t('hero.cta.products')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/contact">{t('hero.cta.contact')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: REST OF THE CONTENT */}
      <div className="relative z-30">
        <div className="section-depth-1">
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

        <section className="section-padding section-depth-6">
          <div className="container-page">
            <AnimatedSection className="text-center">
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
            </AnimatedSection>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
