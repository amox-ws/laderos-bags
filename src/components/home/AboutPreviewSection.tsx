import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const AboutPreviewSection = () => {
  const { t } = useLanguage();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // 1. Observer: Παίζει όταν φαίνεται, σταματάει όταν κρύβεται
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          try {
            videoEl.muted = true;
            await videoEl.play();
          } catch (err) {
            console.log('Autoplay blocked:', err);
          }
        } else {
          videoEl.pause();
          // Αν σκρολάρεις μακριά, ακυρώνουμε την επανεκκίνηση αν περιμένει
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
      },
      { threshold: 0.5 }
    );

    // 2. Logic: Όταν τελειώσει, περίμενε και ξαναπαίξε
    const handleVideoEnd = () => {
      // Περιμένουμε 2000ms (2 δευτερόλεπτα) πριν το replay
      timeoutRef.current = setTimeout(() => {
        videoEl.currentTime = 0; // Γυρνάμε στην αρχή
        videoEl.play().catch(() => {});
      }, 2000); 
    };

    videoEl.addEventListener('ended', handleVideoEnd);
    observer.observe(videoEl);

    return () => {
      videoEl.removeEventListener('ended', handleVideoEnd);
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* VIDEO BOX - LEFT SIDE */}
          <motion.div 
            initial={{ x: -300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full p-6 lg:p-10" 
          >
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border border-border shadow-elevated">
              <video
                ref={videoRef}
                src="/videos/experience.mp4"
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="metadata"
                // ΣΗΜΑΝΤΙΚΟ: Αφαιρέσαμε το loop εδω
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </div>
          </motion.div>

          {/* TEXT CONTENT - RIGHT SIDE */}
          <motion.div 
            initial={{ x: 300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              {t('aboutPreview.title')}
            </h3>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {t('aboutPreview.text')}
            </p>
            <Button 
              asChild 
              variant="default" 
              size="lg"
              className="mt-4 transition-all duration-300 hover:scale-[1.02]"
            >
              <Link to="/about">
                {t('aboutPreview.button')}
              </Link>
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutPreviewSection;