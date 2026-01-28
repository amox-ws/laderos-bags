import { useState, useEffect, useCallback, TouchEvent } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ProductCarouselProps {
  title: string;
  images: string[];
  linkTo: string;
}

const ProductCarousel = ({ title, images, linkTo }: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Autoplay - advances every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

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
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  }, [touchStart, touchEnd, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

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
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div 
              key={index} 
              className="min-w-full h-full flex items-center justify-center"
            >
              {image ? (
                <img
                  src={image}
                  alt={`${title} ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center group-hover:from-muted-foreground/5 transition-colors duration-300">
                  <div className="text-center text-muted-foreground">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                      <span className="text-2xl md:text-3xl font-bold">{index + 1}</span>
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
                index === currentIndex 
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
