/** Layout position of an element, unaffected by any sticky offset applied to it. */
const pageOffsetTop = (el: HTMLElement) => {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
};

/** Clears the fixed header; matches the `scroll-mt-20` on the target sections. */
const HEADER_OFFSET = 80;

/**
 * Scroll an in-page target into view, allowing for the footer reveal.
 *
 * `main` is sticky (see Layout): it pins once its bottom meets the viewport
 * bottom, and every pixel scrolled after that slides the footer up over it.
 * A plain `scrollIntoView` ignores that and aims past the pin point, so a
 * target in the last section — the quote form on every product page — ended up
 * hidden behind the footer. Clamping to the pin point puts it fully on screen.
 */
export const scrollToTarget = (
  el: HTMLElement,
  behavior: ScrollBehavior = 'instant' as ScrollBehavior
) => {
  let y = pageOffsetTop(el) - HEADER_OFFSET;

  const main = el.closest('main');
  if (main instanceof HTMLElement && getComputedStyle(main).position === 'sticky') {
    const pinStart = pageOffsetTop(main) + main.offsetHeight - window.innerHeight;
    y = Math.min(y, pinStart);
  }

  window.scrollTo({ top: Math.max(0, y), left: 0, behavior });
};

/** Same, addressed by element id. Does nothing if the element is not there. */
export const scrollToId = (id: string, behavior: ScrollBehavior = 'smooth') => {
  const el = document.getElementById(id);
  if (el) scrollToTarget(el, behavior);
};
