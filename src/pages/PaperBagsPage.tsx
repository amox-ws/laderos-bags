import { Link } from '@/components/LocalizedLink';
import SEO from '@/components/SEO';
import { makeBreadcrumbLd, makeItemListLd } from '@/lib/seo';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { Applications, ProductHero, ProductIntro, QuoteStage } from '@/components/products/ProductPageParts';
import QuoteRequestForm from '@/components/forms/QuoteRequestForm';
import { useIsMobile } from '@/hooks/use-mobile';
import { brandFromSrc } from '@/lib/text';
import { OPTIKA, PAIDIKA, ANDRIKA, GYNAIKEIA, OIKOLOGIKA } from '@/content/categories';
import { SpecialCategoriesTeaser } from '@/components/products/SpecialCategories';
import { scrollToId } from '@/lib/scrollToTarget';

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
    <div className={`group relative overflow-hidden rounded-media bg-paper-deep shadow-card transition-shadow duration-700 ease-out-expo hover:shadow-card-hover ${className}`}>
      <img
        src={src}
        alt={alt ?? `${language === 'el' ? 'Χάρτινη σακούλα με εκτύπωση λογοτύπου' : 'Custom paper bag with logo printing'} — ${brandFromSrc(src)} | Laderos Bags`}
        /* h-auto keeps the photo's own aspect ratio, so no bag is ever cropped */
        className="block h-auto w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
        loading="lazy"
      />
    </div>
  );
};

const PaperBagsPage = () => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  const paperBagImages = [
    '/paper_product/navygreen.webp',
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
      <ProductHero
        backLabel={t('paperBags.backToProducts')}
        title={t('paperBags.title')}
        subtitle={t('paperBags.subtitle')}
        strip={[
          '/paper_product/navygreen.webp',
          '/paper_product/kostis.webp',
          '/paper_product/illusions.webp',
          '/paper_product/morris.webp',
          '/paper_product/casba.webp',
          '/paper_product/wine.webp',
          '/paper_product/dionisos.webp',
          '/paper_product/benetto.webp',
          '/paper_product/di_mondo.webp',
          '/paper_product/bsb.webp',
        ]}
      />

      {/* Main Content */}
      <section className="main-section">
        <div className="container-page py-24 md:py-32 lg:py-40">
          <div className="flex flex-col gap-14 lg:flex-row lg:gap-16 xl:gap-24">

            {/* Left Column - Sticky Text */}
            <div className="w-full lg:w-[40%] xl:w-[36%]">
              <div className={isMobile ? '' : 'lg:sticky lg:top-28 lg:self-start'}>
                <ProductIntro
                  title={t('paperBags.sectionTitle')}
                  paragraphs={[t('paperBags.description1'), t('paperBags.description2')]}
                  featuresTitle={t('paperBags.featuresTitle')}
                  features={features}
                  cta={t('paperBags.cta')}
                  onCta={() => scrollToId('quote-section')}
                />
              </div>
            </div>

            {/* Right Column - Gallery */}
            <div className="w-full lg:w-[60%] xl:w-[64%]">
              <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 [column-fill:balance]">
                {paperBagImages.map((src, i) => (
                  <Reveal key={src} delay={(i % 3) * 0.06} y={40} className="mb-4 break-inside-avoid">
                    <GalleryImage src={src} />
                  </Reveal>
                ))}
              </div>

              {/* Ειδικές κατηγορίες — πλήρεις συλλογές σε δικές τους σελίδες */}
              <SpecialCategoriesTeaser className="mt-24" />
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <Applications
        title={t('paperBags.applicationsTitle')}
        text={t('paperBags.applicationsText')}
        industries={t('paperBags.industries').split(',').map((s) => s.trim())}
      />

      {/* Quote Form */}
      <QuoteStage>
        <QuoteRequestForm bagType="paper" />
      </QuoteStage>
    </Layout>
  );
};

export default PaperBagsPage;