import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
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
      {/* Page Title */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden -mt-16 md:-mt-20">
        <div className="absolute inset-0 w-full h-full z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/productshero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/80" />
        </div>

        <div className="container-page relative z-10 text-center py-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            className="max-w-3xl mx-auto flex flex-col items-center"
          >
            <h1 className="mb-8 tracking-wide text-brand-light text-center">
              {t('products.page.heroTitle')}
            </h1>
            <div className="w-16 h-[2px] bg-primary/40" />
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding section-depth-2 overflow-hidden">
        <div className="container-page">
          <div className="space-y-28 md:space-y-36">
            {products.map((product, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={product.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                    !isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Product Image */}
                  <motion.div 
                    className={!isEven ? 'lg:order-2' : ''}
                    initial={{ x: isEven ? -100 : 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  >
                    <Link 
                      to={product.linkTo}
                      className="block rounded-2xl overflow-hidden shadow-elevated group cursor-pointer"
                    >
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                            <span className="bg-white/90 text-foreground px-6 py-3 rounded-full font-medium flex items-center gap-2 text-sm">
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
                    initial={{ x: isEven ? 100 : -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  >
                    <h2 className="mb-6">
                      {product.title}
                    </h2>
                    <div className="w-12 h-[2px] bg-primary/40 mb-6" />
                    <p className="leading-relaxed mb-8 text-muted-foreground text-lg">
                      {product.description}
                    </p>

                    <div className="mb-10">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.15em] mb-5" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
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
      <section className="section-depth-4 w-full">
        <AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {galleryImages.map((item, index) => (
              <div 
                key={index}
                className="aspect-square bg-muted group cursor-pointer overflow-hidden relative"
              >
                <img 
                  src={item.src} 
                  alt={`Gallery image ${index + 1}`}
                  style={{ objectPosition: item.position }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className="section-padding section-depth-6 overflow-hidden">
        <div className="container-page">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h2 className="mb-6">
              {t('cta.title')}
            </h2>
            <div className="w-12 h-[1px] bg-white/20 mx-auto mb-6" />
            <p className="text-lg opacity-60 mb-10 max-w-xl mx-auto">
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