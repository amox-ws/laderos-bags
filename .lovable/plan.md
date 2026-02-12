

# Fix: Mobile Scroll on Quote Request Modal

## The Problem
The modal popup uses `flex items-center justify-center` on its container, which conflicts with `overflow-y-auto` on mobile. When flexbox centers content vertically in a fixed container, the top of the content can become unreachable -- the browser can't scroll up past the centered position.

## The Fix
Change the modal layout so that on mobile, the content is top-aligned (not vertically centered) and sits inside a properly scrollable container. On desktop, it stays centered as before.

## Technical Changes

### File: `src/components/forms/QuoteRequestModal.tsx`

**Line 175** -- Change the modal wrapper classes:
- From: `fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto`
- To: `fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 overflow-y-auto`

This single change switches from `items-center` (which traps scroll) to `items-start` on mobile, so the modal starts at the top and scrolls naturally downward. On `md:` screens and above, it stays vertically centered since the modal fits within the viewport.

