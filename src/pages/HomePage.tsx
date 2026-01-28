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

// GSAP Imports
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const { t } = useLanguage();

  // Refs
  const pinnedSectionRef = useRef<HTMLDivElement>(null); 
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);   
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    // --- 1. SETUP FRAMES ---
    const frameCount = 191; 
    const currentFrame = (index: number) => 
      `/bags/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    const bag = { frame: 0 };
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) setImagesLoaded(true);
      };
      images.push(img);
    }

    // --- 2. RENDER FUNCTION ---
    const render = () => {
      const img = images[bag.frame];
      if (!img) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // --- ΡΥΘΜΙΣΕΙΣ ΘΕΣΗΣ & ΜΕΓΕΘΟΥΣ ---
      const zoomFactor = 1.0; // Επαναφορά στο κανονικό (όχι zoomed out)
      const yOffset = 80;    // Μετακίνηση 100px προς τα κάτω

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let renderWidth, renderHeight, offsetX, offsetY;

      // Υπολογισμός διαστάσεων (Object fit: cover)
      if (canvasRatio > imgRatio) {
        renderWidth = canvas.width * zoomFactor;
        renderHeight = (img.height * (canvas.width / img.width)) * zoomFactor;
      } else {
        renderWidth = (img.width * (canvas.height / img.height)) * zoomFactor;
        renderHeight = canvas.height * zoomFactor;
      }

      // Κεντράρισμα + Μετακίνηση (Offset)
      offsetX = (canvas.width - renderWidth) / 2;
      offsetY = ((canvas.height - renderHeight) / 2) + yOffset;

      context.drawImage(img, 0, 0, img.width, img.height, offsetX, offsetY, renderWidth, renderHeight);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    window.addEventListener('resize', handleResize);

    if (images[0]) {
      images[0].onload = () => {
         handleResize();
         render();
      }
    }

    // --- 3. GSAP TIMELINE ---
    
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedSectionRef.current,
        start: "top top",      
        end: "+=500%",         
        pin: true,             
        scrub: 1,              
      }
    });

    // Phase A: Open Bag
    tl.to(bag, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      duration: 5,
      onUpdate: render
    });

    // Phase B: Zoom In
    tl.to(canvas, {
      scale: 60, 
      ease: "power2.in",
      duration: 5
    }, ">-1");

    // Phase C: Canvas Fade Out
    tl.to(canvas, {
      opacity: 0,
      duration: 1,
      ease: "none"
    }, "-=1");

    // Phase D: Hero Appearance
    tl.fromTo(heroContentRef.current, 
      {
        opacity: 0,
        y: 100, 
      },
      {
        opacity: 1,
        y: 0,   
        duration: 2,
        ease: "power2.out"
      }, 
      "-=1.5" 
    );

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
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
      <div className="relative z-30 bg-background">
        
        {/* Products Section */}
        <ProductsSection />

        {/* Who Trusts Us Section */}
        <TrustedBySection />

        {/* About Us Preview Section */}
        <AboutPreviewSection />

        {/* Animated Stats Section */}
        <AnimatedStatsSection />

        {/* Where to Find Us Section */}
        <WhereToFindUsSection />

        {/* CTA Section */}
        <section className="section-padding gradient-hero">
          <div className="container-page">
            <AnimatedSection className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
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