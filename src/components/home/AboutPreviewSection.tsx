import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Play } from 'lucide-react';

const AboutPreviewSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Video Placeholder - Left Side */}
          <AnimatedSection delay={0.1}>
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
          </AnimatedSection>

          {/* Text Content - Right Side */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
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
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutPreviewSection;
