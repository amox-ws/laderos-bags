import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import QuoteRequestForm from '@/components/forms/QuoteRequestForm';
import { useIsMobile } from '@/hooks/use-mobile';

// Image placeholder component
const ImagePlaceholder = ({ id, className = '' }: { id: number; className?: string }) => (
  <div className={`rounded-xl overflow-hidden bg-muted shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] ${className}`}>
    <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 rounded-full bg-muted-foreground/20 flex items-center justify-center">
          <span className="text-lg md:text-xl font-bold">{id}</span>
        </div>
        <p className="text-xs text-muted-foreground/70">Plastic Bag {id}</p>
      </div>
    </div>
  </div>
);

const PlasticBagsPage = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const features = [
    t('plasticBags.feature1'),
    t('plasticBags.feature2'),
    t('plasticBags.feature3'),
    t('plasticBags.feature4'),
    t('plasticBags.feature5'),
    t('plasticBags.feature6'),
  ];

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

      {/* Main Content with Sticky Text */}
      <section className="bg-background">
        <div className="container-page py-16 md:py-24 lg:py-32">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
            
            {/* Left Column - Sticky Text Content */}
            <div className="w-full lg:w-[45%] xl:w-[40%]">
              <div className={isMobile ? '' : 'lg:sticky lg:top-24 lg:self-start'}>
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
              </div>
            </div>

            {/* Right Column - Structured Image Grid (matching Paper Bags exactly) */}
            <div className="w-full lg:w-[55%] xl:w-[60%]">
              <AnimatedSection delay={0.2}>
                <div className="flex flex-col gap-4">
                  
                  {/* Row 1: Single wide image */}
                  <div className="w-full">
                    <ImagePlaceholder id={1} className="w-full aspect-[16/9]" />
                  </div>

                  {/* Row 2: Two images - left larger portrait, right smaller */}
                  <div className="flex gap-4">
                    <ImagePlaceholder id={2} className="w-[55%] aspect-[3/4]" />
                    <ImagePlaceholder id={3} className="w-[45%] aspect-square" />
                  </div>

                  {/* Row 3: Two images - left smaller, right portrait */}
                  <div className="flex gap-4">
                    <ImagePlaceholder id={4} className="w-[45%] aspect-[4/5]" />
                    <ImagePlaceholder id={5} className="w-[55%] aspect-[3/4]" />
                  </div>

                  {/* Row 4: Two images - equal size */}
                  <div className="flex gap-4">
                    <ImagePlaceholder id={6} className="w-1/2 aspect-[4/5]" />
                    <ImagePlaceholder id={7} className="w-1/2 aspect-[4/5]" />
                  </div>

                  {/* Row 5: Two images - left small dark, right large */}
                  <div className="flex gap-4">
                    <ImagePlaceholder id={8} className="w-[40%] aspect-[3/4]" />
                    <ImagePlaceholder id={9} className="w-[60%] aspect-[4/5]" />
                  </div>

                  {/* Row 6: Two images - both larger */}
                  <div className="flex gap-4">
                    <ImagePlaceholder id={10} className="w-[55%] aspect-[3/4]" />
                    <ImagePlaceholder id={11} className="w-[45%] aspect-[3/4]" />
                  </div>

                  {/* Row 7: Two images */}
                  <div className="flex gap-4">
                    <ImagePlaceholder id={12} className="w-[60%] aspect-[4/5]" />
                    <ImagePlaceholder id={13} className="w-[40%] aspect-[3/5]" />
                  </div>

                  {/* Row 8: Single full width */}
                  <div className="w-full">
                    <ImagePlaceholder id={14} className="w-full aspect-[16/10]" />
                  </div>

                  {/* Row 9: Single image */}
                  <div className="w-full">
                    <ImagePlaceholder id={15} className="w-full aspect-[16/9]" />
                  </div>

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
