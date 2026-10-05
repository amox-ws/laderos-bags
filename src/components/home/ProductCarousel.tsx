import { useState, useEffect, useCallback, TouchEvent } from 'react';
import { Link } from '@/components/LocalizedLink';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { brandFromSrc } from '@/lib/text';

interface ProductCarouselProps {
  title: string;
  images: string[];
  linkTo: string;
  /** Height/aspect classes for the photo frame. */
  frameClass?: string;
}

const INTERVAL_MS = 3600;
const MIN_SWIPE = 50;

/**
 * Category card: a looping photo stack with story-style progress segments,
 * the category name set in the serif below.
 *
 * The slides cross-fade rather than slide: a sliding track has to jump back to
 * the start after the last frame, and that reset is what used to stutter.
 * Fading has no reset at all, so the loop stays smooth.
 */
const ProductCarousel = ({ title, images, linkTo, frameClass = 'aspect-[4/3]' }: ProductCarouselProps) => {
  const count = images.length;
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    if (count < 2) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [count, active]);

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = useCallback(() => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > MIN_SWIPE) setActive((i) => (i + 1) % count);
    if (distance < -MIN_SWIPE) setActive((i) => (i - 1 + count) % count);
  }, [touchStart, touchEnd, count]);

  return (
    <Link to={linkTo} className="group block cursor-pointer focus-visible:outline-none">
      <div
        className={cn(
          'media-frame shadow-card transition-shadow duration-700 ease-out-expo group-hover:shadow-card-hover group-focus-visible:ring-2 group-focus-visible:ring-brand',
          frameClass
        )}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="absolute inset-0 transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.045]">
          {images.map((image, i) => (
            <img
              key={image}
              src={image}
              alt={i === active ? `${title} — ${brandFromSrc(image)} | Laderos Bags` : ''}
              aria-hidden={i !== active}
              /* cover: the photo fills the card with no letterboxing */
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1.2s] ease-out',
                i === active ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0'
              )}
              loading={i === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          ))}
        </div>

        {/* Legibility veil for the chrome */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/0 to-ink/0 opacity-80 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Arrow */}
        <span className="absolute right-4 top-4 z-10 flex h-11 w-11 scale-90 items-center justify-center rounded-full bg-paper text-ink opacity-0 shadow-lg transition-all duration-700 ease-out-expo group-hover:scale-100 group-hover:opacity-100 md:right-5 md:top-5">
          <ArrowUpRight className="h-[18px] w-[18px] transition-transform duration-700 ease-out-expo group-hover:rotate-45" strokeWidth={1.5} />
        </span>

        {/* Story-style progress segments */}
        {count > 1 && (
          <div className="absolute inset-x-4 bottom-4 z-10 flex gap-1.5 md:inset-x-5 md:bottom-5">
            {images.map((image, i) => (
              <button
                key={image}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActive(i);
                }}
                aria-label={`${title} — ${i + 1}`}
                aria-current={i === active}
                className="relative h-6 flex-1 cursor-pointer"
              >
                <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/30">
                  <span
                    key={i === active ? `on-${active}` : 'off'}
                    className="absolute inset-0 origin-left rounded-full bg-white"
                    style={
                      i === active
                        ? { animation: `story-fill ${INTERVAL_MS}ms linear forwards` }
                        : { transform: `scaleX(${i < active ? 1 : 0})` }
                    }
                  />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Label underneath */}
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-[clamp(1.6rem,1.25rem+1.1vw,2.35rem)] leading-none tracking-[-0.025em] transition-colors duration-500 group-hover:text-brand">
          {title}
        </h3>
        <span className="h-px flex-1 origin-left scale-x-50 bg-ink/15 transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
      </div>
    </Link>
  );
};

export default ProductCarousel;
