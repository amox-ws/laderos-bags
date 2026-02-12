// About Page - Laderos Bags
import { motion } from 'framer-motion';
import { Factory, Package, Award, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedStatsSection from '@/components/home/AnimatedStatsSection';
import TrustedBySection from '@/components/home/TrustedBySection';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const { t } = useLanguage();

  const services = [
    { key: 'customManufacturing', icon: Factory },
    { key: 'paperPlastic', icon: Package },
    { key: 'qualityConsistency', icon: Award },
    { key: 'b2bPartnerships', icon: Users },
  ];

  const whyWorkWithUs = [
    'whyWork.experience',
    'whyWork.reliability',
    'whyWork.cooperation',
    'whyWork.consistency',
  ];

  // Ref for hero pinning
  const heroRef = useRef<HTMLDivElement>(null);

  // Ref για το ΠΡΩΤΟ βίντεο (Who We Are)
  const whoWeAreVideoRef = useRef<HTMLVideoElement | null>(null);
  // Ref για το ΔΕΥΤΕΡΟ βίντεο (Production)
  const productionVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // --- Observer για το WHO WE ARE video ---
    const whoWeAreEl = whoWeAreVideoRef.current;
    if (whoWeAreEl) {
      const observer1 = new IntersectionObserver(
        async ([entry]) => {
          if (!whoWeAreVideoRef.current) return;
          if (entry.isIntersecting) {
            try {
              whoWeAreVideoRef.current.muted = true;
              await whoWeAreVideoRef.current.play();
            } catch {}
          } else {
            whoWeAreVideoRef.current.pause();
          }
        },
        { threshold: 0.35 }
      );
      observer1.observe(whoWeAreEl);
      
      return () => observer1.disconnect();
    }
  }, []);

  useEffect(() => {
    // --- Observer για το PRODUCTION video ---
    const productionEl = productionVideoRef.current;
    if (productionEl) {
      const observer2 = new IntersectionObserver(
        async ([entry]) => {
          if (!productionVideoRef.current) return;
          if (entry.isIntersecting) {
            try {
              productionVideoRef.current.muted = true;
              await productionVideoRef.current.play();
            } catch {}
          } else {
            productionVideoRef.current.pause();
          }
        },
        { threshold: 0.35 }
      );
      observer2.observe(productionEl);

      return () => observer2.disconnect();
    }
  }, []);

  // Refs for hero overlay layers (fade these, not the whole section)
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // GSAP: Pin hero and fade out overlay to reveal Who We Are
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroEl,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 0.15,
        anticipatePin: 1,
      },
    });

    // Fade only the overlay and hero text, not the background Who We Are layer
    if (heroOverlayRef.current) tl.to(heroOverlayRef.current, { opacity: 0, duration: 1, ease: 'power1.inOut' }, 0);
    if (heroContentRef.current) tl.to(heroContentRef.current, { opacity: 0, duration: 1, ease: 'power1.inOut' }, 0);

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section - VIDEO BACKGROUND - FULL SCREEN - PINNED */}
      <section ref={heroRef} className="relative h-screen overflow-hidden -mt-16 md:-mt-20">
        
        {/* Background layer: Who We Are content revealed when hero fades */}
        <div className="absolute inset-0 z-10 overflow-hidden pt-16 md:pt-20">
          <div className="section-padding main-section">
            <div className="container-page">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <div className="relative aspect-video bg-white/10 rounded-2xl overflow-hidden shadow-elevated">
                    <video
                      ref={whoWeAreVideoRef}
                      className="w-full h-full object-cover"
                      src="/videos/who_we_are.mp4"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('about.whoWeAre.title')}</h2>
                  <p className="leading-relaxed text-lg opacity-80">{t('about.whoWeAre.text')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Foreground layer: Video hero overlay that fades out */}
        <div ref={heroOverlayRef} className="absolute inset-0 w-full h-full z-20">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/about_bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/80" />
        </div>

        {/* Hero Content on top */}
        <div ref={heroContentRef} className="container-page relative z-30 flex items-center justify-center h-full text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide text-white">
              {t('about.hero.title')}
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-white">
              {t('about.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section - Main Background */}
      <section className="section-padding main-section">
        <div className="container-page">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.whatWeDo.title')}</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.key} delay={index * 0.1}>
                <div className="bg-white/10 rounded-xl p-6 text-center shadow-card hover:shadow-elevated transition-shadow duration-300 h-full">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t(`about.services.${service.key}.title`)}</h3>
                  <p className="text-sm opacity-80">{t(`about.services.${service.key}.desc`)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who Trusts Us Section - Main Background */}
      <div className="main-section">
        <TrustedBySection />
      </div>

      {/* Video/Visual Section - Main Background */}
      <section className="section-padding main-section">
        <div className="container-page">
          <AnimatedSection className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.production.title')}</h2>
            <p className="opacity-80 max-w-2xl mx-auto">{t('about.production.text')}</p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            {/* PRODUCTION VIDEO */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-elevated max-w-4xl mx-auto bg-white/10">
              <video
                ref={productionVideoRef}
                className="w-full h-full object-cover"
                src="/videos/production.mp4"
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Statistics Section - Accent Background #6A8595 */}
      <div className="accent-section">
        <AnimatedStatsSection />
      </div>

      {/* Why Work With Us Section - Main Background */}
      <section className="section-padding main-section">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('about.whyWork.title')}</h2>
              <p className="leading-relaxed mb-8 opacity-80">{t('about.whyWork.text')}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-4">
                {whyWorkWithUs.map((key, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-white/10 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{t(`about.${key}.title`)}</h4>
                      <p className="text-sm opacity-80">{t(`about.${key}.desc`)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section - Accent Background #6A8595 */}
      <section className="section-padding accent-section overflow-hidden">
        <div className="container-page text-center">
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="opacity-80 mb-8 max-w-2xl mx-auto">{t('cta.subtitle')}</p>
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/contact#quote" className="inline-flex items-center gap-2">
                {t('cta.button')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;