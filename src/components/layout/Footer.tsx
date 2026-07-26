import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, ArrowUp, ArrowRight } from 'lucide-react';
import footerLogo from '@/assets/footer-logo.png';

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
    <footer className="footer-section relative overflow-hidden">
      <div className="container-page pt-14 md:pt-20 pb-8 relative">

        {/* CTA band — the Laderos signature row */}
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-7 pb-12 md:pb-14 border-b-2"
          style={{ borderColor: 'hsl(220 55% 8% / 0.3)' }}
        >
          <h2 className="max-w-2xl text-3xl sm:text-4xl md:text-5xl">
            {t('cta.title')}
          </h2>
          <Link
            to="/contact#quote"
            className="group inline-flex items-center gap-4 font-extrabold uppercase tracking-[0.05em] text-sm md:text-base flex-shrink-0"
          >
            {language === 'el' ? 'Ζητήστε προσφορά' : 'Request a quote'}
            <span
              className="w-14 h-14 rounded-full border-2 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1.5"
              style={{ borderColor: ink }}
            >
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 pt-12 md:pt-14">
          {/* Brand / description / contact */}
          <div className="lg:col-span-5 space-y-5">
            <img src={footerLogo} alt="Laderos Bags" className="h-12 md:h-14 w-auto" />
            <p className="max-w-sm leading-relaxed text-[15px] font-medium opacity-90">
              {t('footer.description')}
            </p>
            <ul className="space-y-3 pt-1">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="text-[15px] font-semibold">Ελασσώνος 13, Αχαρνές 136 72</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0" />
                <div className="flex flex-col gap-1 text-[15px] font-semibold">
                  <a href="tel:+306972661870" className="hover:opacity-70 transition-opacity">697 266 1870</a>
                  <a href="tel:+302102443550" className="hover:opacity-70 transition-opacity">210 244 3550</a>
                  <a href="tel:+302102443800" className="hover:opacity-70 transition-opacity">210 244 3800</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-1 flex-shrink-0" />
                <a href="mailto:laderosbags@gmail.gr" className="text-[15px] font-semibold hover:opacity-70 transition-opacity break-all">
                  laderosbags@gmail.gr
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-4 lg:col-start-7">
            <h4
              className="text-base md:text-lg mb-6 inline-block pb-1.5 border-b-4"
              style={{ borderColor: ink }}
            >
              {language === 'el' ? 'Πλοήγηση' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5">
              {navCol.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="link-underline text-[14px] font-extrabold uppercase tracking-[0.04em] hover:opacity-80 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* General */}
          <div className="lg:col-span-3">
            <h4
              className="text-base md:text-lg mb-6 inline-block pb-1.5 border-b-4"
              style={{ borderColor: ink }}
            >
              {language === 'el' ? 'Γενικά' : 'General'}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/privacy-policy"
                  className="link-underline text-[14px] font-extrabold uppercase tracking-[0.04em] hover:opacity-80 transition-opacity"
                >
                  {language === 'el' ? 'Πολιτική Απορρήτου' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact#quote"
                  className="link-underline text-[14px] font-extrabold uppercase tracking-[0.04em] hover:opacity-80 transition-opacity"
                >
                  {language === 'el' ? 'Ζητήστε προσφορά' : 'Request a quote'}
                </Link>
              </li>
            </ul>

            {/* Back to top */}
            <button
              onClick={scrollTop}
              aria-label={language === 'el' ? 'Επιστροφή στην κορυφή' : 'Back to top'}
              className="mt-8 w-12 h-12 rounded-full border-2 flex items-center justify-center hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
              style={{ borderColor: ink }}
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 border-t-2"
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
