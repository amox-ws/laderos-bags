

# Fix: Eliminate Blank Space Between Bag Animation and Products Section

## Root Cause
GSAP's `pin: true` with `end: '+=400%'` creates a **pin spacer** div that is 4x the viewport height. This spacer reserves scroll distance for the animation. When the canvas fades out at the end, the spacer still occupies space below, resulting in a large blank area before the Products section appears.

## The Solution
Place the Products section **inside** the pinned container, positioned behind the canvas (lower z-index). As the canvas fades to transparent, the Products section is naturally revealed underneath -- no gap, no spacer issue.

## Changes

### File: `src/pages/HomePage.tsx`

1. **Move ProductsSection inside the pinned div** -- position it absolutely at `z-10` (behind the canvas at `z-20`), so it's visible the moment the canvas becomes transparent
2. **Keep a duplicate ProductsSection outside** for the `skipAnimation` case (returning visitors), wrapped in a conditional so only one renders at a time
3. **Remove `overflow-hidden`** from the pinned div (or keep it but ensure the inner content is styled to fill the viewport correctly)

The structure becomes:

```text
pinnedSectionRef (pinned, h-screen)
  +-- ProductsSection (absolute, z-10, visible behind canvas)
  +-- Canvas (absolute, z-20, fades out at end)
  +-- Gradient overlay (z-20)

{skipAnimation && <ProductsSection />}  (normal flow, no animation)
```

### Technical Details
- The inner ProductsSection gets `absolute inset-0 z-10` positioning with `overflow-y-auto` so it scrolls if content is taller than viewport
- Add top padding to account for the header height
- The canvas stays at `z-20` and fades out via the existing GSAP timeline step B
- No GSAP timeline changes needed -- the existing fade-out naturally reveals the content behind it

