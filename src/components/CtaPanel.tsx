import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import ArrowButton from '@/components/ui/ArrowButton';
import { Reveal, RevealHeading } from '@/components/ui/Reveal';

/**
 * Closing call-to-action: an ink panel with the big question, two of our
 * bags drifting at its edges as it scrolls past.
 */
const CtaPanel = ({
  leftImage = '/product_bags/navy_and_green.webp',
  rightImage = '/product_bags/redbull.webp',
}: {
  leftImage?: string;
  rightImage?: string;
}) => {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const leftY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-60, 160]);
  const leftR = useTransform(scrollYProgress, [0, 1], [-14, -4]);
  const rightR = useTransform(scrollYProgress, [0, 1], [12, 3]);

  return (
    <section
      ref={ref}
      className="panel ink-section grain-overlay mb-[var(--panel-gutter)] overflow-hidden py-28 md:py-40 lg:py-48"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 60% at 50% 0%, hsl(213 66% 45% / 0.38), transparent 70%), radial-gradient(40% 50% at 50% 110%, hsl(213 66% 45% / 0.18), transparent 70%)',
        }}
        aria-hidden
      />

      {/* Two of our bags, floating at the edges */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: leftY, rotate: leftR }}
        className="pointer-events-none absolute -left-10 top-[18%] hidden w-[19vw] max-w-[300px] overflow-hidden rounded-[1.5rem] shadow-[0_50px_80px_-30px_rgba(0,0,0,0.8)] lg:block xl:left-[2%]"
      >
        <img src={leftImage} alt="" className="aspect-[4/5] w-full object-cover" loading="lazy" />
      </motion.div>
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: rightY, rotate: rightR }}
        className="pointer-events-none absolute -right-8 top-[8%] hidden w-[17vw] max-w-[270px] overflow-hidden rounded-[1.5rem] shadow-[0_50px_80px_-30px_rgba(0,0,0,0.8)] lg:block xl:right-[3%]"
      >
        <img src={rightImage} alt="" className="aspect-[4/5] w-full object-cover" loading="lazy" />
      </motion.div>

      <div className="container-page relative z-[2]">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <RevealHeading
            text={t('cta.title')}
            className="mb-8 text-[clamp(2.8rem,1.4rem+5.4vw,7.5rem)] leading-[0.96] tracking-[-0.04em] text-paper"
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mb-12 max-w-xl text-lg text-paper/65">{t('cta.subtitle')}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <ArrowButton to="/contact#quote" variant="paper" size="lg">
              {t('cta.button')}
            </ArrowButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default CtaPanel;
