import { Fragment } from 'react';
import { Link } from '@/components/LocalizedLink';
import SEO from '@/components/SEO';
import { OPTIKA, PAIDIKA } from '@/content/categories';
import { makeBreadcrumbLd, makeItemListLd } from '@/lib/seo';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import TrustedBySection from '@/components/home/TrustedBySection';
import SpecialCategories from '@/components/products/SpecialCategories';
import ProductionGallery from '@/components/products/ProductionGallery';
import CtaPanel from '@/components/CtaPanel';
import ArrowButton from '@/components/ui/ArrowButton';
import { Reveal, RevealHeading, RevealMedia } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const paperThumbnail = '/paper_product/paper_thumbnail.webp';
const plasticThumbnail = '/laderosfoto14-10_studio_smooth_webp/navygreen-plastiki-xirolavi.webp';

const EASE = [0.16, 1, 0.3, 1] as const;

const galleryImages = [
  '/gallery/gallery9.webp',
  '/gallery/gallery8.webp',
  '/gallery/gallery3.webp',
  '/gallery/gallery4.webp',
  '/gallery/gallery2.webp',
  '/gallery/gallery5.webp',
  '/gallery/gallery1.webp',
];

const ProductsPage = () => {
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();

  const products = [
    {
      id: 'paper',
      linkTo: '/products/paper-bags',
      title: t('products.paper.full.title'),
      description: t('products.paper.full.desc'),
      image: paperThumbnail,
      features: language === 'el'
        ? ['Εκτύπωση λογοτύπου', 'Ποιότητα κατασκευής', 'Υψηλή αντοχή', 'Χειρολαβές']
        : ['Logo printing', 'Build quality', 'High durability', 'Handles included'],
    },
    {
      id: 'plastic',
      linkTo: '/products/plastic-bags',
      title: t('products.plastic.full.title'),
      description: t('products.plastic.full.desc'),
      image: plasticThumbnail,
      features: language === 'el'
        ? ['Πολλαπλά μεγέθη', 'Διαφορετικά πάχη', 'Χρωματικές επιλογές', 'Εκτύπωση λογοτύπου']
        : ['Multiple sizes', 'Various thicknesses', 'Color options', 'Logo printing'],
    },
  ];

  const heroWords = t('products.page.heroTitle').split(' ');

  return (
    <Layout>
      <SEO
        routeKey="/products"
        jsonLd={[
          makeBreadcrumbLd([
            [t('nav.home'), '/'],
            [t('nav.products'), '/products'],
          ]),
          makeItemListLd(language === 'el' ? 'Κατηγορίες Προϊόντων Laderos Bags' : 'Laderos Bags Product Categories', [
            [t('nav.products.paper'), '/products/paper-bags'],
            [t('nav.products.plastic'), '/products/plastic-bags'],
            [language === 'el' ? 'Σακούλες για Οπτικά' : OPTIKA.h1.en, '/products/optika'],
            [language === 'el' ? 'Σακούλες για Παιδικά' : PAIDIKA.h1.en, '/products/paidika'],
          ]),
        ]}
      />
      {/* Hero — production film under an ink veil */}
      <section className="relative -mt-16 flex min-h-[92dvh] items-end overflow-hidden bg-ink md:-mt-20">
        <div className="absolute inset-0 z-0 h-full w-full">
          <motion.div
            className="h-full w-full"
            initial={reduced ? false : { scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: EASE }}
          >
            <video autoPlay loop muted playsInline poster="/videos/posters/productshero.webp" className="h-full w-full object-cover">
              <source src="/videos/productshero.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, hsl(224 44% 9% / 0.5) 0%, hsl(224 44% 9% / 0.3) 40%, hsl(224 44% 9% / 0.92) 100%)',
            }}
          />
        </div>

        <div className="container-page relative z-10 pb-16 pt-40 md:pb-20">
          <h1 className="mb-0 max-w-[14ch] text-[clamp(2.8rem,1.2rem+5.6vw,7.75rem)] leading-[0.95] tracking-[-0.035em] text-paper">
            {heroWords.map((word, i) => (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.12em] pt-[0.08em] -mb-[0.12em] -mt-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={reduced ? false : { y: '115%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.2, ease: EASE, delay: 0.2 + i * 0.07 }}
                  >
                    {word}
                  </motion.span>
                </span>
                {i < heroWords.length - 1 && ' '}
              </Fragment>
            ))}
          </h1>
        </div>

        <div className="absolute bottom-6 right-6 z-10 hidden items-center gap-3 md:flex lg:right-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/60">Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-paper/20">
            <span className="absolute inset-0 animate-scroll-line bg-paper" />
          </span>
        </div>
      </section>

      {/* Products — editorial alternating rows */}
      <section className="section-padding main-section overflow-hidden">
        <div className="container-page">
          <div className="space-y-28 md:space-y-44">
            {products.map((product, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={product.id}
                  className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
                >
                  {/* Product Image */}
                  <div className={cn('lg:col-span-6', !isEven && 'lg:order-2 lg:col-start-7')}>
                    <Link to={product.linkTo} className="group block cursor-pointer">
                      <RevealMedia className="aspect-[4/5] shadow-elevated sm:aspect-square">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-end justify-end p-6 md:p-8">
                          <span className="glass-panel flex translate-y-3 items-center gap-2 rounded-full px-5 py-3 text-sm text-ink opacity-0 transition-all duration-700 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
                            {t('products.viewMore')} <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                          </span>
                        </div>
                      </RevealMedia>
                    </Link>
                  </div>

                  {/* Content */}
                  <div className={cn('lg:col-span-5', isEven ? 'lg:col-start-8' : 'lg:order-1 lg:col-start-1')}>
                    <Reveal>
                      <span className="eyebrow mb-7">
                        {language === 'el' ? `0${index + 1} — Προϊόν` : `0${index + 1} — Product`}
                      </span>
                    </Reveal>
                    <RevealHeading text={product.title} className="mb-7" />
                    <Reveal delay={0.12}>
                      <p className="measure mb-10 text-lg leading-relaxed text-ink/70">
                        {product.description}
                      </p>
                    </Reveal>

                    <Reveal delay={0.2} className="mb-11">
                      <h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">
                        {t('products.features')}
                      </h3>
                      <ul className="grid grid-cols-2 border-t border-ink/10">
                        {product.features.map((feature, i) => (
                          <li
                            key={i}
                            className={cn(
                              'flex items-center gap-3 border-b border-ink/10 py-4 text-[15px] text-ink/80',
                              i % 2 === 0 && 'pr-4'
                            )}
                          >
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </Reveal>

                    <Reveal delay={0.28}>
                      <ArrowButton to={product.linkTo}>{t('products.viewMore')}</ArrowButton>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SpecialCategories />

      {/* Who Trusts Us */}
      <div className="main-section">
        <TrustedBySection showTitle={false} />
      </div>

      {/* Gallery */}
      <section className="main-section w-full overflow-hidden">
        <div className="container-page pb-24 pt-10 md:pb-32">
          <div className="mb-14 flex flex-col items-center text-center md:mb-20">
            <RevealHeading text={language === 'el' ? 'Δείγματα παραγωγής' : 'Production gallery'} className="mb-0" />
          </div>

          <ProductionGallery images={galleryImages} />
        </div>
      </section>

      {/* CTA */}
      <CtaPanel leftImage="/product_bags/cashew.webp" rightImage="/product_bags/pink.webp" />
    </Layout>
  );
};

export default ProductsPage;
