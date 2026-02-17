import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';
import footerLogo from '@/assets/footer-logo.png';

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="container-page pt-16 pb-10 md:pt-24 md:pb-12">
        {/* Top accent line */}
        <div className="w-12 h-[2px] bg-primary/40 mb-12 md:mb-16" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img src={footerLogo} alt="Laderos Bags" className="h-14 md:h-16 w-auto" />
            </div>
            <p className="opacity-60 max-w-sm text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-6 opacity-50" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="opacity-60 hover:opacity-100 transition-all duration-300 text-sm">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="opacity-60 hover:opacity-100 transition-all duration-300 text-sm">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="opacity-60 hover:opacity-100 transition-all duration-300 text-sm">
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="opacity-60 hover:opacity-100 transition-all duration-300 text-sm">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-6 opacity-50" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              {t('contact.info.title')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 opacity-60">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Αθήνα, Ελλάδα</span>
              </li>
              <li className="flex items-center gap-3 opacity-60">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+306972661870" className="text-sm hover:opacity-100 transition-opacity">697 266 1870</a>
              </li>
              <li className="flex items-center gap-3 opacity-60">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">laderosbags@gmail.gr</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col items-center gap-3">
          <Link to="/privacy-policy" className="opacity-40 hover:opacity-80 transition-all duration-300 text-xs uppercase tracking-[0.15em]">
            {language === 'el' ? 'Πολιτική Απορρήτου' : 'Privacy Policy'}
          </Link>
          <p className="text-center opacity-30 text-xs tracking-wider">
            © {currentYear} Laderos Bags. {t('footer.rights')}.
          </p>
          <p className="text-center opacity-20 text-[11px] mt-1 tracking-wider">
            Powered by{' '}
            <a href="https://www.amox.gr" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
              Amox
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;