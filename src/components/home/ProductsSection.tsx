import { useLanguage } from '@/contexts/LanguageContext';
import type { CSSProperties } from 'react';
import ProductCarousel from './ProductCarousel';
import { Reveal, RevealHeading } from '@/components/ui/Reveal';

/**
 * Bento layout on a 12-column grid: the two core ranges lead large, the
 * five special categories follow in a row of three and a row of two.
 */
const LAYOUT = [
  { span: 'lg:col-span-7', frame: 'aspect-[4/3] lg:aspect-auto lg:h-[clamp(24rem,40vw,40rem)]' },
  { span: 'lg:col-span-5', frame: 'aspect-[4/3] lg:aspect-auto lg:h-[clamp(24rem,40vw,40rem)]' },
  { span: 'lg:col-span-4', frame: 'aspect-[4/3] lg:aspect-[4/5]' },
  { span: 'lg:col-span-4', frame: 'aspect-[4/3] lg:aspect-[4/5]' },
  { span: 'lg:col-span-4', frame: 'aspect-[4/3] lg:aspect-[4/5]' },
  { span: 'lg:col-span-6', frame: 'aspect-[4/3] lg:aspect-[16/11]' },
  { span: 'lg:col-span-6', frame: 'aspect-[4/3] lg:aspect-[16/11]' },
];

const ProductsSection = () => {
  const { t, language } = useLanguage();

  /** Cards shown on the home page, in order. The image lists for the three
   *  newest categories are placeholders until we pick the final shots. */
  const cards = [
    {
      key: 'paper',
      title: t('products.paper.title'),
      linkTo: '/products/paper-bags',
      images: [
        '/product_bags/navy_and_green.webp',
        '/product_bags/pink.webp',
        '/product_bags/redbull.webp',
        '/product_bags/cashew.webp',
      ],
    },
    {
      key: 'plastic',
      title: t('products.plastic.title'),
      linkTo: '/products/plastic-bags',
      images: [
        '/laderosfoto14-10_studio_smooth_webp/navygreen-plastiki-xirolavi.webp',
        '/product_bags/black_pink.webp',
        '/product_bags/ygeia.webp',
        '/product_bags/butcher.webp',
      ],
    },
    {
      key: 'optika',
      title: language === 'el' ? 'Οπτικά' : 'Optical',
      linkTo: '/products/optika',
      images: ['/product_bags/optolux.webp', '/product_bags/optofree.webp'],
    },
    {
      key: 'paidika',
      title: language === 'el' ? 'Παιδικά' : 'Kids',
      linkTo: '/products/paidika',
      images: [
        '/product_bags/capolino.webp',
        '/product_bags/oneiropagida.webp',
        '/product_bags/kidclub.webp',
      ],
    },
    {
      key: 'andrika',
      title: language === 'el' ? 'Ανδρικά' : 'Menswear',
      linkTo: '/products/andrika',
      images: [
        '/paper_product/andrika/sakoula-beneto-maretti-2.webp',
        '/paper_product/andrika/sakoula-kingsman.webp',
        '/paper_product/andrika/sakoula-lacoste.webp',
      ],
    },
    {
      key: 'gynaikeia',
      title: language === 'el' ? 'Γυναικεία' : 'Womenswear',
      linkTo: '/products/gynaikeia',
      images: [
        '/paper_product/woman/sakoula-xontou-boutique.webp',
        '/paper_product/woman/sakoula-annas-secret.webp',
        '/paper_product/woman/sakoula-illusions-d.webp',
      ],
    },
    {
      key: 'oikologika',
      title: language === 'el' ? 'Οικολογικά' : 'Eco-Friendly',
      linkTo: '/products/oikologika',
      images: [
        '/paper_product/oikologika/sakoula-surf-skate-shop.webp',
        '/paper_product/oikologika/sakoula-ikorganic.webp',
        '/paper_product/oikologika/sakoula-privee-lingerie.webp',
      ],
    },
  ];

  return (
    <section id="products-section" className="relative overflow-hidden pb-24 pt-28 md:pb-36 md:pt-40">
      <div className="container-page">
        {/* Statement header — headline left, the two paragraphs set as a column right */}
        <div className="mb-16 grid gap-10 md:mb-24 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">{t('nav.products')}</span>
            </Reveal>
            <RevealHeading
              text={t('products.section.title')}
              className={`mt-7 max-w-[15ch] text-[clamp(2.6rem,1.3rem+4.4vw,6.25rem)] leading-[0.98]${language === 'en' ? ' fit-heading' : ''}`}
              // "Measurements" is wide — keep it on the screen on 320px phones.
              style={language === 'en' ? ({ '--fit': 6.6, '--fit-max': '2.6rem' } as CSSProperties) : undefined}
            />
          </div>
          <Reveal className="space-y-5 lg:col-span-5 lg:pb-3" delay={0.2}>
            <p className="text-base leading-relaxed text-ink/70 md:text-[17px]">{t('products.section.text1')}</p>
            <p className="text-base leading-relaxed text-ink/70 md:text-[17px]">{t('products.section.text2')}</p>
          </Reveal>
        </div>

        {/* Product media — bento */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-16">
          {cards.map((card, i) => (
            <Reveal key={card.key} className={LAYOUT[i].span} delay={(i % 3) * 0.1} y={60}>
              <ProductCarousel
                title={card.title}
                images={card.images}
                linkTo={card.linkTo}
                frameClass={LAYOUT[i].frame}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
