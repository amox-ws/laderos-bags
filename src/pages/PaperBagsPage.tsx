import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import QuoteRequestForm from '@/components/forms/QuoteRequestForm';
import { useIsMobile } from '@/hooks/use-mobile';

const PaperBagsPage = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const features = [
    t('paperBags.feature1'),
    t('paperBags.feature2'),
    t('paperBags.feature3'),
    t('paperBags.feature4'),
    t('paperBags.feature5'),
    t('paperBags.feature6'),
  ];

  // 17 image placeholders for the masonry grid
  const placeholderImages = Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    // Varying aspect ratios for masonry effect
    aspectRatio: i % 3 === 0 ? 'tall' : i % 3 === 1 ? 'wide' : 'square',
  }));

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
              {t('paperBags.backToProducts')}
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              {t('paperBags.title')}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              {t('paperBags.subtitle')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content with Sticky Text */}
      <section className="bg-background">
        <div className="container-page py-16 md:py-24 lg:py-32">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
            
            {/* Left Column - Sticky Text Content */}
            <div className="w-full lg:w-[45%] xl:w-[40%]">
              <div className={isMobile ? '' : 'lg:sticky lg:top-24 lg:self-start'}>
                <AnimatedSection>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    {t('paperBags.sectionTitle')}
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-base md:text-lg leading-relaxed">
                      {t('paperBags.description1')}
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                      {t('paperBags.description2')}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {t('paperBags.featuresTitle')}
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
                      {t('paperBags.cta')}
                    </Button>
                  </div>
                </AnimatedSection>
              </div>
            </div>

            {/* Right Column - Masonry Image Grid */}
            <div className="w-full lg:w-[55%] xl:w-[60%]">
              <AnimatedSection delay={0.2}>
                <div className="columns-1 sm:columns-2 gap-4 space-y-4">
                  {placeholderImages.map((placeholder) => {
                    // Determine height based on aspect ratio type
                    const heightClass = 
                      placeholder.aspectRatio === 'tall' 
                        ? 'aspect-[3/4]' 
                        : placeholder.aspectRatio === 'wide' 
                          ? 'aspect-[4/3]' 
                          : 'aspect-square';
                    
                    return (
                      <div 
                        key={placeholder.id}
                        className={`${heightClass} break-inside-avoid rounded-xl overflow-hidden bg-muted shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-[1.02]`}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                          <div className="text-center text-muted-foreground">
                            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                              <span className="text-xl md:text-2xl font-bold">{placeholder.id}</span>
                            </div>
                            <p className="text-sm text-muted-foreground/70">Paper Bag {placeholder.id}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="section-padding gradient-subtle">
        <div className="container-page">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t('paperBags.applicationsTitle')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('paperBags.applicationsText')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {t('paperBags.industries').split(',').map((industry, index) => (
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
            <QuoteRequestForm bagType="paper" />
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default PaperBagsPage;
