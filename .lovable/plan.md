

# Fix: Products Section Appears From the Top After Bag Animation

## The Problem
After the bag animation fades out, the "Χάρτινες & Πλαστικές Σακούλες Φτιαγμένες στα Μέτρα σας" section appears starting from the middle of the content instead of the top. This happens because the content container (`mainContentRef`) has `overflow-y-auto` and its scroll position may not be at 0 when it becomes visible.

## The Fix
In `src/pages/HomePage.tsx`, reset the content container's `scrollTop` to `0` right before the fade-in begins. This is done by adding an `onStart` callback to the content fade-in tween (step C in the GSAP timeline).

## File to Modify
- `src/pages/HomePage.tsx`

## Technical Details
In the GSAP timeline step C (around line 197), add an `onStart` callback that sets `contentEl.scrollTop = 0`:

```js
tl.fromTo(
  contentEl,
  { opacity: 0, y: 0 },
  { 
    opacity: 1, y: 0, duration: 1.2, ease: 'power2.out',
    onStart: () => { contentEl.scrollTop = 0; }
  },
  "-=0.5"
);
```

This ensures the products section always starts from the top heading when it fades in.
