import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import QuoteRequestForm from '@/components/forms/QuoteRequestForm';
import { useIsMobile } from '@/hooks/use-mobile';

// Component για την εμφάνιση της εικόνας
const GalleryImage = ({ src, className = '', index }: { src: string; className?: string; index: number }) => (
  <div className={`group relative rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:scale-[1.01] ${className}`}>
    <div className="w-full h-full bg-muted">
      <img 
        src={src} 
        alt={`Paper Bag Application ${index + 1}`}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />
    </div>
  </div>
);

const PaperBagsPage = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  // --- ΛΙΣΤΑ ΕΙΚΟΝΩΝ ---
  // Αντικατέστησε τα ονόματα των αρχείων με τα δικά σου.
  // Η σειρά αντιστοιχεί στη διάταξη του Grid (1 = η πρώτη μεγάλη επάνω, κλπ).
  const paperBagImages = [
    '/paper_product/anastasia.PNG', // 1. Μεγάλη φαρδιά πάνω
    '/paper_product/asteras_tripolis.PNG', // 2. Κάθετη αριστερά
    '/paper_product/benetto.PNG', // 3. Τετράγωνη δεξιά
    '/paper_product/bsb.PNG', // 4. Μικρή αριστερά
    '/paper_product/casba.PNG', // 5. Κάθετη δεξιά
    '/paper_product/di_mondo.PNG', // 6. Αριστερά (ίση)
    '/paper_product/dionisos.PNG', // 7. Δεξιά (ίση)
    '/paper_product/fikos_black.PNG', // 8. Μικρή σκοτεινή αριστερά
    '/paper_product/illusions.PNG', // 9. Μεγάλη δεξιά
    '/paper_product/kostis.PNG', // 10. Μεγάλη αριστερά
    '/paper_product/morris.PNG', // 11. Μικρή δεξιά
    '/paper_product/mts.PNG', // 12. Μεγάλη αριστερά
    '/paper_product/navy_green.PNG', // 13. Μικρή δεξιά
    '/paper_product/sagiakos.PNG', // 14. Μεγάλη φαρδιά
    '/paper_product/wine.PNG', // 15. Τετράγωνη αριστερά
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

            {/* Right Column - Gallery Grid */}
            <div className="w-full lg:w-[55%] xl:w-[60%]">
              <AnimatedSection delay={0.2}>
                <div className="flex flex-col gap-4">
                  
                  {/* Row 1: Single wide image */}
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

                  {/* Row 8: Single full width */}
                  <div className="w-full">
                    <GalleryImage src={paperBagImages[13]} index={13} className="w-full aspect-[16/10]" />
                  </div>

                  {/* Row 9: Two smaller images */}
                  <div className="flex gap-4">
                    <GalleryImage src={paperBagImages[14]} index={14} className="w-[45%] aspect-square" />
                    <GalleryImage src={paperBagImages[15]} index={15} className="w-[55%] aspect-[4/3]" />
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