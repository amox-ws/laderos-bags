import { useState, useEffect, useCallback, TouchEvent } from 'react';
import { Link } from '@/components/LocalizedLink';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { brandFromSrc } from '@/lib/text';

interface ProductCarouselProps {
  title: string;
  images: string[];
  linkTo: string;
}

const INTERVAL_MS = 3600;
const MIN_SWIPE = 50;

/**
 * Card with a looping carousel and a label underneath.
 *
 * The slides cross-fade rather than slide: a sliding track has to jump back to
 * the start after the last frame, and that reset is what used to stutter.
 * Fading has no reset at all, so the loop stays smooth.
 */
const ProductCarousel = ({ title, images, linkTo }: ProductCarouselProps) => {
  const count = images.length;
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    if (count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [count, index]);

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = useCallback(() => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > MIN_SWIPE) setIndex((i) => (i + 1) % count);
    if (distance < -MIN_SWIPE) setIndex((i) => (i - 1 + count) % count);
  }, [touchStart, touchEnd, count]);

  return (
    <Link to={linkTo} className="group block cursor-pointer">
      <div
        /* A thin brand-blue frame appears on hover — same blue as the label below. */
        className="relative aspect-[4/3] overflow-hidden bg-muted rounded-[var(--radius)] ring-2 ring-transparent transition-shadow duration-300 group-hover:ring-[hsl(var(--brand-blue-light))] group-focus-visible:ring-[hsl(var(--brand-blue-light))]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((image, i) => (
          <img
            key={image}
            src={image}
            alt={i === index ? `${title} — ${brandFromSrc(image)} | Laderos Bags` : ''}
            aria-hidden={i !== index}
            /* cover: the photo fills the card with no letterboxing */
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out',
              i === index ? 'opacity-100' : 'opacity-0'
            )}
            loading={i === 0 ? 'eager' : 'lazy'}
            draggable={false}
          />
        ))}

        {/* Dots */}
        {count > 1 && (
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((image, i) => (
              <button
                key={image}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIndex(i);
                }}
                aria-label={`${title} — ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === index ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Label underneath */}
      <div className="media-label group-hover:gap-3.5 transition-all duration-300">
        {title}
        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default ProductCarousel;
