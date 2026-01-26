import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import plasticBags from '@/assets/plastic-bags.jpg';
import paperBags from '@/assets/paper-bags.jpg';
import customBags from '@/assets/custom-bags.jpg';

const ProductsPage = () => {
  const { t, language } = useLanguage();

  const products = [
    {
      id: 'plastic',
      image: plasticBags,
      title: t('products.plastic.full.title'),
      description: t('products.plastic.full.desc'),
      features: language === 'el' 
        ? ['Πολλαπλά μεγέθη', 'Διαφορετικά πάχη', 'Χρωματικές επιλογές', 'Εκτύπωση λογοτύπου']
        : ['Multiple sizes', 'Various thicknesses', 'Color options', 'Logo printing'],
    },
    {
      id: 'paper',
      image: paperBags,
      title: t('products.paper.full.title'),
      description: t('products.paper.full.desc'),
      features: language === 'el'
        ? ['Ανακυκλωμένα υλικά', 'Υψηλή αντοχή', 'Οικολογικές', 'Χειρολαβές']
        : ['Recycled materials', 'High durability', 'Eco-friendly', 'Handles included'],
    },
    {
      id: 'custom',
      image: customBags,
      title: t('products.custom.full.title'),
      description: t('products.custom.full.desc'),
      features: language === 'el'
        ? ['Πλήρης εκτύπωση', 'Εταιρικά χρώματα', 'Ειδικές διαστάσεις', 'Branding']
        : ['Full printing', 'Corporate colors', 'Custom dimensions', 'Branding'],
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="container-page relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('products.page.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('products.page.subtitle')}
            </p>
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
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="rounded-2xl overflow-hidden shadow-elevated">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full aspect-square object-cover"
                      />
                    </div>
                  </div>

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
                      <Link to="/contact">
                        {t('products.request')}
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
              <Link to="/contact">
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
