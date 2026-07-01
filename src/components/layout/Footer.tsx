import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import footerLogo from '@/assets/footer-logo.png';

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/products', label: t('nav.products') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="footer-section relative overflow-hidden">
      {/* Ambient navy glow */}
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] w-[40rem] h-[40rem] rounded-full opacity-[0.18] blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(var(--brand-blue)) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="container-page pt-20 pb-10 md:pt-28 md:pb-14 relative">
        {/* Brand statement */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 pb-14 md:pb-20 border-b border-white/10">
          <div className="lg:col-span-5">
            <img src={footerLogo} alt="Laderos Bags" className="h-14 md:h-16 w-auto mb-7" />
            <p className="opacity-60 max-w-sm leading-relaxed text-[15px]">
              {t('footer.description')}
            </p>
            <Link
              to="/contact"
              className="link-underline mt-8 text-brand-light text-sm font-semibold uppercase tracking-[0.18em]"
            >
              {language === 'el' ? 'Ζητήστε προσφορά' : 'Request a quote'}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.26em] mb-6 text-brand-light/80">
              {language === 'el' ? 'Πλοήγηση' : 'Navigation'}
            </h4>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1.5 opacity-65 hover:opacity-100 transition-all duration-300 text-[15px]"
                  >
                    <span className="link-underline">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.26em] mb-6 text-brand-light/80">
              {t('contact.info.title')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 opacity-65">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-brand-light" />
                <span className="text-[15px] leading-relaxed">Ελασσώνος 13, Αχαρνές 136 72</span>
              </li>
              <li className="flex items-start gap-3 opacity-65">
                <Phone className="h-4 w-4 flex-shrink-0 mt-1 text-brand-light" />
                <div className="flex flex-col gap-1.5">
                  <a href="tel:+306972661870" className="text-[15px] hover:opacity-100 hover:text-brand-light transition-all">697 266 1870</a>
                  <a href="tel:+302102443550" className="text-[15px] hover:opacity-100 hover:text-brand-light transition-all">210 244 3550</a>
                  <a href="tel:+302102443800" className="text-[15px] hover:opacity-100 hover:text-brand-light transition-all">210 244 3800</a>
                </div>
              </li>
              <li className="flex items-start gap-3 opacity-65">
                <Mail className="h-4 w-4 flex-shrink-0 mt-1 text-brand-light" />
                <a href="mailto:laderosbags@gmail.com" className="text-[15px] hover:opacity-100 hover:text-brand-light transition-all break-all">laderosbags@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="opacity-40 text-xs tracking-wider order-2 md:order-1">
            © {currentYear} Laderos Bags. {t('footer.rights')}.
          </p>
          <div className="flex items-center gap-6 order-1 md:order-2">
            <Link to="/privacy-policy" className="opacity-50 hover:opacity-90 transition-all duration-300 text-xs uppercase tracking-[0.15em]">
              {language === 'el' ? 'Πολιτική Απορρήτου' : 'Privacy Policy'}
            </Link>
            <span className="opacity-30 text-[11px] tracking-wider">
              Powered by{' '}
              <a href="https://www.amox.gr" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-brand-light transition-all">
                Amox
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
