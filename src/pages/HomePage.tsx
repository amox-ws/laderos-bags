import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Truck, Palette, Leaf } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import heroBags from '@/assets/hero-bags.jpg';
import plasticBags from '@/assets/plastic-bags.jpg';
import paperBags from '@/assets/paper-bags.jpg';
import customBags from '@/assets/custom-bags.jpg';

const HomePage = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Award,
      title: t('features.quality.title'),
      description: t('features.quality.desc'),
    },
    {
      icon: Palette,
      title: t('features.custom.title'),
      description: t('features.custom.desc'),
    },
    {
      icon: Truck,
      title: t('features.reliable.title'),
      description: t('features.reliable.desc'),
    },
    {
      icon: Leaf,
      title: t('features.eco.title'),
      description: t('features.eco.desc'),
    },
  ];

  const products = [
    {
      image: plasticBags,
      title: t('products.plastic.title'),
      description: t('products.plastic.desc'),
    },
    {
      image: paperBags,
      title: t('products.paper.title'),
      description: t('products.paper.desc'),
    },
    {
      image: customBags,
      title: t('products.custom.title'),
      description: t('products.custom.desc'),
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBags}
            alt="Laderos Bags - Premium packaging solutions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
        </div>

        <div className="container-page relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/products">
                  {t('hero.cta.products')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/contact">{t('hero.cta.contact')}</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Features Section */}
      <section className="section-padding gradient-subtle">
        <div className="container-page">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('features.title')}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow duration-300 h-full">
                  <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-brand" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="section-padding">
        <div className="container-page">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('products.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('products.subtitle')}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <AnimatedSection key={index} delay={index * 0.15}>
                <div className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Button variant="brand" size="lg" asChild>
              <Link to="/products">
                {t('products.viewall')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </AnimatedSection>
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

export default HomePage;
