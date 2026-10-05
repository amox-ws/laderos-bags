import SEO from '@/components/SEO';
import { makeBreadcrumbLd, makeFaqLd } from '@/lib/seo';
import { useLanguage } from '@/contexts/LanguageContext';
import ArrowButton from '@/components/ui/ArrowButton';
import { Reveal, RevealHeading } from '@/components/ui/Reveal';
import { BackLink, QuoteStage } from '@/components/products/ProductPageParts';
import Layout from '@/components/layout/Layout';
import QuoteRequestForm from '@/components/forms/QuoteRequestForm';
import type { CategoryContent } from '@/content/categories';
import CategoryCarousel from '@/components/ui/CategoryCarousel';
import { brandFromSrc } from '@/lib/text';
import { scrollToId } from '@/lib/scrollToTarget';

interface CategoryPageProps {
  content: CategoryContent;
}

/** Shared landing page for the Οπτικά / Παιδικά product categories. */
const CategoryPage = ({ content }: CategoryPageProps) => {
  const { t, language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'el';
  const routeKey = `/products/${content.slug}`;

  const scrollToQuote = () =>
    scrollToId('quote-section');

  return (
    <Layout>
      <SEO
        routeKey={routeKey}
        jsonLd={[
          makeBreadcrumbLd([
            [t('nav.home'), '/'],
            [t('nav.products'), '/products'],
            [content.h1[lang], routeKey],
          ]),
          makeFaqLd(
            content.faq.map((f) => ({ question: f.q[lang], answer: f.a[lang] }))
          ),
        ]}
      />

      {/* Hero */}
      <section className="main-section pb-24 pt-10 md:pb-32 md:pt-16">
        <div className="container-page">
          <Reveal y={10}>
            <BackLink>{lang === 'el' ? 'Πίσω στα προϊόντα' : 'Back to products'}</BackLink>
          </Reveal>

          <div className="mt-12 grid items-center gap-14 md:mt-16 lg:grid-cols-12 lg:gap-12">
            {/* Copy */}
            <div className="lg:col-span-7">
              <RevealHeading
                as="h1"
                text={content.h1[lang]}
                className="mb-10 text-[clamp(2.7rem,1.3rem+4.6vw,6.5rem)] leading-[0.96] tracking-[-0.04em]"
              />

              <Reveal delay={0.15} className="space-y-5">
                {content.intro[lang].map((p, i) => (
                  <p key={i} className={i === 0 ? 'text-lg leading-relaxed text-ink/80 md:text-xl' : 'text-base leading-relaxed text-ink/65 md:text-lg'}>
                    {p}
                  </p>
                ))}
              </Reveal>

              <Reveal delay={0.25} className="mt-12 flex flex-wrap gap-3">
                <ArrowButton onClick={scrollToQuote}>
                  {lang === 'el' ? 'Ζητήστε προσφορά' : 'Request a quote'}
                </ArrowButton>
                <ArrowButton to="/products/paper-bags" variant="ghost-dark">
                  {lang === 'el' ? 'Όλες οι χάρτινες σακούλες' : 'All paper bags'}
                </ArrowButton>
              </Reveal>
            </div>

            {/* Auto-playing carousel filling the space beside the copy */}
            <Reveal delay={0.2} y={60} className="lg:col-span-5">
              <CategoryCarousel images={content.images} altPrefix={content.altPrefix[lang]} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Editorial sections + highlights */}
      <section className="panel ink-section section-padding">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(45% 45% at 100% 0%, hsl(213 66% 45% / 0.22), transparent 70%)' }}
        />
        <div className="container-page relative">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-20 lg:col-span-7">
              {content.sections.map((sec) => (
                <div key={sec.heading.el}>
                  <RevealHeading
                    text={sec.heading[lang]}
                    className="mb-7 text-[clamp(2rem,1.3rem+2.4vw,3.5rem)] text-paper"
                  />
                  <Reveal delay={0.1} className="space-y-4">
                    {sec.body[lang].map((p, i) => (
                      <p key={i} className="text-base leading-relaxed text-paper/70 md:text-[17px]">
                        {p}
                      </p>
                    ))}
                  </Reveal>
                </div>
              ))}
            </div>

            <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
              <div className="rounded-media bg-paper/[0.05] p-7 ring-1 ring-inset ring-paper/10 lg:sticky lg:top-28 md:p-8">
                <h3 className="eyebrow mb-7">
                  {lang === 'el' ? 'Τι περιλαμβάνει' : 'What you get'}
                </h3>
                <ul className="space-y-0">
                  {content.highlights[lang].map((h) => (
                    <li key={h} className="flex items-start gap-4 border-b border-paper/10 py-4 last:border-b-0">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-light" />
                      <span className="text-[15px] leading-relaxed text-paper/80">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding main-section">
        <div className="container-page">
          <div className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-12 lg:items-end">
            <RevealHeading text={content.galleryHeading[lang]} className="mb-0 lg:col-span-7" />
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-lg text-ink/65">{content.galleryNote[lang]}</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {content.images.map((src, i) => (
              <Reveal key={src} delay={(i % 4) * 0.06} y={40}>
                <div className="group relative aspect-square overflow-hidden rounded-media bg-paper-deep shadow-card transition-shadow duration-700 ease-out-expo hover:shadow-card-hover">
                  <img
                    src={src}
                    alt={`${content.altPrefix[lang]} — ${brandFromSrc(src)} | Laderos Bags`}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
                    loading={i < 4 ? 'eager' : 'lazy'}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-depth-2">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <RevealHeading
                text={lang === 'el' ? 'Συχνές ερωτήσεις' : 'Frequently asked questions'}
                className="mb-0 lg:sticky lg:top-28"
              />
            </div>

            <div className="border-t border-ink/10 lg:col-span-8">
              {content.faq.map((f, i) => (
                <Reveal key={f.q.el} delay={i * 0.05}>
                  <div className="border-b border-ink/10 py-8 md:py-10">
                    <div>
                      <h3 className="mb-3 text-[1.45rem] leading-snug tracking-[-0.015em] md:text-[1.7rem]">
                        {f.q[lang]}
                      </h3>
                      <p className="leading-relaxed text-ink/65">{f.a[lang]}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote form */}
      <QuoteStage>
        <QuoteRequestForm bagType="paper" />
      </QuoteStage>
    </Layout>
  );
};

export default CategoryPage;
