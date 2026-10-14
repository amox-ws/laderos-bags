import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from '@/components/LocalizedLink';
import Marquee from '@/components/ui/Marquee';
import { SlidingArrow } from '@/components/ui/ArrowButton';
import { Reveal, RevealHeading } from '@/components/ui/Reveal';

/** "← Back to products" pill used at the top of every product page. */
export const BackLink = ({ to = '/products', children }: { to?: string; children: ReactNode }) => (
  <Link
    to={to}
    className="group inline-flex h-10 items-center gap-2.5 rounded-full pl-1.5 pr-4 text-sm text-ink/70 shadow-[inset_0_0_0_1px_hsl(var(--ink)/0.12)] transition-all duration-500 ease-out-expo hover:text-ink hover:shadow-[inset_0_0_0_1px_hsl(var(--ink)/0.4)]"
  >
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper">
      <SlidingArrow back className="scale-90" />
    </span>
    {children}
  </Link>
);

/**
 * Typographic page opener for the product pages: back link, the title set
 * large, the subtitle in a side column, and a slow film-strip of our bags.
 */
export const ProductHero = ({
  backLabel,
  title,
  subtitle,
  strip,
  nav,
}: {
  backLabel: string;
  title: string;
  subtitle: string;
  strip: string[];
  /** Optional row under the title, e.g. quick links to the page's categories. */
  nav?: ReactNode;
}) => {
  const reduced = useReducedMotion();
  return (
    <section className="main-section overflow-hidden pt-10 md:pt-16">
      <div className="container-page">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <BackLink>{backLabel}</BackLink>
        </motion.div>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:items-end">
          <RevealHeading
            as="h1"
            text={title}
            className="mb-0 text-[clamp(2.8rem,1.3rem+5.2vw,7.5rem)] leading-[0.95] tracking-[-0.04em] lg:col-span-8"
          />
          <Reveal delay={0.25} className="lg:col-span-4 lg:pb-4">
            <span className="mb-5 block h-px w-12 bg-brand" />
            <p className="text-lg leading-relaxed text-ink/70 md:text-xl">{subtitle}</p>
          </Reveal>
        </div>

        {nav && (
          <Reveal delay={0.3} className="mt-10 md:mt-12">
            {nav}
          </Reveal>
        )}
      </div>

      {/* Film-strip of finished bags */}
      <Reveal delay={0.35} className="mt-16 md:mt-24" y={60}>
        <div aria-hidden>
          <Marquee duration={70} pauseOnHover={false}>
            {strip.map((src) => (
              <div key={src} className="mx-2 h-48 w-40 flex-shrink-0 overflow-hidden rounded-media bg-paper-deep md:mx-2.5 md:h-72 md:w-60">
                <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" draggable={false} />
              </div>
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
};

/** Sticky intro column: heading, two paragraphs, feature list, CTA. */
export const ProductIntro = ({
  title,
  paragraphs,
  featuresTitle,
  features,
  cta,
  onCta,
}: {
  title: string;
  paragraphs: string[];
  featuresTitle: string;
  features: string[];
  cta: string;
  onCta: () => void;
}) => (
  <div>
    <RevealHeading text={title} className="mb-8 text-[clamp(2.2rem,1.4rem+2.6vw,3.75rem)]" />
    <Reveal delay={0.1}>
      <div className="space-y-4 text-ink/70">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-base leading-relaxed md:text-[17px]">
            {p}
          </p>
        ))}
      </div>
    </Reveal>

    {/* Features */}
    <Reveal delay={0.18} className="mt-12">
      <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">{featuresTitle}</h3>
      <ul className="border-t border-ink/10">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-4 border-b border-ink/10 py-3.5">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
            <span className="text-[15px] text-ink/80">{feature}</span>
          </li>
        ))}
      </ul>
    </Reveal>

    <Reveal delay={0.24} className="mt-10">
      <button
        type="button"
        onClick={onCta}
        className="group inline-flex h-12 items-center gap-3.5 rounded-full bg-ink pl-6 pr-1.5 text-[15px] text-paper transition-colors duration-500 ease-out-expo hover:bg-brand active:scale-[0.97]"
      >
        {cta}
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink">
          <SlidingArrow />
        </span>
      </button>
    </Reveal>
  </div>
);

/** "Applications" block: centred heading, text, industries as chips. */
export const Applications = ({ title, text, industries }: { title: string; text: string; industries: string[] }) => (
  <section className="section-padding main-section">
    <div className="container-page">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <RevealHeading text={title} className="mb-6" />
        <Reveal delay={0.1}>
          <div className="section-divider mb-8" />
          <p className="mx-auto mb-12 max-w-2xl text-lg text-ink/70">{text}</p>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-2.5">
          {industries.map((industry, index) => (
            <Reveal key={index} delay={0.15 + index * 0.04} y={16} as="span">
              <span className="inline-flex h-11 items-center rounded-full bg-white px-5 text-[15px] text-ink/80 shadow-[inset_0_0_0_1px_hsl(var(--ink)/0.08)] transition-all duration-500 ease-out-expo hover:bg-ink hover:text-paper">
                {industry}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/** Quote form stage — an ink panel the form sits in. */
export const QuoteStage = ({ children }: { children: ReactNode }) => (
  <section id="quote-section" className="scroll-mt-20 pb-[var(--panel-gutter)]">
    <div className="panel ink-section section-padding">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(50% 50% at 0% 0%, hsl(213 66% 45% / 0.22), transparent 70%)' }}
      />
      <div className="container-page relative">
        <Reveal>{children}</Reveal>
      </div>
    </div>
  </section>
);
