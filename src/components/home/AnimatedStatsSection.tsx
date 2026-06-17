import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView, motion } from 'framer-motion';

interface StatItemProps {
  endValue: number;
  suffix: string;
  label: string;
  isInView: boolean;
  duration?: number;
  index: number;
}

const StatItem = ({ endValue, suffix, label, isInView, duration = 2000, index }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;

    hasAnimated.current = true;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * endValue);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, endValue, duration]);

  return (
    <motion.div
      className="text-center relative px-4"
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
    >
      <div
        className="font-display text-6xl md:text-7xl lg:text-8xl leading-none mb-4 text-white"
        style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}
      >
        {count}
        <span className="text-brand-light">{suffix}</span>
      </div>
      <div className="w-8 h-px bg-white/30 mx-auto mb-4" />
      <div className="opacity-70 text-[11px] md:text-xs uppercase tracking-[0.22em] font-medium">
        {label}
      </div>
    </motion.div>
  );
};

const AnimatedStatsSection = () => {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  const stats = [
    { endValue: 30, suffix: '+', labelKey: 'stats.years' },
    { endValue: 1500, suffix: '+', labelKey: 'stats.clients' },
    { endValue: 300, suffix: 'K+', labelKey: 'stats.bags' },
    { endValue: 100, suffix: '%', labelKey: 'stats.satisfaction' },
  ];

  return (
    <section ref={ref} className="section-padding overflow-hidden relative grain-overlay">
      {/* Ambient depth — radial highlights over the flat blue */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% -10%, hsl(210 90% 62% / 0.45), transparent 60%), radial-gradient(ellipse 50% 50% at 100% 110%, hsl(218 60% 16% / 0.5), transparent 60%)',
        }}
        aria-hidden
      />

      <div className="container-page relative">
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label justify-center">
            {language === 'el' ? 'Με αριθμούς' : 'By the numbers'}
          </span>
          <h2 className="max-w-3xl mx-auto">
            {language === 'el' ? 'Συνέπεια που μετριέται σε χρόνια' : 'Consistency measured in years'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-4 md:divide-x md:divide-white/15">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              index={index}
              endValue={stat.endValue}
              suffix={stat.suffix}
              label={t(stat.labelKey)}
              isInView={isInView}
              duration={2000 + index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedStatsSection;
