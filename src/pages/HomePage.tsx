import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import heroBags from '@/assets/hero-bags.jpg';
import plasticBags from '@/assets/plastic-bags.jpg';
import paperBags from '@/assets/paper-bags.jpg';


const HomePage = () => {
  const { t } = useLanguage();

  const products = [
    {
      image: plasticBags,
      title: t('products.plastic.title'),
      description: t('products.plastic.desc'),
      link: '/products',
    },
    {
      image: paperBags,
      title: t('products.paper.title'),
      description: t('products.paper.desc'),
      link: '/products',
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

      {/* Products Section - Large, prominent cards */}
      <section className="section-padding">
        <div className="container-page">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t('products.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('products.subtitle')}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            {products.map((product, index) => (
              <AnimatedSection key={index} delay={index * 0.15}>
                <Link 
                  to={product.link}
                  className="group block bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 active:scale-[0.98]"
                >
                  {/* Image container - tall aspect ratio for prominence */}
                  <div className="aspect-[4/3] md:aspect-[3/2] overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Text overlay on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3">
                        {product.title}
                      </h3>
                      <p className="text-white/90 text-base md:text-lg leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* CTA footer */}
                  <div className="p-5 md:p-6 flex items-center justify-between bg-card group-hover:bg-brand-pale transition-colors duration-300">
                    <span className="text-base md:text-lg font-semibold text-foreground group-hover:text-brand transition-colors">
                      {t('products.explore')}
                    </span>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand/10 group-hover:bg-brand flex items-center justify-center transition-all duration-300">
                      <ArrowRight className="h-5 w-5 md:h-6 md:w-6 text-brand group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </Link>
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

export default HomePage;
