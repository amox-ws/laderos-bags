import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronsDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import TrustedBySection from '@/components/home/TrustedBySection';

const paperThumbnail = '/paper_product/paper_thumbnail.webp';
const plasticThumbnail = '/plastic_product/plastic_thumbnail.webp';

const galleryImages = [
  { src: '/gallery/gallery9.webp', position: '60% center' },
  { src: '/gallery/gallery8.webp', position: '60% center' },
  { src: '/gallery/gallery3.webp', position: 'center' },
  { src: '/gallery/gallery4.webp', position: 'center' },
  { src: '/gallery/gallery2.webp', position: 'center' },
  { src: '/gallery/gallery6.webp', position: 'center' },
  { src: '/gallery/gallery7.webp', position: 'center' },
  { src: '/gallery/gallery5.webp', position: 'center' },
  { src: '/gallery/gallery1.webp', position: 'center' }
];

const ProductsPage = () => {
  const { t, language } = useLanguage();

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

  return (
    <Layout>
      {/* Hero — cinematic navy overlay over production video */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden -mt-16 md:-mt-20">
        <div className="absolute inset-0 w-full h-full z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/productshero.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, hsl(219 56% 9% / 0.82) 0%, hsl(218 52% 12% / 0.68) 45%, hsl(219 58% 7% / 0.9) 100%)',
            }}
          />
        </div>

        <div className="container-page relative z-10 text-center py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-light mb-7">
              {language === 'el' ? 'Η γκάμα μας' : 'Our range'}
            </span>
            <h1 className="text-white text-center mb-0">
              {t('products.page.heroTitle')}
            </h1>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50">
          <ChevronsDown className="h-6 w-6 animate-bounce" />
        </div>
      </section>

      {/* Products — editorial alternating rows */}
      <section className="section-padding section-depth-2 overflow-hidden">
        <div className="container-page">
          <div className="space-y-28 md:space-y-40">
            {products.map((product, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={product.id}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                >
                  {/* Product Image */}
                  <motion.div
                    className={!isEven ? 'lg:order-2' : ''}
                    initial={{ x: isEven ? -80 : 80, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={product.linkTo}
                      className="block rounded-2xl overflow-hidden shadow-elevated group cursor-pointer"
                    >
                      <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden bg-muted">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/25 transition-colors duration-500 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                            <span className="glass-panel text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 text-sm">
                              {t('products.viewMore')} <ArrowRight className="h-4 w-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className={!isEven ? 'lg:order-1' : ''}
                    initial={{ x: isEven ? 80 : -80, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="eyebrow mb-4 block">
                      {language === 'el' ? `0${index + 1} — Προϊόν` : `0${index + 1} — Product`}
                    </span>
                    <h2 className="mb-5">
                      {product.title}
                    </h2>
                    <p className="leading-relaxed mb-8 text-muted-foreground text-lg measure">
                      {product.description}
                    </p>

                    <div className="mb-10">
                      <h3 className="eyebrow mb-5 block">
                        {t('products.features')}
                      </h3>
                      <ul className="grid grid-cols-2 gap-4">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button variant="brand" size="lg" asChild className="group">
                      <Link to={product.linkTo}>
                        {t('products.viewMore')}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who Trusts Us */}
      <div className="section-depth-3">
        <TrustedBySection showTitle={false} />
      </div>

      {/* Gallery */}
      <section className="main-section w-full">
        <div className="container-page py-20 md:py-28">
          <AnimatedSection className="text-center flex flex-col items-center mb-14 md:mb-16">
            <span className="section-label">{language === 'el' ? 'Η δουλειά μας' : 'Our work'}</span>
            <h2 className="mb-0">{language === 'el' ? 'Δείγματα παραγωγής' : 'Production gallery'}</h2>
          </AnimatedSection>
        </div>
        <AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5 md:gap-2">
            {galleryImages.map((item, index) => (
              <div
                key={index}
                className="aspect-square bg-muted group cursor-pointer overflow-hidden relative"
              >
                <img
                  src={item.src}
                  alt={`${language === 'el' ? 'Δείγμα παραγωγής' : 'Production sample'} ${index + 1}`}
                  style={{ objectPosition: item.position }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/15 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className="section-padding section-depth-6 overflow-hidden relative grain-overlay">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, hsl(214 80% 47% / 0.35), transparent 60%)',
          }}
          aria-hidden
        />
        <div className="container-page relative">
          <motion.div
            className="text-center max-w-3xl mx-auto flex flex-col items-center"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label justify-center">
              {language === 'el' ? 'Ξεκινήστε σήμερα' : 'Get started'}
            </span>
            <h2 className="mb-6 max-w-2xl">
              {t('cta.title')}
            </h2>
            <p className="text-lg opacity-70 mb-10 max-w-xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <Button variant="heroOutline" size="xl" asChild className="group">
              <Link to="/contact#quote">
                {t('cta.button')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductsPage;
