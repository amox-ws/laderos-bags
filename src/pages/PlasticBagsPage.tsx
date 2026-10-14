import { Link } from '@/components/LocalizedLink';
import SEO from '@/components/SEO';
import { makeBreadcrumbLd } from '@/lib/seo';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import { Applications, ProductHero, ProductIntro, QuoteStage } from '@/components/products/ProductPageParts';
import QuoteRequestForm from '@/components/forms/QuoteRequestForm';
import { SpecialCategoriesTeaser } from '@/components/products/SpecialCategories';
import PlasticGallery, { PlasticCategoryNav } from '@/components/products/PlasticGallery';
import { useIsMobile } from '@/hooks/use-mobile';
import { scrollToId } from '@/lib/scrollToTarget';

const PlasticBagsPage = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  /** Styled photos for the film-strip at the top of the page. */
  const stripImages = [
    '/plastic_product/sporthero.webp',
    '/plastic_product/butchery.webp',
    '/plastic_product/casba.webp',
    '/plastic_product/navy_green.webp',
    '/plastic_product/proton.webp',
    '/plastic_product/sport_jean.webp',
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
      <SEO routeKey="/products/plastic-bags" jsonLd={makeBreadcrumbLd([[t('nav.home'), '/'], [t('nav.products'), '/products'], [t('nav.products.plastic'), '/products/plastic-bags']])} />
      {/* Hero */}
      <ProductHero
        backLabel={t('plasticBags.backToProducts')}
        title={t('plasticBags.title')}
        subtitle={t('plasticBags.subtitle')}
        strip={[...stripImages, '/product_bags/black_pink.webp', '/product_bags/ygeia.webp']}
        nav={<PlasticCategoryNav />}
      />

      {/* Main Content */}
      <section className="main-section">
        <div className="container-page py-24 md:py-32 lg:py-40">
          <div className="flex flex-col gap-14 lg:flex-row lg:gap-16 xl:gap-24">

            {/* Left Column - Sticky Text */}
            <div className="w-full lg:w-[40%] xl:w-[36%]">
              <div className={isMobile ? '' : 'lg:sticky lg:top-28 lg:self-start'}>
                <ProductIntro
                  title={t('plasticBags.sectionTitle')}
                  paragraphs={[t('plasticBags.description1'), t('plasticBags.description2')]}
                  featuresTitle={t('plasticBags.featuresTitle')}
                  features={features}
                  cta={t('plasticBags.cta')}
                  onCta={() => scrollToId('quote-section')}
                />
              </div>
            </div>

            {/* Right Column - Gallery */}
            <div className="w-full lg:w-[60%] xl:w-[64%]">
              {/* Every photo, grouped by bag type; the hero navigation jumps here */}
              <PlasticGallery />

              {/* Ειδικές κατηγορίες — πλήρεις συλλογές σε δικές τους σελίδες */}
              <SpecialCategoriesTeaser className="mt-24" />
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <Applications
        title={t('plasticBags.applicationsTitle')}
        text={t('plasticBags.applicationsText')}
        industries={t('plasticBags.industries').split(',').map((s) => s.trim())}
      />

      {/* Quote Form */}
      <QuoteStage>
        <QuoteRequestForm bagType="plastic" />
      </QuoteStage>
    </Layout>
  );
};

export default PlasticBagsPage;