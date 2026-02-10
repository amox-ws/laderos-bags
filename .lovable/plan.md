
# Fix: Remove Empty Gap Between Bag Animation and Products Section

## The Problem
After the bag scroll animation finishes, there's a large empty/blank area before the Products section appears. This happens because:
- The canvas fades out and the content slides up as separate sequential steps in the GSAP timeline
- The negative margin (`-mt-40 md:-mt-60`) doesn't pull the content close enough to fill the gap
- The content fade-in starts too late relative to when the canvas becomes invisible

## The Fix
Adjust the GSAP timeline in `src/pages/HomePage.tsx` so the transition from the bag animation to the products section is seamless:

1. **Start the content reveal earlier** -- overlap step C (content fade-in) more aggressively with step B (canvas fade-out) so there's no blank moment
2. **Increase the negative margin** on the main content div so it visually sits right behind the pinned canvas section
3. **Shorten the gap** by reducing the canvas fade duration slightly and starting the content slide-up sooner

## File to Modify
- `src/pages/HomePage.tsx` -- adjust GSAP timeline timing and the negative margin class on the main content wrapper

## Technical Details
- Change the canvas fade duration from `1` to `0.8`
- Start content reveal (`fromTo`) slightly before the canvas fade using a negative offset like `"-=0.5"` instead of `"<"`
- Increase the negative top margin from `-mt-40 md:-mt-60` to `-mt-[50vh] md:-mt-[60vh]` so the content is pulled up directly behind the pinned section
- Adjust the content's initial `y` offset from `100` to `0` since the negative margin handles positioning
