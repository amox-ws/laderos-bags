import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProductCarousel from './ProductCarousel';
import { motion } from 'framer-motion';

const ProductsSection = () => {
  const { t } = useLanguage();

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
        
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 md:mb-24">
          <h2 className="mb-8">
            {t('products.section.title')}
          </h2>
          <div className="max-w-3xl mx-auto space-y-5">
            <p className="text-base md:text-lg leading-relaxed opacity-70">
              {t('products.section.text1')}
            </p>
            <p className="text-base md:text-lg leading-relaxed opacity-70">
              {t('products.section.text2')}
            </p>
          </div>
        </AnimatedSection>

        {/* Product Carousels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <ProductCarousel 
              title={t('products.paper.title')} 
              images={paperBagImages}
              linkTo="/products/paper-bags"
            />
          </motion.div>
          
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <ProductCarousel 
              title={t('products.plastic.title')} 
              images={plasticBagImages}
              linkTo="/products/plastic-bags"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProductsSection;