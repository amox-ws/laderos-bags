import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const AboutPreviewSection = () => {
  const { t } = useLanguage();
  
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
          
          {/* VIDEO BOX */}
          <motion.div 
            initial={{ x: -300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
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

          {/* TEXT CONTENT */}
          <motion.div 
            initial={{ x: 300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-6 lg:space-y-8"
          >
            <div>
              <h3 className="text-foreground leading-[0.95] mb-6">
                {t('aboutPreview.title')}
              </h3>
              <div className="w-12 h-[2px] bg-primary/40" />
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

        </div>
      </div>
    </section>
  );
};

export default AboutPreviewSection;