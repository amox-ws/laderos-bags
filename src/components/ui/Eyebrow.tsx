import { eyebrowIsRedundant } from '@/lib/text';

interface EyebrowProps {
  /** The bracket label, e.g. "Η παραγωγή". */
  label?: string;
  /** The heading rendered right below it. If the label repeats a word from
   *  the heading, the label is dropped so the same word is not shown twice. */
  heading?: string;
  className?: string;
}

/** Small tracked "[ LABEL ]" above a heading. Renders nothing when redundant. */
const Eyebrow = ({ label, heading, className = '' }: EyebrowProps) => {
  if (!label) return null;
  if (eyebrowIsRedundant(label, heading)) return null;
  return <span className={`section-label ${className}`.trim()}>{label}</span>;
};

export default Eyebrow;
