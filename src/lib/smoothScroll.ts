import type Lenis from 'lenis';

/**
 * Shared handle on the Lenis instance (desktop only — see SmoothScroll.tsx).
 * Every programmatic scroll goes through here, so a glide that is still
 * running can never drag the page away from where we just sent it.
 */
let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const scrollWindowTo = (top: number, behavior: ScrollBehavior = 'instant' as ScrollBehavior) => {
  if (lenis) {
    lenis.scrollTo(top, behavior === 'smooth' ? { duration: 1.2 } : { immediate: true, force: true });
    return;
  }
  window.scrollTo({ top, left: 0, behavior });
};

/** Freeze the page behind menus and dialogs. */
export const lockScroll = (locked: boolean) => {
  document.body.style.overflow = locked ? 'hidden' : '';
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
};
