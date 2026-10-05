import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/components/LocalizedLink';

const CookieConsentBanner = () => {
  const { consent, acceptCookies, declineCookies } = useCookieConsent();
  const { language } = useLanguage();
  const isGreek = language === 'el';

  return (
    <AnimatePresence>
      {consent === 'pending' && (
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="fixed inset-x-3 bottom-3 z-[90] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-[26rem]"
          role="dialog"
          aria-live="polite"
          aria-label={isGreek ? 'Cookies' : 'Cookies'}
        >
          <div className="rounded-[1.5rem] bg-ink p-5 text-paper shadow-[0_30px_60px_-20px_hsl(var(--ink)/0.6)] ring-1 ring-paper/10 sm:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-light">Cookies</p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-paper/75">
              {isGreek
                ? 'Ο ιστότοπός μας χρησιμοποιεί cookies τρίτων (Google Maps) και εργαλεία ανάλυσης (Vercel Analytics) για τη βελτίωση της εμπειρίας σας. Μπορείτε να αποδεχτείτε ή να απορρίψετε τη χρήση τους.'
                : 'Our website uses third-party cookies (Google Maps) and analytics tools (Vercel Analytics) to improve your experience. You can accept or decline their use.'}
              {' '}
              <Link to="/privacy-policy" className="text-paper underline decoration-paper/30 underline-offset-4 transition-colors hover:decoration-paper">
                {isGreek ? 'Πολιτική Απορρήτου' : 'Privacy Policy'}
              </Link>
            </p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={declineCookies}
                className="h-11 flex-1 rounded-full text-sm text-paper/80 ring-1 ring-inset ring-paper/20 transition-all duration-300 hover:text-paper hover:ring-paper/60 active:scale-[0.97]"
              >
                {isGreek ? 'Απόρριψη' : 'Decline'}
              </button>
              <button
                onClick={acceptCookies}
                className="h-11 flex-1 rounded-full bg-paper text-sm text-ink transition-all duration-300 hover:bg-white active:scale-[0.97]"
              >
                {isGreek ? 'Αποδοχή' : 'Accept'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;
