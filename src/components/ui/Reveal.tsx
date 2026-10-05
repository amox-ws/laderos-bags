import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Fragment, useRef, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * A heading whose words rise out of a mask, one after another — the way a
 * line of type is pulled from a press. The text stays a single heading for
 * screen readers and crawlers; only the visual entrance is split.
 * A lone "&" is set in the italic serif accent.
 */
export const RevealHeading = ({
  as: Tag = 'h2',
  text,
  className,
  delay = 0,
  stagger = 0.045,
  style,
}: {
  as?: ElementType;
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
}) => {
  const reduced = useReducedMotion();
  // One observer on the heading itself: a word sitting below its mask is
  // clipped out of view, so it could never report itself as visible.
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });
  const words = text.split(' ').filter(Boolean);

  return (
    <Tag ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.14em] pt-[0.1em] -mb-[0.14em] -mt-[0.1em] align-bottom">
            <motion.span
              className={cn('inline-block will-change-transform', word === '&' && 'amp')}
              initial={reduced ? false : { y: '115%', rotate: 2 }}
              animate={inView ? { y: '0%', rotate: 0 } : undefined}
              transition={{ duration: 1.05, ease: EASE_OUT_EXPO, delay: delay + i * stagger }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  );
};

/** Fade-and-rise for any block. */
export const Reveal = ({
  children,
  className,
  delay = 0,
  y = 36,
  as = 'div',
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'li' | 'section' | 'span' | 'p' | 'figure';
  once?: boolean;
}) => {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </Comp>
  );
};

/**
 * Image/video frame that is uncovered by a wipe from the bottom edge while
 * its content settles from a slight zoom — used for the big media blocks.
 */
export const RevealMedia = ({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn('media-frame', className)}
      initial={reduced ? false : { clipPath: 'inset(18% 6% 0% 6% round 2rem)' }}
      // Drop the clip once uncovered — a lingering clip-path stops some
      // browsers from painting video frames inside it.
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0rem)', transitionEnd: { clipPath: 'none' } }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduced ? false : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

/** Wraps every "&" of a plain string in the italic accent. */
export const withAmp = (text: string): ReactNode => {
  if (!text.includes('&')) return text;
  const parts = text.split('&');
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <span className="amp">&amp;</span>}
    </Fragment>
  ));
};
