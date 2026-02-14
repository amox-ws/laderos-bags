

# Add Scroll Indicator to Homepage Bag Animation

## What It Does

Adds an animated "scroll down" indicator at the bottom center of the bag animation hero section. It will feature a small bouncing chevron arrow with subtle text, guiding first-time visitors to scroll. The indicator fades out as the user begins scrolling.

## Design

- A small downward chevron icon (from Lucide) with a gentle bounce animation
- Optional subtle text below: "Scroll" (bilingual -- "Scroll" works in both languages, or we can use a translated label)
- Positioned at the bottom center of the pinned hero section
- Semi-transparent white color to work against the bag animation background
- Fades out after the user scrolls ~10% into the animation, so it doesn't obstruct the experience

## Technical Details

### 1. Update `src/pages/HomePage.tsx`

- Add a scroll indicator element inside the pinned animation wrapper (the `div` with `ref={pinnedSectionRef}`), positioned `absolute bottom-8 left-1/2 -translate-x-1/2 z-30`
- Use Lucide's `ChevronDown` or `ChevronsDown` icon with a CSS bounce animation
- Track scroll progress from the existing GSAP `onUpdate` callback to fade the indicator out (set opacity to 0 when progress > 0.05)
- Use a small `useState` for indicator visibility, toggled by the GSAP progress
- Only rendered when `!skipAnimation` (same condition as the animation itself)

### 2. Animation Style

- Use Tailwind's `animate-bounce` class on the chevron for a gentle up-down motion
- The indicator container gets a smooth opacity transition: `transition-opacity duration-500`
- Text and icon in `text-white/70` for a subtle, non-intrusive look

### What stays the same
- No changes to the bag scroll animation itself
- No changes to any other page or section
- Desktop and mobile both get the indicator
