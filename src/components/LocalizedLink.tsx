import { forwardRef } from 'react';
import { Link as RouterLink, type LinkProps } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath } from '@/lib/i18nPaths';

/**
 * Drop-in replacement for react-router's <Link>: internal paths are written
 * in Greek form ("/contact") and automatically become "/en/contact" on
 * English pages, so visitors never fall back to the Greek site by accident.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...rest }, ref) => {
  const { language } = useLanguage();
  const target =
    typeof to === 'string'
      ? localizePath(to, language)
      : { ...to, pathname: to.pathname ? localizePath(to.pathname, language) : to.pathname };
  return <RouterLink ref={ref} to={target} {...rest} />;
});
Link.displayName = 'Link';
