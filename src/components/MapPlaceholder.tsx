import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface MapPlaceholderProps {
  className?: string;
}

const MapPlaceholder = ({ className = '' }: MapPlaceholderProps) => {
  const { acceptCookies } = useCookieConsent();
  const { language } = useLanguage();
  const isGreek = language === 'el';

  return (
    <div className={`flex flex-col items-center justify-center bg-muted/50 rounded-xl border border-border text-center p-8 gap-4 ${className}`}>
      <MapPin className="h-10 w-10 text-muted-foreground" />
      <p className="text-muted-foreground text-sm max-w-xs">
        {isGreek
          ? 'Αποδεχτείτε τα cookies για να δείτε τον χάρτη Google Maps.'
          : 'Accept cookies to view the Google Maps map.'}
      </p>
      <Button variant="default" size="sm" onClick={acceptCookies}>
        {isGreek ? 'Αποδοχή Cookies' : 'Accept Cookies'}
      </Button>
    </div>
  );
};

export default MapPlaceholder;
