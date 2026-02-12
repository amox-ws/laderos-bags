import { useState, useEffect, useCallback, useRef, TouchEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCarouselProps {
  title: string;
  images: string[];
  linkTo: string;
}

const ProductCarousel = ({ title, images, linkTo }: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const extendedImages = [...images, images[0]];

  const handleTransitionEnd = useCallback(() => {
    if (currentIndex === images.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  }, [currentIndex, images.length]);

  useEffect(() => {
    if (!isTransitioning && currentIndex === 0) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  }, [isTransitioning, currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) setCurrentIndex((prev) => prev + 1);
    if (isRightSwipe) setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [touchStart, touchEnd, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const activeDotIndex = currentIndex >= images.length ? 0 : currentIndex;

  return (
    <Link 
      to={linkTo}
      className="group block bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer"
    >
      {/* Carousel Container */}
      <div 
        className="relative aspect-[4/3] overflow-hidden bg-muted"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          ref={sliderRef}
          className={cn(
            "flex h-full",
            isTransitioning && "transition-transform duration-700 ease-out"
          )}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedImages.map((image, index) => (
            <div 
              key={index} 
              className="min-w-full h-full flex items-center justify-center"
            >
              {image ? (
                <img
                  src={image}
                  alt={`${title} ${(index % images.length) + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                      <span className="text-2xl md:text-3xl font-bold">{(index % images.length) + 1}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(index);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === activeDotIndex 
                  ? "bg-white w-8" 
                  : "bg-white/40 w-1.5 hover:bg-white/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Title Bar */}
      <div className="px-6 py-5 md:px-8 md:py-6 bg-card group-hover:bg-secondary transition-colors duration-500 flex items-center justify-between">
        <h3 className="text-lg md:text-xl lg:text-2xl text-foreground group-hover:text-primary-foreground transition-colors duration-500">
          {title}
        </h3>
        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground transition-all duration-500 group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default ProductCarousel;