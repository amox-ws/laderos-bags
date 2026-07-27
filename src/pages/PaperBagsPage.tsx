import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { makeBreadcrumbLd, makeItemListLd } from '@/lib/seo';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import QuoteRequestForm from '@/components/forms/QuoteRequestForm';
import { useIsMobile } from '@/hooks/use-mobile';

const GalleryImage = ({
  src,
  className = '',
  index,
  objectFit = 'cover',
  alt,
}: {
  src: string;
  className?: string;
  index: number;
  objectFit?: 'cover' | 'contain';
  alt?: string;
}) => (
  <div className={`group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 ${className}`}>
    <div className={`w-full h-full ${objectFit === 'contain' ? 'bg-white' : 'bg-muted'}`}>
      <img
        src={src}
        alt={alt ?? `Χάρτινη σακούλα με εκτύπωση λογοτύπου — δείγμα ${index + 1} | Laderos Bags`}
        className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 ${
          objectFit === 'contain' ? 'object-contain p-2' : 'object-cover'
        }`}
        loading="lazy"
      />
    </div>
  </div>
);

const PaperBagsPage = () => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  const optikaImages = [
    '/paper_product/optika/sakoula-optolux.webp',
    '/paper_product/optika/sakoula-optolux-2.webp',
    '/paper_product/optika/sakoula-optolux-3.webp',
    '/paper_product/optika/sakoula-optolux-panagouli.webp',
    '/paper_product/optika/sakoula-optolux-panagouli-2.webp',
    '/paper_product/optika/sakoula-optofree.webp',
    '/paper_product/optika/sakoula-optofree-2.webp',
    '/paper_product/optika/sakoula-optofree-3.webp',
    '/paper_product/optika/sakoula-occhi-eleganti.webp',
    '/paper_product/optika/sakoula-optical-room.webp',
    '/paper_product/optika/sakoula-optics.webp',
    '/paper_product/optika/sakoula-optics-poly.webp',
    '/paper_product/optika/sakoula-excellens.webp',
    '/paper_product/optika/sakoula-eye-like-u.webp',
  ];

  const paidikaImages = [
    '/paper_product/paidika/sakoula-kid-club.webp',
    '/paper_product/paidika/sakoula-kid-club-2.webp',
    '/paper_product/paidika/sakoula-kid-club-3.webp',
    '/paper_product/paidika/sakoula-kid-club-4.webp',
    '/paper_product/paidika/sakoula-oneiropagida.webp',
    '/paper_product/paidika/sakoula-oneiropagida-2.webp',
    '/paper_product/paidika/sakoula-oneiropagida-3.webp',
    '/paper_product/paidika/sakoula-oneiropagida-4.webp',
    '/paper_product/paidika/sakoula-oneiropagida-5.webp',
    '/paper_product/paidika/sakoula-oneiropagida-6.webp',
    '/paper_product/paidika/sakoula-oneiropagida-7.webp',
    '/paper_product/paidika/sakoula-capolino.webp',
    '/paper_product/paidika/sakoula-lilipoupoli.webp',
    '/paper_product/paidika/sakoula-lilipoupoli-2.webp',
    '/paper_product/paidika/sakoula-lilipoupoli-3.webp',
    '/paper_product/paidika/sakoula-sash-club.webp',
    '/paper_product/paidika/sakoula-sash-club-2.webp',
    '/paper_product/paidika/sakoula-sash-club-3.webp',
    '/paper_product/paidika/sakoula-sash-club-4.webp',
    '/paper_product/paidika/sakoula-tom-and-jerry.webp',
    '/paper_product/paidika/sakoula-tom-and-jerry-2.webp',
    '/paper_product/paidika/sakoula-azure-2.webp',
    '/paper_product/paidika/sakoula-bee-fashion.webp',
    '/paper_product/paidika/sakoula-brands.webp',
    '/paper_product/paidika/sakoula-cool-step.webp',
    '/paper_product/paidika/sakoula-dodo-squawk-fashion.webp',
    '/paper_product/paidika/sakoula-fragolina.webp',
    '/paper_product/paidika/sakoula-paidikos-paradeisos.webp',
    '/paper_product/paidika/sakoula-pallina.webp',
    '/paper_product/paidika/sakoula-skertso-kids-fashion.webp',
    '/paper_product/paidika/sakoula-sole-kids-footwear.webp',
    '/paper_product/paidika/sakoula-this-is-my-smile.webp',
  ];

  const paperBagImages = [
    '/paper_product/navy_green.webp',
    '/paper_product/bsb.webp',
    '/paper_product/anastasia.webp',
    '/paper_product/asteras_tripolis.webp',
    '/paper_product/benetto.webp',
    '/paper_product/mts.webp', 
    '/paper_product/di_mondo.webp',  
    '/paper_product/sagiakos.webp',
    '/paper_product/fikos_black.webp',
    '/paper_product/illusions.webp',
    '/paper_product/kostis.webp',
    '/paper_product/morris.webp',
    '/paper_product/wine.webp',
    '/paper_product/casba.webp',
    '/paper_product/dionisos.webp',
  ];

  const features = [
    t('paperBags.feature1'),
    t('paperBags.feature2'),
    t('paperBags.feature3'),
    t('paperBags.feature4'),
    t('paperBags.feature5'),
    t('paperBags.feature6'),
  ];

  return (
    <Layout>
      <SEO
        routeKey="/products/paper-bags"
        jsonLd={[
          makeBreadcrumbLd([
            ['Αρχική', '/'],
            ['Προϊόντα', '/products'],
            ['Χάρτινες Σακούλες', '/products/paper-bags'],
          ]),
          makeItemListLd('Κατηγορίες Χάρτινων Σακουλών', [
            ['Χάρτινες Σακούλες Πολυτελείας', '/products/paper-bags'],
            ['Σακούλες για Οπτικά', '/products/optika'],
            ['Σακούλες για Παιδικά', '/products/paidika'],
          ]),
        ]}
      />
      {/* Hero */}
      <section className="section-padding main-section">
        <div className="container-page">
          <AnimatedSection className="text-center">
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm uppercase tracking-[0.1em]"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('paperBags.backToProducts')}
            </Link>
            <h1 className="mb-6">
              {t('paperBags.title')}
            </h1>
            <div className="section-divider mb-8" />
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('paperBags.subtitle')}
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
                    {t('paperBags.sectionTitle')}
                  </h2>
                  <div className="w-12 h-[2px] bg-primary/40 mb-6" />
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-base md:text-lg leading-relaxed">
                      {t('paperBags.description1')}
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                      {t('paperBags.description2')}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mt-10">
                    <h3 className="eyebrow block mb-5">
                      {t('paperBags.featuresTitle')}
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
                      {t('paperBags.cta')}
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
                    <GalleryImage src={paperBagImages[0]} index={0} className="w-full aspect-[16/9]" />
                  </div>
                  <div className="flex gap-4">
                    <GalleryImage src={paperBagImages[1]} index={1} className="w-[55%] aspect-[3/4]" />
                    <GalleryImage src={paperBagImages[2]} index={2} className="w-[45%] aspect-square" />
                  </div>
                  <div className="flex gap-4">
                    <GalleryImage src={paperBagImages[3]} index={3} className="w-[45%] aspect-[4/5]" />
                    <GalleryImage src={paperBagImages[4]} index={4} className="w-[55%] aspect-[3/4]" />
                  </div>
                  <div className="flex gap-4">
                    <GalleryImage src={paperBagImages[5]} index={5} className="w-1/2 aspect-[4/5]" />
                    <GalleryImage src={paperBagImages[6]} index={6} className="w-1/2 aspect-[4/5]" />
                  </div>
                  <div className="flex gap-4">
                    <GalleryImage src={paperBagImages[7]} index={7} className="w-[40%] aspect-[3/4]" />
                    <GalleryImage src={paperBagImages[8]} index={8} className="w-[60%] aspect-[4/5]" />
                  </div>
                  <div className="flex gap-4">
                    <GalleryImage src={paperBagImages[9]} index={9} className="w-[55%] aspect-[3/4]" />
                    <GalleryImage src={paperBagImages[10]} index={10} className="w-[45%] aspect-[3/4]" />
                  </div>
                  <div className="flex gap-4">
                    <GalleryImage src={paperBagImages[11]} index={11} className="w-[60%] aspect-[4/5]" />
                    <GalleryImage src={paperBagImages[12]} index={12} className="w-[40%] aspect-[3/5]" />
                  </div>
                  <div className="flex gap-4">
                    <GalleryImage src={paperBagImages[13]} index={13} className="w-[50%] aspect-square" />
                    <GalleryImage src={paperBagImages[14]} index={14} className="w-[50%] aspect-square" />
                  </div>
                </div>
              </AnimatedSection>

              {/* Ειδικές κατηγορίες — πλήρεις συλλογές σε δικές τους σελίδες */}
              <AnimatedSection className="mt-16">
                <h3 className="mb-6">
                  [ {language === 'el' ? 'Ειδικές κατηγορίες' : 'Special categories'} ]
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Link to="/products/optika" className="group block">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-card group-hover:shadow-card-hover transition-all duration-500">
                      <img
                        src={optikaImages[0]}
                        alt={language === 'el' ? 'Χάρτινες σακούλες για οπτικά καταστήματα | Laderos Bags' : 'Paper bags for optical stores | Laderos Bags'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="media-label group-hover:gap-3.5 transition-all duration-300">
                      {language === 'el' ? 'Οπτικά' : 'Optical'}
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === 'el'
                        ? 'Σακούλες για οπτικά και φακούς επαφής — δείτε όλη τη συλλογή.'
                        : 'Bags for optical and contact-lens stores — see the full collection.'}
                    </p>
                  </Link>

                  <Link to="/products/paidika" className="group block">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-card group-hover:shadow-card-hover transition-all duration-500">
                      <img
                        src={paidikaImages[0]}
                        alt={language === 'el' ? 'Χάρτινες σακούλες για παιδικά καταστήματα | Laderos Bags' : 'Paper bags for kids stores | Laderos Bags'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="media-label group-hover:gap-3.5 transition-all duration-300">
                      {language === 'el' ? 'Παιδικά' : 'Kids'}
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === 'el'
                        ? 'Σακούλες για παιδικά ρούχα και υποδήματα — δείτε όλη τη συλλογή.'
                        : 'Bags for childrenswear and kids footwear — see the full collection.'}
                    </p>
                  </Link>
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
              {t('paperBags.applicationsTitle')}
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-lg text-muted-foreground mb-10">
              {t('paperBags.applicationsText')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {t('paperBags.industries').split(',').map((industry, index) => (
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
      <section id="quote-section" className="section-padding ink-section scroll-mt-20">
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