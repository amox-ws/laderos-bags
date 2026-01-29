

# Infinite Loop Carousel Implementation

## Overview
Update the ProductCarousel component so that when it reaches the last image, it seamlessly continues forward to the first image instead of visibly scrolling backwards.

## Current Behavior
- Carousel uses `translateX` to slide between images
- When reaching the last slide, the index resets to 0
- This causes a visible "rewind" animation scrolling all the way back

## Solution: Clone-Based Infinite Loop

The standard technique for seamless infinite carousels:
1. Clone the first slide and append it after the last slide
2. When the carousel transitions to the cloned slide, wait for the animation to complete
3. Instantly (with no animation) reset the position to the real first slide
4. The user sees a continuous forward motion without any visible jump

## Implementation Steps

### Step 1: Extend the images array with a clone
Add the first image at the end of the array for rendering purposes only.

### Step 2: Update the autoplay and transition logic
- When advancing from the last real slide to the cloned slide, allow the animation to complete
- After the transition ends, instantly reset to index 0 without any transition duration

### Step 3: Handle the transition reset
Use a combination of:
- State to track when we're in the "resetting" phase
- Temporarily disable the CSS transition during the instant reset
- Re-enable transition immediately after

### Step 4: Update dot indicators
Keep the dots showing only the real slides count (not the cloned one), and map the cloned slide indicator back to the first dot.

---

## Technical Details

**File to modify:** `src/components/home/ProductCarousel.tsx`

**Key changes:**

```text
1. Create extended images array:
   const extendedImages = [...images, images[0]];

2. Add state for transition control:
   const [isTransitioning, setIsTransitioning] = useState(true);

3. Update autoplay logic:
   - When currentIndex reaches images.length (the clone), 
     wait for transition to end, then reset to 0 instantly

4. Handle transition end event:
   - Listen for onTransitionEnd on the sliding container
   - When we land on the cloned slide, disable transition and jump to index 0

5. Update dot indicators:
   - Use modulo to map currentIndex back to real slides
   - Dots still show original images.length count
```

**Swipe behavior:**
- Forward swipe: same seamless loop behavior
- Backward swipe from first slide: can optionally wrap to last (will handle this edge case)

