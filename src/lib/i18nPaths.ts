/**
 * Language lives in the URL: Greek pages at "/about", English at "/en/about".
 * One URL per language lets Google/AI index both versions (with hreflang),
 * and a shared or refreshed link keeps its language.
 */
export type Lang = 'el' | 'en';

export const EN_PREFIX = '/en';

/** "/en/about" → 'en', "/about" → 'el'. */
export const langFromPath = (pathname: string): Lang =>
  pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? 'en' : 'el';

/** Drop the language prefix: "/en/about" → "/about", "/en" → "/". */
export const stripLang = (pathname: string): string =>
  langFromPath(pathname) === 'en' ? pathname.slice(EN_PREFIX.length) || '/' : pathname;

/**
 * Path for the given language, keeping any #hash / ?query:
 * localizePath('/contact#quote', 'en') → '/en/contact#quote'
 * localizePath('/en/about', 'el')      → '/about'
 * External links and anything not starting with "/" are returned untouched.
 */
export const localizePath = (to: string, lang: Lang): string => {
  if (!to.startsWith('/') || to.startsWith('//')) return to;
  const cut = to.search(/[?#]/);
  const path = cut === -1 ? to : to.slice(0, cut);
  const rest = cut === -1 ? '' : to.slice(cut);
  const base = stripLang(path);
  if (lang === 'el') return base + rest;
  return (base === '/' ? EN_PREFIX : EN_PREFIX + base) + rest;
};
