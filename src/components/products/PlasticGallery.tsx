import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Reveal } from '@/components/ui/Reveal';
import { scrollToId } from '@/lib/scrollToTarget';

type Lang = 'el' | 'en';

interface PlasticPhoto {
  src: string;
  /** Brand on the bag, for the alt text. */
  brand?: string;
}

interface PlasticGroup {
  /** Anchor the category navigation jumps to. */
  id: string;
  label: { el: string; en: string };
  photos: PlasticPhoto[];
}

const STUDIO = '/laderosfoto14-10_studio_smooth_webp/';

/**
 * Every plastic-bag photo, grouped by bag type. The studio shots lead each
 * group; the older styled photos follow. Navy & Green opens the page.
 */
const PLASTIC_GROUPS: PlasticGroup[] = [
  {
    id: 'plastiki-xeirolavi',
    label: { el: 'Πλαστική χειρολαβή', en: 'Loop handle' },
    photos: [
      { src: STUDIO + 'navygreen-plastiki-xirolavi.webp', brand: 'Navy & Green' },
      { src: STUDIO + 'alphabank-plastiki-xirolavi.webp', brand: 'Alpha Bank' },
      { src: STUDIO + 'crocodilino-plastiki-xirolavi.webp', brand: 'Crocodilino' },
      { src: STUDIO + 'justsport-plastiki-xirolavi.webp', brand: 'Just Sport' },
      { src: STUDIO + 'loveshoes-plastiki-xirolavi.webp', brand: 'Love Shoes' },
      { src: STUDIO + 'ragazzi-plastiki-xirolavi.webp', brand: 'Ragazzi' },
      { src: STUDIO + 'sportsart-plastiki-xirolavi.webp', brand: 'Sports Art' },
      { src: STUDIO + 'tsekouras-plastiki-xirolavi.webp', brand: 'Tsekouras' },
      { src: STUDIO + 'ygeia-plastiki-xirolavi.webp', brand: 'Ygeia' },
      { src: '/plastic_product/casba.webp', brand: 'Casba' },
      { src: '/plastic_product/sport_jean.webp', brand: 'Sport Jeans' },
    ],
  },
  {
    id: 'xoufta',
    label: { el: 'Χούφτα', en: 'Die-cut handle' },
    photos: [
      { src: STUDIO + 'abito-xoufta.webp', brand: 'Abito' },
      { src: STUDIO + 'anemos-xoufta.webp', brand: 'Anemos' },
      { src: STUDIO + 'apparel-xoufta.webp', brand: 'Apparel' },
      { src: STUDIO + 'doretta-xoufta.webp', brand: 'Doretta' },
      { src: STUDIO + 'markaalen-xoufta.webp', brand: 'Mark Aalen' },
      { src: STUDIO + 'nojeans-xoufta.webp', brand: 'No Jeans' },
      { src: STUDIO + 'sibasports-xoufta.webp', brand: 'Siba Sports' },
      { src: STUDIO + 'sprider-xoufta.webp', brand: 'Sprider' },
      { src: STUDIO + 'underarmour-xoufta.webp', brand: 'Under Armour' },
      { src: STUDIO + 'westernunion-xoufta.webp', brand: 'Western Union' },
      { src: '/plastic_product/sporthero.webp', brand: 'Sport Hero' },
      { src: '/plastic_product/butchery.webp' },
      { src: '/plastic_product/proton.webp', brand: 'Proton' },
    ],
  },
  {
    id: 'fakeloi',
    label: { el: 'Φάκελοι', en: 'Mailer bags' },
    photos: [
      { src: STUDIO + 'navygreen-fakelos.webp', brand: 'Navy & Green' },
      { src: STUDIO + '3guys-fakelos.webp', brand: '3Guys' },
      { src: STUDIO + 'dur-fakelos.webp', brand: 'Dur' },
      { src: STUDIO + 'loveshoes-fakelos.webp', brand: 'Love Shoes' },
      { src: STUDIO + 'migato-fakelos.webp', brand: 'Migato' },
      { src: '/plastic_product/navy_green.webp', brand: 'Navy & Green' },
    ],
  },
];

/** Small pill navigation that glides down to each bag type. */
export const PlasticCategoryNav = ({ className = '' }: { className?: string }) => {
  const { language } = useLanguage();
  const lang: Lang = language === 'en' ? 'en' : 'el';

  return (
    <nav aria-label={lang === 'el' ? 'Κατηγορίες πλαστικών σακουλών' : 'Plastic bag categories'} className={className}>
      <ul className="flex flex-wrap gap-2">
        {PLASTIC_GROUPS.map((group) => (
          <li key={group.id}>
            <a
              href={`#${group.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(group.id);
              }}
              className="group inline-flex h-11 items-center gap-3 rounded-full bg-white pl-5 pr-1.5 text-[15px] text-ink shadow-[inset_0_0_0_1px_hsl(var(--ink)/0.08)] transition-colors duration-500 ease-out-expo hover:bg-ink hover:text-paper active:scale-[0.97]"
            >
              {group.label[lang]}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5">
                <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.75} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

/** All plastic-bag photos, one grid per bag type, read left to right. */
const PlasticGallery = () => {
  const { language } = useLanguage();
  const lang: Lang = language === 'en' ? 'en' : 'el';
  const kind = lang === 'el' ? 'Πλαστική σακούλα με εκτύπωση' : 'Custom printed plastic bag';

  return (
    <div className="space-y-20 md:space-y-24">
      {PLASTIC_GROUPS.map((group) => (
        <section key={group.id} aria-label={group.label[lang]} className="relative">
          {/* Jump target sits a little above the heading so it clears the header with room to spare */}
          <span id={group.id} className="absolute -top-8" aria-hidden />
          <Reveal className="mb-6 flex items-center gap-5 md:mb-8">
            <h3 className="text-[clamp(1.6rem,1.3rem+1vw,2.25rem)] tracking-[-0.025em]">{group.label[lang]}</h3>
            <span className="h-px flex-1 bg-ink/10" />
          </Reveal>

          <div className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-3">
            {group.photos.map((photo, i) => (
              <Reveal key={photo.src} delay={(i % 3) * 0.06} y={40}>
                <figure className="group relative aspect-[4/5] overflow-hidden rounded-media bg-[#c8c9ce] shadow-card transition-shadow duration-700 ease-out-expo hover:shadow-card-hover">
                  <img
                    src={photo.src}
                    alt={`${kind} — ${group.label[lang]}${photo.brand ? ` — ${photo.brand}` : ''} | Laderos Bags`}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default PlasticGallery;
