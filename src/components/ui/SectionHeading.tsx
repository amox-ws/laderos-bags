import AnimatedSection from './AnimatedSection';
import { RevealHeading } from './Reveal';

interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  /** constrain the description to a comfortable reading measure */
  narrow?: boolean;
}

/**
 * Editorial section heading: title plus an optional supporting paragraph. Inherits foreground colours
 * from the surrounding section surface (main / accent / dark / footer).
 */
const SectionHeading = ({
  title,
  description,
  align = 'center',
  className = '',
  narrow = true,
}: SectionHeadingProps) => {
  const isCenter = align === 'center';

  return (
    <div className={`${isCenter ? 'text-center flex flex-col items-center' : ''} ${className}`}>
      <RevealHeading text={title} className={`mb-0 ${isCenter ? 'max-w-4xl' : 'max-w-2xl'}`} />
      {description && (
        <AnimatedSection delay={0.15}>
          <p className={`mt-7 text-base md:text-lg leading-relaxed opacity-70 ${narrow ? 'max-w-2xl' : ''} ${isCenter ? 'mx-auto' : ''}`}>
            {description}
          </p>
        </AnimatedSection>
      )}
    </div>
  );
};

export default SectionHeading;
