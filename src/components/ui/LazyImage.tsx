import { useState, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Extra classes for the wrapper div */
  wrapperClassName?: string;
}

const LazyImage = ({ wrapperClassName, className, src, alt, ...props }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn('relative', wrapperClassName)}>
      {!loaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          'transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
