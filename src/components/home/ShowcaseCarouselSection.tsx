import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CategoryCarousel from '@/components/ui/CategoryCarousel';

/**
 * Bags we have produced, shown large and on their own — the carousel is the
 * whole section. Every photo is real work for a named client.
 */
const SHOWCASE_BAGS = [
  '/paper_product/loipa/sakoula-asteras-tripolis.webp',
  '/product_bags/navycarusel.webp',
  '/paper_product/andrika/sakoula-lacoste.webp',
  '/paper_product/sagiakos.webp',
  '/paper_product/andrika/sakoula-dressman.webp',
  '/paper_product/bsb.webp',
  '/paper_product/woman/sakoula-annas-secret.webp',
  '/paper_product/loipa/sakoula-georgios-galifianakis.webp',
  '/paper_product/mts.webp',
  '/product_bags/redcarusel.webp',
  '/paper_product/andrika/sakoula-kingsman.webp',
  '/paper_product/andrika/sakoula-beneto-maretti-2.webp',
];

const ShowcaseCarouselSection = () => {
  const { language } = useLanguage();
  const el = language !== 'en';

  return (
    <section className="overflow-hidden py-20 md:py-32">
      {/* Full-bleed stage: the neighbours run out towards both edges */}
      <AnimatedSection>
        <CategoryCarousel
          images={SHOWCASE_BAGS}
          altPrefix={el ? 'Χάρτινη σακούλα με εκτύπωση λογοτύπου' : 'Custom printed paper bag'}
          stageClass="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9]"
          cardHeight="h-[88%]"
          spread={1.45}
          showDots={false}
          showControls
          fit="cover"
          /* The four portrait shots stand on a surface, so the crop is nudged
             down to keep the base of every bag in frame. */
          objectPosition="center 75%"
        />
      </AnimatedSection>
    </section>
  );
};

export default ShowcaseCarouselSection;
