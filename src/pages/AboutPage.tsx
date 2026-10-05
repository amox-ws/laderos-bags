// About Page - Laderos Bags
import { motion, useReducedMotion } from 'framer-motion';
import LazyVideo from '@/components/ui/LazyVideo';
import SEO from '@/components/SEO';
import { makeBreadcrumbLd } from '@/lib/seo';
import { Factory, Package, Award, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedStatsSection from '@/components/home/AnimatedStatsSection';
import TrustedBySection from '@/components/home/TrustedBySection';
import Layout from '@/components/layout/Layout';
import CtaPanel from '@/components/CtaPanel';
import { Reveal, RevealHeading, RevealMedia } from '@/components/ui/Reveal';
import { Fragment, useEffect, useRef, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

const AboutPage = () => {
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();

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

    tl.to(heroEl, { opacity: 0, scale: 0.96, duration: 1, ease: 'power1.inOut' });

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
    };
  }, []);

  const heroWords = t('about.hero.title').split(' ');

  return (
    <Layout>
      <SEO routeKey="/about" jsonLd={makeBreadcrumbLd([[t('nav.home'), '/'], [t('nav.about'), '/about']])} />
      {/* Hero Section — the press at work behind an ink veil */}
      <section ref={heroRef} className="relative -mt-16 flex h-[100dvh] items-end overflow-hidden bg-ink md:-mt-20">
        <div className="absolute inset-0 z-0 h-full w-full">
          <motion.div
            className="h-full w-full"
            initial={reduced ? false : { scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: EASE }}
          >
            <video autoPlay loop muted playsInline poster="/videos/posters/aboutherolb.webp" className="h-full w-full object-cover">
              <source src="/videos/aboutherolb.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, hsl(224 44% 9% / 0.55) 0%, hsl(224 44% 9% / 0.35) 40%, hsl(224 44% 9% / 0.92) 100%)',
            }}
          />
        </div>

        <div className="container-page relative z-10 pb-16 md:pb-20">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <h1
              className={`mb-0 text-[clamp(2.8rem,1.2rem+5.6vw,7.75rem)] leading-[0.95] tracking-[-0.035em] text-paper lg:col-span-9${language === 'en' ? ' fit-heading' : ''}`}
              // "MANUFACTURING" is wide — keep it on the screen on phones.
              style={language === 'en' ? ({ '--fit': 9.2, '--fit-max': '2.8rem' } as CSSProperties) : undefined}
            >
              {heroWords.map((word, i) => (
                <Fragment key={i}>
                  <span className="inline-block overflow-hidden pb-[0.12em] pt-[0.08em] -mb-[0.12em] -mt-[0.08em] align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={reduced ? false : { y: '115%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1.2, ease: EASE, delay: 0.2 + i * 0.07 }}
                    >
                      {word}
                    </motion.span>
                  </span>
                  {i < heroWords.length - 1 && ' '}
                </Fragment>
              ))}
            </h1>
            <motion.div
              className="lg:col-span-3 lg:pb-3"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }}
            >
              <span className="mb-4 block h-px w-12 bg-brand-light" />
              <p className="text-lg text-paper/75 md:text-xl">{t('about.hero.subtitle')}</p>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-10 hidden items-center gap-3 md:flex lg:right-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/60">Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-paper/20">
            <span className="absolute inset-0 animate-scroll-line bg-paper" />
          </span>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="main-section section-padding relative z-10 -mt-[100dvh] overflow-hidden">
        <div className="container-page">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <RevealMedia className="aspect-[4/3] shadow-elevated lg:col-span-7">
              <img
                className="h-full w-full object-cover"
                src="/gallery/production_image.jpg"
                alt={language === 'el' ? 'Οι εγκαταστάσεις μας' : 'Our facilities'}
                loading="lazy"
              />
            </RevealMedia>

            <div className="lg:col-span-5">
              <RevealHeading text={t('about.whoWeAre.title')} className="mb-8" />
              <Reveal delay={0.15}>
                <p className="measure text-lg leading-relaxed text-ink/70">{t('about.whoWeAre.text')}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-padding section-depth-2">
        <div className="container-page">
          <SectionHeading title={t('about.whatWeDo.title')} align="left" className="mb-14 md:mb-20" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <Reveal key={service.key} delay={index * 0.08} y={50}>
                <div className="group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-media bg-white p-7 shadow-[inset_0_0_0_1px_hsl(var(--ink)/0.06)] transition-colors duration-700 ease-out-expo hover:bg-ink md:p-8">
                  {/* Blue light that rises on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 translate-y-full opacity-0 transition-all duration-700 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100"
                    style={{ background: 'radial-gradient(80% 100% at 50% 100%, hsl(213 66% 45% / 0.45), transparent 70%)' }}
                  />
                  <div className="relative flex items-start">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper text-ink transition-all duration-700 ease-out-expo group-hover:rotate-[-8deg] group-hover:bg-brand group-hover:text-white">
                      <service.icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                  </div>
                  <div className="relative mt-auto pt-16">
                    <h3 className="mb-3 text-[1.65rem] leading-[1.08] tracking-[-0.02em] text-ink transition-colors duration-700 group-hover:text-paper">
                      {t(`about.services.${service.key}.title`)}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-ink/60 transition-colors duration-700 group-hover:text-paper/70">
                      {t(`about.services.${service.key}.desc`)}
                    </p>
                  </div>
                </div>
              </Reveal>
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
            title={t('about.production.title')}
            description={t('about.production.text')}
            className="mb-16 md:mb-20"
          />

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
            {/* Photo */}
            <RevealMedia className="aspect-[4/5] shadow-elevated">
              <img
                className="h-full w-full object-cover"
                src="/gallery/our_production_2.jpg"
                alt={language === 'el' ? 'Η παραγωγή μας' : 'Our production'}
                loading="lazy"
              />
            </RevealMedia>

            {/* Video */}
            <RevealMedia className="aspect-[4/5] shadow-elevated md:mt-24" delay={0.15}>
              <LazyVideo
                className="h-full w-full object-cover"
                src="/videos/ourprodction.mp4"
                poster="/videos/posters/ourprodction.webp"
              />
            </RevealMedia>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <div className="py-[var(--panel-gutter)]">
        <AnimatedStatsSection />
      </div>

      {/* Why Work With Us */}
      <section className="section-padding main-section">
        <div className="container-page">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:col-span-5">
              <RevealHeading text={t('about.whyWork.title')} className="mb-8" />
              <Reveal delay={0.15}>
                <p className="measure text-lg leading-relaxed text-ink/70">{t('about.whyWork.text')}</p>
              </Reveal>
            </div>

            <ol className="border-t border-ink/10 lg:col-span-6 lg:col-start-7">
              {whyWorkWithUs.map((key, index) => (
                <Reveal as="li" key={key} delay={index * 0.08}>
                  <div className="group flex gap-5 border-b border-ink/10 py-8 md:gap-6 md:py-10">
                    <span className="mt-[0.9rem] h-px w-6 flex-shrink-0 bg-brand transition-all duration-700 ease-out-expo group-hover:w-10 md:w-8" />
                    <div>
                      <h4 className="mb-2.5 text-[1.6rem] leading-tight tracking-[-0.02em] transition-transform duration-700 ease-out-expo group-hover:translate-x-1.5 md:text-[1.85rem]">
                        {t(`about.${key}.title`)}
                      </h4>
                      <p className="text-[15px] leading-relaxed text-ink/60 md:text-base">{t(`about.${key}.desc`)}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaPanel leftImage="/paper_product/andrika/sakoula-kingsman.webp" rightImage="/paper_product/woman/sakoula-annas-secret.webp" />
    </Layout>
  );
};

export default AboutPage;
