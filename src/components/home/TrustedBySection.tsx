import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/ui/AnimatedSection';

const TrustedBySection = () => {
  const { t } = useLanguage();

  // --- CONFIGURATION: TOP ROW ---
  const topPartners = [
    { name: 'Partner 1', logo: '/logos/NavyGreen_logo.png' },
    { name: 'Partner 2', logo: '/logos/bsb_logo.png' },
    { name: 'Partner 3', logo: '/logos/beneto_maretti_logo.png' },
    { name: 'Partner 4', logo: '/logos/kostis_logo.jpg' },
    { name: 'Partner 5', logo: '/logos/asteras_tripolis_logo.png' },
    { name: 'Partner 6', logo: '/logos/status_logo.png' },
    { name: 'Partner 7', logo: '/logos/fikos_logo.png' },
    { name: 'Partner 8', logo: '/logos/optolux_logo.jpeg' },
  ];

  // --- CONFIGURATION: BOTTOM ROW ---
  const bottomPartners = [
    { name: 'Partner 9', logo: '/logos/redbull_logo.png' },
    { name: 'Partner 10', logo: '/logos/morris_logo.png' },
    { name: 'Partner 11', logo: '/logos/cashew_logo.png' },
    { name: 'Partner 12', logo: '/logos/ragazzi_logo.png' },
    { name: 'Partner 13', logo: '/logos/annas_secret_logo.jpg' },
    { name: 'Partner 14', logo: '/logos/dionisos_logo.png' },
    { name: 'Partner 15', logo: '/logos/sagiakos_logo.png' },
    { name: 'Partner 16', logo: '/logos/casba_logo.jpeg' },
  ];

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

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Top carousel */}
        <div className="relative w-full overflow-hidden mb-4 md:mb-6">
          <div className="flex animate-scroll-left hover:pause">
            {duplicatedTop.map((partner, index) => (
              <div
                key={`top-${index}`}
                // ΑΛΛΑΓΗ ΕΔΩ: Μειώσαμε το mx-4 σε mx-2 και το mx-6 σε mx-3
                className="flex-shrink-0 mx-2 md:mx-3" 
              >
                {/* Αν θέλεις να μικρύνεις και το κουτί που πιάνει το logo, μπορείς να αλλάξεις και τα w-24 σε w-20 κλπ */}
                <div className="w-24 h-16 md:w-32 md:h-20 lg:w-40 lg:h-24 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom carousel */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll-right hover:pause">
            {duplicatedBottom.map((partner, index) => (
              <div
                key={`bottom-${index}`}
                // ΑΛΛΑΓΗ ΕΔΩ: Το ίδιο και για την κάτω σειρά
                className="flex-shrink-0 mx-2 md:mx-3"
              >
                <div className="w-24 h-16 md:w-32 md:h-20 lg:w-40 lg:h-24 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
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