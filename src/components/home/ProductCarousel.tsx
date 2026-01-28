import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCarouselProps {
  title: string;
  images: string[];
}

const ProductCarousel = ({ title, images }: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300">
      {/* Carousel Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {/* Images */}
        <div 
          className="flex h-full transition-transform duration-500 ease-out"
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
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
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

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-10 w-10 md:h-12 md:w-12 rounded-full"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-10 w-10 md:h-12 md:w-12 rounded-full"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
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
      <div className="p-5 md:p-6 lg:p-8 bg-card group-hover:bg-brand-pale transition-colors duration-300">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground text-center">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default ProductCarousel;
