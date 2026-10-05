import { Link } from '@/components/LocalizedLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, ArrowUp, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { ADDRESS_LINE, SOCIAL_PROFILES, type SOCIAL_LINKS } from '@/lib/seo';
import ArrowButton from '@/components/ui/ArrowButton';
import { scrollWindowTo } from '@/lib/smoothScroll';

const TikTok = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 3a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.7V15a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V3z" />
  </svg>
);

const SOCIAL_META: Record<keyof typeof SOCIAL_LINKS, { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }> = {
  facebook: { label: 'Facebook', Icon: Facebook },
  instagram: { label: 'Instagram', Icon: Instagram },
  linkedin: { label: 'LinkedIn', Icon: Linkedin },
  youtube: { label: 'YouTube', Icon: Youtube },
  tiktok: { label: 'TikTok', Icon: TikTok },
};

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const navCol = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/products/paper-bags', label: t('nav.products.paper') },
    { href: '/products/plastic-bags', label: t('nav.products.plastic') },
    { href: '/products/optika', label: language === 'el' ? 'Οπτικά' : 'Optical' },
    { href: '/products/paidika', label: language === 'el' ? 'Παιδικά' : 'Kids' },
    { href: '/products/andrika', label: language === 'el' ? 'Ανδρικά' : 'Menswear' },
    { href: '/products/gynaikeia', label: language === 'el' ? 'Γυναικεία' : 'Womenswear' },
    { href: '/products/oikologika', label: language === 'el' ? 'Οικολογικά' : 'Eco-Friendly' },
    { href: '/contact', label: t('nav.contact') },
  ];

  const scrollTop = () => scrollWindowTo(0, 'smooth');

  const linkClass = 'link-underline text-[15px] text-paper/70 transition-colors duration-300 hover:text-paper';
  const labelClass = 'mb-6 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/40';

  return (
    <footer
      className="footer-section relative overflow-hidden rounded-t-panel"
      style={{ boxShadow: '0 -40px 80px -40px hsl(224 44% 9% / 0.55)' }}
    >
      {/* Soft blue light from the top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] opacity-70"
        style={{ background: 'radial-gradient(60% 100% at 50% 0%, hsl(213 66% 45% / 0.22), transparent 70%)' }}
      />

      <div className="container-page relative pt-20 md:pt-28">
        {/* CTA row */}
        <div className="flex flex-col gap-10 border-b border-paper/10 pb-16 md:flex-row md:items-end md:justify-between md:pb-20">
          <h4 className="max-w-3xl text-[clamp(2.4rem,1.4rem+4vw,5.5rem)] leading-[0.98] tracking-[-0.03em] text-paper">
            {t('cta.title')}
          </h4>
          <ArrowButton to="/contact#quote" variant="paper" size="lg" className="self-start md:self-auto">
            {language === 'el' ? 'Ζητήστε προσφορά' : 'Request a quote'}
          </ArrowButton>
        </div>

        <div className="grid gap-12 pt-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 md:pt-16">
          {/* Description + contact */}
          <div className="space-y-7 lg:col-span-5">
            <p className="max-w-sm font-display text-2xl leading-snug tracking-[-0.015em] text-paper/90">
              {t('footer.description')}
            </p>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3.5">
                <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-brand-light" strokeWidth={1.5} />
                <span className="text-[15px] text-paper/70">{ADDRESS_LINE[language === 'en' ? 'en' : 'el']}</span>
              </li>
              <li className="flex items-start gap-3.5">
                <Phone className="mt-1 h-4 w-4 flex-shrink-0 text-brand-light" strokeWidth={1.5} />
                <span className="text-[15px] text-paper/70 tabular">
                  <a href="tel:+306972661870" className="transition-colors hover:text-paper">697 266 1870</a>
                  <span className="px-2 text-paper/25">·</span>
                  <a href="tel:+302102443550" className="transition-colors hover:text-paper">210 244 3550</a>
                  <span className="px-2 text-paper/25">·</span>
                  <a href="tel:+302102443800" className="transition-colors hover:text-paper">210 244 3800</a>
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <Mail className="mt-1 h-4 w-4 flex-shrink-0 text-brand-light" strokeWidth={1.5} />
                <a href="mailto:laderosbags@gmail.com" className="break-all text-[15px] text-paper/70 transition-colors hover:text-paper">
                  laderosbags@gmail.com
                </a>
              </li>
            </ul>
            {/* Social profiles — shown only for the ones filled in SOCIAL_LINKS (src/lib/seo.ts) */}
            {SOCIAL_PROFILES.length > 0 && (
              <ul className="flex items-center gap-2.5 pt-1">
                {SOCIAL_PROFILES.map(({ network, url }) => {
                  const { label, Icon } = SOCIAL_META[network];
                  return (
                    <li key={network}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Laderos Bags — ${label}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-all duration-300 hover:border-paper hover:text-paper"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Navigation */}
          <div className="lg:col-span-4 lg:col-start-7">
            <h4 className={labelClass}>{language === 'el' ? 'Πλοήγηση' : 'Navigation'}</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {navCol.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* General + back to top */}
          <div className="flex flex-col lg:col-span-2 lg:col-start-11">
            <h4 className={labelClass}>{language === 'el' ? 'Γενικά' : 'General'}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy-policy" className={linkClass}>
                  {language === 'el' ? 'Πολιτική Απορρήτου' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link to="/contact#quote" className={linkClass}>
                  {language === 'el' ? 'Ζητήστε προσφορά' : 'Request a quote'}
                </Link>
              </li>
            </ul>

            <button
              onClick={scrollTop}
              aria-label={language === 'el' ? 'Επιστροφή στην κορυφή' : 'Back to top'}
              className="group mt-8 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-paper/20 transition-colors duration-500 hover:border-paper hover:bg-paper hover:text-ink"
            >
              <span className="relative block h-4 w-4 overflow-hidden">
                <ArrowUp className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-[180%]" strokeWidth={1.75} />
                <ArrowUp className="absolute inset-0 h-4 w-4 translate-y-[180%] transition-transform duration-500 ease-out-expo group-hover:translate-y-0" strokeWidth={1.75} />
              </span>
            </button>
          </div>
        </div>

        {/* Giant wordmark — set like the bag print, fading into the ink */}
        <div
          aria-hidden
          className="footer-wordmark pointer-events-none mt-16 select-none whitespace-nowrap text-center font-display leading-[0.78] tracking-[-0.045em] md:mt-20"
          style={{
            backgroundImage: 'linear-gradient(180deg, hsl(40 20% 95% / 0.95) 10%, hsl(40 20% 95% / 0.08) 95%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Laderos Bags
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-paper/10 py-6 md:flex-row">
          <p className="font-mono text-[11px] tracking-[0.06em] text-paper/45">
            © {currentYear} Laderos Bags. {t('footer.rights')}.
          </p>
          <span className="font-mono text-[11px] tracking-[0.06em] text-paper/45">
            Powered by{' '}
            <a href="https://www.amox.gr" target="_blank" rel="noopener noreferrer" className="text-paper/70 underline underline-offset-4 transition-colors hover:text-paper">
              Amox
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
