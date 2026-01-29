// Products Page - Laderos Bags
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import TrustedBySection from '@/components/home/TrustedBySection';

const ProductsPage = () => {
  const { t, language } = useLanguage();

  // Paper Bags first, Plastic Bags second (Custom Solutions removed)
  const products = [
    {
      id: 'paper',
      linkTo: '/products/paper-bags',
      title: t('products.paper.full.title'),
      description: t('products.paper.full.desc'),
      features: language === 'el'
        ? ['Εκτύπωση λογοτύπου', 'Ποιότητα κατασκευής', 'Υψηλή αντοχή', 'Χειρολαβές']
        : ['Logo printing', 'Build quality', 'High durability', 'Handles included'],
    },
    {
      id: 'plastic',
      linkTo: '/products/plastic-bags',
      title: t('products.plastic.full.title'),
      description: t('products.plastic.full.desc'),
      features: language === 'el' 
        ? ['Πολλαπλά μεγέθη', 'Διαφορετικά πάχη', 'Χρωματικές επιλογές', 'Εκτύπωση λογοτύπου']
        : ['Multiple sizes', 'Various thicknesses', 'Color options', 'Logo printing'],
    },
  ];

  // Gallery placeholders (9 images - 3x3 grid)
  const galleryImages = Array(9).fill(null);

  return (
    <Layout>
      {/* Page Title Section - Simple, No Hero */}
      <section className="py-16 md:py-20">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide">
              {t('products.page.heroTitle')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding">
        <div className="container-page">
          <div className="space-y-24">
            {products.map((product, index) => (
              <AnimatedSection key={product.id}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image Placeholder - Clickable with hover zoom effect */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <Link 
                      to={product.linkTo}
                      className="block rounded-2xl overflow-hidden shadow-elevated group cursor-pointer"
                    >
                      <div className="relative aspect-square bg-gradient-to-br from-muted to-muted-foreground/10 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
                          <div className="text-center text-muted-foreground">
                            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                              <span className="text-3xl md:text-4xl font-bold">{index + 1}</span>
                            </div>
                            <p className="text-base md:text-lg">
                              {language === 'el' ? 'Εικόνα σύντομα' : 'Image Coming Soon'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {product.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {product.description}
                    </p>

                    <div className="mb-8">
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                        {t('products.features')}
                      </h3>
                      <ul className="grid grid-cols-2 gap-3">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-muted-foreground">
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

      {/* Who Trusts Us Section */}
      <TrustedBySection />

      {/* Gallery Section - Full Width */}
      <section className="py-12 md:py-16 lg:py-20">
        <AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {galleryImages.map((_, index) => (
              <div 
                key={index}
                className="aspect-square bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center group cursor-pointer overflow-hidden"
              >
                <div className="text-center text-muted-foreground transition-transform duration-500 ease-out group-hover:scale-110">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                    <span className="text-xl md:text-2xl font-bold">{index + 1}</span>
                  </div>
                  <p className="text-sm md:text-base">
                    {language === 'el' ? 'Εικόνα' : 'Image'} {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-hero">
        <div className="container-page">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/contact#quote">
                {t('cta.button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default ProductsPage;
