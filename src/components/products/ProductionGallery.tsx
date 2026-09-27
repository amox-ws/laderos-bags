import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductionGalleryProps {
  images: string[];
}

/** How far each column drifts as the section passes through the viewport. */
const DRIFT = [70, -55, 40];

/**
 * Production samples laid out in three columns that drift at slightly
 * different speeds while you scroll. The photos keep their own proportions —
 * portrait and landscape shots alternate — so nothing is cropped.
 */
const ProductionGallery = ({ images }: ProductionGalleryProps) => {
  const { language } = useLanguage();
  const el = language !== 'en';
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  // Drifting columns need room to breathe; on a phone they just sit still.
  const still = reduced || isMobile;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Driven straight off the scroll position: no settling animation to stall,
  // so the columns track the scroll exactly.
  const progress = scrollYProgress;

  // Deal the photos out column by column so portraits and landscapes mix.
  const columns: string[][] = [[], [], []];
  images.forEach((src, i) => columns[i % 3].push(src));

  const drifts = [
    useTransform(progress, [0, 1], [DRIFT[0], -DRIFT[0]]),
    useTransform(progress, [0, 1], [DRIFT[1], -DRIFT[1]]),
    useTransform(progress, [0, 1], [DRIFT[2], -DRIFT[2]]),
  ];

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {columns.map((column, colIndex) => (
        <motion.div
          key={colIndex}
          className="flex flex-col gap-3 md:gap-4"
          style={still ? undefined : { y: drifts[colIndex] }}
        >
          {column.map((src, i) => (
            <motion.figure
              key={src}
              className="group relative overflow-hidden rounded-[var(--radius)] bg-muted ring-2 ring-transparent transition-shadow duration-300 hover:ring-[hsl(var(--brand-blue-light))]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 + colIndex * 0.06 }}
            >
              <img
                src={src}
                alt={`${el ? 'Δείγμα παραγωγής' : 'Production sample'} — Laderos Bags`}
                /* h-auto keeps the photo's own proportions, so nothing is cropped */
                className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
            </motion.figure>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default ProductionGallery;
