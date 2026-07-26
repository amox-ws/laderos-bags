import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'el' ? 'en' : 'el');
  };

  const isActive = (path: string) => {
    if (path === '/#products-section') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };
  const isProductsActive = location.pathname.startsWith('/products');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    }, 150);
  };

  const navLinkClass = (active: boolean) =>
    `relative text-[13px] font-extrabold uppercase tracking-[0.06em] transition-colors duration-300 ${
      active ? 'text-white' : 'text-white/65 hover:text-white'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-shadow duration-500 ${
        isScrolled ? 'shadow-[0_10px_40px_-18px_rgba(0,0,0,0.8)]' : ''
      }`}
      style={{ backgroundColor: 'hsl(220 55% 6%)' }}
    >
      <div className="container-page">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group" aria-label="Laderos Bags — Αρχική">
            <img
              src={logo}
              alt="Laderos Bags"
              className="h-10 md:h-11 w-auto transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.slice(0, 2).map((link) => (
              <Link key={link.href} to={link.href} className={navLinkClass(isActive(link.href))}>
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: 'hsl(210 88% 60%)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Products Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-1">
                <Link to="/products" className={navLinkClass(isProductsActive)}>
                  {t('nav.products')}
                  {isProductsActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px]"
                      style={{ backgroundColor: 'hsl(210 88% 60%)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="p-1 text-white/65 hover:text-white transition-colors duration-200"
                  aria-label="Toggle products menu"
                >
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-60 overflow-hidden z-50 border border-white/10"
                    style={{ backgroundColor: 'hsl(220 50% 9%)' }}
                  >
                    {productSubLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setIsProductsOpen(false)}
                        className={`flex items-center justify-between px-5 py-4 text-[12px] uppercase tracking-[0.06em] font-extrabold transition-all duration-200 group ${
                          isActive(link.href)
                            ? 'bg-white/10 text-white'
                            : 'text-white/65 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact Link */}
            <Link to="/contact" className={navLinkClass(isActive('/contact'))}>
              {t('nav.contact')}
              {isActive('/contact') && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1.5 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: 'hsl(210 88% 60%)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-white/65 hover:text-white transition-colors duration-300 group"
              aria-label={language === 'el' ? 'Switch to English' : 'Αλλαγή σε Ελληνικά'}
            >
              <Globe className="h-4 w-4 transition-transform duration-500 group-hover:rotate-12" />
              <span className="text-[12px] font-extrabold uppercase tracking-[0.08em]">{language.toUpperCase()}</span>
            </button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-white hover:bg-white/10 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden border-t border-white/10 overflow-hidden"
            >
              <div className="py-6 space-y-1">
                {navLinks.slice(0, 2).map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-3.5 px-4 transition-all duration-200 text-[13px] uppercase tracking-[0.06em] font-extrabold ${
                      isActive(link.href) ? 'bg-white/10 text-white' : 'text-white/65 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Products with Dropdown */}
                <div>
                  <div className="flex items-center">
                    <Link
                      to="/products"
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex-1 py-3.5 px-4 transition-all duration-200 text-[13px] uppercase tracking-[0.06em] font-extrabold ${
                        isActive('/products') ? 'bg-white/10 text-white' : 'text-white/65 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {t('nav.products')}
                    </Link>
                    <button
                      onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                      className="p-3 text-white/65 hover:text-white transition-colors duration-200"
                      aria-label="Toggle products submenu"
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isMobileProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {productSubLinks.map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsMobileProductsOpen(false);
                            }}
                            className={`block py-3 pl-9 pr-4 transition-all duration-200 text-[12px] uppercase tracking-[0.06em] font-bold ${
                              isActive(link.href) ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Contact Link Mobile */}
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3.5 px-4 transition-all duration-200 text-[13px] uppercase tracking-[0.06em] font-extrabold ${
                    isActive('/contact') ? 'bg-white/10 text-white' : 'text-white/65 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {t('nav.contact')}
                </Link>

                {/* Language toggle (mobile) */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 py-3.5 px-4 text-white/65 hover:text-white transition-colors w-full"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-[12px] font-extrabold uppercase tracking-[0.06em]">
                    {language === 'el' ? 'English' : 'Ελληνικά'}
                  </span>
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
