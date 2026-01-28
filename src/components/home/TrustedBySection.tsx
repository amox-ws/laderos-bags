import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/ui/AnimatedSection';

const TrustedBySection = () => {
  const { t } = useLanguage();

  // Placeholder logos - replace with actual partner logos later
  const partners = [
    { name: 'Partner 1', placeholder: true },
    { name: 'Partner 2', placeholder: true },
    { name: 'Partner 3', placeholder: true },
    { name: 'Partner 4', placeholder: true },
    { name: 'Partner 5', placeholder: true },
    { name: 'Partner 6', placeholder: true },
    { name: 'Partner 7', placeholder: true },
    { name: 'Partner 8', placeholder: true },
  ];

  // Duplicate for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-secondary/30 overflow-hidden">
      <div className="container-page mb-8 md:mb-12">
        <AnimatedSection className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            {t('trustedBy.title')}
          </h2>
        </AnimatedSection>
      </div>

      {/* Infinite scrolling carousel */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll-left">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-4 md:mx-6 lg:mx-8"
            >
              <div className="w-28 h-16 md:w-36 md:h-20 lg:w-44 lg:h-24 bg-card rounded-lg shadow-sm flex items-center justify-center border border-border/50 transition-all duration-300 hover:shadow-md hover:border-border">
                {partner.placeholder ? (
                  <div className="text-center px-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-1 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs md:text-sm font-semibold text-muted-foreground">
                        {index % partners.length + 1}
                      </span>
                    </div>
                    <span className="text-[10px] md:text-xs text-muted-foreground">Logo</span>
                  </div>
                ) : (
                  <img
                    src={partner.name}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain p-2"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
