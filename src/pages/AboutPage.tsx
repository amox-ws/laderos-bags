// About Page - Laderos Bags
import { motion } from 'framer-motion';
import { Factory, Package, Award, Users, ArrowRight, CheckCircle2, ChevronsDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedStatsSection from '@/components/home/AnimatedStatsSection';
import TrustedBySection from '@/components/home/TrustedBySection';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const { t, language } = useLanguage();

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
      {/* Hero Section — cinematic navy overlay */}
      <section ref={heroRef} className="relative h-[100dvh] flex items-center justify-center overflow-hidden -mt-16 md:-mt-20">
        <div className="absolute inset-0 w-full h-full z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/aboutherolb.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, hsl(219 56% 9% / 0.82) 0%, hsl(218 52% 12% / 0.66) 45%, hsl(219 58% 7% / 0.9) 100%)',
            }}
          />
        </div>

        <div className="container-page relative z-10 text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-light mb-7">
              {language === 'el' ? 'Η εταιρεία' : 'About us'}
            </span>
            <h1 className="mb-8 text-white max-w-4xl">
              {t('about.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto">
              {t('about.hero.subtitle')}
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50">
          <ChevronsDown className="h-6 w-6 animate-bounce" />
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="section-padding main-section overflow-hidden relative z-10 -mt-[100dvh]">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <motion.div
              initial={{ x: -80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-[4/3] bg-muted rounded-2xl overflow-hidden shadow-elevated">
                <img
                  className="w-full h-full object-cover"
                  src="/gallery/production_image.jpg"
                  alt={language === 'el' ? 'Οι εγκαταστάσεις μας' : 'Our facilities'}
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <span className="section-label">{language === 'el' ? 'Ποιοι είμαστε' : 'Who we are'}</span>
                <h2 className="mb-6">{t('about.whoWeAre.title')}</h2>
                <p className="leading-relaxed text-lg text-muted-foreground measure">{t('about.whoWeAre.text')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-padding section-depth-2">
        <div className="container-page">
          <SectionHeading
            eyebrow={language === 'el' ? 'Τι κάνουμε' : 'What we do'}
            title={t('about.whatWeDo.title')}
            className="mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.key} delay={index * 0.1}>
                <div className="card-editorial rounded-xl p-8 text-center h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 font-sans normal-case tracking-normal" style={{ letterSpacing: '0' }}>
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
      <section className="section-padding section-depth-2">
        <div className="container-page">
          <SectionHeading
            eyebrow={language === 'el' ? 'Η παραγωγή' : 'Production'}
            title={t('about.production.title')}
            description={t('about.production.text')}
            className="mb-14"
          />

          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {/* Photo */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated bg-muted">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/gallery/our_production_2.jpg"
                  alt={language === 'el' ? 'Η παραγωγή μας' : 'Our production'}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Video */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated bg-muted">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/videos/ourprodction.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent pointer-events-none" />
              </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection className="lg:sticky lg:top-28">
              <span className="section-label">{language === 'el' ? 'Γιατί εμάς' : 'Why us'}</span>
              <h2 className="mb-6">{t('about.whyWork.title')}</h2>
              <p className="leading-relaxed mb-8 text-muted-foreground text-lg measure">{t('about.whyWork.text')}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-4">
                {whyWorkWithUs.map((key, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-5 p-6 card-editorial rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1.5 text-base font-sans normal-case" style={{ letterSpacing: '0' }}>
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
      <section className="section-padding accent-section overflow-hidden relative grain-overlay">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, hsl(210 90% 62% / 0.4), transparent 60%), radial-gradient(ellipse 60% 60% at 50% 120%, hsl(218 60% 14% / 0.5), transparent 60%)',
          }}
          aria-hidden
        />
        <div className="container-page text-center relative">
          <motion.div
            className="max-w-3xl mx-auto flex flex-col items-center"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label justify-center">{language === 'el' ? 'Ξεκινήστε σήμερα' : 'Get started'}</span>
            <h2 className="mb-6 max-w-2xl">{t('cta.title')}</h2>
            <p className="opacity-80 mb-10 max-w-2xl mx-auto text-lg">{t('cta.subtitle')}</p>
            <Button asChild variant="heroOutline" size="xl" className="group">
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
