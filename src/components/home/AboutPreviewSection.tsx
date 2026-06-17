import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const AboutPreviewSection = () => {
  const { t, language } = useLanguage();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

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
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
      },
      { threshold: 0.5 }
    );

    const handleVideoEnd = () => {
      timeoutRef.current = setTimeout(() => {
        videoEl.currentTime = 0;
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
    <section className="py-20 md:py-32 lg:py-40 overflow-hidden">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">
          
          {/* New Video (Arxiki) */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="order-1 lg:order-none lg:col-start-1 lg:row-start-1"
          >
            <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden shadow-elevated">
              <video
                src="/videos/arxikivid.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* TEXT CONTENT (Middle in Mobile, Right Col in Desktop) */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 space-y-6 lg:space-y-8"
          >
            <div>
              <span className="section-label">{language === 'el' ? 'Η εταιρεία' : 'About us'}</span>
              <h3 className="text-foreground mb-0">
                {t('aboutPreview.title')}
              </h3>
            </div>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {t('aboutPreview.text')}
            </p>
            <Button 
              asChild 
              variant="default" 
              size="lg"
              className="group mt-2"
            >
              <Link to="/about" className="inline-flex items-center gap-2">
                {t('aboutPreview.button')}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Existing Video (Experience) */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            className="order-3 lg:order-none lg:col-start-1 lg:row-start-2"
          >
            <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden shadow-elevated">
              <video
                ref={videoRef}
                src="/videos/experience.mp4"
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutPreviewSection;