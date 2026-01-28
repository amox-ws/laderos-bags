import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/ui/AnimatedSection';

const TrustedBySection = () => {
  const { t } = useLanguage();

  // Placeholder logos for top carousel (10 logos)
  const topPartners = Array.from({ length: 10 }, (_, i) => ({
    name: `Partner ${i + 1}`,
    placeholder: true,
  }));

  // Placeholder logos for bottom carousel (10 logos)
  const bottomPartners = Array.from({ length: 10 }, (_, i) => ({
    name: `Partner ${i + 11}`,
    placeholder: true,
  }));

  // Duplicate for seamless infinite scroll
  const duplicatedTop = [...topPartners, ...topPartners];
  const duplicatedBottom = [...bottomPartners, ...bottomPartners];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background overflow-hidden">
      <div className="container-page mb-8 md:mb-10">
        <AnimatedSection className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            {t('trustedBy.title')}
          </h2>
        </AnimatedSection>
      </div>

      {/* Carousels container with edge fade */}
      <div className="relative">
        {/* Left fade overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        
        {/* Right fade overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Top carousel - moves right to left */}
        <div className="relative w-full overflow-hidden mb-4 md:mb-6">
          <div className="flex animate-scroll-left">
            {duplicatedTop.map((partner, index) => (
              <div
                key={`top-${index}`}
                className="flex-shrink-0 mx-2 md:mx-3"
              >
                <div className="w-20 h-12 md:w-28 md:h-16 lg:w-32 lg:h-18 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300">
                  {partner.placeholder ? (
                    <div className="w-full h-full rounded-md border border-border/30 flex items-center justify-center bg-muted/20">
                      <span className="text-xs md:text-sm font-medium text-muted-foreground/60">
                        Logo {(index % 10) + 1}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={partner.name}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom carousel - moves left to right */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll-right">
            {duplicatedBottom.map((partner, index) => (
              <div
                key={`bottom-${index}`}
                className="flex-shrink-0 mx-2 md:mx-3"
              >
                <div className="w-20 h-12 md:w-28 md:h-16 lg:w-32 lg:h-18 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300">
                  {partner.placeholder ? (
                    <div className="w-full h-full rounded-md border border-border/30 flex items-center justify-center bg-muted/20">
                      <span className="text-xs md:text-sm font-medium text-muted-foreground/60">
                        Logo {(index % 10) + 11}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={partner.name}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
