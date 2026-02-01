import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import TrustedBySection from '@/components/home/TrustedBySection';

// --- IMAGES ---
// Thumbnail images for the main product categories
const paperThumbnail = '/paper_product/paper_thumbnail.jpeg';
const plasticThumbnail = '/plastic_product/plastic_thumbnail.jpeg';

const galleryImages = [
  { src: '/gallery/gallery9.png', position: '60% center' }, 
  { src: '/gallery/gallery8.png', position: '60% center' },
  { src: '/gallery/gallery3.png', position: 'center' },
  { src: '/gallery/gallery4.jpeg', position: 'center' },
  { src: '/gallery/gallery2.jpeg', position: 'center' },
  { src: '/gallery/gallery6.png', position: 'center' },
  { src: '/gallery/gallery7.jpeg', position: 'center' },
  { src: '/gallery/gallery5.png', position: 'center' },
  { src: '/gallery/gallery1.jpeg', position: 'center' }
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
      {/* Page Title Section - Main Background */}
      <section className="py-16 md:py-20 main-section">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">
              {t('products.page.heroTitle')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Products Section - Main Background */}
      <section className="section-padding main-section">
        <div className="container-page">
          <div className="space-y-24">
            {products.map((product, index) => (
              <AnimatedSection key={product.id}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Product Image */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
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
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                <span className="bg-white/90 text-black px-6 py-3 rounded-full font-medium flex items-center gap-2">
                                    {t('products.viewMore')} <ArrowRight className="h-4 w-4" />
                                </span>
                            </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {product.title}
                    </h2>
                    <p className="leading-relaxed mb-6 opacity-80">
                      {product.description}
                    </p>

                    <div className="mb-8">
                      <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                        {t('products.features')}
                      </h3>
                      <ul className="grid grid-cols-2 gap-3">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 opacity-80">
                            <CheckCircle2 className="h-5 w-5 text-brand flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button variant="brand" size="lg" asChild>
                      <Link to={product.linkTo}>
                        {t('products.viewMore')}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who Trusts Us Section - Main Background */}
      <div className="main-section">
        <TrustedBySection />
      </div>

      {/* Gallery Section - Main Background */}
      <section className="py-12 md:py-16 lg:py-20 main-section">
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

      {/* CTA Section - Accent Background #6A8595 */}
      <section className="section-padding accent-section overflow-hidden">
        <div className="container-page">
          <motion.div
            className="text-center"
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-lg opacity-80 mb-8 max-w-xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/contact#quote">
                {t('cta.button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductsPage;