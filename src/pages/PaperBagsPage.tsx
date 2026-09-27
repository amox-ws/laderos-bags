import { Link } from '@/components/LocalizedLink';
import SEO from '@/components/SEO';
import { makeBreadcrumbLd, makeItemListLd } from '@/lib/seo';
import { ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import QuoteRequestForm from '@/components/forms/QuoteRequestForm';
import { useIsMobile } from '@/hooks/use-mobile';
import { brandFromSrc } from '@/lib/text';
import { OPTIKA, PAIDIKA, ANDRIKA, GYNAIKEIA, OIKOLOGIKA } from '@/content/categories';
import { SpecialCategoriesTeaser } from '@/components/products/SpecialCategories';

const GalleryImage = ({
  src,
  className = '',
  alt,
}: {
  src: string;
  className?: string;
  alt?: string;
}) => {
  const { language } = useLanguage();
  return (
    <div className={`group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 ${className}`}>
      <img
        src={src}
        alt={alt ?? `${language === 'el' ? 'Χάρτινη σακούλα με εκτύπωση λογοτύπου' : 'Custom paper bag with logo printing'} — ${brandFromSrc(src)} | Laderos Bags`}
        /* h-auto keeps the photo's own aspect ratio, so no bag is ever cropped */
        className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
};

const PaperBagsPage = () => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  const paperBagImages = [
    '/paper_product/loipa/sakoula-studio-ioannidis.webp',
    '/paper_product/loipa/sakoula-cashew.webp',
    '/paper_product/kostis.webp',
    '/paper_product/fikos_black.webp',
    '/paper_product/loipa/sakoula-mole-2.webp',
    '/paper_product/loipa/sakoula-oida-vivliopoleio.webp',
    '/paper_product/loipa/sakoula-exis-vivliopoleio.webp',
    '/paper_product/casba.webp',
    '/paper_product/loipa/sakoula-asteras-tripolis.webp',
    '/paper_product/illusions.webp',
    '/paper_product/loipa/sakoula-le-shop.webp',
    '/paper_product/loipa/sakoula-endeavor-lines.webp',
    '/paper_product/morris.webp',
    '/paper_product/asteras_tripolis.webp',
    '/paper_product/loipa/sakoula-oida-vivliopoleio-2.webp',
    '/paper_product/loipa/sakoula-posto.webp',
    '/paper_product/loipa/sakoula-yournuts.webp',
    '/paper_product/mts.webp',
    '/paper_product/loipa/sakoula-ygeia-diagnostika-kentra.webp',
    '/paper_product/loipa/sakoula-seneca.webp',
    '/paper_product/loipa/sakoula-mole.webp',
    '/paper_product/navy_green.webp',
    '/paper_product/loipa/sakoula-seneca-medical-group.webp',
    '/paper_product/loipa/sakoula-ladybird-deco.webp',
    '/paper_product/benetto.webp',
    '/paper_product/loipa/sakoula-afoi-iosifidi.webp',
    '/paper_product/di_mondo.webp',
    '/paper_product/wine.webp',
    '/paper_product/loipa/sakoula-le-shop-3.webp',
    '/paper_product/loipa/sakoula-georgios-galifianakis.webp',
    '/paper_product/dionisos.webp',
    '/paper_product/sagiakos.webp',
    '/paper_product/loipa/sakoula-seneca-2.webp',
    '/paper_product/loipa/sakoula-le-shop-2.webp',
    '/paper_product/anastasia.webp',
    '/paper_product/loipa/sakoula-atmoulis.webp',
    '/paper_product/loipa/sakoula-boxbox.webp',
    '/paper_product/bsb.webp',
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
            [t('nav.home'), '/'],
            [t('nav.products'), '/products'],
            [t('nav.products.paper'), '/products/paper-bags'],
          ]),
          makeItemListLd(language === 'el' ? 'Κατηγορίες Χάρτινων Σακουλών' : 'Paper Bag Categories', [
            [language === 'el' ? 'Χάρτινες Σακούλες Πολυτελείας' : 'Luxury Paper Bags', '/products/paper-bags'],
            [language === 'el' ? 'Σακούλες για Οπτικά' : OPTIKA.h1.en, '/products/optika'],
            [language === 'el' ? 'Σακούλες για Παιδικά' : PAIDIKA.h1.en, '/products/paidika'],
            [language === 'el' ? ANDRIKA.h1.el : ANDRIKA.h1.en, '/products/andrika'],
            [language === 'el' ? GYNAIKEIA.h1.el : GYNAIKEIA.h1.en, '/products/gynaikeia'],
            [language === 'el' ? OIKOLOGIKA.h1.el : OIKOLOGIKA.h1.en, '/products/oikologika'],
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
                <div className="columns-1 sm:columns-2 xl:columns-3 gap-4 [column-fill:balance]">
                  {paperBagImages.map((src) => (
                    <GalleryImage key={src} src={src} className="mb-4 break-inside-avoid" />
                  ))}
                </div>
              </AnimatedSection>

              {/* Ειδικές κατηγορίες — πλήρεις συλλογές σε δικές τους σελίδες */}
              <SpecialCategoriesTeaser className="mt-16" />
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