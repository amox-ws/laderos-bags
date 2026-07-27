import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import MapPlaceholder from '@/components/MapPlaceholder';

const WhereToFindUsSection = () => {
  const { t, language } = useLanguage();
  const { hasConsented } = useCookieConsent();
  const mapEmbedUrl = "https://maps.google.com/maps?q=38.098358,23.7499251&z=16&hl=el&output=embed";

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
          
          {/* Map Column */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {hasConsented ? (
              <div className="rounded-2xl overflow-hidden shadow-elevated aspect-video lg:aspect-[4/3]">
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
            ) : (
              <MapPlaceholder className="aspect-video lg:aspect-[4/3] min-h-[300px] lg:min-h-[400px] rounded-2xl" />
            )}
          </motion.div>

          {/* Text Content Column */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="space-y-6 lg:space-y-8">
              <div>
                <span className="section-label">{language === 'el' ? 'Η έδρα μας' : 'Our location'}</span>
                <h3 className="text-foreground mb-0">
                  {t('whereToFindUs.title')}
                </h3>
              </div>
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
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhereToFindUsSection;