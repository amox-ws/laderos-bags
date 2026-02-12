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
      className="text-center relative"
      initial={{ opacity: 0, y: 200 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
      transition={{ 
        duration: 1.2,
        ease: "easeOut",
        delay: index * 0.2
      }}
    >
      <div className="text-5xl md:text-6xl lg:text-7xl mb-3" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', letterSpacing: '0.02em' }}>
        {count}{suffix}
      </div>
      <div className="w-8 h-[1px] bg-white/30 mx-auto mb-3" />
      <div className="opacity-60 text-xs md:text-sm uppercase tracking-[0.15em]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        {label}
      </div>
    </motion.div>
  );
};

const AnimatedStatsSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  const stats = [
    { endValue: 30, suffix: '+', labelKey: 'stats.years' },
    { endValue: 1500, suffix: '+', labelKey: 'stats.clients' },
    { endValue: 300, suffix: 'K+', labelKey: 'stats.bags' },
    { endValue: 100, suffix: '%', labelKey: 'stats.satisfaction' },
  ];

  return (
    <section ref={ref} className="section-padding overflow-hidden">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
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