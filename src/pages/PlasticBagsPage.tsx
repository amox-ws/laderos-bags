import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import QuoteRequestForm from '@/components/forms/QuoteRequestForm';

const PlasticBagsPage = () => {
  const { t } = useLanguage();

  const features = [
    t('plasticBags.feature1'),
    t('plasticBags.feature2'),
    t('plasticBags.feature3'),
    t('plasticBags.feature4'),
    t('plasticBags.feature5'),
    t('plasticBags.feature6'),
  ];

  const placeholderImages = ['', '', '', '', '', ''];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding gradient-hero">
        <div className="container-page">
          <AnimatedSection className="text-center">
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('plasticBags.backToProducts')}
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              {t('plasticBags.title')}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              {t('plasticBags.subtitle')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Text Content */}
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('plasticBags.sectionTitle')}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-base md:text-lg leading-relaxed">
                  {t('plasticBags.description1')}
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  {t('plasticBags.description2')}
                </p>
              </div>

              {/* Features List */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {t('plasticBags.featuresTitle')}
                </h3>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-10">
                <Button 
                  variant="default" 
                  size="lg" 
                  onClick={() => {
                    const quoteSection = document.getElementById('quote-section');
                    quoteSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {t('plasticBags.cta')}
                </Button>
              </div>
            </AnimatedSection>

            {/* Image Gallery */}
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {placeholderImages.map((image, index) => (
                  <div 
                    key={index}
                    className="aspect-square rounded-xl overflow-hidden bg-muted shadow-card hover:shadow-elevated transition-shadow duration-300"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={`${t('plasticBags.title')} ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                            <span className="text-lg font-bold">{index + 1}</span>
                          </div>
                          <p className="text-xs">Image</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="section-padding gradient-subtle">
        <div className="container-page">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t('plasticBags.applicationsTitle')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('plasticBags.applicationsText')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {t('plasticBags.industries').split(',').map((industry, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-card rounded-full text-sm font-medium text-foreground shadow-sm"
                >
                  {industry.trim()}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quote Request Form Section */}
      <section id="quote-section" className="section-padding bg-background scroll-mt-20">
        <div className="container-page">
          <AnimatedSection>
            <QuoteRequestForm bagType="plastic" />
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default PlasticBagsPage;
