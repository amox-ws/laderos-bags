import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion'; // <--- Import Framer Motion

const AboutPreviewSection = () => {
  const { t } = useLanguage();

  return (
    // ΠΡΟΣΟΧΗ: overflow-hidden για να μην χαλάει το width της σελίδας
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Video Placeholder - Left Side (Έρχεται από τα αριστερά: -300px) */}
          <motion.div 
            initial={{ x: -300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full"
          >
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border border-border shadow-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors duration-300">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-primary ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-sm text-muted-foreground">
                Video Coming Soon
              </div>
            </div>
          </motion.div>

          {/* Text Content - Right Side (Έρχεται από τα δεξιά: 300px) */}
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