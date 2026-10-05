import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLenis } from '@/lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

/**
 * Inertia scrolling for mouse and trackpad. Touch devices and visitors who
 * ask for reduced motion keep the browser's own scrolling. Lenis drives the
 * real window scroll, so GSAP pins, framer-motion and anchors keep working;
 * it is ticked from GSAP's clock so the bag film and the scroll never drift.
 */
const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
