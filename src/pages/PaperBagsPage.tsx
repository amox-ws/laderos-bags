import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import QuoteRequestForm from '@/components/forms/QuoteRequestForm';
import { useIsMobile } from '@/hooks/use-mobile';

// Component για την εμφάνιση της εικόνας
// Προσθέσαμε το prop "objectFit" για να ελέγχουμε αν η εικόνα θα κόβεται ή όχι
const GalleryImage = ({ 
  src, 
  className = '', 
  index, 
  objectFit = 'cover' 
}: { 
  src: string; 
  className?: string; 
  index: number;
  objectFit?: 'cover' | 'contain';
}) => (
  <div className={`group relative rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:scale-[1.01] ${className}`}>
    <div className={`w-full h-full ${objectFit === 'contain' ? 'bg-white' : 'bg-muted'}`}>
      <img 
        src={src} 
        alt={`Paper Bag Application ${index + 1}`}
        className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 ${
          objectFit === 'contain' ? 'object-contain p-2' : 'object-cover'
        }`}
        loading="lazy"
      />
    </div>
  </div>
);

const PaperBagsPage = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  // --- ΛΙΣΤΑ ΕΙΚΟΝΩΝ ---
  const paperBagImages = [
    '/paper_product/navy_green.PNG',       // 0
    '/paper_product/bsb.PNG',              // 1
    '/paper_product/anastasia.PNG',        // 2
    '/paper_product/asteras_tripolis.PNG', // 3
    '/paper_product/benetto.PNG',          // 4
    '/paper_product/mts.PNG', 
               // 5
    '/paper_product/di_mondo.PNG',  
    '/paper_product/sagiakos.PNG',       // 6      // 7
    '/paper_product/fikos_black.PNG',      // 8
    '/paper_product/illusions.PNG',        // 9
    '/paper_product/kostis.PNG',           // 10
    '/paper_product/morris.PNG',           // 11
    '/paper_product/wine.PNG',             // 12
     '/paper_product/casba.PNG',           // 13
     '/paper_product/dionisos.PNG',       // 14
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
      {/* Hero Section - Level 1 (Lightest) */}
      <section className="section-padding section-depth-1">
        <div className="container-page">
          <AnimatedSection className="text-center">
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 opacity-70 hover:opacity-100 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('paperBags.backToProducts')}
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('paperBags.title')}
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto">
              {t('paperBags.subtitle')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content with Sticky Text - Level 2 */}
      <section className="section-depth-2">
        <div className="container-page py-16 md:py-24 lg:py-32">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
            
            {/* Left Column - Sticky Text Content */}
            <div className="w-full lg:w-[45%] xl:w-[40%]">
              <div className={isMobile ? '' : 'lg:sticky lg:top-24 lg:self-start'}>
                <AnimatedSection>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    {t('paperBags.sectionTitle')}
                  </h2>
                  <div className="space-y-4 opacity-80">
                    <p className="text-base md:text-lg leading-relaxed">
                      {t('paperBags.description1')}
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                      {t('paperBags.description2')}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">
                      {t('paperBags.featuresTitle')}
                    </h3>
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="opacity-80">{feature}</span>
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

            {/* Right Column - Gallery Grid */}
            <div className="w-full lg:w-[55%] xl:w-[60%]">
              <AnimatedSection delay={0.2}>
                <div className="flex flex-col gap-4">
                  
                  {/* Row 1: Navy Green - Χρησιμοποιούμε objectFit="contain" για να μην κόβεται */}
                  <div className="w-full">
                    <GalleryImage src={paperBagImages[0]} index={0} className="w-full aspect-[16/9]" />
                  </div>

                  {/* Row 2: Two images */}
                  <div className="flex gap-4">
                    <GalleryImage src={paperBagImages[1]} index={1} className="w-[55%] aspect-[3/4]" />
                    <GalleryImage src={paperBagImages[2]} index={2} className="w-[45%] aspect-square" />
                  </div>

                  {/* Row 3: Two images */}
                  <div className="flex gap-4">
                    <GalleryImage src={paperBagImages[3]} index={3} className="w-[45%] aspect-[4/5]" />
                    <GalleryImage src={paperBagImages[4]} index={4} className="w-[55%] aspect-[3/4]" />
                  </div>

                  {/* Row 4: Two images */}
                  <div className="flex gap-4">
                    <GalleryImage src={paperBagImages[5]} index={5} className="w-1/2 aspect-[4/5]" />
                    <GalleryImage src={paperBagImages[6]} index={6} className="w-1/2 aspect-[4/5]" />
                  </div>

                  {/* Row 5: Two images */}
                  <div className="flex gap-4">
                    <GalleryImage src={paperBagImages[7]} index={7} className="w-[40%] aspect-[3/4]" />
                    <GalleryImage src={paperBagImages[8]} index={8} className="w-[60%] aspect-[4/5]" />
                  </div>

                  {/* Row 6: Two images */}
                  <div className="flex gap-4">
                    <GalleryImage src={paperBagImages[9]} index={9} className="w-[55%] aspect-[3/4]" />
                    <GalleryImage src={paperBagImages[10]} index={10} className="w-[45%] aspect-[3/4]" />
                  </div>

                  {/* Row 7: Two images */}
                  <div className="flex gap-4">
                    <GalleryImage src={paperBagImages[11]} index={11} className="w-[60%] aspect-[4/5]" />
                    <GalleryImage src={paperBagImages[12]} index={12} className="w-[40%] aspect-[3/5]" />
                  </div>

                  {/* Row 8: MTS & Sagiakos - Τώρα σε δυάδα (κανονικό μέγεθος) */}
                  <div className="flex gap-4">
                    <GalleryImage src={paperBagImages[13]} index={13} className="w-[50%] aspect-square" />
                    <GalleryImage src={paperBagImages[14]} index={14} className="w-[50%] aspect-square" />
                  </div>

                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section - Level 4 */}
      <section className="section-padding section-depth-4">
        <div className="container-page">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('paperBags.applicationsTitle')}
            </h2>
            <p className="text-lg opacity-80 mb-8">
              {t('paperBags.applicationsText')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {t('paperBags.industries').split(',').map((industry, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium shadow-sm"
                >
                  {industry.trim()}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quote Request Form Section - Level 5 */}
      <section id="quote-section" className="section-padding section-depth-5 scroll-mt-20">
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