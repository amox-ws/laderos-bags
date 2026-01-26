import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import heroBags from '@/assets/hero-bags.jpg';
import plasticBags from '@/assets/plastic-bags.jpg';
import paperBags from '@/assets/paper-bags.jpg';

// GSAP Imports
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const { t } = useLanguage();

  // Refs
  const pinnedSectionRef = useRef<HTMLDivElement>(null); // Το container που θα "καρφωθεί"
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);   // Το περιεχόμενο του Hero
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Data
  const products = [
    {
      image: plasticBags,
      title: t('products.plastic.title'),
      description: t('products.plastic.desc'),
      link: '/products',
    },
    {
      image: paperBags,
      title: t('products.paper.title'),
      description: t('products.paper.desc'),
      link: '/products',
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    // --- 1. SETUP EIKONWN ---
    const frameCount = 130; 
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
      
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let renderWidth, renderHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        renderWidth = canvas.width;
        renderHeight = img.height * (canvas.width / img.width);
        offsetX = 0;
        offsetY = (canvas.height - renderHeight) / 2;
      } else {
        renderWidth = img.width * (canvas.height / img.height);
        renderHeight = canvas.height;
        offsetX = (canvas.width - renderWidth) / 2;
        offsetY = 0;
      }

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

    // --- 3. GSAP TIMELINE ΜΕ PINNING ---
    
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedSectionRef.current, // Καρφώνουμε αυτό το section
        start: "top top",      // Όταν η κορυφή του section φτάσει στην κορυφή της οθόνης
        end: "+=500%",         // Διάρκεια scroll (5 φορές το ύψος της οθόνης)
        pin: true,             // ΕΝΕΡΓΟΠΟΙΗΣΗ PINNING
        scrub: 1,              // Smooth scroll
      }
    });

    // Phase A: Σακούλα Ανοίγει
    tl.to(bag, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      duration: 5,
      onUpdate: render
    });

    // Phase B: Zoom In
    tl.to(canvas, {
      scale: 50, 
      ease: "power2.in",
      duration: 5
    }, ">-1");

    // Phase C: Canvas Fade Out (Εξαφανίζεται η σακούλα)
    tl.to(canvas, {
      opacity: 0,
      duration: 1,
      ease: "none"
    }, "-=1");

    // Phase D: Hero Appearance (Fade In + Slide Up)
    // Αυτό συμβαίνει καθώς εξαφανίζεται η σακούλα
    tl.fromTo(heroContentRef.current, 
      {
        opacity: 0,
        y: 100, // Ξεκινάει 100 pixels πιο κάτω
      },
      {
        opacity: 1,
        y: 0,   // Ανεβαίνει στη θέση του
        duration: 2,
        ease: "power2.out"
      }, 
      "-=1.5" // Ξεκινάει λίγο πριν τελειώσει τελείως το fade out της σακούλας
    );

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <Layout>
      {/* SECTION 1: PINNED WRAPPER 
        Αυτό το div περιέχει ΚΑΙ τον καμβά ΚΑΙ το Hero Section.
        Θα μείνει καρφωμένο στην οθόνη μέχρι να τελειώσει το animation.
      */}
      <div 
        ref={pinnedSectionRef} 
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-background"
      >
        {/* Layer 1: Ο Καμβάς (Σακούλα) - Είναι από πάνω (z-20) */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        />

        {/* Layer 2: Το Hero Section - Είναι από κάτω (z-10), αρχικά κρυμμένο */}
        {/* Θα εμφανιστεί μέσα από τη σακούλα */}
        <div ref={heroContentRef} className="relative z-10 w-full opacity-0"> 
          {/* Background Image του Hero (αν θες να φαίνεται πίσω από τα γράμματα) */}
          <div className="absolute inset-0 z-0">
             <img
               src={heroBags}
               alt="Hero Background"
               className="w-full h-full object-cover opacity-20" // Χαμηλό opacity για να ξεχωρίζουν τα γράμματα
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

      {/* SECTION 2: REST OF THE CONTENT 
        Αυτό εμφανίζεται φυσιολογικά ΜΕΤΑ το "ξεκάρφωμα" του από πάνω section.
      */}
      <div className="relative z-30 bg-background">
        
        {/* Products Section */}
        <section className="section-padding">
          <div className="container-page">
            <AnimatedSection className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {t('products.title')}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('products.subtitle')}
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
              {products.map((product, index) => (
                <AnimatedSection key={index} delay={index * 0.15}>
                  <Link 
                    to={product.link}
                    className="group block bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 active:scale-[0.98]"
                  >
                    <div className="aspect-[4/3] md:aspect-[3/2] overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3">
                          {product.title}
                        </h3>
                        <p className="text-white/90 text-base md:text-lg leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-5 md:p-6 flex items-center justify-between bg-card group-hover:bg-brand-pale transition-colors duration-300">
                      <span className="text-base md:text-lg font-semibold text-foreground group-hover:text-brand transition-colors">
                        {t('products.explore')}
                      </span>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand/10 group-hover:bg-brand flex items-center justify-center transition-all duration-300">
                        <ArrowRight className="h-5 w-5 md:h-6 md:w-6 text-brand group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

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
                <Link to="/contact">
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