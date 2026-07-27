import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, ArrowUp, ArrowRight } from 'lucide-react';

const ink = 'hsl(220 55% 8%)';

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const navCol = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/products/paper-bags', label: t('nav.products.paper') },
    { href: '/products/plastic-bags', label: t('nav.products.plastic') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      className="footer-section relative overflow-hidden"
      style={{ boxShadow: '0 -36px 70px -36px rgba(0, 0, 0, 0.55)' }}
    >
      <div className="container-page pt-10 md:pt-12 pb-6 relative">

        {/* Giant wordmark — the reveal leads with this */}
        <div
          aria-hidden
          className="select-none leading-[0.85] font-extrabold uppercase tracking-[-0.03em] whitespace-nowrap text-[11vw] lg:text-[8.5rem]"
          style={{ color: ink }}
        >
          Laderos Bags
        </div>

        {/* CTA row */}
        <div
          className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-y-2 py-5"
          style={{ borderColor: 'hsl(220 55% 8% / 0.3)' }}
        >
          <h4 className="text-xl md:text-2xl max-w-xl">
            {t('cta.title')}
          </h4>
          <Link
            to="/contact#quote"
            className="group inline-flex items-center gap-3.5 font-extrabold uppercase tracking-[0.05em] text-sm flex-shrink-0"
          >
            {language === 'el' ? 'Ζητήστε προσφορά' : 'Request a quote'}
            <span
              className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1.5"
              style={{ borderColor: ink }}
            >
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pt-8">
          {/* Description + contact */}
          <div className="lg:col-span-5 space-y-4">
            <p className="max-w-sm leading-relaxed text-sm font-medium opacity-90">
              {t('footer.description')}
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm font-semibold">Ελασσώνος 13, Αχαρνές 136 72</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm font-semibold">
                  <a href="tel:+306972661870" className="hover:opacity-70 transition-opacity">697 266 1870</a>
                  {' · '}
                  <a href="tel:+302102443550" className="hover:opacity-70 transition-opacity">210 244 3550</a>
                  {' · '}
                  <a href="tel:+302102443800" className="hover:opacity-70 transition-opacity">210 244 3800</a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:laderosbags@gmail.com" className="text-sm font-semibold hover:opacity-70 transition-opacity break-all">
                  laderosbags@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-4 lg:col-start-7">
            <h4
              className="text-base mb-4 inline-block pb-1 border-b-4"
              style={{ borderColor: ink }}
            >
              {language === 'el' ? 'Πλοήγηση' : 'Navigation'}
            </h4>
            <ul className="space-y-1.5">
              {navCol.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="link-underline text-[13px] font-extrabold uppercase tracking-[0.04em] hover:opacity-80 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* General + back to top */}
          <div className="lg:col-span-3">
            <h4
              className="text-base mb-4 inline-block pb-1 border-b-4"
              style={{ borderColor: ink }}
            >
              {language === 'el' ? 'Γενικά' : 'General'}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  to="/privacy-policy"
                  className="link-underline text-[13px] font-extrabold uppercase tracking-[0.04em] hover:opacity-80 transition-opacity"
                >
                  {language === 'el' ? 'Πολιτική Απορρήτου' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact#quote"
                  className="link-underline text-[13px] font-extrabold uppercase tracking-[0.04em] hover:opacity-80 transition-opacity"
                >
                  {language === 'el' ? 'Ζητήστε προσφορά' : 'Request a quote'}
                </Link>
              </li>
            </ul>

            <button
              onClick={scrollTop}
              aria-label={language === 'el' ? 'Επιστροφή στην κορυφή' : 'Back to top'}
              className="mt-6 w-11 h-11 rounded-full border-2 flex items-center justify-center hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
              style={{ borderColor: ink }}
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 border-t-2"
          style={{ borderColor: 'hsl(220 55% 8% / 0.25)' }}
        >
          <p className="text-xs font-bold tracking-wide">
            © {currentYear} Laderos Bags. {t('footer.rights')}.
          </p>
          <span className="text-xs font-bold tracking-wide opacity-80">
            Powered by{' '}
            <a href="https://www.amox.gr" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
              Amox
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
