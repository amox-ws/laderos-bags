import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import QuoteRequestForm from '@/components/forms/QuoteRequestForm';
import { useIsMobile } from '@/hooks/use-mobile';

const GalleryImage = ({ src, className = '', index, scale = 1 }: { src: string; className?: string; index: number; scale?: number }) => (
  <div className={`group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 ${className}`}>
    <div className="w-full h-full bg-muted overflow-hidden">
      <img 
        src={src} 
        alt={`Plastic Bag Application ${index + 1}`}
        style={{ transform: `scale(${scale})` }}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 origin-center"
        loading="lazy"
      />
    </div>
  </div>
);

const PlasticBagsPage = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const plasticBagImages = [
    '/plastic_product/sporthero.webp',
    '/plastic_product/annette.webp',
    '/plastic_product/b&b.webp',
    '/plastic_product/beauty.webp',
    '/plastic_product/butchery.webp',
    '/plastic_product/casba.webp',
    '/plastic_product/lab35.webp',
    '/plastic_product/navy_green.webp',
    '/plastic_product/oasis.webp',
    '/plastic_product/oida.webp',
    '/plastic_product/plaza.webp',
    '/plastic_product/proton.webp',
    '/plastic_product/sport_jean.webp',
    '/plastic_product/annas_secret.webp',
    '/plastic_product/ugeia.webp',
  ];

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
      {/* Hero */}
      <section className="section-padding main-section">
        <div className="container-page">
          <AnimatedSection className="text-center">
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm uppercase tracking-[0.1em]"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('plasticBags.backToProducts')}
            </Link>
            <h1 className="mb-6">
              {t('plasticBags.title')}
            </h1>
            <div className="section-divider mb-8" />
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('plasticBags.subtitle')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-section">
        <div className="container-page py-16 md:py-28 lg:py-36">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20">
            
            {/* Left Column - Sticky Text */}
            <div className="w-full lg:w-[42%] xl:w-[38%]">
              <div className={isMobile ? '' : 'lg:sticky lg:top-28 lg:self-start'}>
                <AnimatedSection>
                  <h2 className="mb-6">
                    {t('plasticBags.sectionTitle')}
                  </h2>
                  <div className="w-12 h-[2px] bg-primary/40 mb-6" />
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-base md:text-lg leading-relaxed">
                      {t('plasticBags.description1')}
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                      {t('plasticBags.description2')}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mt-10">
                    <h3 className="eyebrow block mb-5">
                      {t('plasticBags.featuresTitle')}
                    </h3>
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-muted-foreground text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

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

            {/* Right Column - Gallery */}
            <div className="w-full lg:w-[58%] xl:w-[62%]">
              <AnimatedSection delay={0.2}>
                <div className="flex flex-col gap-4">
                  <div className="w-full">
                    <GalleryImage src={plasticBagImages[0]} index={0} className="w-full aspect-[16/9]" scale={1.5} />
                  </div>
                  <div className="flex gap-4">
                    <GalleryImage src={plasticBagImages[1]} index={1} className="w-[55%] aspect-[3/4]" />
                    <GalleryImage src={plasticBagImages[2]} index={2} className="w-[45%] aspect-square" />
                  </div>
                  <div className="flex gap-4">
                    <GalleryImage src={plasticBagImages[3]} index={3} className="w-[45%] aspect-[4/5]" />
                    <GalleryImage src={plasticBagImages[4]} index={4} className="w-[55%] aspect-[3/4]" />
                  </div>
                  <div className="flex gap-4">
                    <GalleryImage src={plasticBagImages[5]} index={5} className="w-[45%] aspect-[4/5]" />
                    <GalleryImage src={plasticBagImages[6]} index={6} className="w-[55%] aspect-[4/5]" />
                  </div>
                  <div className="flex gap-4">
                    <GalleryImage src={plasticBagImages[7]} index={7} className="w-[52%] aspect-[3/4]" />
                    <GalleryImage src={plasticBagImages[8]} index={8} className="w-[48%] aspect-[4/5]" />
                  </div>
                  <div className="flex gap-4">
                    <GalleryImage src={plasticBagImages[9]} index={9} className="w-[55%] aspect-[3/4]" />
                    <GalleryImage src={plasticBagImages[10]} index={10} className="w-[45%] aspect-[3/4]" />
                  </div>
                  <div className="flex gap-4">
                    <GalleryImage src={plasticBagImages[11]} index={11} className="w-[58%] aspect-[4/5]" />
                    <GalleryImage src={plasticBagImages[12]} index={12} className="w-[42%] aspect-[3/5]" />
                  </div>
                  <div className="flex gap-4">
                    <GalleryImage src={plasticBagImages[13]} index={13} className="w-[45%] aspect-[3/5]" />
                    <GalleryImage src={plasticBagImages[14]} index={14} className="w-[55%] aspect-[4/5]" />
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="section-padding main-section">
        <div className="container-page">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="mb-6">
              {t('plasticBags.applicationsTitle')}
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-lg text-muted-foreground mb-10">
              {t('plasticBags.applicationsText')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {t('plasticBags.industries').split(',').map((industry, index) => (
                <span 
                  key={index}
                  className="px-5 py-2.5 bg-white rounded-full text-sm font-medium shadow-card border border-border/40"
                >
                  {industry.trim()}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-section" className="section-padding accent-section scroll-mt-20">
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