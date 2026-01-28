import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProductCarousel from './ProductCarousel';

const ProductsSection = () => {
  const { t } = useLanguage();

  // Placeholder images for carousels (empty strings = placeholder UI)
  const paperBagImages = ['', '', '', ''];
  const plasticBagImages = ['', '', '', ''];

  return (
    <section className="section-padding bg-background">
      <div className="container-page">
        {/* Text Content */}
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

        {/* Product Carousels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          <AnimatedSection delay={0.1}>
            <ProductCarousel 
              title={t('products.paper.title')} 
              images={paperBagImages}
            />
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <ProductCarousel 
              title={t('products.plastic.title')} 
              images={plasticBagImages}
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
