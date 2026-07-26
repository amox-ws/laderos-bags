import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProductCarousel from './ProductCarousel';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ImageIcon } from 'lucide-react';

const ProductsSection = () => {
  const { t, language } = useLanguage();

  const newCategories = [
    { key: 'optika', title: language === 'el' ? 'Οπτικά' : 'Optical' },
    { key: 'paidika', title: language === 'el' ? 'Παιδικά' : 'Kids' },
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

        {/* New categories — Optical & Kids (image placeholders for now) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 mt-10 lg:mt-12">
          {newCategories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
            >
              <Link to="/products/paper-bags" className="group block cursor-pointer">
                {/* Image placeholder */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] border-2 border-dashed border-white/20 bg-white/[0.04] flex items-center justify-center transition-colors duration-500 group-hover:bg-white/[0.07] group-hover:border-white/30">
                  <div className="text-center px-6">
                    <ImageIcon className="h-10 w-10 mx-auto mb-4 text-white/30" />
                    <span className="block text-white/40 text-xs font-extrabold uppercase tracking-[0.22em]">
                      {language === 'el' ? 'Φωτογραφίες σύντομα' : 'Photos coming soon'}
                    </span>
                  </div>
                </div>
                <div className="media-label group-hover:gap-3.5 transition-all duration-300">
                  {cat.title}
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
