import { useEffect, useRef, useState, type VideoHTMLAttributes } from 'react';

/**
 * Autoplaying background video that only starts downloading when it is about
 * to scroll into view. Until then the poster (the video's first frame) is
 * shown, so it looks the same — the page just loads a few MB lighter.
 */
const LazyVideo = ({
  src,
  rootMargin = '300px',
  ...rest
}: VideoHTMLAttributes<HTMLVideoElement> & { src: string; rootMargin?: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <video
      ref={ref}
      src={near ? src : undefined}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      {...rest}
    />
  );
};

export default LazyVideo;
