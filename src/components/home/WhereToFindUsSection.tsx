import { useLanguage } from '@/contexts/LanguageContext';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import MapPlaceholder from '@/components/MapPlaceholder';
import ArrowButton from '@/components/ui/ArrowButton';
import { Reveal, RevealHeading } from '@/components/ui/Reveal';

const WhereToFindUsSection = () => {
  const { t } = useLanguage();
  const { hasConsented } = useCookieConsent();
  const mapEmbedUrl = "https://maps.google.com/maps?q=38.098358,23.7499251&z=16&hl=el&output=embed";

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Map Column */}
          <Reveal className="lg:col-span-7" y={50}>
            {hasConsented ? (
              <div className="media-frame group aspect-[4/3] shadow-elevated lg:aspect-[16/11]">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t('whereToFindUs.title')}
                  className="h-full min-h-[300px] w-full grayscale-[0.85] contrast-[1.05] transition-[filter] duration-700 group-hover:grayscale-0 lg:min-h-[400px]"
                />
              </div>
            ) : (
              <MapPlaceholder className="aspect-[4/3] min-h-[300px] lg:aspect-[16/11] lg:min-h-[400px]" />
            )}
          </Reveal>

          {/* Text Content Column */}
          <div className="space-y-8 lg:col-span-5">
            <RevealHeading
              as="h3"
              text={t('whereToFindUs.title')}
              className="mb-0 text-[clamp(2.4rem,1.5rem+3vw,4.5rem)] tracking-[-0.03em]"
            />
            <Reveal delay={0.15}>
              <p className="text-base leading-relaxed text-ink/70 md:text-[17px]">
                {t('whereToFindUs.text')}
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <ArrowButton to="/contact">{t('whereToFindUs.button')}</ArrowButton>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhereToFindUsSection;
