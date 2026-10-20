import SEO from '@/components/SEO';
import { makeBreadcrumbLd } from '@/lib/seo';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import CtaPanel from '@/components/CtaPanel';
import { ProductHero } from '@/components/products/ProductPageParts';
import { Reveal } from '@/components/ui/Reveal';

const DIR = '/peritiligma/';

/** Wrapping (tissue) paper we have printed. Navy & Green leads; the mixed shot closes the set. */
const WRAPS: { file: string; brand: string }[] = [
  { file: 'navygreen-peritiligmata.webp', brand: 'Navy & Green' },
  { file: 'benetomaretti-peritiligmata.webp', brand: 'Beneto Maretti' },
  { file: 'ragazzi-peritiligmata.webp', brand: 'Ragazzi' },
  { file: 'artphotos-peritiligmata.webp', brand: 'Art Photos' },
  { file: 'doodle-peritiligmata.webp', brand: 'Doodle' },
  { file: 'ns-peritiligmata.webp', brand: 'NS' },
  { file: 'portobellos-peritiligmata.webp', brand: "Portobello's" },
  { file: 'mix-peritiligmata.webp', brand: '' },
];

const WrappingPaperPage = () => {
  const { t, language } = useLanguage();
  const el = language !== 'en';
  const title = el ? 'Περιτυλίγματα' : 'Tissue Paper';
  const kind = el ? 'Περιτύλιγμα με εκτύπωση λογοτύπου' : 'Tissue paper printed with a logo';

  return (
    <Layout>
      <SEO
        routeKey="/products/peritiligmata"
        jsonLd={makeBreadcrumbLd([
          [t('nav.home'), '/'],
          [t('nav.products'), '/products'],
          [title, '/products/peritiligmata'],
        ])}
      />

      <ProductHero
        backLabel={t('paperBags.backToProducts')}
        title={title}
        subtitle={
          el
            ? 'Χαρτί περιτυλίγματος με εκτύπωση του λογοτύπου σας, για να τυλίγετε τα προϊόντα σας με τη δική σας ταυτότητα.'
            : 'Tissue wrapping paper printed with your logo, so every product is wrapped in your brand.'
        }
        strip={WRAPS.map((w) => DIR + w.file)}
      />

      {/* Gallery — square studio shots, 2 / 4 per row */}
      <section className="main-section py-24 md:py-32">
        <div className="container-page">
          <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {WRAPS.map((wrap, i) => (
              <Reveal as="li" key={wrap.file} delay={(i % 4) * 0.06} y={40}>
                <figure className="group relative aspect-square overflow-hidden rounded-media bg-[#c8c9ce] shadow-card transition-shadow duration-700 ease-out-expo hover:shadow-card-hover">
                  <img
                    src={DIR + wrap.file}
                    alt={`${kind}${wrap.brand ? ` — ${wrap.brand}` : ''} | Laderos Bags`}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
                    loading={i < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                  />
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaPanel leftImage={DIR + 'navygreen-peritiligmata.webp'} rightImage={DIR + 'mix-peritiligmata.webp'} />
    </Layout>
  );
};

export default WrappingPaperPage;
