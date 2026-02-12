import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
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

  // Scroll detection for header elevation
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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-border/50' 
          : 'bg-white/80 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="container-page">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logo} 
              alt="Laderos Bags" 
              className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative text-[13px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                  isActive(link.href)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
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
                <Link
                  to="/products"
                  className={`relative text-[13px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                    isProductsActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t('nav.products')}
                  {isProductsActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className={`p-1 rounded transition-colors duration-200 ${
                    isProductsActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label="Toggle products menu"
                >
                  <ChevronDown 
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isProductsOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
              </div>

              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-3 w-52 bg-white rounded-xl shadow-lg border border-border/60 overflow-hidden z-50"
                  >
                    {productSubLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setIsProductsOpen(false)}
                        className={`block px-5 py-3.5 text-[13px] uppercase tracking-[0.1em] transition-all duration-200 ${
                          isActive(link.href)
                            ? 'bg-muted text-foreground font-medium'
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact Link */}
            <Link
              to="/contact"
              className={`relative text-[13px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                isActive('/contact')
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('nav.contact')}
              {isActive('/contact') && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em]">{language.toUpperCase()}</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border/40 overflow-hidden bg-white/95 backdrop-blur-xl"
            >
              <div className="py-6 space-y-1">
                {navLinks.slice(0, 2).map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-3.5 px-5 rounded-lg transition-all duration-200 text-sm uppercase tracking-[0.12em] ${
                      isActive(link.href)
                        ? 'bg-muted text-foreground font-medium'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
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
                      className={`flex-1 py-3.5 px-5 rounded-lg transition-all duration-200 text-sm uppercase tracking-[0.12em] ${
                        isActive('/products')
                          ? 'bg-muted text-foreground font-medium'
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }`}
                    >
                      {t('nav.products')}
                    </Link>
                    <button
                      onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                      className={`p-3 rounded-lg transition-colors duration-200 ${
                        isProductsActive
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }`}
                      aria-label="Toggle products submenu"
                    >
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isMobileProductsOpen ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {isMobileProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.15 }}
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
                            className={`block py-3 pl-10 pr-5 rounded-lg transition-all duration-200 text-sm uppercase tracking-[0.1em] ${
                              isActive(link.href)
                                ? 'bg-muted text-foreground font-medium'
                                : 'text-muted-foreground/70 hover:bg-muted/50 hover:text-foreground'
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
                  className={`block py-3.5 px-5 rounded-lg transition-all duration-200 text-sm uppercase tracking-[0.12em] ${
                    isActive('/contact')
                      ? 'bg-muted text-foreground font-medium'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  {t('nav.contact')}
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;