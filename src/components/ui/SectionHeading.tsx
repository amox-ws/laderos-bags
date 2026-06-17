import AnimatedSection from './AnimatedSection';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  /** constrain the description to a comfortable reading measure */
  narrow?: boolean;
}

/**
 * Editorial section heading: small tracked eyebrow label, Cormorant serif
 * title, and an optional supporting paragraph. Inherits foreground colours
 * from the surrounding section surface (main / accent / dark / footer).
 */
const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  narrow = true,
}: SectionHeadingProps) => {
  const isCenter = align === 'center';

  return (
    <AnimatedSection className={`${isCenter ? 'text-center flex flex-col items-center' : ''} ${className}`}>
      {eyebrow && <span className="section-label">{eyebrow}</span>}
      <h2 className={`mb-0 ${isCenter ? 'max-w-4xl' : 'max-w-2xl'}`}>{title}</h2>
      {description && (
        <p className={`mt-6 text-base md:text-lg leading-relaxed opacity-70 ${narrow ? 'max-w-2xl' : ''} ${isCenter ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </AnimatedSection>
  );
};

export default SectionHeading;
