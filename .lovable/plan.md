# Seamless Hero-to-"Who We Are" Transition on About Page

## What It Does

The About page hero section (video background with title) will seamlessly fade out as you scroll, revealing the "Who We Are" section from its very top -- the same technique used on the Home page for the bag animation to products transition.

## How It Works

As you scroll down on the About page, the full-screen hero with the video background will stay pinned in place and gradually fade out. Behind it, the "Who We Are" section will already be waiting, so when the hero disappears you see the section starting from the top -- no blank gaps, no jumping.

## Technical Details

### File: `src/pages/AboutPage.tsx`

1. **Add GSAP imports and ScrollTrigger** -- import `gsap` and `ScrollTrigger`, register the plugin (same pattern as HomePage)
2. **Add a ref for the hero section** (`heroRef`) and set up a GSAP ScrollTrigger timeline:
  - `pin: true` to keep the hero fixed while scrolling
  - `end: '+=100%'` (one viewport of scroll distance for the fade -- shorter than the bag animation since there are no frames to play)
  - `scrub: 0.15` for smooth, responsive scrolling
  - The timeline animates the hero's `opacity` from 1 to 0
3. **Pull the "Who We Are" section up behind the hero** using a negative top margin (`-mt-[100vh]`) and `relative z-10`, so it sits directly behind the pinned hero. When the hero fades out, the "Who We Are" section is revealed from its start (top).
4. **Wrap remaining sections** in a normal-flow container so they stack naturally after "Who We Are"

### Structure:

```text
<Layout>
  <section ref={heroRef}>         <!-- pinned, fades out via GSAP -->
    Video background + title
  </section>

  <div class="-mt-[100vh] relative z-10">   <!-- pulled behind hero -->
    Who We Are section
  </div>

  <!-- remaining sections flow normally -->
  What We Do, TrustedBy, Production, Stats, Why Work, CTA
</Layout>
```

### Key points:

- The hero video keeps playing while pinned
- Scroll distance for the fade is just 1x viewport height (quick, smooth transition)
- No changes to any other section -- only the hero gets the pin+fade treatment
- The existing Framer Motion slide-in animations on "Who We Are" content still work as before