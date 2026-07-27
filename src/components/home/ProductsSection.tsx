import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProductCarousel from './ProductCarousel';
import { motion } from 'framer-motion';

const ProductsSection = () => {
  const { t, language } = useLanguage();

  const optikaImages = [
    '/product_bags/optolux.webp',
    '/product_bags/optofree.webp',
  ];

  const paidikaImages = [
    '/product_bags/capolino.webp',
    '/product_bags/oneiropagida.webp',
    '/product_bags/kidclub.webp',
  ];

  const paperBagImages = [
    '/product_bags/navy_and_green.webp',
    '/product_bags/pink.webp',
    '/product_bags/redbull.webp',
    '/product_bags/cashew.webp',
  ];

  const plasticBagImages = [
    '/product_bags/black_pink.webp',
    '/product_bags/ygeia.webp',
    '/product_bags/oasisbnb.webp',
    '/product_bags/butcher.webp',
  ];

  return (
    <section id="products-section" className="section-padding overflow-hidden">
      <div className="container-page">

        {/* Statement header — giant, left-aligned, with marks */}
        <AnimatedSection className="mb-12 md:mb-16">
          <h2 className="max-w-5xl mb-8">
            {t('products.section.title')}
          </h2>
          <div className="w-24 h-1.5 mb-10" style={{ backgroundColor: 'hsl(210 88% 60%)' }} aria-hidden />
          <div className="max-w-4xl space-y-4">
            <p className="text-base md:text-lg leading-relaxed text-white/85">
              {t('products.section.text1')}
            </p>
            <p className="text-base md:text-lg leading-relaxed text-white/85">
              {t('products.section.text2')}
            </p>
          </div>
        </AnimatedSection>

        {/* Product media — big, labels underneath */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8">

          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductCarousel
              title={t('products.paper.title')}
              images={paperBagImages}
              linkTo="/products/paper-bags"
            />
          </motion.div>

          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            <ProductCarousel
              title={t('products.plastic.title')}
              images={plasticBagImages}
              linkTo="/products/plastic-bags"
            />
          </motion.div>

        </div>

        {/* New categories — Optical & Kids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 mt-10 lg:mt-12">

          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductCarousel
              title={language === 'el' ? 'Οπτικά' : 'Optical'}
              images={optikaImages}
              linkTo="/products/paper-bags"
            />
          </motion.div>

          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            <ProductCarousel
              title={language === 'el' ? 'Παιδικά' : 'Kids'}
              images={paidikaImages}
              linkTo="/products/paper-bags"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
