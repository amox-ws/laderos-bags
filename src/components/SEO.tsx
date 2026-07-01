import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  NOT_FOUND_SEO,
  PAGE_SEO,
  SITE_NAME,
  SITE_URL,
  type PageSeo,
} from '@/lib/seo';

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

/**
 * Injects per-page <title>, meta description, canonical URL, Open Graph /
 * Twitter tags and optional JSON-LD. Language-aware (el default, en fallback).
 * Purely head-level — renders nothing visible.
 */
const SEO = ({ routeKey, override, jsonLd, noindex }: SEOProps) => {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'el';

  const base: PageSeo = (routeKey && PAGE_SEO[routeKey]) || NOT_FOUND_SEO;
  const cfg: PageSeo = { ...base, ...override };

  const title = cfg.title[lang];
  const description = cfg.description[lang];
  const canonical = `${SITE_URL}${cfg.path === '/' ? '' : cfg.path}`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      {/* Open Graph — per-page (og:type, og:image live statically in index.html) */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={lang === 'el' ? 'el_GR' : 'en_US'} />

      {/* Twitter — per-page (twitter:card, twitter:image live statically in index.html) */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
