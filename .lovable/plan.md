

# Home Page: Animation on First Visit Only

## What Changes

The bag scroll animation will play only on the very first visit to the homepage during a browsing session. Any time you navigate back to the homepage (from About, Contact, etc.), you'll land directly on the "Paper and Plastic Bags" section -- no animation, no scroll, no delay.

## How It Works

1. **Track "animation seen"** using a session-level flag (sessionStorage). On the very first homepage load, the flag is unset, so the full bag animation plays. Once the animation section is passed, the flag is set.

2. **When returning to Home** (flag is set):
   - The bag animation section is completely hidden (not rendered)
   - The Products section content is immediately visible (no opacity-0, no negative margin)
   - The page starts at the top, which IS the Products section
   - No GSAP setup runs, saving memory and load time

3. **Home nav link** stays as `/#products-section` so the routing logic knows to skip animation on return visits.

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/HomePage.tsx` | Read sessionStorage flag; conditionally skip animation section and show content immediately; set flag after animation completes |
| `src/components/ScrollToTop.tsx` | For `/#products-section`, use instant scroll (`behavior: 'instant'`) with no delay |

## Detailed Changes

### HomePage.tsx

- Import `useLocation` from react-router-dom
- On mount, check `sessionStorage.getItem('laderos_animation_seen')`
- If the hash is `#products-section` OR the flag is already set:
  - Set `skipAnimation = true`
  - Do NOT render the pinned animation `<div>` at all
  - Render `mainContentRef` div without `opacity-0` and without negative margins
  - Skip the entire GSAP useEffect (guard with `if (skipAnimation) return`)
- If showing the animation:
  - After the GSAP timeline completes (or on scroll past), set `sessionStorage.setItem('laderos_animation_seen', 'true')`
- The flag resets naturally when the browser tab/session ends

### ScrollToTop.tsx

- When `pathname === '/'` and `hash === '#products-section'`:
  - Use `window.scrollTo({ top: 0, behavior: 'instant' })` instead of smooth scrollIntoView
  - Remove the setTimeout delay entirely (no need to wait for GSAP since animation section won't exist)

## User Experience

| Scenario | Behavior |
|----------|----------|
| First time opening the site | Full bag animation plays as you scroll |
| Click "Home" from About page | Instantly see Products section, no animation |
| Click "Home" from Contact page | Instantly see Products section, no animation |
| Close tab and reopen site | Full bag animation plays again (new session) |
| Refresh the homepage | Full bag animation plays again (depends on hash) |

## Technical Notes

- `sessionStorage` is used instead of `localStorage` so the animation resets per browser session -- returning visitors in a new tab get the "wow" intro again
- No content is removed from the DOM permanently; crawlers visiting `/` without the hash will still see everything
- The GSAP useEffect cleanup already handles killing ScrollTrigger, so conditional skipping is safe
