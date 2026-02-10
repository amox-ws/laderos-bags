import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CookieConsentBanner = () => {
  const { consent, acceptCookies, declineCookies } = useCookieConsent();
  const { language } = useLanguage();
  const isGreek = language === 'el';

  return (
    <AnimatePresence>
      {consent === 'pending' && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container-page">
            <div className="bg-card border border-border rounded-xl shadow-lg p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
              <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-0.5 md:mt-0" />
              <div className="flex-1">
                <p className="text-sm text-foreground leading-relaxed">
                  {isGreek
                    ? 'Ο ιστότοπός μας χρησιμοποιεί cookies τρίτων (Google Maps) για την εμφάνιση χαρτών. Μπορείτε να αποδεχτείτε ή να απορρίψετε τη χρήση τους.'
                    : 'Our website uses third-party cookies (Google Maps) to display maps. You can accept or decline their use.'}
                  {' '}
                  <Link to="/privacy-policy" className="text-primary underline underline-offset-2 hover:opacity-80">
                    {isGreek ? 'Πολιτική Απορρήτου' : 'Privacy Policy'}
                  </Link>
                </p>
              </div>
              <div className="flex gap-3 flex-shrink-0 w-full md:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={declineCookies}
                  className="flex-1 md:flex-none"
                >
                  {isGreek ? 'Απόρριψη' : 'Decline'}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={acceptCookies}
                  className="flex-1 md:flex-none"
                >
                  {isGreek ? 'Αποδοχή' : 'Accept'}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;
