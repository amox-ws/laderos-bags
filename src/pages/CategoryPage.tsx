import { Link } from 'react-router-dom';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { makeBreadcrumbLd, makeFaqLd } from '@/lib/seo';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import QuoteRequestForm from '@/components/forms/QuoteRequestForm';
import type { CategoryContent } from '@/content/categories';
import Eyebrow from '@/components/ui/Eyebrow';
import { brandFromSrc } from '@/lib/text';

interface CategoryPageProps {
  content: CategoryContent;
}

/** Shared landing page for the Οπτικά / Παιδικά product categories. */
const CategoryPage = ({ content }: CategoryPageProps) => {
  const { t, language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'el';
  const routeKey = `/products/${content.slug}`;

  const scrollToQuote = () =>
    document.getElementById('quote-section')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <Layout>
      <SEO
        routeKey={routeKey}
        jsonLd={[
          makeBreadcrumbLd([
            ['Αρχική', '/'],
            ['Προϊόντα', '/products'],
            [content.h1.el, routeKey],
          ]),
          makeFaqLd(
            content.faq.map((f) => ({ question: f.q[lang], answer: f.a[lang] }))
          ),
        ]}
      />

      {/* Hero */}
      <section className="section-padding main-section">
        <div className="container-page">
          <AnimatedSection>
            <div className="mb-8">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-[0.1em] font-bold"
              >
                <ArrowLeft className="h-4 w-4" />
                {lang === 'el' ? 'Πίσω στα προϊόντα' : 'Back to products'}
              </Link>
            </div>

            <Eyebrow label={content.eyebrow[lang]} heading={content.h1[lang]} className="block" />
            <h1 className="mb-8 max-w-4xl">{content.h1[lang]}</h1>

            <div className="max-w-3xl space-y-5">
              {content.intro[lang].map((p, i) => (
                <p key={i} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button variant="default" size="lg" onClick={scrollToQuote}>
                {lang === 'el' ? 'Ζητήστε προσφορά' : 'Request a quote'}
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/products/paper-bags">
                  {lang === 'el' ? 'Όλες οι χάρτινες σακούλες' : 'All paper bags'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Editorial sections + highlights */}
      <section className="section-padding ink-section">
        <div className="container-page">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7 space-y-14">
              {content.sections.map((sec) => (
                <AnimatedSection key={sec.heading.el}>
                  <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl">{sec.heading[lang]}</h2>
                  <div className="space-y-4">
                    {sec.body[lang].map((p, i) => (
                      <p key={i} className="text-base md:text-lg leading-relaxed text-white/85">
                        {p}
                      </p>
                    ))}
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.15} className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <h3 className="eyebrow block mb-6">
                  {lang === 'el' ? 'Τι περιλαμβάνει' : 'What you get'}
                </h3>
                <ul className="space-y-4">
                  {content.highlights[lang].map((h) => (
                    <li key={h} className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="h-3.5 w-3.5 text-brand-light" />
                      </span>
                      <span className="text-white/85 text-base">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding main-section">
        <div className="container-page">
          <AnimatedSection className="mb-12">
            <h2 className="mb-4">{content.galleryHeading[lang]}</h2>
            <p className="text-muted-foreground text-lg measure">{content.galleryNote[lang]}</p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {content.images.map((src, i) => (
                <div
                  key={src}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-muted shadow-card hover:shadow-card-hover transition-all duration-500"
                >
                  <img
                    src={src}
                    alt={`${content.altPrefix[lang]} — ${brandFromSrc(src)} | Laderos Bags`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading={i < 4 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-depth-2">
        <div className="container-page">
          <AnimatedSection className="mb-12">
            <span className="section-label">FAQ</span>
            <h2 className="mb-0">
              {lang === 'el' ? 'Συχνές ερωτήσεις' : 'Frequently asked questions'}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {content.faq.map((f, i) => (
              <AnimatedSection key={f.q.el} delay={i * 0.08}>
                <div className="card-editorial rounded-xl p-7 h-full">
                  <h3 className="text-lg md:text-xl font-sans font-extrabold normal-case mb-3" style={{ letterSpacing: '0' }}>
                    {f.q[lang]}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{f.a[lang]}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quote form */}
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

export default CategoryPage;
