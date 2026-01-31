import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';

const WhereToFindUsSection = () => {
  const { t } = useLanguage();

  // Google Maps embed URL for Ελασσώνος 13, Αχαρνές 136 72, Greece
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3140.8!2d23.7316!3d38.0847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1a2f8a8a8a8a8%3A0x0!2zRWxhc3Nvbm9zIDEzLCBBY2hhcm5lcyAxMzYgNzIsIEdyZWVjZQ!5e0!3m2!1sen!2sgr!4v1700000000000!5m2!1sen!2sgr";

  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Map Column */}
          <AnimatedSection>
            <div className="rounded-xl overflow-hidden shadow-elevated aspect-video lg:aspect-[4/3]">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('whereToFindUs.title')}
                className="w-full h-full min-h-[300px] lg:min-h-[400px]"
              />
            </div>
          </AnimatedSection>

          {/* Text Content Column */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                {t('whereToFindUs.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {t('whereToFindUs.text')}
              </p>
              <Button variant="default" size="lg" asChild className="group">
                <Link to="/contact">
                  {t('whereToFindUs.button')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default WhereToFindUsSection;
