import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';
import footerLogo from '@/assets/footer-logo.png';
const Footer = () => {
  const {
    t,
    language
  } = useLanguage();
  const currentYear = new Date().getFullYear();
  return <footer className="footer-section">
      <div className="container-page py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img src={footerLogo} alt="Laderos Bags" className="h-16 md:h-20 w-auto" />
            </div>
            <p className="opacity-80 max-w-sm">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="opacity-80 hover:opacity-100 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="opacity-80 hover:opacity-100 transition-colors">
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="opacity-80 hover:opacity-100 transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">{t('contact.info.title')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 opacity-80">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Αθήνα, Ελλάδα</span>
              </li>
              <li className="flex items-center gap-3 opacity-80">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>+30 210 1234567</span>
              </li>
              <li className="flex items-center gap-3 opacity-80">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>laderosbags@gmail.gr</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="opacity-60 hover:opacity-100 transition-colors text-sm">
              {language === 'el' ? 'Πολιτική Απορρήτου' : 'Privacy Policy'}
            </Link>
            <span className="opacity-30">|</span>
            <Link to="/terms-of-service" className="opacity-60 hover:opacity-100 transition-colors text-sm">
              {language === 'el' ? 'Όροι Χρήσης' : 'Terms of Service'}
            </Link>
          </div>
          <p className="text-center opacity-60 text-sm">
            © {currentYear} Laderos Bags. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;