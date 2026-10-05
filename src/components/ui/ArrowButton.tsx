import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from '@/components/LocalizedLink';
import { cn } from '@/lib/utils';

type Variant = 'ink' | 'paper' | 'blue' | 'ghost-dark' | 'ghost-light';

const VARIANTS: Record<Variant, { root: string; badge: string }> = {
  ink: {
    root: 'bg-ink text-paper hover:bg-brand shadow-[0_14px_30px_-14px_hsl(var(--ink)/0.6)]',
    badge: 'bg-paper text-ink',
  },
  paper: {
    root: 'bg-paper text-ink hover:bg-white shadow-[0_14px_30px_-14px_hsl(0_0%_0%/0.6)]',
    badge: 'bg-ink text-paper group-hover:bg-brand',
  },
  blue: {
    root: 'bg-brand text-white hover:bg-ink',
    badge: 'bg-white text-brand',
  },
  'ghost-dark': {
    root: 'text-ink shadow-[inset_0_0_0_1px_hsl(var(--ink)/0.2)] hover:shadow-[inset_0_0_0_1px_hsl(var(--ink))]',
    badge: 'bg-ink text-paper',
  },
  'ghost-light': {
    root: 'text-paper shadow-[inset_0_0_0_1px_hsl(var(--paper)/0.3)] hover:shadow-[inset_0_0_0_1px_hsl(var(--paper))] hover:bg-paper/5',
    badge: 'bg-paper text-ink',
  },
};

/** The arrow that slides out and back in through the badge on hover. */
export const SlidingArrow = ({ back = false, className = '' }: { back?: boolean; className?: string }) => {
  const Icon = back ? ArrowLeft : ArrowRight;
  const out = back ? 'group-hover:-translate-x-[180%]' : 'group-hover:translate-x-[180%]';
  const inn = back ? 'translate-x-[180%]' : '-translate-x-[180%]';
  return (
    <span className={cn('relative block h-4 w-4 overflow-hidden', className)} aria-hidden>
      <Icon className={cn('absolute inset-0 h-4 w-4 transition-transform duration-500 ease-out-expo', out)} strokeWidth={1.75} />
      <Icon className={cn('absolute inset-0 h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0', inn)} strokeWidth={1.75} />
    </span>
  );
};

interface ArrowButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: 'md' | 'lg';
  className?: string;
  back?: boolean;
  type?: 'button' | 'submit';
}

/**
 * Pill CTA with a round arrow badge. Renders a router link when `to` is
 * given, a button otherwise.
 */
const ArrowButton = ({
  children,
  to,
  onClick,
  variant = 'ink',
  size = 'md',
  className,
  back = false,
  type = 'button',
}: ArrowButtonProps) => {
  const v = VARIANTS[variant];
  const classes = cn(
    'group relative inline-flex items-center rounded-full font-normal tracking-[-0.005em] transition-[background-color,box-shadow,transform,color] duration-500 ease-out-expo active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
    back ? 'flex-row-reverse' : '',
    size === 'lg' ? 'h-14 gap-4 text-base' : 'h-12 gap-3.5 text-[15px]',
    size === 'lg' ? (back ? 'pl-2 pr-7' : 'pl-7 pr-2') : back ? 'pl-1.5 pr-6' : 'pl-6 pr-1.5',
    v.root,
    className
  );

  const content = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      <span
        className={cn(
          'inline-flex flex-shrink-0 items-center justify-center rounded-full transition-[transform,background-color] duration-500 ease-out-expo group-hover:scale-[1.06]',
          size === 'lg' ? 'h-10 w-10' : 'h-9 w-9',
          v.badge
        )}
      >
        <SlidingArrow back={back} />
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
};

export default ArrowButton;
