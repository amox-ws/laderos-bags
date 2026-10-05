import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapPlaceholderProps {
  className?: string;
}

const MapPlaceholder = ({ className = '' }: MapPlaceholderProps) => {
  const { acceptCookies } = useCookieConsent();
  const { language } = useLanguage();
  const isGreek = language === 'el';

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center gap-5 overflow-hidden bg-paper-deep p-8 text-center',
        className
      )}
      style={{ borderRadius: 'var(--radius-media)' }}
    >
      {/* Faint street grid, so the empty frame still reads as a map */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--ink) / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--ink) / 0.06) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 75%)',
        }}
      />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper shadow-lg">
        <span className="absolute inset-0 animate-ping rounded-full bg-brand/30" />
        <MapPin className="relative h-5 w-5" strokeWidth={1.5} />
      </span>
      <p className="relative max-w-xs text-sm text-ink/65">
        {isGreek
          ? 'Αποδεχτείτε τα cookies για να δείτε τον χάρτη Google Maps.'
          : 'Accept cookies to view the Google Maps map.'}
      </p>
      <button
        onClick={acceptCookies}
        className="relative h-10 rounded-full bg-ink px-5 text-sm text-paper transition-all duration-500 ease-out-expo hover:bg-brand active:scale-[0.97]"
      >
        {isGreek ? 'Αποδοχή Cookies' : 'Accept Cookies'}
      </button>
    </div>
  );
};

export default MapPlaceholder;
