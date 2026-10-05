import { useLanguage } from '@/contexts/LanguageContext';
import Marquee from '@/components/ui/Marquee';
import { RevealHeading } from '@/components/ui/Reveal';

interface TrustedBySectionProps {
  showTitle?: boolean;
}

const LogoTile = ({ name, logo }: { name: string; logo: string }) => (
  <div className="mx-2 flex h-24 w-40 flex-shrink-0 items-center justify-center rounded-2xl bg-white p-5 shadow-[inset_0_0_0_1px_hsl(var(--ink)/0.05)] md:mx-2.5 md:h-28 md:w-52 md:p-6">
    <img
      src={logo}
      alt={name}
      className="h-full w-full object-contain"
      loading="lazy"
      draggable={false}
    />
  </div>
);

const TrustedBySection = ({ showTitle = true }: TrustedBySectionProps) => {
  const { t } = useLanguage();

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

  return (
    <section className={`${showTitle ? 'py-24 md:py-32' : 'py-10 md:py-14'} overflow-hidden`}>
      {showTitle && (
        <div className="container-page mb-12 md:mb-16">
          <RevealHeading
            as="h3"
            text={t('trustedBy.title')}
            className="mb-0 text-[clamp(2.2rem,1.4rem+2.8vw,4.25rem)] tracking-[-0.03em]"
          />
        </div>
      )}

      {/* Purely a moving showcase: full colour, never pauses, not interactive */}
      <div className="mask-fade-x pointer-events-none select-none space-y-4 md:space-y-5">
        <Marquee duration={50} pauseOnHover={false}>
          {topPartners.map((partner) => (
            <LogoTile key={partner.logo} {...partner} />
          ))}
        </Marquee>
        <Marquee duration={50} reverse pauseOnHover={false}>
          {bottomPartners.map((partner) => (
            <LogoTile key={partner.logo} {...partner} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TrustedBySection;
