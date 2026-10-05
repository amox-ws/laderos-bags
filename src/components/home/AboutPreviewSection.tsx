import LazyVideo from '@/components/ui/LazyVideo';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import ArrowButton from '@/components/ui/ArrowButton';
import { Reveal, RevealHeading, RevealMedia } from '@/components/ui/Reveal';

const AboutPreviewSection = () => {
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // The smaller film drifts against the larger one as the section passes.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], [70, -70]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          try {
            videoEl.muted = true;
            await videoEl.play();
          } catch (err) {
            console.log('Autoplay blocked:', err);
          }
        } else {
          videoEl.pause();
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
      },
      { threshold: 0.5 }
    );

    const handleVideoEnd = () => {
      timeoutRef.current = setTimeout(() => {
        videoEl.currentTime = 0;
        videoEl.play().catch(() => {});
      }, 2000);
    };

    videoEl.addEventListener('ended', handleVideoEnd);
    observer.observe(videoEl);

    return () => {
      videoEl.removeEventListener('ended', handleVideoEnd);
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="panel ink-section overflow-hidden py-24 md:py-36 lg:py-44">
      {/* Ambient light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 60% at 15% 20%, hsl(213 66% 45% / 0.22), transparent 70%), radial-gradient(40% 50% at 95% 90%, hsl(213 66% 45% / 0.14), transparent 70%)',
        }}
      />

      <div className="container-page relative">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Two films, layered: the landscape press shot, the upright delivery clip over its corner */}
          <div className="relative pb-24 lg:col-span-7 lg:pb-32 lg:pr-10">
            <RevealMedia className="aspect-[16/10] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
              <LazyVideo
                src="/videos/arxikivid.mp4"
                poster="/videos/posters/arxikivid.webp"
                className="h-full w-full object-cover"
              />
            </RevealMedia>

            <motion.div
              style={reduced ? undefined : { y: drift }}
              className="absolute bottom-0 right-0 z-10 w-[40%] rounded-[calc(var(--radius-media)+8px)] bg-ink p-[6px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] md:p-2 lg:w-[36%]"
            >
              {/* Plain frame (no clip/scale reveal): this upright clip is the
                  one some browsers stop painting inside an animated clip. */}
              <Reveal delay={0.15} y={60} className="media-frame aspect-[4/5]">
                {/* Poster underneath, so a frame that is still decoding never shows a blank box */}
                <img
                  src="/videos/posters/experience.webp"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <video
                  ref={videoRef}
                  src="/videos/experience.mp4"
                  poster="/videos/posters/experience.webp"
                  className="relative h-full w-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
              </Reveal>
            </motion.div>
          </div>

          {/* Copy */}
          <div className="space-y-8 lg:col-span-5 lg:pl-6">
            <RevealHeading
              as="h3"
              text={t('aboutPreview.title')}
              className="mb-0 text-[clamp(2.4rem,1.5rem+3vw,4.5rem)] leading-[1] tracking-[-0.03em] text-paper"
            />
            <Reveal delay={0.15}>
              <p className="text-base leading-relaxed text-paper/65 md:text-[17px]">{t('aboutPreview.text')}</p>
            </Reveal>
            <Reveal delay={0.25}>
              <ArrowButton to="/about" variant="paper">
                {t('aboutPreview.button')}
              </ArrowButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreviewSection;
