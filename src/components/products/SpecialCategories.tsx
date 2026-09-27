import { Link } from '@/components/LocalizedLink';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { SPECIAL_CATEGORIES, type CategoryContent } from '@/content/categories';

type Lang = 'el' | 'en';

const headingFor = (lang: Lang) => (lang === 'el' ? 'Ειδικές κατηγορίες' : 'Special categories');

const cardImageOf = (cat: CategoryContent) => cat.cardImage ?? cat.images[0];

/** The thumbnail + label + one-liner shared by both layouts. */
const CategoryLink = ({ cat, lang, boxed }: { cat: CategoryContent; lang: Lang; boxed: boolean }) => (
  <Link
    to={`/products/${cat.slug}`}
    className={
      boxed
        ? 'group flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-white/10 transition-all duration-500 hover:bg-white/[0.07] hover:ring-white/25 hover:-translate-y-1'
        : 'group block'
    }
  >
    <div
      className={`relative aspect-square overflow-hidden bg-muted ${
        boxed ? '' : 'rounded-2xl shadow-card group-hover:shadow-card-hover transition-all duration-500'
      }`}
    >
      <img
        src={cardImageOf(cat)}
        alt={`${cat.altPrefix[lang]} | Laderos Bags`}
        /* contain: the bag is shown whole, never cropped */
        className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
    </div>

    {boxed ? (
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2.5 flex items-center gap-2.5 text-xl md:text-2xl">
          {cat.navLabel[lang]}
          <ArrowRight className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
        </h3>
        <p className="text-sm leading-relaxed text-white/70">{cat.teaser[lang]}</p>
      </div>
    ) : (
      <>
        <div className="media-label group-hover:gap-3.5 transition-all duration-300">
          {cat.navLabel[lang]}
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
        <p className="text-sm text-muted-foreground mt-1">{cat.teaser[lang]}</p>
      </>
    )}
  </Link>
);

/**
 * Compact grid for inside a page column — used on the paper- and plastic-bag
 * pages, next to the product copy.
 */
export const SpecialCategoriesTeaser = ({ className = '' }: { className?: string }) => {
  const { language } = useLanguage();
  const lang: Lang = language === 'en' ? 'en' : 'el';

  return (
    <AnimatedSection className={className}>
      <h3 className="mb-6">{headingFor(lang)}</h3>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {SPECIAL_CATEGORIES.map((cat) => (
          <CategoryLink key={cat.slug} cat={cat} lang={lang} boxed={false} />
        ))}
      </div>
    </AnimatedSection>
  );
};

/** Full-width section with boxed cards — used on /products. */
const SpecialCategories = ({ className = '' }: { className?: string }) => {
  const { language } = useLanguage();
  const lang: Lang = language === 'en' ? 'en' : 'el';

  return (
    <section className={`section-padding ink-section overflow-hidden ${className}`}>
      <div className="container-page">
        <AnimatedSection className="max-w-2xl mb-14 md:mb-16">
          <h2 className="mb-5">{headingFor(lang)}</h2>
          <p className="text-base md:text-lg leading-relaxed text-white/80">
            {lang === 'el'
              ? 'Κάθε κλάδος έχει τις δικές του απαιτήσεις σε μέγεθος, αντοχή και εμφάνιση. Δείτε τις συλλογές που έχουμε κατασκευάσει ανά κατηγορία καταστήματος.'
              : 'Every sector has its own demands in size, strength and appearance. Browse the collections we have produced for each type of store.'}
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SPECIAL_CATEGORIES.map((cat, i) => (
            <AnimatedSection key={cat.slug} delay={i * 0.08}>
              <CategoryLink cat={cat} lang={lang} boxed />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialCategories;
