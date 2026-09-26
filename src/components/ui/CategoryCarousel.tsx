import { useEffect, useRef, useState } from 'react';
import { brandFromSrc } from '@/lib/text';

interface CategoryCarouselProps {
  images: string[];
  /** Alt-text prefix, e.g. "Χάρτινη σακούλα για ανδρικό κατάστημα". */
  altPrefix: string;
  className?: string;
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
const INTERVAL_MS = 3200;

/**
 * Coverflow-style carousel: the active bag sits centre stage with the next and
 * previous ones peeking out behind it on either side. Advances on its own.
 */
const CategoryCarousel = ({ images, altPrefix, className = '' }: CategoryCarouselProps) => {
  const count = images.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (paused || reducedMotion.current || count < 2) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

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
        className="relative w-full aspect-square overflow-hidden select-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
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
              className="absolute inset-0 m-auto h-[74%] w-[74%] rounded-2xl overflow-hidden bg-muted shadow-card transition-all duration-700 ease-out"
              style={{
                transform: `translateX(${dir * layer.x}%) scale(${layer.scale})`,
                opacity: beyond ? 0 : layer.opacity,
                zIndex: beyond ? 0 : layer.z,
                pointerEvents: 'none',
              }}
            >
              {Math.abs(offset) <= PRELOAD && (
                <img
                  src={src}
                  alt={offset === 0 ? `${altPrefix} — ${brandFromSrc(src)} | Laderos Bags` : ''}
                  /* contain: the bag is shown whole, never cropped */
                  className="w-full h-full object-contain"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress dots — capped so a 38-photo set does not turn into a ruler */}
      {count > 1 && (
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
    </div>
  );
};

export default CategoryCarousel;
