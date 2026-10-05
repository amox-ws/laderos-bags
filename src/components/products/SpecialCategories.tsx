import { Link } from '@/components/LocalizedLink';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Reveal, RevealHeading } from '@/components/ui/Reveal';
import { SPECIAL_CATEGORIES, type CategoryContent } from '@/content/categories';
import { cn } from '@/lib/utils';

type Lang = 'el' | 'en';

const headingFor = (lang: Lang) => (lang === 'el' ? 'Ειδικές κατηγορίες' : 'Special categories');

const cardImageOf = (cat: CategoryContent) => cat.cardImage ?? cat.images[0];

/** The thumbnail + label + one-liner shared by both layouts. */
const CategoryLink = ({ cat, lang, boxed }: { cat: CategoryContent; lang: Lang; boxed: boolean }) => (
  <Link
    to={`/products/${cat.slug}`}
    className={cn(
      'group flex h-full flex-col',
      boxed &&
        'overflow-hidden rounded-media bg-paper/[0.04] p-2 ring-1 ring-inset ring-paper/10 transition-all duration-700 ease-out-expo hover:bg-paper/[0.08] hover:ring-paper/25'
    )}
  >
    <div
      className={cn(
        'relative aspect-square overflow-hidden bg-white',
        boxed ? 'rounded-[calc(var(--radius-media)-0.4rem)]' : 'rounded-media shadow-card transition-shadow duration-700 group-hover:shadow-card-hover'
      )}
    >
      <img
        src={cardImageOf(cat)}
        alt={`${cat.altPrefix[lang]} | Laderos Bags`}
        /* contain: the bag is shown whole, never cropped */
        className="h-full w-full object-contain transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
        loading="lazy"
      />
      <span className="absolute right-3 top-3 flex h-10 w-10 scale-90 items-center justify-center rounded-full bg-ink text-paper opacity-0 transition-all duration-700 ease-out-expo group-hover:scale-100 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4 transition-transform duration-700 ease-out-expo group-hover:rotate-45" strokeWidth={1.5} />
      </span>
    </div>

    <div className={cn('flex flex-1 flex-col', boxed ? 'p-5 pt-6 md:p-6' : 'pt-5')}>
      <h3
        className={cn(
          'mb-2 text-[1.7rem] leading-none tracking-[-0.025em] transition-colors duration-500 md:text-[1.9rem]',
          boxed ? 'text-paper group-hover:text-brand-light' : 'text-ink group-hover:text-brand'
        )}
      >
        {cat.navLabel[lang]}
      </h3>
      <p className={cn('text-sm leading-relaxed', boxed ? 'text-paper/60' : 'text-ink/60')}>{cat.teaser[lang]}</p>
    </div>
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
    <div className={className}>
      <RevealHeading as="h3" text={headingFor(lang)} className="mb-8 text-[clamp(1.9rem,1.4rem+1.6vw,2.8rem)]" />
      <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {SPECIAL_CATEGORIES.map((cat, i) => (
          <Reveal key={cat.slug} delay={(i % 3) * 0.08}>
            <CategoryLink cat={cat} lang={lang} boxed={false} />
          </Reveal>
        ))}
      </div>
    </div>
  );
};

/** Full-width section with boxed cards — used on /products. */
const SpecialCategories = ({ className = '' }: { className?: string }) => {
  const { language } = useLanguage();
  const lang: Lang = language === 'en' ? 'en' : 'el';

  return (
    <section className={`panel ink-section section-padding overflow-hidden ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(45% 50% at 85% 0%, hsl(213 66% 45% / 0.25), transparent 70%)' }}
      />
      <div className="container-page relative">
        <div className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-12 lg:items-end">
          <RevealHeading text={headingFor(lang)} className="mb-0 text-paper lg:col-span-6" />
          <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
            <p className="text-base leading-relaxed text-paper/65 md:text-lg">
              {lang === 'el'
                ? 'Κάθε κλάδος έχει τις δικές του απαιτήσεις σε μέγεθος, αντοχή και εμφάνιση. Δείτε τις συλλογές που έχουμε κατασκευάσει ανά κατηγορία καταστήματος.'
                : 'Every sector has its own demands in size, strength and appearance. Browse the collections we have produced for each type of store.'}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {SPECIAL_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.slug} delay={(i % 3) * 0.08} y={50}>
              <CategoryLink cat={cat} lang={lang} boxed />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialCategories;
