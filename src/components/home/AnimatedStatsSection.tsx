import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from 'framer-motion';

interface StatItemProps {
  endValue: number;
  suffix: string;
  label: string;
  isInView: boolean;
  duration?: number;
}

const StatItem = ({ endValue, suffix, label, isInView, duration = 2000 }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    
    hasAnimated.current = true;
    
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
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
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold mb-2">
        {count}{suffix}
      </div>
      <div className="opacity-70 text-sm">
        {label}
      </div>
    </div>
  );
};

const AnimatedStatsSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { endValue: 30, suffix: '+', labelKey: 'stats.years' },
    { endValue: 1500, suffix: '+', labelKey: 'stats.clients' },
    { endValue: 300, suffix: 'K+', labelKey: 'stats.bags' },
    { endValue: 100, suffix: '%', labelKey: 'stats.satisfaction' },
  ];

  return (
    <section ref={ref} className="section-padding">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
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
