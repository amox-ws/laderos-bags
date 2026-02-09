import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const AboutPreviewSection = () => {
  const { t } = useLanguage();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  // Ref για να ξέρουμε αν έχει ήδη παίξει το βίντεο σε αυτή την επίσκεψη
  const hasPlayedOnce = useRef(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        // Παίζει μόνο αν εμφανιστεί στην οθόνη ΚΑΙ δεν έχει παίξει ήδη μέχρι το τέλος
        if (entry.isIntersecting && !hasPlayedOnce.current) {
          try {
            videoEl.muted = true;
            await videoEl.play();
          } catch (err) {
            console.log('Autoplay blocked:', err);
          }
        }
      },
      { threshold: 0.5 }
    );

    // Event listener για να μαθαίνουμε πότε τελείωσε το βίντεο
    const handleVideoEnd = () => {
      hasPlayedOnce.current = true; // Μαρκάρουμε ότι τελείωσε
    };

    videoEl.addEventListener('ended', handleVideoEnd);
    observer.observe(videoEl);

    return () => {
      videoEl.removeEventListener('ended', handleVideoEnd);
      observer.disconnect();
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
                // ΑΦΑΙΡΕΘΗΚΕ ΤΟ loop ΕΔΩ
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