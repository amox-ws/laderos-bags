import { useLocation } from 'react-router-dom';
import { Link } from '@/components/LocalizedLink';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { stripLang } from '@/lib/i18nPaths';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SlidingArrow } from '@/components/ui/ArrowButton';
import { lockScroll } from '@/lib/smoothScroll';
import logo from '@/assets/logo.png';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Preview photo shown in the products menu for each category. */
const PREVIEW: Record<string, string> = {
  '/products/paper-bags': '/paper_product/navygreen.webp',
  '/products/plastic-bags': '/laderosfoto14-10_studio_smooth_webp/navygreen-plastiki-xirolavi.webp',
  '/products/optika': '/product_bags/optolux.webp',
  '/products/paidika': '/product_bags/capolino.webp',
  '/products/andrika': '/paper_product/andrika/sakoula-kingsman.webp',
  '/products/gynaikeia': '/paper_product/woman/sakoula-annas-secret.webp',
  '/products/oikologika': '/paper_product/oikologika/sakoula-ikorganic.webp',
  '/products/peritiligmata': '/peritiligma/mix-peritiligmata.webp',
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [preview, setPreview] = useState('/products/paper-bags');
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [
    { href: '/#products-section', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const productSubLinks = [
    { href: '/products/paper-bags', label: t('nav.products.paper') },
    { href: '/products/plastic-bags', label: t('nav.products.plastic') },
    { href: '/products/optika', label: language === 'el' ? 'Οπτικά' : 'Optical' },
    { href: '/products/paidika', label: language === 'el' ? 'Παιδικά' : 'Kids' },
    { href: '/products/andrika', label: language === 'el' ? 'Ανδρικά' : 'Menswear' },
    { href: '/products/gynaikeia', label: language === 'el' ? 'Γυναικεία' : 'Womenswear' },
    { href: '/products/oikologika', label: language === 'el' ? 'Οικολογικά' : 'Eco-Friendly' },
    { href: '/products/peritiligmata', label: language === 'el' ? 'Περιτυλίγματα' : 'Tissue Paper' },
  ];

  const quoteLabel = language === 'el' ? 'Ζητήστε προσφορά' : 'Request a quote';

  const toggleLanguage = () => {
    setLanguage(language === 'el' ? 'en' : 'el');
  };

  // Compare against the Greek-form path so "/en/contact" counts as "/contact".
  const basePath = stripLang(location.pathname);
  const isActive = (path: string) => {
    if (path === '/#products-section') {
      return basePath === '/';
    }
    return basePath === path;
  };
  const isProductsActive = basePath.startsWith('/products');

  // The bar stays on screen at all times; it only gains a shadow once the page moves.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setIsScrolled(y > 20));

  // Close menus on navigation
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
  }, [location.pathname]);

  // Lock the page behind the full-screen mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsProductsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false);
    }, 180);
  };

  /** Desktop nav item: hover lozenge follows the pointer, active gets a dot. */
  const NavItem = ({ href, label, active }: { href: string; label: string; active: boolean }) => (
    <Link
      to={href}
      onMouseEnter={() => setHovered(href)}
      className={cn(
        'relative z-10 flex h-10 items-center whitespace-nowrap rounded-full px-3 text-[14px] transition-colors duration-300 lg:px-4',
        active ? 'text-ink' : 'text-ink/60 hover:text-ink'
      )}
    >
      {hovered === href && (
        <motion.span
          layoutId="nav-hover"
          className="absolute inset-0 -z-10 rounded-full bg-ink/[0.06]"
          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
        />
      )}
      {label}
      {active && (
        <motion.span
          layoutId="nav-active"
          className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand"
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        />
      )}
    </Link>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] pt-2 md:pt-4">
        <div className="container-page">
          <div
            className={cn(
              'relative flex h-14 items-center justify-between rounded-full pl-3 pr-2 transition-[background-color,box-shadow] duration-500 md:h-16 md:pl-4 md:pr-2.5',
              isMenuOpen ? 'bg-paper shadow-none' : 'glass-panel',
              isScrolled && !isMenuOpen && 'shadow-[inset_0_0_0_1px_hsl(0_0%_100%/0.55),0_18px_40px_-20px_hsl(var(--ink)/0.35)]'
            )}
          >
            {/* Logo */}
            <Link to="/" className="group flex items-center" aria-label={`Laderos Bags — ${t('nav.home')}`}>
              <img
                src={logo}
                alt="Laderos Bags"
                width={911}
                height={300}
                className="h-8 w-auto rounded-[6px] transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] md:h-10"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex"
              onMouseLeave={() => setHovered(null)}
              aria-label={language === 'el' ? 'Κύριο μενού' : 'Main menu'}
            >
              {navLinks.slice(0, 2).map((link) => (
                <NavItem key={link.href} href={link.href} label={link.label} active={isActive(link.href)} />
              ))}

              {/* Products Dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative flex items-center" onMouseEnter={() => setHovered('/products')}>
                  {hovered === '/products' && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-ink/[0.06]"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                  <Link
                    to="/products"
                    className={cn(
                      'relative z-10 flex h-10 items-center whitespace-nowrap pl-3 pr-1 text-[14px] transition-colors duration-300 lg:pl-4',
                      isProductsActive ? 'text-ink' : 'text-ink/60 hover:text-ink'
                    )}
                  >
                    {t('nav.products')}
                    {isProductsActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute bottom-1 left-[calc(50%+6px)] h-1 w-1 -translate-x-1/2 rounded-full bg-brand"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className={cn(
                      'relative z-10 flex h-10 items-center pl-0.5 pr-3 transition-colors duration-300',
                      isProductsActive || isProductsOpen ? 'text-ink' : 'text-ink/60 hover:text-ink'
                    )}
                    aria-label="Toggle products menu"
                    aria-expanded={isProductsOpen}
                  >
                    <ChevronDown
                      className={cn('h-3.5 w-3.5 transition-transform duration-500 ease-out-expo', isProductsOpen && 'rotate-180')}
                      strokeWidth={1.75}
                    />
                  </button>
                </div>

                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: '-50%', y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, x: '-50%', y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: '-50%', y: -6, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      style={{ transformOrigin: 'top center' }}
                      className="absolute left-1/2 top-full z-50 w-[min(44rem,calc(100vw-4rem))] pt-5"
                    >
                      <div className="grid grid-cols-[1.15fr_1fr] gap-2 rounded-[1.75rem] bg-white p-2 shadow-[0_40px_80px_-30px_hsl(var(--ink)/0.45),inset_0_0_0_1px_hsl(var(--ink)/0.06)]">
                        <ul className="flex flex-col py-2">
                          {productSubLinks.map((link) => (
                            <li key={link.href}>
                              <Link
                                to={link.href}
                                onMouseEnter={() => setPreview(link.href)}
                                onFocus={() => setPreview(link.href)}
                                onClick={() => setIsProductsOpen(false)}
                                className={cn(
                                  'group flex items-center gap-4 rounded-2xl px-4 py-2.5 transition-colors duration-300',
                                  preview === link.href ? 'bg-paper' : 'hover:bg-paper'
                                )}
                              >
                                <span
                                  className={cn(
                                    'flex-1 font-display text-[1.35rem] leading-tight tracking-[-0.015em] transition-colors duration-300',
                                    isActive(link.href) ? 'text-brand' : 'text-ink'
                                  )}
                                >
                                  {link.label}
                                </span>
                                <ArrowUpRight
                                  className="h-4 w-4 -translate-x-1 text-ink/40 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
                                  strokeWidth={1.5}
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          to={preview}
                          onClick={() => setIsProductsOpen(false)}
                          className="relative block overflow-hidden rounded-[1.35rem] bg-paper-deep"
                          aria-hidden
                          tabIndex={-1}
                        >
                          <AnimatePresence initial={false}>
                            <motion.img
                              key={preview}
                              src={PREVIEW[preview]}
                              alt=""
                              initial={{ opacity: 0, scale: 1.08 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.6, ease: EASE }}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          </AnimatePresence>
                          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/50 to-transparent" />
                          <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90">
                            Laderos Bags
                          </span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact Link */}
              <NavItem href="/contact" label={t('nav.contact')} active={isActive('/contact')} />
            </nav>

            {/* Language Toggle, CTA & Mobile Menu */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleLanguage}
                className="hidden h-10 items-center rounded-full px-1 font-mono text-[11px] tracking-[0.12em] sm:flex"
                aria-label={language === 'el' ? 'Switch to English' : 'Αλλαγή σε Ελληνικά'}
              >
                {(['el', 'en'] as const).map((l) => (
                  <span
                    key={l}
                    className={cn(
                      'relative flex h-8 w-9 items-center justify-center rounded-full transition-colors duration-300',
                      language === l ? 'text-paper' : 'text-ink/50 hover:text-ink'
                    )}
                  >
                    {language === l && (
                      <motion.span
                        layoutId="lang-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{l.toUpperCase()}</span>
                  </span>
                ))}
              </button>

              <Link
                to="/contact#quote"
                className="group hidden h-11 items-center gap-3 rounded-full bg-ink pl-5 pr-1.5 text-[14px] text-paper transition-colors duration-500 ease-out-expo hover:bg-brand xl:inline-flex"
              >
                {quoteLabel}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink">
                  <SlidingArrow />
                </span>
              </Link>

              <button
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
                aria-expanded={isMenuOpen}
              >
                <span
                  className={cn(
                    'absolute h-[1.5px] w-4 bg-current transition-transform duration-500 ease-out-expo',
                    isMenuOpen ? 'rotate-45' : '-translate-y-[3.5px]'
                  )}
                />
                <span
                  className={cn(
                    'absolute h-[1.5px] w-4 bg-current transition-transform duration-500 ease-out-expo',
                    isMenuOpen ? '-rotate-45' : 'translate-y-[3.5px]'
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation — full-screen sheet */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col overflow-y-auto bg-ink text-paper md:hidden"
            data-lenis-prevent
            initial={{ clipPath: 'inset(0 0 100% 0 round 0 0 2rem 2rem)' }}
            animate={{ clipPath: 'inset(0 0 0% 0 round 0 0 0rem 0rem)' }}
            exit={{ clipPath: 'inset(0 0 100% 0 round 0 0 2rem 2rem)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav className="container-page flex w-full flex-1 flex-col pb-8 pt-24" aria-label={language === 'el' ? 'Κύριο μενού' : 'Main menu'}>
              <ul className="flex flex-col">
                {[...navLinks.slice(0, 2), { href: '/products', label: t('nav.products') }, navLinks[2]].map((link, i) => {
                  const active = link.href === '/products' ? isProductsActive : isActive(link.href);
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.06 }}
                      className="border-b border-paper/10"
                    >
                      <div className="flex items-center">
                        <Link
                          to={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex flex-1 items-baseline py-4"
                        >
                          <span className={cn('font-display text-[2.4rem] leading-none tracking-[-0.03em]', active ? 'text-brand-light' : 'text-paper')}>
                            {link.label}
                          </span>
                        </Link>
                        {link.href === '/products' && (
                          <button
                            onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20"
                            aria-label="Toggle products submenu"
                            aria-expanded={isMobileProductsOpen}
                          >
                            <ChevronDown className={cn('h-4 w-4 transition-transform duration-500 ease-out-expo', isMobileProductsOpen && 'rotate-180')} />
                          </button>
                        )}
                      </div>

                      {link.href === '/products' && (
                        <AnimatePresence initial={false}>
                          {isMobileProductsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.45, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <ul className="grid grid-cols-2 gap-x-4 gap-y-1 pb-5">
                                {productSubLinks.map((sub) => (
                                  <li key={sub.href}>
                                    <Link
                                      to={sub.href}
                                      onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsMobileProductsOpen(false);
                                      }}
                                      className={cn(
                                        'block py-2 text-[15px] transition-colors',
                                        isActive(sub.href) ? 'text-brand-light' : 'text-paper/65 hover:text-paper'
                                      )}
                                    >
                                      {sub.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                className="mt-auto flex flex-col gap-4 pt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
              >
                <Link
                  to="/contact#quote"
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex h-14 items-center justify-between rounded-full bg-paper pl-6 pr-2 text-ink"
                >
                  {quoteLabel}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper">
                    <SlidingArrow />
                  </span>
                </Link>
                <button
                  onClick={toggleLanguage}
                  className="flex items-center justify-between rounded-full border border-paper/15 px-6 py-4 text-paper/80"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
                    {language === 'el' ? 'English' : 'Ελληνικά'}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.16em] text-paper/40">
                    {language === 'el' ? 'EL → EN' : 'EN → EL'}
                  </span>
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
