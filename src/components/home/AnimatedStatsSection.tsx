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
      className="text-center"
      // ΑΛΛΑΓΗ ΕΔΩ: y: 200 (Ξεκινάει 200 pixels πιο κάτω)
      initial={{ opacity: 0, y: 200 }}
      // Όταν φανεί, πάει στο 0
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
      transition={{ 
        duration: 1.2, // Αύξησα τη διάρκεια για να είναι πιο ομαλή η μεγάλη διαδρομή
        ease: "easeOut",
        delay: index * 0.2 // Λίγο μεγαλύτερη καθυστέρηση ανάμεσα τους
      }}
    >
      <div className="text-4xl md:text-5xl font-bold mb-2">
        {count}{suffix}
      </div>
      <div className="opacity-70 text-sm">
        {label}
      </div>
    </motion.div>
  );
};

const AnimatedStatsSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  // Αυξήσαμε το margin σε -150px για να ξεκινήσει το animation λίγο πιο νωρίς καθώς σκρολάρεις
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  const stats = [
    { endValue: 30, suffix: '+', labelKey: 'stats.years' },
    { endValue: 1500, suffix: '+', labelKey: 'stats.clients' },
    { endValue: 300, suffix: 'K+', labelKey: 'stats.bags' },
    { endValue: 100, suffix: '%', labelKey: 'stats.satisfaction' },
  ];

  return (
    // overflow-hidden για να μην φαίνονται όσο έρχονται από κάτω εκτός ορίων
    <section ref={ref} className="section-padding overflow-hidden">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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