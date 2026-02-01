import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProductCarousel from './ProductCarousel';
import { motion } from 'framer-motion'; // <--- Σιγουρέψου ότι έκανες import αυτό

const ProductsSection = () => {
  const { t } = useLanguage();

  // Λίστα εικόνων για Χάρτινες Σακούλες
  const paperBagImages = [
    '/product_bags/navy_and_green.png', 
    '/product_bags/pink.png',
    '/product_bags/redbull.png',
    '/product_bags/cashew.png',
  ];

  // Λίστα εικόνων για Πλαστικές Σακούλες
  const plasticBagImages = [
    '/product_bags/black_pink.png', 
    '/product_bags/ygeia.png',
    '/product_bags/oasisbnb.png',
    '/product_bags/butcher.png',
  ];

  return (
    // ΠΡΟΣΟΧΗ: Βάζουμε overflow-hidden για να μην "σπάσει" το πλάτος της σελίδας
    // όσο τα κουτιά έρχονται από τα πλάγια.
    <section className="section-padding overflow-hidden">
      <div className="container-page">
        
        {/* Text Content - Αυτό μένει όπως ήταν (Fade Up) */}
        <AnimatedSection className="max-w-4xl mx-auto text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 md:mb-8 leading-tight">
            {t('products.section.title')}
          </h2>
          <div className="space-y-4 md:space-y-6">
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {t('products.section.text1')}
            </p>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {t('products.section.text2')}
            </p>
          </div>
        </AnimatedSection>

        {/* Product Carousels με Animation από τα πλάγια */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          
          {/* 1. ΧΑΡΤΙΝΕΣ ΣΑΚΟΥΛΕΣ - ΕΡΧΕΤΑΙ ΑΠΟ ΑΡΙΣΤΕΡΑ */}
          <motion.div
            initial={{ x: -300, opacity: 0 }} // Ξεκινάει 200px αριστερά και αόρατο
            whileInView={{ x: 0, opacity: 1 }} // Πηγαίνει στη θέση του και εμφανίζεται
            viewport={{ once: true, margin: "-100px" }} // Ενεργοποιείται όταν φανεί λίγο στην οθόνη
            transition={{ duration: 1.2, ease: "easeOut" }} // Διάρκεια και ομαλότητα
          >
            <ProductCarousel 
              title={t('products.paper.title')} 
              images={paperBagImages}
              linkTo="/products/paper-bags"
            />
          </motion.div>
          
          {/* 2. ΠΛΑΣΤΙΚΕΣ ΣΑΚΟΥΛΕΣ - ΕΡΧΕΤΑΙ ΑΠΟ ΔΕΞΙΑ */}
          <motion.div
            initial={{ x: 300, opacity: 0 }} // Ξεκινάει 200px δεξιά και αόρατο
            whileInView={{ x: 0, opacity: 1 }} // Πηγαίνει στη θέση του και εμφανίζεται
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