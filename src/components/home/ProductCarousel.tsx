import { useState, useEffect, useCallback, useRef, TouchEvent } from 'react';
import { Link } from 'react-router-dom';
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

  // Create extended array with first image cloned at the end
  const extendedImages = [...images, images[0]];

  // Handle transition end - reset to first slide instantly when on clone
  const handleTransitionEnd = useCallback(() => {
    if (currentIndex === images.length) {
      // We're on the cloned slide, instantly reset to real first slide
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  }, [currentIndex, images.length]);

  // Re-enable transitions after instant reset
  useEffect(() => {
    if (!isTransitioning && currentIndex === 0) {
      // Use requestAnimationFrame to ensure the DOM has updated
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  }, [isTransitioning, currentIndex]);

  // Autoplay - advances every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Swipe handlers
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

    if (isLeftSwipe) {
      // Swipe left = next slide
      setCurrentIndex((prev) => prev + 1);
    }
    if (isRightSwipe) {
      // Swipe right = previous slide
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  }, [touchStart, touchEnd, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Calculate which dot should be active (map clone back to first)
  const activeDotIndex = currentIndex >= images.length ? 0 : currentIndex;

  return (
    <Link 
      to={linkTo}
      className="group block bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer"
    >
      {/* Carousel Container */}
      <div 
        className="relative aspect-[4/3] overflow-hidden bg-muted"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Images */}
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
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center group-hover:from-muted-foreground/5 transition-colors duration-300">
                  <div className="text-center text-muted-foreground">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                      <span className="text-2xl md:text-3xl font-bold">{(index % images.length) + 1}</span>
                    </div>
                    <p className="text-sm md:text-base">Image Coming Soon</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
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
                "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300",
                index === activeDotIndex 
                  ? "bg-primary w-6 md:w-8" 
                  : "bg-background/60 hover:bg-background"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="p-5 md:p-6 lg:p-8 bg-card group-hover:bg-secondary transition-colors duration-300">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground text-center">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default ProductCarousel;
