import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Endless horizontal strip. The children are rendered twice and the track
 * slides by exactly one copy, so the loop never shows a seam.
 */
const Marquee = ({
  children,
  duration = 40,
  reverse = false,
  className,
  trackClassName,
  pauseOnHover = true,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  trackClassName?: string;
  pauseOnHover?: boolean;
}) => (
  <div className={cn('group relative flex overflow-hidden', className)}>
    <div
      className={cn(
        'flex w-max flex-shrink-0',
        reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        pauseOnHover && 'group-hover:[animation-play-state:paused]',
        trackClassName
      )}
      style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
    >
      <div className="flex flex-shrink-0 items-center">{children}</div>
      <div className="flex flex-shrink-0 items-center" aria-hidden>
        {children}
      </div>
    </div>
  </div>
);

export default Marquee;
