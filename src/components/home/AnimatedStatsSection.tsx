import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView, motion } from 'framer-motion';
import { RevealHeading } from '@/components/ui/Reveal';

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
      className="relative pt-8"
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
    >
      {/* Rule that draws itself in */}
      <motion.span
        className="absolute left-0 right-0 top-0 h-px origin-left bg-white/30"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 + index * 0.12 }}
      />
      <div
        className="font-display text-[clamp(3.75rem,2.5rem+4.5vw,8.5rem)] font-light leading-[0.9] tracking-[-0.045em] text-white"
        style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}
      >
        {count}
        <span className="ml-1 italic text-white/55">{suffix}</span>
      </div>
      <div className="mt-5 text-[15px] text-white/75">{label}</div>
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
    <section ref={ref} className="panel accent-section grain-overlay overflow-hidden py-24 md:py-36">
      {/* Ambient depth over the flat blue */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 70% at 10% 0%, hsl(210 92% 74% / 0.35), transparent 65%), radial-gradient(55% 70% at 100% 100%, hsl(224 60% 18% / 0.55), transparent 70%)',
        }}
        aria-hidden
      />

      <div className="container-page relative z-[2]">
        <div className="mb-16 md:mb-24">
          <RevealHeading
            text={language === 'el' ? 'Συνέπεια που μετριέται σε χρόνια' : 'Consistency measured in years'}
            className="max-w-[16ch] text-[clamp(2.4rem,1.4rem+3.6vw,5.5rem)] tracking-[-0.03em] text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:gap-x-10 lg:grid-cols-4">
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
