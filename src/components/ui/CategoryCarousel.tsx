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
  { x: 48, scale: 0.8, opacity: 0.62, z: 20 },
  { x: 82, scale: 0.62, opacity: 0.3, z: 10 },
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
              className={`absolute inset-0 m-auto aspect-square ${cardHeight} rounded-2xl overflow-hidden bg-muted shadow-card transition-all duration-700 ease-out`}
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
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  isActive ? 'w-5 bg-primary' : 'w-1.5 bg-foreground/20'
                }`}
              />
            );
          })}
        </div>
      )}

      {/* Control bar — arrows plus jump-to dots */}
      {showControls && count > 1 && (
        <div className="mt-8 flex items-center justify-center gap-5 md:gap-7">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={ariaPrev}
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-foreground/20 text-foreground transition-all duration-300 hover:border-foreground hover:-translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-1.5">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${ariaGoTo} ${i + 1}`}
                aria-current={i === active}
                className={`h-1.5 rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  i === active ? 'w-7 bg-primary' : 'w-1.5 bg-foreground/25 hover:bg-foreground/50'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label={ariaNext}
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-foreground/20 text-foreground transition-all duration-300 hover:border-foreground hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryCarousel;
