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
    { name: 'Partner 9', logo: '/logos/galifianakis_logo.jpg' }
  ];

  // --- CONFIGURATION: BOTTOM ROW ---
  const bottomPartners = [
    { name: 'Partner 10', logo: '/logos/morris_logo.png' },
    { name: 'Partner 11', logo: '/logos/cashew_logo.png' },
    { name: 'Partner 12', logo: '/logos/ragazzi_logo.png' },
    { name: 'Partner 13', logo: '/logos/annas_secret_logo.jpg' },
    { name: 'Partner 14', logo: '/logos/dionisos_logo.png' },
    { name: 'Partner 15', logo: '/logos/sagiakos_logo.png' },
    { name: 'Partner 16', logo: '/logos/casba_logo.jpeg' },
    { name: 'Partner 17', logo: '/logos/hondou_logo.jpg' },
    { name: 'Partner 18', logo: '/logos/redbull_logo.png' }
  ];

  const duplicatedTop = [...topPartners, ...topPartners, ...topPartners];
  const duplicatedBottom = [...bottomPartners, ...bottomPartners, ...bottomPartners];

  return (
    <section className="py-12 md:py-16 lg:py-20 overflow-hidden bg-white">
      <style>{`
        @keyframes infinite-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes infinite-scroll-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .animate-infinite-scroll-left {
          animation: infinite-scroll-left 30s linear infinite;
        }
        .animate-infinite-scroll-right {
          animation: infinite-scroll-right 30s linear infinite;
        }
        /* Ensure the width is wide enough to hold all items in a single line */
        .scroll-track {
          width: max-content;
        }
      `}</style>

      <div className="container-page mb-8 md:mb-10">
        <AnimatedSection className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            {t('trustedBy.title')}
          </h2>
        </AnimatedSection>
      </div>

      <div className="relative">
        {/* Fades on the sides (kept white to match bg) */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Top carousel - moves LEFT */}
        <div className="relative w-full overflow-hidden mb-4 md:mb-6">
          <div className="flex scroll-track animate-infinite-scroll-left">
            {duplicatedTop.map((partner, index) => (
              <div
                key={`top-${index}`}
                className="flex-shrink-0 mx-2 md:mx-3"
              >
                {/* ΑΛΛΑΓΗ ΕΔΩ: Αφαιρέθηκαν τα opacity-50, grayscale, hover effects */}
                <div className="w-24 h-16 md:w-32 md:h-20 lg:w-40 lg:h-24 flex items-center justify-center">
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

        {/* Bottom carousel - moves RIGHT */}
        <div className="relative w-full overflow-hidden">
          <div className="flex scroll-track animate-infinite-scroll-right">
            {duplicatedBottom.map((partner, index) => (
              <div
                key={`bottom-${index}`}
                className="flex-shrink-0 mx-2 md:mx-3"
              >
                {/* ΑΛΛΑΓΗ ΕΔΩ: Αφαιρέθηκαν τα opacity-50, grayscale, hover effects */}
                <div className="w-24 h-16 md:w-32 md:h-20 lg:w-40 lg:h-24 flex items-center justify-center">
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