import { useLanguage } from '@/contexts/LanguageContext';
import type { CSSProperties } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProductCarousel from './ProductCarousel';
import { motion } from 'framer-motion';

const ProductsSection = () => {
  const { t, language } = useLanguage();

  /** Cards shown on the home page, in order. The image lists for the three
   *  newest categories are placeholders until we pick the final shots. */
  const cards = [
    {
      key: 'paper',
      title: t('products.paper.title'),
      linkTo: '/products/paper-bags',
      images: [
        '/product_bags/navy_and_green.webp',
        '/product_bags/pink.webp',
        '/product_bags/redbull.webp',
        '/product_bags/cashew.webp',
      ],
    },
    {
      key: 'plastic',
      title: t('products.plastic.title'),
      linkTo: '/products/plastic-bags',
      images: [
        '/product_bags/black_pink.webp',
        '/product_bags/ygeia.webp',
        '/product_bags/oasisbnb.webp',
        '/product_bags/butcher.webp',
      ],
    },
    {
      key: 'optika',
      title: language === 'el' ? 'Οπτικά' : 'Optical',
      linkTo: '/products/optika',
      images: ['/product_bags/optolux.webp', '/product_bags/optofree.webp'],
    },
    {
      key: 'paidika',
      title: language === 'el' ? 'Παιδικά' : 'Kids',
      linkTo: '/products/paidika',
      images: [
        '/product_bags/capolino.webp',
        '/product_bags/oneiropagida.webp',
        '/product_bags/kidclub.webp',
      ],
    },
    {
      key: 'andrika',
      title: language === 'el' ? 'Ανδρικά' : 'Menswear',
      linkTo: '/products/andrika',
      images: [
        '/paper_product/andrika/sakoula-beneto-maretti-2.webp',
        '/paper_product/andrika/sakoula-kingsman.webp',
        '/paper_product/andrika/sakoula-lacoste.webp',
      ],
    },
    {
      key: 'gynaikeia',
      title: language === 'el' ? 'Γυναικεία' : 'Womenswear',
      linkTo: '/products/gynaikeia',
      images: [
        '/paper_product/woman/sakoula-xontou-boutique.webp',
        '/paper_product/woman/sakoula-annas-secret.webp',
        '/paper_product/woman/sakoula-illusions-d.webp',
      ],
    },
    {
      key: 'oikologika',
      title: language === 'el' ? 'Οικολογικά' : 'Eco-Friendly',
      linkTo: '/products/oikologika',
      images: [
        '/paper_product/oikologika/sakoula-surf-skate-shop.webp',
        '/paper_product/oikologika/sakoula-ikorganic.webp',
        '/paper_product/oikologika/sakoula-privee-lingerie.webp',
      ],
    },
  ];

  return (
    <section id="products-section" className="section-padding overflow-hidden">
      <div className="container-page">

        {/* Statement header — giant, left-aligned, with marks */}
        <AnimatedSection className="mb-12 md:mb-16">
          <h2
            className={`max-w-5xl mb-8${language === 'en' ? ' fit-heading' : ''}`}
            // "Measurements" is 7.99× the font size — a touch too wide on 320px phones.
            style={language === 'en' ? ({ '--fit': 8.15, '--fit-max': '2.25rem' } as CSSProperties) : undefined}
          >
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.12 }}
            >
              <ProductCarousel title={card.title} images={card.images} linkTo={card.linkTo} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
