import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  NOT_FOUND_SEO,
  PAGE_SEO,
  SITE_NAME,
  SITE_URL,
  type PageSeo,
} from '@/lib/seo';
import { localizePath, type Lang } from '@/lib/i18nPaths';

interface SEOProps {
  /** Route key into PAGE_SEO, e.g. "/products/paper-bags". Omit for 404. */
  routeKey?: string;
  /** Override the resolved config (rarely needed). */
  override?: Partial<PageSeo>;
  /** Extra JSON-LD structured data for this page (e.g. Product schema). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Set to true on pages that should not be indexed (e.g. 404). */
  noindex?: boolean;
}

/** Absolute URL of a Greek-form path in the given language. */
const urlFor = (path: string, lang: Lang) => {
  const p = localizePath(path, lang);
  return `${SITE_URL}${p === '/' ? '' : p}`;
};

/** On English pages, point JSON-LD links (breadcrumb `item`, list `url`) at the /en URLs. */
const localizeLd = (value: unknown, lang: Lang): unknown => {
  if (lang === 'el') return value;
  if (Array.isArray(value)) return value.map((v) => localizeLd(v, lang));
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => {
        if ((k === 'item' || k === 'url') && typeof v === 'string' && (v === SITE_URL || v.startsWith(`${SITE_URL}/`))) {
          return [k, urlFor(v.slice(SITE_URL.length) || '/', lang)];
        }
        return [k, localizeLd(v, lang)];
      })
    );
  }
  return value;
};

/**
 * Injects per-page <title>, meta description, canonical URL, hreflang
 * alternates, Open Graph / Twitter tags and optional JSON-LD. Language comes
 * from the URL (/en/... = English), so each language version is its own
 * indexable page that points to its twin.
 * Purely head-level — renders nothing visible.
 */
const SEO = ({ routeKey, override, jsonLd, noindex }: SEOProps) => {
  const { language } = useLanguage();
  const lang: Lang = language === 'en' ? 'en' : 'el';

  const base: PageSeo = (routeKey && PAGE_SEO[routeKey]) || NOT_FOUND_SEO;
  const cfg: PageSeo = { ...base, ...override };

  const title = cfg.title[lang];
  const description = cfg.description[lang];
  const canonical = urlFor(cfg.path, lang);
  // The 404 page has no real URL of its own, so it gets no language alternates.
  const hasAlternates = !noindex && cfg.path !== NOT_FOUND_SEO.path;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {hasAlternates && <link rel="alternate" hrefLang="el" href={urlFor(cfg.path, 'el')} />}
      {hasAlternates && <link rel="alternate" hrefLang="en" href={urlFor(cfg.path, 'en')} />}
      {hasAlternates && <link rel="alternate" hrefLang="x-default" href={urlFor(cfg.path, 'el')} />}
      {noindex && <meta name="robots" content="noindex, follow" />}

      {/* Open Graph — per-page (og:type, og:image live statically in index.html) */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={lang === 'el' ? 'el_GR' : 'en_US'} />
      <meta property="og:locale:alternate" content={lang === 'el' ? 'en_US' : 'el_GR'} />

      {/* Twitter — per-page (twitter:card, twitter:image live statically in index.html) */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(localizeLd(jsonLd, lang))}</script>
      )}
    </Helmet>
  );
};

export default SEO;
