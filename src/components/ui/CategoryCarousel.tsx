import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { brandFromSrc } from '@/lib/text';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryCarouselProps {
  images: string[];
  /** Alt-text prefix, e.g. "Χάρτινη σακούλα για ανδρικό κατάστημα". */
  altPrefix: string;
  className?: string;
  /** Stage shape. Square beside a column of copy, wider when it stands alone. */
  stageClass?: string;
  /** Card height as a share of the stage; the card stays square. */
  cardHeight?: string;
  /** Multiplier on how far the neighbours sit out — raise it on a wide stage. */
  spread?: number;
  /** Hide the progress dots (e.g. when the carousel is the whole section). */
  showDots?: boolean;
  /** Show a bar below with prev/next buttons the viewer can drive. */
  showControls?: boolean;
  /** 'contain' shows the whole photo; 'cover' fills the card edge to edge. */
  fit?: 'contain' | 'cover';
  /** Where a covered photo is anchored, e.g. 'center 75%' to favour the base. */
  objectPosition?: string;
}

/** How far each neighbouring card sits from the centre, and how it is dimmed. */
const LAYER = [
  { x: 0, scale: 1, opacity: 1, z: 30 },
  { x: 48, scale: 0.8, opacity: 0.8, z: 20 },
  { x: 82, scale: 0.62, opacity: 0.45, z: 10 },
];
/** Cards further out than this are parked off-stage, invisible. */
const VISIBLE = LAYER.length - 1;
/** Load a little wider than we show, so a card is ready before it slides in. */
const PRELOAD = VISIBLE + 1;
const INTERVAL_MS = 2300;

/**
 * Coverflow-style carousel: the active bag sits centre stage with the next and
 * previous ones peeking out behind it on either side. It keeps turning on
 * its own; the control bar lets the viewer jump around without stopping it.
 */
const CategoryCarousel = ({
  images,
  altPrefix,
  className = '',
  stageClass = 'aspect-square',
  cardHeight = 'h-[74%]',
  spread = 1,
  showDots = true,
  showControls = false,
  fit = 'contain',
  objectPosition,
}: CategoryCarouselProps) => {
  const { language } = useLanguage();
  const el = language !== 'en';
  const ariaPrev = el ? 'Προηγούμενη φωτογραφία' : 'Previous photo';
  const ariaNext = el ? 'Επόμενη φωτογραφία' : 'Next photo';
  const ariaGoTo = el ? 'Μετάβαση στη φωτογραφία' : 'Go to photo';

  const count = images.length;
  const [active, setActive] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (reducedMotion.current || count < 2) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [count, active]);

  /** Step the carousel; wraps in both directions. */
  const go = useCallback(
    (step: number) => setActive((i) => (i + step + count) % count),
    [count]
  );

  if (count === 0) return null;

  /** Signed distance from the active card, wrapped so the ring is seamless. */
  const offsetOf = (i: number) => {
    const raw = (i - active + count) % count;
    return raw > count / 2 ? raw - count : raw;
  };

  return (
    <div className={className}>
      <div
        /* the stage clips the neighbours, so they never reach the copy beside it */
        className={`relative w-full overflow-hidden select-none ${stageClass}`}
        role="group"
        aria-roledescription="carousel"
        aria-label={altPrefix}
      >
        {images.map((src, i) => {
          const offset = offsetOf(i);
          const depth = Math.min(Math.abs(offset), VISIBLE);
          const layer = LAYER[depth];
          const beyond = Math.abs(offset) > VISIBLE;
          const dir = Math.sign(offset);

          return (
            <div
              key={src}
              aria-hidden={offset !== 0}
              className={`absolute inset-0 m-auto aspect-square ${cardHeight} overflow-hidden rounded-media bg-paper-deep transition-[transform,opacity,box-shadow] duration-[1.1s] ease-out-expo ${offset === 0 ? 'shadow-[0_40px_80px_-35px_hsl(var(--ink)/0.55)]' : 'shadow-[0_20px_40px_-25px_hsl(var(--ink)/0.4)]'}`}
              style={{
                transform: `translateX(${dir * layer.x * spread}%) scale(${layer.scale})`,
                opacity: beyond ? 0 : layer.opacity,
                zIndex: beyond ? 0 : layer.z,
                pointerEvents: 'none',
              }}
            >
              {Math.abs(offset) <= PRELOAD && (
                <img
                  src={src}
                  alt={offset === 0 ? `${altPrefix} — ${brandFromSrc(src)} | Laderos Bags` : ''}
                  className={`w-full h-full ${fit === 'cover' ? 'object-cover' : 'object-contain'}`}
                  style={objectPosition ? { objectPosition } : undefined}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress dots — capped so a 38-photo set does not turn into a ruler */}
      {showDots && count > 1 && (
        <div className="mt-5 flex justify-center gap-1.5">
          {images.slice(0, Math.min(count, 12)).map((src, i) => {
            const isActive = count <= 12 ? i === active : i === active % 12;
            return (
              <span
                key={src}
                className={`h-[3px] rounded-full transition-all duration-700 ease-out-expo ${
                  isActive ? 'w-7 bg-ink' : 'w-2 bg-ink/15'
                }`}
              />
            );
          })}
        </div>
      )}

      {/* Control bar — counter, jump-to segments, arrows */}
      {showControls && count > 1 && (
        <div className="container-page mt-10 flex items-center gap-5 md:gap-8">
          <div className="flex flex-1 items-center gap-1.5">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${ariaGoTo} ${i + 1}`}
                aria-current={i === active}
                className="group relative h-6 flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <span
                  className={`absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full transition-colors duration-500 ${
                    i === active ? 'bg-ink' : 'bg-ink/15 group-hover:bg-ink/40'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={ariaPrev}
              className="group flex h-12 w-12 items-center justify-center rounded-full text-ink shadow-[inset_0_0_0_1px_hsl(var(--ink)/0.18)] transition-all duration-500 ease-out-expo hover:bg-ink hover:text-paper active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <ArrowLeft className="h-[18px] w-[18px] transition-transform duration-500 ease-out-expo group-hover:-translate-x-0.5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={ariaNext}
              className="group flex h-12 w-12 items-center justify-center rounded-full text-ink shadow-[inset_0_0_0_1px_hsl(var(--ink)/0.18)] transition-all duration-500 ease-out-expo hover:bg-ink hover:text-paper active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <ArrowRight className="h-[18px] w-[18px] transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCarousel;
