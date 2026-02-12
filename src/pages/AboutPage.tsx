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

  const heroRef = useRef<HTMLDivElement>(null);
  const whoWeAreVideoRef = useRef<HTMLVideoElement | null>(null);
  const productionVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
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

    tl.to(heroEl, { opacity: 0, duration: 1, ease: 'power1.inOut' });

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden -mt-16 md:-mt-20">
        <div className="absolute inset-0 w-full h-full z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/about_bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/80" />
        </div>

        <div className="container-page relative z-10 text-center py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="mb-8 tracking-wide text-white">
              {t('about.hero.title')}
            </h1>
            <div className="w-16 h-[1px] bg-white/30 mx-auto mb-8" />
            <p className="text-lg md:text-xl opacity-70 max-w-2xl mx-auto text-white">
              {t('about.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="section-padding main-section overflow-hidden relative z-10 -mt-[100vh]">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
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
            </motion.div>

            <motion.div
              initial={{ x: 300, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <div>
                <h2 className="mb-6">{t('about.whoWeAre.title')}</h2>
                <div className="w-12 h-[2px] bg-primary/40 mb-6" />
                <p className="leading-relaxed text-lg text-muted-foreground">{t('about.whoWeAre.text')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-padding main-section">
        <div className="container-page">
          <AnimatedSection className="text-center mb-16">
            <h2 className="mb-4">{t('about.whatWeDo.title')}</h2>
            <div className="section-divider mt-6" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.key} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-8 text-center shadow-card hover:shadow-card-hover transition-all duration-500 h-full border border-border/40">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold mb-3" style={{ fontFamily: 'Inter, system-ui, sans-serif', textTransform: 'none', letterSpacing: '0' }}>
                    {t(`about.services.${service.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`about.services.${service.key}.desc`)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who Trusts Us */}
      <div className="main-section">
        <TrustedBySection />
      </div>

      {/* Production Section */}
      <section className="section-padding main-section">
        <div className="container-page">
          <AnimatedSection className="text-center mb-12">
            <h2 className="mb-4">{t('about.production.title')}</h2>
            <div className="section-divider mt-6 mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t('about.production.text')}</p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-elevated max-w-5xl mx-auto bg-white/10">
              <video
                ref={productionVideoRef}
                className="w-full h-full object-cover"
                src="/videos/production.mp4"
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Statistics */}
      <div className="accent-section">
        <AnimatedStatsSection />
      </div>

      {/* Why Work With Us */}
      <section className="section-padding main-section">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <h2 className="mb-6">{t('about.whyWork.title')}</h2>
              <div className="w-12 h-[2px] bg-primary/40 mb-6" />
              <p className="leading-relaxed mb-8 text-muted-foreground text-lg">{t('about.whyWork.text')}</p>
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
                    className="flex items-start gap-5 p-5 bg-white rounded-xl border border-border/40 shadow-card"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif', textTransform: 'none', letterSpacing: '0' }}>
                        {t(`about.${key}.title`)}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t(`about.${key}.desc`)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding accent-section overflow-hidden">
        <div className="container-page text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <h2 className="mb-6">{t('cta.title')}</h2>
            <div className="w-12 h-[1px] bg-white/30 mx-auto mb-6" />
            <p className="opacity-70 mb-10 max-w-2xl mx-auto text-lg">{t('cta.subtitle')}</p>
            <Button asChild variant="heroOutline" size="lg" className="group">
              <Link to="/contact#quote" className="inline-flex items-center gap-2">
                {t('cta.button')}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;